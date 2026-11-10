import { capstone, roles } from '@/data/experience'
import { PanelShell } from './shared'

export function ExperiencePanel() {
  return (
    <PanelShell title="Experience">
      <ol className="divide-y divide-rule border-b border-rule">
        {roles.map((r) => (
          <li key={r.org} className="grid gap-x-10 gap-y-3 py-7 first:pt-0 lg:grid-cols-[15rem_1fr]">
            <div>
              <h4 className="font-serif text-[1.375rem] font-medium leading-tight tracking-[-0.02em]">{r.org}</h4>
              <p className="mt-1 text-[0.875rem] text-note">
                {r.period}
                <br />
                {r.place}
              </p>
            </div>
            <div>
              <p className="text-[1rem] font-semibold">{r.title}</p>
              <ul className="measure mt-3 space-y-2.5 text-[0.9375rem] leading-[1.65]">
                {r.points.map((p) => (
                  <li key={p.slice(0, 28)} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-type">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="grid gap-x-10 gap-y-3 pt-7 lg:grid-cols-[15rem_1fr]">
        <div>
          <h4 className="font-serif text-[1.375rem] font-medium leading-tight tracking-[-0.02em]">{capstone.title}</h4>
          <p className="mt-1 text-[0.875rem] text-note">{capstone.period}</p>
        </div>
        <div>
          <p className="text-[1rem] font-semibold">{capstone.role}</p>
          <p className="mt-1 text-[0.875rem] text-note">{capstone.stack.join(', ')}</p>
          <ul className="measure mt-3 space-y-2.5 text-[0.9375rem] leading-[1.65]">
            {capstone.points.map((p) => (
              <li key={p.slice(0, 28)} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-type">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PanelShell>
  )
}
