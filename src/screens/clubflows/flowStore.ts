// What the club-side input screens keep. Everything is kept on this device (the demo has
// nothing behind it), so a half-filled screen is still there after "Finish later" or a reload.

import { useCallback, useEffect, useRef } from 'react'
import { markDone, clearDone, useDone, useDoneAll } from '../doneStore'

/** The eight tablet screens. */
export const CLUB_FLOW_IDS = ['GP1-AfterTraining', 'GP2-AddPlayer', 'GP3-ChangeRole', 'GP4-LinkAcademy', 'GP5-AddSponsor', 'GP6-SendLesson', 'GP7-MiniGoal', 'GP8-ReportNumber'] as const
export type ClubFlowId = typeof CLUB_FLOW_IDS[number]
export const isClubFlowId = (s?: string | null): s is ClubFlowId => !!s && (CLUB_FLOW_IDS as readonly string[]).includes(s)

/** useState that is kept on this device under `key`. `reset` puts the drawn values back. */
export function useKept<T>(key: string, initial: T): [T, (patch: Partial<T>) => void, () => void] {
  const raw = useDone(`flow:${key}`)
  let value = initial
  if (raw) { try { value = { ...initial, ...(JSON.parse(raw) as Partial<T>) } } catch { /* an old shape: use the drawn values */ } }
  const latest = useRef(value)
  useEffect(() => { latest.current = value })
  const set = useCallback((patch: Partial<T>) => { latest.current = { ...latest.current, ...patch }; markDone(`flow:${key}`, JSON.stringify(latest.current)) }, [key])
  const reset = useCallback(() => clearDone(`flow:${key}`), [key])
  return [value, set, reset]
}

// Who a screen is about, when the button that opened it was on a person's row or a child's page.
export type RoleSubject = { name: string; now: string; his: string }
export type ChildSubject = { name: string; age?: number; her: string; she: string; parent: string }
const subject: { role?: RoleSubject; child?: ChildSubject } = {}
export const setRoleSubject = (s?: RoleSubject) => { subject.role = s }
export const roleSubject = () => subject.role
export const setChildSubject = (s?: ChildSubject) => { subject.child = s }
export const childSubject = () => subject.child

// ── what other screens read back ─────────────────────────────────────────────

/** Players added by hand on GP2. Squad shows them as "waiting on parent". The key is the one Squad already used. */
export const ADDED_KEY = 'squad:added'

/** A role change saved on GP3. `waiting` is true while the role needs a children check that is not on record yet. */
export type RoleChange = { name: string; role: string; team: string; when: string; waiting: boolean }
const list = <T,>(raw: string | undefined): T[] => { try { return JSON.parse(raw ?? '[]') as T[] } catch { return [] } }
export function useRoleChanges(): RoleChange[] { return list<RoleChange>(useDone('flow:roleChanges')) }
export function saveRoleChange(c: RoleChange, all: RoleChange[]) { markDone('flow:roleChanges', JSON.stringify([...all.filter(x => x.name !== c.name), c])) }

/** Sponsors added on GP5. */
export type Sponsor = { name: string; shows: string[]; renews: string; worth: string }
export function useSponsors(): Sponsor[] { return list<Sponsor>(useDone('flow:sponsors')) }
export function saveSponsor(s: Sponsor, all: Sponsor[]) { markDone('flow:sponsors', JSON.stringify([...all.filter(x => x.name !== s.name), s])) }

/** A MiniRoos child's goal saved on GP7, by first name. Words only: no numbers at this age. */
export type MiniGoal = { goal: string; how: string; done?: boolean }
export function useMiniGoal(first: string): MiniGoal | null { const raw = useDone(`flow:miniGoal:${first}`); try { return raw ? JSON.parse(raw) as MiniGoal : null } catch { return null } }
export const saveMiniGoal = (first: string, g: MiniGoal) => markDone(`flow:miniGoal:${first}`, JSON.stringify(g))

/**
 * Numbers a coach has reported on GP8. While a report is open the number reads "Being checked"
 * on every screen that shows it: a screen asks `checked['Goal kicks played short']` and shows
 * BEING_CHECKED in place of the value when it is true.
 */
export const BEING_CHECKED = 'Being checked'
export function useBeingChecked(): Record<string, boolean> {
  const all = useDoneAll()
  const out: Record<string, boolean> = {}
  for (const k of Object.keys(all)) if (k.startsWith('flow:checking:')) out[k.slice('flow:checking:'.length)] = true
  return out
}
export const reportNumber = (name: string, why: string) => markDone(`flow:checking:${name}`, why || 'yes')
