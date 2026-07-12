import { LpSection } from "../_components/LpSection";

const BENEFITS = [
  {
    title: "Sustained Focus Without the Crash",
    description:
      "Hours of productive work — no spike, no slump, no 3pm wall. The kind of focus that feels natural because it is.",
  },
  {
    title: "Motivation That Doesn't Burn You Out",
    description:
      "The drive to start hard tasks, persist through difficulty, and come back the next day with the same energy.",
  },
  {
    title: "Calm Clarity, Not Wired Anxiety",
    description:
      "Bromantane carries anxiolytic properties alongside its dopaminergic effects. Focused — not frantic.",
  },
];

export function S05Benefits() {
  return (
    <LpSection id="benefits" variant="dark">
      <div className="text-center mb-12">
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-white">
          What You'll Feel
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="border border-white/10 rounded-[2px] p-7 bg-white/5 hover:border-[#1e9c78]/60 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 mb-5" />
            <h3 className="font-sans text-[17px] font-semibold text-white mb-3">
              {b.title}
            </h3>
            <p className="font-sans text-[14px] text-white/60 leading-relaxed">
              {b.description}
            </p>
          </div>
        ))}
      </div>
    </LpSection>
  );
}
