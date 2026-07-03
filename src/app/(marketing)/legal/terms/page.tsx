import type { Metadata } from "next";
import { LegalPageShell } from "@/components/layout/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms of Service | NORA",
  description: "Terms governing purchases and use of noraalliance.com.",
};

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated="July 2, 2026"
    >
      <h2>1. Acceptance of Terms</h2>
      <p>
        By placing an order or using noraalliance.com, you agree to
        these Terms of Service in full. If you do not agree, do not
        use this site or submit an order.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years of age to purchase from NORA.
        By submitting an order, you confirm that you are 18 or older
        and legally permitted to purchase research compounds in your
        jurisdiction. It is your responsibility to verify that
        importing these compounds is lawful in your country before
        ordering.
      </p>

      <h2>3. Products and Orders</h2>
      <p>
        NORA sells research compounds, including NeuroDrive (sublingual
        bromantane solution). Products are sold for research and
        educational purposes only. All orders are subject to
        availability and our acceptance. We reserve the right to
        cancel any order at our discretion, with a full refund if
        payment has been received.
      </p>

      <h2>4. Payment</h2>
      <p>
        NORA currently accepts payment via two methods:
      </p>
      <p>
        <strong>Cryptocurrency</strong> — processed through
        NowPayments. Supported currencies include BTC, ETH, USDC,
        and others listed at checkout. A 10% discount applies to
        crypto payments.
      </p>
      <p>
        <strong>Manual arrangement</strong> — payment details are
        coordinated by email following order submission. Accepted
        methods include PayPal, SEPA/SWIFT bank transfer, Western
        Union, and similar services. We will contact you at the email
        provided within one business day.
      </p>
      <p>
        Card payment is not currently available. No card data is
        collected or stored by NORA. Orders are fulfilled upon
        confirmed payment receipt.
      </p>

      <h2>5. Shipping and Delivery</h2>
      <p>
        NORA ships internationally. Delivery typically takes 7–21
        business days depending on destination. NORA is not
        responsible for customs delays, import duties, or restrictions
        in your country. Risk of loss passes to the buyer upon
        handover to the carrier.
      </p>

      <h2>6. Returns and Refunds</h2>
      <p>
        Due to the nature of research compounds, all sales are final.
        In cases of damaged or incorrect shipments, contact us at{" "}
        <a href="mailto:hello@noraalliance.com">
          hello@noraalliance.com
        </a>{" "}
        within 7 days of delivery with photographic evidence. We will
        arrange a replacement or refund at our discretion.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All content on noraalliance.com — including text, design, and
        branding — is the property of NORA and may not be reproduced,
        distributed, or used commercially without written permission.
      </p>

      <h2>8. Disclaimer of Warranties</h2>
      <p>
        Products are provided &ldquo;as is&rdquo; for research
        purposes. NORA makes no warranties, express or implied,
        regarding fitness for any particular purpose, outcomes, or
        results of use.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law, NORA shall
        not be liable for any indirect, incidental, special, or
        consequential damages arising from use of our products or
        services, even if advised of the possibility of such damages.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These terms are governed by applicable law. Any disputes shall
        first be addressed through good-faith negotiation. If
        unresolved, disputes shall be submitted to binding arbitration.
      </p>

      <h2>11. Changes to Terms</h2>
      <p>
        We reserve the right to update these terms at any time.
        Continued use of the site after changes constitutes acceptance
        of the revised terms. Material changes will be reflected in
        the &ldquo;Last updated&rdquo; date above.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:hello@noraalliance.com">
          hello@noraalliance.com
        </a>
      </p>
    </LegalPageShell>
  );
}
