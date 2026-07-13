"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics/client";

interface CtaButtonProps {
  href?: string;
  label?: string;
  trackingLocation: string;
  variant?: "primary" | "outline" | "inverted";
  fullWidth?: boolean;
  className?: string;
}

export function CtaButton({
  href = "/checkout?qty=1",
  label = "Order NeuroDrive →",
  trackingLocation,
  variant = "primary",
  fullWidth = false,
  className = "",
}: CtaButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[2px] px-8 py-4 font-sans text-base md:text-lg font-medium transition-opacity hover:opacity-90";
  const styles: Record<string, string> = {
    primary: "bg-[#1e9c78] text-white",
    outline: "border border-[#1e9c78] text-[#1e9c78] bg-transparent",
    inverted: "bg-white text-[#1e9c78]",
  };

  return (
    <Link
      href={href}
      onClick={() => trackEvent("cta_click", { location: trackingLocation })}
      className={`${base} ${styles[variant]} ${fullWidth ? "w-full" : ""} ${className}`.trim()}
    >
      {label}
    </Link>
  );
}
