import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";

const COMPANY_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Products", href: "/products/neurodrive" },
  { label: "Journal",  href: "/blog" },
  { label: "Contact",  href: "/contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Terms of Service",  href: "/legal/terms" },
  { label: "Privacy Policy",    href: "/legal/privacy" },
  { label: "Research Use Only", href: "/legal/research-use" },
  { label: "Disclaimer",        href: "/legal/disclaimer" },
] as const;

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div className="flex flex-col gap-4">
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
  );
}

export function Footer() {
  return (
    <footer className="bg-raised">
      <Container className="py-12 md:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_auto_auto] gap-x-12 md:gap-x-24 gap-y-10">

          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/"><Logo /></Link>
            <p className="max-w-[200px] font-sans text-sm leading-relaxed text-secondary">
              {"A research alliance for people who run hot. Evidence first, every time."}
            </p>
          </div>

          <FooterColumn heading="Company" links={COMPANY_LINKS} />
          <FooterColumn heading="Legal" links={LEGAL_LINKS} />

        </div>

        {/* Copyright bar */}
        <div className="mt-10 md:mt-12 border-t border-border pt-6">
          <p className="font-mono text-[11px] text-secondary">
            {"© 2026 NORA · NOT A MEDICAL DEVICE · STATEMENTS NOT EVALUATED BY THE FDA"}
          </p>
        </div>

      </Container>
    </footer>
  );
}
