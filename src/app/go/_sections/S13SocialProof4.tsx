import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

const QUOTES = [
  "Within 10 to 15 minutes the eye heaviness and tiredness lifts.",
  "I started finishing tasks quicker. The combination of focus plus calm felt oddly balanced.",
  "Seriously underrated compound. I have a busy schedule and bromantane has been amazing.",
];

export function S13SocialProof4() {
  return (
    <LpSection variant="light">
      <div className="space-y-6 mb-10">
        {QUOTES.map((quote) => (
          <div key={quote} className="quote-card relative pr-10 pl-[80px] pt-8 pb-8">
            <span
              className="leading-none text-[#1e9c78] absolute top-4 left-6 opacity-55"
              style={{ fontFamily: "Georgia, serif", fontSize: "80px" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p
              className="font-sans text-white leading-[1.65] relative z-10 mb-4"
              style={{ fontSize: "18px", fontWeight: 500 }}
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
        <CtaButton trackingLocation="social4" />
      </div>
    </LpSection>
  );
}
