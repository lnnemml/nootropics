import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S10FinalCta() {
  return (
    <LpSection id="final-cta" variant="teal">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <h2 className="font-sans text-3xl md:text-5xl font-bold text-white mb-5">
          Restore Your Edge
        </h2>
        <p className="font-sans text-[17px] text-white/80 leading-relaxed mb-10">
          {"Join the builders, coders, and thinkers who stopped forcing performance — and started restoring it."}
        </p>

        <CtaButton
          href="/checkout?qty=1"
          trackingLocation="final"
          className="w-full sm:w-auto bg-white text-[#1e9c78] hover:bg-white/90 border-0 text-base px-10 py-4"
        />

        <p className="mt-7 font-mono text-[11px] text-white/60 uppercase tracking-[0.12em]">
          {"Free worldwide shipping · NMR-verified purity · Legal in US, Canada, EU"}
        </p>
      </div>
    </LpSection>
  );
}
