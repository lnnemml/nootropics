# Assets to Regenerate — baked-in claims stronger than the wiki supports

**Status:** standing fixture / documentation only. **Not** a live task. These
images have marketing claims *baked into the pixels* that exceed what
`docs/wiki/` (and, where checked, the primary research) actually supports. They
need regeneration in a separate image session — Anton regenerates these himself
later. Do not edit or regenerate images as part of any copy/code task.

This is the same failure mode that got `before-after.png` pulled from go-v2 S03:
an in-image claim can't be softened with copy, so it has to be re-rendered.

---

# ⚠️ MUST-NOT-CARRY-OVER — old `/go` violations that cannot survive into launch

**Not a live-liability emergency.** `/go` is **not currently taking traffic**, so
there's no same-day hotfix needed and no exposure right now. This is a **pre-launch
merge checklist**: these are the problems in the *old* `/go` copy that must **not**
survive into the final launched page. The plan is that **go-v2 replaces `/go`
cleanly when ready** — so the job is to make sure none of the below rides along in
the merge. All go-v2 rewrites already fix these on the `/go-v2` route; this list
exists so nothing from the old page is accidentally reintroduced at launch.

Grouped by claim type (worst first):

### A. Fabricated testimonials & social proof (FTC — pre-revenue, no real customers)
- **S04:** 3 fake UGC video placeholders ("Caffeine Quitter," "Developer Focus,"
  "Dopamine Reset") + 3 invented quotes ("Best nootropic I've tried… No side
  effects," "…the crash never came").
- **S09:** 3 invented testimonials ("crying from burnout — color back in my world,"
  "blown away by the effect on my mood," …).
- **S13:** 3 invented testimonials ("Within 10–15 minutes the eye heaviness lifts,"
  "bromantane has been amazing," …).
- **S02 badge "728-Patient Clinical Trial"** — specific unverified study/number.
- *(go-v2: S04 rebuilt to real trust; S09/S13 cut; badge → "NMR-verified every batch".)*

### B. Medical / disease / results-timeframe claims (FDA)
- **S14 FAQ:** "used clinically in Russia as Ladasten for **treating neurasthenia**"
  (disease claim), "**non-addictive**" (safety absolute), "**Most users report**
  … within the **first week** … **2–4 weeks**" + "**15–30 minutes**" onset
  (fabricated-users + results + timeframe), "**does not show tolerance
  development**" (absolute).
- **Hero (S01):** "the **only** … within your **first week**" (results + timeframe
  + absolute).
- **S06 / S07 / S12:** outcome promises ("focus comes on and stays steady," "It's
  just there," "**anxiolytic** … lowering anxiety"), "users report."
- **S05 labels:** "No Crash," "Zero Tolerance" (absolutes).

### C. False / overreaching legal claims (legal)
- **Blanket "Legal in US, CA, EU, AU"** in **S00 TopBar**, **S15** trust line, and
  **S14 FAQ** — bromantane is controlled/Rx in some of these jurisdictions; "legal
  in the EU" as a blanket is not defensible. *(go-v2: all → "legal where we ship".)*
- **S05 label "Legal Worldwide"** and **`comparison-table.png` "Legal Worldwide"**
  — flatly wrong.

### D. Absolute-claim / medical-claim IMAGES (shared `/public/go/`, so live too)
- `before-after.png`, `stimulants-vs.png`, `how-it-works.png`, `comparison-table.png`
  (also names Modafinil/Adderall), `dual-mechanism.png` (**anxiolytic / anxiety /
  stress**), `caffeine-vs-bromantane.png` (a full day of promised outcome states).
  Detailed per-image entries below.

**Bottom line:** go-v2 already fixes all of the above in copy. At launch, verify the
final page carries the **go-v2** versions and that none of A–D from the old `/go`
survives the merge. No action needed on `/go` before then — it serves no traffic.

## Open decision — shared assets (`/go` vs `go-v2`)

All three images below live under `/public/go/` and are **shared**: both the live
`/go` route and the `go-v2` rewrite point at the same files. So when an image is
regenerated, decide per asset:

- **Replace in place** (`/public/go/<name>.png`) — the softened version updates
  live `/go` *and* go-v2 at once. Simplest, but changes live `/go` immediately.
- **Fork for go-v2** (e.g. `/public/go-v2/<name>.png`, and repoint the go-v2
  component) — keeps live `/go` untouched, lets the two routes diverge.

Pick before regenerating; it affects filenames and which components get repointed.

---

## 1. `before-after.png` — results-claim card

- **Path:** `/public/go/before-after.png`
- **Used by:** live `/go` (S03, still showing) · go-v2 S03 (**removed** from the
  component — no longer referenced there)
- **Baked-in claims (results claims):**
  - "Clear thinking all day"
  - "Steady energy no crashes"
  - "Natural motivation returns"
  - "Zero tolerance buildup"
- **Why it exceeds source:** these promise a health/performance *outcome* to the
  reader — banned. No results claims; mechanism/identification language only.
- **Defensible rephrasing / decision:**
  - go-v2 S03: do **NOT** reinstate as-is. If a visual returns to S03, it must be
    **experiential/identification** (e.g. a quiet "3pm at the desk" mood shot) —
    not a before/after results promise, and not another mechanism diagram.
  - live `/go`: regenerate to a non-results version, or retire the image.

## 2. `stimulants-vs.png` — comparison table with absolute claims

- **Path:** `/public/go/stimulants-vs.png`
- **Used by:** live `/go` (S08) · go-v2 S08 — **SHARED**
- **Baked-in claims exceeding source (absolutes vs. hedged wiki):**
  - "Crash: **None**"
  - "Tolerance: **Zero buildup**"
  - "Dependency: **Non-addictive**"
  - "Onset: **15–30 minutes**"
- **Why it exceeds source:** `beliefs-and-objections.md` only supports *hedged*
  versions — "no abuse-potential *signal*," tolerance is "anecdotal," etc. The
  onset window is not confirmed in the text wiki.
- **Defensible rephrasing:**
  - Crash → "No reported crash"
  - Tolerance → "No tolerance buildup reported"
  - Dependency → "No abuse-potential signal"
  - Onset → confirm/qualify the window against the primary research before stating
    a number; otherwise drop it.

## 3. `how-it-works.png` — 3-step explainer with an outcome promise

- **Path:** `/public/go/how-it-works.png`
- **Used by:** live `/go` (S08) · go-v2 S08 — **SHARED**
- **Baked-in claims:**
  - Step 03 "RESTORE — **mental clarity builds over days**" (outcome promise —
    same category as before-after)
  - Step 02 "enters bloodstream in **15 minutes**" (unconfirmed time claim)
- **Defensible rephrasing:**
  - Step 03 → "supports dopamine synthesis over time" (mechanism, not result)
  - Step 02 → confirm the "15 minutes" against the primary research, or drop the
    specific time.

## 4. `comparison-table.png` — us-vs-them table, multiple absolutes + a false legal claim + named Rx drugs

- **Path:** `/public/go/comparison-table.png`
- **Used by:** live `/go` (S10, still showing) · go-v2 S10 (**removed** — replaced
  with an anonymized, mechanism-framed text comparison; image no longer referenced)
- **Baked-in claims (worst offender so far):**
  - "**No Crash**" (absolute)
  - "**Zero Tolerance**" (absolute; wiki = anecdotal only)
  - "**Non-Addictive**" (absolute; wiki = "no abuse-potential signal")
  - "**Legal Worldwide**" — **contradicts source.** `beliefs-and-objections.md`
    says "unscheduled in US/**most** countries" and "banned in competitive
    sports." Not worldwide-legal. This one is not just strong, it's wrong.
  - "**Fast Onset 15min**" (unconfirmed time claim)
  - "**No Mood Crash**" (absolute)
  - Column headers **name Modafinil and Adderall** (prescription drugs) — a
    Stage-5 slap-fight and a possible regulatory flag; comparison should be
    anonymized.
- **Why it exceeds source:** stacked safety/outcome absolutes + a factually
  incorrect legal claim + named Rx competitors.
- **Defensible rephrasing (if a comparison image is wanted again):**
  - Anonymize columns → "Stimulants" / "Kitchen-sink stacks", not named drugs.
  - "No Crash" → "No forced spike to crash off" (mechanism-framed)
  - "Zero Tolerance" → "No tolerance buildup reported"
  - "Non-Addictive" → "No abuse-potential signal"
  - "Legal Worldwide" → **drop it**, or "Unscheduled in the US and most
    countries" (and only if re-confirmed against source)
  - "Fast Onset 15min" → confirm/qualify the window or drop the number
  - "No Mood Crash" → drop, or fold into the mechanism framing
  - Note: go-v2 S10 now carries the comparison as **text**, so a replacement
    image is optional, not required.

## 5. `caffeine-vs-bromantane.png` — day-timeline with baked-in outcome states

- **Path:** `/public/go/caffeine-vs-bromantane.png`
- **Used by:** live `/go` (S06, still showing) · go-v2 S06 (**removed** — S06
  rebuilt as desire-channeled copy; image no longer referenced)
- **Baked-in claims (NeuroDrive side = a full day of promised outcome states):**
  - a "✓ **SUSTAINED FOCUS**" band across the plateau
  - timeline labels: "9AM **Focused**" · "11AM **Productive Flow**" · "1PM
    **Steady State**" · "3PM **End of Focus Zone**" · "5PM **Gentle Wind Down**"
    · "9PM **Relaxed**"
- **Why it exceeds source:** it asserts the reader's *whole day* — focused,
  productive flow, steady state, relaxed evening — an outcome/results promise
  (same category as `before-after.png`). Directly contradicts the
  no-outcome-promise rule for the value-prop sections.
- **Defensible rephrasing (if the timeline is wanted again):**
  - The **caffeine side is fine** (agitation of the alternative: "Peak Jitters,"
    "Crash Zone," "Afternoon Slump," etc.) — keep it.
  - The **NeuroDrive side** should describe the *mechanism/PK curve shape*
    (e.g. "steady dopamine support," "no forced spike"), not promised user
    states. Drop or neutralize "Sustained Focus / Productive Flow / Steady State
    / Relaxed." Frame the curve as what it's *designed to do*, not the guaranteed
    day. So regen is **partial** (NeuroDrive-side labels only).
  - Note: go-v2 S06 now stands on copy alone, so a replacement image is optional.

## 6. `dual-mechanism.png` — anxiolytic / anxiety-reduction medical claims

- **Path:** `/public/go/dual-mechanism.png`
- **Used by:** live `/go` (S12, still showing) · go-v2 S12 (**removed** — S12
  rebuilt to frame calm as the *non-stimulant* quality; image no longer referenced)
- **Baked-in claims (most medical-claim-heavy image on the page):**
  - "Pathway 2 **ANXIOLYTIC** — Reduces stress response and normalizes anxiolytic
    markers — **lowering anxiety without sedation**" · CALM · RESILIENCE · COMPOSURE
  - Effect row: "✓ Focused — but not wired · ✓ **Motivated — but not anxious** ·
    ✓ Sharp — but composed"
  - Footnote: "Stimulants … cause jitters, **anxiety**, and emotional blunting."
  - Pathway 1 (pro-cognitive): "Upregulates dopamine synthesis via the TH enzyme —
    **increasing motivational tone** without a dopamine dump."
- **Why it exceeds source / is banned:** explicit **anxiety / stress / mood**
  claims (anxiolytic, "lowering anxiety," "reduces stress response," "not
  anxious," resilience, composure) — a distinct medical-claim category, hard-
  banned. Plus a dopamine→motivation causal lean ("increasing motivational tone").
- **Defensible rephrasing (if a mechanism image is wanted again):**
  - **Drop the entire Pathway-2 anxiolytic side** and the "not anxious / composed"
    row. No anxiety/stress/mood framing at all.
  - The **calm angle** may only be shown as the *absence of stimulant arousal*
    ("not wired / no jitter" as a mechanism consequence of no forced spike), never
    as anxiety reduction.
  - **STANDING RULE (Anton, permanent): never reintroduce "anxiolytic" anywhere**
    — copy or image — even though Soviet-era literature supports it. Naming it
    reclassifies the product as an unapproved drug regardless of the evidence.
    Calm-as-absence-of-stimulant-arousal is the only defensible route.
  - If keeping Pathway 1: soften "increasing motivational tone" (dopamine→
    motivation causal lean) to plain synthesis-support framing, consistent with S08.
  - Note: go-v2 S12 now stands on copy alone, so a replacement image is optional.

---

# Copy fixes (component text — NOT image regeneration)

These baked-in claims live in component **text** (labels/strings), not images.
Fix them in the component during that section's rewrite — no image session
needed. **Note on "shared":** unlike the images (which are genuinely shared via
`/public/go/`), the section components were *copied* per route — go-v2 has its
own `src/app/go-v2/_sections/*`. The label *text* is currently identical in both
copies, but editing go-v2's component does **not** change live `/go`. Live `/go`
keeps the old labels until separately fixed.

## S05 BenefitIcons — icon labels — ✅ FINALIZED (go-v2)

- **Files:** `src/app/go-v2/_sections/S05BenefitIcons.tsx` (**done — all applied**) ·
  `src/app/go/_sections/S05BenefitIcons.tsx` (live `/go` — **still has the old
  labels**; per-route copy, fix separately if/when `/go` is updated)
- **Final labels (old → new):**
  - "Zero Tolerance" → **"Adaptogenic"** — Anton's decision: a wiki-sourced
    classification (`overview.md` "adaptogenic mechanism") instead of a tolerance
    claim. The no-tolerance angle rests on anecdotal evidence, so it's dropped
    entirely rather than hedged — **no tolerance wording anywhere in the label.**
  - "Legal Worldwide" → **"Legal"** — dropped the "worldwide" geographic overclaim
    **and** "lab-tested." lab-tested duplicated icon #5 "NMR-Verified" (the
    stronger, specific version of the same proof), and the #6 globe/check icon
    depicts jurisdiction, not testing. "Legal" = legal in NORA's shipping markets.
  - "No Crash" → **"No forced spike"** — mechanism-framed, consistent with S08/S10
    (no forced dopamine spike → nothing to crash off), not a guaranteed-outcome
    absolute.
  - "One Ingredient" → **"Single compound"** — matches S10's "single studied
    compound" framing.
  - **Kept as-is:** Non-Stimulant · Sublingual Drops · NMR-Verified.
- **Final 7 labels:** Non-Stimulant · No forced spike · Adaptogenic ·
  Sublingual Drops · NMR-Verified · Legal · Single compound.
- **Status:** component-text-clean — **no image regeneration needed for S05.**

## S02 / S04 / S09 / S13 — fabricated social proof (REMOVED from go-v2)

Anton confirmed **all** existing social proof across these sections is fabricated
(NORA is pre-revenue). Fabricated testimonials/review counts are an FTC violation
and break the wiki rule. **The fabrication is component TEXT, not image files** —
so there is nothing to regenerate; it was removed directly. Logged here because
**live `/go` still contains all of it** (per-route component copies).

- **Removed from go-v2:**
  - **S02 bar:** "728-Patient Clinical Trial" badge (unverified specific number —
    same claim as `hero-3.png`, pending). → replaced with "NMR-verified every batch."
  - **S04:** 3 fake UGC video placeholders ("Caffeine Quitter 2:14," "Developer
    Focus 1:47," "Dopamine Reset 3:02") + 3 fabricated testimonials attributed
    "Bromantane community" ("Best nootropic I've tried…," "…the crash never came,"
    etc.). Section repurposed to real trust (NMR + research + transparency).
  - **S09:** 3 fabricated testimonials ("crying from burnout — color back in my
    world," "blown away by the effect on my mood," etc.). **Section CUT.**
  - **S13:** 3 fabricated testimonials ("Within 10–15 minutes the eye heaviness
    lifts," "bromantane has been amazing," etc.). **Section CUT.**
- **Kept (real, sourced) in go-v2 S02 + S04:** ¹H+¹³C NMR every batch (Anton
  confirmed) · decades of published research on the compound (Anton confirmed) ·
  peer-reviewed research (**confirm specifics**) · unscheduled compound (**confirm
  legal**) · honest transparency ("we're new, leading with data not reviews").
- **Live `/go` still shows the fabricated versions** — apply the same removals if
  `/go` is ever cleaned up. **No customer testimonials of any kind until NORA has
  real, consented, verifiable ones.**

## General ruling — "studied" / "decades of research" (Anton, CONFIRMED defensible)

Applies wherever the copy leans on the research provenance — go-v2 S10's "a
**single studied compound**", the hero trust line "**backed by 30+ years of
clinical use**", and the `hero-3.png` "30+ years of clinical research" label.

- **Keep the "studied" / evidence-of-study framing** — it's defensible (decades
  of Soviet-era research).
- **But keep it as evidence-of-study, NOT a Soviet-origin selling hook** — the
  wiki bans origin-as-hook (`decisions/0003-no-soviet-origin-angle.md`). Provenance
  informs the *reasoning*; it must not become the *hook*. Don't turn "developed
  in Soviet labs" into a headline or lead.

---

## Related / separate open question (same category, tracked here for visibility)

- **`hero-3.png`** (the hero dopamine spike-crash vs flat-line graph; first
  carousel slide in go-v2) has three baked-in lines:
  - "30+ years of clinical research" — **CONFIRMED defensible** per Anton's
    "studied / decades of research" ruling above (keep as evidence-of-study, not
    a Soviet-origin hook).
  - "**728-patient randomized trial**" (specific study/number) — **still pending**
    Anton's check against the primary research PDF.
  - "**Zero tolerance buildup**" (absolute) — **still pending**; same absolute as
    the images above, likely needs the hedged "No tolerance buildup reported."
