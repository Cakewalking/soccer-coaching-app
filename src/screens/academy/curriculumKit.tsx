// The pieces the curriculum screens share (pack v31, section G): a picker chip, a link that says what to show before it opens,
// a dotted line, a row with a name and a value, and the set-up pictures. Sizes and colours are the boards' own. Nothing here holds a number.
import { useContext, type CSSProperties, type ReactNode } from 'react'
import { INK } from './adStyles'
import { OwnerGo } from './ownerMenu'
import { G, LINE } from './kit'
import { sketch, type Drill } from './curriculum'

/** One choice in a row of choices. 44 high. */
export function Chip({ on, onPick, children }: { on: boolean; onPick: () => void; children: ReactNode }) {
  return <button type="button" aria-pressed={on} onClick={onPick} style={{ flex: 'none', minHeight: 44, boxSizing: 'border-box', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4px 8px', fontSize: 13, lineHeight: '16px', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', background: on ? G : '#ffffff', color: on ? '#ffffff' : INK, border: `1px solid ${on ? G : '#c5c8c4'}` }}>{children}</button>
}
export const ChipRow = ({ label, width, children }: { label: string; width?: number; children: ReactNode }) => (
  <div role="group" aria-label={label} style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}><span style={{ fontSize: 14, lineHeight: '20px', color: '#4a5a57', width, marginRight: width ? 0 : 4 }}>{label}</span>{children}</div>
)

/** Opens a screen, after saying which night, drill or skill it should show. */
export function Open({ to, before, style, label, children }: { to: string; before?: () => void; style?: CSSProperties; label?: string; children: ReactNode }) {
  const go = useContext(OwnerGo)
  return <a href={`/__screen/${to}`} aria-label={label} onClick={e => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) { before?.(); return } e.preventDefault(); before?.(); go(to) }} style={{ color: INK, textDecoration: 'none', cursor: 'pointer', ...style }}>{children}</a>
}

/** A line with a green dot in front of it. */
export const Dot = ({ children }: { children: ReactNode }) => (
  <span style={{ display: 'flex', gap: 8, fontSize: 13, lineHeight: '19px', color: INK }}><span style={{ flex: 'none', width: 6, height: 6, borderRadius: 999, background: G, marginTop: 7 }} /><span>{children}</span></span>
)
/** A name on the left and what it is on the right. */
export const PAIR: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${LINE}`, fontSize: 14, textDecoration: 'none', color: INK }
export const Pair = ({ name, children }: { name: string; children: ReactNode }) => (
  <span style={PAIR}><span style={{ flex: 'none', color: '#33443f' }}>{name}</span><span style={{ fontWeight: 700, textAlign: 'right' }}>{children}</span></span>
)

/** The small set-up picture on a library card. */
export function Thumb({ d }: { d: Drill }) {
  const p = sketch(d.i)
  return (
    <svg viewBox="0 0 120 70" width="100%" height="76" role="img" aria-label="Drill set-up, a sketch" style={{ borderRadius: 8, background: '#dcebe3' }}>
      <rect x="3" y="3" width="114" height="64" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.5" /><line x1="60" y1="3" x2="60" y2="67" stroke="#ffffff" strokeWidth="1.5" />
      {p.map((q, k) => <circle key={k} cx={q.x} cy={q.y} r="3.2" fill={q.dark ? INK : G} />)}
      <path d={`M${p[0].x} ${p[0].y} L${p[1].x} ${p[1].y}`} stroke={INK} strokeWidth="1.4" strokeDasharray="3 3" fill="none" />
    </svg>
  )
}
/** The same sketch, large, for a drill whose real set-up is not drawn in the sample. */
export function BigSketch({ d }: { d: Drill }) {
  const p = sketch(d.i).map(q => ({ ...q, x: q.x * 5, y: q.y * 250 / 70 }))
  return (
    <svg viewBox="0 0 600 250" width="100%" height="250" role="img" aria-label="Set-up, a sketch only" style={{ borderRadius: 12, background: '#dcebe3' }}>
      <rect x="10" y="10" width="580" height="230" rx="8" fill="none" stroke="#ffffff" strokeWidth="3" /><line x1="300" y1="10" x2="300" y2="240" stroke="#ffffff" strokeWidth="3" />
      {p.map((q, k) => <circle key={k} cx={q.x} cy={q.y} r="9" fill={q.dark ? INK : G} />)}
      <path d={`M${p[0].x} ${p[0].y} L${p[1].x} ${p[1].y}`} stroke={INK} strokeWidth="2" strokeDasharray="6 6" fill="none" />
    </svg>
  )
}
/** Weak-foot gates as the drill board draws it: six pairs, a cone gate between each. */
export function GatesPicture() {
  return (
    <svg viewBox="0 0 600 250" width="100%" height="250" role="img" aria-label="Set-up: pairs either side of six cone gates on a half pitch" style={{ borderRadius: 12, background: '#dcebe3' }}>
      <rect x="10" y="10" width="580" height="230" rx="8" fill="none" stroke="#ffffff" strokeWidth="3" />
      {[90, 174, 258, 342, 426, 510].map(x => (
        <g key={x}>
          <circle cx={x} cy="112" r="6" fill="#f4c95d" stroke={INK} /><circle cx={x} cy="138" r="6" fill="#f4c95d" stroke={INK} />
          <circle cx={x} cy="48" r="9" fill={INK} /><circle cx={x} cy="204" r="9" fill={G} />
          <path d={`M${x} 60 L${x} 190`} stroke={INK} strokeWidth="2" strokeDasharray="6 6" />
        </g>
      ))}
    </svg>
  )
}
