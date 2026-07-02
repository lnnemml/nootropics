# ADR 0010 — Payment Method Selection UI

**Date:** 2026-07-02
**Status:** Accepted

## Context

The checkout page presents payment options in a high-risk merchant
category (nootropics) where standard card processing is expensive and
unreliable (see ADR 0005). Three payment paths exist:
  - Crypto via NowPayments (pending integration)
  - Manual email-based arrangement (existing flow)
  - Card online (gated on finding a compatible high-risk merchant)

## Decision

1. Three radio-card slots are always rendered on the checkout page.

2. **Crypto via NowPayments is the default selected option** and is
   incentivised with a **10% discount** shown live in the order
   summary. Goal: route the majority of international volume through
   crypto to avoid card processing risk and fees.

3. Manual arrangement remains a fallback. Note field lets customers
   pre-state their preferred method.

4. Card online is a **permanently disabled** slot ("Coming soon").
   It must not be enabled without a separate ADR approving the
   specific merchant account. The slot's persistent presence sets
   customer expectation that card payment is forthcoming.

5. NowPayments integration (invoice generation) is deferred to the
   next session. Phase 1.5 scope: frontend UI only.

6. The 10% discount is computed client-side. Backend (Phase 2) must
   persist `payment_method` and `crypto_discount_pct` on `orders`.

## Consequences

- Customers see the incentivised crypto total before committing,
  maximising crypto conversion rate.
- Backend must handle two post-submit flows (crypto invoice vs.
  manual outreach).
- Disabled card slot prevents card-processing questions from becoming
  a bug report rather than a roadmap item.
- The `promoCode` field in the summary is a UI stub in Phase 1.5;
  backend validation is deferred to Phase 2.

## Related

- ADR 0005 — Manual payment flow (no Stripe / no card fields)
- `docs/wiki/architecture/manual-payment-flow.md`
