# Architecture — Data Model (Phase 2 sketch)

> Status: **sketch for Phase 2 planning**, not yet implemented. Last
> updated 2026-06-29.

This is intentionally e-commerce-ready even though Phase 1 has no checkout
and only one product — see
[`platform-vs-product.md`](./platform-vs-product.md). Schema lives in
`src/lib/db/schema.ts` (Drizzle) once Phase 2 starts; this page is the
human/LLM-readable companion that explains *why* each shape is the way it
is, and should be updated whenever the real schema changes.

## Core tables (sketch)

```
users
  id, email (nullable until account created — guest checkout supported),
  created_at, referred_by_user_id (nullable, self-referencing)

products
  id, slug, name, description, status (draft/active/archived)

product_variants
  id, product_id, sku, price_cents, currency, subscription_eligible (bool)

orders
  id, user_id (nullable for guest), email, phone, shipping_address,
  status (pending_payment_instructions | awaiting_payment | paid |
          fulfilled | cancelled),
  subtotal_cents, discount_cents, total_cents, referral_code_used (nullable),
  payment_method (nullable — free-form/enum once a merchant solution
    exists; "manual" for now), payment_reference (nullable free text),
  customer_note (nullable — collected at checkout, e.g. payment
    preference), confirmation_email_sent_at, created_at

order_notes
  id, order_id, author (ops team member or "system"), note, created_at
  -- manual ops log: "emailed customer 6/29 re: bank transfer", etc.
  -- this table exists specifically because there is no payment gateway
  -- producing an automatic audit trail (see manual-payment-flow.md)

order_items
  id, order_id, product_variant_id, quantity, unit_price_cents

referral_codes
  id, owner_user_id, code, created_at, active (bool)

discount_ledger
  id, user_id, source (referral_reward | cumulative_tier | promo),
  amount_cents OR percent, status (available | redeemed | expired),
  related_order_id (nullable), created_at

customer_tiers
  id, user_id, tier (e.g. bronze/silver/gold by lifetime spend),
  lifetime_spend_cents, updated_at
```

## Reasoning notes

- **`order_notes` as its own table** — there's no payment gateway
  producing an automatic audit trail (see
  [`manual-payment-flow.md`](./manual-payment-flow.md)), so the manual
  back-and-forth with a customer needs *somewhere* to live that isn't
  someone's personal email inbox. This is what makes the manual flow
  operable past the first few orders.

- **`users.email` nullable, `orders.user_id` nullable** — this is the
  concrete schema-level expression of "optional auth": a real purchase
  flow must work all the way through checkout without a created account.
  Account creation is an *upsell offered after checkout* (e.g. "save your
  order history / track referral rewards — create an account"), not a
  gate before purchase.
- **`discount_ledger` as its own table, not a column on `users`** — both
  referral rewards and cumulative-spend discounts need history, expiry,
  and audit trail (which order consumed which discount). A single column
  can't represent "I have 3 stacked discounts, 2 unused."
- **`referral_code_used` stored directly on `orders`** — even if the
  referral_codes table changes later, the order keeps a permanent record
  of what was actually applied at purchase time.

## Open questions for Phase 2 (flag for Anton before implementation)

- Cumulative discount tiers: spend-based thresholds, or order-count-based?
  (Offer brief mentions "multi-bottle or subscription" upsell — tier logic
  should reward subscription continuity, not just one-time spend.)
- Referral reward: percentage off, fixed credit, or free product at
  threshold? Affects whether `discount_ledger.amount_cents` needs a
  `percent` variant from day one (modeled above as "OR" — needs a real
  decision before migration is written).

## Related pages

- [`tech-stack.md`](./tech-stack.md)
- [`platform-vs-product.md`](./platform-vs-product.md)
- [`manual-payment-flow.md`](./manual-payment-flow.md)
