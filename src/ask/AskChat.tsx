// The working part of every Ask Clean Sheet panel: the example questions, the conversation, and the box to type in.
// A panel (the tablet's side panel, the phone's sheet) supplies its own frame and heading and puts this inside.
// The question goes to the demo's server function with the asker's role and what is on their screen (see ./ask.ts).

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ASK_ERROR, ask, splitOpen, type AskError, type AskTurn } from './ask'
import { askIsOff, onAskChange, takeWaiting } from './askState'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LINE = '#e8edeb'
const SEND = 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z'

export type AskPlace = { label: string; go: () => void }
type Msg = AskTurn & { open?: string; error?: AskError; live?: boolean }

// Each role's conversation is kept while the app is open, so closing the panel does not lose it.
const chats = new Map<string, Msg[]>(), subs = new Set<() => void>()
const none: Msg[] = []
const put = (key: string, next: Msg[]) => { chats.set(key, next); subs.forEach(f => f()) }
const useChat = (key: string) => useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => chats.get(key) ?? none, () => none)

export default function AskChat({ role, examples, places = [], note, heading = 'Try asking', onOpened, focus = false }: {
  /** who is asking, in words: "academy coach of U13 Timber" */ role: string
  examples: string[]
  /** screens this person can open; an answer may end by offering one */ places?: AskPlace[]
  /** the small line under the box: what Ask uses and that it never acts by itself */ note?: string
  heading?: string
  /** called after an offered screen is opened, for a panel that closes itself */ onOpened?: () => void
  /** put the cursor in the box when the panel opens (a tablet with a keyboard; not a phone, where it would raise the keyboard) */ focus?: boolean
}) {
  const msgs = useChat(role), [input, setInput] = useState(''), [busy, setBusy] = useState(false)
  const isOff = useSyncExternalStore(onAskChange, askIsOff, () => false)
  const box = useRef<HTMLDivElement>(null), end = useRef<HTMLDivElement>(null), field = useRef<HTMLInputElement>(null), stop = useRef<AbortController | null>(null)
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [msgs])
  useEffect(() => () => stop.current?.abort(), [])
  useEffect(() => { if (focus) field.current?.focus() }, [focus])
  async function send(q: string) {
    const question = q.trim()
    if (!question || busy || askIsOff()) return
    setInput(''); setBusy(true)
    const before = (chats.get(role) ?? []).filter(m => !m.error && m.text)
    const history: AskTurn[] = before.map(m => ({ role: m.role, text: m.text }))
    const base: Msg[] = [...(chats.get(role) ?? []), { role: 'user', text: question }]
    put(role, [...base, { role: 'assistant', text: '', live: true }])
    stop.current = new AbortController()
    const labels = places.map(p => p.label)
    // The panel this sits in is left out of "what is on the screen".
    const panel = box.current?.closest('[role="dialog"], aside') ?? box.current
    const out = await ask({ role, question, history, places: labels, skip: panel, signal: stop.current.signal, onText: soFar => put(role, [...base, { role: 'assistant', text: splitOpen(soFar, labels).text, live: true }]) })
    const done = splitOpen(out.text, labels)
    put(role, [...base, { role: 'assistant', text: done.text, open: done.open, error: out.error }])
    setBusy(false)
    field.current?.focus()
  }

  // A question handed over from outside the panel (the Ask line on a home) is asked once the panel is up: a moment later, so a panel React mounts twice while checking does not ask twice.
  const sendNow = useRef<(q: string) => void>(() => {})
  useEffect(() => { sendNow.current = send })
  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>()
    const take = () => { timers.add(setTimeout(() => { const q = takeWaiting(); if (q) sendNow.current(q) }, 0)) }
    take()
    const stopListening = onAskChange(take)
    return () => { stopListening(); timers.forEach(clearTimeout) }
  }, [])

  const bubble = (m: Msg, i: number) => {
    const mine = m.role === 'user', place = m.open ? places.find(p => p.label === m.open) : undefined
    return (
      <div key={i} style={{ alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '92%', display: 'flex', flexDirection: 'column', gap: 6, alignItems: mine ? 'flex-end' : 'flex-start' }}>
        {(m.text || m.live) && (
          <div style={{ padding: '10px 12px', borderRadius: 12, background: mine ? G : '#fff', color: mine ? '#fff' : INK, border: mine ? 0 : `1px solid ${LINE}`, fontSize: 14, lineHeight: '20px', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
            {m.text || <span style={{ color: MUT }}>Looking at what you can see…</span>}
          </div>
        )}
        {m.error && <div role="status" style={{ padding: '8px 12px', borderRadius: 12, background: '#f3e4e4', color: INK, fontSize: 13, lineHeight: '18px' }}>{ASK_ERROR[m.error]}</div>}
        {place && <button onClick={() => { place.go(); onOpened?.() }} style={{ minHeight: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${G}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Open {place.label}</button>}
      </div>
    )
  }

  if (isOff) return (
    <div style={{ flex: 1, minHeight: 0, padding: '14px 16px', fontSize: 14, lineHeight: '20px', color: INK }}>
      Ask Clean Sheet answers from the demo’s sample club. It is switched off for a club you set up here, so nothing you typed is sent anywhere. Open the demo club to try it.
    </div>
  )
  return (
    <div ref={box} style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div aria-live="polite" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.length === 0 && <>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT, textTransform: 'uppercase', marginTop: 4 }}>{heading}</div>
          {examples.map(q => <button key={q} onClick={() => send(q)} disabled={busy} style={{ width: '100%', minHeight: 44, textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: `1px solid ${LINE}`, background: '#fff', color: G, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{q}</button>)}
          <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Or anything else about what you can see.</div>
        </>}
        {msgs.map(bubble)}
        {msgs.length > 0 && !busy && <button onClick={() => put(role, [])} style={{ alignSelf: 'flex-start', minHeight: 44, padding: '0 4px', border: 0, background: 'none', color: MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Start again</button>}
        <div ref={end} />
      </div>
      <form onSubmit={e => { e.preventDefault(); send(input) }} style={{ flex: 'none', background: '#fff', padding: '10px 14px 12px', borderTop: `1px solid ${LINE}` }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
          <input ref={field} value={input} onChange={e => setInput(e.target.value)} maxLength={600} aria-label="Your question" placeholder={msgs.length ? 'Ask a follow-up' : 'Ask about what you can see'}
            style={{ flex: 1, minWidth: 0, height: 44, padding: '0 12px', borderRadius: 8, border: `1px solid ${LINE}`, fontSize: 16, fontFamily: 'inherit', outline: 'none', color: INK, boxSizing: 'border-box' }} />
          {busy
            ? <button type="button" onClick={() => stop.current?.abort()} aria-label="Stop" style={{ flex: 'none', width: 44, height: 44, borderRadius: 8, background: '#fff', border: `1px solid ${G}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span aria-hidden style={{ width: 12, height: 12, borderRadius: 2, background: G }} /></button>
            : <button type="submit" aria-label="Send" disabled={!input.trim()} style={{ flex: 'none', width: 44, height: 44, borderRadius: 8, background: G, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: input.trim() ? 1 : 0.55 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={SEND} /></svg>
              </button>}
        </div>
        <div style={{ fontSize: 11, color: MUT, lineHeight: 1.5 }}>{note ?? 'Uses only what you can see. Never sends anything by itself.'} Answers are written by an AI from this demo’s sample data and can be wrong.</div>
      </form>
    </div>
  )
}
