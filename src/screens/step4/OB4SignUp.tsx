const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const STEPS = ['Your account', 'Children check', 'Team setup', 'Invite staff', 'Done']
const ROLES = [
  { id: 'head', label: 'Head coach', desc: 'Full access to all data and planning tools.' },
  { id: 'asst', label: 'Assistant coach', desc: 'Training plans and squad. No sensitive wellness data.' },
  { id: 'fit', label: 'Fitness coach', desc: 'Load, wellness and growth only.' },
]

export default function OB4SignUp(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0, flex: 1 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: i === 3 ? '#fff' : 'transparent' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: i < 3 ? '#40826d' : i === 3 ? G : 'rgba(255,255,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                  {i < 3 ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: 13, fontWeight: i === 3 ? 700 : 500, color: i === 3 ? INK : 'rgba(255,255,255,0.7)' }}>{s}</div>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', gap: 0 }}>
        <div style={{ flex: 1, padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Invite your staff</div>
            <div style={{ fontSize: 15, color: MUT }}>They'll get an email with a link to join U12 Sam. You can skip this and invite later.</div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 8 }}>Your role on this team</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ROLES.map(r => (
                <label key={r.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 16px', borderRadius: 12, border: `1px solid ${r.id === 'head' ? G : LN}`, background: r.id === 'head' ? PALE : '#fff', cursor: 'pointer' }}>
                  <input type="radio" name="role" defaultChecked={r.id === 'head'} style={{ marginTop: 3, accentColor: G, flex: 'none' }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{r.label}</div>
                    <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{r.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 8 }}>Invite by email <span style={{ fontWeight: 400 }}>(optional)</span></div>
            {[0, 1].map(i => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <input placeholder="coach@example.com" style={{ flex: 1, height: 46, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 14px', fontSize: 15, color: INK, background: '#fff', fontFamily: 'inherit' }} />
                <select style={{ width: 180, height: 46, border: `1px solid ${LN}`, borderRadius: 10, padding: '0 12px', fontSize: 14, color: INK, background: '#fff', fontFamily: 'inherit' }}>
                  <option>Head coach</option>
                  <option>Assistant coach</option>
                  <option>Fitness coach</option>
                </select>
              </div>
            ))}
            <button style={{ fontSize: 14, fontWeight: 600, color: G, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>+ Add another</button>
          </div>
        </div>

        <div style={{ width: 340, background: '#fff', borderLeft: `1px solid ${LN}`, padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>Access levels</div>
          <div style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>Each role only sees what's relevant. Wellness scores and growth data are only visible to head coaches and fitness coaches.</div>
          <div style={{ background: PALE, borderRadius: 10, padding: '12px 14px', fontSize: 13, lineHeight: '19px', color: MUT }}>
            Coaches can only see the teams they're invited to. Parents never see other players' data.
          </div>
        </div>
      </div>

      <div style={{ flex: 'none', height: 68, background: '#fff', borderTop: `1px solid ${LN}`, padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer' }}>Back</button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer' }}>Skip for now</button>
          <button style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Send invites →</button>
        </div>
      </div>
    </div>
  )
}
