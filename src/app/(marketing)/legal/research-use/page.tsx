import type { Metadata } from "next";
import { LegalPageShell } from "@/components/layout/LegalPageShell";

export const metadata: Metadata = {
  title: "Research Use Only | NORA",
  description: "Regulatory status and intended use context for NORA products.",
};

export default function ResearchUsePage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Research Use Only"
      lastUpdated="July 2, 2026"
    >
      <h2>Purpose of This Page</h2>
      <p>
        This page explains the regulatory status and intended use
        context for compounds sold by NORA. Please read it before
        purchasing.
      </p>

      <h2>1. Nature of Products</h2>
      <p>
        NORA sells research compounds — including bromantane (NeuroDrive)
        — as reference materials for research and educational purposes.
        These statements have not been evaluated by the Food and Drug
        Administration (FDA) or equivalent regulatory authorities in
        other jurisdictions.
      </p>

      <h2>2. Not Intended to Diagnose, Treat, Cure, or Prevent</h2>
      <p>
        Products sold by NORA are not intended to diagnose, treat,
        cure, or prevent any disease or medical condition. Nothing on
        this site constitutes medical advice, and no information
        published here should be construed as a substitute for
        consultation with a qualified healthcare professional.
      </p>

      <h2>3. Regulatory Status</h2>
      <p>
        Bromantane is not a scheduled or controlled substance in the
        United States, Canada, or the European Union. It is not
        approved as a pharmaceutical drug or dietary supplement by the
        FDA or EMA. Regulatory status varies by country. It is your
        sole responsibility to verify the legal status of this
        compound in your jurisdiction before purchasing or importing.
      </p>
      <p>
        Note: bromantane is prohibited in competitive sport by WADA.
        If you are a competitive athlete subject to anti-doping
        testing, do not purchase this product.
      </p>

      <h2>4. Self-Experimentation and Risk</h2>
      <p>
        Individuals who choose to use these compounds outside a formal
        research setting do so at their own risk. NORA strongly
        recommends consulting a qualified healthcare professional
        before use — particularly if you are pregnant, nursing,
        taking prescription medications, or have a pre-existing
        medical condition.
      </p>

      <h2>5. Research Context</h2>
      <p>
        Scientific and clinical information published on this site is
        provided for educational purposes. All citations reference
        published, peer-reviewed research. NORA does not conduct
        clinical trials and does not make therapeutic claims on the
        basis of third-party research.
      </p>
    </LegalPageShell>
  );
}
