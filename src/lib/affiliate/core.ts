// ADR 0023 — pure affiliate logic. No "server-only", no db import and no env reads, so the rules
// here stay testable without a connection. Callers look the rows up and pass them in.

export type AttributionSource = "link" | "code";

export type CommissionState = "earned" | "void" | "pending";

export interface AttributionAffiliate {
  id: string;
  code: string;
  isActive: boolean;
  notifyEmail: string | null;
  customerDiscountBps: number;
  commissionRateBps: number;
}

export interface Attribution {
  affiliate: AttributionAffiliate;
  source: AttributionSource;
}

export interface AffiliateNotification {
  subject: string;
  text: string;
  html: string;
}

const AFFILIATE_CODE = /^[A-Z0-9_-]{2,32}$/;

// Customer referral codes are NORA-XXXXXX (ADR 0017); both share the nora_ref cookie.
export const CUSTOMER_REFERRAL_PREFIX = "NORA-";

const BPS_PER_WHOLE = 10_000;

const ORDER_NUMBER_VISIBLE_CHARS = 2;
const ORDER_NUMBER_MASK = "******";

export function normalizeAffiliateCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().toUpperCase();
  return trimmed.length > 0 ? trimmed : null;
}

export function isValidAffiliateCode(code: string): boolean {
  return AFFILIATE_CODE.test(code) && !code.startsWith(CUSTOMER_REFERRAL_PREFIX);
}

// Half a cent rounds up.
export function computeCommissionCents(totalCents: number, rateBps: number): number {
  return Math.round((totalCents * rateBps) / BPS_PER_WHOLE);
}

export function applyDiscountBps(totalCents: number, discountBps: number): number {
  return totalCents - Math.round((totalCents * discountBps) / BPS_PER_WHOLE);
}

// Affiliate discounts don't stack with crypto: the buyer gets whichever is larger.
export function effectiveAffiliateDiscountBps(affiliateBps: number, cryptoBps: number): number {
  return Math.max(affiliateBps, cryptoBps);
}

export function commissionState(orderStatus: string): CommissionState {
  if (orderStatus === "paid" || orderStatus === "fulfilled") return "earned";
  if (orderStatus === "cancelled") return "void";
  return "pending";
}

function isSelfPurchase(affiliate: AttributionAffiliate, buyerEmail: string): boolean {
  if (affiliate.notifyEmail === null) return false;
  return affiliate.notifyEmail.trim().toLowerCase() === buyerEmail.trim().toLowerCase();
}

// A typed active affiliate code beats the cookie. A typed code equal to the cookie counts as
// "link", because the cookie pre-fills it. An unknown, non-affiliate, inactive or self-purchase
// code is skipped silently, leaving the cookie in play under the same checks. Last touch needs
// nothing here: the single nora_ref cookie only ever holds the latest code.
export function resolveAttribution(input: {
  typedCode: string | null | undefined;
  cookieCode: string | null | undefined;
  buyerEmail: string;
  affiliates: readonly AttributionAffiliate[];
}): Attribution | null {
  const typedCode = normalizeAffiliateCode(input.typedCode);
  const cookieCode = normalizeAffiliateCode(input.cookieCode);

  const eligible = (code: string | null): AttributionAffiliate | null => {
    if (code === null) return null;
    const affiliate = input.affiliates.find((row) => row.code === code);
    if (!affiliate || !affiliate.isActive) return null;
    return isSelfPurchase(affiliate, input.buyerEmail) ? null : affiliate;
  };

  const typed = eligible(typedCode);
  if (typed) return { affiliate: typed, source: typedCode === cookieCode ? "link" : "code" };

  const cookie = eligible(cookieCode);
  return cookie ? { affiliate: cookie, source: "link" } : null;
}

// "NR-AB12CD34" → "NR-******34". A full number opens /checkout/success?order=, so affiliates only
// ever see this form.
export function maskOrderNumber(orderNumber: string): string {
  const dash = orderNumber.indexOf("-");
  const prefix = orderNumber.slice(0, dash + 1);
  const body = orderNumber.slice(dash + 1);
  const visible =
    body.length > ORDER_NUMBER_VISIBLE_CHARS ? body.slice(-ORDER_NUMBER_VISIBLE_CHARS) : "";
  return `${prefix}${ORDER_NUMBER_MASK}${visible}`;
}

export function formatUsd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// Takes the four allowed fields by name, so nothing extra on a caller's object can reach the
// message. Dates are UTC, matching the daily click salt.
export function buildAffiliateNotification(input: {
  orderNumber: string;
  createdAt: Date;
  orderTotalCents: number;
  commissionCents: number;
}): AffiliateNotification {
  const orderNumber = maskOrderNumber(input.orderNumber);
  const date = input.createdAt.toISOString().slice(0, 10);
  const orderAmount = formatUsd(input.orderTotalCents);
  const commission = formatUsd(input.commissionCents);

  const lines = [
    `NORA order ${orderNumber} from ${date} has been paid.`,
    `Order amount: ${orderAmount}. Your commission: ${commission}.`,
  ];

  return {
    subject: `Commission earned: ${commission}`,
    text: lines.join("\n\n"),
    html: lines.map((line) => `<p>${line}</p>`).join("\n"),
  };
}

export function buildAffiliateTestNotification(now: Date): AffiliateNotification {
  const sample = buildAffiliateNotification({
    orderNumber: "NR-TEST0000",
    createdAt: now,
    orderTotalCents: 12_000,
    commissionCents: 4_200,
  });
  const label = "TEST MESSAGE. No order was placed and no commission was earned.";

  return {
    subject: `[TEST] ${sample.subject}`,
    text: `${label}\n\n${sample.text}`,
    html: `<p><strong>${label}</strong></p>\n${sample.html}`,
  };
}

// ── Balance ─────────────────────────────────────────────────────────────────

export interface CommissionTotals {
  earnedOrders: number;
  earnedCents: number;
  paidOutCents: number;
  // Negative after a cancellation that follows a payout; it carries forward.
  balanceCents: number;
}

// Earned goes through commissionState, not commission_earned_at: that column records that the
// notification fired and stays set if the order is cancelled later.
export function computeCommissionTotals(
  orders: readonly { status: string; commissionAmountCents: number | null }[],
  payouts: readonly { amountCents: number }[],
): CommissionTotals {
  const earned = orders.filter((order) => commissionState(order.status) === "earned");
  const earnedCents = earned.reduce((sum, order) => sum + (order.commissionAmountCents ?? 0), 0);
  const paidOutCents = payouts.reduce((sum, payout) => sum + payout.amountCents, 0);

  return {
    earnedOrders: earned.length,
    earnedCents,
    paidOutCents,
    balanceCents: earnedCents - paidOutCents,
  };
}

// Positive balances only: one affiliate's negative balance is carried against their own future
// earnings and does not reduce what another one is owed.
export function computeTotalOwedCents(balances: readonly number[]): number {
  return balances.reduce((sum, balance) => sum + Math.max(balance, 0), 0);
}

// ── Admin form parsing ──────────────────────────────────────────────────────
// Server Action arguments arrive from the network, so every field is unknown here. Amounts are
// built from their digits, not parseFloat, because 19.99 * 100 is 1998.9999999999998.

export const DEFAULT_COMMISSION_RATE_BPS = 3500;
export const DEFAULT_CUSTOMER_DISCOUNT_BPS = 1500;

export const PAYOUT_CURRENCIES = ["BTC", "LTC", "ETH", "USDT-TRC20"] as const;
export type PayoutCurrency = (typeof PAYOUT_CURRENCIES)[number];

const BPS_PER_PERCENT = 100;
const BPS_PER_PERCENT_TENTH = 10;

const MAX_AMOUNT_CENTS = 2_147_483_647;

const PERCENT_INPUT = /^(\d{1,3})(?:\.(\d))?$/;
const USD_INPUT = /^(\d{1,8})(?:\.(\d{1,2}))?$/;
const CRYPTO_AMOUNT_INPUT = /^\d+(?:\.\d+)?$/;
const DATE_INPUT = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_INPUT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX_LENGTH = 254;

function trimmedText(raw: unknown): string {
  return typeof raw === "string" ? raw.trim() : "";
}

// "35" → 3500, "12.5" → 1250. One decimal at most, 0 to 100.
export function parsePercentToBps(raw: unknown): number | null {
  const match = PERCENT_INPUT.exec(trimmedText(raw));
  if (!match) return null;
  const bps =
    Number(match[1]) * BPS_PER_PERCENT + Number(match[2] ?? 0) * BPS_PER_PERCENT_TENTH;
  return bps <= BPS_PER_WHOLE ? bps : null;
}

export function formatBpsAsPercent(bps: number): string {
  return String(bps / BPS_PER_PERCENT);
}

// "297.50" → 29750. Two decimals at most, above zero, no symbol or separators.
export function parseUsdToCents(raw: unknown): number | null {
  const match = USD_INPUT.exec(trimmedText(raw));
  if (!match) return null;
  const cents = Number(match[1]) * 100 + Number((match[2] ?? "").padEnd(2, "0"));
  return cents > 0 && cents <= MAX_AMOUNT_CENTS ? cents : null;
}

// Rejects 2026-02-31, which Date would silently roll into March.
export function parseDateInput(raw: unknown): Date | null {
  const value = trimmedText(raw);
  if (!DATE_INPUT.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10) === value ? date : null;
}

export function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export interface AffiliateInput {
  name: string;
  handle: string;
  code: string;
  commissionPercent: string;
  discountPercent: string;
  notifyEmail: string;
  telegramChatId: string;
}

export interface AffiliateValues {
  name: string;
  handle: string | null;
  code: string;
  commissionRateBps: number;
  customerDiscountBps: number;
  notifyEmail: string | null;
  notifyTelegramChatId: string | null;
}

// Format checks only. A code or email that collides with another row is the caller's check.
export function parseAffiliateInput(
  input: AffiliateInput,
): { values: AffiliateValues } | { error: string } {
  const name = trimmedText(input.name);
  if (!name) return { error: "Name is required." };

  const code = normalizeAffiliateCode(trimmedText(input.code));
  if (!code) return { error: "Code is required." };
  if (!isValidAffiliateCode(code)) {
    return {
      error: `Code must be 2 to 32 letters, digits, _ or -, and cannot start with ${CUSTOMER_REFERRAL_PREFIX}.`,
    };
  }

  const commissionRateBps = parsePercentToBps(input.commissionPercent);
  if (commissionRateBps === null) {
    return { error: "Commission must be 0 to 100, with one decimal at most." };
  }

  const customerDiscountBps = parsePercentToBps(input.discountPercent);
  if (customerDiscountBps === null) {
    return { error: "Discount must be 0 to 100, with one decimal at most." };
  }

  const notifyEmail = trimmedText(input.notifyEmail);
  if (notifyEmail && (notifyEmail.length > EMAIL_MAX_LENGTH || !EMAIL_INPUT.test(notifyEmail))) {
    return { error: "Notify email is not a valid address." };
  }

  return {
    values: {
      name,
      handle: trimmedText(input.handle) || null,
      code,
      commissionRateBps,
      customerDiscountBps,
      notifyEmail: notifyEmail || null,
      notifyTelegramChatId: trimmedText(input.telegramChatId) || null,
    },
  };
}

export interface PayoutInput {
  amountUsd: string;
  currency: string;
  cryptoAmount: string;
  txHash: string;
  periodStart: string;
  periodEnd: string;
  paidAt: string;
}

export interface PayoutValues {
  amountCents: number;
  cryptoCurrency: PayoutCurrency;
  cryptoAmount: string;
  txHash: string;
  periodStart: Date;
  periodEnd: Date;
  paidAt: Date;
}

// A blank paid-at date means today (UTC).
export function parsePayoutInput(
  input: PayoutInput,
  now: Date,
): { values: PayoutValues } | { error: string } {
  const amountCents = parseUsdToCents(input.amountUsd);
  if (amountCents === null) {
    return { error: "Amount must be above zero, in USD, with two decimals at most." };
  }

  const cryptoCurrency = PAYOUT_CURRENCIES.find((currency) => currency === input.currency);
  if (!cryptoCurrency) return { error: "Choose a currency." };

  const cryptoAmount = trimmedText(input.cryptoAmount);
  if (!CRYPTO_AMOUNT_INPUT.test(cryptoAmount) || !/[1-9]/.test(cryptoAmount)) {
    return { error: "Crypto amount must be a number above zero, like 0.0015." };
  }

  const txHash = trimmedText(input.txHash);
  if (!txHash) return { error: "Tx hash is required." };

  const periodStart = parseDateInput(input.periodStart);
  const periodEnd = parseDateInput(input.periodEnd);
  if (!periodStart || !periodEnd) return { error: "Period start and end are required." };
  if (periodEnd < periodStart) return { error: "Period end is before period start." };

  const paidAt = parseDateInput(trimmedText(input.paidAt) || toDateInputValue(now));
  if (!paidAt) return { error: "Paid date is not valid." };

  return {
    values: { amountCents, cryptoCurrency, cryptoAmount, txHash, periodStart, periodEnd, paidAt },
  };
}

// Logs carry only a name and code: driver errors quote query parameters, and fetch errors can
// quote the URL (the Telegram one holds the bot token).
export function safeErrorTag(err: unknown): string {
  if (err == null || typeof err !== "object") return typeof err;
  const e = err as { name?: unknown; code?: unknown; cause?: unknown };
  const name = typeof e.name === "string" ? e.name : "Error";
  const asCode = (v: unknown): string | null =>
    typeof v === "string" || typeof v === "number" ? String(v) : null;
  let code = asCode(e.code);
  if (!code && e.cause != null && typeof e.cause === "object") {
    code = asCode((e.cause as { code?: unknown }).code);
  }
  return code ? `${name} (${code})` : name;
}
