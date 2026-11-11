import { Folder } from '@/components/folder/Folder'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Overview } from '@/components/sections/Overview'
import { profile } from '@/data/profile'

export default function App() {
  return (
    <>
      <a
        href="#folder"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-violet focus:px-4 focus:py-3 focus:text-on-violet"
      >
        Skip to the folder
      </a>
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <Folder />
      </main>
      <footer className="px-(--gutter) pb-28">
        <p className="mx-auto max-w-[1280px] border-t border-rule pt-5 text-[0.875rem] text-note">
          Designed and built by {profile.name}
        </p>
      </footer>
    </>
  )
}
