'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type Lang = 'pt' | 'en' | 'es'

type Dict = Record<string, string | string[]>

const translations: Record<Lang, Dict> = {
  pt: {
    'nav.journey':  'Jornada',
    'journey.label':  'A jornada',
    'journey.title':  'Modo espectador',
    'journey.sub':    'Faz scroll e assiste à minha carreira a ser jogada, nível a nível.',
    'journey.hint':   'Scroll para caminhar',
    'journey.world':  'Mundo',
    'journey.view':   'Ver nível',
    'journey.recruit':'Recrutar jogadora',
    'journey.skip':   'Saltar jornada',
    'nav.about':    'Sobre mim',
    'nav.skills':   'Skills',
    'nav.projects': 'Projetos',
    'nav.contact':  'Contacto',
    'nav.menu':     'Menu',
    'nav.theme':    'Mudar tema',

    'boot.loading': 'A carregar jogadora 1',
    'boot.start':   'Press start',
    'boot.skip':    'Clica ou prime qualquer tecla',

    'hero.status':   'Player 1 · pronta',
    'hero.greeting': 'Olá, eu sou a',
    'hero.label':    'Desenvolvedora Frontend',
    'hero.name':     'Melzira Ebo',
    'hero.desc':     'Desenvolvedora frontend apaixonada por criar experiências digitais modernas, acessíveis e memoráveis.',
    'hero.cta1':     'Ver projetos',
    'hero.cta2':     'Falar comigo',
    'hero.badge':    'Frontend Dev',
    'hero.roles':    ['Desenvolvedora Frontend','Entusiasta Blockchain','Solucionadora de problemas','Estudante 42'],
    'hero.scroll':   'Desliza para jogar',
    'hero.card.class':  'Classe',
    'hero.card.school': 'Escola',
    'hero.card.hp':     'Vida',
    'hero.card.xp':     'Curiosidade',
    'hero.card.status': 'Disponível',

    'marquee': ['React','Next.js','TypeScript','Tailwind CSS','React Native','Figma','Micro-interações','Acessibilidade','Design Systems'],

    'about.label': 'Sobre mim',
    'about.title': 'Quem sou eu?',
    'about.p1':    'Sou uma desenvolvedora frontend com paixão por criar interfaces bonitas e funcionais. Formada pela 42, tenho experiência com as tecnologias mais modernas do mercado.',
    'about.p2':    'Adoro desafios, aprendo rápido e adapto-me com facilidade a novos ambientes e tecnologias. Atualmente a explorar o mundo do blockchain e Web3.',
    'about.p3':    'Quando não estou a programar, estou a explorar design, a jogar videojogos ou a aprender algo completamente novo.',
    'about.stat1': 'Escola 42',
    'about.stat2': 'Projetos concluídos',
    'about.stat3': 'Idiomas',
    'about.stat4': 'Curiosidade',
    'about.ach':   'Conquistas desbloqueadas',
    'about.ach1':  'Hackathon · App mobile',
    'about.ach2':  'Projeto final · 42',
    'about.ach3':  'Servidor HTTP em C++98',

    'skills.label':      'Competências',
    'skills.title':      'O meu inventário',
    'skills.intro':      'As ferramentas que levo para cada nível — escolhidas para construir interfaces rápidas, claras e bem feitas.',
    'skills.frontend':   'Frontend',
    'skills.mobile':     'Mobile',
    'skills.backend':    'Backend',
    'skills.blockchain': 'Blockchain',
    'skills.tools':      'Ferramentas',
    'skills.items':      'itens',

    'projects.label':   'Trabalhos',
    'projects.title':   'Escolhe um nível',
    'projects.intro':   'Projetos em destaque — de hackathons da NASA a servidores HTTP escritos do zero.',
    'projects.level':   'Nível',
    'projects.play':    'Ver detalhes',
    'projects.demo':    'Demo',
    'projects.private': 'Privado',
    'projects.github':  'GitHub',
    'projects.back':    'Voltar aos projetos',
    'projects.detail':  'Projeto detalhado',
    'projects.sheet':   'Ficha do nível',
    'projects.stack':   'Stack',
    'projects.techs':   'tecnologias',
    'projects.live':    'Demo ao vivo',
    'projects.code':    'Código',
    'projects.public':  'Público',
    'projects.yes':     'Disponível',
    'projects.no':      'Indisponível',
    'projects.noImages':'Capturas em breve',
    'projects.fullscreen': 'Ecrã inteiro',
    'projects.notFound':'Nível não encontrado.',
    'projects.next':    'Próximo nível',

    'contact.label':   'Contacto',
    'contact.insert':  'Insere uma moeda para continuar',
    'contact.title':   'Vamos conversar',
    'contact.desc':    'Estou aberta a novas oportunidades, colaborações ou apenas uma boa conversa sobre tecnologia. Não hesites em entrar em contacto!',
    'contact.cta':     'Enviar email',
    'contact.player2': 'Player 2, entra no jogo',

    'footer.thanks': 'Obrigada por jogar',
    'footer.copy':   'Feito com',
    'footer.top':    'Topo',
    'footer.hint':   'psst… experimenta o código Konami',

    'egg.title': 'Conquista desbloqueada',
    'egg.desc':  'Jogador curioso — encontraste o segredo.',
  },
  en: {
    'nav.journey':  'Journey',
    'journey.label':  'The journey',
    'journey.title':  'Spectator mode',
    'journey.sub':    'Scroll and watch my career being played, level by level.',
    'journey.hint':   'Scroll to walk',
    'journey.world':  'World',
    'journey.view':   'View level',
    'journey.recruit':'Recruit player',
    'journey.skip':   'Skip journey',
    'nav.about':    'About',
    'nav.skills':   'Skills',
    'nav.projects': 'Projects',
    'nav.contact':  'Contact',
    'nav.menu':     'Menu',
    'nav.theme':    'Toggle theme',

    'boot.loading': 'Loading player 1',
    'boot.start':   'Press start',
    'boot.skip':    'Click or press any key',

    'hero.status':   'Player 1 · ready',
    'hero.greeting': 'Hello, I am',
    'hero.label':    'Frontend Developer',
    'hero.name':     'Melzira Ebo',
    'hero.desc':     'Frontend developer passionate about creating modern, accessible and memorable digital experiences.',
    'hero.cta1':     'See projects',
    'hero.cta2':     'Talk to me',
    'hero.badge':    'Frontend Dev',
    'hero.roles':    ['Frontend Developer','Blockchain Enthusiast','Problem Solver','42 Student'],
    'hero.scroll':   'Scroll to play',
    'hero.card.class':  'Class',
    'hero.card.school': 'School',
    'hero.card.hp':     'HP',
    'hero.card.xp':     'Curiosity',
    'hero.card.status': 'Available',

    'marquee': ['React','Next.js','TypeScript','Tailwind CSS','React Native','Figma','Micro-interactions','Accessibility','Design Systems'],

    'about.label': 'About me',
    'about.title': 'Who am I?',
    'about.p1':    "I'm a frontend developer passionate about building beautiful and functional interfaces. Trained at 42, I have experience with the most modern technologies.",
    'about.p2':    'I love challenges, learn fast and adapt easily to new environments and technologies. Currently exploring the world of blockchain and Web3.',
    'about.p3':    "When I'm not coding, I'm exploring design, playing video games or learning something completely new.",
    'about.stat1': '42 School',
    'about.stat2': 'Completed projects',
    'about.stat3': 'Languages',
    'about.stat4': 'Curiosity',
    'about.ach':   'Achievements unlocked',
    'about.ach1':  'Hackathon · Mobile app',
    'about.ach2':  'Final project · 42',
    'about.ach3':  'HTTP server in C++98',

    'skills.label':      'Skills',
    'skills.title':      'My inventory',
    'skills.intro':      'The tools I bring to every level — picked to build fast, clear and well-crafted interfaces.',
    'skills.frontend':   'Frontend',
    'skills.mobile':     'Mobile',
    'skills.backend':    'Backend',
    'skills.blockchain': 'Blockchain',
    'skills.tools':      'Tools',
    'skills.items':      'items',

    'projects.label':   'Work',
    'projects.title':   'Select a level',
    'projects.intro':   'Featured projects — from NASA hackathons to HTTP servers written from scratch.',
    'projects.level':   'Level',
    'projects.play':    'View details',
    'projects.demo':    'Demo',
    'projects.private': 'Private',
    'projects.github':  'GitHub',
    'projects.back':    'Back to projects',
    'projects.detail':  'Project details',
    'projects.sheet':   'Level sheet',
    'projects.stack':   'Stack',
    'projects.techs':   'technologies',
    'projects.live':    'Live demo',
    'projects.code':    'Code',
    'projects.public':  'Public',
    'projects.yes':     'Available',
    'projects.no':      'Unavailable',
    'projects.noImages':'Screenshots coming soon',
    'projects.fullscreen': 'Fullscreen',
    'projects.notFound':'Level not found.',
    'projects.next':    'Next level',

    'contact.label':   'Contact',
    'contact.insert':  'Insert coin to continue',
    'contact.title':   "Let's talk",
    'contact.desc':    "I'm open to new opportunities, collaborations or just a good conversation about technology. Don't hesitate to reach out!",
    'contact.cta':     'Send an email',
    'contact.player2': 'Player 2, join the game',

    'footer.thanks': 'Thanks for playing',
    'footer.copy':   'Made with',
    'footer.top':    'Top',
    'footer.hint':   'psst… try the Konami code',

    'egg.title': 'Achievement unlocked',
    'egg.desc':  'Curious player — you found the secret.',
  },
  es: {
    'nav.journey':  'Jornada',
    'journey.label':  'La jornada',
    'journey.title':  'Modo espectador',
    'journey.sub':    'Haz scroll y mira mi carrera jugándose, nivel a nivel.',
    'journey.hint':   'Scroll para caminar',
    'journey.world':  'Mundo',
    'journey.view':   'Ver nivel',
    'journey.recruit':'Reclutar jugadora',
    'journey.skip':   'Saltar jornada',
    'nav.about':    'Sobre mí',
    'nav.skills':   'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.contact':  'Contacto',
    'nav.menu':     'Menú',
    'nav.theme':    'Cambiar tema',

    'boot.loading': 'Cargando jugadora 1',
    'boot.start':   'Press start',
    'boot.skip':    'Haz clic o pulsa cualquier tecla',

    'hero.status':   'Player 1 · lista',
    'hero.greeting': 'Hola, soy',
    'hero.label':    'Desarrolladora Frontend',
    'hero.name':     'Melzira Ebo',
    'hero.desc':     'Desarrolladora frontend apasionada por crear experiencias digitales modernas, accesibles y memorables.',
    'hero.cta1':     'Ver proyectos',
    'hero.cta2':     'Hablar conmigo',
    'hero.badge':    'Frontend Dev',
    'hero.roles':    ['Desarrolladora Frontend','Entusiasta Blockchain','Solucionadora de problemas','Estudiante 42'],
    'hero.scroll':   'Desliza para jugar',
    'hero.card.class':  'Clase',
    'hero.card.school': 'Escuela',
    'hero.card.hp':     'Vida',
    'hero.card.xp':     'Curiosidad',
    'hero.card.status': 'Disponible',

    'marquee': ['React','Next.js','TypeScript','Tailwind CSS','React Native','Figma','Micro-interacciones','Accesibilidad','Design Systems'],

    'about.label': 'Sobre mí',
    'about.title': '¿Quién soy?',
    'about.p1':    'Soy una desarrolladora frontend apasionada por crear interfaces bonitas y funcionales. Formada en la 42, tengo experiencia con las tecnologías más modernas.',
    'about.p2':    'Me encantan los desafíos, aprendo rápido y me adapto fácilmente a nuevos entornos y tecnologías. Actualmente explorando el mundo del blockchain y Web3.',
    'about.p3':    'Cuando no estoy programando, estoy explorando diseño, jugando videojuegos o aprendiendo algo completamente nuevo.',
    'about.stat1': 'Escuela 42',
    'about.stat2': 'Proyectos completados',
    'about.stat3': 'Idiomas',
    'about.stat4': 'Curiosidad',
    'about.ach':   'Logros desbloqueados',
    'about.ach1':  'Hackathon · App móvil',
    'about.ach2':  'Proyecto final · 42',
    'about.ach3':  'Servidor HTTP en C++98',

    'skills.label':      'Habilidades',
    'skills.title':      'Mi inventario',
    'skills.intro':      'Las herramientas que llevo a cada nivel — elegidas para construir interfaces rápidas, claras y bien hechas.',
    'skills.frontend':   'Frontend',
    'skills.mobile':     'Mobile',
    'skills.backend':    'Backend',
    'skills.blockchain': 'Blockchain',
    'skills.tools':      'Herramientas',
    'skills.items':      'ítems',

    'projects.label':   'Trabajos',
    'projects.title':   'Elige un nivel',
    'projects.intro':   'Proyectos destacados — de hackathons de la NASA a servidores HTTP escritos desde cero.',
    'projects.level':   'Nivel',
    'projects.play':    'Ver detalles',
    'projects.demo':    'Demo',
    'projects.private': 'Privado',
    'projects.github':  'GitHub',
    'projects.back':    'Volver a los proyectos',
    'projects.detail':  'Detalles del proyecto',
    'projects.sheet':   'Ficha del nivel',
    'projects.stack':   'Stack',
    'projects.techs':   'tecnologías',
    'projects.live':    'Demo en vivo',
    'projects.code':    'Código',
    'projects.public':  'Público',
    'projects.yes':     'Disponible',
    'projects.no':      'No disponible',
    'projects.noImages':'Capturas próximamente',
    'projects.fullscreen': 'Pantalla completa',
    'projects.notFound':'Nivel no encontrado.',
    'projects.next':    'Siguiente nivel',

    'contact.label':   'Contacto',
    'contact.insert':  'Inserta una moneda para continuar',
    'contact.title':   'Hablemos',
    'contact.desc':    'Estoy abierta a nuevas oportunidades, colaboraciones o solo una buena conversación sobre tecnología.',
    'contact.cta':     'Enviar email',
    'contact.player2': 'Player 2, únete al juego',

    'footer.thanks': 'Gracias por jugar',
    'footer.copy':   'Hecho con',
    'footer.top':    'Arriba',
    'footer.hint':   'psst… prueba el código Konami',

    'egg.title': 'Logro desbloqueado',
    'egg.desc':  'Jugador curioso — encontraste el secreto.',
  },
}

interface Ctx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (k: string) => string
  list: (k: string) => string[]
  roles: () => string[]
}
const I18nCtx = createContext<Ctx | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const t = useCallback((k: string) => {
    const v = translations[lang][k]
    return Array.isArray(v) ? v.join(', ') : (v ?? k)
  }, [lang])
  const list = useCallback((k: string) => {
    const v = translations[lang][k]
    return Array.isArray(v) ? v : v ? [v] : []
  }, [lang])
  const roles = useCallback(() => list('hero.roles'), [list])
  return <I18nCtx.Provider value={{ lang, setLang, t, list, roles }}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('useI18n must be inside I18nProvider')
  return ctx
}
