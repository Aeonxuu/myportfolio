import { toolkit } from '@/data/education'
import { profile } from '@/data/profile'
import { PanelShell } from './shared'

export function AboutPanel() {
  return (
    <PanelShell title="About me">
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
        <div className="measure space-y-5 text-[1.0625rem] leading-[1.7]">
          {profile.about.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <p className="border-t border-type pt-5 font-serif text-[1.25rem] italic leading-snug">
            {profile.availability}
          </p>
        </div>

        <dl>
          {toolkit.map((g) => (
            <div key={g.group} className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-rule py-4 first:border-t-0 first:pt-0">
              <dt className="text-[0.9375rem] font-semibold">{g.group}</dt>
              <dd className="text-[0.9375rem] leading-[1.65] text-note">{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </PanelShell>
  )
}
