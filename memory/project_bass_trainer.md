---
name: project-bass-trainer
description: Bass practice website built for Korn — fretboard note trainer + improv lab
metadata: 
  node_type: memory
  type: project
  originSessionId: a2cf005e-c6ea-436f-9941-c45d762bedc9
---

Bass practice website at `C:\Users\Korn\bass-trainer\` (plain HTML, open in browser, no server). Built 2026-06-13.

**CRITICAL CONTEXT:** Korn reads **tabs and chord names, NOT standard music notation**. Sheet-music/staff tools are useless to him — a staff-reading version was built and scrapped. His weak spot is note names on the **E and A strings** (he knows D and G fine). His 3 goals: (1) know notes on bottom 2 strings, (2) improvise over chords, (3) learn shapes/tricks/theory.

- **Module 1 — `index.html`** (Fretboard Trainer): names notes by fretboard POSITION. Identify mode (dot lights → name note) + Find-all mode (given a note → click every spot it lives 0-12). E & A default, sharps toggle.
- **Module 2 — `improv.html`** (Improv Lab): chord progression plays with Web Audio backing (metronome + chord pad), fretboard lights chord tones color-coded (R=orange/3=green/5=blue/7=purple) + scale tones grey. He solos on real bass over it.
- **Module 3 — NOT built yet:** movable scale/arpeggio shapes + theory reference. The next piece when he wants it.

**How to apply:** When extending the trainer, keep it tab/chord-oriented, never notation. Module 3 is the open thread.
