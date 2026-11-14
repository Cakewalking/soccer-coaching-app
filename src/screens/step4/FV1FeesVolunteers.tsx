import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FV1FeesVolunteers(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Reports' ? 700 : 500, color: tab === 'Reports' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Fees and volunteers</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Season fees, payment plans and the club's volunteer roster</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Fees */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Season fees · Paid through PlayFootball</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px', fontSize: 11, fontWeight: 700, color: MUT, padding: '10px 16px', background: PALE }}>
                {['Group', 'Fee', 'Paid'].map(h => <div key={h}>{h}</div>)}
              </div>
              {[
                { group: 'MiniRoos U6–U11', fee: '$220', paid: '70 of 78' },
                { group: 'Juniors U12–U16', fee: '$340', paid: '108 of 114' },
                { group: 'Seniors', fee: '$420', paid: '68 of 79' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px', padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 13 }}>
                  <div style={{ color: INK, fontWeight: 500 }}>{r.group}</div>
                  <div style={{ color: INK }}>{r.fee}</div>
                  <div style={{ color: G, fontWeight: 600 }}>{r.paid}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: MUT }}>On a payment plan: 9 families · Fee help from club: 6 families (private)</div>
            </div>
            <button onClick={() => t('Reminders sent to 25 families.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Remind 25</button>
            <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Coaches never see who has paid. Nobody is left out of a game over fees.</div>
          </div>

          {/* Volunteers */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Club volunteer roster · Across all teams</div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              {[
                { duty: 'Canteen · Sat 6 Jun', slots: '3 of 4 filled', warn: false },
                { duty: 'Ground set-up · Sat 6 Jun · 7:30 am', slots: '2 of 2 filled', warn: false },
                { duty: 'Goal nets and flags · Sat 6 Jun · pack down', slots: '0 of 2 filled', warn: true },
                { duty: 'BBQ · Sat 13 Jun · home round', slots: '2 of 3 filled', warn: false },
              ].map((v, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                  <div style={{ fontSize: 13, color: INK }}>{v.duty}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: v.warn ? '#c05' : G }}>{v.slots}</div>
                    {v.warn && <button onClick={() => t('Volunteers asked.')} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Ask</button>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: GD }}>Volunteer hours this season: 1,240</div>
            </div>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
