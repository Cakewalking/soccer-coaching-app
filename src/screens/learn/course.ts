// Learn to coach: the course, the coach's own answers and progress, and the rules that order it.
// The 30 lessons, 60 words and 11 sources are data (lessons.json, words.json, sources.json) and are
// shown exactly as written. Everything a coach does here is private to that coach and kept in this browser.

import { useSyncExternalStore } from 'react'
import LESSONS from './lessons.json'
import WORDS from './words.json'
import SOURCES from './sources.json'
import { TEAMS, type TeamKey } from '../session/sessionEngine'

export type Answer = { answer: string; then: string }
export type Lesson = { id: string; screen: string; title: string; one_line: string; minutes: number; idea: string; steps: string[]; words_to_use: string[]; instead_of: string | null; try_when: string; try_at: string; try_task: string; answers: Answer[]; own_team_clip: { example_moment: string; example_caption: string } | null; film_brief: string; sources: number[] }
export type Module = { number: number; title: string; summary: string; outcome: string; why: { text: string; source: number }[]; leave_with: string; own_team_tiles: string[]; lessons: Lesson[] }
export const MODULES = (LESSONS as unknown as { modules: Module[] }).modules
export const COURSE_NAME = (LESSONS as unknown as { course: string }).course
export const ALL: Lesson[] = MODULES.flatMap(m => m.lessons)
export const lesson = (id: string) => ALL.find(l => l.id === id || l.screen === id)
export const moduleOf = (l: Lesson) => MODULES[Number(l.id.split('.')[0]) - 1]
export const GLOSSARY = WORDS as { word: string; meaning: string }[]
export const RESEARCH = SOURCES as { sources: { n: number; does: string; found: string; limit: string; ref: string; safety: boolean }[]; tail: string[][] }
/** The board id of each module page. */
export const MODULE_SCREEN = ['LN3m1-Module', 'LN3m2-Module', 'LN3m3-Module', 'LN3-Module', 'LN3m5-Module', 'LN3m6-Module']

// The coach's own numbers on each module page: what it is, where it comes from, the figure.
export const OWN_TEAM: [string, string, string][][] = [
  [['Session plans opened before training', 'Every week so far', '6 of 6'], ['Minutes from arrival to first game', 'Was 9 in round 1', '2']],
  [['Your Working with Children Check', 'Recorded by the club', 'Current'], ['Emergency contacts on file', 'Your squad', '13 of 13']],
  [['Players standing still, your three counts', 'Was 5 of 9 in round 2', '2 of 9'], ['“I had fun”', 'Players’ three taps, last Tuesday', '9 of 9']],
  [['“I knew what to do”', 'Players’ three taps, last Tuesday', '7 of 9'], ['Before you tried “Say less”', 'Two weeks earlier', '5 of 9']],
  [['Minutes on the pitch, most and least', 'Last Saturday, of 50', '34 and 28'], ['Players who have tried in goal', 'This season', '6 of 13']],
  [['Families who have read your welcome', '', '11 of 13'], ['Jobs shared out', 'Game leader still open', '4 of 5']],
]

// ── The coach ────────────────────────────────────────────────────────────────
export const WORRIES: [string, number | 'game'][] = [['Planning sessions', 1], ['Getting them to listen', 3], ['Knowing the rules', 'game'], ['What to say', 4], ['Match day', 5], ['Parents', 6]]
export const CONFIDENCE = ['Planning', 'Running it', 'Talking to players', 'Match day', 'Knowing the game']
export type Done = { tried: string; answer: string; feel: number; note?: string; when: string }
export type Coach = {
  /** the four answers on the starting page; `built` once the course has been made from them or skipped */
  built: boolean; played: string; seasons: string; worries: string[]; minutes: string
  done: Record<string, Done>
  /** a lesson the last "How it went" answer pointed at: it comes next */ next: string | null
  /** what the course did because of an answer, newest first */ did: string[]
  ownWords: Record<string, string[]>; reminders: Record<string, string>
  ratings: number[][]; share: boolean
  /** sessions the coach said not to ask about again */ skipped: string[]
}
const fresh = (): Coach => ({ built: false, played: 'Never', seasons: 'This is my first season', worries: [], minutes: '10 minutes', done: {}, next: null, did: [], ownWords: {}, reminders: {}, ratings: [], share: false, skipped: [] })
/** The demo coach is part-way through: three modules and "Say less" done, as on the boards. */
function seeded(): Coach {
  const done: Record<string, Done> = {}
  // sixteen lessons done, nine of them tried at training: the rest were read and not yet tried
  const TRIED = ['1.1', '1.3', '1.4', '1.5', '3.1', '3.2', '3.3', '3.5', '4.1']
  ALL.filter(l => Number(l.id.split('.')[0]) <= 3 || l.id === '4.1').forEach(l => { done[l.id] = { tried: TRIED.includes(l.id) ? 'Yes' : 'Sort of', answer: l.answers[0].answer, feel: 4, when: l.id === '4.1' ? '16 June' : '' } })
  return { ...fresh(), built: true, played: 'Never', seasons: 'A season or two', worries: ['Planning sessions', 'Knowing the rules', 'What to say'], done, ratings: [[2, 4], [2, 4], [2, 2], [2, 2], [1, 3]] }
}

const KEY = 'cs_learn_v1'
let all: Record<string, Coach> = (() => { try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, Coach> } catch { return {} } })()
const subs = new Set<() => void>()
/** `who` is the coach: a demo team's coach starts part-way through, a new club's coach starts at the beginning. */
export const coachOf = (who: string): Coach => all[who] ?? (who.startsWith('new:') ? fresh() : seeded())
export function setCoach(who: string, patch: Partial<Coach> | ((c: Coach) => Partial<Coach>)) {
  const c = coachOf(who); all = { ...all, [who]: { ...c, ...(typeof patch === 'function' ? patch(c) : patch) } }
  try { localStorage.setItem(KEY, JSON.stringify(all)) } catch { /* kept for this visit only */ }
  subs.forEach(f => f())
}
export const useCoach = (who: string): Coach => { useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => all, () => all); return coachOf(who) }

// A lesson asked for from elsewhere in the app (a link, a board's own address).
let wanted: string | null = null
export function openLearn(view: string) { wanted = view; subs.forEach(f => f()) }
export const takeWanted = () => { const w = wanted; wanted = null; return w }
export const useWanted = () => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => wanted, () => null)

// ── Ordering the course ──────────────────────────────────────────────────────
export const addsGame = (c: Coach) => c.played === 'Never' || c.worries.includes('Knowing the rules')
/** Modules in this coach's order: the two every coach starts with, then the ones that worry them, then the rest. Finished modules stay where they were. */
export function moduleOrder(c: Coach): Module[] {
  const worried = new Set(WORRIES.filter(([w, m]) => typeof m === 'number' && c.worries.includes(w)).map(w => w[1] as number))
  const finished = (m: Module) => m.lessons.every(l => c.done[l.id])
  const rank = (m: Module) => finished(m) ? 0 : m.number <= 2 ? 1 : worried.has(m.number) ? 2 : 3
  return [...MODULES].sort((a, b) => rank(a) - rank(b) || a.number - b.number)
}
/** This week's lesson: where the last answer pointed, otherwise the next one not yet done in the coach's order. */
export function nextLesson(c: Coach): Lesson | null {
  if (c.next && lesson(c.next)) return lesson(c.next)!
  for (const m of moduleOrder(c)) { const l = m.lessons.find(x => !c.done[x.id]); if (l) return l }
  return null
}
export const paceLine = (minutes: string) => minutes.startsWith('5') ? 'One short lesson a fortnight, plus one thing to try.' : minutes.startsWith('20') ? 'Two lessons a week, six minutes each, plus one thing to try.' : 'One lesson a week, six minutes, plus one thing to try.'

/** What an answer does next. Three kinds: carry on; point at a lesson; do something in the product. */
export function effectOf(l: Lesson, a: Answer): { kind: 'carry' | 'lesson' | 'product'; to?: Lesson } {
  const t = a.then
  if (/^(Carry on in order|Module finished\.?$|Course finished)/.test(t) && !/run sheet/.test(t)) return { kind: 'carry' }
  if (/^This lesson repeats|^We ask again/.test(t)) return { kind: 'lesson', to: l }
  const named = t.match(/“([^”]+)”/)?.[1], to = named ? ALL.find(x => x.title === named) : undefined
  if (to && /(is next|moves up|repeats|offered again|next,)/.test(t)) return { kind: 'lesson', to }
  if (/^(Carry on|Module finished)/.test(t)) return { kind: 'product' }   // carries on, and also does something
  return { kind: 'product' }
}

// ── The coach's team ─────────────────────────────────────────────────────────
export type Ctx = { who: string; coach: string; team: string; age: string; ages: string; side: string; mentor: string; nine: boolean; standardRules: boolean; hasFilm: boolean }
const SIDE: Record<TeamKey, string> = { u9: '7 v 7', u11: '9 v 9', u12: '9 v 9', u16: '11 v 11', seniors: '11 v 11' }
export function ctxFor(k: TeamKey, isNew = false): Ctx {
  const t = TEAMS[k], adult = k === 'seniors'
  return { who: (isNew ? 'new:' : '') + k, coach: isNew ? 'Your course' : t.coachFull, team: t.label, age: adult ? 'seniors' : `under ${t.age}`, ages: adult ? 'SENIORS' : `UNDER ${t.age}s`, side: SIDE[k], mentor: 'Rachel', nine: SIDE[k] === '9 v 9', standardRules: t.age === 10 || t.age === 11, hasFilm: k === 'u11' }
}
/** "Tuesday" is the coach's next training and "Saturday" the next game; anything else is shown as written. */
export const isDay = (l: Lesson) => l.try_when === 'Tuesday' || l.try_when === 'Saturday'
export const tryHeading = (l: Lesson) => isDay(l) ? `Try it on ${l.try_when}` : `Try it: ${l.try_when.charAt(0).toLowerCase()}${l.try_when.slice(1)}`
