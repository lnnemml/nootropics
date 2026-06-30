import { Hero } from "@/components/ui/Hero";
import { StatChart } from "@/components/ui/StatChart";
import { ContrastCardPair } from "@/components/ui/ContrastCardPair";
import { FeaturedRelease } from "@/components/ui/FeaturedRelease";
import { MissionStatement } from "@/components/ui/MissionStatement";
import { PrincipleGrid } from "@/components/ui/PrincipleGrid";
import { DividerMotif } from "@/components/ui/DividerMotif";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Built for people who can't afford an off day"
        h1={"We name the mechanism. Or we don't ship it."}
        subhead={
          "We're a research alliance, not a supplement brand. Every release ships with a mechanism we can name and a study we can cite — starting with NeuroDrive, a single, named compound, evaluated against exactly that standard."
        }
        ctaLabel="View NeuroDrive →"
        ctaHref="/products/neurodrive"
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
              body: "Our first release names its mechanism outright: bromantane upregulates tyrosine hydroxylase, the enzyme that sets your brain's own dopamine synthesis rate. That's the bar — a pathway we can point to, not a blend we can't explain.",
              chartVariant: "steady",
            },
            {
              eyebrow: "INDUSTRY — HYPE-LED",
              eyebrowAccent: false,
              body: "A twelve-ingredient 'focus blend' with no single dose disclosed, no mechanism named per ingredient, and one clinical study covering one component — not the formula you're actually taking.",
              chartVariant: "jagged",
            },
          ]}
        />
      </div>

      <FeaturedRelease
        eyebrow="Our first release"
        name="NeuroDrive"
        body="Sublingual bromantane, one named mechanism — evaluated against the standard above, not an exception to it."
        ctaLabel="View NeuroDrive →"
        ctaHref="/products/neurodrive"
        imageSrc="/neurodrive-bottle.jpg"
        imageAlt="NeuroDrive sublingual bromantane bottle"
      />

      <div id="mission">
        <MissionStatement
          eyebrow="Mission"
          body={
            <>
              <span className="text-accent">{"NeuroDrive"}</span>
              {" is proof of the standard, not an exception to it — every product that follows gets evaluated the same way."}
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
