# Architecture — Folder Structure

> Last updated 2026-07-14.

```
src/app/
  (marketing)/          home, mission, about
  (shop)/
    products/[slug]/    generic product page template
    neurodrive/         dedicated product landing page
    cart/
    checkout/
  (account)/            customer auth + account pages
  (admin)/              admin panel (orders, shipping)
  (auth)/               login, register, email verification
  (customer)/           customer auth endpoints
  (blog)/
    blog/[slug]/        MDX education content
  go/                   ★ DR landing page — standalone, no NavBar/Footer
    layout.tsx          custom layout (analytics only, no shell)
    page.tsx            assembles 17 sections
    _sections/          S00–S16, one component per section
    _components/        HeroCarousel, CtaButton, LpSection, FaqAccordion,
                        StickyMobileCta, BenefitIcon, ImagePlaceholder,
                        VideoPlaceholder
  api/                  route handlers (webhooks, auth, referrals)
  actions/              server actions
  sitemap.ts            dynamic sitemap
  robots.ts             robots.txt via metadata API
src/lib/
  db/        Drizzle schema + client
  auth/      Auth.js config (admin + customer instances)
  referrals/ referral code + discount ledger logic
  copy/      structured product knowledge for components
  analytics/ ★ client.ts (trackEvent), server.ts (CAPI), types.ts
src/components/
  ui/         shadcn/ui primitives
  layout/     Container, NavBar, Footer, MarketingShell
  marketing/  landing-page sections (home page)
  shop/       product card, checkout steps
public/
  go/         ★ DR landing page images (hero carousel, diagrams, product shots)
docs/
  raw/        immutable source documents
  wiki/       LLM-maintained synthesis
CLAUDE.md     schema
```

## Why route groups, not top-level folders

Route groups (`(marketing)`, `(shop)`, etc.) let each zone have its own
layout (e.g. shop has a cart icon in the header, marketing doesn't need
one) without affecting the URL path — `/neurodrive` stays `/neurodrive`,
not `/shop/neurodrive`.

## `/go` — standalone DR landing page

The `/go` route sits outside all route groups and has its own `layout.tsx` that
excludes NavBar and Footer. This is intentional — DR landing pages for paid traffic
should not offer navigation away from the conversion funnel.

The `_sections/` directory uses a numbered naming convention (S00–S16) for explicit
ordering. Each section is a separate component that can be independently edited.

The `_components/` directory contains shared UI for the landing page only — these are
NOT in `src/components/` because they're specific to the `/go` page's design system
(dark/light alternating sections, teal accent CTAs, etc.).

Images live in `public/go/` — Next.js `<Image>` serves them with automatic optimization.

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

## `src/lib/analytics/` — unified tracking layer

Three files expose the only analytics APIs used in this project:
- `client.ts` — `trackEvent(name, props?)` fires to GTM dataLayer, `fbq()`, and Clarity simultaneously
- `server.ts` — `trackServerEvent(name, props)` fires Meta CAPI + GA4 Measurement Protocol
- `types.ts` — global Window interface extensions for `fbq`, `clarity`, `dataLayer`

**Never call `fbq()`, `dataLayer.push()`, or Clarity methods directly in components** — route
through `trackEvent()` / `trackServerEvent()` so analytics failures stay non-blocking and
the event schema stays consistent. See ADR 0018.

## Related pages

- [`tech-stack.md`](./tech-stack.md)
- [`data-model.md`](./data-model.md)
