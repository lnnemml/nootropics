import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "../_components/CtaButton";

export function S15FinalCta() {
  return (
    <section id="order" className="relative py-20 md:py-[160px] overflow-hidden">
      {/* Background image at low opacity */}
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
            "linear-gradient(160deg, rgba(30,156,120,0.92), rgba(51,77,72,0.95))",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      <Container>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-sans text-[38px] md:text-[54px] font-bold text-white leading-[1.08] tracking-[-0.02em] [text-wrap:pretty] mb-4">
            Your Brain Is Your Leverage. Protect It.
          </h2>
          <p className="font-sans text-[18px] md:text-[20px] text-white/[0.85] leading-relaxed mb-8">
            Join the developers, founders, and builders who stopped forcing performance and started
            restoring it.
          </p>
          <CtaButton
            variant="inverted"
            trackingLocation="final_cta"
            label="Order NeuroDrive →"
          />
          <p className="mt-6 font-mono text-xs text-white/70 uppercase tracking-wider">
            Free Worldwide Shipping · NMR-Verified Purity · Legal in US, Canada, EU, AU
          </p>
        </div>
      </Container>
    </section>
  );
}
