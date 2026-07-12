import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

const DIFFS = [
  {
    title: "Non-stimulant",
    description: "No caffeine, no amphetamine class compounds. Acts on synthesis, not release.",
  },
  {
    title: "No tolerance buildup",
    description: "Mechanism works by training the system, not depleting it. Gets better over time.",
  },
  {
    title: "Anxiolytic + focus",
    description: "Clinically noted calming effect alongside dopaminergic enhancement. Calm and driven.",
  },
  {
    title: "Sublingual delivery",
    description: "Under-tongue absorption bypasses first-pass metabolism for faster, more reliable onset.",
  },
  {
    title: "One ingredient",
    description: "No proprietary blends, no kitchen-sink stacks. One compound, one purpose, full dose.",
  },
  {
    title: "NMR-verified purity",
    description: "Nuclear magnetic resonance spectroscopy confirms ≥98% purity. Not a label claim.",
  },
];

export function S07Differentiators() {
  return (
    <LpSection id="differentiators" variant="dark">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          {"How NeuroDrive Is Different"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-14">
          {DIFFS.map((d) => (
            <div
              key={d.title}
              className="border border-white/10 rounded-[2px] p-5 bg-white/5"
            >
              <h3 className="font-sans text-[15px] font-semibold text-white mb-2">
                {d.title}
              </h3>
              <p className="font-sans text-[13px] text-white/60 leading-relaxed">
                {d.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <CtaButton
            href="/checkout?qty=1"
            trackingLocation="differentiators"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </LpSection>
  );
}
