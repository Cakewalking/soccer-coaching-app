// Pieces the Record tab's screens share (pack v38): the tablet's view drawn as a viewfinder, the dark hero's buttons, and a row with a value.
// Sized as the v38 boards draw them.

import type { CSSProperties, ReactNode } from 'react'
import { pairRow } from './filmStyles'
import { INK, plain } from './styles'
import { Chevron } from './teamParts'

const dot = (left: string, top: string, size: number): CSSProperties => ({ position: 'absolute', left, top, width: size, height: size, borderRadius: 999, background: '#ffffff', opacity: 0.9 })
const corner = (v: 'top' | 'bottom', h: 'left' | 'right'): CSSProperties => ({ position: 'absolute', [h]: 12, [v]: 12, width: 22, height: 22, [`border${h === 'left' ? 'Left' : 'Right'}`]: '3px solid #ffffff', [`border${v === 'top' ? 'Top' : 'Bottom'}`]: '3px solid #ffffff' })
/** What the tablet sees, drawn: the pitch in the frame, the players as dots, the four corners and READY. A drawing, not film. */
export function Viewfinder({ height }: { height: number }) {
  return (
    <div role="img" aria-label="What the tablet sees: the pitch, framed" style={{ position: 'relative', height, borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(180deg,#24493f 0%,#2f6b5a 46%,#3b7f6a 46%,#2f6b5a 100%)' }}>
      <span style={{ position: 'absolute', left: '8%', right: '8%', top: '46%', bottom: '-30%', border: '2px solid rgba(255,255,255,0.45)', borderRadius: 6, transform: 'perspective(420px) rotateX(48deg)', transformOrigin: 'top' }} />
      <span style={{ position: 'absolute', left: '38%', right: '38%', top: '36%', height: '10%', border: '2px solid rgba(255,255,255,0.7)', borderBottom: 'none' }} />
      <span style={dot('22%', '62%', 10)} /><span style={dot('36%', '70%', 12)} /><span style={dot('52%', '58%', 9)} /><span style={dot('64%', '74%', 13)} /><span style={dot('76%', '64%', 10)} /><span style={dot('46%', '82%', 14)} />
      <span style={corner('top', 'left')} /><span style={corner('bottom', 'left')} /><span style={corner('top', 'right')} /><span style={corner('bottom', 'right')} />
      <span style={{ position: 'absolute', left: 44, top: 14, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#ffffff' }}><span style={{ width: 9, height: 9, borderRadius: 999, border: '2px solid #ffffff' }} />READY</span>
    </div>
  )
}

/** A row with a name on the left and a value on the right. Pressed when it is given somewhere to go. */
export function Pair({ name, children, onClick, id }: { name: string; children: ReactNode; onClick?: () => void; id?: string }) {
  const inside = <><span style={{ color: '#33443f' }}>{name}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, textAlign: 'right' }}>{children}{onClick && <Chevron />}</span></>
  return onClick ? <button data-pair={id ?? name} onClick={onClick} style={{ ...plain, ...pairRow }}>{inside}</button> : <span data-pair={id ?? name} style={pairRow}>{inside}</span>
}
/** A small film still with a play button in the middle. */
export const Still = ({ height, angle = 130, children }: { height: number; angle?: number; children?: ReactNode }) =>
  <span style={{ height, borderRadius: 10, background: `linear-gradient(${angle}deg,#1c3a33,#40826d)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{children}</span>
export const PlayMark = ({ size = 32, amber = false }: { size?: number; amber?: boolean }) => (
  <span style={{ width: size, height: size, borderRadius: 999, background: amber ? '#f4c95d' : '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width={Math.round(size * 0.44)} height={Math.round(size * 0.44)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
  </span>
)
