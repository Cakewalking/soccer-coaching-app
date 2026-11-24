// The academy's one list (programs v2, 24 Nov). Nothing on an academy screen is typed in: every number is counted here
// from `data/academy-data.json`, the designer's sample of 17 teams and 226 players. The screens that take input (the
// roll, a step, a goal, a clip, a report, the Term 3 answer, a fee, a rate) write here, and every screen that shows
// the number changes with it. What a person changes is kept in this browser; the sample itself is never edited.
// A demo on sample data: no real child, family or payment is behind any of it.

import { useSyncExternalStore } from 'react'
import raw from './data/academy-data.json'

export type Program = 'Foundation' | 'Development' | 'Advanced'
export type Group = { id: string; board: string; prog: Program; name: string; age: number; ages: string; when: string; days: string[]; where: string; coach: string; ci: string; cap: number; size: number; price: number; rate: number; pitch: number; team: string; dates: string[] }
export type Player = {
  id: number; name: string; age: number; group: string; program: Program; game_team: string; parent: string; parent_is: string; joined: string
  /** one entry for each session in the team's `dates`: came, did not, or null before they joined */ roll: (boolean | null)[]
  /** steps 1 to 5 on the four core skills, at the start of term and now */ skills_then: number[]; skills_now: number[]
  goal: string; goal_skill: string | null; notes_in_last_3_weeks: boolean; clips_sent_this_term: number
  term_report: 'To write' | 'Drafted' | 'Too new'; term3: 'Staying' | 'Not said' | 'Leaving'
  fees_status: 'Paid' | 'On a plan' | 'Late'; fees_owed: number; fees_note: string
  same_step_two_terms: boolean; ready_to_move_to: string | null; one_on_ones: boolean
}
/** An adult who works with children here: the children check, whether it is linked to the academy, and the child safety course. Typed in by the owner; Clean Sheet reminds, it does not check with the state. */
export type Adult = { name: string; ci: string; role: string; check: string; checkOk: boolean; linked: boolean; course: boolean; added?: boolean }
export type Academy = { adults: Adult[]; today: string; term: string; price_this_term: Record<Program, number>; price_for_the_year: Record<Program, [string, number][]>; coach_rate_a_session: number; half_pitch_a_term: number; skills: string[]; step_words: Record<string, string[]>; groups: Group[]; players: Player[] }

const SAMPLE = raw as unknown as Omit<Academy, 'adults'>
export const PROGRAMS: Program[] = ['Foundation', 'Development', 'Advanced']
/** Sessions a coach is paid for in a term, in "what a team earns". */
export const SESSIONS_A_TERM = 20
/** A week of attendance below this share is mauve. A coach's basic below `BASIC_LOW` is mauve. */
export const CAME_LOW = 0.85, BASIC_LOW = 2 / 3
/** The first day of the term: weeks are counted from here. */
const TERM_START = '2026-04-20'

// ── what a person has changed, kept apart from the sample ──
type Edits = { players: Record<number, Partial<Player>>; groups: Record<string, Partial<Group>>; added: Group[]; rate?: number; pitch?: number; adults?: Adult[]; checks?: Record<string, Partial<Adult>> }
const KEY = 'cs_academy_v2', none = (): Edits => ({ players: {}, groups: {}, added: [] })
let edits: Edits = (() => { try { const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Edits | null; if (v?.players && v.groups && v.added) return v } catch { /* start from the sample */ } return none() })()
// The children checks as the sample has them: one check runs out on 30 June, two new coaches are still to link, three have the course to do.
// These are not in `academy-data.json`; the designer's screens typed them by name, so they are kept here, in one place, and `AD23` adds to them.
const OWNER = 'Dani Okafor'
const CHECK_SAMPLE: Record<string, Partial<Adult>> = { 'Ben Castellano': { check: 'Runs out 30 June' }, 'Ollie Drummond': { linked: false, course: false }, 'Aisha Khan': { linked: false, course: false }, 'Tom Ashby': { course: false } }
const IN_SAMPLE = new Set([OWNER, ...SAMPLE.groups.map(g => g.coach)])
// Someone who is not in the sample (a coach named on a team in AD20 but never added in AD23) has nothing on record yet: the check is still to look up.
const adult = (name: string, role: string, extra?: Partial<Adult>): Adult => ({ name, ci: initials(name), role, ...(IN_SAMPLE.has(name) ? { check: 'Current', checkOk: true, linked: true, course: true } : { check: 'To look up', checkOk: false, linked: false, course: false }), ...CHECK_SAMPLE[name], ...extra, ...(extra ? { role } : null), ...edits.checks?.[name] })
const build = (): Academy => { const groups = [...SAMPLE.groups, ...edits.added].map(g => ({ ...g, ...edits.groups[g.id], ...(edits.rate !== undefined ? { rate: edits.rate } : {}), ...(edits.pitch !== undefined ? { pitch: edits.pitch } : {}) }))
  const withTeam = new Map<string, string[]>(); for (const g of groups) withTeam.set(g.coach, [...(withTeam.get(g.coach) ?? []), g.name])
  return { ...SAMPLE,
  coach_rate_a_session: edits.rate ?? SAMPLE.coach_rate_a_session, half_pitch_a_term: edits.pitch ?? SAMPLE.half_pitch_a_term, groups,
  players: SAMPLE.players.map(p => edits.players[p.id] ? { ...p, ...edits.players[p.id] } : p),
  // the owner, then each coach in team order, then anyone added who has no team yet
  adults: [adult(OWNER, 'Owner'), ...[...withTeam.entries()].filter(([n]) => n !== OWNER).map(([n, teams]) => adult(n, teams.join(', '), (edits.adults ?? []).find(x => x.name === n))), ...(edits.adults ?? []).filter(x => x.name !== OWNER && !withTeam.has(x.name)).map(x => adult(x.name, x.role, x))] } }
let state = build()
const subs = new Set<() => void>()
const commit = () => { state = build(); try { localStorage.setItem(KEY, JSON.stringify(edits)) } catch { /* kept for this visit only */ } subs.forEach(f => f()) }
export const useAcademy = (): Academy => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => state, () => state)
export const academyNow = () => state
/** Back to the sample as it was drawn. */
export function resetAcademy() { edits = none(); commit() }

// ── finding things. Players are always in name order and teams in the list's order: nobody is ranked ──
export const groupOf = (a: Academy, id: string) => a.groups.find(g => g.id === id || g.board === id || g.board.split('-')[0] === id)
export const playerOf = (a: Academy, id: number | string) => a.players.find(p => p.id === Number(id))
export const playersIn = (a: Academy, groupId: string) => a.players.filter(p => p.group === groupId).sort((x, y) => x.name.localeCompare(y.name))
export const groupsIn = (a: Academy, prog: Program) => a.groups.filter(g => g.prog === prog)
export const coaches = (a: Academy) => a.groups.map(g => ({ name: g.coach, ci: g.ci, group: g }))
export function initials(name: string) { return name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() }
/** The board ids the designs give a team and a player, as the pack's `boards/` names them: `ADG14-Team`; `ADF01-Player` to `ADF226-Player`
 * (two digits at least); and for the coach's view of their own team `ADCP167-Player` to `ADCP181-Player`, with Kai's file keeping its first id, `ADC1-PlayerFile`. */
export const teamBoard = (g: Group) => g.board
export const playerBoard = (p: Player, coach = false) => coach ? (p.name === 'Kai Okonkwo' ? 'ADC1-PlayerFile' : `ADCP${String(p.id).padStart(2, '0')}-Player`) : `ADF${String(p.id).padStart(2, '0')}-Player`

// ── how each number is counted ──
export const share = (n: number, of: number) => of ? n / of : 0
export const pct = (n: number, of: number) => of ? Math.round(100 * n / of) : 0
/** Came: sessions marked true, of the sessions since they joined. */
export const cameOf = (p: Player) => ({ came: p.roll.filter(x => x === true).length, of: p.roll.filter(x => x !== null).length })
/** Up a step: any skill where now is higher than then. */
export const upAStep = (p: Player) => p.skills_now.some((s, k) => s > p.skills_then[k])
export const missedLast = (p: Player, n = 3) => { const r = p.roll.filter(x => x !== null); return r.length >= n && r.slice(-n).every(x => x === false) }
/** A family worth a call: missed the last three sessions, and has not said about Term 3. A prompt, never a prediction. */
export const worthACall = (p: Player) => missedLast(p) && p.term3 === 'Not said'
export const weekOf = (date: string) => Math.floor((Date.parse(date) - Date.parse(TERM_START)) / (7 * 864e5)) + 1

export type Counts = { n: number; up: number; notes: number; goal: number; clip: number; report: number; staying: number; notSaid: number; leaving: number; came: number; of: number; att: number; owed: number; late: number; onPlan: number }
/** The counts for any set of players: a team, a program, or the whole academy. */
export function count(ps: Player[]): Counts {
  const c = { n: ps.length, up: 0, notes: 0, goal: 0, clip: 0, report: 0, staying: 0, notSaid: 0, leaving: 0, came: 0, of: 0, att: 0, owed: 0, late: 0, onPlan: 0 }
  for (const p of ps) { const k = cameOf(p)
    if (upAStep(p)) c.up++; if (p.notes_in_last_3_weeks) c.notes++; if (p.goal) c.goal++; if (p.clips_sent_this_term > 0) c.clip++; if (p.term_report === 'Drafted') c.report++
    if (p.term3 === 'Staying') c.staying++; else if (p.term3 === 'Leaving') c.leaving++; else c.notSaid++
    c.came += k.came; c.of += k.of; c.owed += p.fees_owed; if (p.fees_status === 'Late') c.late++; if (p.fees_status === 'On a plan') c.onPlan++ }
  c.att = pct(c.came, c.of); return c
}
export type TeamCounts = Counts & { open: number; billed: number; collected: number; coachCost: number; pitch: number; left: number; weeks: { week: number; pct: number }[]; skills: { skill: string; then: number; now: number }[] }
/** A team's page: places, attendance week by week, progress by skill (players on step 3 or higher, then and now), and what the team earns. */
export function teamCounts(a: Academy, g: Group): TeamCounts {
  const ps = playersIn(a, g.id), c = count(ps), billed = ps.length * g.price, coachCost = SESSIONS_A_TERM * g.rate
  const wk = new Map<number, [number, number]>()
  g.dates.forEach((d, i) => { const w = weekOf(d), [x, y] = wk.get(w) ?? [0, 0]; wk.set(w, [x + ps.filter(p => p.roll[i] === true).length, y + ps.filter(p => p.roll[i] != null).length]) })
  return { ...c, open: g.cap - ps.length, billed, collected: billed - c.owed, coachCost, pitch: g.pitch, left: billed - coachCost - g.pitch,
    weeks: [...wk.entries()].sort((x, y) => x[0] - y[0]).map(([week, [x, y]]) => ({ week, pct: pct(x, y) })),
    skills: a.skills.map((skill, k) => ({ skill, then: ps.filter(p => p.skills_then[k] >= 3).length, now: ps.filter(p => p.skills_now[k] >= 3).length })) }
}
/** The coach's four basics for a set of players: notes in the last 3 weeks, a goal set, at least one clip sent, the report drafted. */
export const basics = (ps: Player[]) => { const c = count(ps); return [['Notes in the last 3 weeks', c.notes], ['A goal set', c.goal], ['Families sent a clip this term', c.clip], ['Term reports drafted', c.report]].map(([label, n]) => ({ label: label as string, n: n as number, of: c.n, low: share(n as number, c.n) < BASIC_LOW })) }
export const money = (n: number) => `$${Math.round(n).toLocaleString('en-AU')}`

/** Players up a step on each of the four core skills: "Where the progress is" on a team page. */
export const upsBySkill = (a: Academy, ps: Player[]) => a.skills.map((skill, k) => ({ skill, n: ps.filter(p => p.skills_now[k] > p.skills_then[k]).length, of: ps.length }))
/** Joined after the team's first session this term. */
export const isNew = (a: Academy, p: Player) => { const g = a.groups.find(x => x.id === p.group); return !!g && g.dates.length > 0 && p.joined > g.dates[0] }
export const firstName = (p: Player) => p.name.split(' ')[0]
/** Families waiting for a place. Only Advanced has a waiting list in the sample; it is not in `academy-data.json`. */
export const WAITING: Record<Program, number> = { Foundation: 0, Development: 0, Advanced: 5 }

export type Need = { kind: 'late' | 'call' | 'notSaid' | 'move' | 'noGoal' | 'sameStep' | 'waiting'; text: string; sub: string; players: Player[]; /** the screen that deals with it */ to: string }
/** "Needs you" on a team page, in this order, at most six: late fees by name; a family worth a call; families not said; ready to move; no goal; same step two terms; the waiting list. Worded as the team boards word it. */
export function needs(a: Academy, g: Group): Need[] {
  const ps = playersIn(a, g.id), out: Need[] = [], open = g.cap - ps.length, has = (l: Player[]) => l.length === 1 ? ' has' : ' have'
  for (const p of ps.filter(x => x.fees_status === 'Late')) out.push({ kind: 'late', text: `${p.name}: fees ${p.fees_note || 'late'}, ${money(p.fees_owed)}`, sub: `${money(p.fees_owed)} owed`, players: [p], to: 'AC5-Fees' })
  for (const p of ps.filter(worthACall)) out.push({ kind: 'call', text: `${firstName(p)}’s family is worth a call: missed the last 3 sessions`, sub: 'Missed the last three sessions, and has not said about Term 3', players: [p], to: playerBoard(p) })
  const unsaid = ps.filter(x => x.term3 === 'Not said')
  if (unsaid.length) out.push({ kind: 'notSaid', text: `${unsaid.length} ${unsaid.length === 1 ? 'family hasn’t' : 'families haven’t'} said about Term 3`, sub: 'Their place is held until the date you set', players: unsaid, to: 'AD4-NextTerm' })
  for (const p of ps.filter(x => x.ready_to_move_to)) out.push({ kind: 'move', text: `${firstName(p)} is ready for ${p.ready_to_move_to}`, sub: 'The coach suggests it; you decide; the family is asked', players: [p], to: 'AD5-GroupMoves' })
  const ng = ps.filter(x => !x.goal)
  if (ng.length) out.push({ kind: 'noGoal', text: `${ng.slice(0, 3).map(firstName).join(', ')}${ng.length > 3 ? ` and ${ng.length - 3} more` : ''}${has(ng)} no goal yet`, sub: 'One goal at a time', players: ng, to: 'ADC10-SetGoal' })
  const st = ps.filter(x => x.same_step_two_terms)
  if (st.length) out.push({ kind: 'sameStep', text: `${st.map(firstName).join(' and ')}${has(st)} been on the same step for two terms`, sub: 'Worth a look with the coach', players: st, to: playerBoard(st[0]) })
  if (WAITING[g.prog] && open > 0) out.push({ kind: 'waiting', text: `${open} place${open > 1 ? 's' : ''} open, and ${WAITING[g.prog]} families are waiting for ${g.prog}`, sub: 'Offer a place from the waiting list', players: [], to: 'ADP14-WaitingList' })
  return out.slice(0, 6)
}

/** A program, or with no program the whole academy: its teams, players, places, the counts, and the money this term. Fees billed is players × what each pays; coaches is 20 sessions a team; pitch hire is half a pitch a team. */
export function programCounts(a: Academy, prog?: Program) {
  const teams = prog ? groupsIn(a, prog) : a.groups, ids = new Set(teams.map(g => g.id)), ps = a.players.filter(p => ids.has(p.group)), c = count(ps)
  const n = (g: Group) => ps.filter(p => p.group === g.id).length
  const billed = teams.reduce((t, g) => t + n(g) * g.price, 0), coachCost = teams.reduce((t, g) => t + SESSIONS_A_TERM * g.rate, 0), pitch = teams.reduce((t, g) => t + g.pitch, 0), cap = teams.reduce((t, g) => t + g.cap, 0)
  return { ...c, teams, players: ps, cap, open: cap - ps.length, billed, collected: billed - c.owed, coachCost, pitch, left: billed - coachCost - pitch, openWorth: teams.reduce((t, g) => t + Math.max(0, g.cap - n(g)) * g.price, 0) }
}
/** What a player in a program pays this term. Teams in a program share a price in the sample; if the owner has changed one, the lowest and highest are shown. */
export function pays(a: Academy, prog: Program) { const v = [...new Set(groupsIn(a, prog).map(g => g.price))].sort((x, y) => x - y); return v.length > 1 ? `${money(v[0])} to ${money(v[v.length - 1])}` : money(v[0] ?? a.price_this_term[prog]) }
/** The price a player pays this term, for every program: "$800, $950 or $1,100". Shown beside any fees total, so a total is never read as a price. */
export function paysLine(a: Academy) { const v = PROGRAMS.map(p => pays(a, p)); return `${v.slice(0, -1).join(', ')} or ${v[v.length - 1]}` }
/** How many weeks late a late fee is, from its note ("3 weeks late"). */
export const weeksLate = (p: Player) => Number(p.fees_note.match(/\d+/)?.[0] ?? 0)

// ── where each number is put in. Each of these changes the list, and so every screen that counts from it ──
const patch = (id: number, p: Partial<Player>) => { edits = { ...edits, players: { ...edits.players, [id]: { ...edits.players[id], ...p } } } }
const now = (id: number) => state.players.find(p => p.id === id)
/** The roll (`ACC2`). Marks one player for one session date. A date the team has not had yet is added as a new session. */
export function markRoll(groupId: string, date: string, playerId: number, came: boolean) {
  const g = state.groups.find(x => x.id === groupId); if (!g) return
  let dates = g.dates, i = dates.indexOf(date)
  if (i < 0) { dates = [...dates, date]; i = dates.length - 1; edits = { ...edits, groups: { ...edits.groups, [groupId]: { ...edits.groups[groupId], dates } } } }
  for (const p of state.players.filter(x => x.group === groupId)) { const roll = [...p.roll]; while (roll.length < dates.length) roll.push(null); if (p.id === playerId) roll[i] = came; if (p.id === playerId || roll.length !== p.roll.length) patch(p.id, { roll }) }
  commit()
}
/** Steps and notes (`ADC11`). A step only ever moves up from taps; moving it down is done in the player's file with `setStep`. */
export function stepUp(playerId: number, skill: number) { const p = now(playerId); if (!p || p.skills_now[skill] >= 5) return; patch(playerId, { skills_now: p.skills_now.map((s, k) => k === skill ? s + 1 : s), notes_in_last_3_weeks: true }); commit() }
export function setStep(playerId: number, skill: number, step: number) { const p = now(playerId); if (!p) return; patch(playerId, { skills_now: p.skills_now.map((s, k) => k === skill ? Math.max(1, Math.min(5, step)) : s) }); commit() }
export function addNote(playerId: number) { patch(playerId, { notes_in_last_3_weeks: true }); commit() }
/** A goal (`ADC10`). One goal at a time. */
export function setGoal(playerId: number, goal: string, skill: string | null = null) { patch(playerId, { goal: goal.trim(), goal_skill: goal.trim() ? skill : null }); commit() }
/** A clip sent to the player's own family (`ADC3`). */
export function sendClip(playerId: number) { const p = now(playerId); if (!p) return; patch(playerId, { clips_sent_this_term: p.clips_sent_this_term + 1 }); commit() }
/** The term report (`ACC6`). */
export function setReport(playerId: number, status: Player['term_report']) { patch(playerId, { term_report: status }); commit() }
/** The Term 3 answer (`ADP3`, in the family app). */
export function setTerm3(playerId: number, answer: Player['term3']) { patch(playerId, { term3: answer }); commit() }
/** A fee paid (`AC5`, or the payment provider). */
export function payFees(playerId: number) { patch(playerId, { fees_status: 'Paid', fees_owed: 0, fees_note: '' }); commit() }
/** A team's coach, places or price (`AD20`), and a new team. */
export function setGroup(groupId: string, p: Partial<Pick<Group, 'coach' | 'ci' | 'cap' | 'price' | 'when' | 'where' | 'name' | 'ages' | 'days' | 'team'>>) { edits = { ...edits, groups: { ...edits.groups, [groupId]: { ...edits.groups[groupId], ...p } } }; commit() }
export function addGroup(g: Group) { edits = { ...edits, added: [...edits.added.filter(x => x.id !== g.id), g] }; commit() }
/** What a coach is paid for a session, and half a pitch for a term (`AD21`). Pay, program money and each team's "what this team earns" follow. */
export function setRates(rate?: number, pitch?: number) { edits = { ...edits, ...(rate !== undefined ? { rate } : {}), ...(pitch !== undefined ? { pitch } : {}) }; commit() }
/** The board id the next new team gets: `ADG18-Team` after the sample's seventeen. */
export const nextTeamBoard = (a: Academy) => `ADG${String(Math.max(0, ...a.groups.map(g => Number(g.board.match(/\d+/)?.[0] ?? 0))) + 1).padStart(2, '0')}-Team`
/** A coach and their check (`AD23`). Adds an adult, or changes one already there. */
export function addCoach(x: { name: string; role: string; check?: string; checkOk?: boolean; linked: boolean; course?: boolean }) {
  const name = x.name.trim(); if (!name) return
  const a: Adult = { name, ci: initials(name), role: x.role, check: x.check ?? 'Current', checkOk: x.checkOk ?? true, linked: x.linked, course: x.course ?? false, added: true }
  edits = { ...edits, adults: [...(edits.adults ?? []).filter(y => y.name !== name), a] }; commit()
}
/** One adult's check, link or course, changed where it is shown (`AD17`). */
export function setCheck(name: string, p: Partial<Pick<Adult, 'check' | 'checkOk' | 'linked' | 'course'>>) { edits = { ...edits, checks: { ...edits.checks, [name]: { ...edits.checks?.[name], ...p } } }; commit() }
