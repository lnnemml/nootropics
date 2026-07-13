import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

const STIMULANTS = [
  "Force dopamine release",
  "Temporary spike, then crash",
  "Tolerance builds quickly",
  "You need more to feel the same",
  "Depletes your reserves over time",
];

const NEURODRIVE = [
  "Upregulates tyrosine hydroxylase enzyme",
  "Your brain produces more dopamine naturally",
  "No tolerance, works better with consistent use",
  "Steady baseline, not a spike",
  "Restores what stimulants deplete",
];

const STEPS = [
  {
    num: "01",
    title: "ABSORB",
    body: "Sublingual drops enter your bloodstream in 15 to 30 minutes, bypassing digestion for faster onset and higher bioavailability.",
  },
  {
    num: "02",
    title: "SYNTHESIZE",
    body: "Bromantane upregulates tyrosine hydroxylase, the rate-limiting enzyme in dopamine production. Your brain starts making more dopamine on its own.",
  },
  {
    num: "03",
    title: "PERFORM",
    body: "Dopamine levels normalize over days. Focus sharpens. Motivation returns. Calm and clarity coexist without stimulant side effects.",
  },
];

export function S08Mechanism() {
  return (
    <LpSection id="mechanism" variant="dark">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-10">
        Why NeuroDrive Works When Everything Else Failed
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-14">
        <div className="border border-white/10 rounded-[2px] p-6">
          <h3 className="font-mono text-xs uppercase tracking-wider text-red-400/70 mb-5">
            STIMULANTS (Caffeine, Adderall)
          </h3>
          <ul className="space-y-3">
            {STIMULANTS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-white/30 flex-shrink-0 mt-0.5">→</span>
                <span className="font-sans text-sm text-white/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-[#1e9c78]/40 rounded-[2px] p-6 bg-[#1e9c78]/5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#1e9c78] mb-5">
            NEURODRIVE (Bromantane)
          </h3>
          <ul className="space-y-3">
            {NEURODRIVE.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[#1e9c78] flex-shrink-0 mt-0.5">→</span>
                <span className="font-sans text-sm text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {STEPS.map((step) => (
          <div key={step.num} className="border border-white/10 rounded-[2px] p-6">
            <p className="font-mono text-3xl font-medium text-[#1e9c78]/40 mb-3">{step.num}</p>
            <h3 className="font-mono text-xs uppercase tracking-wider text-white mb-3">
              {step.title}
            </h3>
            <p className="font-sans text-sm text-white/70 leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="mechanism" />
      </div>
    </LpSection>
  );
}
