import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { FaqAccordion } from "../_components/FaqAccordion";

const FAQ_ITEMS = [
  {
    question: "Is bromantane safe?",
    answer:
      "Bromantane has been used clinically in Russia as Ladasten for treating neurasthenia. It is non-addictive and well-tolerated at recommended dosages. No significant adverse effects have been reported in the published literature. As with any supplement, consult your healthcare provider before use.",
  },
  {
    question: "Is it legal?",
    answer:
      "Yes. Bromantane is unscheduled and legal to purchase and use in the United States, Canada, the European Union, and Australia. It is banned only in competitive athletics by WADA, not for general use.",
  },
  {
    question: "Will I build tolerance?",
    answer:
      "Unlike stimulants, bromantane does not show tolerance development in studies. Many users report that it works better with consistent use as dopamine synthesis normalizes over time.",
  },
  {
    question: "How is this different from modafinil or Adderall?",
    answer:
      "Modafinil blocks dopamine reuptake. Adderall forces dopamine release. Both are stimulant mechanisms that lead to tolerance and crashes. Bromantane upregulates tyrosine hydroxylase, the enzyme responsible for dopamine production. It helps your brain make more dopamine naturally rather than depleting existing stores.",
  },
  {
    question: "When will I feel results?",
    answer:
      "Sublingual onset is typically 15 to 30 minutes. Most users report noticeable improvements in focus and motivation within the first week. Cumulative benefits build over 2 to 4 weeks of consistent use.",
  },
];

export function S14Faq() {
  return (
    <LpSection
      id="faq"
      variant="dark"
      className="noise-overlay"
      style={{ background: "linear-gradient(180deg, #2b3235, #262d30)" }}
    >
      <div className="grid md:grid-cols-[35fr_65fr] gap-10 md:gap-20 items-start">
        <div className="hidden md:block">
          <div className="image-frame" style={{ padding: "12px" }}>
            <Image
              src="/go/product-detail.png"
              alt="NeuroDrive bottle product detail"
              width={896}
              height={1200}
              className="w-full h-auto rounded-[2px]"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4 mb-11">
            <div className="w-8 h-px bg-[#1e9c78] flex-shrink-0" />
            <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.015em] text-white">
              Questions
            </h2>
          </div>
          <FaqAccordion items={FAQ_ITEMS} />
          <div className="mt-10">
            <CtaButton trackingLocation="faq" />
          </div>
        </div>
      </div>
    </LpSection>
  );
}
