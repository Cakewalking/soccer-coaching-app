import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

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

export default function TM4eDutyRosterEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px' }}>
        <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam · Saturdays</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Duty roster</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '24px 20px', textAlign: 'center' as const }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>No duties yet</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>Pick the jobs your team needs each week. Families sign up from their phone, and swap if they can't make it.</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <button onClick={() => st('Opening usual jobs picker.')} style={{ height: 48, borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Add the usual jobs</button>
            <button onClick={() => st('Opening custom job creator.')} style={{ height: 44, borderRadius: 12, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Choose my own</button>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Fills in like this</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Most junior teams need oranges at half-time, a canteen hour and a club linesman over 16.</div>
          {[{ label: 'Half-time oranges', sub: 'Sign up opens Thu' }, { label: 'Canteen · 10–11 am', sub: 'Sign up opens Thu' }, { label: 'Club linesman (16+)', sub: 'Sign up opens Thu' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px solid ${LN}`, marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{item.label}</div>
                <div style={{ fontSize: 11, color: MUT }}>{item.sub}</div>
              </div>
              <div style={{ width: 60, height: 10, borderRadius: 6, background: '#e8e9e7', marginTop: 8 }} />
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="Roster" />
      {toast && <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
