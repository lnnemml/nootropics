# `docs/raw/` — Immutable Source Layer

This directory holds **primary sources only**. Nothing in here is ever edited
or summarized in place. The LLM (Claude, via wiki maintenance sessions) reads
from these files and writes synthesis into `docs/wiki/` — it never modifies
anything under `raw/`.

If a source is corrected or superseded, add a new file (e.g.
`avatar-sheet-v2.pdf`) rather than overwriting the old one, and note the
supersession in the relevant `docs/wiki/` page + `docs/wiki/log.md`.

## Subdirectories

- `foundational/` — the four core research docs that define the NeuroDrive
  buyer and offer (avatar sheet, research document, necessary beliefs,
  offer brief). These are the ground truth for all copy and product
  positioning decisions.
- `copywriting-swipes/` — reference advertorials, competitor ad copy,
  swipe files used as structural/stylistic references for new advertorials.
- `design/` — exported design assets, Figma references, brand assets that
  inform the wiki's design-system pages.

## Adding a new source

1. Drop the file in the right subfolder (create a new subfolder if it's a
   new category — e.g. `customer-feedback/`, `analytics-exports/`).
2. Tell Claude Code (or Claude web) to ingest it: "ingest
   `docs/raw/<path>` into the wiki."
3. Claude reads it, proposes which `docs/wiki/` pages should be created or
   updated, makes the edits, and appends an entry to `docs/wiki/log.md`.
