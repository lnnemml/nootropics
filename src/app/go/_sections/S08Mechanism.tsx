import Image from "next/image";
import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";

export function S08Mechanism() {
  return (
    <LpSection
      id="mechanism"
      variant="dark"
      className="noise-overlay"
      style={{ background: "linear-gradient(180deg, #262d30, #2b3235)" }}
    >
      {/* Top teal divider */}
      <div className="teal-divider absolute top-0 left-0 right-0" />

      <h2 className="font-sans font-bold text-white mb-10 section-heading-dash text-[28px] md:text-[34px] tracking-[-0.015em]">
        Why NeuroDrive Works When Everything Else Failed
      </h2>

      <div className="mb-[72px]">
        <div className="image-frame">
          <Image
            src="/go/stimulants-vs.png"
            alt="Comparison: Stimulants force dopamine release causing crashes. NeuroDrive upregulates dopamine synthesis for a stable baseline."
            width={1200}
            height={896}
            className="w-full h-auto rounded-[2px]"
          />
        </div>
      </div>

      <div className="mb-10">
        <div className="image-frame">
          <Image
            src="/go/how-it-works.png"
            alt="How NeuroDrive works: Step 1 Absorb sublingually in 15-30 minutes. Step 2 Synthesize more dopamine via TH upregulation. Step 3 Perform with sustained focus and motivation."
            width={1200}
            height={896}
            className="w-full h-auto rounded-[2px]"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <CtaButton trackingLocation="mechanism" />
      </div>
    </LpSection>
  );
}
