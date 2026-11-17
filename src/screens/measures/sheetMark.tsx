// The mark for a measure sheet (PU8a to PU8k) and for the same number wherever
// else it appears (PU2, PU4, PX2). One place, so a number never shows two marks.

import { MEASURE, type MeasureCfg } from './data'
import { markFor, changeWord, MARK_WORD, type MarkKind, type NumberKind } from '../capture/marks'

const KIND: Record<MeasureCfg['evidence']['kind'], NumberKind> = {
  film: 'count',       // counted from film, each one a clip
  vest: 'distance',    // see below: top speed and sprints are 'speed'
  test: 'count',       // timed directly, with a person counting
  hand: 'count',       // measured by hand, two readings
  said: 'told', settling: 'told', place: 'told', load: 'told',
}

export function sheetKind(cfg: MeasureCfg): NumberKind {
  if (cfg.evidence.kind === 'vest' && /speed|sprint/i.test(cfg.title)) return 'speed'
  return KIND[cfg.evidence.kind]
}
/** The mark on the number itself. */
export const sheetMark = (cfg: MeasureCfg): MarkKind => markFor({ kind: sheetKind(cfg), captured: true })
export const markOfSheet = (id: string): MarkKind | null => { const c = MEASURE(id); return c ? sheetMark(c) : null }

/** How much the number usually moves from game to game, from the player's own earlier games. */
export function usualSwing(series: number[]): [number, number] | null {
  const prior = series.slice(0, -1)
  if (prior.length < 3) return null
  const moves = prior.slice(1).map((v, i) => Math.abs(v - prior[i]))
  const typical = moves.reduce((a, b) => a + b, 0) / moves.length
  const recent = prior.slice(-3), centre = recent.reduce((a, b) => a + b, 0) / recent.length
  const half = Math.max(typical * 1.5, Math.abs(centre) * 0.005)
  return [centre - half, centre + half]
}

/** What to say about the trend: wait, estimate, or whether the latest game is a real change. */
export function trendNote(cfg: MeasureCfg, trendAfter: number): { mark: MarkKind; label: string } | null {
  const s = cfg.graph.series
  if (cfg.graph.kind !== 'line' || !s) return null
  if (s.length < trendAfter) return { mark: 'needs', label: `${s.length} of ${trendAfter} games` }
  if (s.length < 6) return { mark: 'estimate', label: `Trend: ${MARK_WORD.estimate}, ${s.length} of 6` }
  const band = usualSwing(s)
  if (!band) return null
  const word = changeWord(s[s.length - 1], band)
  return { mark: word === 'A real change' ? 'strong' : 'not', label: word }
}

const SHAPE: Record<MarkKind, React.ReactNode> = {
  strong: <circle cx="8" cy="8" r="6" fill="currentColor" />,
  estimate: <><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M8 2a6 6 0 010 12z" fill="currentColor" /></>,
  needs: <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />,
  not: <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" />,
}
/** The mark in a tight row: its dot shape and its word, no pill. */
export function RowMark({ sheet }: { sheet?: string }) {
  const k = sheet ? markOfSheet(sheet) : null
  if (!k) return null
  return <span data-mark={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontWeight: 700, color: '#10211f', whiteSpace: 'nowrap' }}><svg width="10" height="10" viewBox="0 0 16 16" aria-hidden="true">{SHAPE[k]}</svg>{MARK_WORD[k]}</span>
}
