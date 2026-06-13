---
name: project-rclone-drive
description: rclone is set up for automatic Google Drive uploads — coldesthoops videos auto-upload to the youtube folder
metadata: 
  node_type: memory
  type: project
  originSessionId: a2cf005e-c6ea-436f-9941-c45d762bedc9
---

rclone (v1.74.3, installed via winget, at `C:\Users\Korn\AppData\Local\Microsoft\WinGet\Links\rclone.exe`) is configured with a Google Drive remote named **`gdrive`** (full `drive` scope, account kornkritrse@gmail.com). Set up 2026-06-13.

**Upload a file to the YouTube folder:** `rclone copy "path\to\file" gdrive:youtube`
- The `youtube` folder lives at My Drive root (id `1Coquag1-lWBbTKm2guLZI1ZicgdSOaPa`).
- Token auto-refreshes; no re-login needed. Config at `C:\Users\Korn\AppData\Roaming\rclone\rclone.conf`.

**Auto-upload is wired into the coldesthoops pipeline** ([[project-coldesthoops]]): `build_video.ps1` now has a Step 6 that runs `rclone copy` of the final mp4 into `gdrive:youtube` automatically at the end of every build. No manual upload step anymore.

**Why:** MCP Drive tools can't upload large binaries (35MB video = ~47M base64 chars, blows past limits). rclone is the working path for any local→Drive file transfer.

**How to apply:** To upload anything to his Drive, use `rclone copy ... gdrive:<folder>`. Remember to load PATH first in a fresh shell: `$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")`.
