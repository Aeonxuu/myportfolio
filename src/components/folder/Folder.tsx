import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMagnet } from '@/hooks/useMagnet'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { AboutPanel } from './panels/AboutPanel'
import { AchievementsPanel } from './panels/AchievementsPanel'
import { ContactPanel } from './panels/ContactPanel'
import { CredentialsPanel } from './panels/CredentialsPanel'
import { EducationPanel } from './panels/EducationPanel'
import { ExperiencePanel } from './panels/ExperiencePanel'
import { WorksPanel } from './panels/WorksPanel'
import { isTabId, TABS, type TabId } from './tabs'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

/**
 * One big folder. Landscape with tabs along the top on desktop; portrait with
 * the tabs down the right edge, text running sideways, below 1024px.
 *
 * The active tab is the same violet as the folder body and sits flush with it,
 * so it reads as part of the folder. Inactive tabs are deeper violet and sit
 * a few pixels back, tucked behind the body.
 */
export function Folder() {
  const [tab, setTab] = useState<TabId>(() => tabFromHash() ?? 'works')
  const [dir, setDir] = useState(1)
  const wide = useMediaQuery('(min-width: 1024px)')
  const mouse = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  // Measured on a plain wrapper: the folder itself is mid-tilt while it arrives.
  const magnetRef = useRef<HTMLDivElement>(null)
  useMagnet(magnetRef, wide && mouse && !reduce)

  const select = useCallback(
    (next: TabId, opts: { focus?: boolean } = {}) => {
      setDir(TABS.findIndex((t) => t.id === next) >= TABS.findIndex((t) => t.id === tab) ? 1 : -1)
      setTab(next)
      history.replaceState(null, '', `#${next}`)
      if (opts.focus) tabRefs.current[next]?.focus()
    },
    [tab],
  )

  // Deep links: /#credentials opens that tab and brings the folder into view.
  useEffect(() => {
    const onHash = () => {
      const id = tabFromHash()
      if (!id) return
      setDir(1)
      setTab(id)
      sectionRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    }
    window.addEventListener('hashchange', onHash)
    if (tabFromHash()) requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ block: 'start' }))
    return () => window.removeEventListener('hashchange', onHash)
  }, [reduce])

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const next = wide ? ['ArrowRight', 'ArrowLeft'] : ['ArrowDown', 'ArrowUp']
    let target = -1
    if (e.key === next[0]) target = (index + 1) % TABS.length
    else if (e.key === next[1]) target = (index - 1 + TABS.length) % TABS.length
    else if (e.key === 'Home') target = 0
    else if (e.key === 'End') target = TABS.length - 1
    if (target < 0) return
    e.preventDefault()
    select(TABS[target]!.id, { focus: true })
  }

  // The folder tilts up from below and settles flat as it arrives.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 0.3'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0])
  const lift = useTransform(scrollYProgress, [0, 1], [90, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])

  return (
    <section
      id="folder"
      ref={sectionRef}
      aria-labelledby="folder-title"
      className="scroll-mt-0 px-(--gutter) pb-[clamp(3rem,7vw,6rem)] pt-[clamp(3rem,7vw,6rem)]"
      style={{ perspective: 1600 }}
    >
      <h2 id="folder-title" className="sr-only">
        Folder: works, experience, credentials, education, achievements, about and contact
      </h2>

      <div ref={magnetRef} className="mx-auto max-w-[1280px]">
        <motion.div
          style={reduce ? undefined : { rotateX, y: lift, scale, transformOrigin: '50% 100%' }}
          className="folder flex flex-row-reverse items-start lg:flex-col"
        >
          <div
            role="tablist"
            aria-label="Folder sections"
            aria-orientation={wide ? 'horizontal' : 'vertical'}
            className="flex flex-col gap-[3px] pt-9 lg:flex-row lg:pt-0"
          >
            {TABS.map((t, i) => {
              const active = t.id === tab
              // The active tab joins the body; the others sit back a few pixels.
              // Offsets are transforms, so nothing reflows.
              const rest = active ? { x: 0, y: 0 } : wide ? { x: 0, y: 7 } : { x: -7, y: 0 }
              return (
                <motion.button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[t.id] = el
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(t.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  initial={{ opacity: reduce ? 1 : 0, ...rest }}
                  animate={rest}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: reduce ? 0 : 0.25 + i * 0.045, ease: EASE_OUT }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    'relative cursor-pointer text-[0.8125rem] font-semibold tracking-[0.005em] text-on-violet',
                    'transition-colors duration-150 ease-out',
                    // Vertical tab (mobile): text runs top to bottom, rounded on the outer edge.
                    // Physical padding on purpose: Tailwind's px/py are logical and swap axes in a vertical writing mode.
                    'min-w-11 rounded-r-[9px] pb-3.5 pl-0 pr-0 pt-3.5 [writing-mode:vertical-rl]',
                    // Horizontal tab (desktop)
                    'lg:min-h-12 lg:min-w-0 lg:rounded-r-none lg:rounded-t-[9px] lg:pb-0 lg:pl-6 lg:pr-6 lg:pt-0 lg:text-[0.9375rem] lg:[writing-mode:horizontal-tb]',
                    active
                      ? 'z-20 bg-violet'
                      : 'z-0 bg-violet-deep hover:bg-[color-mix(in_oklab,var(--violet-deep),var(--violet)_38%)]',
                  )}
                >
                  <span className="relative">{t.label}</span>
                </motion.button>
              )
            })}
          </div>

          {/* The body. Its overlap with the tab row is what makes the join. */}
          <div
            className={cn(
              'relative z-[5] min-w-0 flex-1 bg-violet p-2.5 sm:p-3 lg:w-full lg:flex-none lg:p-4',
              'rounded-l-[10px] rounded-br-[10px] rounded-tr-[10px] lg:rounded-l-none lg:rounded-bl-[10px] lg:rounded-tr-[10px]',
              // Tabs overlap the body edge by a pixel so no seam shows.
              '-mr-px lg:mr-0 lg:-mt-px',
            )}
          >
            <div className="sheet relative h-[clamp(42rem,84svh,52rem)] overflow-hidden bg-sheet text-type lg:h-[clamp(34rem,78svh,46rem)]">
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.div
                  key={tab}
                  role="tabpanel"
                  id={`panel-${tab}`}
                  aria-labelledby={`tab-${tab}`}
                  tabIndex={0}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : 18 * d }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : -10 * d }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  className="sheet-scroll absolute inset-0 overflow-y-auto overflow-x-hidden"
                >
                  <Panel id={tab} go={select} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function tabFromHash(): TabId | null {
  const id = window.location.hash.slice(1)
  return isTabId(id) ? id : null
}

function Panel({ id, go }: { id: TabId; go: (t: TabId) => void }) {
  switch (id) {
    case 'works':
      return <WorksPanel />
    case 'experience':
      return <ExperiencePanel />
    case 'credentials':
      return <CredentialsPanel />
    case 'education':
      return <EducationPanel go={go} />
    case 'achievements':
      return <AchievementsPanel />
    case 'about':
      return <AboutPanel />
    case 'contact':
      return <ContactPanel />
  }
}
