# Architecture — Tech Stack

> Decided 2026-06-28 (Claude web, architect session). Status: **proposed,
> pending Anton's sign-off** — flip to "confirmed" in `log.md` once
> approved, and update this header.

| Layer | Choice | Why | Alternatives considered |
|---|---|---|---|
| Framework | Next.js 15, App Router, TypeScript | Already agreed; SSR/RSC fits SEO needs of marketing + product pages | — |
| Styling | Tailwind CSS + shadcn/ui | Fast, accessible, no heavy design-system lock-in; matches premium "for builders" brand tone | Plain CSS modules (slower), a full design-system lib (too opinionated for our brand voice) |
| Database | Postgres via **Neon** | Serverless, autoscaling, branch-per-preview-deploy on Vercel — matches "automatic database" requirement without ops overhead | Supabase (more batteries-included but more vendor lock-in toward its own auth/storage), PlanetScale/MySQL (less natural Postgres-first ecosystem fit) |
| ORM | **Drizzle ORM** | TypeScript-first, lightweight, edge-runtime compatible, explicit SQL-like queries — easier for an LLM coding agent to reason about safely than a heavier abstraction | Prisma (great DX but heavier runtime, less edge-friendly, schema migrations less transparent to an agent) |
| Auth | **Auth.js (NextAuth v5)** with Drizzle adapter | Optional accounts + guest checkout supported natively; free, self-hosted, no vendor account required | Clerk/Auth0 (faster to bootstrap but recurring cost + another vendor dependency for something Auth.js handles fine) |
| Payments | Stripe (Phase 4 — not implemented yet) | Industry standard, native subscription support for future multi-bottle/subscription upsell | — |
| Content | MDX files in-repo (`src/content/blog`) | No CMS overhead for Phase 1–2 education content volume | Headless CMS (revisit once content volume/non-technical authors justify it) |
| Hosting | Vercel | Already agreed; native Next.js + Neon branching integration | — |
| Repo shape | **Single Next.js app**, route groups, no monorepo | One product, one site — Turborepo/monorepo complexity isn't earned yet | Turborepo monorepo (revisit if/when a separate admin app or mobile app is needed) |

## Principle for future additions to this table

Before adding a new infra dependency (a new SaaS, a new package), check:
1. Does an existing piece of the stack already solve this adequately?
2. Is the new dependency justified by *current* phase requirements, or by
   anticipated future ones? (Anticipated-future justifications need
   Anton's explicit sign-off — see scope-creep note in
   [`../decisions/0001-stack-and-repo-shape.md`](../decisions/0001-stack-and-repo-shape.md).)

## Related pages

- [`folder-structure.md`](./folder-structure.md)
- [`data-model.md`](./data-model.md)
- [`platform-vs-product.md`](./platform-vs-product.md)
- [`../decisions/0001-stack-and-repo-shape.md`](../decisions/0001-stack-and-repo-shape.md)
