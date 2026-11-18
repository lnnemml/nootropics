# ADR 0024 — Admin panel ported from isrib-next (BI dashboard, password auth, campaigns)

**Date:** 2026-11-18
**Status:** Accepted (Anton chose "include campaigns" and "switch to ISRIB-style login")
**Relates to:** isrib-next ADR 0011 (admin panel + auth), ADR 0017 + 0023 there (marketing list);
NORA ADR 0023 (affiliates), ADR 0005 (manual payments)

## Decision

Replace NORA's minimal admin (an orders list and a detail page behind NextAuth) with isrib-next's
admin panel, adapted to NORA.

### 1. Auth — single password, signed cookie

- `ADMIN_PASSWORD` + `ADMIN_AUTH_SECRET`. `src/lib/admin/auth.ts` signs a 12-hour HS256 JWT with
  `jose` into the httpOnly cookie `nora_admin_session`; the password check is constant-time.
- The admin NextAuth instance is removed (`src/lib/auth.ts`, `auth.config.ts`,
  `/api/auth/[...nextauth]`, `ADMIN_PASSWORD_HASH`). Customer accounts keep their own NextAuth
  instance at `/api/auth/customer`.
- Root `middleware.ts` → **`src/proxy.ts`** (Next 16 name, beside `app/`). The root file compiled
  but never ran under `next dev`, so locally `/admin` served the orders table with no session.
  The proxy re-inlines a jose verify; it also keeps the customer gate, the `/partner` gate and
  `?ref` capture from ADR 0023.
- Defense in depth: every admin page and Server Action calls `isAdminAuthed()` itself.

### 2. Dashboard (`/admin`)

30-day KPIs (revenue, orders, AOV, paid/unpaid, needs-action), revenue by month with month-to-date
pace, attribution by traffic type / UTM source / **affiliate** / country, top products, an orders
table with inline status, **Mark paid** and shipping, and a customers view (LTV, repeat).
`force-dynamic` — the old page was prerendered at build time and showed a frozen order list.

Differences from isrib: one product per order row (no `order_items`), no legacy orders, every order
has an address at checkout (so needs-action = awaiting payment / awaiting shipment), no flat
shipping-cost model, and an added affiliate breakdown.

Actions: `setStatus` (replaces `updateOrderStatus`), `markPaid` (the manual-payment confirmation:
emails the customer + ops), shipping reuses `markOrderShipped`. All run the referral reward and
affiliate commission claim on paid. Payment-confirmed emails now name the method instead of always
saying "crypto".

### 3. Campaigns (`/admin/campaigns`)

- New table `marketing_contacts` (insert-only; an opt-out is never reset).
- Every order adds its email (not `*.test`) via `addMarketingContact`, non-fatal in `submitOrder`.
  "Sync contacts from orders" backfills earlier orders.
- Broadcasts are written in Resend and tested/sent from admin.
- **The Resend account is shared with isrib.shop.** NORA uses its own segment via
  `RESEND_SEGMENT_ID`, with **no default** (isrib's code defaults to the ISRIB segment). The admin
  lists only broadcasts bound to NORA's segment, and the send/test actions re-fetch the broadcast
  and refuse any other segment server-side.

## Consequences

- **Deploy order:** set `ADMIN_PASSWORD` and `ADMIN_AUTH_SECRET` on Vercel *before* deploying,
  or nobody can sign in. Then `db:push` (adds `marketing_contacts`), create the NORA segment in
  Resend and set `RESEND_SEGMENT_ID`. Without the table `/admin/campaigns` errors; checkout is
  unaffected (contact-add is non-fatal).
- Marketing email to customers needs a lawful basis and an unsubscribe link (Resend's
  `{{{RESEND_UNSUBSCRIBE_URL}}}` in every broadcast). The Privacy page should mention the list —
  it is an AI-drafted template, not legal review.
- Single operator, single password: no per-user audit. Revisit if a second person needs access.

## Revisit if

- A second admin user is needed (per-user accounts, audit trail).
- NORA ships more than one product per order (move to an order-items model).
- The Resend account is split per brand (the segment guard could then relax).
