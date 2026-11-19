'use client'
import { useEffect, useState, useCallback } from 'react'
import { useI18n } from '@/hooks/useI18n'
import { PixelSprite, SPRITES } from './PixelSprite'

/* Ecrã de arranque estilo consola. Aparece uma vez por sessão,
   dura ~2s e pode ser saltado com clique ou tecla. */
export function BootScreen() {
  const { t } = useI18n()
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  const finish = useCallback(() => {
    if (leaving) return
    setLeaving(true)
    try { sessionStorage.setItem('px-booted', '1') } catch {}
    window.setTimeout(() => {
      document.documentElement.classList.add('booted')
      setGone(true)
    }, 550)
  }, [leaving])

  useEffect(() => {
    if (document.documentElement.classList.contains('booted')) { setGone(true); return }
    const id = window.setInterval(() => {
      setProgress(p => {
        if (p >= 100) { window.clearInterval(id); return 100 }
        return Math.min(100, p + 8 + Math.round(Math.random() * 8))
      })
    }, 90)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const id = window.setTimeout(finish, 750)
    return () => window.clearTimeout(id)
  }, [progress, finish])

  useEffect(() => {
    const onKey = () => finish()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finish])

  if (gone) return null

  const blocks = 16
  const filled = Math.round((progress / 100) * blocks)

  return (
    <div
      className="boot"
      onClick={finish}
      role="presentation"
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: '#17100B', color: '#F3E7D3',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
        cursor: 'pointer',
        clipPath: leaving ? 'inset(50% 0 50% 0)' : 'inset(0 0 0 0)',
        transition: 'clip-path .5s steps(6)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <PixelSprite grid={[...SPRITES.heart]} palette={{ X: '#FF6B35', W: '#FFD9C4' }} size={5} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.4rem', letterSpacing: '-.04em' }}>
          Mel<span style={{ color: '#FF6B35' }}>.</span>
        </span>
      </div>

      <div style={{ width: 'min(340px, 80vw)' }}>
        <div className="pixel" style={{ fontSize: '.72rem', color: '#B9A48B', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
          <span>{t('boot.loading')}</span>
          <span style={{ color: '#4FD8E3' }}>{String(progress).padStart(3, '0')}%</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${blocks}, 1fr)`, gap: 3, padding: 4, border: '2px solid #5A4330' }}>
          {Array.from({ length: blocks }).map((_, i) => (
            <span key={i} style={{ height: 14, background: i < filled ? (i % 5 === 4 ? '#6DB33F' : '#FF6B35') : '#2F2218' }} />
          ))}
        </div>
      </div>

      <div className="pixel anim-blink" style={{ fontSize: '1rem', color: progress >= 100 ? '#F3E7D3' : 'transparent', letterSpacing: '.12em' }}>
        ▶ {t('boot.start')}
      </div>

      <div className="pixel" style={{ position: 'absolute', bottom: 28, fontSize: '.62rem', color: '#7C6852' }}>
        {t('boot.skip')}
      </div>
    </div>
  )
}
