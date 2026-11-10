import { ArrowDownIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
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

/**
 * The overview spread. The word sits behind her cut-out portrait so her hair
 * and shoulders overlap its last letters. As the section scrolls the word
 * slides sideways while she stays put, which is what makes it read as layers.
 */
export function Overview() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const wordX = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const photoY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  return (
    <section id="overview" ref={ref} className="relative scroll-mt-0 overflow-clip px-(--gutter) pt-[clamp(4.5rem,9vw,8rem)] [--word-size:clamp(3.5rem,17.5vw,15.5rem)]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-12">
          <motion.h2
            style={reduce ? undefined : { x: wordX }}
            className="relative z-0 col-span-full row-start-1 select-none font-display text-[length:var(--word-size)] leading-[0.86] tracking-[-0.045em] text-word"
          >
            Overview
          </motion.h2>

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
