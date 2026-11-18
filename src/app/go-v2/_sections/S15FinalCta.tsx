import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "../_components/CtaButton";

export function S15FinalCta() {
  return (
    <section id="order" className="relative py-28 md:py-40 overflow-hidden noise-overlay">
      {/* Background image */}
      <Image
        src="/go/final-cta-bg.png"
        alt=""
        fill
        className="object-cover opacity-20"
        aria-hidden="true"
      />
      {/* Teal gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(30,156,120,0.94) 0%, rgba(51,77,72,0.96) 100%)",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      <Container>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-sans text-[36px] md:text-[54px] font-bold text-white leading-[1.05] tracking-[-0.02em] [text-wrap:pretty] mb-6">
            Your brain is your leverage. Protect it.
          </h2>
          <p className="font-sans text-xl text-white/85 leading-relaxed mb-12 max-w-[600px] mx-auto">
            {"You've seen the difference between forcing dopamine and restoring it. NeuroDrive is the restore side of that line — steady support, not a spike you pay for later. If that's how you'd rather work, this is where to start."}
          </p>
          <CtaButton
            variant="inverted"
            trackingLocation="final_cta"
            label="Order NeuroDrive →"
          />
          <p className="mt-9 font-mono text-[11px] text-white/70 uppercase tracking-[0.16em]">
            Free worldwide shipping · NMR-verified purity · Legal where we ship
          </p>
        </div>
      </Container>
    </section>
  );
}
