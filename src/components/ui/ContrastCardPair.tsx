import { MiniChart } from "./MiniChart";

interface CardDef {
  eyebrow: string;
  eyebrowAccent: boolean;
  body: string;
  chartVariant: "steady" | "jagged";
}

interface ContrastCardPairProps {
  eyebrow: string;
  heading: string;
  cards: [CardDef, CardDef];
}

export function ContrastCardPair({ eyebrow, heading, cards }: ContrastCardPairProps) {
  return (
    <section className="bg-raised py-[72px] px-[72px]">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
            {eyebrow}
          </p>
          <h2
            className="font-sans font-semibold leading-[1.32] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(32px, 2.8vw, 34px)" }}
          >
            {heading}
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded p-8 flex flex-col gap-6"
            >
              <p
                className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
                  card.eyebrowAccent ? "text-accent" : "text-secondary"
                }`}
              >
                {card.eyebrow}
              </p>
              <MiniChart variant={card.chartVariant} />
              <p className="font-sans text-[15px] leading-relaxed text-secondary">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
