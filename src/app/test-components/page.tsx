import { DividerMotif } from "@/components/ui/DividerMotif";
import { MiniChart } from "@/components/ui/MiniChart";
import { StatChart } from "@/components/ui/StatChart";
import { Hero } from "@/components/ui/Hero";
import { ContrastCardPair } from "@/components/ui/ContrastCardPair";
import { MissionStatement } from "@/components/ui/MissionStatement";
import { PrincipleGrid } from "@/components/ui/PrincipleGrid";

const NORA_STAT_CHART = (
  <StatChart
    caption="FIG.01 — SIGNAL vs. NOISE"
    solidLabel="VALIDATED"
    dashedPeakLabel="HYPED"
    dashedEndLabel="FORGOTTEN"
    legendSolid="NORA"
    legendDashed="Hype cycles"
  />
);

const ALT_STAT_CHART = (
  <StatChart
    caption="FIG.01 — SUSTAINED vs. SPIKE"
    solidLabel="SUSTAINED"
    dashedPeakLabel="SPIKE"
    dashedEndLabel="CRASH"
    legendSolid="NeuroDrive"
    legendDashed="Stimulants"
  />
);

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-raised px-[72px] py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-secondary">
          {label}
        </p>
      </div>
      {children}
    </div>
  );
}

function LightDarkSplit({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2">
      <div className="bg-page">{children}</div>
      <div className="dark bg-page">{children}</div>
    </div>
  );
}

export default function TestComponentsPage() {
  return (
    <div className="divide-y divide-border">

      <Section label="DividerMotif">
        <LightDarkSplit>
          <div className="py-8">
            <DividerMotif />
          </div>
        </LightDarkSplit>
      </Section>

      <Section label="MiniChart — steady + jagged">
        <LightDarkSplit>
          <div className="grid grid-cols-2 gap-6 px-[72px] py-8">
            <MiniChart variant="steady" />
            <MiniChart variant="jagged" />
          </div>
        </LightDarkSplit>
      </Section>

      <Section label="StatChart — two caption sets">
        <LightDarkSplit>
          <div className="grid grid-cols-2 gap-6 px-[72px] py-8">
            {NORA_STAT_CHART}
            {ALT_STAT_CHART}
          </div>
        </LightDarkSplit>
      </Section>

      <Section label="Hero">
        <LightDarkSplit>
          <Hero
            eyebrow={"Built for people who can't afford an off day"}
            h1={"Nootropics, backed by mechanism — not marketing."}
            subhead={"We're a research alliance, not a supplement brand — we publish the mechanism behind everything we ship, cite the studies, and say plainly when something probably isn't worth your money."}
            ctaLabel={"See how we evaluate compounds"}
            ctaHref="/#science"
            chart={NORA_STAT_CHART}
          />
        </LightDarkSplit>
      </Section>

      <Section label="ContrastCardPair">
        <LightDarkSplit>
          <ContrastCardPair
            eyebrow={"The two methods"}
            heading={"One method compounds. The other just trends."}
            cards={[
              {
                eyebrow: "NORA — RESEARCH-LED",
                eyebrowAccent: true,
                body: "Every release traces to a mechanism we can name and a study we can cite. If the evidence doesn't hold up, we don't ship it — no matter how well it would sell.",
                chartVariant: "steady",
              },
              {
                eyebrow: "INDUSTRY — HYPE-LED",
                eyebrowAccent: false,
                body: "Proprietary blends nobody can verify. Reviews standing in for clinical evidence. A compound chosen because it's trending this quarter, not because it's tested.",
                chartVariant: "jagged",
              },
            ]}
          />
        </LightDarkSplit>
      </Section>

      <Section label="MissionStatement">
        <LightDarkSplit>
          <MissionStatement
            eyebrow={"Mission"}
            body={
              <>
                {"NORA exists because the nootropics industry rewards "}
                <span className="text-accent">{"marketing over mechanism"}</span>
                {". We do it differently: every product we research and release stands behind a mechanism we can name and evidence we can cite — starting with NeuroDrive, our first release."}
              </>
            }
          />
        </LightDarkSplit>
      </Section>

      <Section label="PrincipleGrid">
        <LightDarkSplit>
          <PrincipleGrid
            principles={[
              {
                heading: "Mechanism over marketing",
                body: "Every claim traces back to a pathway we can name and a study we can cite. No proprietary fairy dust.",
              },
              {
                heading: "Built for skeptics",
                body: "You've tried things that didn't work. Good — that's the right instinct. We'd rather you read the research than take our word for it.",
              },
              {
                heading: "Curated, not exhaustive",
                body: "We'd rather release one compound we trust completely than fifty we're unsure about. Every addition to the catalog has to earn its place.",
              },
            ]}
          />
        </LightDarkSplit>
      </Section>

    </div>
  );
}
