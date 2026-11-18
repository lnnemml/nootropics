import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { CopyButton } from "@/components/CopyButton";
import { formatUsd, type CommissionState } from "@/lib/affiliate/core";
import { txExplorerUrl } from "@/lib/affiliate/explorer";
import {
  COMMISSION_STATE_LABEL,
  getPartnerDashboard,
  type PartnerPayout,
} from "@/lib/affiliate/partner-queries";
import { destroyPartnerSession, requireAffiliate } from "@/lib/affiliate/session";

export const metadata: Metadata = {
  title: "Partner dashboard",
};

const BPS_PER_PERCENT = 100;

async function signOut() {
  "use server";
  await destroyPartnerSession();
  redirect("/partner/login");
}

// UTC, matching the notifications and the CSV.
function fmtDate(d: Date): string {
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}

function fmtBalance(cents: number): string {
  return cents < 0 ? `− ${formatUsd(-cents)}` : formatUsd(cents);
}

function fmtConversion(rate: number | null): string {
  return rate === null ? "—" : `${(rate * 100).toFixed(1)}%`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-[2px] bg-card p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">{label}</div>
      <div className="mt-1 text-xl font-semibold text-ink">{value}</div>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
      {children}
    </h2>
  );
}

function Th({ children, right }: { children: ReactNode; right?: boolean }) {
  return (
    <th
      className={`px-4 py-3 font-mono text-xs font-normal text-ink/50 ${right ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}

function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="border border-border rounded-[2px] bg-card px-4 py-10 text-center font-mono text-xs text-ink/40">
      {children}
    </div>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">{label}</div>
        <div className="mt-0.5 break-all font-mono text-sm text-ink">{value}</div>
      </div>
      <CopyButton value={value} label={`Copy ${label.toLowerCase()}`} />
    </div>
  );
}

const STATE_CLASS: Record<CommissionState, string> = {
  pending: "text-amber-500",
  earned: "text-accent",
  void: "text-ink/30",
};

function TxHash({ payout }: { payout: PartnerPayout }) {
  const url = txExplorerUrl(payout.cryptoCurrency, payout.txHash);
  if (!url) return <span className="break-all font-mono text-ink/60">{payout.txHash}</span>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="break-all font-mono text-accent hover:underline">
      {payout.txHash}
    </a>
  );
}

export default async function PartnerDashboardPage() {
  const affiliate = await requireAffiliate();
  const { summary, orders, payouts } = await getPartnerDashboard(affiliate.id);

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const refLink = `${base}/go?ref=${affiliate.code}`;
  const commissionPct = affiliate.commissionRateBps / BPS_PER_PERCENT;
  const discountPct = affiliate.customerDiscountBps / BPS_PER_PERCENT;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-widest">{"NORA Partners"}</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">{"Partner dashboard"}</h1>
          <p className="mt-1 font-mono text-xs text-secondary">
            {affiliate.handle ? `${affiliate.name} · ${affiliate.handle}` : affiliate.name}
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="font-mono text-xs text-ink/40 hover:text-ink transition-colors"
          >
            {"Sign out"}
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        <Stat label="Clicks" value={summary.clicks.toLocaleString("en-US")} />
        <Stat label="Attributed orders" value={summary.attributedOrders.toLocaleString("en-US")} />
        <Stat label="Conversion rate" value={fmtConversion(summary.conversionRate)} />
        <Stat label="Earned commission" value={formatUsd(summary.earnedCents)} />
        <Stat label="Paid out" value={formatUsd(summary.paidOutCents)} />
        <Stat label="Current balance" value={fmtBalance(summary.balanceCents)} />
      </div>

      <SectionHeading>{"Your link and code"}</SectionHeading>
      <div className="divide-y divide-border border border-border rounded-[2px] bg-card">
        <CopyRow label="Referral link" value={refLink} />
        <CopyRow label="Code" value={affiliate.code} />
      </div>
      <p className="mt-3 text-sm text-secondary">
        {`You earn ${commissionPct}% of the total of every paid order. Buyers who use your link or code get ${discountPct}% off, and discounts do not stack.`}
      </p>

      <div className="mb-3 mt-10 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">{"Orders"}</h2>
        <a href="/partner/orders.csv" className="font-mono text-xs text-accent hover:underline">
          {"Download CSV"}
        </a>
      </div>
      {orders.length === 0 ? (
        <EmptyState>{"No attributed orders yet."}</EmptyState>
      ) : (
        <div className="overflow-x-auto border border-border rounded-[2px]">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="bg-card border-b border-border">
              <tr>
                <Th>{"Order"}</Th>
                <Th>{"Date"}</Th>
                <Th right>{"Amount"}</Th>
                <Th right>{"Commission"}</Th>
                <Th>{"Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={`${order.orderNumber}-${index}`} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-ink">{order.orderNumber}</td>
                  <td className="px-4 py-3 font-mono text-xs text-ink/60">{fmtDate(order.createdAt)}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-ink/60">{formatUsd(order.totalPrice)}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-ink">
                    {formatUsd(order.commissionAmountCents)}
                  </td>
                  <td className={`px-4 py-3 font-mono text-xs uppercase ${STATE_CLASS[order.status]}`}>
                    {COMMISSION_STATE_LABEL[order.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <SectionHeading>{"Payouts"}</SectionHeading>
      {payouts.length === 0 ? (
        <EmptyState>{"No payouts yet."}</EmptyState>
      ) : (
        <div className="overflow-x-auto border border-border rounded-[2px]">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="bg-card border-b border-border">
              <tr>
                <Th>{"Date"}</Th>
                <Th>{"Period"}</Th>
                <Th right>{"Amount"}</Th>
                <Th>{"Currency"}</Th>
                <Th right>{"Crypto amount"}</Th>
                <Th>{"Transaction"}</Th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr key={payout.txHash} className="border-b border-border last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink/60">{fmtDate(payout.paidAt)}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink/60">
                    {`${fmtDate(payout.periodStart)} – ${fmtDate(payout.periodEnd)}`}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-ink">
                    {formatUsd(payout.amountCents)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink/60">{payout.cryptoCurrency}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-ink/60">{payout.cryptoAmount}</td>
                  <td className="px-4 py-3 text-xs">
                    <TxHash payout={payout} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
