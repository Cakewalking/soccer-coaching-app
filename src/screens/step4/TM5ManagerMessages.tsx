import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
export default function TM5ManagerMessages(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const convos = [
    { ini: 'SJ', name: 'Coaches · Sam, Jess', preview: 'Sam: Line-up done, I\'ll send it Friday night', time: '7:40 pm', unread: true },
    { ini: 'LT', name: 'Linh Tran (Mia)', preview: "Can I swap canteen to 11 to 12? Mia's dentist", time: '6:02 pm', unread: true },
    { ini: 'U12', name: 'U12 Sam team chat', preview: 'Linh: Mia found her other boot!', time: '7:48 pm', unread: false },
    { ini: 'WC', name: 'Wattle Creek FC', preview: 'Wet weather: grounds decision by 7 am Saturday', time: 'Tue', unread: false },
  ]
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam · Team manager</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Messages</div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flexGrow: 1, fontSize: 16, fontWeight: 700 }}>Meet time now 8:40 on Saturday</div>
            <div style={{ fontSize: 12, fontWeight: 700, padding: '0 9px', height: 24, borderRadius: 999, background: '#eef5f2', color: G, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>Sent 7:12 pm</div>
          </div>
          <div style={{ fontSize: 13, color: MUT }}>To all 17 families, Sam and Jess · calendar updated</div>
          <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', gap: 2 }}>
            <div style={{ flex: 14, background: G }} />
            <div style={{ flex: 3, background: LN }} />
          </div>
          <div style={{ fontSize: 14 }}><strong>14 of 17</strong> have seen it · Brennan, Delaney and Quinn families haven't</div>
          <button onClick={() => t('Nudge sent to the 3 families who haven\'t seen it.')} style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge the 3 now</button>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '4px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, padding: '8px 0 4px' }}>Conversations</div>
          {convos.map((c, i) => (
            <button key={i} onClick={() => t(`Opening conversation with ${c.name}.`)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 62, width: '100%', background: 'none', border: 0, borderTop: `1px solid ${LN}`, padding: 0, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{c.ini}</div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: MUT, flexShrink: 0 }}>{c.time}</div>
                </div>
                <div style={{ fontSize: 13, color: MUT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.preview}</div>
              </div>
              {c.unread && <div style={{ width: 10, height: 10, borderRadius: '50%', background: G, flexShrink: 0 }} />}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT, textAlign: 'center', padding: '0 6px' }}>Messages to a player always copy in their parent. The club's welfare officer can see every family thread.</div>
      </div>
      <nav style={{ display: 'flex', borderTop: `1px solid ${LN}`, background: '#fff' }}>
        {['Home', 'Game day', 'Messages', 'Roster'].map((label, i) => (
          <button key={label} onClick={() => t(`${label} tab`)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 56, fontSize: 11, fontWeight: 700, color: i === 2 ? G : MUT, background: 'none', border: 0, cursor: 'pointer' }}>{label}</button>
        ))}
      </nav>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 72, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
