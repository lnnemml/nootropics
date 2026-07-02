"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";

interface NMRCard {
  label: string;
  labelClass: string;
  instrument: string;
  batch: string;
  imageSrc: string;
  imageAlt: string;
  signals: string;
}

const NMR_CARDS: NMRCard[] = [
  {
    label: "¹H NMR",
    labelClass: "text-accent",
    instrument: "400 MHz · CDCl₃",
    batch: "BATCH 01",
    imageSrc: "/nmr/bromantane-nmr-h1.png",
    imageAlt: "¹H NMR spectrum of Bromantane — Batch 01",
    signals:
      "Key signals: δ 7.14 (d, J=8.6 Hz, 2H, ArH), 6.57 (d, J=8.6 Hz, 2H, ArH), 5.74 (s, 1H, NH), 3.40–3.33 (m, 1H, CH), 2.50 (br s, 2H), 1.81 (br m, 15H)",
  },
  {
    label: "¹³C NMR",
    labelClass: "text-ink",
    instrument: "100 MHz · CDCl₃",
    batch: "BATCH 01",
    imageSrc: "/nmr/bromantane-nmr-c13.png",
    imageAlt: "¹³C NMR spectrum of Bromantane — Batch 01",
    signals:
      "Key signals: δ 147.20, 131.24, 114.27, 105.58, 55.88, 39.53, 37.24, 36.74, 30.84, 26.95, 26.81",
  },
];

export function PuritySection() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightboxSrc]);

  return (
    <section className="bg-raised py-12 md:py-[72px]">
      <Container>
        {/* Header */}
        <div className="max-w-[680px] mx-auto text-center mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent mb-3">
            BATCH 01 · QUALITY VERIFICATION
          </p>
          <h2 className="font-sans font-semibold tracking-[-0.02em] text-ink text-[28px] md:text-[clamp(28px,2.5vw,34px)]">
            {"Verifiable by design."}
          </h2>
          <p className="font-sans text-[15px] text-secondary leading-relaxed mt-3">
            {"Every batch is characterised by ¹H and ¹³C NMR spectroscopy. The raw FID files are published below — process them yourself in MestReNova, TopSpin, or any compatible NMR software."}
          </p>
        </div>

        {/* NMR cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {NMR_CARDS.map((card) => (
            <div
              key={card.imageSrc}
              className="bg-card border border-border rounded overflow-hidden"
            >
              {/* Card header */}
              <div className="px-5 py-4 border-b border-border flex justify-between items-start">
                <div>
                  <p className={`font-mono text-[11px] uppercase tracking-[0.12em] ${card.labelClass}`}>
                    {card.label}
                  </p>
                  <p className="font-mono text-[11px] text-secondary mt-1">
                    {card.instrument}
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] border border-border rounded px-2.5 py-1 text-secondary">
                  {card.batch}
                </span>
              </div>

              {/* Image */}
              <div
                className="bg-page p-4 cursor-zoom-in"
                onClick={() => setLightboxSrc(card.imageSrc)}
              >
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              {/* Signals */}
              <div className="px-5 py-4 font-mono text-[11px] text-secondary leading-relaxed">
                {card.signals}
              </div>
            </div>
          ))}
        </div>

        {/* FID download block */}
        <div className="mt-6 bg-card border border-border rounded p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-sans text-[14px] font-medium text-ink">
              Raw FID data
            </p>
            <p className="font-mono text-[11px] text-secondary mt-1">
              Original spectrometer output. Compatible with MestReNova, TopSpin, and standard NMR software.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="/downloads/Bromantane-H1.zip"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border rounded px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink hover:bg-raised transition-colors"
            >
              {"¹H FID .zip"}
            </a>
            <a
              href="/downloads/Bromantane-C13.zip"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border rounded px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink hover:bg-raised transition-colors"
            >
              {"¹³C FID .zip"}
            </a>
          </div>
        </div>
      </Container>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setLightboxSrc(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              className="absolute top-[-40px] right-0 font-mono text-[13px] text-white/70 hover:text-white"
              onClick={() => setLightboxSrc(null)}
            >
              ESC / click to close
            </button>
            <Image
              src={lightboxSrc}
              alt="NMR spectrum enlarged view"
              width={1200}
              height={600}
              className="w-full h-auto rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
