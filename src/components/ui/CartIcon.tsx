"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/useCart";

function BagIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 5.5h11l-1.5 9h-8z" />
      <path d="M6.5 5.5v-1a2.5 2.5 0 0 1 5 0v1" />
    </svg>
  );
}

export function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/checkout"
      aria-label={
        itemCount > 0
          ? `Cart — ${itemCount} item${itemCount !== 1 ? "s" : ""}`
          : "Cart"
      }
      className="relative flex h-7 w-7 items-center justify-center rounded text-secondary transition-colors hover:text-primary"
    >
      <BagIcon />
      {itemCount > 0 && (
        <span className="pointer-events-none absolute -right-1 -top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-accent px-[3px] font-mono text-[8px] leading-none text-page">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
