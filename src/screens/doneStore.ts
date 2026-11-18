// Buttons whose whole job is to record that something was done: a reminder sent,
// a drill added to Tuesday, a report sent to the committee. The mark is kept on
// this device, so the button still shows it after a reload.

import { useSyncExternalStore } from 'react'

const KEY = 'cs_done_v1'
let done: Record<string, string> = (() => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} } })()
const subs = new Set<() => void>()
const get = () => done

/** Record a thing as done. `value` can carry what was saved (a name, a time). */
export function markDone(key: string, value = 'yes') {
  done = { ...done, [key]: value }
  try { localStorage.setItem(KEY, JSON.stringify(done)) } catch { /* private window: kept for this visit only */ }
  subs.forEach(f => f())
}
export function clearDone(key: string) { const { [key]: _gone, ...rest } = done; void _gone; done = rest; try { localStorage.setItem(KEY, JSON.stringify(done)) } catch { /* as above */ } subs.forEach(f => f()) }
export const useDoneAll = (): Record<string, string> => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, get, get)
export const useDone = (key: string): string | undefined => useDoneAll()[key]
