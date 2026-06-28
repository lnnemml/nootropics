# NeuroDrive Platform

E-commerce platform for evidence-based nootropics. Launching with one
product — **NeuroDrive** (sublingual bromantane drops) — built on a
foundation meant to scale to a full multi-product platform with community
and education content.

## Start here

- **For project knowledge (product, marketing, architecture decisions):**
  [`docs/wiki/index.md`](docs/wiki/index.md)
- **For working with Claude Code in this repo:** [`CLAUDE.md`](CLAUDE.md)
- **Current phase / what's next:** [`docs/wiki/roadmap.md`](docs/wiki/roadmap.md)
- **Immutable source documents** (avatar sheet, research, beliefs, offer
  brief): [`docs/raw/foundational/`](docs/raw/foundational/)

## Stack

Next.js 15 (App Router, TypeScript) · Tailwind CSS + shadcn/ui · Neon
Postgres · Drizzle ORM · Auth.js · Stripe (Phase 4+) · Vercel.

Full reasoning: [`docs/wiki/architecture/tech-stack.md`](docs/wiki/architecture/tech-stack.md)

## Getting started (local dev)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

See [`docs/wiki/architecture/folder-structure.md`](docs/wiki/architecture/folder-structure.md)
for the full breakdown and rationale.
