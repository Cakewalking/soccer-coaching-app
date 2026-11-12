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

export default function TM1eManagerHomeEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam · Team manager</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Welcome, Rob</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: INK }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ background: '#fff', border: `2px dashed ${LN}`, borderRadius: 16, padding: '24px 20px', textAlign: 'center' as const }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 8 }}>Get your families in</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>Send the team link to parents. Once they join, you can share meet times, ask who's coming and fill the duty roster.</div>
          <button onClick={() => st('Team link copied.')} style={{ width: '100%', height: 48, borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>Copy the team link</button>
          <button onClick={() => st('Opening parent view.')} style={{ width: '100%', height: 44, borderRadius: 12, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>See what parents see</button>
        </div>
        {[{ label: 'NEXT GAME', items: [null, null] }, { label: 'TO DO THIS WEEK', items: [null, null, null] }].map(section => (
          <div key={section.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>{section.label}</div>
            {section.items.map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 36, height: 10, borderRadius: 6, background: '#e8e9e7' }} />
                <div style={{ flex: 1, height: 10, borderRadius: 6, background: '#e8e9e7' }} />
                <div style={{ width: 48, height: 10, borderRadius: 6, background: '#e8e9e7' }} />
              </div>
            ))}
          </div>
        ))}
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}><strong style={{ color: INK }}>0 of 17 families joined.</strong> Fixtures appear here once Sam or the club adds them.</div>
      </div>
      <BottomNav active="Home" />
      {toast && <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
