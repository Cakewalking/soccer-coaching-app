// AC3-Trials: Academy owner, trials.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
// The cards move (Booker, 25 Nov): drag one to another column or up and down its own, by mouse or finger.
// With the keyboard, the arrow keys move the card that has focus. Where the cards sit is kept while the app is open; it is sample, not the academy's list.
import { useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { demoToast } from '../demoToast'
import { S } from './adStyles'
import Tap from './Tap'

type Col = 'booked' | 'came' | 'offer' | 'joined'
type Card = { id: string; name: string; age: number; prog: string; col: Col; when?: string; remind?: string; came?: string; joined?: string; assess?: string; offer?: string; sent?: boolean }

const COLS: { id: Col; title: string; bg: string; foot: string }[] = [
  { id: 'booked', title: 'Booked', bg: '#e9eae8', foot: 'Families book themselves from your link.' },
  { id: 'came', title: 'Came, to assess', bg: '#e9eae8', foot: 'The coach rates four skills in under a minute.' },
  { id: 'offer', title: 'Offer to send', bg: '#e8cfcf', foot: 'Clean Sheet works out the price for the weeks left.' },
  { id: 'joined', title: 'Joined', bg: '#eef5f2', foot: '' },
]
const SAMPLE: Card[] = [
  { id: 'ivy', name: 'Ivy Barlow', age: 7, prog: 'Foundation', col: 'booked', when: 'Mon 8 Jun', remind: 'Sunday' },
  { id: 'nate', name: 'Nate Greco', age: 10, prog: 'Development', col: 'booked', when: 'Tue 9 Jun', remind: 'Monday' },
  { id: 'arjun', name: 'Arjun Mehta', age: 10, prog: 'Development', col: 'came', when: 'Today 4:30', assess: 'Reece assesses today' },
  { id: 'lola', name: 'Lola Ferris', age: 12, prog: 'Advanced', col: 'offer', came: '28 May', offer: 'Offer sent to Lola’s family: Advanced, $128 for the 4 weeks left.' },
  { id: 'sam', name: 'Sam Petrakis', age: 8, prog: 'Foundation', col: 'offer', came: '27 May' },
  { id: 'billie', name: 'Billie Nguyen', age: 9, prog: 'Development', col: 'offer', came: '26 May' },
  { id: 'kai', name: 'Kai Okonkwo', age: 13, prog: 'Advanced', col: 'joined', joined: '13 May' },
  { id: 'maya', name: 'Maya Rossi', age: 6, prog: 'Foundation', col: 'joined', joined: '14 May' },
  { id: 'theo', name: 'Theo Lindqvist', age: 11, prog: 'Development', col: 'joined', joined: '19 May' },
  { id: 'ana', name: 'Ana Costa', age: 12, prog: 'Advanced', col: 'joined', joined: '2 Jun' },
]
/** Joined before June in the sample, so "4 of the last 6 offers" keeps its two that were not taken up. */
const OFFERS_NOT_TAKEN = 2

// The cards, in order. Kept outside the screen so a move is still there after looking at another page.
let cards = SAMPLE
const subs = new Set<() => void>()
const put = (next: Card[]) => { cards = next; subs.forEach(f => f()) }
const first = (c: Card) => c.name.split(' ')[0]
const titleOf = (col: Col) => COLS.find(c => c.id === col)!.title

/** Move a card to a column, before the card `before` (or to the end). */
function move(id: string, col: Col, before?: string) {
  const c = cards.find(x => x.id === id)
  if (!c || before === id) return
  const rest = cards.filter(x => x.id !== id), at = before ? rest.findIndex(x => x.id === before) : -1
  const moved: Card = c.col === col ? c : { ...c, col, sent: false }
  // To the end of a column: after the last card that is already in it.
  const end = rest.reduce((n, x, k) => x.col === col ? k + 1 : n, rest.length)
  const i = at < 0 ? end : at
  if (c.col === col && cards.indexOf(c) === i) return
  put([...rest.slice(0, i), moved, ...rest.slice(i)])
  if (c.col !== col) demoToast(`${first(c)} moved to ${titleOf(col)}.`)
}

const CARD: CSSProperties = { background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4, cursor: 'grab', touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }
const LINE: CSSProperties = { fontSize: 13, lineHeight: '18px', color: '#4a5a57' }

export default function AC3Trials() {
  const list = useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => cards, () => cards)
  // The card being dragged, how far it has come, and where it would land.
  const [drag, setDrag] = useState<{ id: string; dx: number; dy: number; col: Col; before?: string } | null>(null)
  const from = useRef<{ id: string; x: number; y: number; on: boolean } | null>(null)

  const landing = (x: number, y: number, id: string): { col: Col; before?: string } | null => {
    const el = document.elementsFromPoint(x, y).find(e => e instanceof HTMLElement && e.dataset.col) as HTMLElement | undefined
    if (!el) return null
    const under = [...el.querySelectorAll<HTMLElement>('[data-card]')].filter(k => k.dataset.card !== id)
    const next = under.find(k => { const r = k.getBoundingClientRect(); return y < r.top + r.height / 2 })
    return { col: el.dataset.col as Col, before: next?.dataset.card }
  }
  const down = (c: Card) => (e: PointerEvent<HTMLDivElement>) => {
    if (e.button || (e.target as HTMLElement).closest('a,button')) return
    from.current = { id: c.id, x: e.clientX, y: e.clientY, on: false }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const drift = (e: PointerEvent<HTMLDivElement>) => {
    const s = from.current
    if (!s) return
    const dx = e.clientX - s.x, dy = e.clientY - s.y
    if (!s.on && Math.hypot(dx, dy) < 6) return
    s.on = true
    const to = landing(e.clientX, e.clientY, s.id), me = list.find(x => x.id === s.id)!
    setDrag({ id: s.id, dx, dy, col: to?.col ?? me.col, before: to ? to.before : undefined })
  }
  const up = (e: PointerEvent<HTMLDivElement>) => {
    const s = from.current
    from.current = null
    setDrag(null)
    if (!s?.on) return
    const to = landing(e.clientX, e.clientY, s.id)
    if (to) move(s.id, to.col, to.before)
  }
  const keys = (c: Card) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    const k = COLS.findIndex(x => x.id === c.col), mine = list.filter(x => x.col === c.col), i = mine.indexOf(c)
    const id = c.id, refocus = () => requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-card="${id}"]`)?.focus())
    if (e.key === 'ArrowRight' && k < COLS.length - 1) move(id, COLS[k + 1].id)
    else if (e.key === 'ArrowLeft' && k > 0) move(id, COLS[k - 1].id)
    else if (e.key === 'ArrowUp' && i > 0) move(id, c.col, mine[i - 1].id)
    else if (e.key === 'ArrowDown' && i < mine.length - 1) move(id, c.col, mine[i + 2]?.id)
    else return
    e.preventDefault(); refocus()
  }

  const body = (c: Card) => {
    if (c.col === 'booked') return <>
      <span style={LINE}>{c.when ?? 'Day to pick'} · {c.prog}</span>
      <span style={S.cap}>{c.remind ? `Reminder goes ${c.remind}` : 'Reminder goes the day before'}</span>
    </>
    if (c.col === 'came') return <>
      <span style={LINE}>{c.came ? `Came ${c.came}` : c.when ?? 'Came today'} · {c.prog}</span>
      <Tap to="ACC3-TrialAssess" style={S.more}>{c.assess ?? 'Coach to assess'}</Tap>
    </>
    if (c.col === 'offer') return <>
      <span style={LINE}>Fits {c.prog} · came {c.came ?? 'today'}</span>
      {c.sent
        ? <span style={{ ...S.cap, minHeight: 44, display: 'flex', alignItems: 'center' }}>Offer sent · waiting on the family</span>
        : <button onClick={() => { demoToast(c.offer ?? `Offer sent to ${first(c)}’s family.`); put(cards.map(x => x.id === c.id ? { ...x, sent: true } : x)) }} style={{ ...S.primary, font: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Send offer</button>}
    </>
    return <span style={LINE}>{c.prog} · joined {c.joined ?? 'today'}</span>
  }

  const joined = list.filter(c => c.col === 'joined').length
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Trials</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>June so far · 9 booked · {joined} joined</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Trial link copied." style={S.primary}>Share the trial link</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(4, minmax(0,1fr))' }}>
        {COLS.map(col => {
          const mine = list.filter(c => c.col === col.id), over = drag?.col === col.id
          return (
            <section key={col.id} data-col={col.id} aria-label={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 8, background: col.bg, borderRadius: 16, padding: 12, minHeight: 0, boxSizing: 'content-box', outline: over ? '2px solid #2f6252' : 'none', outlineOffset: -2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h2 style={S.h2}>{col.title}</h2>
                <strong style={S.num}>{mine.length}</strong>
              </div>
              {mine.map(c => {
                const held = drag?.id === c.id
                return (
                  <div key={c.id} style={{ display: 'contents' }}>
                    {over && drag.before === c.id && !held && <span aria-hidden style={{ height: 3, borderRadius: 2, background: '#2f6252', margin: '-3px 0' }} />}
                    <div data-card={c.id} tabIndex={0} aria-roledescription="card you can move" aria-label={`${c.name}, ${c.age}, in ${col.title}. Drag to move, or use the arrow keys.`}
                      onPointerDown={down(c)} onPointerMove={drift} onPointerUp={up} onPointerCancel={() => { from.current = null; setDrag(null) }} onKeyDown={keys(c)}
                      style={{ ...CARD, ...(held ? { transform: `translate(${drag.dx}px, ${drag.dy}px) rotate(1.5deg)`, boxShadow: '0 10px 24px rgba(16,33,31,0.22)', cursor: 'grabbing', position: 'relative', zIndex: 5, pointerEvents: 'none' } : null) }}>
                      <strong style={{ fontSize: 15, lineHeight: '20px' }}>{c.name}, {c.age}</strong>
                      {body(c)}
                    </div>
                  </div>
                )
              })}
              {over && !drag.before && <span aria-hidden style={{ height: 3, borderRadius: 2, background: '#2f6252', margin: '-3px 0' }} />}
              {!mine.length && !over && <span style={{ ...S.cap, padding: '10px 2px' }}>Nobody here. Drag a card in.</span>}
              <span style={{ ...S.cap, marginTop: 'auto' }}>{col.id === 'joined' ? `${joined} of the last ${joined + OFFERS_NOT_TAKEN} offers were taken up.` : col.foot}</span>
            </section>
          )
        })}
      </main>
    </>
  )
}
