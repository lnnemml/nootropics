import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeuroDrive — Feel Mentally Clear All Day | NORA",
  description:
    "Sublingual bromantane drops that restore focus and motivation through dopamine synthesis. Not a stimulant. 80mg/ml, NMR-verified purity. Free worldwide shipping.",
  alternates: {
    canonical: "https://www.noraalliance.com/go",
  },
  openGraph: {
    title: "NeuroDrive — Feel Mentally Clear All Day | NORA",
    description:
      "Sublingual bromantane drops that restore focus and motivation through dopamine synthesis. Not a stimulant. 80mg/ml, NMR-verified purity. Free worldwide shipping.",
    url: "https://www.noraalliance.com/go",
    siteName: "NORA Alliance",
    type: "website",
  },
};

export default function GoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
