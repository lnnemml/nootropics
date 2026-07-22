# Roadmap — Phases

> Last updated 2026-06-28. This is the working phase plan; detailed
> task-level breakdown for the *current* phase should additionally live
> in GitHub Issues/Projects once the repo is pushed (not duplicated here
> in full — link, don't copy, to avoid the wiki going stale).

## Phase 0 — Architecture & Wiki *(done — scaffold deployed to Vercel)*
- Confirm tech stack & repo shape (ADR 0001)
- Scaffold Next.js project, folder structure
- Initialize `docs/raw/` + `docs/wiki/` + root `CLAUDE.md`
- Push to GitHub, connect Vercel + Neon

## Phase 1 — Marketing shell + NeuroDrive launch surface *(done — pushed to `lnnemml/nootropics`)*

> **Sequencing (updated 2026-06-29):** non-advertorial first. Design and
> build the shared system on simpler surfaces, then extend to the
> advertorial last — see
> [`design/brand-design-brief.md`](./design/brand-design-brief.md).

- Design system (Tailwind theme, shadcn components, typography) reflecting
  "for builders, not bio-spiritual wellness" brand tone — explored first
  in Claude Design on the home/mission page
- `(marketing)` shell: home, mission/about
- `(shop)/products/[slug]` generic template, NeuroDrive as the first entry
  (content-only — no real cart/checkout yet)
- Checkout (manual-confirmation) shell — UI only, no payment logic yet
  (see [`architecture/manual-payment-flow.md`](./architecture/manual-payment-flow.md))
- `(shop)/neurodrive` — **last** in this phase — the long-form advertorial
  landing page, built from existing validated copy (Belief → Problem →
  Failed Solutions → Mechanism → Transformation → Proof → Urgency →
  Action), once the design system is proven elsewhere
- Goal: something live and shareable on Vercel
- **Outcome:** structural skeleton works and the locked design system
  holds up across pages — but Anton's review (2026-06-29) found it "too
  generic, not a real e-commerce site yet." Correct assessment for a
  7-task structural pass; see Phase 1.5 below for what's actually missing.

## Phase 1.5 — Site completeness *(done — 2026-07-03)*

> Inserted 2026-06-29, before any database/auth work — see ADR 0008.
> **Format (amended 2026-06-29):** open punch list, not a fixed task
> breakdown — Anton can't yet size this scope, so the plan stays loose
> and reorderable. Full list:
> [`phase-1.5-implementation-plan.md`](./phase-1.5-implementation-plan.md).
> Rough areas, in no fixed order: header fixes, home page polish,
> product page (photo + price — price blocked on Anton), maybe starter
> articles, checkout polish, About, FAQ, legal/technical pages. Anton
> decides when the site looks externally finished — that's "done" for
> this phase, not a checklist.

## Phase 2 — Backend MVP *(done — 2026-07-04)*

> Scope updated 2026-07-03 — old Phases 2 ("Database & product catalog"),
> 3 ("Optional auth"), and 4 ("Cart + manual-confirmation checkout") from
> the original roadmap are folded into this single phase. The checkout UI
> and payment method selection already exist from Phase 1.5; Phase 2 wires
> them to a real database, real emails, and the NowPayments crypto API.
>
> Full task breakdown in
> [`phase-2-implementation-plan.md`](./phase-2-implementation-plan.md).

**Gate criteria:** a real order can be placed, saved to the DB, confirmed
by two automatic emails (customer + ops), and optionally paid via crypto
through a NowPayments hosted page — and Anton can view and update order
statuses in a minimal admin panel.

**What's already done (before Phase 2 coding begins):**
- Resend domain `noraalliance.com` verified (us-east-1)
- `RESEND_API_KEY` in Vercel env (Production + Preview + Development)

**What's NOT done yet (prerequisites Anton must complete before certain tasks):**
- SPF/DKIM DNS records on Namecheap — required before email actually
  delivers (Task 2.3 can be coded first, but won't pass delivery tests
  until DNS is live)
- NowPayments account + API key — required before Task 2.4 can be tested

Tasks (one per Claude Code session):
- **Task 2.1** — Neon + Drizzle foundation (schema, connection, migration)
- **Task 2.2** — Checkout Server Action + order persistence
- **Task 2.3** — Resend email templates (order-received + ops alert)
- **Task 2.4** — NowPayments crypto invoice integration
- **Task 2.5** — Auth.js + minimal admin panel (orders list + status update)

## Phase 3 — Customer accounts *(done — 2026-07-09)*

Email+password auth, email verification, account dashboard (/account,
/account/orders, /account/orders/[id]), edge middleware protection,
post-checkout upsell, and order-user linking (guest orders retroactively
linked on registration). Tasks 3.1–3.7.

## Phase 4 — Fulfilment & checkout validation *(done — 2026-07-10)*

Manual tracking flow (no external tracking API), checkout address/phone
validation, Google Places address autocomplete. Tasks 4.1–4.6.

Key decisions:
- Укрпошта as primary carrier; admin enters tracking number manually
- AfterShip live tracking deferred — overkill at launch volume
- Google Places API (New) for address autocomplete at checkout
- Post-delivery follow-up cron deferred (no Vercel Pro, no community destination)
- ADRs 0014–0016

## Phase 5 — Referral & affiliate system *(done — 2026-07-12)*

*(was Phase 4 in older roadmap — pushed back, fulfillment prioritized)*

Key decisions: symmetrical 10%/10% referral model; `discount_ledger` for
reward lifecycle; no loyalty tiers at launch. ADR 0017.

- **Task 5.1** *(done)* — `referral_codes`, `referrals`, `discount_ledger` schema + three new order columns; `db:push` clean
- **Task 5.2** *(done)* — Referral code generation on registration + backfill script
- **Task 5.3** *(done)* — `?ref=` param captured to sessionStorage via UTMCapture
- **Task 5.4** *(done)* — Checkout validates referral code via API route + applies 10% discount; server-side re-validation in submitOrder
- **Task 5.5** *(done)* — Referrer reward created on order `paid` (idempotent, hooked into admin status update + NowPayments webhook)
- **Task 5.6** *(done)* — Rewards auto-applied at checkout (mutual exclusivity with referral discount; ledger marked redeemed before redirect)
- **Task 5.7** *(done)* — `/account/referrals` dashboard: code + share link, how it works, available rewards, referral history

## Phase 6 — Analytics & DR Landing Page *(in progress)*

> Scope defined 2026-07-13. Two parallel workstreams: analytics infrastructure
> and a high-converting direct-response landing page at `/go`.

### 6A — Analytics Infrastructure *(done — 2026-07-13)*

Client-side:
- Vercel Analytics + Speed Insights (automatic)
- Google Tag Manager (`NEXT_PUBLIC_GTM_ID`) — GA4 configured as tag inside GTM
- Microsoft Clarity (`NEXT_PUBLIC_CLARITY_ID`) — direct script, not via GTM
- Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`) — base code + standard events

Server-side (CAPI):
- Meta Conversions API — POST to `graph.facebook.com` on Purchase events
- GA4 Measurement Protocol — POST on server-side conversion events
- Event deduplication via shared `eventId` between client pixel and server CAPI

Utilities:
- `src/lib/analytics/client.ts` — `trackEvent()` fires to GTM dataLayer + fbq + Clarity simultaneously
- `src/lib/analytics/server.ts` — `trackServerEvent()` fires Meta CAPI + GA4 MP
- `src/lib/analytics/types.ts` — global Window interface extensions

SEO:
- `app/sitemap.ts` — dynamic sitemap covering all public routes
- `app/robots.ts` — standard robots.txt via Next.js metadata API

Manual steps completed by Anton:
- GA4 property created, Measurement ID obtained
- GTM container created, GA4 tag configured inside GTM
- Clarity project created
- Meta Pixel created (ID: 1831016094696078)
- All env vars added to Vercel
- GSC domain verification pending

### 6B — DR Landing Page `/go` *(in progress — structure, assets, and premium redesign complete)*

17-section direct response landing page at `/go` with custom layout (no NavBar/Footer),
designed for maximum conversion from paid traffic.

Structure follows the e-commerce DR wireframe pattern: hero carousel → social proof →
PAS pain section → UGC → benefit icons → value props (×3) → mechanism → differentiators →
FAQ → final CTA. Social proof sections repeat every 2-3 sections. CTAs every 2 sections.

Key decisions:
- No money-back guarantee (research chemicals don't offer this; fraud risk)
- Evidence-based visuals instead of lifestyle photography (data timelines, mechanism diagrams,
  comparison tables) — this audience trusts graphs more than stock photos
- Community quotes from bromantane/nootropics forums, not fabricated testimonials
- Single-column quote cards for maximum impact (not 3-col grid)
- Hero carousel (4 slides: product shot, dropper close-up, mechanism chart, focus close-up)

Remaining:
- UGC video production (3-5 videos, Google Flow pipeline)
- Paid traffic setup (Reddit Ads + Google Search, ~$20-30/day)
- A/B testing of headlines via TikTok organic → winning angles move to LP

### Future (not yet started):
- Card payment processing (gather crypto transaction history → approach high-risk processors)
- Post-delivery follow-up email
- Community/social presence cadence

## Related pages

- [`architecture/platform-vs-product.md`](./architecture/platform-vs-product.md)
- [`decisions/0004-platform-scope-discipline.md`](./decisions/0004-platform-scope-discipline.md)