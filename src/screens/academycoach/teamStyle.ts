// The coach's own version of the academy's style for their game team (ADC8 and ADC9), as pack v38 draws it.
// Kept for the visit, so a measure picked on ADC9 is on ADC8 when the coach comes back.
// Rules: a review holds 8 measures at most; a core measure can never be removed or swapped by a coach, though its aim can be moved;
// the coach needs no approval, and a changed aim or a measure of the coach's own carries a one-line reason.
// WORKED OUT here: the season figure, the last game, which games met the aim and "Met in N of 7", all from the per-game values
// against the aim as it stands, so moving an aim moves them.
// SAMPLE: the per-game values (`GAMES_SAMPLE`, one constant: nothing counts a game's film yet), the drawn set of eight with its
// aims and reasons, and that each under 13 team has seven games filmed.

import { useSyncExternalStore } from 'react'

/** How an aim is written and stepped: "60%+", "6+", "under 10", "4 s", "all who can play". */
export type Unit = 'pct' | 'count' | 'under' | 'secs' | 'all'
/** The kind of evidence behind an aim. Only the first three are outside evidence. */
export type Kind = 'policy' | 'research' | 'pro' | 'habit' | 'style' | 'own'
export const KIND_WORDS: Record<Kind, string> = { policy: 'A written policy', research: 'Research on adults', pro: 'Used in the pro game', habit: 'A coaching habit', style: 'A style choice', own: 'Your own' }
export const OUTSIDE: Kind[] = ['policy', 'research', 'pro']
/** One game's value: `n` of `of` for a share (so a rate always has its count), a plain number otherwise. */
export type GameValue = { n: number; of?: number }
export type Measure = {
  name: string; unit: Unit; core: boolean
  /** the aim now, and the academy's (null for a measure of the coach's own). For `all` the aim is how many players may miss out: 0 is "all who can play". */
  aim: number; academy: number | null
  /** the words under the aim ("of your goal kicks") and what a share is counted in ("goal kicks") */ of: string; things?: string
  kind: Kind; /** where the aim comes from, and its limit. {season}, {count}, {best}, {aim}, {academy} and {games} are filled in from the numbers. */ source: string; limit: string
  /** one sentence more for the limit when the coach has moved the aim */ limitMoved?: string
}

/** SAMPLE. What the film counted in each of U13 Timber's seven games, oldest first. Every figure on Our style is worked out from these. */
export const GAMES_SAMPLE: Record<string, GameValue[]> = {
  'Minutes shared evenly':            [{ n: 16, of: 16 }, { n: 15, of: 15 }, { n: 16, of: 16 }, { n: 14, of: 16 }, { n: 16, of: 16 }, { n: 15, of: 15 }, { n: 15, of: 16 }],   // players who got at least half a game, of those who could play
  'Weaker-foot touches':              [{ n: 40, of: 400 }, { n: 44, of: 400 }, { n: 48, of: 400 }, { n: 52, of: 400 }, { n: 48, of: 400 }, { n: 84, of: 400 }, { n: 72, of: 400 }],
  'Goal kicks played short':          [{ n: 8, of: 12 }, { n: 6, of: 12 }, { n: 8, of: 13 }, { n: 9, of: 13 }, { n: 5, of: 11 }, { n: 8, of: 12 }, { n: 7, of: 11 }],
  'Their passes before we challenge': [{ n: 13.4 }, { n: 12.6 }, { n: 9.2 }, { n: 12.8 }, { n: 9.4 }, { n: 12 }, { n: 9 }],
  'Seconds to win it back':           [{ n: 6 }, { n: 4 }, { n: 6 }, { n: 5 }, { n: 4 }, { n: 4 }, { n: 7 }],
  'Won back inside 6 s':              [{ n: 17, of: 50 }, { n: 21, of: 50 }, { n: 18, of: 50 }, { n: 17, of: 50 }, { n: 20, of: 50 }, { n: 19, of: 50 }, { n: 21, of: 50 }],
  'Switches of play':                 [{ n: 3 }, { n: 4 }, { n: 3 }, { n: 7 }, { n: 4 }, { n: 3 }, { n: 5 }],
  'Crosses with three in the box':    [{ n: 1, of: 6 }, { n: 1, of: 6 }, { n: 3, of: 6 }, { n: 2, of: 7 }, { n: 2, of: 6 }, { n: 2, of: 6 }, { n: 2, of: 5 }],
}
/** SAMPLE: games filmed so far by each team at this age. */
export const GAMES_FILMED = 7
export const gamesOf = (m: Measure) => GAMES_SAMPLE[m.name] ?? []

export const MOST_MEASURES = 8
const STEP: Record<Unit, number> = { pct: 5, count: 1, under: 1, secs: 1, all: 1 }
const NUM = ['all who can play', 'all but one', 'all but two']
export const aimText = (unit: Unit, n: number) =>
  unit === 'pct' ? `${n}%+` : unit === 'count' ? `${n}+` : unit === 'under' ? `under ${n}` : unit === 'secs' ? `${n} s` : NUM[n] ?? `all but ${n}`
/** One game's value as a number: a share in whole per cent, as it is shown. */
const valueOf = (m: Measure, v: GameValue) => m.unit === 'pct' ? (v.of ? Math.round(100 * v.n / v.of) : 0) : v.n
/** Did a game meet the aim as it stands? */
export const metIn = (m: Measure, v: GameValue) =>
  m.unit === 'pct' || m.unit === 'count' ? valueOf(m, v) >= m.aim : m.unit === 'under' ? v.n < m.aim : m.unit === 'secs' ? v.n <= m.aim : (v.of ?? v.n) - v.n <= m.aim
const one = (n: number) => (Math.round(n * 10) / 10).toString()
/** The team's own games against the aim: the season figure, the last game, a yes or no for each game, and the count behind a share. */
export function figures(m: Measure) {
  const games = gamesOf(m), met = games.map(v => metIn(m, v)), n = games.reduce((s, v) => s + v.n, 0), of = games.reduce((s, v) => s + (v.of ?? 0), 0), last = games[games.length - 1]
  const mean = games.length ? n / games.length : 0
  const say = (v: GameValue | undefined, whole: boolean) => !v ? '' : m.unit === 'pct' ? `${valueOf(m, v)}%` : m.unit === 'secs' ? `${Math.round(v.n)} s` : m.unit === 'all' ? `${v.n} of ${v.of}` : whole ? String(v.n) : one(v.n)
  const season = !games.length ? '' : m.unit === 'pct' ? `${of ? Math.round(100 * n / of) : 0}%` : m.unit === 'all' ? `${met.filter(Boolean).length} of ${games.length}` : m.unit === 'secs' ? `${Math.round(mean)} s` : one(mean)
  return { games, met, metN: met.filter(Boolean).length, season, last: say(last, true), n, of, lastN: last?.n ?? 0, lastOf: last?.of ?? 0, mean: one(mean), best: games.length ? Math.max(...games.map(v => v.n)) : 0 }
}

const ACADEMY_SIX: Measure[] = [
  { name: 'Minutes shared evenly', unit: 'all', core: true, aim: 0, academy: 0, of: 'at least half a game each', kind: 'policy',
    source: 'Football Australia’s game time policy for clubs: equal time up to under 11s, at least half a game after that.', limit: 'It is a template clubs adopt, not a law of the game. Tall Timber has adopted it.',
    limitMoved: 'Your aim lets a player miss out on half a game, which the policy does not.' },
  { name: 'Weaker-foot touches', unit: 'pct', core: true, aim: 20, academy: 20, of: 'of all touches', things: 'touches', kind: 'research',
    source: 'A study of 236 players at the 1998 World Cup found very few used both feet equally, yet they were as skilled with the other foot when they did use it.',
    limit: 'Adults, one tournament, a long time ago. Nobody has published a number for under 13s. {academy} is the academy’s choice: well above your {season}, and reachable.' },
  { name: 'Goal kicks played short', unit: 'pct', core: false, aim: 60, academy: 70, of: 'of your goal kicks', things: 'goal kicks', kind: 'style',
    source: 'There is no evidence that short is better than long. The academy asks for it so players learn to receive under pressure.', limit: 'A teaching choice, not a way to win.', limitMoved: 'Your {aim} is set {gap} your season number.' },
  { name: 'Their passes before we challenge', unit: 'under', core: false, aim: 10, academy: 10, of: 'passes, in their half', kind: 'pro',
    source: 'The pro game calls this passes per defensive action. Europe’s top five leagues averaged about 11 in 2018/19. Lower means more pressing.',
    limit: 'Adult professionals on a full pitch for 90 minutes. Under 13s give the ball away more, so compare with your own games, not with theirs.' },
  { name: 'Seconds to win it back', unit: 'secs', core: false, aim: 4, academy: 4, of: 'typical time after losing it', kind: 'research',
    source: 'In the 2010/11 Bundesliga the top teams won the ball back about a second quicker than the rest.',
    limit: 'Adults, one season. It shows the two go together, not that one causes the other. The {academy} itself is the academy’s choice.' },
  { name: 'Won back inside 6 s', unit: 'pct', core: false, aim: 40, academy: 40, of: 'of the times you lose it', things: 'times you lost it', kind: 'habit',
    source: 'The “five-second rule” made famous by Pep Guardiola’s teams. Coaches use five or six seconds as the window.', limit: 'A coaching habit, not a research finding. Six seconds is the academy’s version of it.' },
]
/** What a measure of the coach's own says about itself: from the film of their own games, or nothing yet. */
const own = (name: string, unit: Unit, aim: number, of: string, things?: string): Measure => ({
  name, unit, core: false, aim, academy: null, of, things, kind: 'own',
  source: unit === 'pct' ? 'No outside evidence. Set from your own {games} games: {season} so far, from {count}.' : 'No outside evidence. Set from your own {games} games: you average {season}, and your best was {best}.',
  limit: unit === 'pct' ? 'An aim you chose. {count} is a small count, so one game can move it a lot.' : 'An aim you chose. It is tested only against your own film.',
})
// As drawn: Reece moved one aim, and two of the eight are his own.
const DRAWN: Measure[] = [...ACADEMY_SIX, own('Switches of play', 'count', 6, 'a game'), own('Crosses with three in the box', 'pct', 50, 'of your crosses', 'crosses')]
const DRAWN_REASONS: Record<string, string> = {
  'Goal kicks played short': 'We’re small. Going long sometimes is smart.',
  'Switches of play': 'We get stuck on one side. I want them to look across.',
  'Crosses with three in the box': 'We cross to nobody. I want three runners every time.',
}

type State = { measures: Measure[]; /** the coach's one-line reason, by measure */ reasons: Record<string, string>; swapping: number; swapFor: string }
// ADC9 is drawn at the moment of the swap that put Switches of play in: it names the measure that came out.
let state: State = { measures: DRAWN, reasons: DRAWN_REASONS, swapping: 6, swapFor: 'Shots inside 10 s of a win' }
const subs = new Set<() => void>()
const set = (next: Partial<State>) => { state = { ...state, ...next }; subs.forEach(f => f()) }
export const useTeamStyle = () => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => state, () => state)

/** Core, Academy, Aim changed or Yours. A core measure stays Core when its aim is moved; `moved` says whether it has been. */
export type Tag = 'Core' | 'Academy' | 'Aim changed' | 'Yours'
export const tagOf = (m: Measure): Tag => m.core ? 'Core' : m.academy === null ? 'Yours' : m.aim !== m.academy ? 'Aim changed' : 'Academy'
export const moved = (m: Measure) => m.academy !== null && m.aim !== m.academy
const LIMITS: Record<Unit, [number, number]> = { pct: [5, 100], count: [1, 99], under: [2, 99], secs: [1, 60], all: [0, 2] }
/** The aim one step down or up, or the same aim when it is at the end of its range. */
export const stepAim = (m: Measure, up: boolean) => Math.max(LIMITS[m.unit][0], Math.min(LIMITS[m.unit][1], m.aim + (up ? 1 : -1) * STEP[m.unit]))
/** Move an aim one step. Any measure's aim can be moved, core or not. */
export function moveAim(i: number, up: boolean) { set({ measures: state.measures.map((m, k) => k === i ? { ...m, aim: stepAim(m, up) } : m) }) }
export function setReason(name: string, why: string) { if (why.trim()) set({ reasons: { ...state.reasons, [name]: why.trim() } }) }
/** Back to the academy's aims on its own measures. The coach's own measures and every reason are kept. */
export function resetToAcademy() { set({ measures: state.measures.map(m => m.academy === null ? m : { ...m, aim: m.academy }) }) }
/** Name the measure a new one will take the place of. Never a core one. */
export function startSwap(i: number) { if (!state.measures[i].core) set({ swapping: i, swapFor: state.measures[i].name }) }
/** Adding to a full review means one comes out: the last measure a coach can swap. */
export function startAdd() {
  const last = state.measures.map((m, i) => m.core ? -1 : i).filter(i => i >= 0).pop()
  if (last !== undefined) startSwap(last)
}
/** Put the coach's pick in the place being swapped, with its aim and the one-line reason. Still 8 at most. */
export function takeMeasure(name: string, aim: number, why: string) {
  const i = state.measures[state.swapping]?.core ? -1 : state.swapping
  if (i < 0) return
  const measures = state.measures.map((m, k): Measure => k === i ? own(name, 'count', aim, 'a game') : m).slice(0, MOST_MEASURES)
  set({ measures, reasons: why.trim() ? { ...state.reasons, [name]: why.trim() } : state.reasons })
}
