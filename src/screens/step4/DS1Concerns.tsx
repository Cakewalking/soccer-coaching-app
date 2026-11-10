import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function DS1Concerns(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Safeguarding' ? 700 : 500, color: tab === 'Safeguarding' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: '32px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Safeguarding concerns</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>2 open · handled by the welfare officer, Helen Park</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Open</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Details are only visible to Helen</div>

            {[
              { n: '1', title: "About a player's wellbeing", raised: 'Raised 27 May by a coach', status: 'next step agreed with the family' },
              { n: '2', title: 'About behaviour on the sideline', raised: 'Raised 1 Jun by a team manager', status: 'adult spectator, away game' },
            ].map(c => (
              <div key={c.n} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, background: PALE, color: G, padding: '2px 8px', borderRadius: 20 }}>#{c.n}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{c.title}</div>
                    </div>
                    <div style={{ fontSize: 12, color: MUT }}>{c.raised} · {c.status}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: G, background: PALE, padding: '4px 10px', borderRadius: 20 }}>On track</div>
                </div>
              </div>
            ))}

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginTop: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Closed this season</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: GD }}>3 concerns closed</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>Average 9 days from raised to closed</div>
            </div>
          </div>

          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Welfare officer</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 2 }}>Helen Park</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Member protection and child safety</div>
              <button onClick={() => t('Message sent to Helen.')} style={{ width: '100%', height: 40, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Message Helen privately</button>
            </div>

            <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: GD }}>You see that a concern exists and whether it's on track. You don't see who it's about.</div>
            </div>

            <button onClick={() => setSheet('concern')} style={{ width: '100%', height: 44, borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Raise a concern</button>

            <div style={{ marginTop: 16, padding: '12px 0', borderTop: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#c00', marginBottom: 4 }}>If someone is in danger</div>
              <div style={{ fontSize: 12, color: MUT }}>Call 000 first. Then tell Helen.</div>
            </div>
          </div>
        </div>
      </div>

      {sheet === 'concern' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, width: 420 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 4 }}>Raise a concern</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>Only Helen Park will see this.</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 6 }}>About</div>
              {['A player', 'An adult', 'Something else'].map(opt => (
                <div key={opt} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}`, fontSize: 13, color: INK, cursor: 'pointer' }}>{opt}</div>
              ))}
            </div>
            <textarea placeholder="What happened? If someone is in danger now, call 000 first." style={{ width: '100%', height: 80, borderRadius: 10, border: `1px solid ${LN}`, padding: 10, fontFamily: 'inherit', fontSize: 13, resize: 'none', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={() => setSheet(null)} style={{ flex: 1, height: 40, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setSheet(null); t('Sent to Helen.') }} style={{ flex: 1, height: 40, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Send to Helen</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
