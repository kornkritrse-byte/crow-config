import { chromium } from '/opt/homebrew/lib/node_modules/playwright/index.mjs';
import fs from 'fs';
const P = JSON.parse(fs.readFileSync('patches.json','utf8'));
const pages=[...new Set(P.map(p=>p.page))];
const css=`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@700&display=block');
@page{size:841.92pt 595.92pt;margin:0} html,body{margin:0;padding:0;background:transparent}
.pg{position:relative;width:841.92pt;height:595.92pt;overflow:hidden}
.p{position:absolute;overflow:hidden;box-sizing:border-box;font-family:'IBM Plex Sans Condensed';color:#111;line-height:1.2}
.p.inl{line-height:1.12}
.p.w{background:#fff}
.box{border:.7pt solid #333;padding:2.2pt 3.2pt 2.6pt;margin-bottom:5pt;box-sizing:border-box}
.box:last-child{margin-bottom:0} .box.red{border-color:#A32020} .box.navy{border-color:#1A3862}
.hd{font-family:'IBM Plex Mono';font-weight:700;font-size:6.1pt;letter-spacing:.04em;text-transform:uppercase;color:#1A3862;margin-bottom:1.6pt}
.red>.hd{color:#A32020}
.r{color:#A32020} b{font-weight:700}
table{border-collapse:collapse;width:100%}
.qa td{vertical-align:top;padding:1.1pt 0;border-bottom:.4pt solid #ccc}
.qa td:first-child{width:36%;padding-right:3pt;color:#333}
.t td{padding:1.3pt 1pt;border-bottom:.4pt solid #ccc;vertical-align:top}
.t td:first-child{width:44%}
.t .th td{font-family:'IBM Plex Mono';font-weight:700;font-size:5.6pt;text-transform:uppercase;color:#333}
.n{font-family:'IBM Plex Mono';font-weight:700;color:#1A3862}
.mono9{font-family:'IBM Plex Sans Condensed'}
.ol{margin:0;padding-left:9pt} .ol li{margin:0 0 .3pt}
.tiny{font-size:5.6pt;color:#555;margin-top:1pt} .tiny2{font-size:6.3pt;color:#444;line-height:1.18}`;
const b=await chromium.launch(); const pg=await b.newPage();
for(const n of pages){
 let html=`<!DOCTYPE html><html><head><style>${css}</style></head><body><div class="pg">`+P.filter(p=>p.page===n).map((p,i)=>`<div class="p ${p.white?'w':''}" data-id="${n}-${i}" style="left:${p.x}pt;top:${p.y}pt;width:${p.w}pt;height:${p.h}pt;${p.fs?`font-size:${p.fs}pt`:''}">${p.html}</div>`).join('')+`</div></body></html>`;
 fs.writeFileSync(`overlay-${n}.html`,html);
 await pg.goto('file://'+process.cwd()+`/overlay-${n}.html`,{waitUntil:'networkidle'});
 await pg.evaluate(()=>document.fonts.ready);
 await pg.emulateMedia({media:'print'});
 const over=await pg.evaluate(()=>[...document.querySelectorAll('.p')].map(e=>({id:e.dataset.id,spare_pt:+((e.clientHeight-e.scrollHeight)*0.75).toFixed(1),wover:e.scrollWidth>e.clientWidth})).filter(o=>o.spare_pt<0||o.wover));
 console.log('page',n,'problems',JSON.stringify(over));
 await pg.pdf({path:`overlay-${n}.pdf`,format:'A4',landscape:true,printBackground:true,preferCSSPageSize:true});
}
fs.writeFileSync('overlay-pages.json',JSON.stringify(pages));
await b.close();
