import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const CHECKLIST = [
  { label: 'Set how we play',    note: 'Done 3 March · press high, play out from the back',                      done: true },
  { label: 'Confirm the squad',  note: '14 confirmed · 4 trialling · 1 on the waitlist',                        done: false, action: 'Open' },
  { label: 'Consent for 2026',   note: '12 of 17 families have answered again',                                  done: false, action: 'Remind 5' },
  { label: 'Baseline tests',     note: '2 of 4 tests done · finish by 20 March',                                done: false, action: 'Open' },
  { label: 'Friendlies',         note: '2 booked · 1 more suggested before grading',                            done: false, action: 'Find one' },
  { label: 'Score players for grading', note: 'The club asks the league for a division on 13 March',           done: false, action: 'Open' },
  { label: 'Kit sizes',          note: '17 of 17 · order sent to the coordinator',                              done: true },
]

export default function SP2HomePreSeason({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const done = CHECKLIST.filter(c => c.done).length

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Pre-season, Sam</div>
          <div style={{ fontSize: 14, color: MUT }}>Thu 12 March · pre-season · 4 weeks to round 1</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>The football year</button>
          <button onClick={() => t('Opening tonight\'s session')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Tonight's session</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16 }}>
        {/* Left: checklist */}
        <div>
          {/* Ready indicator */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '12px 16px', background: G, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Ready for round 1</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{done} of {CHECKLIST.length} done</span>
              <div style={{ flex: 1 }} />
              <div style={{ height: 6, width: 120, borderRadius: 3, background: 'rgba(255,255,255,0.3)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(done / CHECKLIST.length) * 100}%`, background: '#fff', borderRadius: 3 }} />
              </div>
            </div>
            {CHECKLIST.map((item, _i) => (
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

          {/* Load build */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Building up · week 6 of 10</div>
              <button onClick={() => t('Opening load build')} style={{ height: 44, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>See the plan</button>
            </div>
            <div style={{ fontSize: 13, color: MUT }}>Two sessions of 60 minutes this week, about 70% of a mid-season week.</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>3 players had a longer break and do one round less.</div>
          </div>
        </div>

        {/* Right: coming up */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 12 }}>Coming up</div>
            {[
              { day: 'SAT', date: '14', label: 'Friendly at Glenview', sub: "10:00 · doesn't count towards season numbers" },
              { day: 'SAT', date: '14', label: 'Grading games start',  sub: '14 to 28 March · three games' },
              { day: 'SUN', date: '22', label: 'Trial morning for 4 players', sub: '9:30 at Wattle Creek Reserve', action: 'Open' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ flex: 'none', textAlign: 'center' as const, minWidth: 44 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>{item.day}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>{item.date}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{item.sub}</div>
                </div>
                {item.action && (
                  <button onClick={() => t('Opening')} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{item.action}</button>
                )}
              </div>
            ))}
          </div>

          <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 4 }}>Suggestions in pre-season</div>
            <div style={{ fontSize: 13, color: G, lineHeight: 1.5, marginBottom: 10 }}>With no league games yet, suggestions follow your playing style and the build-up, not last Saturday.</div>
            <button onClick={() => t('Opening suggestions')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Open suggestions</button>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
