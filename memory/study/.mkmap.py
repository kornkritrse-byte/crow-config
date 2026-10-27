import json
D="/Users/kornkrit/.claude/projects/-Users-kornkrit-crow-config/memory/study/"
def build(fname, root_text, legend, topics, extras):
    nodes, edges = [], []
    H, GAP, y = 170, 30, 0
    nodes.append({"id":"legend","type":"text","x":0,"y":-280,"width":460,"height":210,"text":legend})
    for tid, ttext, tcol, subs in topics:
        start = y
        for i, s in enumerate(subs):
            sid = f"{tid}s{i+1}"
            h = max(H, 30*(s.count("\n")+1) + 40 + 10*(len(s)//60))
            nodes.append({"id":sid,"type":"text","text":s,"x":900,"y":y,"width":460,"height":h})
            edges.append({"id":f"e{tid}{sid}","fromNode":tid,"fromSide":"right","toNode":sid,"toSide":"left"})
            y += h + GAP
        n = {"id":tid,"type":"text","text":ttext,"x":400,"y":(start+y-GAP)//2-80,"width":380,"height":160}
        if tcol: n["color"] = tcol
        nodes.append(n)
        edges.append({"id":f"eroot{tid}","fromNode":"root","fromSide":"right","toNode":tid,"toSide":"left"})
        y += 120
    mid = y//2
    nodes.append({"id":"root","type":"text","x":-80,"y":mid-150,"width":400,"height":280,"text":root_text})
    oy = mid+170
    for i,(eid, etext, ecol) in enumerate(extras):
        n={"id":eid,"type":"text","x":-80,"y":oy,"width":400,"height":260,"text":etext}
        if ecol: n["color"]=ecol
        nodes.append(n); edges.append({"id":"eroot"+eid,"fromNode":"root" if i==0 else extras[i-1][0],"fromSide":"bottom","toNode":eid,"toSide":"top"})
        oy += 290
    subj=fname.split()[0]
    nodes.append({"id":"outline","type":"file","file":f"study/outlines/{subj} Course Outline.pdf","x":-700,"y":mid-350,"width":520,"height":680})
    edges.append({"id":"eoutline","fromNode":"outline","fromSide":"right","toNode":"root","toSide":"left","label":"source"})
    nodes.append({"id":"outlinecap","type":"text","text":"**Main course outline**\nwhat this map was built against","x":-700,"y":mid-460,"width":520,"height":90})
    json.dump({"nodes":nodes,"edges":edges}, open(D+fname,"w"), indent="\t", ensure_ascii=False)
    print(fname, len(nodes), len(edges))

LEG_BA = "**Legend**\n🟩 done · 🟨 now · ⬜ taught, not studied · 🟥 not taught yet · 🟧 shaky (see the ⚠ line)\nBuilt from the COURSE OUTLINE only (27 Oct). Leaves fill in as Korn sends each lecture's slides.\n📥 Slides in: L8 · L9 (27 Oct) · 🎥 audio: L8–L11 downloading, transcripts pending\nFiles: `~/Desktop/BA202/final/`\nEvery tax answers 5 questions: who pays · on what · how much · who's exempt · when/how it's filed"
build("BA202 Final Map.canvas",
 "# BA202 Final\n**55%** of the grade · **Tue 8 Dec, 09:00–12:00**\nLectures 8–15 · his section 026401 = Wednesdays 09–12\nMidterm style: MCQ with 'which is NOT' stems; A4 sheet allowed\nLesson from M1: find out what's ON the paper before drilling",
 LEG_BA,
 [("l8","## L8 · Inheritance Tax (IHT)\nWed 30 Sep · Inheritance Tax Act B.E. 2558 (2015), in force 2 Feb 2016\n📥 slides: main (81 pp) + examples (21 pp, image-only)",None,[
    "**Who's in scope (s.11): three groups**\n① Thai nationality, incl. Thai juristic persons (registered in TH · >50% Thai shareholders · >50% Thai management)\n② non-Thai with a domicile in Thailand, wherever the asset is\n③ non-Thai receiving an asset SITUATED in Thailand\nthe RECIPIENT pays",
    "**What's taxed + how it's valued (s.12, s.15)**\nimmovable property · listed securities · deposits / money · registered vehicles · others by Royal Decree\nvalue ON THE DATE RECEIVED: land = Land Code appraisal − third-party rights · listed shares = SET closing price that day · foreign currency at the Revenue Dept rate\nthen minus the liabilities taken on with it",
    "**How much + procedure**\nonly the part ABOVE THB 100M is taxed (s.12)\n⬜ rates, reductions, exemptions, filing deadline = IMAGE slides → read in the study block\ntaxpayer: calculate → file → pay · authority: audit → collect (sanctions) → refund · appeals → Tax Court\nhistory: in 2476, repealed 2487, back via the 2015 Act"]),
  ("l9","## L9 · Land & Building Tax + Signboard Tax\nWed 7 Oct · 📥 slides: L&B (74 pp) · signboard (55 pp) + example (14 pp, image-only)",None,[
    "**Land & Building Tax** (Act B.E. 2562 / 2019) · collected by the LOCAL government\ntax = pre-assessed (appraised) value × actual rate\nuse categories + ceilings: agriculture max 0.15% · residential · other max 1.2% · empty/unused max 1.2%, +0.3% every 3 vacant years, cap 3%\nmixed use → tax in proportion · taxpayer = owner OR possessor (น.ส.3)\nassessment form within FEB · pay within APRIL · refund claim within 3 years\n⬜ residential rates + exemptions = image slides",
    "**Signboard Tax** (Act B.E. 2510 / 1967, amended 2534 / 1991) · local authorities, Ministry of Interior\ntaxed: signs for running a business or advertising · 13 exemptions\n⬜ sign types, rates, the 13 exemptions = image slides + the example set"]),
  ("l10","## L10 · Indirect taxes overview + VAT\nWed 14 Oct · Revenue Code Ch. 4",None,[
    "**Indirect tax: the frame**\ncollected along the chain, borne by the customer · how it differs from direct tax",
    "**VAT**\nsale of goods, services, imports · collected at every stage · output tax − input tax\n⬜ registration, rates, 0% vs exempt: waiting for the slides"]),
  ("l11","## L11 · Specific Business Tax (SBT)\nWed 21 Oct · Revenue Code Ch. 5",None,[
    "**SBT**\nnamed businesses instead of VAT: banking/finance, selling immovable property…\n⬜ which businesses, rates, SBT vs VAT trap: waiting for the slides"]),
  ("l12","## L12 · Excise Duty\nWed 28 Oct (TOMORROW)","1",[
    "**Excise**\ngoods/services with health, social or environmental harm (alcohol, tobacco, sugar drinks…)\n⬜ how it's calculated: after class"]),
  ("l13","## L13 · Customs Duty + Special privileges I\nWed 4 Nov · Customs Act B.E. 2560 (2017)","1",[
    "**Customs duty**\nimports and exports",
    "**Special privileges (Part I)**\ninvestment laws (BOI) · GSP · FTAs · ASEAN · EU customs union"]),
  ("l14","## L14 · Special privileges II + Stamp Duty I\nWed 11 Nov · Revenue Code Ch. 6","1",[
    "**Special privileges (Part II)**",
    "**Stamp duty (Part I)**\ntax on certain legal instruments (contracts, leases, cheques…)"]),
  ("l15","## L15 · Stamp Duty II + wrap-up\nWed 18 Nov","1",[
    "**Stamp duty (Part II)**",
    "**Wrap-up**\ntaxation over the business life cycle · tax ethics · current issues (if time allows)"]),
 ],
 [("carry","⚠ **Maybe carried over from the midterm**\npetroleum income tax · special regimes (SME, BOI, DTAs) = L6–L7\nshe ran ~1 session behind before the midterm\n→ were they ON the midterm? If not, they may land here. Ask Korn.","2"),
  ("res","**Resources**\nDrive (a senior's, in `~/Desktop/pastpapers/BA202/`):\n· `Tax_Final.pdf` = a senior's FINAL cheat sheet (IHT, L&B…)\n· `Taxation SheetCheat.pdf` = the indirect-tax half\nNo past final PAPER in the folder.\nHer slides: Google Classroom → Korn sends them","5")])

LEG_AC = "**Legend**\n🟩 done · 🟨 now · ⬜ taught, not studied · 🟥 not taught yet · 🟪 midterm scope (in only if cumulative) · 🟧 shaky\nBuilt from the COURSE OUTLINE (27 Oct). Updated as material lands.\nH = Horngren 17e · M = Monvika 10e (Thai)"
build("AC313 Final Map.canvas",
 "# AC313 Final\n40% · **Mon 23 Nov, 09:00–12:00**\nTHE FIRST FINAL of the window (27 days)\nScope isn't stated in the outline: assume sessions 8–15 (guess, ask her)\nQuizzes & assignments = 20%",
 LEG_AC,
 [("oh","## Overhead allocation\nsessions 8–9 (28 Sep, 5 Oct) · H Ch 5 · M Ch 4",None,[
    "**Plantwide rate**\none rate for the whole factory",
    "**Departmental rates**\none rate per department, each on its own driver",
    "**Activity-based costing (ABC)**\ncost pools → drivers → products · who's under- or over-costed\nPast: 2021 final Q2 (undercosting)"]),
  ("sd","## Support-department costs\nsession 10 (12 Oct) · H Ch 16 · M Ch 5",None,[
    "**Direct method**\nignore support-to-support services",
    "**Step-down method**\nthe order you allocate in changes the answer",
    "**Reciprocal method**\nsimultaneous equations: full support-to-support"]),
  ("va","## Variable vs absorption costing\nsession 11 (19 Oct) · H Ch 9 · M Ch 8",None,[
    "**What goes into product cost**\nthe whole difference = fixed MOH",
    "**Why the profits differ**\nchange in inventory × fixed MOH per unit · reconcile the two"]),
  ("sc","## Standard costing & variances\nsessions 12–15 (26 Oct → 16 Nov) · BEING TAUGHT\nH Ch 7–8 · M Ch 7\n4 of the 8 sessions → probably the biggest share (guess)","3",[
    "**Materials**\nprice · quantity (efficiency) · **mix & yield**\nPast: 2021 final Q3 (standard costing)",
    "**Labour**\nrate · efficiency",
    "**Manufacturing overhead**\nvariable: spending · efficiency\nfixed: spending (budget) · production-volume"]),
  ("mt","## Midterm scope (sessions 1–7)\nfundamentals · job order · process costing · joint & byproducts\nin the final ONLY if it's cumulative → ask","6",[]),
 ],
 [("res","**Resources**\nDrive (a senior's, in `~/Desktop/pastpapers/AC313/`):\n· `AC313 Final2021.pdf` = 45 pages of screenshots of the 2021 ONLINE final (MCQ, 2 points each) + a worked copy\n  ⚠ no OCR on the Mac → Crow reads it page by page when we study\n· old AC203 midterm (AC203 = AC313's old code)\nOn disk: Course Package 1 only (midterm half). Package 2 = not yet","5")])
