// Clean Sheet Family (family-app-v12), on a phone. A parent uploads a video; credits pay for finding their own child's
// moments, and the first video is free. It works whether or not the club uses Clean Sheet, and a parent's own filming is
// private to the family for ever: no control here sends a video, a clip or a count to a club, a coach or another family.
// A demo of the flows on sample data. Nothing analyses real film; the purchase, the picker and the share sheet are stubs.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { pushPath, useBackState } from '../../backState'
import { openScreen } from '../openThing'
import { G, INK, MUT, LINE, PALE } from '../capture/marks'
import LearnPlayer, { Thumb } from '../learn/LearnPlayer'
import EducationPhone from '../learn/EducationPhone'
import { byTitle } from '../learn/library'
import { ADDED_ODDS, CHECK, CLUBS, HOWS, KINDS, MAX_MINUTES, OFFER_AT, PACKS, RATES, SAMPLE_OLDER, SHOW_COUNT_AT, SHOW_XG, STAT, STAT_KEYS, aboutGames, affordable, addSampleOlder, ageOf, clockOf, familyNow, film, filmId, finish, freshFamily, fullGames, howOf, named, ord, outcome, preset, priceOf, quote, reelOf, secsOf, setFamily, spend, tagged, useFamily, worth, xgOf, type Clip, type Family, type Kind, type StatKey, type Video } from './familyStore'

// Colour (family-app-v10). Green: things you do. Amber: your child's moments, and anything free. Mauve, on plum: with your club.
// Writing on amber, mauve and every tint is INK. Amber is never on an Estimate chip or a stat's number. The club's web page stays green.
const AMBER = '#f4c95d', MAUVE = '#c39797', ROSE = '#f4e6e6', ROSELINE = '#a97c7c', PLUM = '#33212b', PAGE = '#faf5ec', TINTS = ['#fbefc9', '#f4e6e6', '#eef5f2', '#f3ecdf']
const HAIR = '#e9eae8', GREY = '#8d9290', NIGHT = '#10211f', DEEP = '#1c3a33', MINT = '#cfe6dc', SOFT = '#a9cfc0'
// The screen is the phone it is on: as wide as the phone (to 430), and at least as tall as what the browser shows.
const phone: React.CSSProperties = { width: '100%', maxWidth: 430, minHeight: '100dvh', margin: '0 auto', boxSizing: 'border-box', background: PAGE, color: INK, fontFamily: "'DM Sans',system-ui,sans-serif", display: 'flex', flexDirection: 'column', position: 'relative' }
const card: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }
const bold: React.CSSProperties = { ...card, border: `2.5px solid ${INK}` }
const round: React.CSSProperties = { flex: 'none', width: 44, height: 44, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, boxSizing: 'border-box' }
const btn = (primary: boolean, off = false): React.CSSProperties => ({ flex: 1, minHeight: 50, padding: '0 12px', borderRadius: 12, border: primary ? 0 : `1px solid ${LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: off ? 'not-allowed' : 'pointer', opacity: off ? 0.5 : 1 })
const big = (on: boolean | 'club'): React.CSSProperties => ({ flex: 'none', minHeight: 58, borderRadius: 16, border: 0, background: on === 'club' ? MAUVE : on ? AMBER : G, color: on ? INK : '#fff', fontFamily: 'inherit', fontSize: 17, fontWeight: 700, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: '20px' })
const link: React.CSSProperties = { minHeight: 44, border: 0, background: 'none', padding: 0, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: G, cursor: 'pointer', whiteSpace: 'nowrap' }
const under: React.CSSProperties = { ...link, textDecoration: 'underline' }
const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, padding: '6px 0', border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer', width: '100%' }
const note: React.CSSProperties = { fontSize: 13, lineHeight: '19px', color: MUT, textAlign: 'center' }
const cap: React.CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }
const chip = (on: boolean): React.CSSProperties => ({ flex: 'none', minHeight: 44, minWidth: 44, padding: '0 16px', boxSizing: 'border-box', borderRadius: 999, border: on ? 0 : `1px solid ${LINE}`, background: on ? G : '#fff', color: on ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' })
const svg = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
const I = ({ d, size = 20, w = 2 }: { d: string; size?: number; w?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" {...svg} strokeWidth={w}><path d={d} /></svg>
const TICK = 'M5 12l5 5 9-10', CHEV = 'M9 6l6 6-6 6', BACK = 'M15 6l-6 6 6 6', SHIELD = 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', LOCK = 'M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z', PLAY = 'M8 5l11 7-11 7z', PLUS = 'M12 5v14M5 12h14', CROSS = 'M7 7l10 10M17 7L7 17', VIDEO = 'M3 7h12v10H3zM15 10l6-3v10l-6-3', BARS = 'M6 20v-6M12 20V6M18 20v-9'
const TABS: [string, string, string, string][] = [['Home', 'M4 11l8-7 8 7v9H4z', 'home', 'FAM3-Home'], ['Reels', VIDEO, 'reels', 'FAM18-Reels'], ['Learn', 'M5 4h14v16H5zM9 4v16', 'learn', 'FAM17-Learn'], ['Club', SHIELD, 'club', 'FAM11-Locked']]
const HOMES = ['FAM3-Home', 'FAM3e-HomeEmpty', 'FAM14-HomeWithClub']
// Retired 23 Nov: stats are for every age, so there is one Home and one results screen. The boards still open, and say so.
const RETIRED: Record<string, [string, string]> = { 'FAM3m-HomeStats': ['FAM3-Home', 'Stats are for every age now, so there is one Home, not one for under 12 and one for 12 and over.'], 'FAM8b-Results13': ['FAM8-Results', 'Stats are for every age now, so there is one results screen, not one for under 12 and one for 12 and over.'] }
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven']
const SAMPLE = 'A sample reel plays full screen: 48 seconds.'
const SHELVES: [string, [string, string][]][] = [['Just a ball', [['The drag-back', 'Clip'], ['Wall ball to 20', 'Game'], ['Toe taps and rolls', 'Game']]], ['Warm-ups that protect you', [['Five minutes at home', 'Warm-up'], ['Jump and land softly', 'Warm-up'], ['Hop and hold', 'Warm-up']]]]
const SEASON_MIN = 2005, SEASON_MAX = 2021
const Dot = ({ ok = true }: { ok?: boolean }) => <span style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, boxSizing: 'border-box', background: ok ? G : '#fff', border: ok ? 0 : `1.5px solid ${INK}`, color: ok ? '#fff' : INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={ok ? TICK : CROSS} size={13} w={3} /></span>
const Line = ({ a, b, ok = true, top = true }: { a: string; b?: string; ok?: boolean; top?: boolean }) => <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '9px 0', borderTop: top ? `1px solid ${LINE}` : 0 }}><Dot ok={ok} /><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{a}</strong>{b && <span style={{ fontSize: 14, lineHeight: '19px', color: MUT }}>{b}</span>}</span></div>
const Mark = () => <span style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><strong style={{ fontSize: 21, letterSpacing: '-0.02em' }}>Clean Sheet</strong><span style={{ ...cap, opacity: 0.8 }}>FAMILY</span></span>
const Moment = ({ c, turn, left }: { c: Clip; turn: number; left: number }) => <div style={{ alignSelf: 'flex-start', marginLeft: left, width: `calc(100% - ${left + 8}px)`, maxWidth: 268, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, padding: 7, borderRadius: 14, borderLeft: `6px solid ${AMBER}`, background: '#fff', color: INK, transform: `rotate(${turn}deg)`, boxShadow: '0 8px 22px rgba(0,0,0,0.3)' }}><span style={{ flex: 'none', width: 84 }}><Thumb kind="team" len={c.len} wide /></span><span style={{ display: 'flex', flexDirection: 'column' }}><span style={{ ...cap, fontSize: 10, color: MUT }}>{c.minute.toUpperCase()}</span><strong style={{ fontSize: 14, lineHeight: '18px' }}>{c.title}</strong></span></div>
const TOUR: Clip[] = (['look', 'turn', 'pass', 'won'] as Kind[]).map((k, n) => ({ len: KINDS[k].len, title: KINDS[k].title, minute: `${ord([14, 22, 31, 40][n])} minute` }))

/** The film behind the splash, drawn, under a dark wash so the heading reads at the top. */
const BACKDROP = <div aria-hidden style={{ position: 'absolute', inset: 0 }}><svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}><rect width="160" height="90" fill="#24493c" /><rect y="38" width="160" height="52" fill="#3d7a5f" /><path d="M0 40h160" stroke="#fff" strokeWidth="0.6" opacity="0.55" /><path d="M96 40l28 50M40 40L4 90" stroke="#fff" strokeWidth="0.5" opacity="0.35" />
  {([[74, 34, 1.9, '#f4f5f3'], [96, 36, 2.1, '#f4f5f3'], [108, 33, 1.8, '#c9cecc'], [126, 38, 2.3, '#f4f5f3'], [84, 44, 2.7, '#c9cecc'], [38, 30, 5.7, '#10211f']] as [number, number, number, string][]).map(([x, y, r, c]) => <g key={x} fill={c} stroke="#10211f" strokeWidth="0.4"><circle cx={x} cy={y} r={r} /><rect x={x - r * 1.23} y={y + r * 1.15} width={r * 2.46} height={r * 3.55} rx={r * 0.95} /><path d={`M${x - r * 0.62} ${y + r * 4.7}v${r * 2.2}M${x + r * 0.62} ${y + r * 4.7}v${r * 2.2}`} strokeWidth={r * 0.42} strokeLinecap="round" /></g>)}
  <circle cx="103" cy="58" r="1.8" fill="#fff" stroke="#10211f" strokeWidth="0.4" /></svg><span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(16,33,31,0.80) 0%, rgba(16,33,31,0.90) 45%, rgba(16,33,31,0.98) 100%)' }} /></div>

// A frame of the video, drawn: the parent's team in white, with shirt numbers they can tap.
const MATES: [number, number, string][] = [[17, 26, '4'], [33, 48, '7'], [46, 20, '9'], [21, 66, '11']], OTHERS: [number, number][] = [[39, 40], [63, 30], [57, 56], [71, 72]]
function Pitch({ picked, onPick, label, tag, h = 186 }: { picked?: string; onPick?: (n: string) => void; label?: ReactNode; tag?: string; /** its height when it is 362 wide */ h?: number }) {
  const dot = (on: boolean): React.CSSProperties => ({ width: 14, height: 14, borderRadius: 999, background: '#fff', border: `1.5px solid ${NIGHT}`, boxSizing: 'border-box', outline: on ? '2.5px solid #fff' : 0, outlineOffset: 5 })
  return <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: `362 / ${h}`, background: '#3d7a5f' }}>
    <svg viewBox={`0 0 362 ${h}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.9" aria-hidden><rect x="18" y="8" width="326" height={h - 16} /><path d={`M181 8v${h - 16}`} /><circle cx="181" cy={h / 2} r="26" /></svg>
    {OTHERS.map(([x, y]) => <span key={`${x}${y}`} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 13, height: 13, margin: -6, borderRadius: 999, background: NIGHT }} />)}
    {MATES.map(([x, y, n]) => { const at: React.CSSProperties = { position: 'absolute', left: `${x}%`, top: `${y}%`, width: 44, height: 44, margin: -22, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 0, background: 'none', padding: 0 }
      return onPick ? <button key={n} aria-label={`Player ${n}`} aria-pressed={picked === n} onClick={() => onPick(n)} style={{ ...at, cursor: 'pointer' }}><span style={dot(picked === n)} /></button> : <span key={n} style={at}><span style={dot(picked === n)} /></span> })}
    {tag && picked && <span style={{ position: 'absolute', left: `${MATES.find(m => m[2] === picked)?.[0] ?? 33}%`, top: `${(MATES.find(m => m[2] === picked)?.[1] ?? 48) - 24}%`, transform: 'translateX(-20%)', padding: '5px 12px', borderRadius: 999, background: '#fff', color: INK, fontSize: 14, fontWeight: 700 }}>{tag}</span>}
    {label && <span style={{ position: 'absolute', left: 10, right: 10, bottom: 10, display: 'flex', justifyContent: 'center' }}>{label}</span>}
  </div>
}
const pill: React.CSSProperties = { minHeight: 30, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center' }

/** Home depends on what the family has. */
function homeOf(s: Family) {
  const kid = s.kids.find(x => x.id === s.kid) ?? s.kids[0]
  if (!s.signedIn) return 'FAM1-Welcome'
  if (s.joined) return s.toldJoined ? 'FAM14-HomeWithClub' : 'FAM13-ClubJoined'
  if (!s.videos.length) return 'FAM3e-HomeEmpty'
  if (s.seasonDue && s.seasonDue === kid?.id && s.club) return 'FAM22-ThreeGames'
  return 'FAM3-Home'
}
/** Where the check lands for the chosen video: one of three outcomes, or one of the pages around them. */
function checkOf(s: Family) {
  const fm = film(s.film), o = outcome(fm, s.joined), price = s.held?.film === fm.id ? s.held.credits : priceOf(fm, s.joined, s.both, s.part)
  if (o === 'club') return 'FAM5c-ClubFilmedThis'
  if (fm.phone && !s.anyway) return 'FAM5p-PhoneCheck'
  if (o === 'no') return 'FAM5x-CantRead'
  if (s.balance < price) return 'FAM5n-NotEnough'
  return o === 'maybe' ? 'FAM5b-Maybe' : 'FAM5-Check'
}

/** A line said just before the app moves from a board's address to its own: it is still showing after the move. */
let said: string | null = null
const keep = (m: string | null) => { said = m }

/** `start` opens a board in the state it is drawn in (/__screen/<id>). `page` is the parent's own app (/family/<id>): the page is the address, and the family is as they left it. */
export default function FamilyApp({ start, page, onPage, onNav }: { start?: string; page?: string; onPage?: (s: string) => void; onNav?: (s: string) => void }) {
  useState(() => { if (start) setFamily(preset(start)); return 0 })   // a board opens in the state it is drawn in
  const f = useFamily(), kid = f.kids.find(x => x.id === f.kid) ?? f.kids[0], name = kid.name || 'your child'
  const [own, setOwn] = useBackState<string>(() => start ?? homeOf(familyNow()))
  const view = page && RETIRED[page] ? RETIRED[page][0] : page ?? own   // a retired page's own address opens what replaced it; its board still opens, and says so
  // From a board, the first move goes to the app's own address, where a refresh keeps what the parent has done.
  const setView = (id: string) => { if (page) onPage?.(id); else if (start) { pushPath(`/family/${id}`); setTimeout(() => window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state })), 0) } else setOwn(id) }
  const [ret, setRet] = useBackState('')
  const item = f.item, setItem = (t: string) => setFamily({ item: t })
  const [toast, setToast] = useState<string | null>(() => said)
  const [captions, setCaptions] = useState(true)
  const [sheet, setSheet] = useState<'delete' | 'close' | null>(null)
  const [all, setAll] = useState(''), [editing, setEditing] = useState(false), [adding, setAdding] = useState(false), [newName, setNewName] = useState('')
  const [q, setQ] = useState(start === 'FAM2c-PickClub' ? 'Hillv' : ''), [lost, setLost] = useState<{ name: string; place: string } | null>(null)
  const [extra, setExtra] = useState<{ name: string; year: string } | null>(null)   // a child being added from the account
  const [tick, setTick] = useState<{ id: string; n: number }>({ id: '', n: 0 }), [up, setUp] = useState(34)
  const [short] = useState(() => window.innerHeight < 780)   // a shorter phone, or a browser with its bars: the splash tightens so its button stays in view
  const [len, setLen] = useState<number | null>(null)   // the sample video's length, while its slider is being dragged
  const [at, setAt] = useState(36 * 60 + 40), [what, setWhat] = useState('A goal'), [stopped, setStopped] = useState(false)
  const say = (m: string) => { keep(m); setToast(m); setTimeout(() => { if (said === m) keep(null); setToast(t => t === m ? null : t) }, 3600) }
  const he = kid.he ? 'he' : 'she', him = kid.he ? 'him' : 'her', his = kid.he ? 'his' : 'her', age = ageOf(kid.year)
  const club = f.club?.name ?? 'your club', families = f.club && !f.club.unmatched && f.club.name === 'Hillview FC' ? f.families : 0, count = families >= SHOW_COUNT_AT
  const mine = f.videos.filter(v => v.kid === kid.id), ready = mine.filter(v => v.state === 'ready'), latest = ready[0]
  const video = f.videos.find(v => v.id === f.open) ?? null, working = f.videos.find(v => v.id === f.working && v.state === 'working') ?? null
  const games = `about ${aboutGames(f.balance, f.joined)} full ${aboutGames(f.balance, f.joined) === 1 ? 'game' : 'games'}`
  const top = () => window.scrollTo?.(0, 0)
  const goalsOf = (l: Clip[]) => `${tagged(l)} ${tagged(l) === 1 ? 'goal' : 'goals'}`, shotsOf = (l: Clip[]) => `${l.length} ${l.length === 1 ? 'shot' : 'shots'}`

  /** Where an id leads. Home, the results and the check depend on what the family has. */
  const go = (id: string) => {
    const s = familyNow(), k = s.kids.find(x => x.id === s.kid) ?? s.kids[0]
    let to = RETIRED[id]?.[0] ?? id
    if (HOMES.includes(to)) to = homeOf(s)
    if (['FAM8-Results', 'FAM20-GameStats', 'FAM21-StatClips'].includes(to)) {
      const v = s.videos.find(x => x.id === s.open && x.kid === k.id && x.clips.length) ?? s.videos.find(x => x.kid === k.id && x.state === 'ready')
      if (!v) { say('No reels yet. Add a video from Home.'); return }
      if (v.id !== s.open) setFamily({ open: v.id, clip: 0, from: 'reel' })
      if (v.state === 'few') to = 'FAM8x-TooFew'
      else if (!v.stats) to = 'FAM8-Results'
    }
    if (to === 'FAM11-Locked' && s.joined) to = 'FAM13-ClubJoined'
    if (to === 'FAM5-Check') to = s.freeUsed ? checkOf(s) : 'FAM2-AddChild'
    if (to === 'STA3-PickRole') { if (onNav) onNav(to); else openScreen(to); return }
    setView(to); top()
  }
  /** A page off to the side (the account, tips, credits): Back returns to where the parent was. */
  const side = (id: string) => { if (!['FAM19-Account', 'FAM15-Children', 'FAM16-Privacy', 'FAM4-BeforeYouFilm', 'FAM6-Credits', 'FAM10-ShareFamily'].includes(view)) setRet(view); setView(id); top() }
  const back = () => go(ret && ret !== view ? ret : 'FAM3-Home')
  const openVideo = (v: Video) => { setFamily({ open: v.id, clip: 0, from: 'reel', ...(v.state === 'working' ? { working: v.id } : v.state === 'unread' ? { film: v.film ?? 'bad', anyway: true, held: null } : {}) }); if (v.state === 'working') { setView('FAM7-Working'); top() } else if (v.state === 'unread') { setView('FAM5x-CantRead'); top() } else go('FAM8-Results') }
  const openClip = (n: number, from: 'reel' | StatKey = 'reel') => { setFamily({ clip: n, from }); setView('FAM9-Clip'); top() }
  const pickKid = (id: string) => { const s = familyNow(), v = s.videos.find(x => x.kid === id && x.state === 'ready'); setFamily({ kid: id, open: v?.id ?? '', clip: 0, from: 'reel' }); say(`Showing ${s.kids.find(x => x.id === id)?.name}.`) }
  const pickFilm = (id: string) => { setFamily({ film: id, part: 0, both: false, anyway: false, held: null }); setView(checkOf(familyNow())); top() }
  const lib = (title: string) => { setItem(title); setView('ECp2-FamilyItem'); top() }
  const put = (v: Video, from: 'reel' | StatKey, clips: Clip[], more: Partial<Video> = {}) => setFamily(s => ({ videos: s.videos.map(x => x.id !== v.id ? x : from === 'reel' || !x.stats ? { ...x, clips, ...more } : { ...x, stats: { ...x.stats, lists: { ...x.stats.lists, [from]: clips } }, ...more }) }))
  const listOf = (v: Video, from: 'reel' | StatKey) => from === 'reel' ? v.clips : v.stats?.lists[from] ?? []

  // the work takes "about 20 minutes": in the demo the ring fills in a few seconds, and the clips appear as they are found
  const wid = working?.id, begun = start === 'FAM7-Working' ? 3 : 0
  useEffect(() => { if (!said) return; const id = setTimeout(() => { keep(null); setToast(null) }, 3000); return () => clearTimeout(id) }, [])   // a line carried over from a board clears like any other
  const move = useRef(setView); useEffect(() => { move.current = setView })   // the timer moves on with the app as it is when it fires
  useEffect(() => {
    if (view !== 'FAM7-Working' || !wid) return
    const count = { n: begun }
    const id = setInterval(() => { count.n += 1; const n = count.n; setTick({ id: wid, n }); if (n < 6) return
      clearInterval(id); const r = finish(wid), kept = familyNow().videos.find(x => x.id === wid)?.clips.length; move.current(r.made ? 'FAM8r-Reveal' : kept ? 'FAM8x-TooFew' : 'FAM3-Home'); top(); if (!r.made && !kept) setToast(`We could not find a moment in that one, so your ${r.back} credits are back.`) }, 1000)
    return () => clearInterval(id)
  }, [view, wid, begun])
  // the upload carries on while the parent says who to look for
  useEffect(() => { if (view !== 'FAM2-AddChild') return; const id = setInterval(() => setUp(u => Math.min(100, u + 3)), 450); return () => clearInterval(id) }, [view])

  // ── an item from the Education centre's library for families: Clean Sheet's own, no coach, no club clips ──
  if (view === 'ECp1-FamilyLibrary' || view === 'ECp2-FamilyItem') return <EducationPhone key={view + item} start={view} show={view === 'ECp2-FamilyItem' ? item : undefined} child={name} own={{ age, home: f.joined && view === 'ECp1-FamilyLibrary' ? 'FAM3-Home' : 'FAM17-Learn' }} onNav={go} />

  // ── the pieces every page shares ──
  const overlays = <>
    {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 132, transform: 'translateX(-50%)', width: 'max-content', maxWidth: 'min(350px, calc(100vw - 32px))', zIndex: 60, pointerEvents: 'none', boxSizing: 'border-box', padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    {sheet && <div role="dialog" aria-label={sheet === 'delete' ? 'Delete everything' : 'Close my account'} style={{ position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(16,33,31,0.45)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 430, boxSizing: 'border-box', background: '#fff', color: INK, borderRadius: '18px 18px 0 0', padding: '18px 16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <strong style={{ fontSize: 18, lineHeight: '24px' }}>{sheet === 'delete' ? 'Delete all games, clips and your child’s details? This cannot be undone.' : 'Unused credits are refunded when you close your account.'}</strong>
        <div style={{ display: 'flex', gap: 10 }}><button onClick={() => setSheet(null)} style={btn(false)}>Keep it</button><button onClick={() => { const b = f.balance, was = sheet; setSheet(null); setFamily(freshFamily()); setView('FAM1-Welcome'); say(was === 'delete' ? 'Everything is deleted.' : `Account closed. ${b} unused credits are refunded.`) }} style={btn(true)}>{sheet === 'delete' ? 'Delete everything' : 'Close my account'}</button></div>
      </div>
    </div>}
  </>
  const avatar = <button aria-label="Your account" onClick={() => side('FAM19-Account')} style={{ ...round, border: 0, background: '#cbbeb5', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>DB</button>
  const arrow = (to: () => void, color = '#fff') => <button aria-label="Back" onClick={to} style={{ ...round, border: 0, background: 'transparent', color, marginLeft: -10, cursor: 'pointer' }}><I d={BACK} w={2.4} /></button>
  const head = (over: string, title: string, to?: string | (() => void)) => (
    <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
      {to && arrow(typeof to === 'string' ? () => go(to) : to)}
      <span style={{ flexGrow: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 13, color: MINT }}>{over}</span><strong style={{ fontSize: 22, lineHeight: '27px', letterSpacing: '-0.01em' }}>{title}</strong></span>{avatar}
    </div>)
  const tabs = (on: string) => (
    <nav aria-label="Family" style={{ flex: 'none', position: 'sticky', bottom: 0, display: 'flex', background: '#fff', borderTop: `1px solid ${LINE}`, padding: '4px 0 8px' }}>
      {TABS.map(([t, d, k, to]) => <button key={t} aria-current={on === k ? 'page' : undefined} onClick={() => go(to)} style={{ flex: 1, minHeight: 52, border: 0, background: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, color: on === k ? G : INK, fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}><I d={d} />{t}</button>)}
    </nav>)
  const actions = (tabbed: boolean, ...b: ReactNode[]) => <div style={{ flex: 'none', position: 'sticky', bottom: tabbed ? 65 : 0, display: 'flex', gap: 10, padding: '10px 14px', background: PAGE, borderTop: `1px solid ${LINE}` }}>{b}</div>
  const shell = (id: string, bar: ReactNode, body: ReactNode, tab: string | null, foot?: ReactNode) => (
    <div data-screen={id} style={phone}>{bar}<div style={{ flexGrow: 1, padding: '12px 14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>{body}</div>{foot}{tab && tabs(tab)}{overlays}</div>)
  /** The first run's screens: one thing said, one main button, no bar and no tabs. */
  const plain = (id: string, dark: boolean, bar: ReactNode, body: ReactNode, foot: ReactNode, bg?: string) => (
    <div data-screen={id} style={{ ...phone, background: bg ?? (dark ? NIGHT : PAGE), color: dark ? '#fff' : INK }}>
      <div style={{ flex: 'none', minHeight: 44, padding: '14px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{bar}</div>
      <div style={{ flexGrow: 1, padding: '0 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>{body}</div>
      <div style={{ flex: 'none', padding: '12px 22px 26px', display: 'flex', flexDirection: 'column', gap: 6 }}>{foot}</div>{overlays}
    </div>)
  const title = (t: ReactNode, size = 32): ReactNode => <h1 style={{ margin: 0, fontSize: size, lineHeight: `${size + 5}px`, letterSpacing: '-0.03em', fontWeight: 700 }}>{t}</h1>
  const switcher = (
    <div style={{ display: 'flex', gap: 6 }}><div role="radiogroup" aria-label="Child" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{f.kids.map(x => <button key={x.id} role="radio" aria-checked={x.id === kid.id} onClick={() => pickKid(x.id)} style={chip(x.id === kid.id)}>{x.name}</button>)}</div>
      <button aria-label="Add or change a child" onClick={() => side('FAM15-Children')} style={{ ...chip(false), padding: 0 }}><I d={PLUS} size={18} /></button></div>)
  const clipRow = (cl: Clip, n: number, on: () => void, first = false) => <button key={n} onClick={on} style={{ ...row, minHeight: 64, borderTop: first ? 0 : `1px solid ${HAIR}` }}><span style={{ flex: 'none', width: 92 }}><Thumb kind="team" len={cl.len} wide /></span><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '19px' }}>{cl.title}</strong><span style={{ fontSize: 13, color: MUT }}>{cl.minute}</span></span></button>
  const nothing = { heading: '', at: '', task: '', button: '', done: false, onAdd: () => {} }
  const reel = (v: Video, label: string) => <LearnPlayer key={v.id} phone noTry ratio="362 / 200" chips={[label]} captions={captions} onCaptions={setCaptions} say={say}
    chapters={[{ key: 'reel', frame: 'team', label: 'Reel', short: 'Reel', secs: secsOf(reelOf(v.clips)), lines: ['Other players are blurred'] }, { key: 'best', frame: 'team', label: 'Best', short: 'Best', secs: secsOf(v.clips[0].len), lines: [v.clips[0].title] }]} tryCard={nothing} />
  const packs = <div role="radiogroup" aria-label="Packs" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{PACKS.map((k, n) => <button key={k.credits} role="radio" aria-checked={f.pack === n} onClick={() => { setFamily({ pack: n }); say(`${k.credits} credits picked.`) }} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 64, border: f.pack === n ? `2.5px solid ${INK}` : `1px solid ${LINE}`, background: f.pack === n ? TINTS[0] : '#fff', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
    <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>{k.credits} credits</strong><span style={{ fontSize: 13, color: MUT }}>{worth(k.credits)}{k.extra ? ` · ${k.extra} extra` : ''}</span></span><strong style={{ fontSize: 18 }}>${k.price}</strong></button>)}</div>
  const buy = (credits: number, line: string) => { setFamily(s => ({ balance: s.balance + credits, offered: true })); say(line) }
  /** "Add a video" and the credits, pinned above the tabs on Home so they are in reach on any phone without scrolling. */
  const addRow = (label = 'Add a video') => <div style={{ flex: 1, display: 'flex', gap: 8 }}><button onClick={() => go('FAM5-Check')} style={{ ...btn(true), flex: 2, minHeight: 54, fontSize: 17 }}>{label}</button>
    <button onClick={() => side('FAM6-Credits')} style={{ ...card, flex: 1.1, gap: 0, padding: '8px 10px', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', color: INK, cursor: 'pointer' }}><strong style={{ fontSize: 15 }}>{f.balance} credits</strong><span style={{ fontSize: 12, color: MUT }}>{games}</span></button></div>
  const tiles = (t: [string, string][]) => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 8 }}>{t.map(([v, w], n) => <span key={w} style={{ ...card, background: TINTS[n % TINTS.length], padding: '8px 12px', gap: 0 }}><strong style={{ fontSize: 24, lineHeight: '30px' }}>{v}</strong><span style={{ fontSize: 13, color: MUT }}>{w}</span></span>)}</div>
  const latestCard = (v: Video) => <button onClick={() => openVideo(v)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 16, border: 0, background: NIGHT, color: '#fff', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
    <span style={{ flex: 'none', width: 126, position: 'relative' }}><Thumb kind="team" len="" wide /><span style={{ position: 'absolute', left: '50%', top: '50%', width: 32, height: 32, margin: -16, borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={PLAY} size={14} /></span></span>
    <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><span style={{ ...cap, color: AMBER }}>LATEST REEL</span><strong style={{ fontSize: 17, lineHeight: '21px' }}>{named(v, name)} · {v.clips.length} moments</strong><span style={{ fontSize: 14, color: MINT }}>{v.date} · {reelOf(v.clips)}</span></span></button>
  const estimate = <span style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, border: `1px dashed ${INK}`, fontSize: 13, fontWeight: 700 }}><svg width="12" height="12" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M12 3a9 9 0 010 18z" fill="currentColor" /></svg>Estimate</span>
  const seg = (on: 'reel' | 'stats') => <div role="radiogroup" aria-label="Reel or stats" style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 14, background: '#e3e7e4' }}>{([['reel', 'Reel', VIDEO, 'FAM8-Results'], ['stats', 'Stats', BARS, 'FAM20-GameStats']] as [string, string, string, string][]).map(([k, t, d, to]) => <button key={k} role="radio" aria-checked={on === k} onClick={() => go(to)} style={{ flex: 1, minHeight: 44, borderRadius: 10, border: 0, background: on === k ? '#fff' : 'transparent', color: INK, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><I d={d} size={16} />{t}</button>)}</div>
  /** What needs the club: one per screen, below what the parent already has. A dashed grey card, a greyed preview and the dark pill. It opens the tour. */
  const canLock = !f.joined && !!f.club
  const withClub = <span style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, minHeight: 26, padding: '0 10px', borderRadius: 999, background: MAUVE, color: INK, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}><I d={LOCK} size={11} />With your club</span>
  const tour = () => { setView('FAMk1-ClubTour'); top() }
  const locked = (t: string, line: string, preview?: ReactNode) => canLock && <button onClick={tour} style={{ borderRadius: 16, border: `2px dashed ${ROSELINE}`, background: ROSE, padding: '12px 14px', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: preview ? 'column' : 'row', alignItems: preview ? 'stretch' : 'center', gap: 8 }}>
    {preview ? <><span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}><strong style={{ fontSize: 16 }}>{t}</strong>{withClub}</span><span aria-hidden style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{preview}</span><span style={{ fontSize: 14, lineHeight: '20px' }}>{line}</span></>
      : <><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{t}</strong><span style={{ fontSize: 13, lineHeight: '18px' }}>{line}</span></span>{withClub}</>}</button>
  const greyBars = (label: string) => <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}><strong style={{ width: 150, fontSize: 13, color: GREY }}>{label}</strong><span style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 34 }}>{[18, 25, 22, 28, 34].map((h, n) => <span key={n} style={{ width: 13, height: h, borderRadius: 3, background: n === 4 ? '#b3b6b4' : '#dcdedd' }} />)}</span></span>
  const season = (line: string) => locked(`${name}’s whole season`, line, <>{greyBars('On the ball, every game')}{greyBars('Minutes played')}</>)
  const tell = (on: boolean | 'club') => <button onClick={() => { setFamily(x => ({ seasonDue: null, seasonTold: [...new Set([...x.seasonTold, kid.id])] })); setView('FAM12-TellClub'); top() }} style={big(on)}>Tell my club{count && <span style={{ fontSize: 13, fontWeight: 500 }}>{families} families at {club} already use this</span>}</button>
  const demo = (label: string, body: ReactNode) => <section aria-label={`Demo: ${label}`} style={{ borderRadius: 14, border: `1px dashed ${MUT}`, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>DEMO · {label.toUpperCase()}</span>{body}</section>
  const group = (rows: [string, string, string, () => void][]) => <section style={{ ...card, gap: 0, padding: '2px 14px' }}>{rows.map(([a, b, v, on], n) => <button key={a} onClick={on} style={{ ...row, borderTop: n ? `1px solid ${HAIR}` : 0 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{a}</strong>{b && <span style={{ fontSize: 14, color: MUT }}>{b}</span>}</span>{v && <span style={{ fontSize: 15, color: MUT }}>{v}</span>}<I d={CHEV} size={16} /></button>)}</section>

  let v = HOMES.includes(view) ? homeOf(f) : view
  if (v === 'FAM7-Working' && !working) v = homeOf(f)
  if (['FAM8-Results', 'FAM20-GameStats', 'FAM21-StatClips', 'FAM9-Clip', 'FAM9a-AddMoment', 'FAM8x-TooFew', 'FAM10-ShareFamily', 'FAM8r-Reveal'].includes(v) && !video?.clips.length) v = homeOf(f)
  if ((v === 'FAM20-GameStats' || v === 'FAM21-StatClips') && !video?.stats) v = 'FAM8-Results'

  // ── FAM3m and FAM8b · retired boards ──
  if (RETIRED[v]) return shell(v, head('Clean Sheet Family', 'Retired screen'), <>
    <section style={{ borderRadius: 16, background: DEEP, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ ...cap, color: SOFT }}>RETIRED 23 NOVEMBER</span><strong style={{ fontSize: 19, lineHeight: '25px' }}>This screen is no longer part of the app.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: MINT }}>{RETIRED[v][1]}</span></section>
    <section style={{ ...card, gap: 0, padding: '2px 14px' }}><button onClick={() => go(RETIRED[v][0])} style={row}><strong style={{ flexGrow: 1, fontSize: 16 }}>Open the screen that replaces it</strong><I d={CHEV} size={16} /></button></section>
  </>, 'home')

  // ── FAM1 · splash: what the tool is, first. Then what comes back from one video ──
  // Sample figures on a sign-up screen, not a child's: dark ink on pale green, never amber. Only the sample-reel link is a control.
  if (v === 'FAM1-Welcome') return <div data-screen="FAM1-Welcome" style={{ ...phone, background: NIGHT, color: '#fff', overflow: 'hidden' }}>{BACKDROP}
    <div style={{ position: 'relative', flexGrow: 1, boxSizing: 'border-box', padding: short ? '16px 22px 14px' : '22px 22px 26px', display: 'flex', flexDirection: 'column' }}>
      <Mark />
      <h1 style={{ flex: 'none', margin: short ? '14px 0 0' : '22px 0 0', fontSize: short ? 26 : 31, lineHeight: short ? '30px' : '35px', letterSpacing: '-0.03em', fontWeight: 700 }}>Film the game on a phone or camera. Get your child’s best highlights and stats.</h1>
      <p style={{ flex: 'none', margin: short ? '8px 0 0' : '10px 0 0', fontSize: short ? 14.5 : 15.5, lineHeight: short ? '20px' : '22px', color: '#dfe7e3' }}>Upload it and, in about 20 minutes, we find their moments, count the numbers and blur everyone else.</p>
      <div style={{ flex: 'none', marginTop: short ? 12 : 18, borderRadius: 20, background: '#fff', color: INK, padding: '12px 14px 4px', display: 'flex', flexDirection: 'column', boxShadow: '0 14px 34px rgba(0,0,0,0.35)' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT, paddingBottom: 8 }}>WHAT COMES BACK FROM ONE VIDEO</span>
        <div style={{ display: 'flex', gap: 8 }}>{[['41', 'times on the ball'], ['27', 'passes to a team-mate'], SHOW_XG ? ['0.9', 'xG from 3 shots'] : ['3', 'shots, 1 goal']].map(([n, w]) => <span key={w} style={{ flex: 1, minWidth: 0, borderRadius: 12, background: PALE, padding: '8px 10px 9px', display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 28, lineHeight: '32px', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{n}</strong><span style={{ fontSize: 12, lineHeight: '15px', color: '#2d3d3a' }}>{w}</span></span>)}</div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          {TOUR.slice(0, short ? 1 : 2).map(c => <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, borderBottom: `1px solid ${LINE}` }}><span style={{ flex: 'none', width: 76 }}><Thumb kind="team" len={c.len} wide /></span><span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: MUT }}>{c.minute.toUpperCase()}</span><strong style={{ fontSize: 14, lineHeight: '18px' }}>{c.title}</strong></span></div>)}
          <button onClick={() => say(SAMPLE)} style={{ ...link, minHeight: 44, display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left' }}><span style={{ flex: 'none', width: 28, height: 28, borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={PLAY} size={13} w={2.6} /></span>Watch the sample reel · 0:48</button></div></div>
      <span style={{ flex: 'none', marginTop: 10, fontSize: 12, lineHeight: '17px', color: '#c9d6d0' }}>Game numbers from a full game, marked as estimates. A camera that follows the play works too.</span>
      <span style={{ flexGrow: 1, minHeight: 12 }} />
      <button onClick={() => { setView('FAM0-SignUp'); top() }} style={big(true)}>Get started<span style={{ fontSize: 13, fontWeight: 500 }}>Your first video is free</span></button>
      <button onClick={() => { say('Sign-in opens.'); if (f.freeUsed) setTimeout(() => { setFamily({ signedIn: true }); go('FAM3-Home') }, 1200) }} style={{ ...under, minHeight: 48, color: '#fff', fontSize: 15, alignSelf: 'center' }}>I have an account</button>
    </div>{overlays}</div>

  // ── FAM0 · sign up ──
  if (v === 'FAM0-SignUp') { const on = () => { setFamily({ signedIn: true }); setView('FAMt1-Tour'); top() }
    return plain('FAM0-SignUp', false, arrow(() => { setView('FAM1-Welcome'); top() }, INK), <>
      {title('One tap and you’re in.', 30)}<span style={{ fontSize: 16, color: MUT, paddingBottom: 8 }}>Your first video is free. No card needed.</span>
      {['Continue with Apple', 'Continue with Google', 'Use my email'].map(t => <button key={t} onClick={on} style={{ ...btn(false), flex: 'none', minHeight: 58, borderRadius: 16, border: `1.5px solid ${INK}` }}>{t}</button>)}
    </>, <><span style={note}>By continuing you confirm you are 18 or over and the parent or guardian of any child you add.</span><span style={{ ...note, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><button onClick={() => say('The terms open.')} style={{ ...link, fontSize: 13 }}>Terms</button>·<button onClick={() => side('FAM16-Privacy')} style={{ ...under, fontSize: 13 }}>How we handle your film</button></span></>) }

  // ── FAMt1 to FAMt4 · the tour. The fourth panel (Booker, 20 Nov) says what a club joining would add ──
  if (/^FAMt\d/.test(v)) { const n = Number(v[4]), end = () => { setView('FAM3e-HomeEmpty'); top() }
    const [h, t] = [['Film from the sideline.', 'A game, training or the park. Your phone held sideways, or a camera that follows the play. Only film where you’re allowed to.'], ['Tap your child once.', 'We follow their shirt through the whole video. We never use face recognition.'], ['Get the reel and the numbers.', 'A reel and game stats in about 20 minutes. Everyone else is blurred, and only your family can watch.'], ['Better still with your club.', 'It works with any club today. If yours joins Clean Sheet, you get more, and we tell you when it does.']][n - 1]
    return plain(v, true, <><Mark /><button onClick={end} style={{ ...under, color: '#fff', fontSize: 15 }}>Skip</button></>, <>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
        {n === 1 && <div style={{ position: 'relative', borderRadius: 26, border: '5px solid #fff', overflow: 'hidden', transform: 'rotate(-4deg)', boxShadow: '0 14px 30px rgba(0,0,0,0.4)' }}><Thumb kind="figure" len="" wide /><span style={{ position: 'absolute', left: 12, top: 12, padding: '4px 10px', borderRadius: 999, background: NIGHT, color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: '#fff' }} />REC 23:10</span></div>}
        {n === 2 && <Pitch picked="7" tag={`That’s ${name}`} h={250} />}
        {n === 3 && TOUR.map((c, k) => <Moment key={c.title} c={c} turn={[-3, 2, -2, 2][k]} left={[8, 46, 18, 52][k]} />)}
        {n === 4 && <div style={{ borderRadius: 18, background: '#fff', color: INK, padding: '6px 16px', display: 'flex', flexDirection: 'column', boxShadow: '0 14px 30px rgba(0,0,0,0.4)' }}><Line top={false} a="Club games are free" b="Filmed by the club. Nothing for you to film, no credits" /><Line a="Every game, filmed for you" b="Nothing to set up or upload" /><Line a="Your own filming at half the credits" b="For what the club doesn’t film" /><Line a="The coach is part of it" b="A goal for the season and a clip to try at home" /></div>}
      </div>
      {title(h)}<span style={{ fontSize: 17, lineHeight: '24px', color: MINT }}>{t}</span>
      <div aria-hidden style={{ display: 'flex', gap: 6, justifyContent: 'center', paddingTop: 8 }}>{[1, 2, 3, 4].map(k => <span key={k} style={{ width: k === n ? 22 : 7, height: 7, borderRadius: 999, background: k === n ? AMBER : 'rgba(255,255,255,0.4)' }} />)}</div>
    </>, n < 4 ? <button onClick={() => { setView(`FAMt${n + 1}-Tour`); top() }} style={big(true)}>Next</button> : <button onClick={end} style={big(true)}>Upload my first video<span style={{ fontSize: 13, fontWeight: 500 }}>Free</span></button>) }

  // ── FAM3e · one job: upload a video ──
  if (v === 'FAM3e-HomeEmpty') return plain('FAM3e-HomeEmpty', false, <><Mark />{avatar}</>, <>
    {title(`Hi ${f.parent}. Got some football on film?`, 30)}
    <button onClick={() => { setFamily({ film: 'f50', part: 0, both: false, anyway: false, held: null }); setUp(34); setExtra(null); go('FAM5-Check') }} style={{ minHeight: 300, marginTop: 6, borderRadius: 26, border: `2px dashed ${INK}`, background: TINTS[0], color: INK, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      <span style={{ width: 84, height: 84, borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}><I d={PLUS} size={34} w={2.4} /></span>
      <strong style={{ fontSize: 24, letterSpacing: '-0.02em' }}>{f.freeUsed ? 'Add a video' : 'Upload a video'}</strong><span style={{ fontSize: 15, color: MUT }}>From your phone or your camera</span>
      {!f.freeUsed && <span style={{ marginTop: 6, padding: '6px 14px', borderRadius: 999, background: AMBER, color: INK, fontSize: 14, fontWeight: 700 }}>Your first one is free</span>}</button>
    <span style={note}>Only film where you’re allowed to. Other children are blurred before anything is saved.</span>
  </>, <div style={{ display: 'flex', gap: 26, justifyContent: 'center' }}><button onClick={() => side('FAM4-BeforeYouFilm')} style={{ ...link, fontSize: 15 }}>Filming tips</button><button onClick={() => say(SAMPLE)} style={{ ...link, fontSize: 15 }}>Watch a sample reel</button></div>)

  // ── FAM2c · pick the club from the list ──
  if (v === 'FAM2c-PickClub') { const hits = CLUBS.filter(c => c.name.toLowerCase().includes(q.trim().toLowerCase())), done = () => { setView('FAM2-AddChild'); top() }
    return shell('FAM2c-PickClub', head('Who are we looking for?', `${name}’s club`, done), <>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, height: 54, padding: '0 6px 0 14px', borderRadius: 14, border: `2px solid ${INK}`, background: '#fff' }}><svg width="18" height="18" viewBox="0 0 24 24" {...svg}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
        <input aria-label="Search for a club" value={q} onChange={e => setQ(e.target.value)} style={{ flexGrow: 1, minWidth: 0, height: 44, border: 0, outline: 0, background: 'none', fontFamily: 'inherit', fontSize: 17, color: INK }} />
        <button aria-label="Clear" onClick={() => { setQ(''); say('Search cleared.') }} style={{ ...round, border: 0, background: 'none', color: MUT, cursor: 'pointer' }}><I d={CROSS} size={16} /></button></label>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><span style={{ ...cap, color: MUT, paddingBottom: 4 }}>CLUBS NEAR YOU FIRST</span>
        <div role="radiogroup" aria-label="Clubs" style={{ display: 'flex', flexDirection: 'column' }}>{hits.map(c => { const on = f.club?.name === c.name; return <button key={c.name} role="radio" aria-checked={on} onClick={() => { setFamily({ club: { name: c.name, place: c.place, uses: c.uses } }); done(); if (c.uses) say(`${c.name} already uses Clean Sheet, so its games are free for you. Ask the club for your invitation.`) }} style={{ ...row, borderTop: `1px solid ${HAIR}` }}>
          <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>{c.name}</strong><span style={{ fontSize: 14, color: MUT }}>{[c.place, c.far, c.sort, c.uses ? 'uses Clean Sheet' : ''].filter(Boolean).join(' · ')}</span></span>{on && <Dot />}</button> })}
          {!hits.length && <span style={{ fontSize: 14, color: MUT, padding: '12px 0', borderTop: `1px solid ${HAIR}` }}>No club by that name in the list.</span>}</div></section>
      <section style={{ ...card, gap: 0, padding: '2px 14px' }}>
        <button onClick={() => { setLost(lost ?? { name: q, place: '' }); say('Type the club’s name and suburb. We check it and add it to the list, usually within a day.') }} style={row}><strong style={{ flexGrow: 1, fontSize: 16 }}>I can’t find it</strong><I d={CHEV} size={16} /></button>
        {lost && <form onSubmit={e => { e.preventDefault(); if (!lost.name.trim() || !lost.place.trim()) { say('Add the club’s name and its suburb.'); return } setFamily({ club: { name: lost.name.trim(), place: lost.place.trim(), unmatched: true } }); setLost(null); done(); say(`${lost.name.trim()}: we will check it and add it to the list.`) }} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0 12px' }}>
          {(['name', 'place'] as const).map(key => <input key={key} aria-label={key === 'name' ? 'The club’s name' : 'Its suburb'} placeholder={key === 'name' ? 'The club’s name' : 'Its suburb'} value={lost[key]} onChange={e => setLost({ ...lost, [key]: e.target.value })} style={{ height: 46, padding: '0 12px', borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 16, color: INK }} />)}
          <button type="submit" style={{ ...btn(true), flex: 'none', minHeight: 46 }}>Send it to be checked</button></form>}
        <button onClick={() => { setFamily({ club: null }); done() }} style={{ ...row, borderTop: `1px solid ${HAIR}` }}><strong style={{ flexGrow: 1, fontSize: 16 }}>{name} isn’t at a club</strong><I d={CHEV} size={16} /></button></section>
      <span style={note}>Picking from the list means we can tell you when your club joins, and how many families there already use this. We never contact the club or tell it who you are.</span>
    </>, null) }

  // ── FAM2 · who are we looking for (and, from the account, another child) ──
  if (v === 'FAM2-AddChild') {
    const fm = film(f.film), field = (l: string, value: string, set: (x: string) => void, numeric = false) => <label style={{ flex: numeric ? 0.75 : 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontSize: 14 }}>{l}</strong><input value={value} inputMode={numeric ? 'numeric' : 'text'} onChange={e => set(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', height: 50, padding: '0 12px', borderRadius: 10, border: `1px solid ${MUT}`, background: '#fff', fontFamily: 'inherit', fontSize: 17, color: INK }} /></label>
    const edit = (p: Partial<typeof kid>) => setFamily(s => ({ kids: s.kids.map(x => x.id === kid.id ? { ...x, ...p } : x) }))
    const nm = extra ? extra.name : kid.name, yr = extra ? Number(extra.year) : kid.year, ok = nm.trim().length > 0 && yr >= SEASON_MIN && yr <= SEASON_MAX, call = nm.trim() || 'your child'
    const form = <section style={{ ...card, gap: 10 }}>
      <div style={{ display: 'flex', gap: 10 }}>{field('First name', nm, x => extra ? setExtra({ ...extra, name: x.split(' ')[0] }) : edit({ name: x.split(' ')[0] }))}{field('Year born', extra ? extra.year : String(kid.year || ''), x => { const y = x.replace(/\D/g, '').slice(0, 4); if (extra) setExtra({ ...extra, year: y }); else edit({ year: Number(y) }) }, true)}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontSize: 14 }}>Their club</strong>
        <button onClick={() => { setView('FAM2c-PickClub'); top() }} style={{ ...row, minHeight: 64, padding: '8px 12px', boxSizing: 'border-box', borderRadius: 12, border: `1px solid ${MUT}` }}>{f.club && <Dot />}<span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>{f.club?.name ?? `${call} isn’t at a club`}</strong>{f.club && <span style={{ fontSize: 13, color: MUT }}>{f.club.place}{f.club.unmatched ? ' · being checked' : ''}</span>}</span><span style={{ ...link, minHeight: 0 }}>Change</span></button>
        <span style={{ fontSize: 13, color: MUT }}>Picked from the list of clubs. We never contact the club</span></div></section>
    const about = <span style={note}>First name, birth year and club are all we keep about {call}. You get clips and game stats, whatever their age.</span>
    const missing = () => say('Add a first name and the year they were born.')
    if (extra) return shell('FAM2-AddChild', head('Your children', 'Add a child', () => { setExtra(null); setView('FAM15-Children'); top() }), <>{form}{about}</>, null,
      actions(false, <button key="a" onClick={() => { if (!ok) { missing(); return } const id = `k${f.kids.length}${nm.trim().toLowerCase()}`; setFamily(s => ({ kids: [...s.kids, { id, name: nm.trim(), year: yr, he: true, colour: '', number: '' }] })); setExtra(null); setView('FAM15-Children'); top(); say(`${nm.trim()} is added.`) }} style={btn(true)}>Add {call}</button>))
    return shell('FAM2-AddChild', head(`Sunday · ${fm.minutes} minutes`, 'Who are we looking for?', 'FAM3e-HomeEmpty'), <>
      <div role="status" aria-label="Upload" style={{ borderRadius: 12, background: PALE, padding: '8px 12px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><strong>{up < 100 ? `Uploading · ${up}%` : 'Uploaded'}</strong><span>Carries on if you leave</span></span><span style={{ height: 5, borderRadius: 999, background: '#d5e2dc', overflow: 'hidden' }}><span style={{ display: 'block', width: `${up}%`, height: '100%', background: G }} /></span></div>
      <Pitch picked={kid.number} onPick={n => { edit({ number: n, colour: 'red' }); say(`Red ${n} picked. We follow that shirt for the whole video.`) }} label={<span style={pill}>Tap your child{kid.number ? ` · ${kid.colour || 'red'} ${kid.number} picked` : ''}</span>} />
      {form}{about}
    </>, null, actions(false, <button key="a" onClick={() => { if (!ok) { missing(); return } if (!kid.number) { say('Tap your child in the picture first.'); return } setView('FAM5f-CheckFree'); top() }} style={btn(true)}>Find {call}’s moments</button>))
  }

  // ── FAM5f · the first video: the check passes and it is free ──
  if (v === 'FAM5f-CheckFree') { const fm = film(f.film)
    return plain('FAM5f-CheckFree', false, arrow(() => { setView('FAM2-AddChild'); top() }, INK), <>
      <span style={{ width: 64, height: 64, borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={TICK} size={28} w={2.6} /></span>
      {title('We can read this one.', 30)}<span style={{ fontSize: 17, lineHeight: '25px' }}>We can follow the play for {fm.readable} of {fm.minutes} minutes, and {name} is in shot for about {fm.inShot}. Enough for about {fm.moments} moments.</span>
      <section style={{ ...card, flexDirection: 'row', alignItems: 'center', marginTop: 6 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>Your first video</strong><span style={{ fontSize: 13, color: MUT }}>Usually {priceOf(fm, false)} credits</span></span><strong style={{ fontSize: 22, padding: '2px 14px', borderRadius: 999, background: AMBER }}>Free</strong></section>
    </>, <button onClick={() => { spend(fm.id, 0, true); setView('FAM7-Working'); top() }} style={big(false)}>Find {name}’s moments<span style={{ fontSize: 13, fontWeight: 500 }}>About 20 minutes</span></button>) }

  // ── FAM7 · working on it ──
  if (v === 'FAM7-Working' && working) { const fm = film(working.film ?? 'f50'), n = Math.min(6, tick.id === working.id ? tick.n : begun), found = Math.min(fm.found, n), left = [20, 16, 12, 8, 4, 1, 1][n], R = 92, C = 2 * Math.PI * R
    return plain('FAM7-Working', true, <Mark />, <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 210, height: 210 }}><svg width="210" height="210" viewBox="0 0 210 210" aria-hidden><circle cx="105" cy="105" r={R} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="10" /><circle cx="105" cy="105" r={R} fill="none" stroke={AMBER} strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - Math.max(0.04, n / 6))} transform="rotate(-90 105 105)" style={{ transition: 'stroke-dashoffset 0.9s linear' }} /></svg>
        <span style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><strong style={{ fontSize: 54, lineHeight: '58px' }}>{found}</strong><span style={{ fontSize: 15 }}>{found === 1 ? 'moment' : 'moments'} so far</span></span></div>
      <h1 style={{ margin: 0, fontSize: 28, letterSpacing: '-0.02em' }}>Finding {name}’s moments.</h1>
      <span role="status" style={{ fontSize: 17, lineHeight: '24px', color: MINT }}>About {left} {left === 1 ? 'minute' : 'minutes'} to go. Close the app if you like; we’ll let you know.</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 104px))', gap: 8, minHeight: 60 }}>{(fm.short ? [KINDS.turn, KINDS.look] : TOUR).slice(0, Math.min(found, 3)).map((c, k) => <Thumb key={k} kind="team" len={c.len} wide />)}</div>
    </div>, <><span style={{ ...note, color: MINT }}>Everyone except {name} was blurred before anything was saved.</span>
      <button aria-pressed={f.notify} onClick={() => { setFamily({ notify: true }); say('Your phone asks to allow notifications. We send one when the reel is ready, and nothing else.') }} style={{ ...big(false), background: 'transparent', border: '1.5px solid #fff' }}>Tell me when it’s ready</button></>) }

  // ── FAM8r · the reel is ready ──
  if (v === 'FAM8r-Reveal' && video) return plain('FAM8r-Reveal', true, <Mark />, <>
    <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><button aria-label="Play the reel" onClick={() => go('FAM8-Results')} style={{ width: 108, height: 108, borderRadius: 999, border: 0, background: AMBER, color: INK, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 44px rgba(255,255,255,0.07), 0 0 0 46px rgba(255,255,255,0.32), 0 12px 30px rgba(0,0,0,0.35)' }}><I d={PLAY} size={38} w={2.4} /></button></div>
    <span style={{ ...cap, fontSize: 13 }}>{`${video.day} · ${video.title}`.toUpperCase()}</span>{title(`${name}’s reel is ready.`, 38)}
    <span style={{ fontSize: 18, lineHeight: '25px', color: MINT }}>{video.clips.length} {video.clips.length === 1 ? 'moment' : 'moments'} · {secsOf(reelOf(video.clips))} seconds · everyone else blurred</span>
  </>, <><button onClick={() => go('FAM8-Results')} style={big(true)}>Watch it</button><button onClick={() => side('FAM10-ShareFamily')} style={{ ...under, color: '#fff', fontSize: 15, alignSelf: 'center' }}>Share with family</button></>,
    `linear-gradient(180deg, ${G} 0%, #2b5a4b 55%, ${NIGHT} 100%)`)

  // ── FAM6f · after the free one ──
  if (v === 'FAM6f-AfterFree') { const p = PACKS[f.pack], home = () => { setFamily({ offered: true }); go('FAM3-Home') }
    return plain('FAM6f-AfterFree', false, <><span /><button onClick={home} style={{ ...under, fontSize: 15 }}>Not now</button></>, <>
      {title('That one was on us.', 30)}<span style={{ fontSize: 16, lineHeight: '24px', paddingBottom: 6 }}>After this, videos use credits by length. A full {RATES.usualMinutes}-minute game is {quote(RATES.usualMinutes)}, a short clip far less. You always see the number first.</span>
      {packs}<span style={note}>Credits come back if we can’t make a reel, and they don’t run out.</span>
    </>, <button onClick={() => { buy(p.credits, `Paid through your app store. ${p.credits} credits added.`); setTimeout(() => go('FAM3-Home'), 1400) }} style={big(false)}>Get {p.credits} credits · ${p.price}</button>) }

  // ── FAMk1 to FAMk3 · what the club adds ──
  if (/^FAMk\d/.test(v)) { const n = Number(v[4]), close = () => go('FAM11-Locked')
    const [h, t] = [['Every game, filmed for you.', 'The club films every round, home and away. Nothing to set up, nothing to upload, and no credits.'], ['A season, not one game.', 'Your videos each stand alone. With every game filmed the same way, progress can be followed round by round.'], ['And the coach is part of it.', 'A goal for the season, what training is working on, and a clip to try at home, straight from the coach.']][n - 1]
    return plain(v, true, <><span style={{ ...cap, fontSize: 13 }}>WITH YOUR CLUB</span><button onClick={close} style={{ ...under, color: '#fff', fontSize: 15 }}>Close</button></>, <>
      <div aria-hidden={n < 3} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
        {n === 1 && <><div style={{ borderRadius: 16, border: '2px dashed rgba(255,255,255,0.6)', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex', gap: 6 }}>{Array.from({ length: 12 }, (_, k) => <span key={k} style={{ flex: 1, maxWidth: 18, aspectRatio: '1', borderRadius: 999, boxSizing: 'border-box', background: k < 3 ? '#fff' : 'transparent', border: '2px solid #fff' }} />)}</span><span style={{ fontSize: 14 }}>You: the 3 rounds you could film</span></div>
          <div style={{ borderRadius: 16, background: '#fff', color: INK, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex', gap: 6 }}>{Array.from({ length: 12 }, (_, k) => <span key={k} style={{ flex: 1, maxWidth: 18, aspectRatio: '1', borderRadius: 999, background: G }} />)}</span><strong style={{ fontSize: 14 }}>The club: all 12 rounds, home and away</strong></div></>}
        {n === 2 && <><div style={{ borderRadius: 16, border: `2px dashed ${MAUVE}`, padding: 14, display: 'flex', alignItems: 'flex-end', gap: 12 }}><span style={{ width: 26, height: 44, borderRadius: 5, background: '#fff' }} /><span style={{ fontSize: 14 }}>Now: one video at a time</span></div>
          <div style={{ borderRadius: 16, background: '#fff', color: INK, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}><span style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 92 }}>{[34, 42, 38, 50, 47, 58, 62, 60, 72, 78, 74, 90].map((x, k) => <span key={k} style={{ flex: 1, height: x, borderRadius: 4, background: G }} />)}</span><strong style={{ fontSize: 14 }}>With the club: 12 rounds, side by side</strong></div></>}
        {n === 3 && <div style={{ borderRadius: 18, background: '#fff', color: INK, padding: 16, display: 'flex', flexDirection: 'column', gap: 8, transform: 'rotate(-2deg)', boxShadow: '0 14px 30px rgba(0,0,0,0.4)' }}><span style={{ ...cap, color: MUT }}>FROM LUKE, {name.toUpperCase()}’S COACH</span><strong style={{ fontSize: 19, lineHeight: '24px' }}>This season: look up before the ball comes.</strong><span style={{ fontSize: 15, lineHeight: '21px' }}>{kid.he ? 'He' : 'She'} did it four times on Sunday. Here is a game to play at home this week.</span><span style={{ display: 'grid', gridTemplateColumns: '112px 112px', gap: 8 }}><Thumb kind="drawn" len="2:00" wide /><Thumb kind="team" len="0:09" wide /></span></div>}
      </div>
      {title(h)}<span style={{ fontSize: 17, lineHeight: '24px', color: '#eadcdc' }}>{t}</span>
      <div aria-hidden style={{ display: 'flex', gap: 6, justifyContent: 'center', paddingTop: 8 }}>{[1, 2, 3].map(k => <span key={k} style={{ width: k === n ? 22 : 7, height: 7, borderRadius: 999, background: k === n ? MAUVE : 'rgba(255,255,255,0.4)' }} />)}</div>
    </>, n < 3 ? <button onClick={() => { setView(`FAMk${n + 1}-ClubTour`); top() }} style={big('club')}>Next</button> : tell('club'), PLUM) }

  // ── FAM22 · three games in: why a season view needs the club. Once for each child ──
  if (v === 'FAM22-ThreeGames') { const told = () => setFamily(x => ({ seasonDue: null, seasonTold: [...new Set([...x.seasonTold, kid.id])] }))
    return plain('FAM22-ThreeGames', false, <><span /><button onClick={() => { told(); go('FAM3-Home') }} style={{ ...under, fontSize: 15 }}>Not now</button></>, <>
      <span style={{ ...cap, fontSize: 12, color: MUT }}>THREE GAMES IN</span>{title(`You’ve filmed three of ${name}’s games. That’s nearly a season view.`, 30)}
      <span style={{ fontSize: 16, lineHeight: '24px' }}>We can’t line them up fairly: each was filmed differently and caught a different part of the game. With every round filmed the same way, the club can.</span>
      {season('Every round, filmed the same way.')}
    </>, <>{tell(false)}<button onClick={() => { told(); tour() }} style={{ ...link, fontSize: 15, alignSelf: 'center' }}>See what the club adds</button></>) }

  // ── FAM4 · before you film ──
  if (v === 'FAM4-BeforeYouFilm') return shell('FAM4-BeforeYouFilm', head('Filming tips', 'Before you film', back), <>
    <section style={bold}><strong style={{ fontSize: 16 }}>Check you are allowed to</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>Many clubs and grounds have rules about filming children. If someone asks you to stop, stop.</span></section>
    <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>For film we can read</strong>
      <Line a="Phone sideways, near halfway" b="As high as you safely can" /><Line a="Keep it still" b="Lean on a fence or use a small stand" /><Line a="Film the play, not just your child" b="We find them for you" /><Line a="One long take per half" b="Don’t stop and start" /></section>
    <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>A camera that follows the play</strong>
      <Line a="Set it at halfway, as high as it goes" b="It follows the ball, so your child is not always in shot" /><Line a="Send the whole recording" b="Not the highlights the camera made" /></section>
    <section style={{ borderRadius: 14, background: PALE, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 14 }}>Other people’s children</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>They will be in your film. We blur everyone except your child before anything is saved, and we never try to work out who they are.</span><button onClick={() => { setView('FAM16-Privacy'); top() }} style={{ ...under, alignSelf: 'flex-start' }}>How we handle your film</button></section>
  </>, null, actions(false, <button key="a" onClick={back} style={btn(true)}>Got it</button>))

  // ── FAM16 · how we handle your film ──
  if (v === 'FAM16-Privacy') return shell('FAM16-Privacy', head('Settings', 'How we handle your film', back), <>
    <section style={{ ...card, gap: 0, padding: '4px 14px' }}>
      <Line top={false} a="We blur everyone except your child" b="Before anything is saved. The unblurred film is deleted" /><Line a="We never work out who anyone is" b="No face recognition. We follow a shirt you point to" />
      <Line a="Only your family can watch" b="No public pages, no club access" /><Line a="We keep a first name, birth year and club" b="Nothing else about your child" />
      <Line a={`The blurred video is kept for ${CHECK.missedDays} days`} b="So you can add a moment we missed. After that, only your reels" /><Line a="Stored in Australia" /></section>
    {f.signedIn && <><button onClick={() => say('A copy of everything we hold is emailed to you within a day.')} style={{ ...btn(false), flex: 'none' }}>Get a copy of everything</button>
      <button onClick={() => { setSheet('delete'); say('Sheet opens: delete all games, clips and your child’s details? This cannot be undone.') }} style={{ ...btn(false), flex: 'none' }}>Delete everything</button>
      <button onClick={() => { setSheet('close'); say('Sheet opens: unused credits are refunded when you close your account.') }} style={{ ...btn(false), flex: 'none' }}>Close my account</button></>}
    <section style={{ borderRadius: 14, background: PALE, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 14 }}>Someone else’s child in your film?</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>Their parent can ask us to remove any clip. We do it the same day.</span></section>
  </>, f.signedIn && f.offered ? 'home' : null)

  // ── FAM6 · credits ──
  if (v === 'FAM6-Credits') { const p = PACKS[f.pack], rows: [string, string][] = [[`A ${RATES.usualMinutes}-minute game`, `${quote(RATES.usualMinutes)} credits`], ['Ten minutes at training or the park', `${quote(RATES.shortMinutes)} credits`], ['A second child in the same film', `+${RATES.secondChild} credits`], ['The check, and “look again”', 'Free']]
    return shell('FAM6-Credits', head(`You have ${f.balance}`, 'Credits', f.held ? () => { setView(checkOf(familyNow())); top() } : back), <>
      {packs}
      <section style={{ ...card, gap: 0, padding: '12px 14px 8px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What a video uses</strong>
        {rows.map(([a, b]) => <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '8px 0', borderTop: `1px solid ${HAIR}`, fontSize: 14 }}><span>{a}</span><strong style={{ flex: 'none' }}>{b}</strong></div>)}
        <span style={{ fontSize: 13, lineHeight: '19px', color: MUT, paddingTop: 6, borderTop: `1px solid ${HAIR}` }}>Longer video uses more. You see the number before you spend, and it never changes after.</span></section>
      <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>{f.joined ? `${club} has joined: games the club films are free, and your own filming uses half the credits.` : f.club ? `If ${club} joins: games the club films are free, and your own filming uses half the credits.` : ''} Credits come back if we can’t make a reel. They don’t run out.</span>
    </>, 'home', actions(true, <button key="b" onClick={() => { buy(p.credits, `Paid through your app store. ${p.credits} credits added.`); if (f.held) setTimeout(() => { setView(checkOf(familyNow())); top() }, 1400) }} style={btn(true)}>Buy {p.credits} for ${p.price}</button>)) }

  // ── FAM5p · checked on the phone, before anything is uploaded ──
  if (v === 'FAM5p-PhoneCheck') { const fm = film(f.film)
    return plain('FAM5p-PhoneCheck', false, arrow(() => go('FAM3-Home'), INK), <>
      <span style={{ ...cap, fontSize: 12, color: MUT }}>BEFORE YOU UPLOAD</span>{title('This one probably won’t work.', 30)}
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}>{(fm.phone ?? []).map(([a, b, ok], n) => <Line key={a} top={n > 0} ok={ok} a={a} b={b || undefined} />)}</section>
      <span style={{ fontSize: 15, lineHeight: '22px', color: MUT }}>Checked on your phone. Nothing has been sent, and no credits or free checks were used.</span>
    </>, <><button onClick={() => { say('Your phone’s video picker opens.'); setTimeout(() => pickFilm('f50'), 1300) }} style={big(false)}>Pick another video</button><button onClick={() => { setFamily({ anyway: true }); setView(checkOf(familyNow())); top() }} style={{ ...link, fontSize: 15, alignSelf: 'center' }}>Upload this one anyway</button></>) }

  // ── FAM5, FAM5b, FAM5x, FAM5n, FAM5c · the free check ──
  if (['FAM5-Check', 'FAM5b-Maybe', 'FAM5x-CantRead', 'FAM5n-NotEnough', 'FAM5c-ClubFilmedThis'].includes(v)) {
    const fm = film(f.film), price = f.held?.film === fm.id ? f.held.credits : priceOf(fm, f.joined, f.both, f.part), whole = quote(fm.minutes, f.both ? 2 : 1, f.joined), mins = f.part || fm.minutes
    const other = f.kids.find(x => x.id !== kid.id)
    const how = howOf(fm.id), shownLen = len ?? fm.minutes, setFilm = (h: typeof how, m: number) => { setLen(null); setFamily({ film: filmId(h, m), part: 0, both: false, anyway: false, held: null }); setView(checkOf(familyNow())) }
    const pick = demo('the sample video', <>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><strong>How long it is</strong><strong>{shownLen} {shownLen === 1 ? 'minute' : 'minutes'} · {quote(shownLen, f.both ? 2 : 1, f.joined)} credits in full</strong></span>
        <input type="range" aria-label="How long the video is, in minutes" min={1} max={MAX_MINUTES} step={1} value={shownLen} onChange={e => setLen(Number(e.target.value))} onPointerUp={() => len !== null && setFilm(how, len)} onKeyUp={() => len !== null && setFilm(how, len)} onBlur={() => len !== null && setFilm(how, len)} style={{ width: '100%', height: 44, accentColor: G }} /></label>
      <strong style={{ fontSize: 14 }}>How it was filmed</strong>
      <div role="radiogroup" aria-label="How it was filmed" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{HOWS.filter(x => f.joined || x[0] !== 'club').map(([h, label]) => <button key={h} role="radio" aria-checked={h === how} onClick={() => { setFilm(h, shownLen); top() }} style={{ minHeight: 44, padding: '0 12px', borderRadius: 10, border: h === how ? `2px solid ${INK}` : `1px solid ${LINE}`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: INK, textAlign: 'left', cursor: 'pointer' }}>{label}</button>)}</div></>)
    const another = () => pickFilm('f50'), later = () => { setFamily({ held: null, part: 0, both: false }); go('FAM3-Home') }
    const use = () => { spend(fm.id, price); setView('FAM7-Working'); top() }
    if (v === 'FAM5c-ClubFilmedThis') return shell(v, head('Add a video', 'Your club filmed this one', 'FAM14-HomeWithClub'), <>
      <section style={{ borderRadius: 16, background: DEEP, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ ...cap, color: SOFT }}>SUN 21 JUNE · {fm.title.toUpperCase()}</span><strong style={{ fontSize: 20, lineHeight: '26px' }}>It is already in your app, free.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: MINT }}>{club} filmed the whole game and knows the line-up, so {name}’s moments and numbers come from that film.</span></section>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="No credits needed" b={`Your ${f.balance} credits are untouched`} /><Line a="Your own film is not uploaded" b="It stays with you" /></section>
      <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>Use your own filming for what the club doesn’t film: friendlies, tournaments, futsal, training, the park.</span>{pick}
    </>, 'reels', actions(true, <button key="a" onClick={another} style={btn(false)}>Add a different video</button>, <button key="b" onClick={() => go('FAM14-HomeWithClub')} style={btn(true)}>See {name}’s moments</button>))
    if (v === 'FAM5x-CantRead') return shell(v, head('Add a video · free check', 'We can’t read this one', 'FAM3-Home'), <>
      <section style={bold}><strong style={{ fontSize: 17 }}>No credits used.</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>We could follow the play for only {fm.readable} of {fm.minutes} minutes, which is not enough to find {name}’s moments.</span></section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What got in the way</strong>{(fm.fail ?? []).map(([a, b, ok]) => <Line key={a} ok={ok} a={a} b={b || undefined} />)}</section>
      <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>Have another video of this, or want to try next week’s? The check is always free. Your film from this try has been deleted.</span>{pick}
    </>, 'reels', actions(true, <button key="a" onClick={() => side('FAM4-BeforeYouFilm')} style={btn(false)}>Filming tips</button>, <button key="b" onClick={another} style={btn(true)}>Try another video</button>))
    if (v === 'FAM5n-NotEnough') { const p = PACKS.find(x => f.balance + x.credits >= price) ?? PACKS[PACKS.length - 1], some = Math.min(affordable(f.balance, f.joined, f.both), fm.minutes - 1), part = priceOf(fm, f.joined, f.both, some), hold = () => setFamily({ held: { film: fm.id, credits: price } })
      return shell(v, head('Add a video · free check', 'We can read this one', 'FAM3-Home'), <>
        <section style={{ ...card, gap: 0, padding: '10px 14px 4px' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 6 }}><strong style={{ fontSize: 16 }}>This video</strong><strong style={{ fontSize: 20 }}>{price} credits</strong></div>
          {[['You have', `${f.balance} credits`], ['You need', `${price - f.balance} more`]].map(([a, b]) => <div key={a} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderTop: `1px solid ${HAIR}`, fontSize: 15 }}><span>{a}</span><strong>{b}</strong></div>)}</section>
        <button onClick={() => { hold(); setView('FAM6-Credits'); top() }} style={{ ...bold, flexDirection: 'row', alignItems: 'center', minHeight: 72, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>Get {p.credits} credits</strong><span style={{ fontSize: 13, color: MUT }}>Covers this video, with {f.balance + p.credits - price} left</span></span><strong style={{ fontSize: 18 }}>${p.price}</strong></button>
        {!f.part && some >= 1 && <button onClick={() => { say(`Pick the part you want. The first ${some} ${some === 1 ? 'minute' : 'minutes'} is ${part} credits, which you have.`); setFamily({ part: some, held: null }); setTimeout(() => { setView(checkOf(familyNow())); top() }, 1500) }} style={{ ...card, flexDirection: 'row', alignItems: 'center', minHeight: 72, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>Use just part of it</strong><span style={{ fontSize: 13, color: MUT }}>The first {some} {some === 1 ? 'minute' : 'minutes'} is {part} credits</span></span><I d={CHEV} size={16} /></button>}
        <span style={note}>Your video and this price are held for {RATES.quoteHoldsHours} hours.</span>{pick}
      </>, 'reels', actions(true, <button key="a" onClick={later} style={btn(false)}>Not now</button>, <button key="b" onClick={() => { hold(); buy(p.credits, `Paid through your app store. ${p.credits} credits added. Back to your video.`); setTimeout(() => { setView(checkOf(familyNow())); top() }, 1400) }} style={btn(true)}>Get {p.credits} · ${p.price}</button>)) }
    if (v === 'FAM5b-Maybe') return shell(v, head('Free check · a maybe', `Not much of ${name} in this one`, 'FAM3-Home'), <>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a={`We can follow the play for ${fm.readable} of ${fm.minutes} minutes`} /><Line ok={false} a={`${name} is in shot for about ${fm.inShot} minutes`} b="The camera stays with the ball at the other end" /><Line ok={false} a="We expect 1 or 2 moments" b="A reel usually has five" /></section>
      <section style={card}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><strong style={{ fontSize: 16 }}>Just the parts with {name}</strong><strong style={{ fontSize: 20 }}>{price} credits</strong></div><span style={{ fontSize: 14, lineHeight: '20px' }}>We would only work on the {fm.around ?? fm.minutes} minutes around {him}, so it uses fewer credits than the whole video ({quote(fm.minutes, 1, f.joined)}).</span></section>
      <section style={bold}><strong style={{ fontSize: 16 }}>Your call: no credits back on a maybe</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>We have told you what to expect. If you go ahead and get one moment, the {price} credits stay used.</span></section>
      <span style={note}>Have another video of this game? That may work better.</span>{pick}
    </>, 'reels', actions(true, <button key="a" onClick={later} style={btn(false)}>Not now</button>, <button key="b" onClick={use} style={btn(true)}>Go ahead · {price} credits</button>))
    return shell('FAM5-Check', head('Free check · looks good', 'We can read this one', 'FAM3-Home'), <>
      <Pitch picked={kid.number || '7'} h={150} label={<button onClick={() => say(`Tap the player who is ${name}. We follow that shirt for the whole game.`)} style={{ ...pill, minHeight: 44, border: 0, marginRight: 'auto', fontFamily: 'inherit', cursor: 'pointer' }}>That’s {name}{kid.number ? `, ${kid.colour || 'red'} ${kid.number}` : ''} · change</button>} />
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}>{fm.short ? <>
        <Line top={false} a={`We can see ${name} clearly`} b={`For about ${fm.inShot} of the ${fm.minutes} minutes`} /><Line a={`Enough for about ${fm.moments} moments`} b="We will tell you if it turns out fewer" /></> : <>
        <Line top={false} a={`We can follow the play for ${fm.readable} of ${fm.minutes} minutes`} b="The rest is too far away or blocked" />
        <Line a={`${name} is in shot for about ${fm.inShot} minutes`} b={`When the camera follows the ball, ${he} is sometimes out of frame`} />
        <Line a={`Enough for about ${fm.moments} moments`} b="We will tell you if it turns out fewer" /></>}</section>
      {other && <button role="switch" aria-checked={f.both} onClick={() => { setFamily({ both: !f.both, held: null }); say(f.both ? `Just ${name}.` : `${name} and ${other.name}: each gets a reel, and the second child adds ${RATES.secondChild} credits.`) }} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 56, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><span style={{ flexGrow: 1, fontSize: 15 }}><strong>{other.name} is in it too</strong></span><span style={{ width: 44, height: 26, borderRadius: 999, boxSizing: 'border-box', background: f.both ? G : '#fff', border: `1.5px solid ${f.both ? G : MUT}`, position: 'relative', flex: 'none' }}><span style={{ position: 'absolute', top: 2.5, left: f.both ? 21 : 3, width: 18, height: 18, borderRadius: 999, background: f.both ? '#fff' : MUT }} /></span></button>}
      <section style={bold}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><strong style={{ fontSize: 16 }}>This video</strong><strong style={{ fontSize: 20 }}>{price} credits</strong></div>
        <span style={{ fontSize: 14, lineHeight: '20px' }}>{mins} minutes of film, {f.both ? 'two children' : 'one child'}{f.part ? `, the first part of the video (the whole of it is ${whole})` : ''}{f.joined ? ', at half the credits because your club has joined' : ''}. You have {f.balance}. This is the price: it won’t go up while we work, and it comes back if we can’t make a reel from it.</span></section>
      <span style={note}>Ready in about 20 minutes. Everyone except {name} is blurred before anything is saved.</span>{pick}
    </>, 'reels', actions(true, <button key="a" onClick={later} style={btn(false)}>Not now</button>, <button key="b" onClick={use} style={btn(true)}>Use {price} credits</button>))
  }

  // ── FAM10v · what a family member sees from their private link: no app, no account ──
  if (v === 'FAM10v-FamilyLink') { const who = f.people.find(p => p.on && /link/.test(p.how)) ?? f.people[1], shared = ready[0] ?? f.videos.find(x => x.state === 'ready')
    return plain('FAM10v-FamilyLink', false, <Mark />, <>
      <span style={{ ...cap, fontSize: 12, color: MUT }}>FOR {(who?.name ?? 'you').toUpperCase()}</span>{title(`${f.parent} shared ${name}’s reel with you.`, 28)}
      {stopped || !shared ? <section style={bold}><strong style={{ fontSize: 16 }}>This link no longer works.</strong></section> : reel(shared, `${shared.day} · ${shared.clips.length} moments`)}
      {!stopped && <span style={{ fontSize: 15, lineHeight: '22px' }}>This link is just for you. Please don’t pass it on: it shows a child.</span>}
    </>, <div style={{ display: 'flex', gap: 26, justifyContent: 'center' }}>{!stopped && <button onClick={() => { setStopped(true); if (who) setFamily({ people: f.people.map(p => p.name === who.name ? { ...p, on: false } : p) }); say(`Done. ${f.parent} is told you have left, and the link no longer works.`) }} style={{ ...link, fontSize: 15 }}>Stop sending me these</button>}<button onClick={() => say('A short page about Clean Sheet Family opens.')} style={{ ...link, fontSize: 15 }}>What is this?</button></div>) }

  // ── FAM10 · share with family ──
  if (v === 'FAM10-ShareFamily' && video) { const on = f.people.filter(p => p.on), linked = on.find(p => /link/.test(p.how)), out = () => go('FAM8-Results')
    return shell('FAM10-ShareFamily', head(`${name}’s reel · ${video.date}`, 'Share with family', out), <>
      <section style={{ ...card, gap: 0, padding: '12px 14px 8px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>Who can watch</strong>
        {f.people.map(p => <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, borderTop: `1px solid ${HAIR}` }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{p.name}</strong><span style={{ fontSize: 13, color: MUT }}>{p.how}</span></span>
          <button role="switch" aria-checked={p.on} aria-label={`${p.name} · ${p.how}`} onClick={() => { setFamily({ people: f.people.map(x => x.name === p.name ? { ...x, on: !x.on } : x) }); say(`${p.name}: ${p.on ? 'removed' : 'invited'}.`) }} style={{ flex: 'none', width: 56, height: 44, padding: 0, border: 0, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 44, height: 26, borderRadius: 999, boxSizing: 'border-box', background: p.on ? G : '#fff', border: `1.5px solid ${p.on ? G : MUT}`, position: 'relative', display: 'block' }}><span style={{ position: 'absolute', top: 2.5, left: p.on ? 21 : 3, width: 18, height: 18, borderRadius: 999, background: p.on ? '#fff' : MUT }} /></span></button></div>)}
        {adding && <form onSubmit={e => { e.preventDefault(); const n = newName.trim(); if (!n) return; if (f.people.length >= 6) { say('Six is the most. Take someone off first.'); return } setFamily({ people: [...f.people, { name: n, how: 'Watch by a private link', on: true }] }); setNewName(''); setAdding(false); say(`${n}: invited.`) }} style={{ display: 'flex', gap: 8, padding: '8px 0', borderTop: `1px solid ${HAIR}` }}><input aria-label="Their name" placeholder="Their name" value={newName} onChange={e => setNewName(e.target.value)} style={{ flexGrow: 1, minWidth: 0, height: 44, padding: '0 12px', borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 15 }} /><button type="submit" style={{ ...btn(true), flex: 'none', minHeight: 44 }}>Add</button></form>}
        <button onClick={() => { if (f.people.length >= 6) { say('Six is the most. Take someone off first.'); return } setAdding(true); say('Type a name and a mobile number or email. They get a private link.') }} style={{ ...under, alignSelf: 'flex-start' }}>Add a family member</button></section>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="Up to six people you name" b="Each link works for that person only" /><Line a="Other children stay blurred" b="In the app and in any saved film" /><Line a="No public link, no social posting" b="There is no button for it" /><Line a="Not shared with the club or coach" b="Now, or if the club joins" /></section>
      {linked && demo('what a family member sees', <button onClick={() => { setStopped(false); setView('FAM10v-FamilyLink'); top() }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>Open {linked.name}’s link</button>)}
    </>, 'reels', actions(true, <button key="a" onClick={out} style={btn(false)}>Cancel</button>, <button key="b" onClick={() => on.length ? say(`Shared with ${on.map((p, n) => n ? `with ${p.name}` : p.name).join(' and ')}.`) : say('Nobody is switched on yet.')} style={btn(true, !on.length)}>Share with {on.length}</button>)) }

  // ── FAM9 · one clip, from the reel or from a stat ──
  if (v === 'FAM9-Clip' && video) { const clips = listOf(video, f.from), n = Math.min(f.clip, clips.length - 1), cl = clips[n], out = () => go(f.from === 'reel' ? 'FAM8-Results' : 'FAM21-StatClips')
    if (!cl) return shell('FAM9-Clip', head(named(video, name), 'No clips left', out), <span style={note}>There are no clips here now.</span>, 'reels')
    const drop = (line: string) => { const rest = clips.filter((_, k) => k !== n); put(video, f.from, rest); setFamily({ clip: 0 }); say(line); if (!rest.length) out() }
    return shell('FAM9-Clip', head(`${named(video, name)} · ${cl.minute}`, cl.short ?? cl.title, out), <>
      <LearnPlayer key={video.id + f.from + n} phone noTry ratio="362 / 215" chips={[`Clip ${n + 1} of ${clips.length}`]} captions={captions} onCaptions={setCaptions} say={say}
        chapters={[{ key: 'clip', frame: 'team', label: 'Clip', short: 'Clip', secs: secsOf(cl.len), lines: ['Other players are blurred'] }, { key: 'slow', frame: 'team', label: 'Slow', short: 'Slow', secs: Math.floor(secsOf(cl.len) * 4 / 3), lines: ['Other players are blurred'], slow: true }]} tryCard={nothing} />
      {cl.notice && <section style={bold}><strong style={{ fontSize: 16 }}>What to notice</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>{cl.notice.replace('{name}', name).replace(' He ', kid.he ? ' He ' : ' She ')}</span></section>}
      <div style={{ display: 'flex', gap: 10 }}><button onClick={() => drop(`Thanks. This clip is removed and we look again for ${name}. No extra credits.`)} style={btn(false)}>That’s not {name}</button><button onClick={() => drop('Clip deleted from your account.')} style={btn(false)}>Delete this clip</button></div>
    </>, 'reels', actions(true, <button key="a" onClick={() => { setFamily({ clip: (n + 1) % clips.length }); top() }} style={btn(false)}>Next clip</button>, <button key="b" onClick={() => side('FAM10-ShareFamily')} style={btn(true)}>Share with family</button>)) }

  // ── FAM9a · a moment the reel missed ──
  if (v === 'FAM9a-AddMoment' && video) { const total = video.minutes * 60, t = Math.min(at, total), out = () => go(f.from === 'reel' ? 'FAM8-Results' : 'FAM21-StatClips'), mid = Math.round(video.minutes / 2)
    const add = () => {
      if (video.added >= CHECK.missed) { say(`${WORDS[CHECK.missed][0].toUpperCase()}${WORDS[CHECK.missed].slice(1)} is the most for one video.`); return }
      const c: Clip = { len: '0:10', title: what === 'A goal' ? 'Goal' : what === 'A save' ? 'Save' : what === 'A pass' ? 'Pass' : 'A moment you added', minute: `${ord(Math.floor(t / 60) + 1)} minute`, tag: what === 'A goal', ...(f.from === 'shots' || f.from === 'chances' ? { odds: ADDED_ODDS } : {}) }
      setFamily(s => ({ videos: s.videos.map(x => x.id !== video.id ? x : { ...x, added: x.added + 1, clips: [...x.clips, c], stats: x.stats && f.from !== 'reel' ? { ...x.stats, lists: { ...x.stats.lists, [f.from]: [...x.stats.lists[f.from as StatKey], c] } } : x.stats }) }))
      say('Added. It joins the reel in about a minute.'); setTimeout(out, 1500)
    }
    return shell('FAM9a-AddMoment', head(`${named(video, name)} · ${video.date}`, 'Missed a moment?', out), <>
      <LearnPlayer key={video.id + 'missed'} phone noTry ratio="362 / 200" chips={[`Your video · ${clockOf(t)}`]} captions={captions} onCaptions={setCaptions} say={say}
        chapters={[['0', '0'], ['a', String(mid)], ['b', `${video.minutes} min`]].map(([key, label]) => ({ key, frame: 'team' as const, label, short: label, secs: 20, lines: ['Drag to the moment'] }))} tryCard={nothing} />
      <section style={card}><strong style={{ fontSize: 16 }}>Where was it?</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>Drag the bar to the moment, or type the minute. We cut ten seconds around it and blur everyone else.</span>
        <input type="range" aria-label="The moment in the video" min={0} max={total} step={10} value={t} onChange={e => setAt(Number(e.target.value))} style={{ width: '100%', height: 44, accentColor: G }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><input aria-label="Minute and second" key={t} defaultValue={clockOf(t)} onBlur={e => { const [m, s = '0'] = e.target.value.split(':'), n = Number(m) * 60 + Number(s); if (Number.isFinite(n)) setAt(Math.max(0, Math.min(total, n))) }} style={{ width: 112, boxSizing: 'border-box', height: 48, padding: '0 12px', borderRadius: 10, border: `1px solid ${MUT}`, fontFamily: 'inherit', fontSize: 18, fontWeight: 700, color: INK }} /><span style={{ fontSize: 14, color: MUT }}>{name} is in shot here</span></div></section>
      <section style={card}><strong style={{ fontSize: 16 }}>What was it?</strong><div role="radiogroup" aria-label="What was it?" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{['A goal', 'A save', 'A pass', 'Something else'].map(w => <button key={w} role="radio" aria-checked={what === w} onClick={() => { setWhat(what === w ? '' : w); say(`${w}: ${what === w ? 'taken off' : 'picked'}.`) }} style={chip(what === w)}>{w}</button>)}</div></section>
      <span style={note}>Free, up to {WORDS[CHECK.missed]} for each video, for {CHECK.missedDays} days after you upload it.</span>
    </>, 'reels', actions(true, <button key="a" onClick={out} style={btn(false)}>Cancel</button>, <button key="b" onClick={add} style={btn(true)}>Add this moment</button>)) }

  // ── FAM8x · too few moments: the credits are back and the clip is kept ──
  if (v === 'FAM8x-TooFew' && video) { const n = video.clips.length
    return shell('FAM8x-TooFew', head(`${video.date} · ${video.title}`, n === 1 ? 'We only found one' : `We only found ${WORDS[n] ?? n}`, 'FAM3-Home'), <>
      <section style={card}><strong style={{ fontSize: 17 }}>Your {quote(video.minutes, 1, f.joined)} credits are back.</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>A reel needs {WORDS[CHECK.minClips]} moments. {name} was in shot for only {video.inShot ?? 6} minutes of this one, so we could find {WORDS[n] ?? n}.</span></section>
      <section style={{ ...card, gap: 0, paddingBottom: 6 }}><strong style={{ fontSize: 16 }}>Keep {n === 1 ? 'this one' : 'these'}, on us</strong>{video.clips.map((cl, k) => clipRow(cl, k, () => openClip(k), true))}</section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>For next time</strong><Line ok={false} a="The camera followed the ball" b={`${name} was often out of frame. Stay wide and keep it still`} /><Line a="Know a moment we missed?" b="Add it by time, free" /></section>
      <span style={note}>We checked first and thought there would be more. Sorry.</span>
    </>, 'reels', actions(true, <button key="a" onClick={() => { setFamily({ from: 'reel' }); setView('FAM9a-AddMoment'); top() }} style={btn(false)}>Add a moment</button>, <button key="b" onClick={() => go('FAM3-Home')} style={btn(true)}>Done</button>)) }

  // ── FAM21 · a stat, opened into the clips it was counted from ──
  if (v === 'FAM21-StatClips' && video?.stats) { const key = f.stat, clips = video.stats.lists[key], w = STAT[key], word = clips.length === 1 ? w.one : w.many
    return shell('FAM21-StatClips', head(`${name}’s game · stats`, `${clips.length} ${word}`, 'FAM20-GameStats'), <>
      {clips.length > 0 && <LearnPlayer key={video.id + key + clips.length} phone noTry ratio="362 / 200" chips={[`${w.one[0].toUpperCase()}${w.one.slice(1)} 1 of ${clips.length} · ${clips[0].minute}`]} captions={captions} onCaptions={setCaptions} say={say}
        chapters={clips.slice(0, 3).map((cl, n) => ({ key: String(n), frame: 'team' as const, label: String(n + 1), short: String(n + 1), secs: secsOf(cl.len), lines: ['Other players are blurred'] }))} tryCard={nothing} />}
      <section style={{ ...card, gap: 0, padding: '6px 14px' }}>{clips.map((cl, n) => clipRow(SHOW_XG && cl.odds && (key === 'shots' || key === 'chances') ? { ...cl, minute: `${cl.minute} · ${key === 'shots' ? 'goes' : 'the shot goes'} in 1 in ${cl.odds}` } : cl, n, () => openClip(n, key), n === 0))}{!clips.length && <span style={{ fontSize: 14, color: MUT, padding: '10px 0' }}>No clips, so no number.</span>}</section>
      <section style={{ ...card, gap: 0, padding: '2px 14px' }}>
        <button onClick={() => { setFamily({ from: key }); setView('FAM9a-AddMoment'); top() }} style={row}><strong style={{ flexGrow: 1, fontSize: 16 }}>We missed one</strong><I d={CHEV} size={16} /></button>
        {clips.length > 0 && <button onClick={() => { put(video, key, clips.slice(0, -1)); say(`Thanks. That clip is removed and the number changes to ${clips.length - 1}.`) }} style={{ ...row, borderTop: `1px solid ${HAIR}` }}><strong style={{ flexGrow: 1, fontSize: 16 }}>One of these isn’t {w.not}</strong><I d={CHEV} size={16} /></button>}</section>
      <span style={note}>Every number is its clips. If the clips are wrong, tell us and the number changes.{SHOW_XG && (key === 'shots' || key === 'chances') ? ' A shot’s worth (xG) comes from where it was taken, for a pitch and goal this size.' : ''}</span>
    </>, 'reels') }

  // ── FAM20 · the Stats tab, the same for any child ──
  if (v === 'FAM20-GameStats' && video?.stats) { const s = video.stats, L = s.lists
    // one headline number and six tiles. A number with no clips behind it is not shown
    const subs: Record<StatKey, [ReactNode, string, string]> = {
      passes: [<>{L.passes.length} <span style={{ fontSize: 15, fontWeight: 500, color: MUT }}>of {Math.max(s.tried, L.passes.length)}</span></>, STAT.passes.label, `${tagged(L.passes)} went forward`],
      shots: SHOW_XG ? [xgOf(L.shots), 'Expected goals (xG)', `${shotsOf(L.shots)} · ${goalsOf(L.shots)}`] : [L.shots.length, STAT.shots.label, goalsOf(L.shots)],
      chances: [L.chances.length, STAT.chances.label, SHOW_XG ? `${xgOf(L.chances)} expected assists (xA)` : 'Passes that led to a shot'],
      prog: [L.prog.length, STAT.prog.label, 'Moved it well up the pitch'],
      took: [L.took.length, STAT.took.label, `${tagged(L.took)} came off`], won: [L.won.length, STAT.won.label, `${tagged(L.won)} in the other half`],
    }
    return shell('FAM20-GameStats', head(`${video.date} · ${video.title}`, `${name}’s game`, 'FAM18-Reels'), <>
      {seg('stats')}
      <section style={{ borderRadius: 16, background: NIGHT, color: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}><strong style={{ fontSize: 54, lineHeight: '56px', letterSpacing: '-0.03em' }}>{s.onBall}</strong><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>times on the ball</strong><span style={{ fontSize: 14, lineHeight: '19px', color: MINT }}>in the {s.inShot} minutes {name} was on screen, of {s.minutes}</span></span></section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 8 }}>
        {STAT_KEYS.filter(key => L[key]?.length > 0).map((key, n) => <button key={key} onClick={() => { setFamily({ stat: key }); setView('FAM21-StatClips'); top() }} style={{ ...card, background: TINTS[n % TINTS.length], gap: 2, minHeight: 88, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer', position: 'relative' }}><span style={{ position: 'absolute', right: 12, top: 14, color: G }}><I d={PLAY} size={13} /></span><span style={{ fontSize: 32, lineHeight: '36px', fontWeight: 700 }}>{subs[key][0]}</span><strong style={{ fontSize: 15, lineHeight: '19px' }}>{subs[key][1]}</strong><span style={{ fontSize: 13, color: MUT }}>{subs[key][2]}</span></button>)}</div>
      <section style={{ borderRadius: 14, background: PALE, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>{estimate}<span style={{ fontSize: 14, lineHeight: '19px' }}>All of these. One camera misses things. Tap a number to watch it.</span></section>
      {locked('Minutes, positions and the team’s numbers', 'From the club’s team sheet and film.')}
    </>, 'reels') }

  // ── FAM8 · results, the Reel tab: the one results screen. A full game has the Stats tab and its numbers; a short video has the reel only ──
  if (v === 'FAM8-Results' && video) { const s = video.stats, shown = s ? 1 : 2, more = video.clips.length - shown, firstRun = !f.offered, game = video.title.startsWith('v ')
    return shell('FAM8-Results', head(`${video.date}${game ? ` · ${video.title}` : ''}`, game ? `${name}’s game` : `${name}’s moments`, firstRun ? undefined : 'FAM3-Home'), <>
      {s && seg('reel')}
      {reel(video, `${name}’s reel · ${video.clips.length} ${video.clips.length === 1 ? 'moment' : 'moments'}`)}
      {s && <button aria-label={`${name}’s game in numbers. See all`} onClick={() => go('FAM20-GameStats')} style={{ borderRadius: 16, border: 0, background: NIGHT, color: '#fff', padding: '12px 14px', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}><span style={{ ...cap, color: AMBER }}>{name.toUpperCase()}’S GAME IN NUMBERS</span><span style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 8 }}>{([[s.onBall, 'on the ball'], [s.lists.passes.length, 'passes'], SHOW_XG ? [xgOf(s.lists.shots), 'xG'] : [s.lists.shots.length, 'shots']] as [number | string, string][]).map(([n, w]) => <span key={w} style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 26, lineHeight: '30px' }}>{n}</strong><span style={{ fontSize: 13, color: MINT }}>{w}</span></span>)}</span></span>
        <span style={{ flex: 'none', minHeight: 44, padding: '0 16px', borderRadius: 999, background: AMBER, color: INK, fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center' }}>See all</span></button>}
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>Things {name} did well</strong>
        {video.clips.slice(0, shown).map((cl, k) => clipRow(cl, k, () => openClip(k)))}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, borderTop: `1px solid ${HAIR}` }}>{more > 0 ? <button onClick={() => openClip(shown)} style={under}>{more} more</button> : <span />}<button onClick={() => { setFamily({ from: 'reel' }); setView('FAM9a-AddMoment'); top() }} style={under}>Missed a moment?</button><button onClick={() => say('Saved to your phone. Other players stay blurred in the saved film.')} style={link}>Save to phone</button></div></section>
      {!s && <span style={note}>A short video gets a reel and no stats. Stats come from a full game.</span>}
      {locked(`Moments with ${his} team-mates`, 'Everyone else is blurred here. The club asks every family first.')}
    </>, firstRun ? null : 'reels', actions(!firstRun, <button key="a" onClick={() => side('FAM10-ShareFamily')} style={btn(false)}>Share with family</button>, <button key="b" onClick={() => { if (firstRun) { setView('FAM6f-AfterFree'); top() } else go('FAM3-Home') }} style={btn(true)}>Done</button>)) }

  // ── FAM12 · tell my club ──
  if (v === 'FAM12-TellClub') { const msg = f.message ?? `Hi, I’ve been using Clean Sheet to get ${name}’s highlights from games. It also does a lot for coaches and clubs: session plans, fair turns, clips for every family. ${count ? `A few of us at ${club.replace(/ FC$/, '')} already use it. ` : ''}There’s a page for clubs here if it’s of interest. No pressure at all. ${f.parent}`
    return shell('FAM12-TellClub', head(club, 'Tell my club', 'FAM11-Locked'), <>
      <section style={bold}><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>YOU SEND THIS YOURSELF, TO WHOEVER YOU CHOOSE</span>
        {editing ? <textarea aria-label="Your message" value={msg} onChange={e => setFamily({ message: e.target.value })} rows={8} style={{ padding: 10, borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 15, lineHeight: '21px', color: INK, resize: 'vertical' }} /> : <span style={{ fontSize: 15, lineHeight: '22px', whiteSpace: 'pre-wrap' }}>{msg}</span>}
        <button onClick={() => { setEditing(true); say('Edit the message. It stays yours.') }} style={{ ...under, alignSelf: 'flex-start' }}>Change the wording</button></section>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="It goes from you, not from us" b="By text, email or however you like" /><Line a="We never contact your club" b="Unless the club comes to us" /><Line a="Your name is not on our club page" b="It shows a number only" /></section>
      <span style={note}>One message is plenty. Volunteers run your club.</span>
    </>, 'club', actions(true, <button key="a" onClick={() => go('FAM11-Locked')} style={btn(false)}>Not now</button>, <button key="b" onClick={() => say('Your phone’s share sheet opens with the message and the link.')} style={btn(true)}>Send it myself</button>)) }

  // ── FAM13 · your club has joined ──
  if (v === 'FAM13-ClubJoined') { const seen = () => { setFamily({ toldJoined: true }); setView('FAM14-HomeWithClub'); top() }, kept = f.videos.filter(x => x.clips.length).length
    return shell('FAM13-ClubJoined', head(club, 'Your club has joined'), <>
      <section style={{ borderRadius: 16, background: PLUM, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ ...cap, color: '#e6d3d3' }}>FROM TODAY</span><strong style={{ fontSize: 19, lineHeight: '25px' }}>Games {club} films are free for you.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#e6d3d3' }}>{name}’s coach, Luke, can now send goals, clips and messages here.</span></section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What changes</strong>
        {([['Games the club films', 'Free'], ['Your own filming', 'Half the credits'], [`Your ${f.balance} credits`, `Now about ${aboutGames(f.balance, true)} full ${aboutGames(f.balance, true) === 1 ? 'game' : 'games'}`]] as [string, string][]).map(([a, b]) => <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '9px 0', borderTop: `1px solid ${HAIR}`, fontSize: 15 }}><span>{a}</span><strong style={{ flex: 'none' }}>{b}</strong></div>)}</section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What stays yours</strong><Line a={`Your ${kept} videos and their clips`} b="Private to your family, as before" /><Line a="The club and coach can’t see them" b="There is no way to send them" /><Line a="You can delete them any time" /></section>
      <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>The club asks each family what it may film and share. You’ll see those questions next.</span>
    </>, null, actions(false, <button key="a" onClick={seen} style={btn(false)}>{f.toldJoined ? 'Home' : 'Later'}</button>, <button key="b" onClick={() => say(`Three questions from ${club} about film and sharing.`)} style={btn(true)}>Answer the club’s questions</button>)) }

  // ── FAM11 · the Club tab: what you have now, and what the club would add ──
  if (v === 'FAM11-Locked') { const rows: [string, string, string][] = [['Games covered', 'Ones you film', 'Every game'], ['Filming', 'You set up and upload', 'Done for you'], ['Numbers', 'Per video, estimates', 'All season, side by side'], ['Minutes and positions', '', 'From the team sheet'], ['Cost to you', 'Credits', 'Club games free'], ['From the coach', '', 'Goal, feedback, home practice'], ['Team-mates in clips', 'Blurred', 'With each family’s yes'], ['Season report', '', 'From the coach']]
    const cell: React.CSSProperties = { padding: '10px 6px', fontSize: 13, lineHeight: '17px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }
    return shell('FAM11-Locked', head(f.club ? club : 'Your club', 'With your club', 'FAM3-Home'), <>
      <section style={{ borderRadius: 16, background: PLUM, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ ...cap, color: '#e6d3d3' }}>{count ? `${families} FAMILIES AT ${club.toUpperCase()} USE THIS` : 'TELL US IF YOUR CLUB JOINS'}</span><strong style={{ fontSize: 19, lineHeight: '25px' }}>You are getting part of it.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#e6d3d3' }}>The rest needs the club: every game filmed, its coaches and every family’s say-so.</span></section>
      <section role="table" aria-label="You now, and with your club" style={{ ...card, gap: 0, padding: '4px 0 4px 14px', display: 'grid', gridTemplateColumns: '1.25fr 1fr 1fr' }}>
        <span role="columnheader" /><span role="columnheader" style={{ ...cell, ...cap, color: MUT }}>YOU NOW</span><span role="columnheader" style={{ ...cell, ...cap, background: ROSE }}>WITH YOUR CLUB</span>
        {rows.map(([a, now, then]) => [<strong role="rowheader" key={a} style={{ ...cell, justifyContent: 'flex-start', textAlign: 'left', paddingLeft: 0, fontSize: 14, borderTop: `1px solid ${HAIR}` }}>{a}</strong>, <span role="cell" key={a + 1} style={{ ...cell, borderTop: `1px solid ${HAIR}` }}>{now || <span aria-label="Nothing">–</span>}</span>, <strong role="cell" key={a + 2} style={{ ...cell, background: ROSE, borderTop: `1px solid ${HAIR}` }}>{then}</strong>])}</section>
      <span style={note}>Clubs decide for themselves. We only show them how many families use this, never who.</span>
      {demo('the sample club', <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{f.club?.name === 'Hillview FC' && <><button onClick={() => { setFamily({ joined: true, toldJoined: false, seasonDue: null }); setView('FAM13-ClubJoined'); top() }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>{club} joins</button><button onClick={() => { setFamily({ families: count ? 3 : 14 }); say(count ? 'Three families use it: the number is hidden below five.' : 'Fourteen families use it.') }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>{count ? 'Only 3 families' : '14 families'}</button></>}<button onClick={() => { setView('FAMc1-ClubInterest'); top() }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>What the club sees</button></div>)}
    </>, 'club', actions(true, <button key="a" onClick={tour} style={btn(false)}>Show me</button>, <button key="b" onClick={() => { setView('FAM12-TellClub'); top() }} style={btn(true)}>Tell my club</button>)) }

  // ── FAMc1, opened from the phone: the page a club sees ──
  if (v === 'FAMc1-ClubInterest') return <div><div style={{ maxWidth: 1180, margin: '0 auto', padding: '8px 16px' }}><button onClick={() => setView('FAM11-Locked')} style={under}>Back to the family app</button></div><FamilyClubPage onNav={onNav} /></div>

  // ── FAM19 · your account ──
  if (v === 'FAM19-Account') { const on = f.people.filter(p => p.on)
    return shell('FAM19-Account', head(f.email, 'Your account', back), <>
      {group([['Your children', f.kids.map(x => x.name).join(' and '), '', () => { setView('FAM15-Children'); top() }], ['Credits and receipts', '', String(f.balance), () => { setView('FAM6-Credits'); top() }], ['Family who can watch', on.map(p => p.name).join(', '), String(on.length), () => { if (!f.videos.some(x => x.id === f.open && x.clips.length)) { const any = f.videos.find(x => x.state === 'ready'); if (!any) { say('No reels yet. Add a video from Home.'); return } setFamily({ open: any.id }) } setView('FAM10-ShareFamily'); top() }]])}
      {group([['Tell me when a reel is ready', '', f.notify ? 'On' : 'Off', () => { setFamily({ notify: !f.notify }); say(`Notifications turned ${f.notify ? 'off' : 'on'}. We only ever send this one.`) }], ['How we handle your film', 'Copy, delete or close your account', '', () => { setView('FAM16-Privacy'); top() }], ['Filming tips', '', '', () => { setView('FAM4-BeforeYouFilm'); top() }]])}
      {group([['Something wrong with a reel?', 'Wrong child, a missed moment, a refund', '', () => say('Pick the reel, say what is wrong. A person replies within a day.')], ['Terms', '', '', () => say('The terms open.')], ['Sign out', '', '', () => { setFamily({ signedIn: false }); setView('FAM1-Welcome'); top() }]])}
    </>, 'home') }

  // ── FAM15 · your children ──
  if (v === 'FAM15-Children') return shell('FAM15-Children', head('Your account', 'Your children', () => { setView('FAM19-Account'); top() }), <>
    <section style={{ ...card, gap: 0, padding: '4px 14px 2px' }}>
      {f.kids.map((x, n) => { const reels = f.videos.filter(y => y.kid === x.id && y.state === 'ready').length; return <button key={x.id} onClick={() => say(`${x.name}: change name, birth year, club or shirt.`)} style={{ ...row, minHeight: 66, borderTop: n ? `1px solid ${HAIR}` : 0 }}><span style={{ ...round, background: x.id === kid.id ? G : PALE, color: x.id === kid.id ? '#fff' : INK, fontSize: 16, fontWeight: 700 }}>{x.name[0]}</span><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>{x.name}</strong><span style={{ fontSize: 14, color: MUT }}>Born {x.year}{f.club ? ` · ${f.club.name}` : ''} · {reels} {reels === 1 ? 'reel' : 'reels'}</span></span><I d={CHEV} size={16} /></button> })}
      <button onClick={() => { setExtra({ name: '', year: '' }); setView('FAM2-AddChild'); top() }} style={{ ...under, alignSelf: 'flex-start', fontSize: 16, borderTop: `1px solid ${HAIR}`, width: '100%', textAlign: 'left', minHeight: 52 }}>Add a child</button></section>
    <section style={card}><strong style={{ fontSize: 16 }}>Both in the same video?</strong><span style={{ fontSize: 15, lineHeight: '21px' }}>Tap both when you upload. Each gets their own reel, and the second child adds {RATES.secondChild} credits.</span></section>
    <section style={card}><strong style={{ fontSize: 16 }}>Age decides what you see</strong><span style={{ fontSize: 15, lineHeight: '21px' }}>Every age: clips and game stats, each number marked as an estimate.</span></section>
    <span style={note}>Only children you are the parent or guardian of.</span>
    {!f.kids.some(x => x.id === SAMPLE_OLDER.id) && demo('a second child', <button onClick={() => { addSampleOlder(); go('FAM3-Home'); say(`Showing ${SAMPLE_OLDER.name}.`) }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>Add {SAMPLE_OLDER.name}, with three games and their stats</button>)}
  </>, 'home')

  // ── FAM18 · the Reels tab: every video and its state ──
  if (v === 'FAM18-Reels') return shell('FAM18-Reels', head(`${f.balance} credits · ${games}`, 'Reels'), <>
    {switcher}
    {locked('Every club game, here, free', 'Filmed by the club. Nothing for you to film, no credits.')}
    <section style={{ ...card, gap: 0, padding: '4px 14px' }}>
      {mine.map((x, n) => <button key={x.id} onClick={() => openVideo(x)} style={{ ...row, minHeight: 70, borderTop: n ? `1px solid ${HAIR}` : 0 }}>
        <span style={{ flex: 'none', width: 96 }}>{x.state === 'working' ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '16 / 9', borderRadius: 10, background: NIGHT, color: '#fff' }}><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="9" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" /><path d="M12 3a9 9 0 019 9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg></span>
          : x.state === 'unread' ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '16 / 9', borderRadius: 10, border: `1px dashed ${MUT}`, color: MUT, boxSizing: 'border-box' }}><I d={CROSS} size={16} /></span> : <Thumb kind="team" len={reelOf(x.clips)} wide />}</span>
        <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16, lineHeight: '20px' }}>{x.title}{x.clips.length ? ` · ${x.clips.length} ${x.clips.length === 1 ? 'moment' : 'moments'}` : ''}</strong>
          <span style={{ fontSize: 14, color: MUT }}>{[x.date, x.state === 'working' ? 'about 6 minutes to go' : x.state === 'few' ? 'credits returned' : x.state === 'unread' ? 'couldn’t read it, no credits used' : x.note].filter(Boolean).join(' · ')}</span></span></button>)}
      {!mine.length && <span style={{ fontSize: 15, color: MUT, padding: '14px 0' }}>Nothing for {name} yet.</span>}</section>
    <span style={note}>Private to your family. Kept until you delete them.</span>
  </>, 'reels', actions(true, <button key="a" onClick={() => go('FAM5-Check')} style={btn(true)}>Add a video</button>))

  // ── FAM17 · the Learn tab: free games and clips to play at home ──
  if (v === 'FAM17-Learn') { const kind = (['turn', 'look', 'pass', 'won'] as Kind[]).find(k => latest?.clips.some(c => c.kind === k)), game = kind ? KINDS[kind].game : '', len = (t: string) => clockOf(byTitle(t, 'players')?.secs ?? 0)
    return shell('FAM17-Learn', head('Free · no credits', 'Play at home'), <>
      {switcher}
      {kind && latest && <section style={{ ...card, gap: 8 }}><span style={{ ...cap, color: MUT }}>BECAUSE OF {latest.day.toUpperCase()}’S REEL</span><strong style={{ fontSize: 17, lineHeight: '22px' }}>{name} {KINDS[kind].did}. Here is a game for it.</strong><button onClick={() => lib(game)} style={{ ...btn(true), flex: 'none' }}>{game} · {len(game)}</button></section>}
      {SHELVES.map(([t, items]) => <section key={t} aria-label={t} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><strong style={{ fontSize: 16 }}>{t}</strong><button aria-label={`See all, ${t}`} onClick={() => { setAll(all === t ? '' : t); say(`All of ${t}.`) }} style={{ ...link, fontSize: 13 }}>See all</button></div>
        <div style={{ display: 'flex', gap: 10, flexWrap: all === t ? 'wrap' : 'nowrap', overflowX: all === t ? undefined : 'auto', paddingBottom: 4 }}>{items.map(([i, sort]) => <button key={i} onClick={() => lib(i)} style={{ flex: 'none', width: 158, display: 'flex', flexDirection: 'column', gap: 3, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><Thumb kind={sort === 'Game' ? 'drawn' : 'figure'} len={len(i)} wide /><strong style={{ fontSize: 14, lineHeight: '18px', marginTop: 2 }}>{i}</strong><span style={{ fontSize: 12, color: MUT }}>{sort === 'Clip' ? `Clip · ${len(i)}` : sort}</span></button>)}</div></section>)}
      <span style={note}>Picked for under {age < 12 ? age : age + 1}.{f.joined ? ` ${name}’s coach can send these too.` : f.club ? ` If ${club} joins, ${name}’s coach can send these too.` : ''}</span>
    </>, 'learn') }

  // ── FAM14 · home after the club joins ──
  if (v === 'FAM14-HomeWithClub') { const own = f.videos.filter(x => x.state === 'ready' && x.kid === kid.id).slice(0, 2)
    return shell('FAM14-HomeWithClub', head(`U11 Luke · ${club.replace(/ FC$/, '')}`, `Hi ${f.parent}`), <>
      <section style={card}><span style={{ ...cap, color: MUT }}>FROM YOUR CLUB · FREE</span><strong style={{ fontSize: 18, lineHeight: '24px' }}>Sunday 9:30 v Ridgeway, home</strong><span style={{ fontSize: 14, color: MUT }}>Luke: two things to try before Tuesday</span>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}><button aria-pressed={f.coming} onClick={() => { setFamily({ coming: true }); say(`Luke can see ${name} is coming.`) }} style={btn(true)}>{name} is coming</button><button onClick={() => { setView('ECp1-FamilyLibrary'); top() }} style={btn(false)}>From Luke</button></div></section>
      <section aria-label="Your own filming" style={{ borderRadius: 16, border: `2px dashed ${MUT}`, padding: '10px 14px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 4 }}><I d={LOCK} size={16} /><strong style={{ flexGrow: 1, fontSize: 16 }}>Your own filming</strong><span style={{ fontSize: 13, fontWeight: 700, color: MUT }}>Private to your family</span></div>
        {own.map((x, n) => <button key={x.id} onClick={() => openVideo(x)} style={{ ...row, minHeight: 70, borderTop: n ? `1px solid ${HAIR}` : 0 }}><span style={{ flex: 'none', width: 96 }}><Thumb kind="team" len={reelOf(x.clips)} wide /></span><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{x.title} · {x.clips.length} moments</strong><span style={{ fontSize: 13, color: MUT }}>{x.date} · {x.note ?? 'before the club joined'}</span></span></button>)}
        <button onClick={() => go('FAM5-Check')} style={{ ...btn(false), flex: 'none', marginTop: 6 }}>Add a video · half the credits</button></section>
      <button onClick={() => side('FAM6-Credits')} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 60, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
        <span style={{ flex: 'none', minWidth: 44, height: 30, padding: '0 10px', boxSizing: 'border-box', borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700 }}>{f.balance}</span><span style={{ flexGrow: 1, fontSize: 15 }}><strong>credits</strong> · {games}</span><span style={{ ...link, minHeight: 0 }}>Get more</span></button>
      <span style={note}>Luke and the club can’t see anything in the dashed box.</span>
    </>, 'home') }

  // ── FAM3 · Home, a dashboard for the child in the switch: the one Home, at every age. Each video stands alone: no trend, average or total across them ──
  const full = fullGames(mine), last = full[0], passes = (x: Video) => `${x.stats!.lists.passes.length}/${Math.max(x.stats!.tried, x.stats!.lists.passes.length)}`
  const stat = (x: Video) => { setFamily({ open: x.id, clip: 0, from: 'reel' }); go('FAM20-GameStats') }
  return shell('FAM3-Home', head('Clean Sheet Family', `Hi ${f.parent}`), <>
    {switcher}{latest ? latestCard(latest) : <span style={note}>Nothing for {name} yet. Add a video and we’ll find {his} moments.</span>}
    {last && <button aria-label={`${name}’s latest game in numbers`} onClick={() => stat(last)} style={{ border: 0, background: 'none', padding: 0, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>{tiles([[String(last.stats!.onBall), 'times on the ball'], [passes(last), 'passes reached'], SHOW_XG ? [xgOf(last.stats!.lists.shots), `xG · ${shotsOf(last.stats!.lists.shots)}, ${goalsOf(last.stats!.lists.shots)}`] : [String(last.stats!.lists.shots.length), `shots · ${goalsOf(last.stats!.lists.shots)}`]])}</button>}
    {full.length > 0 && <section style={{ ...card, gap: 0, padding: '10px 14px 2px' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8 }}><strong style={{ fontSize: 16 }}>Game by game</strong>{estimate}</div>
      {full.map(x => <button key={x.id} onClick={() => stat(x)} style={{ ...row, borderTop: `1px solid ${HAIR}` }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{x.title}</strong><span style={{ fontSize: 13, color: MUT }}>{x.date} · {x.stats!.inShot} min on screen</span></span><span style={{ flex: 'none', fontSize: 14, letterSpacing: '0.02em' }}>{x.stats!.onBall} · {passes(x)} · {SHOW_XG ? `${xgOf(x.stats!.lists.shots)} xG` : x.stats!.lists.shots.length}</span><I d={CHEV} size={16} /></button>)}</section>}
    {latest && !last && tiles([[String(ready.length), ready.length === 1 ? 'video' : 'videos'], [String(ready.flatMap(x => x.clips).length), ready.flatMap(x => x.clips).length === 1 ? 'moment' : 'moments'], [clockOf(ready.flatMap(x => x.clips).reduce((a, c) => a + secsOf(c.len), 0)), 'of highlights']])}
    {season('Each video stands alone here. With every game filmed the same way, numbers can be compared across the season.')}
  </>, 'home', actions(true, addRow()))
}

// ── FAMc1 · the public page a club sees: a number, never names ──
export function FamilyClubPage({ onNav }: { onNav?: (s: string) => void }) {
  const f = useFamily(), club = f.club?.name ?? 'your club', families = f.club && !f.club.unmatched ? f.families : 0, count = families >= SHOW_COUNT_AT
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(t => t === m ? null : t), 3600) }
  const look = () => onNav ? onNav('STA3-PickRole') : openScreen('STA3-PickRole')
  const tile: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' }
  const wide = (primary: boolean): React.CSSProperties => ({ minHeight: 50, padding: '0 22px', borderRadius: 12, border: primary ? 0 : `1px solid ${LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' })
  return (
    <div data-screen="FAMc1-ClubInterest" style={{ maxWidth: 1180, minHeight: 820, margin: '0 auto', background: '#faf5ec', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <header style={{ height: 64, padding: '0 32px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 16 }}><strong style={{ flexGrow: 1, fontSize: 22, letterSpacing: '-0.02em' }}>Clean Sheet</strong><button onClick={look} style={{ minHeight: 44, border: 0, background: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>Look around</button><button onClick={() => say('A short form: your name, your role at the club, and a time to talk.')} style={{ minHeight: 44, padding: '0 18px', borderRadius: 10, border: 0, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Talk to us</button></header>
      <main style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: MUT }}>FOR THE COMMITTEE AT {club.toUpperCase()}</span>
          <h1 style={{ margin: 0, fontSize: 42, lineHeight: '48px', letterSpacing: '-0.03em' }}>{count ? `${families} families at your club already use Clean Sheet.` : 'Families at your club already use Clean Sheet.'}</h1>
          <span style={{ fontSize: 18, lineHeight: '27px' }}>They film games on their phones and their own cameras, and pay with credits for their own child’s highlights. With the club on board, every family gets that from one camera, and your coaches get a lot more.</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10 }}>{[['For coaches', 'A session proposed from the last game, with the reason for every part'], ['For families', 'Their child’s moments from every club game, with no credits'], ['For the club', 'Fair turns, consent and welfare in one place']].map(([a, b]) => <span key={a} style={{ borderRadius: 12, background: PALE, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 12, color: MUT }}>{a}</strong><span style={{ fontSize: 14, lineHeight: '19px' }}>{b}</span></span>)}</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><button onClick={look} style={wide(true)}>See what coaches get</button><button onClick={() => say('The price list for clubs opens.')} style={wide(false)}>Prices for clubs</button></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <section style={{ ...tile, gap: 0, paddingBottom: 6 }}><strong style={{ fontSize: 18, paddingBottom: 6 }}>What this page is, and is not</strong>
            <Line a="A count, not a list" b="We don’t tell you which families. They can if they wish" /><Line a="Nobody at your club asked us to send this" b="A parent shared the link, or you found it" /><Line a="We won’t chase you" b="This page is the whole pitch" /><Line a="Families’ own film stays private" b="Joining gives the club no access to it" /></section>
          <section style={{ ...tile, gap: 0, paddingBottom: 6 }}><strong style={{ fontSize: 18, paddingBottom: 6 }}>If you join this season</strong>
            {([['Families already using it', 'Shown as a number only', count ? String(families) : 'Fewer than 5'], ...(families >= OFFER_AT ? [['First term', `Because ${OFFER_AT} or more of your families already use it`, 'No charge']] : []), ['Their credits', 'Club games become free for them', 'Still theirs']] as [string, string, string][]).map(([a, b, x]) => <div key={a} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderTop: `1px solid ${LINE}` }}><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{a}</strong><span style={{ fontSize: 13, color: MUT }}>{b}</span></span><strong style={{ flex: 'none', fontSize: 15 }}>{x}</strong></div>)}</section>
          <section style={{ borderRadius: 14, background: PALE, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 14 }}>About filming at your club</strong><span style={{ fontSize: 14, lineHeight: '20px' }}>If your club or association has a rule on filming juniors, tell us and we show it to every family before they film.</span></section>
        </div>
      </main>
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 560, zIndex: 60, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600 }}>{toast}</div>}
    </div>)
}
