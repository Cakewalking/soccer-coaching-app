// Education centre: the catalogue, its filters, search, and what each coach, family and club has done with it.
// The 168 items are data (catalogue.json) and are shown as written. Almost none is filmed or written yet:
// `made` says which exist. In the demo every item plays as a drawn stand-in, like all film in the demo;
// set HIDE_UNMADE to true to follow the pack's rule that an item with no media is hidden from coaches and families.

import { useSyncExternalStore } from 'react'
import CAT from './catalogue.json'
import { ALL, GLOSSARY, lesson, type Lesson } from './course'
import { TEAMS, type TeamKey } from '../session/sessionEngine'

export const HIDE_UNMADE = false

export type PItem = { id: string; for: 'players'; shelf: string; group: string; title: string; kind: string; length: string; you_need: string; ages: string; secs: number; lo: number; hi: number; club: boolean }
export type CItem = { id: string; for: 'coaches'; shelf: string; about: string; title: string; kind: string; length: string; secs: number | null; lesson?: Lesson; page?: string }
export type Item = PItem | CItem
type Raw = { for_players: { shelf: string; group: string; items: { title: string; kind: string; length: string; you_need: string; ages: string }[] }[]; for_coaches: { shelf: string; about: string; items: { title: string; kind: string; length: string }[] }[] }
const RAW = CAT as unknown as Raw

const secsOf = (len: string): number | null => { const m = len.match(/^(\d+):(\d\d)$/); if (m) return Number(m[1]) * 60 + Number(m[2]); const r = len.match(/^(\d+) min$/); return r ? Number(r[1]) * 60 : null }
const band = (a: string): [number, number] => { if (a === 'All') return [0, 99]; const p = a.match(/^(\d+)\+$/); if (p) return [Number(p[1]), 99]; const [x, y] = a.split(/[–-]/).map(Number); return [x, y] }
/** Pages that already exist in Learn to coach for a read in "The game itself". */
const PAGES: Record<string, string> = { 'Rules for your age group': 'LN6-TheGameItself', 'Where they stand and the one job each has': 'LN6-TheGameItself', 'Shapes for 9 a side': 'LN6s-Shapes', 'Words you will hear: all 60': 'LN6w-AllWords', 'What the warm-up study found': 'EC8-Read' }

export const PLAYER_SHELVES = RAW.for_players.map(s => s.shelf), COACH_SHELVES = RAW.for_coaches.map(s => ({ shelf: s.shelf, about: s.about }))
export const P_ITEMS: PItem[] = RAW.for_players.flatMap((s, si) => s.items.map((i, n) => { const [lo, hi] = band(i.ages); return { ...i, id: `p${si + 1}.${n + 1}`, for: 'players' as const, shelf: s.shelf, group: s.group, secs: secsOf(i.length) ?? 0, lo, hi, club: s.group === 'club' } }))
export const C_ITEMS: CItem[] = RAW.for_coaches.flatMap((s, si) => s.items.map((i, n) => ({ ...i, id: `c${si + 1}.${n + 1}`, for: 'coaches' as const, shelf: s.shelf, about: s.about, secs: secsOf(i.length), lesson: i.kind === 'Film' ? ALL.find(l => l.title === i.title) : undefined, page: PAGES[i.title] })))
export const EVERY: Item[] = [...P_ITEMS, ...C_ITEMS]
export const item = (id: string) => EVERY.find(i => i.id === id)
export const byTitle = (title: string, who: 'players' | 'coaches') => EVERY.find(i => i.for === who && i.title === title)

/** Does it exist? A Learn to coach lesson (written, drawn), a page already built, or the one read that is written. A games collection opens the Game library. */
export const made = (i: Item) => i.for === 'coaches' && (!!i.lesson || !!i.page || i.kind === 'Collection')
export const MADE_COUNT = EVERY.filter(made).length
export const visible = (i: Item) => !HIDE_UNMADE || made(i)

// ── Ages ─────────────────────────────────────────────────────────────────────
export const AGE_BANDS: [string, number, number][] = [['5 to 8', 5, 8], ['9 to 12', 9, 12], ['13 and over', 13, 99]]
export const bandOf = (age: number) => age <= 8 ? '5 to 8' : age <= 12 ? '9 to 12' : '13 and over'
export const agesWord = (i: PItem) => i.ages === 'All' ? 'all ages' : i.hi === 99 ? `ages ${i.lo} and over` : `ages ${i.lo} to ${i.hi}`
/** Who a clip goes to: a parent under 12, the player and a parent from 13 to 15, the player from 16. */
export const goesTo = (age: number) => age < 13 ? 'parent' : age < 16 ? 'both' : 'player'
/** An item marked 13+ is never sent to an under-12 family. Heading clips stay off under 12. */
export const maySend = (i: PItem, age: number) => !(age < 13 && i.lo >= 13) && !(age < 12 && /head(ing|er)/i.test(i.title))
export const teamAge = (k: TeamKey) => k === 'seniors' ? 18 : TEAMS[k].age

// ── Filters ──────────────────────────────────────────────────────────────────
export type Filters = Record<string, string[]>
export const P_FILTERS: [string, string[]][] = [
  ['Skill', ['Running with the ball', 'First touch', '1 v 1', 'Striking the ball', 'Goalkeeping']],
  ['Age', AGE_BANDS.map(b => b[0])],
  ['You need', ['Just a ball', 'A wall', 'A partner', 'Nothing']],
  ['Time', ['Under 30 seconds', 'About a minute', '2 minutes or more']],
  ['Where', ['Indoors', 'Small space', 'At the park']],
  ['Kind', ['Clip', 'Game', 'Challenge', 'Warm-up', 'Explainer']],
  ['From', ['Your team', 'Your club', 'Clean Sheet']],
]
export const C_FILTERS: [string, string[]][] = [
  ['Kind', ['Film', 'Read', 'Checklist', 'Template', 'Games']],
  ['Topic', ['Running a session', 'Talking to players', 'Match day', 'Safety', 'Parents', 'The game itself']],
  ['Age group', ['Under 6 to 9', 'Under 10 to 13', 'Under 14 to 17', 'Seniors']],
  ['Time', ['Under 2 minutes', '2 to 5 minutes', 'Longer']],
  ['From', ['Your club', 'Clean Sheet', 'Federation']],
  ['Your list', ['Saved', 'Not watched yet']],
]
const NEED: Record<string, string> = { 'Just a ball': 'Just a ball', 'A wall': 'Ball and wall', 'A partner': 'With a partner', 'Nothing': 'No ball' }
/** The catalogue does not say where a game fits, so it follows what the game needs: nothing or a ball indoors, no partner in a small space, anything at the park. */
const where = (i: PItem, w: string) => w === 'At the park' || (w === 'Indoors' ? i.you_need === 'No ball' || i.you_need === 'Just a ball' : i.you_need !== 'With a partner')
const pTime = (i: PItem, t: string) => t === 'Under 30 seconds' ? i.secs < 30 : t === 'About a minute' ? i.secs >= 30 && i.secs < 120 : i.secs >= 120
const TOPIC: Record<string, string> = { 'Session ideas by skill': 'Running a session', 'Match day': 'Match day', 'Safety and welfare': 'Safety', 'Parents and helpers': 'Parents', 'The game itself': 'The game itself' }
const topicOf = (i: CItem) => TOPIC[i.shelf] ?? (i.lesson ? ['Running a session', 'Safety', 'Running a session', 'Talking to players', 'Match day', 'Parents'][Number(i.lesson.id.split('.')[0]) - 1] : '')
const AGE_READ: Record<string, string> = { 'Under 6 and 7': 'Under 6 to 9', 'Under 8 and 9': 'Under 6 to 9', 'Under 10 and 11': 'Under 10 to 13', 'Under 12 and 13': 'Under 10 to 13', 'Under 14 to 16': 'Under 14 to 17', 'Seniors and returning players': 'Seniors' }
const cTime = (i: CItem, t: string) => i.secs === null ? false : t === 'Under 2 minutes' ? i.secs < 120 : t === '2 to 5 minutes' ? i.secs >= 120 && i.secs <= 300 : i.secs > 300
const any = (f: Filters, g: string, test: (v: string) => boolean) => !f[g]?.length || f[g].some(test)
export const matchP = (i: PItem, f: Filters) =>
  any(f, 'Skill', v => i.shelf === v) && any(f, 'Age', v => { const b = AGE_BANDS.find(a => a[0] === v)!; return i.lo <= b[2] && i.hi >= b[1] }) && any(f, 'You need', v => i.you_need === NEED[v]) &&
  any(f, 'Time', v => pTime(i, v)) && any(f, 'Where', v => where(i, v)) && any(f, 'Kind', v => i.kind === v) && any(f, 'From', v => v === 'Your team' ? i.club && !/^A U\d+ /.test(i.title) : v === 'Your club' ? i.club : !i.club)
export const matchC = (i: CItem, f: Filters, lib: Lib) =>
  any(f, 'Kind', v => i.kind === (v === 'Games' ? 'Collection' : v)) && any(f, 'Topic', v => topicOf(i) === v) && any(f, 'Age group', v => !AGE_READ[i.title] || AGE_READ[i.title] === v) &&
  any(f, 'Time', v => cTime(i, v)) && any(f, 'From', v => v === 'Your club' ? i.shelf === 'From your club' : v === 'Clean Sheet' ? i.shelf !== 'From your club' : false) &&
  any(f, 'Your list', v => v === 'Saved' ? lib.saved.includes(i.id) : !lib.opened.includes(i.id))
export const coachAgeGroup = (age: number) => age <= 9 ? 'Under 6 to 9' : age <= 13 ? 'Under 10 to 13' : age <= 17 ? 'Under 14 to 17' : 'Seniors'

// ── What has been done with it ───────────────────────────────────────────────
// One record per coach (their team's sends and their own list) and one for the club (its switches and checks).
export type Lib = {
  /** families who have each clip, by item id */ sent: Record<string, number>
  /** families who have watched it, and the day it went */ watched: Record<string, number>; when: Record<string, string>
  /** families who said "We did it", by item id */ did: Record<string, number>
  /** a send lined up for later, by item id */ later: Record<string, string>
  saved: string[]; opened: string[]; notUseful: string[]
  /** this fortnight's clips for families, in order */ order: string[]
  /** a clip made from the coach's own film: where it is in the checks */ clip: 'none' | 'asked' | 'checking' | 'approved' | 'club'
}
export type Club = { off: string[]; approved: boolean; shared: boolean }
export const FAMILIES = 10
const ID = (t: string, who: 'players' | 'coaches' = 'players') => byTitle(t, who)!.id
/** The demo coach is part-way through a fortnight on running with the ball, as on the boards. */
const seeded = (): Lib => ({ sent: { [ID('Ivy: eyes up while she dribbles')]: 6, [ID('Eyes up while you dribble')]: 6, [ID('Big touches into space')]: 10, [ID('Zara: pass to a friend, then move')]: 10 }, watched: { [ID('Ivy: eyes up while she dribbles')]: 6, [ID('Eyes up while you dribble')]: 6, [ID('Big touches into space')]: 4, [ID('Zara: pass to a friend, then move')]: 4 }, when: { [ID('Big touches into space')]: 'Friday' }, did: { [ID('Eyes up while you dribble')]: 4, [ID('Ivy: eyes up while she dribbles')]: 4 }, later: {}, saved: ['What the warm-up study found', 'Match-day checklist', 'First-aid kit list', 'A card for the sideline', 'How we want to play at Wattle Creek'].map(t => ID(t, 'coaches')), opened: [], notUseful: [], order: ['Ivy: eyes up while she dribbles', 'Big touches into space', 'Stop and go', 'Traffic lights'].map(t => ID(t)), clip: 'none' })
const fresh = (): Lib => ({ sent: {}, watched: {}, when: {}, did: {}, later: {}, saved: [], opened: [], notUseful: [], order: [], clip: 'none' })
const KEY = 'cs_edu_v1'
type All = { coach: Record<string, Lib>; club: Club }
let all: All = (() => { try { const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as All | null; if (v?.coach && v.club) return v } catch { /* start again */ } return { coach: {}, club: { off: [], approved: false, shared: false } } })()
const subs = new Set<() => void>()
const keep = () => { try { localStorage.setItem(KEY, JSON.stringify(all)) } catch { /* kept for this visit only */ } subs.forEach(f => f()) }
const sub = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }
/** The boards' examples are U9 Tom's. Every other coach starts with nothing sent. */
export const libOf = (who: string): Lib => all.coach[who] ?? (who === 'u9' ? seeded() : fresh())
export function setLib(who: string, patch: Partial<Lib> | ((l: Lib) => Partial<Lib>)) { const l = libOf(who); all = { ...all, coach: { ...all.coach, [who]: { ...l, ...(typeof patch === 'function' ? patch(l) : patch) } } }; keep() }
export const useLib = (who: string): Lib => { useSyncExternalStore(sub, () => all, () => all); return libOf(who) }
export const useClub = (): Club => { useSyncExternalStore(sub, () => all, () => all); return all.club }
export function setClub(patch: Partial<Club>) { all = { ...all, club: { ...all.club, ...patch } }; keep() }
/** "We did it" on a family's phone: one tick for that child and clip, which the coach sees as a count. */
export function familyDid(who: string, id: string) { setLib(who, l => ({ did: { ...l.did, [id]: Math.min(FAMILIES, (l.did[id] ?? 0) + 1) }, watched: { ...l.watched, [id]: Math.max(l.watched[id] ?? 0, Math.min(FAMILIES, (l.did[id] ?? 0) + 1)) } })) }

// A page of the Education centre asked for from elsewhere in the app.
let wanted: string | null = null
export function openEdu(view: string) { wanted = view; subs.forEach(f => f()) }
export const takeEduWanted = () => { const w = wanted; wanted = null; return w }
export const useEduWanted = () => useSyncExternalStore(sub, () => wanted, () => null)
/** The coach's tablet pages. EC10 is the director's; ECp1 to ECp3 are phones. */
export const isEduId = (id: string) => /^EC\d/.test(id) && !id.startsWith('EC10')

// ── The club's sources (EC10) ────────────────────────────────────────────────
export const SOURCES: { id: string; name: string; sub: string; n: number; for: string; by: string; locked?: boolean }[] = [
  { id: 'cs-players', name: 'Clean Sheet: for players', sub: 'Clips, games, warm-ups and explainers', n: 88, for: 'Ages 5 and up', by: 'Clean Sheet' },
  { id: 'cs-coaches', name: 'Clean Sheet: for coaches', sub: 'Films, reads, checklists and templates', n: 64, for: 'All coaches', by: 'Clean Sheet' },
  { id: 'club', name: 'Your club’s own', sub: 'Films by your coaches, playing style, how-tos', n: 8, for: 'All coaches', by: 'Rachel M' },
  { id: 'examples', name: 'Club examples from games', sub: 'Short clips of your players doing something well', n: 8, for: 'Their team, or the club', by: 'Family, then Rachel M' },
  { id: 'federation', name: 'Federation', sub: 'Links to courses and published guides', n: 11, for: 'All coaches', by: 'Federation' },
]
/** Which source an item comes from. Safety items are Clean Sheet's and cannot be switched off. */
export const sourceOf = (i: Item) => i.for === 'players' ? (i.club ? 'examples' : 'cs-players') : i.shelf === 'From your club' ? 'club' : 'cs-coaches'
export const isSafety = (i: Item) => i.shelf === 'Safety and welfare' || i.shelf === 'Looking after yourself' || i.shelf === 'Warm-ups that protect you'
export const shown = (i: Item, club: Club) => visible(i) && (isSafety(i) || !club.off.includes(sourceOf(i)))

// ── Search (EC9) ─────────────────────────────────────────────────────────────
// Titles, shelf names, the 60 words and the competition's rules. A short answer only when it comes from
// the club's loaded rules or the glossary; never a made-up rule.
export type Hit = { over: string; title: string; sub: string; kind: string; len: string; open: string; who: 'coaches' | 'players' | 'word' }
/** Films whose captions mention a word, with the time. Only filmed items have captions; this one is the board's example. */
const MENTIONS: Record<string, [string, string]> = { 'What a referee is looking for': ['offside', '1:10'] }
/** What the competition's rules page covers. A search for one of these also finds "Rules for your age group". */
const RULE_TOPICS = ['offside', 'throw-in', 'goal kick', 'corner', 'ball size', 'rules']
export function search(q0: string, age: number): Hit[] {
  const q = q0.trim().toLowerCase(); if (!q) return []
  const out: Hit[] = [], rule = RULE_TOPICS.some(r => q.includes(r) || r.includes(q))
  for (const i of EVERY) {
    const m = MENTIONS[i.title], inTitle = i.title.toLowerCase().includes(q) || i.shelf.toLowerCase().includes(q) || (rule && i.title === 'Rules for your age group')
    if (!inTitle && !(m && m[0] === q)) continue
    if (i.for === 'coaches') out.push({ over: `FOR COACHES · ${i.shelf.toUpperCase()}`, title: i.title, sub: !inTitle && m ? `Mentions ${m[0]} at ${m[1]}` : i.about, kind: i.kind, len: i.length, open: i.id, who: 'coaches' })
    else out.push({ over: `FOR PLAYERS · ${i.shelf.toUpperCase()}`, title: i.title, sub: i.lo >= 13 && age < 13 ? 'For 13 and over. Not sent to under-12 families' : `${i.kind} · ${i.you_need.toLowerCase()}`, kind: i.kind, len: i.length, open: i.id, who: 'players' })
  }
  for (const w of GLOSSARY) if (w.word.toLowerCase().includes(q)) out.push({ over: 'FOR COACHES · WORDS YOU WILL HEAR', title: w.word, sub: w.meaning, kind: 'Word', len: '', open: 'LN6w-AllWords', who: 'word' })
  return out
}
/** The short answer, from the rules the club has loaded for this age. The national MiniRoos rules are loaded for under 9 to 11 only. */
export function shortAnswer(q: string, k: TeamKey, rulesLoaded: boolean): { text: string; from: string } | null {
  const age = teamAge(k), s = q.trim().toLowerCase()
  if (s === 'offside' && rulesLoaded && age <= 11) return { text: `Offside is not used at under ${age}. A player can stand anywhere and score. It starts at under 12 in your competition.`, from: 'From your competition’s rules, loaded by your club.' }
  if (RULE_TOPICS.some(r => s.includes(r))) return null   // a question about a rule, and no rule loaded for this age: results only, never a guess
  const w = GLOSSARY.find(g => g.word.toLowerCase() === s)
  return w ? { text: `${w.word}: ${w.meaning}.`, from: 'From the glossary, in plain words.' } : null
}
export { lesson }
