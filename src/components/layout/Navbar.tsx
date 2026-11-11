import { ThemeToggle } from '@/components/ui/ThemeToggle'

const LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#folder', label: 'Folder' },
]

/**
 * A floating glass pill, fixed to the bottom centre. The only place on the
 * site that uses blur: the page scrolls underneath and shows through it.
 * `env(safe-area-inset-bottom)` keeps it clear of the iOS home indicator.
 */
export function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/40 bg-canvas/30 px-2 py-1 shadow-[0_8px_32px_rgb(0_0_0/0.12),inset_0_1px_0_rgb(255_255_255/0.45)] backdrop-blur-lg backdrop-saturate-150 dark:border-white/12 dark:shadow-[0_8px_32px_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.08)]"
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="inline-flex h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-150 hover:bg-type/8 hover:text-mark"
          >
            {l.label}
          </a>
        ))}
        <span aria-hidden className="mx-1 h-5 w-px bg-rule-lit" />
        <ThemeToggle className="rounded-full hover:bg-type/8" />
      </nav>
    </header>
  )
}
