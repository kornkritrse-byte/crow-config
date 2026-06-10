---
name: project-coldesthoops
description: "YouTube Shorts channel coldesthoops — basketball ranking videos, pipeline fully built and working"
metadata: 
  node_type: memory
  type: project
  originSessionId: 820c277a-b34b-4f73-b380-c98c3ffa5010
---

YouTube Shorts channel named **coldesthoops** — basketball ranking videos, faceless format.

**Pipeline is complete and reusable.** Script lives at:
`C:\Users\Korn\Downloads\build_video.ps1`

To make a new video, only edit the CONFIG block at the top of the script:
- `$VIDEO_NAME` — output folder and filename
- `$HEADING_LINE1` / `$HEADING_LINE2` — title overlay text
- `$CLIPS` array — keyword to find file in Downloads, start timestamp, duration, label

**Tools installed:** yt-dlp (`Downloads\yt-dlp.exe`), FFmpeg (via winget)

**Download clips:** use yt-dlp from PowerShell — `cd Downloads; .\yt-dlp.exe -f "best[height<=1080]" "URL"`

**Layout format:** portrait 9:16, ranking list on left side (5 items spread full middle), active rank highlighted yellow, revealed ranks dimmed with label, title with black bar background. Inspired by reference Shorts layout with left-side numbered list.

**Technical note:** drawtext filter crashes (fontconfig segfault) — use .NET System.Drawing PNG overlays instead. Never set FONTCONFIG_FILE env var.

**Quality upgrades applied 2026-06-03:**
- Download with `--js-runtimes node` for higher res (720p where available)
- Pre-trim clips with ffmpeg before passing to script, set start=0:00 in config
- CRF lowered to 18, preset slow for better encode quality
- Lanczos upscaling: `scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos`
- For dual-segment clips: cut both parts, concat with ffmpeg into one file first

**Workflow system (agreed 2026-06-03):**
1. He asks for topic suggestions → picks what he likes
2. Ask for specific moments/plays per rank → he finds on YouTube
3. He sends links + timestamps as `x:xx - x:xx` → download, pre-trim, build

**Niche confirmed 2026-06-04:** Sticking with basketball/hoops. Considered going broad (history, random facts) but decided the existing brand and pipeline are worth keeping. Saturation in broad content was the deciding factor.

**Why:** Efficiency project, not a passion project. He's following a trend to see where it goes. Goal is passive — max 15 minutes per video, quantity over perfection, improve as he goes.

**How to apply:** Go straight to topic suggestions when he's ready to build. Don't re-explain the pipeline. Don't treat this like a passion project — treat it like a machine to keep running lean.
