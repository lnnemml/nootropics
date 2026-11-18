# go-v2 — Claims to Confirm (Anton's pre-launch verification checklist)

Every claim on the **go-v2** rewrite that needs verification before it ships. Each
item lists the wording, where it appears, and the current status. Grouped by:

- ✅ **Confirmed** — Anton already ruled it defensible this session.
- 🟡 **Pending Anton** — a business/ops fact Anton can confirm directly (no
  literature needed).
- 🔬 **Needs primary-source check** — must be verified against
  `docs/raw/foundational/NeuroDrive_research_document.pdf` / published literature
  before it can stand; the wiki is a synthesis, not the primary source.

> Copy discipline already applied: no timeframe/onset numbers in copy, no
> "users report," no outcome promises, no absolutes, no anxiolytic/anxiety wording,
> no Soviet-origin hook. This list is about the *factual* claims that remain.

---

## ✅ Confirmed (Anton, this session)

| Claim | Where | Note |
|---|---|---|
| ¹H + ¹³C **NMR on every batch** | S02 bar, S04, S05, S11, hero trust line | Anton confirmed real. Flagship trust signal. |
| **Decades of published research** / "studied compound" framing | S02 bar, S04, S10, hero "30+ years", `hero-3.png` label | Confirmed defensible — but **evidence-of-study only, never a Soviet-origin hook** (ADR 0003). |
| **Caffeine = adenosine antagonist** (not dopamine release) | S08 | Science signed off. |
| **Adderall forces catecholamine release → spike → crash** | S08, S10, S14 Q4 | Signed off. |
| **Dopamine-system support** mechanism ("steady support for your dopamine system") | S06 P3, S07 P3, S12 | Locked. Association to focus/motivation left to inference, never stated causally. |
| **Calm = absence of stimulant arousal** (not anxiety reduction) | S12 | Locked. "Anxiolytic" permanently banned regardless of Soviet-era evidence. |

## 🟡 Pending Anton (business / ops facts)

| Claim | Where | What to confirm |
|---|---|---|
| **cGMP Manufactured** | S11 TrustBar | Is production actually cGMP? If not verified, it **cannot stand** — pull it. |
| **Ships only where legal** | S05 "Legal", S14 Q2, S15, S00 — all now "legal where we ship" | Confirm NORA only ships to countries where bromantane is unscheduled/legal, so the statement is self-true. |
| **NMR: third-party or in-house?** | S11 (now "NMR-Verified Purity") | If NMR is run by a third-party lab, "third-party tested" is a stronger honest signal and can be restored. If a *separate* third-party test exists beyond NMR, confirm it's real. |
| **Pharmaceutical-grade MCT carrier** | S11, hero spec chip | Confirm the MCT carrier is actually pharma-grade sourced. |
| **Peer-reviewed research** (badge) | S02 bar | Confirm you're comfortable asserting bromantane has peer-reviewed studies as a bald badge. |
| **Unscheduled compound** (badge) | S02 bar | Confirm the scheduling/legal status. |
| **Free worldwide shipping** | hero, S00, S15 | Confirm shipping is actually free + worldwide (and "discreet" was already dropped as unverified). |
| **Sublingual = single active + drops** | S05, S08, S10 ("single compound") | Formulation confirmed 2026-11-01: bromantane 80 mg/ml (single active), peppermint oil 0.15%, Tween 80 0.1%, in MCT oil, sublingual drops. Still open: whether "single compound" reads as honest next to the listed excipients. |

## 🔬 Needs primary-source check (against the research PDF / literature)

| Claim | Where | What to verify |
|---|---|---|
| **Tyrosine hydroxylase (TH) upregulation** — "supports TH, the enzyme that sets how much dopamine your brain can build" | S08, S10, S14 Q4, hero subhead | The wiki (`overview.md` UMS) names TH, but it's a synthesis. Confirm the **primary research** actually supports TH upregulation / dopamine-synthesis-capacity as stated. This is the page's core mechanism claim — everything leans on it. |
| **Tolerance — evidence basis** — "hasn't shown the rapid tolerance stimulants do" / "Adaptogenic" | S05 label, S14 Q3, `hero-3.png` "Zero tolerance buildup" | `beliefs.md` calls the no-tolerance point **anecdotal**. Confirm whether "no rapid tolerance" rests on **published research** or only anecdote — that determines how strongly it can be worded (and whether the image's "Zero tolerance buildup" absolute survives at all). |
| **Safety / tolerability** — "well-tolerated in published human research, with no abuse-potential signal reported" | S14 Q1 | Verify the published-research tolerability basis and the "no abuse-potential signal" wording against the literature. |
| **"728-patient randomized trial"** | `hero-3.png` (baked in); was the removed S02 badge | Does a study of this size/design exist as described? Removed from copy; **still baked into `hero-3.png`** pending this check. |
| **Onset / sublingual PK** — "absorbs fast … crosses the mucosa directly instead of waiting on digestion … faster than a powder" | S14 Q5 (copy); "15–30 min" baked in `stimulants-vs.png` / `how-it-works.png` | Confirm the fast-onset / mucosal-absorption formulation claim. Any **specific number** (Tmax / "15–30 min") must be sourced or dropped — it's currently kept out of copy but still in the images. |
| **Modafinil mechanism** — "milder … acting on dopamine transport and the brain's arousal signals" | S14 Q4 | Confirm the DAT + orexin/wakefulness description is accurate enough for a technical audience (general pharmacology, not NeuroDrive-specific). |

---

## Cross-reference

- Image-level versions of several of these (the baked-in "728," "Zero tolerance,"
  "15 min," "anxiolytic," "Legal Worldwide") are tracked for regeneration in
  [`go-v2-assets-to-regenerate.md`](./go-v2-assets-to-regenerate.md).
- The **live `/go`** page still serves the *un-fixed* versions of all of these —
  see the "HIGHEST PRIORITY" block at the top of the assets file.
