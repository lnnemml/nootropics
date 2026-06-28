# Architecture — Folder Structure

> Last updated 2026-06-28.

```
src/app/
  (marketing)/          home, mission, education hub landing, about
  (shop)/
    products/[slug]/    generic product page template (multi-product ready)
    neurodrive/          dedicated long-form advertorial landing page
    cart/
    checkout/
  (account)/
    login/ register/ account/      optional auth
  (blog)/
    blog/[slug]/         MDX education/community content
  api/                   route handlers only where truly needed (webhooks)
src/lib/
  db/        Drizzle schema + client, migrations
  auth/      Auth.js config, adapters
  referrals/ referral code + cumulative discount logic
  copy/      structured, machine-readable extracts of wiki/product knowledge
             (belief chains, objection→response map) for use in components
             (e.g. FAQ accordions, objection-handling sections) without
             re-deriving copy by hand each time
src/components/
  ui/         shadcn/ui primitives
  marketing/  landing-page sections (hero, proof, urgency, etc.)
  shop/       product card, cart drawer, checkout steps
src/content/
  blog/       MDX posts
docs/
  raw/        immutable source documents (see docs/raw/README.md)
  wiki/       LLM-maintained synthesis (this directory)
CLAUDE.md     schema — how Claude Code should use this repo + wiki
```

## Why route groups, not top-level folders

Route groups (`(marketing)`, `(shop)`, etc.) let each zone have its own
layout (e.g. shop has a cart icon in the header, marketing doesn't need
one) without affecting the URL path — `/neurodrive` stays `/neurodrive`,
not `/shop/neurodrive`.

## `src/lib/copy/` — why this exists

The wiki (`docs/wiki/product/*.md`) is for *humans and the LLM* to reason
about positioning. But components need the belief chains, objection
responses, and voice-of-customer phrases as actual TypeScript data (for
FAQ components, objection-handling sections, A/B-testable headline pools)
— not parsed out of markdown at runtime. `src/lib/copy/` holds that
structured version. **Convention: whenever a wiki product/marketing page
changes, check whether `src/lib/copy/` needs a matching update** — this
is exactly the kind of cross-reference the wiki-maintenance lint pass
should catch (see root `CLAUDE.md`).

## Related pages

- [`tech-stack.md`](./tech-stack.md)
- [`data-model.md`](./data-model.md)
