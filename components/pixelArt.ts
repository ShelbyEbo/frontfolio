/* Pixel art original (inspirada em mundos de blocos) gerada a partir de grelhas de texto. */

export type Palette = Record<string, string>

/** Converte uma grelha numa imagem SVG (data URI) — ideal para tiles em CSS. */
export function pixelUri(grid: readonly string[], palette: Palette): string {
  const h = grid.length
  const w = Math.max(...grid.map(r => r.length))
  let rects = ''
  grid.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const c = row[x]
      if (c === '.' || c === ' ' || !palette[c]) continue
      rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${palette[c]}"/>`
    }
  })
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${rects}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

/* ── BLOCOS ── */
export const GRASS_BLOCK = [
  'GGgGGGGgGGGGgGGG',
  'GgGGGgGGGgGGGGgG',
  'GGGgGGGGGGGgGGGG',
  'gGDGGgDGGgGGDgGD',
  'DGDDgDDGDDDgDDGD',
  'DDdDDDlDDdDDDDDD',
  'DlDDdDDDDDDlDDdD',
  'DDDDDDdDlDDDDDDD',
  'dDDlDDDDDDdDDlDD',
  'DDDDDdDDDDDDDDDd',
  'DDdDDDDlDDdDDDDD',
  'DlDDDDDDDDDDlDDD',
  'DDDDdDDDdDDDDDdD',
  'DDlDDDDDDDlDDDDD',
  'dDDDDDlDDDDDdDDD',
  'DDDDdDDDDDDDDDDl',
]
export const DIRT_BLOCK = [
  'DDdDDDlDDdDDDDDD',
  'DlDDdDDDDDDlDDdD',
  'DDDDDDdDlDDDDDDD',
  'dDDlDDDDDDdDDlDD',
  'DDDDDdDDDDDDDDDd',
  'DDdDDDDlDDdDDDDD',
  'DlDDDDDDDDDDlDDD',
  'DDDDdDDDdDDDDDdD',
  'DDlDDDDDDDlDDDDD',
  'dDDDDDlDDDDDdDDD',
  'DDDDdDDDDDDDDDDl',
  'DDdDDDDDDDDdDDDD',
  'DDDDDlDDdDDDDDlD',
  'DlDDDDDDDDDDDDDD',
  'DDDdDDDDDlDDdDDD',
  'DDDDDDdDDDDDDDDD',
]
export const BLOCK_PAL: Palette = {
  G: '#6DB33F', g: '#559A2E',
  D: '#8B5A3C', d: '#6E4329', l: '#A06B47',
}
export const BLOCK_PAL_NIGHT: Palette = {
  G: '#3F6E2A', g: '#335C22',
  D: '#5A3B28', d: '#47301F', l: '#6A4632',
}

/* ── PERSONAGEM (Melzira) ── 10×17, dois frames de caminhada */
const HEAD = [
  '..HHHHHH..',
  '.HHHHHHHH.',
  'HHSSSSSSHH',
  'HHSESSESHH',
  'HHSSSSSSHH',
  'HhSSssSShH',
  'Hh.SSSS.hH',
  'h.WWWWWW.h',
  '..WWBWWW..',
  '.SWWBWWWS.',
  '.SWWBWWWS.',
  '.OWWWWWWS.',
  '..PPPPPP..',
  '..PPPPPP..',
]
export const HERO_A = [...HEAD, '..PP..PP..', '..PP..PP..', '.FFF..FFF.']
export const HERO_B = [...HEAD, '.PP....PP.', 'PP......PP', 'FF......FF']
export const HERO_PAL: Palette = {
  H: '#2B1A12', h: '#9A6532',
  S: '#7A4A2E', s: '#5E3720', E: '#160C07',
  W: '#F3EEE6', B: '#3A63B8',
  O: '#EC5A26',
  P: '#3A3A4A', F: '#1A1A1A',
}

/* ── CENÁRIO ── */
export const TREE = [
  '..LLLLLL..',
  '.LLlLLLLL.',
  'LLLLLLlLLL',
  'LlLLLLLLLL',
  'LLLLlLLLlL',
  'LLlLLLLLLL',
  '.LLLLLlLL.',
  '....TT....',
  '....Tt....',
  '....TT....',
  '....tT....',
  '....TT....',
]
export const TREE_PAL: Palette = { L: '#4E9A2E', l: '#3B7A22', T: '#7A5230', t: '#5E3E22' }

export const CLOUD = [
  '....WWWW......',
  '..WWWWWWWW....',
  '.WWWWWWWWWWWW.',
  'WWWWWWWWWWWWWW',
  '.wwwwwwwwwwww.',
]
export const CLOUD_PAL: Palette = { W: '#FFFFFF', w: '#E8EEF2' }

export const FLOWER_R = ['.R.', 'RYR', '.R.', '.g.', 'gg.']
export const FLOWER_Y = ['.Y.', 'YOY', '.Y.', '.g.', '.gg']
export const FLOWER_PAL: Palette = { R: '#E04A3A', Y: '#F2C43A', O: '#E07A2A', g: '#3F7A1F' }

export const TORCH_OFF = [
  '..s..',
  '.sSs.',
  '..W..',
  '..W..',
  '..w..',
  '..W..',
  '..w..',
]
export const TORCH_ON = [
  '.FyF.',
  'FYyYF',
  '.FYF.',
  '..W..',
  '..W..',
  '..w..',
  '..W..',
]
export const TORCH_PAL: Palette = { F: '#FF6B35', Y: '#FFD23A', y: '#FFF3B0', W: '#8A5A34', w: '#6B4229', s: '#4A4A4A', S: '#2E2E2E' }

export const CHEST_CLOSED = [
  '.KKKKKKKKKK.',
  'KwwwwwwwwwwK',
  'KwwwwwwwwwwK',
  'KKKKKggKKKKK',
  'KwwwwgGwwwwK',
  'KwwwwwwwwwwK',
  'KwwwwwwwwwwK',
  'KKKKKKKKKKKK',
]
export const CHEST_OPEN = [
  '.KKKKKKKKKK.',
  'KwwwwwwwwwwK',
  'KKKKKKKKKKKK',
  'KDdDdDdDdDdK',
  'KwwwwgGwwwwK',
  'KwwwwwwwwwwK',
  'KwwwwwwwwwwK',
  'KKKKKKKKKKKK',
]
export const CHEST_PAL: Palette = { K: '#3E2614', w: '#A86B34', g: '#9A9A9A', G: '#D0D0D0', D: '#4FD8E3', d: '#9BF0F5' }

export const SIGN = [
  'WWWWWWWWWW',
  'WwwwwwwwwW',
  'WwKKwKKwwW',
  'WwwwwwwwwW',
  'WWWWWWWWWW',
  '....TT....',
  '....TT....',
  '....TT....',
]
export const SIGN_PAL: Palette = { W: '#8A5A34', w: '#B98A55', K: '#5E3E22', T: '#6B4229' }

export const FLAG = [
  'P.........',
  'PFFFFFF...',
  'PFFFFFFFF.',
  'PFFFDFFFF.',
  'PFFFFFFF..',
  'PFFFF.....',
  'P.........',
  'P.........',
  'P.........',
  'P.........',
  'P.........',
  'P.........',
  'P.........',
  'P.........',
  'PP........',
]
export const FLAG_PAL: Palette = { P: '#D9D2C6', F: '#EC5A26', D: '#4FD8E3' }

export const DIAMOND = [
  '..DDD..',
  '.DdDDD.',
  'DdDDDDD',
  'DDDDDDD',
  '.DDDDD.',
  '..DDD..',
  '...D...',
]
export const DIAMOND_PAL: Palette = { D: '#4FD8E3', d: '#C9F7FA' }
