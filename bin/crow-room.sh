#!/usr/bin/env bash
# crow-room.sh — open the Crow Room (the browser interface in ui/).
# Starts the server if it isn't already running, then opens the page.
#   crow-room.sh           fresh session (session-start hook fires, like opening the CLI)
#   crow-room.sh --resume  pick up the last Crow Room session
#   crow-room.sh --stop    shut the server down
uiDir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../ui" && pwd)"
port="${CROW_PORT:-4711}"
url="http://localhost:$port"

if [ "$1" = "--stop" ]; then
  pid="$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null)"
  if [ -n "$pid" ]; then kill $pid && echo "Crow Room stopped."; else echo "Crow Room wasn't running."; fi
  exit 0
fi

if ! lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
  [ -d "$uiDir/node_modules" ] || (cd "$uiDir" && npm install --silent)
  nohup node "$uiDir/server.mjs" "$@" > "$uiDir/crow-room.log" 2>&1 &
  for _ in $(seq 1 20); do
    lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1 && break
    sleep 0.25
  done
fi
open "$url" 2>/dev/null || echo "$url"
