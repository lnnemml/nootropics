"use client";

// Inline shipping capture: sets tracking, marks the order fulfilled and emails the customer
// (markOrderShipped). Once shipped it shows the carrier and number instead.
import { useState, useTransition } from "react";
import { markOrderShipped } from "@/app/actions/shipping";
import { CARRIER_LABELS } from "@/lib/tracking";

const FIELD =
  "border border-border bg-page text-ink font-mono text-xs px-2 py-1.5 rounded-[2px] outline-none disabled:opacity-50";

export function TrackingForm({
  orderId,
  trackingNumber,
  carrier,
  trackingUrl,
}: {
  orderId: string;
  trackingNumber: string | null;
  carrier: string | null;
  trackingUrl: string | null;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [carr, setCarr] = useState("ukrposhta");
  const [track, setTrack] = useState("");

  if (trackingNumber) {
    const label = `${CARRIER_LABELS[carrier ?? ""] ?? carrier ?? ""} ${trackingNumber}`;
    return trackingUrl ? (
      <a
        href={trackingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] text-accent hover:underline"
      >
        {`Shipped · ${label}`}
      </a>
    ) : (
      <span className="font-mono text-[11px] text-ink/50">{`Shipped · ${label}`}</span>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await markOrderShipped(orderId, carr, track.trim());
      if (res.error) setError(res.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center gap-1.5">
        <select
          value={carr}
          onChange={(e) => setCarr(e.target.value)}
          aria-label="Carrier"
          disabled={pending}
          className={FIELD}
        >
          {Object.entries(CARRIER_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          value={track}
          onChange={(e) => setTrack(e.target.value)}
          placeholder="Tracking #"
          aria-label="Tracking number"
          disabled={pending}
          className={`${FIELD} w-36`}
        />
        <button
          type="submit"
          disabled={pending || !track.trim()}
          className="rounded-[2px] border border-border px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-secondary transition-colors hover:border-accent/50 disabled:opacity-40"
        >
          {pending ? "Saving…" : "Ship"}
        </button>
      </div>
      {error && <span className="font-mono text-[11px] text-red-500">{error}</span>}
    </form>
  );
}
