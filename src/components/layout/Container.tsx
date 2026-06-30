import type { ReactNode } from "react";

export function Container({
  children,
  className,
  maxWidth = "max-w-7xl",
}: {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div className={`mx-auto ${maxWidth} px-4 sm:px-6 md:px-[72px] ${className ?? ""}`}>
      {children}
    </div>
  );
}
