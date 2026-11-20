// Club colours. The club owns identity, Clean Sheet owns meaning.
//
// A club picks two colours. They go on the bar, the crest, the kit in pitch drawings, player badges and the
// bands on anything that leaves the app. Buttons stay green and proof stays amber at every club.
//
// Nothing here restyles a component directly. A component marks what it is (data-club-bar, data-club-tab,
// data-club-pill, data-club-band, data-club-home, data-club-away, data-club-badge, data-club-keep) and the
// rules below colour those marks, only inside an element that has data-club. A club with nothing set has
// no data-club anywhere, so it looks exactly as the product did before.

import { createContext, useContext, useEffect, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'

export const CS_GREEN = '#2f6252', INK = '#10211f', AMBER = '#f4c95d'

// ── Colour sums ──────────────────────────────────────────────────────────────
const rgb = (hex: string) => { const h = hex.replace('#', ''); const f = h.length === 3 ? h.split('').map(c => c + c).join('') : h; return [0, 2, 4].map(i => parseInt(f.slice(i, i + 2), 16) / 255) }
const lum = (hex: string) => { const [r, g, b] = rgb(hex).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
export const contrast = (a: string, b: string) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) }
const hsl = (hex: string) => { const [r, g, b] = rgb(hex), max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, l = (max + min) / 2; let h = 0; if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4; return { h: (h * 60 + 360) % 360, l, s: d ? d / (1 - Math.abs(2 * l - 1)) : 0 } }
/** Close enough to the amber that marks proof to be mistaken for it: hue within about 20 degrees, and light. */
export const nearAmber = (hex: string) => { const a = hsl(AMBER), c = hsl(hex), dh = Math.min(Math.abs(a.h - c.h), 360 - Math.abs(a.h - c.h)); return dh <= 20 && c.l >= 0.45 && c.s >= 0.4 }
export const isHex = (s: string) => /^#[0-9a-fA-F]{6}$/.test(s)

export type Tiles = 'colours' | 'charcoal'
export type Club = { /** the big story tile and lead tiles */ tileBig: string; /** the second feature tile */ tileNext: string; onNext: string; tiles: Tiles; main: string; second: string; onMain: string; onSecond: string; /** the 4px line, active tab, and outlines */ line: string; onLine: string; tooClose: boolean; pale: boolean; crest?: string; name?: string }

/** The four tokens. Writing colours are worked out, never picked. */
export const CHARCOAL = '#1b1d1d', CHARCOAL_NEXT = '#2a2e2d'
export function derive(main: string, second: string, crest?: string, name?: string, tiles: Tiles = 'colours'): Club {
  const on = (c: string) => contrast('#ffffff', c) >= 4.5 ? '#ffffff' : INK
  const onMain = on(main), tooClose = contrast(main, second) < 1.5
  const line = tooClose ? (onMain === '#ffffff' ? '#ffffff' : INK) : second
  // Big tiles. "In your colours": the darker club colour on the story tile if white reads on it at 9 to 1 or better,
  // otherwise charcoal; the main colour on the next tile unless it is close to amber. "Charcoal": both charcoal.
  const darker = lum(main) <= lum(second) ? main : second
  const tileBig = tiles === 'colours' && contrast('#ffffff', darker) >= 9 ? darker : CHARCOAL
  const tileNext = tiles === 'colours' && !nearAmber(main) ? main : CHARCOAL_NEXT
  return { tileBig, tileNext, onNext: on(tileNext), tiles, main, second, onMain, onSecond: on(second), line, onLine: on(line), tooClose, pale: onMain === INK, crest, name }
}

// ── What each club has saved ─────────────────────────────────────────────────
export type Saved = { main: string; second: string; on: boolean; crest?: string; tiles?: Tiles }
const KEY = 'cs_club_colours_v1'
let all: Record<string, Saved> = (() => { try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, Saved> } catch { return {} } })()
let clubNow = 'demo'   // the club of the team or child in view
const subs = new Set<() => void>()
const tell = () => subs.forEach(f => f())
const sub = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }

export function saveClub(key: string, v: Saved) { all = { ...all, [key]: v }; try { localStorage.setItem(KEY, JSON.stringify(all)) } catch { /* a crest too big to keep: the colours still apply until the page is closed */ } tell() }
export const savedClub = (key: string): Saved | undefined => all[key]
/** Say which club is in view. The theme follows it. */
export function setClubInView(key: string) { if (key !== clubNow) { clubNow = key; tell() } }
export const useClubInView = () => useSyncExternalStore(sub, () => clubNow, () => clubNow)
export const useSaved = (key: string) => useSyncExternalStore(sub, () => all[key], () => all[key])
/** The colours of the club in view, for things made outside React (a PDF). Null on Clean Sheet green. */
export const clubNowColours = (): Club | null => { const s = all[clubNow]; return s?.on ? derive(s.main, s.second, s.crest, undefined, s.tiles) : null }

// ── Applying it ──────────────────────────────────────────────────────────────
const Ctx = createContext<Club | null>(null)
/** The colours in force here, or null when the club is on Clean Sheet green. */
export const useClub = () => useContext(Ctx)

const vars = (c: Club) => ({ '--club-main': c.main, '--club-second': c.second, '--club-on-main': c.onMain, '--club-on-second': c.onSecond, '--club-line': c.line, '--club-on-line': c.onLine, '--club-pill-ring': c.pale ? `0 0 0 1.5px ${INK}` : '0 0 0 0 transparent', '--club-tile-big': c.tileBig, '--club-tile-next': c.tileNext, '--club-on-next': c.onNext }) as CSSProperties

const B = '[data-club] [data-club-bar]'
const RULES = `
${B}{background:var(--club-main)!important;box-shadow:inset 0 -4px 0 var(--club-line)!important}
${B},${B} *{color:var(--club-on-main)!important}
${B} svg[stroke]:not([stroke="none"]){stroke:currentColor!important}
${B} [aria-label="Ask Clean Sheet"]{border-color:var(--club-on-main)!important}
${B} [data-club-tab="on"]{background:var(--club-line)!important;border-radius:10px!important;border-bottom-color:transparent!important}
${B} [data-club-tab="on"],${B} [data-club-tab="on"] *{color:var(--club-on-line)!important}
${B} [data-club-tab="off"]{border-bottom-color:transparent!important}
${B} [data-club-pill]{background:#ffffff!important;border-color:transparent!important;box-shadow:var(--club-pill-ring)!important}
${B} [data-club-pill],${B} [data-club-pill] *,${B} [data-club-keep],${B} [data-club-keep] *{color:${INK}!important}
[data-club] [data-club-band]{background:var(--club-main)!important;border-bottom:6px solid var(--club-line)!important}
[data-club] [data-club-band],[data-club] [data-club-band] *{color:var(--club-on-main)!important}
[data-club] [data-club-home]{fill:var(--club-main)!important;stroke:var(--club-line)!important}
[data-club] [data-club-away]{fill:#f7f8f7!important;stroke:${INK}!important}
[data-club] [data-club-badge],[data-club] [data-club-kit]{background:var(--club-main)!important;color:var(--club-on-main)!important;outline:2px solid var(--club-line);outline-offset:-1px}
[data-club] [data-club-tile="big"]{background:var(--club-tile-big)!important}
[data-club] [data-club-tile="next"]{background:var(--club-tile-next)!important}
[data-club] [data-club-tile] [data-club-mute]{color:#c9cecc!important}
[data-club] [data-club-tile]{border-color:transparent!important}
[data-club] [data-club-tile] [data-club-edge]{border-color:#c9cecc!important}
[data-club] [data-club-tile] [data-club-thumb]{background:#2e3231!important}
[data-club][data-club-next-ink] [data-club-tile="next"],[data-club][data-club-next-ink] [data-club-tile="next"] *{color:${INK}!important}
[data-club][data-club-next-ink] [data-club-tile="next"] button{border-color:${INK}!important}
[data-club][data-club-next-ink] [data-club-tile="next"] svg[stroke]:not([stroke="none"]){stroke:currentColor!important}
[data-club][data-club-next-ink] [data-club-tile="next"] [data-club-tile-chip]{background:rgba(16,33,31,0.12)!important}
[data-club] [data-club-on]{color:var(--club-on-main)!important;fill:var(--club-on-main)!important}
`

// The older screens each draw their own top bar. While a club's colours are on, find those bars and mark them:
// a full-width green strip at the top of its screen. Tiles, lead tiles and buttons are never bars, and a screen
// that spans clubs opts out with data-club-none. With no colours set this never runs.
const BAR_GREENS = ['rgb(47, 98, 82)', 'rgb(31, 74, 62)']   // the two bar greens; the darker lead-tile green is never a bar
const LEAD = 'rgb(28, 58, 51)', MUTED = ['rgb(169, 207, 192)', 'rgb(207, 230, 220)']
const CONTROL = 'button,a,[role=button],[role=radio],[role=tab],[role=switch],[role=checkbox],[role=option],[aria-pressed],[aria-checked],[aria-selected]'
const APP_PATH = /^\/(look|tour|sandbox\/[a-z]|__screen|family|share)\b/
// The big dark tiles: the story tile and lead tiles (the darkest green) take club-tile-big, and a large green
// surface that is not a bar or a control takes club-tile-next. Inside them, muted writing and film thumbnails
// go neutral so nothing green is left on a club's colours.
function markTiles() {
  if (!APP_PATH.test(window.location.pathname)) return
  for (const el of document.querySelectorAll<HTMLElement>(`[data-club] [style*="${LEAD}"],${BAR_GREENS.map(g => `[data-club] div[style*="${g}"],[data-club] section[style*="${g}"],[data-club] article[style*="${g}"],[data-club] aside[style*="${g}"]`).join(',')}`)) {
    if (el.dataset.clubTileSeen || el.hasAttribute('data-club-bar')) continue
    const bg = el.style.backgroundColor, lead = bg === LEAD
    if (!lead && !BAR_GREENS.includes(bg)) continue
    const b = el.getBoundingClientRect(); if (!b.width) continue
    if (el.tagName === 'DIV' && !el.dataset.clubSeen && !lead) continue   // the bar finder has not looked at it yet
    el.dataset.clubTileSeen = '1'
    if (el.closest('[data-club-band],[data-club-none],svg') || el.matches(CONTROL) || el.closest(CONTROL)) continue
    if (el.parentElement?.closest('[data-club-bar]')) continue
    const inTile = el.parentElement?.closest('[data-club-tile]')
    if (inTile) { el.setAttribute('data-club-thumb', ''); continue }  // a film thumbnail or panel on a tile
    if (!((b.width >= 180 && b.height >= 56) || (b.width >= 300 && b.height >= 40))) continue   // a chip, a tick, a chart bar: not a tile
    el.setAttribute('data-club-tile', lead || bg === BAR_GREENS[1] ? 'big' : 'next')
  }
  for (const tile of document.querySelectorAll<HTMLElement>('[data-club] [data-club-tile]')) for (const kid of tile.querySelectorAll<HTMLElement>('[style]')) {
    if (MUTED.includes(kid.style.color)) kid.setAttribute('data-club-mute', '')
    if (MUTED.includes(kid.style.borderTopColor) || /^rgba\(169, 207, 192/.test(kid.style.borderTopColor)) kid.setAttribute('data-club-edge', '')
    if (!kid.hasAttribute('data-club-thumb') && (kid.style.backgroundColor === BAR_GREENS[1] || kid.style.backgroundColor === 'rgb(36, 74, 65)') && !kid.matches(CONTROL)) kid.setAttribute('data-club-thumb', '')
    else if (/^rgba\(255, 255, 255, 0\.[012]/.test(kid.style.backgroundColor)) kid.setAttribute('data-club-tile-chip', '')
  }
}
function markBars() {
  if (!APP_PATH.test(window.location.pathname)) return
  const found = document.querySelectorAll<HTMLElement>(BAR_GREENS.map(g => `[data-club] div[style*="${g}"],[data-club] header[style*="${g}"],[data-club] nav[style*="${g}"]`).join(','))
  for (const el of found) {
    if (el.dataset.clubSeen || !BAR_GREENS.includes(el.style.backgroundColor)) continue
    if (el.closest('[data-club-bar],[data-club-band],[data-club-none],[data-demo-bar],section,article,button')) { el.dataset.clubSeen = '1'; continue }
    const b = el.getBoundingClientRect(); if (!b.width) continue          // not laid out yet: look again later
    el.dataset.clubSeen = '1'
    if (b.height < 40 || b.height > 150) continue
    let screen: HTMLElement = el; for (let up = el.parentElement; up && up !== document.body; up = up.parentElement) { const w = up.getBoundingClientRect().width; if (w > b.width + 4) break; screen = up }
    const full = b.width >= 1170 || (b.width >= 380 && b.width <= 394)      // as wide as a tablet or a phone screen
    if (!full || b.top - screen.getBoundingClientRect().top > 90) continue   // a strip inside the page, not its top bar
    if (el.querySelector('[data-club-bar]')) continue
    el.setAttribute('data-club-bar', 'auto')
    // light chips and avatars on the bar keep their own dark writing
    for (const kid of el.querySelectorAll<HTMLElement>('*')) { const c = kid.style.backgroundColor.match(/^rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?/); if (c && (c[4] === undefined || Number(c[4]) > 0.6) && (0.2126 * +c[1] + 0.7152 * +c[2] + 0.0722 * +c[3]) / 255 > 0.6) kid.setAttribute('data-club-keep', '') }
  }
}

/** Round the whole app: applies the colours saved by the club in view. */
export function ClubRoot({ children }: { children: ReactNode }) {
  const key = useClubInView(), saved = useSaved(key)
  const club = saved?.on ? derive(saved.main, saved.second, saved.crest, undefined, saved.tiles) : null
  const on = !!club
  useEffect(() => {
    if (!on) return
    let t: ReturnType<typeof setTimeout> | undefined
    const later = () => { if (!t) t = setTimeout(() => { t = undefined; markBars(); markTiles() }, 60) }
    const seen = new MutationObserver(later); seen.observe(document.body, { childList: true, subtree: true })
    later()
    return () => { seen.disconnect(); if (t) clearTimeout(t) }
  }, [on])
  return <Ctx.Provider value={club}><style>{RULES}</style><div data-club={club ? '' : undefined} data-club-next-ink={club && club.onNext === INK ? '' : undefined} style={{ display: 'contents', ...(club ? vars(club) : {}) }}>{children}</div></Ctx.Provider>
}

/** One part of the screen in a named club's colours: a reference board, or a child's card at another club. */
export function ClubScope({ main, second, name, crest, tiles, children }: { main: string; second: string; name?: string; crest?: string; tiles?: Tiles; children: ReactNode }) {
  const club = derive(main, second, crest, name, tiles)
  useEffect(() => { const t = setTimeout(() => { markBars(); markTiles() }, 80); return () => clearTimeout(t) })   // a board is themed even when the club in view is on green
  return <Ctx.Provider value={club}><div data-club="" data-club-next-ink={club.onNext === INK ? '' : undefined} style={{ display: 'contents', ...vars(club) }}>{children}</div></Ctx.Provider>
}

/** The club's crest: its image if it has added one, otherwise a shield in its two colours. Nothing while the club is on green, unless `always`. */
export function Crest({ size = 22, always = false, club: given }: { size?: number; always?: boolean; club?: Club }) {
  const ctx = useClub(), c = given ?? ctx ?? (always ? derive(CS_GREEN, '#ffffff') : null)
  if (!c) return null
  if (c.crest) return <img src={c.crest} alt="" width={size} height={size} style={{ flex: 'none', objectFit: 'cover', borderRadius: 4 }} />
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none' }}>
    <path d="M12 2.5l8 2.5v6.5c0 5-3.4 8.400-8 10-4.600-1.600-8-5-8-10V5z" fill={c.second} />
    <path d="M12 2.5L4 5v6.500c0 5 3.400 8.400 8 10z" fill={c.main} />
    <path d="M12 2.500l8 2.500v6.500c0 5-3.400 8.400-8 10-4.600-1.600-8-5-8-10V5z" fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
}

// The clubs drawn on the boards.
export const REDGUM = { name: 'Redgum United', main: '#c8102e', second: '#111111' }
export const HARBOUR = { name: 'Harbour City FC', main: '#14213d', second: '#f2b705' }
export const IRONBARK = { name: 'Ironbark FC', main: '#111111', second: '#ffffff' }
export const BAYSIDE = { name: 'Bayside Rovers', main: '#7cc4ee', second: '#14213d' }
