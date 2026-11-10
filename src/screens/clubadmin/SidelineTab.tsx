import { useState } from 'react'

const REPORTS = [
  {
    title: 'Spectator shouting at the referee',
    game: 'U14 Josh v Kingfisher United · Sat 30 May · from Josh (coach)',
    action: 'Helen spoke to the parent',
    status: 'resolved',
  },
  {
    title: 'Away parent swearing at players',
    game: 'U12 Girls Ana v Glenview Park · Sat 30 May · from the team manager',
    action: 'Sent to Glenview Park',
    status: 'resolved',
  },
  {
    title: 'Coach on the field during play',
    game: 'U10 Nadia v Bayside Lions · Sat 23 May · from the referee',
    action: 'Closed · reminder sent',
    status: 'closed',
  },
]

export default function SidelineTab() {
  const [toastMsg, setToastMsg] = useState('')
  function showToast(m: string) { setToastMsg(m); setTimeout(() => setToastMsg(''), 3000) }

  return (
    <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, alignItems: 'start' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Reports */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Sideline</h2>
          </div>
          <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 12 }}>Behaviour reports from games, and the code parents agree to</div>

          <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700 }}>Reports</h3>
          <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 10 }}>3 this month · only you and Helen Park see them</div>
          {REPORTS.map((r, i) => (
            <div key={i} style={{ padding: '12px 0', borderTop: i > 0 ? '1px solid #e9eae8' : '1px solid #e9eae8' }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{r.title}</div>
              <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 4 }}>{r.game}</div>
              <div style={{ fontSize: 13, color: '#2f6252', fontWeight: 600 }}>{r.action}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 12, color: '#4a5a57', borderTop: '1px solid #e9eae8', paddingTop: 10 }}>Coaches and managers report from their phone in under a minute. They should never confront anyone. Serious misconduct must be reported to Football Victoria within 48 hours: Clean Sheet starts the clock.</div>
        </div>
      </section>

      {/* Sidebar: Code of conduct */}
      <aside style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700 }}>Code of conduct</h2>
        <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '19px', marginBottom: 12 }}>Parents agree to it when they join a team. It's shown again before their first game.</div>
        {[
          { label: 'Parents agreed',    value: '228 of 243' },
          { label: 'Players 15+ agreed', value: '27 of 29' },
          { label: 'Coaches agreed',    value: '31 of 31' },
        ].map(r => (
          <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 48, borderTop: '1px solid #e9eae8' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{r.label}</span>
            <span style={{ fontSize: 15, color: '#4a5a57' }}>{r.value}</span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button onClick={() => showToast('Sending reminder to 15 parents.')} style={{ flexGrow: 1, height: 44, borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Remind 15 parents</button>
          <button onClick={() => showToast('Opening code of conduct.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Edit the code</button>
        </div>
      </aside>

      {toastMsg && (
        <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', background: '#10211f', color: '#fff', padding: '12px 22px', borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 50, whiteSpace: 'nowrap' as const, pointerEvents: 'none' }}>{toastMsg}</div>
      )}
    </div>
  )
}
