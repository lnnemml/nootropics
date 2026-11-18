import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import { listAffiliatesWithStats } from "@/lib/affiliate/admin-queries";
import { computeTotalOwedCents, formatBpsAsPercent, formatUsd } from "@/lib/affiliate/core";
import { isAdminAuthed } from "@/lib/admin/auth";
import { AffiliateForm } from "./AffiliateForm";
import { AdminHeader, Card, SectionHeading, Th } from "../ui";
import { FlagNotice, fmtBalance, refLink } from "./ui";

export const metadata: Metadata = {
  title: "Affiliates",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAffiliatesPage() {
  // Defense-in-depth: middleware gates /admin, and this re-checks the session.
  if (!(await isAdminAuthed())) redirect("/admin/login");

  const rows = await listAffiliatesWithStats();

  const balances = rows.map((row) => row.stats.balanceCents);
  const owedCount = balances.filter((balance) => balance > 0).length;
  const activeCount = rows.filter((row) => row.isActive).length;

  return (
    <main className="min-h-screen bg-page p-8">
      <div className="max-w-[1300px] mx-auto">
        <AdminHeader section="Affiliates" />
        <FlagNotice />

        <SectionHeading>{"Payout run"}</SectionHeading>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Card
            label="Total owed"
            value={formatUsd(computeTotalOwedCents(balances))}
            sub={`${owedCount} with a positive balance`}
          />
          <Card label="Affiliates" value={String(rows.length)} sub={`${activeCount} active`} />
        </div>

        <SectionHeading>{`Affiliates (${rows.length})`}</SectionHeading>
        <div className="overflow-x-auto border border-border rounded-[2px]">
          <table className="w-full min-w-[1180px] text-sm">
            <thead className="bg-card border-b border-border">
              <tr>
                <Th>{"Affiliate"}</Th>
                <Th>{"Code"}</Th>
                <Th right>{"Rate"}</Th>
                <Th right>{"Clicks"}</Th>
                <Th right>{"Attributed"}</Th>
                <Th right>{"Earned orders"}</Th>
                <Th right>{"Earned"}</Th>
                <Th right>{"Paid out"}</Th>
                <Th right>{"Balance"}</Th>
                <Th>{"Ref link"}</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const link = refLink(row.code);
                return (
                  <tr key={row.id} className="border-b border-border last:border-0 align-top hover:bg-card/50 transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/affiliates/${row.id}`}
                        className="text-ink font-medium hover:text-accent transition-colors"
                      >
                        {row.name}
                      </Link>
                      <div className="font-mono text-[11px] text-ink/40">
                        {[row.handle, row.isActive ? null : "Inactive"].filter(Boolean).join(" · ") || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-ink">{row.code}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs text-ink/70">
                      {`${formatBpsAsPercent(row.commissionRateBps)}% / ${formatBpsAsPercent(row.customerDiscountBps)}%`}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-ink/70">{row.stats.clicks}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-ink/70">{row.stats.attributedOrders}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-ink/70">{row.stats.earnedOrders}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-ink/70">{formatUsd(row.stats.earnedCents)}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-ink/70">{formatUsd(row.stats.paidOutCents)}</td>
                    <td
                      className={`whitespace-nowrap px-4 py-3 text-right font-mono text-xs font-semibold ${
                        row.stats.balanceCents < 0 ? "text-red-500" : "text-ink"
                      }`}
                    >
                      {fmtBalance(row.stats.balanceCents)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="break-all font-mono text-[11px] text-ink/60">{link}</span>
                        <CopyButton value={link} label={`Copy ref link for ${row.name}`} />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center font-mono text-xs text-ink/30">
                    {"No affiliates yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-2 font-mono text-[11px] text-ink/50">
          {"Rate is commission / buyer discount. Earned counts paid and fulfilled orders only."}
        </p>

        <SectionHeading>{"New affiliate"}</SectionHeading>
        <div className="border border-border rounded-[2px] bg-card p-5">
          <AffiliateForm />
        </div>
      </div>
    </main>
  );
}
