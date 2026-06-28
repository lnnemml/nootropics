import Link from "next/link";

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
      { label: "Contact", href: "mailto:hello@nora.so" },
    ],
  },
] as const;

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex items-center gap-[3px]">
        <span className="block h-[7px] w-[7px] rounded-full bg-accent" />
        <span className="block h-[7px] w-[7px] rounded-full bg-accent-bright" />
      </span>
      <span className="font-sans text-[13px] font-semibold tracking-[-0.01em] text-ink">
        NORA
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-raised">
      <div className="mx-auto max-w-7xl px-[72px] py-16">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-24 gap-y-10">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <LogoMark />
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
        <div className="mt-12 border-t border-border pt-6">
          <p className="font-mono text-[11px] text-secondary">
            {"© 2026 NORA · NOT A MEDICAL DEVICE · STATEMENTS NOT EVALUATED"}
          </p>
        </div>
      </div>
    </footer>
  );
}
