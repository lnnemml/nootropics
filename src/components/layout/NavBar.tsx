"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./Container";

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

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="3" y1="3" x2="15" y2="15" />
          <line x1="15" y1="3" x2="3" y2="15" />
        </>
      ) : (
        <>
          <line x1="2" y1="5" x2="16" y2="5" />
          <line x1="2" y1="9" x2="16" y2="9" />
          <line x1="2" y1="13" x2="16" y2="13" />
        </>
      )}
    </svg>
  );
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const showCta =
    !pathname.startsWith("/products/") && pathname !== "/checkout";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-page">
      <Container className="flex h-14 items-center justify-between">
        <LogoMark />

        {/* Desktop nav — hidden below md */}
        <nav className="hidden md:flex items-center gap-7">
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

        {/* Desktop right — hidden below md */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          {showCta && (
            <Link
              href="/products/neurodrive"
              className="rounded border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent hover:text-accent"
            >
              {"Read the mechanism →"}
            </Link>
          )}
        </div>

        {/* Mobile right — hidden above md */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-7 w-7 items-center justify-center rounded text-secondary transition-colors hover:text-primary"
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </Container>

      {/* Mobile panel — slide in below the bar */}
      {open && (
        <nav
          className="md:hidden border-t border-border bg-page"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col px-4 py-4 gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-sm py-2.5 font-sans text-[14px] text-secondary transition-colors hover:text-primary"
              >
                {label}
              </Link>
            ))}
            {showCta && (
              <div className="mt-2 border-t border-border pt-3">
                <Link
                  href="/products/neurodrive"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  {"Read the mechanism →"}
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
