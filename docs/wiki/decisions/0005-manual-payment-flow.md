# 0005 — Manual Payment Flow Instead of Stripe

- **Date:** 2026-06-29
- **Status:** Confirmed
- **Supersedes:** the Stripe assumption in the original Phase 4 plan
  (ADR 0001 / `roadmap.md` v1)

## Decision

NeuroDrive will **not** integrate Stripe or any other mainstream payment
processor. Checkout collects order + contact details only — no card
fields, no live payment gateway. After submission:

1. Customer sees a confirmation screen and receives a **Resend**
   transactional email: order received, team will follow up about payment.
2. Internal ops gets a Resend notification email for the new order.
3. A human manually emails the customer to arrange payment (method
   depends on whichever high-risk/offshore merchant solution is live at
   the time — bank transfer, crypto, or a processor once one is secured).
4. A human marks the order as paid in the database once payment is
   confirmed (via direct DB access or a minimal internal tool — no
   customer-facing payment UI exists in Phase 1).

## Context

Bromantane / nootropics is a high-risk merchant category. Mainstream
processors (Stripe and equivalents) decline or terminate accounts for
this category — this is not a configuration problem, it's a category
restriction. Anton is researching high-risk offshore merchant account
providers in parallel; no specific provider is selected yet.

Building a Stripe integration now (as the original plan assumed) would be
wasted work: it would need to be ripped out and replaced once a real
high-risk merchant solution is chosen, and that solution's integration
shape is unknown today (could be a hosted payment link, a different SDK
entirely, or fully manual indefinitely for low volume).

## Consequences

- `orders.status` needs payment-related states that don't assume a
  webhook-driven gateway (no `payment_intent_succeeded` style event) —
  see updated [`data-model.md`](../architecture/data-model.md) and the new
  [`manual-payment-flow.md`](../architecture/manual-payment-flow.md).
- Phase 4 ("Cart + checkout") is redefined: no Stripe SDK, no card
  collection UI. It becomes "Cart + manual-confirmation checkout +
  Resend emails." See updated `roadmap.md`.
- **Hard constraint for Claude Code:** do not add Stripe, a card input
  field, or any "pay now" button that implies real-time payment
  processing, even as a placeholder/mock — it creates false expectations
  for customers and contradicts this decision. Recorded in root
  `CLAUDE.md`.
- Low order volume is actually fine for manual handling at launch; this
  is not a stopgap to be ashamed of — many high-risk-category DTC brands
  run this way for months before automating.

## Revisit if

- Anton secures a high-risk merchant account / payment processor → write
  a new ADR (0007+) for the real integration, and update
  `manual-payment-flow.md` rather than deleting it (the manual path may
  remain as a fallback for declined/edge-case orders).
