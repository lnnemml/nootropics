import { Hero } from "@/components/ui/Hero";
import { ContrastCardPair } from "@/components/ui/ContrastCardPair";
import { ReleaseCatalog } from "@/components/ui/ReleaseCatalog";
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
              body: "Every release names a mechanism and cites a study. If it doesn't hold up, we don't ship it — no matter how well it would sell.",
            },
            {
              eyebrow: "INDUSTRY — HYPE-LED",
              eyebrowAccent: false,
              body: "Proprietary blends nobody can verify, reviews standing in for clinical evidence, a compound chosen because it's trending this quarter.",
            },
          ]}
        />
      </div>

      <ReleaseCatalog
        eyebrow="What we're building"
        intro={
          "NORA isn't a single-product storefront — it's the early shelf of a research-led catalog we're building release by release. Every addition gets evaluated the same way NeuroDrive was: a mechanism we can name, a study we can cite, or it doesn't make the cut."
        }
        releases={[
          {
            label: "RELEASE 01",
            name: "NeuroDrive",
            status: "live",
            body: "Sublingual bromantane, one named mechanism — evaluated against the standard above, not an exception to it.",
            ctaLabel: "View NeuroDrive →",
            href: "/products/neurodrive",
            imageSrc: "/neurodrive-bottle.jpg",
            imageAlt: "NeuroDrive sublingual bromantane bottle",
          },
          { label: "RELEASE 02", name: "In research", status: "in-research" },
          { label: "RELEASE 03", name: "In research", status: "in-research" },
        ]}
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
