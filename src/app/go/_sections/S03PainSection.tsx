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
      <div className="max-w-2xl mx-auto">
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#2b3235] leading-tight mb-8">
          {"Your Brain Fog Is Not Burnout. It's Dopamine Depletion."}
        </h2>

        <div className="font-sans text-base text-[#2b3235]/80 leading-relaxed space-y-5">
          <p>Dear developers, founders, and builders,</p>

          <ul className="space-y-3">
            {PAIN_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="text-[#1e9c78] font-bold mt-0.5 flex-shrink-0">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p>{"You're not broken. You're not lazy."}</p>

          <p className="font-bold text-[#2b3235]">Your dopamine system is running on fumes.</p>

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

          <p className="font-bold text-[#2b3235]">NONE OF THEM fix the root cause.</p>

          <p>
            {"What you actually need isn't more stimulation. You need to restore your brain's ability to "}
            <strong>PRODUCE</strong>
            {" dopamine on its own."}
          </p>

          <p className="font-semibold text-[#1e9c78]">
            {"That's exactly what NeuroDrive does."}
          </p>
        </div>

        <div className="mt-10">
          <Image
            src="/go/before-after.png"
            alt="Before: brain fog, caffeine crashes, scattered attention. After: clear thinking, steady energy, deep focus."
            width={1024}
            height={572}
            className="w-full h-auto rounded-[2px]"
          />
        </div>
      </div>
    </LpSection>
  );
}
