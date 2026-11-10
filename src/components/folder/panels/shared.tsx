import type { ReactNode } from 'react'

/** Every panel opens the same way: a Bodoni italic title, then its content. */
export function PanelShell({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <div className="px-5 pb-10 pt-6 sm:px-8 sm:pt-8 lg:px-12 lg:pb-14 lg:pt-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-type pb-4 lg:mb-8">
        <h3 className="font-serif text-[clamp(1.875rem,4vw,3rem)] font-medium italic leading-none tracking-[-0.025em]">
          {title}
        </h3>
        {aside}
      </div>
      {children}
    </div>
  )
}

/** Text-only switch (filters, sub-tabs). Underline marks the current one. */
export function Switch<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string; count?: number }[]
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-x-5">
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={on}
            className={
              'relative inline-flex h-11 cursor-pointer items-center gap-1.5 text-[0.9375rem] font-medium transition-colors duration-150 ' +
              'after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:origin-left after:bg-mark after:transition-transform after:duration-200 after:ease-out ' +
              (on ? 'text-type after:scale-x-100' : 'text-note after:scale-x-0 hover:text-type')
            }
          >
            {o.label}
            {o.count !== undefined && <span className="text-[0.8125rem] text-note">{o.count}</span>}
          </button>
        )
      })}
    </div>
  )
}
