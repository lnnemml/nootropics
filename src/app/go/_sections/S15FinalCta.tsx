import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "../_components/CtaButton";

export function S15FinalCta() {
  return (
    <section id="order" className="relative py-16 md:py-24 overflow-hidden">
      <Image
        src="/go/final-cta-bg.png"
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#1e9c78]/90" />

      <Container>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-4">
            Your Brain Is Your Leverage. Protect It.
          </h2>
          <p className="font-sans text-lg text-white/90 leading-relaxed mb-8">
            Join the developers, founders, and builders who stopped forcing performance and started
            restoring it.
          </p>
          <CtaButton
            variant="inverted"
            trackingLocation="final_cta"
            label="Order NeuroDrive →"
            className="text-lg px-10 py-5"
          />
          <p className="mt-6 font-mono text-xs text-white/70 uppercase tracking-wider">
            Free Worldwide Shipping · NMR-Verified Purity · Legal in US, Canada, EU, AU
          </p>
        </div>
      </Container>
    </section>
  );
}
