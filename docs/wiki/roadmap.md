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

## Phase 5 — Referral & affiliate system *(in progress — Task 5.1 done 2026-07-11)*

*(was Phase 4 in older roadmap — pushed back, fulfillment prioritized)*

Key decisions: symmetrical 10%/10% referral model; `discount_ledger` for
reward lifecycle; no loyalty tiers at launch. ADR 0017.

- **Task 5.1** *(done)* — `referral_codes`, `referrals`, `discount_ledger` schema + three new order columns; `db:push` clean
- **Task 5.2** — Referral code generation (lazy, on /account first load); display in account dashboard
- **Task 5.3** — Checkout redemption: validate code at submission, apply `referral_discount_pct`, record `referral_code_used`
- **Task 5.4** — Referrer reward creation on `paid` status: create `discount_ledger` entry + `referrals.referrer_reward_id`
- **Task 5.5** — Account dashboard: referral stats card (code, share link, reward balance)

## Phase 6 — Growth & optimization

*(was "Phase 4 — Growth & optimization" in older roadmap)*

- SEO pass, analytics, A/B testing infra for headlines/angles
- Revisit ADR 0002 based on real performance data
- Community/social presence cadence (separate doc, not site code)
- Reddit community creation + seeding strategy
- Post-delivery follow-up email (requires Vercel Pro or external cron)

## Related pages

- [`architecture/platform-vs-product.md`](./architecture/platform-vs-product.md)
- [`decisions/0004-platform-scope-discipline.md`](./decisions/0004-platform-scope-discipline.md)