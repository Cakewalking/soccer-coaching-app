import type { ReactNode } from 'react'
import { TOURS, type RoleId } from './tours'
import { type DemoPhase } from './DemoShell'

const PHASE_LABELS: Record<DemoPhase, string> = {
  preseason:  'Pre-season',
  season:     'Season',
  postseason: 'Post-season',
  restmonth:  'Rest month',
}

const SHORT_ROLE: Partial<Record<RoleId, string>> = {
  parent:       'a parent',
  manager:      'a team manager',
  playeryoung:  'a player',
  playerolder:  'a player',
  referee:      'a referee',
  academyparent: 'an academy parent',
  academyplayer: 'an academy player',
}

function shortPersona(roleId: RoleId): string {
  const tour = TOURS[roleId]
  const firstName = tour.persona.replace(/^as /, '').split(/[ ,]/)[0]
  const role = SHORT_ROLE[roleId] ?? tour.roleLabel.toLowerCase()
  return `as ${firstName}, ${role}`
}

interface Props {
  roleId: RoleId
  onBack: () => void
  onStartTour: () => void
  children: ReactNode
  phase?: DemoPhase
  onPhaseChange?: (p: DemoPhase) => void
}

export default function DemoShellPhone({ roleId, onBack, onStartTour, children, phase, onPhaseChange }: Props) {
  const persona = shortPersona(roleId)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'var(--font-sans)', background: '#e8e9e7' }}>

      {/* Demo bar */}
      <div style={{ flex: 'none', background: '#1f4a3e', display: 'flex', flexDirection: 'column', zIndex: 20 }}>
        <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10 }}>
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.65)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, padding: 0, flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Roles
          </button>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.2)', flex: 'none' }} />
          <div style={{ flex: 1, fontSize: 12, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            <span style={{ color: '#fff', fontWeight: 700 }}>Demo.</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}> {persona} · Nothing you tap is saved.</span>
          </div>
          <button onClick={onStartTour} style={{ flex: 'none', height: 28, padding: '0 10px', borderRadius: 6, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>
            Tour →
          </button>
        </div>

        {phase && onPhaseChange && (
          <div style={{ display: 'flex', gap: 2, padding: '0 16px 8px' }}>
            {(Object.keys(PHASE_LABELS) as DemoPhase[]).map(p => (
              <button key={p} onClick={() => onPhaseChange(p)} style={{
                flex: 1, height: 24, borderRadius: 5, border: 0,
                background: phase === p ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.12)',
                color: phase === p ? '#1f4a3e' : 'rgba(255,255,255,0.75)',
                fontFamily: 'inherit', fontSize: 10, fontWeight: phase === p ? 700 : 400,
                cursor: 'pointer', whiteSpace: 'nowrap' as const,
              }}>
                {PHASE_LABELS[p]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Phone content — centred */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
        {children}
      </div>
    </div>
  )
}
