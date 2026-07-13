import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { ImagePlaceholder } from "../_components/ImagePlaceholder";

export function S06ValueProp1() {
  return (
    <LpSection id="benefits" variant="dark">
      <div className="grid md:grid-cols-[45fr_55fr] gap-10 md:gap-14 items-center">
        <div>
          <ImagePlaceholder aspectRatio="4/3" label="Lifestyle: Developer in Deep Focus" />
        </div>
        <div>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-white leading-tight mb-5">
            Lock Into Deep Work for Hours Without Watching the Clock or Dreading the Crash
          </h2>
          <p className="font-sans text-base text-white/80 leading-relaxed mb-4">
            {"NeuroDrive doesn't spike your dopamine and leave you stranded. It supports your brain's natural production cycle, so focus comes on smoothly and stays steady."}
          </p>
          <p className="font-sans text-base text-white/80 leading-relaxed mb-8">
            No afternoon walls. No jittery tunnel vision. Just clean, sustained attention that lets
            you do your best work without fighting your own neurochemistry.
          </p>
          <CtaButton variant="outline" trackingLocation="vp1_focus" />
        </div>
      </div>
    </LpSection>
  );
}
