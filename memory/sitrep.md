---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-11-22T12:38:04.676Z
---

# Situation Report
*Last updated: 2026-11-25 15:19 (live, he's off to errands). Window holds 25 + 24 Nov; 23 Nov flushed to sessions_log. Gap: no 21 Nov note was ever written (git syncs that day); not investigated.*

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
- **AWAY (25 Nov, ~15:19) — off to: errands.** ASK ON RETURN: resume the MK ghost round at **G10** (horizontal MS, card was posted, unanswered) → 9 MK cards still due today + the **cash-discount retest with new numbers** (failed G9: reads 'net 30' as 30% off, twice) · did the LIFT happen / 5K tonight? · source of 'the whole test is MCQ' (asked once 15:02, unanswered; outline says Ch 7–15 written; DON'T re-argue, just ask the source) · 24 Nov bed/journal/reading unreported. Essay docs (if they come up): Lita `1HqIV_9rZe6FelbYTKg2lE5zgcOo-VESLqtQ02Xuhjhg` · 'Ass-Pulling (excahnge year)' `1k0k9dz-RJeN-Io5GVXg1yjlSnHEuGwaR6UHD4Se4LCA`.
- **Next up: MK201 FINAL Thu 26 Nov 09:00; AC311 FINAL Sat 28 Nov** (25%). Weak branches on record: Investment Property (drilled 24 Nov, ~9/20; classification + transfers still shaky, 12 cards due Fri 27 Nov) + Conceptual Framework (MCQ 13/20 on 24 Nov; ~13 cards due 26–27 Nov). FN201 topic 9 + t8s6 still untouched.
- Ghost deck: all 58 AC313 cards parked to [[ghost-parked]] 23 Nov 12:20 (he didn't object). Deck = AC311 + FN201 now, 17 due.
- Room: FG scoreboard (`ui/public/pixel/fgboard.js`, `server.mjs` mcqAllStats()) built 22 Nov lunch; needs a Room restart from HIM if not done yet. MCQ cards lock when a question's text matches one he already answered (localStorage key) → tag repeats, e.g. "[Quiz 3 · Q4]".
  - ⏸️ **PAUSED thread (21 Oct 15:24, his ask: "don't forget… we are going to revisit this later").** People who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Resume HERE when he's ready; don't force it.
  - Also still open (low-stakes): Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-11-25 (Wed, 13:16 →)
- Ghost #30 ✅ (IP FV gain → P&L; said only "gain"). Woke 09:00 → wake-early ❌. Goals: MK201 prep + 5K chill run (maybe); Wed T session swapped for a LIFT, his call (ledger). MCQ board reset at his ask.
- MK201: Crow read all Ch 9–15 slides + outline (**MCQ = Ch 9–15, written = Ch 7–15**). 40-card MCQ run 14:02–14:55 = **25/40** (Ch9 2/6 weakest, Ch12 5/6 best). He's never read the slides ("pure intuition"); every miss was a term of art, reasoning-able ones (break-even, loss leader, elasticity) all right. 16 cards added, re-dated due today.
- Ghost round (MCQ at his ask, "the whole test will be in that format"): 7/17 cleared by 15:18. Fails: freight-absorption (right pick, "idk") + cash discount 2/10 net 30 (reads net 30 as 30% off, twice). Says the whole final is MCQ, which contradicts the outline; source asked once.
- 15:19 off to errands mid-round.

## Session — 2026-11-24 (Tue, 10:17 → ~21:35)
- Morning: woke early, 10 km Z2, two poem drafts (abstract ego/courage one + a willow image one; Artis: too abstract, "solemn" twice, try merging; inspired by Don McLean's "Vincent"). Bed 23:30 ✅ (23 Nov). Ghost #29 ❌. Built the Room's **journal-entry card** (```entry, + × delete) on his ask → [[reference-crow-room]].
- AC311 all day: IP 20 Qs (~9/20; classification list, "gain on transfer" as the event name, FV model run as PPE revaluation → fixed by Q15) · CF MCQ 13/20 (pairs; his words "im over complicating it") · impairment chain clean except labels + CGU head-math (3 tries; keyboard-mash 13:32). Pattern all day: answers 2 of 3 parts, skips the note box, skims explanations (Vera).
- Nap 13:57–16:03. Essay structure for a 2nd friend (same TBS ambassador prompt as Lita's), then dropped.
- 18:30 MOCK (PPE impaired → IP): **15.5/25**; (d) 4/10 = the PPE→IP OCI bug came back under mixed pressure. Year-by-year rebuild at his ask → the number-line split clicked (700,000 P&L / 600,000 OCI). ~25 AC311 ghost cards today; Pocket Procedures IP + CF + impairment pages extended; Final Map IP nodes orange.
- MK201: he'd done past papers in ChatGPT (56/66 first attempts, basic level). Crow read the outline + all Ch 7–15 slides → `~/Desktop/MK201final/`; **outline says the final has a WRITTEN part (Ch 7–15)**; he says "only mcq" (source unknown, flagged once) → [[project-midterms]]. Hard MCQ run: 3/5 first attempts (misses: manufacturers' agent, freight-absorption; both carded due 25 Nov). Lay's "Do Us a Flavor" card left unanswered.
- 21:26 he asked "how's my AC311": Crow's guess 60–70% now; 40 AC311 ghost cards due 26–27 Nov + one more mixed mock after the MK201 exam.

## 🎓 Midterms 1: DONE (all 6 sat by 4 Oct) → [[project-midterms]]. Finals carry-over lives there. AC313 final SAT Mon 23 Nov 09:00–12:00. **Next: AC311 final Sat 28 Nov.**

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
