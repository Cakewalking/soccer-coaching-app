// The academy's curriculum (pack v31, section G): the phases, the year, the term night by night, each night's session and
// the drill library. The screens AD6, ADQ1, ADL1 and ADL2 count from here, and here counts from two files:
// `data/academy-curriculum.json` (the phases, the week steps, the under-13 Term 2 grid, the drill counts and 24 sample drills)
// and the academy's one list in `academyStore` (the teams, the roll, the steps).
//
// COUNTED: the grid, the balance of sessions, which drill sits on which night, minutes, equipment, how often a drill has been
// used (the nights a team has had it so far), where it is in the plan, the step lines and who is on them, "does it work?".
// STILL SAMPLE, each in one constant below and named in the report: the year's blocks outside Term 2 (`YEAR`), what the data
// does not say about a drill (`DRILL_SAMPLE`: its equipment, its set-up line, what to say, filmed, whose it is), the whole
// library's "our own" and "filmed" totals (`LIBRARY_SAMPLE`), "are coaches following it?" (`FOLLOWING_SAMPLE`) and the one
// swap a coach has made (`COACH_SWAPS`). A demo on sample data.

import { useSyncExternalStore } from 'react'
import raw from './data/academy-curriculum.json'
import { weekOf, SESSIONS_A_TERM, type Academy, type Group, type Player } from './academyStore'

// ── what the file holds ──
export type Phase = { name: string; ages: string; program: string; lo: number; hi: number }
export const PHASES: Phase[] = raw.phases.map(p => { const n = (p.ages.match(/\d+/g) ?? []).map(Number); return { ...p, lo: n[0] ?? 0, hi: n[1] ?? n[0] ?? 0 } })
export const WEEK_STEPS: string[] = raw.week_steps
export const NIGHTS = ['Mon', 'Tue', 'Wed', 'Thu'] as const
export type NightKey = typeof NIGHTS[number]
export const NIGHT_NAME: Record<NightKey, string> = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday' }
export type Night = { night: NightKey; focus: string; session: string; /** false where the sample has no words for it */ written: boolean }
export type Week = { week: number; step: string; nights: Night[] }
const DATA_GRID: Week[] = raw.under_13_term_2.map(w => ({ week: w.week, step: w.step, nights: w.nights.map(n => ({ night: n.night as NightKey, focus: n.focus, session: n.session, written: true })) }))
/** The phase whose term is written out in the file: the under 13s'. */
const WRITTEN = PHASES.findIndex(p => p.lo <= 13 && 13 <= p.hi)
export const GAME = 'Game training', SMALL = 'Small games'

export const phaseOfAge = (age: number) => PHASES.findIndex(p => p.lo <= age && age <= p.hi)
export const under = (age: number) => `under ${age}`
/** "U12 to U14" for a run of ages, "U13" for one. */
export const agesLine = (ages: number[]) => { const v = [...new Set(ages)].sort((x, y) => x - y); return v.length === 0 ? '' : v.length === 1 ? `U${v[0]}` : v[v.length - 1] - v[0] === v.length - 1 ? `U${v[0]} to U${v[v.length - 1]}` : v.map(x => `U${x}`).join(', ') }
/** "weeks 6 to 10", "weeks 2, 4 and 7", "week 8". */
export const weeksLine = (weeks: number[]) => { const v = [...new Set(weeks)].sort((x, y) => x - y); if (!v.length) return ''
  if (v.length === 1) return `week ${v[0]}`
  if (v.length > 2 && v[v.length - 1] - v[0] === v.length - 1) return `weeks ${v[0]} to ${v[v.length - 1]}`
  return `weeks ${v.slice(0, -1).join(', ')} and ${v[v.length - 1]}` }

// ── the drill library ──
export type PartKey = 'Arrival game' | 'Introduction' | 'Training' | 'Game'
export const PARTS: PartKey[] = ['Arrival game', 'Introduction', 'Training', 'Game']
/** What a part is called in a session. */
export const PART_IN_SESSION: Record<PartKey, string> = { 'Arrival game': 'Arrival game', Introduction: 'Skill introduction', Training: 'Skill training', Game: 'Skill game' }
export type Kit = { balls?: number; mini?: number; full?: number; cones?: number; bibs?: number }
export type Drill = { i: number; name: string; skill: string; part: PartKey; ages: string; lo: number; hi: number; players: string; minutes: number; step: number
  kit: Kit; setup?: string; say?: string; filmed: boolean; by?: string }

/** STILL SAMPLE. What `academy-curriculum.json` does not say about a drill. Equipment is ours, written so the board's night
 * (under 13s, week 8, Monday) needs what the board lists. Set-up lines and what to say are the boards' words, for the four
 * drills the boards show. Filmed is the eight cards the library board marks. "by" is the one drill the pack names an author for. */
const DRILL_SAMPLE: Record<string, Partial<Pick<Drill, 'kit' | 'setup' | 'say' | 'filmed' | 'by'>>> = {
  'Weak-foot gates': { kit: { balls: 8, cones: 24 }, setup: 'Pairs, six gates, strike through a gate to your partner', say: '“Lock the ankle. Land on the striking foot.”', filmed: true, by: 'Reece Whitlam, 2024' },
  'Turn and finish, with a chaser': { kit: { balls: 16, full: 2, cones: 4, bibs: 8 }, setup: 'A defender starts two metres behind. One touch, then strike', say: '“Shoot early. Across the keeper.”' },
  'Four goals, weaker foot counts double': { kit: { balls: 4, full: 2, mini: 2, cones: 8, bibs: 6 }, setup: '6 v 6 on a half pitch with a keeper each end', say: '“Who saw the chance to shoot?”' },
  'Two-goal rondo': { kit: { balls: 2, mini: 4, cones: 8, bibs: 4 }, setup: '4 v 2 in a 12 metre square, a mini goal each side', say: '“Weaker foot only to score.”', filmed: true },
  'Laces ladder': { kit: { balls: 8, cones: 12 } },
  'Strike and follow': { kit: { balls: 8, cones: 8 } },
  'Wall pass and shoot': { kit: { balls: 8, full: 1, cones: 6 }, filmed: true },
  'Long pass, long pitch': { kit: { balls: 8, cones: 8 } },
  'Cross and finish, three lanes': { kit: { balls: 12, full: 1, cones: 12, bibs: 4 } },
  'Shooting alley': { kit: { balls: 8, mini: 2, cones: 8 }, filmed: true },
  'Hit the moving target': { kit: { balls: 10, cones: 4 } },
  'Through the legs relay': { kit: { balls: 4, cones: 8 } },
  'Knock the cone down': { kit: { balls: 6, cones: 12 }, filmed: true },
  'Keeper’s nightmare': { kit: { balls: 6, full: 1, cones: 4, bibs: 5 } },
  'First time or two touch': { kit: { balls: 8, full: 1, cones: 6 } },
  'Switch and strike': { kit: { balls: 4, full: 2, cones: 8, bibs: 7 }, filmed: true },
  'Volley tennis': { kit: { balls: 4, cones: 8 } },
  'Pass through the lines': { kit: { balls: 6, cones: 12, bibs: 6 } },
  'Three-zone finishing game': { kit: { balls: 4, full: 2, cones: 12, bibs: 6 }, filmed: true },
  'One bounce, one strike': { kit: { balls: 8, cones: 4 } },
  'Corner flag accuracy': { kit: { balls: 8, cones: 8 } },
  'Finish under pressure, 2 v 1': { kit: { balls: 10, full: 1, cones: 4, bibs: 5 }, filmed: true },
  'End-zone strikers': { kit: { balls: 4, cones: 12, bibs: 5 } },
  'Penalty box chaos': { kit: { balls: 8, full: 1, cones: 4, bibs: 6 } },
}
/** The skill the file's 24 named drills train. The file names drills for this one skill only. */
export const SAMPLE_SKILL = 'Striking the ball'
export const DRILLS: Drill[] = raw.striking_drills.map((d, i) => { const n = (d.ages.match(/\d+/g) ?? []).map(Number), s = DRILL_SAMPLE[d.name] ?? {}
  return { i, name: d.name, skill: SAMPLE_SKILL, part: d.part as PartKey, ages: d.ages, lo: n[0] ?? 0, hi: n[1] ?? n[0] ?? 99, players: d.players, minutes: d.minutes, step: d.trains_step, kit: s.kit ?? {}, setup: s.setup, say: s.say, filmed: !!s.filmed, by: s.by } })
export const drillNamed = (name: string) => DRILLS.find(d => d.name === name)
/** How many drills the library holds for each core skill and for game training, and in all: the file's counts. */
export const DRILL_COUNTS: [string, number][] = Object.entries(raw.drill_counts)
export const LIBRARY_TOTAL = DRILL_COUNTS.reduce((t, [, n]) => t + n, 0)
/** STILL SAMPLE: of the whole library, how many are the academy's own and how many have film. The file has no such count. */
export const LIBRARY_SAMPLE = { own: 68, filmed: 61 }
/** The film the pack names for a drill: who ran it and how long the clip is. STILL SAMPLE (one drill). */
export const FILM_SAMPLE: Record<string, [string, string][]> = { 'Weak-foot gates': [['Reece', '0:48'], ['Carla', '1:02']] }
/** How the one drill the pack writes out in full runs. STILL SAMPLE (the drill board's words). */
export const WRITTEN_DRILL: Record<string, { runs: string[]; say: string; easier: string; harder: string; picture: string }> = {
  'Weak-foot gates': { runs: ['Pairs stand either side of a gate. Strike through the gate to your partner with the weaker foot.', 'Ten each, then move one gate to the right. A point for every clean pass through.'],
    say: '“Lock the ankle.” “Standing foot beside the ball.” “Land on the foot you struck with.”', easier: 'wider gate, standing ball.', harder: 'narrower gate, the ball rolled in first, one touch.',
    picture: 'Dark and green are the two players in a pair. Yellow cones are the gates, two metres wide, 12 metres apart.' },
}
export const needsNoGoals = (d: Drill) => !(d.kit.mini || d.kit.full)
export const fitsAge = (d: Drill, age: number) => d.lo <= age && age <= d.hi
export const fitsPhase = (d: Drill, p: Phase) => d.lo <= p.hi && p.lo <= d.hi
const KIT_WORDS: [keyof Kit, string, string][] = [['balls', 'ball', 'balls'], ['mini', 'mini goal', 'mini goals'], ['full', 'full goal', 'full goals'], ['cones', 'cone', 'cones'], ['bibs', 'bib', 'bibs']]
/** Equipment for a set of drills: for each thing, the most any one drill needs (the same balls are used all night). */
export function kitLine(ds: Drill[]) {
  const out = KIT_WORDS.map(([k, one, many]) => { const n = Math.max(0, ...ds.map(d => d.kit[k] ?? 0)); return n ? `${n} ${n === 1 ? one : many}` : '' }).filter(Boolean)
  return out.length ? `${out.join(', ')}.` : ''
}

// ── the year. STILL SAMPLE outside the written term: the file has no year. Into game training is the year-plan board's (v31);
// the other two are the earlier year-plan board's Foundation and Development rows. `skill` is the core skill at the centre, or null for one of the academy's own. ──
export type Block = { title: string; skill: string | null }
const B = (title: string, skill: string | null = title): Block => ({ title, skill })
const FT = 'First touch', RUN = 'Running with the ball', ONE = 'One against one', STR = 'Striking the ball'
const YEAR: Block[][][] = [
  [[B(RUN), B('Stopping and turning', null)], [B(FT), B(ONE)], [B(STR), B(RUN)], [B(ONE), B('Small games', null)]],
  [[B(FT), B(STR)], [B('First touch on the move', FT), B(ONE)], [B(RUN), B(STR)], [B(ONE), B('Playing through', null)]],
  [[B('First touch under pressure', FT), B('Playing out', null)], [B('Taking a player on', ONE), B('Finishing, weaker foot', STR)], [B(STR), B('Winning it back', null)], [B(RUN), B('Breaking lines', null)]],
]
/** The two blocks of the written term, read off the file's grid: Monday's focus and the words before the dot, for weeks 1 to 5 and 6 to 10. */
const WRITTEN_BLOCKS: Block[] = [0, 5].map(i => { const m = DATA_GRID[i]?.nights[0]; return m ? { title: m.session.split(' · ')[0], skill: m.focus } : B('') })
/** Wednesday's topic for each of the five steps, read off the file's grid. Only the written phase has them. */
const WED_TOPICS = DATA_GRID.slice(0, 5).map(w => w.nights[2]?.session ?? '')

// ── what the owner has changed while the app is open: a drill swapped on a night, a block changed, and what is being looked at ──
type NightAt = { age: number; week: number; night: NightKey }
export type Cur = { /** `age|week|night|part` to the drill put there */ swaps: Record<string, string>; /** `team|week|night|part` to the drill a coach put there for their own team (pack v33) */ teamSwaps?: Record<string, string>; /** `phase|term|block` to the block put there */ blocks: Record<string, Block>
  age: number; at: NightAt; drill: string; libSkill: string; block: { phase: number; term: number; i: number } }
const KEY = 'cs_curriculum_v1'
const start = (): Cur => ({ swaps: {}, teamSwaps: {}, blocks: {}, age: 13, at: { age: 13, week: 8, night: 'Mon' }, drill: DRILLS[0]?.name ?? '', libSkill: SAMPLE_SKILL, block: { phase: 1, term: 3, i: 0 } })
let cur: Cur = (() => { try { const v = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as Cur | null; if (v?.swaps && v.blocks && v.at && v.block) return { ...start(), ...v } } catch { /* start from the plan */ } return start() })()
const subs = new Set<() => void>()
const commit = (p: Partial<Cur>) => { cur = { ...cur, ...p }; try { sessionStorage.setItem(KEY, JSON.stringify(cur)) } catch { /* kept for this page only */ } subs.forEach(f => f()) }
export const useCurriculum = (): Cur => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => cur, () => cur)
export const curriculumNow = () => cur
/** Back to the plan as written: no swaps, no changed blocks. */
export function resetCurriculum() { cur = start(); commit({}) }
/** The age the year plan shows. */
export function pickAge(age: number) { commit({ age }) }
/** The night `ADQ1-Session` shows. */
export function openNight(age: number, week: number, night: NightKey) { commit({ at: { age, week, night }, age }) }
/** The drill `ADL2-Drill` shows. Call it, then open `ADL2-Drill`. */
export function openDrill(name: string) { if (drillNamed(name)) commit({ drill: name }) }
/** The skill `ADL1-DrillLibrary` opens on: one of `DRILL_COUNTS`, or '' for all. */
export function openLibrary(skill: string) { commit({ libSkill: skill }) }
/** The block `AD22-ChangeBlock` changes. */
export function openBlock(phase: number, term: number, i: number) { commit({ block: { phase, term, i } }) }
export function setBlock(phase: number, term: number, i: number, b: Block) { commit({ blocks: { ...cur.blocks, [`${phase}|${term}|${i}`]: b } }) }

// ── the year and the term ──
/** The term the academy is in, from the list's own line ("Term 2 · 20 April to 26 June 2026 · week 7 of 10"). */
export const termNo = (a: Academy) => Number(a.term.match(/Term (\d)/)?.[1] ?? 1)
export const weekNow = (a: Academy) => weekOf(a.today)
const DAY = 864e5
/** The first Monday of the term: the earliest session any team has had. */
const termStart = (a: Academy) => a.groups.reduce((m, g) => g.dates[0] && g.dates[0] < m ? g.dates[0] : m, a.today)
export const dateOf = (a: Academy, week: number, night: NightKey) => new Date(Date.parse(termStart(a)) + ((week - 1) * 7 + NIGHTS.indexOf(night)) * DAY).toISOString().slice(0, 10)
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
/** "Monday 8 June". */
export const dayLine = (a: Academy, week: number, night: NightKey) => { const d = new Date(dateOf(a, week, night)); return `${NIGHT_NAME[night]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}` }
/** Which night of the week a date is, or undefined for a day the teams do not train. */
export const nightOfDate = (date: string): NightKey | undefined => NIGHTS[new Date(date).getUTCDay() - 1]

const changed = (c: Cur, phase: number, term: number) => [0, 1].some(i => c.blocks[`${phase}|${term}|${i}`])
/** A phase's year: four terms of two blocks. The written term's blocks come from the file; a block the owner has changed replaces either. */
export function yearOf(a: Academy, c: Cur, phase: number): Block[][] {
  const t = termNo(a)
  return [0, 1, 2, 3].map(k => [0, 1].map(i => c.blocks[`${phase}|${k + 1}|${i}`] ?? (phase === WRITTEN && k + 1 === t ? WRITTEN_BLOCKS[i] : YEAR[phase]?.[k]?.[i]) ?? B('Not set', null)))
}
/** The term night by night, by the handover's rule: each week takes the block's skill one step closer to the game; Monday is the
 * block's skill, Tuesday a second core skill (the two that are no block's this term, turn about), Wednesday game training, Thursday small games. */
export function gridByRule(skills: string[], blocks: Block[], wed: string[] | null, games = true): Week[] {
  const centre = new Set(blocks.map(b => b.skill)), second = skills.filter(s => !centre.has(s)), others = second.length ? second : skills
  return Array.from({ length: 10 }, (_, w) => { const k = w % 5, b = blocks[w < 5 ? 0 : 1], step = WEEK_STEPS[k], low = step.toLowerCase(), tue = others[k % 2 % others.length]
    return { week: w + 1, step, nights: [
      { night: 'Mon', focus: b.skill ?? b.title, session: `${b.title} · ${low}`, written: true },
      { night: 'Tue', focus: tue, session: `${tue} · ${low}`, written: true },
      { night: 'Wed', focus: GAME, session: wed?.[k] || 'Topic not written yet', written: !!wed?.[k] },
      { night: 'Thu', focus: SMALL, session: games ? 'Sunday’s game, in small games' : 'Small games. No Sunday game yet', written: true },
    ] } })
}
/** Whether every team at an age plays on Sunday. The under 6s do not yet. */
const playsGames = (a: Academy, age: number) => !a.groups.some(g => g.age === age && /^No games/.test(g.team))
/** The term for one age. The written phase is the file's own grid until the owner changes one of its blocks; every other is built by the rule. */
export function gridOf(a: Academy, c: Cur, age: number): { weeks: Week[]; /** true where the grid is the file's own */ fromFile: boolean } {
  const phase = phaseOfAge(age), t = termNo(a)
  if (phase === WRITTEN && !changed(c, phase, t) && DATA_GRID.length === 10) return { weeks: DATA_GRID, fromFile: true }
  return { weeks: gridByRule(a.skills, yearOf(a, c, phase)[t - 1], phase === WRITTEN ? WED_TOPICS : null, playsGames(a, age)), fromFile: false }
}
/** The balance of the term: sessions on each focus, counted from the grid, most first. */
export function balanceOf(weeks: Week[]): { focus: string; n: number }[] {
  const m = new Map<string, number>(); for (const w of weeks) for (const n of w.nights) m.set(n.focus, (m.get(n.focus) ?? 0) + 1)
  return [...m.entries()].map(([focus, n]) => ({ focus, n })).sort((x, y) => y.n - x.n)   // a tie keeps the order they first come in the grid
}
export const SESSIONS = SESSIONS_A_TERM

// ── one night ──
export type SessionPart = { part: PartKey; /** what the plan puts here */ planned: Drill | null; /** what is here now */ drill: Drill | null; swapped: boolean; /** how many of the named drills could go here */ fits: number }
export type Session = { age: number; week: number; night: NightKey; step: string; focus: string; title: string; written: boolean
  /** the core skill that runs through it; for game training and small games, the block's */ skill: string; core: boolean; parts: SessionPart[]; drills: Drill[]; minutes: number; date: string
  /** the skill whose library drills fill the parts and can be swapped in: the night's own on a core night, the block's on a night the pack names drills for, otherwise null (pack v33) */ drillSkill: string | null }
/** STILL SAMPLE (the v33 session-plan board). A night that is not on a core skill has no drills by the rule, but the coach's board draws
 * this one (under 13s, week 7, Thursday: "Sunday's game, in small games") with four named drills on the block's skill. They are put here
 * as that night's plan, in the order of the parts. Every other night is still worked out by the rule. */
const ANCHORED: Record<string, string[]> = { '13|7|Thu': ['Two-goal rondo', 'Weak-foot gates', 'Finish under pressure, 2 v 1', 'Four goals, weaker foot counts double'] }
/** The minutes at the end of every session: one question, one home practice. Not a drill. */
export const WRAP_UP = 5
const swapKey = (age: number, week: number, night: NightKey, part: PartKey) => `${age}|${week}|${night}|${part}`
/** The named drills that could fill a part of a night: the night's skill, the part, and an age that fits. In the file's order. */
export const drillsFor = (skill: string, part: PartKey, age: number) => DRILLS.filter(d => d.skill === skill && d.part === part && fitsAge(d, age))
/** One night. Each part gets a drill from the library for the night's skill. Which drill: the board gives one night (under 13s, week 8, Monday),
 * where each part is the first drill in the file that fits. The other weeks of a block take the next drill along, so a block does not repeat a night. */
export function sessionOf(a: Academy, c: Cur, age: number, week: number, night: NightKey, weeks = gridOf(a, c, age).weeks): Session {
  const w = weeks[week - 1] ?? weeks[0], n = w.nights.find(x => x.night === night) ?? w.nights[0], k = (week - 1) % 5
  const core = a.skills.includes(n.focus), skill = core ? n.focus : (a.skills.includes(w.nights[0].focus) ? w.nights[0].focus : a.skills[0])
  const anchor = core ? undefined : ANCHORED[`${age}|${week}|${n.night}`], drillSkill = core ? n.focus : anchor ? skill : null
  const parts: SessionPart[] = PARTS.map((part, pi) => { const fit = drillSkill ? drillsFor(drillSkill, part, age) : [], planned = anchor ? (fit.find(d => d.name === anchor[pi]) ?? null) : fit.length ? fit[(k + 5 * fit.length - 2) % fit.length] : null
    const put = c.swaps[swapKey(age, week, night, part)], other = put ? fit.find(d => d.name === put) : undefined
    return { part, planned, drill: other ?? planned, swapped: !!other && other !== planned, fits: fit.length } })
  const drills = parts.flatMap(p => p.drill ? [p.drill] : [])
  return { age, week, night: n.night, step: w.step, focus: n.focus, title: n.session, written: n.written, skill, core, parts, drills, minutes: drills.reduce((t, d) => t + d.minutes, 0) + WRAP_UP, date: dateOf(a, week, n.night), drillSkill }
}
/** Swap: puts the next drill that fits in a part of a night. Round again to the plan's own drill takes the swap away. False when nothing else fits. */
export function swapPart(a: Academy, age: number, week: number, night: NightKey, part: PartKey): Drill | null {
  const s = sessionOf(a, cur, age, week, night), p = s.parts.find(x => x.part === part), fit = s.drillSkill ? drillsFor(s.drillSkill, part, age) : []
  if (!p?.drill || fit.length < 2) return null
  const next = fit[(fit.indexOf(p.drill) + 1) % fit.length], swaps = { ...cur.swaps }, key = swapKey(age, week, night, part)
  if (next === p.planned) delete swaps[key]; else swaps[key] = next.name
  commit({ swaps }); return next
}
/** Puts one named drill in its part of a night. False when it does not fit the night's skill or the age. */
export function putDrill(a: Academy, age: number, week: number, night: NightKey, d: Drill): boolean {
  const s = sessionOf(a, cur, age, week, night); if (!s.drillSkill || s.drillSkill !== d.skill || !fitsAge(d, age)) return false
  const p = s.parts.find(x => x.part === d.part), swaps = { ...cur.swaps }, key = swapKey(age, week, night, d.part)
  if (p?.planned === d) delete swaps[key]; else swaps[key] = d.name
  commit({ swaps }); return true
}
export function putBack(age: number, week: number, night: NightKey, part: PartKey) { const swaps = { ...cur.swaps }; delete swaps[swapKey(age, week, night, part)]; commit({ swaps }) }
/** The parts the owner has swapped on a night. */
export const ownerSwaps = (c: Cur, age: number, week: number, night: NightKey) => PARTS.filter(p => c.swaps[swapKey(age, week, night, p)])

/** STILL SAMPLE: a swap a coach has made on their own tablet. The coach's screens are built elsewhere; the owner sees it here. The board shows this one. */
export const COACH_SWAPS: { group: string; week: number; night: NightKey; part: PartKey }[] = [{ group: 'U13Gold', week: 8, night: 'Mon', part: 'Arrival game' }]
const teamKey = (g: Group, week: number, night: NightKey, part: PartKey) => `${g.id}|${week}|${night}|${part}`
/** The parts a coach has swapped for their own team on a night: the sample one, and any made on the coach's session plan (`ACT3`) since the app opened. */
export const coachSwaps = (g: Group, week: number, night: NightKey) => [...COACH_SWAPS.filter(x => x.group === g.id && x.week === week && x.night === night),
  ...PARTS.filter(part => cur.teamSwaps?.[teamKey(g, week, night, part)]).map(part => ({ group: g.id, week, night, part }))]

// ── the coach's own session (pack v33, `ACT3-AcademySessionPlan`): the same night the owner sees in `ADQ1`, for one team ──
/** One team's night: the academy's session for that age (with anything the owner has swapped), then what this team's coach has swapped on top.
 * For each part `planned` is what the academy's plan has there now, `drill` is what the team will run, and `swapped` is true where the coach changed it. */
export function teamSessionOf(a: Academy, c: Cur, g: Group, week: number, night: NightKey): Session {
  const s = sessionOf(a, c, g.age, week, night)
  const parts = s.parts.map(p => { const put = c.teamSwaps?.[teamKey(g, week, s.night, p.part)], fit = s.drillSkill ? drillsFor(s.drillSkill, p.part, g.age) : [], other = put ? fit.find(d => d.name === put) : undefined
    return other && other !== p.drill ? { ...p, planned: p.drill, drill: other, swapped: true } : { ...p, planned: p.drill, swapped: false } })
  const drills = parts.flatMap(p => p.drill ? [p.drill] : [])
  return { ...s, parts, drills, minutes: drills.reduce((t, d) => t + d.minutes, 0) + WRAP_UP }
}
/** The coach's Swap: the next library drill that fits that part, for this team only. Round again to the plan's drill takes the swap away. Null when nothing else fits.
 * The owner sees it on the night (`ADQ1`, "Who runs it") and on the term (`AD6`) through `coachSwaps`. */
export function swapForTeam(a: Academy, g: Group, week: number, night: NightKey, part: PartKey): Drill | null {
  const s = teamSessionOf(a, cur, g, week, night), p = s.parts.find(x => x.part === part), fit = s.drillSkill ? drillsFor(s.drillSkill, part, g.age) : []
  if (!p?.drill || fit.length < 2) return null
  const next = fit[(fit.indexOf(p.drill) + 1) % fit.length], teamSwaps = { ...cur.teamSwaps }, key = teamKey(g, week, s.night, part)
  if (next === p.planned) delete teamSwaps[key]; else teamSwaps[key] = next.name
  commit({ teamSwaps }); return next
}
/** Back to the academy's drill for that part of the team's night. */
export function putBackForTeam(g: Group, week: number, night: NightKey, part: PartKey) { const teamSwaps = { ...cur.teamSwaps }; delete teamSwaps[teamKey(g, week, night, part)]; commit({ teamSwaps }) }
/** The drill a coach put in a part for their team, when they have: so the owner's screens can name it. */
export const coachDrill = (c: Cur, g: Group, week: number, night: NightKey, part: PartKey) => drillNamed(c.teamSwaps?.[teamKey(g, week, night, part)] ?? '')

/** STILL SAMPLE (the v33 session-plan board's words). The seven lines a coach reads on a drill's card, for the four drills that board writes out.
 * "Look for" here is the board's sentence; the step lines beside it come from the academy's list (`stepLine`), not from here.
 * A drill that is not here has only what `DRILL_SAMPLE` and `WRITTEN_DRILL` hold: the rest is not written yet, and the screens say so. */
export type DrillWords = { why: string; setup: string; runs: string; say: string; look?: string; easier: string; harder: string }
export const DRILL_WORDS: Record<string, DrillWords> = {
  'Two-goal rondo': { why: 'Everyone on a ball inside a minute, and shooting from the start.', setup: '4 v 2 in a 12 metre square, a mini goal on two sides. Three squares.',
    runs: 'Keep the ball. After five passes you can score in either goal. Defenders swap when they win it.', say: '“Weaker foot only to score.”', look: 'Who looks for the goal before the ball arrives.',
    easier: 'Make the square bigger, or play 4 v 1.', harder: 'Two touches. A goal only counts first time.' },
  'Weak-foot gates': { why: 'The technique on its own, slowly, before anyone is in the way.', setup: 'Pairs either side of a two-metre gate, 12 metres apart. Six gates.',
    runs: 'Strike through the gate to your partner with the weaker foot. Ten each, then move one gate along.', say: '“Lock the ankle.” “Standing foot beside the ball.”',
    easier: 'Wider gate, standing ball.', harder: 'Narrower gate. Roll it in first, then one touch.' },
  'Finish under pressure, 2 v 1': { why: 'The same strike with a defender coming. This is where step 3 shows.', setup: 'A 20 by 25 metre box in front of a full goal with a keeper. Attackers in twos, one defender.',
    runs: 'The coach plays in. Two attackers against one defender, shot within six seconds.', say: '“Shoot early.” “Across the keeper.”', look: 'Who shoots with the weaker foot when the stronger one is blocked.',
    easier: 'The defender starts two metres further back.', harder: 'A second defender chases from behind.' },
  'Four goals, weaker foot counts double': { why: 'The skill inside a real game, with the shape you play on Sunday.', setup: '6 v 6 on a half pitch, two small goals at each end, plus a keeper each.',
    runs: 'A normal game. A goal with the weaker foot counts double. Rotate the spare players every four minutes.', say: '“Who saw the chance to shoot?”', look: 'Does anyone choose the weaker foot without being told.',
    easier: 'Three-touch limit off.', harder: 'A weaker-foot goal is the only goal that counts.' },
}
/** STILL SAMPLE (the v33 board): who ran the library's film of a drill, and how long it is. Shown only for a drill the library marks as filmed (`Drill.filmed`). */
export const FILM_RUN: Record<string, { len: string; by: string }> = {
  'Two-goal rondo': { len: '0:41', by: 'Carla, U14 Timber' }, 'Weak-foot gates': { len: '0:48', by: 'Reece, last term' }, 'Finish under pressure, 2 v 1': { len: '1:02', by: 'Sam, U13 Gold' },
}
/** STILL SAMPLE (the v33 board): the one sentence for a night, where the board writes one. Other nights use the night's own title. */
export const NIGHT_LINE: Record<string, string> = { '13|7|Thu': 'Finishing with the weaker foot, in small games before Sunday.' }
export const nightLine = (s: Session) => NIGHT_LINE[`${s.age}|${s.week}|${s.night}`] ?? `${s.title.replace(' · ', ', ')}.`
/** STILL SAMPLE (the v33 board, and the same question `ADQ1` has): the wrap-up for a block. Other blocks get the plain one. */
export const WRAP_WORDS: Record<string, { question: string; practice: string }> = { 'Finishing, weaker foot': { question: '“What made it go where you wanted?”', practice: 'ten wall strikes with the weaker foot' } }

/** STILL SAMPLE (the v33 board): how a drill splits the players who are there. The rule for each of the board's four drills is here; the numbers are
 * counted by whoever calls `groupsLine` with how many are coming. A drill with no rule says how many are coming and what the library says it suits. */
type GroupRule = { kind: 'sets'; size: number; noun: string } | { kind: 'pairs' } | { kind: 'split'; k: number; noun: string; tail?: string } | { kind: 'game'; side: number }
const GROUP_RULES: Record<string, GroupRule> = {
  'Two-goal rondo': { kind: 'sets', size: 5, noun: 'squares' }, 'Weak-foot gates': { kind: 'pairs' },
  'Finish under pressure, 2 v 1': { kind: 'split', k: 2, noun: 'boxes', tail: 'Keepers swap every four goes' }, 'Four goals, weaker foot counts double': { kind: 'game', side: 6 },
}
const NUM = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'], num = (n: number) => NUM[n] ?? String(n)
const cap1 = (t: string) => t.charAt(0).toUpperCase() + t.slice(1), SIDES: Record<number, string> = { 4: 'fours', 5: 'fives', 6: 'sixes', 7: 'sevens' }
/** How `n` players split for a drill tonight. `guest` is a trial player's first name, said when they make up an odd pair. */
export function groupsLine(d: Drill, n: number, guest?: string): string {
  const r = GROUP_RULES[d.name]
  if (!r || n < 2) return `${n} ${n === 1 ? 'player' : 'players'}. The library says it suits ${d.players}`
  if (r.kind === 'pairs') return n % 2 ? `Pairs. One three${guest ? `, with ${guest} in it` : ''}` : `${cap1(num(n / 2))} pairs`
  if (r.kind === 'game') { const spare = n - 2 * r.side
    if (spare < 0) return `Two teams of ${num(Math.floor(n / 2))}${n % 2 ? ' and one rolling on' : ''}`
    return `Two ${SIDES[r.side] ?? `teams of ${num(r.side)}`}${spare ? ` and ${num(spare)} rolling on` : ''}` }
  const k = r.kind === 'sets' ? Math.max(1, Math.round(n / r.size)) : Math.min(r.k, n), base = Math.floor(n / k), extra = n % k
  const sing = (noun: string, count: number) => count !== 1 ? noun : noun.endsWith('xes') ? noun.slice(0, -2) : noun.slice(0, -1)
  if (r.kind === 'split') return `${cap1(num(k))} ${sing(r.noun, k)} of ${num(base)}${extra ? ` or ${num(base + 1)}` : ''}${r.tail ? `. ${r.tail}` : ''}`
  return `${n} players: ${extra ? `${num(extra)} ${sing(r.noun, extra)} of ${num(base + 1)} and ${num(k - extra)} of ${num(base)}` : `${num(k)} ${sing(r.noun, k)} of ${num(base)}`}`
}
export const teamsAt = (a: Academy, age: number) => a.groups.filter(g => g.age === age)
export const coachFirst = (g: Group) => g.coach.split(' ')[0]
/** How long a team's slot is, from its times in the list ("Mon to Thu · 6:35 to 7:45" is 70). */
export function slotMinutes(g?: Group) { const m = g?.when.match(/(\d+):(\d+) to (\d+):(\d+)/); return m ? (Number(m[3]) * 60 + Number(m[4])) - (Number(m[1]) * 60 + Number(m[2])) : 0 }

// ── the step lines the coaches mark against, and who is on them ──
const playersAt = (a: Academy, age: number) => { const ids = new Set(teamsAt(a, age).map(g => g.id)); return a.players.filter(p => ids.has(p.group)) }
/** For one age and one core skill: the step half the players or more are on or past, and how many. That is the step "most should reach". */
export function stepFor(a: Academy, age: number, skill: string) {
  const k = a.skills.indexOf(skill), ps = playersAt(a, age), at = (s: number) => ps.filter(p => p.skills_now[k] >= s).length
  let step = 1; for (let s = 2; s <= 5; s++) if (ps.length && at(s) * 2 >= ps.length) step = s
  return { skill, step, line: a.step_words[skill]?.[step - 1] ?? '', on: at(step), of: ps.length, at }
}
export const stepLine = (a: Academy, skill: string, step: number) => a.step_words[skill]?.[step - 1] ?? ''
export const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

// ── how often a drill has been used, counted from the nights each team has had ──
export type Use = { times: number; coaches: Set<string>; /** for each team, the sessions (by their place in the team's dates) that had it */ had: Map<string, number[]> }
let memo: { a: Academy; c: Cur; use: Map<string, Use>; plan: Map<string, { age: number; week: number }[]> } | null = null
function tally(a: Academy, c: Cur) {
  if (memo && memo.a === a && memo.c === c) return memo
  const use = new Map<string, Use>(), plan = new Map<string, { age: number; week: number }[]>()
  const ages = [...new Set(PHASES.flatMap(p => Array.from({ length: p.hi - p.lo + 1 }, (_, i) => p.lo + i)))]
  for (const age of ages) { const weeks = gridOf(a, c, age).weeks, teams = teamsAt(a, age)
    for (const w of weeks) for (const n of w.nights) { const s = sessionOf(a, c, age, w.week, n.night, weeks)
      for (const d of s.drills) { plan.set(d.name, [...(plan.get(d.name) ?? []), { age, week: w.week }])
        for (const g of teams) { const i = g.dates.indexOf(s.date); if (i < 0) continue
          const u = use.get(d.name) ?? { times: 0, coaches: new Set<string>(), had: new Map<string, number[]>() }
          u.times++; u.coaches.add(g.coach); u.had.set(g.id, [...(u.had.get(g.id) ?? []), i]); use.set(d.name, u) } } } }
  memo = { a, c, use, plan }; return memo
}
/** Times a drill has been on a night a team has had this term, and by how many coaches. */
export const timesUsed = (a: Academy, c: Cur, d: Drill) => { const u = tally(a, c).use.get(d.name); return { times: u?.times ?? 0, coaches: u?.coaches.size ?? 0 } }
/** Where a drill is in this term's plan: "U12, week 8; U13 to U14, weeks 6 to 10". Ages next to each other with the same weeks are said together. Empty when it is in nobody's plan. */
export function inPlan(a: Academy, c: Cur, d: Drill) {
  const by = new Map<number, number[]>(); for (const x of tally(a, c).plan.get(d.name) ?? []) by.set(x.age, [...(by.get(x.age) ?? []), x.week])
  const runs: { ages: number[]; weeks: string }[] = []
  for (const age of [...by.keys()].sort((x, y) => x - y)) { const weeks = weeksLine(by.get(age) ?? []), last = runs[runs.length - 1]
    if (last && last.weeks === weeks && last.ages[last.ages.length - 1] === age - 1) last.ages.push(age); else runs.push({ ages: [age], weeks }) }
  return runs.map(r => `${agesLine(r.ages)}, ${r.weeks}`).join('; ')
}
/** "Does it work?" Players who were there for the drill `FOUR` times or more, and how many of them are up a step on its skill. When nobody
 * has done it four times yet, the players who have done it at all. Always an estimate: players did other drills too. */
export const FOUR = 4
export function worksOf(a: Academy, c: Cur, d: Drill) {
  const u = tally(a, c).use.get(d.name), k = a.skills.indexOf(d.skill), did: [Player, number][] = []
  if (u) for (const p of a.players) { const n = (u.had.get(p.group) ?? []).filter(i => p.roll[i] === true).length; if (n) did.push([p, n]) }
  const up = (l: [Player, number][]) => l.filter(([p]) => p.skills_now[k] > p.skills_then[k]).length, four = did.filter(([, n]) => n >= FOUR)
  return { four: four.length, fourUp: up(four), any: did.length, anyUp: up(did) }
}

/** STILL SAMPLE: "Are coaches following it?" The list does not hold which sessions were opened on the tablet or what was run in them. The board gives one phase. */
export const FOLLOWING_SAMPLE: Record<string, { opened: number; fromPlan: number; library: number; weeks: string } | undefined> = { 'Into game training': { opened: 54, fromPlan: 49, library: 51, weeks: 'weeks 1 to 7' } }

/** The little set-up picture on a library card: five players and one pass. A sketch for each drill by its place in the file, as the library board draws them; not the real set-up. */
export function sketch(i: number) {
  const x0 = (23 * i) % 84, y0 = (17 * i) % 46
  return Array.from({ length: 5 }, (_, k) => ({ x: 18 + (x0 + 31 * k) % 84, y: 12 + (y0 + 13 * k) % 46, dark: k % 2 === 0 }))
}
