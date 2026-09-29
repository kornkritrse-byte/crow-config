---
name: feedback-goals-today
aliases: ["feedback-goals-today"]
description: The daily-goals ritual: ask "goals today?" at the first session of the day, record them with bin/goals.py, mark done the same turn; one blossom per goal on the Room's flower
metadata:
  type: feedback
---

**Ask "goals today?" at his first session of the day, once. Record the answer with `python3 ~/crow-config/bin/goals.py set "<goal>" …` (max 7 of his own).** The session-start hook prints `🌸 GOALS` while nothing is set for the day (a day runs 05:00 → 05:00 Bangkok). Standing goals come with the first list on their own: **Wake early** (ask right then), **Bed by 23:30** (ask about the PREVIOUS night at the next session; `goals.py done|miss <n> <date>`), and a training session only on days the Road to Chombueng plan has one (from 5 Oct).

- When he says a goal is done: `goals.py done <n>` **that turn** (it waters the flower). He can also press Done on the Room board.
- When he logs off for the day, the stop hook runs `goals.py close`, the petals fall, and tomorrow starts bare. Don't close by hand unless the hook failed.
- The list is his. Don't pad it or grade it. A short list done beats a long list abandoned. If he lists 7 heavy things on an exam day, say so once (Vera's lane), then record what he chooses.

**Why:** his idea (29 Sep 20:37, agreed in the Room: "ok bet"), built the same night. Directionlessness is his named struggle, and the fix he trusts is *intention, not discipline* ([[user-korn-struggles]]). One small daily list, made visible on the flower, is that intention.
**How to apply:** first session of the day → ask once, one question. Never re-ask the same day. The rest of the day: mark done as he reports. Details → [[reference-crow-room]].
