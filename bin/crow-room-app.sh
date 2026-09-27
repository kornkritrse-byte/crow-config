#!/usr/bin/env bash
# crow-room-app.sh — build "Crow Room.app" so the Room opens from the Desktop (or Dock)
# like any other app. The app is a tiny AppleScript launcher: it runs crow-room.sh,
# which starts the server if needed and opens the page.
#   crow-room-app.sh            build it on the Desktop
#   crow-room-app.sh <folder>   build it somewhere else (e.g. /Applications)
# The icon (the crow on the crowned lamp, over the moon) lives in ui/AppIcon.icns.
set -euo pipefail
repo="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
dest="${1:-$HOME/Desktop}/Crow Room.app"

rm -rf "$dest"
# A real AppleScript applet: this macOS refuses to launch bundles whose
# executable is a bare shell script (LaunchServices error -10669).
osacompile -o "$dest" -e "do shell script \"export PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin; /bin/bash '$repo/bin/crow-room.sh' > /dev/null 2>&1 &\""
cp "$repo/ui/AppIcon.icns" "$dest/Contents/Resources/applet.icns"
rm -f "$dest/Contents/Resources/Assets.car"            # the stock icon would win over ours
plist="$dest/Contents/Info.plist"
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier com.kornkrit.crowroom" "$plist" 2>/dev/null || /usr/libexec/PlistBuddy -c "Add :CFBundleIdentifier string com.kornkrit.crowroom" "$plist"
/usr/libexec/PlistBuddy -c "Delete :CFBundleIconName" "$plist" 2>/dev/null || true
/usr/libexec/PlistBuddy -c "Add :LSUIElement bool true" "$plist" 2>/dev/null || true
codesign --force --deep -s - "$dest" 2>/dev/null   # re-sign after editing the bundle
touch "$dest"   # nudge Finder to pick up the icon
echo "Built: $dest"
