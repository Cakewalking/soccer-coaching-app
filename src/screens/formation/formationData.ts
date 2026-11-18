// Formation builder data — shapes (per cent of pitch, other team's goal at top),
// team rosters and checks. From the formation-v1 design handover (16 Nov 2026).

import { SQUAD_PLAYERS, SENIORS_SQUAD_PLAYERS, YOUTH_SQUAD_PLAYERS, type SquadPlayer } from '../../data'

export type Slot = { x: number; y: number; pos: string }
export type Shape = { name: string; slots: Slot[] }

const S = (x: number, y: number, pos: string): Slot => ({ x, y, pos })

export const SHAPES: Record<number, Shape[]> = {
  7: [
    { name: '2-3-1', slots: [S(50,88,'Goal'),S(30,66,'Back'),S(70,66,'Back'),S(20,42,'Mid'),S(50,46,'Mid'),S(80,42,'Mid'),S(50,20,'Front')] },
    { name: '3-2-1', slots: [S(50,88,'Goal'),S(20,71,'Back'),S(50,74,'Back'),S(80,71,'Back'),S(33,46,'Mid'),S(67,46,'Mid'),S(50,20,'Front')] },
    { name: '2-2-2', slots: [S(50,88,'Goal'),S(33,71,'Back'),S(67,71,'Back'),S(33,46,'Mid'),S(67,46,'Mid'),S(33,20,'Front'),S(67,20,'Front')] },
  ],
  9: [
    { name: '3-3-2', slots: [S(50,88,'GK'),S(20,68,'LB'),S(50,71,'CB'),S(80,68,'RB'),S(20,45,'LM'),S(50,48,'CM'),S(80,45,'RM'),S(35,22,'ST'),S(65,22,'ST')] },
    { name: '3-2-3', slots: [S(50,88,'GK'),S(20,71,'D'),S(50,74,'D'),S(80,71,'D'),S(33,46,'M'),S(67,46,'M'),S(20,20,'F'),S(50,23,'F'),S(80,20,'F')] },
    { name: '2-4-2', slots: [S(50,88,'GK'),S(33,71,'D'),S(67,71,'D'),S(14,46,'M'),S(38,48,'M'),S(62,48,'M'),S(86,46,'M'),S(33,20,'F'),S(67,20,'F')] },
    { name: '4-3-1', slots: [S(50,88,'GK'),S(14,71,'D'),S(38,74,'D'),S(62,74,'D'),S(86,71,'D'),S(20,46,'M'),S(50,48,'M'),S(80,46,'M'),S(50,20,'F')] },
  ],
  11: [
    { name: '4-3-3', slots: [S(50,90,'GK'),S(14,70,'LB'),S(38,74,'CB'),S(62,74,'CB'),S(86,70,'RB'),S(28,50,'CM'),S(50,55,'DM'),S(72,50,'CM'),S(16,26,'LW'),S(50,18,'ST'),S(84,26,'RW')] },
    { name: '4-4-2', slots: [S(50,88,'GK'),S(14,71,'D'),S(38,74,'D'),S(62,74,'D'),S(86,71,'D'),S(14,46,'M'),S(38,48,'M'),S(62,48,'M'),S(86,46,'M'),S(33,20,'F'),S(67,20,'F')] },
    { name: '4-2-3-1', slots: [S(50,88,'GK'),S(14,71,'D'),S(38,74,'D'),S(62,74,'D'),S(86,71,'D'),S(33,54,'M'),S(67,54,'M'),S(20,37,'M'),S(50,40,'M'),S(80,37,'M'),S(50,20,'F')] },
    { name: '3-5-2', slots: [S(50,88,'GK'),S(20,71,'D'),S(50,74,'D'),S(80,71,'D'),S(14,46,'M'),S(32,48,'M'),S(50,48,'M'),S(68,48,'M'),S(86,46,'M'),S(33,20,'F'),S(67,20,'F')] },
  ],
}

export type Player = {
  id: string
  num: number
  first: string          // first name shown on pitch
  full: string           // full name shown on bench
  positions: string[]    // positions they can play, e.g. ['RM','CM']
  captain?: boolean
  note?: string          // bench "why it matters" line (Available, Owed 25 minutes…)
  pitchNote?: string     // shown under the token on the pitch (First half only…)
  available: boolean
  reason?: string        // not-available reason
}

export type Check = { ok: boolean; subject: string; rest: string }

export type Part = { label: string }

export type TeamCfg = {
  key: 'juniors' | 'seniors' | 'miniroos' | 'youth'
  side: number
  teamLabel: string
  game: string
  gameTarget?: string
  meta: string           // "9 a side · 14 of 16 can play · saved 2 minutes ago"
  parts: Part[]          // [] = no parts (seniors)
  defaultShape: string
  // starting placement: array aligned to defaultShape slots; player id or null
  start: (string | null)[]
  roster: Player[]       // all players (placed + bench + unavailable)
  checks: Check[]
  benchHeader: string    // "Bench" / "Waiting for a turn"
  posStyle: 'full' | 'loose'  // loose = MiniRoos "ANYWHERE"
}

// Rosters are built from the squad lists in data.ts, so the names on the pitch
// are the names on Squad › Players. `set` adds what only this week knows.
type Extra = { num: number; positions: string[]; captain?: boolean; note?: string; pitchNote?: string; out?: string }
function fromSquad(prefix: string, squad: SquadPlayer[], set: Extra[]): Player[] {
  const firsts = squad.map(p => p.name.split(' ')[0])
  return squad.map((p, i) => {
    const e = set[i], first = firsts[i]
    return {
      id: `${prefix}${i}`, num: e.num, full: p.fullName,
      first: firsts.filter(f => f === first).length > 1 ? p.name.replace('.', '') : first,
      positions: e.positions, captain: e.captain, pitchNote: e.pitchNote,
      available: !e.out, reason: e.out, note: e.out ? undefined : e.note ?? 'Available',
    }
  })
}

// ── U12 Sam · juniors ──
const JUNIOR: TeamCfg = {
  key: 'juniors', side: 9, teamLabel: 'U12 Sam · Wattle Creek',
  game: 'Sat 6 June · v Harbour Rovers', gameTarget: 'FB1l-FormationSaved',
  meta: '9 a side · 15 of 17 can play · saved 2 minutes ago',
  parts: [{ label: 'First half' }, { label: 'Second half' }],
  defaultShape: '3-3-2',
  start: ['p0', 'p3', 'p2', 'p6', 'p7', 'p8', 'p10', 'p12', 'p13'],
  roster: fromSquad('p', SQUAD_PLAYERS, [
    { num: 1, positions: ['GK'] },                                           // Ava
    { num: 12, positions: ['GK'] },                                          // Tom
    { num: 4, positions: ['CB'], captain: true },                            // Leo
    { num: 5, positions: ['CB', 'LB'] },                                     // Grace
    { num: 2, positions: ['RB'], out: 'Away: family wedding' },              // Kai
    { num: 3, positions: ['LB'], note: 'No answer yet' },                    // Sam
    { num: 13, positions: ['RB'], note: 'Maybe: school concert' },           // Ruby
    { num: 8, positions: ['LM', 'CM'] },                                     // Mia
    { num: 6, positions: ['CM'] },                                           // Jai
    { num: 14, positions: ['CM'], note: 'Low check-ins this week' },         // Ella
    { num: 7, positions: ['RM', 'CM'] },                                     // Isla
    { num: 15, positions: ['LM', 'CM'] },                                    // Oscar
    { num: 9, positions: ['ST'], pitchNote: 'First half only' },             // Noah
    { num: 10, positions: ['ST', 'RM'] },                                    // Zoe
    { num: 11, positions: ['ST', 'LM'], note: 'Owed 25 minutes' },           // Finn
    { num: 16, positions: ['ST'], out: 'Sick: back next week' },             // Lily
    { num: 17, positions: ['ST'], note: 'New this term · no answer yet' },   // Harper
  ]),
  checks: [
    { ok: true, subject: 'Second half:', rest: 'all six on the bench come on. Everyone gets half a game or more.' },
    { ok: false, subject: 'Noah:', rest: 'sprints are capped this week. First half only.' },
    { ok: true, subject: 'Ava', rest: 'is in goal for both halves. Tom has gloves if you want to share it.' },
  ],
  benchHeader: 'Bench', posStyle: 'full',
}

// ── Men's 1sts · seniors ──
const SENIORS: TeamCfg = {
  key: 'seniors', side: 11, teamLabel: "Men's 1sts",
  game: 'Sat 6 June · v Banksia Park SC', gameTarget: 'FB1l-FormationSaved',
  meta: '11 a side · 16 fit, 1 suspended · saved 2 minutes ago',
  parts: [],
  defaultShape: '4-3-3',
  start: ['s0', 's5', 's2', 's3', 's4', 's7', 's9', 's8', 's12', 's13', null],
  roster: fromSquad('s', SENIORS_SQUAD_PLAYERS, [
    { num: 1, positions: ['GK'] },                                           // Ben
    { num: 12, positions: ['GK'] },                                          // Dean
    { num: 5, positions: ['CB'] },                                           // Luca
    { num: 4, positions: ['CB'], captain: true },                            // Josh
    { num: 2, positions: ['RB'], note: 'High load this week' },              // Marco
    { num: 3, positions: ['LB'] },                                           // Pete
    { num: 15, positions: ['CB'] },                                          // Sam
    { num: 8, positions: ['CM'], note: 'Every minute of the last 4' },       // Dan
    { num: 10, positions: ['CM'] },                                          // Tom
    { num: 6, positions: ['DM'] },                                           // Alex
    { num: 14, positions: ['CM', 'RW'], note: 'Tight hamstring' },           // Rico
    { num: 7, positions: ['RW'], note: 'Back from a knock' },                // Chris
    { num: 11, positions: ['LW'] },                                          // Mo
    { num: 9, positions: ['ST'] },                                           // Harry
    { num: 16, positions: ['CM'], out: 'Suspended: 1 game' },                // Ryan
    { num: 17, positions: ['RW'], note: 'Scored off the bench twice' },      // Eli
    { num: 18, positions: ['LW'] },                                          // Nate
  ]),
  checks: [
    { ok: false, subject: 'Right wing', rest: 'is empty. Chris and Eli have both played there.' },
    { ok: true, subject: 'Dan and Marco:', rest: 'high load this week, fine to start.' },
    { ok: true, subject: 'Banksia Park', rest: 'build out short. This shape presses their back three.' },
  ],
  benchHeader: 'Bench', posStyle: 'full',
}

// ── U9 Tom · MiniRoos ──
const MINIROOS: TeamCfg = {
  key: 'miniroos', side: 7, teamLabel: 'U9 Tom · Wattle Creek',
  game: 'Sat 6 June · at Northgate City', gameTarget: 'FB1l-FormationSaved',
  meta: '7 a side · 8 coming, 1 maybe, 1 away · quarters of 10 minutes',
  parts: [{ label: '1st' }, { label: '2nd' }, { label: '3rd' }, { label: '4th' }],
  defaultShape: '2-3-1',
  start: ['m2', 'm5', 'm7', 'm4', 'm9', 'm6', 'm8'],
  roster: [
    { id: 'm2', num: 2, first: 'Ivy', full: 'Ivy Chen', positions: ['Goal'], note: 'Available', pitchNote: 'First go in goal', available: true },
    { id: 'm5', num: 5, first: 'Max', full: 'Max Bailey', positions: ['Back'], available: true, note: 'Available' },
    { id: 'm7', num: 7, first: 'Leo', full: 'Leo Wright', positions: ['Back'], available: true, note: 'Available' },
    { id: 'm4', num: 4, first: 'Zara', full: 'Zara Moore', positions: ['Mid'], available: true, note: 'Available' },
    { id: 'm9', num: 9, first: 'Arlo', full: 'Arlo Kaur', positions: ['Mid'], available: true, note: 'Available' },
    { id: 'm6', num: 6, first: 'Evie', full: 'Evie Nolan', positions: ['Mid'], available: true, note: 'Available' },
    { id: 'm8', num: 8, first: 'Theo', full: 'Theo Santos', positions: ['Front'], available: true, note: 'Available' },
    { id: 'm3', num: 3, first: 'Poppy', full: 'Poppy Dunn', positions: ['Anywhere'], note: 'Maybe: school concert', available: true },
    { id: 'm10', num: 10, first: 'Jude', full: 'Jude Lim', positions: ['Anywhere'], note: 'No reply yet', available: true },
    { id: 'm11', num: 11, first: 'Omar', full: 'Omar Haddad', positions: ['Anywhere'], available: false, reason: 'Away' },
  ],
  checks: [
    { ok: true, subject: 'Turns:', rest: 'over four quarters, all 9 play at least two.' },
    { ok: true, subject: 'In goal:', rest: 'Ivy, then Max. Neither has had a turn in goal this term.' },
    { ok: true, subject: 'Poppy', rest: 'starts next to Zara in the 2nd quarter, from your note.' },
  ],
  benchHeader: 'Waiting for a turn', posStyle: 'loose',
}

// ── U16 Ollie · youth ──
const YOUTH: TeamCfg = {
  key: 'youth', side: 11, teamLabel: 'U16 Ollie',
  game: 'Sat 6 June · at Harbour Rovers', gameTarget: 'FB1l-FormationSaved',
  meta: '11 a side · 16 fit, 1 suspended · saved 2 minutes ago',
  parts: [],
  defaultShape: '4-3-3',
  start: ['y0', 'y4', null, 'y2', 'y3', 'y5', 'y7', 'y6', 'y10', 'y11', 'y9'],
  roster: fromSquad('y', YOUTH_SQUAD_PLAYERS, [
    { num: 1, positions: ['GK'] },                                           // Owen
    { num: 5, positions: ['CB'], out: 'Suspended: 1 game' },                 // Ryan
    { num: 4, positions: ['CB'], captain: true },                            // Jake
    { num: 2, positions: ['RB'] },                                           // Erin
    { num: 3, positions: ['LB'] },                                           // Nick
    { num: 8, positions: ['CM'] },                                           // Theo
    { num: 10, positions: ['CM'], note: 'Exam Friday' },                     // Cal
    { num: 6, positions: ['DM'] },                                           // Ivan
    { num: 14, positions: ['CM'] },                                          // Phil
    { num: 7, positions: ['RW'] },                                           // Ari
    { num: 11, positions: ['LW'], note: 'High load this week' },             // Luka
    { num: 9, positions: ['ST'] },                                           // Seb
    { num: 12, positions: ['GK'] },                                          // Marcus
    { num: 15, positions: ['CB'], note: 'Has covered centre back twice' },   // Hugo
    { num: 16, positions: ['CM'], note: 'Playing up from U15' },             // Tane
    { num: 17, positions: ['ST'] },                                          // Jonah
    { num: 18, positions: ['RW'] },                                          // Eddie
  ]),
  checks: [
    { ok: false, subject: 'Centre back', rest: 'is empty. Ryan is suspended this week. Hugo has covered there twice.' },
    { ok: true, subject: 'Luka:', rest: 'high load this week, fine to start. Watch the last 20 minutes.' },
    { ok: true, subject: 'Harbour Rovers', rest: 'play long. This shape keeps two in front of the centre backs.' },
  ],
  benchHeader: 'Bench', posStyle: 'full',
}

export const TEAMS: Record<string, TeamCfg> = {
  juniors: JUNIOR, seniors: SENIORS, youth: YOUTH, miniroos: MINIROOS,
}

export function shapesFor(side: number): Shape[] { return SHAPES[side] ?? SHAPES[9] }
export function shapeByName(side: number, name: string): Shape | undefined { return shapesFor(side).find(s => s.name === name) }

// Nearest-slot remap when switching shapes: keep players, assign each to the
// nearest free slot in the new shape (greedy by shortest distance).
export function remap(oldShape: Shape, newShape: Shape, placed: (string | null)[]): (string | null)[] {
  const result: (string | null)[] = new Array(newShape.slots.length).fill(null)
  const used = new Set<number>()
  // keeper (slot 0) always to slot 0
  if (placed[0]) { result[0] = placed[0]; used.add(0) }
  const rest: { pid: string; x: number; y: number }[] = []
  placed.forEach((pid, i) => { if (pid && i !== 0) rest.push({ pid, x: oldShape.slots[i].x, y: oldShape.slots[i].y }) })
  for (const r of rest) {
    let best = -1, bestD = Infinity
    newShape.slots.forEach((s, j) => {
      if (j === 0 || used.has(j)) return
      const d = (s.x - r.x) ** 2 + (s.y - r.y) ** 2
      if (d < bestD) { bestD = d; best = j }
    })
    if (best >= 0) { result[best] = r.pid; used.add(best) }
    // if no slot free (fewer spots), player drops to bench (omitted)
  }
  return result
}

// More shapes than the tabs show. Each is built from its name: a row for each number, back to front, with the keeper behind them.
export const MORE_SHAPES: Record<number, string[]> = { 7: ['3-1-2', '1-3-2', '3-2-1-0'].slice(0, 2), 9: ['3-4-1', '2-3-3', '4-2-2'], 11: ['4-1-4-1', '3-4-3', '5-3-2'] }
const ROW_POS: Record<string, string[][]> = {
  back: [[], ['CB'], ['CB', 'CB'], ['LB', 'CB', 'RB'], ['LB', 'CB', 'CB', 'RB'], ['LB', 'CB', 'CB', 'CB', 'RB']],
  mid: [[], ['CM'], ['CM', 'CM'], ['LM', 'CM', 'RM'], ['LM', 'CM', 'CM', 'RM'], ['LM', 'CM', 'CM', 'CM', 'RM']],
  front: [[], ['ST'], ['ST', 'ST'], ['LW', 'ST', 'RW'], ['LW', 'ST', 'ST', 'RW']],
}
export function lineShape(name: string): Shape {
  const rows = name.split('-').map(Number).filter(n => n > 0)
  const slots: Slot[] = [{ x: 50, y: 90, pos: 'GK' }]
  rows.forEach((n, r) => {
    const y = rows.length === 1 ? 45 : 72 - (r * (72 - 20)) / (rows.length - 1)
    const kind = r === 0 ? 'back' : r === rows.length - 1 ? 'front' : 'mid'
    const names = ROW_POS[kind][n] ?? Array.from({ length: n }, () => (kind === 'back' ? 'CB' : kind === 'mid' ? 'CM' : 'ST'))
    for (let k = 0; k < n; k++) slots.push({ x: n === 1 ? 50 : 16 + (k * 68) / (n - 1), y, pos: names[k] })
  })
  return { name, slots }
}
