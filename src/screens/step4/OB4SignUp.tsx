const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const STEPS = ['Your account', 'Your club', 'Your team', 'All set']

const ROLES = [
  { id: 'coach', label: 'Coach',               desc: 'Plans training, runs games' },
  { id: 'mgr',   label: 'Team manager',         desc: 'Meet times, parents, game day' },
  { id: 'fit',   label: 'Fitness coach',         desc: 'Growth, load and tests' },
  { id: 'dof',   label: 'Director of football',  desc: 'Every team, coaches, safety' },
  { id: 'chair', label: 'Chair or committee',    desc: 'Club overview and reports' },
]

const INVITE_ROWS = ['Co-coach', 'Manager', 'Fitness']

export default function OB4SignUp(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0, flex: 1 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: i === 3 ? '#fff' : 'transparent' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: i < 3 ? '#40826d' : i === 3 ? G : 'rgba(255,255,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                  {i < 3
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
                    : i + 1
                  }
                </div>
                <div style={{ fontSize: 13, fontWeight: i === 3 ? 700 : 500, color: i === 3 ? INK : 'rgba(255,255,255,0.7)' }}>{s}</div>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', gap: 0, overflow: 'hidden' }}>
        {/* Left: main content */}
        <div style={{ flex: 1, padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>You and your coaches</div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>What's your role?</div>
          </div>

          {/* Role picker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ROLES.map(r => (
              <label key={r.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '11px 16px', borderRadius: 10, border: `1px solid ${r.id === 'coach' ? G : LN}`, background: r.id === 'coach' ? PALE : '#fff', cursor: 'pointer' }}>
                <input type="radio" name="role" defaultChecked={r.id === 'coach'} style={{ accentColor: G, flex: 'none', width: 16, height: 16 }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>{r.label}</div>
                <div style={{ fontSize: 13, color: MUT, marginLeft: 4 }}>{r.desc}</div>
              </label>
            ))}
          </div>

          {/* Invite team staff */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 10 }}>Invite your team staff <span style={{ fontWeight: 400 }}>optional</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {INVITE_ROWS.map(role => (
                <div key={role} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 80, fontSize: 13, fontWeight: 600, color: MUT, flex: 'none' }}>{role}</div>
                  <input placeholder="email@example.com" style={{ flex: 1, height: 40, border: `1px solid ${LN}`, borderRadius: 8, padding: '0 12px', fontSize: 14, color: INK, background: '#fff', fontFamily: 'inherit' }} />
                </div>
              ))}
            </div>
            <button style={{ marginTop: 10, fontSize: 14, fontWeight: 600, color: G, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>+ Add another</button>
          </div>

          {/* Players and parents */}
          <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${LN}`, padding: '16px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Players and parents</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 4 }}>Your team link is ready</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: '19px', marginBottom: 14 }}>Parents join, add their child and give consent. Players under 15 join through a parent.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>What parents see</button>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 8, border: 0, background: G, fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Copy link</button>
            </div>
          </div>

          <div style={{ fontSize: 12, color: MUT }}>Invites expire after 7 days. Coaches only see this team.</div>
        </div>

        {/* Right: summary sidebar */}
        <div style={{ width: 300, background: '#fff', borderLeft: `1px solid ${LN}`, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>Your team so far</div>
          {[
            { label: 'Club',         value: 'Wattle Creek FC' },
            { label: 'Team',         value: 'U12 Sam · Division 1' },
            { label: 'Fitness level', value: 'Play' },
            { label: 'Your role',    value: '—' },
            { label: 'Team staff',   value: '—' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderBottom: `1px solid ${LN}`, paddingBottom: 10 }}>
              <span style={{ color: MUT }}>{row.label}</span>
              <span style={{ fontWeight: 600, color: INK }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 'none', height: 68, background: '#fff', borderTop: `1px solid ${LN}`, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Back</button>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: MUT }}>You can invite coaches and parents later too.</span>
          <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Finish</button>
        </div>
      </div>
    </div>
  )
}
