import { Hero } from "@/components/ui/Hero";
import { StatChart } from "@/components/ui/StatChart";
import { ContrastCardPair } from "@/components/ui/ContrastCardPair";
import { MissionStatement } from "@/components/ui/MissionStatement";
import { PrincipleGrid } from "@/components/ui/PrincipleGrid";
import { DividerMotif } from "@/components/ui/DividerMotif";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Built for people who can't afford an off day"
        h1={"Nootropics, backed by mechanism — not marketing."}
        subhead={"We're a research alliance, not a supplement brand — we publish the mechanism behind everything we ship, cite the studies, and say plainly when something probably isn't worth your money. NeuroDrive, our first release, is built on exactly that standard."}
        ctaLabel="See how we evaluate compounds"
        ctaHref="/#science"
        chart={
          <StatChart
            caption="FIG.01 — SIGNAL vs. NOISE"
            solidLabel="VALIDATED"
            dashedPeakLabel="HYPED"
            dashedEndLabel="FORGOTTEN"
            legendSolid="NORA"
            legendDashed="Hype cycles"
          />
        }
      />

      <DividerMotif />

      <div id="science">
        <ContrastCardPair
          eyebrow="The two methods"
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
      </div>

      <div id="mission">
        <MissionStatement
          eyebrow="Mission"
          body={
            <>
              <span className="text-accent">{"NORA"}</span>
              {" exists because the nootropics industry rewards marketing over mechanism. We do it differently: every product we research and release stands behind a mechanism we can name and evidence we can cite — starting with NeuroDrive, our first release."}
            </>
          }
        />
      </div>

      <DividerMotif />

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
    </>
  );
}
