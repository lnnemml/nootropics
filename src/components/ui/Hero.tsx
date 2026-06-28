import Link from "next/link";

interface HeroProps {
  eyebrow: string;
  h1: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
  chart: React.ReactNode;
}

export function Hero({ eyebrow, h1, subhead, ctaLabel, ctaHref, chart }: HeroProps) {
  return (
    <section className="py-[80px] px-[72px]">
      <div className="mx-auto max-w-7xl grid grid-cols-[1.05fr_1fr] gap-14 items-center">
        {/* Left: text stack */}
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
            {eyebrow}
          </p>
          <h1
            className="font-sans font-semibold leading-none tracking-[-0.027em] text-ink"
            style={{ fontSize: "clamp(62px, 5.5vw, 74px)" }}
          >
            {h1}
          </h1>
          <p className="font-sans text-[18px] leading-[1.6] text-primary max-w-[520px]">
            {subhead}
          </p>
          <div>
            <Link
              href={ctaHref}
              className="inline-block rounded bg-ink px-5 py-2.5 font-sans text-sm font-medium text-page transition-opacity hover:opacity-80"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>

        {/* Right: chart slot */}
        <div>{chart}</div>
      </div>
    </section>
  );
}
