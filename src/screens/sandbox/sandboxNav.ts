import { demoToast } from '../demoToast'

// Empty screens in the sandbox send the coach to the right part of Team set-up
// instead of showing a line of text. The coach app registers how to get there.
export type SetupSection = 'team' | 'players' | 'fixtures' | 'training' | 'staff' | 'kit'

let handler: ((section: SetupSection) => void) | null = null
let wanted: SetupSection | null = null
const subs = new Set<() => void>()

export function registerSetupNav(fn: ((section: SetupSection) => void) | null) { handler = fn }
/** Go to a part of Team set-up. Outside the sandbox there is nowhere to go, so say what would open. */
export function goSetup(section: SetupSection, fallback: string) {
  if (!handler) { demoToast(fallback); return }
  wanted = section
  handler(section)
  subs.forEach(f => f())
}
export function takeWanted(): SetupSection | null { const w = wanted; wanted = null; return w }
export function onWanted(f: () => void) { subs.add(f); return () => { subs.delete(f) } }
