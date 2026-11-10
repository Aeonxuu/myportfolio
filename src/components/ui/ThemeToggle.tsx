import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

/** Bare icon, no label. Everyone already knows what this does. */
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
        'inline-flex size-11 cursor-pointer items-center justify-center text-type',
        'transition-[color,transform] duration-150 ease-out',
        'hover:text-mark active:scale-[0.96]',
        className,
      )}
    >
      {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </button>
  )
}
