'use client'
import { useEffect, useState } from 'react'
import { useI18n } from '@/hooks/useI18n'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { PixelSprite, SPRITES } from './PixelSprite'
import { pixelUri, GRASS_BLOCK, DIRT_BLOCK, BLOCK_PAL, HERO_A, HERO_PAL, TREE, TREE_PAL, FLOWER_R, FLOWER_Y, FLOWER_PAL, SIGN, SIGN_PAL } from './pixelArt'

const GRASS = pixelUri(GRASS_BLOCK, BLOCK_PAL)
const DIRT  = pixelUri(DIRT_BLOCK, BLOCK_PAL)

export function Hero() {
  const { t, lang, roles } = useI18n()

  /* typewriter */
  const [displayed, setDisplayed] = useState('')
  const [rIdx, setRIdx] = useState(0)
  const [cIdx, setCIdx] = useState(0)
  const [del, setDel]   = useState(false)

  useEffect(() => { setDisplayed(''); setRIdx(0); setCIdx(0); setDel(false) }, [lang])

  useEffect(() => {
    const list = roles()
    const cur = list[rIdx % list.length] ?? ''
    let tm: ReturnType<typeof setTimeout>
    if (!del) {
      if (cIdx < cur.length) tm = setTimeout(() => setCIdx(i => i + 1), 70)
      else tm = setTimeout(() => setDel(true), 1800)
    } else {
      if (cIdx > 0) tm = setTimeout(() => setCIdx(i => i - 1), 40)
      else { setDel(false); setRIdx(i => (i + 1) % list.length) }
    }
    setDisplayed(cur.slice(0, cIdx))
    return () => clearTimeout(tm!)
  }, [cIdx, del, rIdx, roles])

  return (
    <section id="home" className="hero">
      {/* sprites decorativos */}
      <div className="hero-sprites" aria-hidden>
        <PixelSprite grid={[...SPRITES.sparkle]} palette={{ X: 'var(--cold)' }} size={5} className="anim-float" style={{ position: 'absolute', top: '18%', left: '6%' }} />
        <PixelSprite grid={[...SPRITES.coin]} palette={{ X: 'var(--brown)', Y: 'var(--accent)', W: '#FFE2CF' }} size={4} className="anim-float" style={{ position: 'absolute', bottom: '16%', left: '44%', animationDelay: '-1.5s' }} />
        <PixelSprite grid={[...SPRITES.sparkle]} palette={{ X: 'var(--accent)' }} size={4} className="anim-float" style={{ position: 'absolute', top: '14%', right: '8%', animationDelay: '-.8s' }} />
        <PixelSprite grid={[...SPRITES.star]} palette={{ X: 'var(--olive)' }} size={3} className="anim-float" style={{ position: 'absolute', bottom: '22%', right: '4%', animationDelay: '-2.4s' }} />
      </div>

      <div className="hero-grid">
        {/* ESQUERDA */}
        <div className="hero-copy">
          <div className="hero-status pixel anim-fadeUp">
            <span className="hero-dot anim-blink" />
            {t('hero.status')}
          </div>

          <h1 className="hero-title anim-fadeUp delay-1">
            <span className="hero-greet">{t('hero.greeting')}</span>
            <span className="hero-name">
              {t('hero.name')}
              <span className="hero-underline" aria-hidden />
            </span>
          </h1>

          <div className="hero-type anim-fadeUp delay-2" aria-live="polite">
            <span className="pixel hero-prompt">&gt;</span>
            {displayed}
            <span className="hero-caret anim-blink" />
          </div>

          <p className="hero-desc anim-fadeUp delay-3">{t('hero.desc')}</p>

          <div className="hero-ctas anim-fadeUp delay-4">
            <a href="#projects" className="btn btn-primary">
              ▶ {t('hero.cta1')} <ArrowRight size={14} />
            </a>
            <a href="#contact" className="btn">
              {t('hero.cta2')} <MessageCircle size={14} />
            </a>
          </div>
        </div>

        {/* DIREITA — cartão de personagem */}
        <div className="hero-card-wrap anim-fadeUp delay-3">
          <div className="hero-card panel">
            <div className="window-bar">
              <span>player_01.png</span>
              <span className="window-dots"><i /><i /><i /></span>
            </div>

            <div className="hero-avatar">
              <img src="/avatar.png" alt="Melzira Ebo" />
              <span className="hero-badge pixel">✦ {t('hero.badge')}</span>
            </div>

            <dl className="hero-stats">
              <div><dt className="pixel">{t('hero.card.class')}</dt><dd>Frontend Dev</dd></div>
              <div><dt className="pixel">{t('hero.card.school')}</dt><dd>42 Luanda</dd></div>
              <div>
                <dt className="pixel">{t('hero.card.hp')}</dt>
                <dd className="hero-hearts">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <PixelSprite key={i} grid={[...SPRITES.heart]} palette={{ X: 'var(--accent)', W: '#FFE2CF' }} size={2.4} />
                  ))}
                </dd>
              </div>
              <div className="hero-xp">
                <dt className="pixel">{t('hero.card.xp')}</dt>
                <dd>
                  <div className="blocks" style={{ ['--fill' as string]: 'var(--cold)' }}><span className="hero-xp-fill" /></div>
                  <span className="pixel" style={{ color: 'var(--cold)', fontSize: '.7rem' }}>∞</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="hero-online pixel">
            <span className="hero-dot" style={{ background: 'var(--olive)' }} />
            {t('hero.card.status')}
          </div>
        </div>
      </div>

      {/* terreno de blocos */}
      <div className="hero-terrain" aria-hidden>
        <div className="hero-ground" style={{ backgroundImage: `${GRASS}, ${DIRT}` }} />
        <PixelSprite grid={TREE} palette={TREE_PAL} size={8} className="ht-obj" style={{ left: '1.5%' }} />
        <PixelSprite grid={FLOWER_R} palette={FLOWER_PAL} size={5} className="ht-obj jr-sway" style={{ left: '12%' }} />
        <PixelSprite grid={SIGN} palette={SIGN_PAL} size={6} className="ht-obj" style={{ left: '22%' }} />
        <div className="ht-obj ht-walker" style={{ left: '30%' }}>
          <PixelSprite grid={HERO_A} palette={HERO_PAL} size={4} />
        </div>
        <PixelSprite grid={FLOWER_Y} palette={FLOWER_PAL} size={5} className="ht-obj jr-sway" style={{ left: '66%', animationDelay: '-.8s' }} />
        <PixelSprite grid={TREE} palette={TREE_PAL} size={8} className="ht-obj" style={{ left: '88%' }} />
        <PixelSprite grid={FLOWER_R} palette={FLOWER_PAL} size={5} className="ht-obj jr-sway" style={{ left: '79%', animationDelay: '-1.4s' }} />
      </div>

      <a href="#about" className="hero-scroll pixel anim-fadeUp delay-7">
        <span className="anim-blink">▼</span> {t('hero.scroll')}
      </a>
    </section>
  )
}
