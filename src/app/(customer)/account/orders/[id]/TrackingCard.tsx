"use client";

import { useState } from "react";

interface TrackingCardProps {
  trackingNumber: string;
  carrierLabel: string;
  trackingUrl: string | null;
  shippedAt: Date | null;
}

export function TrackingCard({
  trackingNumber,
  carrierLabel,
  trackingUrl,
  shippedAt,
}: TrackingCardProps) {
  const [copied, setCopied] = useState(false);

  async function copyTracking() {
    await navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-4 border border-border rounded-[2px] bg-card p-5">
      <p className="font-mono text-[10px] text-ink/40 uppercase tracking-widest mb-4">
        Shipment tracking
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-xs text-ink/40 shrink-0">Carrier</span>
          <span className="font-mono text-xs text-ink/80">{carrierLabel}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-ink/40 shrink-0">Tracking number</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink/80">{trackingNumber}</span>
            <button
              onClick={copyTracking}
              className="font-mono text-[10px] text-ink/40 hover:text-ink transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {shippedAt && (
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-xs text-ink/40 shrink-0">Shipped</span>
            <span className="font-mono text-xs text-ink/80">
              {new Date(shippedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        )}

        {trackingUrl && (
          <a
            href={trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline mt-1 inline-block"
          >
            Track package →
          </a>
        )}
      </div>
    </div>
  );
}
