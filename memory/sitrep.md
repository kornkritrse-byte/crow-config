---
name: sitrep
description: Current situation report — auto-loaded every session. Rolling window: current state + the last TWO sessions only.
metadata:
  node_type: memory
  type: project
  originSessionId: f8cd2815-137d-4ec5-a125-983006040b74
  modified: 2026-08-23T14:23:42.322Z
---

# Situation Report
*Last updated: 2026-08-23 (in-session)*

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
- **Here (23 Aug).** Back after a month dark. **รับน้อง is CLOSED** — camp happened 25–27 Jul, he's satisfied; flashback video landed hard (people cried). He's opened the questions on it if I want them.
- **New chapter, two priorities he named, in his order:** (1) **midterms** — first exam **20 Sep**, subjects + resources/outline coming from him; (2) **fitness** — leaner, running + gym, explicitly to be planned *around* studies.
- **FITNESS HALF IS DONE** — fully designed and written to [[project-training-plan]]. Nothing further needed from him on it.
- **⏳ WAITING ON (he said Mon 24 Aug): syllabi + textbook names for AC313 / AC311 / FN201.** That is the LAST blocker on the study half.
- **ASK ON RETURN (24 Aug):** did the syllabi/textbook info come? Nothing else is outstanding — everything else this session closed.
- **📌 DATED: 5k time trial locked for Tue 25 Aug** (pacing plan in [[project-training-plan]]). Ask for the number after. **Mon 24 Aug = lift only, no treadmill run** — he needs fresh legs.
- **On his return the move is: take the syllabi → build the study half → put the full week (study + training) on the Life calendar in ONE pass.** Structure is already agreed, don't re-plan it.

## Session — 2026-08-23
- MCP reconnect check: Sheets confirmed working via the local `google-docs` MCP (not the claude.ai connectors — Drive can't write cells). **Formula-reading still broken** (FORMULA render returns computed values) — same gotcha as 21 Jul.
- Camp closed out. Rubnong + Scene 5 July notes flushed to [[sessions-log]].
- Two new priorities opened (see status). Flagged the real risk to him: the July training plan's **Aug re-plan never happened** — fitness lapsed once already with no anchor, and "planned around studies" makes it subordinate a second time.
- **Fitness decisions LOCKED:** goal is now **leaner only** (climber shaping dropped → weight work becomes full-body retention, not the Pull A/B split); 4 days/wk = 2 gym (1hr weights + 1hr cardio) + 2 runs; timing per-day into timetable gaps; 5k-in-20:00 as horizon goal, needs a near milestone. All in [[project-training-plan]].
- **Plan approved, execution deliberately held:** he chose "wait, then build study + fitness in one pass". Approach → `~/.claude/plans/compressed-nibbling-dolphin.md`.
- **He fed everything in over the session:** 6 subjects + exam dates (20–27 Sep), class timetable, no classes in exam week, past papers available, running baseline, 64kg/12–15% scan-backed. All filed → [[project-midterms]], [[project-training-plan]].
- **Key calls made:** FN201 has the worst in-period window and must be ready BEFORE 20 Sep; don't study in exam-date order; AC311 needs IFRS sources not US GAAP; BA202 has no external substitute (Thai tax); gym cardio hour → treadmill run (4 runs/wk, zero extra time); NO dieting at 12–15% — **success metric changed from the scale to 5k time**; 5k and 10k are one goal (20:00 ≈ 41–42min).

## 🎯 Current state
- **Midterms = TOP PRIORITY.** First exam 20 Sep (~4 weeks out from 23 Aug). Awaiting from Korn: subject list, per-subject exam dates, course outlines/resources, weekly class timetable. He's a **sophomore** now (finished freshman year mid-2026) — major not recorded, ask.
- **Fitness = #2, decisions locked 23 Aug, build pending** ([[project-training-plan]]) — **goal is LEANER ONLY** (climber shaping dropped → weight work = full-body retention in a deficit, NOT the July Pull A/B split). 4 days/wk = 2 gym (1hr weights + 1hr cardio) + 2 runs; NO legs in gym, NO bouldering; timing per-day into timetable gaps. Run programming pending his stats. Unknown: whether he trained through Aug, current weight vs 65kg start.
- **รับน้อง CLOSED** ([[project-rubnong-tracker]], [[project-scene5-flashback]]) — archive, don't surface unless he does.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Reading (two in parallel):** (1) **Karamazov** — Book 10, ch. 1–2 done (03 Jul). ⚠️ No spoilers past Book 10 ch. 2 (no Zhuchka/Perezvon, Ilyusha bedside, trial, Smerdyakov, Ivan/devil, Epilogue). Status after the month gap unknown — ask where he is. (2) **After Dark** — ✅ FINISHED 14 Jul. **Next before-sleep book = Letters to Milena** (owned). Full history: [[user-reading-list]].
- Bass Trainer Module 3 pending when he wants it ([[project-bass-trainer]]). Show with friends was upcoming — did it happen?
