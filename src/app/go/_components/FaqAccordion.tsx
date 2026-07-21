"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          className={`border-b border-b-white/10 border-l-2 pl-6 transition-all duration-300 ${
            openIndex === i
              ? "border-l-[#1e9c78] bg-white/[0.025]"
              : "border-l-transparent"
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 text-left py-4"
          >
            <span className="font-sans font-medium text-white text-base leading-snug">
              {item.question}
            </span>
            <span
              className={`flex-shrink-0 font-mono text-[#1e9c78] text-xl leading-none mt-0.5 transition-transform duration-300 ${
                openIndex === i ? "rotate-45" : "rotate-0"
              }`}
            >
              +
            </span>
          </button>
          <div
            style={{
              display: "grid",
              gridTemplateRows: openIndex === i ? "1fr" : "0fr",
              transition: "grid-template-rows 350ms ease",
            }}
          >
            <div className="overflow-hidden">
              <p className="font-sans text-sm text-white/70 leading-relaxed pb-4 pr-8">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
