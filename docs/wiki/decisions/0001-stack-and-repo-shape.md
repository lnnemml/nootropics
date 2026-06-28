# 0001 — Tech Stack & Repo Shape

- **Date:** 2026-06-28
- **Status:** Proposed (pending Anton sign-off)
- **Deciders:** Claude (web, architect role), Anton

## Decision

Next.js 15 (App Router, TS) + Tailwind/shadcn + Neon Postgres + Drizzle
ORM + Auth.js, single repo / single app (no monorepo), deployed on Vercel.
Full reasoning in
[`../architecture/tech-stack.md`](../architecture/tech-stack.md).

## Context

Anton is building a multi-product nootropics e-commerce platform
(NeuroDrive is product #1) with optional auth, automatic/managed database,
and a referral + cumulative discount system, competing at the platform
level against Nootropics Depot and Umbrella Labs.

## Alternatives rejected

- **Monorepo (Turborepo)** — rejected for now: one app, one product. Cost
  of monorepo tooling isn't earned yet. Revisit if a separate admin app or
  native mobile app becomes necessary.
- **Prisma over Drizzle** — rejected: heavier runtime, less edge-friendly,
  and Drizzle's explicit query style is easier for an LLM coding agent
  (Claude Code) to reason about safely without hidden magic.
- **Supabase over Neon** — rejected: Supabase bundles its own
  auth/storage which would compete with Auth.js and create two sources of
  truth for user identity. Neon stays a pure Postgres layer.
- **Clerk/Auth0 over Auth.js** — rejected: recurring vendor cost for
  something Auth.js handles for free with full control over the optional
  auth + guest-checkout requirement.

## Consequences

- Schema migrations are explicit SQL-adjacent Drizzle migrations — no
  "magic" introspection step Claude Code needs to trust blindly.
- If the platform later needs a separate internal admin tool, we'll
  revisit monorepo at that point rather than retrofitting now.

## Revisit if

- A second, genuinely separate application (e.g. internal ops dashboard)
  is needed → reconsider monorepo.
- Neon/Vercel pricing or limits become a blocker at scale → reassess DB
  provider.
