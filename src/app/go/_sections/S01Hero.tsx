import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

const BADGES = [
  "Free worldwide shipping",
  "NMR-verified purity",
  "Legal in US · CA · EU",
];

export function S01Hero() {
  return (
    <LpSection id="hero" variant="dark" className="pt-20 md:pt-28">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 border border-white/20 px-3 py-1.5 rounded-[2px]"
            >
              {badge}
            </span>
          ))}
        </div>

        <h1 className="font-sans text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
          Feel Focused.{" "}
          <span className="text-[#1e9c78]">Clear.</span>{" "}
          Unshakably Driven.
        </h1>

        <p className="font-sans text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
          {"A dopamine stabilizer — not a stimulant. NeuroDrive restores your edge without the crash."}
        </p>

        <CtaButton
          href="/checkout?qty=1"
          trackingLocation="hero"
          className="w-full sm:w-auto text-base px-10 py-4"
        />

        <p className="mt-6 font-mono text-[11px] text-white/40 uppercase tracking-[0.12em]">
          {"80mg/ml · Pharmaceutical-grade · Sublingual drops · ~30 day supply"}
        </p>
      </div>
    </LpSection>
  );
}
