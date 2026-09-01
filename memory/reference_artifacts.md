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
| **FN201** Business Finance | **Obrom's Playbook** — https://claude.ai/code/artifact/7005f3de-c10b-4542-b3b4-40f619b4f51c | **ALL FIVE examinable topics (rebuilt 30 Aug, was TVM-only).** §exam = how the paper is marked + the lecture-hours table. T1 Overview (T-account framework, intrinsic-value model, why profit fails as a goal, the 5 values of a share w/ the paid-up-vs-registered trap, business forms). T2 Ten Axioms (all ten verbatim + FCF machinery, Oak & Ice worked to FCF 2,700 vs NI 8,800, interest tax shield, 8 drills). T3 Analysis of Financial Reports (Plow Chemical both statements, **all 24 ratios w/ both years + industry average**, EM/DER/DR identities, Du Pont + the five-firm case, OC/CCC + the working-capital case finished to THB37.83m, 8 limitations, 10 drills). T4 TVM as before **+ §preflight — the 3-question pre-flight, OWED since 27 Aug, now DELIVERED.** **§sheet — last semester's actual exam formula sheet decoded block-by-block, each row linking to its theory.** **§pretest — ALL FOUR of Obrom's STQ sets worked: #1 (30/30), #2 (Q1–20; Q21–30 have no key, Part 2/2 file missing), #3 (20/20), #4 (30/30 — 23 in §pretest + 7 as the teaching examples in §apps/§valuation). 100 of 110 questions; the 10 unanswerable ones are flagged as such.** All answers checked against his solution workbooks. STQ#3 with full reasoning incl. the Klim fill-in-the-balance-sheet, the 20-ratio Wayabutara sweep and the Rubber Ducklings 3-year case. ⚠️ **STQ#3 and #4 have NO official answer key — every figure there is Crow's, tagged as such in the doc.** STQ#1/#2 still to add (those DO have official solutions, so lower priority). New in T4: §valuation (bonds/preferred/Gordon/non-constant), §apps expanded to full loans (amortised vs flat-rate worked side by side from past-exam Q2/Q3), §types (the 13 cash-flow patterns). New in T2: §capm. T5 Financial Environments & Markets (9 classifications, the money/capital instrument table, glossary, FI-vs-NonFI trap, 3 capital-formation routes, r* + IP + DRP + LP + MRP w/ 9 drills). 35 cold questions added on top of the 16 TVM drills. `.src deck` vs `.src here` tags mark reconstructed content. |
| **AC311** Intermediate Accounting I | **Assets Before the Cut-Off** — https://claude.ai/code/artifact/622ff9d5-05d0-498e-8604-ec60013538f4 | Midterm 1 scope (40%). Sessions 1–4 in full from both decks; **Provisions (sessions 5–7) is a scaffold from the syllabus + the Ch6 practice solutions only — NOT lecture content, rebuild it after 14 Sep.** Sidebar TOC, 6 hand-built SVGs, 8 official-solution walkthroughs, 22 cold questions with hidden answers. **28 Aug (2nd pass, after he confirmed the paper is MCQ + journal entries): added §16 the full 26-entry catalogue tagged `official` vs `derived`, §17 a 10-entry cold drill, §18 the deck's own 4 MCQs.** **3rd pass same day: every journal entry in the doc rebuilt as a real journal page — `Date | Account | Debit | Credit` columns, credits indented, a rule between entries in multi-entry blocks (`.je td.dt`, `tr.ent`). Korn asked for this explicitly — carry the format into any future accounting doc (AC313).** 8 answers are tagged `worked here` = deck slide was blank, no official source. Built 28 Aug. |
| **IS201** Digital Technology **(for a FRIEND, not Korn)** | **Brewed, Not Milked** — https://claude.ai/code/artifact/2d27bdbd-3303-4fc1-9695-1ba75af973ec | **Individual presentation deck (20 pts), 30 Aug.** Topic: **precision fermentation** + the Thai F&B market case. 11 slides, 16:9, arrow-key nav, F for fullscreen, print CSS = 1 slide/page. Live canvas 'culture' texture on the title slide; 4-step pipeline diagram; titre chart. Speaker notes + **6:15 timing plan** below the deck. ⚠️ **Name and student ID are highlighted PLACEHOLDERS — deliberately blank because it is not Korn's presentation.** 🔴 **Slide 06 (titre / bioreactor telemetry / ML strain screening) exists to satisfy the brief's requirement 2 (data visualisation / analysis / BI).** Palette validated with the dataviz script (broth #BE7710 / microbe #008C84 light; #C4841F / #149C92 dark — all checks pass). Familjen Grotesk + Karla + IBM Plex Mono. ❌ **Superseded: a post-quantum-cryptography deck at .../ecc4bbbd-d2ab-44ad-a2c4-3e1977d163d2 — built on the WRONG topic, ignore or delete.** |
| AC313 · MK201 · EL221 | not built | Korn plans BA202-style docs for AC313 and MK201. |

## 🔗 NAVIGATION IS TWO-WAY — ✅ VERIFIED WORKING 27 Aug
The hub's subject cards link **out** to each document, and each document carries a small `← TERM 2.1` link above its masthead pointing **back**. Class `.uplink`, styled from each doc's own tokens so it matches that document rather than the hub. **Any new subject doc must get one.**
✅ **Korn tapped them live 27 Aug and confirmed all links work.** (AC311 doc added to the hub 28 Aug with the same two-way pattern — link back not yet tapped by him.) No longer a reasoned assumption — tested.
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
- **FN201 Obrom's Playbook**: teal `#0D6E78` + amber `#9C5A0B` (semantic), Archivo / Source Serif 4 / IBM Plex Mono. **30 Aug pass 2 — HIS FEEDBACK, apply to every future doc:** he said it was *"a whole lotta shit crammed onto a page"* and that **divisions written inline with `/` are hard to read**. Fixes: (1) **`.frac` component — real stacked fractions**, numerator over a rule over denominator (`<span class="frac"><span class="fn">…</span><span class="fd">…</span></span>`); 57 of them now. **RULE: never render a formula's division as inline `/` again — build the fraction.** (2) Nav rebuilt: 28 flat links → **5 collapsible `<details>` topic groups** + scroll-spy that highlights the current section and auto-opens its group; on phone the whole rail collapses to one "Contents" dropdown. Back-to-top button. (3) Air: section gap 3.5→5.25rem, topic dividers now carry a big numeral (`data-n`), taller cells, row hover, inset shadow on tables that scroll sideways. **30 Aug: `.note` re-tinted teal (was red) so the three callouts read distinctly — `.note` teal = worth knowing, `.trap` red = where marks die, `.blank` amber = deck left it blank and I reconstructed it.** New components worth reusing: `.topicbar` (topic divider), `.src`/`.src.deck`/`.src.here` (provenance chips), `.axiom`, `nav.rail li.grp` (nav group labels).
- **Term 2.1 hub**: cool slate ground + tomato `#C0392B` signal (matches the red he chose for exams on his Life calendar), Bricolage Grotesque / Instrument Sans / DM Mono. Dashboard feel.

## 🛠️ BUILD NOTES
- Verify every artifact with Playwright before publishing: light + dark + phone, horizontal-overflow check, and for SVGs a geometry pass that no `<text>` escapes its `<rect>`. This caught real bugs on 27 Aug.
- Hand-author inline SVG, style it with page-level CSS classes bound to theme tokens (never literal colours, never `<style>` inside the SVG), and give each `<marker>` a unique id — duplicate ids across figures are invalid.
- **SLIDES: keep them SPARSE (30 Aug).** First IS201 draft packed paragraphs onto every slide; his words: *"can you sort it out so the words arnt all crammed together"*. **Rule: a slide gets a heading plus at most 3 short items — roughly 60 words including labels — and the detail goes in the speaker notes.** It is also a marks issue: these rubrics give ~40% to delivery and penalise reading off the screen.
- **Korn responds well to diagrams** — draw sequences and decision procedures, leave lists as lists.
- **Plain-English first, symbols second (30 Aug — ✅ RECONFIRMED 31 Aug, he said "can you dum it down" a second time, on FN201 STQ01 Topic-1 concepts). This is a standing rule, not a one-off.** He asked what "a risk can be *compensated*" meant, got a correct answer built on bond pricing and `E[RP]`, and said **"can you dumb it down."** The version that landed: a two-jobs analogy (bank vs startup), then the consequence. **Rule: when a doc introduces a loaded term, define it in ordinary words with a non-finance analogy BEFORE the formula — then show the formula.** Added to §compensated in the FN doc as the pattern to copy. Ties to his CLAUDE.md: he learns from examples, not principles.

## 🎨 ONE DESIGN SYSTEM, ONE PALETTE PER DOC
Each subject doc reuses the same **token architecture** (`--ground/--surface/--sunk/--ink/--muted/--faint/--rule`, three-state dark mode, the `.uplink` component) but gets **its own typeface pairing and accent hue** so the family reads as a set without looking cloned:
- **Hub Term 2.1** — Bricolage Grotesque / Instrument Sans / DM Mono
- **BA202 The Missed Lectures** — Newsreader / Public Sans / JetBrains Mono, navy `#2D4A7C`
- **AC311 Assets Before the Cut-Off** — Fraunces / IBM Plex Sans / IBM Plex Mono, deep teal `#0D5A63`

Reusable AC311 components worth copying for AC313/MK201: `.je` (journal-entry block, mono + tabular-nums), `.drill` + `details.rev` (question with the answer hidden until tapped — this is what makes cold-testing possible on a phone), `.src-tag` provenance band, `.std` standard-reference chip.

## 🧭 FN201 DRILL MAP — where the coded drills actually live (added 1 Sep 2026)
Korn asked *"where are those"* on 1 Sep after I'd demanded these codes across three sessions. **He had never been told the anchors.** Never name a drill code again without the link.

| Codes | Topic | Anchor |
|---|---|---|
| **A1–A8** | T2 Ten Axioms | `#shield` (they sit at the END of the interest-tax-shield section, not under a heading of their own) |
| **A9** | T2 CAPM | `#capm` |
| **R1–R10** | T3 Analysis of Financial Reports | `#drill3` |
| **M1–M9** | T5 Financial Environments & Markets | `#drill5` |

Base URL: https://claude.ai/code/artifact/7005f3de-c10b-4542-b3b4-40f619b4f51c — append the anchor.
⚠️ **Count correction: the axiom set is A1–A9 (nine), not A1–A8.** A9 lives in a different section, which is why it kept getting dropped from my own count.
🔴 **Design lesson — the real one:** A1–A8 have no heading and no TOC entry, so they are unreachable by browsing. He defaults to Obrom's STQ PDFs because those are *findable*. **Any drill set gets its own heading + its own TOC line, or it does not exist.**


## 🗣️ PLAIN-ENGLISH IS A HARD RULE — third confirmation, 1 Sep 2026
Korn stated it as a standing instruction, not a reaction: **"please keep the explanations extremely easy."** Prior triggers 30 Aug (§compensated) and 31 Aug (STQ01 Topic-1). **Three strikes — this is now a hard rule, not a preference.**

**How to apply, every time:** ordinary words + a non-finance analogy FIRST → then the consequence → then the formula/term LAST, as a label for something he already understands. Never open with notation. Never define a term with another term.
**Why it works on him:** his CLAUDE.md — he learns from examples, not principles.
⚠️ **He will not always say it twice.** Assume "dumb it down" is the default request on every explanation, and only go technical when he asks for the mechanics.

## 🔴 CORRECTION 1 Sep 2026 — STQ03 & STQ04 DO have official solutions
The claim above that *"STQ#3 and #4 have NO official answer key — every figure there is Crow's"* is **WRONG**. Two official worked-solution workbooks have been on his Mac in `~/Desktop/fn/` since 30 Aug 17:44:
- `FN201-26F-BBA-STQ03-AFR-S1-20-V03R-230223.xlsx` — **20 sheets, Q1–Q20**, one worked sheet per question.
- `FN201-26F-BBA-STQ04-TVM-S1-30-V8RR-250917.xlsx` — **30 sheets, Q1–Q30.**

They landed *after* the PDFs (17:17–17:18) and after the doc's §pretest was written, so the "no key" tag was true when written and stale within the hour. **Consequence: every §pretest figure for STQ3/STQ4 tagged as Crow's is unverified against a key that exists.** Any mismatch teaches him a wrong method in his primary document. **Verify and re-tag.**

## 📂 THE FN201 STQ SET — what exists, and the hole in it (1 Sep 2026)
Files in `~/Desktop/fn/`. STQ numbering follows the **lecture notes**, not the syllabus:
| STQ | Topic | Questions | Official solutions? |
|---|---|---|---|
| **STQ01-OBF** | T1 Overview | 1–30 | ✅ Q&S in one PDF (green-coded key — `pymupdf` span-colour method) |
| **STQ02-ABF** | T2 Axioms | 1–30 | ⚠️ **Q1–20 only.** File is `P1-of-2`; part 2 was never posted → **Q21–30 have no key** |
| **STQ03-AFR** | T3 Financial Reports | 1–20 | ✅ xlsx, 20 sheets |
| **STQ04-TVM** | T4 TVM | 1–30 | ✅ xlsx, 30 sheets |
| **T5 FE&M** | T5 Markets | — | 🔴 **NO STQ FILE EXISTS.** |

🔴 **THE HOLE:** Korn's stated method (1 Sep) is *theory from the artifact, practice from the original STQ files*. That method gives **Topic 5 zero practice**, and leaves STQ02 Q21–30 unmarkable. **`M1–M9` in §drill5 are the only Topic-5 questions in existence for him** — they stop being optional under this plan.
