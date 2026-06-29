import type { ReactNode } from "react";

// TODO: Footer.tsx and section components (Hero, ContrastCardPair, PrincipleGrid,
// MissionStatement, DividerMotif, product page checkout CTA) share the same
// hardcoded px-[72px] gutter — migrate them to use this Container in a fast follow.
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 md:px-[72px] ${className ?? ""}`}>
      {children}
    </div>
  );
}
