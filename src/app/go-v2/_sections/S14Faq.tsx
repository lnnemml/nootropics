import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { FaqAccordion } from "../_components/FaqAccordion";

const FAQ_ITEMS = [
  {
    question: "Is bromantane safe?",
    answer:
      "In published human research, bromantane has been well-tolerated, with no abuse-potential signal reported. We keep it simple: a single high-purity compound, with every batch verified by NMR. It is still a research compound, and everyone is different — so check with your healthcare provider before starting anything new.",
  },
  {
    question: "Is it legal?",
    answer:
      "Yes — bromantane is unscheduled and legal to buy in the countries we ship to. The one exception is competitive sport: it is banned by WADA, so if you are a drug-tested athlete, skip it. For everyone else, you are clear.",
  },
  {
    question: "Will I build tolerance?",
    answer:
      "Different mechanism, different story. Stimulants lean on the dopamine you already have, so the effect fades as those stores run down — that is tolerance. Bromantane supports your system's own dopamine synthesis instead, and it hasn't shown the rapid tolerance stimulants do. It's built for steady, ongoing use, not a quick hit.",
  },
  {
    question: "How is this different from modafinil or Adderall?",
    answer:
      "Adderall forces your neurons to dump dopamine, then leaves you to crash. Modafinil is milder and works differently — mostly promoting wakefulness by acting on dopamine transport and the brain's arousal signals. Bromantane is in neither camp: instead of pushing dopamine out, it supports tyrosine hydroxylase, the enzyme that sets how much dopamine your brain can build. It helps your system make more, rather than spending what it already has.",
  },
  {
    question: "When will I feel results?",
    answer:
      "Two timelines worth separating. The formula: our sublingual drops are designed to absorb fast — held under the tongue, the compound crosses the mucosa directly instead of waiting on digestion, so it acts faster than swallowing a powder. The mechanism: bromantane works by supporting your dopamine system's own synthesis, which is gradual support rather than an acute stimulant hit. So it isn't a jolt you'll clock at a set minute, and we won't promise you a certain feeling by a certain day. It's built for consistent, ongoing use.",
  },
];

export function S14Faq() {
  return (
    <LpSection id="faq" variant="light">
      <div className="grid md:grid-cols-[35fr_65fr] gap-10 md:gap-20 items-start">
        <div className="hidden md:block">
          <div className="bg-white border border-[#2b3235]/[0.08] p-3 rounded-[2px] shadow-[0_24px_56px_-32px_rgba(43,50,53,0.3)]">
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
            <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.015em] text-[#2b3235]">
              Questions
            </h2>
          </div>
          <FaqAccordion items={FAQ_ITEMS} theme="light" />
          <div className="mt-10">
            <CtaButton trackingLocation="faq" />
          </div>
        </div>
      </div>
    </LpSection>
  );
}
