import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const WRAPUP = [
  { label: 'End-of-season summary for each player', note: '17 of 17 sent to families', done: true,  action: 'See' },
  { label: 'A chat with each player',               note: '9 of 17 done · goal for the summer', done: false, action: 'Book 8' },
  { label: "Are you coming back?",                  note: '12 yes · 3 not sure · 2 no', done: false, action: 'Open' },
  { label: 'Kit back',                              note: 'Bibs and 2 sensor vests still out', done: false, action: 'Remind' },
  { label: 'Presentation day',                      note: 'Sun 13 September · done', done: true },
  { label: 'Your own review',                       note: '10 minutes with Rachel, the director', done: false, action: 'Book' },
]

export default function SP10HomePostSeason({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const done = WRAPUP.filter(c => c.done).length

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Post-season, Sam</div>
          <div style={{ fontSize: 14, color: MUT }}>Thu 15 October · post-season · season finished 30 August</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Opening \'going away\'')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Going away?</button>
          <button onClick={onBack} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>The football year</button>
          <button onClick={() => t('Opening next year\'s squad')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Next year's squad</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16 }}>
        {/* Left: wrap-up checklist */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '12px 16px', background: G, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Wrap up 2026</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{done} of {WRAPUP.length} done</span>
              <div style={{ flex: 1 }} />
              <div style={{ height: 6, width: 100, borderRadius: 3, background: 'rgba(255,255,255,0.3)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(done / WRAPUP.length) * 100}%`, background: '#fff', borderRadius: 3 }} />
              </div>
            </div>
            {WRAPUP.map(item => (
              <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '28px minmax(0,1fr) auto', gap: 12, padding: '12px 16px', alignItems: 'center', borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.done ? G : '#f0f1ef', border: item.done ? 'none' : `1.5px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  {item.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: item.done ? 400 : 600, color: item.done ? MUT : INK, textDecoration: item.done ? 'line-through' : 'none' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{item.note}</div>
                </div>
                {item.action && (
                  <button onClick={() => t(`${item.action} tapped`)} style={{ height: 44, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>{item.action}</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: still playing + training */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Still playing</div>
            {[
              { label: 'Kingfisher Summer Cup',    sub: 'Sat 21 and Sun 22 November · 12 picked', n: '5' },
              { label: 'Indoor fives, Monday nights', sub: '8 players from 3 teams · game 5 of 12', n: '' },
            ].map(item => (
              <div key={item.label} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{item.sub}</div>
                </div>
                <button onClick={() => t('Opening')} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Open</button>
              </div>
            ))}
          </div>

          <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>Training now</div>
            <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>One session a week, all small games. No tests, and no load targets. Suggestions switch to fun, futsal-style games.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid #f0c0c0`, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#8b3a3a', marginBottom: 4 }}>Rest month starts 1 December</div>
            <div style={{ fontSize: 13, color: '#7a4a4a', lineHeight: 1.5, marginBottom: 10 }}>Zoe and Mia will have had no four-week break this year if they play on.</div>
            <button onClick={() => t('Opening rest month view')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid #f0c0c0`, background: '#fff', color: '#8b3a3a', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>See who needs a break</button>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
