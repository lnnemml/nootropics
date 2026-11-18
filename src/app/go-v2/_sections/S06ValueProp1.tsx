import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S06ValueProp1() {
  return (
    <LpSection id="benefits" variant="dark" className="noise-overlay">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-8 h-px bg-[#1e9c78] flex-shrink-0" />
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1e9c78]">
          Deep focus
        </p>
      </div>

      <div className="max-w-[640px]">
        <h2 className="font-sans text-[30px] md:text-[34px] leading-[1.15] tracking-[-0.015em] [text-wrap:pretty] font-bold text-white mb-6">
          {"Made for deep work — not another caffeine sprint."}
        </h2>

        <p className="font-sans text-[17px] md:text-[19px] text-white/[0.72] leading-[1.7] mb-4">
          {"You know the state. The hours disappear, the hard problem finally cracks, and you look up wondering where the time went. That's the mode the real work gets done in."}
        </p>

        <p className="font-sans text-[17px] md:text-[19px] text-white/[0.72] leading-[1.7] mb-4">
          {"A caffeine sprint was never built to carry that. It spikes, then drops you into the afternoon wall — right when the work needs you most."}
        </p>

        <p className="font-sans text-[17px] md:text-[19px] text-white/[0.72] leading-[1.7] mb-4">
          {"NeuroDrive is built for the long stretches instead — steady support for your dopamine system, not a stimulant push."}
        </p>

        <p className="font-sans text-[17px] md:text-[19px] text-white/[0.85] leading-[1.7] mb-10 font-medium">
          {"This is for the deep-work days — the ones a wired sprint was never going to carry."}
        </p>

        <CtaButton variant="outline" trackingLocation="vp1_focus" />
      </div>
    </LpSection>
  );
}
