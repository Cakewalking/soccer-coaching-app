import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function DB4Grants(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Reports' ? 700 : 500, color: tab === 'Reports' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: '32px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Grants and funding</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Grants the club could apply for, with the numbers already filled in</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 12 }}>Open now · Example grants — check each one's rules</div>

            {[
              { name: 'Wattle Shire community sport grant', amount: 'Up to $5,000', closes: 'closes 27 Jun', fit: 'fifth camera kit and girls kit', action: 'Start draft' },
              { name: 'Girls in sport participation fund', amount: 'Up to $10,000', closes: 'closes 11 Sep', fit: 'a new U9 girls team', action: 'Remind me' },
              { name: 'Volunteer coach training rebate', amount: '$150 per coach', closes: 'rolling', fit: '9 coaches on the club course', action: 'Claim' },
            ].map((g, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>{g.name}</div>
                    <div style={{ fontSize: 13, color: G, fontWeight: 700, marginBottom: 2 }}>{g.amount}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{g.closes} · fits: {g.fit}</div>
                  </div>
                  <button onClick={() => t(`${g.action}.`)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flex: 'none' }}>{g.action}</button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Numbers grants ask for</div>
              {[
                ['Players', '192'],
                ['Girls and women', '76 girls · 19 women'],
                ['New this season', '+16'],
                ['Volunteers', '31 coaches · 14 managers'],
                ['Training turnout', '87%'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ fontSize: 13, color: MUT }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontSize: 13, color: GD }}>No player names leave the club in a grant application.</div>
            </div>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
