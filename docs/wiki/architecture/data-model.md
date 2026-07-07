# Architecture — Data Model

> **Phase 2 + 3.1 status:** `orders` table confirmed 2026-07-03 (Phase 2).
> `users`, `verification_tokens`, and `user_id` FK on `orders` added and
> pushed to Neon 2026-07-07 (Task 3.1). The fuller normalized schema
> (products, product_variants, order_items, referral_codes,
> discount_ledger, customer_tiers) is deferred to Phase 3+. The Phase 2
> implementation plan is the authoritative task-level spec —
> [`phase-2-implementation-plan.md`](../phase-2-implementation-plan.md).

This page documents the schema shape and the *why* behind each decision.
It should be updated whenever the live schema changes. `src/lib/db/schema.ts`
is the ground truth for Drizzle types; this file explains intent.

## Phase 2 + 3.1 schema (live in Neon)

### `users` (added Task 3.1)

Fields: `id` (nanoid PK), `email` (unique, not null), `name` (nullable),
`email_verified_at` (nullable timestamp), `created_at` (defaultNow).
No auth logic yet — table exists for Auth.js Email provider wiring in Task 3.2.

### `verification_tokens` (added Task 3.1)

Fields: `identifier` (email address), `token` (unique), `expires` (timestamp).
Required by Auth.js Email provider magic-link flow.

### `orders`

Single denormalized table — product slug and quantity live directly on the row
(no `products` or `order_items` yet). See `src/lib/db/schema.ts` for the
Drizzle definition.

Fields: `id` (nanoid), `created_at`, `status` (enum), `name`, `email`,
`phone`, `address`, `city`, `postal_code`, `state_region` (nullable),
`country`, `product_slug`, `quantity`, `base_price` (cents),
`payment_method` (enum: "crypto" | "manual"), `crypto_discount_pct`
(nullable int), `total_price` (cents), `promo_code` (nullable),
`note` (nullable), `nowpayments_invoice_id` (nullable),
`nowpayments_payment_url` (nullable), `confirmation_email_sent_at`
(nullable timestamp), `order_number` (unique text), UTM fields,
`traffic_type`, **`user_id` (nullable FK → users.id, added Task 3.1)**.

`user_id` is nullable — guest checkout stays fully supported. It provides a
soft link between a guest order and a user account created later (post-checkout
upsell, matched by email).

Status enum: `pending_payment_instructions → awaiting_payment → paid →
fulfilled`, or any → `cancelled`.

## Future schema (Phase 3+, not yet built)

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

> These tables exist for planning purposes — they document the normalized
> schema that will be introduced in Phase 3+ once Phase 2 is shipped and
> stable. Do not implement them in Phase 2.

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
