'use client'
import { useEffect, useState } from 'react'
import { useI18n } from '@/hooks/useI18n'
import { useInView } from '@/hooks/useInView'
import { CONFIG } from '@/data'
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react'
import { PixelSprite, SPRITES } from './PixelSprite'

export function Contact() {
  const { t } = useI18n()
  const { ref, inView } = useInView()
  const [count, setCount] = useState(9)

  /* contagem "CONTINUE?" — dá a volta em vez de acabar em game over */
  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => setCount(c => (c <= 0 ? 9 : c - 1)), 1000)
    return () => window.clearInterval(id)
  }, [inView])

  const socials = [
    { Icon: Github,   label: 'GitHub',   text: 'ShelbyEbo',         href: CONFIG.github },
    { Icon: Linkedin, label: 'LinkedIn', text: 'Orisa Melzira Ebo', href: CONFIG.linkedin },
    { Icon: Mail,     label: 'Email',    text: CONFIG.email,        href: `mailto:${CONFIG.email}` },
  ]

  return (
    <section id="contact">
      <div className="section-wrap" ref={ref}>
        <div className="section-label"><span className="num">05</span>{t('contact.label')}</div>

        <div className={`cta-box reveal ${inView ? 'visible' : ''}`}>
          <div className="cta-left">
            <div className="cta-insert pixel">
              <PixelSprite grid={[...SPRITES.coin]} palette={{ X: '#C08457', Y: '#FF6B35', W: '#FFE2CF' }} size={3} className="anim-float" />
              <span className="anim-blink">{t('contact.insert')}</span>
            </div>
            <h2 className="cta-title">
              {t('contact.title')}<span className="cta-q">?</span>
            </h2>
            <p className="cta-desc">{t('contact.desc')}</p>
            <a href={`mailto:${CONFIG.email}`} className="btn btn-primary cta-btn">
              <Mail size={15} /> {t('contact.cta')}
            </a>
          </div>

          <div className="cta-right">
            <div className="cta-count" aria-hidden>
              <span className="pixel">Continue?</span>
              <span className="cta-num">{count}</span>
            </div>
            <div className="cta-p2 pixel">{t('contact.player2')}</div>
            <div className="cta-socials">
              {socials.map(({ Icon, label, text, href }) => (
                <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel="noopener noreferrer" className="social">
                  <span className="social-icon"><Icon size={16} /></span>
                  <span className="social-text">
                    <b>{text}</b>
                    <small className="pixel">{label}</small>
                  </span>
                  <ArrowUpRight size={16} className="social-arrow" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
