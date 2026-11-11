import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV_BG = '#40826d'
function TopBar() {
  return (
    <div style={{ flexShrink: 0, height: 64, background: G, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
      <div style={{ flexGrow: 1, display: 'flex', gap: 2 }}>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map((n, i) => (
          <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, background: i === 0 ? NAV_BG : 'transparent', color: i === 0 ? '#fff' : '#e9eae8', fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center' }}>{n}</div>
        ))}
      </div>
      <div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>U12 Sam · Wattle Creek</div>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>SK</div>
    </div>
  )
}
function SubBar() {
  return (
    <div style={{ flexShrink: 0, height: 44, background: '#fff', borderBottom: `1px solid #c5c8c4`, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
      {['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff'].map((n, i) => (
        <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: i === 1 ? INK : MUT, borderBottom: i === 1 ? `3px solid ${NAV_BG}` : '3px solid transparent', boxSizing: 'border-box', paddingBottom: 0 }}>{n}</div>
      ))}
    </div>
  )
}
const chats = [
  { ini: null, icon: true, name: 'Announcements', sub: 'Rob: Meet time now 8:40 on Saturday', time: '7:12 pm', active: true },
  { ini: 'U12', name: 'U12 Sam team chat', sub: 'Sam: 14 is a new best. Tell her I said so.', time: '7:52 pm', active: false },
  { ini: 'JR', name: 'Jess & Rob', sub: 'You: See you at 8:30 then', time: '5:44 pm', active: false },
]
const msgs = [
  { ini: 'RO', bg: '#cbbeb5', name: 'Rob', role: 'Team manager', time: '7:12 pm', text: 'Meet time now 8:40 on Saturday. Need to allow extra time to get parked. Warm up starts 9:00. ☀️' },
  { ini: 'SK', bg: '#c39797', name: 'Sam', role: 'Head coach', time: '7:08 pm', text: 'Kit bags and training bibs ready. Everyone bring a full drink bottle.' },
]
export default function CH2Announcements(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <TopBar />
      <SubBar />
      <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: '340px minmax(0,1fr)' }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flexGrow: 1, fontSize: 22, fontWeight: 700 }}>Chats</div>
            <button onClick={() => t('Inbox opened.')} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Inbox</button>
            <button onClick={() => t('New chat setup opened.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>+ New chat</button>
          </div>
          {chats.map((c, i) => (
            <button key={i} onClick={() => t(`${c.name} opened.`)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 68, padding: '0 16px', borderTop: `1px solid ${LN}`, background: c.active ? PALE : '#fff', boxShadow: c.active ? `inset 3px 0 0 ${G}` : 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
              <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>
                {c.icon ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round"><path d="M4 10v4h3l7 4V6l-7 4zM18 9a4 4 0 010 6"/></svg> : c.ini}
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><strong style={{ fontSize: 15, lineHeight: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</strong><span style={{ flexShrink: 0, fontSize: 12, color: MUT }}>{c.time}</span></div>
                <div style={{ fontSize: 13, lineHeight: '18px', color: MUT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.sub}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <div style={{ flexGrow: 1, background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '12px 18px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round"><path d="M4 10v4h3l7 4V6l-7 4zM18 9a4 4 0 010 6"/></svg>
              </div>
              <div style={{ flexGrow: 1 }}><div style={{ fontSize: 17, fontWeight: 700 }}>Announcements</div><div style={{ fontSize: 13, color: MUT }}>Coaches and Rob post · 17 families read</div></div>
              <button onClick={() => t('Search this chat.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Search</button>
              <button onClick={() => t('Chat details opened.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Details</button>
            </div>
            <div style={{ flexGrow: 1, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', justifyContent: 'flex-end' }}>
              {msgs.map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: msg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{msg.ini}</div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: 12, color: MUT, marginBottom: 3 }}>{msg.name} · {msg.role} · {msg.time}</div>
                    <div style={{ background: '#f7f8f7', border: `1px solid ${LN}`, borderRadius: '14px 14px 14px 4px', padding: '10px 14px', fontSize: 15, lineHeight: 1.5 }}>{msg.text}</div>
                    <button onClick={() => t('Seen by details opened.')} style={{ marginTop: 4, fontSize: 12, color: MUT, background: 'none', border: 0, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
                      {i === 0 ? 'Seen by 14 · 3 not seen' : 'Seen by 17 · everyone'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${LN}`, padding: '10px 18px', display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={() => t('Attachment options opened.')} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
              </button>
              <div style={{ flexGrow: 1, height: 44, border: `1px solid #c5c8c4`, borderRadius: 10, background: '#fff', padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 15, color: MUT }}>Write an announcement</div>
              <button onClick={() => t('Announcement sent to 17 families.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
            </div>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
