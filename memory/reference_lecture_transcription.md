---
name: reference-lecture-transcription
description: Working pipeline for turning long lecture recordings into compressed notes — tooling, commands, gotchas. Built 2026-08-24 on the Mac.
metadata:
  node_type: memory
  type: reference
---

Built 2026-08-24 to solve Korn's real complaint: **course clips run 3–5 hrs per topic and are unusable as a primary path** ([[project-midterms]]). Reusable for any subject, any semester.

## Tooling — INSTALLED ON THE MAC, verified working
- **whisper-cpp** via Homebrew → binary is **`whisper-cli`** (NOT `whisper-cpp`). Metal-accelerated, fully offline — **nothing is uploaded anywhere**, which matters for someone else's lecture recordings.
- **ffmpeg** (Homebrew), **markitdown** ([[feedback-markitdown]]).
- **Model:** `ggml-large-v3-turbo.bin` (1.5 GB) from `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo.bin`
- ❌ **mlx-whisper does NOT work here** — the Mac only has Python 3.14 (Homebrew) and mlx has no 3.14 wheels. Don't retry it; use whisper-cli.

## Google Drive download (his lecture folders are shared Drive links)
Local OAuth creds at `~/.google/token.json` + `credentials.json` carry **full `auth/drive` scope**, so media download works:
1. POST the refresh_token to `https://oauth2.googleapis.com/token` → access_token.
2. `curl -sL -H "Authorization: Bearer $AT" "https://www.googleapis.com/drive/v3/files/<ID>?alt=media" -o out.mp4`
- Use `mcp__google-docs__listFolderContents` with the folder ID from the share URL to enumerate first.
- rclone is **NOT** on the Mac — that's the Windows laptop ([[project-rclone-drive]]).

## The pipeline
1. Download `.mp4` → **immediately strip to audio and delete the video**: `ffmpeg -i in.mp4 -vn -ac 1 -ar 16000 -c:a aac -b:a 32k out.m4a` (200–600 MB → ~40 MB).
2. whisper-cli needs **16 kHz mono WAV**, not m4a: `ffmpeg -i out.m4a -ac 1 -ar 16000 -c:a pcm_s16le out.wav`, then delete the wav after.
3. `whisper-cli -m ggml-large-v3-turbo.bin -f out.wav -l auto -pp -otxt -of out`

## Gotchas
- ⚠️ **`-l auto`, NEVER `-l en`.** His lectures are **mixed English/Thai** (his words: "mostly mixed majority in english but sometimes thai too"). Forcing English makes Whisper *translate* rather than transcribe, and it invents plausible-sounding tax terminology. **Always spot-check a Thai stretch**; re-run on full `large-v3` if turbo mangles it (turbo is weaker on low-resource languages).
- **Speed ≈ 6× real-time** on his Mac. ~8 hrs of lecture ≈ 85 min wall clock.
- 🔋 **CHECK POWER FIRST — `pmset -g batt`.** This job kills a battery. Tell him to plug in and **leave the lid open** (a closed lid sleeps a MacBook regardless of caffeinate, absent an external display).
- Arm sleep-prevention scoped to the job so it self-releases: `caffeinate -dimsu -w <pid>` — leaves no state to undo.
- Background jobs launched from the Bash tool get reparented and **survive the terminal closing** — safe to tell him to walk away.

## What the output is FOR
Transcript is the raw material, not the deliverable. **Deliverable = compressed structured notes + a COLD question set** (answers hidden) per lecture. His fear is comprehension, not coverage — consumption doesn't fix that, being wrong on problems does ([[project-midterms]]).
⚠️ **Not a licence to keep skipping.** Told him plainly: this is for the *backlog*. For lectures not yet given, attending is cheaper than transcribing — and a transcript can't answer a question he has.

## ⚡ FN201 CLIPS — use yt-dlp, NOT whisper (added 2026-08-27)
`yt-dlp` is **installed on the Mac** (brew). FN201's recorded lectures are **unlisted YouTube** videos on channel **Obrom Chaowalerd (@obromchaowalerd5981)** — the URLs come from MS Teams; the channel itself lists nothing.

**They carry auto-captions, so pulling the transcript takes seconds instead of hours:**
```
yt-dlp --skip-download --write-auto-subs --sub-langs en-orig "<url>"
```
**Always try this before reaching for whisper.** Whisper is only for recordings with no captions — e.g. the BA202 Drive recordings, which is what the pipeline below was built for.

⚠️ **A transcript is not the deck.** On 27 Aug I declared a BA202 coverage gap from audio alone and was wrong twice — the material was in a handout Korn already had. **Get the handout/slides before concluding anything is missing.**

## ⚠️ LAUNCH DETACHED — added 2026-09-17
The first whisper launch (both BA202 lectures) was **killed about one second in and produced nothing**, while the earlier ffmpeg extraction in the same session completed fine. Relaunching **detached** worked start to finish:
```
cd <dir> && nohup caffeinate -dimsu bash -c '<loop>' > _whisper_run.log 2>&1 &
```
**Use the `nohup` + own-logfile form for any whisper run.** It survives whatever killed the first one, and the log file lets progress be checked with `tail` instead of relying on the task output.
- 🧹 **The cleanup `rm` lives inside the script** — if the run is killed, the `.wav` files survive (595 MB for two 2h42 lectures). Check for strays afterwards.
- ⏱️ Real timing observed: **2h42 of audio ≈ 18 min wall clock** per lecture on his Mac (faster than the 6× estimate).
- 🔍 **ALWAYS spot-check the topic, not just the quality.** Keyword counts (`grep -oic`) across the full transcript identified in seconds that a file labelled "CIT Part I" was actually PIT deductions — see [[project-midterms]].
