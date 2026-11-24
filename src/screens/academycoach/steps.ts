// How a coach's step on a core skill moves: from the two taps after a session (ADC11), never by hand here.
//   "Better" on the skill in two sessions running moves a player up one step.
//   A tap never moves a step down: that is done in the player's file.
//   A player who is skipped keeps their step, and keeps a "Better" from the session before.
// Kept for the visit. The sample session's skill is striking the ball, so that is the step that moves.

import { useSyncExternalStore } from 'react'
import { SKILL_STEPS } from './skills'

/** The players on ADC11, in the order the board lists them. */
export const SESSION_PLAYERS = ['Kai Okonkwo', 'Ana Costa', 'Jonah Marsh', 'Lola Nguyen', 'Zane Abbas', 'Isla Tran'] as const

type State = { striking: Record<string, number>; betterLastTime: string[] }
// Their steps on striking the ball as the group screen (ADC2) draws them. No earlier session is drawn, so nobody starts with a "Better".
let state: State = { striking: { 'Kai Okonkwo': 2, 'Ana Costa': 3, 'Jonah Marsh': 4, 'Lola Nguyen': 2, 'Zane Abbas': 3, 'Isla Tran': 3 }, betterLastTime: [] }
const subs = new Set<() => void>()
export const useSteps = () => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => state, () => state)

/** One session's taps for one player: true is Better, false is Same, null is skipped. */
export function afterTap(step: number, wasBetter: boolean, tap: boolean | null): { step: number; better: boolean } {
  if (tap === null) return { step, better: wasBetter }                                   // skipped: nothing changes
  if (!tap) return { step, better: false }                                               // Same: the run of Betters ends, the step stays
  return wasBetter ? { step: Math.min(SKILL_STEPS, step + 1), better: false } : { step, better: true }   // second Better running: up one, and the run starts again
}

/** Close the session with each player's tap, in the order of SESSION_PLAYERS. */
export function closeSession(taps: Array<boolean | null>) {
  const striking = { ...state.striking }, betterLastTime: string[] = []
  SESSION_PLAYERS.forEach((name, i) => {
    const next = afterTap(striking[name], state.betterLastTime.includes(name), taps[i] ?? null)
    striking[name] = next.step
    if (next.better) betterLastTime.push(name)
  })
  state = { striking, betterLastTime }
  subs.forEach(f => f())
}
