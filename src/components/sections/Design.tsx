import { useState } from 'react'
import { Section } from '@/components/layout/Section'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { designPieces } from '@/data/design'
import type { DesignPiece } from '@/data/types'

export function Design() {
  const [open, setOpen] = useState<DesignPiece | null>(null)

  return (
    <Section
      id="design"
      title="Design work"
      lead="Brochures, posters, signage and event material. Every piece is shown at its own proportions, never cropped to fit a grid."
    >
      {/* CSS columns rather than a fixed grid: the set is 7 landscape, 2 portrait
          and 2 square, and letting each piece keep its true ratio is the point. */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {designPieces.map((piece) => (
          <button
            key={piece.slug}
            type="button"
            onClick={() => setOpen(piece)}
            aria-label={`View ${piece.title}`}
            /* The one hover-scale on the page. Zoom plus a slight tilt, on a
               spring-like curve. `z-10` on hover so the lifted card sits above
               its neighbours instead of being clipped by them. Tailwind v4
               gates `hover:` behind (hover: hover), so a tap on a phone opens
               the lightbox rather than leaving a card stuck mid-tilt. */
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl border border-rule shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:z-10 hover:-rotate-[0.7deg] hover:scale-[1.025] hover:border-mark/40 hover:shadow-[var(--shadow-lift)] motion-reduce:transform-none"
          >
            <img
              src={piece.src}
              alt={piece.title}
              /* Intrinsic size reserves the exact box before the image lands,
                 which is what holds CLS at zero in a masonry layout. */
              width={piece.width}
              height={piece.height}
              loading="lazy"
              decoding="async"
              className="block w-full"
            />

            {/* The work speaks first. The title arrives only on hover, over a
                dim, so the grid reads as images rather than as labelled cards.
                Tailwind v4 gates `hover:` behind (hover: hover), so a tap on
                a phone opens the lightbox instead of sticking this open. */}
            <span
              className="pointer-events-none absolute inset-0 flex items-end bg-[#0b0a0f]/0 p-4 opacity-0 transition-[opacity,background-color] duration-200 ease-out group-hover:bg-[#0b0a0f]/65 group-hover:opacity-100 group-focus-visible:bg-[#0b0a0f]/65 group-focus-visible:opacity-100"
            >
              <span className="flex w-full items-baseline justify-between gap-3">
                <span className="text-[0.9375rem] font-medium text-white">{piece.title}</span>
                <span className="shrink-0 font-mono text-[0.6875rem] capitalize text-white/70">
                  {piece.medium}
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-[min(94vw,1100px)] border-rule bg-plate p-2 sm:max-w-[min(94vw,1100px)]">
          {open && (
            <>
              <DialogTitle className="sr-only">{open.title}</DialogTitle>
              <img
                src={open.src}
                alt={open.title}
                width={open.width}
                height={open.height}
                className="max-h-[82vh] w-full rounded object-contain"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  )
}
