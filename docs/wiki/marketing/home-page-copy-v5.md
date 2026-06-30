# Home / Mission Page — Copy v5

> Supersedes [`home-page-copy-v4.md`](./home-page-copy-v4.md) — new
> eyebrow (platform name explicit), revised H1 and subhead, ReleaseCatalog
> moved before ContrastCardPair, citation + Journal-link footnote added to
> ContrastCardPair, closing CTA section added before the footer.

## Eyebrow substitution note

Anton's draft used "proven efficiency" in the H1. Swapped for "a cited
trial" — rationale: "proven efficiency" is an efficacy claim that sits in
gray territory given the footer's existing "STATEMENTS NOT EVALUATED BY
THE FDA" disclaimer, and the FTC has been active on supplement efficacy
language. "A cited trial" is factually accurate (we cite the PMID),
positions us as epistemically careful rather than making an outcome claim,
and directly sets up the new citation footnote below. Flag to Anton — revert
to his phrasing if he disagrees and is comfortable with the claim-risk
framing.

## Nav

- **Wordmark:** NORA
- **Links:** Products · About · Journal · Contact
- **CTA:** Order now →

## Hero

- **Eyebrow:** NORA — Nootropics Research Alliance  *(was "Built for people who can't afford an off day" — subhead now carries that framing)*
- **H1:** Nootropics with a named mechanism and a cited trial. Or we don't ship them.
- **Subhead:** We're a research alliance for people who can't afford an off day — not a supplement brand. Every release ships with a mechanism we can name and a study we can cite, starting with NeuroDrive, a single, named compound evaluated against exactly that standard.
- **CTA:** View NeuroDrive → *(links to `/products/neurodrive`)*
- **Chart:** none *(per ADR 0009)*

## Release Catalog *(now before ContrastCardPair)*

- **Eyebrow:** What we're building
- **Intro:** NORA isn't a single-product storefront — it's the early shelf of a research-led catalog we're building release by release. Every addition gets evaluated the same way NeuroDrive was: a mechanism we can name, a study we can cite, or it doesn't make the cut.
- **Slot 1 (live):** RELEASE 01 / NeuroDrive / "Sublingual bromantane, one named mechanism — evaluated against the standard above, not an exception to it." / CTA: View NeuroDrive → → `/products/neurodrive` / Image: `/neurodrive-bottle.jpg`
- **Slot 2 (in-research):** RELEASE 02 / In research
- **Slot 3 (in-research):** RELEASE 03 / In research

## Contrast / "the two methods" *(now after ReleaseCatalog)*

- **Eyebrow:** The two methods
- **H2:** One method compounds. The other just trends.
- **Card 1 — eyebrow `NORA — RESEARCH-LED`:** Every release names a mechanism and cites a study. If it doesn't hold up, we don't ship it — no matter how well it would sell.
- **Card 2 — eyebrow `INDUSTRY — HYPE-LED`:** Proprietary blends nobody can verify, reviews standing in for clinical evidence, a compound chosen because it's trending this quarter.
- **Footnote citation:** `EXAMPLE — BROMANTANE · 728-PATIENT TRIAL · 76% RESPONSE RATE (PMID 21322821)`
- **Footnote link:** Read more on the Journal → → `/blog`

## Mission

- **Eyebrow:** Mission
- **Body:** NeuroDrive *(accent-colored)* is proof of the standard, not an exception to it — every product that follows gets evaluated the same way.

## Principles

1. **Mechanism over marketing** — Every claim traces back to a pathway we can name and a study we can cite. No proprietary fairy dust.
2. **Built for skeptics** — You've tried things that didn't work. Good — that's the right instinct. We'd rather you read the research than take our word for it.
3. **Curated, not exhaustive** — We'd rather release one compound we trust completely than fifty we're unsure about. Every addition to the catalog has to earn its place.

## Closing CTA *(new — before footer)*

- **Eyebrow:** Ready when you are
- **H2:** Start with NeuroDrive
- **CTA:** View NeuroDrive → → `/products/neurodrive`

## Page structure (component order)

```
Hero → DividerMotif → ReleaseCatalog → ContrastCardPair (#science) → MissionStatement (#mission) → DividerMotif → PrincipleGrid → closing CTA section
```

## Related pages

- [`../product/brand-hierarchy.md`](../product/brand-hierarchy.md)
- [`../design/design-system.md`](../design/design-system.md)
- [`../decisions/0009-retire-chart-motif-on-home.md`](../decisions/0009-retire-chart-motif-on-home.md)
- [`home-page-copy-v4.md`](./home-page-copy-v4.md) *(superseded)*
