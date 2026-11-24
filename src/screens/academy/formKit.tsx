// The working pieces of the owner's forms (AD19 to AD25): a field that holds what is typed, a row of choices,
// a tick box and a money stepper. Each looks as drawn on the boards and keeps its own value while the form is open.
// Nothing is saved: this is a demo on sample data, so a reload shows the form as drawn.
import { useId, useState, type CSSProperties } from 'react'
import { demoToast } from '../demoToast'

const INK = '#10211f'
const box: CSSProperties = { minHeight: 48, width: '100%', borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', padding: 12, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: 15, lineHeight: '21px', fontWeight: 400, color: INK, margin: 0 }

/** A field. `value` is what the board draws in it; `hint` is grey words that go when the owner types; `lines` makes it a box for a few sentences. */
export function Field({ value = '', hint, lines }: { value?: string; hint?: string; lines?: boolean }) {
  const [text, setText] = useState(value)
  return lines
    ? <textarea value={text} placeholder={hint} onChange={e => setText(e.target.value)} rows={5} style={{ ...box, minHeight: 72, resize: 'vertical' }} />
    : <input type="text" value={text} placeholder={hint} onChange={e => setText(e.target.value)} style={box} />
}

/** One choice out of a few, as pills. Choosing one says "<choice>: chosen." */
export function Picks({ label, options, start }: { label: string; options: string[]; start: number }) {
  const [on, setOn] = useState(start)
  return (
    <div role="radiogroup" aria-label={label} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map((o, i) => {
        const sel = i === on
        return (
          <button key={o} type="button" role="radio" aria-checked={sel} onClick={() => { setOn(i); demoToast(`${o}: chosen.`) }}
            style={{ height: 44, padding: '0 16px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', background: sel ? '#2f6252' : '#ffffff', color: sel ? '#ffffff' : INK, border: `1px solid ${sel ? '#2f6252' : '#c5c8c4'}` }}>
            {o}
          </button>
        )
      })}
    </div>
  )
}

/** A tick box with its words. Pressing it says "<words>: ticked." or "<words>: unticked." */
export function Tick({ start, children }: { start: boolean; children: string }) {
  const [on, setOn] = useState(start)
  const id = useId()
  return (
    <button type="button" role="checkbox" aria-checked={on} aria-labelledby={id} onClick={() => { setOn(!on); demoToast(`${children}: ${on ? 'unticked' : 'ticked'}.`) }}
      style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, border: 0, padding: 0, background: 'transparent', color: INK, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
      <span style={{ flex: 'none', width: 26, height: 26, borderRadius: 8, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', ...(on ? { background: '#2f6252', color: '#ffffff' } : { border: '2px solid #8a9794', background: '#ffffff' }) }}>
        {on && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>}
      </span>
      <span id={id} style={{ fontSize: 15 }}>{children}</span>
    </button>
  )
}

const stepBtn: CSSProperties = { flex: 'none', width: 44, height: 44, borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK, fontFamily: 'inherit', fontSize: 20, fontWeight: 700, cursor: 'pointer', padding: 0 }

/** A dollar amount stepped $5 at a time. "None" is nothing paid. The lines it says are the wiring table's own. */
export function Step({ start, what }: { start: string; what: string }) {
  const [n, setN] = useState(() => Number(start.replace(/[^0-9]/g, '')) || 0)
  const move = (by: number) => { setN(v => Math.max(0, v + by)); demoToast(by < 0 ? 'Aim down one step.' : 'Aim up one step.') }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <button type="button" aria-label={`Lower: ${what}`} disabled={n === 0} onClick={() => move(-5)} style={{ ...stepBtn, opacity: n === 0 ? 0.45 : 1 }}>−</button>
      <strong aria-live="polite" style={{ fontVariantNumeric: 'tabular-nums', minWidth: 66, textAlign: 'center', fontSize: 17, whiteSpace: 'nowrap' }}>{n === 0 ? 'None' : `$${n}`}</strong>
      <button type="button" aria-label={`Raise: ${what}`} onClick={() => move(5)} style={stepBtn}>+</button>
    </span>
  )
}
