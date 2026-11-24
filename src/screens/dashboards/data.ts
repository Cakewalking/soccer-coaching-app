// Sample data for the dashboards, as the boards draw it. Nothing real is behind it.
// The numbers behind each tile (`n`, `target`, `better`) feed the Close rule in kit.tsx.
// Where a board draws a state the rule does not give, the tile says so with `drawn`.

import type { Measure, Tone, WorkOn } from './kit'

export type Person = { mark: string; name: string; line: string; tone: Tone; opens?: string }   // opens: a screen of this person's own, where the row should not go to the usual place

export type GameReview = {
  big: string; title: string; detail: string
  measures: Measure[]
  chances: { ours: [string, string]; theirs: [string, string] }
  caption: string
  work: WorkOn[]
  squadSize: number
  people: Person[]
}

// The eight style measures from Saturday's film, in the order set in Our style. The same game is drawn for the club and the academy.
const GAME_MEASURES: Measure[] = [
  // 64% of an aim of 70% is 9% short, which the Close rule (within 15%) calls Close. The board draws Off target.
  { name: 'Goal kicks played short', value: '64%', aim: 'aim 70%+', n: 64, target: 70, better: 'higher', fill: 64, tick: 70, sure: 'Strong', drawn: 'off' },
  { name: 'Wins in their half', value: '13', aim: 'aim 10+', n: 13, target: 10, better: 'higher', fill: 81, tick: 62, sure: 'Strong' },
  { name: 'Shots inside 10 s of a win', value: '3', aim: 'aim 2+', n: 3, target: 2, better: 'higher', fill: 75, tick: 50, sure: 'Strong' },
  { name: 'Their passes before we challenge', value: '9', aim: 'aim under 10', n: 9, target: 10, better: 'under', fill: 56, tick: 62, sure: 'Strong' },
  { name: 'Seconds to win it back', value: '7 s', aim: 'usual 4 s', n: 7, target: 4, better: 'lower', fill: 88, tick: 50, sure: 'Strong', fix: { big: '7 s', line: 'to win it back · your usual is 4 s' } },
  { name: 'Won back inside 6 s', value: '42%', aim: 'aim 40%+', n: 42, target: 40, better: 'higher', fill: 42, tick: 40, sure: 'Strong' },
  { name: 'Minutes shared evenly', value: '15 of 16', aim: 'aim all 16', n: 15, target: 16, better: 'higher', fill: 94, tick: 100, sure: 'Strong' },
  { name: 'Weaker-foot touches', value: '18%', aim: 'aim 20%+', n: 18, target: 20, better: 'higher', fill: 72, tick: 80, sure: 'Strong' },
]

// Three rows at most. As drawn: the second and third are not among the eight tiles (see DASHBOARDS-NOTES).
const GAME_WORK: WorkOn[] = [
  { minute: '16', title: 'Win it back faster', line: 'One pressed, the rest watched', value: '7 s', sure: 'Strong' },
  { minute: '29', title: 'Close the gap between lines', line: 'Before 6 of their 8 chances', value: '26 m', sure: 'Estimate' },
  { minute: '41', title: 'Stay strong late', line: 'Sprints dropped after minute 35', value: '−22%', sure: 'Estimate' },
]

const GAME_CHANCES: GameReview['chances'] = { ours: ['2.1', 'worth in goals · we scored 3'], theirs: ['0.8', 'worth in goals · they scored 1'] }
const GAME_CAPTION = 'The black line is your aim. Good film for 47 of 50 minutes. Tap a tile for its clips.'

/** RD1: U12 Sam away at Ironbark United. */
export const CLUB_GAME: GameReview = {
  big: '3–1', title: 'Won away at Ironbark United', detail: 'U12 Sam · Sun 7 June · Mia, Jai and Zoe scored',
  measures: GAME_MEASURES, chances: GAME_CHANCES, caption: GAME_CAPTION, work: GAME_WORK, squadSize: 16,
  people: [
    { mark: 'MT', name: 'Mia Tran', line: 'Goal on her weaker foot', tone: 'good' },
    { mark: 'LM', name: 'Leo Marsh', line: '27 minutes. Start him on Sunday', tone: 'look' },
    { mark: 'EB', name: 'Ella Brandt', line: 'Felt low two days running', tone: 'look' },
  ],
}

/** ADC7: U13 Timber away at Eastbank. */
export const ACADEMY_GAME: GameReview = {
  big: '3–1', title: 'Won away at Eastbank', detail: 'U13 Timber · Sun 31 May · Kai, Zane and Lola scored',
  measures: GAME_MEASURES, chances: GAME_CHANCES, caption: GAME_CAPTION, work: GAME_WORK, squadSize: 16,
  people: [
    { mark: 'KO', name: 'Kai Okonkwo', line: 'Left-foot goal: his goal this term', tone: 'good' },
    { mark: 'NP', name: 'Noah Petrov', line: '27 minutes. Start him on Sunday', tone: 'look' },
    { mark: 'IT', name: 'Isla Tran', line: 'Felt low two days running', tone: 'look', opens: 'ADK4-CheckIn' },   // her own check-in, as her coaches see it
  ],
}

/** RD2: U12 Sam's season. Each tile is the average over the filmed games; "was" is the average of the first three. */
export const CLUB_SEASON = {
  big: '5 · 2 · 2', title: 'Won 5, drew 2, lost 2', detail: 'U12 Sam · 9 of 18 games played · 8 filmed',
  measures: [
    { name: 'Goal kicks played short', value: '61%', aim: 'aim 70%+ · was 48%', n: 61, target: 70, better: 'higher', fill: 61, tick: 70, sure: 'Strong' },
    { name: 'Wins in their half', value: '11', aim: 'aim 10+ a game', n: 11, target: 10, better: 'higher', fill: 69, tick: 62, sure: 'Strong' },
    { name: 'Shots inside 10 s of a win', value: '2.4', aim: 'aim 2+ a game', n: 2.4, target: 2, better: 'higher', fill: 60, tick: 50, sure: 'Strong' },
    { name: 'Their passes before we challenge', value: '11', aim: 'aim under 10', n: 11, target: 10, better: 'under', fill: 69, tick: 62, sure: 'Strong' },
    // 5 s against an aim of 4 s is 25% over, which the Close rule calls Off target. The board draws Close.
    { name: 'Seconds to win it back', value: '5 s', aim: 'aim 4 s · was 8 s', n: 5, target: 4, better: 'lower', fill: 62, tick: 50, sure: 'Strong', drawn: 'close' },
    { name: 'Won back inside 6 s', value: '44%', aim: 'aim 40%+', n: 44, target: 40, better: 'higher', fill: 44, tick: 40, sure: 'Strong' },
    { name: 'Minutes shared evenly', value: '8 of 9', aim: 'games within a fifth', n: 8, target: 9, better: 'higher', fill: 89, tick: 100, sure: 'Strong' },
    { name: 'Weaker-foot touches', value: '14%', aim: 'aim 20%+ · was 15%', n: 14, target: 20, better: 'higher', fill: 56, tick: 80, sure: 'Strong', fix: { big: '14%', line: 'weaker-foot touches · aim 20%' } },
  ] as Measure[],
  chances: { ours: ['1.9', 'worth in goals a game · scoring 2.1'], theirs: ['1.2', 'worth in goals a game · letting in 1.0'] } as GameReview['chances'],
  caption: 'Averages over the 8 filmed games. “Was” is the first three games. Tap a tile for its best and worst clips.',
  /** Measures on target, out of 8, in each of the last five games. */
  lastFive: [['R5', 3], ['R6', 5], ['R7', 4], ['R8', 6], ['R9', 4]] as Array<[string, number]>,
  moved: [
    { mark: '↑', name: 'Seconds to win it back', line: '8 s down to 5 s since round 3', tone: 'good' },
    { mark: '↑', name: 'Goal kicks played short', line: '48% up to 61%', tone: 'good' },
    { mark: '→', name: 'Weaker-foot touches', line: 'Stuck at 14%. In the next block', tone: 'look' },
  ] as Person[],
}

export type MiniReview = {
  title: string; detail: string
  headlines: Array<[label: string, big: string, line: string]>
  measures: Measure[]
  steps: Person[]; children: Person[]
}

/** RD3 as drawn: U8 Wombats at Eastbank. No score, no table, no goals counted. Every tile counts children, minutes or turns. */
export const MINI_BOARD: MiniReview = {
  title: 'Sunday at Eastbank: everyone played', detail: 'U8 Wombats · Sun 7 June · 4 games of 10 minutes · counted from your taps',
  headlines: [['Every child', '9 of 9', 'played in every game'], ['Brave moments', '14', 'a go at goal or at a player'], ['To try on Tuesday', '2 children', 'haven’t had a go at goal yet']],
  measures: [
    { name: 'Everyone played', value: '9 of 9', aim: 'aim all 9', n: 9, target: 9, better: 'higher', fill: 100, tick: 100, sure: 'You tapped' },
    { name: 'Longest wait for a turn', value: '4 min', aim: 'aim under 5', n: 4, target: 5, better: 'under', fill: 40, tick: 50, sure: 'You tapped' },
    // 7 of 9 is 22% short, which the Close rule calls Off target. The board draws Close: nothing on this screen is marked off.
    { name: 'Had a go at goal', value: '7 of 9', aim: 'aim all 9', n: 7, target: 9, better: 'higher', fill: 78, tick: 100, sure: 'You tapped', drawn: 'close' },
    { name: 'Took a player on', value: '8 of 9', aim: 'aim all 9', n: 8, target: 9, better: 'higher', fill: 89, tick: 100, sure: 'You tapped' },
    { name: 'Tapped “I enjoyed today”', value: '8 of 9', aim: 'aim all 9', n: 8, target: 9, better: 'higher', fill: 89, tick: 100, sure: 'You tapped' },
    { name: 'Minutes each', value: '18 to 22', aim: 'aim within 5', n: 4, target: 5, better: 'lower', fill: 90, tick: 100, sure: 'You tapped' },
  ],
  steps: [
    { mark: '1', name: 'A goal each, four small pitches', line: 'So Ivy and Tom get a shot', tone: 'good' },
    { mark: '2', name: 'One against one to a gate', line: 'Everyone tries it twice', tone: 'good' },
  ],
  children: [
    { mark: 'IV', name: 'Ivy', line: 'No go at goal yet. Loved defending', tone: 'look' },
    { mark: 'TM', name: 'Tom', line: 'Stood back in two games', tone: 'look' },
    { mark: 'AR', name: 'Arlo', line: 'First time he took a player on', tone: 'good' },
  ],
}

/** The same review inside the live MiniRoos app, whose sample team is U9 Tom: 8 children played at Northgate City on Saturday 6 June. */
export const MINI_LIVE: MiniReview = {
  title: 'Saturday at Northgate City: everyone played', detail: 'U9 Tom · Sat 6 June · 4 games of 10 minutes · counted from your taps',
  headlines: [['Every child', '8 of 8', 'played in every game'], ['Brave moments', '14', 'a go at goal or at a player'], ['To try on Tuesday', '2 children', 'haven’t had a go at goal yet']],
  measures: [
    { name: 'Everyone played', value: '8 of 8', aim: 'aim all 8', n: 8, target: 8, better: 'higher', fill: 100, tick: 100, sure: 'You tapped' },
    { name: 'Longest wait for a turn', value: '4 min', aim: 'aim under 5', n: 4, target: 5, better: 'under', fill: 40, tick: 50, sure: 'You tapped' },
    { name: 'Had a go at goal', value: '6 of 8', aim: 'aim all 8', n: 6, target: 8, better: 'higher', fill: 75, tick: 100, sure: 'You tapped', drawn: 'close' },
    { name: 'Took a player on', value: '7 of 8', aim: 'aim all 8', n: 7, target: 8, better: 'higher', fill: 88, tick: 100, sure: 'You tapped' },
    { name: 'Tapped “I enjoyed today”', value: '7 of 8', aim: 'aim all 8', n: 7, target: 8, better: 'higher', fill: 88, tick: 100, sure: 'You tapped' },
    { name: 'Minutes each', value: '18 to 22', aim: 'aim within 5', n: 4, target: 5, better: 'lower', fill: 90, tick: 100, sure: 'You tapped' },
  ],
  steps: [
    { mark: '1', name: 'A goal each, four small pitches', line: 'So Poppy and Leo get a shot', tone: 'good' },
    { mark: '2', name: 'One against one to a gate', line: 'Everyone tries it twice', tone: 'good' },
  ],
  children: [
    { mark: 'PD', name: 'Poppy', line: 'No go at goal yet. Loved defending', tone: 'look' },
    { mark: 'LW', name: 'Leo', line: 'Stood back in two games', tone: 'look' },
    { mark: 'AK', name: 'Arlo', line: 'First time he took a player on', tone: 'good' },
  ],
}

/** RD4: Wattle Creek FC's weekend. One row per team: its result in small words, and measures on target out of the club's 8 (null: no film). */
export const CLUB_WEEKEND = {
  big: '11 of 12', title: 'games filmed this weekend', detail: 'Wattle Creek FC · Sat 6 and Sun 7 June · 6 won, 2 drew, 3 lost',
  clubMeasures: 8,
  teams: [
    ['U9 Kate', 'Won', 6], ['U10 Dev', 'Drew', 5], ['U11 Luke', 'Won', 5], ['U12 Sam', 'Won', 4],
    ['U13 Chris', 'Lost', 3], ['U13 Girls Meg', 'Won', 6], ['U14 Josh', 'Lost', 2], ['U15 Ana', 'Drew', 5],
    ['U16 Ollie', 'Won', 5], ['U16 Girls Bree', 'Won', 4], ['U18 Tom', 'Lost', 4], ['Seniors', '', null],
  ] as Array<[team: string, result: string, onTarget: number | null]>,
  minutesShared: ['9 of 11', 'teams within a fifth'] as [string, string],
  offMostOften: [
    { mark: '8', name: 'Weaker-foot touches', line: 'Off target in 8 of 11 teams', tone: 'look' },
    { mark: '6', name: 'Seconds to win it back', line: 'Off target in 6 of 11', tone: 'look' },
    { mark: '2', name: 'Minutes shared evenly', line: 'Off target in 2 of 11', tone: 'close' },
  ] as Person[],
  coaches: [
    { mark: 'JW', name: 'Josh · U14', line: '2 of 8, third week running', tone: 'look' },
    { mark: 'CP', name: 'Chris · U13', line: 'Minutes: 4 players under half', tone: 'look' },
    { mark: 'KD', name: 'Kate · U9', line: '6 of 8. Ask her to show the others', tone: 'good' },
  ] as Person[],
}

/**
 * The same review for the club's youth and senior coaches, who had the same list as U12 Sam with their own result on top.
 * Not drawn in the pack: the numbers are U12 Sam's. Seniors do not share minutes evenly, so that tile is left out.
 */
export function olderTeamGame(team: 'youth' | 'seniors'): GameReview {
  if (team === 'youth') return { ...CLUB_GAME, big: '2–2', title: 'Drew at home with Tealside Town', detail: 'U16 Ollie · Sat 30 May · Theo and Leo scored' }
  return {
    ...CLUB_GAME, big: '2–0', title: 'Won at home v Glenview Park', detail: 'Men’s 1sts · Sat 30 May · Harry and Mo scored',
    measures: CLUB_GAME.measures.filter(m => m.name !== 'Minutes shared evenly'),
    people: CLUB_GAME.people.map(p => p.mark === 'LM' ? { ...p, line: '27 minutes off the bench. Fresh for Saturday', tone: 'good' as const } : p),
  }
}
