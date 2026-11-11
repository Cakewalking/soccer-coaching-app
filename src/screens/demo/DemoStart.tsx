import { ROLE_GROUPS, type RoleId } from './tours'

interface Props {
  onTour: (role: RoleId) => void
  onLook: (role: RoleId) => void
  onStory: () => void
  onWhy: () => void
  onSandbox?: () => void
}

export default function DemoStart({ onTour, onLook, onStory, onWhy, onSandbox }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f4', fontFamily: 'var(--font-sans)' }}>

      {/* Top bar */}
      <div style={{ background: '#1f4a3e', padding: '0 32px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>Demo.</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Wattle Creek FC, Tall Timber Academy and everyone in them are made up. Nothing you tap is saved.</span>
        </div>
        {onSandbox && (
          <button onClick={onSandbox} style={{ height: 32, padding: '0 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'none', color: 'rgba(255,255,255,0.8)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>Start with an empty club instead</button>
        )}
      </div>

      {/* Hero section */}
      <div style={{ padding: '40px 48px 24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, maxWidth: 1180, margin: '0 auto' }}>
        <div>
          <h1 style={{ margin: '0 0 8px', fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: '#10211f' }}>Pick who you are</h1>
          <p style={{ margin: 0, fontSize: 15, color: '#4a5a57' }}>Start with the one-minute story. Then take a guided tour of any role's week, or look around on your own.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button onClick={onWhy} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f', whiteSpace: 'nowrap' }}>Why trust it</button>
          <button onClick={onStory} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>The idea in one minute →</button>
        </div>
      </div>

      {/* Role groups */}
      <div style={{ padding: '0 48px 48px', maxWidth: 1180, margin: '0 auto' }}>
        {ROLE_GROUPS.map(group => (
          <div key={group.section} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#6f7f7b', textTransform: 'uppercase', marginBottom: 12 }}>{group.section}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {group.roles.map(role => (
                <div key={role.id} style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{role.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: '999px', background: '#f0f1ef', color: '#6f7f7b' }}>{role.device}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#6f7f7b' }}>{role.desc}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => onTour(role.id)} style={{ flex: 1, height: 36, borderRadius: 8, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Guided tour</button>
                    <button onClick={() => onLook(role.id)} style={{ flex: 1, height: 36, borderRadius: 8, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Look around</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Academy blurb for Private Academies section */}
            {group.section === 'PRIVATE ACADEMIES' && (
              <div style={{ marginTop: 12, padding: '14px 18px', background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>The same app, set up for an academy</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: 1.5 }}>Terms and programs in place of seasons and fixtures. Free trials, fees, one-on-ones and a progress report each term. Players who also play for a club can share their week both ways.</div>
              </div>
            )}

            {/* Phone QR hint in Families section */}
            {group.section === 'FAMILIES' && (
              <div style={{ marginTop: 12, padding: '14px 18px', background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 60, height: 60, background: '#1f4a3e', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M17 17v4M21 14v3h-4"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>Try the phone roles on your phone</div>
                  <div style={{ fontSize: 13, color: '#4a5a57' }}>Point your camera at the code. It opens a phone-sized start screen for parents, players, team managers and referees.</div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 8 }}>
          A guided tour steps through that role's week. "Look around" opens their home screen. The demo bar on every screen lets you switch role.
        </div>
      </div>
    </div>
  )
}
