import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S10Differentiators() {
  return (
    <LpSection variant="dark" className="noise-overlay">
      <div className="flex items-center gap-4 mb-16">
        <div className="w-8 h-px bg-[#1e9c78] flex-shrink-0" />
        <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.015em] text-white">
          Built Different. By Design.
        </h2>
      </div>

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
