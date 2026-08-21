import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { Section } from '@/components/layout/Section'
import { profile } from '@/data/profile'

export function Contact() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked. The mailto link below still works.
    }
  }

  return (
    <Section id="contact">
      <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
        What are you building?
      </h2>
      <p className="measure mt-4 text-[1.0625rem] leading-[1.7] text-note">
        I am looking for an internship, and I take on freelance design and web work.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="text-[clamp(1.125rem,3vw,1.75rem)] font-medium tracking-[-0.01em] text-mark underline decoration-mark/40 decoration-2 underline-offset-[6px] transition-colors duration-150 hover:decoration-mark"
        >
          {profile.email}
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy email address"
          className="inline-flex size-9 items-center justify-center rounded-lg border border-rule text-note transition-colors duration-150 ease-out hover:border-rule-lit hover:text-type"
        >
          {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
        </button>
        {copied && <span className="font-mono text-[0.75rem] text-mark">Copied</span>}
      </div>

      <footer className="mt-[clamp(4rem,8vw,7rem)] border-t border-rule pt-6">
        <p className="font-mono text-[0.75rem] text-note">
          Designed and built by {profile.name}
        </p>
      </footer>
    </Section>
  )
}
