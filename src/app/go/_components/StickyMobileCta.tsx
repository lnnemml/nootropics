"use client";

import { useState, useEffect } from "react";
import { CtaButton } from "./CtaButton";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] md:hidden bg-[#1f2528]/[0.92] backdrop-blur-[12px] border-t border-white/10 shadow-[0_-12px_32px_-12px_rgba(0,0,0,0.5)] transition-transform duration-[350ms] ${
        visible ? "translate-y-0" : "translate-y-[110%]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-0.5 flex-shrink-0">
          <span className="font-mono text-[9px] tracking-[0.12em] text-white/55 uppercase">
            NeuroDrive
          </span>
          <span className="font-mono text-[9px] tracking-[0.12em] text-[#1e9c78] uppercase">
            80mg/ml · 30 days
          </span>
        </div>
        <CtaButton
          href="/checkout?qty=1"
          trackingLocation="sticky_mobile"
          className="flex-1 min-h-[50px] justify-center"
        />
      </div>
    </div>
  );
}
