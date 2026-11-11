const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const TEAMS = [
  ['U7 Dan', 14, 0, 0], ['U8 Hannah', 16, 1, 0], ['U9 Mark', 16, 0, 1],
  ['U10 Nadia', 15, 0, 1], ['U11 Luke', 14, 2, 0], ['U12 Sam', 16, 0, 0],
  ['U13 Boys Kai', 14, 1, 1], ['U13 Girls Meg', 16, 0, 2], ['U14 Josh', 18, 0, 0],
  ['U15 Priya', 14, 1, 0], ['U16 Ollie', 18, 1, 0], ['U18 Dev', 16, 0, 1],
  ['Seniors A', 20, 0, 0], ['Seniors B', 18, 0, 1],
]

export default function DR1Registrations(_: { onBack?: () => void }) {
  const total = TEAMS.reduce((a, t) => a + (t[1] as number), 0)
  const feeOwing = TEAMS.reduce((a, t) => a + (t[2] as number), 0)
  const noConsent = TEAMS.reduce((a, t) => a + (t[3] as number), 0)
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <span style={{ padding: '2px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>CLUB</span>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · Club coordinator</div>
        {['Home','Registrations','Fixtures','Referees','Cards'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Registrations' ? 700 : 500, color: '#fff', background: n === 'Registrations' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 8px', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Registrations</h1>
        <span style={{ fontSize: 14, color: MUT }}>Season 2026 · {total} players across 14 teams</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '0 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {[[String(total),'Players','+16 this year'],[`${Math.round(total*0.91)}%`,'Returning','of last year total'],[`${total-feeOwing}/${total}`,'Fees paid',`${feeOwing} owing`],[`${total-noConsent}/${total}`,'Consent',`${noConsent} missing`]].map(([n, l, s]) => (
              <div key={n} style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{n}</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{l}</div>
                <div style={{ fontSize: 12, color: MUT }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '12px 16px', flex: 1, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px 100px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, paddingBottom: 6 }}>
              {['Team','Players','Fees owing','No consent'].map(h => <span key={h}>{h}</span>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 20 }}>
              {TEAMS.map((t, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px 100px', alignItems: 'center', minHeight: 42, borderTop: `1px solid ${LN}`, fontSize: 14, gap: 4 }}>
                  <strong>{t[0]}</strong>
                  <span style={{ color: MUT }}>{t[1]}</span>
                  <span style={{ color: (t[2] as number) > 0 ? '#c06000' : MUT, fontWeight: (t[2] as number) > 0 ? 700 : 400 }}>{(t[2] as number) > 0 ? t[2] : '—'}</span>
                  <span style={{ color: (t[3] as number) > 0 ? '#c00' : MUT, fontWeight: (t[3] as number) > 0 ? 700 : 400 }}>{(t[3] as number) > 0 ? t[3] : '—'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Quick actions</div>
            {['Send fee reminder to 5 families','Chase consent from 7 families','Export full registration list'].map(a => (
              <button key={a} style={{ height: 42, borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left' as const, padding: '0 14px' }}>{a}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
