"use client";

import { useState, useEffect, useRef } from "react";

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
      className="relative w-full overflow-hidden rounded-[2px] bg-[#4b5563]"
      style={{ aspectRatio: "3/4" }}
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
        <div className="relative w-full h-full flex-shrink-0 bg-[#4b5563] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <p className="font-mono text-xs uppercase text-white/40">PRODUCT SHOT</p>
            <p className="font-mono text-xs uppercase text-white/40">Bottle + Dropper / Dark BG</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-8">
            <p className="font-mono text-xs text-white/60">
              NEURODRIVE · Sublingual Bromantane · 80mg/ml
            </p>
          </div>
        </div>

        {/* Slide 1 — How To Use */}
        <div className="relative w-full h-full flex-shrink-0 bg-[#4b5563] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <p className="font-mono text-xs uppercase text-white/40">IN USE</p>
            <p className="font-mono text-xs uppercase text-white/40">Dropper under tongue / Close-up</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-8">
            <p className="font-mono text-xs text-white/60">
              One dropper. Under the tongue. 15 min to onset.
            </p>
          </div>
        </div>

        {/* Slide 2 — Dream Outcome */}
        <div className="relative w-full h-full flex-shrink-0 bg-[#4b5563] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <p className="font-mono text-xs uppercase text-white/40">LIFESTYLE</p>
            <p className="font-mono text-xs uppercase text-white/40">Developer in deep focus / Natural light</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-8">
            <p className="font-sans text-base font-bold text-white text-center">
              Calm Focus. All Day. No Crash.
            </p>
          </div>
        </div>

        {/* Slide 3 — Mechanism / Proof */}
        <div className="relative w-full h-full flex-shrink-0 bg-[#2b3235] flex flex-col items-center justify-center px-6 gap-5">
          <p className="font-mono text-xs uppercase text-[#1e9c78] text-center leading-relaxed">
            NOT A STIMULANT. A DOPAMINE SYNTHESIZER.
          </p>
          <svg
            viewBox="0 0 120 60"
            className="w-full max-w-[180px]"
            aria-hidden="true"
          >
            {/* Stimulants — spike then drop */}
            <polyline
              points="10,50 30,10 50,45 110,50"
              fill="none"
              stroke="#e57373"
              strokeWidth="2"
              strokeOpacity="0.6"
              strokeLinejoin="round"
            />
            {/* NeuroDrive — gradual rise then plateau */}
            <polyline
              points="10,50 40,35 70,25 110,22"
              fill="none"
              stroke="#1e9c78"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <text x="52" y="8" fontFamily="monospace" fontSize="6" fill="#e57373" fillOpacity="0.7">
              Stimulants
            </text>
            <text x="72" y="21" fontFamily="monospace" fontSize="6" fill="#1e9c78">
              NeuroDrive
            </text>
          </svg>
          <ul className="flex flex-col gap-2 self-start">
            {[
              "30+ years of clinical research",
              "728-patient randomized trial",
              "NMR-verified purity",
              "Zero tolerance buildup",
            ].map((item) => (
              <li key={item} className="font-mono text-xs flex gap-2">
                <span className="text-[#1e9c78]">✓</span>
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
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
