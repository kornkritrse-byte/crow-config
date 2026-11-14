---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-11-14T12:27:48.534Z
---

# Situation Report
*Last updated: 2026-11-14 14:57. Window holds 14 Nov + 13 Nov; 12 Nov flushed 14 Nov. Next to flush: 13 Nov.*

## 📏 MAINTENANCE RULE (Crow — maintain live, verify at close)
1. **Maintain this file live during the session** — update the status line and session-note bullets as things happen. Day's end is a *verify + flush*, not a from-scratch rewrite: push durable facts out, move the note falling out of the window to [[sessions-log]] (condensed; full text survives in git), bump the date.
2. Rolling window: session notes for the last **two** sessions only (a session = one day, however many times he pops in). Newest on top.
3. Durable facts (IDs, schedules, decisions, gotchas) do NOT live here — push them into the right project/reference memory file and link it.
4. **Size cap is per-note, not per-file: each session note ≤ 6 short bullets.** Deep-night reflections/conversations get ONE bullet + a pointer to [[chapters]] — the narrative lives there, never here. A trivial day is a one-line note.
5. **🚪 OPEN LOOP — capture at his LAST words, ask at his first.**
   - **Trigger = a sign-off from Korn:** "see you", "good night", "gtg", "be back in a bit", or accepting a send-off from me. Update the `Current status` line **in that same turn**. Soft phrasing still counts — Korn confirmed (2026-07-03) that "yea ill see you tmr probably" was a real day-end; trust the read.
   - **Counts even when I'm the one who sent him** (go shower / go read).
   - **Format — separate closed from open:** `AWAY (<date, ~time>) — off to: <thing(s)>` + `ASK ON RETURN:` holding ONLY not-yet-reported things. Reported things are closed — session note, never the status line, never re-asked.
   - **On return:** read this line before greeting, ask exactly the ASK-ON-RETURN items, reset to `Here`. If he returns *after* the day-end wrap-up already fired: flip to `Here` and continue normally — **the nightly quote fires ONCE per day, never repeat it.**
   - Don't log a stale away-note after the fact (already back + done = expired — [[feedback-open-loop]]).
   - ⚠️ **2026-07-03 failure, don't repeat:** asked about a closed item (the run) instead of the open one (the reading) because both shared one line. The format above prevents it.
   - ⚠️ **A month can pass between sessions** (21 Jul → 23 Aug). On a long gap: don't assume the last status line is live — ask what changed before acting on it.

## 🚪 Current status
- **Here** (back 19:26 from a good 10k — training goal marked done/watered, swapped for the prescribed lift+easy 40′). ASK ON RETURN, still open: goals today beyond the auto-seeded list? bed by 23:30 on 13 Nov?
- AC311 Midterm 2: DONE, 13 Nov, "easy shit" — no impairment on the actual paper despite that morning's heavy drilling (carries straight into the 28 Nov final instead). Only real uncertainty was the revaluation-surplus annual transfer (optional under IAS 16, not mandatory) — he worked it both ways on paper and arrowed to the with-transfer version as his final answer. Next: final 28 Nov.
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-11-14 (Sat, from 14:24)
- 📗 AC313 FINAL prep resumed (exam Mon 23 Nov 09:00, 40%, ~47 MCQ closed book) via a handoff pasted in from elsewhere. Materials mix variance direction taught (70/30→60/40 rubber) — missed first (picked "can't tell," needed quantities), ghosted.
- 🧭 **Pivoted the whole session to real 2021 past-paper MCQs** (his call: test whether ChatGPT-conceptual topics survive contact with the real exam) — pulled `~/Desktop/pastpapers/AC313/AC313 Final2021.pdf` (45pp, image-only, no OCR, read page-by-page). **Caught that the file's own pre-marked selections aren't a trustworthy key** (at least one, Q8, looks wrong) — graded every question from first principles instead.
- **4 real calc questions landed correct**: ABC vs plantwide (Mary Inc., $4.00→$6.55/unit, undercosting made concrete) · absorption gross margin + operating income (Andrea, $24,750 / $16,500, after a real miss conflating period costs with "the fixed amount") · labor rate variance (TU Corp, self-built the 3-pillar AQ×AP/AQ×SP/SQ×SP framework, Cr $7,014) · step-down support-dept allocation (Betty's Book/Music, full 2-step chain incl. the closed-Warehouse trap, $126,649) — all 4 marked 🟩 on the canvas.
- Pocket Procedures (Notion) got 2 new AC313 toggles: the product-vs-period-cost litmus question, and the mix-variance direction rule.
- 🟧 Still shaky (teaching-example numbers only, no real past-paper rep yet): OH variances (spending/efficiency/fixed). Next: test that against a real question, then materials mix/yield calc.
- 🌸 Goals today (beyond the auto-seeded list) / wake early / bed-by-23:30 (13 Nov) — **asked repeatedly, never answered.** Off for a run at 17:09.

## Session — 2026-11-13 (Fri, from 09:07)
- 🌸 Goals asked this time (fixing 12 Nov's miss): "Tie up loose ends before AC311 M2 (1pm)" → done 11:42, watered.
- Cost-vs-revaluation-model summary + 2 worked examples added to the Notion Study Page §6 (his ask, to read on the way).
- Final 2021.pdf Part 4 Q2 (reval→impairment→reversal, 8.5M machine) drilled cold: nailed (a)/(b)/(c), needed two corrections on the (d) reversal cap (tried a straight ceiling-split, then a proportional-decay guess) before landing it — cap reversal at the ORIGINAL P&L-charged amount (750k), not the shrunk ceiling (800k) or a decayed fraction.
- Final 2021.pdf Part 4 Q1 (impairment only, 11.4M) + 5 impairment MCQs from the same paper: all correct, including catching the reversal-vs-further-loss trap (CA>RA at yr 3 → further loss, not reversal) unprompted.
- ARO/dismantling practice (fresh numbers) clean; 2 capitalization scenarios — real past-paper store-construction (29.67M, caught a bled-over basket-ratio habit) + fresh machine-purchase (6.29M, caught a launch-event slip) — both landed right.
- Heading to uni ~12:17 for the 13:00 exam.

## Session — 2026-11-12 (Thu, from 20:36)
- ⚖️ Conlaw job: V2 consistency pass across all 12 chapters (no hallucination/dupes, terms normalized), V1+V2 uploaded to Drive folder (private, link given). V1's single 4.7MB file wouldn't preview in-browser → split into 12 per-tape files, uploaded too. Verified each tape's transcript end-time against real mp3 duration — all close except **con06, ~4 min short, worth a spot-check**.
- 📘 AC311 Mid2 (tomorrow) study session, real gaps caught and fixed: basket/lump-sum purchase (was depreciating raw fair values instead of allocating the 12M price by FV ratio, 2021 Mid2 Q2) · specific-vs-general borrowings split (was pooling the "to finance construction" note into one blended rate instead of isolating it, real P1). Both corrected and redone clean.
- Revaluation-decrease vs impairment-loss distinction drilled fresh (trigger = fair-value check vs recoverable-amount test) — he passed a cold test question on it, entry + reasoning both right.
- Decommissioning/ARO (PV → capitalized cost → depreciation → accretion) drilled twice with fresh numbers — first run had digit-transposition typos (not math errors), second run clean.
- MCQ score from this morning's Codex session is **unconfirmed** (it couldn't see his tapped answers) — flagged, left open, his call whether to spot-check tomorrow AM.
- Ghost deck untouched (his 11 Nov call stands — past papers only); one card added in error mid-session then removed since AC311's parked and the review date would've landed after the exam anyway.

## 🎓 Midterms 1: DONE (all 6 sat by 4 Oct) → [[project-midterms]]. Finals carry-over lives there. **AC311 Midterm 2 (sessions 8–11, PPE + intangibles + impairment, 30%) is TODAY, Fri 13 Nov, 13:00.** Final 28 Nov.

## 🧰 New system pieces (built 27 Sep, his pick from 8 ideas) — all fire from the session-start hook, silent unless due
- 🕐 `hooks/prompt-time.sh` stamps `[clock]` on every prompt → **use it for any time reference.**
- 🧹 `bin/lint-sitrep.py` flags rule breaks in this file → **fix whatever it prints in that session.**
- 👻 [[ghost-deck]]: one missed question served cold at session start. **Every drill miss becomes a card that turn.**
- 🪞 [[ledger-said-did]]: his dated "I'll do X"s, checked the next session; weekly % on Sundays.
- 📬 `memory/capsules/`: sealed letters. **12 Dec 2026 (race eve)** · **29 Mar 2027 (his 20th birthday)** · **16 Sep 2027 (a year after the funeral)**.
- 😈 **Vex subagent** (`.claude/agents/vex.md`): no memory, no context, attacks a plan cold. Brief it with the plan + facts only, never with his feelings about it.
- 🎵 Chapter soundtracks on Spotify (Artis): one playlist per chapter in [[chapters]].

## 🔕 Standing — raise only if it comes up
- 🌸 **Daily goals: BUILT 29 Sep 21:32–22:00** (he pulled it forward from Sun 4 Oct, with a hard stop at 23:00). The Room's flower = today's goals; the petals fall at log-off → [[reference-crow-room]] · rule [[feedback-goals-today]]. **Tomorrow's first session: ask "goals today?".**
- **Morning person:** #1 landed 14 Sep; #2 not seen yet → [[project-morning-person]].
- **Race 13 Dec:** venue unknown · bib pickup race-morning or in advance? (his dad likely knows) → [[project-training-plan]]. Training resumes after exams, and the flood may affect it.
- 📖 **Siddhartha: he's at Kamala. ⛔ No spoilers past Kamala.** Karamazov: ✅ **FINISHED 24 Oct**, all fair game.
- Unanswered and low-stakes: BA202 cold-question numbers (2 Sep) · AC311 slide 9 cranes vs software · FCF drill ↔ hub link.
- BBA camp (New Year, mountains): interviewed 25 Aug, he'll report if he makes the cut. Basketball: 2 more games, dates unknown.
- 📌 After midterms: "make Obsidian cool" → [[reference-obsidian]].
- ⚠️ **My own error log moved to [[crow-error-log]]. The shape keeps repeating: check the record before asserting.**
