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
          <div key={quote} className="bg-white border border-[#2b3235]/10 rounded-[2px] p-5">
            <p className="font-sans text-sm text-[#2b3235]/80 leading-relaxed italic">
              {`"${quote}"`}
            </p>
            <p className="mt-3 font-mono text-xs text-[#2b3235]/40">— Bromantane community</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="social4" />
      </div>
    </LpSection>
  );
}
