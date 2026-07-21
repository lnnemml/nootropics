import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { VideoPlaceholder } from "../_components/VideoPlaceholder";

const VIDEOS = [
  "UGC Video: Caffeine Quitter",
  "UGC Video: Developer Focus",
  "UGC Video: Dopamine Reset",
];

const QUOTES = [
  "Best nootropic I've tried. Great for energy, focus, mood. No side effects.",
  "It reversed the irritability I get with stimulants. I don't even need coffee anymore.",
  "I kept waiting for the crash... but it never came.",
];

export function S04UgcProof() {
  return (
    <LpSection variant="dark">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-8">
        What the Community Is Saying
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {VIDEOS.map((label) => (
          <VideoPlaceholder key={label} aspectRatio="16:9" label={label} />
        ))}
      </div>

      <div className="space-y-4 mb-10">
        {QUOTES.map((quote) => (
          <div
            key={quote}
            className="bg-white/[0.03] border border-white/[0.06] rounded-[2px] px-8 py-7 md:px-10 md:py-8 relative"
          >
            <span
              className="text-7xl md:text-8xl leading-none text-[#1e9c78] absolute top-3 left-6 md:left-8 opacity-90"
              style={{ fontFamily: "Georgia, serif" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="font-sans text-lg md:text-xl text-white leading-relaxed pt-6 relative z-10 mb-4">
              {quote}
            </p>
            <p className="font-mono text-xs text-[#6b8480] tracking-wide">
              — Bromantane community
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="ugc_proof" />
      </div>
    </LpSection>
  );
}
