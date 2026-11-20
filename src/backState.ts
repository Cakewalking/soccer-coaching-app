// Browser Back and Forward for navigation that lives in the page, not in the address:
// tabs, sub-tabs, a screen opened over the app, a clip or a sheet.
//
// useBackState is useState for "where am I". Each change the person makes becomes one
// history entry (everything changed in the same click shares it), and Back or Forward
// puts every such state back to what it was at that entry. The address is left alone.
// Changes the page makes by itself (an effect, a timer) update the current entry instead
// of adding one, so Back never gets stuck re-triggering them.

import { useCallback, useEffect, useId, useRef, useState } from 'react'

type Bag = Record<string, unknown>
const subs = new Set<(bag: Bag) => void>()
let pending: Bag | null = null, pendingPath: string | null = null, scheduled = false, lastInput = 0
let hash: string | null = null   // the sub-tab showing, kept in the address after a # so a link can open it

if (typeof window !== 'undefined') {
  const mark = () => { lastInput = Date.now() }
  window.addEventListener('pointerdown', mark, true); window.addEventListener('keydown', mark, true); window.addEventListener('click', mark, true)
  window.addEventListener('popstate', e => { const bag: Bag = (e.state as { cs?: Bag } | null)?.cs ?? {}; subs.forEach(f => f(bag)) })
}
const bagNow = (): Bag => (window.history.state as { cs?: Bag } | null)?.cs ?? {}
const root = (p: string) => p.startsWith('/family/') ? '/family' : p.split('/').slice(0, 3).join('/')   // "/look/coach": the app the person is in

function flush() {
  scheduled = false
  const path = pendingPath, patch = pending; pending = null; pendingPath = null
  const here = window.location.pathname, to = (path ?? here) + (hash ? `#${hash}` : '')
  if (!patch && !path) { if (to !== here + window.location.hash) { try { window.history.replaceState(window.history.state, '', to) } catch { /* leave the address as it is */ } } return }
  const keep = root(path ?? here) === root(here) ? bagNow() : {}       // a different app starts with nothing remembered
  const cs = { ...keep, ...patch }
  const byPerson = Date.now() - lastInput < 1500
  try { if ((path && path !== here) || byPerson) window.history.pushState({ cs }, '', to); else window.history.replaceState({ cs }, '', to) } catch { /* a value that cannot be kept: leave history as it is */ }
}
// After the click has finished rendering and its effects have run, so an address change it causes lands in the same entry.
const schedule = () => { if (!scheduled) { scheduled = true; setTimeout(flush, 0) } }

/** Name the sub-tab that is showing, for the address. Pass null when there are no sub-tabs. */
export function setHash(slug: string | null) { if (slug !== hash) { hash = slug; schedule() } }
export const slugOf = (label: string) => label.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Remember a value in the entry for this action. */
export function record(key: string, value: unknown) { pending = { ...(pending ?? {}), [key]: value }; schedule() }
/** Move to another address, sharing one history entry with whatever else changed in the same action. */
export function pushPath(path: string) { pendingPath = path; schedule() }
/** Be told what was remembered whenever the person goes Back or Forward. */
export function onBack(f: (bag: Bag) => void) { subs.add(f); return () => { subs.delete(f) } }
/** True when the entry on top is the one that opened this overlay, so closing it should go back. */
export const isOpenInHistory = (key: string) => !!bagNow()[key]

/** useState for navigation: Back and Forward restore it. `key` is only needed if two instances must share a value. */
export function useBackState<T>(initial: T | (() => T), key?: string): [T, (v: T | ((prev: T) => T)) => void] {
  const id = useId(), k = key ?? id
  const [value, setValue] = useState(initial)
  const first = useRef(value), cur = useRef(value)
  cur.current = value
  useEffect(() => onBack(bag => { const next = (k in bag ? bag[k] : first.current) as T; if (!Object.is(next, cur.current)) { cur.current = next; setValue(next) } }), [k])
  const set = useCallback((v: T | ((prev: T) => T)) => {
    const next = typeof v === 'function' ? (v as (prev: T) => T)(cur.current) : v
    if (Object.is(next, cur.current)) return
    cur.current = next; setValue(next); record(k, next)
  }, [k])
  return [value, set]
}
