# Home / Mission Page — Copy v4

> **Superseded by [`home-page-copy-v5.md`](./home-page-copy-v5.md)** —
> v5 revises eyebrow/H1/subhead, swaps section order (ReleaseCatalog before
> ContrastCardPair), adds citation footnote, adds closing CTA. Kept per
> append-only convention.

> Supersedes [`home-page-copy-v3.md`](./home-page-copy-v3.md) — drops
> the abstract chart motif per ADR 0009 (Anton feedback: "looks generic,
> like fake data"); replaces the single FeaturedRelease card with a 3-slot
> ReleaseCatalog (NeuroDrive live + 2 in-research placeholders) to signal
> platform ambition without overstating actual catalog breadth. See
> [`../marketing/competitive-landscape.md`](../marketing/competitive-landscape.md)'s
> "curated, not exhaustive" strategic wedge — the ReleaseCatalog section is
> written to reinforce that wedge, not contradict it.

## Nav

- **Wordmark:** NORA
- **Links:** Products · About · Journal · Contact
- **CTA:** Order now →

## Hero

- **Eyebrow:** Built for people who can't afford an off day
- **H1:** We name the mechanism. Or we don't ship it.
- **Subhead:** We're a research alliance, not a supplement brand. Every release ships with a mechanism we can name and a study we can cite — starting with NeuroDrive, a single, named compound, evaluated against exactly that standard.
- **CTA:** View NeuroDrive →  *(links to `/products/neurodrive`)*
- **Chart:** none *(dropped per ADR 0009 — Hero is now single-column, max-width 760px)*

## Contrast / "the two methods"

- **Eyebrow:** The two methods
- **H2:** One method compounds. The other just trends.
- **Card 1 — eyebrow `NORA — RESEARCH-LED`:** Every release names a mechanism and cites a study. If it doesn't hold up, we don't ship it — no matter how well it would sell.
- **Card 2 — eyebrow `INDUSTRY — HYPE-LED`:** Proprietary blends nobody can verify, reviews standing in for clinical evidence, a compound chosen because it's trending this quarter.
- **MiniCharts:** none *(dropped per ADR 0009)*

## Release Catalog (new section, replaces FeaturedRelease)

- **Eyebrow:** What we're building
- **Intro:** NORA isn't a single-product storefront — it's the early shelf of a research-led catalog we're building release by release. Every addition gets evaluated the same way NeuroDrive was: a mechanism we can name, a study we can cite, or it doesn't make the cut.
- **Slot 1 (live):** RELEASE 01 / NeuroDrive / "Sublingual bromantane, one named mechanism — evaluated against the standard above, not an exception to it." / CTA: View NeuroDrive → → `/products/neurodrive` / Image: `/neurodrive-bottle.jpg`
- **Slot 2 (in-research):** RELEASE 02 / In research *(dashed placeholder)*
- **Slot 3 (in-research):** RELEASE 03 / In research *(dashed placeholder)*

## Mission

- **Eyebrow:** Mission
- **Body:** NeuroDrive *(accent-colored)* is proof of the standard, not an exception to it — every product that follows gets evaluated the same way.

## Principles

1. **Mechanism over marketing** — Every claim traces back to a pathway we can name and a study we can cite. No proprietary fairy dust.
2. **Built for skeptics** — You've tried things that didn't work. Good — that's the right instinct. We'd rather you read the research than take our word for it.
3. **Curated, not exhaustive** — We'd rather release one compound we trust completely than fifty we're unsure about. Every addition to the catalog has to earn its place.

## Page structure (component order)

```
Hero → DividerMotif → ContrastCardPair (#science) → ReleaseCatalog → MissionStatement (#mission) → DividerMotif → PrincipleGrid
```

## Related pages

- [`../product/brand-hierarchy.md`](../product/brand-hierarchy.md)
- [`../design/design-system.md`](../design/design-system.md)
- [`../decisions/0009-retire-chart-motif-on-home.md`](../decisions/0009-retire-chart-motif-on-home.md)
- [`home-page-copy-v3.md`](./home-page-copy-v3.md) *(superseded)*
