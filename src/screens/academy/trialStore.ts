// Trials (programs v2, 25 Nov): one list of trial players that the owner's Trials board (AC3), the coach's assessment (ACC3)
// and the owner's decision (ADT1) all read and change. Booked → with the coach → recommended, your call → joined.
// Sample, kept while the app is open: a trial player is not in the academy's list of players until they join for real.

import { useSyncExternalStore } from 'react'

export type TrialCol = 'booked' | 'coach' | 'call' | 'joined'
/** What the coach recommends: a place in their own team, in another team, a second trial, or not this term. */
export type Rec = 'mine' | 'other' | 'second' | 'no'
export type Sure = 'Sure' | 'Fairly sure' | 'Not sure'
/** Not yet, Some, Strong: the whole player and the game at the end. */
export type Mark = 0 | 1 | 2
/** Against the coach's own team: Behind, With them, Ahead. For placing a player; never shown to the family. */
export type Against = 0 | 1 | 2

export type Assessment = {
  /** steps 1 to 5 on the four core skills, in the store's skill order; 0 is not marked yet */ steps: number[]
  against: (Against | null)[]
  /** game sense, body, head, with others */ whole: (Mark | null)[]
  /** with the ball, without the ball, did the team play better with him in it */ game: (Mark | null)[]
  clips: number; clipSeconds: number
  rec: Rec | null
  /** the team a place is recommended in (a group id), when the recommendation is a place */ recTeam?: string
  sure: Sure | null; why: string[]
  /** if a place opens in the coach's own team: move the player up, or leave them */ ifOpens: 'move' | 'leave' | null
  note: string
  /** what the family will be told, drafted from the taps; the coach can change either */ well: string; work: string
  /** when the coach sent it to the owner, as shown: "7:52 pm" */ sent?: string
}
export type Trial = {
  id: string; name: string; age: number; parent: string; parentIs: string
  /** she and her in the coach's own lines; he and his when it is not set */ she?: boolean
  /** the team the player is trialling with (a group id) */ team: string
  col: TrialCol
  /** the line under the name while booked or with the coach: "Mon 8 June", "Today 6:35" */ when: string
  remind?: string
  /** the day they came: "28 May" */ came?: string
  /** the day they joined, and their file in the academy's list when they have one */ joined?: string; playerId?: number
  /** the owner has asked for a second trial, or sent the offer */ asked?: 'second' | 'offer'
  a: Assessment
}

const blank = (): Assessment => ({ steps: [0, 0, 0, 0], against: [null, null, null, null], whole: [null, null, null, null], game: [null, null, null], clips: 0, clipSeconds: 0, rec: null, sure: null, why: [], ifOpens: null, note: '', well: '', work: '' })
const t = (x: Omit<Trial, 'a' | 'parentIs'> & { a?: Partial<Assessment>; parentIs?: string }): Trial => ({ parentIs: 'mum', ...x, a: { ...blank(), ...x.a } })

/** Arjun's assessment as the boards draw it filled in (ACC3), and as the owner reads it (ADT1). */
export const ARJUN: Assessment = {
  steps: [3, 3, 4, 2], against: [1, 1, 2, 0], whole: [1, 2, 2, 1], game: [2, 1, 1], clips: 2, clipSeconds: 21,
  rec: 'other', recTeam: 'U13Gold', sure: 'Sure', why: ['Skills fit the team', 'Easy to coach', 'Needs time on one skill', 'My team is full'], ifOpens: 'move',
  note: 'Good first touch under pressure. Quiet, but he listens and asks. I’d have him in Timber if we had a place. Gold is the right start, and Sam should work on his striking.',
  well: 'Arjun takes players on and keeps the ball when he is under pressure.', work: 'Striking a moving ball with the laces.',
}
export const WHY = ['Skills fit the team', 'Easy to coach', 'Would start most games', 'Needs time on one skill', 'My team is full']

const SAMPLE: Trial[] = [
  t({ id: 'ivy', name: 'Ivy Barlow', age: 7, she: true, parent: 'Kate Barlow', team: 'U7Gold', col: 'booked', when: 'Mon 8 June', remind: 'Sunday' }),
  t({ id: 'nate', name: 'Nate Greco', age: 10, parent: 'Paula Greco', team: 'U10Gold', col: 'booked', when: 'Tue 9 June', remind: 'Monday' }),
  t({ id: 'arjun', name: 'Arjun Mehta', age: 12, parent: 'Meera Mehta', team: 'U13Timber', col: 'coach', when: 'Today 6:35' }),
  t({ id: 'lola', name: 'Lola Ferris', age: 12, she: true, parent: 'Jo Ferris', team: 'U12Timber', col: 'call', when: 'Thu 28 May', came: '28 May', a: { steps: [4, 3, 3, 3], against: [2, 1, 1, 1], whole: [2, 1, 2, 2], game: [2, 1, 2], rec: 'mine', recTeam: 'U12Timber', sure: 'Sure', why: ['Skills fit the team', 'Would start most games'], note: 'Ready for this team now. Sees the pass early.', well: 'Lola looks up before the ball arrives and picks the right pass.', work: 'Using her left foot when it is the better choice.', sent: '7:10 pm' } }),
  t({ id: 'billie', name: 'Billie Nguyen', age: 9, she: true, parent: 'Linh Nguyen', team: 'U9Gold', col: 'call', when: 'Tue 26 May', came: '26 May', a: { steps: [2, 3, 2, 2], against: [1, 1, 1, 0], whole: [1, 2, 1, 2], game: [1, 1, 1], rec: 'mine', recTeam: 'U9Gold', sure: 'Fairly sure', why: ['Skills fit the team', 'Easy to coach'], note: 'Fits the team. Joined in from the first minute.', well: 'Billie runs with the ball with her head up.', work: 'Striking the ball with her laces.', sent: '6:40 pm' } }),
  t({ id: 'sam', name: 'Sam Petrakis', age: 8, parent: 'Eleni Petrakis', team: 'U8Timber', col: 'call', when: 'Wed 27 May', came: '27 May', a: { steps: [2, 2, 1, 2], against: [1, 0, 0, 1], whole: [1, 1, 0, 1], game: [1, 0, 1], rec: 'second', sure: 'Not sure', why: ['Needs time on one skill'], note: 'Shy on the night. I would like to see him again before saying.', well: 'Sam keeps trying after a mistake.', work: 'Taking a player on, one against one.', sent: '5:45 pm' } }),
  t({ id: 'kai', name: 'Kai Okonkwo', age: 13, parent: 'Temi Okonkwo', team: 'U13Timber', col: 'joined', when: '', joined: '13 May', playerId: 166 }),
  t({ id: 'ana', name: 'Ana Costa', age: 12, parent: 'Rita Costa', team: 'U13Timber', col: 'joined', when: '', joined: '14 May', playerId: 167 }),
]
/** Joined this month and not drawn as cards: the board's "2 more this month". */
export const MORE_JOINED = { n: 2, teams: 'U6 Timber and U11 Timber' }
/** Offers in the sample that were not taken up, behind "4 of the last 6 offers were taken up". */
export const OFFERS_NOT_TAKEN = 2

let trials = SAMPLE
const subs = new Set<() => void>()
const put = (next: Trial[]) => { trials = next; subs.forEach(f => f()) }
export function useTrials() { return useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => trials, () => trials) }
export const trialsNow = () => trials
export const trialOf = (list: Trial[], id: string) => list.find(x => x.id === id)
export function resetTrials() { put(SAMPLE) }

// ── which trial is open: set by tapping a card, read by ACC3 and ADT1 ──
let open = 'arjun'
export function openTrial(id: string) { if (id === open) return; open = id; subs.forEach(f => f()) }
export function useOpenTrial() { const list = useTrials(); return list.find(x => x.id === open) ?? list.find(x => x.id === 'arjun') ?? list[0] }

/** Move a card to a column, before the card `before` (or to the end of the column). Returns true when the column changed. */
export function moveTrial(id: string, col: TrialCol, before?: string) {
  const c = trials.find(x => x.id === id)
  if (!c || before === id) return false
  const rest = trials.filter(x => x.id !== id), at = before ? rest.findIndex(x => x.id === before) : -1
  const end = rest.reduce((n, x, k) => x.col === col ? k + 1 : n, rest.length), i = at < 0 ? end : at
  if (c.col === col && trials.indexOf(c) === i) return false
  put([...rest.slice(0, i), c.col === col ? c : { ...c, col, asked: undefined }, ...rest.slice(i)])
  return c.col !== col
}
/** The coach's taps as they go (ACC3). */
export function setAssessment(id: string, a: Partial<Assessment>) { put(trials.map(x => x.id === id ? { ...x, a: { ...x.a, ...a } } : x)) }
/** "Send to Dani": needs a recommendation and how sure. The card moves to "Recommended · your call". */
export const canSend = (a: Assessment) => !!a.rec && !!a.sure
export function sendToOwner(id: string, sent: string) {
  const c = trials.find(x => x.id === id)
  if (!c || !canSend(c.a)) return false
  put(trials.map(x => x.id === id ? { ...x, col: 'call', came: x.came ?? 'today', a: { ...x.a, sent } } : x))
  return true
}
/** The owner's decision (ADT1): the offer goes to the family, or the coach is asked for a second trial. */
export function decide(id: string, what: 'offer' | 'second') {
  put(trials.map(x => x.id === id ? what === 'second' ? { ...x, asked: 'second', a: { ...x.a, rec: 'second' } } : { ...x, asked: 'offer' } : x))
}
