// Sunday's game, in one place (packs v36 and v38). Game day (ACC7), the team sheet (ADC20), the live game (ADC21), the coach's home
// (ACC1), the week (ACT1) and the session plan (ACT3) all read this, so they cannot disagree.
// SAMPLE: fixtures, results, the club's registrations and Sunday's answers are not in the academy's list. The facts are the v36 and v38
// boards': Sunday 7 June, 11:00, home, pitch 2 at Wattle Creek Reserve, against Banksia Park, round 8, 11 a side, two halves of 30
// (placeholders to confirm for under 13s), shape 4-3-3. Players are named by their id in the academy's list.
// Shared file: add to it, and change only your own lines.

import { useSyncExternalStore } from 'react'
import type { Player } from '../academy/academyStore'

export const GAME = {
  round: 8, date: '2026-06-07', kickoff: '11:00', ground: 'Wattle Creek Reserve', pitch: 'pitch 2', home: true, club: 'Wattle Creek FC', opponent: 'Banksia Park',
  half: 30, aSide: 11, shape: '4-3-3', lastFive: ['W', 'D', 'L', 'W', 'W'], lastMet: 'Drew 2–2 away · 12 April', lastMetScore: '2–2', lastMetMonth: 'April',
  /** last Sunday's game, which this week's sessions came from */ last: { us: 3, them: 'Eastbank', themGoals: 1, weak: 2, chances: 11 },
  /** the starting eleven: the player's id, the position, and where they stand on the drawn pitch (left and top, in hundredths; our goal at the bottom) */
  lineUp: [
    { id: 173, pos: 'GK', x: 50, y: 90 },
    { id: 169, pos: 'LB', x: 14, y: 70 }, { id: 178, pos: 'CB', x: 38, y: 74 }, { id: 175, pos: 'CB', x: 62, y: 74 }, { id: 176, pos: 'RB', x: 86, y: 70 },
    { id: 177, pos: 'CM', x: 26, y: 48 }, { id: 179, pos: 'CM', x: 50, y: 54 }, { id: 180, pos: 'CM', x: 74, y: 48 },
    { id: 172, pos: 'LW', x: 16, y: 22 }, { id: 171, pos: 'ST', x: 50, y: 16 }, { id: 170, pos: 'RW', x: 84, y: 22 },
  ],
  /** the league only lets registered club players take the field: by player id, where each family that has not finished is up to */
  cannotPlay: { 167: 'Form started, not paid', 168: 'Not started' } as Record<number, string>,
  /** families who have not answered for Sunday yet, by player id. Sunday's answers are their own sample: they are not tonight's. */
  noAnswer: [178],
}
/** For a team's players: who can play on Sunday, who cannot yet, who has said yes, who has not answered, who starts and where, and who comes on. */
export function sundayOf(ps: Player[]) {
  const cannot = ps.filter(p => GAME.cannotPlay[p.id]), can = ps.filter(p => !GAME.cannotPlay[p.id]), none = can.filter(p => GAME.noAnswer.includes(p.id)), yes = can.filter(p => !none.includes(p))
  const starts = GAME.lineUp.flatMap(s => { const p = can.find(q => q.id === s.id); return p ? [{ p, pos: s.pos, x: s.x, y: s.y }] : [] }), on = can.filter(p => !starts.some(s => s.p === p))
  return { cannot, can, none, yes, starts, on }
}
/** The clock on Sunday: "10:15" for so many minutes before or after kick-off. */
export const gameClock = (plus = 0) => { const [h, m] = GAME.kickoff.split(':').map(Number), t = h * 60 + m + plus; return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` }

// ══ The plan for Sunday and the live game (pack v38: ADC20-TeamSheet, ADC21-LiveGame). Added under the facts above. ══
// WORKED OUT: everyone's minutes, from who starts and the changes (`playOut`). No minute on a screen is typed in: move a player or a
// change and the squares, the least anyone plays and the labels on the pitch follow. The live game's minutes so far, the score and its
// counters are worked out the same way, from the clock, the changes made and the taps.
// SAMPLE: the plan as drawn (`PLAN_DRAWN`: Kai, Mila and Sienna on at half-time, Isla and Finn back on at 45), the live game as drawn
// (`LIVE_DRAWN`: second half, 34:12, 1–1, five taps), the taps made before those five (`EARLIER_TAPS`) and each player's minutes this
// season (`SEASON_MINUTES`: the list holds no game minutes). Kept while the app is open; nothing is saved.

export type ShapeName = '4-3-3' | '4-4-2' | '3-5-2'
export type Spot = { pos: string; x: number; y: number }
export const SHAPE_NAMES: ShapeName[] = ['4-3-3', '4-4-2', '3-5-2']
const spot = (pos: string, x: number, y: number): Spot => ({ pos, x, y })
/** Each shape's eleven places (left and top in hundredths of the pitch, our goal at the bottom), in the same order as `GAME.lineUp`, so a
 * change of shape moves each player to the nearest job: the wingers of a 4-3-3 become the left midfielder and a striker of a 4-4-2. */
export const SHAPES: Record<ShapeName, Spot[]> = {
  '4-3-3': [spot('Keeper', 50, 91), spot('Left back', 14, 73), spot('Centre back', 38, 76), spot('Centre back', 62, 76), spot('Right back', 86, 73),
    spot('Midfield', 26, 52), spot('Midfield', 50, 57), spot('Midfield', 74, 52), spot('Left wing', 16, 26), spot('Striker', 50, 15), spot('Right wing', 84, 26)],
  '4-4-2': [spot('Keeper', 50, 91), spot('Left back', 14, 73), spot('Centre back', 38, 76), spot('Centre back', 62, 76), spot('Right back', 86, 73),
    spot('Midfield', 38, 50), spot('Midfield', 62, 50), spot('Right midfield', 86, 44), spot('Left midfield', 14, 44), spot('Striker', 36, 18), spot('Striker', 64, 18)],
  '3-5-2': [spot('Keeper', 50, 91), spot('Centre back', 24, 75), spot('Centre back', 50, 77), spot('Centre back', 76, 75), spot('Right wing back', 88, 46),
    spot('Midfield', 31, 53), spot('Midfield', 50, 60), spot('Midfield', 69, 53), spot('Left wing back', 12, 46), spot('Striker', 36, 18), spot('Striker', 64, 18)],
}
/** The whole game in minutes. */
export const GAME_MINS = 2 * GAME.half
/** A change: at this minute, this player comes on for that one, and takes their place on the pitch. */
export type Change = { id: number; minute: number; on: number; off: number }
/** `lineup` is who starts, by place (the order of `SHAPES`). `moved` is where the coach dragged a place to, until a shape is picked again. */
export type Plan = { shape: ShapeName; lineup: number[]; changes: Change[]; moved: Record<number, [number, number]>; sent: boolean }
const PLAN_DRAWN: Plan = {
  shape: GAME.shape as ShapeName, lineup: GAME.lineUp.map(s => s.id), moved: {}, sent: false,
  changes: [{ id: 1, minute: 30, on: 166, off: 172 }, { id: 2, minute: 30, on: 174, off: 177 }, { id: 3, minute: 30, on: 181, off: 169 }, { id: 4, minute: 45, on: 172, off: 170 }, { id: 5, minute: 45, on: 169, off: 176 }],
}

// ── minutes, worked out. Pure: the same functions serve the plan (in whole minutes) and the live game (by the clock). ──
export type Stint = [from: number, to: number]
export type Played = { /** each player's spells on the pitch */ stints: Map<number, Stint[]>; /** who is on at the end, by place */ on: number[]; /** the place each player first stands in */ placeOf: Map<number, number>; /** changes that could not be made: the one coming off was not on, or the one coming on already was */ skipped: number[] }
/** Play the game out to `upTo` minutes: who was on and when. `at` says when each change happens (its planned minute unless told otherwise; null for not at all). */
export function playOut(plan: Pick<Plan, 'lineup' | 'changes'>, upTo: number = GAME_MINS, at: (c: Change) => number | null = c => c.minute): Played {
  const on = [...plan.lineup], since = new Map<number, number>(on.map(id => [id, 0])), stints = new Map<number, Stint[]>(), placeOf = new Map<number, number>(on.map((id, k) => [id, k])), skipped: number[] = []
  const close = (id: number, t: number) => { const s = since.get(id); if (s === undefined) return; since.delete(id); if (t > s) stints.set(id, [...(stints.get(id) ?? []), [s, t]]) }
  const due = plan.changes.flatMap(c => { const t = at(c); return t !== null && t <= upTo ? [{ c, t }] : [] }).sort((x, y) => x.t - y.t)
  for (const { c, t } of due) {
    const k = on.indexOf(c.off)
    if (k < 0 || on.includes(c.on)) { skipped.push(c.id); continue }
    close(c.off, t); on[k] = c.on; since.set(c.on, t); if (!placeOf.has(c.on)) placeOf.set(c.on, k)
  }
  for (const id of [...since.keys()]) close(id, upTo)
  return { stints, on, placeOf, skipped }
}
export const minutesIn = (st: Stint[] | undefined) => (st ?? []).reduce((n, [a, b]) => n + (b - a), 0)
/** How much of each block of the game a player is on for: four squares of 15 minutes for a game of 60. */
export const squaresOf = (st: Stint[] | undefined, size = 15, total: number = GAME_MINS) =>
  Array.from({ length: Math.ceil(total / size) }, (_, k) => (st ?? []).reduce((n, [a, b]) => n + Math.max(0, Math.min(b, (k + 1) * size) - Math.max(a, k * size)), 0))
/** A player's game in a few words: "whole game", "off at half-time", "off on 45", "off 30 to 45", "on at half-time". */
export function sayStints(st: Stint[] | undefined, total: number = GAME_MINS, half: number = GAME.half) {
  if (!st?.length) return 'not on'
  const [a, b] = st[0], last = st[st.length - 1]
  if (st.length === 1) return a === 0 && b >= total ? 'whole game' : a === 0 ? (b === half ? 'off at half-time' : `off on ${b}`) : b >= total ? (a === half ? 'on at half-time' : `on from ${a}`) : `on ${a} to ${b}`
  return st.length === 2 && a === 0 && last[1] >= total ? `off ${b} to ${last[0]}` : `on ${st.length} times`
}
/** When a player first comes on: "Starts", "On at half-time", "On at 45", or "Not on" when the plan has no minutes for them. */
export const firstOn = (st: Stint[] | undefined, half: number = GAME.half) => !st?.length ? 'Not on' : st[0][0] === 0 ? 'Starts' : st[0][0] === half ? 'On at half-time' : `On at ${st[0][0]}`
/** The least anyone plays among these players, and who that is. */
export function leastOf(played: Played, ids: number[]) {
  const mins = ids.map(id => minutesIn(played.stints.get(id))), min = mins.length ? Math.min(...mins) : 0
  return { min, who: ids.filter((_, k) => mins[k] === min) }
}
/** Who could come on at a change: everyone able to play who is off the pitch just before its minute. */
export const couldComeOn = (plan: Plan, c: Change, can: number[]) => { const on = playOut(plan, c.minute, x => x.minute < c.minute ? x.minute : null).on; return can.filter(id => !on.includes(id)) }

// ── changing the plan. Each of these gives back a new plan; the store below keeps the one in use. ──
/** Two places on the pitch change hands: the players swap positions, and nobody's minutes move. */
export const swapPlaces = (p: Plan, i: number, j: number): Plan => ({ ...p, lineup: p.lineup.map((id, k) => k === i ? p.lineup[j] : k === j ? p.lineup[i] : id) })
/** Two players swap their whole part in the game: who starts where, and who comes on and off when. Their minutes swap with them. */
export function swapParts(p: Plan, a: number, b: number): Plan {
  const s = (id: number) => id === a ? b : id === b ? a : id
  return { ...p, lineup: p.lineup.map(s), changes: p.changes.map(c => ({ ...c, on: s(c.on), off: s(c.off) })) }
}
/** A different player comes on at a change. If they were coming on at another change at the same minute, the two swap. */
export function pickOn(p: Plan, changeId: number, on: number): Plan {
  const c = p.changes.find(x => x.id === changeId); if (!c || c.on === on) return p
  return { ...p, changes: p.changes.map(x => x.id === changeId ? { ...x, on } : x.minute === c.minute && x.on === on ? { ...x, on: c.on } : x) }
}

let plan = PLAN_DRAWN
const planSubs = new Set<() => void>()
/** Any change to the plan means the sheet has not been sent as it now stands. */
function setPlan(next: Plan, sent = false) { plan = { ...next, sent }; planSubs.forEach(f => f()) }
export const usePlan = () => useSyncExternalStore(f => { planSubs.add(f); return () => { planSubs.delete(f) } }, () => plan, () => plan)
export const planNow = () => plan
export const planEdit = {
  shape: (shape: ShapeName) => setPlan({ ...plan, shape, moved: {} }),
  places: (i: number, j: number) => setPlan(swapPlaces(plan, i, j)),
  parts: (a: number, b: number) => setPlan(swapParts(plan, a, b)),
  on: (changeId: number, on: number) => setPlan(pickOn(plan, changeId, on)),
  /** stand a place somewhere else on the pitch, kept inside the lines */
  move: (place: number, x: number, y: number) => setPlan({ ...plan, moved: { ...plan.moved, [place]: [Math.max(8, Math.min(92, Math.round(x))), Math.max(8, Math.min(93, Math.round(y)))] } }),
  send: () => setPlan(plan, true),
  unsend: () => setPlan(plan),
  reset: () => setPlan(PLAN_DRAWN),
}
/** Where a place stands: where the coach dragged it to, otherwise the shape's own spot. */
export const spotOf = (p: Plan, place: number): Spot => { const s = SHAPES[p.shape][place], m = p.moved[place]; return m ? { ...s, x: m[0], y: m[1] } : s }

/** SAMPLE (the v38 team sheet's "This season" column): minutes played of the minutes each player could have played, from the live game clock
 * of the seven games so far. The board draws only the share; the minutes here are made to give that share. Kai is new and has none. */
export const SEASON_MINUTES: Record<number, [played: number, could: number]> = {
  177: [202, 420], 169: [244, 420], 179: [231, 420], 172: [248, 420], 170: [218, 420], 174: [197, 420], 173: [223, 420],
  178: [256, 420], 180: [206, 420], 175: [252, 420], 181: [260, 420], 176: [227, 420], 171: [193, 420],
}

// ── the live game ──
export type TapKind = 'goalUs' | 'goalThem' | 'chance' | 'weak' | 'won' | 'good' | 'knock' | 'card' | 'changes'
/** One thing the coach tapped, at the clock's second. `weak`: a chance that was also a weaker-foot moment. `changes`: the changes this row made. */
export type Tap = { id: number; sec: number; kind: TapKind; who?: number; note?: string; weak?: boolean; card?: 'Yellow' | 'Red'; headKnock?: boolean; changes?: number[] }
/** `made`: the clock's second at which each change was really made. `film`: seconds of film so far (it keeps going while the clock is paused). */
export type Live = { sec: number; film: number; running: boolean; ended: boolean; made: Record<number, number>; taps: Tap[] }
const LIVE_DRAWN: Live = {
  sec: 34 * 60 + 12, film: 34 * 60 + 12, running: true, ended: false, made: { 1: 1800, 2: 1800, 3: 1800 },
  taps: [
    { id: 5, sec: 33 * 60 + 20, kind: 'chance', who: 166, weak: true, note: 'Left foot, saved. Weaker foot counted' },
    { id: 4, sec: 1800, kind: 'changes', changes: [1, 2, 3] },
    { id: 3, sec: 26 * 60 + 40, kind: 'goalThem', note: 'Down your left' },
    { id: 2, sec: 17 * 60 + 5, kind: 'goalUs', who: 171, note: 'Right foot, from Lola’s pass' },
    { id: 1, sec: 9 * 60 + 30, kind: 'won', who: 179, note: 'Inside six seconds' },
  ],
}
/** SAMPLE: the board's counters (6 weaker-foot moments, 4 won back) are bigger than its five rows, so these are the taps made before the
 * list as drawn. The counters add the list to them, so a tap or an undo still moves each one. */
export const EARLIER_TAPS = { weak: { 166: 1, 170: 2, 171: 1, 172: 1 } as Record<number, number>, won: 3 }

let live = LIVE_DRAWN
const liveSubs = new Set<() => void>()
function setLive(next: Live) { live = next; liveSubs.forEach(f => f()) }
export const useLive = () => useSyncExternalStore(f => { liveSubs.add(f); return () => { liveSubs.delete(f) } }, () => live, () => live)
export const liveNow = () => live
/** When each change really happened, for the minutes so far: only the ones made. */
export const madeAt = (l: Live) => (c: Change) => l.made[c.id] === undefined ? null : l.made[c.id] / 60
/** The same, for where the game is heading: a change not made yet happens at its planned minute, or now if that has passed. */
export const madeOrPlanned = (l: Live) => (c: Change) => l.made[c.id] === undefined ? Math.max(c.minute, l.sec / 60) : l.made[c.id] / 60
/** The next changes to make: the ones not made yet with the earliest minute. */
export function nextChanges(p: Plan, l: Live) {
  const left = p.changes.filter(c => l.made[c.id] === undefined); if (!left.length) return null
  const minute = Math.min(...left.map(c => c.minute))
  return { minute, changes: left.filter(c => c.minute === minute) }
}
export const liveDo = {
  /** one second of the game: the film always runs; the clock runs unless it is paused, and stops by itself at full time */
  tick() { if (live.ended) return; const sec = live.running ? Math.min(GAME_MINS * 60, live.sec + 1) : live.sec; setLive({ ...live, film: live.film + 1, sec, running: live.running && sec < GAME_MINS * 60 }) },
  run(running: boolean) { if (!live.ended && live.sec < GAME_MINS * 60) setLive({ ...live, running }) },
  end() { setLive({ ...live, ended: true, running: false }) },
  /** a tap goes in the list at the clock's second, newest first; its id comes back so a player can be put to it */
  tap(kind: TapKind, more: Partial<Tap> = {}) { const id = Math.max(0, ...live.taps.map(t => t.id)) + 1; setLive({ ...live, taps: [{ id, sec: live.sec, kind, ...more }, ...live.taps] }); return id },
  set(id: number, more: Partial<Tap>) { setLive({ ...live, taps: live.taps.map(t => t.id === id ? { ...t, ...more } : t) }) },
  /** take a tap back. Undoing a row of changes un-makes them: the players go back, and the minutes with them. */
  undo(id: number) { const t = live.taps.find(x => x.id === id); if (!t) return; const made = { ...live.made }; for (const c of t.changes ?? []) delete made[c]; setLive({ ...live, made, taps: live.taps.filter(x => x.id !== id) }) },
  /** make the next changes now, at the clock's second */
  makeNext() { const n = nextChanges(plan, live); if (!n || live.ended) return null
    const made = { ...live.made }; for (const c of n.changes) made[c.id] = live.sec
    const id = Math.max(0, ...live.taps.map(t => t.id)) + 1
    setLive({ ...live, made, taps: [{ id, sec: live.sec, kind: 'changes', changes: n.changes.map(c => c.id) }, ...live.taps] }); return n },
  reset() { setLive(LIVE_DRAWN) },
}
