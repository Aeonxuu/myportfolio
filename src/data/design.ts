import type { DesignPiece } from './types'

/**
 * Every piece keeps its natural proportions. Nothing is cropped or squared off,
 * which is why the layout is masonry rather than a uniform grid: the mix of
 * portrait, landscape and square IS the composition.
 *
 * width/height are the real intrinsic pixels. They are set on the <img> so the
 * browser reserves the right box before the image arrives, which keeps CLS at 0.
 *
 * TITLES ARE PLACEHOLDERS, inferred from filenames. Correct anything wrong.
 */
export const designPieces: DesignPiece[] = [
  {
    slug: "brochure_japan_1",
    title: "University Brochure, Japanese, outside",
    medium: "brochure",
    src: "/design/brochure_japan_1.webp",
    width: 2000,
    height: 1545,
  },
  {
    slug: "brochure_japan_2",
    title: "University Brochure, Japanese, inside",
    medium: "brochure",
    src: "/design/brochure_japan_2.webp",
    width: 2000,
    height: 1545,
  },
  {
    slug: "brochure_science_1",
    title: "Science Brochure, outside",
    medium: "brochure",
    src: "/design/brochure_science_1.webp",
    width: 2000,
    height: 1214,
  },
  {
    slug: "brochure_science_2",
    title: "Science Brochure, inside",
    medium: "brochure",
    src: "/design/brochure_science_2.webp",
    width: 2000,
    height: 1214,
  },
  {
    slug: "creative_bazaar_date_1",
    title: "Bazaar Announcement",
    medium: "social",
    src: "/design/creative_bazaar_date_1.webp",
    width: 1410,
    height: 1182,
  },
  {
    slug: "creative_debut_1",
    title: "Debut Invitation",
    medium: "event",
    src: "/design/creative_debut_1.webp",
    width: 1587,
    height: 2245,
  },
  {
    slug: "creative_debut_2",
    title: "Debut Programme",
    medium: "event",
    src: "/design/creative_debut_2.webp",
    width: 1748,
    height: 1240,
  },
  {
    slug: "creative_poster_1",
    title: "Event Poster",
    medium: "poster",
    src: "/design/creative_poster_1.webp",
    width: 1080,
    height: 1080,
  },
  {
    slug: "creative_raffle",
    title: "SY Kickz 2nd Anniversary Raffle",
    medium: "event",
    src: "/design/creative_raffle.webp",
    width: 1080,
    height: 1350,
  },
  {
    slug: "creative_raffle_promo",
    title: "Raffle Promotion",
    medium: "social",
    src: "/design/creative_raffle_promo.webp",
    width: 1080,
    height: 1080,
  },
  {
    slug: "creative_sls_yard_sign",
    title: "SLS Yard Sign",
    medium: "signage",
    src: "/design/creative_sls_yard_sign.webp",
    width: 2000,
    height: 1500,
  },
]
