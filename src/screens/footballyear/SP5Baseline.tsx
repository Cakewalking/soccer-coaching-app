import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const TESTS = [
  { name: '10 m sprint',           status: 'done', date: 'Done 5 March · 16 of 17', stat: 'Median 2.14 s · last August 2.19 s' },
  { name: 'Change of direction',   status: 'done', date: 'Done 5 March · 16 of 17', stat: 'Median 5.9 s · last August 6.0 s' },
  { name: 'Ball mastery, 60 seconds', status: 'next', date: 'Tuesday 17 March · Takes 10 minutes of the warm-up', stat: '' },
  { name: 'Repeat sprints',        status: 'next', date: 'Thursday 19 March · Under 12s do the short version', stat: '' },
]

export default function SP5Baseline({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Baseline tests</div>
          <div style={{ fontSize: 14, color: MUT }}>Thu 12 March · pre-season · 4 weeks to round 1 · finish by 20 March</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Back to Home</button>
          <button onClick={() => t('Opening next test')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Run the next test</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Tests list */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '10px 16px', background: G, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Four tests, once each</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>2 of 4 done</span>
            </div>
            {TESTS.map((test, _i) => (
              <div key={test.name} style={{ display: 'grid', gridTemplateColumns: '28px minmax(0,1fr) auto', gap: 12, padding: '12px 16px', alignItems: 'center', borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: test.status === 'done' ? G : '#f0f1ef', border: test.status === 'done' ? 'none' : `1.5px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  {test.status === 'done' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: test.status === 'done' ? MUT : INK }}>{test.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{test.date}</div>
                  {test.stat && <div style={{ fontSize: 12, color: G, fontWeight: 600 }}>{test.stat}</div>}
                </div>
                {test.status === 'next' && (
                  <button onClick={() => t('Pick another session for this test.')} style={{ height: 32, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Move</button>
                )}
              </div>
            ))}
            <div style={{ padding: '10px 16px', background: '#f9faf9', fontSize: 12, color: MUT }}>The same four run again mid-season and in the last week, so each player is compared with their own start.</div>
          </div>

          {/* Missed a test */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>Missed a test</div>
            {[
              { initials: 'HQ', name: 'Harper Quinn', note: 'New · no yes for sensors yet, timed by hand' },
              { initials: 'EB', name: 'Ella Brandt',  note: 'Away 5 March · catch up Tuesday' },
            ].map(p => (
              <div key={p.name} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 11, fontWeight: 700, color: G }}>{p.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: chart + age note */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Since last season ended</div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', marginBottom: 8 }}>
              <div style={{ textAlign: 'center' as const }}>
                <div style={{ height: 60, width: 48, background: '#e5ece9', borderRadius: 6, marginBottom: 4 }} />
                <div style={{ fontSize: 11, color: MUT }}>End of 2025</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>2.19 s</div>
              </div>
              <div style={{ textAlign: 'center' as const }}>
                <div style={{ height: 50, width: 48, background: G, borderRadius: 6, marginBottom: 4 }} />
                <div style={{ fontSize: 11, color: MUT }}>Now</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: G }}>2.14 s</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>10 m sprint, team median. Most 11-year-olds get quicker over summer just by growing.</div>
          </div>

          <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>At this age</div>
            <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>No rankings and no team list of times. Each player sees their own result and whether it's better than last time.</div>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
