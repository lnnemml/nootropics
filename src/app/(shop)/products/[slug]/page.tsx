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
    </>
  );
}
