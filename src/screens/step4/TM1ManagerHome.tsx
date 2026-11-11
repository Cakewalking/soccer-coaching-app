import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV_ITEMS = [
  { label: 'Home', active: true },
  { label: 'Game day', active: false },
  { label: 'Messages', active: false },
  { label: 'Roster', active: false },
]
export default function TM1ManagerHome(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam · Team manager</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Hi Rob</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <button onClick={() => t('Opening change message...')} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '0 14px', borderRadius: 14, background: GD, color: '#fff', border: 0, cursor: 'pointer', textAlign: 'left' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 9v4M12 17h.01M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>
          <span style={{ flexGrow: 1, fontSize: 16, fontWeight: 700 }}>Something changed? Tell parents</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
        </button>
        <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 48, height: 52, borderRadius: 12, background: '#cbbeb5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>SAT</div>
              <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.1 }}>6</div>
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>vs Harbour Rovers</div>
              <div style={{ fontSize: 13, color: MUT }}>Home · pitch 2 · arrive 8:40 · kick-off 9:30</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, textAlign: 'center' }}>
            {[['12', 'In', G, '#fff'], ['1', 'Maybe', '#cbbeb5', INK], ['2', "Can't", '#c39797', INK], ['2', 'No answer', LN, INK]].map(([n, label, bg, fg]) => (
              <div key={label} style={{ borderRadius: 10, background: bg, padding: '6px 0' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: fg }}>{n}</div>
                <div style={{ fontSize: 11, color: fg }}>{label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => t('Reminders sent to 2 families.')} style={{ height: 46, borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Remind the 2 who haven't answered</button>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '4px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, padding: '8px 0 4px' }}>To do this week</div>
          {[
            { icon: '📋', title: 'Duty roster for Saturday', sub: 'Linesman still needed · marshal and canteen done', badge: '1 gap', badgeBg: '#c39797' },
            { icon: '📹', title: 'Camera kit 1 booked', sub: 'Pick up from the clubrooms Fri after 5 pm', badge: 'Booked', badgeBg: PALE },
            { icon: '📄', title: 'Team sheet', sub: 'Sam picks the 14 Fri night, you put it in Dribl', badge: 'Fri', badgeBg: LN },
            { icon: '🛡️', title: "Harper's consent form", sub: "New player · parent hasn't finished it", badge: 'Chase', badgeBg: '#cbbeb5' },
          ].map((item, i) => (
            <button key={i} onClick={() => t(`${item.title} opened.`)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: `1px solid ${LN}`, width: '100%', background: 'none', border: 0, borderTop: `1px solid ${LN}`, padding: '0', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{item.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{item.sub}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, padding: '0 9px', height: 24, borderRadius: 999, background: item.badgeBg, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.badge}</div>
            </button>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '4px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, padding: '8px 0 4px' }}>Saturday duties</div>
          {[{ initials: 'IM', name: 'Oranges at half-time', sub: "Isla's family" }, { initials: 'LT', name: 'Canteen 10 to 11', sub: 'Linh Tran (Mia\'s mum)' }].map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: `1px solid ${LN}` }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{d.initials}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{d.name}</div>
                <div style={{ fontSize: 13, color: MUT }}>{d.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <nav style={{ display: 'flex', borderTop: `1px solid ${LN}`, background: '#fff' }}>
        {NAV_ITEMS.map(item => (
          <button key={item.label} onClick={() => t(`${item.label} tab`)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 56, fontSize: 11, fontWeight: 700, color: item.active ? G : MUT, background: 'none', border: 0, cursor: 'pointer' }}>{item.label}</button>
        ))}
      </nav>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 72, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
