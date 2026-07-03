import type { Metadata } from "next";
import { LegalPageShell } from "@/components/layout/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | NORA",
  description: "How NORA collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="July 2, 2026"
    >
      <h2>1. Information We Collect</h2>
      <p>
        When you place an order, we collect: full name, email address,
        phone number, and shipping address. We collect only what is
        necessary to fulfill your order and communicate with you about
        it. No payment card data is ever collected or stored.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        Your data is used exclusively to: process and fulfill your
        order, coordinate payment by email, and send transactional
        communications related to your order (shipping updates,
        payment confirmation). We do not use your data for advertising,
        remarketing, or any purpose unrelated to your order.
      </p>

      <h2>3. Information Sharing</h2>
      <p>
        We do not sell, trade, or share your personal data with third
        parties except where strictly necessary: shipping carriers
        (to deliver your order) and payment intermediaries (PayPal or
        equivalent, if applicable to your payment method). We do not
        share data with advertising networks or data brokers.
      </p>

      <h2>4. Data Storage and Security</h2>
      <p>
        Order data is stored in a Neon Postgres database hosted on
        secured infrastructure. Transactional emails are sent via
        Resend. We retain your data for as long as necessary to fulfill
        orders and meet our legal obligations. You may request deletion
        at any time (see Your Rights below).
      </p>

      <h2>5. Cookies</h2>
      <p>
        This site uses a minimal set of functional cookies required
        for basic operation:
      </p>
      <p>
        <strong>Theme preference</strong> — stores your light/dark
        mode selection in localStorage. No expiry. Not transmitted to
        our servers.
      </p>
      <p>
        <strong>Session state</strong> — maintains your checkout
        session while you browse. Cleared when you close the browser.
      </p>
      <p>
        No advertising cookies, third-party tracking pixels, or
        analytics services are used on this site. No data about your
        browsing behavior is shared with any external party.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may have the right to
        access, correct, or delete personal data we hold about you.
      </p>
      <p>
        <strong>EU / EEA residents (GDPR)</strong> — you have the
        right to access, rectify, erase, restrict, or port your
        personal data, and to object to processing. To exercise these
        rights, contact us at the address below.
      </p>
      <p>
        <strong>California residents (CCPA)</strong> — you have the
        right to know what data we collect, request deletion, and
        opt out of sale. We do not sell personal data.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this policy periodically. Material changes will
        be reflected in the &ldquo;Last updated&rdquo; date above.
        Continued use of the site after changes constitutes acceptance.
      </p>

      <h2>8. Contact</h2>
      <p>
        Privacy inquiries:{" "}
        <a href="mailto:hello@noraalliance.com">
          hello@noraalliance.com
        </a>
      </p>
    </LegalPageShell>
  );
}
