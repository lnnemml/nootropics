import { Container } from "@/components/layout/Container";

interface Principle {
  heading: string;
  body: string;
}

interface PrincipleGridProps {
  principles: [Principle, Principle, Principle];
}

export function PrincipleGrid({ principles }: PrincipleGridProps) {
  return (
    <section className="pb-10 md:pb-[88px]">
      <Container>
        <div className="border-t border-border pt-8 md:pt-[44px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {principles.map((p, i) => (
              <div key={i}>
                <p
                  className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-3 font-sans text-[20px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                  {p.heading}
                </h3>
                <p className="font-sans text-[15px] leading-relaxed text-secondary">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
