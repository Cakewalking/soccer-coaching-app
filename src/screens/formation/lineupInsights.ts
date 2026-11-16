// Line-up insights — what worked, worked out from who was on the pitch and when.
//
// One log of "stints" (a stretch of a recorded game with one shape and one set of
// players) feeds everything: shapes compared, line-ups that worked, pairs that
// work, players by shape, and the hints in the Formation builder. Swap
// `recordedStints` for the real game log and every view follows.

import { TEAMS, shapesFor, shapeByName, remap, type TeamCfg, type Player, type Shape } from './formationData'

export type MetricKey = 'scored' | 'against' | 'ahead' | 'winback'

export const METRICS: { key: MetricKey; noun: string; label: string; short: string; tag: string; unit: string; lowerIsBetter: boolean }[] = [
  { key: 'scored',  noun: 'Goals scored a game', label: 'Most goals scored',          short: 'Scored',      tag: 'Scores most',   unit: 'goals a game',     lowerIsBetter: false },
  { key: 'against', noun: 'Goals let in a game', label: 'Fewest goals let in',        short: 'Let in',      tag: 'Lets in least', unit: 'let in a game',    lowerIsBetter: true },
  { key: 'ahead',   noun: 'Share of the time ahead', label: 'Longest time winning',       short: 'Time ahead',  tag: 'Leads longest', unit: 'of the time ahead', lowerIsBetter: false },
  { key: 'winback', noun: 'Seconds to win the ball back', label: 'Won the ball back fastest',  short: 'Win it back', tag: 'Wins it back fastest', unit: 'to win it back', lowerIsBetter: true },
]
export const metricOf = (k: MetricKey) => METRICS.find(m => m.key === k)!

export type Stint = {
  game: number; shape: string
  lineup: string[]        // player id per slot of the shape
  mins: number; gf: number; ga: number
  ahead: number           // minutes in front during the stint
  winback: number         // average seconds to win the ball back
}

export type Agg = { mins: number; gf: number; ga: number; ahead: number; wb: number; games: number[] }
const emptyAgg = (): Agg => ({ mins: 0, gf: 0, ga: 0, ahead: 0, wb: 0, games: [] })
function add(a: Agg, s: Stint) {
  a.mins += s.mins; a.gf += s.gf; a.ga += s.ga; a.ahead += s.ahead; a.wb += s.winback * s.mins
  if (!a.games.includes(s.game)) a.games.push(s.game)
}

export type ShapeStat = { shape: string; agg: Agg }
export type LineupStat = { shape: string; lineup: string[]; agg: Agg }
export type PairStat = {
  a: string; b: string
  together: Agg; apart: Agg
  posA: string; posB: string
  gain: Record<MetricKey, number>   // positive = better together than apart
}
export type PlayerShapeStat = { shape: string; agg: Agg; pos: string }
export type FormationPreset = { shape: string; placed: (string | null)[]; note: string }

export type Insights = {
  cfg: TeamCfg
  gameLen: number
  games: number
  usedShapes: string[]
  shapes: ShapeStat[]                       // every shape for this many players; mins 0 = not tried
  lineups: LineupStat[]
  pairs: PairStat[]
  byPlayer: Record<string, PlayerShapeStat[]>
  bestShape: Record<MetricKey, string>
  shapeTags: Record<string, MetricKey[]>    // which measures each shape leads on
}

// ── reading the numbers ──
export function value(a: Agg, k: MetricKey, gameLen: number): number {
  if (!a.mins) return NaN
  if (k === 'scored') return (a.gf / a.mins) * gameLen
  if (k === 'against') return (a.ga / a.mins) * gameLen
  if (k === 'ahead') return (a.ahead / a.mins) * 100
  return a.wb / a.mins
}
export function fmt(k: MetricKey, v: number): string {
  if (Number.isNaN(v)) return '–'
  if (k === 'ahead') return `${Math.round(v)}%`
  if (k === 'winback') return `${v.toFixed(1)} s`
  return v.toFixed(1)
}
const isBetter = (k: MetricKey, a: number, b: number) => metricOf(k).lowerIsBetter ? a < b : a > b
/** Enough minutes to say something: a full game's worth. */
export const enough = (a: Agg, gameLen: number) => a.mins >= gameLen
/** Thin: less than a game and a half. Shown, but marked. */
export const thin = (a: Agg, gameLen: number) => a.mins < gameLen * 1.5

// ── the recorded-game log (demo data, deterministic) ──
type Hidden = { a: string; b: string; kind: 'attack' | 'defence' | 'control' }
const PLAN: Record<string, { gameLen: number; used: string[]; seed: number; hidden: Hidden[] }> = {
  juniors: { gameLen: 60, used: ['3-3-2', '3-2-3', '4-3-1'], seed: 255,
    hidden: [{ a: 'p7', b: 'p8', kind: 'control' }, { a: 'p2', b: 'p3', kind: 'defence' }, { a: 'p12', b: 'p13', kind: 'attack' }] },
  seniors: { gameLen: 90, used: ['4-3-3', '4-4-2', '4-2-3-1'], seed: 95,
    hidden: [{ a: 's7', b: 's8', kind: 'control' }, { a: 's2', b: 's3', kind: 'defence' }, { a: 's12', b: 's13', kind: 'attack' }] },
  youth: { gameLen: 80, used: ['4-3-3', '4-4-2', '4-2-3-1'], seed: 114,
    hidden: [{ a: 'y5', b: 'y6', kind: 'control' }, { a: 'y1', b: 'y2', kind: 'defence' }, { a: 'y10', b: 'y11', kind: 'attack' }] },
}
// How each shape tends to play: attack, goals let in, seconds to win it back.
const SHAPE_FEEL: Record<string, [number, number, number]> = {
  '3-3-2': [1.0, 1.0, 1.0], '3-2-3': [1.5, 1.25, 0.84], '2-4-2': [1.1, 1.3, 0.9], '4-3-1': [0.7, 0.45, 1.12],
  '4-3-3': [1.4, 1.15, 0.84], '4-4-2': [1.0, 0.95, 1.0], '4-2-3-1': [0.95, 0.5, 0.94], '3-5-2': [1.15, 1.25, 0.9],
}

function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => { t += 0x6d2b79f5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296 }
}
function poisson(lambda: number, rng: () => number) { const L = Math.exp(-lambda); let k = 0, p = 1; do { k++; p *= rng() } while (p > L); return k - 1 }

type Band = 'G' | 'D' | 'M' | 'F'
const slotBand = (shape: Shape, i: number): Band => i === 0 ? 'G' : shape.slots[i].y > 60 ? 'D' : shape.slots[i].y > 32 ? 'M' : 'F'
const POS_BAND: Record<string, Band> = { GK: 'G', Goal: 'G', LB: 'D', CB: 'D', RB: 'D', D: 'D', Back: 'D', LM: 'M', CM: 'M', RM: 'M', DM: 'M', AM: 'M', M: 'M', Mid: 'M', ST: 'F', LW: 'F', RW: 'F', F: 'F', Front: 'F' }
const playerBand = (p: Player): Band => POS_BAND[p.positions[0]] ?? 'M'

function recordedStints(cfg: TeamCfg, plan: (typeof PLAN)[string]): Stint[] {
  const rng = mulberry32(plan.seed)
  const base = shapeByName(cfg.side, cfg.defaultShape)!
  // The usual starting side: this week's, with any gap filled by who usually plays there.
  const start = [...cfg.start]
  start.forEach((id, i) => {
    if (id) return
    const spare = cfg.roster.filter(p => !start.includes(p.id))
    start[i] = (spare.find(p => !p.available && playerBand(p) === slotBand(base, i)) ?? spare.find(p => playerBand(p) === slotBand(base, i)) ?? spare[0]).id
  })
  // Each shape has a first-choice side and two rotated sides.
  const sides: Record<string, string[][]> = {}
  for (const name of plan.used) {
    const shape = shapeByName(cfg.side, name)!
    const core = (name === base.name ? start : remap(base, shape, start)) as string[]
    const bench = cfg.roster.filter(p => !core.includes(p.id))
    const nSwap = Math.min(bench.length, bench.length >= 5 ? 3 : 2)
    const variants = [core]
    for (let v = 0; v < 2; v++) {
      const side = [...core]; const done = new Set<number>()
      const mixed = [...bench]
      for (let k = mixed.length - 1; k > 0; k--) { const r = Math.floor(rng() * (k + 1)); [mixed[k], mixed[r]] = [mixed[r], mixed[k]] }
      const pool = mixed.slice(0, nSwap)
      for (const p of pool) {
        const band = playerBand(p)
        let cands = side.map((_, i) => i).filter(i => !done.has(i) && slotBand(shape, i) === band)
        if (band === 'G' && rng() < 0.5) continue
        if (!cands.length) cands = side.map((_, i) => i).filter(i => i > 0 && !done.has(i))
        const i = cands[Math.floor(rng() * cands.length)]
        side[i] = p.id; done.add(i)
      }
      variants.push(side)
    }
    sides[name] = variants
  }
  const firstHalf = [0, 0, 1, 0, 1, 2, 1, 0, 2]
  const switchAtHalf: Record<number, number> = { 3: 2, 7: 1 }
  const turn: Record<string, number> = {}
  const out: Stint[] = []
  const half = plan.gameLen / 2
  for (let g = 0; g < firstHalf.length; g++) {
    let us = 0, them = 0
    for (let h = 0; h < 2; h++) {
      const name = plan.used[h === 1 && g in switchAtHalf ? switchAtHalf[g] : firstHalf[g]]
      const v = h === 0 ? 0 : 1 + ((turn[name] = (turn[name] ?? 0) + 1) % 2)
      const lineup = sides[name][v]
      const on = (h: Hidden) => lineup.includes(h.a) && lineup.includes(h.b)
      const [att, def, press] = SHAPE_FEEL[name] ?? [1, 1, 1]
      let lf = 0.6 * att, la = 0.75 * def, wb = 7 * press
      for (const hd of plan.hidden) {
        if (!on(hd)) continue
        if (hd.kind === 'attack') lf *= 1.4
        if (hd.kind === 'defence') la *= 0.55
        if (hd.kind === 'control') { wb *= 0.78; lf *= 1.2; la *= 0.85 }
      }
      const gf = poisson(lf, rng), ga = poisson(la, rng)
      const events = [...Array.from({ length: gf }, () => ({ t: rng() * half, us: true })), ...Array.from({ length: ga }, () => ({ t: rng() * half, us: false }))].sort((x, y) => x.t - y.t)
      let ahead = 0, last = 0
      for (const e of events) { if (us > them) ahead += e.t - last; last = e.t; if (e.us) us++; else them++ }
      if (us > them) ahead += half - last
      out.push({ game: g + 1, shape: name, lineup, mins: half, gf, ga, ahead: Math.round(ahead), winback: Math.round(wb * (0.93 + rng() * 0.14) * 10) / 10 })
    }
  }
  return out
}

// ── working it out ──
function analyse(cfg: TeamCfg, gameLen: number, stints: Stint[]): Insights {
  const shapes: ShapeStat[] = shapesFor(cfg.side).map(s => ({ shape: s.name, agg: emptyAgg() }))
  const lineupMap = new Map<string, LineupStat>()
  const byPlayerMap: Record<string, Record<string, { agg: Agg; pos: Record<string, number> }>> = {}
  for (const s of stints) {
    add(shapes.find(x => x.shape === s.shape)!.agg, s)
    const sig = `${s.shape}|${s.lineup.join(',')}`
    if (!lineupMap.has(sig)) lineupMap.set(sig, { shape: s.shape, lineup: s.lineup, agg: emptyAgg() })
    add(lineupMap.get(sig)!.agg, s)
    const shape = shapeByName(cfg.side, s.shape)!
    s.lineup.forEach((id, i) => {
      const cell = ((byPlayerMap[id] ??= {})[s.shape] ??= { agg: emptyAgg(), pos: {} })
      add(cell.agg, s); const pos = shape.slots[i].pos; cell.pos[pos] = (cell.pos[pos] ?? 0) + s.mins
    })
  }
  const top = (o: Record<string, number>) => Object.entries(o).sort((x, y) => y[1] - x[1])[0]?.[0] ?? ''
  const byPlayer: Insights['byPlayer'] = {}
  for (const [id, m] of Object.entries(byPlayerMap)) byPlayer[id] = Object.entries(m).map(([shape, c]) => ({ shape, agg: c.agg, pos: top(c.pos) }))

  const bestShape = {} as Record<MetricKey, string>
  const shapeTags: Record<string, MetricKey[]> = {}
  for (const m of METRICS) {
    const ok = shapes.filter(s => enough(s.agg, gameLen))
    const best = ok.reduce((b, s) => isBetter(m.key, value(s.agg, m.key, gameLen), value(b.agg, m.key, gameLen)) ? s : b, ok[0])
    bestShape[m.key] = best.shape; (shapeTags[best.shape] ??= []).push(m.key)
  }

  // Pairs: neighbours on the pitch, compared with the minutes when they were not both on.
  const ids = Object.keys(byPlayerMap)
  const found = new Map<string, { gap: number; pair: PairStat }>()
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
    const a = ids[i], b = ids[j]
    const together = emptyAgg(), apart = emptyAgg()
    const posA: Record<string, number> = {}, posB: Record<string, number> = {}
    let dist = 0, sig = ''
    for (const [n, s] of stints.entries()) {
      const ia = s.lineup.indexOf(a), ib = s.lineup.indexOf(b)
      if (ia < 0 || ib < 0) { add(apart, s); continue }
      if (ia === 0 || ib === 0) { dist = Infinity; break }   // the keeper is not half of a pair
      add(together, s); sig += `${n},`
      const sh = shapeByName(cfg.side, s.shape)!
      dist += Math.hypot(sh.slots[ia].x - sh.slots[ib].x, sh.slots[ia].y - sh.slots[ib].y) * s.mins
      posA[sh.slots[ia].pos] = (posA[sh.slots[ia].pos] ?? 0) + s.mins; posB[sh.slots[ib].pos] = (posB[sh.slots[ib].pos] ?? 0) + s.mins
    }
    if (together.mins < gameLen * 2 || apart.mins < gameLen || dist / together.mins > 36) continue
    const gain = {} as Record<MetricKey, number>
    for (const m of METRICS) { const d = value(together, m.key, gameLen) - value(apart, m.key, gameLen); gain[m.key] = m.lowerIsBetter ? -d : d }
    // Two pairs that shared exactly the same minutes cannot be told apart: keep the closer two.
    const same = found.get(sig), gap = dist / together.mins
    if (same && same.gap <= gap) continue
    found.set(sig, { gap, pair: { a, b, together, apart, posA: top(posA), posB: top(posB), gain } })
  }
  const pairs = [...found.values()].map(f => f.pair)
  return { cfg, gameLen, games: new Set(stints.map(s => s.game)).size, usedShapes: shapes.filter(s => s.agg.mins > 0).map(s => s.shape), shapes, lineups: [...lineupMap.values()], pairs, byPlayer, bestShape, shapeTags }
}

/** Where on the pitch a position label sits, in plain words. */
export function lineWord(pos: string): string { return ({ G: 'goal', D: 'back', M: 'midfield', F: 'front' } as const)[POS_BAND[pos] ?? 'M'] }

export function buildInsights(team: string, seed?: number): Insights | null {
  const plan = PLAN[team], cfg = TEAMS[team]
  return plan && cfg ? analyse(cfg, plan.gameLen, recordedStints(cfg, seed === undefined ? plan : { ...plan, seed })) : null
}

const cache: Record<string, Insights | null> = {}
/** Insights for a team, or null where they are not offered (MiniRoos and under 12s). */
export function getInsights(team: string): Insights | null {
  if (team in cache) return cache[team]
  return (cache[team] = buildInsights(team))
}

// ── questions the screens ask ──
const MIN_GAIN: Record<MetricKey, number> = { scored: 0.3, against: 0.3, ahead: 8, winback: 0.4 }

/** Pairs that did better together than apart on this measure, best first. */
export function pairsFor(ins: Insights, k: MetricKey, n = 4): PairStat[] {
  const out: PairStat[] = []
  for (const p of ins.pairs.filter(p => p.gain[k] >= MIN_GAIN[k]).sort((x, y) => y.gain[k] - x.gain[k])) {
    if (out.length < n && !out.some(o => [o.a, o.b].includes(p.a) || [o.a, o.b].includes(p.b))) out.push(p)
  }
  return out
}
/** The few pairs worth keeping together whatever you are after. */
export function keyPairs(ins: Insights, n = 3): PairStat[] {
  const score = (p: PairStat) => METRICS.reduce((t, m) => t + Math.max(0, p.gain[m.key]) / MIN_GAIN[m.key], 0)
  const out: PairStat[] = []
  for (const p of [...ins.pairs].sort((x, y) => score(y) - score(x))) {
    if (score(p) < 2 || out.length >= n) break
    if (!out.some(o => [o.a, o.b].includes(p.a) || [o.a, o.b].includes(p.b))) out.push(p)
  }
  return out
}
/** The line-up that did best on a measure — in one shape, or across all of them. */
export function bestLineup(ins: Insights, k: MetricKey, shape?: string): LineupStat | undefined {
  const all = ins.lineups.filter(l => !shape || l.shape === shape)
  // Prefer line-ups with a game and a half together; one hot half should not win.
  const solid = all.filter(l => !thin(l.agg, ins.gameLen)), ok = all.filter(l => enough(l.agg, ins.gameLen))
  const pool = solid.length ? solid : ok.length ? ok : [...all].sort((x, y) => y.agg.mins - x.agg.mins).slice(0, 1)
  return pool.reduce<LineupStat | undefined>((b, l) => !b || isBetter(k, value(l.agg, k, ins.gameLen), value(b.agg, k, ins.gameLen)) ? l : b, undefined)
}
/** A line-up made ready for this week: anyone who cannot play is swapped for whoever has played that spot most. */
export function forThisWeek(ins: Insights, l: LineupStat, label: string): FormationPreset & { swaps: { out: Player; in: Player; pos: string }[] } {
  const byId = Object.fromEntries(ins.cfg.roster.map(p => [p.id, p]))
  const shape = shapeByName(ins.cfg.side, l.shape)!
  const placed: (string | null)[] = [...l.lineup]
  const swaps: { out: Player; in: Player; pos: string }[] = []
  placed.forEach((id, i) => {
    if (!id || byId[id].available) return
    const free = ins.cfg.roster.filter(p => p.available && !placed.includes(p.id))
    const minsThere = (p: Player) => ins.byPlayer[p.id]?.filter(c => c.pos === shape.slots[i].pos).reduce((t, c) => t + c.agg.mins, 0) ?? 0
    const fits = (p: Player) => playerBand(p) === slotBand(shape, i) ? 1 : 0
    const sub = free.sort((x, y) => fits(y) - fits(x) || minsThere(y) - minsThere(x))[0]
    placed[i] = sub ? sub.id : null
    if (sub) swaps.push({ out: byId[id], in: sub, pos: shape.slots[i].pos })
  })
  const swapNote = swaps.map(s => `${s.in.first} is in for ${s.out.first} (${(s.out.reason ?? 'not available').toLowerCase()})`).join('. ')
  return { shape: l.shape, placed, swaps, note: `${label}, ${l.shape}.${swapNote ? ` ${swapNote}.` : ''}` }
}
/** One line on how a shape has gone, for the Formation builder. */
export function shapeLine(ins: Insights, shape: string): string {
  const s = ins.shapes.find(x => x.shape === shape)
  if (!s || !s.agg.mins) return `${shape} has not been used in a recorded game yet.`
  const g = ins.gameLen, a = s.agg
  const line = `${shape} in ${a.games.length} recorded ${a.games.length === 1 ? 'game' : 'games'}: ${fmt('scored', value(a, 'scored', g))} scored and ${fmt('against', value(a, 'against', g))} let in a game, ahead ${fmt('ahead', value(a, 'ahead', g))} of the time.`
  return thin(a, g) ? `${line} Only ${a.mins} minutes, so treat it lightly.` : line
}
