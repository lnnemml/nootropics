import { Container } from "@/components/layout/Container";

const TRUST_ITEMS = [
  "FREE SHIPPING WORLDWIDE",
  "NMR-VERIFIED PURITY",
  "LEGAL IN US, CA, EU, AU",
];

const ANCHORS = [
  { label: "How It Works", href: "#mechanism" },
  { label: "Benefits", href: "#benefits" },
  { label: "FAQ", href: "#faq" },
  { label: "Order", href: "#order" },
];

export function S00TopBar() {
  return (
    <div className="bg-[#222a2e] border-b border-white/5">
      <Container>
        <div className="py-2.5 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">
            {TRUST_ITEMS.join(" · ")}
          </p>
          <nav className="hidden md:flex items-center gap-5 flex-shrink-0">
            {ANCHORS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[10px] uppercase tracking-wider text-white/50 hover:text-white/80 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </div>
  );
}
