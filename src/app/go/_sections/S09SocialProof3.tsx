import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

const QUOTES = [
  {
    text: "It's been a miracle worker for me. Great for energy, motivation, focus, mood. No side effects. Seriously underrated.",
    attr: "— r/nootropics community",
  },
  {
    text: "I was burnt out and had a resurgence of excitement. It felt like when everything was new and interesting again.",
    attr: "— r/nootropics community",
  },
  {
    text: "I get more out of my day. It reverses the irritability and flatness I used to get with stimulants. I don't even need coffee anymore.",
    attr: "— r/nootropics community",
  },
];

export function S09SocialProof3() {
  return (
    <LpSection variant="light">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#2b3235] mb-8">
        From the Bromantane Community
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {QUOTES.map(({ text, attr }) => (
          <div key={text} className="bg-white border border-[#2b3235]/10 rounded-[2px] p-5">
            <p className="font-sans text-sm text-[#2b3235]/80 leading-relaxed italic">
              {`"${text}"`}
            </p>
            <p className="mt-3 font-mono text-xs text-[#2b3235]/40">{attr}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <CtaButton variant="outline" trackingLocation="social3" />
      </div>
    </LpSection>
  );
}
