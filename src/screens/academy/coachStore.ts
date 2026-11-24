// What the owner keeps about each coach, and watching a coach (pack v31, 25 Nov): the page for each coach (`ADCO01-Coach` to
// `ADCO17-Coach`, one template in CoachPage), the list of who has been watched (`AD10-WatchCoach`) and one watched session (`ADW1-WatchSession`).
// COUNTED from the academy's one list (academyStore): sessions, the rate, pay, and the team's basics.
// FROM `data/academy-curriculum.json` ("coaches"): since when, the coaching course, sessions filmed this term, last watched and by whom.
// STILL SAMPLE, worked out here as the pack's boards worked them out, because neither json holds them: the masked mobile, the email, the
// emergency contact, first aid, who covered a session, the three past pay days, one-on-ones, whether feedback was opened, the dates of each
// filmed session, and Sofia's watched session. A demo on sample data: no real coach is behind any of it.
// The owner's private note is kept in this browser. What the owner marks and writes on a watched session is kept while the app is open.
import { useSyncExternalStore } from 'react'
import curriculum from './data/academy-curriculum.json'
import { SESSIONS_A_TERM, count, playersIn, share, type Academy, type Group } from './academyStore'

type CoachRow = { coach: string; team: string; with_academy_since: number; course: string; sessions_filmed_this_term: number; last_watched: string | null; watched_by: string | null }
const ROWS = (curriculum as unknown as { coaches: CoachRow[] }).coaches
const rowOf = (name: string) => { const i = ROWS.findIndex(r => r.coach === name); return i < 0 ? null : { i, r: ROWS[i] } }

// ── the coach's page: its board id, and the team behind it ──
/** `ADCO01-Coach` to `ADCO17-Coach`, numbered in team order like the boards. A team added since gets the next number. */
export const coachBoard = (a: Academy, g: Group) => `ADCO${String(a.groups.indexOf(g) + 1).padStart(2, '0')}-Coach`
export const coachTeam = (a: Academy, id: string): Group | undefined => a.groups[Number(id.match(/^ADCO(\d+)/)?.[1] ?? 0) - 1]
export const first = (name: string) => name.split(' ')[0]

// ── details the owner typed in. Not in either json: the sample is worked out by the coach's place in the list, as the boards did ──
const MUM = ['Nadia', 'Grace', 'Kate', 'Lucia', 'Mei', 'Helen', 'Ruth', 'Emma', 'Anna', 'Fatima'], DAD = ['Tom', 'Imran', 'Deng', 'Sean', 'Arjun', 'Carlos', 'Yusuf', 'Pita', 'Joel', 'Ravi']
export type CoachFacts = { since: number | null; course: string; /** the last three digits, all that shows until the owner confirms it is them */ mobileEnd: string; mobile: string; email: string; emergency: string; firstAid: string; /** paid one session fewer on Friday 8 May */ shortFortnight: boolean; away: string }
export function coachFacts(g: Group): CoachFacts {
  const x = rowOf(g.coach)
  if (!x) return { since: null, course: 'Not added yet', mobileEnd: '', mobile: '', email: 'Not added yet', emergency: 'Not added yet', firstAid: 'Not added yet', shortFortnight: false, away: g.dates.length ? 'Nothing booked.' : 'Nothing booked. No sessions run yet.' }
  const i = x.i, end = String((i * 37 + 211) % 1000).padStart(3, '0')
  return {
    since: x.r.with_academy_since, course: x.r.course, mobileEnd: end, mobile: `0400 000 ${end}`, email: `${first(g.coach).toLowerCase()}@talltimber.example`,
    emergency: `${i % 2 ? MUM[i % 10] : DAD[i % 10]}, ${i % 3 ? 'partner' : 'parent'}`, firstAid: 'Current to March 2027', shortFortnight: i % 4 === 0,
    away: g.coach === 'Sam Whitford' ? `Away Thursday 11 June. ${g.name} needs cover.` : `Nothing booked. Ran every session this term${i % 5 === 1 ? ', and covered one for another coach.' : '.'}`,
  }
}

// ── pay. Clean Sheet counts sessions and multiplies by the rate the owner typed. It does not work out tax or super ──
/** One-on-ones a coach ran, paid at `ONE_RATE` each. Sample values: one-on-ones are not in the list of players. */
export const ONE_ON_ONES: Record<string, { fortnight: number; term: number; year: number }> = { 'Reece Whitlam': { fortnight: 2, term: 7, year: 18 } }, ONE_RATE = 50
/** A fortnight is two weeks of the team's rostered days: 8 sessions for a team that trains four times a week. A team with no sessions yet has none. */
export const fortnightSessions = (g: Group) => g.dates.length ? g.days.length * 2 : 0
export function coachPay(g: Group) {
  const f = coachFacts(g), o = ONE_ON_ONES[g.coach] ?? { fortnight: 0, term: 0, year: 0 }, k = fortnightSessions(g)
  const fortnight = k * g.rate + o.fortnight * ONE_RATE, term = g.dates.length * g.rate + o.term * ONE_RATE
  // Anyone here before this year also ran Term 1: a full term of sessions.
  const year = (f.since !== null && f.since < 2026 ? SESSIONS_A_TERM * g.rate : 0) + g.dates.length * g.rate + o.year * ONE_RATE
  return { sessions: k, ones: o.fortnight, fortnight, past: k ? [['Fri 22 May', fortnight], ['Fri 8 May', fortnight - (f.shortFortnight ? g.rate : 0)], ['Fri 24 April', fortnight]] as [string, number][] : [], termSessions: g.dates.length, term, year }
}

// ── watching a coach ──
export const LINES = ['Ball rolling', 'Clear, short words', 'Every child noticed', 'Followed the plan']
export type Moment = { at: string; part: string; note: string; tone: 'Keep' | 'To try' }
/** One watched session as the owner has it: the owner's four marks, the coach's own (null until the coach has marked), the moments, and the three lines. */
export type Draft = { marks: (number | null)[]; coachMarks: number[] | null; moments: Moment[]; tryThis: string; keep: string; drill: boolean; sent: boolean }
type Watch = { filmed: number; watched: string | null; by: string | null; read: boolean }

const SOFIA = 'Sofia Marin', SOFIA_DATES = ['Wed 3 June', 'Mon 25 May', 'Tue 12 May', 'Wed 6 May', 'Mon 20 April']
const SOFIA_DRAFT: Draft = {
  marks: [3, 4, 5, 3], coachMarks: [4, 3, 4, 3], drill: false, sent: false,
  moments: [{ at: '4:10', part: 'Arrival game', note: 'Every child on a ball inside a minute', tone: 'Keep' }, { at: '18:30', part: 'Skill practice', note: 'Two queues of six. About a third of the team was waiting', tone: 'To try' }, { at: '31:00', part: 'Skill game', note: 'Great question: “Where was the space?”', tone: 'Keep' }],
  tryThis: 'Split skill practice into three small groups, so nobody waits.', keep: 'Asking, not telling. The children answered every time.',
}
/** What a session's film says besides the marks. Only Sofia's Wednesday is in the sample. */
export const SOFIA_SESSION = { date: 'Wed 3 June', long: 'Wednesday 3 June', topic: 'First touch', why: 'On Monday Sofia asked you to look at her skill practice. This is her latest session with one in it.', rolling: 61, target: 65, sinceDate: '11 March', since: 'You asked for fewer words. Clear, short words has gone from 2 to 4. She did it.' }

// What the owner has done since the app opened: marks, words, what was sent. Not kept after a reload.
let drafts: Record<string, Draft> = {}, sentBy: Record<string, string> = {}, version = 0
const subs = new Set<() => void>()
const bump = () => { version++; subs.forEach(f => f()) }
/** Re-draws a screen when a mark, a note or a send changes. */
export const useCoachStore = () => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => version, () => version)

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const FULL: Record<string, string> = { Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' }
/** "2026-06-03" as "Wed 3 June". */
export const shortDate = (iso: string) => { const d = new Date(`${iso}T12:00:00`); return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}` }
/** "Wed 3 June" as "Wednesday 3 June". */
export const longDate = (s: string) => s.replace(/^\w+/, d => FULL[d] ?? d)

/** How many sessions a coach filmed this term, when they were last watched and by whom, and whether they opened what was sent. */
export function watchOf(g: Group): Watch {
  const r = rowOf(g.coach)?.r, base: Watch = { filmed: r?.sessions_filmed_this_term ?? 0, watched: r?.last_watched ?? null, by: r?.watched_by ?? null, read: !!r?.last_watched }
  // Feedback sent from ADW1 since the app opened: watched today, by the owner, and not opened yet.
  return sentBy[g.coach] ? { ...base, watched: sentBy[g.coach], by: 'You', read: false } : base
}
export type Where = 'Draft, not sent' | 'Sent and read' | 'Sent, not opened' | 'Due · nothing filmed' | 'Due'
/** Where a coach's watching is: a draft the owner has started, sent, or still due. Sofia's draft is in the sample. */
export function whereOf(g: Group): Where {
  const w = watchOf(g), started = !sentBy[g.coach] && (g.coach === SOFIA || Object.keys(drafts).some(k => k.startsWith(`${g.coach}|`)))
  return started && !rowOf(g.coach)?.r.last_watched ? 'Draft, not sent' : w.watched ? (w.read ? 'Sent and read' : 'Sent, not opened') : w.filmed ? 'Due' : 'Due · nothing filmed'
}
/** The dates of a coach's filmed sessions this term, newest first. Sofia's are the board's; the rest are spread back from the team's last session. */
export function filmedDates(g: Group): string[] {
  if (g.coach === SOFIA) return SOFIA_DATES
  const n = watchOf(g).filmed, d = [...g.dates].reverse()
  return Array.from({ length: n }, (_, k) => d[k * 4 + (rowOf(g.coach)?.i ?? 0) % 3]).filter(Boolean).map(shortDate)
}
/** The team's last five sessions, newest first: what the owner picks from after watching beside the pitch. */
export const recentDates = (g: Group) => [...g.dates].reverse().slice(0, 5).map(shortDate)

const key = (coach: string, session: string, inPerson: boolean) => `${coach}|${session}|${inPerson ? 'in person' : 'film'}`
const blank = (g: Group, session: string, inPerson: boolean): Draft => {
  if (g.coach === SOFIA && session === SOFIA_SESSION.date && !inPerson) return SOFIA_DRAFT
  // The coach marks a filmed session first, on their own screen. Sample marks, steady for each session. Beside the pitch there is nothing to mark until the coach is asked.
  const i = rowOf(g.coach)?.i ?? 0, d = Number(session.match(/\d+/)?.[0] ?? 0)
  return { marks: [null, null, null, null], coachMarks: inPerson ? null : LINES.map((_, k) => 3 + (i + d + k) % 2), moments: [], tryThis: '', keep: '', drill: false, sent: false }
}
export const draftOf = (g: Group, session: string, inPerson: boolean): Draft => drafts[key(g.coach, session, inPerson)] ?? blank(g, session, inPerson)
export function setDraft(g: Group, session: string, inPerson: boolean, p: Partial<Draft>) { const k = key(g.coach, session, inPerson); drafts = { ...drafts, [k]: { ...draftOf(g, session, inPerson), ...p } }; bump() }
/** Send what the owner marked and wrote to the coach. The coach is then watched this term, as of today. */
export function sendDraft(a: Academy, g: Group, session: string, inPerson: boolean) { setDraft(g, session, inPerson, { sent: true }); sentBy = { ...sentBy, [g.coach]: shortDate(a.today) }; bump() }

/** The tiles on `AD10`. */
export function watchTotals(a: Academy) {
  const w = a.groups.map(watchOf), watched = w.filter(x => x.watched).length
  return { coaches: a.groups.length, watched, due: a.groups.length - watched, filmed: w.reduce((t, x) => t + x.filmed, 0), opened: w.filter(x => x.watched && x.read).length, noFilm: w.filter(x => !x.filmed).length }
}
export type Suggestion = { g: Group; why: string; label: 'Carry on' | 'Pick a session'; main: boolean }
/** "Watch next": at most three, each with its reason. A coach who asked, then one who is new and not watched, then the coach lowest on the basics. A prompt for the owner, never a list in order of merit. */
export function watchNext(a: Academy): Suggestion[] {
  const out: Suggestion[] = [], due = a.groups.filter(g => !watchOf(g).watched), taken = () => new Set(out.map(s => s.g.id))
  // 1. A coach who asked to be watched. In the sample only Sofia has asked; who asks is not in either json.
  const sofia = due.find(g => g.coach === SOFIA)
  if (sofia) out.push({ g: sofia, why: `She asked you to look at her skill practice. ${watchOf(sofia).filmed} sessions filmed. Your notes are half done`, label: 'Carry on', main: true })
  // 2. New this year and not watched: the one with the most film to choose from, then team order.
  const fresh = due.filter(g => !taken().has(g.id) && rowOf(g.coach)?.r.with_academy_since === 2026 && watchOf(g).filmed > 0).sort((x, y) => watchOf(y).filmed - watchOf(x).filmed)[0]
  if (fresh) out.push({ g: fresh, why: 'New this year and not watched yet', label: 'Pick a session', main: false })
  // 3. Not watched, and the lowest of all the coaches on more of the basics than anyone else.
  const measures: [string, (c: ReturnType<typeof count>) => number][] = [['notes written', c => c.notes], ['goals set', c => c.goal], ['clips to families', c => c.clip], ['players up a step', c => c.up]]
  const teams = a.groups.map(g => ({ g, c: count(playersIn(a, g.id)) })).filter(t => t.c.n > 0), low = new Map<string, string[]>()
  for (const [word, of] of measures) { const worst = [...teams].sort((x, y) => share(of(x.c), x.c.n) - share(of(y.c), y.c.n))[0]; if (worst) low.set(worst.g.id, [...(low.get(worst.g.id) ?? []), word]) }
  const lowest = due.filter(g => !taken().has(g.id) && low.has(g.id)).sort((x, y) => low.get(y.id)!.length - low.get(x.id)!.length)[0]
  if (lowest) out.push({ g: lowest, why: `Lowest on ${low.get(lowest.id)!.join(' and on ')}`, label: 'Pick a session', main: false })
  return out
}

// ── which coach `ADW1` is open on. Set by the control that opens it; kept for the visit, so a reload opens Sofia's session as the board draws it ──
let focus: { coach: string; inPerson: boolean } | null = null
export const watchCoach = (coach: string | null, inPerson = false) => { focus = coach ? { coach, inPerson } : null }
export const watching = () => focus

// ── the owner's private note about a coach. Only the owner sees it. Kept in this browser ──
const NOTE_KEY = 'cs_coach_notes_v1'
let notes: Record<string, string> = (() => { try { return JSON.parse(localStorage.getItem(NOTE_KEY) ?? '{}') as Record<string, string> } catch { return {} } })()
const sampleNote = (g: Group) => { const s = rowOf(g.coach)?.r.with_academy_since; return s == null ? '' : s === 2026 ? `New this year. Good with the youngest.${g.coach === SOFIA ? '' : ' Pair with Sofia.'}` : 'Reliable. Ask about the C Licence next year.' }
export const noteOf = (g: Group) => notes[g.coach] ?? sampleNote(g)
export function setNote(g: Group, text: string) { notes = { ...notes, [g.coach]: text }; try { localStorage.setItem(NOTE_KEY, JSON.stringify(notes)) } catch { /* kept for this visit only */ } bump() }
