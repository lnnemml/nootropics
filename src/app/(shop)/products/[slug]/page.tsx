import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getAllProductSlugs } from "@/lib/copy/products";
import { Hero } from "@/components/ui/Hero";
import { StatChart } from "@/components/ui/StatChart";
import { ContrastCardPair } from "@/components/ui/ContrastCardPair";
import { MissionStatement } from "@/components/ui/MissionStatement";
import { PrincipleGrid } from "@/components/ui/PrincipleGrid";
import { DividerMotif } from "@/components/ui/DividerMotif";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | NORA`,
    description: product.hero.subhead,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return (
    <>
      <Hero
        eyebrow={product.hero.eyebrow}
        h1={product.hero.h1}
        subhead={product.hero.subhead}
        ctaLabel={product.hero.ctaLabel}
        ctaHref="#mechanism"
        chart={
          <StatChart
            caption={product.hero.chart.caption}
            solidLabel={product.hero.chart.solidLabel}
            dashedPeakLabel={product.hero.chart.dashedPeakLabel}
            dashedEndLabel={product.hero.chart.dashedEndLabel}
            legendSolid={product.hero.chart.legendSolid}
            legendDashed={product.hero.chart.legendDashed}
          />
        }
      />

      <DividerMotif />

      <ContrastCardPair
        eyebrow={product.contrast.eyebrow}
        heading={product.contrast.heading}
        cards={[
          {
            eyebrow: product.contrast.cards[0].eyebrow,
            eyebrowAccent: true,
            body: product.contrast.cards[0].body,
            chartVariant: "steady",
          },
          {
            eyebrow: product.contrast.cards[1].eyebrow,
            eyebrowAccent: false,
            body: product.contrast.cards[1].body,
            chartVariant: "jagged",
          },
        ]}
      />

      <div id="mechanism">
        <MissionStatement
          eyebrow={product.mechanism.eyebrow}
          body={product.mechanism.body}
        />
      </div>

      <DividerMotif />

      <PrincipleGrid principles={product.principles} />

      {/* Checkout CTA */}
      <section className="py-[72px] px-[72px]">
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center gap-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
            {"Ready to try it"}
          </p>
          <h2
            className="font-sans font-semibold tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(28px, 2.5vw, 34px)" }}
          >
            {`Order ${product.name}`}
          </h2>
          <Link
            href="/checkout"
            className="inline-block rounded bg-ink px-6 py-3 font-sans text-[15px] font-medium text-page transition-opacity hover:opacity-80"
          >
            {"Place an order"}
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
            {"No payment collected now · we follow up by email"}
          </p>
        </div>
      </section>
    </>
  );
}
