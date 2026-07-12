"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics/client";

interface CtaButtonProps {
  href?: string;
  label?: string;
  trackingLocation: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export function CtaButton({
  href = "/checkout?qty=1",
  label = "Order NeuroDrive →",
  trackingLocation,
  variant = "primary",
  className = "",
}: CtaButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[2px] px-8 py-3.5 font-sans text-[15px] font-medium transition-opacity hover:opacity-90";
  const styles =
    variant === "primary"
      ? "bg-[#1e9c78] text-white"
      : "border border-[#1e9c78] text-[#1e9c78] bg-transparent";

  return (
    <Link
      href={href}
      onClick={() => trackEvent("cta_click", { location: trackingLocation })}
      className={`${base} ${styles} ${className}`}
    >
      {label}
    </Link>
  );
}
