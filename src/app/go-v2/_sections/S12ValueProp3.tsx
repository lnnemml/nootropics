import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S12ValueProp3() {
  return (
    <LpSection variant="dark" className="noise-overlay">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-8 h-px bg-[#1e9c78] flex-shrink-0" />
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1e9c78]">
          Calm clarity
        </p>
      </div>

      <div className="max-w-[640px]">
        <h2 className="font-sans text-[30px] md:text-[34px] leading-[1.15] tracking-[-0.015em] [text-wrap:pretty] font-bold text-white mb-6">
          {"Sharp doesn't have to mean wired."}
        </h2>

        <p className="font-sans text-[17px] md:text-[19px] text-white/[0.72] leading-[1.7] mb-4">
          {"Most things that make you sharper also wind you up — the jittery hands, the clenched-jaw buzz, the feeling of running a little too hot. That's the stimulant tax."}
        </p>

        <p className="font-sans text-[17px] md:text-[19px] text-white/[0.72] leading-[1.7] mb-4">
          {"NeuroDrive is built to skip that tax. It doesn't force a stimulant spike — so the wound-up, jittery edge that rides along with caffeine or Adderall was never part of how it works."}
        </p>

        <p className="font-sans text-[17px] md:text-[19px] text-white/[0.85] leading-[1.7] mb-10 font-medium">
          {"This is for the people who want to be sharp without being amped up — clear-headed, not keyed up."}
        </p>

        <CtaButton trackingLocation="vp3_clarity" />
      </div>
    </LpSection>
  );
}
