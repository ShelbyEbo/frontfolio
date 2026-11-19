'use client'
import { ThemeProvider } from 'next-themes'
import { I18nProvider }  from '@/hooks/useI18n'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  )
}
