// Clean Sheet Family (family-app-v29), on a phone. It is the one app a parent uses, before and after their club joins. A parent uploads a video; credits pay for finding their own child's
// moments, and the first video is free. It works whether or not the club uses Clean Sheet. A child's reel and numbers are
// private to the family for ever: no control here sends a video, a clip or a count to a club, a coach or another family.
// Another family can get their own child's moments from a video, only if the uploader sends them the link and says yes.
// A demo of the flows on sample data. Nothing analyses real film; the purchase, the picker and the share sheet are stubs.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { pushPath, useBackState } from '../../backState'
import { openScreen } from '../openThing'
import { G, INK, MUT, LINE, PALE } from '../capture/marks'
import LearnPlayer, { Thumb } from '../learn/LearnPlayer'
import EducationPhone from '../learn/EducationPhone'
import { byTitle } from '../learn/library'
import { cameOf, groupOf, money, playerOf, setSurvey, setTerm3, useAcademy } from '../academy/academyStore'
import { ADDED_ODDS, ASKERS, ASKS, CHECK, JOINABLE, CONSENT_BACK, SESSIONS, STAFF, CLUBS, HOWS, KINDS, MAX_MINUTES, OFFER_AT, PACKS, RATES, SAMPLE_OLDER, SHOW_COUNT_AT, SHOW_XG, STAT, STAT_KEYS, TEAM, TEAM_LINK, aboutGames, affordable, addSampleOlder, ageOf, clockOf, familyNow, film, filmId, finish, freeLeft, freshFamily, fullGames, howOf, named, ord, outcome, preset, priceOf, quote, reelOf, secsOf, setFamily, spend, tagged, useFamily, worth, xgOf, type Clip, type Family, type Invite, type Kind, type StatKey, type Video } from './familyStore'

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
const CLOCK = 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2', TICK = 'M5 12l5 5 9-10', CHEV = 'M9 6l6 6-6 6', BACK = 'M15 6l-6 6 6 6', SHIELD = 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', LOCK = 'M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z', PLAY = 'M8 5l11 7-11 7z', PLUS = 'M12 5v14M5 12h14', CROSS = 'M7 7l10 10M17 7L7 17', VIDEO = 'M3 7h12v10H3zM15 10l6-3v10l-6-3', BARS = 'M6 20v-6M12 20V6M18 20v-9', PEOPLE = 'M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 3-5 6-5s6 2 6 5M14 20c0-2 1-4 4-4s4 2 4 4', WARN = 'M12 8v5M12 16.5v.5M12 3l9.5 17h-19z', UPLOAD = 'M12 16V5M7 10l5-5 5 5M5 20h14'
const TABS: [string, string, string, string][] = [['Home', 'M4 11l8-7 8 7v9H4z', 'home', 'FAM3-Home'], ['Reels', VIDEO, 'reels', 'FAM18-Reels'], ['Team', PEOPLE, 'team', 'FAM30-TeamLocked'], ['Learn', 'M5 4h14v16H5zM9 4v16', 'learn', 'FAM17-Learn'], ['Club', SHIELD, 'club', 'FAM11-Locked']]
const HOMES = ['FAM3-Home', 'FAM3e-HomeEmpty', 'FAM14-HomeWithClub']
// Retired 23 Nov: stats are for every age, so there is one Home and one results screen. The boards still open, and say so.
// Learn is a club feature (Booker, 24 Nov): closed, with an explanation, until the club joins.
const LEARNS = ['FAM17-Learn', 'FAM17u-LearnWithClub']
// One parent app (Booker, 24 Nov): the club's features live here. Team and Learn are closed, with an explanation, until the club joins; then the same tabs open.
const TEAMS = ['FAM31-Team', 'FAM32-TeamChat', 'FAM33-Coming', 'FAM34-Lineup', 'FAM35-Forms', 'FAM39-Fees'], CLUBSIDE = ['GPp1-ClubSurvey', 'FAM36-Consent', 'FAM36w-ConsentBack', 'FAM37-FromCoach', 'FAM38-Concern', 'FAM40-ClubHome']
const ABOUT = ['How my child is treated', 'Another adult', 'Game time', 'Filming', 'Something else']
const TOPICS: [string, string][] = [['A reel is wrong', 'Wrong child, a missed moment'], ['Credits or a payment', 'A refund, a failed payment'], ['The free video', 'It says mine has been used'], ['A link from another parent', ''], ['Something else', '']]
const STATES = ['Victoria', 'New South Wales', 'Queensland', 'South Australia', 'Western Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory']
const RESTORED = 'Checked with your app store. Anything you paid for is back in your balance.'
/** Placeholder for legal review: clips of a child already shared with the team come down within this many days of consent being taken back. */
const CLIPS_DOWN_DAYS = 7
const BAR = '#e3ad2f'
/** The sample family's child in the academy's list: Ari Kovac, U9 Timber. */
const ARI_IN_ACADEMY = 57
// The academy's four core skills, five steps each: where the sample child was in week 1, and now. And the review chat's times.
const SKILLS: [string, number, number][] = [['First touch', 2, 4], ['Running with the ball', 3, 3], ['One against one', 2, 3], ['Striking the ball', 3, 3]]
/** One-on-ones (ADP6). The price and the 24 hours are placeholders to confirm. */
/** One-on-ones are on Friday afternoon and Saturday morning (pack v29). An empty name is the child's own coach (pack v40: Marcus for Ari). */
const ONES: [string, string, string][] = [['Friday 12 June', 'Dani', '4:30'], ['Saturday 13 June', '', '9:00'], ['Friday 19 June', 'Dani', '5:15']], ONE_PRICE = 90, ONE_CANCEL_HOURS = 24
const HEARD = ['A friend or another parent', 'My child’s club', 'Saw you at a ground or school', 'Searched online', 'Social media']
const WHY = ['Moving to a club’s own program', 'The cost', 'It clashes with something else', 'We’re moving away', 'I’d rather not say']
/** Placeholder to confirm: how long a paused place is held. */
const PAUSE_WEEKS = 4
// The academy home's progress band (homes v1): the two skills that have moved, week 1 and now.
const HOME_STEPS: [string, number, number][] = [['First touch', 2, 3], ['Running with the ball', 2, 3]]
const SLOTS: [string, string, string][] = [['Thursday 18 June', '5:30', 'Pitch-side'], ['Thursday 18 June', '5:40', 'Pitch-side'], ['Friday 19 June', '12:30', 'By phone']]
const RETIRED: Record<string, [string, string]> = { 'FAM3m-HomeStats': ['FAM3-Home', 'Stats are for every age now, so there is one Home, not one for under 12 and one for 12 and over.'], 'FAM8b-Results13': ['FAM8-Results', 'Stats are for every age now, so there is one results screen, not one for under 12 and one for 12 and over.'] }
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven']
const SAMPLE = 'A sample reel plays full screen: 48 seconds.'
const SHELVES: [string, [string, string][]][] = [['Just a ball', [['The drag-back', 'Clip'], ['Wall ball to 20', 'Game'], ['Toe taps and rolls', 'Game']]], ['Warm-ups that protect you', [['Five minutes at home', 'Warm-up'], ['Jump and land softly', 'Warm-up'], ['Hop and hold', 'Warm-up']]]]
const SEASON_MIN = 2005, SEASON_MAX = 2021
const Dot = ({ ok = true }: { ok?: boolean }) => <span style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, boxSizing: 'border-box', background: ok ? G : '#fff', border: ok ? 0 : `1.5px solid ${INK}`, color: ok ? '#fff' : INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={ok ? TICK : CROSS} size={13} w={3} /></span>
const Line = ({ a, b, ok = true, top = true }: { a: string; b?: string; ok?: boolean; top?: boolean }) => <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '9px 0', borderTop: top ? `1px solid ${LINE}` : 0 }}><Dot ok={ok} /><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{a}</strong>{b && <span style={{ fontSize: 14, lineHeight: '19px', color: MUT }}>{b}</span>}</span></div>
const Mark = () => <span style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}><strong style={{ fontSize: 21, letterSpacing: '-0.02em' }}>Clean Sheet</strong><span style={{ ...cap, opacity: 0.8 }}>FAMILY</span></span>
const TOUR: Clip[] = (['look', 'turn', 'pass', 'won'] as Kind[]).map((k, n) => ({ len: KINDS[k].len, title: KINDS[k].title, minute: `${ord([14, 22, 31, 40][n])} minute` }))

/** The film behind the splash, drawn, under a dark wash so the heading reads at the top. */
const BACKDROP = <div aria-hidden style={{ position: 'absolute', inset: 0 }}><svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}><rect width="160" height="90" fill="#24493c" /><rect y="38" width="160" height="52" fill="#3d7a5f" /><path d="M0 40h160" stroke="#fff" strokeWidth="0.6" opacity="0.55" /><path d="M96 40l28 50M40 40L4 90" stroke="#fff" strokeWidth="0.5" opacity="0.35" />
  {([[74, 34, 1.9, '#f4f5f3'], [96, 36, 2.1, '#f4f5f3'], [108, 33, 1.8, '#c9cecc'], [126, 38, 2.3, '#f4f5f3'], [84, 44, 2.7, '#c9cecc'], [38, 30, 5.7, '#10211f']] as [number, number, number, string][]).map(([x, y, r, c]) => <g key={x} fill={c} stroke="#10211f" strokeWidth="0.4"><circle cx={x} cy={y} r={r} /><rect x={x - r * 1.23} y={y + r * 1.15} width={r * 2.46} height={r * 3.55} rx={r * 0.95} /><path d={`M${x - r * 0.62} ${y + r * 4.7}v${r * 2.2}M${x + r * 0.62} ${y + r * 4.7}v${r * 2.2}`} strokeWidth={r * 0.42} strokeLinecap="round" /></g>)}
  <circle cx="103" cy="58" r="1.8" fill="#fff" stroke="#10211f" strokeWidth="0.4" /></svg><span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(16,33,31,0.80) 0%, rgba(16,33,31,0.90) 45%, rgba(16,33,31,0.98) 100%)' }} /></div>

/** The video behind an invited parent's first page: a pitch, a ringed player and a dashed run, close up, under the same wash. */
const BACKPITCH = <div aria-hidden style={{ position: 'absolute', inset: 0 }}><svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}><rect width="390" height="844" fill="#3d7a5f" /><g fill="none" stroke="#fff" strokeWidth="6" opacity="0.7"><path d="M0 66h390M195 66v712" /><circle cx="195" cy="420" r="96" /></g><path d="M8 262l190-66" stroke="#fff" strokeWidth="9" strokeDasharray="26 22" opacity="0.8" /><circle cx="100" cy="226" r="24" fill="#f4f5f3" stroke="#10211f" strokeWidth="5" /><circle cx="362" cy="282" r="24" fill="#10211f" /><circle cx="6" cy="376" r="24" fill="#10211f" /><circle cx="232" cy="486" r="24" fill="#10211f" /></svg><span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(16,33,31,0.55) 0%, rgba(16,33,31,0.86) 42%, rgba(16,33,31,0.98) 100%)' }} /></div>

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
  if (s.paused) return 'FAM41-ClubPaused'   // the club's plan has ended: said once
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
  if (s.balance < price) return o === 'good' && s.withheld && !s.freeUsed && !s.videos.length ? 'FAM5u-FreeUsed' : 'FAM5n-NotEnough'   // a new family whose free video is not available sees the normal price
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
  const [sure, setSure] = useState<{ text: string; no: string; yes: string; on: () => void } | null>(null)   // a question asked before something that cannot be undone
  const [draft, setDraft] = useState(''), [anns, setAnns] = useState(false), [about, setAbout] = useState(0), [story, setStory] = useState('')
  const [ed, setEd] = useState<{ id: string; name: string; year: string } | null>(null), [st, setSt] = useState(STATES[0])
  const [sv, setSv] = useState<number[]>(() => start === 'GPp1-ClubSurvey' ? [5, 4, 4, 4, 2] : [0, 0, 0, 0, 0]), [tm, setTm] = useState<{ name: string; who: string; at: string } | null>(null)
  const [rq, setRq] = useState({ club: '', date: '', email: '', note: '' })
  const [all, setAll] = useState(''), [editing, setEditing] = useState(false), [adding, setAdding] = useState(false), [newName, setNewName] = useState('')
  const [q, setQ] = useState(start === 'FAM2c-PickClub' ? 'Hillv' : ''), [lost, setLost] = useState<{ name: string; place: string } | null>(null)
  const [extra, setExtra] = useState<{ name: string; year: string } | null>(null)   // a child being added from the account
  const [tick, setTick] = useState<{ id: string; n: number }>({ id: '', n: 0 }), [up, setUp] = useState(34)
  const [short] = useState(() => window.innerHeight < 780)   // a shorter phone, or a browser with its bars: the splash tightens so its button stays in view
  const [len, setLen] = useState<number | null>(null)   // the sample video's length, while its slider is being dragged
  const [who, setWho] = useState(0)   // which waiting family the uploader is looking at
  const [ask, setAsk] = useState(() => start === 'FAMi2-InviteTap' || start === 'FAMi3-InviteWaiting' ? { name: ASKERS[0].child, year: String(ASKERS[0].year), shirt: ASKERS[0].shirt, account: ASKERS[0].account } : { name: '', year: '', shirt: '', account: '' })   // what an invited parent has tapped and typed
  const [at, setAt] = useState(36 * 60 + 40), [what, setWhat] = useState('A goal'), [stopped, setStopped] = useState(false)
  const say = (m: string) => { keep(m); setToast(m); setTimeout(() => { if (said === m) keep(null); setToast(t => t === m ? null : t) }, 3600) }
  const he = kid.he ? 'he' : 'she', him = kid.he ? 'him' : 'her', his = kid.he ? 'his' : 'her', age = ageOf(kid.year)
  // With an academy, the child is one of the players in the academy's own list (programs v2): the sample family's Ari is Ari Kovac in U9 Timber.
  // What the family sees (the coach, the price, sessions been to, the steps) is counted from that list, and the Term 3 answer is written back to it.
  const ac = useAcademy(), ap = f.club?.academy && kid.name === 'Ari' ? playerOf(ac, ARI_IN_ACADEMY) : undefined, ag = ap ? groupOf(ac, ap.group) : undefined
  const coach = f.club?.academy ? ag?.coach.split(' ')[0] ?? 'Reece' : STAFF.coach
  const fee = ag?.price ?? ac.price_this_term.Development, been = ap ? cameOf(ap) : { came: 12, of: 14 }
  // "Mon to Thu · 5:30 to 6:25" in the list: the days and the start, for the pages that say when training is.
  const days = ag?.when.split(' · ')[0] ?? 'Mon to Thu', trainAt = ag?.when.split(' · ')[1]?.split(' to ')[0] ?? '5:30'
  const steps: [string, number, number][] = ap ? ac.skills.map((t, k) => [t, ap.skills_then[k], ap.skills_now[k]]) : SKILLS
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
    if (LEARNS.includes(to) || (/^ECp/.test(to) && !s.joined)) to = s.joined ? 'FAM17u-LearnWithClub' : 'FAM17-Learn'
    if (['FAM8-Results', 'FAM20-GameStats', 'FAM21-StatClips'].includes(to)) {
      const v = s.videos.find(x => x.id === s.open && x.kid === k.id && x.clips.length) ?? s.videos.find(x => x.kid === k.id && x.state === 'ready')
      if (!v) { say('No reels yet. Add a video from Home.'); return }
      if (v.id !== s.open) setFamily({ open: v.id, clip: 0, from: 'reel' })
      if (v.state === 'few') to = 'FAM8x-TooFew'
      else if (!v.stats) to = 'FAM8-Results'
    }
    if (to === 'FAM30-TeamLocked' || TEAMS.includes(to)) to = !s.joined ? 'FAM30-TeamLocked' : to === 'FAM30-TeamLocked' ? 'FAM31-Team' : to
    if (CLUBSIDE.includes(to) && !s.joined) to = 'FAM11-Locked'
    if (to === 'FAM11-Locked' && s.joined) to = s.toldJoined ? 'FAM40-ClubHome' : 'FAM13-ClubJoined'
    if (/^ADP\d/.test(to) && !(s.joined && s.club?.academy)) to = s.joined ? 'FAM40-ClubHome' : 'FAM11-Locked'
    if (to === 'FAM40-ClubHome' && s.club?.academy) to = 'ADP1-AcademyHome'   // the Club tab, when the child's club is an academy
    if (s.picking && to !== 'FAM18-Reels') setFamily({ picking: false })
    if (to === 'FAM5-Check') { to = s.freeUsed || (s.withheld && s.kids[0]?.number) ? checkOf(s) : 'FAM2-AddChild'
      // a later video uploads before the check can read it. The first one uploads while the parent says who to look for (FAM2). The phone's own check, and a game the club filmed, come before any upload.
      if (!['FAM2-AddChild', 'FAM5p-PhoneCheck', 'FAM5c-ClubFilmedThis'].includes(to)) { setFamily({ upload: { pct: 0, paused: false } }); to = 'FAM7u-Uploading' } }
    if (to === 'STA3-PickRole') { if (onNav) onNav(to); else openScreen(to); return }
    setView(to); top()
  }
  /** A page off to the side (the account, tips, credits): Back returns to where the parent was. */
  const side = (id: string) => { if (!['FAM19-Account', 'FAM15-Children', 'FAM16-Privacy', 'FAM4-BeforeYouFilm', 'FAM6-Credits', 'FAM10-ShareFamily', 'FAM23-InviteTeam', 'FAM23e-InviteTeamFirst', 'FAM23a-InviteConfirm'].includes(view)) setRet(view); setView(id); top() }
  const back = () => go(ret && ret !== view ? ret : 'FAM3-Home')
  const openVideo = (v: Video) => { setFamily({ open: v.id, clip: 0, from: 'reel', ...(v.state === 'working' ? { working: v.id } : v.state === 'unread' ? { film: v.film ?? 'bad', anyway: true, held: null } : {}) }); if (v.state === 'working') { setView('FAM7-Working'); top() } else if (v.state === 'unread') { setView('FAM5x-CantRead'); top() } else go('FAM8-Results') }
  const hop = (id: string) => () => { setView(id); top() }
  const help = (topic: number, from = 'FAM19-Account') => { setFamily({ topic }); setRet(from); setView('FAM24-Help'); top() }
  const rsvp = (id: string, yes: boolean) => setFamily(x => ({ rsvp: { ...x.rsvp, [id]: yes } }))
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
  const land = (id: string) => { const r = finish(id), kept = familyNow().videos.find(x => x.id === id)?.clips.length; move.current(r.made ? 'FAM8r-Reveal' : kept ? 'FAM8x-TooFew' : 'FAM3-Home'); top(); if (!r.made && !kept) setToast(`We could not find a moment in that one, so your ${r.back} credits are back.`) }
  const landed = useRef(land); useEffect(() => { landed.current = land })
  useEffect(() => {
    if (view !== 'FAM7-Working' || !wid) return
    const count = { n: begun }
    const id = setInterval(() => { count.n += 1; const n = count.n; setTick({ id: wid, n }); if (n < 6) return
      clearInterval(id); landed.current(wid) }, 1000)
    return () => clearInterval(id)
  }, [view, wid, begun])
  // a later video uploads, then the check reads it. In the demo the upload takes a few seconds; the board stays as it is drawn.
  const pct = f.upload?.pct ?? 0, held = !!f.upload?.paused, still = start === 'FAM7u-Uploading'
  useEffect(() => {
    if (view !== 'FAM7u-Uploading' || held || still) return
    const id = setTimeout(() => { if (pct >= 100) { move.current(checkOf(familyNow())); top() } else setFamily({ upload: { pct: Math.min(100, pct + 4), paused: false } }) }, 170)
    return () => clearTimeout(id)
  }, [view, pct, held, still])
  // the upload carries on while the parent says who to look for
  useEffect(() => { if (view !== 'FAM2-AddChild') return; const id = setInterval(() => setUp(u => Math.min(100, u + 3)), 450); return () => clearInterval(id) }, [view])

  // ── an item from the Education centre's library for families: Clean Sheet's own, no coach, no club clips ──
  if ((view === 'ECp1-FamilyLibrary' || view === 'ECp2-FamilyItem') && f.joined) return <EducationPhone key={view + item} start={view} show={view === 'ECp2-FamilyItem' ? item : undefined} child={name} own={{ age, home: view === 'ECp1-FamilyLibrary' ? 'FAM3-Home' : 'FAM17u-LearnWithClub' }} onNav={go} />

  // ── the pieces every page shares ──
  const overlays = <>
    {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 132, transform: 'translateX(-50%)', width: 'max-content', maxWidth: 'min(350px, calc(100vw - 32px))', zIndex: 60, pointerEvents: 'none', boxSizing: 'border-box', padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    {sure && <div role="dialog" aria-label={sure.yes} style={{ position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(16,33,31,0.45)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 430, boxSizing: 'border-box', background: '#fff', color: INK, borderRadius: '18px 18px 0 0', padding: '18px 16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <strong style={{ fontSize: 18, lineHeight: '24px' }}>{sure.text}</strong>
        <div style={{ display: 'flex', gap: 10 }}><button onClick={() => setSure(null)} style={btn(false)}>{sure.no}</button><button onClick={() => { const on = sure.on; setSure(null); on() }} style={btn(true)}>{sure.yes}</button></div>
      </div>
    </div>}
    {sheet && <div role="dialog" aria-label={sheet === 'delete' ? 'Delete everything' : 'Close my account'} style={{ position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(16,33,31,0.45)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 430, boxSizing: 'border-box', background: '#fff', color: INK, borderRadius: '18px 18px 0 0', padding: '18px 16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <strong style={{ fontSize: 18, lineHeight: '24px' }}>{sheet === 'delete' ? 'Delete all games, clips and your child’s details? This cannot be undone.' : 'Unused credits are refunded when you close your account.'}</strong>
        <div style={{ display: 'flex', gap: 10 }}><button onClick={() => setSheet(null)} style={btn(false)}>Keep it</button><button onClick={() => { const b = f.balance, was = sheet; setSheet(null); setFamily(freshFamily()); setView('FAM1-Welcome'); say(was === 'delete' ? 'Everything is deleted.' : `Account closed. ${b} unused credits are refunded.`) }} style={btn(true)}>{sheet === 'delete' ? 'Delete everything' : 'Close my account'}</button></div>
      </div>
    </div>}
  </>
  const avatar = <button aria-label="Your account" onClick={() => side('FAM19-Account')} style={{ ...round, border: 0, background: '#cbbeb5', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>DB</button>
  // Chat is one tap from anywhere once the club has joined (v18): a button in every green header, with a white count of what is unread. It clears when the chat is opened. Not shown before the club joins.
  const unread = f.joined && !f.chatSeen && view !== 'FAM32-TeamChat' ? 2 : 0
  const chat = f.joined && <button aria-label={unread ? `Team chat, ${unread} new` : 'Team chat'} onClick={() => { setFamily({ chatSeen: true }); setView('FAM32-TeamChat'); top() }} style={{ ...round, position: 'relative', border: 0, background: 'transparent', color: '#fff', cursor: 'pointer' }}><I d="M4 5h16v11H9l-5 4z" size={24} />{unread > 0 && <span style={{ position: 'absolute', top: 2, right: 0, minWidth: 18, height: 18, padding: '0 4px', boxSizing: 'border-box', borderRadius: 999, background: '#fff', color: NIGHT, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>}</button>
  const arrow = (to: () => void, color = '#fff') => <button aria-label="Back" onClick={to} style={{ ...round, border: 0, background: 'transparent', color, marginLeft: -10, cursor: 'pointer' }}><I d={BACK} w={2.4} /></button>
  const head = (over: string, title: string, to?: string | (() => void)) => (
    <div style={{ flex: 'none', padding: '12px 18px', background: G, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
      {to && arrow(typeof to === 'string' ? () => go(to) : to)}
      <span style={{ flexGrow: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 13, color: MINT }}>{over}</span><strong style={{ fontSize: 22, lineHeight: '27px', letterSpacing: '-0.01em' }}>{title}</strong></span>{chat}{avatar}
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
  const tell = (on: boolean | 'club', to = 'FAM12-TellClub') => <button onClick={() => { setFamily(x => ({ seasonDue: null, seasonTold: [...new Set([...x.seasonTold, kid.id])] })); setView(to); top() }} style={big(on)}>Tell my club{count && <span style={{ fontSize: 13, fontWeight: 500 }}>{families} families at {club} already use this</span>}</button>
  const demo = (label: string, body: ReactNode) => <section aria-label={`Demo: ${label}`} style={{ borderRadius: 14, border: `1px dashed ${MUT}`, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>DEMO · {label.toUpperCase()}</span>{body}</section>
  const group = (rows: [string, string, string, () => void][]) => <section style={{ ...card, gap: 0, padding: '2px 14px' }}>{rows.map(([a, b, v, on], n) => <button key={a} onClick={on} style={{ ...row, borderTop: n ? `1px solid ${HAIR}` : 0 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{a}</strong>{b && <span style={{ fontSize: 14, color: MUT }}>{b}</span>}</span>{v && <span style={{ fontSize: 15, color: MUT }}>{v}</span>}<I d={CHEV} size={16} /></button>)}</section>

  const listed = (heading: string, rows: [string, string, string, () => void][]) => <section style={{ ...card, gap: 0, padding: '12px 14px 2px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>{heading}</strong>{rows.map(([a, b, v, on]) => <button key={a} onClick={on} style={{ ...row, borderTop: `1px solid ${HAIR}` }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{a}</strong>{b && <span style={{ fontSize: 14, color: MUT }}>{b}</span>}</span>{v && <span style={{ fontSize: 15, color: MUT }}>{v}</span>}<I d={CHEV} size={16} /></button>)}</section>
  const field: React.CSSProperties = { width: '100%', boxSizing: 'border-box', minHeight: 50, padding: '0 12px', borderRadius: 10, border: `1px solid ${MUT}`, background: '#fff', fontFamily: 'inherit', fontSize: 17, color: INK }
  const area: React.CSSProperties = { ...field, padding: 12, lineHeight: '23px', resize: 'vertical' }
  const labelled = (l: string, node: ReactNode, hint?: string) => <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontSize: 14 }}>{l}</strong>{node}{hint && <span style={{ fontSize: 13, color: MUT }}>{hint}</span>}</label>
  const toggle = (a: string, b: string, on: boolean, set: () => void, first = false) => <button key={a} role="switch" aria-checked={on} onClick={set} style={{ ...row, minHeight: 60, borderTop: first ? 0 : `1px solid ${HAIR}` }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{a}</strong><span style={{ fontSize: 14, color: MUT }}>{b}</span></span>
    <span aria-hidden style={{ flex: 'none', position: 'relative', width: 48, height: 28, borderRadius: 999, background: on ? G : GREY }}><span style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 22, height: 22, borderRadius: 999, background: '#fff' }} /></span></button>
  const badge = (icon: string) => <span style={{ width: 64, height: 64, borderRadius: 999, background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={icon} size={28} w={2.3} /></span>
  const quiet: React.CSSProperties = { ...link, minHeight: 48, fontSize: 15, alignSelf: 'center' }
  const small: React.CSSProperties = { ...btn(false), minHeight: 44, fontSize: 14 }
  const dark = (over: string, t: string, line?: string) => <section style={{ borderRadius: 16, background: DEEP, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ ...cap, color: SOFT }}>{over}</span><strong style={{ fontSize: 20, lineHeight: '26px' }}>{t}</strong>{line && <span style={{ fontSize: 14, lineHeight: '20px', color: MINT }}>{line}</span>}</section>
  const squad = ag ? `${ag.name} · ${club}` : `U${age < 12 ? age : age + 1} ${coach} · ${club}`   // with an academy, the team's own name

  /** What comes back from one video, as a white card: three sample numbers and sample clips. Sample figures, not a child's: dark ink on pale green, never amber. */
  const comesBack = (label: string, clips: number, foot?: ReactNode) => <div style={{ borderRadius: 20, background: '#fff', color: INK, padding: foot ? '12px 14px 4px' : '12px 14px 6px', display: 'flex', flexDirection: 'column', boxShadow: '0 14px 34px rgba(0,0,0,0.35)' }}>
    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT, paddingBottom: 8 }}>{label}</span>
    <div style={{ display: 'flex', gap: 8 }}>{[['41', 'times on the ball'], ['27', 'passes to a team-mate'], SHOW_XG ? ['0.9', 'xG from 3 shots'] : ['3', 'shots, 1 goal']].map(([n, w]) => <span key={w} style={{ flex: 1, minWidth: 0, borderRadius: 12, background: PALE, padding: '8px 10px 9px', display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 28, lineHeight: '32px', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{n}</strong><span style={{ fontSize: 12, lineHeight: '15px', color: '#2d3d3a' }}>{w}</span></span>)}</div>
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
      {TOUR.slice(0, clips).map((c, k) => <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, borderBottom: foot || k < clips - 1 ? `1px solid ${LINE}` : 0 }}><span style={{ flex: 'none', width: 76 }}><Thumb kind="team" len={c.len} wide /></span><span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: MUT }}>{c.minute.toUpperCase()}</span><strong style={{ fontSize: 14, lineHeight: '18px' }}>{c.title}</strong></span></div>)}
      {foot}</div></div>

  let v = HOMES.includes(view) ? homeOf(f) : view
  if (LEARNS.includes(v) || /^ECp/.test(v)) v = f.joined ? 'FAM17u-LearnWithClub' : 'FAM17-Learn'   // nothing links to Learn content before the club joins
  if (v === 'FAM7-Working' && !working) v = homeOf(f)
  if (v === 'FAM41-ClubPaused' && !f.paused) v = homeOf(f)
  if (v === 'FAM30-TeamLocked' || TEAMS.includes(v)) v = !f.joined ? 'FAM30-TeamLocked' : v === 'FAM30-TeamLocked' ? 'FAM31-Team' : v
  if (CLUBSIDE.includes(v) && !f.joined) v = 'FAM11-Locked'
  if (v === 'FAM11-Locked' && f.joined) v = f.toldJoined ? 'FAM40-ClubHome' : 'FAM13-ClubJoined'
  if (/^ADP\d/.test(v) && !(f.joined && f.club?.academy)) v = f.joined ? 'FAM40-ClubHome' : 'FAM11-Locked'
  if (v === 'FAM40-ClubHome' && f.club?.academy) v = 'ADP1-AcademyHome'
  if (v === 'FAM36w-ConsentBack' && !CONSENT_BACK) v = 'FAM36-Consent'
  if (v === 'FAM18d-DeleteVideo' && !video) v = 'FAM18-Reels'
  if ((['FAM8-Results', 'FAM20-GameStats', 'FAM21-StatClips', 'FAM9-Clip', 'FAM9a-AddMoment', 'FAM8x-TooFew', 'FAM10-ShareFamily', 'FAM8r-Reveal'].includes(v) || /^FAM23|^FAMi\d/.test(v)) && !video?.clips.length) v = homeOf(f)
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
      <div style={{ flex: 'none', marginTop: short ? 12 : 18 }}>{comesBack('WHAT COMES BACK FROM ONE VIDEO', short ? 1 : 2, <button onClick={() => say(SAMPLE)} style={{ ...link, minHeight: 44, display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left' }}><span style={{ flex: 'none', width: 28, height: 28, borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={PLAY} size={13} w={2.6} /></span>Watch the sample reel · 0:48</button>)}</div>
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

  // ── FAMt1 to FAMt3 · the walkthrough: what to do, and what you get. Then FAMt4 (Booker, 20 Nov; not in the pack): what a club joining would add ──
  if (/^FAMt\d/.test(v)) { const n = Number(v[4]), end = () => { setView('FAM3e-HomeEmpty'); top() }
    const [label, h, t, ticks] = ([
      ['STEP 1 OF 3 · FILM', 'Just press record.', 'Hold your phone sideways near halfway, or set up a camera that follows the play. One take per half is plenty.', ['No kit to buy. Any phone will do', 'A game, training or the park', 'Only film where you’re allowed to']],
      ['STEP 2 OF 3 · UPLOAD', 'One tap, and your part is done.', 'Upload the video and tap your child once. We follow their shirt through the whole game, never their face.', ['No tagging, no editing, no scrubbing', 'Upload carries on if you leave the app', 'Every other child is blurred']],
      ['STEP 3 OF 3 · ENJOY', 'Their best moments and their numbers.', `About 20 minutes later: a reel to keep, and game stats like passes and ${SHOW_XG ? 'xG' : 'shots'}. Each number opens its clips.`, ['Your first video is free. No card needed', 'Private to your family, always', 'Share the reel with up to six family']],
      ['WITH YOUR CLUB', 'Better still with your club.', 'It works with any club today. If yours joins Clean Sheet, you get more, and we tell you when it does.', []],
    ] as [string, string, string, string[]][])[n - 1]
    return plain(v, true, <><Mark /><button onClick={end} style={{ ...under, color: '#fff', fontSize: 15 }}>Skip</button></>, <>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px 0' }}>
        {n === 1 && <div role="img" aria-label="A phone held sideways, filming a game" style={{ position: 'relative', margin: '0 16px', borderRadius: 26, border: '5px solid #fff', overflow: 'hidden', transform: 'rotate(-4deg)', boxShadow: '0 14px 30px rgba(0,0,0,0.4)' }}><Thumb kind="figure" len="" wide /><span style={{ position: 'absolute', left: 12, top: 12, padding: '4px 10px', borderRadius: 999, background: NIGHT, color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: '#fff' }} />REC 23:10</span></div>}
        {n === 2 && <div role="img" aria-label={`A frame of the video, with ${name} tapped`} style={{ margin: '0 12px' }}><Pitch picked="7" tag={`That’s ${name}`} h={short ? 170 : 210} /></div>}
        {n === 3 && <div role="img" aria-label="A reel with two of its moments, and three game numbers">{comesBack(`${name.toUpperCase()} V RIDGEWAY · READY`, short ? 1 : 2)}</div>}
        {n === 4 && <div style={{ borderRadius: 18, background: '#fff', color: INK, padding: '6px 16px', display: 'flex', flexDirection: 'column', boxShadow: '0 14px 30px rgba(0,0,0,0.4)' }}><Line top={false} a="Club games are free" b="Filmed by the club. Nothing for you to film, no credits" /><Line a="Every game, filmed for you" b="Nothing to set up or upload" /><Line a="Your own filming at half the credits" b="For what the club doesn’t film" /><Line a="The coach is part of it" b="A goal for the season and a clip to try at home" /></div>}
      </div>
      <span style={{ flex: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER }}>{label}</span>
      {title(h, short ? 26 : 30)}<p style={{ flex: 'none', margin: 0, fontSize: 15.5, lineHeight: '22px', color: '#dfe7e3' }}>{t}</p>
      {ticks.length > 0 && <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 7, paddingTop: 2 }}>{ticks.map(x => <span key={x} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, lineHeight: '19px' }}><span style={{ flex: 'none', width: 20, height: 20, borderRadius: 999, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={TICK} size={11} w={3} /></span>{x}</span>)}</div>}
      {n < 4 && <div role="img" aria-label={`Step ${n} of 3`} style={{ flex: 'none', display: 'flex', gap: 6, justifyContent: 'center', paddingTop: 6 }}>{[1, 2, 3].map(k => <span key={k} style={{ width: k === n ? 22 : 7, height: 7, borderRadius: 999, background: k === n ? AMBER : 'rgba(255,255,255,0.4)' }} />)}</div>}
    </>, n < 4 ? <button onClick={() => { setView(`FAMt${n + 1}-Tour`); top() }} style={big(true)}>Next</button> : <button onClick={end} style={big(true)}>Upload my first video<span style={{ fontSize: 13, fontWeight: 500 }}>Free</span></button>) }

  // ── FAM3e · one job: upload a video ──
  if (v === 'FAM3e-HomeEmpty') return plain('FAM3e-HomeEmpty', false, <><Mark />{avatar}</>, <>
    {title(`Hi ${f.parent}. Got some football on film?`, 30)}
    <button onClick={() => { setFamily({ film: 'f50', part: 0, both: false, anyway: false, held: null }); setUp(34); setExtra(null); go('FAM5-Check') }} style={{ minHeight: 300, marginTop: 6, borderRadius: 26, border: `2px dashed ${INK}`, background: TINTS[0], color: INK, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      <span style={{ width: 84, height: 84, borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}><I d={PLUS} size={34} w={2.4} /></span>
      <strong style={{ fontSize: 24, letterSpacing: '-0.02em' }}>{f.freeUsed ? 'Add a video' : 'Upload a video'}</strong><span style={{ fontSize: 15, color: MUT }}>From your phone or your camera</span>
      {freeLeft(f) && <span style={{ marginTop: 6, padding: '6px 14px', borderRadius: 999, background: AMBER, color: INK, fontSize: 14, fontWeight: 700 }}>Your first one is free</span>}</button>
    <span style={note}>Only film where you’re allowed to. Other children are blurred before anything is saved.</span>
  </>, <div style={{ display: 'flex', gap: 26, justifyContent: 'center' }}><button onClick={() => side('FAM4-BeforeYouFilm')} style={{ ...link, fontSize: 15 }}>Filming tips</button><button onClick={() => say(SAMPLE)} style={{ ...link, fontSize: 15 }}>Watch a sample reel</button></div>)

  // ── FAM2c · pick the club from the list ──
  if (v === 'FAM2c-PickClub') { const hits = CLUBS.filter(c => c.name.toLowerCase().includes(q.trim().toLowerCase())), done = () => { const s = familyNow(); if (s.edit && s.joined && !JOINABLE.includes(s.club?.name ?? '')) setFamily({ joined: false, toldJoined: false }); setView(s.edit ? 'FAM15c-EditChild' : 'FAM2-AddChild'); top() }
    return shell('FAM2c-PickClub', head('Who are we looking for?', `${name}’s club`, done), <>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, height: 54, padding: '0 6px 0 14px', borderRadius: 14, border: `2px solid ${INK}`, background: '#fff' }}><svg width="18" height="18" viewBox="0 0 24 24" {...svg}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
        <input aria-label="Search for a club" value={q} onChange={e => setQ(e.target.value)} style={{ flexGrow: 1, minWidth: 0, height: 44, border: 0, outline: 0, background: 'none', fontFamily: 'inherit', fontSize: 17, color: INK }} />
        <button aria-label="Clear" onClick={() => { setQ(''); say('Search cleared.') }} style={{ ...round, border: 0, background: 'none', color: MUT, cursor: 'pointer' }}><I d={CROSS} size={16} /></button></label>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><span style={{ ...cap, color: MUT, paddingBottom: 4 }}>CLUBS NEAR YOU FIRST</span>
        <div role="radiogroup" aria-label="Clubs" style={{ display: 'flex', flexDirection: 'column' }}>{hits.map(c => { const on = f.club?.name === c.name; return <button key={c.name} role="radio" aria-checked={on} onClick={() => { setFamily({ club: { name: c.name, place: c.place, uses: c.uses, academy: c.academy } }); done(); if (c.uses) say(`${c.name} already uses Clean Sheet, so its games are free for you. Ask the club for your invitation.`) }} style={{ ...row, borderTop: `1px solid ${HAIR}` }}>
          <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>{c.name}</strong><span style={{ fontSize: 14, color: MUT }}>{[c.place, c.far, c.sort, c.uses ? 'uses Clean Sheet' : ''].filter(Boolean).join(' · ')}</span></span>{on && <Dot />}</button> })}
          {!hits.length && <span style={{ fontSize: 14, color: MUT, padding: '12px 0', borderTop: `1px solid ${HAIR}` }}>No club by that name in the list.</span>}</div></section>
      <section style={{ ...card, gap: 0, padding: '2px 14px' }}>
        <button onClick={() => { setLost(lost ?? { name: q, place: '' }); setView('FAM2n-ClubNotListed'); top() }} style={row}><strong style={{ flexGrow: 1, fontSize: 16 }}>I can’t find it</strong><I d={CHEV} size={16} /></button>
        <button onClick={() => { setFamily({ club: null }); done() }} style={{ ...row, borderTop: `1px solid ${HAIR}` }}><strong style={{ flexGrow: 1, fontSize: 16 }}>{name} isn’t at a club</strong><I d={CHEV} size={16} /></button></section>
      <span style={note}>Picking from the list means we can tell you when your club joins, and how many families there already use this. We contact the club only if you ask us to, and never tell it who else uses this.</span>
    </>, null) }

  // ── FAM2n · a club that is not in the list: its name and suburb. It is checked and added; the video is not held up ──
  if (v === 'FAM2n-ClubNotListed') { const l = lost ?? { name: '', place: '' }, away = hop('FAM2c-PickClub')
    const add = () => { if (!l.name.trim() || !l.place.trim()) { say('Add the club’s name and its suburb.'); return } setFamily({ club: { name: l.name.trim(), place: `${l.place.trim()}, ${st}`, unmatched: true } }); setLost(null); setView(f.edit ? 'FAM15c-EditChild' : 'FAM2-AddChild'); top(); say(`${l.name.trim()}: we will check it and add it to the list.`) }
    return shell(v, head('Who are we looking for?', 'Add your club', away), <>
      <section style={{ ...card, gap: 12 }}>
        {labelled('Club name', <input placeholder="Tap to type" value={l.name} onChange={e => setLost({ ...l, name: e.target.value })} style={field} />)}
        {labelled('Suburb or town', <input placeholder="Tap to type" value={l.place} onChange={e => setLost({ ...l, place: e.target.value })} style={field} />)}
        {labelled('State', <select value={st} onChange={e => setSt(e.target.value)} style={field}>{STATES.map(x => <option key={x}>{x}</option>)}</select>)}</section>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="We check it and add it" b="Usually within a day" /><Line a="Your video goes ahead now" b="You don’t have to wait" /><Line a="Other families will find it in the list" /></section>
      <span style={note}>We use the club only to count how many families from it use Clean Sheet. We contact the club only if you ask us to.</span>
    </>, null, actions(false, <button key="a" onClick={away} style={btn(false)}>Back</button>, <button key="b" onClick={add} style={btn(true)}>Add my club</button>)) }

  // ── FAM2 · who are we looking for (and, from the account, another child) ──
  if (v === 'FAM2-AddChild') {
    const fm = film(f.film), field = (l: string, value: string, set: (x: string) => void, numeric = false) => <label style={{ flex: numeric ? 0.75 : 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontSize: 14 }}>{l}</strong><input value={value} inputMode={numeric ? 'numeric' : 'text'} onChange={e => set(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', height: 50, padding: '0 12px', borderRadius: 10, border: `1px solid ${MUT}`, background: '#fff', fontFamily: 'inherit', fontSize: 17, color: INK }} /></label>
    const edit = (p: Partial<typeof kid>) => setFamily(s => ({ kids: s.kids.map(x => x.id === kid.id ? { ...x, ...p } : x) }))
    const nm = extra ? extra.name : kid.name, yr = extra ? Number(extra.year) : kid.year, ok = nm.trim().length > 0 && yr >= SEASON_MIN && yr <= SEASON_MAX, call = nm.trim() || 'your child'
    const form = <section style={{ ...card, gap: 10 }}>
      <div style={{ display: 'flex', gap: 10 }}>{field('First name', nm, x => extra ? setExtra({ ...extra, name: x.split(' ')[0] }) : edit({ name: x.split(' ')[0] }))}{field('Year born', extra ? extra.year : String(kid.year || ''), x => { const y = x.replace(/\D/g, '').slice(0, 4); if (extra) setExtra({ ...extra, year: y }); else edit({ year: Number(y) }) }, true)}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontSize: 14 }}>Their club</strong>
        <button onClick={() => { setFamily({ edit: null }); setView('FAM2c-PickClub'); top() }} style={{ ...row, minHeight: 64, padding: '8px 12px', boxSizing: 'border-box', borderRadius: 12, border: `1px solid ${MUT}` }}>{f.club && <Dot />}<span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>{f.club?.name ?? `${call} isn’t at a club`}</strong>{f.club && <span style={{ fontSize: 13, color: MUT }}>{f.club.place}{f.club.unmatched ? ' · being checked' : ''}</span>}</span><span style={{ ...link, minHeight: 0 }}>Change</span></button>
        <span style={{ fontSize: 13, color: MUT }}>Picked from the list of clubs. We contact the club only if you ask us to</span></div></section>
    const about = <span style={note}>First name, birth year and club are all we keep about {call}. You get clips and game stats, whatever their age.</span>
    const missing = () => say('Add a first name and the year they were born.')
    if (extra) return shell('FAM2-AddChild', head('Your children', 'Add a child', () => { setExtra(null); setView('FAM15-Children'); top() }), <>{form}{about}</>, null,
      actions(false, <button key="a" onClick={() => { if (!ok) { missing(); return } const id = `k${f.kids.length}${nm.trim().toLowerCase()}`; setFamily(s => ({ kids: [...s.kids, { id, name: nm.trim(), year: yr, he: true, colour: '', number: '' }] })); setExtra(null); setView('FAM15-Children'); top(); say(`${nm.trim()} is added.`) }} style={btn(true)}>Add {call}</button>))
    return shell('FAM2-AddChild', head(`Sunday · ${fm.minutes} minutes`, 'Who are we looking for?', 'FAM3e-HomeEmpty'), <>
      <div role="status" aria-label="Upload" style={{ borderRadius: 12, background: PALE, padding: '8px 12px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><strong>{up < 100 ? `Uploading · ${up}%` : 'Uploaded'}</strong><span>Carries on if you leave</span></span><span style={{ height: 5, borderRadius: 999, background: '#d5e2dc', overflow: 'hidden' }}><span style={{ display: 'block', width: `${up}%`, height: '100%', background: G }} /></span></div>
      <Pitch picked={kid.number} onPick={n => { edit({ number: n, colour: 'red' }); say(`Red ${n} picked. We follow that shirt for the whole video.`) }} label={<span style={pill}>Tap your child{kid.number ? ` · ${kid.colour || 'red'} ${kid.number} picked` : ''}</span>} />
      {form}{about}
    </>, null, actions(false, <button key="a" onClick={() => { if (!ok) { missing(); return } if (!kid.number) { say('Tap your child in the picture first.'); return } setView(f.withheld ? 'FAM5u-FreeUsed' : 'FAM5f-CheckFree'); top() }} style={btn(true)}>Find {call}’s moments</button>))
  }

  // ── FAM5f · the first video: the check passes and it is free ──
  if (v === 'FAM5f-CheckFree') { const fm = film(f.film)
    return plain('FAM5f-CheckFree', false, arrow(() => { setView('FAM2-AddChild'); top() }, INK), <>
      <span style={{ width: 64, height: 64, borderRadius: 999, background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={TICK} size={28} w={2.6} /></span>
      {title('We can read this one.', 30)}<span style={{ fontSize: 17, lineHeight: '25px' }}>We can follow the play for {fm.readable} of {fm.minutes} minutes, and {name} is in shot for about {fm.inShot}. Enough for about {fm.moments} moments.</span>
      <section style={{ ...card, flexDirection: 'row', alignItems: 'center', marginTop: 6 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>Your first video</strong><span style={{ fontSize: 13, color: MUT }}>Usually {priceOf(fm, false)} credits</span></span><strong style={{ fontSize: 22, padding: '2px 14px', borderRadius: 999, background: AMBER }}>Free</strong></section>
      {demo('the free video', <button onClick={() => { setFamily({ withheld: true, offered: true }); setView('FAM5u-FreeUsed'); top() }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>This phone has already had its free video</button>)}
    </>, <button onClick={() => { spend(fm.id, 0, true); setView('FAM7-Working'); top() }} style={big(false)}>Find {name}’s moments<span style={{ fontSize: 13, fontWeight: 500 }}>About 20 minutes</span></button>) }

  // ── FAM5u · the check passes, but the free video is not this family's to use. Nobody is accused: they see the normal price, and a person can put it right ──
  if (v === 'FAM5u-FreeUsed') { const fm = film(f.film), price = priceOf(fm, false), p = PACKS[0]
    return plain('FAM5u-FreeUsed', false, arrow(() => { setView('FAM2-AddChild'); top() }, INK), <>
      <span style={{ width: 64, height: 64, borderRadius: 999, background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={TICK} size={28} w={2.6} /></span>
      {title('We can read this one.', 30)}<span style={{ fontSize: 17, lineHeight: '25px' }}>We can follow the play for {fm.readable} of {fm.minutes} minutes, and {name} is in shot for about {fm.inShot}. Enough for about {fm.moments} moments.</span>
      <section style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>This video</strong><span style={{ fontSize: 13, color: MUT }}>{fm.minutes} minutes · credits back if we can’t make a reel</span></span><strong style={{ fontSize: 22, letterSpacing: '-0.02em' }}>{price}</strong><span style={{ fontSize: 13, color: MUT }}>credits</span></section>
      <section style={{ borderRadius: 14, background: PALE, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>The free video has already been used</strong><span style={{ fontSize: 13, lineHeight: '19px' }}>It is one for each family. One has been used on this phone, or for {name} on another account.</span>
        <button onClick={() => help(2, v)} style={{ ...link, alignSelf: 'flex-start' }}>That’s not right</button></section>
      {demo('the free video', <button onClick={() => { setFamily({ withheld: false, offered: false, held: null }); setView('FAM5f-CheckFree'); top(); say('A person has looked at it: the free video is yours.') }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>A person gives the free video by hand</button>)}
    </>, <><button onClick={() => { setFamily({ held: { film: fm.id, credits: price } }); setView('FAM6-Credits'); top() }} style={big(false)}>Get credits<span style={{ fontSize: 13, fontWeight: 500 }}>{p.credits} credits is ${p.price}</span></button>
      <button onClick={() => { setFamily({ held: null }); setView('FAM3e-HomeEmpty'); top() }} style={{ ...link, minHeight: 48, fontSize: 15, alignSelf: 'center' }}>Not now</button></>) }


  // ── FAM7 · working on it ──
  if (v === 'FAM7-Working' && working) { const n = Math.min(6, tick.id === working.id ? tick.n : begun), cutting = n >= 4
    const step = (a: string, b: string, done: boolean, first = false) => <div key={a} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '9px 0', borderTop: first ? 0 : `1px solid ${LINE}` }}>{done ? <Dot /> : <span aria-hidden style={{ flex: 'none', width: 24, height: 24, borderRadius: 999, boxSizing: 'border-box', border: `2px dashed ${MUT}` }} />}<span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{a}</strong><span style={{ fontSize: 14, lineHeight: '19px', color: MUT }}>{b}</span></span></div>
    return shell('FAM7-Working', head(`${working.date}${working.title.startsWith('v ') ? ` · ${working.title}` : ''}`, `Finding ${name}’s moments`, () => go('FAM3-Home')), <>
      {dark('ABOUT 20 MINUTES', 'You can close the app. We’ll let you know.')}
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}>{step('Film received', `${working.minutes} minutes`, true, true)}{step(`Everyone except ${name} blurred`, 'Done before anything is saved', true)}{step('Finding the moments', cutting ? 'Done' : 'Working on it now', cutting)}{step('Cutting the reel', cutting ? 'Working on it now' : 'Next', false)}</section>
      <span style={note}>When it is done this screen changes to “{name}’s reel is ready”.</span>
    </>, 'reels', actions(true, <button key="a" onClick={() => land(working.id)} style={btn(true)}>Open the reel when it’s ready</button>)) }

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

  // ── FAMk1 to FAMk5 · what the club adds, in five steps: every game, a season, the coach, the team's week, practice at home. The goal is for the season, not the term (Booker) ──
  if (/^FAMk\d/.test(v)) { const n = Number(v[4]), close = () => go('FAM11-Locked')
    const [h, t] = [['Every game, filmed for you.', 'The club films every round, home and away. Nothing to set up, nothing to upload, and no credits.'], ['A season, not one game.', 'Your videos each stand alone. With every game filmed the same way, progress can be followed round by round.'], ['The coach is part of it.', 'A goal for the season, a clip with the coach’s own words, and a report at the end of the season.'], ['The team’s week, in one place.', 'Chat with the coach and manager, say who’s coming in one tap, and see the line-up, forms and fees. No more hunting through group chats.'], ['And something to try at home.', 'Learn opens too: short clips and games matched to what the reels show, and whatever the coach sends.']][n - 1]
    return plain(v, true, <><span style={{ ...cap, fontSize: 13 }}>WITH YOUR CLUB</span><button onClick={close} style={{ ...under, color: '#fff', fontSize: 15 }}>Close</button></>, <>
      <div aria-hidden={n < 3} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
        {n === 1 && <><div style={{ borderRadius: 16, border: '2px dashed rgba(255,255,255,0.6)', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex', gap: 6 }}>{Array.from({ length: 12 }, (_, k) => <span key={k} style={{ flex: 1, maxWidth: 18, aspectRatio: '1', borderRadius: 999, boxSizing: 'border-box', background: k < 3 ? '#fff' : 'transparent', border: '2px solid #fff' }} />)}</span><span style={{ fontSize: 14 }}>You: the 3 rounds you could film</span></div>
          <div style={{ borderRadius: 16, background: '#fff', color: INK, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ display: 'flex', gap: 6 }}>{Array.from({ length: 12 }, (_, k) => <span key={k} style={{ flex: 1, maxWidth: 18, aspectRatio: '1', borderRadius: 999, background: G }} />)}</span><strong style={{ fontSize: 14 }}>The club: all 12 rounds, home and away</strong></div></>}
        {n === 2 && <><div style={{ borderRadius: 16, border: `2px dashed ${MAUVE}`, padding: 14, display: 'flex', alignItems: 'flex-end', gap: 12 }}><span style={{ width: 26, height: 44, borderRadius: 5, background: '#fff' }} /><span style={{ fontSize: 14 }}>Now: one video at a time</span></div>
          <div style={{ borderRadius: 16, background: '#fff', color: INK, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}><span style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 92 }}>{[34, 42, 38, 50, 47, 58, 62, 60, 72, 78, 74, 90].map((x, k) => <span key={k} style={{ flex: 1, height: x, borderRadius: 4, background: G }} />)}</span><strong style={{ fontSize: 14 }}>With the club: 12 rounds, side by side</strong></div></>}
        {n === 3 && <div style={{ borderRadius: 18, background: '#fff', color: INK, padding: 16, display: 'flex', flexDirection: 'column', gap: 8, transform: 'rotate(-2deg)', boxShadow: '0 14px 30px rgba(0,0,0,0.4)' }}><span style={{ ...cap, color: MUT }}>FROM LUKE, {name.toUpperCase()}’S COACH</span><strong style={{ fontSize: 19, lineHeight: '24px' }}>This season: look up before the ball comes.</strong><span style={{ fontSize: 15, lineHeight: '21px' }}>{kid.he ? 'He' : 'She'} did it four times on Sunday. Here are the clips that show it.</span><span style={{ display: 'grid', gridTemplateColumns: '112px 112px', gap: 8 }}><Thumb kind="drawn" len="2:00" wide /><Thumb kind="team" len="0:09" wide /></span></div>}
        {n === 4 && <div style={{ borderRadius: 18, background: '#fff', color: INK, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 14px 30px rgba(0,0,0,0.4)' }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}><strong style={{ fontSize: 12, color: MUT }}>{coach} · coach</strong><span style={{ padding: '8px 12px', borderRadius: 14, background: ROSE, fontSize: 15 }}>Sunday is 9:30 at Reserve pitch 2.</span></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}><strong style={{ flexGrow: 1, fontSize: 15 }}>Is {name} coming on Sunday?</strong><span style={{ padding: '9px 12px', borderRadius: 10, background: G, color: '#fff', fontSize: 14, fontWeight: 700 }}>Yes</span><span style={{ padding: '8px 12px', borderRadius: 10, border: `1px solid ${MUT}`, fontSize: 14, fontWeight: 700 }}>No</span></span>
          <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{['Line-up', 'Forms', 'Fees', 'Roster'].map(x => <span key={x} style={{ padding: '6px 12px', borderRadius: 999, background: TINTS[2], fontSize: 13, fontWeight: 700 }}>{x}</span>)}</span></div>}
        {n === 5 && <div style={{ borderRadius: 18, background: '#fff', color: INK, padding: 16, display: 'flex', flexDirection: 'column', gap: 8, transform: 'rotate(2deg)', boxShadow: '0 14px 30px rgba(0,0,0,0.4)' }}><span style={{ ...cap, color: MUT }}>BECAUSE OF SUNDAY’S REEL</span><strong style={{ fontSize: 19, lineHeight: '24px' }}>{name} turned away from a defender. Here is a game for it.</strong><span style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}><Thumb kind="drawn" len="2:30" wide /><Thumb kind="figure" len="0:08" wide /></span></div>}
      </div>
      {title(h)}<span style={{ fontSize: 17, lineHeight: '24px', color: '#eadcdc' }}>{t}</span>
      <div aria-hidden style={{ display: 'flex', gap: 6, justifyContent: 'center', paddingTop: 8 }}>{[1, 2, 3, 4, 5].map(k => <span key={k} style={{ width: k === n ? 22 : 7, height: 7, borderRadius: 999, background: k === n ? MAUVE : 'rgba(255,255,255,0.4)' }} />)}</div>
    </>, n < 5 ? <button onClick={() => { setView(`FAMk${n + 1}-ClubTour`); top() }} style={big('club')}>Next</button> : tell('club', 'GPp2-TellMyClub'), PLUM) }

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
      {demo('the app store', <button onClick={hop('FAM6x-PaymentFailed')} style={small}>The app store declines the payment</button>)}
    </>, 'home', actions(true, <button key="a" onClick={() => say(RESTORED)} style={{ ...btn(false), flex: 'none', padding: '0 18px' }}>Restore</button>, <button key="b" onClick={() => { buy(p.credits, `Paid through your app store. ${p.credits} credits added.`); if (f.held) setTimeout(() => { setView(checkOf(familyNow())); top() }, 1400) }} style={btn(true)}>Buy {p.credits} for ${p.price}</button>)) }

  // ── FAM6x · a purchase that failed: nothing was charged ──
  if (v === 'FAM6x-PaymentFailed') return plain(v, false, <span />, <>
    {badge(WARN)}{title('The payment didn’t go through.', 30)}<span style={{ fontSize: 17, lineHeight: '25px' }}>Nothing was charged. Your app store declined it, so it is worth checking the card there.</span>
    {group([['Paid, but no credits?', 'Restore purchases', '', () => say(RESTORED)], ['Get help', 'A person replies within a day', '', () => help(1, v)]])}
  </>, <><button onClick={hop('FAM6-Credits')} style={big(false)}>Try again</button><button onClick={() => go('FAM3-Home')} style={quiet}>Not now</button></>)

  // ── FAM7u and FAM7x · the upload, and an upload that stopped. It carries on from where it stopped; credits are only taken when the check passes and the work starts ──
  if (v === 'FAM7u-Uploading') { const fm = film(f.film), gb = Math.round(fm.minutes * 0.38) / 10, left = Math.max(1, Math.round((100 - pct) * fm.minutes * 0.0032)), wifi = f.wifi !== false
    return plain(v, false, <span />, <>
      {badge(UPLOAD)}{title(held ? 'The upload is paused.' : 'Uploading your video.', 30)}<span style={{ fontSize: 17, lineHeight: '25px' }}>You can close the app or lock your phone. It carries on.</span>
      <section style={{ ...card, gap: 8 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}><strong style={{ fontSize: 16 }}>{pct}%</strong><span style={{ fontSize: 15, color: MUT }}>{(gb * pct / 100).toFixed(1)} of {gb.toFixed(1)} GB · about {left} {left === 1 ? 'minute' : 'minutes'}</span></div>
        <div role="progressbar" aria-label="Uploaded" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} style={{ height: 8, borderRadius: 999, background: HAIR, overflow: 'hidden' }}><div style={{ width: `${pct}%`, height: '100%', borderRadius: 999, background: BAR }} /></div></section>
      <section style={{ ...card, gap: 0, padding: '2px 14px' }}>{toggle('Only upload on Wi-Fi', 'Saves your mobile data', wifi, () => { setFamily({ wifi: !wifi }); say(`Only upload on Wi-Fi: ${wifi ? 'off' : 'on'}. Saved.`) }, true)}</section>
      {demo('the upload', <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><button onClick={() => { setFamily({ upload: { pct: 100, paused: false } }); setView(checkOf(familyNow())); top() }} style={small}>The upload finishes</button><button onClick={() => { setFamily({ upload: { pct, paused: true } }); setView('FAM7x-UploadStopped'); top() }} style={small}>The phone loses its connection</button></div>)}
    </>, <><button onClick={() => { setFamily({ upload: { pct, paused: !held } }); say(held ? 'Carrying on.' : `Paused at ${pct}%. Nothing is lost.`) }} style={big(false)}>{held ? 'Carry on' : 'Pause'}</button>
      <button onClick={() => { setFamily({ upload: undefined, held: null }); say('Cancelled. Nothing was uploaded and no credits were used.'); go('FAM3-Home') }} style={quiet}>Cancel the upload</button></>) }
  if (v === 'FAM7x-UploadStopped') return plain(v, false, arrow(() => go('FAM3-Home'), INK), <>
    {badge(WARN)}{title(`The upload stopped at ${pct}%.`, 30)}<span style={{ fontSize: 17, lineHeight: '25px' }}>Your phone lost its connection. Nothing is lost: we carry on from where it stopped, and no credits have been used.</span>
  </>, <><button onClick={() => { setFamily({ upload: { pct, paused: false } }); setView('FAM7u-Uploading'); top() }} style={big(false)}>Carry on</button><button onClick={() => say('We carry on by ourselves when you’re next on Wi-Fi.')} style={quiet}>Wait for Wi-Fi</button></>)

  // ── FAM5p · checked on the phone, before anything is uploaded ──
  if (v === 'FAM5p-PhoneCheck') { const fm = film(f.film)
    return plain('FAM5p-PhoneCheck', false, arrow(() => go('FAM3-Home'), INK), <>
      <span style={{ ...cap, fontSize: 12, color: MUT }}>BEFORE YOU UPLOAD</span>{title('This one probably won’t work.', 30)}
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}>{(fm.phone ?? []).map(([a, b, ok], n) => <Line key={a} top={n > 0} ok={ok} a={a} b={b || undefined} />)}</section>
      <span style={{ fontSize: 15, lineHeight: '22px', color: MUT }}>Checked on your phone. Nothing has been sent, and no credits or free checks were used.</span>
    </>, <><button onClick={() => { say('Your phone’s video picker opens.'); setTimeout(() => pickFilm('f50'), 1300) }} style={big(false)}>Pick another video</button><button onClick={() => { setFamily({ anyway: true, upload: { pct: 0, paused: false } }); setView('FAM7u-Uploading'); top() }} style={{ ...link, fontSize: 15, alignSelf: 'center' }}>Upload this one anyway</button></>) }

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

  // ── FAM10 · share: family who can watch the reel, and a link for other parents from the team ──
  const inv = video ? f.invites?.[video.id] : undefined
  const setInv = (p: Partial<Invite>) => { if (video) setFamily(x => ({ invites: { ...x.invites, [video.id]: { daysLeft: TEAM.days, waiting: [], joined: [], ...x.invites?.[video.id], ...p } } })) }
  /** The way in to the team link. On Share, as the board draws it, and on the results page (Booker, 24 Nov) so it can be found. */
  const teamRow = TEAM_LINK && video?.state === 'ready' && <button onClick={() => { setView(inv ? 'FAM23-InviteTeam' : 'FAM23e-InviteTeamFirst'); top() }} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 10, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>Other parents from the team</strong><span style={{ fontSize: 14, lineHeight: '19px', color: MUT }}>Send a link so they can get their own child’s moments. {TEAM.back} credits back for each family.</span></span><I d={CHEV} size={16} /></button>
  const SHEET = 'Your phone’s share sheet opens with the link and a short message you can change.'
  if (v === 'FAM10-ShareFamily' && video) { const on = f.people.filter(p => p.on), linked = on.find(p => /link/.test(p.how)), out = () => go('FAM8-Results')
    return shell('FAM10-ShareFamily', head(`${name}’s reel · ${video.date}`, 'Share', out), <>
      <section style={{ ...card, gap: 0, padding: '12px 14px 8px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>Family who can watch {name}’s reel</strong>
        {f.people.map(p => <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, borderTop: `1px solid ${HAIR}` }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{p.name}</strong><span style={{ fontSize: 13, color: MUT }}>{p.how}</span></span>
          <button role="switch" aria-checked={p.on} aria-label={`${p.name} · ${p.how}`} onClick={() => { setFamily({ people: f.people.map(x => x.name === p.name ? { ...x, on: !x.on } : x) }); say(`${p.name}: ${p.on ? 'removed' : 'invited'}.`) }} style={{ flex: 'none', width: 56, height: 44, padding: 0, border: 0, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 44, height: 26, borderRadius: 999, boxSizing: 'border-box', background: p.on ? G : '#fff', border: `1.5px solid ${p.on ? G : MUT}`, position: 'relative', display: 'block' }}><span style={{ position: 'absolute', top: 2.5, left: p.on ? 21 : 3, width: 18, height: 18, borderRadius: 999, background: p.on ? '#fff' : MUT }} /></span></button></div>)}
        {adding && <form onSubmit={e => { e.preventDefault(); const n = newName.trim(); if (!n) return; if (f.people.length >= 6) { say('Six is the most. Take someone off first.'); return } setFamily({ people: [...f.people, { name: n, how: 'Watch by a private link', on: true }] }); setNewName(''); setAdding(false); say(`${n}: invited.`) }} style={{ display: 'flex', gap: 8, padding: '8px 0', borderTop: `1px solid ${HAIR}` }}><input aria-label="Their name" placeholder="Their name" value={newName} onChange={e => setNewName(e.target.value)} style={{ flexGrow: 1, minWidth: 0, height: 44, padding: '0 12px', borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 15 }} /><button type="submit" style={{ ...btn(true), flex: 'none', minHeight: 44 }}>Add</button></form>}
        <button onClick={() => { if (f.people.length >= 6) { say('Six is the most. Take someone off first.'); return } setAdding(true); say('Type a name and a mobile number or email. They get a private link.') }} style={{ ...under, textDecoration: 'none', alignSelf: 'flex-start', borderTop: `1px solid ${HAIR}`, width: '100%', textAlign: 'left' }}>Add a family member</button></section>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="Up to six people you name" b="Each link works for that person only" /><Line ok={false} a="No public link, no social posting" b="There is no button for it" /><Line ok={false} a="Not shared with the club or coach" b="Now, or if the club joins" /></section>
      {teamRow}
      {linked && demo('what a family member sees', <button onClick={() => { setStopped(false); setView('FAM10v-FamilyLink'); top() }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>Open {linked.name}’s link</button>)}
    </>, 'reels', actions(true, <button key="a" onClick={out} style={btn(false)}>Cancel</button>, <button key="b" onClick={() => on.length ? say(`Shared with ${on.map((p, n) => n ? `with ${p.name}` : p.name).join(' and ')}.`) : say('Nobody is switched on yet.')} style={btn(true, !on.length)}>Share with {on.length}</button>)) }

  // ── FAM23e, FAM23, FAM23a · send to the team. The uploader sends the link themselves; nothing is made for another family until the uploader says yes ──
  const teamHead = (t: string, to: string) => head(video ? `${video.date}${video.title.startsWith('v ') ? ` · ${video.title}` : ''}` : '', t, () => { setView(to); top() })
  if ((v === 'FAM23-InviteTeam' || v === 'FAM23a-InviteConfirm') && !inv) v = 'FAM23e-InviteTeamFirst'   // no link has been sent for this video yet
  if (v === 'FAM23e-InviteTeamFirst' && video) return shell(v, teamHead('Send to the team', 'FAM10-ShareFamily'), <>
    {dark('OTHER KIDS ARE IN THIS VIDEO', 'Their parents can get their own child’s moments.', 'You send the link yourself, in your own messages. We never see who you send it to.')}
    <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="They get their own child only" b={`${name} stays blurred for them, like everyone else`} /><Line a="You say yes to each family" b="Nobody gets a reel until you confirm you know them" /><Line a={`${TEAM.back} credits back for each family that joins`} b={`Up to ${TEAM.families} families a video`} /><Line ok={false} a={`They can’t see your reel or ${name}’s numbers`} b="And you can’t see theirs" /></section>
    <span style={note}>The link works for {TEAM.days} days and only for this video. You can stop it at any time.</span>
  </>, 'reels', actions(true, <button key="a" onClick={() => { setView('FAM10-ShareFamily'); top() }} style={btn(false)}>Not now</button>, <button key="b" onClick={() => { setInv({ daysLeft: TEAM.days, stopped: false }); say(SHEET); setTimeout(() => { move.current('FAM23-InviteTeam'); top() }, 1600) }} style={btn(true)}>Send the link</button>))
  if (v === 'FAM23a-InviteConfirm' && video && inv) { const a = inv.waiting[Math.min(who, inv.waiting.length - 1)], done = (line: string, p: Partial<Invite>, credits = 0) => { setInv(p); if (credits) setFamily(x => ({ balance: x.balance + credits })); setWho(0); say(line); setView('FAM23-InviteTeam'); top() }
    if (a) return shell(v, head('Send to the team', `Is this ${a.child}’s family?`, () => { setView('FAM23-InviteTeam'); top() }), <>
      <Pitch picked={a.shirt} h={186} label={<span style={pill}>Red {a.shirt}</span>} />
      <section style={{ ...card, gap: 0, padding: '2px 14px' }}>{([['Signed up as', 'The name on their account', a.account], ['Their child', 'What they typed', `${a.child}, born ${a.year}`], ['Shirt they tapped', 'In your video', `Red ${a.shirt}`]] as [string, string, string][]).map(([x, y, z], n) => <div key={x} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, minHeight: 56, borderTop: n ? `1px solid ${HAIR}` : 0 }}><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{x}</strong><span style={{ fontSize: 13, color: MUT }}>{y}</span></span><strong style={{ flex: 'none', fontSize: 15 }}>{z}</strong></div>)}</section>
      <span style={note}>Only say yes if you know them. They get {a.child}’s moments from this video and nothing else. {name} stays blurred for them.</span>
    </>, 'reels', actions(true, <button key="a" onClick={() => done('They are told this video isn’t available to them. They are not told why.', { waiting: inv.waiting.filter(x => x !== a) })} style={btn(false)}>No</button>,
      <button key="b" onClick={() => { const paid = inv.joined.length < TEAM.families; done(`${a.child}’s family get their reel.${paid ? ` ${TEAM.back} credits are back in your balance.` : ''}`, { waiting: inv.waiting.filter(x => x !== a), joined: [...inv.joined, { child: a.child, shirt: a.shirt, when: 'today' }] }, paid ? TEAM.back : 0) }} style={btn(true)}>Yes, I know them</button>))
    v = 'FAM23-InviteTeam' }
  if (v === 'FAM23-InviteTeam' && video && inv) { const j = inv.joined.length, w = inv.waiting.length, next = ASKERS.find(a => !inv.waiting.some(x => x.shirt === a.shirt) && !inv.joined.some(x => x.shirt === a.shirt))
    const wait = w === 1 ? 'One more is waiting for you to say you know them.' : w > 1 ? `${WORDS[w][0].toUpperCase()}${WORDS[w].slice(1)} more are waiting for you to say you know them.` : undefined
    return shell(v, teamHead('Send to the team', 'FAM10-ShareFamily'), <>
      {j > 0 ? dark(`${j} ${j === 1 ? 'FAMILY HAS' : 'FAMILIES HAVE'} JOINED`, `${Math.min(j, TEAM.families) * TEAM.back} credits are back in your balance.`, wait)
        : dark(inv.stopped ? 'THE LINK HAS STOPPED' : 'THE LINK IS SENT', w ? `${w === 1 ? 'One family is' : `${WORDS[w][0].toUpperCase()}${WORDS[w].slice(1)} families are`} waiting for you.` : 'Nobody has joined yet.', w ? 'Say yes only if you know them.' : 'When a parent taps their child, they wait here for you to say you know them.')}
      {w > 0 && <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>Waiting for you</strong>
        {inv.waiting.map((a, n) => <button key={a.shirt} onClick={() => { setWho(n); setView('FAM23a-InviteConfirm'); top() }} style={{ ...row, borderTop: `1px solid ${HAIR}` }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{a.account}</strong><span style={{ fontSize: 14, color: MUT }}>Says red {a.shirt} is {a.child}, born {a.year}</span></span><span style={{ flex: 'none', minHeight: 32, padding: '0 14px', borderRadius: 999, background: G, color: '#fff', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center' }}>Check</span></button>)}</section>}
      {j > 0 && <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>Joined</strong>
        {inv.joined.map((x, n) => <div key={x.child + n} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, minHeight: 56, borderTop: `1px solid ${HAIR}` }}><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{x.child}’s family</strong><span style={{ fontSize: 14, color: MUT }}>Joined {x.when}</span></span>{n < TEAM.families && <strong style={{ flex: 'none', fontSize: 15 }}>+{TEAM.back}</strong>}</div>)}</section>}
      {inv.stopped ? <section style={card}><strong style={{ fontSize: 16 }}>The link has stopped</strong><span style={{ fontSize: 14, lineHeight: '19px', color: MUT }}>Families who already joined keep their reels</span></section>
        : <button onClick={() => { setInv({ stopped: true }); say('The link stops working. Families who already joined keep their reels.') }} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 10, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>The link works for {inv.daysLeft} more days</strong><span style={{ fontSize: 14, lineHeight: '19px', color: MUT }}>Stopping it does not take back reels already made</span></span><span style={{ ...link, minHeight: 0 }}>Stop</span></button>}
      {inv.stopped && demo('another parent', <button onClick={hop('FAMi4-LinkEnded')} style={small}>Open the stopped link as another parent</button>)}
      {!inv.stopped && next && demo('another parent', <button onClick={() => { setAsk({ name: next.child, year: String(next.year), shirt: '', account: next.account }); setView('FAMi1-InviteLanding'); top() }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>Open the link as {next.account}, another parent</button>)}
    </>, 'reels', actions(true, <button key="a" onClick={() => { setInv({ stopped: false, daysLeft: inv.stopped ? TEAM.days : inv.daysLeft }); say(SHEET) }} style={btn(true)}>Send the link again</button>)) }

  // ── FAMi1 to FAMi3 · what an invited parent sees, from the link. Their own child only; they wait for the uploader's yes ──
  if (/^FAMi\d/.test(v) && video) { const game = `${club} ${video.title}`, child = ask.name.trim() || 'your child'
    if (v === 'FAMi1-InviteLanding') return <div data-screen={v} style={{ ...phone, background: NIGHT, color: '#fff', overflow: 'hidden' }}>{BACKPITCH}
      <div style={{ position: 'relative', flexGrow: 1, boxSizing: 'border-box', padding: short ? '16px 22px 14px' : '22px 22px 26px', display: 'flex', flexDirection: 'column' }}>
        <Mark /><span style={{ flexGrow: 1, minHeight: 12 }} />
        <span style={{ flex: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER }}>A PARENT FROM YOUR TEAM SENT THIS</span>
        <h1 style={{ flex: 'none', margin: '6px 0 0', fontSize: short ? 30 : 36, lineHeight: short ? '34px' : '40px', letterSpacing: '-0.03em', fontWeight: 700 }}>Your child is in {video.day}’s game.</h1>
        <p style={{ flex: 'none', margin: '10px 0 0', fontSize: 16.5, lineHeight: '24px', color: '#dfe7e3' }}>{f.parent} filmed {game}. Get your own child’s best moments and stats from it. Your first one is free.</p>
        <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 7, marginTop: 12 }}>{['Nothing to film or upload', `Tap your child, and ${f.parent} confirms it’s you`, 'Private to your family. Every other child is blurred'].map(x => <span key={x} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 15, lineHeight: '20px' }}><span style={{ flex: 'none', width: 20, height: 20, borderRadius: 999, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={TICK} size={11} w={3} /></span>{x}</span>)}</div>
        <span style={{ flex: 'none', margin: '12px 0', fontSize: 12, lineHeight: '17px', color: '#c9d6d0' }}>{f.parent} sent this link herself. Clean Sheet does not have your number or your child’s name.</span>
        <button onClick={() => { setView('FAMi2-InviteTap'); top() }} style={big(true)}>See my child’s moments<span style={{ fontSize: 13, fontWeight: 500 }}>Free · signing up takes one tap</span></button>
        <button onClick={() => say('Nothing is kept. The link is forgotten on this phone.')} style={{ ...under, minHeight: 48, color: '#fff', fontSize: 15, alignSelf: 'center' }}>This isn’t my team</button>
      </div>{overlays}</div>
    if (v === 'FAMi2-InviteTap') { const yr = Number(ask.year), taken = ask.shirt === kid.number || !!inv?.joined.some(x => x.shirt === ask.shirt) || !!inv?.waiting.some(x => x.shirt === ask.shirt && x.account !== ask.account)
      const field = (l: string, value: string, set: (x: string) => void, numeric = false) => <label style={{ flex: numeric ? 0.75 : 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ fontSize: 14 }}>{l}</strong><input value={value} inputMode={numeric ? 'numeric' : 'text'} onChange={e => set(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', height: 50, padding: '0 12px', borderRadius: 10, border: `1px solid ${MUT}`, background: '#fff', fontFamily: 'inherit', fontSize: 17, color: INK }} /></label>
      const send = () => { if (!ask.shirt) { say('Tap your child in the picture first.'); return } if (taken) { say('That player already has a family for this video.'); return } if (!ask.name.trim() || yr < SEASON_MIN || yr > SEASON_MAX) { say('Add a first name and the year they were born.'); return }
        const a = { account: ask.account || 'A parent', child: ask.name.trim(), year: yr, shirt: ask.shirt }; setInv({ waiting: [...(inv?.waiting ?? []).filter(x => x.account !== a.account), a] }); setView('FAMi3-InviteWaiting'); top() }
      return plain(v, false, arrow(() => { setView('FAMi1-InviteLanding'); top() }, INK), <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {title('Which one is yours?', 30)}
        <Pitch picked={ask.shirt} onPick={n => setAsk({ ...ask, shirt: n })} label={<span style={pill}>Tap your child{ask.shirt ? ` · red ${ask.shirt} picked` : ''}</span>} />
        <div style={{ display: 'flex', gap: 10 }}>{field('First name', ask.name, x => setAsk({ ...ask, name: x.split(' ')[0] }))}{field('Year born', ask.year, x => setAsk({ ...ask, year: x.replace(/\D/g, '').slice(0, 4) }), true)}</div>
        <section style={{ borderRadius: 14, background: PALE, padding: '10px 14px', display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{club}</strong><span style={{ fontSize: 13 }}>The club in this video</span></section>
        <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>{f.parent} is asked to confirm she knows you. She sees the first name, birth year and shirt you picked, and nothing else.</span>
      </div>, <button onClick={send} style={big(false)}>Ask {f.parent} to confirm</button>) }
    if (v === 'FAMi4-LinkEnded' || v === 'FAMi5-NotAvailable') { const ended = v === 'FAMi4-LinkEnded'
      return plain(v, false, <span />, <>
        {badge(ended ? CLOCK : CROSS)}{title(ended ? 'This link has ended.' : 'This video isn’t available to you.', 30)}
        <span style={{ fontSize: 17, lineHeight: '25px' }}>{ended ? `Links to a video work for ${TEAM.days} days, and the parent who sent it can stop it sooner. Ask them to send a new one.` : 'The parent who filmed it didn’t confirm your request. We don’t share why. Nothing was made and you haven’t used your free video.'}</span>
        {demo('another parent', <button onClick={hop('FAM23-InviteTeam')} style={small}>Back to {f.parent}’s phone</button>)}
      </>, <><button onClick={ended ? hop('FAM1-Welcome') : () => side('FAM4-BeforeYouFilm')} style={big(false)}>Film a game of your own<span style={{ fontSize: 13, fontWeight: 500 }}>Your first video is free</span></button>
        {ended ? <button onClick={() => say('Closed.')} style={quiet}>Close</button> : <button onClick={() => help(3, v)} style={quiet}>Ask for help</button>}</>) }
    return plain('FAMi3-InviteWaiting', false, <span />, <>
      <span style={{ width: 64, height: 64, borderRadius: 999, background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={CLOCK} size={28} w={2.2} /></span>
      {title(`Waiting for ${f.parent}.`, 30)}<span style={{ fontSize: 17, lineHeight: '25px' }}>She has a note to confirm she knows you. Once she says yes, we make {child === 'your child' ? 'your child’s' : `${child}’s`} reel and stats from the video that is already here.</span>
      <section style={{ ...card, flexDirection: 'row', alignItems: 'center', marginTop: 6 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>Your first video</strong><span style={{ fontSize: 13, color: MUT }}>After this, a shared video is half the credits</span></span><strong style={{ fontSize: 22, padding: '2px 14px', borderRadius: 999, background: AMBER }}>Free</strong></section>
      {demo('another parent', <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><button onClick={hop('FAM23-InviteTeam')} style={small}>Back to {f.parent}’s phone</button><button onClick={() => { setInv({ waiting: (inv?.waiting ?? []).filter(x => x.account !== ask.account) }); setView('FAMi5-NotAvailable'); top() }} style={small}>{f.parent} says no</button></div>)}
    </>, <><button onClick={() => say('Notifications are on. You can close the app.')} style={big(false)}>Tell me when it’s ready</button><button onClick={() => side('FAM4-BeforeYouFilm')} style={{ ...link, minHeight: 48, fontSize: 15, alignSelf: 'center' }}>Film a game of your own</button></>) }

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
      {teamRow}
      {locked(`Moments with ${his} team-mates`, 'Everyone else is blurred here. The club asks every family first.')}
    </>, firstRun ? null : 'reels', actions(!firstRun, <button key="a" onClick={() => side('FAM10-ShareFamily')} style={btn(false)}>Share with family</button>, <button key="b" onClick={() => { if (firstRun) { setView('FAM6f-AfterFree'); top() } else go('FAM3-Home') }} style={btn(true)}>Done</button>)) }

  // The closed pattern, the same on Team and Learn. The page behind is a picture of the feature, not the feature: it cannot be tapped, focused or read out. The panel cannot be dismissed; the tabs still work.
  const closed = (id: string, feature: string, what: string, why: string, ticks: string[], page: ReactNode, tab: string) => shell(id, head('With your club', feature), <div style={{ position: 'relative', flexGrow: 1, margin: '-12px -14px -16px', padding: '12px 14px 16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div aria-hidden inert style={{ position: 'absolute', inset: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12, filter: 'blur(1.5px)', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden' }}>{page}</div>
    <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(250,245,236,0.22)' }} />
    <section aria-label={`${feature}, with your club`} style={{ position: 'relative', flex: 'none', marginTop: short ? 16 : 118, borderRadius: 22, background: 'rgba(51,33,43,0.88)', color: '#fff', padding: '18px 18px 12px', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 14px 34px rgba(0,0,0,0.3)' }}>
      <span style={{ alignSelf: 'flex-start' }}>{withClub}</span>
      {title(`${feature} opens when ${f.club ? club : 'your club'} joins.`, 26)}
      <span style={{ fontSize: 15.5, lineHeight: '22px' }}><strong>What it is.</strong> {what}</span>
      <span style={{ fontSize: 15.5, lineHeight: '22px' }}><strong>Why it’s closed.</strong> {why}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>{ticks.map(x => <span key={x} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 15, lineHeight: '20px' }}><span style={{ flex: 'none', width: 20, height: 20, borderRadius: 999, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={TICK} size={11} w={3} /></span>{x}</span>)}</div>
      <button onClick={tour} style={{ ...big('club'), marginTop: 4 }}>See what your club adds</button>
      <button onClick={() => { setView('FAM12-TellClub'); top() }} style={{ ...under, color: '#fff', fontSize: 15, alignSelf: 'center' }}>Tell my club</button>
    </section>
  </div>, tab)

  // ── FAM30 and FAM31 · the Team tab. Before the club joins it is the page dimmed under the panel; after, the week from the club ──
  if (v === 'FAM30-TeamLocked' || v === 'FAM31-Team') { const page = <>
      <section style={card}><span style={{ ...cap, color: MUT }}>THIS SUNDAY</span><strong style={{ fontSize: 18, lineHeight: '24px' }}>v Eastbank · 9:30 · Reserve pitch 2</strong><span style={{ fontSize: 14, color: MUT }}>Be there by 9:00. {coach} has {name} starting on the left.</span>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}><button aria-pressed={f.rsvp.sun === true} onClick={() => { rsvp('sun', true); say(`${coach} can see ${name} is coming.`) }} style={btn(true)}>{name} is coming</button><button onClick={hop('FAM33-Coming')} style={btn(false)}>Can’t make it</button></div></section>
      {group([['Team chat', f.chatSeen ? `From ${coach} and ${STAFF.manager}` : `2 new from ${coach}`, f.chatSeen ? '' : '2', () => { setFamily({ chatSeen: true }); setView('FAM32-TeamChat'); top() }], ['Who’s coming', 'Training Tuesday · game Sunday', '', hop('FAM33-Coming')], ['Line-up', 'Sunday v Eastbank', '', hop('FAM34-Lineup')],
        ['Forms and files', f.answered ? 'Nothing to answer' : '1 to answer', f.answered ? '' : '1', hop('FAM35-Forms')], ['Fees and helping out', 'Paid · oranges on 28 June', '', hop('FAM39-Fees')]])}
    </>
    if (v === 'FAM30-TeamLocked') return closed(v, 'Team', 'Everything for the week in one place: the team chat, who’s coming, the line-up, forms and fees.', 'It belongs to the club. It runs on the club’s fixtures, its coaches and its list of families, so it starts when the club does.', ['Team chat with the coach and manager', 'Say your child is coming in one tap', 'Line-ups, forms and fees without the paper'], page, 'team')
    return shell(v, head(squad, 'Team'), <>{page}<span style={note}>Everything here comes from {club}. Your own videos are not shown to the team.</span></>, 'team') }

  // ── FAM32 · team chat: parents, the coach and the manager. No under-15s ──
  if (v === 'FAM32-TeamChat') { const bubble = (who: string, t: string, mine = false) => <div key={who + t} style={{ alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '86%', display: 'flex', flexDirection: 'column', gap: 3, alignItems: mine ? 'flex-end' : 'flex-start' }}><strong style={{ fontSize: 12, color: MUT }}>{who}</strong><span style={{ padding: '10px 14px', borderRadius: 16, background: mine ? G : '#fff', color: mine ? '#fff' : INK, border: mine ? 0 : `1px solid ${LINE}`, fontSize: 15.5, lineHeight: '21px' }}>{t}</span></div>
    const send = () => { const t = draft.trim(); if (!t) { say('Write a message first.'); return } setFamily(x => ({ chat: [...(x.chat ?? []), t] })); setDraft(''); setAnns(false); say('Sent to the team.') }
    const tab = (t: string, on: boolean, pick: () => void) => <button key={t} role="tab" aria-selected={on} onClick={pick} style={{ flex: 1, minHeight: 46, borderRadius: 12, border: on ? 0 : `1px solid ${LINE}`, background: on ? NIGHT : '#fff', color: on ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{t}</button>
    return shell(v, head(squad, 'Team chat', 'FAM31-Team'), <>
      <div role="tablist" aria-label="Chat or announcements" style={{ display: 'flex', gap: 8 }}>{tab('Chat', !anns, () => setAnns(false))}{tab('Announcements', anns, () => { setAnns(true); say('Announcements: only the coach and manager can post. 1 this week.') })}</div>
      {anns ? <>{bubble(`${coach} · coach`, 'Sunday is 9:30 at Reserve pitch 2. Please be there by 9.')}<span style={note}>Only the coach and the manager can post here.</span></>
        : <>{bubble(`${coach} · coach`, 'Sunday is 9:30 at Reserve pitch 2. Please be there by 9.')}{bubble(`${STAFF.manager} · team manager`, 'Oranges this week are the Okafors. Thank you!')}{bubble('You', `${name}’s coming. See you Sunday.`, true)}{bubble(`${coach} · coach`, 'Great. Two things for the kids to try before Tuesday are in Learn.')}
          {(f.chat ?? []).map((t, n) => <div key={n} style={{ display: 'contents' }}>{bubble('You', t, true)}</div>)}<span style={note}>Parents, the coach and the manager. Children under 15 are not in this chat.</span></>}
    </>, 'team', <form onSubmit={e => { e.preventDefault(); send() }} style={{ flex: 'none', position: 'sticky', bottom: 65, display: 'flex', gap: 10, padding: '10px 14px', background: PAGE, borderTop: `1px solid ${LINE}` }}><input aria-label="Message the team" placeholder="Message the team" value={draft} onChange={e => setDraft(e.target.value)} style={{ ...field, flex: 1, minWidth: 0, borderRadius: 14 }} /><button type="submit" style={{ ...btn(true), flex: 'none', padding: '0 20px' }}>Send</button></form>) }

  // ── FAM33 · who is coming: yes or no for each session. A reason only if the parent adds one ──
  if (v === 'FAM33-Coming') return shell(v, head(squad, `Is ${name} coming?`, 'FAM31-Team'), <>
    <section style={{ ...card, gap: 0, padding: '4px 14px' }}>{SESSIONS.map((x, n) => <div key={x.id} role="radiogroup" aria-label={x.title} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 64, padding: '4px 0', borderTop: n ? `1px solid ${HAIR}` : 0 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{x.title}</strong><span style={{ fontSize: 14, color: MUT }}>{x.when}</span></span>
      {([['Yes', true], ['No', false]] as [string, boolean][]).map(([t, yes]) => { const on = f.rsvp[x.id] === yes; return <button key={t} role="radio" aria-checked={on} onClick={() => { rsvp(x.id, yes); say(`${x.says}: ${t.toLowerCase()}. ${coach} can see it.`) }} style={{ flex: 'none', width: 54, height: 46, borderRadius: 12, border: on ? 0 : `1.5px solid ${INK}`, background: on ? G : '#fff', color: on ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{t}</button> })}</div>)}</section>
    {group([[`Tell ${coach} why`, 'Only if you want to', '', () => say(`A short note to ${coach} opens. Only he and the manager see it.`)], ['Away for a while?', 'Set dates once', '', () => say('Pick the dates. Every session in them is set to no.')]])}
    <span style={note}>{coach} sees yes or no, and a reason only if you add one.</span>
  </>, 'team')

  // ── FAM34 · the line-up for the next game, and how game time is shared ──
  if (v === 'FAM34-Lineup') return shell(v, head('Sun 28 June · v Eastbank', 'Line-up', 'FAM31-Team'), <>
    {dark(`FROM ${coach.toUpperCase()}`, `${name} starts on the left.`, 'Everyone plays at least three quarters this week.')}
    <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>{name}, quarter by quarter</strong>{[['First', 'Left'], ['Second', 'Having a rest'], ['Third', 'Middle'], ['Fourth', 'Left']].map(([a, b]) => <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '9px 0', borderTop: `1px solid ${HAIR}`, fontSize: 15 }}><span>{a}</span><strong>{b}</strong></div>)}</section>
    <section style={card}><strong style={{ fontSize: 16 }}>Game time this season</strong><span style={{ fontSize: 15, lineHeight: '21px' }}>{name} has played about the same as everyone else. The club’s rule is fair game time for every child.</span></section>
    <span style={note}>Line-ups can change on the day.</span>
  </>, 'team')

  // ── FAM35 · forms and files from the club ──
  if (v === 'FAM35-Forms') return shell(v, head(squad, 'Forms and files', 'FAM31-Team'), <>
    {listed(f.answered ? 'Answered' : 'Needs your answer', [['Filming and photos', f.answered ? 'You can change your answers at any time' : `Three questions from ${club}`, f.answered ? '' : 'Answer', () => { setFamily({ answered: true }); setView('FAM36-Consent'); top() }]])}
    {listed('Sign-ups', [['Canteen roster', 'Sun 5 July · 2 places left', '', () => say('You’re down for the canteen on 5 July, 9 to 10.')], ['End of season day', 'Sat 12 September · 24 coming', '', () => say('Say how many of you are coming.')]])}
    {listed('Files', [['Team sheet · Sunday', `From ${STAFF.manager}`, '', () => say('The team sheet opens. You can read it and save a copy.')], ['Code of conduct', club, '', () => say('The code of conduct opens.')]])}
  </>, 'team')

  // ── FAM36 and FAM36w · what the club may film and share, and taking all filming consent back. The coach and the welfare officer are told that it changed, never why ──
  if (v === 'FAM36-Consent') return shell(v, head(`${club} asks`, 'Filming and photos', 'FAM40-ClubHome'), <>
    <section style={{ ...card, gap: 0, padding: '2px 14px' }}>{ASKS.map(([a, b], n) => { const t = a.replace('{name}', name), on = !!f.consent[n]; return toggle(t, b.replace('{name}', name), on, () => { setFamily(x => ({ answered: true, consent: x.consent.map((c, k) => k === n ? !on : c) })); say(`${t}: ${on ? 'off' : 'on'}. Saved.`) }, n === 0) })}</section>
    {CONSENT_BACK && group([['Take back all filming consent', `${name} is blurred in everything from then on`, '', hop('FAM36w-ConsentBack')]])}
    <span style={note}>You can change these at any time. A change applies to anything filmed from then on. Your own videos are separate and stay private.</span>
  </>, 'club')
  if (v === 'FAM36w-ConsentBack') return shell(v, head('Filming and photos', 'Take back consent?', 'FAM36-Consent'), <>
    <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a={`${name} is blurred in all new club film`} b="From the moment you confirm" /><Line a={`Clips of ${name} shared with the team are removed`} b={`Within ${CLIPS_DOWN_DAYS} days`} /><Line a={`${name}’s numbers from club film are deleted`} b="The coach keeps only written notes" /><Line a={`${name} still trains and plays as normal`} b="Nothing changes at the club" /><Line a="Your own videos are not touched" b="They were never shared" /></section>
    <span style={note}>{coach} and the club’s welfare officer are told that consent has changed. They are not told why. You can give it again at any time.</span>
  </>, 'club', actions(true, <button key="a" onClick={hop('FAM36-Consent')} style={btn(false)}>Cancel</button>, <button key="b" onClick={() => { setFamily(x => ({ answered: true, consent: [false, false, !!x.consent[2]] })); say(`Done. ${name} is blurred in club film from now. ${coach} and ${STAFF.welfare.split(' ')[0]} have been told.`); setView('FAM36-Consent'); top() }} style={btn(true)}>Take it back</button>))

  // ── FAM37 · from the coach: the goal for the season (Booker: the season, not the term), a clip with the coach's words, the season report, a catch-up. Goals are about learning, not ranking ──
  if (v === 'FAM37-FromCoach') { const own = f.videos.find(x => x.kid === kid.id && x.state === 'ready' && x.title === 'v Ridgeway') ?? ready[0]
    const play = () => { if (!own) { say('The clip plays: 11 seconds.'); return } setFamily({ open: own.id, clip: Math.max(0, own.clips.findIndex(c => c.minute === '22nd minute')), from: 'reel' }); setView('FAM9-Clip'); top() }
    return shell(v, head(squad, `From ${coach}`, 'FAM40-ClubHome'), <>
      {dark(`${name.toUpperCase()}’S GOAL THIS SEASON`, 'Look up before the ball comes.', `${coach} saw it three times on Sunday. That is up from once.`)}
      <section style={{ ...card, gap: 4 }}><strong style={{ fontSize: 16 }}>{coach} sent a clip</strong><button onClick={play} style={{ ...row, minHeight: 64 }}><span style={{ flex: 'none', width: 96 }}><Thumb kind="team" len="0:11" wide /></span><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>“This is the one. Head up, then the pass.”</strong><span style={{ fontSize: 13, color: MUT }}>Sun 14 June · 22nd minute</span></span></button></section>
      {group([['Two things to try at home', `Picked by ${coach}`, '', () => go('FAM17u-LearnWithClub')], ['Season report', 'Ready after the last round', '', () => say(`${coach} writes it after the last round. You’ll be told when it is ready.`)], ['Book a catch-up', `Ten minutes with ${coach}`, '', () => say(`Pick a time ${coach} has offered.`)]])}
      <span style={note}>Goals are about learning, not ranking. There are no scores against other children.</span>
    </>, 'club') }

  // ── FAM38 · raise a concern. It goes to the club's welfare officer, never the coach ──
  if (v === 'FAM38-Concern') return shell(v, head(club, 'Raise a concern', 'FAM40-ClubHome'), <>
    {dark(`THIS GOES TO ${STAFF.welfare.toUpperCase()}`, 'The club’s welfare officer, not the coach.', 'Nobody on the team can see it.')}
    <section style={{ ...card, gap: 10 }}><strong style={{ fontSize: 14 }}>What is it about?</strong>
      <div role="radiogroup" aria-label="What is it about?" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{ABOUT.map((t, n) => <button key={t} role="radio" aria-checked={about === n} onClick={() => { setAbout(n); say(`${t} picked.`) }} style={{ flex: 'none', minHeight: 46, padding: '0 16px', borderRadius: 999, border: about === n ? 0 : `1px solid ${MUT}`, background: about === n ? NIGHT : '#fff', color: about === n ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{t}</button>)}</div>
      {labelled('What happened', <textarea placeholder="Tap to write" rows={3} value={story} onChange={e => setStory(e.target.value)} style={area} />, 'As much or as little as you like')}</section>
    <span style={note}>If a child is in danger now, call 000.</span>
  </>, 'club', actions(true, <button key="a" onClick={() => { setStory(''); setView('FAM40-ClubHome'); top() }} style={btn(false)}>Cancel</button>, <button key="b" onClick={() => { setStory(''); say(`Sent to ${STAFF.welfare}. She replies within two days.`); setView('FAM40-ClubHome'); top() }} style={btn(true)}>Send to {STAFF.welfare.split(' ')[0]}</button>))

  // ── FAM39 · fees and helping out. Fees are paid to the club, not to Clean Sheet ──
  if (v === 'FAM39-Fees') { const swap = () => say('Ask to swap. The manager and the other families see the request.')
    return shell(v, head(squad, 'Fees and helping out', 'FAM31-Team'), <>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>Fees</strong>{f.kids.map(x => <div key={x.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '9px 0', borderTop: `1px solid ${HAIR}`, fontSize: 15 }}><span>{f.club?.academy ? 'Term 2' : 'Winter 2026'} · {x.name}</span><strong style={{ flex: 'none' }}>{f.club?.academy ? (ap && x.id === kid.id ? `${money(fee)} · ${ap.fees_status === 'Paid' ? 'paid' : ap.fees_note || ap.fees_status.toLowerCase()}` : `${money(fee)} · paid`) : `${x.id === 'mia' ? '$800' : '$240'} · paid 2 March`}</strong></div>)}</section>
      {listed('Your turns', [['Oranges', 'Sun 28 June', 'Swap', swap], ['Canteen', 'Sun 5 July · 9 to 10', 'Swap', swap]])}
      <span style={note}>Fees are paid to {club}, not to Clean Sheet. Credits are separate and only for your own videos.</span>
    </>, 'team') }

  // ── ADP1 to ADP5 · the Club tab when the child's club is an academy (academy v1). The same shell and rules as the rest of the app: a child's own start only, never other children ──
  if (/^ADP\d/.test(v)) { const a = { pay: 0, slot: 0, goes: [true, false, false], ...f.adp }, set = (p: Partial<NonNullable<Family['adp']>>) => setFamily(x => ({ adp: { ...x.adp, ...p } })), over = `${name} · ${club}`, home = hop('ADP1-AcademyHome')
    const done = a.goes.filter(Boolean).length, left = 3 - done, pick = (on: boolean, x: string, y: string, press: () => void) => <button key={x} role="radio" aria-checked={on} onClick={press} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 64, border: on ? `2px solid ${G}` : `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
      <span aria-hidden style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, boxSizing: 'border-box', border: on ? `7px solid ${G}` : `2px solid ${MUT}`, background: '#fff' }} /><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{x}</strong><span style={{ fontSize: 14, lineHeight: '19px', color: MUT }}>{y}</span></span></button>
    const pairs = (rows: [string, string][]) => rows.map(([x, y], n) => <div key={x} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '10px 0', borderTop: n ? `1px solid ${HAIR}` : 0, fontSize: 15 }}><span>{x}</span><strong style={{ textAlign: 'right' }}>{y}</strong></div>)

    // The empty states (academy v2): one sentence on what will appear, and at most one button. They open by address; the sample family always has something to show.
    if (/^ADP\d+e/.test(v)) { const out = (id: string) => () => { if (onNav) onNav(id); else openScreen(id) }, he2 = kid.he ? 'His' : 'Her', him2 = kid.he ? 'him' : 'her'
      const [t, icon, h, line, b, on]: [string, string, string, string, string, (() => void) | null] = v.startsWith('ADP1e') ? ['Academy', CLOCK, `${name} starts on Monday 20 April`, `${he2} first session is at ${trainAt} on pitch 1. ${coach} will set a goal with ${him2} in week 2.`, 'What to bring', () => say(`Boots, shin pads, a drink and a ball if ${kid.he ? 'he' : 'she'} has one.`)]
        : v.startsWith('ADP2e') ? ['Term report', CLOCK, 'The report comes in week 9', `${coach} writes it from his notes on every session. You’ll be told when it is ready.`, '', null]
        : v.startsWith('ADP3e') ? ['Next term', CLOCK, 'Next term isn’t open yet', `You’ll be told the day it opens. ${name}’s place is held for you first.`, '', null]
        : v.startsWith('ADP4e') ? ['Review chat', CLOCK, 'No times offered yet', `${coach} offers ten-minute chats in week 9. You’ll be told when you can book.`, `Message ${coach}`, out('ACP11-AcademyParentChat')]
        : v.startsWith('ADP8e') ? [`${name}’s week`, CLOCK, 'Just the academy so far', `If ${name} plays or trains anywhere else, add it so ${coach} can keep ${his} week sensible.`, 'Add something', () => say('Name it and tap the days.')]
        : v.startsWith('ADP14e') ? ['Waiting lists', CLOCK, 'You’re not on a list', 'If a program is full when you book, you can join its list from there.', 'See programs', out('ACP1-BookTrial')]
        : ['Practice this week', PLAY, 'Nothing set this week', 'A week off. A ball and a wall is always a good idea.', 'See last week’s', () => say('Last week’s practice opens.')]
      return shell(v, head(over, t, v.startsWith('ADP1e') ? undefined : home), <section style={{ ...card, alignItems: 'center', textAlign: 'center', gap: 8, padding: '22px 16px 16px' }}>
        <span style={{ width: 56, height: 56, borderRadius: 999, background: TINTS[2], color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={icon} size={24} /></span>
        <strong style={{ fontSize: 18, lineHeight: '24px' }}>{h}</strong><span style={{ fontSize: 15, lineHeight: '21px', color: MUT }}>{line}</span>
        {on && <button onClick={on} style={{ ...btn(true), flex: 'none', alignSelf: 'stretch', marginTop: 6 }}>{b}</button>}</section>, 'club') }

    // ── ADP8 to ADP14 · the flows behind the copy (academy v6): each piece of data the academy shows has a way in ──
    if (v === 'ADP8-OtherSport') return shell(v, head(over, `${name}’s week`, home), <>
      <section style={card}><strong style={{ fontSize: 16 }}>What else does {name} do?</strong><span style={{ fontSize: 15, lineHeight: '21px', color: MUT }}>So {coach} can keep {his} week sensible. It takes a minute.</span></section>
      <section style={{ ...card, gap: 0, padding: '2px 14px' }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, minHeight: 48, alignItems: 'center', fontSize: 15 }}><span>Tall Timber</span><strong>{days}</strong></div>
        {([['Club team', 'Training Wed · game Sun', 'Days open to change.'], ['School football', 'Friday lunchtime', 'Days open to change.'], ['Add another', 'Any sport counts', 'Name it and tap the days.']] as [string, string, string][]).map(([x, y, line]) => <button key={x} onClick={() => say(line)} style={{ ...row, borderTop: `1px solid ${HAIR}` }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{x}</strong><span style={{ fontSize: 14, color: MUT }}>{y}</span></span><I d={CHEV} size={16} /></button>)}</section>
      <span style={note}>{coach} and the academy’s coaches see this. {name}’s club sees nothing unless you <button onClick={() => { if (onNav) onNav('ACP7-ShareWithClub'); else openScreen('ACP7-ShareWithClub') }} style={{ ...under, display: 'inline-flex', alignItems: 'center', fontSize: 13 }}>share it</button>.</span>
    </>, 'club', actions(true, <button key="a" onClick={() => { say(`Saved. ${coach} can see ${name}’s week.`); home() }} style={btn(true)}>Save</button>))

    if (v === 'ADP9-PauseOrStop') { const stop = a.stop === true, tell = a.tell !== false
      return shell(v, head(over, 'Pause or stop', home), <>
        <div role="radiogroup" aria-label="Pause or stop" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{pick(!stop, 'Pause for a while', `${name}’s place is held for up to ${PAUSE_WEEKS} weeks`, () => { set({ stop: false }); say('Pause for a while chosen.') })}{pick(stop, 'Stop this term', 'Ask for the unused weeks back', () => { set({ stop: true }); say('Stop this term chosen.') })}</div>
        {stop ? <section style={card}><span style={{ fontSize: 15, lineHeight: '21px' }}>The academy’s rule is the unused weeks, less one week. Dani confirms what comes back.</span></section>
          : <section style={{ ...card, gap: 0, padding: '2px 14px' }}>{pairs([['From', 'Tuesday 9 June'], ['Back on', 'Tuesday 23 June'], ['Comes off your next bill', '$58']])}</section>}
        {labelled('Why (optional)', <input value={a.why ?? 'Sprained ankle'} onChange={e => set({ why: e.target.value })} style={field} />, 'Only the owner sees this')}
        <button role="checkbox" aria-checked={tell} onClick={() => { set({ tell: !tell }); say(tell ? `${coach} will not be told the reason.` : `${coach} will be told the reason.`) }} style={{ ...row, minHeight: 48 }}><span aria-hidden style={{ flex: 'none', width: 24, height: 24, borderRadius: 7, boxSizing: 'border-box', background: tell ? G : '#fff', border: tell ? 0 : `2px solid ${MUT}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{tell && <I d={TICK} size={14} w={3} />}</span><span style={{ fontSize: 16 }}>Tell {coach} the reason too</span></button>
      </>, 'club', actions(true, stop ? <button key="a" onClick={() => { say('Dani is asked. She confirms what comes back.'); home() }} style={btn(true)}>Ask for the unused weeks back</button> : <button key="a" onClick={() => { set({ paused: true }); say('Paused from 9 June. $58 comes off your next bill.'); home() }} style={btn(true)}>Pause {name}’s place</button>)) }

    if (v === 'ADP10-WhyLeaving') { const leave = (line: string) => () => { set({ place: 'left' }); if (ap) setTerm3(ap.id, 'Leaving'); setStory(''); say(line); home() }
      return shell(v, head(over, 'Before you go', hop('ADP3-KeepPlace')), <>
        <section style={card}><strong style={{ fontSize: 16 }}>Two quick questions</strong><span style={{ fontSize: 15, lineHeight: '21px', color: MUT }}>{name}’s place is released either way. This helps the academy get better.</span></section>
        <div role="radiogroup" aria-label="Why" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{WHY.map((t, n) => <button key={t} role="radio" aria-checked={a.why2 === n} onClick={() => { set({ why2: n }); say(`${t} chosen.`) }} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 52, border: a.why2 === n ? `2px solid ${G}` : `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><span aria-hidden style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, boxSizing: 'border-box', border: a.why2 === n ? `7px solid ${G}` : `2px solid ${MUT}`, background: '#fff' }} /><strong style={{ fontSize: 16 }}>{t}</strong></button>)}</div>
        {labelled('Anything you’d tell the owner? (optional)', <textarea rows={2} value={story} onChange={e => setStory(e.target.value)} style={area} />, 'Dani sees reasons as totals. A comment goes to her with your name.')}
      </>, 'club', actions(true, <button key="a" onClick={leave(`${name}’s place is released.`)} style={btn(false)}>Skip</button>, <button key="b" onClick={leave(`Thank you. ${name}’s place is released.`)} style={btn(true)}>Send</button>)) }

    if (v === 'ADP11-Survey') { const ans = a.survey ?? [5, 4, 4, 4, 2], qs = [`${name} enjoys coming`, `The coaches know ${name}`, 'It is good value', `I can see what ${name} is improving`, 'I know what to practise at home']
      return shell(v, head(over, 'How is it going?', home), <section style={{ ...card, gap: 0, padding: '12px 14px 6px' }}><span style={{ fontSize: 14, lineHeight: '20px', color: MUT, paddingBottom: 8 }}>Five questions, one minute. 1 is no, 5 is yes. Your answers are never shown with your name.</span>
        {qs.map((q, n) => <div key={q} role="radiogroup" aria-label={q} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '10px 0', borderTop: `1px solid ${HAIR}` }}><strong style={{ fontSize: 15 }}>{q}</strong><div style={{ display: 'flex', gap: 8 }}>{[1, 2, 3, 4, 5].map(k => <button key={k} role="radio" aria-checked={ans[n] === k} onClick={() => { set({ survey: ans.map((x, i) => i === n ? k : x) }); say(`${q}: ${k} of 5.`) }} style={{ flex: 1, minHeight: 44, borderRadius: 12, border: ans[n] === k ? 0 : `1px solid ${MUT}`, background: ans[n] === k ? G : '#fff', color: ans[n] === k ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{k}</button>)}</div></div>)}
      </section>, 'club', actions(true, <button key="a" onClick={() => { if (ap) setSurvey(ap.id, ans); say('Thank you. Sent without your name.'); home() }} style={btn(true)}>Send</button>)) }

    if (v === 'ADP12-MoveOffer') return shell(v, head(over, `A move for ${name}?`, home), <>
      {dark(`FROM ${coach.toUpperCase()} AND DANI`, `We think ${name} is ready for Advanced.`, `“${his[0].toUpperCase()}${his.slice(1)} first touch and ${his} confidence on the ball are ahead of ${his} group.”`)}
      <section style={{ ...card, gap: 0, padding: '2px 14px' }}>{pairs([['Now', `Development · ${days}, ${trainAt}`], ['Would be', `Advanced · ${days}, 6:35`], ['Session', '70 minutes, was 55'], ['Price', `${money(ac.price_this_term.Advanced)} a term, was ${money(fee)}`], ['Coach', `${coach} and Sofia`]])}</section>
      <span style={note}>Try two sessions first. Then you, {name} and {coach} decide. Nothing changes until you say yes.</span>
    </>, 'club', actions(true, <button key="a" onClick={() => { say(`No problem. ${name} stays in Development. ${coach} is told.`); home() }} style={btn(false)}>Not now</button>, <button key="b" onClick={() => { say('Booked: Tuesday 14 and Thursday 16 July at 5:30. No change to your bill yet.'); home() }} style={btn(true)}>Try two sessions</button>))

    if (v === 'ADP13-NextStep') return shell(v, head(over, `${name}’s next step`, home), <>
      <section style={card}><strong style={{ fontSize: 16 }}>Trialling somewhere, or moving on?</strong><span style={{ fontSize: 15, lineHeight: '21px', color: MUT }}>You decide what the academy knows and who sees {name}’s file.</span></section>
      {group([['Ask for a reference', 'Asked 2 June · Dani is writing it', '', () => say('Dani is told. You’ll get it here.')], ['Tell the academy about a trial', 'Optional · Sunday 14 June', '', () => say(`Enter the club and date. Only ${name}’s coaches see it.`)], [`${name}’s passport`, 'Skills, 4 of 6 clips, attendance', '', () => { if (onNav) onNav('CNp14-PlayerPassport'); else openScreen('CNp14-PlayerPassport') }]])}
      {labelled('Send the passport to', <input type="email" value={a.to ?? 'coach@harbourrovers.example'} onChange={e => set({ to: e.target.value })} style={field} />, 'It goes from you, not from the academy. The link stops working after 30 days.')}
    </>, 'club', actions(true, <button key="a" onClick={() => { if (!/\S+@\S+\.\S+/.test(a.to ?? 'coach@harbourrovers.example')) { say('Add the email to send it to.'); return } say('Sent. The link works for 30 days and you can switch it off any time.') }} style={btn(true)}>Send the passport</button>))

    if (v === 'ADP14-WaitingList') return shell(v, head(over, 'Advanced is full', home), <>
      <section style={card}><strong style={{ fontSize: 16 }}>All 24 places are taken or on offer</strong><span style={{ fontSize: 15, lineHeight: '21px', color: MUT }}>Join the list and you’ll be offered the next place in order.</span></section>
      <section style={{ ...card, gap: 0, padding: '2px 14px' }}>{pairs([['Your place in the list', '6th'], ['When a place opens', 'You have 48 hours to say yes'], ['Cost to wait', 'Nothing']])}</section>
      <span style={note}>While you wait, {name} can book one-on-ones or the July clinic.</span>
    </>, 'club', actions(true, <button key="a" onClick={home} style={btn(false)}>Not now</button>, <button key="b" onClick={() => say('You’re 6th on the list for Advanced. We’ll tell you the moment a place opens.')} style={btn(true)}>Join the list</button>))

    // ── ADP15 and ADP16 (academy v7): one optional question after a trial is booked, and an honest answer about sport vouchers. Both reach the owner as totals, without a name ──
    if (v === 'ADP15-HowHeard') { const out = (id: string) => () => { if (onNav) onNav(id); else openScreen(id) }
      return shell(v, head(club, 'One quick question', out('ACP1-BookTrial')), <>
        <section style={card}><strong style={{ fontSize: 16 }}>How did you hear about us?</strong><span style={{ fontSize: 15, lineHeight: '21px', color: MUT }}>Optional. It helps a small academy know what works.</span></section>
        <div role="radiogroup" aria-label="How did you hear about us?" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{HEARD.map((t, n) => <button key={t} role="radio" aria-checked={a.heard === n} onClick={() => { set({ heard: n }); say(`${t} chosen.`) }} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 52, border: a.heard === n ? `2px solid ${G}` : `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><span aria-hidden style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, boxSizing: 'border-box', border: a.heard === n ? `7px solid ${G}` : `2px solid ${MUT}`, background: '#fff' }} /><strong style={{ fontSize: 16 }}>{t}</strong></button>)}</div>
        {labelled('Who should we thank? (optional)', <input value={a.thank ?? 'The Costa family'} onChange={e => set({ thank: e.target.value })} style={field} />, 'They aren’t told. It’s only for the academy.')}
      </>, 'club', actions(true, <button key="a" onClick={out('ACP1b-TrialBooked')} style={btn(false)}>Skip</button>, <button key="b" onClick={out('ACP1b-TrialBooked')} style={btn(true)}>Done</button>)) }

    if (v === 'ADP16-Voucher') { const fees = () => { if (onNav) onNav('ACP4-ParentFees'); else openScreen('ACP4-ParentFees') }, short = club.replace(/ Academy$/, '')
      return shell(v, head(over, 'Sport voucher', fees), <>
        <section style={card}><strong style={{ fontSize: 16 }}>{short} can’t take vouchers yet</strong><span style={{ fontSize: 15, lineHeight: '21px', color: MUT }}>An academy has to be a registered provider in its state. {short} isn’t one at the moment.</span></section>
        <section style={{ ...card, gap: 0, padding: '2px 14px' }}>{pairs([['What you can do', 'Tell the academy'], ['What they see', 'How many families asked'], ['Your club', 'May be able to take it']])}</section>
        <span style={note}>If {short} registers later, you’ll be told here and can use a voucher against your next term.</span>
      </>, 'club', actions(true, <button key="a" onClick={fees} style={btn(false)}>Not now</button>, <button key="b" onClick={() => say('Dani has been told a family asked. Your name is not attached.')} style={btn(true)}>Tell the academy I have one</button>)) }

    if (v === 'ADP6-BookOneOnOne') { const n = Math.min(a.one ?? 0, ONES.length - 1), s = ONES[n]
      return shell(v, head(over, 'One-on-one', home), <>
        <section style={card}><strong style={{ fontSize: 16 }}>45 minutes, built around {name}’s goal</strong><span style={{ fontSize: 15, lineHeight: '21px', color: MUT }}>First touch on the move. Always on pitch 2, in open view. You’re welcome to stay and watch.</span></section>
        <div role="radiogroup" aria-label="Times" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{ONES.map(([day, who, at], k) => pick(n === k, `${day}, ${at}`, `With ${who || coach} · $${ONE_PRICE}`, () => { set({ one: k }); say(`${day}, ${at} chosen.`) }))}</div>
        <span style={note}>Cancel up to {ONE_CANCEL_HOURS} hours before and the full amount comes back.</span>
      </>, 'club', actions(true, <button key="a" onClick={() => { say(`Booked: ${s[0]}, ${s[2]}, with ${s[1] || coach}. Paid with the card ending 4410.`); home() }} style={btn(true)}>Book · ${ONE_PRICE}</button>)) }

    if (v === 'ADP7-SessionOff') return shell(v, head(over, 'Today’s session is off', home), <>
      <section style={{ borderRadius: 16, background: PLUM, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ ...cap, color: '#e6d3d3' }}>THURSDAY, {trainAt} · {(ag?.name ?? 'Development').toUpperCase()}</span><strong style={{ fontSize: 19, lineHeight: '25px' }}>Cancelled: the pitch is closed.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#e6d3d3' }}>Dani sent this at 2:10 pm. The school closed the pitch after the rain.</span></section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 2px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What happens now</strong><div style={{ borderTop: `1px solid ${HAIR}` }}>{pairs([[`${name}’s make-up`, '1 added'], ['Use it by', 'Friday 26 June'], ['Next session', `Monday, ${trainAt}`]])}</div></section>
      <span style={note}>If a make-up can’t be used this term, the session comes off your next bill.</span>
    </>, 'club', actions(true, <button key="a" onClick={home} style={btn(false)}>Later</button>, <button key="b" onClick={() => { if (onNav) onNav('ACP6-MakeUp'); else openScreen('ACP6-MakeUp') }} style={btn(true)}>Book the make-up</button>))

    if (v === 'ADP2-TermReport') { const dots = (k: number, soft: boolean) => <span style={{ display: 'flex', gap: 3 }}>{[1, 2, 3, 4, 5].map(d => <span key={d} style={{ width: soft ? 9 : 11, height: soft ? 9 : 11, borderRadius: 999, boxSizing: 'border-box', background: d <= k ? (soft ? '#9db5ab' : G) : '#fff', border: d <= k ? 0 : `1.5px solid ${soft ? '#c9cecc' : MUT}` }} />)}</span>
      const own = ready[0], play = () => { if (!own) { say('The clip plays: 8 seconds.'); return } setFamily({ open: own.id, clip: 0, from: 'reel' }); setView('FAM9-Clip'); top() }
      return shell(v, head(over, 'Term 2 report', home), <>
        {dark(`FROM ${coach.toUpperCase()}`, `${name}’s first touch has changed the most.`, `“${kid.he ? 'He' : 'She'} takes it on the move now and looks up sooner. Next is doing it with a defender close.”`)}
        <section style={{ ...card, gap: 0, padding: '12px 14px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>Week 1, and now</strong>
          {steps.map(([t, was, now]) => <div key={t} role="img" aria-label={`${t}: step ${was} of 5 in week 1, step ${now} of 5 now`} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 46, borderTop: `1px solid ${HAIR}` }}><strong style={{ flexGrow: 1, fontSize: 15 }}>{t}</strong>{dots(was, true)}<I d="M5 12h14M13 6l6 6-6 6" size={14} />{dots(now, false)}</div>)}
          <span style={{ fontSize: 13, lineHeight: '19px', color: MUT, paddingTop: 8, borderTop: `1px solid ${HAIR}` }}>Five steps per skill, against {name}’s own start. Never against other children.</span></section>
        <section style={{ ...card, gap: 4 }}><strong style={{ fontSize: 16 }}>The moment {coach} picked</strong><button onClick={play} style={{ ...row, minHeight: 64 }}><span style={{ flex: 'none', width: 96 }}><Thumb kind="team" len="0:08" wide /></span><span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>First touch, then away</strong><span style={{ fontSize: 13, color: MUT }}>Thu 28 May · skill game</span></span></button></section>
        <section style={{ ...card, gap: 0, padding: '2px 14px' }}>{pairs([['Came to', `${been.came} of ${been.of} sessions`], ['Goal for Term 3', 'First touch under pressure']])}</section>
      </>, 'club', actions(true, <button key="a" onClick={hop('ADP4-BookChat')} style={btn(false)}>Book a chat</button>, <button key="b" onClick={hop('ADP3-KeepPlace')} style={btn(true)}>Keep {name}’s place</button>)) }

    if (v === 'ADP3-KeepPlace') { const parts = a.pay === 1
      return shell(v, head(over, `Keep ${name}’s place`, home), <>
        <section style={{ ...card, gap: 0, padding: '12px 14px 2px' }}><strong style={{ fontSize: 17 }}>Development · Term 3</strong><span style={{ fontSize: 14, color: MUT, paddingBottom: 6 }}>Same group, same coach, same days.</span><div style={{ borderTop: `1px solid ${HAIR}` }}>{pairs([['When', `${days}, ${trainAt}`], ['Dates', '13 July to 18 Sept'], ['Where', 'Messmate Primary School'], ['Coach', coach], ['Price', `${money(fee)} for 10 weeks`]])}</div></section>
        <div role="radiogroup" aria-label="How to pay" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{pick(!parts, `Pay ${money(fee)} now`, 'Card ending 4410', () => { set({ pay: 0 }); say(`Pay ${money(fee)} now chosen.`) })}{pick(parts, 'Pay in 3 parts', `$${(fee / 3).toFixed(2)} now, then 13 July and 10 August · no extra cost`, () => { set({ pay: 1 }); say('Pay in 3 parts chosen.') })}</div>
        <span style={note}>Plans change. Tell the academy before 13 July and the full amount comes back.</span>
      </>, 'club', actions(true, <button key="a" onClick={hop('ADP10-WhyLeaving')} style={{ ...btn(false), flex: 0.8 }}>Not coming back</button>, <button key="b" onClick={() => { set({ place: 'kept' }); if (ap) setTerm3(ap.id, 'Staying'); say(`${name}’s place is kept for Term 3. A receipt is in Fees.`); home() }} style={btn(true)}>Keep my place · {parts ? `$${(fee / 3).toFixed(2)} now` : money(fee)}</button>)) }

    if (v === 'ADP4-BookChat') { const s = SLOTS[a.slot] ?? SLOTS[0]
      return shell(v, head(over, 'Review chat', home), <>
        <section style={card}><strong style={{ fontSize: 16 }}>Ten minutes with {coach}</strong><span style={{ fontSize: 15, lineHeight: '21px', color: MUT }}>He’ll show one clip, talk through the report and agree next term’s goal with you and {name}.</span></section>
        <div role="radiogroup" aria-label="Times" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{SLOTS.map(([day, time, where], n) => pick(a.slot === n, `${day}, ${time}`, n ? where : `${where}, after ${name}’s session`, () => { set({ slot: n }); say(`${day}, ${time} chosen.`) }))}</div>
        <span style={note}>Can’t make any of these? {coach} sends the report with a spoken note instead.</span>
        <button onClick={hop('ADP6-BookOneOnOne')} style={{ ...under, alignSelf: 'center' }}>Or book a one-on-one</button>
      </>, 'club', actions(true, <button key="a" onClick={() => { set({ chat: 'none' }); say(`${coach} is told. He’ll send the report with a spoken note.`); home() }} style={btn(false)}>None of these</button>, <button key="b" onClick={() => { set({ chat: 'booked' }); say(`Booked: ${s[0]}, ${s[1]}, ${s[2].toLowerCase()}. It’s in your calendar.`); home() }} style={btn(true)}>Book {s[1]}</button>)) }

    if (v === 'ADP5-Practice') return shell(v, head(over, 'Practice this week', home), <>
      <button aria-label="Play: First touch off a wall · 0:35" onClick={() => say('The clip plays.')} style={{ position: 'relative', minHeight: 190, borderRadius: 16, border: 0, background: `linear-gradient(160deg, ${DEEP}, #2f5b4c)`, color: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>
        <span style={{ position: 'absolute', left: '50%', top: '50%', width: 56, height: 56, margin: -28, borderRadius: 999, background: '#fff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I d={PLAY} size={22} /></span><strong style={{ position: 'absolute', left: 12, bottom: 10, fontSize: 13 }}>First touch off a wall</strong><span style={{ position: 'absolute', right: 12, bottom: 10, fontSize: 13 }}>0:35</span></button>
      <section style={{ ...card, gap: 0, padding: '12px 14px 2px' }}><strong style={{ fontSize: 17 }}>First touch off a wall</strong><span style={{ fontSize: 14, lineHeight: '20px', color: MUT, paddingBottom: 6 }}>Five minutes, three times this week. Take it across the body, then pass back.</span>
        {['First go', 'Second go', 'Third go'].map((t, n) => <button key={t} role="checkbox" aria-checked={a.goes[n]} onClick={() => { set({ goes: a.goes.map((g, k) => k === n ? !g : g) }); say(`${t}: marked ${a.goes[n] ? 'not done' : 'done'}.`) }} style={{ ...row, minHeight: 48, borderTop: `1px solid ${HAIR}` }}><span aria-hidden style={{ flex: 'none', width: 24, height: 24, borderRadius: 7, boxSizing: 'border-box', background: a.goes[n] ? G : '#fff', border: a.goes[n] ? 0 : `2px solid ${MUT}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.goes[n] && <I d={TICK} size={14} w={3} />}</span><span style={{ fontSize: 16 }}>{t}</span></button>)}</section>
      <section style={{ ...card, gap: 4 }}><span style={{ ...cap, color: MUT, letterSpacing: '0.04em', fontSize: 12 }}>{coach.toUpperCase()} REPLIED TO MONDAY’S VIDEO</span><span style={{ fontSize: 16, lineHeight: '22px' }}>“Lovely. Now let it run across you before you touch it.”</span>
        <button onClick={() => say(`${coach}’s spoken note plays. 14 seconds.`)} style={{ ...link, alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}><I d={PLAY} size={14} />Hear it · 0:14</button></section>
    </>, 'club', actions(true, <button key="a" onClick={() => say('The camera opens. Up to 30 seconds. You watch it back before it is sent.')} style={btn(true)}>Film it for {coach}</button>))

    // ADP1 (homes v1): the same four parts as every role's home. Now, a slim strip; progress, the dark band with the one amber button; what the child is working on; and "Is … looked after?", which is the parent's oversight.
    const out6 = () => { if (onNav) onNav('ACP6-MakeUp'); else openScreen('ACP6-MakeUp') }, slot = SLOTS[a.slot] ?? SLOTS[0]
    const looked = (ok: boolean, x: string, y: string, press: () => void) => <button key={x} onClick={press} style={{ ...row, minHeight: 46, borderTop: `1px solid ${HAIR}` }}><span aria-hidden style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, background: ok ? TINTS[2] : ROSE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{ok ? <I d={TICK} size={12} w={2.6} /> : '!'}</span><span style={{ flexGrow: 1, fontSize: 15 }}>{x}</span><strong style={{ flex: 'none', fontSize: 15 }}>{y}</strong></button>
    const work = (mark: string, tint: string, x: string, y: string, press: () => void) => <button key={x} onClick={press} style={{ ...row, minHeight: 46, borderTop: `1px solid ${HAIR}` }}><span aria-hidden style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: tint, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{mark}</span><span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{x}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{y}</span></span><I d={CHEV} size={16} /></button>
    return shell('ADP1-AcademyHome', head(over, 'Academy'), <>
      <section aria-label="Now" style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: 10, padding: '8px 8px 8px 14px' }}><span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{a.paused ? 'Paused from Tuesday 9 June' : `Today · ${trainAt} ${ag?.name ?? 'Development'}`}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{a.paused ? `Back on Tuesday 23 June · with ${coach}` : `Messmate Primary · with ${coach}`}</span></span><button onClick={out6} style={{ ...btn(true), flex: 'none', minHeight: 44, padding: '0 16px', fontSize: 14 }}>Can’t come</button></section>
      <section aria-label="Progress" style={{ borderRadius: 16, background: DEEP, color: '#fff', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER }}>{name.toUpperCase()}’S PROGRESS · TERM 2</span><strong style={{ fontSize: 18, lineHeight: '23px', letterSpacing: '-0.01em' }}>{name} now takes {his} first touch on the move.</strong>
        {(ap ? steps.filter(x => x[2] > x[1]).slice(0, 2) : HOME_STEPS).map(([t, was, now]) => <span key={t} style={{ display: 'flex', alignItems: 'baseline', gap: 8, minHeight: 26, borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: 4 }}><span style={{ flexGrow: 1, fontSize: 13, lineHeight: '18px' }}>{t}</span><span style={{ fontSize: 12, color: MINT, whiteSpace: 'nowrap' }}>Week 1: step {was}</span><span aria-hidden style={{ color: MINT, display: 'flex' }}><I d="M5 12h14M13 6l6 6-6 6" size={12} w={2.2} /></span><strong style={{ fontSize: 17, color: AMBER, whiteSpace: 'nowrap' }}>Step {now} of 5</strong></span>)}
        <button onClick={() => go('FAM37-FromCoach')} style={{ minHeight: 44, marginTop: 2, borderRadius: 999, border: 0, background: AMBER, color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}><I d={PLAY} size={15} />Watch then and now</button></section>
      <section aria-label="Development" style={{ ...card, gap: 2, padding: '10px 14px' }}><strong style={{ fontSize: 15, lineHeight: '20px', paddingBottom: 4 }}>What {name} is working on</strong>
        {work('1', TINTS[2], 'Goal: first touch on the move', `Practice this week · ${done === 0 ? 'three to go' : left === 0 ? 'done three times' : `done ${['', 'once', 'twice'][done]}, ${['', 'one', 'two'][left]} to go`}`, hop('ADP5-Practice'))}
        {work(coach[0], ROSE, `Term 2 report is ready, from ${coach}`, a.chat === 'booked' ? `Chat booked: ${slot[0]}, ${slot[1]}` : a.chat === 'none' ? `${coach} will send it with a spoken note` : 'Then book ten minutes with him in week 9', hop('ADP2-TermReport'))}
        {age >= 15 && work('→', TINTS[3], `${name}’s next step`, 'A reference, a trial, the passport', hop('ADP13-NextStep'))}</section>
      <section aria-label={`Is ${name} looked after?`} style={{ ...card, gap: 2, padding: '10px 14px' }}><strong style={{ fontSize: 15, lineHeight: '20px', paddingBottom: 4 }}>Is {name} looked after?</strong>
        {looked(true, `Sessions ${kid.he ? 'he’s' : 'she’s'} been to`, `${been.came} of ${been.of}`, hop('ADP4-BookChat'))}{looked(true, 'Fees for Term 2', 'Paid', hop('FAM39-Fees'))}
        {a.place === 'kept' ? looked(true, 'Term 3 place', 'Kept', hop('ADP3-KeepPlace')) : a.place === 'left' ? looked(false, 'Term 3 place', 'Released', hop('ADP3-KeepPlace')) : looked(false, 'Term 3 place, held to Fri 19 June', 'Keep it', hop('ADP3-KeepPlace'))}</section>
      <div style={{ display: 'flex', gap: 8 }}>{([[`${name}’s week`, 'ADP8-OtherSport'], ['Book a chat', 'ADP4-BookChat'], ['Pause or stop', 'ADP9-PauseOrStop']] as [string, string][]).map(([t, id]) => <button key={t} onClick={hop(id)} style={{ ...btn(false), minHeight: 46, padding: '0 6px', fontSize: 13 }}>{t}</button>)}</div>
      {demo('the sample academy', <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><button onClick={hop('ADP7-SessionOff')} style={small}>Today’s session is cancelled</button><button onClick={hop('ADP6-BookOneOnOne')} style={small}>Book a one-on-one</button><button onClick={hop('ADP1e-AcademyHomeEmpty')} style={small}>Before {name} starts</button><button onClick={hop('ADP11-Survey')} style={small}>The week 6 survey</button><button onClick={hop('ADP12-MoveOffer')} style={small}>The owner offers a move</button><button onClick={hop('ADP14-WaitingList')} style={small}>A program is full</button><button onClick={hop('ADP13-NextStep')} style={small}>The year a player turns 15</button></div>)}
    </>, 'club') }

  // ── GPp1 · the club's survey, twice a season: five questions, sent without a name. The club sees totals; a team with fewer than five answers is not shown on its own ──
  if (v === 'GPp1-ClubSurvey') { const qs = [`${name} enjoys coming`, `${name} gets a fair go on game day`, `The coach knows ${name}`, 'I know what is going on each week', 'I’d tell a friend to join']
    return shell(v, head(`${name} · U${age < 12 ? age : age + 1} ${coach}`, 'How is the season going?', () => go('FAM40-ClubHome')), <section style={{ ...card, gap: 0, padding: '12px 14px 6px' }}><span style={{ fontSize: 14, lineHeight: '20px', color: MUT, paddingBottom: 8 }}>Five questions, one minute. 1 is no, 5 is yes. {club.replace(/ FC$/, '')} sees totals, never your name.</span>
      {qs.map((q, n) => <div key={q} role="radiogroup" aria-label={q} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '10px 0', borderTop: `1px solid ${HAIR}` }}><strong style={{ fontSize: 15 }}>{q}</strong><div style={{ display: 'flex', gap: 8 }}>{[1, 2, 3, 4, 5].map(k => <button key={k} role="radio" aria-checked={sv[n] === k} onClick={() => { setSv(sv.map((x, i) => i === n ? k : x)); say(`${q}: ${k} of 5.`) }} style={{ flex: 1, minHeight: 44, borderRadius: 12, border: sv[n] === k ? 0 : `1px solid ${MUT}`, background: sv[n] === k ? G : '#fff', color: sv[n] === k ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{k}</button>)}</div></div>)}
    </section>, 'club', actions(true, <button key="a" onClick={() => { if (sv.some(x => !x)) { say('Answer all five first.'); return } say('Thank you. Sent without your name.'); go('FAM40-ClubHome') }} style={btn(true)}>Send</button>)) }

  // ── GPp2 · tell my club, by one short email that we send from the parent (club flows v1). The parent reads it first; it carries no clips or numbers; the contact is used once ──
  if (v === 'GPp2-TellMyClub') { const t = tm ?? { name: f.parent === 'Dana' ? 'Dana Baker' : f.parent, who: `${STAFF.coach}, U${age < 12 ? age : age + 1} coach`, at: `luke@${club.toLowerCase().replace(/[^a-z]/g, '')}.example` }, first = t.who.split(',')[0].trim() || 'them'
    const send = () => { if (!t.name.trim() || !t.who.trim() || !/\S+@\S+\.\S+|\d{8,}/.test(t.at.replace(/\s/g, ''))) { say('Add your name, who should get it, and their email or mobile.'); return } say(`Sent to ${first}, from you. That’s the only message we’ll send.`) }
    return shell(v, head(name, 'Tell my club', () => go(ret === 'FAM12-TellClub' ? ret : 'FAMk5-ClubTour')), <>
      <section style={card}><strong style={{ fontSize: 16 }}>We’ll send one short email, from you</strong><span style={{ fontSize: 15, lineHeight: '21px', color: MUT }}>You read it first. We never contact your club again unless they reply.</span></section>
      <section style={{ ...card, gap: 12 }}>{labelled('Your name', <input value={t.name} onChange={e => setTm({ ...t, name: e.target.value })} style={field} />)}{labelled('Who should get it', <input value={t.who} onChange={e => setTm({ ...t, who: e.target.value })} style={field} />, 'A coach or someone on the committee')}{labelled('Their email or mobile', <input value={t.at} onChange={e => setTm({ ...t, at: e.target.value })} style={field} />, 'Used once, for this email')}</section>
      <span style={note}>It says what you’ve used Clean Sheet for, with a link for the club. It doesn’t include {name}’s clips or numbers.</span>
      <button onClick={() => { setView('FAM12-TellClub'); top() }} style={{ ...under, alignSelf: 'center' }}>Send it myself instead</button>
    </>, 'club', actions(true, <button key="a" onClick={() => say('The email opens to read. Nothing is sent yet.')} style={btn(false)}>Read it first</button>, <button key="b" onClick={send} style={btn(true)}>Send</button>)) }

  // ── FAM40 · the Club tab once the club has joined. The club and the coach can never see a family's own videos, credits or who they share reels with ──
  if (v === 'FAM40-ClubHome') return shell(v, head(club, 'Your club'), <>
    {group([[`From ${coach}`, `${name}’s goal, a clip, the season report`, '1', hop('FAM37-FromCoach')], ['Filming and photos', 'What the club may film and share', '', hop('FAM36-Consent')], ['Raise a concern', 'Goes to the welfare officer', '', hop('FAM38-Concern')], ['Who to contact', 'Coach, manager, welfare officer', '', () => say(`${coach} (coach), ${STAFF.manager} (manager), ${STAFF.welfare} (welfare officer). Tap one to message them.`)]])}
    {group([['Club games', 'Free. They arrive in Reels', '', () => go('FAM18-Reels')], ['Your own filming', 'Half the credits. Private to your family', '', () => side('FAM6-Credits')]])}
    <span style={note}>{club} and {coach} can’t see your own videos, your credits or who you share reels with.</span>
    {demo('the sample club', <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><button onClick={() => { setFamily({ joined: false, toldJoined: false, paused: true }); setView('FAM41-ClubPaused'); top() }} style={small}>{club}’s plan ends</button><button onClick={hop('GPp1-ClubSurvey')} style={small}>The club’s survey</button></div>)}
  </>, 'club')

  // ── FAM41 · the club's plan has ended: what closes again, and what the family keeps. Said once ──
  if (v === 'FAM41-ClubPaused') { const seen = (to: string) => () => { setFamily({ paused: false }); go(to) }
    return shell(v, head(club, 'Your club has paused'), <>
      <section style={{ borderRadius: 16, background: PLUM, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ ...cap, color: '#e6d3d3' }}>FROM 30 JUNE</span><strong style={{ fontSize: 19, lineHeight: '25px' }}>{club} is no longer using Clean Sheet.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#e6d3d3' }}>Team, Learn and messages from the coach close again.</span></section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What you keep</strong><Line a="Every reel you have, club games included" b="Still private to your family" /><Line a={`Your ${f.balance} credits`} b="They don’t run out" /><Line a="Filming your own games" b="Back to full credits" /></section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What closes</strong><Line ok={false} a="Team: chat, who’s coming, forms" b="Ask the club how it will run these" /><Line ok={false} a="Learn and messages from the coach" /><Line ok={false} a="Free club games" /></section>
    </>, null, actions(false, <button key="a" onClick={seen('FAM3-Home')} style={{ ...btn(false), flex: 0.6 }}>OK</button>, <button key="b" onClick={seen('FAM12-TellClub')} style={btn(true)}>Tell my club I want it back</button>)) }

  // ── FAM15c · edit a child, change their club, or remove them. Removing deletes that child's reels and numbers ──
  if (v === 'FAM15c-EditChild') { const ek = f.kids.find(x => x.id === f.edit) ?? kid, cur = ed?.id === ek.id ? ed : { id: ek.id, name: ek.name, year: String(ek.year) }, reels = f.videos.filter(y => y.kid === ek.id && y.state === 'ready').length
    const away = () => { setEd(null); setFamily({ edit: null }); setView('FAM15-Children'); top() }, pick = () => { setQ(''); setView('FAM2c-PickClub'); top() }
    const save = () => { const yr = Number(cur.year); if (!cur.name.trim() || yr < SEASON_MIN || yr > SEASON_MAX) { say('Add a first name and the year they were born.'); return } setFamily(x => ({ kids: x.kids.map(k => k.id === ek.id ? { ...k, name: cur.name.trim(), year: yr } : k) })); say('Saved.') }
    const remove = () => { if (f.kids.length < 2) { say(`${ek.name} is the only child here. To delete everything, open “How we handle your film” in your account.`); return }
      setSure({ text: `Remove ${ek.name}? ${ek.name}’s ${reels} ${reels === 1 ? 'reel' : 'reels'}, their numbers and family links are deleted. This can’t be undone.`, no: `Keep ${ek.name}`, yes: `Remove ${ek.name}`, on: () => { setFamily(x => { const kids = x.kids.filter(k => k.id !== ek.id); return { kids, kid: x.kid === ek.id ? kids[0].id : x.kid, videos: x.videos.filter(y => y.kid !== ek.id), open: '', edit: null, seasonDue: x.seasonDue === ek.id ? null : x.seasonDue } }); setEd(null); setView('FAM15-Children'); top(); say(`${ek.name} has been removed.`) } }) }
    return shell(v, head('Your children', ek.name || 'Your child', away), <>
      <section style={{ ...card, gap: 12 }}>{labelled('First name', <input value={cur.name} onChange={e => setEd({ ...cur, name: e.target.value.split(' ')[0] })} style={field} />)}{labelled('Year born', <input inputMode="numeric" value={cur.year} onChange={e => setEd({ ...cur, year: e.target.value.replace(/\D/g, '').slice(0, 4) })} style={field} />)}</section>
      {group([['Club', f.club?.name ?? 'Not at a club', 'Change', pick], ['Left the club?', `Choose “${ek.name} isn’t at a club”`, '', pick]])}
      {group([[`Remove ${ek.name}`, `Deletes ${ek.name}’s ${reels} ${reels === 1 ? 'reel' : 'reels'} and their numbers`, '', remove]])}
      <span style={note}>Changing club moves {ek.name}’s count to the new club. Reels stay as they are. Club features follow the new club.</span>
    </>, 'home', actions(true, <button key="a" onClick={away} style={btn(false)}>Cancel</button>, <button key="b" onClick={save} style={btn(true)}>Save</button>)) }

  // ── FAM18d · delete a video: what goes, and what it cannot take back. Families who got their own reel from it keep theirs ──
  if (v === 'FAM18d-DeleteVideo' && video) { const j = f.invites?.[video.id]?.joined.length ?? 0, on = f.people.filter(p => p.on).map(p => p.name), made = video.clips.length > 0
    const gone = () => { setFamily(x => { const invites = { ...x.invites }; delete invites[video.id]; return { videos: x.videos.filter(y => y.id !== video.id), invites, open: '', working: x.working === video.id ? null : x.working, picking: false } }); say('Deleted. It leaves our servers within 24 hours.'); setView('FAM18-Reels'); top() }
    return shell(v, head(`${video.title} · ${video.date}`, 'Delete this video?', 'FAM18-Reels'), <>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a={!made ? 'The video goes' : video.stats ? 'The video, the reel and its numbers go' : 'The video and the reel go'} b="From our servers within 24 hours" />
        {made && on.length > 0 && <Line a="Family links to this reel stop working" b={on.join(', ')} />}
        <Line ok={false} a="Film saved to a phone is not removed" b="Yours or a family member’s" />
        {j > 0 && <Line ok={false} a={j === 1 ? 'One team-mate’s family keeps their own reel' : `${WORDS[j]?.[0].toUpperCase()}${WORDS[j]?.slice(1)} team-mates’ families keep their own reels`} b={j === 1 ? 'It was made from this video for them' : 'They were made from this video for them'} />}
        <Line ok={false} a="Credits are not returned" /></section>
      <span style={note}>This can’t be undone.</span>
      {mine.length > 1 && <button onClick={() => { setFamily({ picking: true }); setView('FAM18-Reels'); top() }} style={{ ...under, alignSelf: 'center' }}>Pick a different video</button>}
    </>, 'reels', actions(true, <button key="a" onClick={hop('FAM18-Reels')} style={btn(false)}>Keep it</button>, <button key="b" onClick={gone} style={btn(true)}>Delete</button>)) }

  // ── FAM24 · help: what it is about and a note. It reaches a person with the video and the account attached ──
  if (v === 'FAM24-Help') { const t = f.topic ?? -1, att = video ?? latest
    return shell(v, head('A person replies within a day', 'Help', () => go(ret && ret !== v ? ret : 'FAM19-Account')), <>
      <section style={{ ...card, gap: 0, padding: '12px 14px 2px' }}><strong style={{ fontSize: 14, paddingBottom: 2 }}>What is it about?</strong>
        <div role="radiogroup" aria-label="What is it about?" style={{ display: 'flex', flexDirection: 'column' }}>{TOPICS.map(([a, b], n) => <button key={a} role="radio" aria-checked={t === n} onClick={() => { setFamily({ topic: n }); say(n ? 'Picked. Tell us what happened below.' : 'Pick the reel. We look again for free.') }} style={{ ...row, borderTop: n ? `1px solid ${HAIR}` : 0 }}><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{a}</strong>{b && <span style={{ fontSize: 14, color: MUT }}>{b}</span>}</span>{t === n ? <Dot /> : <I d={CHEV} size={16} />}</button>)}</div></section>
      <section style={card}>{labelled('Tell us what happened', <textarea placeholder="Tap to write" rows={3} value={story} onChange={e => setStory(e.target.value)} style={area} />, `We attach: ${att ? `${att.title} · ${att.date}, and your account` : 'your account'}`)}</section>
      <span style={note}>Is your child in someone else’s video? There is a separate page for that, and you don’t need an account.</span>
      {demo('the separate page', <button onClick={hop('FAM25-RemovalRequest')} style={small}>Open the page another parent would use</button>)}
    </>, 'home', actions(true, <button key="a" onClick={() => { setStory(''); say(`Sent. A person replies within a day, to ${f.email}.`) }} style={btn(true)}>Send</button>)) }

  // ── FAM25 · a web page, no account: a parent who thinks their child can be seen in someone else's video asks for a check. It never needs the child's name ──
  if (v === 'FAM25-RemovalRequest') { const send = () => { if (!/\S+@\S+\.\S+/.test(rq.email)) { say('Add your email so we can reply.'); return } setRq({ club: '', date: '', email: '', note: '' }); say('Sent. We reply within two working days.') }
    return <div data-screen={v} style={phone}><div style={{ flexGrow: 1, padding: '22px 22px 26px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span style={{ color: G }}><Mark /></span>{title('Is your child in someone else’s video?', 30)}
      <span style={{ fontSize: 16, lineHeight: '23px' }}>Every child except the one the parent picked is blurred before anything is saved. If you think that went wrong, tell us and a person checks.</span>
      {labelled('Club', <select value={rq.club} onChange={e => setRq({ ...rq, club: e.target.value })} style={field}><option value="">Tap to choose</option>{CLUBS.map(c => <option key={c.name}>{c.name}</option>)}</select>)}
      {labelled('Date of the game', <input type="date" value={rq.date} onChange={e => setRq({ ...rq, date: e.target.value })} style={field} />)}
      {labelled('Your email', <input type="email" placeholder="So we can reply" value={rq.email} onChange={e => setRq({ ...rq, email: e.target.value })} style={field} />)}
      {labelled('What should we check?', <textarea placeholder="Tap to write" rows={2} value={rq.note} onChange={e => setRq({ ...rq, note: e.target.value })} style={area} />, 'You don’t need to name your child')}
      <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>We reply within two working days. If your child can be seen, we blur them or remove the video, and tell you which.</span>
      {demo('the separate page', <button onClick={hop('FAM24-Help')} style={small}>Back to {f.parent}’s phone</button>)}
      <span style={{ flexGrow: 1 }} /><button onClick={send} style={big(false)}>Send</button>
    </div>{overlays}</div> }

  // ── FAM12 · tell my club ──
  if (v === 'FAM12-TellClub') { const msg = f.message ?? `Hi, I’ve been using Clean Sheet to get ${name}’s highlights from games. It also does a lot for coaches and clubs: session plans, fair turns, clips for every family. ${count ? `A few of us at ${club.replace(/ FC$/, '')} already use it. ` : ''}There’s a page for clubs here if it’s of interest. No pressure at all. ${f.parent}`
    return shell('FAM12-TellClub', head(club, 'Tell my club', 'FAM11-Locked'), <>
      <section style={bold}><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>YOU SEND THIS YOURSELF, TO WHOEVER YOU CHOOSE</span>
        {editing ? <textarea aria-label="Your message" value={msg} onChange={e => setFamily({ message: e.target.value })} rows={8} style={{ padding: 10, borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 15, lineHeight: '21px', color: INK, resize: 'vertical' }} /> : <span style={{ fontSize: 15, lineHeight: '22px', whiteSpace: 'pre-wrap' }}>{msg}</span>}
        <button onClick={() => { setEditing(true); say('Edit the message. It stays yours.') }} style={{ ...under, alignSelf: 'flex-start' }}>Change the wording</button></section>
      <section style={{ ...card, gap: 0, padding: '4px 14px' }}><Line top={false} a="Send it yourself, or have us send it" b="Either way it comes from you" /><Line a="We contact your club only if you ask" b="One short email, from you, that you read first" /><Line a="Your name is not on our club page" b="It shows a number only" /></section>
      <span style={note}>One message is plenty. Volunteers run your club.</span>
      <button onClick={() => { setRet('FAM12-TellClub'); setView('GPp2-TellMyClub'); top() }} style={{ ...under, alignSelf: 'center' }}>Have us send it for you</button>
    </>, 'club', actions(true, <button key="a" onClick={() => go('FAM11-Locked')} style={btn(false)}>Not now</button>, <button key="b" onClick={() => say('Your phone’s share sheet opens with the message and the link.')} style={btn(true)}>Send it myself</button>)) }

  // ── FAM13 · your club has joined ──
  if (v === 'FAM13-ClubJoined') { const seen = () => { setFamily({ toldJoined: true }); setView('FAM14-HomeWithClub'); top() }, kept = f.videos.filter(x => x.clips.length).length
    return shell('FAM13-ClubJoined', head(club, 'Your club has joined'), <>
      <section style={{ borderRadius: 16, background: PLUM, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ ...cap, color: '#e6d3d3' }}>FROM TODAY</span><strong style={{ fontSize: 19, lineHeight: '25px' }}>Team, Learn and your coach are open.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#e6d3d3' }}>And games {club} films are free for you.</span></section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What changes</strong>
        {([['Team and Learn tabs', 'Open'], ['Games the club films', 'Free'], ['Your own filming', 'Half the credits'], [`Your ${f.balance} credits`, `Now about ${aboutGames(f.balance, true)} full ${aboutGames(f.balance, true) === 1 ? 'game' : 'games'}`]] as [string, string][]).map(([a, b]) => <div key={a} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '9px 0', borderTop: `1px solid ${HAIR}`, fontSize: 15 }}><span>{a}</span><strong style={{ flex: 'none' }}>{b}</strong></div>)}</section>
      <section style={{ ...card, gap: 0, padding: '12px 14px 4px' }}><strong style={{ fontSize: 16, paddingBottom: 6 }}>What stays yours</strong><Line a={`Your ${kept} videos and their clips`} b="Private to your family, as before" /><Line a="The club and coach can’t see them" b="There is no way to send them" /><Line a="You can delete them any time" /></section>
      <span style={{ fontSize: 13, lineHeight: '19px', color: MUT }}>The club asks each family what it may film and share. Those questions are next.</span>
    </>, null, actions(false, <button key="a" onClick={seen} style={btn(false)}>{f.toldJoined ? 'Home' : 'Later'}</button>, <button key="b" onClick={() => { setFamily({ toldJoined: true, answered: true }); setView('FAM36-Consent'); top() }} style={btn(true)}>Answer the club’s questions</button>)) }

  // ── FAM11 · the Club tab: what you have now, and what the club would add ──
  if (v === 'FAM11-Locked') { const rows: [string, string, string][] = [['Games covered', 'Ones you film', 'Every game'], ['Filming', 'You set up and upload', 'Done for you'], ['Numbers', 'Per video, estimates', 'All season, side by side'], ['Minutes and positions', '', 'From the team sheet'], ['Cost to you', 'Credits', 'Club games free'], ['From the coach', '', 'Goal, feedback, season report'], ['Learn: practice at home', '', '✓'], ['Team-mates in clips', 'Blurred', 'With each family’s yes'], ['Team: chat, forms, who’s coming', '', '✓']]
    const cell: React.CSSProperties = { padding: '10px 6px', fontSize: 13, lineHeight: '17px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }
    return shell('FAM11-Locked', head(f.club ? club : 'Your club', 'With your club', 'FAM3-Home'), <>
      <section style={{ borderRadius: 16, background: PLUM, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ ...cap, color: '#e6d3d3' }}>{count ? `${families} FAMILIES AT ${club.toUpperCase()} USE THIS` : 'TELL US IF YOUR CLUB JOINS'}</span><strong style={{ fontSize: 19, lineHeight: '25px' }}>You are getting part of it.</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#e6d3d3' }}>The rest needs the club: every game filmed, its coaches and every family’s say-so.</span></section>
      <section role="table" aria-label="You now, and with your club" style={{ ...card, gap: 0, padding: '4px 0 4px 14px', display: 'grid', gridTemplateColumns: '1.25fr 1fr 1fr' }}>
        <span role="columnheader" /><span role="columnheader" style={{ ...cell, ...cap, color: MUT }}>YOU NOW</span><span role="columnheader" style={{ ...cell, ...cap, background: ROSE }}>WITH YOUR CLUB</span>
        {rows.map(([a, now, then]) => [<strong role="rowheader" key={a} style={{ ...cell, justifyContent: 'flex-start', textAlign: 'left', paddingLeft: 0, fontSize: 14, borderTop: `1px solid ${HAIR}` }}>{a}</strong>, <span role="cell" key={a + 1} style={{ ...cell, borderTop: `1px solid ${HAIR}` }}>{now || <span aria-label="Nothing">–</span>}</span>, <strong role="cell" key={a + 2} style={{ ...cell, background: ROSE, borderTop: `1px solid ${HAIR}` }}>{then === '✓' ? <span role="img" aria-label="Yes" style={{ display: 'flex' }}><I d={TICK} size={18} w={2.6} /></span> : then}</strong>])}</section>
      <span style={note}>Clubs decide for themselves. We only show them how many families use this, never who.</span>
      {demo('the sample club', <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{JOINABLE.includes(f.club?.name ?? '') && <><button onClick={() => { setFamily({ joined: true, toldJoined: false, seasonDue: null }); setView('FAM13-ClubJoined'); top() }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>{club} joins</button><button onClick={() => { setFamily({ families: count ? 3 : 14 }); say(count ? 'Three families use it: the number is hidden below five.' : 'Fourteen families use it.') }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>{count ? 'Only 3 families' : '14 families'}</button></>}<button onClick={() => { setView('FAMc1-ClubInterest'); top() }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>What the club sees</button></div>)}
    </>, 'club', actions(true, <button key="a" onClick={tour} style={btn(false)}>Show me</button>, <button key="b" onClick={() => { setView('FAM12-TellClub'); top() }} style={btn(true)}>Tell my club</button>)) }

  // ── FAMc1, opened from the phone: the page a club sees ──
  if (v === 'FAMc1-ClubInterest') return <div><div style={{ maxWidth: 1180, margin: '0 auto', padding: '8px 16px' }}><button onClick={() => setView('FAM11-Locked')} style={under}>Back to the family app</button></div><FamilyClubPage onNav={onNav} /></div>

  // ── FAM19 · your account ──
  if (v === 'FAM19-Account') { const on = f.people.filter(p => p.on)
    return shell('FAM19-Account', head(f.email, 'Your account', back), <>
      {group([['Your children', f.kids.map(x => x.name).join(' and '), '', () => { setView('FAM15-Children'); top() }], ['Credits and receipts', '', String(f.balance), () => { setView('FAM6-Credits'); top() }], ['Family who can watch', on.map(p => p.name).join(', '), String(on.length), () => { if (!f.videos.some(x => x.id === f.open && x.clips.length)) { const any = f.videos.find(x => x.state === 'ready'); if (!any) { say('No reels yet. Add a video from Home.'); return } setFamily({ open: any.id }) } setView('FAM10-ShareFamily'); top() }]])}
      {group([['Tell me when a reel is ready', '', f.notify ? 'On' : 'Off', () => { setFamily({ notify: !f.notify }); say(`Notifications turned ${f.notify ? 'off' : 'on'}. We only ever send this one.`) }], ['How we handle your film', 'Copy, delete or close your account', '', () => { setView('FAM16-Privacy'); top() }], ['Filming tips', '', '', () => { setView('FAM4-BeforeYouFilm'); top() }]])}
      {group([['Something wrong with a reel?', 'Wrong child, a missed moment, a refund', '', () => help(0)], ['Terms', '', '', () => say('The terms open.')], ['Sign out', '', '', () => { setFamily({ signedIn: false }); setView('FAM1-Welcome'); top() }]])}
    </>, 'home') }

  // ── FAM15 · your children ──
  if (v === 'FAM15-Children') return shell('FAM15-Children', head('Your account', 'Your children', () => { setView('FAM19-Account'); top() }), <>
    <section style={{ ...card, gap: 0, padding: '4px 14px 2px' }}>
      {f.kids.map((x, n) => { const reels = f.videos.filter(y => y.kid === x.id && y.state === 'ready').length; return <button key={x.id} onClick={() => { setEd(null); setFamily({ edit: x.id }); setView('FAM15c-EditChild'); top() }} style={{ ...row, minHeight: 66, borderTop: n ? `1px solid ${HAIR}` : 0 }}><span style={{ ...round, background: x.id === kid.id ? G : PALE, color: x.id === kid.id ? '#fff' : INK, fontSize: 16, fontWeight: 700 }}>{x.name[0]}</span><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 17 }}>{x.name}</strong><span style={{ fontSize: 14, color: MUT }}>Born {x.year}{f.club ? ` · ${f.club.name}` : ''} · {reels} {reels === 1 ? 'reel' : 'reels'}</span></span><I d={CHEV} size={16} /></button> })}
      <button onClick={() => { setExtra({ name: '', year: '' }); setView('FAM2-AddChild'); top() }} style={{ ...under, alignSelf: 'flex-start', fontSize: 16, borderTop: `1px solid ${HAIR}`, width: '100%', textAlign: 'left', minHeight: 52 }}>Add a child</button></section>
    <section style={card}><strong style={{ fontSize: 16 }}>Both in the same video?</strong><span style={{ fontSize: 15, lineHeight: '21px' }}>Tap both when you upload. Each gets their own reel, and the second child adds {RATES.secondChild} credits.</span></section>
    <section style={card}><strong style={{ fontSize: 16 }}>The same at every age</strong><span style={{ fontSize: 15, lineHeight: '21px' }}>Every age: clips and game stats, each number marked as an estimate.</span></section>
    <span style={note}>Only children you are the parent or guardian of.</span>
    <button onClick={() => { setEd(null); setFamily({ edit: kid.id }); setView('FAM15c-EditChild'); top() }} style={{ ...under, alignSelf: 'center' }}>Edit or remove a child</button>
    {!f.kids.some(x => x.id === SAMPLE_OLDER.id) && demo('a second child', <button onClick={() => { addSampleOlder(); go('FAM3-Home'); say(`Showing ${SAMPLE_OLDER.name}.`) }} style={{ ...btn(false), minHeight: 44, fontSize: 14 }}>Add {SAMPLE_OLDER.name}, with three games and their stats</button>)}
  </>, 'home')

  // ── FAM18 · the Reels tab: every video and its state ──
  if (v === 'FAM18-Reels') return shell('FAM18-Reels', head(`${f.balance} credits · ${games}`, 'Reels'), <>
    {switcher}
    {locked('Every club game, here, free', 'Filmed by the club. Nothing for you to film, no credits.')}
    <section style={{ ...card, gap: 0, padding: '4px 14px' }}>
      {mine.map((x, n) => <button key={x.id} onClick={() => { if (!f.picking) { openVideo(x); return } setFamily({ picking: false, open: x.id }); setView('FAM18d-DeleteVideo'); top() }} style={{ ...row, minHeight: 70, borderTop: n ? `1px solid ${HAIR}` : 0 }}>
        <span style={{ flex: 'none', width: 96 }}>{x.state === 'working' ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '16 / 9', borderRadius: 10, background: NIGHT, color: '#fff' }}><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="9" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" /><path d="M12 3a9 9 0 019 9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg></span>
          : x.state === 'unread' ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '16 / 9', borderRadius: 10, border: `1px dashed ${MUT}`, color: MUT, boxSizing: 'border-box' }}><I d={CROSS} size={16} /></span> : <Thumb kind="team" len={reelOf(x.clips)} wide />}</span>
        <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16, lineHeight: '20px' }}>{x.title}{x.clips.length ? ` · ${x.clips.length} ${x.clips.length === 1 ? 'moment' : 'moments'}` : ''}</strong>
          <span style={{ fontSize: 14, color: MUT }}>{[x.date, x.state === 'working' ? 'about 6 minutes to go' : x.state === 'few' ? 'credits returned' : x.state === 'unread' ? 'couldn’t read it, no credits used' : x.note].filter(Boolean).join(' · ')}</span></span></button>)}
      {!mine.length && <span style={{ fontSize: 15, color: MUT, padding: '14px 0' }}>Nothing for {name} yet.</span>}</section>
    <span style={note}>{f.picking ? 'Tap the video to delete.' : 'Private to your family. Kept until you delete them.'}</span>
    {mine.length > 0 && <button onClick={() => { if (f.picking) { setFamily({ picking: false }); return } const x = mine.find(y => y.id === f.open) ?? mine.find(y => y.state === 'ready') ?? mine[0]; setFamily({ open: x.id }); setView('FAM18d-DeleteVideo'); top() }} style={{ ...under, alignSelf: 'center' }}>{f.picking ? 'Cancel' : 'Delete a video'}</button>}
  </>, 'reels', actions(true, <button key="a" onClick={() => go('FAM5-Check')} style={btn(true)}>Add a video</button>))

  // ── FAM17 and FAM17u · the Learn tab. Before the club joins it is a picture of the page, dimmed, under a panel that says what it is and why it is closed. After, the page itself ──
  if (LEARNS.includes(v)) { const kind = (['turn', 'look', 'pass', 'won'] as Kind[]).find(k => latest?.clips.some(c => c.kind === k)), game = kind ? KINDS[kind].game : '', len = (t: string) => clockOf(byTitle(t, 'players')?.secs ?? 0)
    const page = <>
      {switcher}
      {kind && latest && <section style={{ ...card, gap: 8 }}><span style={{ ...cap, color: MUT }}>BECAUSE OF {latest.day.toUpperCase()}’S REEL</span><strong style={{ fontSize: 17, lineHeight: '22px' }}>{name} {KINDS[kind].did}. Here is a game for it.</strong><button onClick={() => lib(game)} style={{ ...btn(true), flex: 'none' }}>{game} · {len(game)}</button></section>}
      {SHELVES.map(([t, items]) => <section key={t} aria-label={t} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><strong style={{ fontSize: 16 }}>{t}</strong><button aria-label={`See all, ${t}`} onClick={() => { setAll(all === t ? '' : t); say(`All of ${t}.`) }} style={{ ...link, fontSize: 13 }}>See all</button></div>
        <div style={{ display: 'flex', gap: 10, flexWrap: all === t ? 'wrap' : 'nowrap', overflowX: all === t ? undefined : 'auto', paddingBottom: 4 }}>{items.map(([i, sort]) => <button key={i} onClick={() => lib(i)} style={{ flex: 'none', width: 158, display: 'flex', flexDirection: 'column', gap: 3, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><Thumb kind={sort === 'Game' ? 'drawn' : 'figure'} len={len(i)} wide /><strong style={{ fontSize: 14, lineHeight: '18px', marginTop: 2 }}>{i}</strong><span style={{ fontSize: 12, color: MUT }}>{sort === 'Clip' ? `Clip · ${len(i)}` : sort}</span></button>)}</div></section>)}
    </>
    if (f.joined) return shell('FAM17u-LearnWithClub', head(`From ${club}`, 'Play at home'), <>{page}
      <span style={note}>Picked for under {age < 12 ? age : age + 1} from {club}’s library. Luke can send {name} clips here too.</span>
    </>, 'learn')
    // The page behind is a picture of the feature, not the feature: it cannot be tapped, focused or read out. The panel cannot be dismissed; the tabs still work.
    return closed('FAM17-Learn', 'Learn', `Short clips and games for ${name} to try at home, matched to what ${his} reels show.`, 'It is made from the club’s own clips and its coaches’ picks, so there is nothing to show until the club is on board.', ['A game picked from each reel', `Clips and practice sent by ${name}’s coach`, 'Warm-ups that help prevent injuries'], page, 'learn') }

  // ── FAM14 · home after the club joins ──
  if (v === 'FAM14-HomeWithClub') { const own = f.videos.filter(x => x.state === 'ready' && x.kid === kid.id).slice(0, 2)
    return shell('FAM14-HomeWithClub', head(`U11 Luke · ${club.replace(/ FC$/, '')}`, `Hi ${f.parent}`), <>
      <section style={card}><span style={{ ...cap, color: MUT }}>FROM YOUR CLUB · FREE</span><strong style={{ fontSize: 18, lineHeight: '24px' }}>Sunday 9:30 v Eastbank, home</strong><span style={{ fontSize: 14, color: MUT }}>Luke: two things to try before Tuesday</span>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}><button aria-pressed={f.rsvp.sun === true} onClick={() => { rsvp('sun', true); say(`Luke can see ${name} is coming.`) }} style={btn(true)}>{name} is coming</button><button onClick={hop('FAM37-FromCoach')} style={btn(false)}>From Luke</button></div></section>
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
