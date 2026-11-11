import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SP3ProvisionalSquad(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [_sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Squad for 2026</div>
          <div style={{ fontSize: 14, color: MUT }}>Thu 12 March · pre-season · 4 weeks to round 1 · squad list goes to the club on 27 March</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Trial invite sent.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Run a trial</button>
          <button onClick={() => setSheet('spsquad')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Send the squad list</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Confirmed */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ padding: '10px 16px', background: G, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Confirmed</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>14 of 17 · 13 from last year</span>
            </div>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, color: MUT }}>All said they're coming back</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', padding: '10px 16px', alignItems: 'center', borderBottom: `1px solid ${LN}` }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Harper Quinn</div>
                <div style={{ fontSize: 12, color: MUT }}>New · moved from Northgate City</div>
              </div>
              <button onClick={() => t('Opening Harper\'s profile')} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>See</button>
            </div>
            <div style={{ padding: '10px 16px' }}>
              <button onClick={() => t('Showing all 14')} style={{ fontSize: 13, color: G, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>See all 14</button>
              <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Football Victoria allows 14 on a team sheet. With 17, three sit out each week in turn.</div>
            </div>
          </div>

          {/* Trialling */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ padding: '10px 16px', background: '#f5f0e8', borderBottom: `1px solid ${LN}` }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#6b5a2a' }}>Trialling · 4</span>
            </div>
            {[
              { initials: 'BN', name: 'Billie Novak',  note: 'Midfield · born Nov · 2 sessions' },
              { initials: 'AM', name: 'Arjun Mehta',   note: 'Defender · born Mar · 2 sessions' },
            ].map(p => (
              <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) auto auto', gap: 10, padding: '10px 16px', alignItems: 'center', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G }}>{p.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
                </div>
                <button onClick={() => t(`${p.name} moved to the waitlist. Her parent gets a kind note.`)} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Waitlist</button>
                <button onClick={() => t(`${p.name} confirmed. Parent gets welcome and consent questions.`)} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Confirm</button>
              </div>
            ))}
            <div style={{ padding: '10px 16px' }}>
              <div style={{ fontSize: 13, color: MUT }}>Tess Albright and Marco Silva · First session on Sunday 22 March</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Trial players are blurred in video until a parent says yes.</div>
            </div>
          </div>

          {/* Waitlist */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: MUT, marginBottom: 8 }}>Waitlist · 1</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto auto', gap: 8, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Jonah Park</div>
                <div style={{ fontSize: 12, color: MUT }}>Keeper · trialled 1 March · offer a place here, or suggest U12 Luke</div>
              </div>
              <button onClick={() => t('Suggested to Luke, who has 2 places.')} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>U12 Luke</button>
              <button onClick={() => t('Offer sent to Jonah\'s parent.')} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Offer</button>
            </div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>A waitlisted player hears as soon as a place opens, or is offered another team at the club.</div>
          </div>

          {/* Not coming back */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: MUT, marginBottom: 8 }}>Not coming back · 3</div>
            {[
              { name: 'Kai Russo',      reason: 'Moving to Kingfisher' },
              { name: 'Lily Nguyen',    reason: 'Trying basketball this year' },
              { name: 'Tom Reyes',      reason: 'Family moved away' },
            ].map(p => (
              <div key={p.name} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: MUT }}>{p.name}</span>
                <span style={{ fontSize: 13, color: MUT }}>{p.reason}</span>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Their data is kept for 12 months in case they return, then deleted. A parent can ask sooner.</div>
          </div>
        </div>

        {/* Right summary */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 12 }}>Send the squad list</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 10 }}>To Rachel, the director, and Bianca, the coordinator.</div>
            {[
              { n: '14', label: 'confirmed',      note: 'Registered, or told to register' },
              { n: '4',  label: 'trialling',      note: 'Not on the list until you confirm them' },
              { n: '1',  label: 'on the waitlist', note: 'Hears when a place opens' },
            ].map(r => (
              <div key={r.label} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: INK }}>{r.n}</span>
                  <span style={{ fontSize: 14, color: MUT }}>{r.label}</span>
                </div>
                <div style={{ fontSize: 12, color: MUT }}>{r.note}</div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, marginTop: 10, marginBottom: 14 }}>You can send it again if it changes. The league's deadline is five working days before round 1.</div>
            <button onClick={() => t('Squad list sent. Bianca registers anyone missing.')} style={{ width: '100%', height: 44, borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Send 14 names</button>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
