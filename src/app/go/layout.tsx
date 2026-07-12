import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeuroDrive — Dopamine Stabilizer for Deep Focus | NORA",
  description:
    "Sublingual bromantane drops that restore motivation and clarity without stimulants. 80mg/ml, pharmaceutical-grade, NMR-verified purity.",
  alternates: {
    canonical: "https://www.noraalliance.com/go",
  },
  openGraph: {
    title: "NeuroDrive — Dopamine Stabilizer for Deep Focus | NORA",
    description:
      "Sublingual bromantane drops that restore motivation and clarity without stimulants. 80mg/ml, pharmaceutical-grade, NMR-verified purity.",
    url: "https://www.noraalliance.com/go",
    siteName: "NORA Alliance",
    type: "website",
  },
};

export default function GoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
