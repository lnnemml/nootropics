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
    "inline-flex items-center justify-center rounded-[2px] font-sans font-semibold transition-all duration-200 active:scale-[0.98]";
  const styles: Record<string, string> = {
    primary:
      "cta-gradient text-white px-10 py-[18px] text-[17px] tracking-[0.01em]",
    outline:
      "cta-outline-dark px-[38px] py-[17px] text-base tracking-[0.01em]",
    inverted:
      "bg-white text-[#1e9c78] px-16 py-6 text-xl font-semibold rounded-[2px] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:scale-[1.01] hover:text-[#178263] hover:shadow-[0_32px_72px_-12px_rgba(0,0,0,0.5)]",
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
