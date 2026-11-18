// What the coach, the families and the director have set for the justified session. Kept on this device.
import { useSyncExternalStore } from 'react'
import { TEAMS, DEFAULT_RULES, proposeSession, type Level, type Rules, type TeamKey, type Player, type Session } from './sessionEngine'

export type Answer = 'yes' | 'no' | 'none'
export type TeamState = {
  poll: Record<string, Answer>            // the family poll, one answer a player
  atPitch: boolean; here: string[]        // tapped in at the pitch: overrides the poll
  swaps: Record<number, string>; swapWhy: Record<number, string>
  moved: Record<string, number>           // a player the coach moved to another group
  nudged: boolean; phone: boolean; bye: boolean
}
export type SessionState = { level: Level; askedLess: boolean; rules: Rules; teams: Record<TeamKey, TeamState>; watched: string[]; home: { filters: string[]; done: string[] } }

const pollFor = (k: TeamKey): Record<string, Answer> => {
  const names = TEAMS[k].squad.map(p => p.name), no = k === 'u11' ? ['Mack', 'Ines'] : names.slice(-2, -1), none = k === 'u11' ? ['Theo', 'Wren'] : names.slice(-1)
  return Object.fromEntries(names.map(n => [n, no.includes(n) ? 'no' : none.includes(n) ? 'none' : 'yes'])) as Record<string, Answer>
}
const freshTeam = (k: TeamKey): TeamState => ({ poll: pollFor(k), atPitch: false, here: [], swaps: {}, swapWhy: {}, moved: {}, nudged: false, phone: false, bye: false })
const FRESH: SessionState = {
  level: 'new', askedLess: false, rules: DEFAULT_RULES,
  teams: { u11: freshTeam('u11'), u9: freshTeam('u9'), u12: freshTeam('u12'), u16: freshTeam('u16'), seniors: freshTeam('seniors') },
  watched: ['w1', 'w2', 'w3'], home: { filters: ['Just a ball', 'Small space'], done: [] },
}
const KEY = 'cs_session_v1'
let state: SessionState = (() => { try { const r = JSON.parse(localStorage.getItem(KEY) || 'null'); return r ? { ...FRESH, ...r, rules: { ...FRESH.rules, ...r.rules, sources: { ...FRESH.rules.sources, ...r.rules?.sources, curriculum: false } }, teams: { ...FRESH.teams, ...r.teams } } : FRESH } catch { return FRESH } })()
const subs = new Set<() => void>()
const get = () => state
export function setSession(patch: Partial<SessionState> | ((s: SessionState) => Partial<SessionState>)) {
  state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) }
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* private window: kept for this visit only */ }
  subs.forEach(f => f())
}
export const setTeam = (k: TeamKey, patch: Partial<TeamState> | ((t: TeamState) => Partial<TeamState>)) => setSession(s => ({ teams: { ...s.teams, [k]: { ...s.teams[k], ...(typeof patch === 'function' ? patch(s.teams[k]) : patch) } } }))
export const useSession = (): SessionState => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, get, get)

/** Who the session is sized for: tapped in at the pitch if the coach is there, the poll's yeses otherwise. */
export function present(k: TeamKey, t: TeamState): Player[] { return TEAMS[k].squad.filter(p => t.atPitch ? t.here.includes(p.name) : t.poll[p.name] === 'yes') }
export const counts = (t: TeamState) => ({ yes: Object.values(t.poll).filter(a => a === 'yes').length, no: Object.values(t.poll).filter(a => a === 'no').length, none: Object.values(t.poll).filter(a => a === 'none').length })
/** This week's session for a team, from everything set so far. */
export function sessionFor(s: SessionState, k: TeamKey, opts: { bye?: boolean; n?: number } = {}): Session {
  const t = s.teams[k], bye = opts.bye ?? t.bye
  return proposeSession({ team: TEAMS[k], n: opts.n ?? (bye && k === 'u11' && !t.atPitch ? 11 : present(k, t).length), rules: s.rules, swaps: bye === t.bye ? t.swaps : {}, bye })
}
