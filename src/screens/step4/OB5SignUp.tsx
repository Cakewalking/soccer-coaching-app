const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function OB5SignUp(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 32px', display: 'flex', alignItems: 'center', background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', gap: 0 }}>
        {/* Left: main content — centred */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 60px' }}>
          <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Tick icon */}
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>

            <div>
              <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>U12 Sam is ready, Sam</div>
              <div style={{ fontSize: 16, color: MUT, lineHeight: '24px' }}>Next, add your players and set how you want to play. Your Home screen walks you through it, about 15 minutes in all.</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button style={{ height: 52, borderRadius: 12, border: 0, background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Go to Home
              </button>
              <button style={{ height: 52, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Set our style first
              </button>
            </div>
          </div>
        </div>

        {/* Right: summary sidebar */}
        <div style={{ width: 300, background: '#fff', borderLeft: `1px solid ${LN}`, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>Set up</div>
          {[
            { label: 'Club',         value: 'Wattle Creek FC' },
            { label: 'Team',         value: 'U12 Sam · Division 1' },
            { label: 'Fitness level', value: 'Play' },
            { label: 'Your role',    value: 'Coach' },
            { label: 'Team staff',   value: '2 invited' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderBottom: `1px solid ${LN}`, paddingBottom: 10 }}>
              <span style={{ color: MUT }}>{row.label}</span>
              <span style={{ fontWeight: 600, color: INK }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
