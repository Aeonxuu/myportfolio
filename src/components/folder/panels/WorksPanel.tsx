import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { designPieces } from '@/data/design'
import type { DesignPiece } from '@/data/types'
import { webProjects } from '@/data/websites'
import { PanelShell, Switch } from './shared'
import { asset } from '@/lib/asset'

type View = 'websites' | 'design'

export function WorksPanel() {
  const [view, setView] = useState<View>('websites')
  const [open, setOpen] = useState<DesignPiece | null>(null)

  return (
    <PanelShell
      title="Works"
      aside={
        <Switch
          label="Kind of work"
          value={view}
          onChange={setView}
          options={[
            { value: 'websites', label: 'Websites', count: webProjects.length },
            { value: 'design', label: 'Design', count: designPieces.length },
          ]}
        />
      }
    >
      {view === 'websites' ? (
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
          {webProjects.map((site) => (
            <a
              key={site.slug}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.title}, ${site.domain} (opens in a new tab)`}
              className="group block"
            >
              <div className="overflow-hidden border border-rule">
                <img
                  src={asset(site.thumb)}
                  alt={`${site.title} homepage`}
                  width={site.width}
                  height={site.height}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-serif text-[1.5rem] font-medium leading-tight tracking-[-0.02em]">
                    {site.title}
                  </h4>
                  <p className="mt-1 text-[0.875rem] font-medium text-mark">{site.domain}</p>
                </div>
                <ArrowUpRightIcon
                  aria-hidden
                  size={22}
                  className="mt-1 shrink-0 text-note transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mark motion-reduce:transform-none"
                />
              </div>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-note">{site.summary}</p>
            </a>
          ))}
        </div>
      ) : (
        <>
          {/* Columns rather than a grid: each piece keeps its own proportions. */}
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 [&>*]:mb-4">
            {designPieces.map((piece) => (
              <button
                key={piece.slug}
                type="button"
                onClick={() => setOpen(piece)}
                aria-label={`View ${piece.title}`}
                className="group block w-full cursor-pointer break-inside-avoid overflow-hidden border border-rule"
              >
                <img
                  src={asset(piece.src)}
                  alt={piece.title}
                  width={piece.width}
                  height={piece.height}
                  loading="lazy"
                  decoding="async"
                  className="block w-full transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
                />
              </button>
            ))}
          </div>

          <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
            <DialogContent className="max-w-[min(94vw,1100px)] border-rule bg-sheet p-2 sm:max-w-[min(94vw,1100px)]">
              {open && (
                <>
                  <DialogTitle className="sr-only">{open.title}</DialogTitle>
                  <img
                    src={asset(open.src)}
                    alt={open.title}
                    width={open.width}
                    height={open.height}
                    className="max-h-[82vh] w-full object-contain"
                  />
                </>
              )}
            </DialogContent>
          </Dialog>
        </>
      )}
    </PanelShell>
  )
}
