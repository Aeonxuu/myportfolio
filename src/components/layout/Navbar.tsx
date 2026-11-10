import { useEffect, useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#folder', label: 'Folder' },
]

/**
 * A single flat bar. Transparent over the masthead, then it takes the page
 * colour and a hairline once the visitor has scrolled. The listener is passive
 * and only sets state when the answer changes.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-200 ease-out',
        scrolled ? 'border-rule bg-canvas' : 'border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-(--gutter)"
      >
        <a
          href="#top"
          className="font-serif text-[1.125rem] italic tracking-[-0.01em] transition-colors duration-150 hover:text-mark"
        >
          L. dela Cruz
        </a>

        <div className="flex items-center gap-1 sm:gap-3">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-flex h-11 items-center px-2 text-[0.9375rem] font-medium transition-colors duration-150 hover:text-mark"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle className="-mr-2" />
        </div>
      </nav>
    </header>
  )
}
