import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

interface LpSectionProps {
  children: ReactNode;
  variant: "dark" | "light" | "teal";
  id?: string;
  className?: string;
  padding?: string;
}

const BG: Record<LpSectionProps["variant"], string> = {
  dark: "bg-[#2b3235] text-white",
  light: "bg-[#f8f9fa] text-[#2b3235]",
  teal: "bg-[#1e9c78] text-white",
};

export function LpSection({
  children,
  variant,
  id,
  className = "",
  padding = "py-16 md:py-24",
}: LpSectionProps) {
  return (
    <section id={id} className={`${padding} ${BG[variant]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
