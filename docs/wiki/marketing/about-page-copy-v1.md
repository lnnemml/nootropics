# About Page — Copy v1

> Implemented Phase 1.5 (2026-07-02). Page at `/about`.
> NORA-level voice throughout — not a NeuroDrive product page.
> NeuroDrive appears once, in the closing CTA, as evidence of the
> standard being applied, not as the subject of the page.

## Page intent

Institutional/mission page. Establishes that NORA operates by a
non-negotiable standard (mechanism + trial), and that the people
behind it know exactly why that standard exists. No founder persona,
no personal narrative — credibility through the standard itself.

## Section structure

**1. Hero** — inline, no Hero component. Max-width `680px` prose block.
Eyebrow: "NORA — Nootropics Research Alliance". H1: "We only ship what
we can explain." Subhead states the alliance/not-brand distinction and
the mechanism+trial requirement in plain terms.

**2. The Standard** — ContrastCardPair. Two cards: "A mechanism we can
name" (eyebrowAccent) vs "A trial we can cite". Footnote cites the
NeuroDrive PubMed source (PMID 21322821) as a live example, linking
to the abstract.

**3. Principles** — PrincipleGrid. Three principles:
- Skepticism is a feature (earned credibility, not charm)
- One compound at a time (depth over breadth)
- Transparency over trust (read the research yourself)

**4. Closing CTA** — bg-raised section. NeuroDrive positioned as
"Release 01 — the first product to clear the NORA bar." CTA links
to `/products/neurodrive`. This is the only place NeuroDrive is named
on this page.

## Voice notes

- H1 uses a non-breaking space (` `) between "what" and "we" to
  prevent a widow on narrow viewports. This is a presentational detail,
  not a copy change.

  NOTE: The spec included the non-breaking space but it was not included
  in the final implementation since the sentence flows cleanly at all
  target viewport widths without it. Revisit if line-break issues appear.

- "Research alliance — not a supplement brand" is the core brand
  differentiator line. It appears in Section 1 and in the metadata
  description. Keep consistent if either is updated.

- External link in ContrastCardPair footnote goes directly to PubMed
  (`https://pubmed.ncbi.nlm.nih.gov/21322821/`) — rendered as a plain
  `<a>` by ContrastCardPair, which is correct for external URLs.

## Related

- [`../product/brand-hierarchy.md`](../product/brand-hierarchy.md) — NORA voice vs product voice
- [`../decisions/0007-design-lock-in-and-brand-hierarchy.md`](../decisions/0007-design-lock-in-and-brand-hierarchy.md)
- [`home-page-copy-v5.md`](./home-page-copy-v5.md) — parallel NORA-voice reference
