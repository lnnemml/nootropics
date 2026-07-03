import type { Metadata } from "next";
import { LegalPageShell } from "@/components/layout/LegalPageShell";

export const metadata: Metadata = {
  title: "Disclaimer | NORA",
  description: "Medical, results, and liability disclaimer for NORA.",
};

export default function DisclaimerPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Disclaimer"
      lastUpdated="July 2, 2026"
    >
      <h2>1. Medical Disclaimer</h2>
      <p>
        Nothing on noraalliance.com constitutes medical advice,
        diagnosis, or treatment. All information is provided for
        educational and informational purposes only. Always consult
        a qualified and licensed healthcare provider before starting
        any supplement, research compound, or changes to your health
        regimen.
      </p>

      <h2>2. FDA Disclaimer</h2>
      <p>
        These statements have not been evaluated by the Food and Drug
        Administration. NORA products are not intended to diagnose,
        treat, cure, or prevent any disease or health condition.
      </p>

      <h2>3. Individual Results</h2>
      <p>
        Any outcomes described in citations, research summaries, or
        user accounts on this site reflect individual experiences or
        study results and are not typical. Individual outcomes vary
        significantly based on personal biochemistry, health status,
        lifestyle, dosage, and other factors. NORA makes no guarantee
        of specific results.
      </p>

      <h2>4. Accuracy of Information</h2>
      <p>
        NORA makes every effort to ensure that scientific and product
        information published on this site is accurate at time of
        publication. Research in cognitive enhancement evolves
        continuously. NORA makes no warranty as to the ongoing
        completeness, accuracy, or reliability of any published
        information and is not responsible for errors or omissions.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        NORA, its operators, and affiliates shall not be liable for
        any direct, indirect, incidental, or consequential damages
        arising from reliance on information published on this site,
        from purchase or use of NORA products, or from inability to
        use this site for any reason.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about this disclaimer:{" "}
        <a href="mailto:hello@noraalliance.com">
          hello@noraalliance.com
        </a>
      </p>
    </LegalPageShell>
  );
}
