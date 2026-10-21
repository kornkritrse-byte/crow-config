---
name: sitrep
aliases: ["sitrep"]
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-09-13T13:34:50.755Z
---

# Situation Report
*Last updated: 2026-10-21 13:16 (live). Window holds 21 Oct + 20 Oct; 19 Oct flushed to [[sessions-log]] 21 Oct. Next to flush: 20 Oct.*

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
- 🚪 **Here (Wed 21 Oct, back from restart 13:17).** Still to ask: brand Q: "someone scrolls Samneang's IG for 3 seconds, what should they feel?" · 💳 Claude sub ends TOMORROW 22 Oct ("ill take care of that", 14:55, no when).
  - Also still open (low-stakes): Siddhartha or Winter? · Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-10-21 (Wed)
- 13:15 "save session boutta restart": session saved, Room restarting.
- 13:20 ghost #31 (AC311 N/R interest) FAIL: needed a hint, said Discount on N/R not Interest Receivable → back Sat 24. Goals: Karamazov + proxy Henley; wake early ✗ (sore legs), bed 20 Oct ✓.
- Training re-dayed (his call): Tue 20 = 4×800 @ 4:00/km · today recovery easy · **long 12 km Thu 22 AM** (from Sun 25; Crow objected, legs sore) → [[project-training-plan]], ledger.
- 14:55 Karamazov: finished Book 12 + Epilogue ch 1; the end of Book 12 "made my heart drop". He revised his truth belief himself: "there is always truth, just not much people care about" → [[chapters]]. Next read: Myth of Sisyphus (after the Epilogue).
- 15:28 **Patrick invited to Brand HQ as a guest** (his own Share; permission level not confirmed yet).
- ⏸️ **PAUSED at 15:24, his ask: "don't forget… we are going to revisit this later".** Thread: people who SAW his deeper side and still chose his surface ("a bummer that's how it's going to be"). Crow's last move: the Katya parallel (knew Mitya best, handed over the letter: calculating or hurt?) + guess that some chose the surface because the surface hurt them + **open Q: has he tested "that's how it's going to be" with any of them, or is it the courage thing again?** Before that: Mitya = true surface, false conclusion; his outside cuts people who never get "the ride". Resume HERE.

## Session — 2026-10-20 (Tue)
- Morning: 10 hard class Qs for MK201 วิ่งแลกแว่น; presentation DONE 11:35. Goals: AC313 quiz ✓ · Patrick ✓ · evening run w/ school kid ✓ · Karamazov → moved to 21 Oct (ledger). AC311 M2 = Fri 13 Nov.
- Brand: answered Q4 + Q8–15 → `brand/Korn core answers.md`; name brainstorm → `brand/Names longlist.md`.
- 14:55 **Brand HQ built in Notion**; Crow edits it live, logs every change → [[project-clothing-brand]]. Crow wrote memory to the repo copy AGAIN, caught + redone → [[crow-error-log]].
- With Patrick: **name Samneang สำเนียง** · 50/50, numbers before launch · Thai = a hint (Songwat grunge, faded colour) · **product #1 grey faded Henley + offset button, S/M/L, PREORDER** · maker = mom's close friend's factory (specialty unknown). Proxy measuring → Wed 21 (ledger).
- 21:51 phase = FOUNDATION before any maker, target ≈ end Nov (tentative; clashes with finals). Crow drafted **Brand Book** (decision test = the 50/50 tiebreaker; his rule: best justification wins). Logo = Thai script สำเนียง.

## 🎓 Midterms 1: DONE (all 6 sat by 4 Oct) → [[project-midterms]]. Finals carry-over lives there. **AC311 Midterm 2 (sessions 8–11, PPE + intangibles, 30%) is next: **Fri 13 Nov** (Korn, 20 Oct; time TBC). Session 11 (31 Oct, impairment TAS 36) falls before it, so assume impairment is IN scope. Final 28 Nov.**

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
- 📖 **Siddhartha: he's at Kamala. ⛔ No spoilers past Kamala.** Karamazov: safe through **Epilogue ch 1** (verdict + escape plan known). ⛔ **No Epilogue ch 2–3.**
- Unanswered and low-stakes: BA202 cold-question numbers (2 Sep) · AC311 slide 9 cranes vs software · FCF drill ↔ hub link.
- BBA camp (New Year, mountains): interviewed 25 Aug, he'll report if he makes the cut. Basketball: 2 more games, dates unknown.
- 📌 After midterms: "make Obsidian cool" → [[reference-obsidian]].
- ⚠️ **My own error log moved to [[crow-error-log]]. The shape keeps repeating: check the record before asserting.**
