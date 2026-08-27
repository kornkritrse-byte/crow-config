---
name: reference-artifacts
description: Every study artifact built for Korn — URLs, what each covers, and the rule that each subject keeps its own document
metadata:
  node_type: memory
  type: reference
---

# Study Artifacts — Term 2.1

## 🗓️ THE HUB — start here
**Term 2.1** — https://claude.ai/code/artifact/017ced5a-48b7-4101-a4a9-e18b38b4de3e
Built 27 Aug 2026. The board for all six midterms: live day-count to the first paper, the 8-day exam run (20–27 Sep) showing where the two free days fall, and the six subjects **ranked by study order, deliberately not exam order**. Each card links out to that subject's own document.

## 📕 SUBJECT DOCUMENTS
| Subject | Artifact | Covers |
|---|---|---|
| **BA202** Taxation | **The Missed Lectures** — https://claude.ai/code/artifact/2c6630bc-54d1-40a5-b47e-74f69c703483 | L1–L4. Sidebar TOC, 7 SVG diagrams, 25 cold questions, worked examples on all six taxpayer categories. L5–L7 still to add. |
| **FN201** Business Finance | **Obrom's TVM Playbook** — https://claude.ai/code/artifact/7005f3de-c10b-4542-b3b4-40f619b4f51c | Topic 5 (TVM) only. 16 drills. **OWED: the 3-question pre-flight** (n? · end or start? · does the rate match the payment frequency?) — deferred by Korn to the next FN session. |
| AC313 · AC311 · MK201 · EL221 | not built | Korn plans BA202-style docs for the AC subjects and MK201. |

## 🔗 NAVIGATION IS TWO-WAY (wired 27 Aug)
The hub's subject cards link **out** to each document, and each document carries a small `← TERM 2.1` link above its masthead pointing **back**. Class `.uplink`, styled from each doc's own tokens so it matches that document rather than the hub. **Any new subject doc must get one.**
Links between artifacts work because the frame runtime intercepts clicks on external-origin `<a href>` and posts `__frame_nav` to the shell, which opens them — not a network request, so the CSP does not block it.

## 📏 THE RULE — one document per subject, never one merged document
Korn proposed merging BA202 + FN201 into a single "Term 2.1" artifact on 27 Aug. **I recommended a hub instead and he took it.** Reasons, in order of weight:
1. **The TVM Playbook's palette is semantic** — teal = discounting/backward in time, amber = compounding/forward. BA202 uses the same slots for accent/trap/safe. A merge destroys one encoding or creates two contradictory ones.
2. **They are read differently** — BA202 is a reference document, TVM is a drill book. One navigation model serves both badly.
3. **Size** — 136KB + 56KB with four subjects still to come.
4. **He studies one subject per block** — a merged doc means scrolling past the subject he is not doing, every session.
5. **Different lifecycles** — FN201 dies 23 Sep, BA202 on the 27th.
6. **Blast radius** — one bad edit would break every subject at once.

**So: new subject = new card on the hub + a new document. The hub never gets heavier.**

## 🎨 EACH DOC HAS ITS OWN IDENTITY — keep them distinct
- **BA202**: navy `#2D4A7C` accent, Newsreader / Public Sans / JetBrains Mono. Legal-document feel.
- **FN201 TVM**: teal `#0D6E78` + amber `#9C5A0B` (semantic), Archivo / Source Serif 4 / IBM Plex Mono.
- **Term 2.1 hub**: cool slate ground + tomato `#C0392B` signal (matches the red he chose for exams on his Life calendar), Bricolage Grotesque / Instrument Sans / DM Mono. Dashboard feel.

## 🛠️ BUILD NOTES
- Verify every artifact with Playwright before publishing: light + dark + phone, horizontal-overflow check, and for SVGs a geometry pass that no `<text>` escapes its `<rect>`. This caught real bugs on 27 Aug.
- Hand-author inline SVG, style it with page-level CSS classes bound to theme tokens (never literal colours, never `<style>` inside the SVG), and give each `<marker>` a unique id — duplicate ids across figures are invalid.
- **Korn responds well to diagrams** — draw sequences and decision procedures, leave lists as lists.
