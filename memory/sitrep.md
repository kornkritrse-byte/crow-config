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
*Last updated: 2026-08-25 (live, mid-session)*

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
- **HERE (25 Aug, 21:58).** Home. Reported: **studying done** and **his basketball game was WON**. Nightly quote has NOT fired for 25 Aug — it fires only when he says he's logging off.
- **STILL OPEN — ask when it fits:**
  0. ✅ **RESOLVED 25 Aug ~22:10 — HE'S GOING TO CLASS TOMORROW.** He argued for skipping (3hr class + 2hr commute vs ~1hr of compressed notes), then narrowed it to skipping BA202 only. Counters that landed: **recordings don't upload until the weekend** (and Sat 29 is already 5k TT + AC313), **the commute is paid anyway** since FN201 is 13:00, and he'd hit L5 on 2 Sep never having been in the room. **Deal struck: attend once, then judge with evidence — if the room adds nothing, Crow runs the transcription pipeline WEEKLY and backs him skipping BA202.** ⚠️ Follow up Wed evening: did the room add anything?
  1. **FN201 Assignment #1 — WRITING IT NOW (25 Aug ~22:10), ¶1 and ¶2 first.** 🚨 **DUE TOMORROW (Wed 26) 13:00**, and his morning is BA202 09:00–12:00. Section 0264/01 → 13:00 deadline **CONFIRMED from the assignment brief** (no longer an inference). Topic chosen: **catastrophe bonds**. He drafted one paragraph, I flagged it needed a rewrite (payout direction inverted, "cat 5 earthquake" error). Unknown whether he finished it.
  2. **Did the campus library work as a study spot?** Feeds [[project-midterms]] — if yes it's the default for every at-uni block through Sep.
  3. BBA camp interview (10:10 today) — only if he raises it; he said he needs no help.
- **📌 TOMORROW, WED 26 — THE PIVOTAL DAY:** BA202 09:00–12:00 (**his first-ever BA202 class**) · FN201 Assignment #1 due 13:00 · FN201 13:00–16:00 · gym 17:30–19:30.
- **NOTHING BLOCKED.** Job is adherence, not planning — do NOT re-plan ([[project-midterms]]).
- ⚠️ **Watch for:** week 2 (31 Aug+), not week 1. And whether **Sat 19 Sep** stays MK201's day.
- **Sat 29 Aug = 5k TT — ask for the number.**

## Session — 2026-08-25
- 🎧 **Read all three BA202 transcripts and found the outline's lecture titles are WRONG** — the lecturer runs ~1 session behind. **L2 never reached PIT; PIT only starts in L3.** Korn is **one PIT lecture behind, not three.** L4 tomorrow = source rule + residence rule. Full detail → [[project-midterms]].
- 🚨 **THE FIND OF THE DAY: a CHEAT SHEET IS ALLOWED in BA202** — midterm AND final, A4 both sides, and the lecturer told the class to build a period × milestone table. Reshapes how BA202 gets studied. Korn to confirm exact page allowance.
- 📄 **Built + published the reconstruction** (L2 history + tax administration + constitutional basis, L3 PIT sequence + 6 taxpayer categories, 14 COLD questions): https://claude.ai/code/artifact/2c6630bc-54d1-40a5-b47e-74f69c703483 — **note: I promised these for 13:45 and delivered late; the block had already started.**
- 🎯 **L2 is denser in exam tells than L3** — he asked AND answered several in class (source of tax law → Supreme Court judgment; not-a-tax-authority → land & building + signboard tax). All logged in [[project-midterms]].
- 📚 **FN201 Assignment #1:** he asked for a niche topic, chose **catastrophe bonds**, and asked me to explain rather than write it — good instinct. I corrected two of his misreads (investor LOSES principal on trigger; "cat 5 earthquake" isn't a thing). **Unresolved whether he submitted.**
- ✅ **Studying done + basketball game WON.** The 13:00–17:00 campus block appears to have held.
- ⚠️ **Caught a stale banner:** reference_upcoming_events had today as "FN201 topic 4 / ratios" when the calendar said BA202 PIT. Fixed — mirror the calendar whenever it changes.

## Session — 2026-08-24
- 🚨 **THE SESSION'S FINDING — attendance, volunteered unprompted.** AC313 ✅ all · AC311 ✅ all · **FN201 = week 1 only** · **BA202 = zero of three** (the 45% paper). The 23–24 Aug plan was built on "coverage is solved" — **false for both subjects he doesn't fear.** Full table, BA202 session map, FN201 session map + assessment → [[project-midterms]].
- ➡️ **My answer: the clips aren't the bottleneck, Wednesday is.** 4 of BA202's 7 midterm lectures are still AHEAD. **He committed to Wed 26 Aug (BA202 9–12 + FN201 13–16)** — check whether it happened. Also flagged FN201 is a *flipped classroom*: the clips are the lecture, class is the application he's skipping.
- 🔧 **Built the lecture-transcription pipeline and ran it** — pulled all 3 missed BA202 recordings from his Drive folder, ~8 hrs, transcribing locally overnight. Tooling + gotchas → [[reference-lecture-transcription]].
- 📄 **Read the 5 course outlines** (`~/Desktop/class outline/`, no EL221 — his free win). Killed the phantom "free week 14–19 Sep"; **both accounting scopes are far smaller than he feared**; **BA202 promoted 4th → joint-1st** (45%, thinnest window, no external substitute). Found a **15% FN201 group assignment due 16 Sep**, inside the crunch week. **Built the full plan on the Life calendar in one pass** — 28 study blocks + the training week that had never actually been placed.
- ✅ **Caught two things that would have cost him marks:** he'd assumed **FN201 Assignment #1 was group work — it's individual, due Wed 26 by 13:00**; and his Tue block was mine-wrong (I'd put TVM where the *missed* class should have gone — **he pushed back and was right**).
- 🪞 **He asked how my read of him had changed and asked for harsh** → **his fear tracks CONTACT, not EXPOSURE**, and the planning was the comfortable version of the studying. Both → [[user-korn-struggles]]. Narrative → [[chapters]] (Chapter 6).

## Session — 2026-08-23
- **First session back after a month dark.** MCP check: Sheets works via the local `google-docs` MCP (the claude.ai connectors can't write cells); **formula-reading still broken** — same gotcha as 21 Jul.
- **รับน้อง closed out with a full retro** → [[project-rubnong-tracker]]. He overturned my "briefing failure" read with a better one — the game was **over-complicated**, his team understood it and couldn't convey it. New rule written: [[feedback-design-for-the-room]].
- **Whole new chapter built in one session:** 6 midterms 20–27 Sep, class timetable, no-class free week 14–19 Sep, past papers available, study-spot rules, ~100+ hrs of runway. All → [[project-midterms]].
- **Fitness fully designed** → [[project-training-plan]]: goal is now **leaner only**; 4 runs/wk via treadmill-after-lifting; **success metric changed from the scale to 5k time**; 5k and 10k are one goal; **no dieting at 12–15%**.
- **Calendar built (Life, notifications off):** 6 weekly lessons in grey to 11 Sep, 6 midterms in red, interview in dark green, basketball in orange.
- **Karamazov conversation** — he's at Book 12 ch. 2 and named "Ivan and the Devil" a favourite; I pushed on his "curious how I'll change" framing as deferral. Details + the new spoiler line → [[user-reading-list]].

## 🎯 Current state
- **MIDTERMS = TOP PRIORITY** ([[project-midterms]] — canonical). **Thammasat, BBA, Accounting major / Finance minor.** 6 exams 20–27 Sep. Classes end 11 Sep; **14–19 Sep is a free week and the spine of the plan.** ⛔ Only blocker: syllabi + textbook names.
- **FITNESS = #2, designed, starts now** ([[project-training-plan]]). Mon/Wed gym at Jetts Phayathai (on his Airport Link commute) + easy treadmill; Sat long run, Sun quality run — **both weekend mornings, never touching a study block.** Ramp: 3 runs/wk for 2 weeks, then 4. Maintain — don't build — until 27 Sep.
- **Reading — non-negotiable, he confirmed it survives exam season.** Two-track: **Siddhartha** (commutes + before sleep) and **Karamazov** (heavy, when it feels right). ⚠️ **SPOILER LINE: safe through Book 12 ch. 2 — nothing past it, and NO Epilogue.** Book 11 is now open ground. Frankl finished, still marinating — don't push it. Full detail: [[user-reading-list]].
- **รับน้อง CLOSED** ([[project-rubnong-tracker]], [[project-scene5-flashback]]) — archive with retro. Don't surface.
- **Bass PAUSED by his choice** — for fun only, no end goal, Module 3 shelved, instrument lent to a friend ([[project-bass-trainer]]). Don't push it.
- **coldesthoops PAUSED** (don't surface — [[project-coldesthoops]]). bluetooth-fix trashed.
- **Loose threads:** BBA camp (New Year, mountains, volunteering) — interview 25 Aug, he'll report if he makes the cut and says he needs no help for now. Basketball: 2 more games after 25 Aug, dates unknown. Semester end date unknown — lessons currently stop 11 Sep by his instruction.
