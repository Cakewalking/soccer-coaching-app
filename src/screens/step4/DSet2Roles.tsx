import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const ROLES = [
  { role: 'Chair', person: 'Greg Marsh', note: 'Sees committee report and safeguarding summary' },
  { role: 'Director of football', person: 'You', note: 'Sees everything. Manages coaches, players, and teams.' },
  { role: 'Welfare officer', person: 'Helen Park', note: 'Sees all safeguarding concerns in full' },
  { role: 'Concussion officer', person: 'Priya Shah', note: 'Told about every head knock across all teams' },
  { role: 'Registrar', person: 'Tom Yates', note: 'Manages registrations and PlayFootball import' },
  { role: 'Committee member', person: '4 people', note: 'Sees the monthly board report only' },
]

export default function DSet2Roles(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports', 'Settings'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Settings' ? 700 : 500, color: tab === 'Settings' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44 }}>
        {['Club details', 'Roles', 'Connections', 'Partner academies', 'Kit and cameras', 'Display'].map(tab => (
          <div key={tab} style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: tab === 'Roles' ? 700 : 500, color: tab === 'Roles' ? GD : MUT, borderBottom: tab === 'Roles' ? `2px solid ${GD}` : '2px solid transparent', cursor: 'pointer' }}>{tab}</div>
        ))}
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Club roles</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Each role controls what someone can see. Only these roles exist in Clean Sheet.</div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 160px 1fr 80px', fontSize: 11, fontWeight: 700, color: MUT, padding: '10px 20px', background: PALE }}>
            {['Role', 'Who', 'What they see', ''].map(h => <div key={h}>{h}</div>)}
          </div>
          {ROLES.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 160px 1fr 80px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.role}</div>
              <div style={{ fontSize: 13, color: r.person === 'You' ? GD : INK, fontWeight: r.person === 'You' ? 700 : 400 }}>{r.person}</div>
              <div style={{ fontSize: 12, color: MUT }}>{r.note}</div>
              <button onClick={() => t(`Change ${r.role} form would open.`)} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Change</button>
            </div>
          ))}
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '10px 14px', marginTop: 16 }}>
          <div style={{ fontSize: 13, color: GD }}>Roles can't be invented. The list above is complete — it's how Clean Sheet keeps visibility tight and accounts clear.</div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
