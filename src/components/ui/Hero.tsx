import Link from "next/link";
import { Container } from "@/components/layout/Container";

interface HeroProps {
  eyebrow: string;
  h1: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
  chart?: React.ReactNode;
}

export function Hero({ eyebrow, h1, subhead, ctaLabel, ctaHref, chart }: HeroProps) {
  return (
    <section className="py-12 md:py-[80px]">
      <Container
        className={
          chart
            ? "grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-10 md:gap-14 items-center"
            : ""
        }
      >
        <div className={`flex flex-col gap-5 md:gap-6 ${chart ? "" : "max-w-[860px]"}`}>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
            {eyebrow}
          </p>
          <h1 className="font-sans font-semibold leading-[1.08] md:leading-none tracking-[-0.02em] md:tracking-[-0.027em] text-ink text-[36px] sm:text-[46px] md:text-[clamp(62px,5.5vw,74px)]">
            {h1}
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-primary max-w-[620px]">
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
        {chart && <div>{chart}</div>}
      </Container>
    </section>
  );
}
