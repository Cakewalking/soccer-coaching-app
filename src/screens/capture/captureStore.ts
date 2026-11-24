// Capture quality: what is connected, what the coach chose, what was checked.
// Kept in this browser so the marks on QC1, QC6, QC8 and the phone all read the
// same facts. In the live app these come from the paired kit and the server.

import { useSyncExternalStore } from 'react'
import { markFor, partLabel, type MarkKind, type NumberKind } from './marks'

export type Format = '7 v 7' | '9 v 9' | '11 v 11'
// Age bands (chance-metrics-v2): the club sets its rules once for each.
export type Age = 'u6' | 'u8' | 'u10' | 'juniors' | 'youth' | 'seniors'
export const AGES: Age[] = ['u6', 'u8', 'u10', 'juniors', 'youth', 'seniors']
export const AGE_LABEL: Record<Age, [string, string]> = { u6: ['U6, U7', '4 v 4'], u8: ['U8, U9', '7 v 7'], u10: ['U10, U11', '9 v 9'], juniors: ['U12, U13', 'Juniors'], youth: ['U14–U18', 'Youth'], seniors: ['Seniors', ''] }

export type ChoiceKey = 'record' | 'clipEach' | 'shareClips' | 'touches' | 'foot' | 'distance' | 'sprints' | 'rank' | 'felt' | 'parentRatings'
export type RuleKey = 'film' | 'vests' | 'chances' | 'xa' | 'speed' | 'rank' | 'ladder' | 'shareClips' | 'teamToFamilies' | 'parentRatings'
type Six = [boolean, boolean, boolean, boolean, boolean, boolean]
export type GuideKey = 'halfway' | 'high' | 'corners' | 'sun' | 'battery' | 'vestsOn' | 'bootsOn'

export interface CapPlayer { ini: string; name: string; first: string; shirt: number; vest: string | null; flat?: boolean; spare?: 'A' | 'B'; boots: boolean; film: boolean }

/** Sunday's line-up (FB1-Formation), with the kit each player wears. */
export const LINEUP: CapPlayer[] = [
  { ini: 'RL', name: 'Ruby Lang', first: 'Ruby', shirt: 1, vest: '01', boots: true, film: true },
  { ini: 'GR', name: 'Grace Reid', first: 'Grace', shirt: 2, vest: '02', boots: true, film: true },
  { ini: 'SD', name: 'Sam Diaz', first: 'Sam', shirt: 3, vest: '03', boots: true, film: true },
  { ini: 'LM', name: 'Leo Marsh', first: 'Leo', shirt: 4, vest: '04', boots: true, film: true },
  { ini: 'NO', name: 'Noah Okafor', first: 'Noah', shirt: 6, vest: '05', boots: true, film: true },
  { ini: 'HQ', name: 'Harper Quinn', first: 'Harper', shirt: 7, vest: '06', boots: true, film: true },
  { ini: 'MT', name: 'Mia Tran', first: 'Mia', shirt: 8, vest: '07', boots: true, film: true },
  { ini: 'JP', name: 'Jai Patel', first: 'Jai', shirt: 9, vest: '08', boots: true, film: true },
  { ini: 'ZH', name: 'Zoe Hart', first: 'Zoe', shirt: 10, vest: '10', boots: true, film: true },
  { ini: 'FN', name: 'Finn Noble', first: 'Finn', shirt: 7, vest: null, flat: true, boots: true, film: true },
  { ini: 'IB', name: 'Isla Byrne', first: 'Isla', shirt: 11, vest: null, flat: true, boots: true, film: true },
  { ini: 'BC', name: 'Ben Carter', first: 'Ben', shirt: 12, vest: null, flat: true, boots: false, film: true },
  { ini: 'EB', name: 'Ella Brooks', first: 'Ella', shirt: 14, vest: null, spare: 'A', boots: false, film: true },
  { ini: 'KM', name: 'Kofi Mensah', first: 'Kofi', shirt: 15, vest: null, spare: 'B', boots: false, film: false },
  { ini: 'LV', name: 'Lucy Vale', first: 'Lucy', shirt: 16, vest: '11', boots: true, film: true },
  { ini: 'MI', name: 'Max Ito', first: 'Max', shirt: 5, vest: '12', boots: false, film: true },
]
export const SQUAD = LINEUP.length

export interface CapState {
  camera: boolean
  spares: boolean                 // spare vests A and B given to Ella and Kofi
  finnShirt: number
  corners: [boolean, boolean, boolean, boolean]   // far left, far right, near left, near right
  pitchDone: boolean
  format: Format
  length: number
  width: number
  guide: Record<GuideKey, boolean>
  whoDone: boolean
  test: 'none' | 'cut' | 'clear'
  choices: Record<ChoiceKey, boolean>
  rules: Record<RuleKey, Six>
  trendAfter: 2 | 3 | 5
  poor: 'keep' | 'clips' | 'none'
  grounds: Record<string, { length: number; width: number; format: Format; checked: string; used: number }>
  reminders: string[]
  moments: { at: string; what: string }[]
  flagged: string[]               // "That's not right" reports
  recorded: boolean
}

export const GROUND = 'Wattle Creek Reserve, pitch 2'

const FRESH: CapState = {
  camera: true, spares: false, finnShirt: 7,
  corners: [true, false, true, true], pitchDone: false, format: '9 v 9', length: 67, width: 46,
  guide: { halfway: true, high: true, corners: true, sun: false, battery: true, vestsOn: true, bootsOn: true },
  whoDone: false, test: 'none',
  choices: { record: true, clipEach: true, shareClips: true, touches: true, foot: true, distance: true, sprints: true, rank: false, felt: true, parentRatings: true },
  rules: {
    //            U6,7   U8,9   U10,11 U12,13 U14-18 Seniors
    film:           [true,  true,  true,  true,  true,  true],
    vests:          [false, false, true,  true,  true,  true],
    chances:        [false, true,  true,  true,  true,  true],   // xG, xGA, xGD and threat added, for the team
    xa:             [false, false, true,  true,  true,  true],   // name who set up a chance. Coach only
    speed:          [false, false, false, true,  true,  true],
    rank:           [false, false, false, false, false, true],
    ladder:         [false, false, false, true,  true,  true],   // PPI, from league results
    shareClips:     [true,  true,  true,  true,  true,  true],
    teamToFamilies: [false, false, true,  true,  true,  true],   // chances and other estimates, in plain words. Never one child's
    parentRatings:  [true,  true,  true,  true,  true,  false],
  },
  trendAfter: 3, poor: 'clips',
  grounds: { [GROUND]: { length: 67, width: 46, format: '9 v 9', checked: '3 May', used: 4 } },
  reminders: [], moments: [], flagged: [], recorded: false,
}

const KEY = 'cs_capture_v2'
let state: CapState = load()
const subs = new Set<() => void>()

function load(): CapState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) { const s = JSON.parse(raw); return { ...FRESH, ...s, guide: { ...FRESH.guide, ...s.guide }, choices: { ...FRESH.choices, ...s.choices }, rules: { ...FRESH.rules, ...s.rules } } }
  } catch { /* private window: start fresh */ }
  return FRESH
}
export function getCapture(): CapState { return state }
export function setCapture(patch: Partial<CapState> | ((s: CapState) => Partial<CapState>)) {
  state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) }
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* not saved in a private window */ }
  subs.forEach(f => f())
}
export function resetCapture() { setCapture(FRESH) }
export function useCapture(): CapState {
  return useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f) }, getCapture, getCapture)
}

// ── What follows from it ─────────────────────────────────────────────────────

/** Never rank under 12s. Locked, not a switch. */
export const rankLocked = (age: Age) => age !== 'youth' && age !== 'seniors'
/** MiniRoos (under 6 to under 11) has no ladder, so no PPI. Locked. */
export const ladderLocked = (age: Age) => age === 'u6' || age === 'u8' || age === 'u10'
/** What a team in this band may see. One place, so every screen agrees. */
export function allowed(s: CapState, age: Age) {
  const i = AGES.indexOf(age)
  return { chances: s.rules.film[i] && s.rules.chances[i], xa: s.rules.chances[i] && s.rules.xa[i], ladder: !ladderLocked(age) && s.rules.ladder[i], families: s.rules.chances[i] && s.rules.teamToFamilies[i] }
}

/** A coach can turn things off, never turn a locked one on. */
export function choiceAllowed(s: CapState, k: ChoiceKey, age: Age = 'juniors'): boolean {
  const i = AGES.indexOf(age)
  switch (k) {
    case 'record': case 'clipEach': return s.rules.film[i]
    case 'shareClips': return s.rules.film[i] && s.rules.shareClips[i]
    case 'distance': return s.rules.vests[i]
    case 'sprints': return s.rules.vests[i] && s.rules.speed[i]
    case 'rank': return !rankLocked(age) && s.rules.rank[i]
    case 'felt': return true
    case 'parentRatings': return s.rules.parentRatings[i]
    default: return true
  }
}
/** Rows that show the lock in QC2: set by the club, either way. */
export const CLUB_RULE: ChoiceKey[] = ['shareClips', 'rank']
export const chosen = (s: CapState, k: ChoiceKey, age: Age = 'juniors') => s.choices[k] && choiceAllowed(s, k, age)

export interface Quality {
  film: boolean; vests: number; vestsWorn: number; boots: number; cornersFound: number
  pitchOk: boolean; frameOk: boolean; shirtClash: boolean; named: number
  flat: CapPlayer[]; noVest: CapPlayer[]; noBoots: CapPlayer[]
}
export function quality(s: CapState, age: Age = 'juniors'): Quality {
  const film = s.camera && chosen(s, 'record', age)
  const vestKit = s.guide.vestsOn && chosen(s, 'distance', age)
  const worn = LINEUP.filter(p => p.vest || (s.spares && p.spare)).length
  const boots = s.guide.bootsOn && (chosen(s, 'touches', age) || chosen(s, 'foot', age)) ? LINEUP.filter(p => p.boots).length : 0
  const cornersFound = s.corners.filter(Boolean).length
  return {
    film, vests: vestKit ? worn : 0, vestsWorn: worn, boots, cornersFound,
    pitchOk: cornersFound === 4, frameOk: s.test === 'clear', shirtClash: s.finnShirt === 7, named: SQUAD,
    flat: LINEUP.filter(p => p.flat), noVest: s.spares ? [] : LINEUP.filter(p => p.spare), noBoots: LINEUP.filter(p => !p.boots),
  }
}
export const noKit = (s: CapState) => !s.camera && !s.guide.vestsOn

export interface Measure { id: string; source: 'Film' | 'Vests' | 'Boot sensors' | 'Check-in' | 'You'; mark: MarkKind; label: string }

/** The mark for each thing today's recording can measure. The same on every screen. */
export function measures(s: CapState, age: Age = 'juniors'): Record<'events' | 'distance' | 'touches' | 'felt' | 'you' | 'positions' | 'chances' | 'speed' | 'speedNoVest', Measure> {
  const q = quality(s, age)
  const m = (id: string, source: Measure['source'], mark: MarkKind, n?: number): Measure => ({ id, source, mark, label: n === undefined ? partLabel(mark, 1, 1) : partLabel(mark, n, SQUAD) })
  return {
    // Counted from film. Fewer than three corners found and "where on the pitch" is a best reading.
    events: m('events', 'Film', markFor({ kind: 'count', captured: q.film, problem: q.cornersFound < 3 })),
    distance: m('distance', 'Vests', markFor({ kind: 'distance', captured: q.vests > 0 }), q.vests),
    touches: m('touches', 'Boot sensors', markFor({ kind: 'touch', captured: q.boots > 0 }), q.boots),
    felt: m('felt', 'Check-in', markFor({ kind: 'told', captured: chosen(s, 'felt', age) })),
    you: m('you', 'You', markFor({ kind: 'told', captured: true })),
    positions: m('positions', 'Film', markFor({ kind: 'position', captured: q.film })),
    // xG and xGA rest on where each shot was taken: a position, so an Estimate. Off where the club has chances off.
    chances: m('chances', 'Film', markFor({ kind: 'position', captured: q.film && allowed(s, age).chances })),
    speed: m('speed', 'Vests', markFor({ kind: 'speed', captured: q.vests > 0 && chosen(s, 'sprints', age) })),
    // No speed or distance is derived from a single camera.
    speedNoVest: m('speedNoVest', 'Film', 'not'),
  }
}

/** The mark for one number from Sunday's recording, by the kind of number it is. */
export function gameMark(s: CapState, kind: NumberKind, age: Age = 'juniors'): MarkKind {
  const m = measures(s, age)
  return kind === 'count' ? m.events.mark : kind === 'position' ? m.positions.mark : kind === 'speed' ? m.speed.mark : kind === 'distance' ? m.distance.mark : kind === 'touch' ? m.touches.mark : m.you.mark
}

/** Free shirt numbers for a player who clashes. */
export function freeShirts(s: CapState): number[] {
  const taken = new Set(LINEUP.map(p => p.name === 'Finn Noble' ? s.finnShirt : p.shirt))
  return Array.from({ length: 20 }, (_, i) => i + 1).filter(n => !taken.has(n))
}
