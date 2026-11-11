import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const ITEMS = [
  { label: 'Team sheets', detail: '7 of 7 teams submitted', status: 'done' as const },
  { label: 'Results', detail: 'Up to date — last entered Sat 31 May', status: 'done' as const },
  { label: 'Player registrations', detail: '5 players to chase — FV deadline Mon 8 Jun', status: 'chase' as const },
  { label: 'Children\'s checks in WWC Connect', detail: '27 of 31 uploaded', status: 'warn' as const },
  { label: 'Child safety training', detail: '22 of 31 coaches completed', status: 'partial' as const },
]
const CHASE = ['Liam Brooks (U14 Josh)', 'Freya Park (U12 Girls Ana)', 'Noah Quinn (U13 Chris)', 'Isla Grant (U13 Girls Meg)', 'Zac Nguyen (U10 Nadia)']
export default function DB3LeagueReturns(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  function statusStyle(s: string): { background: string; color: string } {
    if (s === 'done') return { background: PALE, color: G }
    if (s === 'warn') return { background: '#fff0f0', color: '#c00' }
    return { background: '#fff8f0', color: '#f57c00' }
  }
  function statusLabel(s: string) { if (s === 'done') return '✓ Done'; if (s === 'warn') return 'Urgent'; return 'In progress' }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Reports' ? 700 : 500, color: tab === 'Reports' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff' }}>GL</div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Chair</div>
        </div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>League returns</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Football Victoria · Season 2026 · 3 of 5 complete</div>
          {ITEMS.map(item => (
            <div key={item.label} style={{ background: '#fff', border: `1px solid ${item.status === 'warn' ? '#ffd0d0' : LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{item.detail}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, ...statusStyle(item.status) }}>{statusLabel(item.status)}</div>
              {item.status !== 'done' && (
                <button onClick={() => t(`Opening: ${item.label}`)} style={{ height: 32, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Fix</button>
              )}
            </div>
          ))}
        </div>
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Registrations to chase</div>
            {CHASE.map(name => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 13, color: INK }}>{name}</div>
                <button onClick={() => t(`Reminder sent to ${name.split(' ')[0]}'s family.`)} style={{ height: 28, padding: '0 10px', borderRadius: 6, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Remind</button>
              </div>
            ))}
            <button onClick={() => t('All 5 reminders sent.')} style={{ width: '100%', height: 38, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginTop: 12 }}>Remind all 5</button>
          </div>
          <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 13, color: GD }}>FV requires all players registered before Round 10. Deadline Mon 8 Jun.</div>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
