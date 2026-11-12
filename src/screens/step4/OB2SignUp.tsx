import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const STEPS = ['Your account', 'Your club', 'Your team', 'All set']

const CLUBS = [
  { ini: 'WC', name: 'Wattle Creek FC',       loc: 'Melbourne, VIC · not on Clean Sheet yet', action: 'Set it up', highlight: true },
  { ini: 'WJ', name: 'Wattle Creek Juniors (Netball)', loc: 'Melbourne, VIC · different sport',       action: null,       highlight: false },
  { ini: 'WP', name: 'Wattle Park Rangers',   loc: 'Melbourne, VIC · 6 teams on Clean Sheet', action: 'Ask to join', highlight: false },
]

export default function OB2SignUp(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0, flex: 1 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: i === 1 ? '#fff' : 'transparent' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: i === 0 ? '#40826d' : i === 1 ? G : 'rgba(255,255,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                  {i === 0
                    ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
                    : i + 1
                  }
                </div>
                <div style={{ fontSize: 13, fontWeight: i === 1 ? 700 : 500, color: i === 1 ? INK : 'rgba(255,255,255,0.7)' }}>{s}</div>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexGrow: 1, display: 'flex', gap: 0 }}>
        {/* Left: main content */}
        <div style={{ flex: 1, padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Your club</div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Find your club</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CLUBS.map(club => (
              <div key={club.ini} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${club.highlight ? G : LN}`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: club.highlight ? PALE : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: club.highlight ? G : MUT, flexShrink: 0 }}>{club.ini}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{club.name}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{club.loc}</div>
                </div>
                {club.action && (
                  <button onClick={() => st(`${club.action}.`)} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: club.highlight ? 0 : `1px solid ${LN}`, background: club.highlight ? G : '#fff', color: club.highlight ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                    {club.action}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div style={{ background: PALE, borderRadius: 10, padding: '12px 16px', fontSize: 13, color: MUT, lineHeight: '19px' }}>
            You're the first from Wattle Creek FC. You'll be its admin until a director of football joins.
          </div>

          <button onClick={() => st("Opening add club form.")} style={{ alignSelf: 'flex-start', fontSize: 14, fontWeight: 600, color: G, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Can't find it? Add your club
          </button>
        </div>

        {/* Right: summary sidebar */}
        <div style={{ width: 300, background: '#fff', borderLeft: `1px solid ${LN}`, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>Your team so far</div>
          {[
            { label: 'Club', value: 'Wattle Creek FC' },
            { label: 'Team', value: '—' },
            { label: 'Fitness level', value: '—' },
            { label: 'Your role', value: '—' },
            { label: 'Team staff', value: '—' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderBottom: `1px solid ${LN}`, paddingBottom: 10 }}>
              <span style={{ color: MUT }}>{row.label}</span>
              <span style={{ fontWeight: 600, color: INK }}>{row.value}</span>
            </div>
          ))}
          <div style={{ fontSize: 12, color: MUT, lineHeight: '18px', marginTop: 8 }}>
            Setting up a new club makes you its admin. You can hand that to someone else later.
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
