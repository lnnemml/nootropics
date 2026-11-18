"use client";

// Inline status editor. setStatus revalidates /admin, which refreshes the row.
import { useState, useTransition } from "react";
import { setStatus } from "./actions";

const STATUS_OPTIONS = [
  { value: "pending_payment_instructions", label: "Pending instructions" },
  { value: "awaiting_payment", label: "Awaiting payment" },
  { value: "paid", label: "Paid" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "cancelled", label: "Cancelled" },
] as const;

type OrderStatus = (typeof STATUS_OPTIONS)[number]["value"];

export function StatusSelect({ orderId, status }: { orderId: string; status: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as OrderStatus;
    setError(null);
    startTransition(async () => {
      const res = await setStatus(orderId, next);
      if ("error" in res) setError(res.error);
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <select
        value={status}
        onChange={onChange}
        disabled={pending}
        aria-label="Order status"
        className="border border-border bg-page text-ink font-mono text-xs px-2 py-1.5 rounded-[2px] outline-none disabled:opacity-50"
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <span className="font-mono text-[11px] text-red-500">{error}</span>}
    </div>
  );
}
