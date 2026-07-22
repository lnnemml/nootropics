import { Container } from "@/components/layout/Container";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="#1e9c78" strokeWidth="1.5" />
    <polyline points="4.5,8 7,10.5 11.5,5.5" stroke="#1e9c78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ITEMS = [
  "Third-Party Lab Tested",
  "cGMP Manufactured",
  "Single Active Compound",
  "Pharmaceutical-Grade Carrier",
];

export function S11TrustBar() {
  return (
    <div className="bg-[#1f2528] py-[26px] border-y border-white/[0.06]">
      <Container>
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-x-2.5 md:gap-x-0 gap-y-3.5 md:gap-y-3">
          {ITEMS.map((item, i) => (
            <div key={item} className="flex items-center">
              <div className="flex items-center gap-2 px-4">
                <CheckIcon />
                <span className="font-mono text-[9px] md:text-[11px] font-medium uppercase tracking-[0.14em] text-white/75">
                  {item}
                </span>
              </div>
              {i < ITEMS.length - 1 && (
                <div className="h-[18px] w-px bg-white/[0.1] hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
