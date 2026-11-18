import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin/auth";
import {
  biSummary,
  groupByCustomer,
  listOrders,
  monthlyRevenue,
  type AdminOrderRow,
  type BreakdownRow,
} from "@/lib/admin/queries";
import { formatUsd } from "@/lib/affiliate/core";
import { getProduct } from "@/lib/copy/products";
import { getTrackingUrl } from "@/lib/tracking";
import { OrderRow, type OrderRowData } from "./OrderRow";
import {
  AdminHeader,
  Card,
  EmptyRow,
  SectionHeading,
  TABLE_WRAP,
  TD,
  TD_STRONG,
  THEAD,
  TONE_CLASS,
  TR,
  Th,
  fmtDate,
  type Tone,
} from "./ui";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Reads the whole orders table (PII). It used to be prerendered at build time, which froze the
// list until a status change or redeploy.
export const dynamic = "force-dynamic";

function monthDate(key: string): Date {
  const [yy, mm] = key.split("-").map(Number);
  return new Date(Date.UTC(yy, mm - 1, 1));
}

function monthLabel(key: string, opts: Intl.DateTimeFormatOptions): string {
  return monthDate(key).toLocaleDateString("en-GB", { ...opts, timeZone: "UTC" });
}

function pctLabel(p: number | null): string {
  if (p == null) return "—";
  const r = Math.round(p);
  if (r > 0) return `+${r}%`;
  if (r < 0) return `−${Math.abs(r)}%`;
  return "0%";
}

function pctTone(p: number | null): Tone {
  if (p == null) return "muted";
  const r = Math.round(p);
  return r > 0 ? "success" : r < 0 ? "danger" : "muted";
}

const CLIENT_TYPE_CLASS = {
  regular: "text-accent",
  client: "text-ink/70",
  lead: "text-ink/40",
} as const;

function toRowData(o: AdminOrderRow): OrderRowData {
  const product = getProduct(o.productSlug)?.name ?? o.productSlug;
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    dateLabel: fmtDate(o.createdAt),
    name: o.name,
    email: o.email,
    itemsSummary: `${product} × ${o.quantity}`,
    totalLabel: formatUsd(o.totalPriceCents),
    paymentMethod: o.paymentMethod,
    status: o.status,
    trafficLabel: o.trafficType?.trim() || "direct",
    utmLabel: o.utmSource?.trim() || "—",
    affiliateCode: o.affiliateCode,
    trackingNumber: o.trackingNumber,
    trackingCarrier: o.trackingCarrier,
    trackingUrl:
      o.trackingCarrier && o.trackingNumber ? getTrackingUrl(o.trackingCarrier, o.trackingNumber) : null,
    showMarkPaid: o.status === "pending_payment_instructions" || o.status === "awaiting_payment",
    shipTo: [o.address, o.city, o.stateRegion, o.postalCode, o.country].filter(Boolean).join(", "),
    phone: o.phone,
    note: o.note,
  };
}

function BreakdownTable({
  title,
  rows,
  fallback,
}: {
  title: string;
  rows: BreakdownRow[];
  fallback: string;
}) {
  return (
    <div className={TABLE_WRAP}>
      <table className="w-full text-sm">
        <thead className={THEAD}>
          <tr>
            <Th>{title}</Th>
            <Th right>{"Orders"}</Th>
            <Th right>{"Paid revenue"}</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.key}-${i}`} className={TR}>
              <td className="px-4 py-3 font-mono text-xs text-ink">{r.key?.trim() || fallback}</td>
              <td className={`${TD} text-right`}>{r.orders}</td>
              <td className={`${TD_STRONG} text-right`}>{formatUsd(r.revenueCents)}</td>
            </tr>
          ))}
          {rows.length === 0 && <EmptyRow colSpan={3}>{"No data"}</EmptyRow>}
        </tbody>
      </table>
    </div>
  );
}

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");

  const [bi, orders, customers, monthly] = await Promise.all([
    biSummary(),
    listOrders(),
    groupByCustomer(),
    monthlyRevenue(),
  ]);

  const { mtd } = monthly;
  const maxMonthRevenue = Math.max(...monthly.rows.map((r) => r.revenueCents), 0);
  const mtdCompare = `${monthLabel(mtd.prevMonth, { month: "short" })} 1–${mtd.prevThroughDay}`;
  const rows = orders.map(toRowData);
  const buyers = customers.filter((c) => c.paidOrderCount >= 1).length;
  const repeat = customers.filter((c) => c.paidOrderCount >= 2).length;
  const lifetimeRevenue = customers.reduce((n, c) => n + c.revenueCents, 0);

  return (
    <main className="min-h-screen bg-page p-8">
      <div className="max-w-[1300px] mx-auto">
        <AdminHeader section="Orders" />

        <SectionHeading>{`Last ${bi.windowDays} days`}</SectionHeading>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          <Card label="Revenue" value={formatUsd(bi.revenueCents)} sub="paid + fulfilled" />
          <Card label="Orders" value={String(bi.orders)} sub="all statuses" />
          <Card label="AOV" value={formatUsd(bi.aovCents)} sub="per paid order" />
          <Card
            label="Paid / Unpaid"
            value={`${bi.paid} / ${bi.unpaid}`}
            sub={bi.paid > 0 ? `${bi.unpaidToPaidRatio.toFixed(2)}× unpaid/paid` : "no paid orders"}
          />
          <Card
            label="Needs action"
            value={`${bi.awaitingPayment} · ${bi.awaitingShipment}`}
            sub="awaiting payment · awaiting shipment"
            subTone={bi.awaitingShipment > 0 ? "warning" : "muted"}
          />
        </div>

        <SectionHeading>{"Revenue by month"}</SectionHeading>
        <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          <Card
            label={`${monthLabel(mtd.month, { month: "long" })} so far`}
            value={formatUsd(mtd.revenueCents)}
            sub={`vs ${mtdCompare}: ${pctLabel(mtd.pacePct)}`}
            subTone={pctTone(mtd.pacePct)}
          />
          <Card
            label={`${monthLabel(mtd.month, { month: "long" })} paid orders`}
            value={String(mtd.paidOrders)}
            sub={`vs ${mtdCompare}: ${pctLabel(mtd.paidOrdersPacePct)}`}
            subTone={pctTone(mtd.paidOrdersPacePct)}
          />
        </div>
        <div className={TABLE_WRAP}>
          <table className="w-full min-w-[760px] text-sm">
            <thead className={THEAD}>
              <tr>
                <Th>{"Month"}</Th>
                <Th right>{"Revenue"}</Th>
                <Th right>{"Paid orders"}</Th>
                <Th right>{"All orders"}</Th>
                <Th right>{"AOV"}</Th>
                <Th right>{"Δ MoM"}</Th>
                <Th>{"Trend"}</Th>
              </tr>
            </thead>
            <tbody>
              {monthly.rows.map((r) => (
                <tr key={r.month} className={TR}>
                  <td className="px-4 py-3 font-mono text-xs text-ink">
                    {monthLabel(r.month, { month: "short", year: "numeric" })}
                    {r.isCurrent && <span className="text-ink/40">{" · MTD"}</span>}
                  </td>
                  <td className={`${TD_STRONG} text-right`}>{formatUsd(r.revenueCents)}</td>
                  <td className={`${TD} text-right`}>{r.paidOrders}</td>
                  <td className={`${TD} text-right`}>{r.allOrders}</td>
                  <td className={`${TD} text-right`}>{formatUsd(r.aovCents)}</td>
                  <td
                    className={`px-4 py-3 text-right font-mono text-xs ${
                      r.isCurrent ? "text-ink/50" : TONE_CLASS[pctTone(r.momPct)]
                    }`}
                  >
                    {pctLabel(r.momPct)}
                    {r.isCurrent && <span className="text-ink/40">{" (partial)"}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-2 w-full min-w-[120px] overflow-hidden rounded-full bg-raised">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${maxMonthRevenue > 0 ? (r.revenueCents / maxMonthRevenue) * 100 : 0}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 font-mono text-[11px] text-ink/50">
          {"Booked by order date (UTC). Revenue counts paid and fulfilled orders."}
        </p>

        <SectionHeading>{`Attribution (last ${bi.windowDays} days)`}</SectionHeading>
        <div className="grid gap-4 lg:grid-cols-2">
          <BreakdownTable title="Traffic type" rows={bi.byTrafficType} fallback="direct" />
          <BreakdownTable title="Top UTM source" rows={bi.byUtmSource} fallback="—" />
          <BreakdownTable title="Affiliate" rows={bi.byAffiliate} fallback="—" />
          <BreakdownTable title="Country" rows={bi.byCountry} fallback="—" />
        </div>

        <SectionHeading>{`Top products (last ${bi.windowDays} days)`}</SectionHeading>
        <div className={TABLE_WRAP}>
          <table className="w-full text-sm">
            <thead className={THEAD}>
              <tr>
                <Th>{"Product"}</Th>
                <Th right>{"Units"}</Th>
                <Th right>{"Paid revenue"}</Th>
              </tr>
            </thead>
            <tbody>
              {bi.topProducts.map((p) => (
                <tr key={p.productSlug} className={TR}>
                  <td className="px-4 py-3 text-sm text-ink">{p.name}</td>
                  <td className={`${TD} text-right`}>{p.units}</td>
                  <td className={`${TD_STRONG} text-right`}>{formatUsd(p.revenueCents)}</td>
                </tr>
              ))}
              {bi.topProducts.length === 0 && <EmptyRow colSpan={3}>{"No paid orders yet."}</EmptyRow>}
            </tbody>
          </table>
        </div>

        <SectionHeading>{`Orders (${rows.length})`}</SectionHeading>
        <div className={TABLE_WRAP}>
          <table className="w-full min-w-[1100px] text-sm">
            <thead className={THEAD}>
              <tr>
                <Th>{"Order"}</Th>
                <Th>{"Customer"}</Th>
                <Th>{"Items"}</Th>
                <Th>{"Total"}</Th>
                <Th>{"Attribution"}</Th>
                <Th>{"Status"}</Th>
                <Th>{"Fulfilment"}</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <OrderRow key={r.id} row={r} />
              ))}
              {rows.length === 0 && <EmptyRow colSpan={7}>{"No orders yet."}</EmptyRow>}
            </tbody>
          </table>
        </div>

        <SectionHeading>{`Customers (${customers.length})`}</SectionHeading>
        <p className="mb-3 -mt-1 font-mono text-[11px] text-ink/50">
          {`${buyers} buyers · ${repeat} repeat · ${formatUsd(lifetimeRevenue)} lifetime paid revenue`}
        </p>
        <div className={TABLE_WRAP}>
          <table className="w-full min-w-[860px] text-sm">
            <thead className={THEAD}>
              <tr>
                <Th>{"Email"}</Th>
                <Th>{"Name"}</Th>
                <Th>{"Country"}</Th>
                <Th>{"Type"}</Th>
                <Th right>{"Orders"}</Th>
                <Th right>{"LTV"}</Th>
                <Th>{"First order"}</Th>
                <Th>{"Last order"}</Th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email} className={TR}>
                  <td className="px-4 py-3 font-mono text-xs text-ink">{c.email}</td>
                  <td className="px-4 py-3 text-sm text-ink/70">{c.name}</td>
                  <td className={TD}>{c.country ?? "—"}</td>
                  <td className={`px-4 py-3 font-mono text-[11px] uppercase ${CLIENT_TYPE_CLASS[c.clientType]}`}>
                    {c.clientType}
                  </td>
                  <td className={`${TD} text-right`}>
                    {c.orderCount}
                    {c.paidOrderCount !== c.orderCount && (
                      <span className="text-ink/40">{` (${c.paidOrderCount} paid)`}</span>
                    )}
                  </td>
                  <td className={`${TD_STRONG} text-right`}>{formatUsd(c.revenueCents)}</td>
                  <td className={TD}>{c.firstOrderAt ? fmtDate(c.firstOrderAt) : "—"}</td>
                  <td className={TD}>{c.lastOrderAt ? fmtDate(c.lastOrderAt) : "—"}</td>
                </tr>
              ))}
              {customers.length === 0 && <EmptyRow colSpan={8}>{"No customers yet."}</EmptyRow>}
            </tbody>
          </table>
        </div>
        <p className="mt-2 font-mono text-[11px] text-ink/50">
          {"Type: regular = 2+ paid orders, client = 1, lead = ordered but never paid."}
        </p>
      </div>
    </main>
  );
}
