import Image from "next/image";
import { LpSection } from "../_components/LpSection";

export function S07ValueProp2() {
  return (
    <LpSection variant="light">
      <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#1e9c78] flex-shrink-0" />
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1e9c78]">
              Drive to start
            </p>
          </div>
          <h2 className="font-sans text-[30px] md:text-[34px] leading-[1.15] tracking-[-0.015em] [text-wrap:pretty] font-bold text-[#2b3235] mb-6">
            {"For the days you know exactly what to do — and still can't make yourself start."}
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] text-[#2b3235]/[0.72] leading-[1.7] mb-4">
            {"It isn't focus that's missing. You can focus once you're in. The hard part is the starting — sitting down to the thing that matters and feeling no pull toward it at all."}
          </p>
          <p className="font-sans text-[17px] md:text-[19px] text-[#2b3235]/[0.72] leading-[1.7] mb-4">
            {"Caffeine can't manufacture that pull. It just leaves you wired while you still don't want to do the thing — jittery and avoidant at the same time."}
          </p>
          <p className="font-sans text-[17px] md:text-[19px] text-[#2b3235]/[0.72] leading-[1.7] mb-4">
            {"NeuroDrive is built for that gap. Steady support for your dopamine system — not a jolt of urgency you pay back an hour later."}
          </p>
          <p className="font-sans text-[17px] md:text-[19px] text-[#2b3235]/[0.9] leading-[1.7] font-medium">
            {"This is for the people who are tired of white-knuckling it — who'd rather want the work than force it."}
          </p>
        </div>
        <div className="relative">
          {/* Offset teal border frame behind image */}
          <div className="absolute top-3.5 left-3.5 -right-3.5 -bottom-3.5 md:top-6 md:left-6 md:-right-6 md:-bottom-6 border border-[#1e9c78]/35 rounded-[2px] pointer-events-none" />
          {/* Image container */}
          <div className="relative h-[380px] md:h-[540px] rounded-[2px] overflow-hidden shadow-[0_48px_96px_-48px_rgba(43,50,53,0.5)]">
            <Image
              src="/go/desk-bottle.png"
              alt="NeuroDrive bottle on a dark desk"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </LpSection>
  );
}
