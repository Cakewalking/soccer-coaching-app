// The top of every academy owner screen: the green bar with the six main items, and the sub-menu under it.
// Drawn as on the AD boards. The owner app and the older AC boards all use this one.
import type { CSSProperties, ReactNode } from 'react'
import { openScreen } from '../openThing'
import { OWNER_MENU, ownerMainOf, type OwnerItem } from './ownerMenu'

const INK = '#10211f'
const icon = (d: string, size = 20, weight = 2) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)
const plain: CSSProperties = { border: 0, margin: 0, background: 'transparent', fontFamily: 'inherit', cursor: 'pointer', boxSizing: 'border-box' }

/**
 * `current` is the id of the screen showing. `onGo` opens a screen by its id.
 * `extra` adds sub-menu items after the handover's own (the owner app keeps Messages and Academy colours there); `tools` sits beside the role chip.
 */
export default function OwnerHeader({ current, onGo, extra = [], tools }: { current: string; onGo: (id: string) => void; extra?: OwnerItem[]; tools?: ReactNode }) {
  const inExtra = extra.some(s => s.id === current)
  const main = inExtra ? 'home' : ownerMainOf(current)
  const group = OWNER_MENU.find(g => g.key === main)!
  const sub = main === 'home' ? [...group.sub, ...extra] : group.sub
  // The older home and the screens opened from it sit under Overview.
  const on = sub.some(s => s.id === current) ? current : group.sub[0].id
  return (
    <header style={{ flex: 'none', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div data-club-bar="" style={{ height: 64, boxSizing: 'border-box', padding: '0 22px', display: 'flex', alignItems: 'center', gap: 12, background: '#2f6252' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Clean Sheet</div>
        <nav aria-label="Main" style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          {OWNER_MENU.map(g => {
            const active = g.key === main
            return (
              <button key={g.key} data-club-tab={active ? 'on' : 'off'} aria-current={active ? 'page' : undefined} onClick={() => onGo(g.sub[0].id)}
                style={{ ...plain, height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap', background: active ? '#40826d' : 'transparent', color: active ? '#ffffff' : '#e9eae8' }}>
                {icon(g.icon)}{g.label}
              </button>
            )
          })}
        </nav>
        <button data-club-pill="" onClick={() => openScreen('VS1-SwitchView')} style={{ ...plain, height: 44, padding: '0 14px', borderRadius: 999, background: '#ffffff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
          Tall Timber Academy {icon('M6 9l6 6 6-6', 16, 2.4)}
        </button>
        <button data-club-keep="" aria-label="Your account and settings" onClick={() => openScreen('SET1-Account', 'Dani Okafor · owner, Tall Timber Academy')} style={{ ...plain, width: 44, height: 44, padding: 0, borderRadius: 999, background: '#c39797', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flex: 'none' }}>DO</button>
      </div>
      <div style={{ height: 44, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24, background: '#ffffff', borderBottom: '1px solid #c5c8c4' }}>
        <nav aria-label={group.label} style={{ display: 'flex', gap: 24, flexGrow: 1, height: 44 }}>
          {sub.map(s => {
            const active = s.id === on
            return (
              <button key={s.id} aria-current={active ? 'page' : undefined} onClick={() => onGo(s.id)}
                style={{ ...plain, height: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 4px', fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', color: active ? INK : '#4a5a57', borderBottom: `3px solid ${active ? '#40826d' : 'transparent'}` }}>
                {s.label}
              </button>
            )
          })}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 44, flex: 'none' }}>
          {tools}
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: '#f4e6e6', color: INK, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>
            {icon('M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0', 14, 2.4)}Academy owner
          </span>
        </div>
      </div>
    </header>
  )
}
