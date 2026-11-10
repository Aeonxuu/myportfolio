/**
 * The content seam. Every section reads from typed data in this directory and
 * nothing is hardcoded into a component, so adding a project is editing one
 * array entry.
 */

export type CertificateCategory = 'web' | 'systems' | 'design'

/** Why a certificate has no verify link. Absent means the link is trustworthy. */
export type LinkStatus =
  | 'missing' // no URL was supplied
  | 'shared' // the URL is also claimed by another certificate
  | 'conflict' // listed more than once with different URLs

export interface Certificate {
  slug: string
  title: string
  /** The awarding partner read off the certificate itself, e.g. "UC Irvine".
   *  Not the platform: "UC Irvine" carries weight with a recruiter, "Coursera"
   *  does not. */
  issuer: string
  /** Where it was taken. Always Coursera here. */
  platform: string
  /** Specialization certificates sit above the individual courses. */
  isSpecialization?: boolean
  category: CertificateCategory
  /** Grid thumbnail, 900px wide. */
  thumb: string
  /** Lightbox image, 1600px wide. */
  full: string
  /** Null when the source link could not be trusted. Renders without a button. */
  verifyUrl: string | null
  linkStatus?: LinkStatus
  /** Not yet supplied. Needed before the Journey timeline can place these. */
  issued?: string
}

export type DesignMedium = 'brochure' | 'poster' | 'signage' | 'social' | 'event'

export interface DesignPiece {
  slug: string
  title: string
  medium: DesignMedium
  src: string
  /** Intrinsic pixel size. Set on the <img> to reserve space and prevent CLS,
   *  and used by the masonry layout to place each piece at its true ratio. */
  width: number
  height: number
  /** Optional: the org or client it was made for. MASTECH work doubles as
   *  leadership evidence, so it is worth naming. */
  client?: string
  year?: number
}

/** A live site that was designed and built, shown with a screenshot thumbnail. */
export interface WebProject {
  slug: string
  title: string
  /** Bare domain, shown under the title. */
  domain: string
  url: string
  /** One line on what the site is and who it serves. */
  summary: string
  /** Where the business is, for context. */
  location: string
  thumb: string
  /** Intrinsic pixels of the thumb, to reserve the box and hold CLS at zero. */
  width: number
  height: number
}

export interface Project {
  slug: string
  title: string
  /** One line on what it solves and for whom. */
  hook: string
  description: string
  /** Solo, or team of N and specifically what you did. */
  role: string
  stack: string[]
  year: number
  /** The single highest-value field here. Users, adoption, hours saved.
   *  "A booking system" says nothing; "replaced the paper log for 200+
   *  student appointments" is a fact a stranger can picture. */
  outcome?: string
  hero?: string
  shots?: string[]
  liveUrl?: string
  repoUrl?: string
  featured: boolean
}

export type TimelineKind = 'education' | 'role' | 'milestone'

export interface TimelineEntry {
  kind: TimelineKind
  title: string
  org?: string
  start: string
  end?: string
  /** Bullets carrying numbers wherever possible. */
  points: string[]
}

export interface Role {
  org: string
  title: string
  place: string
  period: string
  points: string[]
}

export interface SchoolEntry {
  name: string
  program: string
  status: string
  note: string
}

export interface Achievement {
  title: string
  detail: string
  year: string
}

export interface Toolkit {
  group: string
  items: string[]
}
