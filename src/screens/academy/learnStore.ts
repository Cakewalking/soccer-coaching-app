// Learn, for the coach and the owner (pack v39, eleventh batch). One small store that both `ADC18-Learn` (coach) and
// `AD27-CoachLearning` (owner) read, so the two sides cannot disagree.
//
// THE RULE IS IN THE SHAPE OF THIS FILE, not only in the screens:
//  · What the 16 coaches who are not signed in did with an optional lesson is held ONLY as totals (`others`): there is no list of who.
//  · What the signed-in coach did (`mine`) is private to this file. Only the `coach…` functions return it.
//  · The `owner…` functions return a coach's name in two places only: beside a REQUIRED lesson (`ownerRequired`), and beside a lesson
//    that coach chose to share (`ownerShared`). `ownerTotals` and `ownerNumbers` return lesson names and counts, never a coach.
//  · A lesson picked from a coach's own film is in the totals only once five or more coaches have been shown it (`FILM_FROM`), and it is
//    left out of the headline numbers until then, so nobody can take one count from another to find it.
//  · A coach's questions never leave `coachView`. There is no owner function for them.
//  · NOT IN THE PACK, added so a total cannot name a person: an optional lesson shown to fewer than five coaches gives the owner
//    "shown to N" and no watched or tried count, and a lesson set for one coach is listed as "one coach", without the name.
//
// SAMPLE, all of it, until lessons are real: the lessons (11 of the library's 23 are named on the boards, plus one of Tall Timber's own),
// who is shown what, and every watched and tried count. COUNTED from the academy's list: how many coaches a set or block lesson is shown
// to, and the 17 rows. What a person does here (finish, tried, share, remind, set a lesson) is kept while the app is open.
import { useSyncExternalStore } from 'react'
import type { Academy, Group, Program } from './academyStore'

// ── the lessons ──
export type Source = 'film' | 'block' | 'owner'
export type Lesson = { id: string; title: string; /** as the coach's own page words it, where the board's differs */ coachTitle?: string; /** in a narrow row */ short?: string; minutes: number; /** what to try at the next session; '' when the lesson has nothing to try */ tryLine: string; required?: boolean; /** when a required lesson is due, or '' when it has no date */ due?: string; /** a screen to read it on */ reads?: string }
export const LIBRARY = 23, OWN_MADE = 6
/** Fewer coaches than this, and a lesson is not in the owner's totals (from film) or has no watched count (any other). */
export const FILM_FROM = 5
const L: Lesson[] = [
  { id: 'safety', title: 'Child safety refresher', minutes: 10, tryLine: '', required: true, due: '' },
  { id: 'how', title: 'How we coach', minutes: 8, tryLine: '', required: true, due: '', reads: 'AD7-HowWeCoach' },
  { id: 'knocks', title: 'Head knocks: what to do', short: 'Head knocks', minutes: 8, tryLine: '', required: true, due: '30 June' },
  { id: 'asking', title: 'Asking, not telling', minutes: 6, tryLine: 'one question at the wrap-up, then wait.' },
  { id: 'weaker', title: 'Coaching the weaker foot', minutes: 4, tryLine: 'a weaker-foot goal counts double in the last game.' },
  { id: 'busy', title: 'Keeping every player busy', coachTitle: 'Keeping 14 players busy with one goal', minutes: 3, tryLine: 'two more balls and a second queue.' },
  { id: 'back', title: 'Winning it back as a team', minutes: 5, tryLine: 'a three-second rule in Wednesday’s game.' },
  { id: 'growth', title: 'Growth spurts and sprinting', short: 'Growth spurts', minutes: 5, tryLine: 'shorter sprints for the players who are growing fast.' },
  { id: 'five', title: 'The first five minutes with under 7s', short: 'The first five minutes', minutes: 4, tryLine: 'a ball each and a game the second they arrive.' },
  { id: 'parent', title: 'Talking to a parent after a hard game', minutes: 6, tryLine: '' },
  { id: 'goes', title: 'More goes, fewer queues', minutes: 4, tryLine: 'three stations instead of one line.' },
]
export const lessonOf = (id: string) => L.find(l => l.id === id)

// ── who a lesson is for ──
export type Scope = { kind: 'all' } | { kind: 'program'; prog: Program } | { kind: 'ages'; lo: number; hi: number } | { kind: 'coach'; coach: string }
export const inScope = (s: Scope, g: Group) => s.kind === 'all' || (s.kind === 'program' ? g.prog === s.prog : s.kind === 'ages' ? s.lo <= g.age && g.age <= s.hi : g.coach === s.coach)
const coachesIn = (a: Academy, s: Scope) => new Set(a.groups.filter(g => inScope(s, g)).map(g => g.coach)).size
/** For the owner: "everyone", "Advanced", "U12 to U14", "one coach". Never a coach's name. */
export const scopeWords = (s: Scope) => s.kind === 'all' ? 'everyone' : s.kind === 'program' ? s.prog : s.kind === 'ages' ? (s.lo === s.hi ? `U${s.lo}` : `U${s.lo} to U${s.hi}`) : 'one coach'
/** For the coach it was set for: "every coach", "every under 12 to under 14 coach", "you". */
const scopeToCoach = (s: Scope) => s.kind === 'all' ? 'every coach' : s.kind === 'program' ? `every ${s.prog} coach` : s.kind === 'ages' ? `every ${s.lo === s.hi ? `under ${s.lo}` : `under ${s.lo} to under ${s.hi}`} coach` : 'you'

/** Why a lesson is shown, and what the coaches who are NOT signed in did with it: totals only. `shown` is typed in for film (who a film
 * picked a lesson for is nobody's to list); for the block and the owner it is counted from the academy's teams. */
type Offer = { lesson: string; source: Source; scope?: Scope; shown?: number; watched: number; tried: number; /** set since the app opened */ fresh?: boolean; required?: boolean }
const SAMPLE_OFFERS: Offer[] = [
  { lesson: 'asking', source: 'owner', scope: { kind: 'ages', lo: 12, hi: 14 }, watched: 5, tried: 4 },
  { lesson: 'weaker', source: 'block', scope: { kind: 'ages', lo: 12, hi: 14 }, watched: 4, tried: 3 },
  { lesson: 'busy', source: 'film', shown: 8, watched: 7, tried: 5 },
  { lesson: 'back', source: 'film', shown: 4, watched: 3, tried: 1 },
  { lesson: 'growth', source: 'owner', scope: { kind: 'ages', lo: 11, hi: 14 }, watched: 7, tried: 3 },
  { lesson: 'five', source: 'block', scope: { kind: 'program', prog: 'Foundation' }, watched: 5, tried: 3 },
  { lesson: 'parent', source: 'owner', scope: { kind: 'all' }, watched: 10, tried: 0 },
  { lesson: 'goes', source: 'film', shown: 2, watched: 2, tried: 1 },   // shown to three with the signed-in coach: under five, so the owner never sees it
]
/** One more lesson the owner set this term that the boards do not name ("3 required, 4 more set this term"). */
const SET_NOT_NAMED = 1
/** Coaches other than the signed-in one who watched a lesson in the last four weeks ("15 of 17"). A total, not a list. */
const OTHERS_ACTIVE = 14

// ── required lessons: the one part held by name ──
export type ReqState = 'Done' | 'Due' | 'Not read' | 'Overdue'
/** Everyone has done all three, but these. */
const NOT_DONE: Record<string, Record<string, ReqState>> = { 'Tom Ashby': { knocks: 'Due' }, 'Jess Halloran': { how: 'Not read' }, 'Reece Whitlam': { knocks: 'Due' }, 'Ollie Drummond': { knocks: 'Overdue' } }
const IN_SAMPLE = new Set(['Ben Castellano', 'Priya Nair', 'Tom Ashby', 'Sofia Marin', 'Lena Fischer', 'Marcus Obi', 'Jess Halloran', 'Dan Petrou', 'Aisha Khan', 'Liam Corrigan', 'Mei Tanaka', 'Josh Abela', 'Nadia Haddad', 'Reece Whitlam', 'Sam Whitford', 'Carla Mendes', 'Ollie Drummond'])
/** When the signed-in coach did the two that are done, as the coach's own page says it. */
const MY_DATES: Record<string, string> = { safety: 'Done 12 Feb', how: 'Read 20 Apr' }

// ── the signed-in coach. In the demo that is Reece Whitlam; nobody else's own page exists ──
export const SIGNED_IN = 'Reece Whitlam'
export type Progress = 'New' | 'Up next' | 'Half done' | 'Done'
type Mine = { state: Record<string, Progress>; tried: Record<string, boolean>; /** lesson to the note that goes with it, for lessons the coach chose to share */ shared: Record<string, string>; questions: string[]; reqDone: Record<string, string> }
/** This week's four, in the board's order, with why each was picked. The numbers in a "why" that a store holds are read on the coach's page. */
const MY_WEEK = ['weaker', 'busy', 'back', 'asking']
/** Lessons the coach finished before this week that the boards do not name, and what came of them: they make "9, 6 and 4". */
const EARLIER = { done: 4, tried: 4, showed: 2 }
/** What the coach's own film counted after two lessons ("Did it show?"). One session each way. */
export const SHOWED: { lesson: string; tried: string; big: string; line: string }[] = [
  { lesson: 'growth', tried: 'shorter sprints for the four who are growing fast.', big: '4 of 4', line: 'finished every session since, with no sore knees logged' },
  { lesson: 'goes', tried: 'three stations instead of one line.', big: '5 to 8', line: 'goes a player on 28 May, up from 3 to 5 on 21 May' },
]

// ── what has been done since the app opened ──
type State = { mine: Mine; offers: Offer[]; /** lessons the owner has made required since the app opened, and when each is due */ madeRequired: Record<string, string>; reminded: Record<string, string>; /** a coach other than the signed-in one who shared a lesson: sample */ sharedByOthers: { coach: string; lesson: string; tried: string }[] }
const start = (): State => ({
  mine: { state: { weaker: 'New', busy: 'Up next', back: 'Up next', asking: 'Half done', growth: 'Done', goes: 'Done', parent: 'Done' }, tried: { growth: true, goes: true }, shared: { growth: '' }, questions: [], reqDone: {} },
  offers: SAMPLE_OFFERS, madeRequired: {}, reminded: {},
  sharedByOthers: [{ coach: 'Sofia Marin', lesson: 'five', tried: 'A ball each at the gate, and a chasing game before the roll.' }],
})
const KEY = 'cs_learn_v1'
let st: State = (() => { try { const v = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as State | null; if (v?.mine?.state && v.offers && v.reminded && v.madeRequired) return v } catch { /* start from the sample */ } return start() })()
const subs = new Set<() => void>()
const commit = (next: State) => { st = next; try { sessionStorage.setItem(KEY, JSON.stringify(st)) } catch { /* kept for this page only */ } subs.forEach(f => f()) }
export const useLearn = () => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => st, () => st) as unknown
export function resetLearn() { commit(start()) }
const lessons = (): Lesson[] => L.map(l => l.id in st.madeRequired ? { ...l, required: true, due: st.madeRequired[l.id] } : l), lesson = (id: string) => lessons().find(l => l.id === id)!
const requiredLessons = () => lessons().filter(l => l.required)
const myDone = (id: string) => st.mine.state[id] === 'Done'
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dayOf = (iso: string) => { const d = new Date(`${iso}T12:00:00`); return `${d.getDate()} ${MONTH[d.getMonth()]}` }

// ═══ the one list of rules. Both pages draw it from here ═══
export type Rule = { head: 'By name' | 'In totals only' | 'Never'; /** said to the coach */ coach: string; /** said to the owner */ owner: string }
export function rules(): Rule[] {
  const n = requiredLessons().length, words = ['no', 'one', 'two', 'three', 'four', 'five', 'six'][n] ?? String(n)
  return [
    { head: 'By name', coach: `the ${words} required lessons, done or not.`, owner: `the ${words} required lessons, done or not.` },
    { head: 'In totals only', coach: 'how many coaches watched each other lesson. Not who.', owner: 'how many coaches watched each other lesson. Not who.' },
    { head: 'Never', coach: 'which lessons your film picked for you, your questions, or your own view of a session, unless you share it.', owner: 'which lessons a coach’s film picked for them, their questions, or their own view of a session, unless they share it.' },
  ]
}

// ═══ what a required cell is, for one coach. Used by both sides: this is the part that is by name ═══
function reqCell(g: Group, l: Lesson): { state: ReqState; label: string } | null {
  const offer = st.offers.find(o => o.lesson === l.id && o.required)
  if (offer?.scope && !inScope(offer.scope, g)) return null                       // required for some coaches only, and not this one
  const fresh = !!offer?.fresh
  if (g.coach === SIGNED_IN && (st.mine.reqDone[l.id] || myDone(l.id))) return { state: 'Done', label: 'Done' }
  const s: ReqState = fresh || !IN_SAMPLE.has(g.coach) ? (l.due ? 'Due' : 'Not read') : NOT_DONE[g.coach]?.[l.id] ?? 'Done'
  return { state: s, label: s === 'Due' ? `Due ${l.due}` : s }
}

// ═══ FOR THE OWNER. Names come out of `ownerRequired` and `ownerShared` only ═══
export type RequiredRow = { coach: string; team: string; groupId: string; cells: ({ lesson: string; state: ReqState; label: string } | null)[]; open: boolean; /** when the owner last reminded this coach, or '' */ reminded: string }
/** Required lessons, by coach, in team order. The only part of learning the owner sees by name. */
export function ownerRequired(a: Academy) {
  const req = requiredLessons()
  const rows: RequiredRow[] = a.groups.map(g => { const cells = req.map(l => { const c = reqCell(g, l); return c && { lesson: l.id, ...c } }); return { coach: g.coach, team: g.name, groupId: g.id, cells, open: cells.some(c => c && c.state !== 'Done'), reminded: st.reminded[g.coach] ?? '' } })
  const all = rows.flatMap(r => r.cells).filter(c => c !== null)
  return { lessons: req.map(l => ({ id: l.id, title: l.short ?? l.title })), rows, done: all.filter(c => c.state === 'Done').length, of: all.length }
}
export type TotalRow = { title: string; cause: string; shown: number; /** null when too few coaches were shown it for a count to be anyone's but theirs */ watched: number | null; tried: number | null; nothingToTry: boolean }
/** Every other lesson, in totals. A lesson name, what caused it to be shown, and counts. No coach, no team, no id of either. */
export function ownerTotals(a: Academy): TotalRow[] {
  const me = a.groups.find(g => g.coach === SIGNED_IN), out: TotalRow[] = []
  for (const l of lessons().filter(x => !x.required)) {
    const offers = st.offers.filter(o => o.lesson === l.id && !o.required); if (!offers.length) continue
    const film = offers.find(o => o.source === 'film'), scoped = offers.filter(o => o.scope), set = scoped.filter(o => o.source === 'owner'), block = scoped.find(o => o.source === 'block')
    // Shown to: counted from the teams for the block and the owner; typed in for film, plus the signed-in coach where the film picked it for them too.
    const inAny = scoped.length ? new Set(a.groups.filter(g => scoped.some(o => inScope(o.scope!, g))).map(g => g.coach)).size : 0
    const filmShown = film ? (film.shown ?? 0) + (me && l.id in st.mine.state ? 1 : 0) : 0
    // Under five coaches, what film picked is nobody's to count: it adds nothing here, not to "shown to" and not to "watched", even when the owner has set the same lesson for others.
    const filmCounts = filmShown >= FILM_FROM, counted = offers.filter(o => o.source !== 'film' || filmCounts)
    const shown = Math.max(inAny, filmCounts ? filmShown : 0)
    if (!scoped.length && !filmCounts) continue                                    // from film only, and under five coaches: not the owner's to see
    const meShown = !!me && ((filmCounts && l.id in st.mine.state) || scoped.some(o => inScope(o.scope!, me)))
    const watched = counted.reduce((t, o) => t + o.watched, 0) + (meShown && myDone(l.id) ? 1 : 0), tried = counted.reduce((t, o) => t + o.tried, 0) + (meShown && st.mine.tried[l.id] ? 1 : 0)
    const few = shown < FILM_FROM
    const cause = [...set.map(o => `You, for ${scopeWords(o.scope!)}`), ...(block ? [`The block, ${scopeWords(block.scope!)}`] : []), ...(film && !scoped.length ? ['Their own film'] : [])].join(' · ')
    out.push({ title: l.title, cause, shown, watched: few ? null : Math.min(watched, shown), tried: few ? null : tried, nothingToTry: !l.tryLine })
  }
  return out
}
/** The five numbers. Every one is a total; the "other lessons" are only the ones the totals show, so a hidden count cannot be worked out. */
export function ownerNumbers(a: Academy) {
  const req = ownerRequired(a), rows = ownerTotals(a), me = a.groups.some(g => g.coach === SIGNED_IN)
  const meActive = me && Object.values(st.mine.state).some(s => s === 'Done')
  return {
    coaches: a.groups.length, required: req.lessons.length, reqDone: req.done, reqOf: req.of,
    watched: rows.reduce((t, r) => t + (r.watched ?? 0), 0), tried: rows.reduce((t, r) => t + (r.tried ?? 0), 0),
    active: Math.min(a.groups.length, OTHERS_ACTIVE + (meActive ? 1 : 0)), own: OWN_MADE,
    setThisTerm: SET_NOT_NAMED + new Set(st.offers.filter(o => o.source === 'owner' && !o.required).map(o => o.lesson)).size,
  }
}
/** What coaches chose to show the owner: the lesson they finished and what they tried. Nothing is here unless the coach put it here. */
export function ownerShared(a: Academy): { coach: string; groupId: string; lesson: string; tried: string; note: string }[] {
  const mine = a.groups.find(g => g.coach === SIGNED_IN)
  const fromMe = mine ? Object.entries(st.mine.shared).filter(([id]) => myDone(id)).map(([id, note]) => ({ coach: mine.coach, groupId: mine.id, lesson: lesson(id).short ?? lesson(id).title, tried: st.mine.tried[id] ? SHOWED.find(s => s.lesson === id)?.tried ?? lesson(id).tryLine : '', note })) : []
  const others = st.sharedByOthers.flatMap(s => { const g = a.groups.find(x => x.coach === s.coach), l = lessonOf(s.lesson); return g && l ? [{ coach: g.coach, groupId: g.id, lesson: l.short ?? l.title, tried: s.tried, note: '' }] : [] })
  return [...others, ...fromMe].sort((x, y) => a.groups.findIndex(g => g.id === x.groupId) - a.groups.findIndex(g => g.id === y.groupId))
}
/** "Does it change anything?" An estimate, with its count. Seven coaches is far too few for a rate, so it is a count and no percentage. */
export const OWNER_EFFECT = { lesson: 'Keeping every player busy', coaches: 7, better: 5, what: 'teams had more goes a player', limit: 'Seven coaches, one session each. Other things changed too. Worth watching, not yet worth claiming.' }
/** Lessons the owner can set: every lesson that is not required. Says what it is already shown for, in the owner's words. */
export function ownerCanSet(a: Academy) { const rows = ownerTotals(a); return lessons().filter(l => !l.required).map(l => ({ id: l.id, title: l.title, minutes: l.minutes, already: rows.find(r => r.title === l.title)?.cause ?? '' })) }
/** The owner sets a lesson for everyone, a program, an age or one coach, and says whether it is required and by when. */
export function setLesson(a: Academy, lessonId: string, scope: Scope, required: boolean, due: string): string {
  const l = lesson(lessonId); if (!l || l.required) return 'That lesson is already required.'
  if (!coachesIn(a, scope)) return 'No coach is in that group yet.'
  if (st.offers.some(o => o.lesson === lessonId && o.source === 'owner' && JSON.stringify(o.scope) === JSON.stringify(scope))) return 'You have already set that lesson for them.'
  const offer: Offer = { lesson: lessonId, source: 'owner', scope, watched: 0, tried: 0, fresh: true, required }
  // A lesson that becomes required is by name from now on, so its optional totals are dropped rather than carried across.
  if (required) commit({ ...st, madeRequired: { ...st.madeRequired, [lessonId]: due.trim() }, offers: [...st.offers.filter(o => o.lesson !== lessonId), offer] })
  else commit({ ...st, offers: [...st.offers, offer] })
  return ''
}
/** Remind a coach about what they have not finished. Says so on the owner's row and on the coach's own page. */
export function remind(a: Academy, coach: string) { commit({ ...st, reminded: { ...st.reminded, [coach]: dayOf(a.today) } }) }

// ═══ FOR THE SIGNED-IN COACH. Their own page: everything about them, nothing about anyone else ═══
export type WeekRow = { id: string; title: string; minutes: number; source: Source; pill: string; /** the sample's reason, where no store holds the number; the page reads the block and the aim itself */ why: string; tryLine: string; state: Progress; tried: boolean }
const PILL: Record<Source, string> = { film: 'From your own film', block: 'From this block', owner: 'Set by Dani' }
const WHY: Record<string, string> = {
  busy: 'on Thursday 28 May your players stood waiting for 38% of the finishing circuit.',
  back: 'on Sunday it took 7 seconds to win the ball back. Your usual is 4.',
}
export function coachView(a: Academy, g: Group) {
  const isMe = g.coach === SIGNED_IN, m: Mine = isMe ? st.mine : { state: {}, tried: {}, shared: {}, questions: [], reqDone: {} }
  // This week: the sample's four, then anything Dani has set since that this coach is in.
  const setFor = st.offers.filter(o => o.source === 'owner' && o.fresh && !o.required && o.scope && inScope(o.scope, g))
  const ids = [...(isMe ? MY_WEEK : []), ...setFor.map(o => o.lesson).filter(id => !MY_WEEK.includes(id))]
  const week: WeekRow[] = ids.map(id => { const l = lesson(id), fresh = setFor.find(o => o.lesson === id), offer = fresh ?? st.offers.find(o => o.lesson === id && (o.source === 'film' || !o.scope || inScope(o.scope, g)))
    const source: Source = offer?.source ?? 'film'
    return { id, title: l.coachTitle ?? l.title, minutes: l.minutes, source, pill: PILL[source], why: source === 'owner' ? `Dani set it for ${scopeToCoach(offer!.scope!)} ${fresh ? `on ${dayOf(a.today)}` : 'this term'}.` : WHY[id] ?? '', tryLine: l.tryLine, state: m.state[id] ?? 'New', tried: !!m.tried[id] } })
  const required = requiredLessons().flatMap(l => { const c = reqCell(g, l); if (!c) return []
    const mineDone = isMe ? m.reqDone[l.id] ?? (c.state === 'Done' ? MY_DATES[l.id] ?? 'Done' : '') : ''
    return [{ id: l.id, title: l.title, minutes: l.minutes, done: c.state === 'Done', label: c.state === 'Done' ? mineDone || 'Done' : c.label, reads: l.reads, reminded: st.reminded[g.coach] ?? '' }] })
  const doneIds = Object.keys(m.state).filter(id => m.state[id] === 'Done')
  const counts = { done: (isMe ? EARLIER.done : 0) + doneIds.length + required.filter(r => r.done).length, tried: (isMe ? EARLIER.tried : 0) + Object.values(m.tried).filter(Boolean).length, showed: (isMe ? EARLIER.showed : 0) + SHOWED.filter(s => m.tried[s.lesson]).length }
  const by = (s: Source) => week.filter(w => w.source === s).length
  return {
    week, required, counts, sources: { film: by('film'), block: by('block'), owner: by('owner'), of: week.length },
    showed: isMe ? SHOWED.filter(s => m.tried[s.lesson]).map(s => ({ ...s, title: lesson(s.lesson).title })) : [],
    /** finished lessons the coach could show Dani, and whether each is shared. Required ones are not here: Dani sees those anyway. */
    canShare: doneIds.map(id => ({ id, title: lesson(id).title, shared: id in m.shared, note: m.shared[id] ?? '', tried: !!m.tried[id] })),
    questions: m.questions,
    library: lessons().map(l => ({ id: l.id, title: l.coachTitle ?? l.title, minutes: l.minutes, required: !!l.required, state: l.required ? (required.find(r => r.id === l.id)?.done ? 'Done' : 'To do') : m.state[l.id] ?? 'Not shown to you yet' })),
  }
}
const mine = (p: Partial<Mine>) => commit({ ...st, mine: { ...st.mine, ...p } })
export const coachDo = {
  /** Played, not finished. */
  play(id: string) { if (!myDone(id) && st.mine.state[id] !== 'Half done') mine({ state: { ...st.mine.state, [id]: 'Half done' } }) },
  finish(id: string) { mine({ state: { ...st.mine.state, [id]: 'Done' } }) },
  /** "I tried it" at a session. Only after the lesson is finished. */
  tried(id: string) { if (myDone(id)) mine({ tried: { ...st.mine.tried, [id]: true } }) },
  /** A required lesson finished: the owner's row for this coach says Done. */
  finishRequired(a: Academy, id: string) { if (lesson(id)?.required) mine({ reqDone: { ...st.mine.reqDone, [id]: `Done ${dayOf(a.today)}` } }) },
  /** Show Dani a finished lesson, with a note if the coach wants one. The coach can take it back. */
  share(id: string, note = '') { if (myDone(id)) mine({ shared: { ...st.mine.shared, [id]: note.trim() } }) },
  unshare(id: string) { const shared = { ...st.mine.shared }; delete shared[id]; mine({ shared }) },
  /** A question. It stays on the coach's side of this file. */
  ask(q: string) { if (q.trim()) mine({ questions: [...st.mine.questions, q.trim()] }) },
}
