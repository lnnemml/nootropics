"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const TOTAL = 4;
const AUTO_MS = 4000;
const PAUSE_MS = 8000;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function startInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % TOTAL);
    }, AUTO_MS);
  }

  function pauseAndResume() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(startInterval, PAUSE_MS);
  }

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  function goTo(index: number) {
    setCurrent(index);
    pauseAndResume();
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) < 50) return;
    goTo(delta < 0 ? (current + 1) % TOTAL : (current - 1 + TOTAL) % TOTAL);
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-[2px] bg-[#2b3235]"
      style={{ aspectRatio: "4/5" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide track */}
      <div
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: "transform 500ms ease-in-out",
        }}
      >
        {/* Slide 0 — What It Is */}
        <div className="relative w-full h-full flex-shrink-0">
          <Image
            src="/go/hero-1.png"
            alt="NeuroDrive sublingual bromantane drops bottle"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-8">
            <p className="font-mono text-xs text-white/60">
              NEURODRIVE · Sublingual Bromantane · 80mg/ml
            </p>
          </div>
        </div>

        {/* Slide 1 — How To Use */}
        <div className="relative w-full h-full flex-shrink-0">
          <Image
            src="/go/hero-2.png"
            alt="Sublingual dropper application"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-8">
            <p className="font-mono text-xs text-white/60">
              One dropper. Under the tongue. 15 min to onset.
            </p>
          </div>
        </div>

        {/* Slide 2 — Dream Outcome */}
        <div className="relative w-full h-full flex-shrink-0">
          <Image
            src="/go/hero-3.png"
            alt="Developer in deep focus state"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-8">
            <p className="font-sans text-base font-bold text-white text-center">
              Calm Focus. All Day. No Crash.
            </p>
          </div>
        </div>

        {/* Slide 3 — Mechanism / Proof (designed card, not a photo) */}
        <div className="relative w-full h-full flex-shrink-0">
          <Image
            src="/go/hero-4.png"
            alt="NeuroDrive mechanism: not a stimulant, a dopamine synthesizer"
            fill
            className="object-contain bg-[#2b3235]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === current ? "bg-[#1e9c78]" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
