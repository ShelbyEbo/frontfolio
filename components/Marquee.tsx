'use client'
import { useI18n } from '@/hooks/useI18n'

/* Faixa estilo letreiro de arcade */
export function Marquee() {
  const { list } = useI18n()
  const items = list('marquee')
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map(k => (
          <div key={k} className="marquee-group">
            {row.map((s, i) => (
              <span key={`${k}-${i}`} className="pixel">
                {s}<b>{i % 3 === 0 ? '✦' : i % 3 === 1 ? '◆' : '★'}</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
