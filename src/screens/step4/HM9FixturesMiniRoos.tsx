import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

interface Fixture { date: string; against: string; where: string; time: string; note: string; played?: boolean; active?: boolean }

const FIXTURES: Fixture[] = [
  { date: 'Sat 2 May',  against: 'Banksia Park',      where: 'Home',                  time: 'Played', note: 'All 10 had a go', played: true },
  { date: 'Sat 9 May',  against: 'Kestrel Park',       where: 'Away',                  time: 'Played', note: '9 played',        played: true },
  { date: 'Sat 16 May', against: 'Northgate City',     where: 'Home',                  time: 'Played', note: 'All 10 had a go', played: true },
  { date: 'Sat 23 May', against: 'Kingfisher United',  where: 'Away',                  time: 'Played', note: '8 played',        played: true },
  { date: 'Sat 30 May', against: 'Glenview Park',      where: 'Home',                  time: 'Played', note: 'All 10 had a go', played: true },
  { date: 'Sat 6 Jun',  against: 'Northgate City',     where: 'Away · Redgum Reserve', time: '8:30 am', note: 'Needs a game leader', active: true },
  { date: 'Sat 13 Jun', against: 'Kestrel Park',       where: 'Home · Pitch 4',        time: '9:00 am', note: 'Zoe Park is game leader' },
  { date: 'Sat 20 Jun', against: 'Banksia Park',       where: 'Away · Banksia Reserve', time: '8:30 am', note: 'Photo day after' },
]

export default function HM9FixturesMiniRoos(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 64 }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: t === 'Game day' ? '#40826d' : 'transparent', color: t === 'Game day' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center' }}>U9 Tom · Wattle Creek</div>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: INK }}>TA</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {['Turns', 'Fixtures', 'Record'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: t === 'Fixtures' ? INK : MUT, borderBottom: t === 'Fixtures' ? `3px solid #40826d` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700 }}>Coach · MiniRoos</div>
        </div>
      </div>

      <div style={{ padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Fixtures</h1>
          <span style={{ fontSize: 14, color: MUT }}>U9 Tom · Term 2 · 7 a side, 2 × 20 minutes</span>
        </div>
        <button onClick={() => st('Sharing fixtures with families.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Share with families</button>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0, 1fr) 300px' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px 8px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1.2fr 1.3fr 90px 1.3fr', gap: 10, paddingBottom: 8 }}>
            {['Date', 'Against', 'Where', 'Time', 'Note'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>
            ))}
          </div>
          {FIXTURES.map(f => (
            <div key={f.date} style={{ display: 'grid', gridTemplateColumns: '110px 1.2fr 1.3fr 90px 1.3fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: `1px solid ${LN}`, fontSize: 14, lineHeight: '19px', color: f.played ? MUT : INK, background: f.active ? PALE : 'transparent', margin: f.active ? '0 -10px' : 0, padding: f.active ? '0 10px' : 0, borderRadius: f.active ? 10 : 0, cursor: 'pointer' }}>
              <strong>{f.date}</strong>
              <strong>{f.against}</strong>
              <span>{f.where}</span>
              <span>{f.time}</span>
              <span>{f.note}</span>
            </div>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: 8, fontSize: 14, color: MUT }}>Fixtures come from the league each night. If a ground changes, families are told.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>No scores, no ladder</div>
            <div style={{ fontSize: 14, color: MUT }}>MiniRoos keep no results, so there's nothing to enter after a game. Clean Sheet remembers who played and who had a turn.</div>
          </div>

          <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px 10px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>This Saturday</div>
            {[
              { icon: '✓', label: 'Meet 8:10', note: 'Sent to families Thursday', bg: PALE },
              { icon: '!', label: 'Game leader', note: 'Still needed', bg: '#cbbeb5' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{item.note}</div>
                </div>
              </div>
            ))}
            <button onClick={() => st("Opening Saturday's turns.")} style={{ marginTop: 'auto', height: 44, borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Open Saturday's turns</button>
          </div>
        </div>
      </div>
    </div>
    {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
  )
}
