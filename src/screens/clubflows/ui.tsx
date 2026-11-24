// The parts the eight club-side input screens (GP1 to GP8) share: the title row, the two
// tiles, a field you type in, a row of choices, a tick box and the numbered list on the right.
// Sizes and colours are the boards'.

import type { CSSProperties, ReactNode } from 'react'
import { useId } from 'react'
import { demoToast } from '../demoToast'

export const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LINE = '#c5c8c4', SOFT = '#e9eae8', PALE = '#eef5f2'

/** Show the confirmation line. */
export const say = (line: string) => demoToast(line)

const btn: CSSProperties = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 10, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', boxSizing: 'border-box', cursor: 'pointer' }
export function Btn({ children, onClick, primary, disabled }: { children: ReactNode; onClick: () => void; primary?: boolean; disabled?: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} style={{ ...btn, padding: primary ? '0 18px' : '0 16px', border: `1px solid ${primary ? G : LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, opacity: disabled ? 0.6 : 1, cursor: disabled ? 'default' : 'pointer' }}>{children}</button>
}

/** The page under the menu: heading, the line beside it, the buttons on the right, then the two tiles. */
export function FlowPage({ id, title, sub, actions, children, side = 340 }: { id: string; title: string; sub: string; actions?: ReactNode; children: ReactNode; /** width of the right tile */ side?: number }) {
  return (
    <div data-club-flow={id} style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#faf5ec', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif", overflowY: 'auto' }}>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{title}</h1>
          <span style={{ fontSize: 14, lineHeight: '20px', color: MUT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>{actions}</div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: `minmax(0,1fr) ${side}px` }}>{children}</main>
    </div>
  )
}

const tile: CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, boxSizing: 'border-box', padding: '14px 16px', display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0 }
const h2: CSSProperties = { margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em' }
const foot: CSSProperties = { fontSize: 14, lineHeight: '20px', color: MUT, marginTop: 'auto', paddingTop: 8 }

/** The wide tile on the left. `foot` is the grey line at the bottom of it. */
export function Tile({ title, children, footLine }: { title: string; children: ReactNode; footLine?: string }) {
  return <section aria-label={title} style={{ ...tile, gap: 14 }}><h2 style={h2}>{title}</h2>{children}{footLine && <span style={foot}>{footLine}</span>}</section>
}

/** The narrow tile on the right: what happens next, in numbered steps. */
export function Steps({ title, steps, footLine, gap = 2 }: { title: string; steps: [string, string][]; footLine?: string; gap?: number }) {
  return (
    <aside aria-label={title} style={{ ...tile, gap }}>
      <h2 style={h2}>{title}</h2>
      {steps.map(([head, line], i) => (
        <div key={head} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: `1px solid ${SOFT}` }}>
          <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: PALE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
          <span style={{ flexGrow: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{head}</span>
            <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>{line}</span>
          </span>
        </div>
      ))}
      {footLine && <span style={foot}>{footLine}</span>}
    </aside>
  )
}

/** The left tile with nothing in it yet: a mark, a heading, a line and the one thing to do. */
export function EmptyTile({ label, title, line, children }: { label: string; title: string; line: string; children: ReactNode }) {
  return (
    <section aria-label={label} style={tile}>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center' }}>
        <span style={{ width: 72, height: 72, borderRadius: 999, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg></span>
        <span style={{ fontSize: 22, lineHeight: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</span>
        <span style={{ fontSize: 15, lineHeight: '22px', color: MUT, maxWidth: 460 }}>{line}</span>
        {children}
      </div>
    </section>
  )
}

export const Two = ({ children }: { children: ReactNode }) => <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>{children}</div>

const box: CSSProperties = { minHeight: 48, borderRadius: 12, border: `1px solid ${LINE}`, background: '#fff', padding: 12, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: 15, lineHeight: '21px', fontWeight: 400, color: INK, width: '100%' }
/** A field that holds what is typed. `tall` is the two-line box. */
export function Field({ label, value, onChange, hint, tall, inputMode }: { label: string; value: string; onChange: (v: string) => void; hint?: string; tall?: boolean; inputMode?: 'numeric' | 'tel' }) {
  const id = useId()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 700 }}>
      <label htmlFor={id}>{label}</label>
      {tall ? <textarea id={id} value={value} onChange={e => onChange(e.target.value)} style={{ ...box, minHeight: 72, resize: 'none', display: 'block' }} />
            : <input id={id} value={value} inputMode={inputMode} onChange={e => onChange(e.target.value)} style={{ ...box, height: 48 }} />}
      {hint && <span style={{ fontSize: 12, fontWeight: 400, color: MUT }}>{hint}</span>}
    </div>
  )
}

/** One choice from a short row. The choice stays tapped, and the line says which. */
export function Pills<T extends string>({ label, options, value, onChange, show }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void; /** what a pill reads as, when it is not its own name */ show?: (o: T) => string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 700 }}>{label}</span>
      <div role="radiogroup" aria-label={label} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {options.map(o => {
          const on = o === value
          return <button key={o} type="button" role="radio" aria-checked={on} onClick={() => { onChange(o); say(`${o}: chosen.`) }} style={{ height: 44, padding: '0 16px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', background: on ? G : '#fff', color: on ? '#fff' : INK, border: `1px solid ${on ? G : LINE}` }}>{show ? show(o) : o}</button>
        })}
      </div>
    </div>
  )
}

/** A tick box with its line. `locked` is a box that can never be ticked: pressing it says why. */
export function Tick({ label, on, onChange, locked }: { label: string; on: boolean; onChange?: (v: boolean) => void; locked?: string }) {
  const press = () => { if (locked) { say(locked); return } onChange?.(!on); say(`${label}: ${on ? 'unticked' : 'ticked'}.`) }
  return (
    <button type="button" role="checkbox" aria-checked={on} aria-disabled={locked ? true : undefined} onClick={press} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, padding: 0, border: 0, background: 'none', fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
      <span style={{ flex: 'none', width: 26, height: 26, borderRadius: 8, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', ...(on ? { background: G, color: '#fff' } : { border: '2px solid #8a9794', background: '#fff' }) }}>
        {on && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>}
      </span>
      <span style={{ fontSize: 15 }}>{label}</span>
    </button>
  )
}

/** The pale green note inside the left tile. */
export const Note = ({ children }: { children: ReactNode }) => <div style={{ borderRadius: 12, background: PALE, padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>{children}</div>
