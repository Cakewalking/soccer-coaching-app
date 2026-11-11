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
const whoIn = [
  { label: 'All U12 families · 17', checked: true },
  { label: 'Coaches · 3', checked: true },
  { label: 'Rob, team manager', checked: true },
  { label: 'Pick people', checked: false },
]
export default function CH3NewChat(_: { onBack?: () => void }) {
  const [postMode, setPostMode] = useState<'everyone' | 'coaches'>('everyone')
  const [photos, setPhotos] = useState(true)
  const [voice, setVoice] = useState(true)
  const [polls, setPolls] = useState(false)
  const [files, setFiles] = useState(true)
  const [quiet, setQuiet] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} style={{ width: 52, height: 44, borderRadius: 999, background: on ? G : '#c5c8c4', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start', padding: 3, flexShrink: 0 }}>
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff' }} />
    </button>
  )
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <TopBar />
      <SubBar />
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>New chat</h1>
          <span style={{ fontSize: 14, color: MUT }}>You'll own this chat. You can change these later</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Cancelled.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={() => t('Chat created. 17 families invited.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Create chat</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Chat name</div>
            <div style={{ minHeight: 48, border: `1px solid #c5c8c4`, borderRadius: 10, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 15, background: '#fff' }}>U12 Sam · carpool to away games</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Who's in</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
              {whoIn.map((item, i) => (
                <button key={i} onClick={() => t(item.label)} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: item.checked ? `2px solid ${G}` : `1px solid #c5c8c4`, background: item.checked ? PALE : '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {item.checked && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5 9-10"/></svg>}
                  {item.label}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 14, color: MUT }}>Players under 15 can't be added to a chat. They get announcements through a parent.</div>
          </div>
          <div style={{ flexGrow: 1, background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Who can post</div>
            {[
              { mode: 'coaches' as const, title: 'Coaches and the manager only', sub: 'Parents can read, react, vote in polls and reply to you privately' },
              { mode: 'everyone' as const, title: 'Everyone in the chat', sub: 'Parents can write, and send what you switch on' },
            ].map(opt => (
              <button key={opt.mode} onClick={() => setPostMode(opt.mode)} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, padding: '8px 14px', borderRadius: 12, background: postMode === opt.mode ? '#f7f8f7' : '#fff', border: postMode === opt.mode ? `2px solid ${G}` : `1px solid #c5c8c4`, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', border: postMode === opt.mode ? `6px solid ${G}` : '2px solid #6f7f7b', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{opt.title}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{opt.sub}</div>
                </div>
              </button>
            ))}
            <div style={{ fontSize: 14, color: MUT }}>A new chat starts as coaches and manager only. Parents can post only if you choose it here.</div>
          </div>
        </div>
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px 8px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>What parents can send</div>
            {[
              { label: 'Photos and videos', sub: 'Checked against each child\'s photo consent', on: photos, toggle: () => setPhotos(x => !x) },
              { label: 'Voice notes', sub: 'Up to 2 minutes', on: voice, toggle: () => setVoice(x => !x) },
              { label: 'Polls', sub: 'Off: only you, Jess and Rob can ask', on: polls, toggle: () => setPolls(x => !x) },
              { label: 'Files and places', sub: 'PDFs, and a pin on the map', on: files, toggle: () => setFiles(x => !x) },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: `1px solid ${LN}` }}>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{item.sub}</div>
                </div>
                <Toggle on={item.on} onToggle={item.toggle} />
              </div>
            ))}
          </div>
          <div style={{ flexGrow: 1, background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px 10px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Quiet hours</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: `1px solid ${LN}` }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>No notifications 9 pm to 7 am</div>
                <div style={{ fontSize: 13, color: MUT }}>Messages still arrive, silently</div>
              </div>
              <Toggle on={quiet} onToggle={() => setQuiet(x => !x)} />
            </div>
            <div style={{ fontSize: 14, color: MUT, marginTop: 'auto', paddingTop: 8 }}>Set by Wattle Creek FC and can't be turned off: the welfare officer can read every chat with families, and messages are kept by the club.</div>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
