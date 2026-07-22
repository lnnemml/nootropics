import { Container } from "@/components/layout/Container";
import { CtaButton } from "../_components/CtaButton";
import { HeroCarousel } from "../_components/HeroCarousel";

export function S01Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 pb-32 noise-overlay bg-gradient-to-b from-[#22282b] via-[#2b3235] to-[#2b3235] text-white"
    >
      {/* Teal glow orb */}
      <div
        className="absolute -top-[20%] -right-[8%] w-[720px] h-[720px] teal-glow pointer-events-none"
      />
      {/* Bottom teal hairline */}
      <div className="teal-divider absolute bottom-0 left-0 right-0" />

      <Container>
        <div className="grid md:grid-cols-[55fr_45fr] gap-10 md:gap-[72px] items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-7">
              <div className="w-6 h-px bg-[#1e9c78] flex-shrink-0" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1e9c78]">
                Dopamine support backed by 30+ years of research
              </p>
            </div>
            <h1 className="font-sans text-[31px] md:text-[50px] font-bold text-white leading-[1.12] md:leading-[1.06] tracking-[-0.02em] [text-wrap:pretty] mb-7">
              Stop Running on Empty and Feel Mentally Clear All Day in Under a Week Using the
              Dopamine Synthesizer Trusted by 30+ Years of Clinical Use{" "}
              <span className="text-white/40 font-medium">(Zero Caffeine)</span>
            </h1>
            <p className="font-sans text-[19px] text-white/[0.68] leading-[1.65] max-w-[580px] mb-10">
              {"Tired of caffeine crashes and afternoon brain fog? NeuroDrive is the only sublingual bromantane formula that restores your brain's dopamine production instead of depleting it, giving you calm, sustained focus and motivation within your first week."}
            </p>
            <div className="flex flex-col items-start gap-6">
              <CtaButton trackingLocation="hero" href="/checkout?qty=1" />
              <div className="inline-flex border border-white/[0.12] bg-white/[0.04] rounded-[2px] px-4 py-[9px]">
                <p className="font-mono text-[11px] text-white/65 uppercase tracking-[0.12em]">
                  80mg/ml · Pharmaceutical-Grade MCT Oil · Sublingual Drops · ~30 Day Supply
                </p>
              </div>
            </div>
          </div>
          <div>
            <HeroCarousel />
          </div>
        </div>
      </Container>
    </section>
  );
}
