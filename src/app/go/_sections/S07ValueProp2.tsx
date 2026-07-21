import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S07ValueProp2() {
  return (
    <LpSection variant="light">
      <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#2b3235] leading-tight mb-5">
            Wake Up Actually Wanting to Work Instead of Forcing Yourself Through Another Day
          </h2>
          <p className="font-sans text-base text-[#2b3235]/80 leading-relaxed mb-4">
            {"When your dopamine baseline is restored, motivation isn't something you have to manufacture. It's just there."}
          </p>
          <p className="font-sans text-base text-[#2b3235]/80 leading-relaxed mb-4">
            Users report that the drive to start tasks, engage with hard problems, and push through
            deep work returns as bromantane normalizes their neurochemistry over the first week.
          </p>
          <p className="font-sans text-base text-[#2b3235]/80 leading-relaxed mb-8">
            {"Not manic energy. Not stimulant-driven urgency. Genuine, sustainable drive."}
          </p>
          <CtaButton trackingLocation="vp2_motivation" />
        </div>
        <div className="relative h-[400px] md:h-[500px] rounded-[2px] overflow-hidden">
          <Image
            src="/go/desk-bottle.png"
            alt="NeuroDrive bottle on a dark desk"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </LpSection>
  );
}
