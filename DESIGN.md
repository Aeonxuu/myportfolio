# Design

Documented from the built page, after the November 2026 redesign. Direction was pinned by the owner (see `.impeccable/surfaces/src-app-tsx.md`), so no concept roll was run.

## Idea

A magazine that becomes a folder. Three beats: a masthead (her name), an overview spread (her face overlapping the word "Overview"), and one large violet folder holding everything else in tabs. Flat, square, one loud object.

## Palette

The owner pinned #6B35E8, #3F13A4, #050505, #595959 and #FAFAFA. Over large areas the two violets (80% saturation) tired the owner's eyes, so the big surfaces use the same hue at about 45% saturation. The pinned values remain the reference and the favicon.

| Token | Light | Dark | Job |
|---|---|---|---|
| `--canvas` | #FAFAFA | #151517 | page (dark is a soft charcoal, lifted from the pinned #050505) |
| `--sheet` | #FAFAFA | #1C1C1F | paper inside the folder |
| `--type` | #050505 | #FAFAFA | text |
| `--note` | #595959 | #9A9A9A | secondary text |
| `--violet` | #7660C2 | #7660C2 | folder body, primary button, "Lalaine Jannah" in the masthead (paper text on it 4.8:1) |
| `--violet-deep` | #4B3A8C | #4B3A8C | inactive tabs, button hover (paper text 8.8:1) |
| `--mark` | #5E4AA6 | #B4A3E6 | violet used as text (6.7:1 on paper, 8.1:1 on the dark canvas) |
| `--word` | #A796DB | #7A66BE | the oversized "Overview", decorative |

Light is the default and the OS preference does not override it; only the toggle does.

## Type

- **Libre Bodoni** (variable, with italic): the voice. Masthead line one, panel titles, pull lines.
- **Public Sans** (300 to 800): everything that has to be read, and the heavy second line of the name, whose letters are individually lifted and tilted (fixed values, ±0.06em and ±6°).
- **Archivo Black**: one use only, the word "Overview".
- No monospace, no all caps, no eyebrow labels.

## Margins

One token, `--gutter: clamp(1.5rem, 7vw, 7rem)`, sets the left and right margin of every section and the footer, so all edges line up down the page (24px on phones, about 100px at 1440, 112px at wide screens).

## Shape and depth

Square corners everywhere except the folder: tabs and body corners are 9-10px. No shadows, no gradients, no glass, with one exception: the navbar is a floating glass pill at the bottom centre (blur, soft shadow). Separation is hairlines (`--rule`) and the violet itself.

## The folder

- Desktop (1024+): landscape, tabs along the top. Mobile and tablet: portrait, tabs down the right edge with the text running sideways (`writing-mode: vertical-rl`).
- The active tab is the folder colour and sits flush with the body; inactive tabs are deep violet and tucked a few pixels behind it. Offsets are transforms.
- Tabs are a real tablist (roving tabindex, arrows follow the layout's axis, Home/End), deep-linked by hash (`/#credentials`).
- Content lives on a paper sheet that scrolls inside the folder; the folder itself never changes size.

## Motion

| Moment | What | Tier |
|---|---|---|
| Masthead | each name line rises out of its own mask once on load (950ms, `cubic-bezier(.23,1,.32,1)`) | once per visit |
| Scroll: hero | the two lines drift apart and dim as the hero leaves | scroll-linked |
| Scroll: overview | "Overview" slides sideways behind the photo, which moves the other way | scroll-linked |
| Scroll: folder | tilts up from below (rotateX 14 to 0) and settles flat | scroll-linked |
| Tab change | panel crossfades and slides 18px in the direction of travel, 220ms | occasional |
| Hover, press | underlines draw, images zoom 2.5% inside their frame, buttons press to 0.97 | frequent, under 200ms |

All scroll motion is transform and opacity. Under `prefers-reduced-motion` the page renders its final state with no scroll-linked movement.

## Photo

`assets/lj_profile_real.png` is the owner's cut-out. The build zeroes faint stray alpha, crops the empty top rows, and masks the outer 9% of each side (and, from 1024px up, the bottom 18%) so the hard crop edges dissolve into the page.
