import { GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'

const SOCIALS = [
  { href: profile.links.linkedin, label: 'LinkedIn', Icon: LinkedinLogoIcon },
  { href: profile.links.github, label: 'GitHub', Icon: GithubLogoIcon },
]

/**
 * Landing and About in one opening: photo left, words right. A hero followed by
 * a second section reintroducing the same person was one section too many.
 */
export function Landing() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden">
      {/* The only gradient on the page. One restrained wash is intent. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-[-15%] h-[65vh] w-[65vw] rounded-full opacity-70 blur-[130px]"
        style={{ background: 'radial-gradient(circle, var(--mark-tint) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1200px] px-[clamp(1.25rem,5vw,4rem)] pb-[clamp(4rem,9vw,7rem)] pt-[clamp(6rem,13vw,9rem)]">
        <div className="grid items-start gap-[clamp(2rem,5vw,4rem)] md:grid-cols-[minmax(0,20rem)_1fr]">
          <img
            src={profile.photo}
            alt={profile.name}
            width={640}
            height={853}
            /* Square corners, by request. 3:4, matching the source. */
            className="w-full max-w-[20rem] border border-rule object-cover shadow-[var(--shadow-soft)]"
          />

          <div>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              {profile.nameLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <div className="measure mt-7 space-y-5">
              {profile.about.map((para) => (
                <p key={para.slice(0, 24)} className="text-[1.0625rem] leading-[1.7] text-note">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="#design">See the work</a>
              </Button>

              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-xl border border-rule px-4 py-2.5 text-[0.9375rem] font-medium text-type transition-colors duration-150 ease-out hover:border-mark/50 hover:bg-plate-2 hover:text-mark"
                >
                  <Icon size={19} weight="fill" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
