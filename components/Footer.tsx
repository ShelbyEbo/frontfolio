'use client'
import { useI18n } from '@/hooks/useI18n'
import { CONFIG } from '@/data'
import { PixelSprite, SPRITES } from './PixelSprite'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-thanks pixel">
          <span style={{ color: 'var(--accent)' }}>★</span> {t('footer.thanks')} <span style={{ color: 'var(--cold)' }}>★</span>
        </div>

        <div className="footer-row">
          <a href="#home" className="nav-logo">
            {CONFIG.initials.slice(0, -1)}<span>{CONFIG.initials.slice(-1)}</span>
          </a>

          <span className="footer-copy">
            © 2026 <b>{CONFIG.name}</b> · {t('footer.copy')}
            <PixelSprite grid={[...SPRITES.heart]} palette={{ X: 'var(--accent)', W: '#FFE2CF' }} size={2} style={{ margin: '0 2px' }} />
          </span>

          <a href="#home" className="btn btn-sm">▲ {t('footer.top')}</a>
        </div>

        <div className="footer-hint pixel">{t('footer.hint')} ↑↑↓↓←→←→BA</div>
      </div>
    </footer>
  )
}
