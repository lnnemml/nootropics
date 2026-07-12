import { LpSection } from "../_components/LpSection";

function ShieldIcon() {
  return (
    <div className="w-16 h-16 rounded-[2px] border-2 border-[#1e9c78] flex items-center justify-center mb-6 mx-auto">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1e9c78"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    </div>
  );
}

export function S08Guarantee() {
  return (
    <LpSection id="guarantee" variant="light">
      <div className="max-w-xl mx-auto text-center">
        <ShieldIcon />
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#1e9c78] mb-4">
          30-Day Guarantee
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#2b3235] mb-6">
          Risk-Free Trial
        </h2>
        <p className="font-sans text-[17px] text-[#334d48] leading-relaxed mb-4">
          {"If you don't feel a difference within 30 days, we'll refund your order. No questions."}
        </p>
        <p className="font-sans text-[14px] text-gray-400">
          {"Email us at noraalliance@protonmail.com — that's it."}
        </p>
      </div>
    </LpSection>
  );
}
