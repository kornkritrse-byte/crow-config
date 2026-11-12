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

**Setup:** `~/Desktop/conlaw/` (mp3s, dl.sh, prompt.txt = slide vocabulary for whisper --prompt, test/). Models: turbo (have) vs Thonburian large-v3 q5_0 (`~/thonburian-large-v3-q5_0.bin`, Thai-tuned, from Freitag621) vs ggml-large-v3-q5_0. Bake-off SKIPPED (his call 20:38): full run on Thonburian, launched 20:38 via go.sh → run.sh (resumable; out/ holds .srt+.txt, progress.txt). If the battery dies, he plugs in and run.sh resumes.

**Decisions:**
- 20:36, his call: **V2 FAST = parallel agents, one per tape**, then a final consistency pass by Crow (he accepted the extra usage cost).
- Mark unclear audio `[ไม่ชัด]`, don't guess. Fix terms/names/section numbers against the slides.
- The full run needs the Mac plugged in with the lid open (it was on battery at 93% at 20:33).

**Promised:** V1 ~Thu 12 Nov afternoon. V2 the same day as V1 (fast path).

**21:50 MEASURED (on battery):** turbo = 600 s sample in 350 s (1.7×), Thai poor (ทฤษฎี→ธิศดี, กฎหมาย→กฎมารถ, เลือกตั้ง→เรื่องตั้ง). Thonburian = 35 min of tape 1 in 66 min (0.5×); first 12 min good Thai, then a 20+ min hallucination loop (no timestamps, 30 s blocks). Run KILLED, log in `bad/`. All 12 mp3s downloaded and complete. Local Mac can't do 'very accurate' in a day → options put to him: cloud Thai ASR vs slow local.
**22:25:** no cloud keys on the Mac → asked him for a free Gemini API key (aistudio.google.com) tomorrow; he said "do whatever you need" (taken as OK to upload; friend should know free tier may train on it). VAD test = better Thai (ทฤษฎี, ศาลรัฐธรรมนูญ right) but 0.28× real-time, killed. Overnight: run.sh on Thonburian with `-mc 0 --suppress-regex "ysocial|ZOOM|LINE"` (no VAD), ~0.5× → expect tapes 1–2 by morning. Plan: Gemini for the rest; compare on tape 1.

**12 Nov 10:15:** Gemini via the **Interactions API** (`POST v1beta/interactions`, model `gemini-3.5-transcribe`; generateContent 404s for new users, Pro = 0/day free, flash models 503 under load). 10 min in 15 s, Thai far better than local. Model ignores timestamp instructions → `trall.py` cuts each tape into ~3-min chunks at silences (plan in gem/plan.json), 4 workers, resumable (gem/conNN/NNN.txt). Local whisper stopped; tape-1 Thonburian output kept in out/ as a backup.
**12 Nov 10:30 — FREE TIER WALL:** gemini-3.5-transcribe free = 3 req/min, 10k input tokens/min, **25 requests/day** → stopped at 21/643 chunks (tape 1, first ~63 min done, saved in gem/con01/). Total audio = 31.9 h. Paid price (aistudio pricing page): ~$0.005/min blended → ~$10–12 for everything (~350–420 baht). Needs billing turned on for the key's AI Studio project (his card; his call). trall.py resumes where it stopped.

**12 Nov 13:20 — V1 DONE, V2 launched.** All 190 pieces finished via the Flash-lite rotation (free tier, no billing needed). V1 assembled: `~/Desktop/conlaw/V1_full.md` (1 file, continuous global timeline across all 12 tapes, 31:56:11 total) + `v1_per_tape/con01.md`…`con12.md` (same content split per tape). Cleaned: inter-syllable spaces removed, silence runs collapsed to `[เงียบ]`, timestamps converted to global HH:MM:SS. V2: 12 parallel agents launched, one per tape, each reading its `v1_per_tape/conNN.md` + the glossary (`prompt.txt`), writing a rewritten book-style chapter to `v2_chapters/conNN.md`. Once all 12 report back: read each chapter, do one consistency pass (terms/headings), concatenate into `V2_full.md`, then upload both V1 and V2 to a Drive folder and send Korn the link.
