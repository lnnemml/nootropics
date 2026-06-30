import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";

const FOOTER_COLUMNS = [
  {
    heading: "RESEARCH",
    links: [
      { label: "How we evaluate", href: "/#science" },
      { label: "The research", href: "/#science" },
      { label: "Don't buy if…", href: "/#science" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "Mission", href: "/#mission" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-raised">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_auto_auto] gap-x-10 md:gap-x-24 gap-y-8 md:gap-y-10">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Logo />
            </Link>
            <p className="max-w-[200px] font-sans text-sm leading-relaxed text-secondary">
              {"A research alliance for people who run hot. Evidence first, every time."}
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
                {heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-sans text-sm text-secondary transition-colors hover:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-10 md:mt-12 border-t border-border pt-6">
          <p className="font-mono text-[11px] text-secondary">
            {"© 2026 NORA · NOT A MEDICAL DEVICE · STATEMENTS NOT EVALUATED"}
          </p>
        </div>
      </Container>
    </footer>
  );
}
