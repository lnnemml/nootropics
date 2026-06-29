"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./Container";
import { Logo } from "@/components/ui/Logo";
import { CartIcon } from "@/components/ui/CartIcon";

const NAV_LINKS = [
  { label: "Products", href: "/products/neurodrive" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-page">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

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
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <CartIcon />
        </div>

        {/* Mobile right — always visible, outside hamburger */}
        <div className="flex md:hidden items-center gap-1 shrink-0">
          <ThemeToggle />
          <CartIcon />
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

      {/* Mobile panel — nav links only */}
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
          </div>
        </nav>
      )}
    </header>
  );
}
