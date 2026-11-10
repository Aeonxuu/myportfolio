import { achievements } from '@/data/education'
import { PanelShell } from './shared'

export function AchievementsPanel() {
  return (
    <PanelShell title="Achievements">
      <ul className="border-b border-rule">
        {achievements.map((a) => (
          <li
            key={a.title}
            className="grid gap-x-10 gap-y-1 border-t border-rule py-6 first:border-t-0 first:pt-0 lg:grid-cols-[15rem_1fr]"
          >
            <p className="order-2 text-[0.875rem] font-medium text-note lg:order-1">{a.year}</p>
            <div className="order-1 lg:order-2">
              <h4 className="font-serif text-[1.375rem] font-medium leading-tight tracking-[-0.02em]">{a.title}</h4>
              <p className="measure mt-2 text-[0.9375rem] leading-[1.65] text-note">{a.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </PanelShell>
  )
}
