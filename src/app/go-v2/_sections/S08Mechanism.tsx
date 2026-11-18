import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S08Mechanism() {
  return (
    <LpSection
      id="mechanism"
      variant="dark"
      className="noise-overlay"
      style={{ background: "linear-gradient(180deg, #262d30, #2b3235)" }}
    >
      {/* Top teal hairline */}
      <div className="teal-divider absolute top-0 left-0 right-0" />

      <div className="flex items-center gap-4 mb-10">
        <div className="w-8 h-px bg-[#1e9c78] flex-shrink-0" />
        <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.015em] text-white [text-wrap:pretty]">
          {"Stimulants force dopamine out. NeuroDrive helps your brain make its own."}
        </h2>
      </div>

      <div className="max-w-3xl space-y-[26px] font-sans text-[17px] md:text-[19px] text-white/70 leading-[1.7] mb-[72px]">
        <p className="text-white/90">
          {"You asked how. Here it is — the difference is where each one acts."}
        </p>

        <p>
          {"A stimulant is like flooring the gas. Adderall forces your neurons to dump dopamine all at once: you get the spike, then the tank runs dry — and that's the crash. Caffeine works the other way. It doesn't add energy; it blocks the signal that tells your brain you're tired. The lift is real, but it's borrowed — and when it wears off, the tiredness it was hiding lands all at once."}
        </p>

        <p>
          {"Bromantane works one level deeper. Instead of forcing a release, it supports "}
          <strong className="text-white font-semibold">tyrosine hydroxylase</strong>
          {" — the enzyme that sets how much dopamine your brain is able to build in the first place."}
        </p>

        <p>
          {"So it isn't topping you up from the outside. It's helping your own system restore its capacity to make dopamine — working with your brain chemistry, not flogging it."}
        </p>

        <p className="font-semibold text-[#3fbf97] text-[21px] md:text-[24px] tracking-[-0.01em] leading-[1.35] border-l-2 border-[#1e9c78] pl-6">
          {"No forced spike, no empty tank on the far side. That's what \"restore, don't stimulate\" actually means."}
        </p>
      </div>

      {/* Side-by-side comparison */}
      <div className="mb-[72px]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#1e9c78] flex-shrink-0" />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1e9c78]">
            Side by side
          </p>
        </div>
        <div className="image-frame">
          <Image
            src="/go/stimulants-vs.png"
            alt="Comparison: stimulants force dopamine release; NeuroDrive supports dopamine synthesis instead"
            width={1200}
            height={896}
            className="w-full h-auto rounded-[2px]"
          />
        </div>
      </div>

      {/* How you take it — effort reducer */}
      <div className="max-w-3xl space-y-[26px] font-sans text-[17px] md:text-[19px] text-white/70 leading-[1.7] mb-12">
        <p className="text-white/90 font-semibold text-[21px] md:text-[24px] tracking-[-0.01em]">
          And it&apos;s about as simple as it gets.
        </p>
        <p>
          {"One dropper, held under the tongue. Sublingual means it absorbs directly — no pills, no timing it around meals, no fifteen-capsule stack to choke down."}
        </p>
      </div>

      <div className="mb-16">
        <div className="image-frame">
          <Image
            src="/go/how-it-works.png"
            alt="How to take NeuroDrive: dose one dropper under the tongue, it absorbs sublingually, and it supports your brain's dopamine synthesis"
            width={1200}
            height={896}
            className="w-full h-auto rounded-[2px]"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="mechanism" />
      </div>
    </LpSection>
  );
}
