import { Navbar } from '@/components/layout/Navbar'
import { Certificates } from '@/components/sections/Certificates'
import { Contact } from '@/components/sections/Contact'
import { Design } from '@/components/sections/Design'
import { Landing } from '@/components/sections/Landing'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Landing />
        <Design />
        <Certificates />
        <Contact />
      </main>
    </>
  )
}
