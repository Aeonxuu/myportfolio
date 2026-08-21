import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

const THEME_COLOR: Record<Theme, string> = {
  dark: '#16131F',
  light: '#FAFAFB',
}

/** The visitor's stated preference, or null if they have never chosen. */
function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    // Private mode, or site data blocked. Treat as "no preference".
    return null
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
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

  // Follow the OS, but only while the visitor has not stated a preference.
  // Once they choose, their choice wins until they change it.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: light)')

    const onChange = () => {
      if (readStored()) return
      const next = systemTheme()
      apply(next)
      setThemeState(next)
    }

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

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
