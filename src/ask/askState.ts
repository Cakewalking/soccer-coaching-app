// Ask Clean Sheet, the parts every panel shares: who is asking, whether the shared panel is open,
// a question waiting to be asked, and whether Ask is switched off.
//
// An app says who is using it (`setAskWho`); any Ask button calls `openAsk()`. If the app has its own panel and can show it,
// that panel opens. Otherwise the shared one does (./AskHost.tsx), over the screen, so the screen's words still go with the question.

import type { AskPlace } from './AskChat'
import { ASK_AS, type AskAs } from './roles'

export type AskWho = AskAs & {
  places?: AskPlace[]
  heading?: string
  /** the app's own panel: open it and return true, or return false when it cannot be seen just now (a screen is open over the app) */
  open?: () => boolean
}

const subs = new Set<() => void>()
const tell = () => subs.forEach(f => f())
/** Be told when any of this changes (returns a function that stops it). */
export const onAskChange = (f: () => void) => { subs.add(f); return () => { subs.delete(f) } }

// ── who is asking: the demo says (by the role being looked at) and the role's own app says. The app wins. ──
let base: AskWho | null = null, app: AskWho | null = null
/** Whoever is asking just now. With nobody named, a visitor. */
export const askingAs = (): AskWho => app ?? base ?? ASK_AS.visitor
/** Say who is using this app (returns a function that takes it away again). `fromDemo` is the demo's own word, from the role being looked at. */
export function setAskWho(w: AskWho, fromDemo = false) {
  if (fromDemo) base = w; else app = w
  tell()
  return () => { if (fromDemo) { if (base === w) base = null } else if (app === w) app = null; tell() }
}

// ── the shared panel ──
let showing: { phone: boolean } | null = null
export const askShowing = () => showing
export const closeAsk = () => { showing = null; tell() }
/** Open Ask Clean Sheet for whoever is using the app. `first` is a question to ask straight away; `phone` is for a phone page. */
export function openAsk(o: { first?: string; phone?: boolean } = {}) {
  const w = askingAs()
  if (!w.open?.()) { showing = { phone: o.phone ?? w.phone ?? false }; tell() }
  if (o.first) askWhenOpen(o.first)
}

// ── a question picked somewhere else (the Ask line on a home) waits here for the panel that is open or about to open ──
let waiting: { q: string; at: number } | null = null
/** Hand a question to the Ask panel: it is asked as soon as a panel is there. */
export function askWhenOpen(q: string) { waiting = { q, at: Date.now() }; tell() }
/** The waiting question, taken once. One that no panel took within a few seconds is dropped. */
export function takeWaiting() { const w = waiting; waiting = null; return w && Date.now() - w.at < 5000 ? w.q : null }

// ── off: where the screen is not the demo's sample data (a club the visitor set up in the sandbox), nothing is sent ──
let off = false
export const askIsOff = () => off
/** Switch Ask off (or back on) for every panel. While it is off a panel says why, and no question is sent. */
export function setAskOff(v: boolean) { if (off !== v) { off = v; tell() } }
