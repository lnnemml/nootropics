# Wiki Log

Append-only chronological record. Each entry starts with `## [YYYY-MM-DD]
<type> | <short title>` so it stays parseable with simple tools, e.g.
`grep "^## \[" docs/wiki/log.md | tail -5`.

Types: `setup`, `ingest`, `decision`, `lint`, `phase`.

---

## [2026-06-28] setup | Architecture v1 + wiki initialization

- Scaffolded Next.js 15 + TypeScript + Tailwind project (`create-next-app`,
  App Router, `src/` dir).
- Established route group structure: `(marketing)`, `(shop)`, `(account)`,
  `(blog)`.
- Established `src/lib/{db,auth,referrals,copy}` layout.
- Created `docs/raw/` (immutable source layer) and copied the four
  foundational PDFs into `docs/raw/foundational/`.
- Initialized `docs/wiki/` following the Karpathy LLM-wiki pattern
  (raw → wiki → schema), adapted for a combined business-knowledge +
  technical-architecture wiki.
- Synthesized product/avatar/beliefs/messaging/competitive-landscape pages
  from the four foundational PDFs (full ingest of all four sources).
- Recorded ADRs 0001–0004 (stack & repo shape; primary ad angle; Soviet
  origin-angle exclusion; platform scope discipline).
- Wrote root `CLAUDE.md` schema (appended to Next.js's auto-generated
  AGENTS.md import) describing wiki maintenance workflow for Claude Code.
- **Status:** tech stack and architecture proposed to Anton, pending
  explicit sign-off before Phase 1 work begins in Claude Code.

## Backlog for next ingest session

- `NeuroDrive_research_document.pdf` "Scientific & Story Angles" and
  "Messaging Framework & Strategic Recommendations" sections deserve their
  own dedicated wiki pages (`product/mechanism-and-science.md`,
  expanded `marketing/voice-of-customer.md`) — only partially synthesized
  in this pass to keep Phase 0 scoped.
- Prior chat-history knowledge (Figma label work, sales-page React
  implementation decisions, JSX deployment lesson about double-quoting
  strings) should be ingested into the wiki in a follow-up session so it
  isn't only living in Claude's memory system.

## [2026-06-29] decision | Payment flow correction + design tooling

- Anton confirmed Phase 0 architecture overall, with two corrections:
  1. **No Stripe** — high-risk product category, mainstream processors
     don't work. Phase 1 checkout is a manual-confirmation flow: customer
     fills a form, gets a Resend confirmation email, ops follows up by
     email to arrange payment manually. High-risk offshore merchant
     account is being researched in parallel by Anton (no provider chosen
     yet). Recorded as ADR 0005, with full operational detail in new page
     `architecture/manual-payment-flow.md`. Updated `tech-stack.md`,
     `data-model.md` (`orders` status enum, new `order_notes` table),
     `roadmap.md` (Phase 4 redefined), and added a hard constraint to root
     `CLAUDE.md` (no Stripe / no card fields / no "Pay Now" button).
  2. **Resend** added as the email provider (transactional order-received
     + internal new-order notifications).
- Anton wants top-tier UI/UX and will use **Claude Design** for visual
  direction. Recorded as ADR 0006, with a new brand design brief at
  `design/brand-design-brief.md` (synthesized from the avatar/positioning
  knowledge already in the wiki + the `frontend-design` skill's design
  process, explicitly steering away from generic AI-design defaults and
  toward the "Restore, Don't Stimulate" steady-line/spike-line motif as a
  content-grounded signature element).
- Confirmed: Phase 0 scaffold has been deployed to Vercel. Roadmap updated
  to mark Phase 0 done, Phase 1 current.

## [2026-06-29] decision | Design & build sequencing: non-advertorial first

- Anton corrected sequencing: both the Claude Design pass and the Phase 1
  Claude Code build should start with everything **except** the
  NeuroDrive advertorial — home/mission, product page template, checkout
  shell — and do the advertorial last, once the design system is proven.
- Updated `design/brand-design-brief.md` (re-ordered "where this gets
  used," removed the old "advertorial = highest priority" framing) and
  `roadmap.md` Phase 1 (advertorial moved to the end of the phase list).
- Gave Anton a directional answer key for Claude Design's clarifying-
  questions flow for the home/mission pass (first surface, output type,
  number of directions, motif literalism, color temperature, typography,
  copy approach) — recorded as a "Design pass #1 — calibration answers"
  addendum in `design/brand-design-brief.md`. Not yet a locked ADR;
  finalize once Anton reviews Claude Design's actual output.

## [2026-06-29] ingest | Real brand assets — extracted authoritative color palette

- Anton provided the existing logo (`nora_logo_N.svg`) and a product
  shot of the printed NeuroDrive label
  (`product_shot_without_bg.jpeg`) — both copied into
  `docs/raw/design/`.
- Pixel-sampled the label photo and read exact hex values from the SVG
  to extract the real, already-approved color palette rather than
  guessing one: charcoal-teal ink (#2E3A3C), near-black body text
  (#242424), mint/teal accent (#1E9C78, confirmed against the SVG's
  exact authored value), a brighter highlight teal (#14B089) and mid-gray
  (#696C6D) both present in the SVG's shading layers, warm off-white
  paper (#FAFAF7), amber bottle glass (#7E4A12, sparing/optional use),
  true black (#0A0A0A).
- Wrote `design/design-tokens.md` as the new authoritative color source,
  explicitly superseding the earlier "cool/technical, instrument-panel
  blues" instinct given to Claude Design (that was a reasonable guess
  before real assets existed — it specified blue, the actual brand color
  is teal/mint, and the corrected page says so).
- Open item flagged for Anton: the SVG contains an apparent
  extruded/3D-shaded render of the logo (highlight + bevel layers) in
  addition to the flat 2-tone version seen on the label — needs a
  decision on whether the 3D version is used anywhere on the site.
