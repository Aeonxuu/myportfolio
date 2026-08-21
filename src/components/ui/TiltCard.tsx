import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { ReactNode } from 'react'
import { useFinePointer } from '@/hooks/useFinePointer'
import { cn } from '@/lib/utils'

/** Apple-style spring: interruptible, velocity-aware, reads as physical. */
const SPRING = { type: 'spring', duration: 0.5, bounce: 0.2 } as const
const MAX_TILT = 8

/**
 * Tilts toward the cursor with a violet glare that follows it.
 *
 * Bounce is allowed here, unlike on the lightbox or the toggles, because this
 * is deliberately playful rather than a utility action.
 */
export function TiltCard({
  children,
  className,
  onClick,
  label,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  label: string
}) {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const active = fine && !reduced

  const rx = useSpring(useMotionValue(0), SPRING)
  const ry = useSpring(useMotionValue(0), SPRING)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, var(--mark-tint), transparent 55%)`

  function onMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!active) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * MAX_TILT * 2)
    rx.set((0.5 - py) * MAX_TILT * 2)
    gx.set(px * 100)
    gy.set(py * 100)
  }

  function reset() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={active ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 } : undefined}
      className={cn(
        'group relative block w-full overflow-hidden rounded-xl text-left',
        'border border-rule bg-plate',
        // Depth from an inner border and a ground-tinted shadow, never an
        // outer glow. The Lila Rule bans the neon-purple-bloom treatment.
        'transition-[border-color,box-shadow] duration-200 ease-out',
        'hover:border-mark/40 hover:shadow-[var(--shadow-plate)]',
        className,
      )}
    >
      {children}
      {active && (
        <motion.span
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      )}
    </motion.button>
  )
}
