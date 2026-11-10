import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

const THEME_COLOR: Record<Theme, string> = {
  dark: '#151517',
  light: '#FAFAFA',
}

/**
 * Read from the DOM rather than recomputing. The inline script in index.html
 * already resolved the theme before first paint; recomputing here risks
 * disagreeing with it and causing a flash on hydration.
 */
function themeFromDom(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function apply(theme: Theme) {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.style.colorScheme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOR[theme])
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(themeFromDom)

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // The choice applies for this session but will not persist.
    }
    apply(next)
    setThemeState(next)
  }, [])

  const toggle = useCallback(() => {
    setTheme(themeFromDom() === 'light' ? 'dark' : 'light')
  }, [setTheme])

  return { theme, setTheme, toggle }
}
