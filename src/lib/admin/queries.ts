// Admin BI data layer (ADR 0024, ported from isrib-next). server-only: reads the whole orders
// table (PII + attribution). Money is integer cents and nothing is formatted here.
//
// NORA differences from isrib: one product per order row (no order_items), no legacy orders, an
// address on every order (so "needs action" is just awaiting payment / awaiting shipment), and no
// flat shipping-cost model.
import "server-only";
import { and, count, desc, eq, gte, inArray, isNull, lt, sql, sum } from "drizzle-orm";
import { getProduct } from "@/lib/copy/products";
import { db } from "@/lib/db";
import { affiliates, orders } from "@/lib/db/schema";

const PAID_STATUSES = ["paid", "fulfilled"] as const;
const UNPAID_STATUSES = ["pending_payment_instructions", "awaiting_payment"] as const;

const WINDOW_DAYS = 30;
const MONTHLY_WINDOW = 6;
const ORDER_LIST_LIMIT = 200;
const TOP_N = 8;

// SUM over an integer column comes back as a numeric string (or null).
function toInt(v: string | number | null | undefined): number {
  if (v == null) return 0;
  return typeof v === "number" ? v : Math.round(Number(v));
}

// Raw min()/max() over a timestamp comes back as a string, not a Date.
function toDate(v: Date | string | null | undefined): Date | null {
  if (v == null) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

const isPaid = inArray(orders.status, [...PAID_STATUSES]);
const paidRevenueExpr = sql<string | null>`sum(case when ${isPaid} then ${orders.totalPrice} else 0 end)`;

// ── biSummary ────────────────────────────────────────────────────────────────

export interface BreakdownRow {
  key: string | null;
  orders: number;
  revenueCents: number;
}

export interface TopProductRow {
  productSlug: string;
  name: string;
  units: number;
  revenueCents: number;
}

export interface BiSummary {
  windowDays: number;
  revenueCents: number;
  orders: number;
  paid: number;
  unpaid: number;
  unpaidToPaidRatio: number;
  aovCents: number;
  awaitingPayment: number; // all time: pending + awaiting
  awaitingShipment: number; // all time: paid, not shipped
  byTrafficType: BreakdownRow[];
  byUtmSource: BreakdownRow[];
  byCountry: BreakdownRow[];
  byAffiliate: BreakdownRow[];
  topProducts: TopProductRow[];
}

function breakdown(rows: { key: string | null; orders: number; revenueCents: string | null }[]) {
  return rows.map((r) => ({ key: r.key, orders: r.orders, revenueCents: toInt(r.revenueCents) }));
}

export async function biSummary(): Promise<BiSummary> {
  const cutoff = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000);
  const inWindow = gte(orders.createdAt, cutoff);

  const [
    [paidRow],
    [allRow],
    [unpaidRow],
    [awaitingPaymentRow],
    [awaitingShipmentRow],
    trafficRows,
    utmRows,
    countryRows,
    affiliateRows,
    productRows,
  ] = await Promise.all([
    db.select({ revenue: sum(orders.totalPrice), n: count() }).from(orders).where(and(inWindow, isPaid)),
    db.select({ n: count() }).from(orders).where(inWindow),
    db
      .select({ n: count() })
      .from(orders)
      .where(and(inWindow, inArray(orders.status, [...UNPAID_STATUSES]))),
    db.select({ n: count() }).from(orders).where(inArray(orders.status, [...UNPAID_STATUSES])),
    db
      .select({ n: count() })
      .from(orders)
      .where(and(eq(orders.status, "paid"), isNull(orders.shippedAt))),
    db
      .select({ key: orders.trafficType, orders: count(), revenueCents: paidRevenueExpr })
      .from(orders)
      .where(inWindow)
      .groupBy(orders.trafficType)
      .orderBy(desc(count())),
    db
      .select({ key: orders.utmSource, orders: count(), revenueCents: paidRevenueExpr })
      .from(orders)
      .where(inWindow)
      .groupBy(orders.utmSource)
      .orderBy(desc(count()))
      .limit(TOP_N),
    db
      .select({ key: orders.country, orders: count(), revenueCents: paidRevenueExpr })
      .from(orders)
      .where(inWindow)
      .groupBy(orders.country)
      .orderBy(desc(paidRevenueExpr))
      .limit(TOP_N),
    db
      .select({ key: affiliates.code, orders: count(), revenueCents: paidRevenueExpr })
      .from(orders)
      .innerJoin(affiliates, eq(orders.affiliateId, affiliates.id))
      .where(inWindow)
      .groupBy(affiliates.code)
      .orderBy(desc(paidRevenueExpr))
      .limit(TOP_N),
    db
      .select({
        productSlug: orders.productSlug,
        units: sql<string | null>`sum(${orders.quantity})`,
        revenueCents: sum(orders.totalPrice),
      })
      .from(orders)
      .where(and(inWindow, isPaid))
      .groupBy(orders.productSlug)
      .orderBy(desc(sum(orders.totalPrice)))
      .limit(TOP_N),
  ]);

  const revenueCents = toInt(paidRow?.revenue);
  const paid = paidRow?.n ?? 0;
  const unpaid = unpaidRow?.n ?? 0;

  return {
    windowDays: WINDOW_DAYS,
    revenueCents,
    orders: allRow?.n ?? 0,
    paid,
    unpaid,
    unpaidToPaidRatio: paid > 0 ? unpaid / paid : 0,
    aovCents: Math.round(revenueCents / Math.max(paid, 1)),
    awaitingPayment: awaitingPaymentRow?.n ?? 0,
    awaitingShipment: awaitingShipmentRow?.n ?? 0,
    byTrafficType: breakdown(trafficRows),
    byUtmSource: breakdown(utmRows),
    byCountry: breakdown(countryRows),
    byAffiliate: breakdown(affiliateRows),
    topProducts: productRows.map((r) => ({
      productSlug: r.productSlug,
      name: getProduct(r.productSlug)?.name ?? r.productSlug,
      units: toInt(r.units),
      revenueCents: toInt(r.revenueCents),
    })),
  };
}

// ── listOrders ─────────────────────────────────────────────────────────────────

// Newest first, capped: a single-operator panel, so a hard cap beats pagination for now.
export async function listOrders() {
  return db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      createdAt: orders.createdAt,
      name: orders.name,
      email: orders.email,
      phone: orders.phone,
      address: orders.address,
      city: orders.city,
      stateRegion: orders.stateRegion,
      postalCode: orders.postalCode,
      country: orders.country,
      productSlug: orders.productSlug,
      quantity: orders.quantity,
      status: orders.status,
      paymentMethod: orders.paymentMethod,
      totalPriceCents: orders.totalPrice,
      note: orders.note,
      trafficType: orders.trafficType,
      utmSource: orders.utmSource,
      affiliateCode: affiliates.code,
      trackingNumber: orders.trackingNumber,
      trackingCarrier: orders.trackingCarrier,
    })
    .from(orders)
    .leftJoin(affiliates, eq(orders.affiliateId, affiliates.id))
    .orderBy(desc(orders.createdAt))
    .limit(ORDER_LIST_LIMIT);
}

export type AdminOrderRow = Awaited<ReturnType<typeof listOrders>>[number];

// ── groupByCustomer ──────────────────────────────────────────────────────────────

export interface CustomerGroup {
  email: string;
  name: string;
  country: string | null;
  clientType: "regular" | "client" | "lead";
  orderCount: number;
  paidOrderCount: number;
  revenueCents: number;
  firstOrderAt: Date | null;
  lastOrderAt: Date | null;
}

// Grouped by lowercased email; name and country come from the most recent order. "client" means
// one paid order, "regular" two or more, "lead" none paid yet.
export async function groupByCustomer(): Promise<CustomerGroup[]> {
  const emailKey = sql<string>`lower(${orders.email})`;
  const rows = await db
    .select({
      email: emailKey,
      name: sql<string>`(array_agg(${orders.name} order by ${orders.createdAt} desc))[1]`,
      country: sql<string | null>`(array_agg(${orders.country} order by ${orders.createdAt} desc))[1]`,
      orderCount: count(),
      paidOrderCount: sql<string | null>`sum(case when ${isPaid} then 1 else 0 end)`,
      revenueCents: paidRevenueExpr,
      firstAt: sql<Date | string | null>`min(${orders.createdAt})`,
      lastAt: sql<Date | string | null>`max(${orders.createdAt})`,
    })
    .from(orders)
    .groupBy(emailKey);

  return rows
    .map((r) => {
      const paidOrderCount = toInt(r.paidOrderCount);
      const clientType: CustomerGroup["clientType"] =
        paidOrderCount >= 2 ? "regular" : paidOrderCount === 1 ? "client" : "lead";
      return {
        email: r.email,
        name: r.name,
        country: r.country,
        clientType,
        orderCount: r.orderCount,
        paidOrderCount,
        revenueCents: toInt(r.revenueCents),
        firstOrderAt: toDate(r.firstAt),
        lastOrderAt: toDate(r.lastAt),
      };
    })
    .sort((a, b) => b.revenueCents - a.revenueCents || b.orderCount - a.orderCount);
}

// ── monthlyRevenue ───────────────────────────────────────────────────────────

export interface MonthlyRevenueRow {
  month: string; // "YYYY-MM" (UTC)
  isCurrent: boolean;
  revenueCents: number;
  paidOrders: number;
  allOrders: number;
  aovCents: number;
  momPct: number | null;
}

// Current month to now vs the previous month over the same days, so a partial month compares fairly.
export interface MonthToDatePace {
  month: string;
  prevMonth: string;
  prevThroughDay: number;
  revenueCents: number;
  paidOrders: number;
  pacePct: number | null;
  paidOrdersPacePct: number | null;
}

export interface MonthlyRevenue {
  rows: MonthlyRevenueRow[];
  mtd: MonthToDatePace;
}

function monthKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function pctChange(cur: number, prev: number): number | null {
  return prev > 0 ? ((cur - prev) / prev) * 100 : null;
}

export async function monthlyRevenue(): Promise<MonthlyRevenue> {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();
  const windowStart = new Date(Date.UTC(y, m - (MONTHLY_WINDOW - 1), 1));
  const curStart = new Date(Date.UTC(y, m, 1));
  const prevStart = new Date(Date.UTC(y, m - 1, 1));
  // Same day-of-month and time one month back; Date.UTC overflows a short month into the
  // current one, so clamp to curStart.
  const prevSameRaw = new Date(
    Date.UTC(y, m - 1, now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()),
  );
  const prevEnd = prevSameRaw < curStart ? prevSameRaw : curStart;
  const daysInPrevMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();

  const monthExpr = sql<string>`to_char(date_trunc('month', ${orders.createdAt}), 'YYYY-MM')`;

  const [monthRows, [prevRow]] = await Promise.all([
    db
      .select({
        month: monthExpr,
        allOrders: count(),
        paidOrders: sql<string | null>`sum(case when ${isPaid} then 1 else 0 end)`,
        revenueCents: paidRevenueExpr,
      })
      .from(orders)
      .where(gte(orders.createdAt, windowStart))
      .groupBy(monthExpr),
    db
      .select({ n: count(), revenueCents: sum(orders.totalPrice) })
      .from(orders)
      .where(and(isPaid, gte(orders.createdAt, prevStart), lt(orders.createdAt, prevEnd))),
  ]);

  const byMonth = new Map(monthRows.map((r) => [r.month, r]));
  const currentKey = monthKey(curStart);
  const rows: MonthlyRevenueRow[] = [];
  for (let i = MONTHLY_WINDOW - 1; i >= 0; i--) {
    const month = monthKey(new Date(Date.UTC(y, m - i, 1)));
    const r = byMonth.get(month);
    const revenueCents = toInt(r?.revenueCents);
    const paidOrders = toInt(r?.paidOrders);
    const prev = rows[rows.length - 1];
    rows.push({
      month,
      isCurrent: month === currentKey,
      revenueCents,
      paidOrders,
      allOrders: r?.allOrders ?? 0,
      aovCents: Math.round(revenueCents / Math.max(paidOrders, 1)),
      momPct: prev ? pctChange(revenueCents, prev.revenueCents) : null,
    });
  }

  const cur = rows[rows.length - 1];
  const prevRevenue = toInt(prevRow?.revenueCents);
  const prevPaid = prevRow?.n ?? 0;

  return {
    rows,
    mtd: {
      month: currentKey,
      prevMonth: monthKey(prevStart),
      prevThroughDay: Math.min(now.getUTCDate(), daysInPrevMonth),
      revenueCents: cur.revenueCents,
      paidOrders: cur.paidOrders,
      pacePct: pctChange(cur.revenueCents, prevRevenue),
      paidOrdersPacePct: pctChange(cur.paidOrders, prevPaid),
    },
  };
}
