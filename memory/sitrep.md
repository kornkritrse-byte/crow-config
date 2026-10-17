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
*Last updated: 2026-10-16 22:35 (day-end verify + flush). Window holds 17 Oct + 16 Oct; 7 Oct + 4 Oct + the flood/midterms sections flushed to [[sessions-log]] 16 Oct. 8 Oct flushed 17 Oct. Next to flush: 16 Oct.*

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
- 🚪 **HERE (Sat 17 Oct, 07:33) — back; ask-on-return items below still open until answered.** Was: AWAY (Fri 16 Oct, ~22:33) — off to: bed. Tomorrow AM: easy Zone 2 run talking Karamazov with the 'Zone 2 Book Runs' project (voice), then coffee; later driving grandma to a funeral in the countryside → AC311 in a café. STILL OPEN: his NEW PROJECT idea ("will tell tmr") · AC311 Midterm 2 date + what he didn't recognise in session 8 · sub auto-renew (decided keep, action open, before 22 Oct; one mention max).**
  - Also still open (low-stakes): Siddhartha or Winter? · Klao practice recordings · the racing question for grandpa (unhurried) · race venue/bib pickup (dad) · commonplace book → he has a PHYSICAL one now (7 Oct); `~/Korn/` = book-conversation notes only.

## Session — 2026-10-17 (Sat)
- Asleep 22:56, up 06:00 (wake + bed ✓). Zone 2 book run done: 35′ recovery + 4 strides, Karamazov by voice. The 'For Crow:' summary closed Katya (he got the Ivan trigger himself); his insight: **active love → active responsibility**. Crow's counter (where the guilt can GO) is in the brief → [[chapters]] material. He needs to re-upload the refreshed brief to the claude.ai Project.
- **Gym membership CANCELLED, his call** → home strength Mon+Sat → [[project-training-plan]]; calendar event renamed (no emoji, his ask). First home session tonight after AC311 → ledger.
- Afternoon: grandma (not grandpa) to a countryside funeral; AC311 there. Own goal: AC311 only.

## Session — 2026-10-16 (Fri; first since 8 Oct)
- Came back after 8 days, "don't worry, been sticking to my schedules" unprompted. Entropy explained. 8 Oct run ledger [x]. Goals: wake (~07:00) · writing · moving · journal · reading all ✓; no own goals. Grandpa just had eye surgery (doctor visit with mom).
- **5K TT: 3.51 km @ 4:15 then stopped** (Bangkok, Pattaya didn't happen) = pacing failure; 30+ km weeks ×2; **new Garmin FR165**, VO2max 55 not trusted; ran Garmin's 30′ @ 5:30 on a plan off-day → plan decides the day → [[project-training-plan]].
- **17:25 named his pattern himself:** interests dressed up as progress since midterms → "disillusionment from a flawed perspective" → [[chapters]]. Study re-entry Sat 17 (AC311 first, M2 30% date unconfirmed) → ledger.
- Karamazov through **Book 12 ch 10**: Katya read flipped to "planned"; my counter left open (title, ch 4 self-shaming, Ivan).
- Built **Zone 2 Book Runs** (claude.ai Project, voice while running: talking keeps Z2): instructions `briefs/zone2-book-runs.md` + files CROW.md + `briefs/korn-reader.md`. Refresh when the book moves.
- Claude sub: decided KEEP, action pending (ends 22 Oct). Sol name kept. He liked the crew talking again → [[feedback-crew-voices]].

## 🎓 Midterms 1: DONE (all 6 sat by 4 Oct) → [[project-midterms]]. Finals carry-over lives there. **AC311 Midterm 2 (sessions 8–11, PPE + intangibles, 30%) is next: date unconfirmed.**

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
- 📖 **Siddhartha: he's at Kamala. ⛔ No spoilers past Kamala.** Karamazov: safe through **Book 12 ch 10**, **no verdict, no Epilogue**.
- Unanswered and low-stakes: BA202 cold-question numbers (2 Sep) · AC311 slide 9 cranes vs software · FCF drill ↔ hub link.
- BBA camp (New Year, mountains): interviewed 25 Aug, he'll report if he makes the cut. Basketball: 2 more games, dates unknown.
- 📌 After midterms: "make Obsidian cool" → [[reference-obsidian]].
- ⚠️ **My own error log moved to [[crow-error-log]]. The shape keeps repeating: check the record before asserting.**
