// The connected club (17 Nov): what people tell the app, and the rules about
// asking them. Kept in this browser for the demo; in the live app every
// "who sees it" rule below is enforced on the server.

import { useSyncExternalStore } from 'react'

export type Fun = 'Loved it' | 'It was OK' | 'Not much'
export type Hard = 'Easy' | 'About right' | 'Too hard'
export type Learned = 'Yes' | 'A bit' | 'Not really'
export interface SessionAnswer { fun: Fun; hard: Hard; learned: Learned }
export interface SelfReview { effort: number; well: string; work: string }
export type QuestionId = 'felt' | 'today' | 'training' | 'selfreview' | 'elsewhere' | 'rategame' | 'pulse' | 'sideline' | 'threetaps'

export interface CnState {
  // the player's voice
  selfReview: SelfReview | null            // Cal's own rating of Saturday (CNp1). Seen by Cal and the head coach only
  sessionAnswers: SessionAnswer[]          // tonight's session, three taps each (CNp3). No names are kept
  goal: { text: string; know: string; sent: boolean } | null
  elsewhere: { hours: number[]; week: string; saved: boolean }
  // asking people things
  questions: Record<QuestionId, boolean>
  perDay: 1 | 2; perWeek: 3 | 4 | 5; parentWeek: 1 | 2 | 3
  playerAsks: number; parentAsks: number   // asked so far this week, on this phone
  held: string[]                           // questions held back by the limit this week
  // family and club
  reportSent: boolean; catchUp: string | null; catchTopic: string
  pulse: { enjoy: number; informed: number; way: string } | null
  passport: Record<'reports' | 'goals' | 'clips' | 'games' | 'health', boolean>
  handover: 'none' | 'family' | 'passed'
  // club operations
  observation: { marks: number[]; working: string; trying: string; sent: boolean }
  incident: { kind: string; sent: boolean }
  sideline: { ours: number; theirs: number; note: string; sent: boolean }
  moved: boolean; offered: boolean         // pitches: U14 moved to Wednesday, Monday offered to the U16s
  translate: Record<string, boolean>
  jobs: string[]                           // things added to a plan, a job list or a reminder
}

const FRESH: CnState = {
  selfReview: null, sessionAnswers: [], goal: null, elsewhere: { hours: [2, 1, 0, 1], week: 'Exams', saved: false },
  questions: { felt: true, today: true, training: true, selfreview: true, elsewhere: true, rategame: true, pulse: true, sideline: true, threetaps: true },
  perDay: 1, perWeek: 3, parentWeek: 2, playerAsks: 2, parentAsks: 1, held: [],
  reportSent: false, catchUp: null, catchTopic: 'Her confidence', pulse: null,
  passport: { reports: true, goals: true, clips: true, games: true, health: false },
  handover: 'none',
  observation: { marks: [0, 1, 0, 2, 0], working: 'The children are busy from the first minute. Nobody stood still for long.', trying: 'Swap the passing lines for a 3 v 1. Same skill, with an opponent.', sent: false },
  incident: { kind: 'Knock or injury', sent: false }, sideline: { ours: 4, theirs: 2, note: 'Shouting at the referee', sent: false },
  moved: false, offered: false,
  translate: { English: true, Vietnamese: true, Mandarin: true, Arabic: true, Greek: false, '8 others': false },
  jobs: [],
}

const KEY = 'cs_connected_v1'
let state: CnState = (() => { try { const r = localStorage.getItem(KEY); return r ? { ...FRESH, ...JSON.parse(r) } : FRESH } catch { return FRESH } })()
const subs = new Set<() => void>()
export const getCn = () => state
export function setCn(patch: Partial<CnState> | ((s: CnState) => Partial<CnState>)) {
  state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) }
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* private window */ }
  subs.forEach(f => f())
}
export const useCn = (): CnState => useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f) }, getCn, getCn)
export const addJob = (j: string) => setCn(s => ({ jobs: [...new Set([...s.jobs, j])] }))

// ── Rules ────────────────────────────────────────────────────────────────────

/** Any total is hidden until five people have answered. */
export const MIN_ANSWERS = 5
export const enough = (n: number) => n >= MIN_ANSWERS
export const underFive = (n: number, shown: string) => enough(n) ? shown : 'Under 5'
export const pct = (n: number, of: number) => `${Math.round((n / of) * 100)}%`

/**
 * May this person be asked this question now? A player is asked at most
 * `perWeek` times a week; a parent at most `parentWeek`. A question the club
 * has turned off is never asked. Over the limit, the question is held and counted.
 */
export function mayAsk(s: CnState, q: QuestionId, who: 'player' | 'parent' | 'staff'): 'ask' | 'off' | 'held' {
  if (!s.questions[q]) return 'off'
  if (who === 'player' && s.playerAsks >= s.perWeek) return 'held'
  if (who === 'parent' && s.parentAsks >= s.parentWeek) return 'held'
  return 'ask'
}
/** Count one ask against the week. Skipping still counts as having been asked, and stores no answer. */
export const countAsk = (who: 'player' | 'parent' | 'staff') => { if (who === 'player') setCn(s => ({ playerAsks: s.playerAsks + 1 })); if (who === 'parent') setCn(s => ({ parentAsks: s.parentAsks + 1 })) }
/** Note a question held back by the limit, once. Shown on "How often we ask". */
export const holdBack = (q: string) => { if (!state.held.includes(q)) setCn(s => ({ held: [...s.held, q] })) }
export const HELD_BASE = 61   // the club-wide count on the board, before this phone adds to it

// ── The demo club's own names (teams are the age group and the coach's first name) ──
export const TEAMS = { u9: 'U9 Tom', u10: 'U10 Nadia', u11: 'U11 Luke', u12: 'U12 Sam', u13: 'U13 Chris', u14: 'U14 Josh', u15: 'U15 Girls Bec', u16: 'U16 Ollie', seniors: 'Men’s 1sts', u8: 'U8 Hannah', u13g: 'U13 Girls Meg' }
