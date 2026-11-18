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
      <div className="flex items-center gap-4 mb-14">
        <div className="w-8 h-px bg-[#1e9c78] flex-shrink-0" />
        <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.015em] text-[#2b3235]">
          From the Bromantane Community
        </h2>
      </div>

      <div className="space-y-6 mb-16">
        {QUOTES.map(({ text, attr }) => (
          <div key={text} className="quote-card relative pl-[100px] pr-[52px] py-11">
            <span
              className="leading-none text-[#1e9c78] absolute top-6 left-8 opacity-55"
              style={{ fontFamily: "Georgia, serif", fontSize: "110px" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p
              className="font-sans text-white leading-[1.65] relative z-10 mb-5 text-[21px] font-medium"
            >
              {text}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-7 h-px bg-[#1e9c78]/60" />
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6b8480]">{attr}</p>
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
