import { Container } from "@/components/layout/Container";

const TRUST_ITEMS = [
  "FREE SHIPPING WORLDWIDE",
  "NMR-VERIFIED PURITY",
  "LEGAL IN US, CA, EU, AU",
];

const ANCHORS = [
  { label: "How It Works", href: "#mechanism", highlight: false },
  { label: "Benefits", href: "#benefits", highlight: false },
  { label: "FAQ", href: "#faq", highlight: false },
  { label: "Order", href: "#order", highlight: true },
];

export function S00TopBar() {
  return (
    <div className="bg-[#1f2528] border-b border-white/[0.06]">
      <Container>
        <div className="py-2.5 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
            {TRUST_ITEMS.join(" · ")}
          </p>
          <nav className="hidden md:flex items-center gap-5 flex-shrink-0">
            {ANCHORS.map(({ label, href, highlight }) => (
              <a
                key={href}
                href={href}
                className={`font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                  highlight
                    ? "text-[#1e9c78] hover:text-[#14b089]"
                    : "text-white/45 hover:text-white/80"
                }`}
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
