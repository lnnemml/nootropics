import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { VideoPlaceholder } from "../_components/VideoPlaceholder";

const VIDEOS = [
  { label: "Caffeine Quitter", duration: "2:14", posterSrc: "/go/hero-3.png" },
  { label: "Developer Focus", duration: "1:47", posterSrc: "/go/hero-1.png" },
  { label: "Dopamine Reset", duration: "3:02", posterSrc: "/go/hero-2.png" },
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
      <div className="flex items-center gap-4 mb-14">
        <div className="w-8 h-px bg-[#1e9c78] flex-shrink-0" />
        <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.015em] text-white">
          What the Community Is Saying
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {VIDEOS.map(({ label, duration, posterSrc }) => (
          <VideoPlaceholder
            key={label}
            aspectRatio="16:9"
            label={label}
            duration={duration}
            posterSrc={posterSrc}
          />
        ))}
      </div>

      <div className="space-y-6 mb-10">
        {QUOTES.map((quote) => (
          <div
            key={quote}
            className="relative bg-gradient-to-br from-white/[0.055] to-white/[0.02] border border-white/10 border-l-2 border-l-[#1e9c78] rounded-[2px] pl-6 md:pl-24 pr-6 md:pr-12 pt-11 md:pt-10 pb-[26px] md:pb-9 shadow-[0_24px_56px_-28px_rgba(0,0,0,0.55)] transition-all duration-[250ms] hover:-translate-y-0.5 hover:border-[#1e9c78]/35"
          >
            <span
              className="leading-none text-[#1e9c78] absolute top-3.5 md:top-[22px] left-5 md:left-[30px] opacity-50"
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(72px, 10vw, 110px)" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p
              className="font-sans text-white leading-[1.6] relative z-10 mb-5 text-[17px] md:text-[21px] font-medium"
            >
              {quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-7 h-px bg-[#1e9c78]/60" />
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6b8480]">
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
