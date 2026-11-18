import { LpSection } from "../_components/LpSection";

// Pre-revenue: NO customer testimonials, review counts, or UGC. This section
// carries trust with real, checkable signals only — analytical verification and
// the compound's research base — plus honest transparency about being new.
const PROOF = [
  {
    kicker: "Analytical verification",
    headline: "¹H + ¹³C NMR on every batch",
    body: "The method a lab uses to confirm a molecule is exactly what it claims to be — run on every batch, not a one-time sample.",
  },
  {
    kicker: "The compound",
    headline: "Decades of published research",
    body: "Bromantane has been studied for years. That's proof of the molecule, not our marketing — the science existed long before we did.",
  },
];

export function S04UgcProof() {
  return (
    <LpSection
      variant="dark"
      className="noise-overlay"
      style={{ background: "linear-gradient(180deg, #2b3235, #262d30)" }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-px bg-[#1e9c78] flex-shrink-0" />
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1e9c78]">
          No fake reviews
        </p>
      </div>

      <div className="max-w-[680px] mb-14">
        <h2 className="text-[26px] md:text-[34px] font-bold tracking-[-0.015em] text-white [text-wrap:pretty] mb-6">
          {"We'd rather show you the lab work than a wall of reviews."}
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] text-white/[0.72] leading-[1.7]">
          {"NeuroDrive is new. We could fill this space with five-star quotes — everyone does. Here's what we can actually stand behind instead."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-12">
        {PROOF.map(({ kicker, headline, body }) => (
          <div
            key={kicker}
            className="bg-white/[0.03] border border-white/[0.09] border-l-2 border-l-[#1e9c78] rounded-[2px] px-7 py-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#3fbf97] mb-3">
              {kicker}
            </p>
            <p className="font-sans text-[20px] md:text-[22px] font-bold text-white leading-[1.25] mb-3">
              {headline}
            </p>
            <p className="font-sans text-[15px] md:text-[16px] text-white/[0.6] leading-[1.6]">
              {body}
            </p>
          </div>
        ))}
      </div>

      <p className="max-w-[680px] font-sans text-[17px] md:text-[19px] text-white/[0.85] leading-[1.7] font-medium">
        {"When we have verified customer results, you'll see them here. Until then, we're not going to invent them."}
      </p>
    </LpSection>
  );
}
