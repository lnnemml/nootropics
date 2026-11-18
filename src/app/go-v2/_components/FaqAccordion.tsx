"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

// theme controls readability on the section background. Default "dark" keeps the
// original styling; "light" is used where the FAQ section sits on a light bg.
const THEME = {
  dark: {
    divider: "border-b-white/10",
    activeBg: "bg-white/[0.025]",
    question: "text-white",
    answer: "text-white/65",
  },
  light: {
    divider: "border-b-[#2b3235]/12",
    activeBg: "bg-[#2b3235]/[0.03]",
    question: "text-[#2b3235]",
    answer: "text-[#2b3235]/70",
  },
} as const;

export function FaqAccordion({
  items,
  theme = "dark",
}: {
  items: FaqItem[];
  theme?: "dark" | "light";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = THEME[theme];

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          className={`border-b ${t.divider} border-l-2 transition-all duration-300 ${
            openIndex === i
              ? `pl-6 ${t.activeBg} border-l-[#1e9c78]`
              : "border-l-transparent"
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 text-left py-5"
          >
            <span className={`font-sans font-semibold ${t.question} text-[17px] leading-[1.4]`}>
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
              <p className={`font-sans text-[15px] ${t.answer} leading-[1.7] pt-3.5 pb-4 pr-8`}>
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
