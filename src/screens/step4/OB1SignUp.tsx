const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const STEPS = ['Your account', 'Children check', 'Team setup', 'Invite staff', 'Done']

export default function OB1SignUp(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0, flex: 1 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: i === 0 ? '#fff' : 'transparent' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: i === 0 ? G : i < 0 ? '#40826d' : 'rgba(255,255,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</div>
                <div style={{ fontSize: 13, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? INK : 'rgba(255,255,255,0.7)' }}>{s}</div>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Create your account</div>
            <div style={{ fontSize: 15, color: MUT }}>Your details as a coach. Players and parents join separately.</div>
          </div>

          {[['First name', 'e.g. Sam'], ['Last name', 'e.g. Kowalski'], ['Email address', 'you@example.com']].map(([label, placeholder]) => (
            <label key={label} style={{ display: 'block' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 4 }}>{label}</div>
              <input placeholder={placeholder} style={{ width: '100%', boxSizing: 'border-box', height: 48, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 14px', fontSize: 16, color: INK, background: '#fff', fontFamily: 'inherit' }} />
            </label>
          ))}

          <label style={{ display: 'block' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 4 }}>Password</div>
            <input type="password" placeholder="At least 8 characters" style={{ width: '100%', boxSizing: 'border-box', height: 48, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 14px', fontSize: 16, color: INK, background: '#fff', fontFamily: 'inherit' }} />
          </label>
        </div>

        <div style={{ width: 340, background: '#fff', borderLeft: `1px solid ${LN}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Working with children check</div>
            <div style={{ fontSize: 15, lineHeight: '22px', color: INK, marginBottom: 12 }}>Australian law requires coaches working with under-18s to hold a valid check.</div>
            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginTop: 3, accentColor: G, width: 18, height: 18 }} />
              <span style={{ fontSize: 14, lineHeight: '20px' }}>I have a current Working with Children Check (or state equivalent)</span>
            </label>
          </div>
          <div style={{ background: PALE, borderRadius: 10, padding: '12px 14px', fontSize: 13, lineHeight: '19px', color: MUT }}>
            Wattle Creek FC may ask you to supply your check number separately.
          </div>
        </div>
      </div>

      <div style={{ flex: 'none', height: 68, background: '#fff', borderTop: `1px solid ${LN}`, padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer' }}>Back</button>
        <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Next →</button>
      </div>
    </div>
  )
}
