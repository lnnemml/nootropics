// Presentational pieces shared by the two affiliate admin pages. Server-rendered, no data access.
import Link from "next/link";
import type { ReactNode } from "react";
import { formatUsd } from "@/lib/affiliate/core";
import { affiliatesEnabled } from "@/lib/affiliate/flag";

export function TopBar({
  section,
  backHref,
  backLabel,
}: {
  section: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <p className="font-mono text-xs text-accent uppercase tracking-widest">{`NORA Admin — ${section}`}</p>
      <Link href={backHref} className="font-mono text-xs text-ink/40 hover:text-ink transition-colors">
        {backLabel}
      </Link>
    </div>
  );
}

export function FlagNotice() {
  const enabled = affiliatesEnabled();
  // Presence only: neither value goes past these lines.
  const missingHashSecret = !process.env.AFFILIATE_HASH_SECRET?.trim();
  const missingBotToken = !process.env.TELEGRAM_BOT_TOKEN?.trim();

  return (
    <div className="flex flex-col gap-1">
      <p className={`font-mono text-xs ${enabled ? "text-accent" : "text-amber-500"}`}>
        {enabled
          ? "AFFILIATES_ENABLED is on: ref links, codes and partner sign-in are live."
          : "AFFILIATES_ENABLED is off: you can set affiliates up here, but ref links, codes and partner sign-in do nothing until it is on."}
      </p>
      {enabled && missingHashSecret && (
        <p className="font-mono text-xs text-amber-500">
          {"AFFILIATE_HASH_SECRET is empty: clicks won't be recorded and partner login by email won't work."}
        </p>
      )}
      {enabled && missingBotToken && (
        <p className="font-mono text-xs text-amber-500">
          {"TELEGRAM_BOT_TOKEN is empty: Telegram notifications won't work (email still will)."}
        </p>
      )}
    </div>
  );
}

export function Card({
  label,
  value,
  sub,
  danger,
}: {
  label: string;
  value: string;
  sub?: string;
  danger?: boolean;
}) {
  return (
    <div className="border border-border rounded-[2px] bg-card p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">{label}</div>
      <div className={`mt-1 text-xl font-semibold ${danger ? "text-red-500" : "text-ink"}`}>{value}</div>
      {sub && <div className="mt-0.5 font-mono text-[11px] text-ink/50">{sub}</div>}
    </div>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
      {children}
    </h2>
  );
}

export function Th({ children, right }: { children: ReactNode; right?: boolean }) {
  return (
    <th
      className={`whitespace-nowrap px-4 py-3 font-mono text-xs font-normal text-ink/50 ${
        right ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

// UTC: payout dates are stored as a UTC midnight, so a local format could show the day before.
export function fmtDate(d: Date): string {
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}

export function fmtBalance(cents: number): string {
  return cents < 0 ? `− ${formatUsd(-cents)}` : formatUsd(cents);
}

// Affiliate links land on /go, the standalone DR page (ADR 0019).
export function refLink(code: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  return `${base}/go?ref=${code}`;
}
