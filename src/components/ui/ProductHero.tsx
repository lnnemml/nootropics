import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

interface ProductHeroProps {
  eyebrow: string;
  name: string;
  subhead: string;
  attributes: string;
  price: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export function ProductHero({
  eyebrow,
  name,
  subhead,
  attributes,
  price,
  ctaHref,
  imageSrc,
  imageAlt,
}: ProductHeroProps) {
  return (
    <section className="py-12 md:py-[80px] bg-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: product image */}
          <div className="relative w-full aspect-[3/2] md:aspect-[4/5] bg-raised rounded overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right: details */}
          <div className="flex flex-col justify-between gap-6 md:py-4">
            <div className="flex flex-col gap-5">
              {/* Eyebrow */}
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
                {eyebrow}
              </p>

              {/* Product name */}
              <h1 className="font-sans font-semibold tracking-[-0.025em] text-ink text-[32px] md:text-[clamp(42px,4vw,52px)] leading-[1.05]">
                {name}
              </h1>

              {/* One-liner */}
              <p className="font-sans text-[16px] md:text-[17px] text-primary leading-[1.55]">
                {subhead}
              </p>

              {/* Attributes */}
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-secondary">
                {attributes}
              </p>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Price */}
              <p className="font-sans font-semibold text-[28px] md:text-[clamp(36px,3vw,40px)] text-ink">
                {price}
              </p>

              {/* CTA */}
              <Link
                href={ctaHref}
                className="inline-block self-start rounded bg-ink px-6 py-3 font-sans text-[15px] font-medium text-page transition-opacity hover:opacity-80"
              >
                {"Place an order →"}
              </Link>

              {/* Secondary link */}
              <a
                href="#mechanism"
                className="font-sans text-[13px] text-secondary underline-offset-2 hover:underline"
              >
                {"Read the mechanism ↓"}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
