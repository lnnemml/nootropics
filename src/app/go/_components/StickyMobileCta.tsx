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
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden bg-[#2b3235]/95 backdrop-blur-sm border-t border-white/10 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <CtaButton
        href="/checkout?qty=1"
        trackingLocation="sticky_mobile"
        className="w-full"
      />
    </div>
  );
}
