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
      <h2 className="font-sans font-bold text-[#2b3235] mb-8 section-heading-dash text-[28px] md:text-[34px] tracking-[-0.015em]">
        From the Bromantane Community
      </h2>

      <div className="space-y-6 mb-10">
        {QUOTES.map(({ text, attr }) => (
          <div key={text} className="quote-card relative pr-[52px] pl-[100px] pt-11 pb-10">
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
              {text}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-7 h-px bg-[#1e9c78]" />
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#6b8480]">{attr}</p>
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
