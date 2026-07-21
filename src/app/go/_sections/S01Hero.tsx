import { LpSection } from "../_components/LpSection";
import { CtaButton } from "../_components/CtaButton";
import { HeroCarousel } from "../_components/HeroCarousel";

export function S01Hero() {
  return (
    <LpSection
      id="hero"
      variant="dark"
      padding="py-24 md:pt-24 md:pb-32"
      className="noise-overlay"
      style={{ background: "linear-gradient(180deg, #22282b 0%, #2b3235 60%, #2b3235 100%)" }}
    >
      {/* Teal glow orb — positioned relative to section via absolute */}
      <div
        className="absolute teal-glow pointer-events-none w-[720px] h-[720px]"
        style={{ top: "-20%", right: "-8%" }}
      />
      {/* Bottom teal divider */}
      <div className="teal-divider absolute bottom-0 left-0 right-0" />

      <div className="grid md:grid-cols-[55fr_45fr] gap-8 md:gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-[#1e9c78] flex-shrink-0" />
            <p className="font-mono text-sm uppercase tracking-wider text-[#1e9c78]">
              Dopamine support backed by 30+ years of research
            </p>
          </div>
          <h1 className="font-sans text-[32px] md:text-[50px] font-bold text-white leading-[1.08] tracking-[-0.02em] [text-wrap:pretty] mb-6">
            Stop Running on Empty and Feel Mentally Clear All Day in Under a Week Using the
            Dopamine Synthesizer Trusted by 30+ Years of Clinical Use{" "}
            <span className="text-white/50">(Zero Caffeine)</span>
          </h1>
          <p className="font-sans text-[17px] md:text-[19px] text-white/[0.68] leading-[1.65] mb-8 max-w-[580px]">
            {"Tired of caffeine crashes and afternoon brain fog? NeuroDrive is the only sublingual bromantane formula that restores your brain's dopamine production instead of depleting it, giving you calm, sustained focus and motivation within your first week."}
          </p>
          <CtaButton trackingLocation="hero" href="/checkout?qty=1" />
          <div className="mt-5 inline-flex border border-white/[0.12] bg-white/[0.04] rounded-[2px] px-4 py-2.5">
            <p className="font-mono text-xs text-white/60 uppercase tracking-wider">
              80mg/ml · Pharmaceutical-Grade MCT Oil · Sublingual Drops · ~30 Day Supply
            </p>
          </div>
        </div>
        <div>
          <HeroCarousel />
        </div>
      </div>
    </LpSection>
  );
}
