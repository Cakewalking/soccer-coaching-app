// The academy coach's film (pack v38): the recordings, the moments the app found in each, what the coach has done with them,
// and what the coach has chosen on "Record a drill". One place, read by Record (ACC8), Record a drill (ACC9) and Film (ADC3).
//
// STILL SAMPLE, all of it marked here: film is not in the academy's list. The recordings, how many moments each player has,
// what each moment shows, who has no filming consent, whose boot sensors are flat and the team numbers are the v38 boards'
// sample, keyed to the real players of the coach's team by name. What IS counted elsewhere: a clip the coach sends goes to
// the academy's one list (`sendClip`), so the player's file, the coach home and the owner's team page move.
// The sample's "sent home" never says more than the list does: nobody is shown as sent a clip the list has not counted.
// What the coach does is kept while the app is open (this tab), like the curriculum's swaps.

import { useSyncExternalStore } from 'react'
import { academyNow, playersIn, type Academy, type Player } from '../academy/academyStore'
import type { PartKey } from '../academy/curriculum'
import { COACH_GROUP, lowestSkill } from './coachTeam'

// ── the kit and who can be filmed. SAMPLE: the list has no field for filming consent, sensors or she and he ──
export const KIT = {
  battery: 71,
  /** a parent said no to filming: never filmed for a clip of their own, and blurred in everyone else's */
  noFilm: ['Mila Lombardi'],
  /** boot sensors that are flat tonight: still filmed, no touches counted */
  flatSensors: ['Otis Baker'],
}
/** SAMPLE: who is "she" in the coach's own lines. Everyone else is "he". */
const SHE = new Set(['Ana Costa', 'Harriet Wong', 'Isla Tran', 'Lola Nguyen', 'Mila Lombardi', 'Priya Gill', 'Sienna Vella', 'Tess Sullivan'])
export const his = (p: Player) => SHE.has(p.name) ? 'her' : 'his'
export const he = (p: Player) => SHE.has(p.name) ? 'she' : 'he'
export const him = (p: Player) => SHE.has(p.name) ? 'her' : 'him'

// ── the recordings ──
export type RecId = 'tonight' | 'game' | 'oneonone' | 'circuit'
export type Recording = {
  id: RecId; name: string; /** in a sentence: "tonight’s film" */ inLine: string; /** ISO date; tonight's is the list's today */ date: string; minutes: number
  ready: string; /** where a moment in it comes from, for the line beside a clip */ part: string
  /** the players who were not there, by name. Tonight's is read from the roll and the families' answers instead. */ away: string[]
  /** a one-on-one is one player's film: only they are listed */ only?: string
  /** what the film says about the team: label and count. A rate is never shown without its count. */ says: [string, string][]; saysTitle: string
}
/** SAMPLE (the v38 Film board). */
export const recordingsOf = (a: Academy): Recording[] => [
  { id: 'tonight', name: 'Tonight’s session', inLine: 'tonight’s film', date: a.today, minutes: 70, ready: 'Ready 20 minutes after you stopped', part: 'from the game at the end', away: [],
    saysTitle: 'What tonight’s film says about the team', says: [['Weaker-foot shots on target', '9 of 31'], ['Last time, 21 May', '6 of 28'], ['Goes for each player', '5 to 8']] },
  { id: 'game', name: 'Game at Eastbank', inLine: 'the game film', date: '2026-05-31', minutes: 50, ready: 'Ready 25 minutes after the final whistle', part: 'from the second half', away: ['Ana Costa', 'Jonah Marsh'],
    saysTitle: 'What the game film says about the team', says: [['Chances made', '11'], ['Taken with the weaker foot', '2 of 11'], ['Good film', '47 of 50 minutes']] },
  { id: 'oneonone', name: 'Kai, one-on-one', inLine: 'the one-on-one film', date: '2026-05-29', minutes: 9, ready: 'Ready 5 minutes after you stopped', part: 'from the one-on-one', away: [], only: 'Kai Okonkwo',
    saysTitle: 'What the one-on-one film says', says: [['Left-foot shots on target', '8 of 14'], ['The week before', '5 of 12'], ['Goes', '14']] },
  { id: 'circuit', name: 'Finishing circuit', inLine: 'the drill film', date: '2026-05-28', minutes: 12, ready: 'Ready 10 minutes after you stopped', part: 'from the finishing circuit', away: ['Rory Doyle'],
    saysTitle: 'What the drill film says about the team', says: [['Weaker-foot shots on target', '18 of 28'], ['Last run, 21 May', '13 of 25'], ['Goes for each player', '7 to 10']] },
]
/** SAMPLE: every recording this term, for the "All this term" card. Four of them are drawn. */
export const RECORDINGS_THIS_TERM = 23
/** SAMPLE (ACC8): how much of the game film was good enough to use. */
export const GAME_FILM_GOOD = '47 of 50 minutes good'

// ── the moments ──
export type MomentState = 'wait' | 'sent' | 'no'
export type Moment = {
  id: string; rec: RecId; /** the player's id in the academy's list */ player: number; k: number; label: string; skill: string; /** seconds */ len: number; minute: number
  /** picked for the family, by the app or by the coach */ pick: boolean; /** waiting for the coach's yes, sent home, or turned down */ state?: MomentState
  /** in the player's file */ saved: boolean; note: boolean; report: boolean
  /** the one extra sentence the board writes for this moment */ why?: string
  /** a team-mate with no filming consent is in the clip, or the trial player is: both are blurred */ blurTeam: boolean; blurTrial: boolean
}
// What each moment shows, by core skill. `{his}` is filled in for the player.
const LABELS: Record<string, string[]> = {
  'First touch': ['First touch, half turn', 'Takes it on the back foot', 'First touch on the move', 'First touch away from the defender'],
  'Running with the ball': ['Runs with it, head up', 'Runs into the space', 'Uses both feet at speed'],
  'One against one': ['Takes {his} player on', 'Tries a move', 'Wins it back'],
  'Striking the ball': ['Weaker-foot shot on target', 'Weaker-foot pass', 'Weaker-foot finish', 'Laces strike, low'],
}
// [moments, picked, of those sent home, saved to the file]. A pick that is not sent is waiting for the coach.
type Spec = [n: number, pick?: number, sent?: number, saved?: number]
const PLAN: Record<RecId, Record<string, Spec>> = {
  // The board's night: 38 moments, 14 picked, 12 waiting, 2 sent, 9 saved. The board marks Harriet as sent home; the list says her family
  // has had no clip, so the two already sent are Ezra and Noah (the list counts clips for both) and Harriet's is waiting.
  tonight: { Ezra: [3, 1, 1, 1], Finn: [2, 1], Harriet: [3, 1, 0, 1], Isla: [3, 1, 0, 1], Kai: [5, 2, 0, 2], Lola: [4, 1, 0, 1], Noah: [2, 1, 1, 1], Otis: [2, 1], Priya: [3, 1], Rory: [2, 0], Sienna: [3, 1], Tess: [3, 1, 0, 1], Zane: [3, 2, 0, 1] },
  game: { Ezra: [3, 1, 1, 1], Finn: [3, 1, 1, 1], Harriet: [2, 0], Isla: [3, 1, 1, 1], Kai: [5, 0, 0, 1], Lola: [4, 1, 1, 1], Noah: [2, 1, 1, 1], Otis: [3, 1, 1, 1], Priya: [3, 1, 1, 1], Rory: [2, 1, 1, 1], Sienna: [2, 1, 1, 1], Tess: [3, 1, 1, 1], Zane: [3, 1, 1, 1] },
  oneonone: { Kai: [14, 0, 0, 3] },
  circuit: { Ana: [2, 1], Ezra: [3, 0], Finn: [3, 1, 1, 1], Harriet: [3, 1], Isla: [3, 0], Jonah: [3, 1, 1, 1], Kai: [4, 1], Lola: [3, 1, 1, 1], Noah: [3, 0], Otis: [3, 0], Priya: [3, 0], Sienna: [3, 1, 1, 1], Tess: [3, 0], Zane: [2, 0] },
}
// The one player the board draws in full: Kai, tonight.
const KAI_TONIGHT: [string, string][] = [['Left-foot finish', 'Striking the ball'], ['Left-foot pass', 'Striking the ball'], ['First touch, half turn', 'First touch'], ['Takes his player on', 'One against one'], ['Wins it back', 'One against one']]
const KAI_WHY = 'This is his first left-foot shot on target in a game tonight, and the fourth this term.'

function build(): Moment[] {
  const a = academyNow(), ps = playersIn(a, COACH_GROUP), out: Moment[] = []
  for (const rec of Object.keys(PLAN) as RecId[]) for (const [first, [n, pick = 0, sent = 0, saved = 0]] of Object.entries(PLAN[rec])) {
    const p = ps.find(x => x.name.split(' ')[0] === first); if (!p) continue   // someone who has left the team has no film here
    const start = Math.max(0, p.goal_skill ? a.skills.indexOf(p.goal_skill) : lowestSkill(p))
    for (let k = 0; k < n; k++) {
      const drawn = rec === 'tonight' && first === 'Kai' ? KAI_TONIGHT[k] : undefined
      const skill = drawn?.[1] ?? (rec === 'circuit' ? 'Striking the ball' : a.skills[(start + k) % a.skills.length]), bank = LABELS[skill] ?? ['A good moment']
      out.push({ id: `${rec}:${p.id}:${k}`, rec, player: p.id, k, skill, label: drawn?.[0] ?? bank[(p.id + k + (rec === 'game' ? 1 : 0)) % bank.length].replace('{his}', his(p)),
        len: 6 + (p.id * 3 + k * 5) % 9, minute: rec === 'tonight' ? (drawn && k === 0 ? 58 : 47 + (p.id * 7 + k * 5) % 20) : 3 + (p.id * 11 + k * 13) % 45,
        pick: k < pick, state: k < sent ? 'sent' : k < pick ? 'wait' : undefined, saved: k < saved, note: false, report: false, why: drawn && k === 0 ? KAI_WHY : undefined,
        blurTeam: rec !== 'tonight' && rec !== 'oneonone' && (p.id + k) % 3 === 0, blurTrial: rec === 'tonight' && (p.id + k) % 2 === 0 })
    }
  }
  if (out.find(m => m.id === 'tonight:166:0')) out.find(m => m.id === 'tonight:166:0')!.len = 9   // the board's clip: 0:09
  return out
}

// ── what the coach is about to record (ACC9) ──
export type Way = 'plan' | 'library' | 'describe'
export type DrillChoice = { way: Way; /** the part of tonight's plan */ part: PartKey; /** a drill from the library, by name */ lib: string; search: string; /** the sentence, and whether it has been saved as the coach's own drill */ text: string; own: boolean
  note: string; /** chips the coach has turned the other way from how the drill fills them in */ flipped: string[]; /** chips the coach added */ mine: string[]; compare: boolean }
const DRILL_START: DrillChoice = { way: 'plan', part: 'Training', lib: '', search: '', text: '', own: false, note: '', flipped: [], mine: [], compare: true }

// ── what is being looked at on Film (ADC3) ──
export type View = 'recording' | 'player' | 'working' | 'playlists'
export type Sel = { view: View; rec: RecId; /** the recording open in the Player view, when the coach has picked one */ playerRec: RecId | null; skill: string; list: string; /** the moment showing */ at: string | null; /** walking through the waiting ones */ walk: boolean }
const SEL_START: Sel = { view: 'recording', rec: 'tonight', playerRec: null, skill: 'Striking the ball', list: 'weak', at: null, walk: false }

type Change = Partial<Pick<Moment, 'pick' | 'state' | 'saved' | 'note' | 'report'>>
type Kept = { ch: Record<string, Change>; sel: Sel; drill: DrillChoice }
export type Film = { moments: Moment[]; sel: Sel; drill: DrillChoice }

const KEY = 'cs_film_v1', BASE = build()
let kept: Kept = (() => { try { const v = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as Kept | null; if (v?.ch && v.sel && v.drill) return { ch: v.ch, sel: { ...SEL_START, ...v.sel }, drill: { ...DRILL_START, ...v.drill } } } catch { /* start from the sample */ } return { ch: {}, sel: SEL_START, drill: DRILL_START } })()
const make = (): Film => ({ moments: BASE.map(m => kept.ch[m.id] ? { ...m, ...kept.ch[m.id] } : m), sel: kept.sel, drill: kept.drill })
let film = make()
const subs = new Set<() => void>()
function commit(next: Partial<Kept>) { kept = { ...kept, ...next }; film = make(); try { sessionStorage.setItem(KEY, JSON.stringify(kept)) } catch { /* kept for this page only */ } subs.forEach(f => f()) }
export const useFilm = (): Film => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => film, () => film)
export const filmNow = () => film
/** Back to the sample as it was drawn. */
export function resetFilm() { commit({ ch: {}, sel: SEL_START, drill: DRILL_START }) }

const change = (id: string, c: Change, more?: Record<string, Change>) => commit({ ch: { ...kept.ch, ...more, [id]: { ...kept.ch[id], ...c } } })
export function look(p: Partial<Sel>) { commit({ sel: { ...kept.sel, ...p } }) }
export function setDrill(p: Partial<DrillChoice>) { commit({ drill: { ...kept.drill, ...p } }) }
/** The coach said yes: the clip is marked sent, and it is in the player's file. The caller tells the academy's list (`sendClip`). */
export function markSent(id: string) { change(id, { pick: true, state: 'sent', saved: true }) }
/** "Not this one": taken off, and the player's next moment that has not been offered is put in its place. Returns that moment's id, or null when there is none left. */
export function turnDown(id: string): string | null {
  const m = film.moments.find(x => x.id === id); if (!m) return null
  const next = film.moments.find(x => x.rec === m.rec && x.player === m.player && x.id !== id && !x.pick && !x.state)
  change(id, { state: 'no' }, next ? { [next.id]: { ...kept.ch[next.id], pick: true, state: 'wait' } } : undefined)
  return next?.id ?? null
}
/** The coach picks a moment the app did not: it waits for a yes like any other. */
export function pickMoment(id: string) { change(id, { pick: true, state: 'wait' }) }
export function toggleNote(id: string) { const m = film.moments.find(x => x.id === id); if (m) change(id, { note: !m.note }) }
/** Kept as evidence for the term report, and so in the file. */
export function addToReport(id: string) { change(id, { report: true, saved: true }) }

// ── counting. Every number on Film is counted from the moments as they stand ──
export const isPicked = (m: Moment) => m.state === 'wait' || m.state === 'sent'
export function tally(ms: Moment[]) {
  return { found: ms.length, picked: ms.filter(isPicked).length, waiting: ms.filter(m => m.state === 'wait').length, sent: ms.filter(m => m.state === 'sent').length, saved: ms.filter(m => m.saved).length, players: new Set(ms.map(m => m.player)).size }
}
export type RowState = { kind: 'check' | 'sent' | 'off' | 'none' | 'away' | 'unfilmed' | 'nothing'; label: string }
/** One player's state for a set of moments. In this order: something to check; sent home; turned down; moments but nothing picked; then why there are none. */
export function rowState(ms: Moment[], away: boolean, noFilm: boolean): RowState {
  const t = tally(ms)
  if (t.waiting) return { kind: 'check', label: `${t.waiting} to check` }
  if (t.sent) return { kind: 'sent', label: 'Sent home' }
  if (ms.some(m => m.state === 'no')) return { kind: 'off', label: 'Not sent' }
  if (ms.length) return { kind: 'nothing', label: 'Nothing picked' }
  return away ? { kind: 'away', label: 'Not there' } : noFilm ? { kind: 'unfilmed', label: 'Not filmed' } : { kind: 'none', label: 'None found' }
}
/** The moments waiting for a yes in a set, in the order the walk-through takes them: by player in name order, then as found. */
export const waitingIn = (ms: Moment[], ps: Player[]) => ps.flatMap(p => ms.filter(m => m.player === p.id && m.state === 'wait'))

// ── playlists. SAMPLE names; what is in each is counted from the moments, so two of them fill as the coach works ──
export const PLAYLISTS: { id: string; name: string; line: string; has: (m: Moment) => boolean }[] = [
  { id: 'weak', name: 'Weaker foot', line: 'Every weaker-foot shot, pass and finish', has: m => /weaker-foot|left-foot/i.test(m.label) },
  { id: 'sent', name: 'Sent home', line: 'What families have seen from these recordings', has: m => m.state === 'sent' },
  { id: 'report', name: 'For term reports', line: 'The ones you added to a report', has: m => m.report },
]

// ── a drill filmed before. SAMPLE (the v38 boards): the last time the coach filmed it ──
export const FILMED_BEFORE: Record<string, string> = { 'Turn and finish, with a chaser': '2026-05-21', 'Finish under pressure, 2 v 1': '2026-05-21' }
