import Link from "next/link";
import { S01Hero } from "./_sections/S01Hero";
import { S02Problem } from "./_sections/S02Problem";
import { S03Stimulants } from "./_sections/S03Stimulants";
import { S04Discovery } from "./_sections/S04Discovery";
import { S05Benefits } from "./_sections/S05Benefits";
import { S06SocialProof } from "./_sections/S06SocialProof";
import { S07Differentiators } from "./_sections/S07Differentiators";
import { S08Guarantee } from "./_sections/S08Guarantee";
import { S09Faq } from "./_sections/S09Faq";
import { S10FinalCta } from "./_sections/S10FinalCta";
import { StickyMobileCta } from "./_components/StickyMobileCta";

export default function GoPage() {
  return (
    <>
      <S01Hero />
      <S02Problem />
      <S03Stimulants />
      <S04Discovery />
      <S05Benefits />
      <S06SocialProof />
      <S07Differentiators />
      <S08Guarantee />
      <S09Faq />
      <S10FinalCta />

      <footer className="bg-[#1e1f20] py-10 pb-24 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-[72px] flex flex-col items-center gap-5 text-center">
          <p className="font-sans text-[12px] text-white/40 leading-relaxed max-w-xl">
            {"These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Privacy Policy", href: "/legal/privacy" },
              { label: "Terms", href: "/legal/terms" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/30 hover:text-white/60 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/20">
            {"© 2026 NORA Alliance"}
          </p>
        </div>
      </footer>

      <StickyMobileCta />
    </>
  );
}
