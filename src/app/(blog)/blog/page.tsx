import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal | NORA",
  description: "Research notes, mechanism breakdowns, and evidence reviews from the NORA team.",
};

export default function BlogIndexPage() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-[104px] text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
        {"NORA Journal"}
      </p>
      <h1
        className="mt-4 max-w-xl font-sans font-semibold tracking-[-0.025em] text-ink"
        style={{ fontSize: "clamp(32px, 3vw, 48px)", lineHeight: 1.1 }}
      >
        {"Mechanism notes, published in the open."}
      </h1>
      <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-secondary">
        {"First articles in progress — we're not going to publish something half-sourced to fill a content calendar."}
      </p>
    </section>
  );
}
