import { ROLE_GROUPS, type RoleId } from './tours'

interface Props {
  onRole: (role: RoleId) => void
  onSwitchToDemo: () => void
  expiryDate?: string
  onFill?: () => void
  onReset?: () => void
}

export default function DemoStartEmpty({ onRole, onSwitchToDemo, expiryDate = 'Thursday 18 June', onFill, onReset }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6f4', fontFamily: 'var(--font-sans)' }}>

      {/* Sandbox bar */}
      <div style={{ background: '#10211f', padding: '0 32px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Sandbox · Your data</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Your own empty club, as a coach. What you add is saved until {expiryDate}.</span>
        </div>
        <button onClick={onSwitchToDemo} style={{ height: 44, padding: '0 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'none', color: 'rgba(255,255,255,0.8)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Switch to the demo</button>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 48px 24px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{ width: 28, height: 28, background: '#2f6252', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f' }}>Clean Sheet</span>
        </div>
        <h1 style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: '#10211f' }}>Your club is empty. Where do you want to start?</h1>
        <p style={{ margin: '0 0 8px', fontSize: 14, color: '#4a5a57' }}>You play every role. What you set up as the coach shows up for the parent, the team manager and the club.</p>
      </div>

      {/* Role groups */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 48px', boxSizing: 'border-box' }}>
        {ROLE_GROUPS.map(group => (
          <div key={group.section} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#6f7f7b', textTransform: 'uppercase', marginBottom: 10 }}>{group.section}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
              {group.roles.map(role => (
                <button key={role.id} onClick={() => onRole(role.id)} style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{role.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: '999px', background: '#f0f1ef', color: '#6f7f7b' }}>{role.device}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 20 }}>Most people start as a coach or the director. Each role opens on its first-use screen, with the next step spelled out.</div>
      </div>

      {/* Three things to try + sandbox controls */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 48px 48px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'start' }}>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>Three things to try first</div>
          {[
            { n: '1', label: 'Set up a team and add players', note: 'About 3 minutes. Made-up names only' },
            { n: '2', label: "Plan this week's training",      note: 'Pick from the drill library' },
            { n: '3', label: 'Add a game',                    note: 'No camera? Use our sample recording' },
          ].map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 12, fontWeight: 700, color: '#2f6252' }}>{item.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{item.label}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b' }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', minWidth: 260 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 14 }}>Your sandbox</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>Fill with sample data</div>
              <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 8 }}>A squad, three games and recordings, marked as samples</div>
              <button onClick={onFill} style={{ height: 44, padding: '0 16px', borderRadius: 8, border: '1.5px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#10211f', cursor: 'pointer' }}>Fill</button>
            </div>
            <div style={{ borderTop: '1px solid #e9eae8', paddingTop: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>Empty it and start again</div>
              <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 8 }}>Removes everything you've added</div>
              <button onClick={onReset} style={{ height: 44, padding: '0 16px', borderRadius: 8, border: '1.5px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#10211f', cursor: 'pointer' }}>Reset</button>
            </div>
            <div style={{ borderTop: '1px solid #e9eae8', paddingTop: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>Keep it going</div>
              <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 8 }}>Turn the sandbox into a real club account</div>
              <button style={{ height: 44, padding: '0 16px', borderRadius: 8, border: '1.5px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#10211f', cursor: 'pointer' }}>Ask us</button>
            </div>
          </div>
          <div style={{ marginTop: 14, padding: '10px 12px', background: '#f5f6f4', borderRadius: 10, fontSize: 12, color: '#6f7f7b', lineHeight: 1.5 }}>
            <strong style={{ color: '#10211f' }}>Good to know.</strong> Nobody is invited or messaged from a sandbox. Please don't enter real children's details. Everything is deleted on {expiryDate}.
          </div>
        </div>
      </div>
    </div>
  )
}
