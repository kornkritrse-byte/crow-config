---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-11-20T11:45:29.329Z
---

# Situation Report
*Last updated: 2026-11-20 18:45 (mid-session save, not day-close). Window holds 20 Nov + 19 Nov; 17 Nov flushed to sessions_log. Next to flush: 19 Nov (when 21 Nov opens).*

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
- **Here (20 Nov, from 11:24 — restarting the Room again ~18:44, hoping it picks up Notion access; none so far).** AC313 full re-test done (8 ghost cards) + AC311 Investment Property fully mapped, subsequent measurement flagged as the real weak branch (5 ghost cards). AC311 Conceptual Framework drilling stalled: ChatGPT run went badly, MCQ-in-Room just started (1 Q in), he now wants it on Notion instead — no connector yet, Google Doc offered as fallback. FN201 topic 9 and topic 8's t8s6 still untouched from 19 Nov, still open.
- AC311 Midterm 2: DONE, 13 Nov, "easy shit." Only real uncertainty was the revaluation-surplus annual transfer (optional under IAS 16) — worked both ways, went with the with-transfer version. **Next: AC311 final 28 Nov** (Conceptual Framework drilling still to come — summary doc built, his read-through pending).
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-11-20 (Fri, from 11:24, restarted ~16:20 + ~18:44 — ongoing)
- Ghost 30 (AC313 product-sustaining activity) passed cold, box 2.
- **AC313 full re-test** (his call: the canvas's "green" wasn't earning it) — overhead/ABC, all 3 support-dept methods, standard-costing variances, mix/yield, all re-run with real exam numbers. Real gaps: benchmark-selection confusion (which hours/rate a variance uses) and a rounding-precision habit, NOT raw calc ability like the map implied. 8 ghost cards.
- **AC311 Investment Property fully mapped** — all 5 branches tested. Transfers + journal entries mostly solid (1 miss). **Subsequent measurement went 0/3** — the real weak branch, not transfers like the history implied. 5 more ghost cards.
- Built `study/AC311 Conceptual Framework - remaining topics.md` + a ChatGPT drill kit (`chatgpt/ac311-cf-drill-instructions.md` + an 18-question hard scenario bank) + wired the summary into the Room drawer (first non-claude.ai artifact, needed a small `server.mjs` MIME fix). ChatGPT drilling went badly ("being a fuckwit," his words) — switched to MCQ-in-Room instead, one question in.
- **He now wants the CF material in his Pocket Procedures Notion page instead** ("struggle with the conceptual part rn") — no Notion connector available either restart so far; offered a Google Doc as the live alternative, not yet built. He's hoping a 3rd restart picks up Notion access.
- Found/saved `AC313 Quiz 3 (graded, 2024+2025).pdf` (his own graded quiz, "basically like finals") → `~/Desktop/pastpapers/AC313/`. Deferred drilling from it, his call.

## Session — 2026-11-19 (Thu, from 12:38, paused ~15:54 — resumes this evening)
- **18 Nov gap caught + closed:** no sitrep note existed for Wed 18 Nov (Crow's maintenance miss, not a missed study day) — git confirmed the session happened: FN201 topic 8, single + multi break-point MCC (Q11, Q17, Q20) nailed clean. Korn pushed back ("I did them with you no? tf") when Crow first said unverified — correctly, Crow was wrong to doubt him and should've checked git before asserting → [[crow-error-log]].
- Ghost card 29 (AC313 mix/yield independence) passed cold, box 2.
- FN201 topic 8 deep block: Q22 (actual-vs-optimal weighted MCC, the stated 18 Nov gap) run clean start to finish. Q23 (full version — bond YTM via BA II Plus, kp, DDM+flotation ks/ke, market-value weights, break point, THB70M fund split) walked through guided, zero errors once structured, then re-run solo clean. Q29-32 (same family, kd given directly) run solo with light Q&A — one real slip (dropped g from ks, i.e. used dividend yield alone) self-corrected after a pointer.
- **Ghosted:** retention ratio "b" in g = b×ROE — blanked on it twice today (once mid-walkthrough, once in the "solo" pass) → [[ghost-deck]].
- Canvas updated (`study/FN201 Final Map.canvas`, MCC/break-point node): this sub-block now solid. Scope check given (his ask): today covered ~topic 8's hardest piece only, ~15% of the paper — risk-adjusted WACC, the trade-off model, and all of topic 9 (capital budgeting, equal weight to topic 8) still untouched.
- **Evening resume (20:28–20:45):** t8s9 (risk-adjusted WACC) + t8s10 (trade-off model) both closed, concept-only, ~17 min. Risk-adjusted WACC took 2 hints — he had PV-vs-discount-rate backwards (said lower rate → lower PV; it's the reverse) and first guessed "rejected" instead of "accepted" for the risky-project case → ghosted. Trade-off model landed clean (bankruptcy/distress risk pulls WACC back up past the optimal point). Canvas colors updated (t8s8 → green/solid). He then asked for the WACC↔MCC link cleared up — explained (WACC = one weighted-avg %, MCC = that % plotted against total new capital raised, stepping up at each break point) + queued 3 drill Qs for next session, saved directly in the canvas (`study/FN201 Final Map.canvas`, top of the t8s8 node). Topic 8 fully closed except t8s6 (ST debt in WACC, calc-heavy — saved for when fresh). Topic 9 still fully untouched.

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
