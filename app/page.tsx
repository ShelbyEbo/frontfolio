import { BootScreen } from '@/components/BootScreen'
import { Navbar }     from '@/components/Navbar'
import { Hero }       from '@/components/Hero'
import { Marquee }    from '@/components/Marquee'
import { About }      from '@/components/About'
import { Journey }    from '@/components/Journey'
import { Skills }     from '@/components/Skills'
import { Projects }   from '@/components/Projects'
import { Contact }    from '@/components/Contact'
import { Footer }     from '@/components/Footer'
import { KonamiEgg }  from '@/components/KonamiEgg'
import '@/components/sections.css'

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <BootScreen />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Marquee />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <KonamiEgg />
    </div>
  )
}
