import { ArrowDownIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
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

/**
 * The masthead. Her name, two lines, two typefaces: Bodoni italic over heavy
 * Public Sans. It enters once on load (a line rises out of its own mask) and
 * then follows the scroll: the lines drift apart as the hero leaves.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const drift1 = useTransform(scrollYProgress, [0, 1], ['0%', '-16%'])
  const drift2 = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const dim = useTransform(scrollYProgress, [0, 0.7], [1, 0.15])

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: '108%' },
          animate: { y: '0%' },
          transition: { duration: 0.95, delay, ease: EASE_OUT },
        }

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[34rem] flex-col justify-end"
      style={{ height: '100svh' }}
    >
      <div className="mx-auto w-full max-w-[1600px] px-(--gutter) pb-[clamp(1.5rem,4vw,3rem)]">
        <motion.h1
          aria-label={profile.name}
          style={reduce ? undefined : { opacity: dim }}
          className="text-[clamp(3.25rem,19.5vw,6rem)] leading-[0.9] sm:text-[clamp(3.25rem,12.6vw,13rem)]"
        >
          {/* Each line sits in its own mask so the entrance is a rise, not a fade. */}
          <span className="-mb-[0.14em] -ml-[0.1em] block overflow-hidden pb-[0.14em] pl-[0.1em]">
            <motion.span style={reduce ? undefined : { x: drift1 }} className="block">
              <motion.span
                {...rise(0)}
                className="block font-serif font-medium italic tracking-[-0.035em] text-violet"
              >
                <span className="block sm:inline">{profile.nameLines[0].split(' ')[0]}</span>
                <span className="hidden sm:inline"> </span>
                <span className="block sm:inline">{profile.nameLines[0].split(' ')[1]}</span>
              </motion.span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.2em] pl-[0.05em] pr-[0.05em] pt-[0.12em] text-right">
            <motion.span style={reduce ? undefined : { x: drift2 }} className="block">
              <motion.span
                {...rise(0.09)}
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
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.7, ease: EASE_OUT }}
          className="mt-[clamp(1.25rem,3vw,2.25rem)] flex items-center justify-between gap-6 border-t border-type pt-4"
        >
          <p className="max-w-[28ch] text-[1.0625rem] leading-snug sm:text-[1.25rem]">
            {profile.thesis}
          </p>
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
    </section>
  )
}
