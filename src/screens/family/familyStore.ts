// Clean Sheet Family (family-app-v2): a parent films a game, and credits pay for finding their own child's moments.
// This is a demo of the flows on sample data. Nothing here analyses real film, and the purchase is a stub.
// Prices, pack sizes, the rate table and the club offer are placeholders until Booker confirms them.

import { useSyncExternalStore } from 'react'

// ── The rate table. A game's cost follows the work: change a number here and every quote and example follows. ──
export const RATES = { perMinute: 1.6, secondChild: 30, /** parent filming after the club joins */ joinedFactor: 0.5, /** "about N games" is the balance over one game of this length */ usualMinutes: 50, /** fewer clips than this and the credits come back */ minClips: 3, quoteHoldsHours: 24 }
export const PACKS: { credits: number; price: number; extra: number }[] = [{ credits: 160, price: 10, extra: 0 }, { credits: 440, price: 25, extra: 40 }, { credits: 960, price: 50, extra: 160 }]
export const quote = (minutes: number, children = 1, joined = false) => Math.round((minutes * RATES.perMinute + (children - 1) * RATES.secondChild) * (joined ? RATES.joinedFactor : 1))
export const aboutGames = (balance: number, joined = false) => Math.floor(balance / quote(RATES.usualMinutes, 1, joined))
/** The club count shows only at this many families or more, and the placeholder offer starts at the second number. */
export const SHOW_COUNT_AT = 5, OFFER_AT = 10
/** The season the sample data sits in: a child born in 2015 is under 11. */
export const SEASON = 2026
export const ageOf = (year: number) => SEASON - year
/** Under 12: clips and things done well, no numbers. Counts start at 13. */
export const showsCounts = (year: number) => ageOf(year) >= 13

// ── Sample films a parent can "choose". The check reads each one differently. ──
export type Film = { id: string; label: string; opponent: string; date: string; minutes: number; readable: number; inShot: number; moments: number; /** why it could not be read */ fail?: [string, string, boolean][]; /** the club's camera already covered it */ clubFilmed?: boolean }
export const FILMS: Film[] = [
  { id: 'f50', label: '50 minutes, filmed well', opponent: 'Ridgeway', date: 'Sat 13 June', minutes: 50, readable: 38, inShot: 24, moments: 5 },
  { id: 'f90', label: '90 minutes, filmed well', opponent: 'Ridgeway', date: 'Sat 13 June', minutes: 90, readable: 71, inShot: 44, moments: 7 },
  { id: 'bad', label: 'Upright and shaky', opponent: 'Ridgeway', date: 'Sat 13 June', minutes: 50, readable: 6, inShot: 2, moments: 0, fail: [['The phone was upright', 'Sideways shows much more of the pitch', false], ['It moved a lot', 'Lean on a fence or use a small stand', false], ['The light was fine', '', true]] },
  { id: 'few', label: '50 minutes, child mostly out of shot', opponent: 'Ridgeway', date: 'Sat 13 June', minutes: 50, readable: 31, inShot: 7, moments: 2 },
  { id: 'club', label: 'Saturday’s game, which the club filmed', opponent: 'Ridgeway', date: 'Sat 20 June', minutes: 50, readable: 38, inShot: 24, moments: 5, clubFilmed: true },
]
export const film = (id: string) => FILMS.find(f => f.id === id) ?? FILMS[0]
/** A film can be read when the play can be followed for at least a third of it. */
export const readable = (f: Film) => f.readable * 3 >= f.minutes

export type Clip = { len: string; title: string; short?: string; minute: string; notice?: string }
export type Game = { id: string; opponent: string; label?: string; date: string; day: string; reel: string; clips: Clip[]; credits: number; note?: string; /** three counts, 13 and over only */ counts?: { onBall: number; passes: [number, number]; shots: number; inShot: number; minutes: number } }
const RIDGEWAY: Clip[] = [
  { len: '0:09', title: 'Looked up before the ball came', short: 'Looked up first', minute: '14th minute', notice: 'Watch {name}’s head just before the ball arrives. He checks over his shoulder, then takes it away from the defender.' },
  { len: '0:11', title: 'Turned away from a defender', minute: '22nd minute' }, { len: '0:08', title: 'Passed and moved', minute: '31st minute' },
  { len: '0:10', title: 'Got back to help', minute: '38th minute' }, { len: '0:10', title: 'Called for the ball in space', minute: '44th minute' },
]
const some = (n: number): Clip[] => RIDGEWAY.slice(0, n).map(c => ({ ...c, notice: undefined }))
export const SAMPLE_GAMES: Game[] = [
  { id: 'g1', opponent: 'Ridgeway', date: 'Sat 13 June', day: 'Saturday', reel: '0:48', clips: RIDGEWAY, credits: 80 },
  { id: 'g2', opponent: 'Parkside', date: 'Sat 6 June', day: 'Saturday', reel: '0:39', clips: some(4), credits: 80 },
  { id: 'g3', opponent: 'Northgate City', date: 'Sat 30 May', day: 'Saturday', reel: '0:55', clips: [...some(5), { len: '0:07', title: 'Won it back', minute: '47th minute' }], credits: 80 },
  { id: 'g4', opponent: 'Lakeside', date: 'Sat 23 May', day: 'Saturday', reel: '0:31', clips: some(3), credits: 80 },
]
const MIA_GAME: Game = { id: 'm1', opponent: 'Eastbank', date: 'Sat 13 June', day: 'Saturday', reel: '1:12', credits: 112, counts: { onBall: 41, passes: [27, 33], shots: 3, inShot: 44, minutes: 70 },
  clips: [{ len: '0:10', title: 'Switched the play', minute: '18th minute' }, { len: '0:12', title: 'Won it back and passed forward', minute: '52nd minute' }, ...some(5).map((c, n) => ({ ...c, minute: `${58 + n * 2}th minute` }))] }
const FUTSAL: Game = { id: 'g5', opponent: '', label: 'Sunday futsal', date: 'Sun 14 June', day: 'Sunday', reel: '0:36', clips: some(4), credits: 40, note: 'your phone' }

export type Person = { name: string; how: string; on: boolean }
export type Family = {
  parent: string; child: { name: string; year: number; club: string; colour: string; number: string; he: boolean }
  /** set once the two starting steps are done, and once the filming rules have been read */ started: boolean; tips: boolean
  balance: number; games: Game[]; open: string; clip: number
  /** the film chosen for the check, and a quote that is being held */ film: string; held: { film: string; credits: number } | null; working: { film: string; credits: number } | null
  people: Person[]
  /** families at the same club, the club's state, and whether "your club has joined" has been shown */ families: number; joined: boolean; toldJoined: boolean; coming: boolean
  pack: number; message: string | null
}
const PEOPLE: Person[] = [{ name: 'Kerem', how: 'Ari’s dad · has the app', on: true }, { name: 'Nan and Pop', how: 'Watch by a private link', on: true }, { name: 'Aunty Selin', how: 'Watch by a private link', on: false }]
const base = (): Family => ({ parent: 'Dana', child: { name: 'Ari', year: 2015, club: 'Hillview FC', colour: 'Red', number: '7', he: true }, started: true, tips: true, balance: 240, games: SAMPLE_GAMES, open: 'g1', clip: 0, film: 'f50', held: null, working: null, people: PEOPLE, families: 14, joined: false, toldJoined: false, coming: false, pack: 1, message: null })
const brandNew = (): Family => ({ ...base(), started: false, tips: false, balance: 0, games: [] })
/** Each board opens in the state it is drawn in. */
export function preset(id: string): Family {
  const b = base()
  if (id === 'FAM1-Welcome' || id === 'FAM2-AddChild') return brandNew()
  if (id === 'FAM4-BeforeYouFilm') return { ...brandNew(), started: true }
  if (id === 'FAM3e-HomeEmpty') return { ...brandNew(), started: true, tips: true }
  if (id === 'FAM5x-CantRead') return { ...b, film: 'bad' }
  if (id === 'FAM7-Working') return { ...b, working: { film: 'f50', credits: 80 }, balance: 160 }
  if (id === 'FAM8b-Results13') return { ...b, child: { name: 'Mia', year: 2012, club: 'Hillview FC', colour: 'Blue', number: '11', he: false }, games: [MIA_GAME], open: 'm1', people: PEOPLE.map(p => ({ ...p, how: p.how.replace('Ari', 'Mia') })) }
  if (id === 'FAM13-ClubJoined') return { ...b, joined: true }
  if (id === 'FAM14-HomeWithClub') return { ...b, joined: true, toldJoined: true, games: [FUTSAL, ...SAMPLE_GAMES.slice(1)], open: 'g5' }
  if (id === 'FAM5c-ClubFilmedThis') return { ...b, joined: true, toldJoined: true, film: 'club', games: [FUTSAL, ...SAMPLE_GAMES.slice(1)], open: 'g5' }
  return b
}

const KEY = 'cs_family_v1'
let state: Family = (() => { try { const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Family | null; if (v?.child && v.games) return v } catch { /* start again */ } return brandNew() })()
const subs = new Set<() => void>()
export function setFamily(patch: Partial<Family> | ((f: Family) => Partial<Family>)) { state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) }; try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* kept for this visit only */ } subs.forEach(f => f()) }
export const useFamily = (): Family => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => state, () => state)
export const familyNow = () => state
export const freshFamily = brandNew

/** Use the quoted credits and start the work. The quote is the price: it is what leaves the balance, whatever the work turns out to take. */
export function spend(filmId: string, credits: number) { setFamily(f => ({ balance: f.balance - credits, working: { film: filmId, credits }, held: null })) }
/** The work has finished. Fewer than three clips and the credits return by themselves. */
export function finish(): { ok: boolean; back: number } {
  const w = state.working; if (!w) return { ok: false, back: 0 }
  const f = film(w.film), counts = showsCounts(state.child.year)
  if (f.moments < RATES.minClips) { setFamily(s => ({ balance: s.balance + w.credits, working: null })); return { ok: false, back: w.credits } }
  const src = f.moments > 5 ? [...RIDGEWAY, { len: '0:07', title: 'Won it back', minute: '61st minute' }, { len: '0:09', title: 'Played it forward first time', minute: '77th minute' }] : RIDGEWAY
  const id = `n${Date.now()}`, clips = src.slice(0, f.moments)
  const g: Game = { id, opponent: f.opponent, date: f.date, day: 'Saturday', reel: `0:${String(clips.reduce((a, c) => a + Number(c.len.split(':')[1]), 0)).padStart(2, '0')}`, clips, credits: w.credits, counts: counts ? { onBall: Math.round(f.inShot * 0.93), passes: [Math.round(f.inShot * 0.61), Math.round(f.inShot * 0.75)], shots: 2, inShot: f.inShot, minutes: f.minutes } : undefined }
  setFamily(s => ({ games: [g, ...s.games], open: id, clip: 0, working: null })); return { ok: true, back: 0 }
}
