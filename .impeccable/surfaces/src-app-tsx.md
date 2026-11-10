---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Portfolio (single page)

Visitor mode: Experience. The work leads; the interface recedes.

Audience, job: recruiters and internship leads deciding in under a minute whether to open the work and reach out. Mostly on phones.
Proof: 2 live client sites, 11 design pieces, 23 certificates, resume facts.
Constraints: no invented facts; no phone number published; palette pinned by the owner.

## Direction contract

THESIS: A magazine that becomes a folder. The page owns one object, a violet folder with tabs, and refuses the stack of equal sections with cards.
OWN-WORLD: Paper (#FAFAFA) and ink (#050505) for the magazine spreads; one drenched violet (#6B35E8) object with deep violet (#3F13A4) tabs; grey #595959 for quiet text. Flat, square-cornered, no shadows beyond a hairline. Libre Bodoni for voice, Public Sans for everything that must be read.
STORY: She designs it and builds it. The visitor sees a name, a face, then a folder full of proof, and knows who to email.
FIRST VIEWPORT: Her name fills the width in two lines, first in Bodoni italic, second in heavy Public Sans, bottom-aligned on paper. A one-line thesis and a quiet scroll cue sit under it. Nothing else.
FORM: Pinned whole by the owner in words (hero name in two fonts; overview with cutout photo overlapping the word "Overview"; one big folder with tabs, landscape/top tabs on desktop, portrait/right-edge sideways tabs on mobile). seed: none (pinned) "hero is my name using 2 different fonts ... overlapping my photo with the word overview ... the 3rd section is just one big folder, and it has a lot of tabs".
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature interaction and motion grammar
Scroll: name halves drift apart as the hero leaves; "Overview" slides sideways behind the photo; the folder tilts up from below and settles flat as it arrives. Tabs: the active tab joins the folder body, content slides in from the direction of travel. All scroll-linked motion is transform and opacity only and rests under reduced motion.
