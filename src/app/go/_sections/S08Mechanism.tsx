import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S08Mechanism() {
  return (
    <LpSection id="mechanism" variant="dark">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-10">
        Why NeuroDrive Works When Everything Else Failed
      </h2>

      <div className="mb-14">
        <Image
          src="/go/stimulants-vs.png"
          alt="Comparison: Stimulants force dopamine release causing crashes. NeuroDrive upregulates dopamine synthesis for a stable baseline."
          width={1200}
          height={896}
          className="w-full h-auto rounded-[2px]"
        />
      </div>

      <div className="mb-10">
        <Image
          src="/go/how-it-works.png"
          alt="How NeuroDrive works: Step 1 Absorb sublingually in 15-30 minutes. Step 2 Synthesize more dopamine via TH upregulation. Step 3 Perform with sustained focus and motivation."
          width={1200}
          height={896}
          className="w-full h-auto rounded-[2px]"
        />
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="mechanism" />
      </div>
    </LpSection>
  );
}
