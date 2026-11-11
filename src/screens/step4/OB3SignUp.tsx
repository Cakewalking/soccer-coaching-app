const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const STEPS = ['Your account', 'Children check', 'Team setup', 'Invite staff', 'Done']
const AGES = ['U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16', 'U17', 'U18', 'Open age']
const GENDERS = ['Boys', 'Girls', 'Mixed']
const DIVS = ['Division 1', 'Division 2', 'Division 3', 'Division 4', 'Community']

export default function OB3SignUp(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0, flex: 1 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: i === 2 ? '#fff' : 'transparent' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: i < 2 ? '#40826d' : i === 2 ? G : 'rgba(255,255,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                  {i < 2 ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: 13, fontWeight: i === 2 ? 700 : 500, color: i === 2 ? INK : 'rgba(255,255,255,0.7)' }}>{s}</div>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Set up your team</div>
            <div style={{ fontSize: 15, color: MUT }}>This helps Clean Sheet tailor suggestions for your age group and competition level.</div>
          </div>

          <label style={{ display: 'block' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 4 }}>Team name</div>
            <input defaultValue="U12 Sam" style={{ width: '100%', boxSizing: 'border-box', height: 48, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 14px', fontSize: 16, color: INK, background: '#fff', fontFamily: 'inherit' }} />
          </label>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 8 }}>Age group</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {AGES.map(a => (
                <button key={a} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${a === 'U12' ? G : LN}`, background: a === 'U12' ? PALE : '#fff', color: a === 'U12' ? G : INK, fontSize: 14, fontWeight: a === 'U12' ? 700 : 500, cursor: 'pointer' }}>{a}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 8 }}>Gender</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {GENDERS.map(g => (
                <button key={g} style={{ height: 36, padding: '0 18px', borderRadius: 999, border: `1px solid ${g === 'Mixed' ? G : LN}`, background: g === 'Mixed' ? PALE : '#fff', color: g === 'Mixed' ? G : INK, fontSize: 14, fontWeight: g === 'Mixed' ? 700 : 500, cursor: 'pointer' }}>{g}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 8 }}>Division</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {DIVS.map(d => (
                <button key={d} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1px solid ${d === 'Division 2' ? G : LN}`, background: d === 'Division 2' ? PALE : '#fff', color: d === 'Division 2' ? G : INK, fontSize: 14, fontWeight: d === 'Division 2' ? 700 : 500, cursor: 'pointer' }}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: 340, background: '#fff', borderLeft: `1px solid ${LN}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>Why we ask</div>
          {[
            ['Age group', 'Drill suggestions change with age. U12 gets different pressing drills than U16.'],
            ['Division', 'Tells us how important winning is vs. development for your group.'],
            ['Gender', 'Affects load targets and growth check-points.'],
          ].map(([t, d]) => (
            <div key={t} style={{ padding: '12px 14px', background: PALE, borderRadius: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{t}</div>
              <div style={{ fontSize: 13, color: MUT, lineHeight: '19px' }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 'none', height: 68, background: '#fff', borderTop: `1px solid ${LN}`, padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer' }}>Back</button>
        <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Next →</button>
      </div>
    </div>
  )
}
