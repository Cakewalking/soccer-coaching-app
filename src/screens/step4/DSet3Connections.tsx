import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const CONNECTIONS = [
  { name: 'PlayFootball', desc: 'Registrations, clearances and payments', status: 'Connected', statusOk: true, action: 'Disconnect', lastSync: 'Today 7:04 am' },
  { name: 'Dribl', desc: 'Fixtures, results and ladders', status: 'Connected', statusOk: true, action: 'Disconnect', lastSync: 'Today 6:50 am' },
  { name: 'Working with children checks', desc: 'WWC via Service Victoria', status: 'Connected', statusOk: true, action: 'Configure', lastSync: 'Checks verify in real time' },
  { name: 'Bureau of Meteorology', desc: 'Weather warnings for training and game day', status: 'Connected', statusOk: true, action: 'Disconnect', lastSync: 'Live feed' },
  { name: 'Calendar export', desc: 'Google Calendar and iCal feeds for all teams', status: 'Active', statusOk: true, action: 'Configure', lastSync: 'Links generated' },
]

export default function DSet3Connections(_: { onBack?: () => void }) {
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
          <div key={tab} style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: tab === 'Connections' ? 700 : 500, color: tab === 'Connections' ? GD : MUT, borderBottom: tab === 'Connections' ? `2px solid ${GD}` : '2px solid transparent', cursor: 'pointer' }}>{tab}</div>
        ))}
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Connections</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Each connection brings live data in. Clean Sheet never writes back to any of them.</div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {CONNECTIONS.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 140px 100px', padding: '14px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{c.name}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: MUT }}>{c.desc}</div>
                <div style={{ fontSize: 11, color: MUT, marginTop: 2 }}>{c.lastSync}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: G, flex: 'none' }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: G }}>{c.status}</div>
              </div>
              <button onClick={() => t(`${c.action} dialog would open.`)} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{c.action}</button>
            </div>
          ))}
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
