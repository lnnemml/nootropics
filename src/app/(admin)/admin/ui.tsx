// Presentational pieces shared by every admin page. Server-rendered, no data access.
import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "./actions";

const NAV = [
  { href: "/admin", label: "Orders" },
  { href: "/admin/affiliates", label: "Affiliates" },
  { href: "/admin/campaigns", label: "Campaigns" },
] as const;

export function AdminHeader({ section }: { section: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <p className="font-mono text-xs text-accent uppercase tracking-widest">{`NORA Admin — ${section}`}</p>
      <div className="flex items-center gap-5">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-mono text-xs text-ink/40 hover:text-ink transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <form action={logout}>
          <button type="submit" className="font-mono text-xs text-ink/40 hover:text-ink transition-colors">
            {"Log out"}
          </button>
        </form>
      </div>
    </div>
  );
}

export const TONE_CLASS = {
  success: "text-accent",
  danger: "text-red-500",
  warning: "text-amber-500",
  muted: "text-ink/50",
} as const;

export type Tone = keyof typeof TONE_CLASS;

export function Card({
  label,
  value,
  sub,
  subTone = "muted",
  danger,
}: {
  label: string;
  value: string;
  sub?: string;
  subTone?: Tone;
  danger?: boolean;
}) {
  return (
    <div className="border border-border rounded-[2px] bg-card p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">{label}</div>
      <div className={`mt-1 text-xl font-semibold ${danger ? "text-red-500" : "text-ink"}`}>{value}</div>
      {sub && <div className={`mt-0.5 font-mono text-[11px] ${TONE_CLASS[subTone]}`}>{sub}</div>}
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

export function EmptyRow({ colSpan, children }: { colSpan: number; children: ReactNode }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-8 text-center font-mono text-xs text-ink/30">
        {children}
      </td>
    </tr>
  );
}

export const TABLE_WRAP = "overflow-x-auto border border-border rounded-[2px]";
export const THEAD = "bg-card border-b border-border";
export const TR = "border-b border-border last:border-0";
export const TD = "px-4 py-3 font-mono text-xs text-ink/70";
export const TD_STRONG = "px-4 py-3 font-mono text-xs font-semibold text-ink";

// UTC so a stored UTC midnight never shows as the day before.
export function fmtDate(d: Date): string {
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}
