---
name: project-conlaw-transcription
description: "Transcription job for Korn's friend (Chula law): 12 Constitutional Law lecture tapes → V1 verbatim + V2 book-style, both Thai. Started 11 Nov 2026."
metadata:
  node_type: memory
  aliases:
    - project-conlaw-transcription
  type: project
  originSessionId: a99c06fb-9a0f-4043-adf9-7e4f34e7202b
  modified: 2026-11-11T13:37:06.554Z
---

**What:** Korn's friend (Chula law, unnamed) asked via Korn on 11 Nov 2026 at 20:28 for ALL 12 tapes of กฎหมายรัฐธรรมนูญ (อ.ดร.ทศพร แสนสวัสดิ์, ภาคต้น 2569) transcribed in Thai, "very accurate", in two versions:
1. **V1:** the lecturer's words kept as spoken, split per tape, on ONE continuous timeline (timestamps run on from tape 1 to tape 12).
2. **V2:** rewritten as an easy-to-read article/book.

**Source:** Drive folder "รวมเทป con" `1ic0fw1GB10EP-xYB_1aRhrAyggYq2QNE` (owner 6840004534@student.chula.ac.th), con 1 (6 Aug) … con 12 (5 Nov). Tape 1 = 2h22; total ~28–30 h (estimate). Slides for ภาค 1–3 were pasted into the Room 11 Nov (no ภาค 4 deck). On a slide: the exam is 4 questions × 25 points (อำนาจสถาปนา/แก้ไข · หลักการพื้นฐานของรธน.).

**Setup:** `~/Desktop/conlaw/` (mp3s, dl.sh, prompt.txt = slide vocabulary for whisper --prompt, test/). Models: turbo (have) vs Thonburian large-v3 q5_0 (`~/thonburian-large-v3-q5_0.bin`, Thai-tuned, from Freitag621) vs ggml-large-v3-q5_0. Bake-off on 10 min of tape 1 from 30:00 picks the model for the full run.

**Decisions:**
- 20:36, his call: **V2 FAST = parallel agents, one per tape**, then a final consistency pass by Crow (he accepted the extra usage cost).
- Mark unclear audio `[ไม่ชัด]`, don't guess. Fix terms/names/section numbers against the slides.
- The full run needs the Mac plugged in with the lid open (it was on battery at 93% at 20:33).

**Promised:** V1 ~Thu 12 Nov afternoon. V2 the same day as V1 (fast path).
