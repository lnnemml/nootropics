# ADR 0021 — Shared nootropics video channel (The Synthesis Lab) for NORA + isrib.shop

**Date:** 2026-10-21
**Status:** Accepted (Anton)
**Relates to:** cross-project. The canonical record is isrib-next
`docs/wiki/decisions/0022-shared-nootropics-video-channel.md`, with operating doc
`docs/wiki/marketing/video-track.md` (in `~/Documents/ISRIB/isrib-next`). This file is the
NORA-side mirror, plus what it means for NORA.

## Decision

NORA takes part in a **single faceless organic video channel about nootropics broadly**:
YouTube long-form, plus Shorts / TikTok / Instagram Reels. It runs under the
**The Synthesis Lab** persona ("nootropics through a chemist's eyes") and is shared with
isrib.shop.

- **No NORA (or isrib.shop) links or domains on any video platform.** Video platforms
  restrict facilitating the sale of unapproved pharmaceuticals via links or "other means to
  contact a provider".
- **Funnel:** video → email opt-in on a **neutral Synthesis-Lab domain** → one list, owned
  by the funnel and **tagged by interest** → soft CTA to the matching shop, inside emails
  only. NORA receives the `dopamine-drive` segment traffic via UTM'd email links to
  `/neurodrive` or `/go`.

## What this means for NORA

1. **Guardrails stay NORA's own.** Bromantane segments obey ADR 0003 (no Soviet/Russian
   origin as the *primary* hook), the six beliefs, and "restore, don't stimulate". Added
   for video: **no sports-performance angle** (bromantane is banned in competitive sports),
   no dosing protocols on platforms, no medical claims, no money-back language.
2. **Disclosure is mandatory.** The channel About and every CTA email state that The
   Synthesis Lab is affiliated with NORA and isrib.shop.
3. **Voice.** The channel voice is the Synthesis Lab chemist. It is compatible with
   `journal/writing-rules.md` (epistemic, specific, peer-to-peer) and adds first-hand
   synthesis proof (e.g. the bromantane NMR spectra). **NORA's site, `/go` and journal voice
   are unchanged** (brand-hierarchy.md still governs on-site copy).
4. **Marks.** The channel uses its own watermark. NORA's "N" mark appears, if at all, only
   inside the segment about NeuroDrive/bromantane. No domain on screen.
5. **Platform scope.** The opt-in site and list live **outside this repo**. NORA only
   receives tagged traffic and attributes it through its existing `trackEvent()` stack
   (ADR 0018). No new NORA platform feature is needed, so ADR 0004 is not touched.

## Open (Anton)

- **Bromantane routing.** isrib.shop also sells Bromantane / N-Acetyl-Bromantane (research
  powder). The `dopamine-drive` segment needs a rule. An obvious split: consumer-format
  seekers → NORA (NeuroDrive), research-grade powder buyers → isrib.shop.
- UTM/`source` convention for video → list → NORA orders.

## Revisit if

- A platform strike is tied to the cross-promotion.
- One shop cannibalises the other's segment.
- Disclosure measurably hurts trust/CTR, in which case reconsider the structure, never the
  disclosure.

## Update — 2026-10-22

Channel name decided: **NeuroBench** ("Mechanism over hype"). The channel now lives in its own project `~/Documents/NeuroBench` (its ADR 0005/0006); that wiki is canonical. NORA-side scope is unchanged (receives UTM'd email traffic only).
