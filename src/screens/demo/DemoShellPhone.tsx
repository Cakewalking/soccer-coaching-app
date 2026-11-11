import { useState } from 'react'
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

const PHASE_SUBS: Record<DemoPhase, string> = {
  preseason:  'March · squads, trials, friendlies',
  season:     'June · training, games, reviews',
  postseason: 'October · wrap-up, tournaments, indoor',
  restmonth:  'December · nothing to do',
}

export default function DemoShellPhone({ roleId, onBack, onStartTour, children, phase, onPhaseChange }: Props) {
  const persona = shortPersona(roleId)
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'var(--font-sans)', background: '#e8e9e7' }}>

      {/* Demo bar — single row */}
      <div style={{ flex: 'none', background: '#1f4a3e', height: 44, display: 'flex', alignItems: 'center', padding: '0 0 0 14px', gap: 8, zIndex: 20 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.75)', fontFamily: 'inherit', fontSize: 12, fontWeight: 500, padding: 0, flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Roles
        </button>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.2)', flex: 'none' }} />
        <div style={{ flex: 1, fontSize: 12, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          <span style={{ color: '#fff', fontWeight: 700 }}>Demo.</span>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}> {persona}</span>
        </div>
        {phase && onPhaseChange ? (
          <button onClick={() => setSheetOpen(true)} style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center', gap: 5, padding: '0 14px', border: 0, borderLeft: '1px solid rgba(255,255,255,0.15)', background: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
            {PHASE_LABELS[phase]}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        ) : (
          <button onClick={onStartTour} style={{ alignSelf: 'stretch', padding: '0 12px', border: 0, borderLeft: '1px solid rgba(255,255,255,0.15)', background: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
            Tour →
          </button>
        )}
      </div>

      {/* Phone content — centred */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '24px 0 40px' }}>
        {children}
      </div>

      {/* Phase picker bottom sheet */}
      {sheetOpen && phase && onPhaseChange && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} onClick={() => setSheetOpen(false)}>
          <div style={{ background: 'rgba(0,0,0,0.4)', position: 'absolute', inset: 0 }} />
          <div style={{ position: 'relative', background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px 20px 40px', maxWidth: 480, width: '100%', margin: '0 auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f', marginBottom: 6 }}>Which part of the year?</div>
            <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 20, lineHeight: 1.4 }}>The demo shows the same club at four times of year. Every role changes with it.</div>
            {(Object.keys(PHASE_LABELS) as DemoPhase[]).map(p => (
              <button key={p} onClick={() => { onPhaseChange(p); setSheetOpen(false) }} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '14px 16px', borderRadius: 12, marginBottom: 8,
                border: `2px solid ${phase === p ? '#1f4a3e' : '#e8e9e7'}`,
                background: '#fff', textAlign: 'left' as const, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{PHASE_LABELS[p]}</div>
                  <div style={{ fontSize: 13, color: '#4a5a57' }}>{PHASE_SUBS[p]}</div>
                </div>
                {phase === p && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f4a3e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
