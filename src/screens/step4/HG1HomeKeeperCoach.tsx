const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const KEEPERS = [
  { ini: 'GO', name: 'Grace Owusu', sessions: 3, of: 4, ok: true },
  { ini: 'HN', name: 'Holly Ng', sessions: 4, of: 4, ok: true },
  { ini: 'SH', name: 'Sami Haddad', sessions: 2, of: 4, ok: true },
  { ini: 'AL', name: 'Ava Lim', sessions: 1, of: 4, ok: false },
  { ini: 'JB', name: 'Jack Byrne', sessions: 1, of: 4, ok: false },
  { ini: 'ST', name: 'Sophie Tan', sessions: 2, of: 4, ok: true },
]
const CLIPS = [
  { title: 'Ava — hesitant on crosses', team: 'U12 Sam', date: 'Sat 7 Jun' },
  { title: 'Grace — good sweep positioning', team: 'U13 Girls Meg', date: 'Sat 7 Jun' },
  { title: 'Jack — starting position too deep', team: 'U12 Sam', date: 'Sat 7 Jun' },
]

export default function HG1HomeKeeperCoach(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: G, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ flex: 1 }}><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', display: 'block' }}>Wattle Creek FC · Goalkeeper coach</span><span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Hi Nick</span></div>
        {['Home','Keepers','Sessions','Clips'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Home' ? 700 : 500, color: '#fff', background: n === 'Home' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0' }}>
        <span style={{ fontSize: 14, color: MUT }}>14 keepers · Tuesdays 6 pm · Foundation of Goalkeeping</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Attendance — this block (4 sessions)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 120px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, paddingBottom: 6 }}>
            {['','Keeper','Sessions'].map(h => <span key={h}>{h}</span>)}
          </div>
          {KEEPERS.map((k, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 180px', alignItems: 'center', minHeight: 48, borderTop: `1px solid ${LN}`, gap: 8 }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: k.ok ? PALE : '#fce9e9', color: k.ok ? G : '#c00', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{k.ini}</span>
              <strong style={{ fontSize: 14 }}>{k.name}</strong>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {Array.from({ length: k.of }).map((_, j) => (
                  <div key={j} style={{ width: 24, height: 24, borderRadius: 6, background: j < k.sessions ? G : '#e8edeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {j < k.sessions && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>}
                  </div>
                ))}
                {!k.ok && <span style={{ fontSize: 11, color: '#c00', fontWeight: 700, marginLeft: 4 }}>1 session</span>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Needs you</div>
            <div style={{ fontSize: 14, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 6 }}>Ava Lim and Jack Byrne have only made 1 session. Check in before Tuesday.</div>
            <div style={{ fontSize: 14, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 6 }}>1 message in inbox from Sam K — reply before training.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>From Saturday clips</div>
            {CLIPS.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, borderTop: `1px solid ${LN}`, paddingTop: 6 }}>
                <div style={{ width: 40, height: 36, borderRadius: 8, background: '#e8edeb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{c.team} · {c.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
