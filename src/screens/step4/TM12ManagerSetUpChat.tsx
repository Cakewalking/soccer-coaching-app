import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
export default function TM12ManagerSetUpChat(_: { onBack?: () => void }) {
  const [postMode, setPostMode] = useState<'everyone' | 'coaches'>('everyone')
  const [photos, setPhotos] = useState(true)
  const [voice, setVoice] = useState(true)
  const [polls, setPolls] = useState(false)
  const [quiet, setQuiet] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} style={{ width: 52, height: 32, borderRadius: 999, background: on ? G : '#c5c8c4', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start', padding: 3, flexShrink: 0 }}>
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff' }} />
    </button>
  )
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam · you own this chat</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Set up the team chat</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>Who can post</div>
          {[
            { mode: 'coaches' as const, title: 'Coaches and me only', sub: 'Parents read, react, vote and reply to us privately' },
            { mode: 'everyone' as const, title: 'Everyone in the chat', sub: 'Parents can write and send what\'s switched on below' },
          ].map(opt => (
            <button key={opt.mode} onClick={() => setPostMode(opt.mode)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 60, padding: '8px 12px', borderRadius: 14, background: '#fff', border: postMode === opt.mode ? `2px solid ${G}` : `1px solid ${LN}`, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: postMode === opt.mode ? `7px solid ${G}` : `2px solid #6f7f7b`, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{opt.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{opt.sub}</div>
              </div>
            </button>
          ))}
          <div style={{ fontSize: 12, color: MUT }}>A new chat starts as coaches and manager only.</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '4px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, padding: '8px 0 4px' }}>Parents can send</div>
          {[
            { label: 'Photos and videos', sub: 'Checked against photo consent', on: photos, toggle: () => setPhotos(x => !x) },
            { label: 'Voice notes', sub: 'Up to 2 minutes', on: voice, toggle: () => setVoice(x => !x) },
            { label: 'Polls', sub: 'Off: only coaches and you can ask', on: polls, toggle: () => setPolls(x => !x) },
            { label: 'Quiet hours, 9 pm to 7 am', sub: 'No notifications overnight', on: quiet, toggle: () => setQuiet(x => !x) },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 58, borderTop: i > 0 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{item.label}</div>
                <div style={{ fontSize: 13, color: MUT }}>{item.sub}</div>
              </div>
              <Toggle on={item.on} onToggle={item.toggle} />
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT, textAlign: 'center', padding: '0 6px' }}>In the chat: 17 families, Sam and Jess. Players under 15 aren't added. The welfare officer can read it.</div>
      </div>
      <div style={{ padding: '10px 14px 12px', background: '#fff', borderTop: `1px solid ${LN}` }}>
        <button onClick={() => t('Chat created. 17 families invited.')} style={{ width: '100%', height: 52, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}>Create the chat</button>
      </div>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
