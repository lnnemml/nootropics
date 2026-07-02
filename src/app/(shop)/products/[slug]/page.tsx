import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getAllProductSlugs } from "@/lib/copy/products";
import { ProductHero } from "@/components/ui/ProductHero";
import { ContrastCardPair } from "@/components/ui/ContrastCardPair";
import { PrincipleGrid } from "@/components/ui/PrincipleGrid";
import { PuritySection } from "@/components/ui/PuritySection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Container } from "@/components/layout/Container";

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
      <ProductHero
        eyebrow={product.hero.eyebrow}
        name={product.hero.h1}
        subhead={product.hero.subhead}
        attributes={product.hero.attributes}
        quantityOptions={product.quantityOptions}
        ctaHref="/checkout"
        imageSrc={product.hero.imageSrc}
        imageAlt={product.hero.imageAlt}
      />

      <div id="mechanism">
        <ContrastCardPair
          eyebrow={product.contrast.eyebrow}
          heading={product.contrast.heading}
          cards={[
            {
              eyebrow: product.contrast.cards[0].eyebrow,
              eyebrowAccent: true,
              body: product.contrast.cards[0].body,
            },
            {
              eyebrow: product.contrast.cards[1].eyebrow,
              eyebrowAccent: false,
              body: product.contrast.cards[1].body,
            },
          ]}
          footnote={{
            citation:
              "BROMANTANE · 728-PATIENT RCT · 76% RESPONSE RATE (PMID 21322821)",
            linkLabel: "Read more in the Journal →",
            linkHref: "/blog",
          }}
        />
      </div>

      {/* Formula */}
      <section className="py-12 md:py-[72px]">
        <Container>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary mb-3">
            Formula
          </p>
          <h2 className="font-sans font-semibold tracking-[-0.02em] text-ink text-[24px] md:text-[clamp(28px,2.5vw,32px)] mb-10 md:mb-12">
            {"Exactly what’s in the bottle."}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Composition */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary mb-4">
                Composition
              </p>
              <div className="flex flex-col divide-y divide-border">
                {product.formula.composition.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-baseline py-3"
                  >
                    <span className="font-mono text-[13px] text-ink">
                      {row.name}
                    </span>
                    <span className="font-mono text-[13px] text-secondary">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocol */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary mb-4">
                Sublingual protocol
              </p>
              <div className="flex flex-col gap-4">
                {product.formula.protocol.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="font-mono text-[11px] text-accent mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-[15px] text-secondary leading-relaxed">
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href={product.formula.journalHref}
                  className="font-sans text-[14px] text-ink underline-offset-2 hover:underline"
                >
                  {"Clinical dosing rationale → Journal"}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PrincipleGrid principles={product.principles} />

      <PuritySection />

      <FAQAccordion items={product.faq} />

      {/* Purchase CTA */}
      <section className="py-12 md:py-[72px]">
        <Container className="flex flex-col items-center text-center gap-4 md:gap-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
            Order
          </p>
          <h2 className="font-sans font-semibold tracking-[-0.02em] text-ink text-[22px] md:text-[clamp(28px,2.5vw,34px)]">
            {`${product.name} — ${product.hero.price}`}
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-secondary">
            {product.hero.attributes}
          </p>
          <Link
            href="/checkout"
            className="inline-block rounded bg-ink px-6 py-3 font-sans text-[15px] font-medium text-page transition-opacity hover:opacity-80 mt-1"
          >
            {"Order now →"}
          </Link>
        </Container>
      </section>
    </>
  );
}
