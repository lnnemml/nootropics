import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { HeroCarousel } from "../_components/HeroCarousel";

export function S01Hero() {
  return (
    <LpSection id="hero" variant="dark" padding="pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="grid md:grid-cols-[60fr_40fr] gap-10 md:gap-14 items-center">
        <div>
          <p className="font-mono text-sm uppercase tracking-wider text-[#1e9c78] mb-5">
            Dopamine support backed by 30+ years of research
          </p>
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
            Stop Running on Empty and Feel Mentally Clear All Day in Under a Week Using the
            Dopamine Synthesizer Trusted by 30+ Years of Clinical Use{" "}
            <span className="text-white/50">(Zero Caffeine)</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
            {"Tired of caffeine crashes and afternoon brain fog? NeuroDrive is the only sublingual bromantane formula that restores your brain's dopamine production instead of depleting it, giving you calm, sustained focus and motivation within your first week."}
          </p>
          <CtaButton trackingLocation="hero" href="/checkout?qty=1" />
          <p className="mt-5 font-mono text-xs text-white/60 uppercase tracking-wider">
            80mg/ml · Pharmaceutical-Grade MCT Oil · Sublingual Drops · ~30 Day Supply
          </p>
        </div>
        <div>
          <HeroCarousel />
        </div>
      </div>
    </LpSection>
  );
}
