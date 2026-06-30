import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

interface ReleaseItem {
  label: string;
  name: string;
  status: "live" | "in-research";
  body?: string;
  ctaLabel?: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface ReleaseCatalogProps {
  eyebrow: string;
  intro: string;
  releases: ReleaseItem[];
}

export function ReleaseCatalog({ eyebrow, intro, releases }: ReleaseCatalogProps) {
  return (
    <section className="py-12 md:py-[88px]">
      <Container>
        <p className="mb-3 md:mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
          {eyebrow}
        </p>
        <p className="mb-8 md:mb-10 font-sans text-[15px] md:text-[16px] leading-relaxed text-primary max-w-[620px]">
          {intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr_1fr] gap-4 md:gap-5">
          {releases.map((r) => {
            if (r.status === "live") {
              return (
                <div
                  key={r.label}
                  className="bg-card border border-border rounded p-6 md:p-7 grid grid-cols-[88px_1fr] sm:grid-cols-[100px_1fr] gap-5 md:gap-6 items-center"
                >
                  {r.imageSrc && (
                    <div className="relative aspect-[2/3] w-full">
                      <Image
                        src={r.imageSrc}
                        alt={r.imageAlt ?? r.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                      {r.label}
                    </p>
                    <p className="font-sans text-[20px] font-semibold tracking-[-0.01em] text-ink">
                      {r.name}
                    </p>
                    {r.body && (
                      <p className="font-sans text-[14px] leading-relaxed text-secondary">
                        {r.body}
                      </p>
                    )}
                    {r.href && r.ctaLabel && (
                      <Link
                        href={r.href}
                        className="inline-block w-fit rounded bg-ink px-4 py-2 font-sans text-[13px] font-medium text-page transition-opacity hover:opacity-80"
                      >
                        {r.ctaLabel}
                      </Link>
                    )}
                  </div>
                </div>
              );
            }
            return (
              <div
                key={r.label}
                className="border border-dashed border-border rounded p-6 md:p-7 opacity-55 flex flex-col gap-3 justify-center"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
                  {r.label}
                </p>
                <p className="font-sans text-[15px] font-semibold text-secondary">
                  {r.name}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
