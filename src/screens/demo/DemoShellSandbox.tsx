import type { ReactNode } from 'react'
import { TOURS, type RoleId } from './tours'
import { type DemoPhase } from './DemoShell'

const PHASE_LABELS: Record<DemoPhase, string> = {
  preseason:  'Pre-season',
  season:     'Season',
  postseason: 'Post-season',
  restmonth:  'Rest month',
}

interface Props {
  roleId: RoleId
  onSwitchRole: () => void
  onSwitchToDemo: () => void
  children: ReactNode
  phase?: DemoPhase
  onPhaseChange?: (p: DemoPhase) => void
}

export default function DemoShellSandbox({ roleId, onSwitchRole, onSwitchToDemo, children, phase, onPhaseChange }: Props) {
  const tour = TOURS[roleId]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* Sandbox bar */}
      <div style={{ flex: 'none', background: '#10211f', height: 48, display: 'flex', alignItems: 'center', padding: '0 0 0 16px', gap: 10, zIndex: 20 }}>
        <button onClick={onSwitchRole} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.75)', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, padding: 0, flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Switch role
        </button>
        <div style={{ height: 22, padding: '0 8px', borderRadius: 6, border: '1.5px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: '#fff', flexShrink: 0 }}>SANDBOX</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', flex: '0 1 auto', minWidth: 0 }}>
          Your own club · kept until <strong style={{ color: '#fff' }}>Thu 18 June</strong>
        </div>
        <div style={{ flex: 1 }} />
        {phase && onPhaseChange && (
          <div style={{ display: 'flex', alignSelf: 'stretch', flex: 'none' }}>
            {(Object.keys(PHASE_LABELS) as DemoPhase[]).map(p => (
              <button key={p} onClick={() => onPhaseChange(p)} style={{
                height: '100%', padding: '0 14px', border: 0,
                borderBottom: phase === p ? '2px solid #fff' : '2px solid transparent',
                background: 'none',
                color: phase === p ? '#fff' : 'rgba(255,255,255,0.6)',
                fontFamily: 'inherit', fontSize: 13, fontWeight: phase === p ? 700 : 400,
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
                {PHASE_LABELS[p]}
              </button>
            ))}
          </div>
        )}
        <button onClick={onSwitchToDemo} style={{ alignSelf: 'stretch', padding: '0 18px', border: 0, borderLeft: '1px solid rgba(255,255,255,0.15)', background: 'none', color: 'rgba(255,255,255,0.8)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flex: 'none' }}>
          Switch to the demo
        </button>
      </div>

      {/* Screen */}
      <div style={{ flex: 1, background: tour.device === 'phone' ? '#e8e9e7' : undefined, display: 'flex', justifyContent: 'center' }}>
        {tour.device === 'phone'
          ? <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px', width: '100%' }}>{children}</div>
          : <div style={{ width: '100%', maxWidth: 1180 }}>{children}</div>
        }
      </div>
    </div>
  )
}
