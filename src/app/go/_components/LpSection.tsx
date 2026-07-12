import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

interface LpSectionProps {
  children: ReactNode;
  variant: "dark" | "light" | "teal";
  id?: string;
  className?: string;
}

const BG: Record<LpSectionProps["variant"], string> = {
  dark: "bg-[#2b3235] text-white",
  light: "bg-white text-[#2b3235]",
  teal: "bg-[#1e9c78] text-white",
};

export function LpSection({ children, variant, id, className = "" }: LpSectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${BG[variant]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
