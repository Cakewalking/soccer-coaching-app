// Practice at home (pack v35): one loop, picked → sent → done → sent back → kept, read by three screens:
// the coach's page (ADC6), the coach's flow to set one (ADC19) and the owner's page under Curriculum (AD26).
// The sample is `data/academy-practice.json`, the pack's own file. What a person changes (the owner's rules, a coach's set
// practice, a reply to a video) is kept here while the app is open; the sample itself is never edited.
// This file is the shared part. Each screen works its own counts out from what `usePractice()` returns.

import { useSyncExternalStore } from 'react'
import raw from './data/academy-practice.json'

export type Step = [string, string]
export type Video = 'waiting for coach' | 'coach replied' | null
export type PracticePlayer = {
  name: string; age: number
  /** under 13 it goes to the parent's app only; from 13 to the player and a parent */ goes_to: 'parent' | 'player and parent'
  /** how many times they did it in each week of the term so far (0 to 3); null before they joined */ goes_by_week: (number | null)[]
  this_week_video: Video
}
/** The owner's rules for one program. `on` is true, false, or words such as "1 of 6 teams" while only some teams have it. */
export type Rule = { program: string; on: boolean | string; longest_minutes?: number; most_often?: number; video_back?: boolean | string; coach_can_swap?: boolean; sends?: string }
export type TeamWeek = { team: string; coach: string; on: boolean; n: number; name?: string; by?: string; did?: number; vid?: number; rep?: number }
export type PracticeSet = {
  name: string; minutes: number; times: number; needs: string; steps: Step[]
  /** who picked it: the curriculum, a swap from the library, or the coach's own film */ set_by: string
  kept_by_coach?: boolean; sent: string; coach_line: string
  /** ADC19: who it goes to, what comes back, when it is done by, and whether it has gone */ who?: string; back?: string[]; done_by?: string; state?: 'saved' | 'scheduled' | 'sent'
}
export type Practice = {
  week: number; team: string; this_week: PracticeSet; next_week: PracticeSet
  players: PracticePlayer[]; ladder_u13_term2: { week: number; theme: string; practice: string }[]
  rules: Rule[]; always: string[]; teams: TeamWeek[]
  /** practices set for one player from their own goal: they sit under the team's, never in place of it */ single: { player: string; name: string }[]
}

type Sample = Omit<Practice, 'next_week' | 'single'> & { next_week: { name: string; steps: Step[] } }
const SAMPLE = raw as unknown as Sample
/** Practices for a single player, as the ADC6 board draws them. Sample: the data file has none. */
const SINGLE_SAMPLE = [{ player: 'Ezra Kim', name: 'Wall, turn and go' }, { player: 'Finn Byrne', name: 'Cone weave at speed' }, { player: 'Harriet Wong', name: 'Wall, turn and go' }]
/** Next week's practice starts as the curriculum's pick, inside the program's limit, until the coach changes it in ADC19. */
const nextFromPick = (): PracticeSet => ({ name: SAMPLE.next_week.name, steps: SAMPLE.next_week.steps, minutes: 10, times: 3, needs: 'A wall and a ball', set_by: 'curriculum', sent: 'Monday 4 pm', coach_line: '', who: 'The whole team', back: ['tick', 'count', 'video'], done_by: 'Thursday’s session' })

let state: Practice = { ...SAMPLE, next_week: nextFromPick(), single: SINGLE_SAMPLE }
const subs = new Set<() => void>()
const put = (next: Practice) => { state = next; subs.forEach(f => f()) }

export function usePractice() { return useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => state, () => state) }
export const practiceNow = () => state
export function resetPractice() { put({ ...SAMPLE, next_week: nextFromPick(), single: SINGLE_SAMPLE }) }
export const ruleOf = (p: Practice, program: string) => p.rules.find(r => r.program === program)

// ── what a person changes ──
/** The owner changes a program's rules (AD26). Applies from the next Monday. */
export function setRule(program: string, change: Partial<Rule>) { put({ ...state, rules: state.rules.map(r => r.program === program ? { ...r, ...change } : r) }) }
/** The owner turns the weekly practice on for every team in a program (AD26, "Turn on for Development"). `set` fills in what a team that had nothing now gets. */
export function turnOn(program: string, teams: string[], set: Partial<TeamWeek> = {}) {
  put({ ...state, rules: state.rules.map(r => r.program === program ? { ...r, on: true } : r), teams: state.teams.map(t => teams.includes(t.team) && !t.on ? { ...t, on: true, did: 0, vid: 0, rep: 0, by: 'Curriculum, from Monday', ...set } : t) })
}
/** The coach changes next week's practice as they go through the flow (ADC19). */
export function setNext(change: Partial<PracticeSet>) { put({ ...state, next_week: { ...state.next_week, ...change } }) }
/** The coach changes this week's practice, or its line (ADC6, "Change it"). */
export function setThis(change: Partial<PracticeSet>) { put({ ...state, this_week: { ...state.this_week, ...change } }) }
/** The coach answers a player's video (ADC6, "Hold to talk"). */
export function replyToVideo(player: string) {
  const had = state.players.find(x => x.name === player)?.this_week_video === 'waiting for coach'
  if (!had) return
  put({ ...state, players: state.players.map(x => x.name === player ? { ...x, this_week_video: 'coach replied' } : x), teams: state.teams.map(t => t.team === state.team ? { ...t, rep: (t.rep ?? 0) + 1 } : t) })
}
/** A practice for one player, from their own goal (ADC6 "Add", ADC19 "One player"). */
export function setSingle(player: string, name: string) { put({ ...state, single: [...state.single.filter(x => x.player !== player), { player, name }] }) }
