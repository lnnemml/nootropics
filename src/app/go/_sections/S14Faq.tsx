import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { ImagePlaceholder } from "../_components/ImagePlaceholder";
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
    <LpSection id="faq" variant="dark">
      <div className="grid md:grid-cols-[35fr_65fr] gap-10 md:gap-14 items-start">
        <div className="hidden md:block">
          <ImagePlaceholder aspectRatio="3/4" label="Product Detail Shot" />
        </div>
        <div>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-8">Questions</h2>
          <FaqAccordion items={FAQ_ITEMS} />
          <div className="mt-10">
            <CtaButton trackingLocation="faq" />
          </div>
        </div>
      </div>
    </LpSection>
  );
}
