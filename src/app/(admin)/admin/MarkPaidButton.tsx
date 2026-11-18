"use client";

// Confirms a manual payment: emails the customer and ops, and runs the paid side effects.
import { useState, useTransition } from "react";
import { markPaid } from "./actions";

export function MarkPaidButton({ orderId }: { orderId: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onClick() {
    if (!window.confirm("Mark this order paid? The customer gets a payment-confirmed email.")) return;
    setError(null);
    startTransition(async () => {
      const res = await markPaid(orderId);
      if ("error" in res) setError(res.error);
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="rounded-[2px] border border-accent px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-accent transition-colors hover:bg-accent hover:text-white disabled:opacity-50"
      >
        {pending ? "Marking…" : "Mark paid"}
      </button>
      {error && <span className="font-mono text-[11px] text-red-500">{error}</span>}
    </div>
  );
}
