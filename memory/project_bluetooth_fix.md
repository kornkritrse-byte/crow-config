---
name: project-bluetooth-fix
description: "Ongoing Bluetooth troubleshooting on ASUS ROG Strix G513RC — driver issue identified, fix in progress"
metadata: 
  node_type: memory
  type: project
  originSessionId: 5d4e43a8-5bab-4842-805e-1471abed2220
---

Korn's Bluetooth isn't working. Diagnosed on 2026-06-02.

**Device:** ASUS ROG Strix G513RC  
**Chip:** MediaTek Bluetooth Adapter (VID_0489, PID_E0E2)  
**Driver version:** 1.1037.2.433, dated June 6 2024  

**What's wrong:** Two symptoms in Device Manager:
1. MediaTek Bluetooth Adapter showing as "Unknown" status — driver not loading cleanly
2. "Unknown USB Device (Device Descriptor Request Failed)" Error Code 43 on internal USB Port 4 (ACPI path `\_SB.PCI0.GP17.XHC0.RHUB.PRT4`) — likely the same physical device failing to initialize

**Fix steps — in order:**
1. Run as admin in PowerShell: `pnputil /remove-device "USB\VID_0489&PID_E0E2\000000000"` then restart → let Windows auto-reinstall driver (ATTEMPTED — blocked by permissions, user was told to run elevated manually)
2. If still broken: go to asus.com/support, search G513RC, Drivers & Tools → Bluetooth, download latest MediaTek driver
3. If still broken: hardware issue — internal USB port may be physically damaged

**Status as of 2026-06-02:** pnputil command ran but Bluetooth still broken after restart. User is okay leaving it for now — next step if they want to revisit is fresh MediaTek driver from asus.com/support (G513RC → Drivers & Tools → Bluetooth).

**Why:** Pick this up next session — don't start from scratch on the diagnosis.
