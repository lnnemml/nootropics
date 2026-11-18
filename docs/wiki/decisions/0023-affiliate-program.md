# ADR 0023 — Affiliate program (ported from isrib-next)

**Date:** 2026-11-18
**Status:** Accepted (Anton asked for the port; launch sales pillar)
**Relates to:** isrib-next ADR 0025 (canonical design), NORA ADR 0017 (customer referral),
[`marketing/sales-strategy-launch.md`](../marketing/sales-strategy-launch.md)

## Decision

Add a creator affiliate program, separate from the 10%/10% customer referral (ADR 0017), by
porting isrib-next's ADR 0025 implementation.

- **Commission:** 35% of `orders.total_price`, configurable per affiliate.
- **Buyer discount:** 15%, configurable per affiliate.
- **Non-stacking:** an affiliate order gets the **better** of the affiliate rate and the 10%
  crypto discount, never both. It also drops any customer referral, and a referral reward is not
  consumed on it. Non-affiliate orders keep NORA's existing stacking unchanged.
- **Earned on paid.** `paid`/`fulfilled` → earned, `cancelled` → void, else pending — derived from
  order status, never stored.
- **Payouts:** manual, in crypto, recorded in admin with a tx hash. Immutable.
- **Transparency for the affiliate, zero customer PII:** masked order numbers (`NR-******34`).
- **Feature flag:** `AFFILIATES_ENABLED` (`"true"` = on). Off means no buyer-facing change.

Worked examples: $120 crypto order with a code → buyer pays $102, commission $35.70, NORA keeps
$66.30. $300 (3 bottles) → buyer pays $255, commission $89.25.

## What differs from isrib-next

| Area | isrib-next | NORA |
|---|---|---|
| Customer referral prefix blocked for affiliate codes | `REF-` | `NORA-` |
| Cookie names | `isrib_ref`, `isrib_partner_session` | `nora_ref`, `nora_partner_session` |
| Gate file | `src/proxy.ts` | root `middleware.ts` (NextAuth-wrapped); clicks fired with `after()` |
| Code conflict check | also against `promo_codes` | no promo table; `NORA-` prefix makes referral collisions impossible |
| `updateAffiliate` atomicity | interactive transaction + row lock | `db.batch()` (neon-http has no interactive transactions) |
| Where codes are typed | promo field | promo field **Apply** button + existing `?ref=` → referral pipeline |
| Ref link target | `/?ref=` | `/go?ref=` (the DR landing page, ADR 0019) |
| Buyer discount on the order | not stored | `orders.affiliate_discount_bps` (the discount actually applied), so emails stay accurate |
| Migrations | hand-written up/down SQL | `npm run db:push` (repo convention) |

## Data model (additive only)

New tables: `affiliates`, `affiliate_clicks`, `affiliate_payouts`, `affiliate_login_tokens`,
`affiliate_sessions`, `affiliate_login_attempts`, plus enum `attribution_source`.

New nullable `orders` columns: `affiliate_id` (FK, indexed), `attribution_source`,
`affiliate_discount_bps`, `commission_rate_snapshot_bps`, `commission_amount_cents`,
`commission_earned_at`. On affiliate orders `promo_code` holds the affiliate code and
`crypto_discount_pct` is null (the crypto discount wasn't applied separately).

## Attribution

1. `noraalliance.com/go?ref=CODE` → middleware sets the `nora_ref` cookie (30 days) and, for
   non-`NORA-` codes, posts a click to `/api/affiliate/click` (secret-authenticated, bot-filtered,
   one per visitor per UTC day via a daily-salted HMAC — never a raw IP).
2. Checkout reads the code from sessionStorage → URL → cookie, previews it through
   `/api/referral/validate`, and shows the best-of discount.
3. `submitOrder` is authoritative: a typed active affiliate code beats the cookie; self-purchase
   (buyer email = affiliate notify email) attributes nothing. Inactive/unknown codes are ignored
   silently and never block a sale.
4. Commission snapshot is written at order creation from the final total.
5. `claimCommissionAndNotify` runs on every paid path — admin `updateOrderStatus`,
   `markOrderShipped`, and the NowPayments webhook. One conditional UPDATE on
   `commission_earned_at` means exactly one path notifies (Telegram first, email fallback).

## Surfaces

- `/admin/affiliates` — list with payout-run total, create form; `/admin/affiliates/[id]` — stats,
  ref link, login-link generator, test notification, edit, record payout, payout + order history.
- `/partner` — magic-link login (rate-limited, identical response whether or not the email
  exists), dashboard (clicks, conversion, earned, paid, balance), CSV export. Standalone page, no
  site nav. The magic-link target is a route handler, so the token URL never loads analytics.

## Consequences

- **Deploy order is mandatory: `db:push` → deploy → set env + enable.** `/admin` and other code
  select full `orders` rows, so the columns must exist first; the flag does not protect against
  this. A build against the un-migrated DB fails while prerendering `/admin`.
- `.env.local` points at production Neon, so `db:push` from a laptop migrates production.
- Env: `AFFILIATES_ENABLED`, `AFFILIATE_HASH_SECRET`, `TELEGRAM_BOT_TOKEN` (see
  `.env.local.example`). Changing the flag on Vercel needs a redeploy.
- Test with a separate QA affiliate only: payouts are immutable and affiliates can't be deleted.
- Always set `notify_email` — the self-purchase check and partner login both depend on it.
- Don't mark an unpaid affiliate order as shipped: "fulfilled" counts as earned.
- The Privacy page should gain an affiliate paragraph (AI-drafted template, not legal review).

## Onboarding an affiliate

Create in `/admin/affiliates` → send them the ref link and code → "Generate login link" (24h,
single-use) or they request one at `/partner/login`. For Telegram: they message the bot once,
Anton reads `chat.id` from `api.telegram.org/bot<TOKEN>/getUpdates` and pastes it into admin. Use
"Send test notification" to confirm delivery.

## Revisit if

- 15% doesn't move conversion over the 10% crypto default.
- Margin review after the first month of affiliate sales (35% of a $102 order is the largest single
  cost line).
- Self-purchase through a second email appears — the email check only stops the obvious case.
