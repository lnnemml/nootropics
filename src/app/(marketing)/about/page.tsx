import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ContrastCardPair } from "@/components/ui/ContrastCardPair";
import { PrincipleGrid } from "@/components/ui/PrincipleGrid";

export const metadata: Metadata = {
  title: "About | NORA",
  description:
    "NORA is a research alliance — not a supplement brand. Every product names a mechanism and cites a trial. If it doesn't meet that standard, it doesn't ship.",
};

export default function AboutPage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="pt-[80px] pb-[72px] md:pt-[104px] md:pb-[88px]">
        <Container>
          <div className="max-w-[680px]">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
              NORA — Nootropics Research Alliance
            </p>

            <h1 className="mb-6 font-sans font-semibold leading-[1.07] tracking-[-0.025em] text-ink text-[30px] md:text-[clamp(40px,3.8vw,52px)]">
              {"We only ship what we can explain."}
            </h1>

            <p className="font-sans leading-relaxed text-secondary text-[16px] md:text-[18px] max-w-[560px]">
              {"NORA is a research alliance — not a supplement brand. Every product in the catalog names a mechanism and cites a clinical trial. If it doesn't meet that standard, it doesn't ship — regardless of how well it would sell."}
            </p>
          </div>
        </Container>
      </section>

      {/* Section 2 — The Standard */}
      <ContrastCardPair
        eyebrow="The standard"
        heading="One rule. No exceptions."
        cards={[
          {
            eyebrow: "A MECHANISM WE CAN NAME",
            eyebrowAccent: true,
            body: "Not \"supports cognitive health.\" A specific pathway — the enzyme upregulated, the receptor targeted, the system restored. If we can't name the mechanism, we can't put it in the catalog.",
          },
          {
            eyebrow: "A TRIAL WE CAN CITE",
            eyebrowAccent: false,
            body: "Not a mechanism paper or a rodent study. A human clinical trial, a measurable outcome, and a PMID on the page. That's the floor — not a differentiator.",
          },
        ]}
        footnote={{
          citation: "NEURODRIVE · 728-PATIENT TRIAL · 76% RESPONSE RATE · PMID 21322821",
          linkLabel: "Review the source →",
          linkHref: "https://pubmed.ncbi.nlm.nih.gov/21322821/",
        }}
      />

      {/* Section 3 — Principles */}
      <PrincipleGrid
        principles={[
          {
            heading: "Skepticism is a feature",
            body: "You've been burned by supplement marketing before. That's the correct response to most of it. NORA is built to survive scrutiny, not charm people past it — every claim is traceable to a source.",
          },
          {
            heading: "One compound at a time",
            body: "The catalog grows only when the standard is met. We'd rather release nothing than release something we can't fully explain. Depth over breadth — always.",
          },
          {
            heading: "Transparency over trust",
            body: "You shouldn't have to take our word for it. Read the mechanism. Read the trial. Verify it. The goal is for the research to hold up whether or not you like us.",
          },
        ]}
      />

      {/* Section 4 — Closing CTA */}
      <section className="bg-raised py-[72px] md:py-[88px]">
        <Container>
          <div className="max-w-[540px]">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
              Release 01
            </p>

            <h2 className="mb-4 font-sans font-semibold leading-[1.1] tracking-[-0.02em] text-ink text-[24px] md:text-[clamp(28px,2.5vw,34px)]">
              {"See the standard applied."}
            </h2>

            <p className="mb-7 font-sans text-[15px] leading-relaxed text-secondary">
              {"NeuroDrive is the first product to clear the NORA bar — mechanism named, trial cited. Everything that follows gets evaluated the same way."}
            </p>

            <Link
              href="/products/neurodrive"
              className="inline-block rounded-[2px] bg-ink px-6 py-3 font-sans text-[15px] font-medium text-page transition-opacity hover:opacity-80"
            >
              {"View NeuroDrive →"}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
