import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const FGT_TEAMS = [
  { name: 'U12 Sam', coach: 'Sam N', pct: 72, ok: true },
  { name: 'U13 Chris', coach: 'Chris P', pct: 48, ok: false },
  { name: 'U13 Girls Meg', coach: 'Meg T', pct: 65, ok: true },
  { name: 'U11 Girls Kate', coach: 'Kate M', pct: 71, ok: true },
  { name: 'U14 Josh', coach: 'Josh R', pct: 55, ok: true },
]
const NOMS = [
  { name: 'Mia Tran', team: 'U12 Sam', note: 'Goal met early — ready for more challenge' },
  { name: 'Jade Okoro', team: 'U12 Girls Ana', note: '4 goals in 6 — asked to train up' },
  { name: 'Leon Brooks', team: 'U14 Josh', note: '30-15 test top 5 — fewest heavy days' },
]
export default function D4Players(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Players' ? 700 : 500, color: tab === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Players overview</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>204 players across 14 teams</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
          {[
            { label: 'Goals met', val: '61%', sub: '124 of 204 players', red: false },
            { label: 'In growth spurt', val: '23', sub: 'flagged by coaches', red: false },
            { label: 'Feeling low', val: '6', sub: 'check in needed', red: true },
            { label: 'Could leave', val: '9', sub: 'at risk of churning', red: true },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: `1px solid ${s.red ? '#ffd0d0' : LN}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: s.red ? '#c00' : GD }}>{s.val}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Fair game time — this week</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
              {FGT_TEAMS.map(r => (
                <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 110, fontSize: 13, fontWeight: 600, color: INK, flexShrink: 0 }}>{r.name}</div>
                  <div style={{ flex: 1, background: PALE, borderRadius: 6, height: 10, position: 'relative' as const, overflow: 'visible' }}>
                    <div style={{ background: r.ok ? G : '#e53935', width: `${r.pct}%`, height: '100%', borderRadius: 6 }} />
                    <div style={{ position: 'absolute' as const, left: '50%', top: -3, width: 2, height: 16, background: MUT }} />
                  </div>
                  <div style={{ width: 36, fontSize: 12, fontWeight: 700, color: r.ok ? G : '#c00', textAlign: 'right' as const }}>{r.pct}%</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Ready for more · 11 nominations</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
              {NOMS.map(n => (
                <div key={n.name} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${LN}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{n.name} <span style={{ fontSize: 12, fontWeight: 400, color: MUT }}>· {n.team}</span></div>
                  <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{n.note}</div>
                </div>
              ))}
              <div onClick={() => t('Loading all 11 nominations…')} style={{ fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer' }}>See all 11 →</div>
            </div>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
