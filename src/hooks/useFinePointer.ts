import { useEffect, useState } from 'react'

/**
 * True only on devices with a real hover-capable pointer.
 *
 * Touch screens fire synthetic hover on tap, which leaves cards stuck in a
 * tilted state after a finger lifts. Motion driven by JS has to gate on this
 * explicitly; CSS `hover:` is already gated by Tailwind v4.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFine(query.matches)
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return fine
}
