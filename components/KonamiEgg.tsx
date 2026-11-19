'use client'
import { useEffect, useState } from 'react'
import { useI18n } from '@/hooks/useI18n'
import { PixelSprite, SPRITES } from './PixelSprite'

const CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
const COLORS = ['var(--accent)', 'var(--cold)', 'var(--brown)', 'var(--olive)', '#FFD9C4']

/* Easter egg: código Konami → conquista + chuva de píxeis */
export function KonamiEgg() {
  const { t } = useI18n()
  const [on, setOn] = useState(false)
  const [bits, setBits] = useState<{ x: number; d: number; c: string; s: number; r: number }[]>([])

  useEffect(() => {
    let pos = 0
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      pos = k === CODE[pos] ? pos + 1 : (k === CODE[0] ? 1 : 0)
      if (pos === CODE.length) {
        pos = 0
        setBits(Array.from({ length: 60 }, () => ({
          x: Math.random() * 100,
          d: Math.random() * .6,
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
          s: 6 + Math.floor(Math.random() * 3) * 4,
          r: 1.4 + Math.random() * 1.2,
        })))
        setOn(true)
        window.setTimeout(() => setOn(false), 4200)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!on) return null

  return (
    <div aria-live="polite" style={{ position: 'fixed', inset: 0, zIndex: 900, pointerEvents: 'none', overflow: 'hidden' }}>
      {bits.map((b, i) => (
        <span key={i} style={{
          position: 'absolute', top: -20, left: `${b.x}%`, width: b.s, height: b.s, background: b.c,
          animation: `pxFall ${b.r}s steps(18) ${b.d}s forwards`,
        }} />
      ))}
      <div className="panel" style={{
        position: 'absolute', left: '50%', bottom: 32, transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
        animation: 'popIn .35s var(--ease) both', whiteSpace: 'nowrap',
      }}>
        <PixelSprite grid={[...SPRITES.trophy]} palette={{ X: 'var(--brown)', Y: 'var(--accent)' }} size={4} />
        <div>
          <div className="pixel" style={{ fontSize: '.72rem', color: 'var(--accent)' }}>{t('egg.title')}</div>
          <div style={{ fontWeight: 600, fontSize: '.92rem' }}>{t('egg.desc')}</div>
        </div>
      </div>
      <style>{`@keyframes pxFall { to { transform: translateY(110vh) rotate(90deg); } }`}</style>
    </div>
  )
}
