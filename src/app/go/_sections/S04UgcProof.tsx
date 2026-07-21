import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { VideoPlaceholder } from "../_components/VideoPlaceholder";

const VIDEOS = [
  { label: "Caffeine Quitter", duration: "2:14" },
  { label: "Developer Focus", duration: "1:47" },
  { label: "Dopamine Reset", duration: "3:02" },
];

const QUOTES = [
  "Best nootropic I've tried. Great for energy, focus, mood. No side effects.",
  "It reversed the irritability I get with stimulants. I don't even need coffee anymore.",
  "I kept waiting for the crash... but it never came.",
];

export function S04UgcProof() {
  return (
    <LpSection
      variant="dark"
      className="noise-overlay"
      style={{ background: "linear-gradient(180deg, #2b3235, #262d30)" }}
    >
      <h2 className="font-sans font-bold text-white mb-8 section-heading-dash text-[28px] md:text-[34px] tracking-[-0.015em]">
        What the Community Is Saying
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {VIDEOS.map(({ label, duration }) => (
          <VideoPlaceholder key={label} aspectRatio="16:9" label={label} duration={duration} />
        ))}
      </div>

      <div className="space-y-6 mb-10">
        {QUOTES.map((quote) => (
          <div key={quote} className="quote-card relative pr-[52px] pl-[100px] pt-11 pb-10">
            <span
              className="leading-none text-[#1e9c78] absolute top-6 left-8 opacity-55"
              style={{ fontFamily: "Georgia, serif", fontSize: "110px" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p
              className="font-sans text-white leading-[1.65] relative z-10 mb-5"
              style={{ fontSize: "21px", fontWeight: 500 }}
            >
              {quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-7 h-px bg-[#1e9c78]" />
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#6b8480]">
                Bromantane community
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="ugc_proof" />
      </div>
    </LpSection>
  );
}
