// Practice at home, the coach's own counting (packs v35 and v36): what ADC6-HomePractice and ADC19-SetPractice work out from
// the shared practice store (../academy/practice.ts) and the academy's one list. Nothing here is kept in the shared store.
// House rules that hold on every practice screen: nobody is ranked (name order only), no streaks, a missed week is never
// shown to the player or to other families, one reminder at most.

import { useSyncExternalStore } from 'react'
import { missedLast, upAStep, type Player } from '../academy/academyStore'
import { DRILLS, DRILL_WORDS, needsNoGoals, type Drill } from '../academy/curriculum'
import type { Practice, PracticePlayer, PracticeSet, Step } from '../academy/practice'

/** Weeks a player has had the practice (since joining), and how many of them they did it at least once. */
export const weeksOf = (pl: PracticePlayer) => { const w = pl.goes_by_week.filter((x): x is number => x !== null); return { did: w.filter(x => x > 0).length, of: w.length, all: pl.goes_by_week.length, last3None: w.length >= 3 && w.slice(-3).every(x => x === 0) } }
/** The counted line on a player's row: "5 of 7 weeks", "1 of 4 weeks since joining", "None in three weeks". */
export function showLine(pl: PracticePlayer) {
  const w = weeksOf(pl)
  if (w.last3None) return { text: 'None in three weeks', strong: true }
  return { text: `${w.did} of ${w.of} weeks${w.of < w.all ? ' since joining' : ''}`, strong: false }
}
/** This week for the team: who has done it at all, the goes, the videos and how many still wait for the coach. */
export function thisWeek(p: Practice) {
  const goes = p.players.map(x => x.goes_by_week[x.goes_by_week.length - 1] ?? 0)
  const videos = p.players.filter(x => x.this_week_video), waiting = p.players.filter(x => x.this_week_video === 'waiting for coach')
  return { n: p.players.length, did: goes.filter(x => x > 0).length, goes: goes.reduce((a, b) => a + b, 0), possible: p.players.length * p.this_week.times, videos: videos.length, waiting }
}
/** How many players did it at least once in each week of the term so far. */
export const byWeek = (p: Practice) => Array.from({ length: p.week }, (_, k) => ({ week: k + 1, n: p.players.filter(x => (x.goes_by_week[k] ?? 0) > 0).length }))
/** "Does it show?" Players who practised two weeks in three or more, and how many of each side are up a step (steps come from the academy's list).
 * Always an estimate: a team is too few to prove it, and keen players do both. */
export function doesItShow(p: Practice, ps: Player[]) {
  const up = (name: string) => { const q = ps.find(x => x.name === name); return !!q && upAStep(q) }
  const often = p.players.filter(x => { const w = weeksOf(x); return w.of > 0 && w.did / w.of >= 2 / 3 }), less = p.players.filter(x => !often.includes(x))
  return { often: often.length, oftenUp: often.filter(x => up(x.name)).length, less: less.length, lessUp: less.filter(x => up(x.name)).length }
}

/** SAMPLE (the ADC6 board's words): what is known about a video that is waiting. The data says only that one is waiting. */
export const VIDEO_SAMPLE: Record<string, string> = { 'Lola Nguyen': 'Sent Tuesday · 0:22 · best run of 7', 'Isla Tran': 'Sent yesterday · 0:31 · first video this term' }
/** SAMPLE: the three players whose weaker foot is the right. The list does not hold a player's stronger foot yet. */
export const WEAKER_RIGHT = ['Finn Byrne', 'Otis Baker', 'Tess Sullivan']
export const weakerFoot = (name: string) => WEAKER_RIGHT.includes(name) ? 'right' : 'left'

// ── the flow (ADC19) ──
/** Drills from the library that one child can do alone at home: an arrival game or a skill introduction that needs no goals.
 * Our rule, chosen because those are the parts with a ball each and no opponent; it gives the board's 9 of the 24 named drills. */
export const worksAlone = (d: Drill) => (d.part === 'Arrival game' || d.part === 'Introduction') && needsNoGoals(d)
export const ALONE = DRILLS.filter(worksAlone)
/** The steps a family would see for a library drill. Only one drill has words written for it; the rest say so, and the coach writes the steps. */
export function stepsFor(d: Drill): { steps: Step[]; written: boolean } {
  const w = DRILL_WORDS[d.name]
  if (w) return { written: true, steps: [['Set it up', w.setup], ['Do it', w.runs], ['Too hard?', w.easier], ['Too easy?', w.harder]] }
  return { written: false, steps: [[d.name, `About ${d.minutes} minutes with a ball. The steps are not written yet`]] }
}
export type Who = { kind: 'team' } | { kind: 'step' } | { kind: 'one'; player: string }
/** Who a practice goes to. By step: the players on step 1 or 2 for the skill. Trial players are never in the list, so they are left out. */
export function audience(ps: Player[], who: Who, skill: number) {
  return who.kind === 'team' ? ps : who.kind === 'step' ? ps.filter(p => p.skills_now[skill] <= 2) : ps.filter(p => p.name === who.player)
}
export const whoLine = (who: Who) => who.kind === 'team' ? 'The whole team' : who.kind === 'step' ? 'Players on step 1 or 2' : `One player: ${who.player}`
export const whoFrom = (line?: string): Who => line?.startsWith('One player: ') ? { kind: 'one', player: line.slice(12) } : line === 'Players on step 1 or 2' ? { kind: 'step' } : { kind: 'team' }
/** Players who still get the practice but no reminder, because they have missed the last three sessions. */
export const noReminder = (ps: Player[]) => ps.filter(p => missedLast(p))
/** The Monday after a date, as "Monday 8 June". */
export function nextMonday(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + ((8 - d.getUTCDay()) % 7 || 7))
  return `Monday ${d.getUTCDate()} ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getUTCMonth()]}`
}
export const TIMES = ['Once', 'Twice', 'Three times'], timesWord = (n: number) => (TIMES[n - 1] ?? `${n} times`).toLowerCase()
/** What next week's practice is, in a few words, for the rows that point at it. */
export const nextState = (s: PracticeSet) => s.state === 'sent' ? 'sent to families' : s.state === 'scheduled' ? `set by you, goes ${s.sent}` : s.state === 'saved' ? 'saved by you, not sent' : `the curriculum’s pick, goes ${s.sent}`

// ── kept for the visit, for the coach's screens only ──
/** How ADC19 opens: for next week's team practice, or straight on "one player" (from ADC6's "One for a single player" and "Add"). */
let startOn: 'team' | 'one' = 'team'
export const openFlow = (on: 'team' | 'one') => { startOn = on }
export const flowStart = () => startOn
/** A line the coach spoke instead of typing (ADC19, "Say it instead"): its length in seconds, or 0. There is no recording behind it in the demo. */
let spoken = 0
const subs = new Set<() => void>()
export const setSpoken = (seconds: number) => { spoken = seconds; subs.forEach(f => f()) }
export const useSpoken = () => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => spoken, () => spoken)
