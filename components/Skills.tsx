'use client'
import { useI18n } from '@/hooks/useI18n'
import { useInView } from '@/hooks/useInView'
import { SKILL_GROUPS } from '@/data'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

function Icon({ name, size = 16, color }: { name: string; size?: number; color: string }) {
  const C = ((LucideIcons as unknown as Record<string, LucideIcon>)[name] ?? LucideIcons.Code) as LucideIcon
  return <C size={size} color={color} />
}

export function Skills() {
  const { t } = useI18n()
  const { ref, inView } = useInView()

  return (
    <section id="skills">
      <div className="section-wrap" ref={ref}>
        <div className="section-label"><span className="num">03</span>{t('skills.label')}</div>
        <h2 className="section-title">{t('skills.title')}</h2>
        <p className="section-intro">{t('skills.intro')}</p>

        <div className="inv-grid">
          {SKILL_GROUPS.map((g, i) => (
            <div key={g.label} className={`inv panel reveal rd${i + 1} ${inView ? 'visible' : ''}`}
              style={{ ['--c' as string]: g.color }}>
              <div className="inv-head">
                <span className="inv-icon"><Icon name={g.icon} color="#fff" size={15} /></span>
                <span className="inv-name">{t(g.label)}</span>
                <span className="inv-count pixel">{String(g.skills.length).padStart(2, '0')} {t('skills.items')}</span>
              </div>
              <div className="inv-slots">
                {g.skills.map(s => (
                  <span key={s} className="slot">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
