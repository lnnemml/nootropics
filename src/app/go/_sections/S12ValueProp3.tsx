import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { ImagePlaceholder } from "../_components/ImagePlaceholder";

export function S12ValueProp3() {
  return (
    <LpSection variant="dark">
      <div className="grid md:grid-cols-[45fr_55fr] gap-10 md:gap-14 items-center">
        <div>
          <ImagePlaceholder aspectRatio="4/3" label="Lifestyle: Calm Focus State" />
        </div>
        <div>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-white leading-tight mb-5">
            Feel Sharp and Calm at the Same Time. The Combination Stimulants Can Never Deliver.
          </h2>
          <p className="font-sans text-base text-white/80 leading-relaxed mb-4">
            {"Bromantane is classified as both a psychostimulant and an anxiolytic. That's not a contradiction. It's the mechanism."}
          </p>
          <p className="font-sans text-base text-white/80 leading-relaxed mb-4">
            While stimulants trade calm for focus, bromantane supports both pathways simultaneously.
            The result is a focused state without tension, without racing thoughts, and without the
            emotional blunting that amphetamines are known for.
          </p>
          <p className="font-sans text-base text-white/80 leading-relaxed mb-8">
            {"You stay you. Just the sharp, present, engaged version."}
          </p>
          <CtaButton trackingLocation="vp3_clarity" />
        </div>
      </div>
    </LpSection>
  );
}
