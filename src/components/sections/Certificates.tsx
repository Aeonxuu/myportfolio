import { useMemo, useState } from 'react'
import { ArrowSquareOutIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Section } from '@/components/layout/Section'
import { TiltCard } from '@/components/ui/TiltCard'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { certificates } from '@/data/certificates'
import type { Certificate, CertificateCategory } from '@/data/types'
import { cn } from '@/lib/utils'

const FILTERS: { value: CertificateCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'systems', label: 'Systems' },
  { value: 'design', label: 'Design' },
]

export function Certificates() {
  const [filter, setFilter] = useState<CertificateCategory | 'all'>('all')
  const [open, setOpen] = useState<Certificate | null>(null)
  const reduced = useReducedMotion()

  const shown = useMemo(
    () => (filter === 'all' ? certificates : certificates.filter((c) => c.category === filter)),
    [filter],
  )

  return (
    <Section
      id="certificates"
      title="Credentials"
      lead={`${certificates.length} certificates, all verifiable. Click any one to see it full size.`}
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f.value === 'all'
              ? certificates.length
              : certificates.filter((c) => c.category === f.value).length
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={cn(
                'rounded-full border px-4 py-1.5 text-[0.8125rem] font-medium',
                'transition-colors duration-150 ease-out',
                filter === f.value
                  ? 'border-transparent bg-mark-solid text-on-mark'
                  : 'border-rule text-note hover:border-rule-lit hover:text-type',
              )}
            >
              {f.label}
              <span className="ml-2 font-mono text-[0.6875rem] opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      {/* The one staggered list on the page. A second would be the tell. */}
      <motion.ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial={reduced ? false : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ shown: { transition: { staggerChildren: 0.04 } } }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((cert) => (
            <motion.li
              key={cert.slug}
              layout
              variants={{
                hidden: { opacity: 0, transform: 'translateY(16px)' },
                shown: { opacity: 1, transform: 'translateY(0px)' },
              }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <TiltCard label={`View ${cert.title}`} onClick={() => setOpen(cert)}>
                {/* 1772x928 on every source image, so one fixed ratio fits all
                    23 with no letterboxing. */}
                <img
                  src={cert.thumb}
                  alt={cert.title}
                  width={1772}
                  height={928}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[1772/928] w-full object-cover"
                />
                <div className="border-t border-rule p-4">
                  <p className="text-[0.9375rem] font-medium leading-snug text-type">
                    {cert.title}
                  </p>
                  <p className="mt-1 font-mono text-[0.6875rem] text-note">
                    {cert.issuer}
                    {cert.isSpecialization && ' / Specialization'}
                  </p>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-[min(94vw,1100px)] border-rule bg-plate p-0 sm:max-w-[min(94vw,1100px)]">
          {open && (
            <>
              <img
                src={open.full}
                alt={open.title}
                width={1772}
                height={928}
                className="aspect-[1772/928] w-full rounded-t-lg object-contain"
              />
              <div className="flex flex-wrap items-end justify-between gap-4 p-5 pt-1">
                <div>
                  <DialogTitle className="text-[1.125rem] font-medium tracking-[-0.01em]">
                    {open.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 font-mono text-[0.75rem] text-note">
                    {open.issuer}
                  </DialogDescription>
                </div>
                {open.verifyUrl ? (
                  <Button asChild size="sm">
                    <a href={open.verifyUrl} target="_blank" rel="noreferrer noopener">
                      Verify
                      <ArrowSquareOutIcon size={15} />
                    </a>
                  </Button>
                ) : (
                  /* No button rather than a wrong one. A Verify link that opens
                     someone else's certificate is worse than none. */
                  <p className="font-mono text-[0.6875rem] text-note">Verification link pending</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  )
}
