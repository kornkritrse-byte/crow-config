# BA202 Four Sheets v3 — overlay patches on the v2 PDF (29 Sep 2026 audit).
# Each patch: page, x, y, w, h (pt), white-out flag, inner HTML.
import json

P = []
def patch(page, x, y, w, h, html, white=True, cls="", fs=None):
    P.append(dict(page=page, x=x, y=y, w=w, h=h, html=html, white=white, cls=cls, fs=fs))

# ---------------- PAGE 1: left column replaced ----------------
patch(1, 15, 36, 201, 550, """
<div class="box red"><div class="hd">New reflex answers · 29 Sep deck audit</div>
<table class="qa">
<tr><td>BOI activity groups?</td><td><b>4</b>: agri·bio·medical · advanced manufacturing · basic &amp; supporting · digital, creative &amp; high-value services. Electronics → <b>2</b></td></tr>
<tr><td>Non-listed co. gets a Thai dividend, holds 10%</td><td><b>HALF exempt</b>. Full needs ≥25% voting + no cross-holding + 3m before/after</td></tr>
<tr><td>CIT annual return</td><td><b>CIT 50 within 150 days</b> of period end · CIT 51 half-year: pay ½ est. tax within 2 months</td></tr>
<tr><td>Foreign airline carrying from TH</td><td>cat 3: <b>3% of GROSS</b> fares/freight (s.67)</td></tr>
<tr><td>Foundation running a business</td><td><b>2% or 10% of GROSS</b> receipts (unless on the s.47(7)(b) list)</td></tr>
<tr><td>JV vs consortium</td><td>JV (s.39, ≥1 juristic party) = <b>own TIN, CIT 50/51</b>, pays “dividends” · consortium = <b>no TIN</b>, each member files</td></tr>
<tr><td>Temple · cooperative</td><td>juristic (Sangha Act 2505 · Cooperative Act 2542) but <b>not prescribed → outside CIT</b></td></tr>
<tr><td>EEC flat PIT</td><td><b>17%</b> for qualified expats + Thai employees</td></tr>
<tr><td>EEC CIT exemption max</td><td><b>15 yrs</b> (longer than BOI)</td></tr>
<tr><td>Thailand's DTAs</td><td><b>61</b></td></tr>
<tr><td>M2 legal trigger</td><td>cats 2–8 <b>≥120,000</b> (law). Her slide 34: “evaluate only above 1.2m”</td></tr>
<tr><td>WHT sections (her slide)</td><td>50 rates · 51 certificate · <b>53 remit · 54 credit</b></td></tr>
<tr><td>Losses carried forward</td><td>CIT <b>5 yrs</b> · PITA <b>10 yrs</b></td></tr>
<tr><td>Global CIT rate trend</td><td><b>40% (1980) → 23% (2021)</b>: tax competition</td></tr>
</table></div>

<div class="box navy"><div class="hd">Compliance ≠ planning ≠ evasion (L1: “might be in your exam”)</div>
<b>Compliance</b>: follow the law, avoid civil + criminal sanctions. <b>Dispute settlement</b>: your right when the RD assesses more. <b>Planning</b> = <b>LEGAL</b> minimisation (exemptions, allowances, elections). <b>Evasion</b> = <span class="r"><b>ILLEGAL</b></span>: declaring less than you earned, booking fake expenses.
</div>

<div class="box"><div class="hd">CIT origins + numbers (CIT deck)</div>
<b>1799</b> UK income tax for the Napoleonic Wars · <b>1861</b> US, for the Civil War · <b>1894</b> US CIT struck down as unconstitutional · <b>1913</b> US CIT established · 20th c.: a major revenue source · 21st c.: international (BEPS, transparency, global minimum tax).<br>
<b>Thailand</b>: 1932 modern income tax → <b>Revenue Code 1938, in force 1 Apr 1939</b> → CIT cut <b>30% → 20%</b>; CIT now also used to support SMEs.<br>
<b>2024 revenue mix</b>: taxes on goods &amp; services <b>31.0%</b> (1st) · <b>CIT 24.1%</b> (2nd).<br>
<b>Whole process</b> (CIT + PIT): taxpayer's duties → RD's duties &amp; powers → administrative tribunal (internal) → Central Tax Court → Court of Appeal → Supreme Court.
</div>
""", fs=7.4)

# L8 row: "the 5 activity groups" -> 4
patch(1, 488.0, 399.4, 4.9, 9.9, "4", fs=7.8)

# ---------------- PAGE 6 ----------------
# s.52 -> s.53 in the WHT flow
patch(6, 530.6, 106.4, 15.4, 10.6, "<span class='mono9'>s.53</span>", fs=7.6)
# WHT rates box: her own table (PIT Part II slide 50)
patch(6, 422.8, 179.8, 200.5, 137.2, """
<div class="box" style="height:100%"><div class="hd">Her WHT table (PIT II slide 50) · her §: 50 rates · 51 cert · 53 remit · 54 credit</div>
<table class="t">
<tr class="th"><td>Payment</td><td>To individual</td><td>To company</td></tr>
<tr><td>Salary 40(1)</td><td>progressive ≤35%</td><td>–</td></tr>
<tr><td>Freelance / agent fee</td><td>progressive ≤35%</td><td class="n">3%</td></tr>
<tr><td>Service · professional fees</td><td class="n">3%</td><td class="n">3%</td></tr>
<tr><td>Advertising · transport</td><td class="n">2% · 1%</td><td class="n">2% · 1%</td></tr>
<tr><td>Rent · royalty (resident)</td><td class="n">5% · 3%</td><td class="n">5% · 3%</td></tr>
<tr><td>Interest (resident)</td><td class="n">15%</td><td class="n">1%</td></tr>
<tr><td>Dividend (any)</td><td class="n">10%</td><td class="n">10%</td></tr>
<tr><td>Non-resident service / interest / royalty</td><td class="n">15%</td><td class="n">15%</td></tr>
</table></div>
""", fs=7.1)
# Filing box rebuilt with her forms + refund
patch(6, 422.8, 489.5, 200.5, 91, """
<div class="box" style="height:100%"><div class="hd">Filing, refund, disputes (her PIT II slides 62–72)</div>
Tax year 1 Jan–31 Dec. <b>PND 90</b> (mixed income) / <b>PND 91</b> (40(1) only): file + pay <b>1 Jan–31 Mar</b> (s.56, 57; pay with the return). <b>PND 94</b>: half-year, 40(5)–(8), by <b>end Sept</b>. PND 95: foreigners with ROH privileges. Payer remits individual WHT on <b>PND 3</b>; CIT cat 2 on <b>CIT-54</b> within 7 days of month end. <b>s.52 bis</b>: ≥10,000 of income with no WHT → may prepay, credited later. <b>Refund s.63</b>: claim within <b>3 yrs</b>. Dispute: assessment → appeal <b>within 30 days</b> → tribunal → Central Tax Court → Appeal → Supreme.
</div>
""", fs=6.9)
# col1 free space: M2 trigger law vs slide
patch(6, 18.4, 455, 193.5, 124, """
<div class="box red"><div class="hd">M2 trigger: the law vs her slide 34</div>
<b>Law</b> s.48(2) (RD 480): assessable income from cats 2–8 <b>≥ 120,000</b> → tax can't be below 0.5% of it. Cat 1 excluded.<br>
<b>Her slide 34</b>: “only evaluate M2 if cats 2–8 gross <b>exceeds 1,200,000</b>.” Same result in practice: below ~1m, 0.5% ≤ 5,000 and RD 470 waives it.<br>
<b>Egg farmer</b> (her slide 38): 1,500,000 × 0.5% = <b>7,500</b> &gt; 5,000 → pays M2 even though M1 = 0.<br>
<b>MCQ asks the law → 120,000.</b>
</div>
""", fs=7.2)
# col2 free space: Vitamilk case
patch(6, 221.5, 442, 193.5, 137, """
<div class="box navy"><div class="hd">Real case: Vitamilk × a student group (her deck)</div>
Vitamilk sponsors a group of business students.<br>
① The group is <b>not a juristic person</b> → a <b>non-juristic body of persons</b> → <b>PIT</b> taxpayer, not CIT.<br>
② Sponsorship money = <b>40(8)</b>.<br>
③ <b>s.50</b>: Vitamilk withholds at source, remits on <b>PND 3</b>, and gives the group a <b>WHT certificate</b>.<br>
④ <b>s.3</b> lets the Director-General make the WHT rules (subordinate legislation).<br>
<b>Dividend credit needs the dividend INCLUDED</b> (you didn't elect the 10% final). Over-credit → company and taxpayer jointly liable.
</div>
""", fs=7.2)

# ---------------- PAGE 7 ----------------
patch(7, 18.4, 447, 193.5, 132, """
<div class="box navy"><div class="hd">CIT filing · losses · what counts (CIT deck)</div>
<b>CIT 50</b>: annual return + payment <b>within 150 days</b> of the period end (Thai and foreign cos. doing business here).<br>
<b>CIT 51</b>: half-year. Estimate the year's profit, pay <b>HALF</b> the estimated tax <b>within 2 months</b> after the first 6 months; credited against CIT 50.<br>
<b>Losses</b> carried forward <b>5 yrs</b> (s.65 ter (12)).<br>
<b>Tax accounting</b> (statute, collects revenue) is <b>narrower</b> than financial accounting (true and fair view for investors) → a business expense is not automatically deductible.<br>
Every legal entity ≠ CIT taxpayer: public, religious or government bodies <b>not prescribed</b> sit outside CIT.
</div>
""", fs=7.2)
patch(7, 221.5, 429, 193.5, 150, """
<div class="box red"><div class="hd">Cat 3: what the Code prescribes (her deck)</div>
<b>International transport co. under foreign law</b> → <b>3% of GROSS</b>, no expenses (s.67): passengers = fares charged in TH; goods = freight charged anywhere. e.g. Air India, Lao Airlines, Vietnam Airlines.<br>
<b>Foreign government business</b> (state bank, state energy co.) → <b>net profit</b>.<br>
<b>Profitable foundation / association</b> (not on the Minister's s.47(7)(b) list) → <b>2% or 10% of GROSS</b> receipts.<br>
<b>By subordinate law</b>: the SET → net profit · mutual fund → gross receipts.<br>
<b>Joint venture</b> (s.39): ≥1 party is juristic → separate taxpayer, <b>own TIN, CIT 50/51</b>; its profit share to venturers = dividend (WHT). <b>Consortium</b>: split work and pay, no profit sharing → <b>not juristic, no TIN</b>, each member files its own CIT. Vague contract → RD may treat it as an <b>unregistered ordinary partnership</b>.
</div>
""", fs=6.95)
patch(7, 424.6, 477, 195, 102, """
<div class="box red"><div class="hd">Exemption #1 in full · same slide · she WILL ASK</div>
<b>SET-listed</b> receiver, dividend from any Thai co., shares held 3m before + 3m after → <b>FULL</b>.<br>
<b>NON-listed</b> receiver: ≥25% voting shares + <b>no direct/indirect cross-holding</b> + 3m/3m → <b>FULL</b>. Held 3m/3m but fails 25% or cross-holding → <b>HALF exempt</b>.<br>
Merger / entire business transfer: the predecessor's holding period counts.<br>
Profit share from a juristic <b>mutual fund</b> (not property funds), 3m/3m → <b>100% listed · 50% non-listed</b>.
</div>
""", fs=7.0)
patch(7, 627.7, 517, 195, 62, """
<div class="box"><div class="hd">Other CIT exemptions (deck, quick look)</div>
Interest on foreign-currency loans from a foreign-govt-owned lender · Thai govt / BOT / FIDF bond interest to a foreign co. not doing business here · <b>exempt taxpayers</b>: BOI-promoted cos. (for the period), listed foundations, international/diplomatic bodies, SEC-approved securitisation SPVs.
</div>
""", fs=6.9)

# ---------------- PAGE 8 ----------------
patch(8, 626.5, 358.5, 96.5, 69.7, """
<div class="hd" style="font-size:5.9pt">BOI activity groups: 4 (her list)</div>
<ol class="ol">
<li>Agriculture, bio &amp; medical</li>
<li>Advanced manufacturing (electronics/telecom <b>✓</b>)</li>
<li>Basic &amp; supporting industries</li>
<li>Digital, creative &amp; high-value services</li>
</ol>
""", fs=6.5)
patch(8, 627.3, 200.0, 77.5, 8.9, "<div style='padding-top:.1pt;line-height:1.05;white-space:nowrap'><b>EEC</b> 2018: <b>Rayong ·</b></div>", fs=7.55)
patch(8, 726.8, 502.5, 96, 42.5, """
<div class="tiny2">Matches her slide 48 ✓ (checked 29 Sep). Act: Eastern Special Development Zone Act <b>B.E. 2561 (2018)</b>; she said “established 2017”.</div>
""", fs=6.6)
patch(8, 18.4, 355, 193.5, 224, """
<div class="box navy"><div class="hd">DTA + incentives: the extras (L7 deck)</div>
Thailand has <b>61 DTAs</b>. Each rule's economic reason: <b>residence</b> = you use that country's resources · <b>source</b> = you earn that country's wealth · <b>citizenship</b> = you get a citizen's benefits (the US).<br>
Double tax is a <b>barrier to trade and investment</b>; fair + efficient allocation of resources = global prosperity. Exemption method = the <b>participation privilege</b> (a parent's dividends from its subsidiary).<br>
Cross-border deals: trade, services, finance · tech transfer, employment, investment (<b>FDI</b> = subsidiary/branch/agent; <b>FPI</b> = Koala buying Thai shares or debentures).<br>
<b>Tax incentive</b> = a feature of the tax system that cuts tax to push one activity. Globally: CIT 40% (1980) → 23% (2021); most new incentives target manufacturing + services; motives: lower cost of business, innovation, local production, SMEs.<br>
<b>PITA</b>: income taxed under PITA (and dividends paid out of it) is exempt from Revenue Code taxes.
</div>
""", fs=7.1)
patch(8, 221.5, 441, 193.5, 138, """
<div class="box red"><div class="hd">BOI + IEAT in detail (L7 deck)</div>
<b>Investment Promotion Act 1977 (B.E. 2520)</b>. BOI Policy Committee chaired by the <b>PM</b> → Secretary-General → Office of the BOI (+ MoF). Why: competitiveness, <b>avoid the middle-income trap</b>, balanced sustainable growth.<br>
<b>s.31 (+34)</b>: CIT exemption on net profit <b>and dividends</b> from the promoted activity.<br>
<b>Non-tax</b>: s.24 foreigners enter to study investment · s.25–26 bring in skilled workers/experts · <b>s.27 own land</b> · s.37 take money out in foreign currency.<br>
Breach → BOI <b>withdraws</b> the certificate → the tax comes back.<br>
<b>IEAT</b>: est. 1977, <b>state enterprise under the Ministry of Industry</b> (itself not a CIT payer). Stacks with BOI; the most generous privilege applies.
</div>
""", fs=7.0)
patch(8, 424.6, 392, 195, 187, """
<div class="box navy"><div class="hd">EEC in detail (L7 deck)</div>
<b>Chachoengsao · Chonburi · Rayong</b>: 13,266 km², 2.8m people; the heart of Thailand 4.0. EEC Policy Committee chaired by the <b>PM</b>.<br>
<b>Eligible only if</b>: located in an EEC zone + in a target industry + the committee grants CIT exemption/reduction <b>case by case</b>.<br>
<b>Incentives</b>: CIT exemption up to <b>15 yrs</b> · BOI-level import-duty exemption · duty-free / free-trade-zone rights · outside customs regulation · grant from the Competitiveness Fund · work <b>without a work permit</b> · aviation foreign-ownership + FX-control exemptions · own land + condos.<br>
<b>Other enablers</b>: <b>flat 17% PIT</b> for qualified expats and Thai employees · EEC One Stop Service (<b>44 permits</b>) · LTR visa · land lease <b>50 + 49 yrs</b> (was 30) · EEC sandbox.<br>
BOI = activity-based; IEAT = area; EEC = <b>both</b>, and narrower than either.
</div>
""", fs=7.1)

json.dump(P, open("patches.json", "w"), ensure_ascii=False)
print(len(P), "patches")
