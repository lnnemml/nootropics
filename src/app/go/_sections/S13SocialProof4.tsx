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
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {QUOTES.map((quote) => (
          <div
            key={quote}
            className="bg-[#2b3235] rounded-[2px] px-6 py-5 flex items-start gap-4"
          >
            <span
              className="leading-[0.8] text-[#1e9c78] flex-shrink-0 mt-1 opacity-85"
              style={{ fontFamily: "Georgia, serif", fontSize: "48px" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <div>
              <p className="font-sans text-sm text-white leading-relaxed mb-3">{quote}</p>
              <p className="font-mono text-[10px] text-[#6b8480] tracking-wide">
                — Bromantane community
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
