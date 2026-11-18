import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

// One differentiator per row, phrased as a clean opposition. Competitors are
// anonymized ("the usual fixes") to avoid a Stage-5 slap-fight; the mechanism
// and format specifics do the arguing, not adjectives. No absolute/safety
// claims ("None/Zero/Never/Only") — every NeuroDrive cell is mechanism- or
// format-framed and traceable to the wiki.
const ROWS = [
  {
    axis: "How it works",
    nora: "Supports your brain's own dopamine synthesis.",
    usual: "Stimulants force it out; stacks flood it and hope something lands.",
  },
  {
    axis: "Coming down",
    nora: "No forced spike — so there's nothing to crash off.",
    usual: "Caffeine and Adderall spike you, then drop you.",
  },
  {
    axis: "How you take it",
    nora: "A few drops under the tongue — absorbs directly, easy to adjust.",
    usual: "Pills, powders, or a handful of capsules.",
  },
  {
    axis: "What's inside",
    nora: "A single studied compound.",
    usual: "One stimulant — or a dozen actives, something for everyone.",
  },
  {
    axis: "How it feels",
    nora: "Calm, not wired. It isn't a stimulant.",
    usual: "Wired, jittery, or hit-and-miss.",
  },
];

export function S10Differentiators() {
  return (
    <LpSection
      variant="dark"
      className="noise-overlay"
      style={{ background: "linear-gradient(180deg, #2b3235, #262d30)" }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-[#1e9c78] flex-shrink-0" />
        <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.015em] text-white [text-wrap:pretty]">
          {"So how does it stack up against what you've tried?"}
        </h2>
      </div>

      <p className="max-w-3xl font-sans text-[17px] md:text-[19px] text-white/70 leading-[1.7] mb-12">
        {"They all promise focus. The difference is in how they get there."}
      </p>

      <div className="max-w-4xl mx-auto mb-14">
        {/* Column headers — desktop only */}
        <div className="hidden md:grid grid-cols-[160px_1fr_1fr] gap-4 px-6 mb-4">
          <div />
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#3fbf97]">
            NeuroDrive
          </p>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/40">
            The usual fixes
          </p>
        </div>

        <div className="space-y-3">
          {ROWS.map((row) => (
            <div
              key={row.axis}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] gap-3 md:gap-4 bg-white/[0.03] border border-white/[0.08] rounded-[2px] px-6 py-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 self-center">
                {row.axis}
              </p>
              <div className="flex items-start gap-2.5">
                <span className="text-[#3fbf97] font-bold mt-px flex-shrink-0">✓</span>
                <span className="text-white/85 text-[15px] md:text-[16px] leading-[1.5]">
                  {row.nora}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-white/30 font-bold mt-px flex-shrink-0">✕</span>
                <span className="text-white/50 text-[15px] md:text-[16px] leading-[1.5]">
                  {row.usual}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="differentiators" />
      </div>
    </LpSection>
  );
}
