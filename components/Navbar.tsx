'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { useI18n, type Lang } from '@/hooks/useI18n'
import { CONFIG } from '@/data'
import { Sun, Moon, Menu, X } from 'lucide-react'
import './Navbar.css'

const LANGS: { code: Lang; fi: string; label: string }[] = [
  { code: 'pt', fi: 'fi-pt', label: 'PT' },
  { code: 'en', fi: 'fi-gb', label: 'EN' },
  { code: 'es', fi: 'fi-es', label: 'ES' },
]

const LINKS = [
  { href: '#about',    key: 'nav.about' },
  { href: '#journey',  key: 'nav.journey' },
  { href: '#skills',   key: 'nav.skills' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#contact',  key: 'nav.contact' },
]

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const { lang, setLang, t } = useI18n()

  const [mounted, setMounted]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive]     = useState('')

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 20)
      setProgress(max > 0 ? Math.min(1, y / max) : 0)

      let current = ''
      for (const { href } of LINKS) {
        const el = document.querySelector(href)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = href
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  const currentLang = LANGS.find(l => l.code === lang)!
  const isDark = resolvedTheme === 'dark'

  return (
    <nav className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#home" className="nav-logo" aria-label="Início">
        {CONFIG.initials.slice(0, -1)}<span>{CONFIG.initials.slice(-1)}</span>
      </a>

      <ul className="nav-links">
        {LINKS.map(({ href, key }, i) => (
          <li key={key}>
            <a href={href} className={active === href ? 'active' : ''}>
              <span className="nav-num">0{i + 1}</span>{t(key)}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-controls">
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button type="button" className="nav-btn nav-lang" onClick={() => setLangOpen(o => !o)}
            aria-haspopup="listbox" aria-expanded={langOpen}>
            <span className={`fi ${currentLang.fi}`} style={{ width: 16, height: 12 }} />
            <span className="lang-text">{currentLang.label}</span>
          </button>

          {langOpen && (
            <div className="nav-dropdown" role="listbox">
              {LANGS.map(l => (
                <button key={l.code} type="button" role="option" aria-selected={lang === l.code}
                  className={lang === l.code ? 'on' : ''}
                  onClick={() => { setLang(l.code); setLangOpen(false) }}>
                  <span className={`fi ${l.fi}`} style={{ width: 16, height: 12 }} />
                  {l.label}
                  {lang === l.code && <span style={{ marginLeft: 'auto' }}>◀</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {mounted && (
          <button type="button" className="nav-btn" aria-label={t('nav.theme')}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}>
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        )}

        <button type="button" className="nav-btn nav-burger" aria-label={t('nav.menu')}
          aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile">
          {LINKS.map(({ href, key }, i) => (
            <a key={key} href={href} onClick={() => setMenuOpen(false)}>
              <span className="nav-num">0{i + 1}</span>{t(key)}
            </a>
          ))}
        </div>
      )}

      {/* barra de XP = progresso de leitura */}
      <div className="nav-xp" aria-hidden>
        <span className="pixel">XP</span>
        <div className="nav-xp-track">
          <div style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </nav>
  )
}
