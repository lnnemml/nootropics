import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S10Differentiators() {
  return (
    <LpSection variant="dark" className="noise-overlay">
      <h2 className="font-sans font-bold text-white mb-10 section-heading-dash text-[28px] md:text-[34px] tracking-[-0.015em]">
        Built Different. By Design.
      </h2>

      <div className="mb-10">
        <div className="image-frame-teal">
          <Image
            src="/go/comparison-table.png"
            alt="NeuroDrive vs Stimulants and Stacks: NeuroDrive wins on mechanism, tolerance, crash, side effects, ingredients, onset, and long-term effects."
            width={1200}
            height={896}
            className="w-full h-auto rounded-[2px]"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="differentiators" />
      </div>
    </LpSection>
  );
}
