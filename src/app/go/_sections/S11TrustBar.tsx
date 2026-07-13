import { Container } from "@/components/layout/Container";

const ITEMS = [
  "🚚 Free Worldwide Shipping",
  "🧪 Pharmaceutical-Grade",
  "📦 Discreet Packaging",
  "🌍 Ships to US, CA, EU, AU",
];

export function S11TrustBar() {
  return (
    <div className="bg-[#f8f9fa] py-5 md:py-6 border-y border-[#2b3235]/5">
      <Container>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {ITEMS.map((item) => (
            <span key={item} className="font-mono text-sm text-[#2b3235]/70">
              {item}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
