import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

/**
 * Bare icon, no label. Everyone already knows what this does, and the labelled
 * control in the cluster is Inspect, which actually needs explaining.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const next = theme === 'light' ? 'dark' : 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-xl',
        'border border-rule text-note',
        'transition-[background-color,border-color,color] duration-[150ms] ease-out',
        'hover:border-rule-lit hover:bg-plate-2 hover:text-type',
        'active:scale-[0.98]',
        className,
      )}
    >
      {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
    </button>
  )
}
