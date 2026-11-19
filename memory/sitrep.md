---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-11-19T08:54:59.504Z
---

# Situation Report
*Last updated: 2026-11-19 15:54 (mid-session save, not day-close). Window holds 19 Nov + 17 Nov; 16 Nov flushed to sessions_log. 18 Nov had no session note (Crow's maintenance miss — the session happened, confirmed via git; folded into the 19 Nov note below). Next to flush: 17 Nov (when 20 Nov opens).*

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
- **Here (19 Nov, from ~12:38, at a library, leaving ~16:30).** FN201 session paused mid-afternoon, resuming this evening (his call, said 15:53) — topic 8 remainder (risk-adjusted WACC, trade-off model) or topic 9 (capital budgeting, untouched, equal weight), his pick when he's back.
- AC311 Midterm 2: DONE, 13 Nov, "easy shit." Only real uncertainty was the revaluation-surplus annual transfer (optional under IAS 16) — worked both ways, went with the with-transfer version. **Next: AC311 final 28 Nov.**
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-11-17 (Tue, from 11:05, ongoing)
- AC311 final material landed: Framework PDF (sessions 14–15) + the parked Investment Property deck both read, **`study/AC311 Final Map.canvas`** built. Zero drilling yet. Two own sitrep errors caught same day (sessions 14–15 "no topic" claim, then "impairment has no deck" when it's been on disk since 3 Nov) → [[crow-error-log]].
- FN201's official exam-info doc landed (45 MC Qs, Topic 7 = 0 pts, #8/#9 = 15 pts each) + full 5-final gap audit (his ask): AC313 solid/closed enough, MK201 date unconfirmed/zero prep, AC311 just mapped, FN201 untouched since 27 Oct despite being heaviest (45%), BA202 cold since 3 Nov (55%, heaviest overall) → [[project-midterms]].
- **New standing teaching rule (his ask, café w/ cousin):** question first, small tweaks before the answer, never hand it over unless he's really struggling → [[feedback-drill-format]]. First live run: AC311 Conceptual Framework, built fully from his own answers, 2 vocab-recall gaps ghosted → [[study/AC311 Final Map.canvas]].
- **Correction (20:47, his report after M2):** impairment (TAS 36) was NOT on M2 — carried onto the AC311 final instead (4th final topic, already taught once, needs a refresh not a sourcing) → [[project-midterms]]. No past-paper exists for Investment Property itself; he's checking Teams/classmates tomorrow → [[ledger-said-did]]. Separately: nightshift Color Filters endpoint built tonight, untested past the macOS Accessibility wall — Room reload pending.
- Caught a real plan conflict: 14:42 café plan said tomorrow = FN201, 20:5x he'd forgotten and was leaning AC311 entries instead (just forgot, not reconsidered). **Resolved: FN201 tomorrow** (heaviest weight, most feared, 3 weeks untouched beats curiosity) — his call after Crow's steer. AC311 entries + IP/impairment past papers deferred to Thu.
- 📖 **M&M deep conversation (21:01–21:12):** truth/cowardice theme — Pilate senses Yeshua's truth and condemns him from fear, not conviction; Crow tied it to Bulgakov writing the book hidden from Stalin's censors, refined "communism" to "fear betrays truth under any system that punishes honesty." Landed well: "that's a good one... I like that idea." Full conversation → [[chapters]]. Reading progress: starting ch 13, no spoilers past ch 12.

## Session — 2026-11-19 (Thu, from 12:38, paused ~15:54 — resumes this evening)
- **18 Nov gap caught + closed:** no sitrep note existed for Wed 18 Nov (Crow's maintenance miss, not a missed study day) — git confirmed the session happened: FN201 topic 8, single + multi break-point MCC (Q11, Q17, Q20) nailed clean. Korn pushed back ("I did them with you no? tf") when Crow first said unverified — correctly, Crow was wrong to doubt him and should've checked git before asserting → [[crow-error-log]].
- Ghost card 29 (AC313 mix/yield independence) passed cold, box 2.
- FN201 topic 8 deep block: Q22 (actual-vs-optimal weighted MCC, the stated 18 Nov gap) run clean start to finish. Q23 (full version — bond YTM via BA II Plus, kp, DDM+flotation ks/ke, market-value weights, break point, THB70M fund split) walked through guided, zero errors once structured, then re-run solo clean. Q29-32 (same family, kd given directly) run solo with light Q&A — one real slip (dropped g from ks, i.e. used dividend yield alone) self-corrected after a pointer.
- **Ghosted:** retention ratio "b" in g = b×ROE — blanked on it twice today (once mid-walkthrough, once in the "solo" pass) → [[ghost-deck]].
- Canvas updated (`study/FN201 Final Map.canvas`, MCC/break-point node): this sub-block now solid. Scope check given (his ask): today covered ~topic 8's hardest piece only, ~15% of the paper — risk-adjusted WACC, the trade-off model, and all of topic 9 (capital budgeting, equal weight to topic 8) still untouched.
- Plan: FN201 resumes this evening, his call on risk-adjusted WACC/trade-off model vs. starting topic 9 → [[ledger-said-did]].

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
