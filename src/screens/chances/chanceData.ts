// Chances and points (chance-metrics-v2). The demo's numbers for each team, and
// the sums every screen reads, so xG − xGA = xGD and a season total equals the
// games shown, wherever they appear.
//
// Chance values are per age group and format. These are made-up demo values:
// nothing here is a tuned model.

import type { Age } from '../capture/captureStore'

export type TeamId = 'u12' | 'u16' | 'seniors' | 'u9'

/** One shot. x, y are on the 710 × 362 pitch drawing; v is the chance value (0 to 1). */
export interface Shot { x: number; y: number; v: number; goal?: boolean }
export interface BestChance { min: string; who: string; goal?: boolean; what: string; odds: string }
export interface Game { label: string; made: number; given: number; film: boolean }
export interface LadderRow { team: string; played: number; points: number; opp: number; you?: boolean }

export interface TeamChances {
  id: TeamId; name: string; band: Age; format: string; ageWord: string
  /** Sunday's game, the one with a shot map. */
  sat: { line: string; result?: string; scored: number; ours: Shot[]; theirs: Shot[]; theirGoals: number; best: BestChance[]; setUp: { who: string; n: number; what: string; v: number }[]; how: { t: string; d: string; n: number }[] }
  noFilm: { line: string }
  games: Game[]                       // league games with film, in order
  seasonLine: string
  goalsFor: number; goalsAgainst: number
  division?: string; ladder?: LadderRow[]
  toPlay?: { left: number; oppAvg: number; next: string; nextSub: string }
  /** MiniRoos: what to say under the difference, where a goal difference would go. */
  diffNote?: string
  reading: { before: string; bold: string; after: string }
  threat: { head: string; says: string; bold: string; moves: { min: string; who: string; what: string }[] }
}

const one = (n: number) => Math.round(n * 10) / 10
export const fmt1 = (n: number) => one(n).toFixed(1)
export const signed = (n: number, dp = 1) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(dp)}`
export const sum = (a: number[]) => one(a.reduce((x, y) => x + y, 0))

/** Totals for a set of shots, to one decimal place. */
export const worth = (shots: Shot[]) => sum(shots.map(s => s.v))

// ── Points, weighted by who you played ───────────────────────────────────────
// PPI = points a game × the mean points a game of the opponents played so far.
export const ppg = (r: LadderRow) => r.points / r.played
// Worked from the two figures as shown (to two places), so the table can be checked by hand.
const two = (n: number) => Math.round(n * 100) / 100
export const ppi = (r: LadderRow) => two(two(ppg(r)) * r.opp)
export interface Ranked extends LadderRow { pos: number; ppg: number; ppi: number; onPpi: number; move: number }
export function rankLadder(rows: LadderRow[]): Ranked[] {
  const byPpi = [...rows].sort((a, b) => ppi(b) - ppi(a))
  return rows.map((r, i) => { const onPpi = byPpi.indexOf(r) + 1; return { ...r, pos: i + 1, ppg: ppg(r), ppi: ppi(r), onPpi, move: i + 1 - onPpi } })
}
export const ordinal = (n: number) => `${n}${n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th'}`

// ── U12 Sam: the designed boards (XG1 to XG4) ────────────────────────────────
const U12: TeamChances = {
  id: 'u12', name: 'U12 Sam', band: 'juniors', format: '9 v 9', ageWord: 'under-12',
  sat: {
    line: 'Sun 7 June · v Harbour Rovers', result: 'won 3–1', scored: 3, theirGoals: 1,
    ours: [
      { x: 641.4, y: 183.0, v: 0.50, goal: true }, { x: 621.4, y: 158.5, v: 0.33, goal: true }, { x: 568.1, y: 207.5, v: 0.13, goal: true },
      { x: 654.7, y: 201.4, v: 0.40 }, { x: 554.8, y: 121.8, v: 0.06 }, { x: 528.2, y: 189.1, v: 0.07 }, { x: 594.8, y: 244.2, v: 0.09 },
      { x: 501.5, y: 164.6, v: 0.03 }, { x: 608.1, y: 134.0, v: 0.22 }, { x: 541.5, y: 225.8, v: 0.05 }, { x: 581.4, y: 173.8, v: 0.22 },
    ],
    theirs: [
      { x: 88.6, y: 189.1, v: 0.31, goal: true }, { x: 141.9, y: 152.4, v: 0.13 }, { x: 168.5, y: 213.6, v: 0.09 },
      { x: 115.2, y: 121.8, v: 0.14 }, { x: 195.2, y: 183.0, v: 0.06 }, { x: 155.2, y: 238.1, v: 0.07 },
    ],
    best: [
      { min: '12’', who: 'Noah Okafor', goal: true, what: 'Six metres out, in front of goal', odds: '1 in 2' },
      { min: '27’', who: 'Jai Patel', what: 'One on one, shot saved', odds: '2 in 5' },
      { min: '31’', who: 'Mia Tran', goal: true, what: 'Cut-back, first time', odds: '1 in 3' },
      { min: '44’', who: 'Zoe Hart', goal: true, what: 'From the edge of the box', odds: '1 in 8' },
    ],
    setUp: [
      { who: 'Harper Quinn', n: 3, what: 'The pass before Noah’s and Mia’s goals', v: 0.9 },
      { who: 'Mia Tran', n: 2, what: 'Both from the left', v: 0.6 },
      { who: 'Leo Marsh', n: 2, what: 'Long passes from the back', v: 0.3 },
    ],
    how: [
      { t: 'From wide, then a cut-back', d: 'Tuesday’s session', n: 5 },
      { t: 'Winning it back near their goal', d: 'Pressing together', n: 4 },
      { t: 'Through the middle', d: 'Passing forward early', n: 2 },
    ],
  },
  noFilm: { line: 'Wed 27 May · friendly v Ridgeway FC · drew 1–1' },
  games: [[1.2, 1.6], [1.6, 1.4], [0.9, 1.7], [1.8, 1.1], [1.5, 1.2], [1.7, 0.9], [1.9, 1.0], [2.1, 0.8]].map(([made, given], i) => ({ label: `R${i + 1}`, made, given, film: true })),
  seasonLine: '8 league games, all filmed', goalsFor: 14, goalsAgainst: 9,
  division: 'Under 12 Division 2',
  ladder: [
    { team: 'Bayside United', played: 8, points: 19, opp: 1.20 }, { team: 'Wattle Creek', played: 8, points: 15, opp: 1.31, you: true },
    { team: 'Northgate City', played: 8, points: 15, opp: 1.12 }, { team: 'Harbour Rovers', played: 8, points: 13, opp: 1.35 },
    { team: 'Ridgeway FC', played: 8, points: 10, opp: 1.42 }, { team: 'Eastfield Lions', played: 8, points: 8, opp: 1.38 },
    { team: 'Plenty Vale', played: 8, points: 6, opp: 1.45 }, { team: 'Stony Point', played: 8, points: 3, opp: 1.51 },
  ],
  toPlay: { left: 6, oppAvg: 1.21, next: 'Bayside United', nextSub: 'Sun 14 June, away' },
  reading: { before: 'About level with your opponents in rounds 1 to 4. Since then you have made ', bold: '0.8 of a goal more', after: ' in chances than you gave up, every game. Your goals and your chances agree, so the results are not luck.' },
  threat: {
    head: 'Your danger is built down the left',
    says: 'Most of the passes and runs that make you dangerous start on the left in the final third. The right side adds little after halfway. That matches what you set as your style: ', bold: 'play out wide, then cut back.',
    moves: [
      { min: '31’', who: 'Harper to Mia', what: 'Pass inside the full-back, left side' },
      { min: '12’', who: 'Leo to Harper', what: 'Long pass from the back to the left wing' },
      { min: '44’', who: 'Mia’s run', what: 'Carried the ball 20 metres into the box' },
    ],
  },
}

// ── U9 Tom: MiniRoos, 7 v 7 (XGm1, XGm2). No result, no ladder, no names. ────
const U9: TeamChances = {
  id: 'u9', name: 'U9 Tom', band: 'u8', format: '7 v 7', ageWord: 'under-9',
  sat: {
    line: 'U9 Tom · Sun 7 June · v Ironbark Rangers · 7 v 7', scored: 3, theirGoals: 1,
    ours: [
      { x: 634.7, y: 183.0, v: 0.50, goal: true }, { x: 608.1, y: 152.4, v: 0.40, goal: true }, { x: 648.0, y: 207.5, v: 0.40 },
      { x: 581.4, y: 219.7, v: 0.21, goal: true }, { x: 554.8, y: 134.0, v: 0.14 }, { x: 594.8, y: 170.8, v: 0.35 },
      { x: 528.2, y: 195.2, v: 0.10 }, { x: 621.4, y: 238.1, v: 0.25 }, { x: 568.1, y: 164.6, v: 0.25 },
    ],
    theirs: [{ x: 88.6, y: 183.0, v: 0.42, goal: true }, { x: 128.6, y: 146.3, v: 0.22 }, { x: 155.2, y: 219.7, v: 0.16 }, { x: 181.8, y: 176.9, v: 0.12 }, { x: 115.2, y: 232.0, v: 0.18 }],
    best: [
      { min: '8’', who: 'Cut-back from the left', what: 'First-time shot, close in', odds: '1 in 2' },
      { min: '19’', who: 'Won it back high', what: 'Shot from the edge', odds: '2 in 5' },
      { min: '26’', who: 'Pass through the middle', what: 'One on one', odds: '2 in 5' },
    ],
    setUp: [],
    how: [
      { t: 'From wide, then a cut-back', d: 'Tuesday’s session', n: 4 },
      { t: 'Through the middle', d: 'Passing forward early', n: 3 },
      { t: 'Winning it back near their goal', d: 'Pressing together', n: 2 },
    ],
  },
  noFilm: { line: 'U9 Tom · Sun 31 May · v Banksia Park · 7 v 7' },
  games: [[1.4, 1.8], [1.9, 1.5], [1.6, 1.7], [2.2, 1.2], [2.0, 1.4], [2.6, 1.1]].map(([made, given], i) => ({ label: `Game ${i + 1}`, made, given, film: true })),
  seasonLine: '6 games with film', goalsFor: 0, goalsAgainst: 0, diffNote: 'Growing since game 3',
  reading: { before: 'The team is making more chances and giving up fewer than at the start of the season. That is ', bold: 'learning you can see', after: ', whatever the scores were. Use it to choose what to practise, not to judge a child.' },
  threat: {
    head: 'Your danger is built down the left',
    says: 'Most of the passes and runs that make the team dangerous start on the left, near the other goal. The right side adds little after halfway. That fits what you have been practising: ', bold: 'go wide, then cut it back.',
    moves: [
      { min: '8’', who: 'Pass down the left', what: 'Inside the defender, then a cut-back' },
      { min: '19’', who: 'Won it back high', what: 'Two pressed together near their goal' },
      { min: '26’', who: 'Run through the middle', what: 'Carried the ball into the area' },
    ],
  },
}

// ── U16 and Seniors: same screens, their own totals (they match XG5). ────────
// Shot maps reuse the drawing positions with values scaled to each game's totals.
const scale = (shots: Shot[], total: number, goals: number): Shot[] => {
  const base = shots.reduce((a, s) => a + s.v, 0)
  const out = shots.map((s, i) => ({ ...s, v: Math.round((s.v / base) * total * 100) / 100, goal: i < goals }))
  out[0].v = Math.round((out[0].v + total - out.reduce((a, s) => a + s.v, 0)) * 100) / 100   // keep the total exact
  return out
}
const U16: TeamChances = {
  ...U12, id: 'u16', name: 'U16 Ollie', band: 'youth', format: '11 v 11', ageWord: 'under-16',
  sat: { ...U12.sat, line: 'Sun 31 May · v Tealside Town', result: 'drew 2–2', scored: 2, theirGoals: 2, ours: scale(U12.sat.ours, 2.1, 2), theirs: scale(U12.sat.theirs, 1.6, 2) },
  noFilm: { line: 'Wed 20 May · friendly v Banksia Park · won 2–1' },
  games: [[1.3, 1.5], [1.2, 1.4], [1.6, 1.2], [1.5, 1.6], [1.8, 1.3], [1.6, 1.2], [1.8, 1.5], [2.1, 1.6]].map(([made, given], i) => ({ label: `R${i + 1}`, made, given, film: true })),
  goalsFor: 13, goalsAgainst: 12, division: 'Under 16 Division 1',
  ladder: [
    { team: 'Glenview Park', played: 8, points: 20, opp: 1.22 }, { team: 'Tealside Town', played: 8, points: 17, opp: 1.30 },
    { team: 'Harbour Rovers', played: 8, points: 14, opp: 1.26 }, { team: 'Northgate City', played: 8, points: 13, opp: 1.31 },
    { team: 'Wattle Creek', played: 8, points: 11, opp: 1.39, you: true }, { team: 'Bayside United', played: 8, points: 11, opp: 1.29 },
    { team: 'Ridgeway FC', played: 8, points: 9, opp: 1.38 }, { team: 'Eastfield Lions', played: 8, points: 7, opp: 1.41 },
    { team: 'Plenty Vale', played: 8, points: 5, opp: 1.44 }, { team: 'Stony Point', played: 8, points: 3, opp: 1.47 },
  ],
  toPlay: { left: 10, oppAvg: 1.33, next: 'Glenview Park', nextSub: 'Sun 7 June, home' },
  reading: { before: 'Over 8 games you have made ', bold: '0.2 of a goal more', after: ' in chances than you gave up, a game. That is inside the usual swing, so read it as about level.' },
}
const SENIORS: TeamChances = {
  ...U12, id: 'seniors', name: 'Men’s 1sts', band: 'seniors', format: '11 v 11', ageWord: 'senior',
  sat: { ...U12.sat, line: 'Sat 30 May · v Glenview Park', result: 'won 2–0', scored: 2, theirGoals: 0, ours: scale(U12.sat.ours, 1.8, 2), theirs: scale(U12.sat.theirs, 0.7, 0) },
  noFilm: { line: 'Tue 26 May · friendly v Banksia Park SC · lost 1–2' },
  games: [[1.4, 1.3], [1.6, 1.2], [1.2, 1.4], [1.9, 1.0], [1.7, 1.1], [2.0, 0.9], [1.6, 1.2], [1.8, 0.8], [1.8, 0.7]].map(([made, given], i) => ({ label: `R${i + 1}`, made, given, film: true })),
  goalsFor: 17, goalsAgainst: 10, division: 'State League 3',
  ladder: [
    { team: 'Harbour Rovers', played: 9, points: 22, opp: 1.18 }, { team: 'Wattle Creek', played: 9, points: 19, opp: 1.285, you: true },
    { team: 'Glenview Park', played: 9, points: 18, opp: 1.24 }, { team: 'Banksia Park SC', played: 9, points: 16, opp: 1.30 },
    { team: 'Northgate City', played: 9, points: 14, opp: 1.33 }, { team: 'Tealside Town', played: 9, points: 13, opp: 1.31 },
    { team: 'Bayside United', played: 9, points: 12, opp: 1.36 }, { team: 'Ridgeway FC', played: 9, points: 11, opp: 1.38 },
    { team: 'Eastfield Lions', played: 9, points: 9, opp: 1.40 }, { team: 'Ironbark United', played: 9, points: 8, opp: 1.42 },
    { team: 'Plenty Vale', played: 9, points: 5, opp: 1.45 }, { team: 'Stony Point', played: 9, points: 3, opp: 1.49 },
  ],
  toPlay: { left: 13, oppAvg: 1.27, next: 'Banksia Park SC', nextSub: 'Sat 6 June, away' },
  reading: { before: 'Over 9 games you have made ', bold: '0.6 of a goal more', after: ' in chances than you gave up, a game. Your goals and your chances agree, so the results are not luck.' },
}

export const CHANCES: Record<TeamId, TeamChances> = { u12: U12, u16: U16, seniors: SENIORS, u9: U9 }

const UNNAMED: BestChance[] = [
  { min: '14’', who: 'Cut-back from the left', what: 'First-time shot, close in', odds: '1 in 2' },
  { min: '29’', who: 'Won it back high', what: 'Shot from the edge', odds: '2 in 5' },
  { min: '41’', who: 'Pass through the middle', what: 'One on one', odds: '1 in 3' },
]
/** A team that is only a row on the director's table: season numbers built from that row, no names. */
export function fromRow(r: ClubRow): TeamChances {
  const n = r.games, base = 1.5
  // a gentle spread around the row's difference a game; the last game carries the rounding so the total is exact
  const made = Array.from({ length: n }, (_, i) => one(base + r.xgd / 2 + ((i % 3) - 1) * 0.2))
  const given = Array.from({ length: n }, (_, i) => one(base - r.xgd / 2 + (((i + 1) % 3) - 1) * 0.2))
  made[n - 1] = one(made[n - 1] + (one(r.xgd * n) - (sum(made) - sum(given))))
  const mini = r.ppi === undefined
  let ladder: LadderRow[] | undefined
  if (!mini && r.ladder) {
    const [posWord, , ofWord] = r.ladder.split(' '), pos = parseInt(posWord), of = parseInt(ofWord)
    const points = Math.max(1, Math.round((r.ppi! / 1.3) * n))
    const NAMES = ['Glenview Park', 'Harbour Rovers', 'Tealside Town', 'Northgate City', 'Bayside United', 'Ridgeway FC', 'Eastfield Lions', 'Ironbark United', 'Plenty Vale', 'Stony Point', 'Banksia Park SC']
    ladder = Array.from({ length: of }, (_, i) => i + 1 === pos
      ? { team: 'Wattle Creek', played: n, points, opp: r.ppi! / (Math.round((points / n) * 100) / 100), you: true }
      : { team: NAMES[i < pos ? i : i - 1], played: n, points: Math.max(0, points + (pos - 1 - i) * 2 + (i < pos - 1 ? 1 : -1)), opp: 1.3 })
  }
  return {
    ...U12, id: 'u12', name: r.team, band: r.band, format: r.band === 'u8' ? '7 v 7' : r.band === 'u10' || r.band === 'juniors' ? '9 v 9' : '11 v 11', ageWord: r.team.toLowerCase().replace(/^u(\d+).*/, 'under-$1'),
    sat: { ...U12.sat, line: mini ? `${r.team} · Sunday · ${r.sub.replace('MiniRoos · ', '')}` : 'Sunday’s game', result: undefined, scored: 2, theirGoals: 1, ours: scale(U12.sat.ours, made[n - 1], 2), theirs: scale(U12.sat.theirs, given[n - 1], 1), best: UNNAMED, setUp: [] },
    noFilm: { line: `${r.team} · a game with no film` },
    games: made.map((m, i) => ({ label: mini ? `Game ${i + 1}` : `R${i + 1}`, made: m, given: given[i], film: true })),
    seasonLine: mini ? `${n} games with film` : `${n} league games with film`,
    goalsFor: 10 + Math.max(0, r.goalDiff ?? 0), goalsAgainst: 10 - Math.min(0, r.goalDiff ?? 0), division: mini ? undefined : r.sub.split(' · ')[0], ladder, toPlay: undefined,
    reading: { before: `Over ${n} games this team has made `, bold: `${Math.abs(r.xgd).toFixed(1)} of a goal ${r.xgd >= 0 ? 'more' : 'less'}`, after: ' in chances than it gave up, a game. Compare it with its own earlier games, not with other age groups.' },
  }
}

/** Season totals: only games with film. A game without film is skipped, never filled in. */
export function season(t: TeamChances) {
  const g = t.games.filter(x => x.film)
  const xg = sum(g.map(x => x.made)), xga = sum(g.map(x => x.given))
  const row = t.ladder ? rankLadder(t.ladder).find(r => r.you) : undefined
  return { games: g.length, xg, xga, xgd: one(xg - xga), perGame: one((xg - xga) / g.length), goalDiff: t.goalsFor - t.goalsAgainst, row, of: t.ladder?.length }
}
export const satGame = (t: TeamChances) => { const xg = worth(t.sat.ours), xga = worth(t.sat.theirs); return { xg, xga, xgd: one(xg - xga) } }

/** "about 2 goals": a total, said as goals. */
export const aboutGoals = (n: number) => { const r = Math.round(n); return `about ${r} ${r === 1 ? 'goal' : 'goals'}` }

// The threat map: 12 columns (own goal to their goal) × 8 rows (left side at the top).
export const THREAT: number[][] = [
  [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], [0.05, 0.05, 0.05, 0.05, 0.05, 0.06, 0.06, 0.06], [0.06, 0.06, 0.06, 0.06, 0.07, 0.09, 0.10, 0.08],
  [0.06, 0.07, 0.07, 0.08, 0.09, 0.13, 0.16, 0.12], [0.08, 0.10, 0.10, 0.10, 0.12, 0.16, 0.20, 0.15], [0.12, 0.17, 0.15, 0.14, 0.14, 0.17, 0.20, 0.15],
  [0.20, 0.30, 0.24, 0.19, 0.18, 0.18, 0.17, 0.14], [0.30, 0.47, 0.36, 0.25, 0.22, 0.20, 0.17, 0.14], [0.37, 0.58, 0.44, 0.31, 0.28, 0.24, 0.20, 0.16],
  [0.36, 0.56, 0.46, 0.37, 0.35, 0.30, 0.25, 0.19], [0.32, 0.47, 0.45, 0.44, 0.42, 0.36, 0.30, 0.23], [0.31, 0.42, 0.47, 0.52, 0.51, 0.43, 0.35, 0.28],
]

// Teams carry the club's own names: the age group and the coach's first name.
// ── The director's table (XG5). Rows for the four teams above are worked out from their games. ──
export interface ClubRow { team: string; sub: string; band: Age; id?: TeamId; games: number; xgd: number; goalDiff?: number; ppi?: number; ladder?: string; note?: string }
const fromTeam = (t: TeamChances, team: string, sub: string): ClubRow => { const s = season(t); return { team, sub, band: t.band, id: t.id, games: s.games, xgd: s.perGame, goalDiff: t.ladder ? s.goalDiff : undefined, ppi: s.row?.ppi, ladder: s.row ? `${ordinal(s.row.pos)} of ${s.of}` : undefined } }
export const CLUB_ROWS: ClubRow[] = [
  fromTeam(SENIORS, 'Men’s 1sts', 'State League 3'),
  fromTeam(U16, 'U16 Ollie', 'Division 1'),
  { team: 'U15 Girls Bec', sub: 'Division 2', band: 'youth', games: 8, xgd: 0.9, goalDiff: 11, ppi: 3.02, ladder: '1st of 8' },
  { team: 'U14 Josh', sub: 'Division 3', band: 'youth', games: 7, xgd: -0.4, goalDiff: -5, ppi: 1.21, ladder: '6th of 8' },
  { team: 'U13 Chris', sub: 'Division 2', band: 'juniors', games: 8, xgd: -0.1, goalDiff: 2, ppi: 1.84, ladder: '4th of 10', note: 'Results ahead of chances' },
  fromTeam(U12, 'U12 Sam', 'Division 2'),
  { team: 'U11 Luke', sub: 'MiniRoos · 9 v 9', band: 'u10', games: 7, xgd: 0.3 },
  { team: 'U10 Nadia', sub: 'MiniRoos · 9 v 9', band: 'u10', games: 6, xgd: -0.2 },
  fromTeam(U9, 'U9 Tom', 'MiniRoos · 7 v 7'),
]
