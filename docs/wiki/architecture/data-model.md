# Architecture — Data Model

> **Current status (Phase 5.1):** `orders`, `users`, `verification_tokens`
> established in Phase 2–3.1. Tracking columns added Phase 4.1.
> `referral_codes`, `referrals`, `discount_ledger` tables and three new
> order columns added Phase 5.1 (2026-07-11). `src/lib/db/schema.ts` is
> the ground truth for Drizzle types; this file explains intent.

This page documents the schema shape and the *why* behind each decision.
It should be updated whenever the live schema changes.

## Live schema (Phases 2 – 5.1)

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
`traffic_type`, `user_id` (nullable FK → users.id), `tracking_number`
(nullable), `tracking_carrier` (nullable), `shipped_at` (nullable),
`follow_up_sent_at` (nullable, reserved for future cron).

**Phase 5.1 additions:** `referral_code_used` (nullable text — snapshot of
code string at purchase), `referral_discount_pct` (nullable int — 10 when
applied), `discount_ledger_id` (nullable text — FK → discount_ledger.id if
a reward was consumed by this order).

`user_id` is nullable — guest checkout stays fully supported. It provides a
soft link between a guest order and a user account created later (post-checkout
upsell, matched by email).

Status enum: `pending_payment_instructions → awaiting_payment → paid →
fulfilled`, or any → `cancelled`.

### `referral_codes` (added Phase 5.1)

Fields: `id` (nanoid PK), `user_id` (FK → users.id, unique — one code per
user), `code` (unique text, format "NORA-XXXXXX"), `active` (bool, default
true), `created_at`.

### `discount_ledger` (added Phase 5.1)

Tracks individual reward/credit entries with full lifecycle. Fields: `id`
(nanoid PK), `user_id` (FK → users.id), `source` ("referral_reward" |
"promo"), `discount_pct` (int — 10 = 10%), `status` ("available" |
"redeemed" | "expired"), `redeemed_order_id` (nullable — set when consumed),
`expires_at` (nullable timestamp — null means never expires), `created_at`.

The `source` field makes this table extensible to promo codes without schema
changes. See [ADR 0017](../decisions/0017-referral-system.md).

### `referrals` (added Phase 5.1)

Junction record created when a referred order is placed. Fields: `id` (nanoid
PK), `referral_code_id` (FK → referral_codes.id), `referred_order_id` (FK →
orders.id), `referred_email`, `referrer_reward_id` (nullable text — FK →
discount_ledger.id, set when the referrer's reward entry is created on order
`paid`), `created_at`.

## Future schema (deferred)

**`referral_codes`** — ✅ done (Phase 5.1)
**`discount_ledger`** — ✅ done (Phase 5.1)
**`referrals`** — ✅ done (Phase 5.1)

**`customer_tiers`** — deferred (no loyalty tiers at launch; revisit if
volume justifies it — see ADR 0017).

```
products
  id, slug, name, description, status (draft/active/archived)

product_variants
  id, product_id, sku, price_cents, currency, subscription_eligible (bool)

order_notes
  id, order_id, author (ops team member or "system"), note, created_at
  -- manual ops log: "emailed customer re: bank transfer", etc.
  -- no payment gateway producing automatic audit trail (see manual-payment-flow.md)

order_items
  id, order_id, product_variant_id, quantity, unit_price_cents

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
