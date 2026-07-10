"use client";

import { useState, useTransition } from "react";
import { markOrderShipped } from "@/app/actions/shipping";
import { CARRIER_LABELS } from "@/lib/tracking";

export function ShippingForm({ orderId }: { orderId: string }) {
  const [carrier, setCarrier] = useState("ukrposhta");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const canSubmit = carrier !== "" && trackingNumber.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await markOrderShipped(orderId, carrier, trackingNumber.trim());
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="font-mono text-xs text-ink/40 uppercase tracking-widest">
            Carrier
          </label>
          <select
            value={carrier}
            onChange={e => setCarrier(e.target.value)}
            className="border border-border bg-page text-ink font-mono text-sm px-3 py-2 rounded-[2px] outline-none"
          >
            {Object.entries(CARRIER_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 min-w-[200px] flex-1">
          <label className="font-mono text-xs text-ink/40 uppercase tracking-widest">
            Tracking number
          </label>
          <input
            type="text"
            value={trackingNumber}
            onChange={e => setTrackingNumber(e.target.value)}
            placeholder="e.g. UA123456789UA"
            className="border border-border bg-page text-ink font-mono text-sm px-3 py-2 rounded-[2px] outline-none w-full"
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit || isPending}
          className="bg-ink text-page font-mono text-xs px-4 py-2 rounded-[2px] hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving…" : "Mark as shipped"}
        </button>
      </div>
      {error && (
        <p className="font-mono text-xs text-red-500 mt-3">{error}</p>
      )}
    </form>
  );
}
