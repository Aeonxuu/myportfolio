import { CheckIcon, CopyIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { profile } from '@/data/profile'
import { PanelShell } from './shared'

export function ContactPanel() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked. The mailto link still works.
    }
  }

  return (
    <PanelShell title="Contact">
      <p className="measure font-serif text-[clamp(1.5rem,3.4vw,2.5rem)] font-medium italic leading-[1.15] tracking-[-0.02em]">
        What are you building?
      </p>
      <p className="measure mt-4 text-[1.0625rem] leading-[1.7] text-note">
        {profile.availability} I also take on freelance design and web work.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
        <a
          href={`mailto:${profile.email}`}
          className="break-all text-[clamp(1.125rem,2.6vw,1.75rem)] font-semibold tracking-[-0.01em] text-mark underline decoration-mark/40 decoration-2 underline-offset-[6px] transition-colors duration-150 hover:decoration-mark"
        >
          {profile.email}
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy email address"
          className="inline-flex size-11 cursor-pointer items-center justify-center text-note transition-[color,transform] duration-150 ease-out hover:text-type active:scale-[0.96]"
        >
          {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
        </button>
        <span aria-live="polite" className="text-[0.875rem] font-medium text-mark">
          {copied ? 'Copied' : ''}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6">
        {[
          { href: profile.links.linkedin, label: 'LinkedIn', Icon: LinkedinLogoIcon },
          { href: profile.links.github, label: 'GitHub', Icon: GithubLogoIcon },
        ].map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 items-center gap-2 text-[0.9375rem] font-medium underline decoration-rule-lit underline-offset-[6px] transition-colors duration-150 hover:text-mark hover:decoration-mark"
          >
            <Icon size={19} weight="fill" />
            {label}
          </a>
        ))}
      </div>
    </PanelShell>
  )
}
