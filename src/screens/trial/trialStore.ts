// Trial pack: what a player takes to a new club before a trial.
// Clean Sheet drafts it: a highlights reel, counted facts and playing history.
// The family shares it from their own phone (a parent for anyone under 18, an
// adult player for themselves) and can turn the link off. The coach is not a
// step in the way: they can add a few words, which the family chooses to include.
//
// Kept in this browser for the demo. In the live app the pack and its link
// live on the server, so the link works for whoever the family sends it to.

import { useSyncExternalStore } from 'react'
import { CLIPS, SQUAD_PLAYERS, YOUTH_SQUAD_PLAYERS, SENIORS_SQUAD_PLAYERS, type SquadPlayer } from '../../data'
import { markFor, type MarkKind, type NumberKind } from '../capture/marks'
import type { Age } from '../capture/captureStore'

export const MAX_CLIPS = 6
export const LINK_DAYS = 14

export interface Pack {
  clips: number[]            // clip ids, in reel order
  facts: string[]            // fact ids to show
  history: boolean
  note: string               // the coach's words, if they add any
  noteOk: boolean            // the family has seen the coach's words and chosen to include them
  approval: 'none' | 'asked' | 'yes'
  link: { made: number; off?: boolean } | null
}
type All = Record<string, Pack>

/** A fact that can go on a trial pack. Only what was counted, timed or recorded. */
export interface Fact { id: string; label: string; value: string; kind: NumberKind; from: string }

/** What may never go on a pack, whatever anyone ticks. Said on the screen, enforced here. */
export const NEVER = ['Wellness and check-in answers', 'Growth, injuries and head knocks', 'Load flags', 'Parents’ ratings', 'Contact details and date of birth', 'Anything about other players']

/** A clip as a reel needs it. */
export interface ReelClip { id: number; title: string; gameLabel: string; min: number; duration: string }
// The demo's film is the under-12s'. Other teams get a plain set with no names in the titles.
const PLAIN: ReelClip[] = [
  { id: 901, title: 'Wins it back and plays forward', gameLabel: 'Round 8', min: 12, duration: '0:14' },
  { id: 902, title: 'Receives on the half-turn under pressure', gameLabel: 'Round 8', min: 31, duration: '0:11' },
  { id: 903, title: 'Run in behind, first-time finish', gameLabel: 'Round 7', min: 44, duration: '0:09' },
  { id: 904, title: 'Switch of play to the far side', gameLabel: 'Round 7', min: 58, duration: '0:12' },
  { id: 905, title: 'Tracks back and blocks the shot', gameLabel: 'Round 6', min: 20, duration: '0:10' },
  { id: 906, title: 'Carries through midfield, sets up a chance', gameLabel: 'Round 5', min: 66, duration: '0:16' },
]
export const clipById = (id: number): ReelClip | undefined => CLIPS.find(c => c.id === id) ?? PLAIN.find(c => c.id === id)

/** Which squad a pack belongs to. Part of the link, so two players with the same initials never share one. */
export type TeamKey = 'u12' | 'u16' | '1sts'
export const TEAM: Record<TeamKey, { name: string; band: Age; squad: SquadPlayer[]; coach: string }> = {
  u12: { name: 'U12 Sam', band: 'juniors', squad: SQUAD_PLAYERS, coach: 'Sam K' },
  u16: { name: 'U16 Ollie', band: 'youth', squad: YOUTH_SQUAD_PLAYERS, coach: 'Ollie G' },
  '1sts': { name: 'Men’s 1sts', band: 'seniors', squad: SENIORS_SQUAD_PLAYERS, coach: 'Marko P' },
}
export const teamKeyOf = (band: Age): TeamKey => band === 'seniors' ? '1sts' : band === 'youth' ? 'u16' : 'u12'
export const packKey = (team: TeamKey, ini: string) => `${team}-${ini.toLowerCase()}`

const sec = (d: string) => { const [m, s] = d.split(':').map(Number); return m * 60 + s }
export const clipLength = (ids: number[]) => { const t = ids.reduce((a, id) => a + sec(clipById(id)?.duration ?? '0:00'), 0); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` }

/** Clips that may go in a reel: the player is in them and they show something done well. */
export const reelChoices = (ini: string, team: TeamKey = 'u12'): ReelClip[] => team === 'u12'
  ? CLIPS.filter(c => c.players.includes(ini) && c.type === 'good').sort((a, b) => Number(/goal/i.test(b.title)) - Number(/goal/i.test(a.title)))
  : PLAIN

export function factsFor(p: SquadPlayer): Fact[] {
  return [
    { id: 'games', label: 'Games this season', value: String(p.games), kind: 'told', from: 'Team sheets' },
    { id: 'minutes', label: 'Minutes played', value: String(p.minutes), kind: 'told', from: 'Team sheets' },
    { id: 'goals', label: 'Goals', value: String(p.goals), kind: 'count', from: 'Film, each one a clip' },
    { id: 'assists', label: 'Assists', value: String(p.assists), kind: 'count', from: 'Film, each one a clip' },
    { id: 'wins', label: 'Wins of the ball a game', value: '5.6', kind: 'count', from: 'Film, each one a clip' },
    { id: 'passes', label: 'Passes completed', value: '76%', kind: 'count', from: 'Film' },
    { id: 'distance', label: 'Distance a game', value: '4.0 km', kind: 'distance', from: 'Vest' },
    { id: 'speed', label: 'Top speed', value: '24.1 km/h', kind: 'speed', from: 'Vest' },
  ]
}
export const factMark = (f: Fact): MarkKind => markFor({ kind: f.kind, captured: true })

/** Playing history. Made-up for the demo: the live app reads it from each season's team sheets. */
export interface Season { year: string; team: string; games: number; minutes: number; positions: string }
export function historyFor(p: SquadPlayer, team: string): Season[] {
  const ageNow = /^U\d+/.test(team) ? parseInt(team.slice(1)) : 0   // seniors have no age group
  const prior = (back: number) => ageNow ? `U${ageNow - back}` : back === 1 ? team : 'Reserves'
  return [
    { year: '2026', team: `${team} · Wattle Creek FC`, games: p.games, minutes: p.minutes, positions: p.pos },
    { year: '2025', team: `${prior(1)} · Wattle Creek FC`, games: 16, minutes: 612, positions: p.pos },
    { year: '2024', team: `${prior(2)} · Wattle Creek FC`, games: 14, minutes: 498, positions: 'Tried three positions' },
  ]
}

/** Who has to say yes before a link exists. Under 18: a parent. Adults: the player. Not offered for MiniRoos. */
export const offered = (band: Age) => band === 'juniors' || band === 'youth' || band === 'seniors'
export const approver = (band: Age) => band === 'seniors' ? 'player' : 'parent'

const fresh = (key: string, p?: SquadPlayer): Pack => ({
  clips: reelChoices(key.split('-').pop()!.toUpperCase(), key.split('-')[0] as TeamKey).slice(0, 4).map(c => c.id),
  facts: factsFor(p ?? SQUAD_PLAYERS[0]).filter(f => factMark(f) === 'strong').slice(0, 6).map(f => f.id),   // Strong only, unless the coach adds an Estimate
  history: true, note: '', noteOk: false, approval: 'none', link: null,
})

const KEY = 'cs_trial_v2'
let all: All = (() => { try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') } catch { return {} } })()
const subs = new Set<() => void>()
const snap = () => all
export function usePack(ini: string, p?: SquadPlayer): Pack {   // `ini` is the pack key: team and initials
  const a = useSyncExternalStore(f => { subs.add(f); return () => subs.delete(f) }, snap, snap)
  return a[ini] ? { ...a[ini], noteOk: a[ini].noteOk ?? false } : fresh(ini, p)
}
export function setPack(ini: string, patch: Partial<Pack>, p?: SquadPlayer) {
  all = { ...all, [ini]: { ...(all[ini] ?? fresh(ini, p)), ...patch } }
  try { localStorage.setItem(KEY, JSON.stringify(all)) } catch { /* not saved in a private window */ }
  subs.forEach(f => f())
}
export const readPack = (ini: string, p?: SquadPlayer): Pack => all[ini] ?? fresh(ini, p)
/** Has anyone built a pack for this player in this browser? */
export const hasPack = (ini: string) => ini in all

export const linkEnds = (made: number) => new Date(made + LINK_DAYS * 864e5).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long' })
/** How the draft reel was picked, said in plain words wherever the draft is shown. */
export const DRAFT_RULE = 'Picked for you: recent clips marked as a good example, goals and assists first.'
export const linkLive = (pk: Pack) => !!pk.link && !pk.link.off && pk.approval === 'yes' && Date.now() < pk.link.made + LINK_DAYS * 864e5
/** The address the family sends. It names no one: only the club, the team and the player's initials. */
export const linkPath = (key: string) => `/share/wattle-creek-${key}`
