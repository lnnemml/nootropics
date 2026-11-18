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
          <div key={quote} className="quote-card flex gap-4 md:gap-7 px-6 md:px-12 py-6 md:py-9">
            <span
              className="leading-none text-[#1e9c78] flex-shrink-0 opacity-60 self-start"
              style={{ fontFamily: "Georgia, serif", fontSize: "64px" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <div>
              <p className="font-sans text-white leading-[1.65] mb-4 text-[17px] md:text-[19px] font-medium">
                {quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-7 h-px bg-[#1e9c78]/60" />
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6b8480]">
                  Bromantane community
                </p>
              </div>
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
