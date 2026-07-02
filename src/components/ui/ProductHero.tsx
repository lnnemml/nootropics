"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import type { QuantityOption } from "@/lib/copy/products";

interface ProductHeroProps {
  eyebrow: string;
  name: string;
  subhead: string;
  attributes: string;
  quantityOptions: QuantityOption[];
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export function ProductHero({
  eyebrow,
  name,
  subhead,
  attributes,
  quantityOptions,
  ctaHref,
  imageSrc,
  imageAlt,
}: ProductHeroProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = quantityOptions[selectedIdx];

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
          <div className="flex flex-col gap-0 md:py-4">
            {/* 1. Eyebrow */}
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
              {eyebrow}
            </p>

            {/* 2. Product name */}
            <h1 className="mt-4 font-sans font-semibold tracking-[-0.025em] text-ink text-[36px] md:text-[clamp(44px,4vw,56px)] leading-[1.05]">
              {name}
            </h1>

            {/* 3. Subhead */}
            <p className="mt-4 max-w-[460px] font-sans text-[16px] md:text-[17px] text-primary leading-[1.55]">
              {subhead}
            </p>

            {/* 4. Attributes */}
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-secondary">
              {attributes}
            </p>

            {/* 5. Trust spec grid */}
            <div className="mt-5 grid gap-x-8 gap-y-2.5" style={{ gridTemplateColumns: "auto auto" }}>
              {[
                ["PURITY",        "≥98% · NMR-verified"],
                ["LEGAL STATUS",  "Non-scheduled · US · CA · EU"],
                ["CARRIER",       "Pharmaceutical-grade MCT"],
                ["DOSE",          "40–80 mg · calibrated dropper"],
              ].map(([label, value]) => (
                <Fragment key={label}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary opacity-70">
                    {label}
                  </span>
                  <span className="font-mono text-[11px] text-ink">
                    {value}
                  </span>
                </Fragment>
              ))}
            </div>

            {/* 6. Divider */}
            <div className="mt-6 mb-6 h-px bg-border" />

            {/* 7. Quantity selector */}
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-secondary mb-3">
              Supply
            </p>
            <div className="grid grid-cols-3 gap-2">
              {quantityOptions.map((opt, i) => {
                const isSelected = i === selectedIdx;
                return (
                  <button
                    key={opt.qty}
                    type="button"
                    onClick={() => setSelectedIdx(i)}
                    className={[
                      "border rounded px-2 py-3 text-center transition-colors cursor-pointer flex flex-col items-center gap-1",
                      isSelected
                        ? "border-ink bg-ink text-page"
                        : "border-border bg-card hover:border-ink/30",
                    ].join(" ")}
                  >
                    <span className={`font-mono text-[10px] uppercase tracking-[0.08em] ${isSelected ? "text-page/70" : "text-secondary"}`}>
                      {opt.label}
                    </span>
                    <span className={`font-sans text-[15px] font-medium ${isSelected ? "text-page" : "text-ink"}`}>
                      {opt.price}
                    </span>
                    {opt.saveTag && (
                      <span className={`font-mono text-[9px] ${isSelected ? "text-accent-bright" : "text-accent"}`}>
                        {opt.saveTag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 8. Selected price display */}
            <div className="mt-5">
              <p className="font-sans font-semibold leading-none text-ink text-[38px] md:text-[44px]">
                {selected.price}
              </p>
              <p className="font-mono text-[11px] text-secondary mt-1">
                {selected.perUnit}
              </p>
            </div>

            {/* 9. CTA button */}
            <div className="mt-4">
              <Link
                href={`${ctaHref}?qty=${selected.qty}`}
                className="inline-block rounded bg-ink px-6 py-3 font-sans text-[15px] font-medium text-page transition-opacity hover:opacity-80"
              >
                {"Order NeuroDrive →"}
              </Link>
            </div>

            {/* 10. Secondary link */}
            <div className="mt-3">
              <a
                href="#mechanism"
                className="font-sans text-[13px] text-secondary underline-offset-2 hover:underline cursor-pointer"
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
