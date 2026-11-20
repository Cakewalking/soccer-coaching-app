// Clean Sheet Family (family-app-v9): a parent uploads a video, and credits pay for finding their own child's moments.
// This is a demo of the flows on sample data. Nothing here analyses real film, and the purchase is a stub.
// Prices, pack sizes, the rate table, the check's thresholds and the club offer are placeholders until Booker confirms them.

import { useSyncExternalStore } from 'react'

// ── The rate table. A video's cost follows the work: change a number here and every quote and example follows. ──
// Design's prices of 20 Nov, set against model costs: 2 credits a minute, and $10 buys 100 credits (one 50-minute game).
export const RATES = { perMinute: 2, secondChild: 40, /** parent filming after the club joins */ joinedFactor: 0.5, /** "about N full games" is the balance over one game of this length */ usualMinutes: 50, /** a short video, for the example on the credits page */ shortMinutes: 10, quoteHoldsHours: 24 }
/** The check's thresholds, and what a reel needs. */
export const CHECK = { /** the play must be followable for this share of the video */ readableShare: 1 / 3, /** child in shot for fewer minutes of a full game than this is a maybe */ minInShot: 10, /** and of a short video, for less than this share of it */ shortShare: 0.3, /** a video this long or longer needs three moments for a reel; a shorter one needs one */ fullFrom: 20, minClips: 3, minClipsShort: 1, /** stats come only from a full game */ statsFrom: 40, /** missed moments a parent may add to one video */ missed: 3, missedDays: 30 }
export const PACKS: { credits: number; price: number; extra: number }[] = [{ credits: 100, price: 10, extra: 0 }, { credits: 275, price: 25, extra: 25 }, { credits: 600, price: 50, extra: 100 }]
export const quote = (minutes: number, children = 1, joined = false) => Math.round((minutes * RATES.perMinute + (children - 1) * RATES.secondChild) * (joined ? RATES.joinedFactor : 1))
export const aboutGames = (balance: number, joined = false) => Math.floor(balance / quote(RATES.usualMinutes, 1, joined))
/** The club count shows only at this many families or more, and the placeholder offer starts at the second number. */
export const SHOW_COUNT_AT = 5, OFFER_AT = 10
/** The season the sample data sits in: a child born in 2015 is under 12. */
export const SEASON = 2026
export const ageOf = (year: number) => SEASON - year
/** Booker's ruling, 20 Nov: every child's full game has a Stats page. Age still decides Home: from 12 it leads with numbers and trends; under 12 it counts kinds of good moment. */
export const showsStats = (year: number) => ageOf(year) >= 12
export const ord = (n: number) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`
export const secsOf = (len: string) => { const [m, s] = len.split(':').map(Number); return m * 60 + s }
export const clockOf = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

// ── Clips. Each kind of good moment has one name, so Home can count them. ──
export type Kind = 'turn' | 'look' | 'pass' | 'won'
export const KINDS: Record<Kind, { title: string; len: string; did: string; game: string }> = {
  turn: { title: 'Turned away from a defender', len: '0:11', did: 'turned away from a defender', game: 'King of the ring' },
  look: { title: 'Looked up before the ball came', len: '0:09', did: 'looked up before the ball came', game: 'Look, then touch' },
  pass: { title: 'Passed and moved', len: '0:08', did: 'passed and moved', game: 'Wall ball to 20' },
  won: { title: 'Won it back', len: '0:10', did: 'won it back', game: 'King of the ring' },
}
export type Clip = { len: string; title: string; short?: string; minute: string; kind?: Kind; notice?: string; /** a goal, a forward pass, a take-on that came off, a ball won in the other half */ tag?: boolean }
const k = (kind: Kind, minute: number): Clip => ({ kind, len: KINDS[kind].len, title: KINDS[kind].title, minute: `${ord(minute)} minute` })
const NOTICE = 'Watch {name}’s head just before the ball arrives. He checks over his shoulder, then takes it away from the defender.'
const POOL: Clip[] = [{ ...k('look', 14), short: 'Looked up first', notice: NOTICE }, k('turn', 22), k('pass', 31), k('won', 40), { ...k('turn', 44), len: '0:10' }, k('look', 52), k('pass', 61)]
export const reelOf = (clips: Clip[]) => clockOf(clips.reduce((a, c) => a + secsOf(c.len), 0))

// ── Stats, 12 and over, from a full game. Every number is the clips it was counted from. ──
export type StatKey = 'passes' | 'shots' | 'took' | 'won'
export type Stats = { inShot: number; minutes: number; onBall: number; /** passes tried */ tried: number; thirds: [number, number, number]; lists: Record<StatKey, Clip[]> }
export const STAT: Record<StatKey, { one: string; many: string; label: string; not: string }> = {
  passes: { one: 'pass', many: 'passes', label: 'Passes reached a team-mate', not: 'a pass' }, shots: { one: 'shot', many: 'shots', label: 'Shots', not: 'a shot' },
  took: { one: 'take-on', many: 'take-ons', label: 'Took a player on', not: 'a take-on' }, won: { one: 'ball won back', many: 'balls won back', label: 'Won the ball back', not: 'a ball won back' },
}
/** n clips spread through the game, `marked` of them tagged and spread evenly among the rest. */
const gen = (n: number, minutes: number, marked: number, plain: string, special: string): Clip[] => Array.from({ length: n }, (_, i) => { const tag = Math.floor((i + 1) * marked / n) > Math.floor(i * marked / n); return { len: `0:0${6 + (i % 4)}`, title: tag ? special : plain, minute: `${ord(Math.max(1, Math.round((i + 1) * minutes / (n + 1))))} minute`, tag } })
function stats(minutes: number, inShot: number, onBall: number, tried: number, reached: number, forward: number, shots: Clip[], took: [number, number], won: [number, number]): Stats {
  const a = Math.round(onBall * 0.2), c = Math.round(onBall * 0.27)
  return { minutes, inShot, onBall, tried, thirds: [a, onBall - a - c, c], lists: { passes: gen(reached, minutes, forward, 'Pass to a team-mate', 'Pass forward'), shots, took: gen(took[0], minutes, took[1], 'Took a player on', 'Took a player on, came off'), won: gen(won[0], minutes, won[1], 'Won the ball back', 'Won it back in the other half') } }
}
const shot = (title: string, minute: number, len: string, tag = false): Clip => ({ title, minute: `${ord(minute)} minute`, len, tag })
/** Stats for a new video, scaled from the minutes the child was in shot. */
const statsFor = (minutes: number, inShot: number) => { const s = inShot / 44, n = (v: number) => Math.max(1, Math.round(v * s)); return stats(minutes, inShot, n(41), n(33), n(27), n(9), [shot('Shot, saved', Math.round(minutes * 0.33), '0:08'), shot('Goal, left foot', Math.round(minutes * 0.58), '0:11', true)].slice(0, Math.max(1, n(2))), [n(4), n(2)], [n(5), n(3)]) }
export const tagged = (l: Clip[]) => l.filter(c => c.tag).length

// ── Sample videos a parent can "choose". The check reads each one differently. ──
export type Film = { id: string; label: string; title: string; minutes: number; /** a short video: the check says only whether the child can be seen */ short?: boolean; readable: number; inShot: number; /** moments the check expects, and what the work then finds */ moments: number; found: number; /** the minutes around the child that a maybe would work on */ around?: number; /** in shot, as it turned out */ actual?: number; /** the phone's own check, before upload */ phone?: [string, string, boolean][]; /** why it could not be read */ fail?: [string, string, boolean][]; /** the club's camera already covered it */ clubFilmed?: boolean }
/** How a sample video was filmed. The length is the parent's to choose: any number of minutes. */
export type How = 'well' | 'out' | 'thin' | 'bad' | 'club'
export const HOWS: [How, string][] = [['well', 'Filmed well'], ['out', 'Child mostly out of shot'], ['thin', 'Fewer moments than it looked'], ['bad', 'Upright and shaky'], ['club', 'The club filmed this game']]
export const MAX_MINUTES = 90
const OLD: Record<string, string> = { f50: 'well:50', f90: 'well:90', park: 'well:10', maybe: 'out:50', thin: 'thin:50', bad: 'bad:50', club: 'club:50' }
export const filmId = (how: How, minutes: number) => `${how}:${Math.max(1, Math.min(MAX_MINUTES, Math.round(minutes)))}`
/** A sample video of any length. What the check reads follows from its length and how it was filmed. */
export function film(id: string): Film {
  const [h, n] = (OLD[id] ?? id).split(':'), how = (HOWS.some(x => x[0] === h) ? h : 'well') as How, m = Math.max(1, Math.min(MAX_MINUTES, Number(n) || 50)), short = m < CHECK.fullFrom, r = (x: number) => Math.max(1, Math.round(m * x))
  const most = short ? (m < 8 ? 1 : 2) : Math.max(CHECK.minClips, Math.min(7, Math.round(m / 10)))
  const base = { id: filmId(how, m), label: HOWS.find(x => x[0] === how)![1], title: short ? `A ${m}-minute video` : 'v Ridgeway', minutes: m, short: short || undefined }
  if (how === 'out') return { ...base, readable: r(0.62), inShot: r(0.12), moments: Math.min(2, most), found: 1, around: Math.max(2, Math.round(m * 0.3)) }
  if (how === 'thin') return { ...base, readable: r(0.72), inShot: short ? r(0.6) : Math.max(CHECK.minInShot, r(0.24)), moments: most, found: short ? 0 : 1, actual: r(0.12) }
  if (how === 'bad') return { ...base, readable: Math.round(m * 0.12), inShot: Math.round(m * 0.04), moments: 0, found: 0, phone: [['Filmed upright', 'We see a thin strip of the pitch', false], ['Moves a lot', 'Hard to follow one player', false], ['Light and sharpness are fine', '', true]], fail: [['The phone was upright', 'Sideways shows much more of the pitch', false], ['It moved a lot', 'Lean on a fence or use a small stand', false], ['The light was fine', '', true]] }
  return { ...base, readable: r(0.76), inShot: short ? r(0.8) : Math.max(CHECK.minInShot, r(0.48)), moments: most, found: most, clubFilmed: how === 'club' || undefined }
}
export const howOf = (id: string) => ((OLD[id] ?? id).split(':')[0]) as How
export type Outcome = 'club' | 'no' | 'maybe' | 'good'
/** The check's three outcomes, and the fourth for a game the club's camera already has. */
export function outcome(f: Film, joined: boolean): Outcome {
  if (joined && f.clubFilmed) return 'club'
  if (f.readable < f.minutes * CHECK.readableShare) return 'no'
  if (f.inShot < (f.short ? f.minutes * CHECK.shortShare : CHECK.minInShot) || f.moments < (f.short ? CHECK.minClipsShort : CHECK.minClips)) return 'maybe'
  return 'good'
}
/** What a video costs: a maybe is quoted on the stretches around the child, and a parent may use just half. */
export const priceOf = (f: Film, joined: boolean, both = false, part = 0) => quote(part || (outcome(f, joined) === 'maybe' ? f.around ?? f.minutes : f.minutes), both ? 2 : 1, joined)
/** The first minutes of a video that a balance covers, when it does not cover the whole of it. */
export const affordable = (balance: number, joined: boolean, both = false) => Math.max(0, Math.floor((balance / (joined ? RATES.joinedFactor : 1) - (both ? RATES.secondChild : 0)) / RATES.perMinute))
/** What a pack is worth in full games, in words: "1 full game", "Nearly 3 full games", "About 2 full games". */
export const worth = (credits: number) => { const g = credits / quote(RATES.usualMinutes), n = Math.floor(g), near = g - n >= 0.7; const k = near ? n + 1 : n; return `${g === n ? '' : near ? 'Nearly ' : 'About '}${k} full ${k === 1 ? 'game' : 'games'}` }

export type Kid = { id: string; name: string; year: number; he: boolean; colour: string; number: string }
export type Video = { id: string; kid: string; title: string; date: string; day: string; state: 'working' | 'ready' | 'few' | 'unread'; /** the sample it was made from, while it is being worked on */ film?: string; minutes: number; clips: Clip[]; credits: number; maybe?: boolean; both?: boolean; note?: string; inShot?: number; stats?: Stats; /** missed moments the parent has added */ added: number }
export const named = (v: Video, name: string) => v.title.startsWith('v ') ? `${name} ${v.title}` : v.title
export const fullGames = (vs: Video[]) => vs.filter(v => v.state === 'ready' && v.stats)
export type Club = { name: string; place: string; uses?: boolean; unmatched?: boolean }
/** A small sample of the directory of clubs. Where the real list comes from is not decided. */
export const CLUBS: (Club & { far?: string; sort?: string })[] = [
  { name: 'Hillview FC', place: 'Hillview, Victoria', far: '2 km away' }, { name: 'Hillview Heights SC', place: 'Hillview Heights, Victoria', far: '9 km away', uses: true },
  { name: 'Hillvale United', place: 'Hillvale, New South Wales' }, { name: 'Hillview Futsal Club', place: 'Hillview, Victoria', sort: 'futsal' },
  { name: 'Ridgeway Rovers', place: 'Ridgeway, Victoria', far: '6 km away' }, { name: 'Parkside United', place: 'Parkside, Victoria', far: '11 km away' }, { name: 'Lakeside SC', place: 'Lakeside, Victoria', far: '14 km away' },
]
export type Person = { name: string; how: string; on: boolean }
export type Family = {
  parent: string; email: string; signedIn: boolean
  kids: Kid[]; kid: string; club: Club | null
  /** the one free video, and the offer of credits that follows it once */ freeUsed: boolean; offered: boolean
  balance: number; videos: Video[]; open: string; clip: number; /** which list the open clip is from: the reel, or one stat */ from: 'reel' | StatKey; stat: StatKey
  /** the video chosen for the check, a quote that is being held, and the work under way */ film: string; /** the first minutes of it only, or 0 for all of it */ part: number; both: boolean; anyway: boolean; held: { film: string; credits: number } | null; working: string | null
  people: Person[]; notify: boolean
  /** families at the same club, the club's state, and whether "your club has joined" has been shown */ families: number; joined: boolean; toldJoined: boolean; coming: boolean
  pack: number; message: string | null; /** the library item that is open */ item: string
  /** "three games in": the child it is due for, and the children it has been shown for (once each) */ seasonDue: string | null; seasonTold: string[]
}
const ARI: Kid = { id: 'ari', name: 'Ari', year: 2015, he: true, colour: 'red', number: '7' }, MIA: Kid = { id: 'mia', name: 'Mia', year: 2012, he: false, colour: 'red', number: '11' }
const HILLVIEW: Club = { name: 'Hillview FC', place: 'Hillview, Victoria' }
const vid = (id: string, kid: string, title: string, date: string, clips: Clip[], more: Partial<Video> = {}): Video => ({ id, kid, title, date, day: date.startsWith('Wed') ? 'Wednesday' : date.startsWith('Sat') ? 'Saturday' : 'Sunday', state: 'ready', minutes: 50, clips, credits: 100, added: 0, ...more })
const RIDGEWAY = vid('g1', 'ari', 'v Ridgeway', 'Sun 14 June', POOL.slice(0, 5), { stats: statsFor(50, 24) })
const PARKSIDE = vid('g2', 'ari', 'v Parkside', 'Sun 7 June', [k('turn', 9), k('look', 18), k('pass', 27), k('turn', 41)], { stats: statsFor(50, 21) })
const NORTHGATE = vid('g3', 'ari', 'v Northgate City', 'Sun 31 May', [k('turn', 6), k('look', 15), k('look', 24), k('pass', 33), k('pass', 39), k('won', 47)], { stats: statsFor(50, 26) })
const PARK = vid('g0', 'ari', 'Training at the park', 'Today', [], { state: 'working', film: 'park', minutes: 10, credits: 20 })
const LAKESIDE = vid('g4', 'ari', 'v Lakeside', 'Sun 21 June', [{ len: '0:09', title: 'Ran with the ball into space', minute: '19th minute' }], { state: 'few', credits: 0, inShot: 6 })
const BACKYARD = vid('g5', 'ari', 'Backyard', 'Sat 23 May', [], { state: 'unread', film: 'bad', credits: 0 })
const FUTSAL = vid('g6', 'ari', 'Wednesday futsal', 'Wed 17 June', [k('look', 4), k('turn', 11), k('pass', 19), k('pass', 26)], { minutes: 30, credits: 60, note: 'your phone' })
const MIAS: Video[] = [
  vid('m1', 'mia', 'v Eastbank', 'Sun 14 June', [{ len: '0:10', title: 'Switched the play', minute: '18th minute' }, { len: '0:12', title: 'Won it back and passed forward', minute: '52nd minute' }, k('look', 27), k('turn', 36), k('pass', 44), k('pass', 58), k('pass', 66)], { minutes: 70, credits: 140, stats: stats(70, 44, 41, 33, 27, 9, [shot('Shot, saved', 23, '0:08'), shot('Goal, left foot', 41, '0:11', true), shot('Shot, wide', 58, '0:07')], [4, 2], [5, 3]) }),
  vid('m2', 'mia', 'v Southbank', 'Sun 7 June', [k('turn', 12), k('pass', 30), k('won', 51), k('look', 63)], { minutes: 70, credits: 140, stats: stats(70, 31, 26, 21, 15, 5, [shot('Shot, saved', 19, '0:08'), shot('Shot, wide', 47, '0:07')], [3, 1], [4, 2]) }),
  vid('m3', 'mia', 'v Westfield', 'Sun 31 May', [k('look', 8), k('pass', 22), k('turn', 40), k('pass', 55)], { minutes: 70, credits: 140, stats: stats(70, 38, 27, 24, 18, 5, [shot('Shot, wide', 35, '0:07')], [2, 1], [3, 1]) }),
]
const PEOPLE: Person[] = [{ name: 'Kerem', how: 'Ari’s dad · has the app', on: true }, { name: 'Nan and Pop', how: 'Watch by a private link', on: true }, { name: 'Aunty Selin', how: 'Watch by a private link', on: false }]
/** A family a few weeks in: two children, credits, reels. */
const base = (): Family => ({ parent: 'Dana', email: 'dana@example.com', signedIn: true, kids: [ARI, MIA], kid: 'ari', club: HILLVIEW, freeUsed: true, offered: true, balance: 300, videos: [PARK, LAKESIDE, RIDGEWAY, PARKSIDE, NORTHGATE, BACKYARD, ...MIAS], open: 'g1', clip: 0, from: 'reel', stat: 'shots', film: 'f50', part: 0, both: false, anyway: false, held: null, working: null, people: PEOPLE, notify: true, families: 14, joined: false, toldJoined: false, coming: false, pack: 1, message: null, item: 'Wall ball to 20', seasonDue: null, seasonTold: ['mia'] })
/** A parent who has just opened the app: the sample child is filled in and can be changed. */
const brandNew = (): Family => ({ ...base(), signedIn: false, kids: [ARI], freeUsed: false, offered: false, balance: 0, videos: [], notify: false })
const first = (state: Video['state']): Video => ({ ...RIDGEWAY, id: 'n1', credits: 0, state, film: 'f50', clips: state === 'ready' ? RIDGEWAY.clips : [] })
/** Each board opens in the state it is drawn in. */
export function preset(id: string): Family {
  const b = base(), n = brandNew(), mia: Partial<Family> = { kid: 'mia', open: 'm1' }, joined = { joined: true, toldJoined: true, videos: [FUTSAL, PARKSIDE, RIDGEWAY, NORTHGATE, ...MIAS], open: 'g6' }
  if (id === 'FAM1-Welcome' || id === 'FAM0-SignUp') return n
  if (id === 'FAM22-ThreeGames') return { ...b, ...mia, seasonDue: 'mia', seasonTold: [] }
  if (/^FAMt\d|^FAM3e|^FAM2-|^FAM2c|^FAM5f/.test(id)) return { ...n, signedIn: true }
  if (id === 'FAM7-Working') return { ...n, signedIn: true, freeUsed: true, videos: [first('working')], working: 'n1', open: 'n1' }
  if (id === 'FAM8r-Reveal' || id === 'FAM6f-AfterFree') return { ...n, signedIn: true, freeUsed: true, videos: [first('ready')], open: 'n1' }
  if (id === 'FAM3m-HomeStats' || id === 'FAM8b-Results13' || id === 'FAM20-GameStats' || id === 'FAM21-StatClips') return { ...b, ...mia }
  if (id === 'FAM5b-Maybe') return { ...b, film: 'maybe' }
  if (id === 'FAM5x-CantRead' || id === 'FAM5p-PhoneCheck') return { ...b, film: 'bad', anyway: id === 'FAM5x-CantRead' }
  if (id === 'FAM5n-NotEnough') return { ...b, balance: 40 }
  if (id === 'FAM8x-TooFew') return { ...b, open: 'g4' }
  if (id === 'FAM13-ClubJoined') return { ...b, joined: true }
  if (id === 'FAM14-HomeWithClub') return { ...b, ...joined }
  if (id === 'FAM5c-ClubFilmedThis') return { ...b, ...joined, film: 'club' }
  return b
}

/** Demo: an older sample child with three full games, so the stats can be seen from a walked-through account. */
export const SAMPLE_OLDER = MIA
export function addSampleOlder() { setFamily(s => s.kids.some(x => x.id === MIA.id) ? { kid: MIA.id, open: 'm1' } : { kids: [...s.kids, MIA], videos: [...s.videos, ...MIAS], kid: MIA.id, open: 'm1', clip: 0, from: 'reel' }) }

const KEY = 'cs_family_v7'
let state: Family = (() => { try { const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Family | null; if (v?.kids?.length && v.videos && v.seasonTold && v.item) return v } catch { /* start again */ } return brandNew() })()
const subs = new Set<() => void>()
export function setFamily(patch: Partial<Family> | ((f: Family) => Partial<Family>)) { state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) }; try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* kept for this visit only */ } subs.forEach(f => f()) }
export const useFamily = (): Family => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => state, () => state)
export const familyNow = () => state
export const freshFamily = brandNew

const FIXTURES: [string, string][] = [['v Ridgeway', 'Sun 14 June'], ['v Kingsway', 'Sun 28 June'], ['v Marlow Park', 'Sun 5 July'], ['v Harbour Town', 'Sun 12 July'], ['v Stonebridge', 'Sun 19 July']]
/** Use the quoted credits and start the work. The quote is the price: it is what leaves the balance, whatever the work turns out to take. The first video is free. */
export function spend(filmId: string, credits: number, free = false): string {
  const f = film(filmId), id = `n${Date.now()}`, s = state
  const [title, date] = f.short ? [f.title, 'Today'] : FIXTURES.find(([t, d]) => !s.videos.some(v => v.kid === s.kid && v.title === t && v.date === d)) ?? [f.title, 'Today']
  const v: Video = { id, kid: s.kid, title, date, day: date === 'Today' ? 'Today' : 'Sunday', state: 'working', film: filmId, minutes: s.part || f.minutes, clips: [], credits: free ? 0 : credits, maybe: outcome(f, s.joined) === 'maybe', both: s.both, added: 0 }
  setFamily({ balance: s.balance - (free ? 0 : credits), videos: [v, ...s.videos], working: id, open: id, clip: 0, from: 'reel', held: null, part: 0, both: false, anyway: false, ...(free ? { freeUsed: true } : {}) }); return id
}
/** The work has finished. After a good check, too few moments for a reel and the credits return by themselves. After a maybe, they stay used. */
export function finish(id: string): { made: boolean; back: number } {
  const s = state, v = s.videos.find(x => x.id === id); if (!v || v.state !== 'working') return { made: false, back: 0 }
  const f = film(v.film ?? 'f50'), need = v.minutes >= CHECK.fullFrom ? CHECK.minClips : CHECK.minClipsShort
  if (!v.maybe && f.found < need) {
    setFamily({ balance: s.balance + v.credits, working: null, open: id, clip: 0, videos: s.videos.map(x => x.id === id ? { ...x, state: 'few', clips: [{ len: '0:09', title: 'Ran with the ball into space', minute: '19th minute' }].slice(0, f.found), inShot: f.actual ?? f.inShot, credits: 0 } : x) })
    return { made: false, back: v.credits }
  }
  const clips = f.short ? [k('turn', 2), k('look', 6)].slice(0, f.found) : POOL.slice(0, f.found), full = v.minutes >= CHECK.statsFrom && !v.maybe
  const done = (x: Video): Video => ({ ...x, state: 'ready', clips, inShot: f.inShot, stats: full ? statsFor(v.minutes, f.inShot) : undefined })
  const others = v.both ? s.kids.filter(x => x.id !== v.kid).map(x => done({ ...v, id: `${id}-${x.id}`, kid: x.id, credits: 0 })) : []
  const videos = [...others, ...s.videos.map(x => x.id === id ? done(x) : x)]
  const due = !s.joined && !!s.club && !s.seasonTold.includes(v.kid) && fullGames(videos.filter(x => x.kid === v.kid)).length >= 3
  setFamily({ working: null, open: id, clip: 0, from: 'reel', videos, ...(due ? { seasonDue: v.kid } : {}) }); return { made: true, back: 0 }
}
