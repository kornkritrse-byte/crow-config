#!/usr/bin/env python3
"""PreToolUse guard: refuse writes to the REPO mirror of memory.

~/crow-config/memory/ is a copy that save.sh overwrites (rsync --delete) from the
live dir on every sync, so anything written there is silently lost. Crow did this
5 times (error log, 24 Oct). Reads are fine; only writes are blocked.
Live path: ~/.claude/projects/-Users-kornkrit-crow-config/memory/
"""
import json, os, re, sys

HOME = os.path.expanduser("~")
MIRROR = os.path.join(HOME, "crow-config", "memory")
LIVE = "~/.claude/projects/-Users-kornkrit-crow-config/memory/"

# Shell write signs: redirects (not 2>&1), in-place edits, copies, python file writes.
WRITE = re.compile(r"(^|[^0-9&>])>{1,2}\s*[^&\s]|\bsed\s+-i|\btee\b|\bcp\b|\bmv\b|\brsync\b|\btouch\b|\brm\b"
                   r"|open\([^)]*['\"][wa]\+?['\"]|\.write\(|write_text\(")
MIRROR_REF = re.compile(r"(~|\$HOME|/Users/kornkrit)/crow-config/memory\b")
RELATIVE_REF = re.compile(r"(^|[\s'\"(=;&|])(\./)?memory/")


def deny(why):
    print(json.dumps({"hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "permissionDecision": "deny",
        "permissionDecisionReason": f"{why} That's the repo MIRROR, and the sync overwrites it. "
                                    f"Write to the live memory dir instead: {LIVE}",
    }}))
    sys.exit(0)


data = json.load(sys.stdin)
tool, inp = data.get("tool_name", ""), data.get("tool_input", {})
cwd = os.path.realpath(data.get("cwd") or os.getcwd())

if tool in ("Write", "Edit", "MultiEdit", "NotebookEdit"):
    path = inp.get("file_path") or inp.get("notebook_path") or ""
    full = os.path.realpath(os.path.join(cwd, os.path.expanduser(path)))
    if full == MIRROR or full.startswith(MIRROR + os.sep):
        deny(f"Blocked {tool} on {path}.")

elif tool == "Bash":
    cmd = inp.get("command", "")
    if WRITE.search(cmd):
        mirror_cwd = cwd == MIRROR or cwd.startswith(MIRROR + os.sep)
        crow_cwd = cwd == os.path.join(HOME, "crow-config")
        if MIRROR_REF.search(cmd) or mirror_cwd or (crow_cwd and RELATIVE_REF.search(cmd)):
            # save.sh writes the mirror on purpose; let it through.
            if not re.search(r"\bsave\.sh\b", cmd):
                deny("Blocked a shell write that touches ~/crow-config/memory/.")
