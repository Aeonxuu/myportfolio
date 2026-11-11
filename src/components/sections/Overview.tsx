import { ArrowDownIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { easeOut, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { profile } from '@/data/profile'
import { school } from '@/data/education'
import { asset } from '@/lib/asset'

const FACTS = [
  { term: 'Studying', def: `${school.program}, 4th year` },
  { term: 'School', def: school.name },
  { term: 'Also', def: 'IT Representative at MASTECH' },
  { term: 'Looking for', def: profile.availability.replace(/\.$/, '') },
]

const LINKS = [
  { href: profile.links.linkedin, label: 'LinkedIn', Icon: LinkedinLogoIcon },
  { href: profile.links.github, label: 'GitHub', Icon: GithubLogoIcon },
]

const WORD = 'Overview'

/** Where each letter starts, in em of the word size, plus a spin in degrees.
 *  Fixed values rather than random: the same scatter every visit, no hydration
 *  mismatch, and the composition is chosen rather than left to chance. */
const SCATTER = [
  { x: -2.4, y: -1.1, r: -38 },
  { x: -1.1, y: 1.6, r: 26 },
  { x: -0.4, y: -1.8, r: 44 },
  { x: 0.6, y: 1.3, r: -30 },
  { x: 1.2, y: -1.4, r: 36 },
  { x: 1.9, y: 1.7, r: -42 },
  { x: 2.3, y: -0.9, r: 28 },
  { x: 3.0, y: 1.2, r: -34 },
]

/**
 * One letter of the heading. Driven directly by scroll position, so scrolling
 * back un-assembles it. Each letter starts a little after the one before it and
 * every one is finished by 83% of the range, which leaves a held, fully
 * assembled word rather than one that is still settling when you reach it.
 */
function Letter({ char, i, progress }: { char: string; i: number; progress: MotionValue<number> }) {
  const from = SCATTER[i % SCATTER.length]!
  const start = i * 0.03
  const end = start + 0.62
  const opts = { ease: easeOut }
  const x = useTransform(progress, [start, end], [`${from.x}em`, '0em'], opts)
  const y = useTransform(progress, [start, end], [`${from.y}em`, '0em'], opts)
  const rotate = useTransform(progress, [start, end], [from.r, 0], opts)
  const opacity = useTransform(progress, [start, start + 0.3], [0, 1])

  return (
    <motion.span aria-hidden style={{ x, y, rotate, opacity }} className="inline-block will-change-transform">
      {char}
    </motion.span>
  )
}

/**
 * The overview spread. The word sits behind her cut-out portrait so her hair
 * and shoulders overlap its last letters. As the section scrolls into view the
 * letters fly in from all sides and lock together into the word, while she
 * drifts slightly on her own layer.
 */
export function Overview() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // The word assembles between the section entering the screen and its top
  // reaching 15% down, so it is complete before the visitor reads past it.
  const { scrollYProgress: assemble } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  return (
    <section id="overview" ref={ref} className="relative scroll-mt-0 overflow-clip px-(--gutter) pt-[clamp(4.5rem,9vw,8rem)] [--word-size:clamp(3.5rem,17.5vw,15.5rem)]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-12">
          <h2
            aria-label={WORD}
            className="relative z-0 col-span-full row-start-1 select-none font-display text-[length:var(--word-size)] leading-[0.86] tracking-[-0.045em] text-word"
          >
            {reduce
              ? WORD
              : WORD.split('').map((char, i) => <Letter key={i} char={char} i={i} progress={assemble} />)}
          </h2>

          <motion.div
            style={reduce ? undefined : { y: photoY }}
            className="relative z-10 -mt-[10vw] ml-auto w-[84%] border-b border-type sm:w-[62%] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:mt-[calc(var(--word-size)*0.4)] lg:w-full lg:max-w-[40rem] lg:justify-self-end lg:self-start lg:border-b-0"
          >
            <img
              src={asset(profile.photo)}
              alt={`${profile.name}, portrait`}
              width={1000}
              height={1149}
              fetchPriority="low"
              className="portrait block h-auto w-full"
            />
          </motion.div>

          <div className="relative z-20 pb-[clamp(3rem,6vw,5rem)] pt-8 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-end lg:pt-12">
            <div className="measure space-y-5 text-[1.0625rem] leading-[1.7]">
              <p>
                {profile.overview[0]}
              </p>
              <p className="text-note">{profile.overview[1]}</p>
            </div>

            <dl className="mt-8 border-t border-rule">
              {FACTS.map((f) => (
                <div
                  key={f.term}
                  className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-rule py-3 text-[0.9375rem] sm:grid-cols-[8rem_1fr]"
                >
                  <dt className="text-note">{f.term}</dt>
                  <dd>{f.def}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href="#folder"
                className="group inline-flex h-12 items-center gap-2 bg-violet px-6 text-[0.9375rem] font-semibold text-on-violet transition-[background-color,transform] duration-150 ease-out hover:bg-violet-deep active:scale-[0.97]"
              >
                Open the folder
                <ArrowDownIcon
                  size={17}
                  weight="bold"
                  className="transition-transform duration-200 ease-out group-hover:translate-y-0.5 motion-reduce:transform-none"
                />
              </a>
              {LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 items-center gap-2 text-[0.9375rem] font-medium underline decoration-rule-lit decoration-1 underline-offset-[6px] transition-colors duration-150 hover:text-mark hover:decoration-mark"
                >
                  <Icon size={19} weight="fill" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* On phones she stands on a rule under the photo; this one closes the section. */}
      <div aria-hidden className="mx-auto h-px max-w-[1280px] bg-type" />
    </section>
  )
}
