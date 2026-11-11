import { ArrowDownIcon } from '@phosphor-icons/react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useRef } from 'react'
import { profile } from '@/data/profile'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

/**
 * "dela Cruz" is set a letter at a time: each letter sits a little higher or
 * lower than its neighbour and leans a different way, like cut-out lettering
 * pasted down by hand. The numbers are fixed, not random, so the arrangement
 * is the same on every load and every device. Offsets are in em so they scale
 * with the type; they alternate up and down and stay small enough that the
 * word still reads as one.
 */
const LETTER_OFFSETS = [
  { y: 0.05, r: -5 }, // d
  { y: -0.06, r: 4 }, // e
  { y: 0.04, r: -2 }, // l
  { y: -0.05, r: 6 }, // a
  null, // word space
  { y: 0.06, r: 3 }, // C
  { y: -0.04, r: -6 }, // r
  { y: 0.05, r: 2 }, // u
  { y: -0.06, r: -4 }, // z
] as const

/* ---------------------------------------------------------------------------
   THE WALL

   The page opens on her name repeated edge to edge in rows, each row the same
   two-typeface lockup as the masthead. Scrolling removes the rows one by one,
   bottom first, and the single large name rises into the space they leave.
   The hero is a tall section with a pinned stage; scroll position IS the
   animation, so it plays backwards on the way up.
--------------------------------------------------------------------------- */

const ROWS = 8
/** Hero height in viewport heights. Everything below is pinned for (this - 1). */
const HERO_VH = 300
/** Row start offsets in em of the wall type, so the rows brick instead of stack. */
const ROW_SHIFT = [0, -4.1, -8.3, -2.2, -6.6, -0.9, -5.4, -9.6]
/** How far a row drifts sideways per unit of progress, in vw, before it leaves. */
const DRIFT_VW = 30
/** Scroll progress at which each beat happens. */
const T = {
  firstRowOut: 0.14,
  rowStagger: 0.05,
  rowLength: 0.2,
  line1: [0.4, 0.68],
  line2: [0.46, 0.74],
  thesis: [0.72, 0.84],
} as const

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

/**
 * A value that moves from `from` to `to` while `progress` runs from `a` to `b`
 * and holds at both ends. Written as a plain function on purpose: an explicit
 * clamp can only ever hold, whereas range-based interpolation on these scroll
 * values was seen drifting back toward its start value near the end.
 */
function useRamp(
  progress: MotionValue<number>,
  a: number,
  b: number,
  from: number,
  to: number,
  ease: (t: number) => number = (t) => t,
) {
  return useTransform<number, number>(progress, (v) => {
    const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
    return from + (to - from) * ease(t)
  })
}

/** One row of the wall. Slides out and fades on its own slice of the scroll. */
function WallRow({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const dir = i % 2 === 0 ? 1 : -1
  // Bottom row leaves first, so the space for the big name opens from below.
  const rank = ROWS - 1 - i
  const start = T.firstRowOut + rank * T.rowStagger
  const end = start + T.rowLength

  const x = useTransform(
    progress,
    [0, start, end],
    ['0vw', `${dir * DRIFT_VW * start}vw`, `${dir * (DRIFT_VW * start + 55)}vw`],
  )
  const opacity = useRamp(progress, start, end, 1, 0)

  return (
    // Outer element plays the one-off entrance; inner one is scroll-driven.
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.05 + i * 0.06, ease: EASE_OUT }}
      className="flex items-center"
      style={{ height: `calc(100svh / ${ROWS})` }}
    >
      <motion.div
        style={{ x, opacity, marginLeft: `${ROW_SHIFT[i]}em` }}
        className="flex w-max items-baseline whitespace-nowrap leading-none will-change-transform"
      >
        {Array.from({ length: 4 }, (_, k) => (
          <span key={k} className="flex items-baseline">
            <span className="mr-[0.22em] font-serif font-medium italic tracking-[-0.035em] text-violet">
              {profile.nameLines[0]}
            </span>
            <span className="mr-[0.5em] font-sans font-extrabold tracking-[-0.04em] text-type">
              {profile.nameLines[1]}
            </span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

/**
 * The masthead lockup: her name, two lines, two typefaces. All the motion
 * values are optional, so reduced-motion visitors get the same markup with no
 * motion at all.
 */
function Lockup({
  rise1,
  rise2,
  drift1,
  drift2,
  dim,
  nameVisibility,
  thesisOpacity,
  thesisVisibility,
}: {
  rise1?: MotionValue<string>
  rise2?: MotionValue<string>
  drift1?: MotionValue<string>
  drift2?: MotionValue<string>
  dim?: MotionValue<number>
  nameVisibility?: MotionValue<string>
  thesisOpacity?: MotionValue<number>
  thesisVisibility?: MotionValue<string>
}) {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-(--gutter) pb-[clamp(1.5rem,4vw,3rem)]">
      <motion.h1
        aria-label={profile.name}
        style={dim ? { opacity: dim, visibility: nameVisibility } : undefined}
        className="text-[clamp(3.25rem,19.5vw,6rem)] leading-[0.9] sm:text-[clamp(3.25rem,min(12.6vw,22svh),13rem)]"
      >
        {/* Each line sits in its own mask so it rises out of nothing. */}
        <span className="-mb-[0.14em] -ml-[0.1em] block overflow-hidden pb-[0.14em] pl-[0.1em]">
          <motion.span style={drift1 ? { x: drift1 } : undefined} className="block">
            <motion.span
              style={rise1 ? { y: rise1 } : undefined}
              className="block font-serif font-medium italic tracking-[-0.035em] text-violet"
            >
              <span className="block sm:inline">{profile.nameLines[0].split(' ')[0]}</span>
              <span className="hidden sm:inline"> </span>
              <span className="block sm:inline">{profile.nameLines[0].split(' ')[1]}</span>
            </motion.span>
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.2em] pl-[0.05em] pr-[0.05em] pt-[0.12em] text-right">
          <motion.span style={drift2 ? { x: drift2 } : undefined} className="block">
            <motion.span
              style={rise2 ? { y: rise2 } : undefined}
              className="block whitespace-pre font-sans font-extrabold tracking-[-0.04em]"
            >
              {[...profile.nameLines[1]].map((ch, i) => {
                const o = LETTER_OFFSETS[i]
                if (!o) return ' '
                return (
                  <span
                    key={i}
                    aria-hidden
                    className="inline-block"
                    style={{ transform: `translateY(${o.y}em) rotate(${o.r}deg)` }}
                  >
                    {ch}
                  </span>
                )
              })}
            </motion.span>
          </motion.span>
        </span>
      </motion.h1>

      <motion.div
        style={thesisOpacity ? { opacity: thesisOpacity, visibility: thesisVisibility } : undefined}
        className="mt-[clamp(1.25rem,3vw,2.25rem)] flex items-center justify-between gap-6 border-t border-type pt-4"
      >
        <p className="max-w-[28ch] text-[1.0625rem] leading-snug sm:text-[1.25rem]">{profile.thesis}</p>
        <a
          href="#overview"
          className="group inline-flex h-11 items-center gap-2 text-[0.9375rem] font-medium transition-colors duration-150 hover:text-mark"
        >
          Overview
          <ArrowDownIcon
            size={18}
            className="transition-transform duration-200 ease-out group-hover:translate-y-0.5 motion-reduce:transform-none"
          />
        </a>
      </motion.div>
    </div>
  )
}

/**
 * The masthead. With motion allowed it opens on the wall of names and scroll
 * turns it into the large lockup. With reduced motion it is just the lockup.
 */
export function Hero() {
  const reduce = useReducedMotion()
  return reduce ? <StaticHero /> : <ScrollHero />
}

function StaticHero() {
  return (
    <section id="top" className="relative flex min-h-[34rem] flex-col justify-end" style={{ height: '100svh' }}>
      <Lockup />
    </section>
  )
}

function ScrollHero() {
  const ref = useRef<HTMLElement>(null)

  // 0 at the top of the page, 1 when the pinned stage lets go.
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Then, as the stage scrolls away, the lines drift apart and dim.
  const { scrollYProgress: leaving } = useScroll({ target: ref, offset: ['end end', 'end start'] })

  const rise1 = useTransform(useRamp(progress, T.line1[0], T.line1[1], 108, 0, easeOutCubic), (v) => `${v}%`)
  const rise2 = useTransform(useRamp(progress, T.line2[0], T.line2[1], 108, 0, easeOutCubic), (v) => `${v}%`)
  const drift1 = useTransform(useRamp(leaving, 0, 1, 0, -16), (v) => `${v}%`)
  const drift2 = useTransform(useRamp(leaving, 0, 1, 0, 16), (v) => `${v}%`)
  const dim = useRamp(leaving, 0, 0.7, 1, 0.15)
  const thesisOpacity = useRamp(progress, T.thesis[0], T.thesis[1], 0, 1)
  // Keep the link out of reach (and out of the tab order) until it can be seen.
  const thesisVisibility = useTransform<number, string>(progress, (v) => (v < T.thesis[0] ? 'hidden' : 'visible'))
  // The masks around each line have padding, so an off-screen line can still
  // show a sliver. Until its turn the whole name is simply not drawn.
  const nameVisibility = useTransform<number, string>(progress, (v) => (v < T.line1[0] - 0.01 ? 'hidden' : 'visible'))
  const cue = useRamp(progress, 0, 0.07, 1, 0)

  return (
    <section id="top" ref={ref} className="relative" style={{ height: `${HERO_VH}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 select-none"
          style={{ fontSize: `calc(100svh / ${ROWS} * 0.84)` }}
        >
          {Array.from({ length: ROWS }, (_, i) => (
            <WallRow key={i} i={i} progress={progress} />
          ))}
        </div>

        <motion.p
          aria-hidden
          style={{ opacity: cue }}
          className="absolute bottom-[clamp(1.5rem,4vw,3rem)] left-(--gutter) inline-flex items-center gap-2 bg-canvas px-3 py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em]"
        >
          Scroll
          <ArrowDownIcon size={14} weight="bold" />
        </motion.p>

        <div className="absolute inset-x-0 bottom-0">
          <Lockup
            rise1={rise1}
            rise2={rise2}
            drift1={drift1}
            drift2={drift2}
            dim={dim}
            nameVisibility={nameVisibility}
            thesisOpacity={thesisOpacity}
            thesisVisibility={thesisVisibility}
          />
        </div>
      </div>
    </section>
  )
}
