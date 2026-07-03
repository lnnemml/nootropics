# ADR 0011 — Legal Pages

**Date:** 2026-07-02
**Status:** Accepted — REQUIRES LEGAL REVIEW BEFORE LAUNCH

## Context

noraalliance.com sells research compounds internationally via manual
payment and cryptocurrency. Legal pages are required to cover terms
of purchase, data handling, regulatory positioning, and liability.

## Decision

Four pages created at:
- /legal/terms          Terms of Service
- /legal/privacy        Privacy Policy
- /legal/research-use   Research Use Only
- /legal/disclaimer     Disclaimer

Shared shell: `src/components/layout/LegalPageShell.tsx`

Key positions encoded:
- Payment: crypto (NowPayments) or manual arrangement only.
  Card payment explicitly noted as unavailable.
- Cookies: theme preference (localStorage) + session only.
  No advertising or analytics cookies.
- Regulatory: bromantane is unscheduled in US/CA/EU.
  WADA ban noted on Research Use Only page.
- Jurisdiction: GDPR (EU) and CCPA (CA) rights acknowledged
  in Privacy Policy.

## ⚠ Legal Review Required

These pages are functional drafts. Before public launch they must be
reviewed by a qualified lawyer familiar with:
- E-commerce in high-risk supplement / research compound categories
- GDPR and CCPA compliance
- FTC guidelines on supplement claims
- Import/export regulations for nootropics in target markets

Do not remove this notice until legal sign-off is documented.

## Related

- ADR 0005 — Manual payment flow (no Stripe / no card fields)
- ADR 0010 — Payment method selection UI (crypto + manual)
