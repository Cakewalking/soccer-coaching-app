// The coach's own team (programs v2). Reece Whitlam coaches one team, U13 Timber, and sees only that team.
// Everything a coach screen shows about a player is read from the academy's one list (../academy/academyStore);
// this file only says which team is the coach's, which board each player's file is, and which player is open.

import { useSyncExternalStore } from 'react'
import { academyNow, cameOf, groupOf, playersIn, useAcademy, type Academy, type Group, type Player } from '../academy/academyStore'

export const COACH_GROUP = 'U13Timber'
/** Kai's file keeps the id the designs gave it first; every other player's is `ADCP<id>-Player`. */
const KAI = 166
export const coachBoard = (p: Player) => p.id === KAI ? 'ADC1-PlayerFile' : `ADCP${p.id}-Player`
const idOfBoard = (board: string) => board === 'ADC1-PlayerFile' ? KAI : Number(/^ADCP(\d+)-Player$/.exec(board)?.[1] ?? NaN)
/** The player a board id is the file of, when that player is in the coach's own team. A coach never opens another team's player. */
export const playerOfBoard = (a: Academy, board: string) => a.players.find(p => p.id === idOfBoard(board) && p.group === COACH_GROUP)
/** Every player file a coach can open, from the sample as it is drawn. */
export const COACH_PLAYER_BOARDS = playersIn(academyNow(), COACH_GROUP).map(coachBoard)

export const firstName = (p: Player) => p.name.split(' ')[0]
export const ini = (p: Player) => p.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
/** New this term: joined after the team's first session. */
export const isNew = (p: Player, g: Group) => p.joined > g.dates[0]
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], DAY_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const parts = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return { m, d, w: new Date(Date.UTC(y, m - 1, d)).getUTCDay() } }
/** "14 May", "Tue 21 April", "Thursday 4 June". */
export const dayMonth = (iso: string) => { const { m, d } = parts(iso); return `${d} ${MONTH[m - 1]}` }
export const shortDate = (iso: string) => `${DAY[parts(iso).w]} ${dayMonth(iso)}`
export const longDate = (iso: string) => `${DAY_LONG[parts(iso).w]} ${dayMonth(iso)}`
/** The team's session by the clock, read from its timetable line ("Mon to Thu · 6:35 to 7:45"): "6:35", or so many minutes in. */
export const clock = (g: Group, plus = 0) => { const [h, m] = (g.when.split(' · ')[1]?.split(' to ')[0] ?? '').split(':').map(Number); if (!Number.isFinite(h + m)) return ''; const t = h * 60 + m + plus; return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}` }
/** The days a team trains, in full: "Monday to Thursday", "Tuesday and Thursday". */
export const trainingDays = (g: Group) => { const d = g.days.map(x => DAY_LONG[DAY.indexOf(x)] ?? x); return d.length > 2 ? `${d[0]} to ${d[d.length - 1]}` : d.join(' and ') }
/** The same, short, as the timetable line has it: "Mon to Thu". */
export const trainingDaysShort = (g: Group) => g.when.split(' · ')[0]
/** Names in a sentence: "Ana", "Ana and Sienna", "Noah, Jonah and Mila". */
export const names = (ps: Player[]) => { const n = ps.map(firstName); return n.length < 2 ? n.join('') : `${n.slice(0, -1).join(', ')} and ${n[n.length - 1]}` }
/** The skill a player's step is lowest on: where a goal or a clip would start. */
export const lowestSkill = (p: Player) => p.skills_now.indexOf(Math.min(...p.skills_now))
/** Where a player is on today's roll: here, away, or not marked yet. */
export const todayMark = (a: Academy, g: Group, p: Player): boolean | null => { const i = g.dates.indexOf(a.today); return i < 0 ? null : p.roll[i] ?? null }
export const cameLine = (p: Player) => { const c = cameOf(p); return `${c.came} of ${c.of}` }

// ── tonight: who is coming. One place, so the home (ACC1), the session plan (ACT3) and who's coming (ACT4) cannot disagree. ──
/** SAMPLE. Tonight's answers come from parents in the family app, and the academy's list has no field for them yet. Everyone not named here
 * has said yes (the parent in the list said so). Mila is away and her family said why; Jonah's family has not answered and has been asked twice. */
export const TONIGHT_SAMPLE: Record<string, { answer: 'away'; why: string } | { answer: 'none'; asked: string }> = {
  'Mila Lombardi': { answer: 'away', why: 'school camp' }, 'Jonah Marsh': { answer: 'none', asked: 'Asked twice' },
}
export type TonightRow = { p: Player; /** here and gone are from the roll once it is taken; yes, away and none are the family's answer before that */ state: 'here' | 'gone' | 'yes' | 'away' | 'none'; label: 'Here' | 'Coming' | 'Away' | 'No answer'; line: string }
/** Where each player is for tonight: the roll's mark where the coach has taken it (ACC2), otherwise the family's answer (sample). */
export function tonightOf(a: Academy, g: Group, ps: Player[]) {
  const rows: TonightRow[] = ps.map(p => { const m = todayMark(a, g, p), s = TONIGHT_SAMPLE[p.name]
    if (m === true) return { p, state: 'here', label: 'Here', line: 'On the roll' }
    if (m === false) return { p, state: 'gone', label: 'Away', line: 'Marked away on the roll' }
    if (s?.answer === 'away') return { p, state: 'away', label: 'Away', line: `Told you: ${s.why}` }
    if (s?.answer === 'none') return { p, state: 'none', label: 'No answer', line: s.asked }
    return { p, state: 'yes', label: 'Coming', line: `${p.parent} said yes` } })
  const coming = rows.filter(r => r.state === 'here' || r.state === 'yes'), away = rows.filter(r => r.state === 'gone' || r.state === 'away'), none = rows.filter(r => r.state === 'none')
  return { rows, coming, away, none, rollTaken: rows.some(r => r.state === 'here' || r.state === 'gone') }
}

// ── Sunday's game lives in ./gameDay (shared with the team sheet and the live game). Passed on here for the screens that already read it from this file. ──
export { GAME, sundayOf, gameClock } from './gameDay'

// ── which player the coach has open: set by opening a file, read by the screens that work on one player (a goal, a clip, a report) ──
let open = KAI
const subs = new Set<() => void>()
export function openPlayer(id: number) { if (id === open) return; open = id; subs.forEach(f => f()) }
export const openPlayerId = () => open

/** The coach's team from the list, in name order, and the player who is open. */
export function useCoachTeam() {
  const a = useAcademy()
  const id = useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => open, () => open)
  const g = groupOf(a, COACH_GROUP)!, ps = playersIn(a, COACH_GROUP)
  return { a, g, ps, player: ps.find(p => p.id === id) ?? ps[0] }
}
