import Link from "next/link";
import { Container } from "@/components/layout/Container";

const LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Contact", href: "/contact" },
];

export function S16Footer() {
  return (
    <footer className="bg-[#1f2528] py-16 pb-[120px] md:pb-16">
      <Container>
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="font-sans text-xs text-white/[0.38] leading-[1.7] max-w-[720px]">
            {"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before starting any supplement regimen. NeuroDrive is sold as a research compound."}
          </p>
          <div className="flex flex-wrap justify-center gap-7">
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="font-sans text-[13px] text-white/55 hover:text-[#1e9c78] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="font-mono text-[11px] text-white/[0.28] uppercase tracking-[0.16em]">
            © 2026 NORA Alliance · noraalliance@protonmail.com
          </p>
        </div>
      </Container>
    </footer>
  );
}
