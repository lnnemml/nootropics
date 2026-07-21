import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S10Differentiators() {
  return (
    <LpSection variant="dark">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-10">
        Built Different. By Design.
      </h2>

      <div className="mb-10">
        <Image
          src="/go/comparison-table.png"
          alt="NeuroDrive vs Stimulants and Stacks: NeuroDrive wins on mechanism, tolerance, crash, side effects, ingredients, onset, and long-term effects."
          width={1200}
          height={896}
          className="w-full h-auto rounded-[2px]"
        />
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="differentiators" />
      </div>
    </LpSection>
  );
}
