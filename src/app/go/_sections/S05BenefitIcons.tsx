import { LpSection } from "../_components/LpSection";

const BENEFITS = [
  {
    label: "Non-Stimulant",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <polyline points="14,4 14,14" stroke="#1e9c78" strokeWidth="2" strokeLinecap="round" />
        <polyline points="14,14 18,22" stroke="#1e9c78" strokeWidth="2" strokeLinecap="round" />
        <polyline points="14,14 10,22" stroke="#1e9c78" strokeWidth="2" strokeLinecap="round" />
        <polyline points="10,8 18,8" stroke="#1e9c78" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="5" x2="23" y2="23" stroke="#1e9c78" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "No Crash",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <polyline points="2,22 7,10 11,18 15,8 19,14 26,14" stroke="#1e9c78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="19" y1="14" x2="26" y2="14" stroke="#1e9c78" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Zero Tolerance",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <polyline points="2,22 8,18 14,13 20,8 26,4" stroke="#1e9c78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="20,4 26,4 26,10" stroke="#1e9c78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Sublingual Drops",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4 C14 4 7 13 7 18 a7 7 0 0 0 14 0 C21 13 14 4 14 4z" stroke="#1e9c78" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "NMR-Verified",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="13" width="8" height="12" rx="1" stroke="#1e9c78" strokeWidth="1.5" />
        <rect x="10" y="9" width="8" height="16" rx="1" stroke="#1e9c78" strokeWidth="1.5" />
        <rect x="17" y="5" width="8" height="20" rx="1" stroke="#1e9c78" strokeWidth="1.5" />
        <line x1="7" y1="3" x2="7" y2="13" stroke="#1e9c78" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7" cy="3" r="1.5" fill="#1e9c78" />
      </svg>
    ),
  },
  {
    label: "Legal Worldwide",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="11" stroke="#1e9c78" strokeWidth="1.5" />
        <ellipse cx="14" cy="14" rx="5" ry="11" stroke="#1e9c78" strokeWidth="1.5" />
        <line x1="3" y1="14" x2="25" y2="14" stroke="#1e9c78" strokeWidth="1.5" />
        <polyline points="9,20 12,23 17,17" stroke="#1e9c78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "One Ingredient",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="3" stroke="#1e9c78" strokeWidth="1.5" />
        <ellipse cx="14" cy="14" rx="11" ry="5" stroke="#1e9c78" strokeWidth="1.5" />
        <ellipse cx="14" cy="14" rx="11" ry="5" stroke="#1e9c78" strokeWidth="1.5" transform="rotate(60 14 14)" />
        <ellipse cx="14" cy="14" rx="11" ry="5" stroke="#1e9c78" strokeWidth="1.5" transform="rotate(120 14 14)" />
      </svg>
    ),
  },
];

export function S05BenefitIcons() {
  return (
    <LpSection variant="light" padding="py-10 md:py-12">
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 md:gap-8">
        {BENEFITS.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-3 min-w-[80px] group">
            <div className="w-16 h-16 flex items-center justify-center bg-white border border-[#2b3235]/[0.1] rounded-[2px] shadow-[0_8px_20px_-12px_rgba(43,50,53,0.25)] transition-all duration-300 group-hover:border-[#1e9c78]/50 group-hover:-translate-y-[3px]">
              {b.icon}
            </div>
            <span className="font-mono text-[10px] font-medium text-[#2b3235] text-center leading-tight uppercase tracking-[0.1em]">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </LpSection>
  );
}
