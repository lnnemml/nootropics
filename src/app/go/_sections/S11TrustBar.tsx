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
    <div className="bg-[#2b3235] py-5 md:py-6">
      <Container>
        <div className="flex flex-wrap justify-center items-center gap-x-0 gap-y-3">
          {ITEMS.map((item, i) => (
            <div key={item} className="flex items-center">
              <div className="flex items-center gap-2 px-4">
                <CheckIcon />
                <span className="font-sans text-[13px] font-medium text-white">{item}</span>
              </div>
              {i < ITEMS.length - 1 && (
                <div className="h-4 w-px bg-[#3d5550] hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
