import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const ACTIONS = [
  { color: '#e53935', text: 'Chris Pham\'s working-with-children check expires in 9 days' },
  { color: '#f57c00', text: 'U13 Girls Meg haven\'t recorded a session in 3 weeks' },
  { color: '#f57c00', text: '5 player registrations outstanding for FV' },
  { color: '#1565c0', text: 'Coach meeting this Tuesday at 7:30 pm' },
  { color: G, text: 'U9 Mark has 2 new players to grade' },
]
const TEAMS = [
  { name: 'U13 Chris', coach: 'Chris P', last5: [1,0,1,0,0], pct: 45, turnout: 72 },
  { name: 'U11 Girls Kate', coach: 'Kate M', last5: [1,1,0,1,1], pct: 71, turnout: 91 },
  { name: 'U9 Mark', coach: 'Mark D', last5: [0,1,0,0,1], pct: 55, turnout: 68 },
]
export default function D1ClubOverview(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Club' ? 700 : 500, color: tab === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 20 }}>Wattle Creek FC — Season 2026</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {[{ label: 'Playing our way', val: '67%', sub: 'across 14 teams' }, { label: 'Training turnout', val: '87%', sub: 'last 4 weeks' }, { label: 'Fair game time', val: '12/14', sub: 'teams on target' }, { label: 'Children\'s checks', val: '31/31', sub: 'all clear', red: true }].map(s => (
            <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.red ? '#c00' : GD, letterSpacing: '-0.02em' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Needs you this week</div>
            {ACTIONS.map((a, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 4, height: 44, borderRadius: 4, background: a.color, flexShrink: 0 }} />
                <div style={{ fontSize: 13, color: INK, flex: 1 }}>{a.text}</div>
                <div onClick={() => t('Marked done.')} style={{ fontSize: 12, color: MUT, cursor: 'pointer' }}>Done</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Teams to watch</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '110px 80px 90px 1fr 60px', gap: 8, padding: '8px 16px', fontSize: 11, fontWeight: 700, color: MUT, background: PALE }}>
                {['Team', 'Coach', 'Last 5', 'Playing our way', 'Turnout'].map(h => <div key={h}>{h}</div>)}
              </div>
              {TEAMS.map(r => (
                <div key={r.name} style={{ display: 'grid', gridTemplateColumns: '110px 80px 90px 1fr 60px', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{r.coach}</div>
                  <div style={{ display: 'flex', gap: 3 }}>{r.last5.map((w, j) => <div key={j} style={{ width: 10, height: 10, borderRadius: '50%', background: w ? G : '#e0e0e0' }} />)}</div>
                  <div style={{ overflow: 'hidden' }}><div style={{ background: G, width: `${r.pct}%`, height: '100%', borderRadius: 6 }} /></div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: r.turnout < 75 ? '#f57c00' : INK }}>{r.turnout}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
