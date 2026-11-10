import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const PLAYERS = ['Mia Tran','Ruby Chen','Leo Marsh','Ava Lindqvist','Jai Patel','Isla Morgan']

export default function SP8GradingInput({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Scores for grading</div>
          <div style={{ fontSize: 14, color: MUT }}>Thu 12 March · pre-season · 4 weeks to round 1 · due Friday 13 March</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Back to Home</button>
          <button onClick={() => t('Sent to Rachel, the director. She asks the league for a division on Friday.')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Send to Rachel</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Scoring table */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '10px 16px', background: G, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Each player, twice</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>17 of 17 scored</span>
            </div>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', padding: '8px 16px', borderBottom: `1px solid ${LN}`, background: '#fafafa' }}>
              {['Player','On the ball','Reads the game'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>
              ))}
            </div>
            {PLAYERS.map(name => (
              <div key={name} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', padding: '10px 16px', alignItems: 'center', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{name}</div>
                {[1,2].map(col => (
                  <div key={col} style={{ display: 'flex', gap: 4 }}>
                    {[1,2,3,4,5].map(n => (
                      <button key={n} onClick={() => t(`${name} scored ${n}`)} style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${LN}`, background: n === 3 ? G : '#fff', color: n === 3 ? '#fff' : MUT, fontFamily: 'inherit', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>{n}</button>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <div style={{ padding: '10px 16px', background: '#f9faf9', fontSize: 12, color: MUT }}>6 of 17 shown. Scores are used once, for the division, then hidden. Players and parents never see them.</div>
          </div>
        </div>

        {/* Right: suggestion + timeline */}
        <div>
          <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 4 }}>What Clean Sheet suggests</div>
            <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Ask for Division 1. Your scores are close to last year's, when the team won 5 of 8 in Division 1. Three grading games from 14 March will confirm it.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>What happens next</div>
            {[
              { day: 'FRI', date: '13', label: 'The club asks the league', note: 'For every U12 and older team' },
              { day: 'SAT', date: '14', label: 'Three grading games',      note: '14 to 28 March' },
              { day: 'MON', date: '6',  label: 'Divisions published',       note: '6 April · round 1 is 11 April' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ flex: 'none', textAlign: 'center' as const, minWidth: 44 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>{item.day}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: INK }}>{item.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, color: MUT, marginTop: 12, lineHeight: 1.5 }}>MiniRoos teams aren't graded. The club picks a level and no results are kept.</div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
