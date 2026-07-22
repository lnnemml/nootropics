import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S06ValueProp1() {
  return (
    <LpSection id="benefits" variant="dark" className="noise-overlay">
      <div className="mb-16">
        <div className="image-frame">
          <Image
            src="/go/caffeine-vs-bromantane.png"
            alt="Your day on caffeine: 4 doses, spikes, crashes, poor sleep. Your day on NeuroDrive: one dose, steady focus, restful sleep."
            width={1200}
            height={896}
            className="w-full h-auto rounded-[2px]"
          />
        </div>
      </div>

      <div className="max-w-[640px]">
        <h2 className="font-sans text-[34px] leading-[1.15] tracking-[-0.015em] [text-wrap:pretty] font-bold text-white mb-6">
          Lock Into Deep Work for Hours Without Watching the Clock or Dreading the Crash
        </h2>
        <p className="font-sans text-[17px] text-white/[0.72] leading-[1.7] mb-4">
          {"NeuroDrive doesn't spike your dopamine and leave you stranded. It supports your brain's natural production cycle, so focus comes on smoothly and stays steady."}
        </p>
        <p className="font-sans text-[17px] text-white/[0.72] leading-[1.7] mb-10">
          No afternoon walls. No jittery tunnel vision. Just clean, sustained attention that lets
          you do your best work without fighting your own neurochemistry.
        </p>
        <CtaButton variant="outline" trackingLocation="vp1_focus" />
      </div>
    </LpSection>
  );
}
