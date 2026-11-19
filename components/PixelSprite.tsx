/* Desenha pixel-art a partir de uma grelha de texto.
   Cada caractere mapeia para uma cor; '.' é transparente. */

type Palette = Record<string, string>

export function PixelSprite({
  grid, palette, size = 4, className, style, title,
}: {
  grid: string[]
  palette: Palette
  size?: number
  className?: string
  style?: React.CSSProperties
  title?: string
}) {
  const h = grid.length
  const w = Math.max(...grid.map(r => r.length))
  const rects: React.ReactNode[] = []
  grid.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const c = row[x]
      if (c === '.' || c === ' ') continue
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={palette[c] ?? 'currentColor'} />)
    }
  })
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * size}
      height={h * size}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {rects}
    </svg>
  )
}

/* ── SPRITES ── */
export const SPRITES = {
  heart: [
    '.XX.XX.',
    'XWXXXXX',
    'XXXXXXX',
    '.XXXXX.',
    '..XXX..',
    '...X...',
  ],
  heartEmpty: [
    '.XX.XX.',
    'X..X..X',
    'X.....X',
    '.X...X.',
    '..X.X..',
    '...X...',
  ],
  coin: [
    '..XXXX..',
    '.XYYYYX.',
    'XYYWYYYX',
    'XYYWYYYX',
    'XYYWYYYX',
    'XYYYYYYX',
    '.XYYYYX.',
    '..XXXX..',
  ],
  star: [
    '...X...',
    '...X...',
    '..XXX..',
    'XXXXXXX',
    '..XXX..',
    '.XX.XX.',
    'X.....X',
  ],
  sparkle: [
    '..X..',
    '..X..',
    'XXXXX',
    '..X..',
    '..X..',
  ],
  controller: [
    '.XXXXXXXXXX.',
    'XXXXXXXXXXXX',
    'XX.XXXXXX.XX',
    'X...XXXXX.X.',
    'XX.XXXXX.X.X',
    'XXXXXXXXXXXX',
    'XXXX....XXXX',
    '.XX......XX.',
  ],
  arrow: [
    'X...',
    'XX..',
    'XXX.',
    'XXXX',
    'XXX.',
    'XX..',
    'X...',
  ],
  trophy: [
    'XXXXXXXXX',
    'X.XYYYX.X',
    'X.XYYYX.X',
    '.XXYYYXX.',
    '...XYX...',
    '....X....',
    '...XXX...',
    '..XXXXX..',
  ],
  cursor: [
    'X.....',
    'XX....',
    'XWX...',
    'XWWX..',
    'XWWWX.',
    'XWWWWX',
    'XWWXXX',
    'XX.WX.',
    'X..WX.',
  ],
} as const
