---
name: reference-upcoming-events
description: Dated event list that feeds the session-start banner (closest upcoming event + camp countdown). NOT live calendar data — update this file whenever calendar events are created/changed in-session.
metadata: 
  node_type: memory
  type: reference
  originSessionId: c38e29c0-da2f-4906-8e70-a7a356ec2563
---

# Upcoming Events (feeds the session-start banner)

**Maintenance rule (Crow):** whenever an event is created, moved, or cancelled in Google Calendar during a session, mirror it here. The banner only knows what this file knows. Past dates are ignored by the hook — prune them when convenient. Format is one event per line, `YYYY-MM-DD | title` (the hook greps for date-prefixed lines; camp countdown is hardcoded to 2026-07-25 in the hook itself).

2026-08-25 | BBA Camp Interview 10:10–10:40 (overlaps MK201) + FN201 Assignment #1 13:00–13:45 + BA202 PIT 13:45–17:00 @ campus library + Basketball game 18:30–19:45 @ uni (Tha Prachan)
2026-08-26 | FN201 Assignment #1 DUE (by 13:00 if Group 1 / 09:00 if Group 2)
2026-09-16 | FN201 GROUP ASSIGNMENT DUE — 15%, inside the crunch week
2026-08-27 | 5k TIME TRIAL 06:30 — real baseline (MOVED from Sat 29: night out Friday)
2026-09-20 | MIDTERM 1: MK201 Marketing 13:00–16:00
2026-09-22 | MIDTERM 2: AC313 Cost Accounting 09:00–12:00
2026-09-23 | MIDTERM 3: FN201 Business Finance 09:00–11:30
2026-09-25 | MIDTERM 4: EL221 Communicative English 09:00–12:00
2026-09-26 | MIDTERM 5: AC311 Intermediate Accounting 09:00–12:00
2026-09-27 | MIDTERM 6: BA202 Taxation 09:00–12:00
2026-12-13 | 🏁 10K RACE — Samitivej hospital event (register 04:00, GUN 05:00, venue TBC). Target 48:00.

*(รับน้อง camp CLOSED — ran 25–27 Jul 2026. July events pruned 23 Aug; retro in [[project-rubnong-tracker]].)*
*(Class lessons are on the Life calendar as weekly recurring, grey/Graphite — intentionally NOT mirrored here, same reason as training.)*
*(Basketball: 2 more games after 25 Aug, dates unknown — add when he names them.)*

*(Training sessions — 4/wk gym+runs on the Life calendar, [[project-training-plan]] — are intentionally NOT mirrored here; they're routine and would flood the "what's next" banner. Only mirror real commitments/deadlines.)*
