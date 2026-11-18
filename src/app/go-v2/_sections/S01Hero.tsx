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
                {"For developers, founders, and builders who can't afford an off day"}
              </p>
            </div>
            <h1 className="font-sans text-[31px] md:text-[50px] font-bold text-white leading-[1.12] md:leading-[1.06] tracking-[-0.02em] [text-wrap:pretty] mb-7">
              {"Your brain fog isn't burnout."}{" "}
              <span className="text-[#3fbf97]">{"It's dopamine depletion."}</span>
            </h1>
            <p className="font-sans text-[19px] text-white/[0.68] leading-[1.65] max-w-[580px] mb-10">
              {"More caffeine won't fix it — it just borrows against tomorrow. NeuroDrive takes a different route: sublingual bromantane that supports your brain's own dopamine production, built for calm, steady focus — without the stimulant spike and the crash that follows."}
            </p>
            <div className="flex flex-col items-start gap-5">
              <CtaButton trackingLocation="hero" href="/checkout?qty=1" />
              <p className="font-mono text-[11px] text-white/60 uppercase tracking-[0.12em] leading-[1.6]">
                {"Free worldwide shipping · NMR-verified purity · Backed by 30+ years of clinical use"}
              </p>
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
