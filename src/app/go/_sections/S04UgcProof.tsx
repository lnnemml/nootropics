import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { VideoPlaceholder } from "../_components/VideoPlaceholder";

const VIDEOS = [
  "UGC Video: Caffeine Quitter",
  "UGC Video: Developer Focus",
  "UGC Video: Dopamine Reset",
];

const QUOTES = [
  "Best nootropic I've tried. Great for energy, focus, mood.",
  "It reversed the irritability I get with stimulants.",
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

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {QUOTES.map((quote) => (
          <div key={quote} className="bg-white/5 border border-white/10 rounded-[2px] p-5">
            <p className="font-sans text-sm text-white/80 leading-relaxed italic">
              {`"${quote}"`}
            </p>
            <p className="mt-3 font-mono text-xs text-white/40">— Bromantane community</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="ugc_proof" />
      </div>
    </LpSection>
  );
}
