#!/usr/bin/env python3
"""canvas_mark.py: update one box on an Obsidian Canvas study map.

Usage:
  canvas_mark.py <canvas> <match> [--color 1-6|none] [--note "text"] [--title "new first line"]

<match> = a substring of the box's text (first box that contains it).
Colours: 4 green done · 3 yellow now · 2 orange shaky · 1 red not taught · 6 purple parked · none = not yet.
--note appends a line to the box (e.g. a weak spot); box height grows to fit.
"""
import json, sys, argparse

p = argparse.ArgumentParser()
p.add_argument("canvas"); p.add_argument("match")
p.add_argument("--color"); p.add_argument("--note"); p.add_argument("--title")
a = p.parse_args()

d = json.load(open(a.canvas))
hit = next((n for n in d["nodes"] if a.match in n.get("text", "")), None)
if not hit:
    sys.exit(f"no box contains: {a.match}")
if a.title:
    lines = hit["text"].split("\n"); lines[0] = a.title; hit["text"] = "\n".join(lines)
if a.note:
    hit["text"] += "\n" + a.note
if a.color:
    if a.color == "none": hit.pop("color", None)
    else: hit["color"] = a.color
hit["height"] = max(hit["height"], 40 + 26 * len(hit["text"].split("\n")))
json.dump(d, open(a.canvas, "w"), indent=1, ensure_ascii=False)
print("updated:", hit["text"].split("\n")[0])
