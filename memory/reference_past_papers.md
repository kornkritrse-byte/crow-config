---
name: reference-past-papers
description: "The senior-run Google Drive of past papers per subject (FN201, AC311, BA202, MK201 + 16 more); folder IDs, how to pull files, and what's in FN201/AC311"
metadata:
  node_type: memory
  aliases:
    - reference-past-papers
  type: reference
  originSessionId: eff4881b-9229-4220-9589-327f827d33a0
  modified: 2026-10-27T02:41:39.143Z
---

Shared by Korn 27 Oct 2026. Root folder `1TsdCgUxdoeHZUc3wZ8PDZG1bzdwaModm` (uploaded by teerachart_thu67, a senior). One subfolder per course code.
- List: `mcp__google-docs__listFolderContents` works on it. Download: the OAuth token in `~/.google/` (refresh → `drive/v3/files/<ID>?alt=media`), same as [[reference-lecture-transcription]].
- Local copies: `~/Desktop/pastpapers/<COURSE>/`.
- Subfolder IDs: FN201 `1-r9FqXii9od7gTFimAVqyprspVj9TxYB` · AC311 `1-GXRxeoJq3bK_fWNo7dPYEuQuzVgswjP` · BA202 `1mTjXHq-iI-ref4eQoL24y__4ML0z09Cc` · MK201 `1-GIfdDWOSSFfJFvO9zggFSO486-x9J3r` · AC313 `1PkrjmJfe51g-pFtNXIV1aXAuXtH5AX-r` (others: list the root).

**FN201:** mostly midterm stuff, but two Obrom FINALS sit under misleading names: `solution.pdf` = 1st/2021 final (26 Qs) and `solution copy c.pdf` = Summer/2019 final (32 Qs; its font is broken, so decode the pdftotext output by adding 29 to each character code). ⚠️ Both are a student's MARKED copies, not an official key: some picks carry ✗. Their per-topic counts are on [[FN201 Final Map]]. The headline: topic 7 (sources of funds, self-study, no STQ) is heavy on both papers, and topic 6 is absent from both.

**AC311:** `real mid2 exam.pdf` (11 pp, annotated) · `summary mid2.pdf` (9 pp, PPE onward) · `final 2021.pdf` · `2020 Midterm exam problems` · `AC311-2021-2-BBA-Midterm-Exam` · `Practice Exercise - Key` · `AC311 Notebook พี่รุ่น26`. The mid2 ones go straight into [[AC311 Midterm 2 Map]] prep. The scope year may differ, so check it against sessions 8–11.

**BA202:** `Tax_Final.pdf` + `Taxation SheetCheat.pdf` = a senior's final cheat sheets (IHT, L&B, indirect taxes), NOT papers. No past final paper. **AC313:** `_AC313 Final2021.pdf` = 45 pp of screenshots of the 2021 online MCQ final (2 pts each) + a worked copy (ทำแล้ว); AC203 = AC313's old code. No OCR on the Mac (no tesseract), so read the pages as images. Maps: [[BA202 Final Map]] · [[AC313 Final Map]].


**AC311 `real mid2 exam.pdf` (2021), fully worked 4 Nov 2026 into the Notion study page (section 10).** The senior's annotations are WRONG on: Q1 (picked 4; the false one is 2, ARO at PV) · Q2 (1,825,000; the right answer is 1,368,750, 9/12 part year) · Q5 (34,907; the right answer is 36,389 = dep 34,097 + interest 2,292) · P1 rate (blended 5.7% incl. the specific loan) · P2 sale (Cr Building 12,375,000 + gain 3,500,000; the right entry is Cr Building 12,750,000 + gain 3,125,000, plus surplus 2,900,000 → RE). Q9 is uncertain (20,000 vs 37,000, depending on whether goodwill counts). Q10's options assume a full-year franchise (542,000; strictly 517,000). `summary mid2.pdf` (2021) lists investment property under mid2; in 2026 IP is in the final.

**AC311 `final 2021.pdf` (Dec 2021), read 7 Nov 2026: impairment is IN it, and that's Mid2 scope this year.** Part 1 MCQ Q1–Q5 = TAS 36 (CGU def → D; false = 'VIU is the value of future cash flows' (missing PRESENT); true = 'RA well above CA → no re-estimate if nothing changed'; Q4 none (CA 25.5M vs RA 26M); Q5 1,500,000). Parts 2–3 = conceptual framework T/F + matching (not Mid2). **Part 4 P1 (25 pts)**: cost 11,400,000/12 yrs, impaired end 20X1 (RA 8,925,000 → loss 575,000), dep 892,500, end 20X3 RA 7,000,000 vs CA 7,140,000 = FURTHER loss 140,000 (trap: the question says 'record/reverse'). **P2 (35 pts)**: cost 8,500,000/10 yrs, reval 31 Dec 20X1 to 7,200,000 (elimination, surplus 400,000, transfer 50,000/yr), 20X4 RA 3,500,000 (surplus 250,000 first + P&L 750,000), 20X5 RA 4,600,000 (P&L reversal 600,000 = 750,000 × 4/5, surplus 1,200,000; Crow's working, no official key). Pages 1–9 of the PDF seen; Q1–Q5 MCQ only of Part 1 read.
