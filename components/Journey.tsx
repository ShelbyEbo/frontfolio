'use client'
import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { useI18n, type Lang } from '@/hooks/useI18n'
import { JOURNEY } from '@/data'
import { PixelSprite } from './PixelSprite'
import {
  pixelUri, GRASS_BLOCK, DIRT_BLOCK, BLOCK_PAL,
  HERO_A, HERO_B, HERO_PAL, TREE, TREE_PAL, CLOUD, CLOUD_PAL,
  FLOWER_R, FLOWER_Y, FLOWER_PAL, TORCH_OFF, TORCH_ON, TORCH_PAL,
  CHEST_CLOSED, CHEST_OPEN, CHEST_PAL, FLAG, FLAG_PAL, DIAMOND, DIAMOND_PAL,
} from './pixelArt'
import './journey.css'

/* ── utilidades ── */
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (a: number, b: number, v: number) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t) }
const hex = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
const mix = (a: string, b: string, t: number) => {
  const A = hex(a), B = hex(b)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`
}
function rand(seed: number) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 }
}

/* céu: dia → pôr-do-sol → noite, ao longo da carreira */
const SKY: [number, string, string][] = [
  [0,    '#8FCBEE', '#DDF0F8'],
  [0.5,  '#9CC9E8', '#F7E2C6'],
  [0.72, '#F0A07A', '#FBD6A6'],
  [0.86, '#5E4A80', '#E2896A'],
  [1,    '#17183A', '#3B2D5A'],
]
function skyAt(p: number) {
  for (let i = 1; i < SKY.length; i++) {
    if (p <= SKY[i][0]) {
      const [p0, t0, b0] = SKY[i - 1], [p1, t1, b1] = SKY[i]
      const t = (p - p0) / (p1 - p0)
      return `linear-gradient(to bottom, ${mix(t0, t1, t)}, ${mix(b0, b1, t)})`
    }
  }
  return `linear-gradient(to bottom, ${SKY[SKY.length - 1][1]}, ${SKY[SKY.length - 1][2]})`
}

/* colinas em degraus (SVG) */
function hillsUri(w: number, h: number, step: number, seed: number, color: string, min: number) {
  const r = rand(seed)
  let d = `M0 ${h}`
  let y = h - min - r() * (h - min)
  for (let x = 0; x <= w; x += step) {
    if (r() < 0.55) y = clamp(y + (r() < 0.5 ? -1 : 1) * step * (1 + Math.floor(r() * 2)), 8, h - min)
    d += ` L${x} ${Math.round(y)} L${x + step} ${Math.round(y)}`
  }
  d += ` L${w} ${h} Z`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges"><path d="${d}" fill="${color}"/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

const GRASS = pixelUri(GRASS_BLOCK, BLOCK_PAL)
const DIRT  = pixelUri(DIRT_BLOCK, BLOCK_PAL)

/* ════════════════════════════════════════════════════════════ */
export function Journey() {
  const { t, lang } = useI18n()

  const sectionRef = useRef<HTMLElement>(null)
  const skyRef     = useRef<HTMLDivElement>(null)
  const sunRef     = useRef<HTMLDivElement>(null)
  const moonRef    = useRef<HTMLDivElement>(null)
  const starsRef   = useRef<HTMLDivElement>(null)
  const cloudsRef  = useRef<HTMLDivElement>(null)
  const farRef     = useRef<HTMLDivElement>(null)
  const nearRef    = useRef<HTMLDivElement>(null)
  const worldRef   = useRef<HTMLDivElement>(null)
  const walkerRef  = useRef<HTMLDivElement>(null)
  const introRef   = useRef<HTMLDivElement>(null)

  const [vw, setVw] = useState(1440)
  const [active, setActive] = useState(-1)
  const activeRef = useRef(-1)

  /* geometria do mundo */
  const mobile = vw < 700
  const block  = mobile ? 40 : 48
  const ground = block * 3
  const gap    = mobile ? 600 : 820
  const charX  = Math.round(mobile ? vw * 0.2 : vw * 0.3)
  const startX = charX + (mobile ? 300 : 420)
  const xs     = JOURNEY.map((_, i) => startX + i * gap)
  const lastX  = xs[xs.length - 1]
  const camMax = lastX - charX - (mobile ? 70 : 110)
  const worldW = lastX + vw + 200

  /* decoração determinística */
  const deco = useMemo(() => {
    const r = rand(42)
    const trees: number[] = []
    const flowers: { x: number; y: boolean }[] = []
    for (let x = 120; x < worldW; x += 180 + r() * 260) {
      if (xs.some(cx => Math.abs(cx - x) < 150)) continue
      if (Math.abs(x - charX) < 90) continue
      trees.push(x)
    }
    for (let x = 60; x < worldW; x += 70 + r() * 160) {
      if (xs.some(cx => Math.abs(cx - x) < 70)) continue
      flowers.push({ x, y: r() < 0.5 })
    }
    const clouds = Array.from({ length: Math.ceil(worldW / 420) }, (_, i) => ({
      x: i * 420 + r() * 200, y: 8 + r() * 26, s: 4 + Math.floor(r() * 3),
    }))
    const stars = Array.from({ length: 70 }, () => ({ x: r() * 100, y: r() * 55, b: r() < 0.25 }))
    return { trees, flowers, clouds, stars }
  }, [worldW, charX]) // eslint-disable-line react-hooks/exhaustive-deps

  const farHills  = useMemo(() => hillsUri(Math.round(worldW * 0.35 + vw), 260, 32, 7, '#9DBFA0', 70), [worldW, vw])
  const nearHills = useMemo(() => hillsUri(Math.round(worldW * 0.6 + vw), 200, 24, 19, '#6FA35A', 40), [worldW, vw])

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* motor: scroll → câmara */
  useEffect(() => {
    let raf = 0
    let lastY = window.scrollY
    let stopTimer = 0

    const frame = () => {
      raf = 0
      const sec = sectionRef.current
      if (!sec) return
      const rect = sec.getBoundingClientRect()
      const total = sec.offsetHeight - window.innerHeight
      const p = clamp(-rect.top / total)
      const cam = clamp(p / 0.9) * camMax

      if (worldRef.current)  worldRef.current.style.transform  = `translate3d(${-cam}px,0,0)`
      if (nearRef.current)   nearRef.current.style.transform   = `translate3d(${-cam * 0.45}px,0,0)`
      if (farRef.current)    farRef.current.style.transform    = `translate3d(${-cam * 0.2}px,0,0)`
      if (cloudsRef.current) cloudsRef.current.style.transform = `translate3d(${-cam * 0.1}px,0,0)`
      if (skyRef.current)    skyRef.current.style.background   = skyAt(p)
      if (sunRef.current) {
        sunRef.current.style.transform = `translate3d(0, ${Math.round(p * 46) * 8}px, 0)`
        sunRef.current.style.opacity = String(1 - smooth(0.78, 0.92, p))
      }
      if (moonRef.current)  moonRef.current.style.opacity  = String(smooth(0.84, 0.97, p))
      if (starsRef.current) starsRef.current.style.opacity = String(smooth(0.8, 0.98, p))
      const sticky = worldRef.current?.parentElement
      if (sticky) sticky.style.setProperty('--night', String(smooth(0.72, 1, p)))
      if (introRef.current) {
        const o = 1 - smooth(0.01, 0.07, p)
        introRef.current.style.opacity = String(o)
        introRef.current.style.visibility = o < 0.02 ? 'hidden' : 'visible'
      }

      let idx = -1
      xs.forEach((x, i) => { if (cam + charX + (mobile ? 90 : 130) >= x) idx = i })
      if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx) }
    }

    const onScroll = () => {
      const y = window.scrollY
      const w = walkerRef.current
      const sec = sectionRef.current
      if (w && sec) {
        const r = sec.getBoundingClientRect()
        const inside = r.top <= 0 && r.bottom >= window.innerHeight
        if (inside && y !== lastY) {
          w.classList.add('walking')
          w.classList.toggle('flip', y < lastY)
          window.clearTimeout(stopTimer)
          stopTimer = window.setTimeout(() => w.classList.remove('walking'), 160)
        }
      }
      lastY = y
      if (!raf) raf = requestAnimationFrame(frame)
    }

    frame()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      window.clearTimeout(stopTimer)
    }
  }, [camMax, charX, xs.join(',')]) // eslint-disable-line react-hooks/exhaustive-deps

  const skip = useCallback(() => {
    const sec = sectionRef.current
    if (sec) window.scrollTo({ top: sec.offsetTop + sec.offsetHeight - window.innerHeight + 2, behavior: 'smooth' })
  }, [])

  const cp = active >= 0 ? JOURNEY[active] : null

  return (
    <section id="journey" ref={sectionRef} className="jr" style={{ height: `${JOURNEY.length * 80 + 100}vh` }}>
      <div className="jr-sticky">
        {/* CÉU */}
        <div ref={skyRef} className="jr-sky" style={{ background: skyAt(0) }} />
        <div ref={starsRef} className="jr-stars" style={{ opacity: 0 }}>
          {deco.stars.map((s, i) => (
            <span key={i} className={s.b ? 'tw' : ''} style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${(i % 7) * 0.4}s` }} />
          ))}
        </div>
        <div ref={sunRef} className="jr-sun" />
        <div ref={moonRef} className="jr-moon" style={{ opacity: 0 }} />

        {/* NUVENS + COLINAS (parallax) */}
        <div ref={cloudsRef} className="jr-layer jr-clouds">
          {deco.clouds.map((c, i) => (
            <PixelSprite key={i} grid={CLOUD} palette={CLOUD_PAL} size={c.s}
              className="jr-cloud" style={{ left: c.x, top: `${c.y}%`, animationDelay: `${-i * 3}s` }} />
          ))}
        </div>
        <div ref={farRef}  className="jr-layer jr-hills" style={{ backgroundImage: farHills,  height: 260, bottom: ground + 30 }} />
        <div ref={nearRef} className="jr-layer jr-hills" style={{ backgroundImage: nearHills, height: 200, bottom: ground - 6 }} />

        {/* MUNDO */}
        <div ref={worldRef} className="jr-layer jr-world" style={{ width: worldW }}>
          <div className="jr-ground" style={{
            height: ground,
            backgroundImage: `${GRASS}, ${DIRT}`,
            backgroundSize: `${block}px ${block}px, ${block}px ${block}px`,
            backgroundPosition: `0 0, 0 ${block}px`,
            backgroundRepeat: 'repeat-x, repeat',
          }} />

          {deco.trees.map((x, i) => (
            <PixelSprite key={`t${i}`} grid={TREE} palette={TREE_PAL} size={mobile ? 9 : 11}
              className="jr-obj" style={{ left: x, bottom: ground - 2 }} />
          ))}
          {deco.flowers.map((f, i) => (
            <PixelSprite key={`f${i}`} grid={f.y ? FLOWER_Y : FLOWER_R} palette={FLOWER_PAL} size={5}
              className="jr-obj jr-sway" style={{ left: f.x, bottom: ground - 1, animationDelay: `${-i * 0.37}s` }} />
          ))}

          {/* placa de partida */}
          <div className="jr-start pixel" style={{ left: charX - 10, bottom: ground + 120 }}>Start ▶</div>

          {/* CHECKPOINTS */}
          {JOURNEY.map((c, i) => {
            const reached = i <= active
            return (
              <div key={c.id} className={`jr-cp ${reached ? 'on' : ''} ${c.final ? 'final' : ''}`} style={{ left: xs[i], bottom: ground }}>
                <div className="jr-cp-banner">
                  <span className="pixel">{String(i + 1).padStart(2, '0')}</span>
                  {c.final && !reached ? '???' : c.title}
                </div>
                {!reached && <div className="jr-marker pixel">!</div>}
                {c.final ? (
                  <PixelSprite grid={FLAG} palette={FLAG_PAL} size={8} className="jr-flag" />
                ) : (
                  <div className="jr-cp-row">
                    <PixelSprite grid={reached ? TORCH_ON : TORCH_OFF} palette={TORCH_PAL} size={6} className={reached ? 'jr-flicker' : ''} />
                    <div className="jr-chest">
                      {reached && (
                        <div className="jr-loot">
                          <PixelSprite grid={DIAMOND} palette={DIAMOND_PAL} size={4} />
                          <span className="pixel">+100 XP</span>
                        </div>
                      )}
                      <PixelSprite grid={reached ? CHEST_OPEN : CHEST_CLOSED} palette={CHEST_PAL} size={5} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>


        {/* PERSONAGEM */}
        <div ref={walkerRef} className="jr-walker" style={{ left: charX - (mobile ? 22 : 30), bottom: ground }} aria-hidden>
          <PixelSprite grid={HERO_A} palette={HERO_PAL} size={mobile ? 4.4 : 6} className="fA" />
          <PixelSprite grid={HERO_B} palette={HERO_PAL} size={mobile ? 4.4 : 6} className="fB" />
          <span className="jr-shadow" />
        </div>

        {/* HUD */}
        <div className="jr-hud">
          <div className="jr-hud-box pixel">
            {t('journey.world')} 1-{Math.max(1, active + 1)}
          </div>
          <div className="jr-hud-map" aria-hidden>
            {JOURNEY.map((c, i) => <span key={c.id} className={i <= active ? 'on' : ''} />)}
          </div>
          <div className="jr-hud-box pixel jr-xp">
            <PixelSprite grid={DIAMOND} palette={DIAMOND_PAL} size={2.4} />
            {String(Math.max(0, active) * 100).padStart(4, '0')} XP
          </div>
        </div>

        {/* INTRO */}
        <div ref={introRef} className="jr-intro">
          <div className="section-label"><span className="num">02</span>{t('journey.label')}</div>
          <h2 className="jr-intro-title">{t('journey.title')}</h2>
          <p>{t('journey.sub')}</p>
          <div className="jr-intro-hint pixel"><span className="anim-blink">▼</span> {t('journey.hint')}</div>
        </div>

        {/* DIÁLOGO */}
        {cp && <Dialog key={`${cp.id}-${lang}`} cp={cp} index={active} lang={lang} t={t} />}

        <button type="button" className="jr-skip pixel" onClick={skip}>{t('journey.skip')} ⏭</button>
      </div>
    </section>
  )
}

/* ── caixa de diálogo estilo RPG com texto a ser escrito ── */
function Dialog({ cp, index, lang, t }: {
  cp: typeof JOURNEY[number]; index: number; lang: Lang; t: (k: string) => string
}) {
  const full = cp.text[lang]
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setN(v => (v >= full.length ? v : v + 2)), 16)
    return () => window.clearInterval(id)
  }, [full])
  const done = n >= full.length

  return (
    <div className="jr-dialog panel" onClick={() => setN(full.length)}>
      <div className="jr-dialog-face">
        <img src="/avatar.png" alt="" />
      </div>
      <div className="jr-dialog-body">
        <div className="jr-dialog-head pixel">
          <span className="jr-dialog-name">Melzira</span>
          <span className="jr-dialog-ch">{t('journey.world')} 1-{index + 1} · {cp.chapter[lang]}</span>
        </div>
        <div className="jr-dialog-title">{cp.final ? cp.chapter[lang] : cp.title}</div>
        <p aria-live="polite">{full.slice(0, n)}{!done && <span className="jr-caret" />}</p>
        <div className="jr-dialog-foot">
          {done && cp.slug && (
            <Link href={`/projects/${cp.slug}`} className="btn btn-sm btn-primary" onClick={e => e.stopPropagation()}>▶ {t('journey.view')}</Link>
          )}
          {done && cp.final && (
            <a href="#contact" className="btn btn-sm btn-primary" onClick={e => e.stopPropagation()}>★ {t('journey.recruit')}</a>
          )}
          <span className="jr-next pixel anim-blink">▼</span>
        </div>
      </div>
    </div>
  )
}
