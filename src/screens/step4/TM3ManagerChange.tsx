import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
type ChangeType = 'Meet time' | 'Venue or pitch' | 'Cancelled' | 'Kit or other'
export default function TM3ManagerChange(_: { onBack?: () => void }) {
  const [type, setType] = useState<ChangeType>('Meet time')
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>Tell parents about a change</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Something changed</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>What changed?</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {(['Meet time', 'Venue or pitch', 'Cancelled', 'Kit or other'] as ChangeType[]).map(opt => (
            <button key={opt} onClick={() => setType(opt)} style={{ height: 44, borderRadius: 12, fontSize: 14, fontWeight: 700, border: type === opt ? 0 : `1px solid ${LN}`, background: type === opt ? G : '#fff', color: type === opt ? '#fff' : INK, cursor: 'pointer', fontFamily: 'inherit' }}>{opt}</button>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 44, height: 48, borderRadius: 12, background: '#cbbeb5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 700 }}>SAT</div>
              <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>6</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>vs Harbour Rovers</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8 }}>
            <div style={{ border: `1px solid ${LN}`, borderRadius: 12, padding: '8px 10px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>Was</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#6f7f7b', textDecoration: 'line-through' }}>9:00 am</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            <div style={{ border: `2px solid ${G}`, borderRadius: 12, padding: '8px 10px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G }}>Now</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: INK }}>8:40 am</div>
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, marginTop: 2 }}>Message</div>
          <div style={{ border: `1px solid ${LN}`, borderRadius: 12, padding: '10px 12px', fontSize: 15, lineHeight: 1.5 }}>
            Hi all, please arrive by <strong>8:40</strong> on Saturday, not 9:00. We've moved to pitch 2 and need time to set up the camera. Kick-off is still 9:30. Thanks, Rob
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '4px 14px' }}>
          {[
            { icon: '👥', title: 'All U12 parents and players', sub: '17 families · parents get players\' copies', badge: '17' },
            { icon: '👤', title: 'Sam and Jess', sub: 'Coaches see it in their inbox', badge: '2' },
            { icon: '📅', title: 'Updates the calendar', sub: 'The new meet time, for everyone', badge: 'On' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: i > 0 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{row.icon}</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{row.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{row.sub}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, padding: '0 9px', height: 24, borderRadius: 999, background: LN, display: 'flex', alignItems: 'center' }}>{row.badge}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 14px 12px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button onClick={() => t('Sent. Families asked to confirm.')} style={{ height: 52, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}>Send and ask families to confirm</button>
        <div style={{ fontSize: 12, color: MUT, textAlign: 'center' }}>You'll see who has seen it. A nudge goes to anyone who hasn't by Friday 6 pm.</div>
      </div>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
