const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const STEPS = ['Your account', 'Children check', 'Team setup', 'Invite staff', 'Done']

export default function OB2SignUp(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0, flex: 1 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: i === 1 ? '#fff' : 'transparent' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: i === 0 ? '#40826d' : i === 1 ? G : 'rgba(255,255,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                  {i === 0 ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <div style={{ fontSize: 13, fontWeight: i === 1 ? 700 : 500, color: i === 1 ? INK : 'rgba(255,255,255,0.7)' }}>{s}</div>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Children check</div>
            <div style={{ fontSize: 15, color: MUT }}>Australian law requires anyone working with under-18s to hold a valid check.</div>
          </div>

          <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${LN}`, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#c39797', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5 9-10"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>Working with Children Check (WWC)</div>
                <div style={{ fontSize: 13, color: MUT }}>Required in all states for coaches working with under-18s.</div>
              </div>
            </div>

            <label style={{ display: 'block' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 4 }}>Check number</div>
              <input placeholder="e.g. WWC1234567A" style={{ width: '100%', boxSizing: 'border-box', height: 48, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 14px', fontSize: 16, color: INK, background: '#fff', fontFamily: 'inherit' }} />
            </label>

            <label style={{ display: 'block' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 4 }}>State or territory</div>
              <select style={{ width: '100%', boxSizing: 'border-box', height: 48, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 14px', fontSize: 15, color: INK, background: '#fff', fontFamily: 'inherit', appearance: 'none' as const }}>
                <option>Victoria</option>
                <option>New South Wales</option>
                <option>Queensland</option>
              </select>
            </label>

            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginTop: 3, accentColor: G, width: 18, height: 18 }} />
              <span style={{ fontSize: 14, lineHeight: '20px' }}>My check is current and I'll update Clean Sheet if it expires</span>
            </label>
          </div>

          <div style={{ background: PALE, borderRadius: 10, padding: '12px 14px', fontSize: 13, lineHeight: '19px', color: MUT }}>
            Don't have a check yet? You can still continue — you'll need to supply the number before your first session with players.
          </div>
        </div>

        <div style={{ width: 340, background: '#fff', borderLeft: `1px solid ${LN}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Why this matters</div>
            <div style={{ fontSize: 15, lineHeight: '22px', color: INK, marginBottom: 12 }}>A Working with Children Check verifies that a person has no relevant offences and is safe to work with children and young people.</div>
            <div style={{ fontSize: 15, lineHeight: '22px', color: INK }}>Wattle Creek FC will confirm your check with the relevant authority before you appear in any team as a coach.</div>
          </div>
          <div style={{ background: PALE, borderRadius: 10, padding: '12px 14px', fontSize: 13, lineHeight: '19px', color: MUT }}>
            Wattle Creek FC may contact you to verify your check number.
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
