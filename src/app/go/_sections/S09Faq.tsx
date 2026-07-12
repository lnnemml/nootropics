"use client";

import { useState } from "react";
import { LpSection } from "../_components/LpSection";

const FAQS = [
  {
    q: "Is bromantane safe?",
    a: "Bromantane has a well-documented safety profile developed over decades of research. At typical doses, no serious adverse effects have been reported in the published literature. These statements reflect research findings and have not been evaluated by the FDA. Consult your healthcare provider before starting any new supplement.",
  },
  {
    q: "Is it legal?",
    a: "Yes. Bromantane is not a scheduled or controlled substance in the United States, Canada, or the European Union. It is legal to purchase and use for personal research. Verify the regulations in your specific jurisdiction before ordering.",
  },
  {
    q: "Will I build tolerance?",
    a: "Unlike stimulants that deplete dopamine reserves with each dose, bromantane upregulates tyrosine hydroxylase — the enzyme responsible for dopamine synthesis. The mechanism targets upstream production rather than downstream release, which is why tolerance buildup is not the typical outcome reported in the literature or community.",
  },
  {
    q: "How is this different from modafinil?",
    a: "Modafinil promotes wakefulness primarily by inhibiting dopamine reuptake — the same dopamine is recycled more aggressively. Many users report diminishing returns over time. Bromantane targets upstream production, supporting the dopamine supply rather than slowing its removal. The subjective experience is calmer and less acutely stimulating.",
  },
  {
    q: "When will I feel it?",
    a: "Sublingual delivery allows faster absorption than oral capsules. Many users notice subtle changes within the first week, with more pronounced effects emerging over 2–4 weeks of consistent use. Individual response varies based on baseline dopaminergic tone and lifestyle factors.",
  },
];

export function S09Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <LpSection id="faq" variant="dark">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-10">
          Questions
        </h2>

        <div className="flex flex-col divide-y divide-white/10">
          {FAQS.map((faq, i) => (
            <div key={faq.q}>
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4"
              >
                <span className="font-sans text-[16px] font-medium text-white">
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 w-5 h-5 border border-white/30 rounded-[2px] flex items-center justify-center transition-transform duration-200 ${
                    openIdx === i ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                  >
                    <line x1="5" y1="0" x2="5" y2="10" />
                    <line x1="0" y1="5" x2="10" y2="5" />
                  </svg>
                </span>
              </button>
              <div
                style={{
                  maxHeight: openIdx === i ? "300px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <p className="pb-6 font-sans text-[15px] text-white/65 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LpSection>
  );
}
