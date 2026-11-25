// Ask Clean Sheet for a screen that has no Ask panel of its own: a phone page, a home at its own address, a role with no side panel.
// `openAsk()` (./askState.ts) opens it over the screen: a sheet from the bottom on a phone, a panel on the right on a tablet.
// The screen stays underneath, so its words still go with the question.

import { useEffect, useSyncExternalStore } from 'react'
import AskChat from './AskChat'
import { askShowing, askingAs, closeAsk as close, onAskChange } from './askState'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LINE = '#e8edeb'
const SPARKLE = 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'

export function AskHost() {
  const s = useSyncExternalStore(onAskChange, askShowing)
  const w = useSyncExternalStore(onAskChange, askingAs)
  useEffect(() => { if (!s) return; const k = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [s])
  if (!s) return null
  const head = (
    <div style={{ flex: 'none', background: '#fff', padding: s.phone ? '8px 8px 8px 16px' : '14px 16px', borderBottom: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={SPARKLE} /></svg>
      <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: INK }}>Ask Clean Sheet</span>
      <button onClick={close} aria-label="Close" style={{ flex: 'none', width: 44, height: 44, borderRadius: '50%', border: `1px solid ${LINE}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
    </div>
  )
  const chat = <AskChat role={w.role} examples={w.examples} places={w.places} note={w.note} heading={w.heading} onOpened={close} />
  const font = "var(--font-sans, 'DM Sans', system-ui, sans-serif)"
  if (s.phone) return (
    <div data-ask-host="phone" onClick={e => { if (e.target === e.currentTarget) close() }} style={{ position: 'fixed', inset: 0, zIndex: 470, background: 'rgba(16,33,31,0.35)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', fontFamily: font }}>
      <div role="dialog" aria-label="Ask Clean Sheet" style={{ width: 'min(430px, 100%)', height: 'min(640px, 86%)', background: '#eef5f2', borderRadius: '20px 20px 0 0', overflow: 'hidden', boxShadow: '0 -4px 24px rgba(16,33,31,0.14)', display: 'flex', flexDirection: 'column' }}>
        {head}{chat}
      </div>
    </div>
  )
  return (
    <aside data-ask-host="panel" role="dialog" aria-label="Ask Clean Sheet" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 470, width: 'min(380px, 100%)', background: '#eef5f2', borderLeft: `1px solid ${LINE}`, boxShadow: '-6px 0 24px rgba(16,33,31,0.10)', display: 'flex', flexDirection: 'column', fontFamily: font }}>
      {head}{chat}
    </aside>
  )
}
