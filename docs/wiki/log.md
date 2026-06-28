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
