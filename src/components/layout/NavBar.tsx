import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Science", href: "/#science" },
  { label: "Mission", href: "/#mission" },
  { label: "Products", href: "/products/neurodrive" },
] as const;

function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <span className="flex items-center gap-[3px]">
        <span className="block h-[7px] w-[7px] rounded-full bg-accent" />
        <span className="block h-[7px] w-[7px] rounded-full bg-accent-bright" />
      </span>
      <span className="font-sans text-[13px] font-semibold tracking-[-0.01em] text-ink">
        NORA
      </span>
    </Link>
  );
}

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-page">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-[72px]">
        <LogoMark />

        <nav className="flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="font-sans text-[14px] text-secondary transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link
            href="/products/neurodrive"
            className="rounded border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Read the mechanism →
          </Link>
        </div>
      </div>
    </header>
  );
}
