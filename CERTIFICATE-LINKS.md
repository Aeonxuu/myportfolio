# Certificate links that need fixing

**18 of 23 confirmed.** 5 still share URLs with each other and render without a Verify
button, because a button that opens the wrong certificate does more damage than no button.

Source of truth is `assets/certificates/certificate_links.txt`. After editing it, run
`npm run certs` to regenerate `src/data/certificates.ts`.

---

## Still outstanding

### 1. Three certificates share one URL

All three point at `coursera.org/share/7f77d640ec35102273dcc2d3d7b3875c`. Two Arduino
certificates and a React one cannot be the same credential, so at least two are wrong.

- [ ] `certificate_arduino_c_programming` - Arduino and C Programming
- [ ] `certificate_interfacing_arduino` - Interfacing with Arduino
- [ ] `certificate_frontend_with_react` - Frontend Development with React

### 2. Two certificates share one URL

Both point at `coursera.org/share/be31b1711f9b203cafa84ed316d96d5d`.
This may be legitimate if one is the specialization and the other a course inside it.
**If that is the case, just tell me and I will link both** - no new URLs needed.

- [ ] `certificate_iot` - Internet of Things
- [ ] `certificate_iot_raspberry_python_programming` - IoT: Raspberry Pi and Python

### 3. One orphaned URL

`coursera.org/share/3bac956c18ea6070aa153ac864220432`

This was previously listed under `certificate_frontend_development`, which you have since
corrected to `17aaabcb...`. It now belongs to nothing. Either it maps to a certificate whose
image is missing, or it can be discarded. Let me know which.

---

## Still needed, whenever you have it

**Issue dates for all 23.** None are in the file. Certificates can appear in the grid without
them, but the Journey timeline places credentials chronologically and cannot include them
until dates exist.

---

## Resolved

- **2026-08-21** - `certificate_advanced_frontend` linked to `529aa1a9...`
- **2026-08-21** - `certificate_frontend_development` corrected to `17aaabcb...`, replacing
  two conflicting entries
- **2026-08-21** - `certificate_iot_raspberry` image supplied; its existing link
  (`67a3da10...`) now resolves to a real certificate
- **2026-08-21** - `cerficate_cisco_networking.jpeg` was missing a `t`. Renamed and matched.
