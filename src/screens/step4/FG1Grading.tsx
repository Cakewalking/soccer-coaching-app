import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const JUNIOR_GRADES = [
  { team: 'U12 Sam', asked: 'Div 2', got: 'Div 3', record: '4W 2D 2L', suggest: 'Ask to move up' },
  { team: 'U12 Girls Ana', asked: 'Div 2', got: 'Div 2', record: '3W 3D 2L', suggest: 'Stay' },
  { team: 'U13 Chris', asked: 'Div 1', got: 'Div 2', record: '1W 2D 5L', suggest: 'Ask to move down' },
  { team: 'U13 Girls Meg', asked: 'Div 1', got: 'Div 1', record: '5W 2D 1L', suggest: 'Stay' },
  { team: 'U14 Josh', asked: 'Div 3', got: 'Div 3', record: '3W 1D 4L', suggest: 'Review mid-season' },
  { team: 'U15 Girls Bec', asked: 'State League', got: 'State League', record: '7W 1D 0L', suggest: 'Stay' },
  { team: 'U16 Ollie', asked: 'Div 1', got: 'Div 1', record: '3W 2D 3L', suggest: 'Stay' },
]
const MINI_LEVELS = [
  { level: 'Kangaroos', n: 2, desc: 'Teams with more experience' },
  { level: 'Wallabies', n: 4, desc: 'Standard MiniRoos entry level' },
  { level: 'Joeys', n: 1, desc: 'First season players' },
]
function suggestColor(s: string) { if (s === 'Ask to move up') return G; if (s === 'Ask to move down') return '#c62828'; if (s === 'Review mid-season') return '#f57c00'; return MUT }
export default function FG1Grading(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Teams' ? 700 : 500, color: tab === 'Teams' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Grading</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Season 2026 · Junior divisions</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 90px 90px 90px 1fr', gap: 8, padding: '8px 16px', fontSize: 11, fontWeight: 700, color: MUT, background: PALE }}>
              {['Team', 'We asked', 'League gave', 'This season', 'Suggestion'].map(h => <div key={h}>{h}</div>)}
            </div>
            {JUNIOR_GRADES.map(r => (
              <div key={r.team} style={{ display: 'grid', gridTemplateColumns: '140px 90px 90px 90px 1fr', gap: 8, padding: '12px 16px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{r.team}</div>
                <div style={{ fontSize: 12, color: MUT }}>{r.asked}</div>
                <div style={{ fontSize: 12, color: r.asked !== r.got ? '#f57c00' : MUT, fontWeight: r.asked !== r.got ? 700 : 400 }}>{r.got}</div>
                <div style={{ fontSize: 12, color: MUT }}>{r.record}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: suggestColor(r.suggest) }}>{r.suggest}</div>
                  {r.suggest !== 'Stay' && (
                    <button onClick={() => t(`Request sent for ${r.team}.`)} style={{ height: 26, padding: '0 8px', borderRadius: 6, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Request</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>MiniRoos levels</div>
            {MINI_LEVELS.map(m => (
              <div key={m.level} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{m.level}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{m.desc}</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: GD }}>{m.n}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Next season's grading</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6, marginBottom: 12 }}>FV opens grading submissions in October. Use season results to build your case for each team.</div>
            <button onClick={() => t('Opening 2027 grading planner…')} style={{ width: '100%', height: 38, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Plan 2027 grading</button>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
