import { Hero } from "@/components/ui/Hero";
import { ContrastCardPair } from "@/components/ui/ContrastCardPair";
import { ReleaseCatalog } from "@/components/ui/ReleaseCatalog";
import { MissionStatement } from "@/components/ui/MissionStatement";
import { PrincipleGrid } from "@/components/ui/PrincipleGrid";
import { DividerMotif } from "@/components/ui/DividerMotif";
import { Container } from "@/components/layout/Container";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="NORA — Nootropics Research Alliance"
        h1={"Nootropics with a named mechanism and a cited trial. Or we don't ship them."}
        subhead={
          "We're a research alliance for people who can't afford an off day — not a supplement brand. Every release ships with a mechanism we can name and a study we can cite, starting with NeuroDrive, a single, named compound evaluated against exactly that standard."
        }
        ctaLabel="View NeuroDrive →"
        ctaHref="/products/neurodrive"
      />

      <DividerMotif />

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
            imageSrc: "/neurodrive_without_bg.png",
            imageAlt: "NeuroDrive sublingual bromantane bottle",
          },
          { label: "RELEASE 02", name: "In research", status: "in-research" },
          { label: "RELEASE 03", name: "In research", status: "in-research" },
        ]}
      />

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
          footnote={{
            citation: "EXAMPLE — BROMANTANE · 728-PATIENT TRIAL · 76% RESPONSE RATE (PMID 21322821)",
            linkLabel: "Read more on the Journal →",
            linkHref: "/blog",
          }}
        />
      </div>

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

      <section className="py-12 md:py-[72px]">
        <Container className="flex flex-col items-center text-center gap-4 md:gap-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
            {"Ready when you are"}
          </p>
          <h2 className="font-sans font-semibold tracking-[-0.02em] text-ink text-[22px] md:text-[clamp(28px,2.5vw,34px)]">
            {"Start with NeuroDrive"}
          </h2>
          <Link
            href="/products/neurodrive"
            className="inline-block rounded bg-ink px-6 py-3 font-sans text-[15px] font-medium text-page transition-opacity hover:opacity-80"
          >
            {"View NeuroDrive →"}
          </Link>
        </Container>
      </section>
    </>
  );
}
