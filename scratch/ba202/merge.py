import json
from pypdf import PdfReader, PdfWriter
base=PdfReader('/Users/kornkrit/Desktop/BA202/BA202-cheatsheet-LANDSCAPE-8pages.pdf')
pages=json.load(open('overlay-pages.json'))
w=PdfWriter()
for i,p in enumerate(base.pages):
    if i+1 in pages:
        p.merge_page(PdfReader(f'overlay-{i+1}.pdf').pages[0])
    w.add_page(p)
w.write('v3.pdf'); print('ok', len(w.pages))
