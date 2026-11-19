import type { Metadata } from 'next'
import '@fontsource/silkscreen/400.css'
import '@fontsource/syne/500.css'
import '@fontsource/syne/600.css'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource-variable/dm-sans'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Melzira Ebo · Frontend Developer',
  description: 'Portfólio de Melzira Ebo — desenvolvedora frontend. Interfaces modernas, acessíveis e memoráveis.',
}

/* Marca a sessão como "já arrancou" antes do primeiro paint,
   para o ecrã de arranque só aparecer uma vez por visita. */
const bootScript = `
try {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || sessionStorage.getItem('px-booted') === '1') document.documentElement.classList.add('booted');
} catch (e) { document.documentElement.classList.add('booted'); }
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
