import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
export default function TM14ManagerTeamChat(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const msgs = [
    { ini: 'LT', bg: '#cbbeb5', name: 'Linh', role: "Mia's mum", time: '7:48 pm', text: 'Mia found her other boot! And she got to 14 juggles.', media: true },
    { ini: 'SK', bg: '#c39797', name: 'Sam', role: 'coach', time: '7:52 pm', text: '14 is a new best. Tell her I said so.', media: false },
    { ini: 'DC', bg: '#cbbeb5', name: 'Dan', role: "Ruby's dad", time: '8:02 pm', text: 'Why does Ruby only ever get one half? Some kids never come off.', media: false, flag: true },
  ]
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>17 families, Sam and Jess</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>U12 Sam team chat</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
        <button onClick={() => t('Opening chat settings...')} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 44, padding: '0 12px', borderRadius: 12, background: PALE, border: 0, cursor: 'pointer', textAlign: 'left' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.2" strokeLinecap="round"><path d="M6 11h12v9H6zM9 11V8a3 3 0 016 0v3"/></svg>
          <span style={{ flexGrow: 1, fontSize: 13 }}><strong>You own this chat.</strong> Parents can post.</span>
          <strong style={{ color: G, fontSize: 13 }}>Change</strong>
        </button>
        <button onClick={() => t('Poll opened: Who can bring oranges on Saturday?')} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 44, padding: '0 12px', borderRadius: 12, background: '#fff', border: `1px solid ${LN}`, cursor: 'pointer', textAlign: 'left' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.4" strokeLinecap="round"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>
          <span style={{ flexGrow: 1, fontSize: 13 }}><strong>Your poll: oranges.</strong> 4 of 17 so far</span>
          <strong style={{ color: G, fontSize: 13 }}>See who</strong>
        </button>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10 }}>
          {msgs.map((msg, i) => (
            <div key={i}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: msg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{msg.ini}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: MUT }}>{msg.name} · {msg.role} · {msg.time}</div>
                  {msg.media ? (
                    <div style={{ maxWidth: 258, background: '#fff', border: `1px solid ${LN}`, borderRadius: '14px 14px 14px 4px', padding: '8px 11px', fontSize: 15, lineHeight: 1.4, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <div style={{ width: 100, height: 66, borderRadius: 10, background: '#cfe6dc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round"><path d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4"/></svg>
                        </div>
                        <div style={{ width: 100, height: 66, borderRadius: 10, background: GD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GD} strokeWidth="2.4" strokeLinecap="round"><path d="M8 5l11 7-11 7z"/></svg>
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: 15 }}>{msg.text}</div>
                    </div>
                  ) : (
                    <div style={{ maxWidth: 258, background: '#fff', border: `1px solid ${LN}`, borderRadius: '14px 14px 14px 4px', padding: '8px 11px', fontSize: 15, lineHeight: 1.4 }}>{msg.text}</div>
                  )}
                </div>
              </div>
              {msg.flag && (
                <button onClick={() => t('Opening moderation options for this message.')} style={{ alignSelf: 'flex-start', marginLeft: 34, marginTop: 6, minHeight: 44, padding: '0 12px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.2" strokeLinecap="round"><path d="M5 21V4h11l-2 4 2 4H5"/></svg>
                  Move this out of the group
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}` }}>
        <div style={{ display: 'flex', gap: 6, padding: '8px 12px 0' }}>
          {['Poll', 'Announce', 'Pinned'].map(action => (
            <button key={action} onClick={() => t(`${action} opened.`)} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>{action}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '8px 12px 10px', alignItems: 'center' }}>
          <button onClick={() => t('Attachment options opened.')} style={{ width: 48, height: 48, borderRadius: 14, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
          <div style={{ flexGrow: 1, minHeight: 48, border: `1px solid ${LN}`, borderRadius: 14, background: '#fff', padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 15, color: MUT }}>Write to the team chat</div>
          <button onClick={() => t('Sent to U12 Sam team chat.')} style={{ width: 48, height: 48, borderRadius: 14, background: G, border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
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
