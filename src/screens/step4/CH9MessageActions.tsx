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
        <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: i === 1 ? INK : MUT, borderBottom: i === 1 ? `3px solid ${NAV_BG}` : '3px solid transparent', boxSizing: 'border-box' }}>{n}</div>
      ))}
    </div>
  )
}
const chatList = [
  { ini: null, icon: true, name: 'Announcements', sub: 'Rob: Meet time now 8:40 on Saturday', time: '7:12 pm', active: false },
  { ini: 'U12', name: 'U12 Sam team chat', sub: 'Dan: Why does Ruby only ever get one half?', time: '8:02 pm', active: true },
  { ini: 'JR', name: 'Jess & Rob', sub: 'You: See you at 8:30 then', time: '5:44 pm', active: false },
]
type Modal = 'delete' | 'reply' | null
export default function CH9MessageActions(_: { onBack?: () => void }) {
  const [modal, setModal] = useState<Modal>(null)
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setModal(null); setToast(m); setTimeout(() => setToast(null), 3200) }
  const emojis = ['👍', '❤️', '😂', '🙌', '😮', '🙏']
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <TopBar />
      <SubBar />
      <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: '340px minmax(0,1fr)' }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flexGrow: 1, fontSize: 22, fontWeight: 700 }}>Chats</div>
            <button onClick={() => t('Inbox opened.')} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Inbox</button>
            <button onClick={() => t('New chat setup opened.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>+ New chat</button>
          </div>
          {chatList.map((c, i) => (
            <button key={i} onClick={() => t(`${c.name} opened.`)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 68, padding: '0 16px', borderTop: `1px solid ${LN}`, background: c.active ? PALE : '#fff', boxShadow: c.active ? `inset 3px 0 0 ${G}` : 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
              <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: c.active ? '#c39797' : PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: c.icon ? 16 : 13, fontWeight: 700 }}>
                {c.icon ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round"><path d="M4 10v4h3l7 4V6l-7 4zM18 9a4 4 0 010 6"/></svg> : c.ini}
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><strong style={{ lineHeight: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</strong><span style={{ flexShrink: 0, fontSize: 12, color: MUT }}>{c.time}</span></div>
                <div style={{ fontSize: 13, color: MUT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.sub}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <div style={{ padding: '12px 18px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>U12</div>
            <div style={{ flexGrow: 1, fontSize: 16, fontWeight: 700 }}>U12 Sam team chat</div>
            <button onClick={() => t('Search this chat.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Search</button>
            <button onClick={() => t('Media opened.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Photos</button>
            <button onClick={() => t('Chat details opened.')} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><path d="M12 5h.01M12 12h.01M12 19h.01"/></svg>
            </button>
          </div>
          <div style={{ flexGrow: 1, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'flex-end', overflowY: 'auto' }}>
            {[
              { ini: 'LT', bg: '#cbbeb5', name: 'Linh', time: '7:48 pm', text: 'Mia found her other boot! And she got to 14 juggles.' },
              { ini: 'SK', bg: '#c39797', name: 'Sam', time: '7:52 pm', text: '14 is a new best. Tell her I said so.' },
            ].map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: msg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{msg.ini}</div>
                <div>
                  <div style={{ fontSize: 11, color: MUT, marginBottom: 2 }}>{msg.name} · {msg.time}</div>
                  <div style={{ maxWidth: 440, background: '#f7f8f7', border: `1px solid ${LN}`, borderRadius: '14px 14px 14px 4px', padding: '8px 12px', fontSize: 15, lineHeight: 1.5 }}>{msg.text}</div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>DC</div>
              <div>
                <div style={{ fontSize: 11, color: MUT, marginBottom: 2 }}>Dan · 8:02 pm</div>
                <div style={{ maxWidth: 440, background: GD, border: `2px solid ${G}`, borderRadius: '14px 14px 14px 4px', padding: '8px 12px', fontSize: 15, lineHeight: 1.5, color: '#fff' }}>
                  Why does Ruby only ever get one half? Some kids never come off.
                </div>
                <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
                  {emojis.map(em => (
                    <button key={em} onClick={() => t(`Reacted ${em}`)} style={{ width: 44, height: 44, borderRadius: '50%', background: '#f7f8f7', border: 0, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{em}</button>
                  ))}
                </div>
                <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
                  {[
                    { label: 'Reply', action: () => t('Reply opened.') },
                    { label: 'Reply privately to Dan', action: () => setModal('reply') },
                    { label: 'Pin', action: () => t("Dan's message pinned.") },
                    { label: 'Move out of group', action: () => t('Message moderation opened.') },
                    { label: 'Delete', action: () => setModal('delete') },
                  ].map(item => (
                    <button key={item.label} onClick={item.action} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: item.label === 'Delete' ? '#c03030' : INK }}>{item.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${LN}`, padding: '10px 18px', display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => t('Attachment options opened.')} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
            <div style={{ flexGrow: 1, height: 44, border: `1px solid #c5c8c4`, borderRadius: 10, background: '#fff', padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 15, color: MUT }}>Write to the team chat</div>
            <button onClick={() => t('Message sent.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
          </div>
        </div>
      </main>
      {modal === 'delete' && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
          <button onClick={() => setModal(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', border: 0, cursor: 'default' }} />
          <div role="dialog" aria-label="Delete this message for everyone?" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 440, borderRadius: 18, padding: '20px 22px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 12px 40px rgba(16,33,31,0.25)' }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Delete this message for everyone?</div>
            <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '10px 12px', fontSize: 15, lineHeight: '23px' }}>Why does Ruby only ever get one half? Some kids never come off.</div>
            <div style={{ fontSize: 14, color: MUT }}>Dan and everyone else in this chat won't see it anymore. Dan gets a note that a message was removed.</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setModal(null)} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={() => t("Message deleted for everyone.")} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: 0, background: '#c03030', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Delete for everyone</button>
            </div>
          </div>
        </div>
      )}
      {modal === 'reply' && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
          <button onClick={() => setModal(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', border: 0, cursor: 'default' }} />
          <div role="dialog" aria-label="Reply privately to Dan" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 540, borderRadius: 18, padding: '20px 22px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 12px 40px rgba(16,33,31,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flexGrow: 1, fontSize: 20, fontWeight: 700 }}>Reply privately to Dan</div>
              <button onClick={() => setModal(null)} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid #c5c8c4`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
              </button>
            </div>
            <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '10px 12px', fontSize: 14, color: MUT }}>
              <span style={{ fontWeight: 700 }}>Dan said: </span>Why does Ruby only ever get one half? Some kids never come off.
            </div>
            <div style={{ fontSize: 14, color: MUT }}>This goes to Dan only, not the whole chat. It opens a private thread between you and Dan.</div>
            <div style={{ minHeight: 80, border: `1px solid #c5c8c4`, borderRadius: 10, padding: 12, fontSize: 15, color: MUT, background: '#fff' }}>Hi Dan, happy to chat about this after the game on Saturday...</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setModal(null)} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={() => t('Private reply sent to Dan.')} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send privately</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
