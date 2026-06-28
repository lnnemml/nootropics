# Roadmap — Phases

> Last updated 2026-06-28. This is the working phase plan; detailed
> task-level breakdown for the *current* phase should additionally live
> in GitHub Issues/Projects once the repo is pushed (not duplicated here
> in full — link, don't copy, to avoid the wiki going stale).

## Phase 0 — Architecture & Wiki *(current)*
- Confirm tech stack & repo shape (ADR 0001)
- Scaffold Next.js project, folder structure
- Initialize `docs/raw/` + `docs/wiki/` + root `CLAUDE.md`
- Push to GitHub, connect Vercel + Neon

## Phase 1 — Marketing shell + NeuroDrive launch surface
- Design system (Tailwind theme, shadcn components, typography) reflecting
  "for builders, not bio-spiritual wellness" brand tone
- `(marketing)` shell: home, mission/about
- `(shop)/neurodrive` — the long-form advertorial landing page, built from
  existing validated copy (Belief → Problem → Failed Solutions →
  Mechanism → Transformation → Proof → Urgency → Action)
- `(shop)/products/[slug]` generic template, NeuroDrive as the first entry
  (content-only — no real cart/checkout yet, "Buy Now" can point to an
  external/temporary checkout if needed before Phase 4 ships)
- Goal: something live and shareable on Vercel

## Phase 2 — Database & product catalog
- Implement Drizzle schema per
  [`architecture/data-model.md`](./architecture/data-model.md)
- Neon connection, migrations
- Product catalog driven by DB instead of hardcoded content

## Phase 3 — Optional auth
- Auth.js setup, guest-checkout-compatible user model
- Account page (order history placeholder)

## Phase 4 — Cart + checkout (Stripe)
- Cart state, checkout flow, Stripe integration
- Multi-bottle / subscription upsell (per offer brief funnel architecture)

## Phase 5 — Referral & cumulative discount system
- `referral_codes`, `discount_ledger`, `customer_tiers` tables live
- Referral link generation + redemption flow
- Resolve open questions flagged in
  [`architecture/data-model.md`](./architecture/data-model.md)

## Phase 6 — Community/education layer
- MDX blog live, first mechanism-explainer posts (dopamine, actoprotector
  science, etc. — drawing on research doc science angles)
- Social presence cadence (separate doc, not site code)

## Phase 7 — Growth & optimization
- SEO pass, analytics, A/B testing infra for headlines/angles
- Revisit ADR 0002 based on real performance data

## Related pages

- [`architecture/platform-vs-product.md`](./architecture/platform-vs-product.md)
- [`decisions/0004-platform-scope-discipline.md`](./decisions/0004-platform-scope-discipline.md)
