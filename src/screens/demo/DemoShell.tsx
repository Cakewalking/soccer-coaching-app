import type { ReactNode } from 'react'
import { TOURS, type RoleId } from './tours'

export type DemoPhase = 'preseason' | 'season' | 'postseason' | 'restmonth'

const PHASE_LABELS: Record<DemoPhase, string> = {
  preseason:  'Pre-season',
  season:     'Season',
  postseason: 'Post-season',
  restmonth:  'Rest month',
}

interface Props {
  roleId: RoleId
  onBack: () => void
  onStartTour: () => void
  children: ReactNode
  phase?: DemoPhase
  onPhaseChange?: (p: DemoPhase) => void
}

export default function DemoShell({ roleId, onBack, onStartTour, children, phase, onPhaseChange }: Props) {
  const tour = TOURS[roleId]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* Demo bar */}
      <div style={{ flex: 'none', background: '#1f4a3e', height: 48, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, zIndex: 20 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.65)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: 0, flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Switch role
        </button>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)', flex: 'none' }} />
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.65)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          <span style={{ color: '#fff', fontWeight: 700 }}>Looking around</span> {tour.persona} · {tour.roleLabel} · Nothing you tap is saved.
        </div>
        {phase && onPhaseChange && (
          <div style={{ display: 'flex', gap: 3, flex: 'none' }}>
            {(Object.keys(PHASE_LABELS) as DemoPhase[]).map(p => (
              <button key={p} onClick={() => onPhaseChange(p)} style={{
                height: 28, padding: '0 10px', borderRadius: 6, border: 0,
                background: phase === p ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.12)',
                color: phase === p ? '#1f4a3e' : 'rgba(255,255,255,0.75)',
                fontFamily: 'inherit', fontSize: 12, fontWeight: phase === p ? 700 : 400,
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
                {PHASE_LABELS[p]}
              </button>
            ))}
          </div>
        )}
        <button onClick={onStartTour} style={{ flex: 'none', height: 32, padding: '0 14px', borderRadius: 8, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Guided tour →
        </button>
      </div>

      {/* Screen */}
      <div style={{ flex: 1, background: tour.device === 'phone' ? '#e8e9e7' : undefined }}>
        {tour.device === 'phone'
          ? <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>{children}</div>
          : children
        }
      </div>
    </div>
  )
}
