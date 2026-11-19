// Which messages this person has opened. Opening one clears its unread mark everywhere it shows,
// and it stays read after a reload.
import { useSyncExternalStore } from 'react'

const KEY = 'cs_read_v1'
let seen: Record<string, true> = (() => { try { return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, true> } catch { return {} } })()
const subs = new Set<() => void>()
let telling = false

/** True once this message or chat has been opened. `key` is "<list>:<id>". */
export const isRead = (key: string) => !!seen[key]
/** Mark it opened. Safe to call while drawing: anything watching is told just after. */
export function markRead(key: string) {
  if (seen[key]) return
  seen = { ...seen, [key]: true }
  try { localStorage.setItem(KEY, JSON.stringify(seen)) } catch { /* private window: read for this visit only */ }
  if (!telling) { telling = true; queueMicrotask(() => { telling = false; subs.forEach(f => f()) }) }
}
/** Redraw when anything is read. Returns the same isRead. */
export function useRead() { useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => seen, () => seen); return isRead }
