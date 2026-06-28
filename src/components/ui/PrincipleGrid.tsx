interface Principle {
  heading: string;
  body: string;
}

interface PrincipleGridProps {
  principles: [Principle, Principle, Principle];
}

export function PrincipleGrid({ principles }: PrincipleGridProps) {
  return (
    <section className="px-[72px] pb-[88px]">
      <div className="border-t border-border pt-[44px]">
        <div className="grid grid-cols-3 gap-12">
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
    </section>
  );
}
