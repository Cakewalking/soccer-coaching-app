const G = '#2f6252', GD = '#1f4a3e', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const TEAMS = [
  { team: 'U10 Nadia', keepers: 2, setup: true, sessions: 3, passPct: 48 },
  { team: 'U11 Luke', keepers: 2, setup: true, sessions: 4, passPct: 55 },
  { team: 'U12 Sam', keepers: 2, setup: true, sessions: 3, passPct: 61 },
  { team: 'U13 Boys Kai', keepers: 3, setup: false, sessions: 2, passPct: 44 },
  { team: 'U13 Girls Meg', keepers: 2, setup: true, sessions: 4, passPct: 59 },
  { team: 'U14 Josh', keepers: 2, setup: true, sessions: 5, passPct: 67 },
  { team: 'U16 Ollie', keepers: 3, setup: true, sessions: 5, passPct: 72 },
]

export default function FK1Goalkeepers(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <span style={{ padding: '2px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>CLUB</span>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · Goalkeepers</div>
        {['Overview','Sessions','Keepers','Coaches'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Overview' ? 700 : 500, color: '#fff', background: n === 'Overview' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Goalkeepers by team</h1>
        <span style={{ fontSize: 14, color: MUT }}>16 keepers across 7 teams · Season 2026</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px 160px 180px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, paddingBottom: 6 }}>
            {['Team','Keepers','Set-up','Sessions (May)','Passes finding player'].map(h => <span key={h}>{h}</span>)}
          </div>
          {TEAMS.map((t, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px 160px 180px', alignItems: 'center', minHeight: 52, borderTop: `1px solid ${LN}`, gap: 8 }}>
              <strong style={{ fontSize: 14 }}>{t.team}</strong>
              <span style={{ fontSize: 14, color: MUT }}>{t.keepers}</span>
              <span style={{ padding: '2px 10px', borderRadius: 99, background: t.setup ? PALE : '#fce9e9', color: t.setup ? G : '#c00', fontWeight: 700, fontSize: 11, display: 'inline-block' }}>{t.setup ? 'Yes' : 'No'}</span>
              <span style={{ fontSize: 14 }}>{t.sessions} sessions</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 8, borderRadius: 99, background: '#e8edeb', overflow: 'hidden' }}>
                  <div style={{ width: `${t.passPct}%`, height: '100%', background: G, borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, width: 36, textAlign: 'right' as const }}>{t.passPct}%</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Keeper coaching</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${LN}`, paddingTop: 8 }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: PALE, color: G, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>NW</span>
            <span><strong style={{ fontSize: 14 }}>Nick Ward</strong><br /><span style={{ fontSize: 12, color: MUT }}>Goalkeeper coach</span></span>
          </div>
          {[['Programme','Foundation of Goalkeeping'],['When','Tuesdays 6 pm'],['Keepers','14 attending'],['Coaches (GK course)','2 of 31']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${LN}`, paddingTop: 6, fontSize: 14 }}>
              <span style={{ color: MUT }}>{k}</span><strong style={{ textAlign: 'right' as const, maxWidth: 160 }}>{v}</strong>
            </div>
          ))}
          <div style={{ marginTop: 'auto', borderTop: `1px solid ${LN}`, paddingTop: 10, fontSize: 13, color: MUT }}>Only 2 of 31 coaches have completed a goalkeeper coaching course. Consider promoting the FV course.</div>
        </div>
      </div>
    </div>
  )
}
