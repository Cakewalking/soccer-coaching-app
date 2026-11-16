// Formation builder data — shapes (per cent of pitch, other team's goal at top),
// team rosters and checks. From the formation-v1 design handover (16 Nov 2026).

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

// ── U12 Sam · juniors ──
const JUNIOR: TeamCfg = {
  key: 'juniors', side: 9, teamLabel: 'U12 Sam · Wattle Creek',
  game: 'Sat 6 June · v Harbour Rovers', gameTarget: 'FB1l-FormationSaved',
  meta: '9 a side · 14 of 16 can play · saved 2 minutes ago',
  parts: [{ label: 'First half' }, { label: 'Second half' }],
  defaultShape: '3-3-2',
  start: ['p1', 'p2', 'p4', 'p3', 'p8', 'p6', 'p7', 'p9', 'p10'],
  roster: [
    { id: 'p1', num: 1, first: 'Ruby', full: 'Ruby Shaw', positions: ['GK'], available: true, note: 'Available' },
    { id: 'p2', num: 2, first: 'Grace', full: 'Grace Oni', positions: ['LB'], available: true, note: 'Available' },
    { id: 'p4', num: 4, first: 'Leo', full: 'Leo Marsh', positions: ['CB'], captain: true, available: true, note: 'Available' },
    { id: 'p3', num: 3, first: 'Sam D', full: 'Sam Dale', positions: ['RB'], available: true, note: 'Available' },
    { id: 'p8', num: 8, first: 'Mia', full: 'Mia Tran', positions: ['LM'], available: true, note: 'Available' },
    { id: 'p6', num: 6, first: 'Noah', full: 'Noah Okafor', positions: ['CM'], note: 'Available', pitchNote: 'First half only', available: true },
    { id: 'p7', num: 7, first: 'Harper', full: 'Harper Quinn', positions: ['RM'], available: true, note: 'Available' },
    { id: 'p9', num: 9, first: 'Jai', full: 'Jai Patel', positions: ['ST'], available: true, note: 'Available' },
    { id: 'p10', num: 10, first: 'Zoe', full: 'Zoe Hart', positions: ['ST'], available: true, note: 'Available' },
    { id: 'p11', num: 11, first: 'Finn', full: 'Finn Noble', positions: ['RM', 'CM'], note: 'Owed 25 minutes', available: true },
    { id: 'p5', num: 5, first: 'Isla', full: 'Isla Byrne', positions: ['LB', 'LM'], note: 'Available', available: true },
    { id: 'p12', num: 12, first: 'Ella', full: 'Ella Brooks', positions: ['ST'], note: 'Available', available: true },
    { id: 'p13', num: 13, first: 'Kofi', full: 'Kofi Mensah', positions: ['CB'], note: 'Has played CB twice', available: true },
    { id: 'p14', num: 14, first: 'Ben', full: 'Ben Carter', positions: ['GK', 'CB'], note: 'Available', available: true },
    { id: 'p15', num: 15, first: 'Lucy', full: 'Lucy Vale', positions: ['CM'], available: false, reason: 'Away' },
    { id: 'p16', num: 16, first: 'Max', full: 'Max Ito', positions: ['RB'], available: false, reason: 'Knee: back next week' },
  ],
  checks: [
    { ok: true, subject: 'Second half:', rest: 'all five on the bench come on. Everyone gets half a game or more.' },
    { ok: false, subject: 'Noah:', rest: 'sprints are capped this week. First half only.' },
    { ok: true, subject: 'Ruby', rest: 'is in goal for both halves. Ben has gloves if you want to share it.' },
  ],
  benchHeader: 'Bench', posStyle: 'full',
}

// ── Men's 1sts · seniors ──
const SENIORS: TeamCfg = {
  key: 'seniors', side: 11, teamLabel: "Men's 1sts",
  game: 'Sat 6 June · v Banksia Park SC', gameTarget: 'FB1l-FormationSaved',
  meta: '11 a side · 18 fit, 1 suspended · saved 2 minutes ago',
  parts: [],
  defaultShape: '4-3-3',
  start: ['s1', 's3', 's5', 's4', 's2', 's8', 's6', 's10', 's11', 's9', null],
  roster: [
    { id: 's1', num: 1, first: 'Jack', full: 'Jack Reid', positions: ['GK'], available: true, note: 'Available' },
    { id: 's3', num: 3, first: 'Tyler', full: 'Tyler Boyd', positions: ['LB'], available: true, note: 'Available' },
    { id: 's5', num: 5, first: 'Dev', full: 'Dev Sharma', positions: ['CB'], captain: true, available: true, note: 'Available' },
    { id: 's4', num: 4, first: 'Reza', full: 'Reza Karimi', positions: ['CB'], available: true, note: 'Available' },
    { id: 's2', num: 2, first: 'Hugo', full: 'Hugo Lane', positions: ['RB'], available: true, note: 'Available' },
    { id: 's8', num: 8, first: 'Theo', full: 'Theo Walsh', positions: ['CM'], available: true, note: 'Sprints capped in training' },
    { id: 's6', num: 6, first: 'Sione', full: 'Sione Tui', positions: ['DM'], available: true, note: 'Available' },
    { id: 's10', num: 10, first: 'Luca', full: 'Luca Romano', positions: ['CM'], available: true, note: 'Available' },
    { id: 's11', num: 11, first: 'Nate', full: 'Nate Price', positions: ['LW'], available: true, note: 'Available' },
    { id: 's9', num: 9, first: 'Cal', full: 'Cal Webb', positions: ['ST'], available: true, note: 'Available' },
    { id: 's7', num: 7, first: 'Eli', full: 'Eli Moss', positions: ['RW', 'ST'], note: 'Scored off the bench twice', available: true },
    { id: 's14', num: 14, first: 'Marcus', full: 'Marcus Adeyemi', positions: ['RW', 'RB'], note: 'Available', available: true },
    { id: 's16', num: 16, first: 'Ollie', full: 'Ollie Brandt', positions: ['CM'], note: 'Available', available: true },
    { id: 's15', num: 15, first: 'Pat', full: 'Pat Nguyen', positions: ['CB', 'LB'], note: 'Available', available: true },
    { id: 's12', num: 12, first: 'Will', full: 'Will Sato', positions: ['GK'], note: 'Available', available: true },
    { id: 's17', num: 17, first: 'Ryan', full: 'Ryan Cole', positions: ['CM'], available: false, reason: 'Suspended: 1 game' },
  ],
  checks: [
    { ok: false, subject: 'Right wing', rest: 'is empty. Eli and Marcus have both played there.' },
    { ok: true, subject: 'Theo and Dev:', rest: 'sprints capped in training, fine to start.' },
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

export const TEAMS: Record<string, TeamCfg> = {
  juniors: JUNIOR, seniors: SENIORS, youth: SENIORS, miniroos: MINIROOS,
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
