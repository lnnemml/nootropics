import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

const CARDS = [
  {
    title: "NON-STIMULANT",
    body: "No caffeine. No amphetamine. Works through dopamine synthesis, not forced release.",
  },
  {
    title: "NO TOLERANCE",
    body: "Gets better with consistent use. Not worse. No cycling required.",
  },
  {
    title: "FOCUS AND CALM",
    body: "Anxiolytic and pro-cognitive at the same time. The combination stimulants can never deliver.",
  },
  {
    title: "SUBLINGUAL DROPS",
    body: "15 to 30 minute onset. Higher bioavailability than capsules. Precise dosing with every drop.",
  },
  {
    title: "ONE INGREDIENT",
    body: "No kitchen-sink blend with 15 unknowns. One compound, pharmaceutical-grade, doing one job well.",
  },
  {
    title: "NMR-VERIFIED PURITY",
    body: "Every batch tested via nuclear magnetic resonance spectroscopy. You know exactly what you're getting.",
  },
];

export function S10Differentiators() {
  return (
    <LpSection variant="dark">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-10">
        Built Different. By Design.
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {CARDS.map(({ title, body }) => (
          <div key={title} className="border border-white/10 rounded-[2px] p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#1e9c78] mb-3">
              {title}
            </h3>
            <p className="font-sans text-sm text-white/80 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="differentiators" />
      </div>
    </LpSection>
  );
}
