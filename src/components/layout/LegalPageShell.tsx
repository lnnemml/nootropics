import type { ReactNode } from "react";
import { Container } from "./Container";

interface LegalPageShellProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPageShell({
  eyebrow,
  title,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <section className="py-[80px] md:py-[104px]">
      <Container>
        <div className="mx-auto max-w-[720px]">

          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
            {eyebrow}
          </p>
          <h1 className="mb-3 font-sans font-semibold tracking-[-0.02em] text-ink text-[28px] md:text-[36px]">
            {title}
          </h1>
          <p className="mb-8 font-mono text-[10px] text-secondary">
            Last updated: {lastUpdated}
          </p>

          <div className="mb-10 border-t border-border" />

          {/* Prose wrapper — applies consistent styles to all h2, p, strong, a children */}
          <div className="
            [&_h2]:font-sans [&_h2]:text-[16px]
            [&_h2]:font-semibold [&_h2]:text-ink
            [&_h2]:mt-10 [&_h2]:mb-3
            [&_p]:font-sans [&_p]:text-[15px]
            [&_p]:leading-relaxed [&_p]:text-secondary [&_p]:mb-4
            [&_strong]:font-medium [&_strong]:text-primary
            [&_a]:text-accent [&_a]:underline-offset-2
            [&_a]:hover:underline
          ">
            {children}
          </div>

        </div>
      </Container>
    </section>
  );
}
