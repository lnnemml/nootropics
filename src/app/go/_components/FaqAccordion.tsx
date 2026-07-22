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
          className={`border-b border-b-white/10 border-l-2 transition-all duration-300 ${
            openIndex === i
              ? "pl-6 bg-white/[0.025] border-l-[#1e9c78]"
              : "border-l-transparent"
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 text-left py-5"
          >
            <span className="font-sans font-semibold text-white text-[17px] leading-[1.4]">
              {item.question}
            </span>
            <span
              className={`flex-shrink-0 font-mono text-[#1e9c78] text-xl leading-none mt-0.5 inline-block transition-transform duration-300 ${
                openIndex === i ? "rotate-45" : "rotate-0"
              }`}
            >
              +
            </span>
          </button>
          <div
            className={`grid transition-[grid-template-rows] duration-[350ms] ${
              openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="font-sans text-[15px] text-white/65 leading-[1.7] pt-3.5 pb-4 pr-8">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
