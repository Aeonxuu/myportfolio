import { useEffect, type RefObject } from 'react'

const SETTLE_MS = 140
const PULL_MS = 520
/** How near the centre line, as a share of the viewport height, the target
 *  must be when scrolling settles for the pull to engage. */
const REACH = 0.4
/** Space kept clear at the bottom for the floating navbar (pill + its margin). */
const BOTTOM_INSET = 64

const easeOutQuart = (t: number) => 1 - (1 - t) ** 4

/**
 * Soft scroll magnet. When scrolling comes to rest with the target near the
 * middle of the screen, and the visitor was heading toward it, the page eases
 * the target to the centre of the visible area, clear of the navbar (or flush
 * to the top if it is taller than the screen).
 *
 * Deliberately one-way: it only pulls on arrival. Once you scroll past the
 * target nothing drags you back, so the footer stays reachable and it never
 * fights a visitor who is leaving. Any wheel, touch, key or click cancels the
 * pull mid-flight. Off on touch devices and with reduced motion.
 */
export function useMagnet(target: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const el = target.current
    if (!el) return

    let timer = 0
    let raf = 0
    let pulling = false
    let lastY = window.scrollY
    let dir = 0

    const cancelPull = () => {
      cancelAnimationFrame(raf)
      pulling = false
    }

    const pull = (to: number) => {
      const from = window.scrollY
      const start = performance.now()
      pulling = true
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / PULL_MS)
        // `instant` overrides the page's CSS scroll-behavior: smooth.
        window.scrollTo({ top: from + (to - from) * easeOutQuart(t), behavior: 'instant' })
        if (t < 1 && pulling) raf = requestAnimationFrame(step)
        else pulling = false
      }
      raf = requestAnimationFrame(step)
    }

    const settle = () => {
      const vh = window.innerHeight
      const rect = el.getBoundingClientRect()
      const atBottom = window.scrollY + vh >= document.documentElement.scrollHeight - 2
      if (atBottom || dir === 0) return

      // Where the target's top edge should rest: centred in the space above the
      // navbar, or 16px from the top if it does not fit.
      const room = vh - BOTTOM_INSET
      const restTop = rect.height + 32 <= room ? (room - rect.height) / 2 : 16
      const offset = rect.top - restTop // > 0 means the target is still below its resting place
      const approaching = (dir > 0 && offset > 0) || (dir < 0 && offset < 0)
      if (!approaching || Math.abs(offset) < 2 || Math.abs(offset) > vh * REACH) return

      pull(window.scrollY + offset)
    }

    const onScroll = () => {
      if (pulling) return
      const y = window.scrollY
      if (y !== lastY) dir = y > lastY ? 1 : -1
      lastY = y
      window.clearTimeout(timer)
      timer = window.setTimeout(settle, SETTLE_MS)
    }

    const onUser = () => {
      if (!pulling) return
      cancelPull()
      lastY = window.scrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onUser, { passive: true })
    window.addEventListener('touchstart', onUser, { passive: true })
    window.addEventListener('keydown', onUser)
    window.addEventListener('pointerdown', onUser)
    return () => {
      window.clearTimeout(timer)
      cancelPull()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onUser)
      window.removeEventListener('touchstart', onUser)
      window.removeEventListener('keydown', onUser)
      window.removeEventListener('pointerdown', onUser)
    }
  }, [target, enabled])
}
