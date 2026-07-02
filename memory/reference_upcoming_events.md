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

2026-07-05 | DEADLINE: Dialoge scene 5
2026-07-06 | P'san c P'group 12–17
2026-07-07 | Prop Building day (+ possible hoops interview 13–16 — collision unresolved)
2026-07-08 | Play Runthrough (all day) + ANS Dinner 19–22
2026-07-10 | Play Runthrough
2026-07-13 | Workshop 12–17
2026-07-15 | Final Rehearsal 11–18
2026-07-16 | Final Rehearsal 11–18
2026-07-21 | Final Rehearsal 11–18
2026-07-22 | Final Rehearsal 11–18
2026-07-25 | CAMP Day 1 — รับน้อง 25–27 Jul

*(Bass show with friends: date unknown — add when he names it.)*
