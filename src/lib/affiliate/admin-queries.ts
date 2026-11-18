import "server-only";

// ADR 0023 — admin reads for the affiliate pages. Admin may see full order numbers, but no customer
// data is needed here, so orders columns are a named list. Money is integer cents.
//
// Totals are added up in JS through computeCommissionTotals, so they cannot disagree with the
// status column or the partner dashboard. Attributed orders are few enough for that.

import { and, count, desc, eq, isNotNull, ne, sql, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { affiliateClicks, affiliatePayouts, affiliates, orders } from "@/lib/db/schema";
import { computeCommissionTotals, type AffiliateValues, type CommissionTotals } from "./core";

const AFFILIATE_COLUMNS = {
  id: affiliates.id,
  name: affiliates.name,
  handle: affiliates.handle,
  code: affiliates.code,
  commissionRateBps: affiliates.commissionRateBps,
  customerDiscountBps: affiliates.customerDiscountBps,
  notifyEmail: affiliates.notifyEmail,
  notifyTelegramChatId: affiliates.notifyTelegramChatId,
  isActive: affiliates.isActive,
  createdAt: affiliates.createdAt,
};

function adminOrdersQuery(affiliateId: string) {
  return db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      createdAt: orders.createdAt,
      totalPrice: orders.totalPrice,
      commissionAmountCents: orders.commissionAmountCents,
      attributionSource: orders.attributionSource,
      status: orders.status,
    })
    .from(orders)
    .where(eq(orders.affiliateId, affiliateId))
    .orderBy(desc(orders.createdAt));
}

function adminPayoutsQuery(affiliateId: string) {
  return db
    .select({
      id: affiliatePayouts.id,
      amountCents: affiliatePayouts.amountCents,
      cryptoCurrency: affiliatePayouts.cryptoCurrency,
      cryptoAmount: affiliatePayouts.cryptoAmount,
      txHash: affiliatePayouts.txHash,
      periodStart: affiliatePayouts.periodStart,
      periodEnd: affiliatePayouts.periodEnd,
      paidAt: affiliatePayouts.paidAt,
    })
    .from(affiliatePayouts)
    .where(eq(affiliatePayouts.affiliateId, affiliateId))
    .orderBy(desc(affiliatePayouts.paidAt), desc(affiliatePayouts.createdAt));
}

function listAffiliateRows() {
  return db.select(AFFILIATE_COLUMNS).from(affiliates).orderBy(desc(affiliates.createdAt));
}

export type AdminAffiliate = Awaited<ReturnType<typeof listAffiliateRows>>[number];
export type AdminAffiliateOrder = Awaited<ReturnType<typeof adminOrdersQuery>>[number];
export type AdminAffiliatePayout = Awaited<ReturnType<typeof adminPayoutsQuery>>[number];

export interface AffiliateStats extends CommissionTotals {
  clicks: number;
  attributedOrders: number;
}

export interface AffiliateListRow extends AdminAffiliate {
  stats: AffiliateStats;
}

export interface AffiliateDetail {
  affiliate: AdminAffiliate;
  stats: AffiliateStats;
  orders: AdminAffiliateOrder[];
  payouts: AdminAffiliatePayout[];
}

function groupByAffiliate<T extends { affiliateId: string | null }>(
  rows: readonly T[],
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const row of rows) {
    if (row.affiliateId === null) continue;
    const group = grouped.get(row.affiliateId);
    if (group) group.push(row);
    else grouped.set(row.affiliateId, [row]);
  }
  return grouped;
}

export async function listAffiliatesWithStats(): Promise<AffiliateListRow[]> {
  const [rows, orderRows, payoutRows, clickRows] = await Promise.all([
    listAffiliateRows(),
    db
      .select({
        affiliateId: orders.affiliateId,
        status: orders.status,
        commissionAmountCents: orders.commissionAmountCents,
      })
      .from(orders)
      .where(isNotNull(orders.affiliateId)),
    db
      .select({ affiliateId: affiliatePayouts.affiliateId, amountCents: affiliatePayouts.amountCents })
      .from(affiliatePayouts),
    db
      .select({ affiliateId: affiliateClicks.affiliateId, total: count() })
      .from(affiliateClicks)
      .groupBy(affiliateClicks.affiliateId),
  ]);

  const ordersByAffiliate = groupByAffiliate(orderRows);
  const payoutsByAffiliate = groupByAffiliate(payoutRows);
  const clicksByAffiliate = new Map(clickRows.map((row) => [row.affiliateId, row.total]));

  return rows.map((affiliate) => {
    const affiliateOrders = ordersByAffiliate.get(affiliate.id) ?? [];
    return {
      ...affiliate,
      stats: {
        clicks: clicksByAffiliate.get(affiliate.id) ?? 0,
        attributedOrders: affiliateOrders.length,
        ...computeCommissionTotals(affiliateOrders, payoutsByAffiliate.get(affiliate.id) ?? []),
      },
    };
  });
}

export async function getAffiliateDetail(affiliateId: string): Promise<AffiliateDetail | null> {
  const [[affiliate], affiliateOrders, payouts, [clicks]] = await Promise.all([
    db.select(AFFILIATE_COLUMNS).from(affiliates).where(eq(affiliates.id, affiliateId)).limit(1),
    adminOrdersQuery(affiliateId),
    adminPayoutsQuery(affiliateId),
    db
      .select({ total: count() })
      .from(affiliateClicks)
      .where(eq(affiliateClicks.affiliateId, affiliateId)),
  ]);
  if (!affiliate) return null;

  return {
    affiliate,
    stats: {
      clicks: clicks.total,
      attributedOrders: affiliateOrders.length,
      ...computeCommissionTotals(affiliateOrders, payouts),
    },
    orders: affiliateOrders,
    payouts,
  };
}

export async function getAffiliateIsActive(affiliateId: string): Promise<boolean | null> {
  const [affiliate] = await db
    .select({ isActive: affiliates.isActive })
    .from(affiliates)
    .where(eq(affiliates.id, affiliateId))
    .limit(1);
  return affiliate?.isActive ?? null;
}

export async function getAffiliateChannels(affiliateId: string) {
  const [affiliate] = await db
    .select({
      notifyEmail: affiliates.notifyEmail,
      notifyTelegramChatId: affiliates.notifyTelegramChatId,
    })
    .from(affiliates)
    .where(eq(affiliates.id, affiliateId))
    .limit(1);
  return affiliate ?? null;
}

export type AffiliateConflict = "affiliate_code" | "notify_email";

function otherAffiliate(condition: SQL, excludeId: string | undefined): SQL | undefined {
  return excludeId ? and(condition, ne(affiliates.id, excludeId)) : condition;
}

// Customer referral codes can't collide: the NORA- prefix is rejected by isValidAffiliateCode.
// Inactive affiliates count, since their code and email come back if reactivated.
export async function findAffiliateConflict(
  values: Pick<AffiliateValues, "code" | "notifyEmail">,
  excludeId?: string,
): Promise<AffiliateConflict | null> {
  const [sameCode] = await db
    .select({ id: affiliates.id })
    .from(affiliates)
    .where(otherAffiliate(eq(affiliates.code, values.code), excludeId))
    .limit(1);
  if (sameCode) return "affiliate_code";

  if (values.notifyEmail === null) return null;

  const [sameEmail] = await db
    .select({ id: affiliates.id })
    .from(affiliates)
    .where(
      otherAffiliate(
        eq(sql`lower(${affiliates.notifyEmail})`, values.notifyEmail.toLowerCase()),
        excludeId,
      ),
    )
    .limit(1);
  return sameEmail ? "notify_email" : null;
}

// Case-insensitive: the hashes of all four currencies are hex.
export async function payoutTxHashExists(txHash: string): Promise<boolean> {
  const [payout] = await db
    .select({ id: affiliatePayouts.id })
    .from(affiliatePayouts)
    .where(eq(sql`lower(${affiliatePayouts.txHash})`, txHash.toLowerCase()))
    .limit(1);
  return payout !== undefined;
}
