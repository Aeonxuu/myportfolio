import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Consistent section rhythm. No eyebrow prop by design: eyebrows above every
 * section are the single most-flagged AI tell, and the heading alone is enough.
 */
export function Section({
  id,
  title,
  lead,
  children,
  className,
  full = false,
}: {
  id: string
  title?: string
  lead?: string
  children: ReactNode
  className?: string
  /** Skip the inner max-width, for sections that bleed to the viewport edge. */
  full?: boolean
}) {
  return (
    <section
      id={id}
      /* Anchor jumps must clear the sticky bar, or the heading lands underneath
         it and reads as a broken link. */
      className={cn('scroll-mt-20 py-[clamp(4.5rem,10vw,8rem)]', className)}
    >
      <div className={cn(!full && 'mx-auto max-w-[1200px] px-[clamp(1.25rem,5vw,4rem)]')}>
        {title && (
          <header className="mb-[clamp(2rem,4vw,3.5rem)]">
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {title}
            </h2>
            {lead && (
              <p className="measure mt-4 text-[1.0625rem] leading-[1.7] text-note">{lead}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
