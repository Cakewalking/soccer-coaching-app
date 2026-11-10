import type { ReactNode } from 'react'
import { TOURS, type RoleId } from './tours'

interface Props {
  roleId: RoleId
  onSwitchRole: () => void
  onSwitchToDemo: () => void
  children: ReactNode
}

export default function DemoShellSandbox({ roleId, onSwitchRole, onSwitchToDemo, children }: Props) {
  const tour = TOURS[roleId]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* Sandbox bar */}
      <div style={{ flex: 'none', background: '#10211f', height: 48, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, zIndex: 20 }}>
        <button onClick={onSwitchRole} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.65)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: 0, flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Switch role
        </button>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)', flex: 'none' }} />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>Sandbox</span>
        <div style={{ flexGrow: 1, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
          {tour.roleLabel}
        </div>
        <button onClick={onSwitchToDemo} style={{ flex: 'none', height: 32, padding: '0 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'none', color: 'rgba(255,255,255,0.8)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Switch to the demo
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
