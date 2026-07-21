import { Container } from "@/components/layout/Container";

const BADGES = [
  {
    label: "728-Patient Clinical Trial",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="6" y="1" width="6" height="3" rx="1" stroke="#1e9c78" strokeWidth="1.5" />
        <path d="M7 4v4l-4 6h12l-4-6V4" stroke="#1e9c78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Peer-Reviewed Research",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="14" height="14" rx="1" stroke="#1e9c78" strokeWidth="1.5" />
        <line x1="5" y1="6" x2="13" y2="6" stroke="#1e9c78" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5" y1="9" x2="13" y2="9" stroke="#1e9c78" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5" y1="12" x2="10" y2="12" stroke="#1e9c78" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "30+ Years of Clinical Use",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="#1e9c78" strokeWidth="1.5" />
        <polyline points="9,4 9,9 12,12" stroke="#1e9c78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Unscheduled Compound",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1L2 4.5v5C2 13 5 16 9 17c4-1 7-4 7-7.5v-5L9 1z" stroke="#1e9c78" strokeWidth="1.5" strokeLinejoin="round" />
        <polyline points="5.5,9 7.5,11 12.5,6.5" stroke="#1e9c78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function S02SocialProofBar() {
  return (
    <div className="bg-[#f8f9fa] border-b border-[#2b3235]/[0.07] py-[26px]">
      <Container>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-x-0 gap-y-3">
          {BADGES.map((badge, i) => (
            <div key={badge.label} className="flex items-center">
              <div className="flex items-center gap-[10px] px-4">
                {badge.icon}
                <span className="font-sans text-[13px] font-medium text-[#2b3235]">
                  {badge.label}
                </span>
              </div>
              {i < BADGES.length - 1 && (
                <div className="h-5 w-px bg-[#2b3235]/[0.12] hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
