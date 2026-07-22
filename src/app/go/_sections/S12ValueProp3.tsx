import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S12ValueProp3() {
  return (
    <LpSection variant="dark" className="noise-overlay">
      <div className="mb-16">
        <div className="image-frame">
          <Image
            src="/go/dual-mechanism.png"
            alt="Dual action mechanism: Pathway 1 pro-cognitive (focus, motivation, drive) and Pathway 2 anxiolytic (calm, resilience, composure) combine into the NeuroDrive effect."
            width={1200}
            height={896}
            className="w-full h-auto rounded-[2px]"
          />
        </div>
      </div>

      <div className="max-w-[640px]">
        <h2 className="font-sans text-[34px] leading-[1.15] tracking-[-0.015em] [text-wrap:pretty] font-bold text-white mb-6">
          Feel Sharp and Calm at the Same Time. The Combination Stimulants Can Never Deliver.
        </h2>
        <p className="font-sans text-[17px] text-white/[0.72] leading-[1.7] mb-4">
          {"Bromantane is classified as both a psychostimulant and an anxiolytic. That's not a contradiction. It's the mechanism."}
        </p>
        <p className="font-sans text-[17px] text-white/[0.72] leading-[1.7] mb-4">
          While stimulants trade calm for focus, bromantane supports both pathways simultaneously.
          The result is a focused state without tension, without racing thoughts, and without the
          emotional blunting that amphetamines are known for.
        </p>
        <p className="font-sans text-[17px] text-white/[0.72] leading-[1.7] mb-10">
          {"You stay you. Just the sharp, present, engaged version."}
        </p>
        <CtaButton trackingLocation="vp3_clarity" />
      </div>
    </LpSection>
  );
}
