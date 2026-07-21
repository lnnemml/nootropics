import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

const QUOTES = [
  {
    text: "I felt just like when everything was new and exciting again. I was crying from burnout — now it's like I have color back in my world.",
    attr: "Nootropics community",
  },
  {
    text: "I was blown away by the effect on my mood and cognition. Conversations flow more easily, words come to mind effortlessly. Seriously underrated.",
    attr: "Bromantane community",
  },
  {
    text: "I started finishing tasks quicker. The combination of focus plus calm felt oddly balanced. I actually stopped craving my afternoon coffee.",
    attr: "Bromantane community",
  },
];

export function S09SocialProof3() {
  return (
    <LpSection variant="light">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#2b3235] mb-8">
        From the Bromantane Community
      </h2>

      <div className="space-y-4 mb-10">
        {QUOTES.map(({ text, attr }) => (
          <div key={text} className="bg-[#2b3235] rounded-[2px] px-8 py-7 md:px-10 md:py-8 relative">
            <span
              className="leading-none text-[#1e9c78] absolute top-2.5 left-6 md:left-8 opacity-85"
              style={{ fontFamily: "Georgia, serif", fontSize: "80px" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="font-sans text-lg md:text-xl text-white leading-[1.7] pt-8 relative z-10 mb-5">
              {text}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#1e9c78]" />
              <p className="font-mono text-xs text-[#6b8480] tracking-wide">{attr}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <CtaButton variant="outline" trackingLocation="social3" />
      </div>
    </LpSection>
  );
}
