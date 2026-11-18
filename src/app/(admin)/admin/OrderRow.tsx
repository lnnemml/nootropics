"use client";

// One expandable orders-table row. Money arrives pre-formatted from the server page.
import Link from "next/link";
import { useState } from "react";
import { MarkPaidButton } from "./MarkPaidButton";
import { StatusSelect } from "./StatusSelect";
import { TrackingForm } from "./TrackingForm";

export interface OrderRowData {
  id: string;
  orderNumber: string;
  dateLabel: string;
  name: string;
  email: string;
  itemsSummary: string;
  totalLabel: string;
  paymentMethod: string;
  status: string;
  trafficLabel: string;
  utmLabel: string;
  affiliateCode: string | null;
  trackingNumber: string | null;
  trackingCarrier: string | null;
  trackingUrl: string | null;
  showMarkPaid: boolean;
  shipTo: string;
  phone: string;
  note: string | null;
}

export function OrderRow({ row }: { row: OrderRowData }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="border-b border-border align-top hover:bg-card/50 transition-colors">
        <td className="px-4 py-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="text-left font-mono text-xs text-accent hover:underline"
          >
            {open ? "▾ " : "▸ "}
            {row.orderNumber}
          </button>
          <div className="font-mono text-[11px] text-ink/40">{row.dateLabel}</div>
        </td>
        <td className="px-4 py-3">
          <div className="text-sm text-ink">{row.name}</div>
          <div className="font-mono text-[11px] text-ink/50">{row.email}</div>
        </td>
        <td className="px-4 py-3 font-mono text-xs text-ink/70">{row.itemsSummary}</td>
        <td className="px-4 py-3">
          <div className="font-mono text-xs font-semibold text-ink">{row.totalLabel}</div>
          <div className="font-mono text-[11px] text-ink/40">{row.paymentMethod}</div>
        </td>
        <td className="px-4 py-3">
          <span className="inline-block rounded-[2px] bg-raised px-1.5 py-0.5 font-mono text-[11px] text-ink/70">
            {row.trafficLabel}
          </span>
          <div className="mt-0.5 font-mono text-[11px] text-ink/40">{row.utmLabel}</div>
          {row.affiliateCode && (
            <div className="mt-0.5 font-mono text-[11px] text-accent">{`partner ${row.affiliateCode}`}</div>
          )}
        </td>
        <td className="px-4 py-3">
          <StatusSelect orderId={row.id} status={row.status} />
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1.5">
            {row.showMarkPaid && <MarkPaidButton orderId={row.id} />}
            <TrackingForm
              orderId={row.id}
              trackingNumber={row.trackingNumber}
              carrier={row.trackingCarrier}
              trackingUrl={row.trackingUrl}
            />
          </div>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-border bg-card">
          <td colSpan={7} className="px-4 py-3">
            <div className="grid gap-x-8 gap-y-1 font-mono text-[11px] text-ink/60 sm:grid-cols-2">
              <div>
                <span className="text-ink">{"Ship to: "}</span>
                {row.shipTo}
              </div>
              <div>
                <span className="text-ink">{"Phone: "}</span>
                {row.phone}
              </div>
              {row.note && (
                <div className="sm:col-span-2">
                  <span className="text-ink">{"Note: "}</span>
                  {row.note}
                </div>
              )}
              <div>
                <Link href={`/admin/orders/${row.id}`} className="text-accent hover:underline">
                  {"Full order details →"}
                </Link>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
