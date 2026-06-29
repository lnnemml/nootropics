import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | NORA",
  description: "Get in touch with the NORA team.",
};

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-[104px] text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-secondary">
        {"Get in touch"}
      </p>
      <h1
        className="mt-4 max-w-xl font-sans font-semibold tracking-[-0.025em] text-ink"
        style={{ fontSize: "clamp(32px, 3vw, 48px)", lineHeight: 1.1 }}
      >
        {"We read every message."}
      </h1>
      <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-secondary">
        {"Questions about compounds, orders, or the research? Reach us directly."}
      </p>
      <Link
        href="mailto:hello@nora.so"
        className="mt-8 rounded border border-border px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-primary transition-colors hover:border-accent hover:text-accent"
      >
        {"hello@nora.so"}
      </Link>
    </section>
  );
}
