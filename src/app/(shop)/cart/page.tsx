"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/useCart";

export default function CartPage() {
  const { items, itemCount, removeItem, setQty } = useCart();

  if (itemCount === 0) {
    return (
      <section className="flex flex-col items-center justify-center px-4 py-[104px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
          {"Your cart"}
        </p>
        <h1 className="mt-4 font-sans text-[32px] font-semibold tracking-[-0.02em] text-ink">
          {"Nothing here yet."}
        </h1>
        <p className="mt-3 font-sans text-[15px] text-secondary">
          {"Ready to add something?"}
        </p>
        <Link
          href="/products/neurodrive"
          className="mt-6 inline-block rounded border border-border px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent hover:text-accent"
        >
          {"View NeuroDrive →"}
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
        {"Your cart"}
      </p>
      <h1 className="mt-3 font-sans text-[28px] font-semibold tracking-[-0.02em] text-ink">
        {`${itemCount} item${itemCount !== 1 ? "s" : ""}`}
      </h1>

      <ul className="mt-8 flex flex-col divide-y divide-border">
        {items.map(({ slug, qty }) => (
          <li key={slug} className="flex items-center justify-between py-4 gap-4">
            <p className="font-sans text-[15px] font-medium capitalize text-primary">
              {slug}
            </p>

            <div className="flex items-center gap-4 shrink-0">
              {/* Qty stepper */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(slug, qty - 1)}
                  aria-label="Decrease quantity"
                  className="flex h-6 w-6 items-center justify-center rounded border border-border font-mono text-[13px] text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  {"−"}
                </button>
                <span className="w-5 text-center font-mono text-[13px] text-primary">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(slug, qty + 1)}
                  aria-label="Increase quantity"
                  className="flex h-6 w-6 items-center justify-center rounded border border-border font-mono text-[13px] text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  {"+"}
                </button>
              </div>

              <button
                onClick={() => removeItem(slug)}
                aria-label={`Remove ${slug}`}
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
              >
                {"Remove"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Checkout handoff — wired up in a later punch-list pass */}
      <div className="mt-10 border-t border-border pt-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-secondary">
          {"Ready to order?"}
        </p>
        <Link
          href="/checkout"
          className="mt-4 inline-block rounded border border-border px-6 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent hover:text-accent"
        >
          {"Proceed to checkout →"}
        </Link>
      </div>
    </section>
  );
}
