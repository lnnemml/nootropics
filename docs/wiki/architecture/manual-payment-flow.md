# Manual Payment Flow (Phase 1 interim, no payment gateway)

> See [`../decisions/0005-manual-payment-flow.md`](../decisions/0005-manual-payment-flow.md)
> for why. This page is the operational detail; update it (not the ADR)
> when implementation details change.

## Order lifecycle

```
pending_payment_instructions   (form submitted, confirmation email sent)
        ↓  (ops emails customer about payment method)
awaiting_payment                (waiting on customer to pay via whatever
                                  manual method was arranged)
        ↓  (ops manually confirms funds received)
paid
        ↓
fulfilled                       (shipped)

cancelled                       (reachable from any state above)
```

No state transition is automatic except the first (form submit →
`pending_payment_instructions` + confirmation email). All later
transitions are made by a human — there is no webhook driving this.

## Checkout form — fields to collect

- Name, email, phone (phone matters more than usual here — it's a real
  contact channel for payment coordination, not just a nice-to-have)
- Shipping address
- Product/variant + quantity
- Optional note field (e.g. "I'd prefer crypto" / "call me after 6pm") —
  feeds directly into the first manual outreach, saves a round-trip

**Explicitly not collected:** any card/payment details. Don't add a
payment field "for later" — see hard constraint in ADR 0005.

## Emails (Resend)

1. **Order received** (customer, automatic on submit) — sets expectations
   clearly: order is received, payment is *not yet* processed, a person
   will email about payment within [X — Anton to set realistic SLA, e.g.
   same business day].
2. **New order** (internal ops, automatic on submit) — order details +
   direct link/reference so ops can start the manual outreach without
   digging through the DB by hand.
3. **Payment confirmed** (customer, sent manually by ops when marking the
   order paid — template exists, send is a human action, not automatic,
   since "paid" itself is a human-verified fact).
4. **Shipped** (customer, manual or semi-automatic depending on
   fulfillment tooling — Phase 1 default: manual).

Templates 1 and 2 should exist as real Resend templates from the start of
Phase 4 implementation (cheap, removes ambiguity). Templates 3–4 can start
as plain manually-written emails and get templated later if volume
justifies it.

## What this explicitly does NOT need yet

- A payment gateway SDK of any kind
- A "Pay Now" button or any card-style input
- Automated payment status polling/webhooks
- A full admin UI — direct DB access (or a minimal internal script) is
  enough at expected Phase 1 order volume. Revisit once volume makes
  manual DB edits painful, not before.

## Related pages

- [`data-model.md`](./data-model.md) — `orders` table fields supporting
  this flow
- [`../decisions/0005-manual-payment-flow.md`](../decisions/0005-manual-payment-flow.md)
- [`../roadmap.md`](../roadmap.md)
