#!/usr/bin/env python3
"""strava.py — Crow reads Korn's runs straight from Strava (his ask, 6 Nov 2026).

His Garmin Forerunner 165 syncs to Strava, so Strava is the one hub.
Read-only: it never posts, edits or uploads anything.

Credentials live in ~/.strava/ (outside git, like ~/.google/):
  config.json   client_id + client_secret of his own Strava API app
  tokens.json   OAuth tokens (refreshed on their own, every ~6h)
  cache/        activity details already fetched, so the PB scan stays under the rate limit

Usage:
  strava.py setup          one time, in a terminal: asks for the app's ID + secret,
                           opens the Strava consent page, catches the redirect
  strava.py recent [n]     the last n activities (default 10)
  strava.py pbs            fastest 1k / 5k / 10k / half from Strava's best efforts (runs only)
"""
import datetime as dt
import getpass
import http.server
import json
import pathlib
import sys
import time
import urllib.parse
import urllib.request
import webbrowser

HOME = pathlib.Path.home() / ".strava"
CONFIG = HOME / "config.json"
TOKENS = HOME / "tokens.json"
CACHE = HOME / "cache"
PORT = 8723
REDIRECT = f"http://localhost:{PORT}/callback"
API = "https://www.strava.com/api/v3"
EFFORTS = ["1k", "5k", "10k", "Half-Marathon"]


def save(path, data):
    path.write_text(json.dumps(data, indent=2))
    path.chmod(0o600)


def post_token(params):
    body = urllib.parse.urlencode(params).encode()
    with urllib.request.urlopen("https://www.strava.com/oauth/token", body) as r:
        return json.load(r)


def setup():
    HOME.mkdir(mode=0o700, exist_ok=True)
    cid = input("Client ID: ").strip()
    secret = getpass.getpass("Client Secret (hidden): ").strip()
    save(CONFIG, {"client_id": cid, "client_secret": secret})
    url = "https://www.strava.com/oauth/authorize?" + urllib.parse.urlencode({
        "client_id": cid, "redirect_uri": REDIRECT, "response_type": "code",
        "approval_prompt": "force", "scope": "read,activity:read_all"})
    got = {}

    class Catch(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            got.update({k: v[0] for k, v in q.items()})
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            msg = "Connected. Go back to Crow." if "code" in got else f"Not connected: {got.get('error', 'no code')}"
            self.wfile.write(f"<h2>{msg}</h2>".encode())

        def log_message(self, *a):
            pass

    print("Opening Strava in your browser. Press Authorize.")
    webbrowser.open(url)
    server = http.server.HTTPServer(("localhost", PORT), Catch)
    while not got:
        server.handle_request()
    if "code" not in got:
        sys.exit(f"Strava said no: {got}")
    tok = post_token({"client_id": cid, "client_secret": secret,
                      "code": got["code"], "grant_type": "authorization_code"})
    if "activity:read_all" not in got.get("scope", ""):
        print("⚠ activity access not granted: tick the 'View data about your activities' box next time.")
    save(TOKENS, tok)
    who = tok.get("athlete", {})
    print(f"Connected as {who.get('firstname', '?')} {who.get('lastname', '')}.")


def token():
    if not TOKENS.exists():
        sys.exit("Not connected yet: run `python3 ~/crow-config/bin/strava.py setup` in a terminal.")
    tok = json.loads(TOKENS.read_text())
    if tok["expires_at"] < time.time() + 60:
        cfg = json.loads(CONFIG.read_text())
        new = post_token({"client_id": cfg["client_id"], "client_secret": cfg["client_secret"],
                          "refresh_token": tok["refresh_token"], "grant_type": "refresh_token"})
        tok.update(new)
        save(TOKENS, tok)
    return tok["access_token"]


def get(path, **params):
    url = f"{API}{path}" + ("?" + urllib.parse.urlencode(params) if params else "")
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token()}"})
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def clock(sec):
    sec = int(round(sec))
    h, m, s = sec // 3600, sec % 3600 // 60, sec % 60
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def pace(sec, metres):
    return clock(sec / (metres / 1000)) + "/km" if metres else "—"


def recent(n):
    for a in get("/athlete/activities", per_page=n):
        day = a["start_date_local"][:10]
        km = a["distance"] / 1000
        print(f"{day}  {a['sport_type']:<10} {km:6.2f} km  {clock(a['moving_time']):>8}  "
              f"{pace(a['moving_time'], a['distance']):>9}  {a['name']}")


def runs():
    page = 1
    while True:
        batch = get("/athlete/activities", per_page=100, page=page)
        if not batch:
            return
        yield from (a for a in batch if a["sport_type"] in ("Run", "TrailRun", "VirtualRun"))
        page += 1


def detail(aid):
    CACHE.mkdir(mode=0o700, exist_ok=True)
    f = CACHE / f"{aid}.json"
    if f.exists():
        return json.loads(f.read_text())
    d = get(f"/activities/{aid}")
    f.write_text(json.dumps({"best_efforts": d.get("best_efforts", [])}))
    return d


def pbs():
    best = {}
    for a in runs():
        if a["distance"] < 950:
            continue
        for e in detail(a["id"]).get("best_efforts", []):
            name = e["name"]
            if name in EFFORTS and (name not in best or e["elapsed_time"] < best[name][0]):
                best[name] = (e["elapsed_time"], a["start_date_local"][:10], a["name"], e["distance"])
    if not best:
        print("No best efforts found (Strava only computes them for GPS runs).")
    for name in EFFORTS:
        if name in best:
            t, day, title, dist = best[name]
            print(f"{name:<14} {clock(t):>8}  ({pace(t, dist)})  {day}  {title}")


cmd = sys.argv[1] if len(sys.argv) > 1 else ""
if cmd == "setup":
    setup()
elif cmd == "recent":
    recent(int(sys.argv[2]) if len(sys.argv) > 2 else 10)
elif cmd == "pbs":
    pbs()
else:
    print(__doc__)
