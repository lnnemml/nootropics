# ADR 0017 — Referral System: Symmetrical 10%/10% Model

**Date:** 2026-07-11
**Status:** Accepted

## Decision

Implement a symmetrical referral program: the referrer earns 10% off their
next order; the referred buyer gets 10% off the order where they used the
code. Total maximum discount on a single order is 20% (crypto 10% + referral
10%). One code per user account, format "NORA-XXXXXX" (nanoid-derived).
Referrer reward is created on `paid` status — not on order placement.

## Context

Phase 5 introduces a referral system as a growth lever. Key constraints
shaped the design:

- **Crypto stack already takes 10%** — if a referred buyer also pays with
  crypto they'd see 20% off total. This is acceptable and intentional (reward
  both behaviors).
- **No loyalty tiers at launch** — the `customer_tiers` table sketched in the
  Phase 2 data model is deferred. Not enough order volume at launch to
  calibrate tier thresholds meaningfully.
- **Guest checkout must stay supported** — referral codes can be entered at
  checkout without an account; the `referral_code_used` snapshot on `orders`
  captures the code string regardless.
- **Referrer must have an account** — `referral_codes` has a required `user_id`
  FK, so only registered users generate codes. Guest buyers who use a code can
  claim the referral but can't generate one until they register.
- **Reward deferred until `paid`** — avoids rewarding fraudulent or
  unpaid orders.

## Schema

Three new tables (`referral_codes`, `referrals`, `discount_ledger`) and three
new nullable columns on `orders` (`referral_code_used`, `referral_discount_pct`,
`discount_ledger_id`). See
[`architecture/data-model.md`](../architecture/data-model.md) for field-level
detail.

`discount_ledger.source` ("referral_reward" | "promo") makes the table
extensible to promo codes later without a migration.

## Consequences

- Any user who registers gets a unique referral code generated lazily (on
  first visit to /account or on demand).
- The checkout flow must check `referral_code_used` against `referral_codes`
  at submission and apply the discount — implemented in Phase 5.2 (Server
  Action update).
- Referrer reward creation (Phase 5.3) requires a background step or webhook
  that fires when an order transitions to `paid`.
- `referrals` table is the audit trail linking a referral code → the order
  that used it → the reward that was granted.

## Revisit if

- Order volume justifies loyalty tier thresholds → add `customer_tiers` table
  and update `discount_ledger.source` to include "tier_reward".
- Affiliate program needed (different commission rates per partner) → add an
  `affiliate_rate` column to `referral_codes` and a separate payout model.
