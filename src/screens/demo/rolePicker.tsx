import { useEffect, useState } from 'react'
import { ROLE_GROUPS, type RoleId } from './tours'

// Shared parts of the three role pickers (STA3, STA3e, STA3p): every role on one
// screen, one row per role, the whole row is the button.

export const INK = '#10211f', MUT = '#4a5a57', G = '#2f6252', GD = '#1f4a3e', BORDER = '#c5c8c4', LN = '#e3e5e2', PALE = '#eef5f2', BG = '#f3f3f1'

export type PickRole = { id: RoleId; name: string; sub: string; phone: boolean }
export type PickColumn = { key: string; title: string; roles: PickRole[] }

const TITLES: Record<string, string> = { 'ON THE PITCH': 'Coaches', 'FAMILIES': 'Families and players', 'RUNNING THE CLUB': 'Running the club', 'PRIVATE ACADEMIES': 'Private academies' }

/** The 20 roles in their four groups. The longer tours (the year, settings) are listed apart. */
export const COLUMNS: PickColumn[] = ROLE_GROUPS.filter(g => g.section in TITLES).map(g => ({
  key: g.section.toLowerCase().replace(/[^a-z]+/g, '-'),
  title: TITLES[g.section],
  roles: g.roles.map(r => ({ id: r.id, name: r.name, sub: r.desc.replace(/, Tall Timber$|, \d+$/, ''), phone: r.device === 'Phone' })),
}))
export const MORE_TOURS = ROLE_GROUPS.filter(g => !(g.section in TITLES)).flatMap(g => g.roles)
export const ROLE_COUNT = COLUMNS.reduce((n, c) => n + c.roles.length, 0)

export function DeviceIcon({ phone, color = MUT }: { phone: boolean; color?: string }) {
  return phone
    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18h2" /></svg>
    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="15" rx="2" /><path d="M10 16h4" /></svg>
}
export const Chevron = ({ color = G }: { color?: string }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>

export function RoleColumn({ col, rowHeight, showSub, showDevice = true, doing, onPick }: { col: PickColumn; rowHeight: number; showSub: boolean; showDevice?: boolean; doing: string; onPick: (id: RoleId) => void }) {
  return (
    <section id={`group-${col.key}`} aria-label={col.title} style={{ minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 2px 8px' }}>
        <h2 style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: INK }}>{col.title}</h2>
        <span style={{ fontSize: 12, color: MUT }}>{col.roles.length} roles</span>
      </div>
      <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden' }}>
        {col.roles.map((r, i) => (
          <button key={r.id} onClick={() => onPick(r.id)} aria-label={`${r.name}${showSub ? `, ${r.sub}` : ''}. Made for a ${r.phone ? 'phone' : 'tablet or laptop'}. ${doing}`}
            style={{ width: '100%', minHeight: rowHeight, display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', border: 0, borderTop: i ? `1px solid ${LN}` : 0, background: '#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', boxSizing: 'border-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: INK, lineHeight: 1.25 }}>{r.name}</span>
              {showSub && <span style={{ display: 'block', fontSize: 13, color: MUT, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.sub}</span>}
            </span>
            {showDevice && <DeviceIcon phone={r.phone} />}
            <Chevron />
          </button>
        ))}
      </div>
    </section>
  )
}

/** Four columns from 1000 wide (a laptop window is often about 1145), two by two from 700, one below that. */
export function useColumns(): 1 | 2 | 4 {
  const calc = () => (window.innerWidth >= 1000 ? 4 : window.innerWidth >= 700 ? 2 : 1) as 1 | 2 | 4
  const [n, setN] = useState(calc)
  useEffect(() => { const f = () => setN(calc()); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [])
  return n
}

/** True below 1280 wide, where the picker's rows are shortened so all four columns fit one view. */
export function useTight(): boolean {
  const calc = () => window.innerWidth < 1280
  const [t, setT] = useState(calc)
  useEffect(() => { const f = () => setT(calc()); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [])
  return t
}
