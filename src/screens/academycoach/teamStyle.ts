// The coach's own version of the academy's style for their game team (ADC8 and ADC9).
// Kept for the visit, so a measure picked on ADC9 is on ADC8 when the coach comes back.
// Rules: a review holds 8 measures at most; a core measure can never be removed or swapped by a coach,
// though its aim can be moved; the coach needs no approval, and every change carries a one-line reason.

import { useSyncExternalStore } from 'react'

/** How an aim is written and stepped: "60%+", "10+", "under 10", "4 s", "all 16". */
export type Unit = 'pct' | 'count' | 'under' | 'secs' | 'all'
export type Measure = { name: string; unit: Unit; aim: number; academy: number | null; core: boolean }   // academy: null for a measure of the coach's own
export type Reason = { about: string; why: string }

export const MOST_MEASURES = 8
const STEP: Record<Unit, number> = { pct: 5, count: 1, under: 1, secs: 1, all: 1 }
const SQUAD = 16
export const aimText = (unit: Unit, n: number) =>
  unit === 'pct' ? `${n}%+` : unit === 'count' ? `${n}+` : unit === 'under' ? `under ${n}` : unit === 'secs' ? `${n} s` : n >= SQUAD ? `all ${SQUAD}` : `${n} of ${SQUAD}`

// The academy's eight, as the owner set them (AD18): two core, six a coach can swap.
export const ACADEMY: Measure[] = [
  { name: 'Goal kicks played short',          unit: 'pct',   aim: 70, academy: 70, core: false },
  { name: 'Wins in their half',               unit: 'count', aim: 10, academy: 10, core: false },
  { name: 'Shots inside 10 s of a win',       unit: 'count', aim: 2,  academy: 2,  core: false },
  { name: 'Their passes before we challenge', unit: 'under', aim: 10, academy: 10, core: false },
  { name: 'Seconds to win it back',           unit: 'secs',  aim: 4,  academy: 4,  core: false },
  { name: 'Won back inside 6 s',              unit: 'pct',   aim: 40, academy: 40, core: false },
  { name: 'Minutes shared evenly',            unit: 'all',   aim: 16, academy: 16, core: true },
  { name: 'Weaker-foot touches',              unit: 'pct',   aim: 20, academy: 20, core: true },
]
// As drawn: Reece moved one aim and swapped one measure for his own.
const DRAWN: Measure[] = ACADEMY.map((m, i) =>
  i === 0 ? { ...m, aim: 60 } : i === 2 ? { name: 'Switches of play', unit: 'count', aim: 6, academy: null, core: false } : m)
const DRAWN_REASONS: Reason[] = [
  { about: 'Goal kicks short: 60%', why: 'We’re small. Going long sometimes is smart.' },
  { about: 'Switches of play', why: 'We get stuck on one side. I want them to look across.' },
]

type State = { measures: Measure[]; reasons: Reason[]; swapping: number; swapFor: string }
// ADC9 is drawn at the moment of the swap that put Switches of play in: it names the measure that came out.
let state: State = { measures: DRAWN, reasons: DRAWN_REASONS, swapping: 2, swapFor: 'Shots inside 10 s of a win' }
const subs = new Set<() => void>()
const set = (next: Partial<State>) => { state = { ...state, ...next }; subs.forEach(f => f()) }
export const useTeamStyle = () => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => state, () => state)

const within = (unit: Unit, n: number) => Math.max(unit === 'all' ? 8 : 1, Math.min(unit === 'pct' ? 100 : unit === 'all' ? SQUAD : 99, n))
/** Move an aim one step. Any measure's aim can be moved, core or not. */
export function moveAim(i: number, up: boolean) {
  set({ measures: state.measures.map((m, k) => k === i ? { ...m, aim: within(m.unit, m.aim + (up ? 1 : -1) * STEP[m.unit]) } : m) })
}
/** Back to the academy's eight measures and aims. The reasons are kept. */
export function resetToAcademy() { set({ measures: ACADEMY }) }
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
  const measures = state.measures.map((m, k): Measure => k === i ? { name, unit: 'count', aim, academy: null, core: false } : m).slice(0, MOST_MEASURES)
  const reasons = why.trim() ? [...state.reasons.filter(r => r.about !== name), { about: name, why: why.trim() }] : state.reasons
  set({ measures, reasons })
}
