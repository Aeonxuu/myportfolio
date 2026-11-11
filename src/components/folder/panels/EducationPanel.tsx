import { ArrowRightIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { certificates } from '@/data/certificates'
import { school } from '@/data/education'
import { asset } from '@/lib/asset'
import type { TabId } from '../tabs'
import { PanelShell } from './shared'

/**
 * Education. The seal is the subject: it is large, and it lands once when the
 * tab opens, like a stamp pressed onto the sheet. The facts beside it use the
 * same hairline list as the Overview spread.
 */
export function EducationPanel({ go }: { go: (t: TabId) => void }) {
  const reduce = useReducedMotion()

  return (
    <PanelShell title="Education">
      <div className="grid items-center gap-x-[clamp(2rem,6vw,5rem)] gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <motion.img
          src={asset('/eu-logo.svg')}
          alt={`${school.name} seal`}
          width={1443}
          height={1423}
          decoding="async"
          initial={reduce ? false : { opacity: 0, scale: 1.14, rotate: -9 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          // The seal's lettering is cut out of the shape, so on the dark sheet it needs a light plate to read.
          className="mx-auto block aspect-square w-[min(100%,15rem)] object-contain dark:rounded-full dark:bg-on-violet dark:p-2 sm:w-[min(100%,19rem)] lg:w-full lg:max-w-[min(26rem,46svh)] lg:justify-self-center"
        />

        <div>
          <h4 className="text-balance font-serif text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.025em]">
            {school.name}
          </h4>
          <p className="mt-3 text-[1.1875rem] font-semibold sm:text-[1.3125rem]">{school.program}</p>

          <dl className="mt-6 border-t border-rule lg:mt-7">
            {school.facts.map((f) => (
              <div
                key={f.term}
                className="grid grid-cols-[5.25rem_1fr] gap-3 border-b border-rule py-3 text-[0.9375rem] sm:grid-cols-[8rem_1fr] sm:gap-4 sm:text-[1rem]"
              >
                <dt className="text-note">{f.term}</dt>
                <dd>{f.def}</dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={() => go('credentials')}
            className="group mt-4 inline-flex h-11 cursor-pointer items-center gap-2 text-[0.9375rem] font-medium underline decoration-rule-lit underline-offset-[6px] transition-colors duration-150 hover:text-mark hover:decoration-mark"
          >
            Outside the classroom: {certificates.length} certificates
            <ArrowRightIcon
              size={17}
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none"
            />
          </button>
        </div>
      </div>
    </PanelShell>
  )
}
