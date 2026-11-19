'use client'
import { useI18n } from '@/hooks/useI18n'
import { useInView } from '@/hooks/useInView'
import { School, FolderGit2, Languages, Infinity as Inf } from 'lucide-react'
import { PixelSprite, SPRITES } from './PixelSprite'

const STATS = [
  { num: '42',  key: 'about.stat1', Icon: School,     color: 'var(--accent)' },
  { num: '10+', key: 'about.stat2', Icon: FolderGit2, color: 'var(--cold)' },
  { num: '3',   key: 'about.stat3', Icon: Languages,  color: 'var(--brown)' },
  { num: '∞',   key: 'about.stat4', Icon: Inf,        color: 'var(--olive)' },
]

const ACHIEVEMENTS = [
  { title: 'NASA Space Apps 2025', key: 'about.ach1' },
  { title: 'ft_transcendence',     key: 'about.ach2' },
  { title: 'Webserv',              key: 'about.ach3' },
]

export function About() {
  const { t } = useI18n()
  const { ref, inView } = useInView()
  const v = inView ? 'visible' : ''

  return (
    <section id="about">
      <div className="section-wrap" ref={ref}>
        <div className="section-label"><span className="num">01</span>{t('about.label')}</div>
        <h2 className="section-title">{t('about.title')}</h2>

        <div className="about-grid">
          <div className={`about-text reveal ${v}`}>
            <p className="about-lead">{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>

          <div className="about-stats">
            {STATS.map(({ num, key, Icon, color }, i) => (
              <div key={key} className={`stat panel reveal rd${i + 1} ${v}`} style={{ ['--c' as string]: color }}>
                <Icon size={16} style={{ color }} />
                <div className="stat-num">{num}</div>
                <div className="stat-label">{t(key)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`ach reveal rd2 ${v}`}>
          <div className="ach-head pixel">
            <PixelSprite grid={[...SPRITES.trophy]} palette={{ X: 'var(--brown)', Y: 'var(--accent)' }} size={2.5} />
            {t('about.ach')}
          </div>
          <div className="ach-list">
            {ACHIEVEMENTS.map(a => (
              <div key={a.title} className="ach-item">
                <span className="ach-check pixel">✓</span>
                <div>
                  <div className="ach-title">{a.title}</div>
                  <div className="ach-sub">{t(a.key)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
