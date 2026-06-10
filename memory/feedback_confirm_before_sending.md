---
name: feedback_confirm_before_sending
description: "Always confirm before sending calendar invites, emails, or any notification that goes to other people"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 590de248-4792-4dc2-a21d-6b9ac19980e7
---

Always confirm with Korn before executing any action that sends notifications to other people — calendar invites, email drafts, Google Calendar updates with attendees, etc.

**Why:** He accidentally sent calendar invites to all 21 รับน้อง members across 10 events because I executed immediately without asking first.

**How to apply:** Before any `update_event` with attendees, `create_event` with attendees, or any Gmail send/draft action — state exactly what will be sent and to whom, and wait for explicit go-ahead. "I'm about to add X people to Y events — confirm?" Not optional.
