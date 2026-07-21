import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S12ValueProp3() {
  return (
    <LpSection variant="dark">
      <div className="mb-10">
        <Image
          src="/go/dual-mechanism.png"
          alt="Dual action mechanism: Pathway 1 pro-cognitive (focus, motivation, drive) and Pathway 2 anxiolytic (calm, resilience, composure) combine into the NeuroDrive effect."
          width={1200}
          height={896}
          className="w-full h-auto rounded-[2px]"
        />
      </div>

      <div className="max-w-2xl">
        <h2 className="font-sans text-2xl md:text-3xl font-bold text-white leading-tight mb-5">
          Feel Sharp and Calm at the Same Time. The Combination Stimulants Can Never Deliver.
        </h2>
        <p className="font-sans text-base text-white/80 leading-relaxed mb-4">
          {"Bromantane is classified as both a psychostimulant and an anxiolytic. That's not a contradiction. It's the mechanism."}
        </p>
        <p className="font-sans text-base text-white/80 leading-relaxed mb-4">
          While stimulants trade calm for focus, bromantane supports both pathways simultaneously.
          The result is a focused state without tension, without racing thoughts, and without the
          emotional blunting that amphetamines are known for.
        </p>
        <p className="font-sans text-base text-white/80 leading-relaxed mb-8">
          {"You stay you. Just the sharp, present, engaged version."}
        </p>
        <CtaButton trackingLocation="vp3_clarity" />
      </div>
    </LpSection>
  );
}
