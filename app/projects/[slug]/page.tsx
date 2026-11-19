'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Github, Maximize2, X } from 'lucide-react'
import { PROJECTS } from '@/data'
import { useI18n, type Lang } from '@/hooks/useI18n'
import { Navbar } from '@/components/Navbar'
import { ProjectIcon } from '@/components/Projects'
import '@/components/sections.css'
import './detail.css'

function Gallery({ images, name, icon, color, t }: {
  images: string[]; name: string; icon: string; color: string; t: (k: string) => string
}) {
  const [active, setActive] = useState(0)
  const [full, setFull] = useState(false)
  const portrait = name === 'NASA Farms Navigators'

  useEffect(() => {
    if (images.length <= 1 || full) return
    const id = window.setInterval(() => setActive(i => (i + 1) % images.length), 5000)
    return () => window.clearInterval(id)
  }, [images, full])

  useEffect(() => {
    if (!full) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFull(false)
      if (e.key === 'ArrowRight') setActive(i => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActive(i => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [full, images.length])

  const go = (n: number) => setActive((n + images.length) % images.length)

  if (!images.length) {
    return (
      <div className="panel">
        <div className="window-bar"><span>{name.toLowerCase().replace(/\s+/g, '_')}.exe</span><span className="window-dots"><i /><i /><i /></span></div>
        <div className="dt-screen" style={{ ['--pc' as string]: color }}>
          <div className="pm-empty"><div className="pm-empty-icon"><ProjectIcon name={icon} size={44} color={color} /></div><span className="pixel">{t('projects.noImages')}</span></div>
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="window-bar">
        <span>{name.toLowerCase().replace(/\s+/g, '_')} · {String(active + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}</span>
        <span className="window-dots"><i /><i /><i /></span>
      </div>

      <div className={`dt-screen ${portrait ? 'is-portrait' : ''}`} style={{ ['--pc' as string]: color }}>
        <img key={images[active]} src={images[active]} alt={`${name} ${active + 1}`} className="dt-img" onClick={() => setFull(true)} />
        {images.length > 1 && (
          <>
            <button type="button" className="nav-btn dt-arrow dt-go-prev" onClick={() => go(active - 1)} aria-label="Anterior"><ChevronLeft size={16} /></button>
            <button type="button" className="nav-btn dt-arrow dt-go-next" onClick={() => go(active + 1)} aria-label="Seguinte"><ChevronRight size={16} /></button>
          </>
        )}
        <button type="button" className="btn btn-sm dt-full" onClick={() => setFull(true)}>
          <Maximize2 size={12} /> {t('projects.fullscreen')}
        </button>
      </div>

      {images.length > 1 && (
        <div className="dt-thumbs">
          {images.map((src, i) => (
            <button key={src} type="button" onClick={() => setActive(i)} className={i === active ? 'on' : ''} aria-label={`${i + 1}`}>
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}

      {full && (
        <div className="dt-modal" role="dialog" aria-modal="true" onClick={() => setFull(false)}>
          <button type="button" className="nav-btn dt-close" onClick={() => setFull(false)} aria-label="Fechar"><X size={18} /></button>
          <img src={images[active]} alt={`${name} ${active + 1}`} onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}

export default function ProjectDetailPage() {
  const { lang, t } = useI18n()
  const params = useParams<{ slug: string }>()
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : ''

  const idx = useMemo(() => PROJECTS.findIndex(p => p.slug === slug), [slug])
  const project = idx >= 0 ? PROJECTS[idx] : undefined
  const next = idx >= 0 ? PROJECTS[(idx + 1) % PROJECTS.length] : undefined
  const gallery = project ? (project.detailImages?.length ? project.detailImages : project.images ?? []) : []

  useEffect(() => {
    document.documentElement.classList.add('booted')
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="dt-wrap">
          <Link href="/#projects" className="btn btn-sm"><ArrowLeft size={14} /> {t('projects.back')}</Link>
          <div className="panel" style={{ padding: '2rem', marginTop: '1.5rem' }}>
            <div className="pixel" style={{ color: 'var(--accent)', marginBottom: '.5rem' }}>Game over</div>
            {t('projects.notFound')}
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="dt-wrap">
        <div className="dt-top">
          <Link href="/#projects" className="btn btn-sm"><ArrowLeft size={14} /> {t('projects.back')}</Link>
          <span className="pixel dt-crumb">
            {t('projects.level')} {String(idx + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </div>

        <header className="dt-head">
          <span className="dt-icon" style={{ background: project.color }}><ProjectIcon name={project.icon} size={22} color="#fff" /></span>
          <h1 className="dt-title">{project.name}</h1>
        </header>

        <div className="dt-grid">
          <Gallery images={gallery} name={project.name} icon={project.icon} color={project.color} t={t} />

          <aside className="dt-side">
            <div className="panel dt-card">
              <p className="dt-desc">{project.desc[lang as Lang]}</p>
              <div className="dt-actions">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <ExternalLink size={14} /> {t('projects.demo')}
                  </a>
                )}
                {project.repo && !project.private && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn">
                    <Github size={14} /> GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="panel dt-card">
              <div className="pixel dt-sheet-title">▶ {t('projects.sheet')}</div>
              <dl className="dt-sheet">
                <div><dt className="pixel">{t('projects.stack')}</dt><dd>{project.tags.length} {t('projects.techs')}</dd></div>
                <div><dt className="pixel">{t('projects.live')}</dt><dd className={project.demo ? 'ok' : 'off'}>{project.demo ? t('projects.yes') : t('projects.no')}</dd></div>
                <div><dt className="pixel">{t('projects.code')}</dt><dd className={project.private ? 'off' : 'ok'}>{project.private ? t('projects.private') : t('projects.public')}</dd></div>
              </dl>
              <div className="dt-tags">
                {project.tags.map(tag => <span key={tag} className="chip">{tag}</span>)}
              </div>
            </div>

            {next && next.slug !== project.slug && (
              <Link href={`/projects/${next.slug}`} className="panel dt-next">
                <span className="pixel">{t('projects.next')}</span>
                <b>{next.name}</b>
                <ArrowRight size={18} />
              </Link>
            )}
          </aside>
        </div>
      </main>
    </>
  )
}
