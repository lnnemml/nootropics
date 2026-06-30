import { Container } from "@/components/layout/Container";

interface MissionStatementProps {
  eyebrow: string;
  body: React.ReactNode;
}

export function MissionStatement({ eyebrow, body }: MissionStatementProps) {
  return (
    <section className="py-16 md:py-[96px]">
      <Container>
        <div className="mx-auto max-w-[860px] text-center">
          <p className="mb-5 md:mb-6 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
            {eyebrow}
          </p>
          <p className="font-sans font-medium text-primary leading-[1.35] md:leading-[1.3] tracking-[-0.015em] text-[26px] sm:text-[30px] md:text-[clamp(34px,3vw,37px)]">
            {body}
          </p>
        </div>
      </Container>
    </section>
  );
}
