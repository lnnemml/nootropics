import { LpSection } from "../_components/LpSection";

const COLUMNS = [
  {
    title: "The Caffeine Cycle",
    items: [
      "Blocks adenosine receptors temporarily",
      "Dopamine floods the synapse",
      "Receptors downregulate from overuse",
      "You need more to feel normal",
      "Anxiety, crashes, and disrupted sleep",
    ],
  },
  {
    title: "The Stimulant Trap",
    items: [
      "Forces dopamine release acutely",
      "Baseline drops after each dose",
      "Tolerance builds within weeks",
      "Performance becomes dose-dependent",
      "Withdrawal looks like motivational failure",
    ],
  },
];

export function S03Stimulants() {
  return (
    <LpSection id="stimulants" variant="dark">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-4">
          More Stimulation Is Not the Answer
        </h2>
        <p className="font-sans text-[16px] text-white/60 mb-12">
          {"Every stimulant you add borrows from tomorrow to pay for today."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {COLUMNS.map((col) => (
            <div
              key={col.title}
              className="border border-white/10 rounded-[2px] p-6 bg-white/5"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#1e9c78] mb-5">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-sans text-[15px] text-white/70"
                  >
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-white/30" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="font-sans text-[17px] text-white font-medium text-center max-w-xl mx-auto">
          {"You don't need another stimulant forcing your brain to perform. You need to restore the system itself."}
        </p>
      </div>
    </LpSection>
  );
}
