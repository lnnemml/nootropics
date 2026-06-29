import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | NORA",
  description: "What NORA is, why it exists, and who is behind it.",
};

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-[104px] text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
        {"Who we are"}
      </p>
      <h1
        className="mt-4 max-w-xl font-sans font-semibold tracking-[-0.025em] text-ink"
        style={{ fontSize: "clamp(32px, 3vw, 48px)", lineHeight: 1.1 }}
      >
        {"The research alliance behind the label."}
      </h1>
      <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-secondary">
        {"Full story coming soon — we're writing it the way we write everything: sourced, honest, and without filler."}
      </p>
    </section>
  );
}
