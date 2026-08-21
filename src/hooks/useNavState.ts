import { useEffect, useState } from 'react'

/**
 * Drives the pill-to-bar morph, based on POSITION, not scroll direction.
 *
 * Near the landing the nav floats as a pill. Scroll down past it and the nav
 * sticks to the top as a bar, and STAYS a bar however far you go. Come back up
 * to the landing and it returns to a pill.
 *
 * Deliberately not an IntersectionObserver on a sentinel element. A zero-height
 * sentinel that jumps from below the viewport to above it in a single frame
 * never changes `isIntersecting`, so no callback fires and the nav silently
 * stays stuck. A position threshold cannot miss.
 *
 * The listener is passive and rAF-batched: setting React state on every scroll
 * frame is what makes a page feel heavy.
 */
export function useNavState() {
  const [isBar, setIsBar] = useState(false)

  useEffect(() => {
    let ticking = false

    function update() {
      // Roughly "the landing is behind you". Tied to viewport height so it
      // behaves the same on a laptop and a phone.
      setIsBar(window.scrollY > window.innerHeight * 0.6)
      ticking = false
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return isBar
}

/** Highlights the section currently in view. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
