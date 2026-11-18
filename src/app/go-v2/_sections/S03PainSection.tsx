import { LpSection } from "../_components/LpSection";

const PAIN_POINTS = [
  "You sit down to work and read the same sentence three times before it lands.",
  "By 3pm you're a zombie, reaching for a third coffee just to feel normal.",
  "You've tried the nootropic stacks. They did nothing — or left you wired and weird.",
];

export function S03PainSection() {
  return (
    <LpSection variant="light">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-sans text-[30px] md:text-[42px] font-bold text-[#2b3235] leading-[1.12] tracking-[-0.02em] [text-wrap:pretty] mb-12">
          {"So why does more caffeine make it worse?"}
        </h2>

        <div className="font-sans text-[17px] md:text-[19px] text-[#2b3235]/75 leading-[1.7] space-y-[26px]">
          <p className="font-mono text-sm tracking-[0.06em] text-[#2b3235]/55">
            Dear builder,
          </p>

          <p>{"First — check the ones that sound like you:"}</p>

          <div className="bg-white border border-[#2b3235]/[0.08] rounded-[2px] shadow-[0_16px_40px_-24px_rgba(43,50,53,0.25)] px-8 py-7">
            <ul className="space-y-[18px]">
              {PAIN_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="font-mono text-[#1e9c78] font-bold mt-0.5 flex-shrink-0">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>{"You're not broken. You're not lazy."}</p>

          <p className="font-bold text-[#2b3235] text-[21px] md:text-[26px] tracking-[-0.01em] leading-[1.3]">
            Your dopamine system is running on fumes.
          </p>

          <p>
            {"Years of chronic stress, stimulant cycling, and screen overload have drained the pathways that used to make motivation feel automatic."}
          </p>

          <p>
            {"The result? Fog. Flatness. That \"I know what I should do but I can't make myself do it\" feeling."}
          </p>

          <p className="font-semibold text-[#2b3235]">{"So you do the logical thing. You reach for more."}</p>

          <p>
            {"But more caffeine doesn't refill your dopamine. It borrows against tomorrow — so tomorrow you need even more just to break even."}
          </p>

          <p>{"Adderall doesn't refill it either. It forces a release, then drops you into the crash."}</p>

          <p>
            {"The 15-ingredient stacks? They shotgun your brain and hope something sticks."}
          </p>

          <p className="font-bold text-[#2b3235] text-[21px] md:text-[26px] tracking-[-0.01em] leading-[1.3]">
            None of it touches the real problem.
          </p>

          <p>
            {"Every one of them leans harder on a system that's already running dry. That's why the harder you push, the flatter you feel."}
          </p>

          <p>
            {"The answer was never more stimulation. It's restoring your brain's own ability to "}
            <strong>make</strong>
            {" dopamine again — the way it's meant to."}
          </p>

          <p className="font-semibold text-[#1e9c78] text-[21px] md:text-[26px] tracking-[-0.01em] leading-[1.3] border-l-2 border-[#1e9c78] pl-6">
            {"Here's exactly how that works."}
          </p>
        </div>
      </div>
    </LpSection>
  );
}
