import Image from "next/image";
import { LpSection } from "../_components/LpSection";

const PAIN_POINTS = [
  "Do you sit down to work and stare at the screen for 20 minutes before anything clicks?",
  "Are you drinking 3 or 4 cups of coffee just to feel baseline normal?",
  "Have you tried nootropics that either did nothing or left you jittery and weird?",
];

export function S03PainSection() {
  return (
    <LpSection variant="light">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-sans text-[30px] md:text-[42px] font-bold text-[#2b3235] leading-[1.12] tracking-[-0.02em] [text-wrap:pretty] mb-12">
          {"Your Brain Fog Is Not Burnout. It's Dopamine Depletion."}
        </h2>

        <div className="font-sans text-[17px] md:text-[19px] text-[#2b3235]/75 leading-[1.7] space-y-[26px]">
          <p className="font-mono text-sm tracking-[0.06em] text-[#2b3235]/55">
            Dear developers, founders, and builders,
          </p>

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
            {"Years of chronic stress, stimulant cycling, and screen overload have exhausted your brain's motivation pathways."}
          </p>

          <p>
            {"The result? Fog. Flatness. That \"I know what I should do but I can't make myself do it\" feeling."}
          </p>

          <p className="font-semibold text-[#2b3235]">{"And here's what makes it worse."}</p>

          <p>{"More caffeine doesn't restore dopamine. It borrows against tomorrow's supply."}</p>

          <p>{"Adderall doesn't restore dopamine. It forces a release and leaves you crashed."}</p>

          <p>
            {"Nootropic stacks with 15 ingredients don't restore dopamine. They shotgun your neurochemistry and hope something sticks."}
          </p>

          <p className="font-bold text-[#2b3235] text-[21px] md:text-[26px] tracking-[-0.01em] leading-[1.3]">
            NONE OF THEM fix the root cause.
          </p>

          <p>
            {"What you actually need isn't more stimulation. You need to restore your brain's ability to "}
            <strong>PRODUCE</strong>
            {" dopamine on its own."}
          </p>

          <p className="font-semibold text-[#1e9c78] text-[21px] md:text-[26px] tracking-[-0.01em] leading-[1.3] border-l-2 border-[#1e9c78] pl-6">
            {"That's exactly what NeuroDrive does."}
          </p>
        </div>
      </div>

      <div className="mt-[72px] bg-white border border-[#2b3235]/[0.08] p-3.5 rounded-[2px] shadow-[0_32px_64px_-36px_rgba(43,50,53,0.35)]">
        <Image
          src="/go/before-after.png"
          alt="Before: brain fog, caffeine crashes, scattered attention. After: clear thinking, steady energy, deep focus."
          width={1024}
          height={572}
          className="w-full h-auto rounded-[2px]"
        />
      </div>
    </LpSection>
  );
}
