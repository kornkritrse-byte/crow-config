---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-11-16T06:10:59.008Z
---

# Situation Report
*Last updated: 2026-11-15 22:20. Window holds 15 Nov + 14 Nov; 13 Nov flushed 15 Nov. Next to flush: 14 Nov.*

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
- **AWAY (16 Nov ~13:10) — off to: eat, finish Blade Runner.** ASK ON RETURN: nothing open — he'll ping when ready to resume (queued: live journal-entry drill, writing debits/credits himself through a full variance problem, his own ask after naming entries as his real gap).
- AC311 Midterm 2: DONE, 13 Nov, "easy shit." Only real uncertainty was the revaluation-surplus annual transfer (optional under IAS 16) — worked both ways, went with the with-transfer version. **Next: AC311 final 28 Nov.**
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-11-16 (Mon, from 11:01, ongoing)
- Bed-by-23:30 (15 Nov): done. Goal today: Study AC313 (no extras).
- Said/did line 63 (14→15 Nov reciprocal/step-down): his own read, partial — "drifted from that as our structure to just finishing all topics." Closed the gap today: both methods run fully unaided on fresh constructed problems, only bookkeeping slips left (own-vs-true cost, distributing coefficients, isolating variables) — all ghosted.
- AC313 Final Map canvas fully caught up: step-down/reciprocal/product-vs-period (vas1) nodes updated with today's reps; Pocket Procedures (Notion) got 4 new toggles (quantity-variance benchmark trap, fixed-OH-spending-doesn't-flex, COGS debit/credit rule, total-conservation-across-methods check).
- Added **MK201 Final, Thu 26 Nov 09:00–12:00** to Life calendar (assumed final, slots between AC313's 23rd and AC311's 28th — unconfirmed, flag if wrong).
- Two MCQ rounds (20 Qs total, his request for format): F/U-direction round (8/10) + mixed round across all 4 branches (7/10). 5 real misses, all different shapes — ghosted. Standout: Q9 mixed round — he used the total-conservation check correctly himself earlier the same session, then missed it stated as a cold concept. **Doing ≠ naming is now the single highest-value thing to watch, above F/U direction itself.**
- His own read on remaining gaps (voice msg, 13:08): journal entries/debit-credit (only tested once, 15 Nov) and ABC (he feels shaky; record says tested clean twice — told him so, pushed back gently, redirected time to entries instead). Queued: live full-variance problem, he writes every entry himself start to closing-to-COGS.
- Scope question (cumulative on sessions 1–7 or not) still unconfirmed — he's asking her, will report back.

## Session — 2026-11-15 (Sun, from 11:38)
- **Big structural day.** His own ask: dropped the fixed weekly training calendar for targets (5 runs/wk, 40 km/wk, 1 long run, intervals worked in) → [[project-training-plan]]. Rewrote `~/CLAUDE.md`: no more rest/stop nudges in training OR work unless he self-reports struggling, reflection-prompts over verdicts, no toxic motivation, standards split (uni = good not perfect, his passions = elite bar) → [[feedback-push-not-coddle]], trial calibration, check back ~18–20 Nov.
- Morning body scare (head/traps/quads buzzing ache, dazy mid-drill) — his own diagnosis: under-hydrating despite normally drinking a lot. Resolved clean by afternoon (massage + water); confirmed "a lot better" / run afterward "great chill easy run very light."
- **AC313 marathon session — final map (sessions 8–15) now FULLY covered**, 8 days before the 23 Nov final: all 3 allocation methods tested on 2 datasets each, every standard-costing variance incl. a full journal-entry chain (first time), departmental rates. First live test of the new push-rule: Crow offered an easy stopping mid-reciprocal-method, Korn called it ("why are we not finishing something we started"), corrected. Full detail → [[study/AC313 Final Map.canvas]].
- **Recurring weak spot, flagged hard: F/U direction flipped 5+ times** across the session (yield, OH spending, OH efficiency, materials quantity, volume variance) — each ghosted, plus one general meta-rule card. Closing MCQ check: 3/4, the one miss was the volume-variance exception (more capacity used = FAVORABLE, the one case where "more" is good). Single highest-value pre-exam review item.
- **Open, pushed to [[project-midterms]]:** is the AC313 final cumulative on midterm-scope material (sessions 1–7)? Unconfirmed — he needs to actually ask her, don't let it default to "assumed fine."
- Evening: morning creative writing (Letter to 25, Marcus Aurelius voice — direct self-address, no audience) + daily journal both done. Full flower today except the now-stale Sunday-long-run standing line (training days aren't fixed anymore) and bedtime.

## Session — 2026-11-14 (Sat, from 14:24)
- 📗 AC313 FINAL prep resumed via a handoff pasted in from elsewhere. Materials mix variance direction taught (70/30→60/40 rubber) — missed first (picked "can't tell," needed quantities), ghosted.
- 🧭 **Pivoted to real 2021 past-paper MCQs** (his call: test whether ChatGPT-conceptual topics survive contact with the real exam) — pulled `~/Desktop/pastpapers/AC313/AC313 Final2021.pdf` (45pp, image-only, read page-by-page). **Caught that the file's own pre-marked selections aren't a trustworthy key** (Q8 looks wrong) — graded from first principles instead.
- **4 real calc questions landed correct**: ABC vs plantwide (Mary Inc., $4.00→$6.55/unit) · absorption gross margin + operating income (Andrea, $24,750 / $16,500, after a miss conflating period costs) · labor rate variance (TU Corp, self-built 3-pillar framework, Cr $7,014) · step-down allocation (Betty's Book/Music, $126,649).
- Pocket Procedures (Notion) got 2 new AC313 toggles: product-vs-period-cost litmus question, mix-variance direction rule.
- 🌆 Fixed OH spending vs volume drilled fresh (constructed, not past-paper): missed both first pass, corrected, 2 clean reps landed. Materials mix+yield walked step-by-step: mix missed once, yield landed clean. 3 ghost cards added. (Both fully re-validated against real past-paper + Exercise 2 data on 15 Nov — see above.)
- 🌸 Goals/bed closed 21:47: bed-by-23:30 (13 Nov) missed, logged. Off for a run 17:09, back 19:26.

## 🎓 Midterms 1: DONE (all 6 sat by 4 Oct) → [[project-midterms]]. Finals carry-over lives there. AC311 final 28 Nov. AC313 final Mon 23 Nov 09:00 (next up, 8 days out).

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
- **Race 13 Dec:** venue unknown · bib pickup race-morning or in advance? (his dad likely knows) → [[project-training-plan]].
- 📖 **Siddhartha: he's at Kamala. ⛔ No spoilers past Kamala.** Karamazov: ✅ **FINISHED 24 Oct**, all fair game.
- Unanswered and low-stakes: BA202 cold-question numbers (2 Sep) · AC311 slide 9 cranes vs software · FCF drill ↔ hub link.
- BBA camp (New Year, mountains): interviewed 25 Aug, he'll report if he makes the cut. Basketball: 2 more games, dates unknown.
- 📌 After midterms: "make Obsidian cool" → [[reference-obsidian]].
- ⚠️ **My own error log moved to [[crow-error-log]]. The shape keeps repeating: check the record before asserting.**
