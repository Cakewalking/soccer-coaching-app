// How a coach's step on a core skill moves: from the two taps after a session (ADC11), never by hand here.
//   "Better" on the skill in two sessions running moves a player up one step.
//   A tap never moves a step down: that is done in the player's file.
//   A player who is skipped keeps their step, and keeps a "Better" from the session before.
// This is the one rule. The steps themselves are in the academy's list (../academy/academyStore): when the rule
// says a step moves, `stepUp` moves it there, and every screen that counts steps changes with it.
// What is kept here is only who was "Better" in the session before, for each skill, on this device.

import { addNote, academyNow, stepUp } from '../academy/academyStore'
import { SKILL_STEPS } from './skills'

/** Today's skill on ADC11, as the board draws it: striking the ball, the fourth of the four core skills. */
export const TODAY_SKILL = 3

const KEY = 'cs_academy_coach_better'
type Better = Record<number, number[]>   // skill: the players who were "Better" on it last session
let better: Better = (() => { try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Better } catch { return {} } })()
export const wasBetter = (playerId: number, skill = TODAY_SKILL) => (better[skill] ?? []).includes(playerId)

/** One session's taps for one player: true is Better, false is Same, null is skipped. */
export function afterTap(step: number, wasBetter: boolean, tap: boolean | null): { step: number; better: boolean } {
  if (tap === null) return { step, better: wasBetter }                                   // skipped: nothing changes
  if (!tap) return { step, better: false }                                               // Same: the run of Betters ends, the step stays
  return wasBetter ? { step: Math.min(SKILL_STEPS, step + 1), better: false } : { step, better: true }   // second Better running: up one, and the run starts again
}

/** Close the session with each player's tap. A player with a tap has a note from today; a second "Better" running moves their step up. Returns who moved. */
export function closeSession(taps: Record<number, boolean | null | undefined>, skill = TODAY_SKILL): number[] {
  const next: number[] = [], moved: number[] = []
  for (const p of academyNow().players) {
    const tap = taps[p.id] ?? null, was = wasBetter(p.id, skill)
    if (tap === null && !was) continue
    const after = afterTap(p.skills_now[skill], was, tap)
    if (after.better) next.push(p.id)
    if (tap !== null) addNote(p.id)
    if (after.step > p.skills_now[skill]) { stepUp(p.id, skill); moved.push(p.id) }
  }
  better = { ...better, [skill]: next }
  try { localStorage.setItem(KEY, JSON.stringify(better)) } catch { /* kept for this visit only */ }
  return moved
}
