import { ArrowSquareOutIcon } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { certificates } from '@/data/certificates'
import type { Certificate, CertificateCategory } from '@/data/types'
import { PanelShell, Switch } from './shared'
import { asset } from '@/lib/asset'

type Filter = CertificateCategory | 'all'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'systems', label: 'Systems' },
  { value: 'design', label: 'Design' },
]

export function CredentialsPanel() {
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<Certificate | null>(null)

  const shown = useMemo(
    () => (filter === 'all' ? certificates : certificates.filter((c) => c.category === filter)),
    [filter],
  )

  return (
    <PanelShell
      title="Credentials"
      aside={
        <Switch
          label="Filter certificates"
          value={filter}
          onChange={setFilter}
          options={FILTERS.map((f) => ({
            ...f,
            count: f.value === 'all' ? certificates.length : certificates.filter((c) => c.category === f.value).length,
          }))}
        />
      }
    >
      <ul className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((cert) => (
          <li key={cert.slug}>
            <button
              type="button"
              onClick={() => setOpen(cert)}
              aria-label={`View ${cert.title}, ${cert.issuer}`}
              className="group block w-full cursor-pointer text-left"
            >
              <span className="block overflow-hidden border border-rule">
                {/* 1772x928 on every source image: one fixed ratio, no letterboxing. */}
                <img
                  src={asset(cert.thumb)}
                  alt=""
                  width={1772}
                  height={928}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[1772/928] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                />
              </span>
              <span className="mt-2 block text-[0.9375rem] font-medium leading-snug">{cert.title}</span>
              <span className="block text-[0.8125rem] text-note">
                {cert.issuer}
                {cert.isSpecialization && ', Specialization'}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-[min(94vw,1100px)] border-rule bg-sheet p-0 sm:max-w-[min(94vw,1100px)]">
          {open && (
            <>
              <img
                src={asset(open.full)}
                alt={`${open.title} certificate`}
                width={1772}
                height={928}
                className="aspect-[1772/928] w-full object-contain"
              />
              <div className="flex flex-wrap items-end justify-between gap-4 p-5 pt-1">
                <div>
                  <DialogTitle className="font-serif text-[1.375rem] font-medium tracking-[-0.02em]">
                    {open.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-[0.875rem] text-note">{open.issuer}</DialogDescription>
                </div>
                {open.verifyUrl ? (
                  <Button asChild size="lg">
                    <a href={open.verifyUrl} target="_blank" rel="noreferrer noopener">
                      Verify
                      <ArrowSquareOutIcon size={15} />
                    </a>
                  </Button>
                ) : (
                  /* No button rather than a wrong one. */
                  <p className="text-[0.8125rem] text-note">Verification link pending</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PanelShell>
  )
}
