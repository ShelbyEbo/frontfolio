'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useI18n, type Lang } from '@/hooks/useI18n'
import { useInView } from '@/hooks/useInView'
import { PROJECTS } from '@/data'
import { Lock, ExternalLink, Github } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export function ProjectIcon({ name, size = 52, color }: { name: string; size?: number; color: string }) {
  const C = ((LucideIcons as unknown as Record<string, LucideIcon>)[name] ?? LucideIcons.Code) as LucideIcon
  return <C size={size} color={color} strokeWidth={1.75} />
}

function ProjectMedia({ images, name, icon, color, label }: {
  images?: string[]; name: string; icon: string; color: string; label: string
}) {
  const [active, setActive] = useState(0)
  const portrait = name === 'NASA Farms Navigators'

  useEffect(() => {
    if (!images || images.length <= 1) return
    const id = window.setInterval(() => setActive(i => (i + 1) % images.length), 3500)
    return () => window.clearInterval(id)
  }, [images])

  if (!images || images.length === 0) {
    return (
      <div className="pm-empty" style={{ ['--pc' as string]: color }}>
        <div className="pm-empty-icon"><ProjectIcon name={icon} size={40} color={color} /></div>
        <span className="pixel">{label}</span>
      </div>
    )
  }

  /* app mobile: mostra 3 ecrãs lado a lado, como num cartucho */
  if (portrait) {
    const visible = [0, 1, 2].map(o => images[(active + o) % images.length])
    return (
      <div className="pm-phones">
        {visible.map((src, i) => (
          <img key={`${src}-${i}`} src={src} alt={`${name} ${i + 1}`} loading="lazy" decoding="async" />
        ))}
      </div>
    )
  }

  return (
    <div className="pm" aria-label={name}>
      <div className="pm-track" style={{
        width: `${images.length * 100}%`,
        transform: `translateX(-${(active * 100) / images.length}%)`,
      }}>
        {images.map((src, idx) => (
          <div key={src} style={{ width: `${100 / images.length}%` }}>
            <img src={src} alt={`${name} ${idx + 1}`} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
      <div className="pm-dots">
        {images.map((_, idx) => <span key={idx} className={idx === active ? 'on' : ''} />)}
      </div>
    </div>
  )
}

export function Projects() {
  const { t, lang } = useI18n()
  const { ref, inView } = useInView(0.05)
  const router = useRouter()

  return (
    <section id="projects">
      <div className="section-wrap" ref={ref} style={{ maxWidth: 1320 }}>
        <div className="section-label"><span className="num">04</span>{t('projects.label')}</div>
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="section-intro">{t('projects.intro')}</p>

        <div className="lvl-grid">
          {PROJECTS.map((p, i) => (
            <article key={p.slug}
              className={`lvl panel reveal rd${(i % 3) + 1} ${inView ? 'visible' : ''}`}
              style={{ ['--pc' as string]: p.color }}
              onClick={() => router.push(`/projects/${p.slug}`)}>

              <div className="window-bar">
                <span><b className="lvl-num">{t('projects.level')} {String(i + 1).padStart(2, '0')}</b></span>
                <span className="window-dots"><i /><i /><i /></span>
              </div>

              <div className="lvl-screen">
                <ProjectMedia images={p.images} name={p.name} icon={p.icon} color={p.color} label={t('projects.noImages')} />
              </div>

              <div className="lvl-body">
                <h3 className="lvl-name">{p.name}</h3>
                <p className="lvl-desc line-clamp-3">{p.desc[lang as Lang]}</p>

                <div className="lvl-tags">
                  {p.tags.slice(0, 4).map(tag => <span key={tag} className="chip">{tag}</span>)}
                  {p.tags.length > 4 && <span className="chip">+{p.tags.length - 4}</span>}
                </div>

                <div className="lvl-actions" onClick={e => e.stopPropagation()}>
                  <Link href={`/projects/${p.slug}`} className="btn btn-sm btn-primary">
                    ▶ {t('projects.play')}
                  </Link>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn-sm" aria-label={`${t('projects.demo')} – ${p.name}`}>
                      <ExternalLink size={12} /> {t('projects.demo')}
                    </a>
                  )}
                  {p.repo && !p.private && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn btn-sm" aria-label={`GitHub – ${p.name}`}>
                      <Github size={12} />
                    </a>
                  )}
                  {p.private && (
                    <span className="chip"><Lock size={11} /> {t('projects.private')}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
