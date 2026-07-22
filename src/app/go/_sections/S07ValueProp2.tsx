import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S07ValueProp2() {
  return (
    <LpSection variant="light">
      <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
        <div>
          <h2 className="font-sans text-[34px] leading-[1.15] tracking-[-0.015em] [text-wrap:pretty] font-bold text-[#2b3235] mb-6">
            Wake Up Actually Wanting to Work Instead of Forcing Yourself Through Another Day
          </h2>
          <p className="font-sans text-[17px] text-[#2b3235]/[0.72] leading-[1.7] mb-4">
            {"When your dopamine baseline is restored, motivation isn't something you have to manufacture. It's just there."}
          </p>
          <p className="font-sans text-[17px] text-[#2b3235]/[0.72] leading-[1.7] mb-4">
            Users report that the drive to start tasks, engage with hard problems, and push through
            deep work returns as bromantane normalizes their neurochemistry over the first week.
          </p>
          <p className="font-sans text-[17px] text-[#2b3235]/[0.72] leading-[1.7] mb-8">
            {"Not manic energy. Not stimulant-driven urgency. Genuine, sustainable drive."}
          </p>
          <CtaButton trackingLocation="vp2_motivation" />
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
