import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function BottomNav({ active }: { active: string }) {
  const items = [{ label: 'Home', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' }, { label: 'Game day', icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z' }, { label: 'Messages', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' }, { label: 'Roster', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' }]
  return (
    <div style={{ display: 'flex', borderTop: `1px solid ${LN}`, background: '#fff', flexShrink: 0 }}>
      {items.map(item => (
        <div key={item.label} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={item.label === active ? G : MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}/></svg>
          <span style={{ fontSize: 11, fontWeight: item.label === active ? 700 : 500, color: item.label === active ? G : MUT }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function TM2eManagerGameDayEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>U12 Sam</div>
          <div style={{ fontSize: 14, color: '#cfe6dc' }}>Game day</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: INK }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '24px 20px', textAlign: 'center' as const }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>No game this week</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 16 }}>It's a bye round. Your game-day checklist opens here on the morning of the next game.</div>
          <button onClick={() => st('Opening fixtures.')} style={{ height: 44, padding: '0 24px', borderRadius: 10, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>See fixtures</button>
        </div>
        {[{ label: 'ON THE DAY' }, { label: 'FIRST AID CARD' }].map(section => (
          <div key={section.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>{section.label}</div>
            {section.label === 'FIRST AID CARD' && <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>The first aid card shows only what parents choose to share, like asthma or allergies, and their phone number.</div>}
            {section.label === 'ON THE DAY' && [null, null].map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: '#e8e9e7', flex: 'none' }} />
                <div style={{ flex: 1, height: 10, borderRadius: 6, background: '#e8e9e7', marginTop: 5 }} />
                <div style={{ width: 36, height: 10, borderRadius: 6, background: '#e8e9e7', marginTop: 5 }} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <BottomNav active="Game day" />
      {toast && <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
