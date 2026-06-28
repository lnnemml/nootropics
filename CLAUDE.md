@AGENTS.md

# NeuroDrive Platform — Project Schema

This file is the entry point Claude Code reads at the start of every
session. Keep it short and stable — anything that changes often or needs
deep explanation belongs in `docs/wiki/`, with a link from here.

## What this project is

A Next.js e-commerce platform for evidence-based nootropics, launching
with one product (NeuroDrive, sublingual bromantane drops). See
[`docs/wiki/product/overview.md`](docs/wiki/product/overview.md) for the
full picture. Architecture is platform-grade; execution is phased and
single-product-first — see
[`docs/wiki/architecture/platform-vs-product.md`](docs/wiki/architecture/platform-vs-product.md)
before proposing any new feature.

## How this repo's knowledge is organized (read this once, refer back as needed)

Three layers, following the Karpathy LLM-wiki pattern:

1. **`docs/raw/`** — immutable primary sources (foundational research
   PDFs, copywriting swipes, design assets). Never edit these. Read-only,
   always.
2. **`docs/wiki/`** — the layer you (Claude Code) own and maintain. A
   directory of markdown pages synthesizing and cross-referencing
   knowledge from `raw/` and from decisions made during the project.
   Start at [`docs/wiki/index.md`](docs/wiki/index.md) — it catalogs
   every page. Drill into specific pages from there rather than scanning
   the whole directory.
3. **This file** — the schema. It tells you the conventions below.

## Wiki maintenance workflow

**Ingest** (new source dropped into `docs/raw/`, or a new decision made in
conversation):
1. Read the source.
2. Identify which existing `docs/wiki/` pages it touches (check
   `index.md` first).
3. Update those pages — don't just append, integrate (revise summaries,
   add cross-references, flag contradictions with older claims rather
   than silently overwriting them).
4. Update `docs/wiki/index.md` if a new page was created.
5. Append an entry to `docs/wiki/log.md` (format: `## [YYYY-MM-DD] <type>
   | <short title>`, types: `setup`/`ingest`/`decision`/`lint`/`phase`).

**Decisions**: any non-trivial architecture or product/marketing decision
made in a session gets its own file under `docs/wiki/decisions/NNNN-*.md`
(ADR-style: Decision / Context / Consequences / Revisit if). Number
sequentially, never delete — supersede with a new entry that links back.

**Query**: when asked a question, read `docs/wiki/index.md` first to find
the relevant page(s), then read those pages. Don't re-derive an answer
from `docs/raw/` PDFs if a wiki page already synthesizes it — but cross-
check against the raw source if something seems stale or contradictory.

**Lint** (run when asked, or proactively if something feels off): check
for contradictions between pages, stale claims, orphan pages with no
inbound links from `index.md`, and concepts mentioned in passing that
deserve their own page. Flag findings rather than silently "fixing"
product/marketing positioning — those changes need Anton's sign-off.

**A good answer you produce in conversation should usually be filed back
into the wiki**, not left only in chat history — e.g. a new comparison,
an architecture analysis, a copywriting rationale.

## Hard constraints (check these before any marketing-facing work)

- No Soviet/Russian origin story as the *primary* hook in customer-facing
  copy — see
  [`docs/wiki/decisions/0003-no-soviet-origin-angle.md`](docs/wiki/decisions/0003-no-soviet-origin-angle.md).
- Every belief chain in copy should trace back to the six core beliefs in
  [`docs/wiki/product/beliefs-and-objections.md`](docs/wiki/product/beliefs-and-objections.md).
- Don't expand platform scope ahead of the current roadmap phase — see
  [`docs/wiki/architecture/platform-vs-product.md`](docs/wiki/architecture/platform-vs-product.md)
  and [`docs/wiki/roadmap.md`](docs/wiki/roadmap.md).
- **No Stripe, no card input fields, no "Pay Now" button implying
  real-time payment processing** — this product category can't use
  mainstream processors. Checkout is a manual-confirmation flow with
  Resend emails. See
  [`docs/wiki/architecture/manual-payment-flow.md`](docs/wiki/architecture/manual-payment-flow.md)
  and
  [`docs/wiki/decisions/0005-manual-payment-flow.md`](docs/wiki/decisions/0005-manual-payment-flow.md).
- **Design system is locked — implement against
  [`docs/wiki/design/design-system.md`](docs/wiki/design/design-system.md),
  don't invent new colors/radii/spacing per page.** Raw reference markup:
  [`docs/raw/design/home-design-pass-1.html`](docs/raw/design/home-design-pass-1.html)
  (open directly in a browser). Claude Design is retired from the build
  loop — see
  [`docs/wiki/decisions/0007-design-lock-in-and-brand-hierarchy.md`](docs/wiki/decisions/0007-design-lock-in-and-brand-hierarchy.md).
- **Brand voice depends on the page — check
  [`docs/wiki/product/brand-hierarchy.md`](docs/wiki/product/brand-hierarchy.md)
  before writing copy.** Platform pages (home, mission, nav, footer)
  speak as **NORA**. Product pages (`(shop)/neurodrive`, future product
  pages) speak as the product, inside NORA's visual system.
- **Active task list:** working through Phase 1 right now? Follow
  [`docs/wiki/phase-1-implementation-plan.md`](docs/wiki/phase-1-implementation-plan.md)
  task-by-task — one task per session/commit.

## Coding conventions

- TypeScript strict, no `any` without a comment explaining why.
- Drizzle ORM for all DB access — no raw SQL strings outside
  `src/lib/db/`.
- JSX copy strings: **always double-quoted** — single-quoted strings
  break on contractions/apostrophes in natural-language copy (lesson from
  a prior deployment failure, recorded in
  [`docs/wiki/log.md`](docs/wiki/log.md)).
- One logical change per Claude Code session/commit where practical —
  keeps the wiki's `log.md` entries and the git history both meaningful.
- For non-trivial tasks, write/confirm a plan before executing — don't
  jump straight to multi-file edits without stating the approach first.

## Where to go next

- New to this repo / starting a session → read
  [`docs/wiki/index.md`](docs/wiki/index.md), then
  [`docs/wiki/roadmap.md`](docs/wiki/roadmap.md) to see what phase we're
  in.
- Working on copy/marketing → read
  [`docs/wiki/product/`](docs/wiki/product/) and
  [`docs/wiki/marketing/`](docs/wiki/marketing/) pages first.
- Working on infra/code → read
  [`docs/wiki/architecture/`](docs/wiki/architecture/) pages first.

