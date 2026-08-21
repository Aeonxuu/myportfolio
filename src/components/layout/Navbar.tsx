import { motion, useReducedMotion } from 'motion/react'
import { useMemo } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useActiveSection, useNavState } from '@/hooks/useNavState'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'design', label: 'Design' },
  { id: 'certificates', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
] as const

export function Navbar() {
  const isBar = useNavState()
  const reduced = useReducedMotion()
  const ids = useMemo(() => LINKS.map((l) => l.id), [])
  const active = useActiveSection(ids)

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex justify-center',
        'transition-[padding] duration-300 ease-out',
        isBar ? 'px-0 pt-0' : 'px-3 pt-3 sm:pt-4',
      )}
    >
      <motion.nav
        /* `layout` lets motion FLIP between the two widths. Animating max-width
           between a rem value and a percentage does not interpolate reliably;
           a layout animation measures both states and transforms between them. */
        layout={!reduced}
        style={{ borderRadius: isBar ? 0 : 999 }}
        transition={
          reduced ? { duration: 0 } : { duration: 0.28, ease: [0.23, 1, 0.32, 1] }
        }
        className={cn(
          'flex items-center gap-1 border backdrop-blur-xl',
          // Utility element, so no bounce and nothing decorative.
          'bg-plate/70 border-rule',
          isBar
            ? 'w-full max-w-none justify-between border-x-0 border-t-0 px-[clamp(1.25rem,5vw,4rem)] py-2.5'
            : 'w-auto max-w-full justify-center py-1.5 pl-4 pr-1.5',
        )}
      >
        {isBar && (
          <a
            href="#about"
            className="mr-4 hidden shrink-0 text-[0.9375rem] font-medium tracking-[-0.01em] text-type sm:block"
          >
            {profile.nameLines[0]}
          </a>
        )}

        <ul className="flex items-center gap-0.5">
          {LINKS.map((link) => {
            const on = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={cn(
                    'relative block rounded-full px-3 py-1.5 text-[0.8125rem] font-medium',
                    'transition-colors duration-150 ease-out',
                    on ? 'text-type' : 'text-note hover:text-type',
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-mark-tint"
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <ThemeToggle className="ml-1 size-8 shrink-0 rounded-full border-0 hover:bg-plate-2" />
      </motion.nav>
    </div>
  )
}
