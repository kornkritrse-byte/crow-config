---
name: feedback_confirm_before_sending
description: "Always confirm before sending calendar invites, emails, or any notification that goes to other people"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 590de248-4792-4dc2-a21d-6b9ac19980e7
---

DEFAULT = never send invites/notifications to other people. Not "confirm first" — just don't, unless Korn explicitly asks (his words 2026-07-03: "no sending invites unless I say so, which is probably once in a blue moon").

**Why:** He accidentally sent calendar invites to all 21 รับน้อง members across 10 events because I executed immediately without asking first. He's since made it a hard standing rule: adding an event that mentions another person (e.g. "bouldering with Lita") means it goes on HIS calendar only — no attendee, no invite.

**How to apply:** Never add `attendees`/`attendeeEmails` to `create_event`/`update_event`, and never send/draft Gmail, unless he says so in that message. A title naming someone is NOT a request to invite them. Always `notificationLevel: NONE`. On the rare occasion he does ask to send, state exactly what goes to whom and get explicit go-ahead first.
