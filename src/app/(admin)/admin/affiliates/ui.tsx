// Affiliate-specific pieces; the shared admin primitives live in ../ui.
import { formatUsd } from "@/lib/affiliate/core";
import { affiliatesEnabled } from "@/lib/affiliate/flag";

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

export function fmtBalance(cents: number): string {
  return cents < 0 ? `− ${formatUsd(-cents)}` : formatUsd(cents);
}

// Affiliate links land on /go, the standalone DR page (ADR 0019).
export function refLink(code: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  return `${base}/go?ref=${code}`;
}
