import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S06ValueProp1() {
  return (
    <LpSection id="benefits" variant="dark">
      <div className="mb-10">
        <Image
          src="/go/caffeine-vs-bromantane.png"
          alt="Your day on caffeine: 4 doses, spikes, crashes, poor sleep. Your day on NeuroDrive: one dose, steady focus, restful sleep."
          width={1200}
          height={896}
          className="w-full h-auto rounded-[2px]"
        />
      </div>

      <div className="max-w-2xl">
        <h2 className="font-sans text-2xl md:text-3xl font-bold text-white leading-tight mb-5">
          Lock Into Deep Work for Hours Without Watching the Clock or Dreading the Crash
        </h2>
        <p className="font-sans text-base text-white/80 leading-relaxed mb-4">
          {"NeuroDrive doesn't spike your dopamine and leave you stranded. It supports your brain's natural production cycle, so focus comes on smoothly and stays steady."}
        </p>
        <p className="font-sans text-base text-white/80 leading-relaxed mb-8">
          No afternoon walls. No jittery tunnel vision. Just clean, sustained attention that lets
          you do your best work without fighting your own neurochemistry.
        </p>
        <CtaButton variant="outline" trackingLocation="vp1_focus" />
      </div>
    </LpSection>
  );
}
