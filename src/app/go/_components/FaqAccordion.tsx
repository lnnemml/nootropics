"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-white/10">
      {items.map((item, i) => (
        <div key={i} className="py-4">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 text-left"
          >
            <span className="font-sans font-medium text-white text-base leading-snug">
              {item.question}
            </span>
            <span className="flex-shrink-0 font-mono text-[#1e9c78] text-xl leading-none mt-0.5">
              {openIndex === i ? "−" : "+"}
            </span>
          </button>
          <div
            style={{
              display: "grid",
              gridTemplateRows: openIndex === i ? "1fr" : "0fr",
              transition: "grid-template-rows 300ms ease",
            }}
          >
            <div className="overflow-hidden">
              <p className="font-sans text-sm text-white/70 leading-relaxed pt-3 pr-8">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
