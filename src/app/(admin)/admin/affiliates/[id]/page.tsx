import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import {
  getAffiliateDetail,
  type AdminAffiliate,
  type AdminAffiliatePayout,
} from "@/lib/affiliate/admin-queries";
import {
  commissionState,
  formatBpsAsPercent,
  formatUsd,
  toDateInputValue,
  type AffiliateInput,
  type CommissionState,
} from "@/lib/affiliate/core";
import { txExplorerUrl } from "@/lib/affiliate/explorer";
import { isAdminAuthed } from "@/lib/auth";
import Link from "next/link";
import { AffiliateForm } from "../AffiliateForm";
import { Card, FlagNotice, SectionHeading, Th, TopBar, fmtBalance, fmtDate, refLink } from "../ui";
import { AffiliateControls } from "./AffiliateControls";
import { PayoutForm } from "./PayoutForm";

export const metadata: Metadata = {
  title: "Affiliate",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATE_CHIP: Record<CommissionState, string> = {
  pending: "text-amber-500",
  earned: "text-accent",
  void: "text-ink/30",
};

function TxHash({ payout }: { payout: AdminAffiliatePayout }) {
  const url = txExplorerUrl(payout.cryptoCurrency, payout.txHash);
  if (!url) return <span className="break-all font-mono text-ink/60">{payout.txHash}</span>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="break-all font-mono text-accent hover:underline">
      {payout.txHash}
    </a>
  );
}

function toFormValues(affiliate: AdminAffiliate): AffiliateInput {
  return {
    name: affiliate.name,
    handle: affiliate.handle ?? "",
    code: affiliate.code,
    commissionPercent: formatBpsAsPercent(affiliate.commissionRateBps),
    discountPercent: formatBpsAsPercent(affiliate.customerDiscountBps),
    notifyEmail: affiliate.notifyEmail ?? "",
    telegramChatId: affiliate.notifyTelegramChatId ?? "",
  };
}

const PANEL = "border border-border rounded-[2px] bg-card p-5";
const TD = "px-4 py-3 font-mono text-xs text-ink/70";

export default async function AdminAffiliatePage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthed())) redirect("/admin/login");

  const { id } = await params;
  const detail = await getAffiliateDetail(id);
  if (!detail) notFound();

  const { affiliate, stats, orders, payouts } = detail;
  const link = refLink(affiliate.code);

  return (
    <main className="min-h-screen bg-page p-8">
      <div className="max-w-[1300px] mx-auto">
        <TopBar section={`Affiliates — ${affiliate.name}`} backHref="/admin/affiliates" backLabel="← Affiliates" />
        <FlagNotice />
        {!affiliate.isActive && (
          <p className="mt-1 font-mono text-xs text-red-500">
            {"This affiliate is inactive. Their code and link are ignored at checkout."}
          </p>
        )}

        <SectionHeading>{"Stats"}</SectionHeading>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <Card label="Clicks" value={String(stats.clicks)} />
          <Card label="Attributed orders" value={String(stats.attributedOrders)} />
          <Card label="Earned orders" value={String(stats.earnedOrders)} />
          <Card label="Earned commission" value={formatUsd(stats.earnedCents)} />
          <Card label="Paid out" value={formatUsd(stats.paidOutCents)} />
          <Card label="Balance" value={fmtBalance(stats.balanceCents)} danger={stats.balanceCents < 0} />
        </div>

        <SectionHeading>{"Access"}</SectionHeading>
        <div className={`${PANEL} flex flex-col gap-4`}>
          <div className="flex items-center justify-between gap-3">
            <span className="break-all font-mono text-xs text-ink/60">{link}</span>
            <CopyButton value={link} label="Copy ref link" />
          </div>
          <AffiliateControls affiliateId={affiliate.id} isActive={affiliate.isActive} />
        </div>

        <SectionHeading>{"Details"}</SectionHeading>
        <div className={PANEL}>
          <AffiliateForm affiliateId={affiliate.id} initial={toFormValues(affiliate)} />
          <p className="mt-3 font-mono text-[11px] text-ink/50">
            {"A new rate applies to new orders only; existing orders keep their snapshot. A new code stops the old link and code working."}
          </p>
        </div>

        <SectionHeading>{"Record payout"}</SectionHeading>
        <div className={PANEL}>
          <PayoutForm
            affiliateId={affiliate.id}
            balanceCents={stats.balanceCents}
            balanceLabel={fmtBalance(stats.balanceCents)}
            today={toDateInputValue(new Date())}
          />
          <p className="mt-3 font-mono text-[11px] text-ink/50">
            {"Payouts cannot be edited or deleted once recorded."}
          </p>
        </div>

        <SectionHeading>{`Payouts (${payouts.length})`}</SectionHeading>
        <div className="overflow-x-auto border border-border rounded-[2px]">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="bg-card border-b border-border">
              <tr>
                <Th>{"Paid"}</Th>
                <Th>{"Period"}</Th>
                <Th right>{"Amount"}</Th>
                <Th>{"Currency"}</Th>
                <Th right>{"Crypto amount"}</Th>
                <Th>{"Tx hash"}</Th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr key={payout.id} className="border-b border-border last:border-0 align-top">
                  <td className={`${TD} whitespace-nowrap`}>{fmtDate(payout.paidAt)}</td>
                  <td className={`${TD} whitespace-nowrap`}>
                    {`${fmtDate(payout.periodStart)} – ${fmtDate(payout.periodEnd)}`}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-ink">
                    {formatUsd(payout.amountCents)}
                  </td>
                  <td className={TD}>{payout.cryptoCurrency}</td>
                  <td className={`${TD} text-right`}>{payout.cryptoAmount}</td>
                  <td className="px-4 py-3 text-xs">
                    <TxHash payout={payout} />
                  </td>
                </tr>
              ))}
              {payouts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center font-mono text-xs text-ink/30">
                    {"No payouts yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <SectionHeading>{`Attributed orders (${orders.length})`}</SectionHeading>
        <div className="overflow-x-auto border border-border rounded-[2px]">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="bg-card border-b border-border">
              <tr>
                <Th>{"Order"}</Th>
                <Th>{"Date"}</Th>
                <Th right>{"Total"}</Th>
                <Th right>{"Commission"}</Th>
                <Th>{"Source"}</Th>
                <Th>{"Order status"}</Th>
                <Th>{"Commission"}</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const state = commissionState(order.status);
                return (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <Link href={`/admin/orders/${order.id}`} className="font-mono text-xs text-accent hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className={`${TD} whitespace-nowrap`}>{fmtDate(order.createdAt)}</td>
                    <td className={`${TD} text-right`}>{formatUsd(order.totalPrice)}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-ink">
                      {formatUsd(order.commissionAmountCents ?? 0)}
                    </td>
                    <td className={TD}>{order.attributionSource ?? "—"}</td>
                    <td className={TD}>{order.status.replace(/_/g, " ")}</td>
                    <td className={`px-4 py-3 font-mono text-xs uppercase ${STATE_CHIP[state]}`}>{state}</td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center font-mono text-xs text-ink/30">
                    {"No attributed orders yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
