import Image from "next/image";
import Link from "next/link";

interface FeaturedReleaseProps {
  eyebrow: string;
  name: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export function FeaturedRelease({
  eyebrow,
  name,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: FeaturedReleaseProps) {
  return (
    <section className="py-[88px] px-[72px]">
      <div className="mx-auto max-w-7xl">
        <div className="bg-card border border-border rounded p-10 grid grid-cols-[160px_1fr] gap-10 items-center">
          <div className="relative aspect-[2/3] w-full">
            <Image src={imageSrc} alt={imageAlt} fill className="object-contain" />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
              {eyebrow}
            </p>
            <h3 className="font-sans font-semibold text-[28px] tracking-[-0.02em] text-ink">
              {name}
            </h3>
            <p className="font-sans text-[15px] leading-relaxed text-secondary max-w-[480px]">
              {body}
            </p>
            <div>
              <Link
                href={ctaHref}
                className="inline-block rounded bg-ink px-5 py-2.5 font-sans text-sm font-medium text-page transition-opacity hover:opacity-80"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
