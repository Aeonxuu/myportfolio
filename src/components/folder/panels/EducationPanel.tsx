import { ArrowRightIcon } from '@phosphor-icons/react'
import { certificates } from '@/data/certificates'
import { school } from '@/data/education'
import type { TabId } from '../tabs'
import { PanelShell } from './shared'

export function EducationPanel({ go }: { go: (t: TabId) => void }) {
  return (
    <PanelShell title="Education">
      <div className="grid gap-x-10 gap-y-4 lg:grid-cols-[15rem_1fr]">
        <p className="text-[0.9375rem] font-medium text-note">{school.status}</p>
        <div>
          <h4 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.025em]">
            {school.name}
          </h4>
          <p className="mt-2 text-[1.125rem] font-semibold">{school.program}</p>
          <p className="measure mt-4 text-[1rem] leading-[1.7] text-note">{school.note}</p>

          <button
            type="button"
            onClick={() => go('credentials')}
            className="group mt-8 inline-flex h-11 cursor-pointer items-center gap-2 text-[0.9375rem] font-medium underline decoration-rule-lit underline-offset-[6px] transition-colors duration-150 hover:text-mark hover:decoration-mark"
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
