import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MiniChart } from "./MiniChart";

interface CardDef {
  eyebrow: string;
  eyebrowAccent: boolean;
  body: string;
  chartVariant?: "steady" | "jagged";
}

interface ContrastCardPairProps {
  eyebrow: string;
  heading: string;
  cards: [CardDef, CardDef];
  footnote?: {
    citation: string;
    linkLabel: string;
    linkHref: string;
  };
}

export function ContrastCardPair({ eyebrow, heading, cards, footnote }: ContrastCardPairProps) {
  return (
    <section className="bg-raised py-12 md:py-[72px]">
      <Container>
        <div className="mb-8 md:mb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
            {eyebrow}
          </p>
          <h2 className="font-sans font-semibold leading-[1.32] tracking-[-0.02em] text-ink text-[24px] md:text-[clamp(32px,2.8vw,34px)]">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded p-6 md:p-8 flex flex-col gap-5 md:gap-6"
            >
              <p
                className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
                  card.eyebrowAccent ? "text-accent" : "text-secondary"
                }`}
              >
                {card.eyebrow}
              </p>
              {card.chartVariant && <MiniChart variant={card.chartVariant} />}
              <p className="font-sans text-[15px] leading-relaxed text-secondary">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {footnote && (
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
            <span className="inline-block self-start font-mono text-[10px] uppercase tracking-[0.08em] text-secondary bg-card border border-border rounded px-2.5 py-1">
              {footnote.citation}
            </span>
            <Link
              href={footnote.linkHref}
              className="font-sans text-[14px] text-ink underline-offset-2 hover:underline"
            >
              {footnote.linkLabel}
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
