import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
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
const photos = [
  { type: 'photo', title: 'Mia with both boots', by: 'Linh · today' },
  { type: 'video', title: 'Mia juggling', by: 'Linh · today', dur: '0:21' },
  { type: 'photo', title: 'Team photo after Ironbark', by: 'Rob · Sat' },
  { type: 'photo', title: 'New goals on pitch 2', by: 'Sam · Sat' },
  { type: 'video', title: "Ruby's goal", by: 'Jess · Sat', dur: '0:09' },
  { type: 'photo', title: 'Oranges at half time', by: 'Aroha · Sat' },
  { type: 'photo', title: 'Medals from the gala day', by: 'Rob · 23 May' },
  { type: 'video', title: 'Warm-up game', by: 'Sam · 21 May', dur: '0:34' },
]
export default function CH6Media(_: { onBack?: () => void }) {
  const [activeTab, setActiveTab] = useState(0)
  const [modal, setModal] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const tabs = ['Photos and videos · 19', 'Files · 3', 'Polls · 4', 'Places · 2']
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <TopBar />
      <SubBar />
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Photos, videos and files</h1>
          <span style={{ fontSize: 14, color: MUT }}>U12 Sam team chat · everything shared this season</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Back to chat.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Back to chat</button>
          <button onClick={() => t('Saving 14 photos and 5 videos.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Save all to this tablet</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <div style={{ gridColumn: 'span 9', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 2, padding: 3, borderRadius: 12, background: '#e9eae8', alignSelf: 'flex-start' }}>
            {tabs.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{ height: 38, padding: '0 14px', borderRadius: 9, fontSize: 14, fontWeight: 600, color: i === activeTab ? INK : MUT, background: i === activeTab ? '#fff' : 'transparent', border: 0, cursor: 'pointer', fontFamily: 'inherit' }}>{tab}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 190px)', gap: '14px 16px', justifyContent: 'space-between', overflowY: 'auto' }}>
            {photos.map((p, i) => (
              <button key={i} onClick={() => setModal(true)} style={{ display: 'flex', flexDirection: 'column', gap: 4, background: 'none', border: 0, cursor: 'pointer', textAlign: 'left', padding: 0, fontFamily: 'inherit' }}>
                <div style={{ width: 190, height: 118, borderRadius: 10, background: p.type === 'video' ? GD : '#cfe6dc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
                  {p.type === 'video' ? (
                    <>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GD} strokeWidth="2.4" strokeLinecap="round"><path d="M8 5l11 7-11 7z"/></svg>
                      </div>
                      <div style={{ position: 'absolute', right: 6, bottom: 6, height: 22, padding: '0 8px', borderRadius: 999, background: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center' }}>{p.dur}</div>
                    </>
                  ) : (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round"><path d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15.5 9.5h.01"/></svg>
                  )}
                </div>
                <strong style={{ fontSize: 13, lineHeight: '17px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 190, color: INK }}>{p.title}</strong>
                <span style={{ fontSize: 12, color: MUT }}>{p.by}</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 'auto', fontSize: 14, color: MUT }}>Photos here are for families in this chat. Sharing one outside the chat asks first.</div>
        </div>
        <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#cbbeb5', border: `1px solid #cbbeb5`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Held back · 1</div>
            <strong style={{ fontSize: 15, lineHeight: '21px' }}>A photo with Harper in it</strong>
            <div style={{ fontSize: 14 }}>Harper's parent hasn't answered about photos yet. Only you can see it.</div>
            <button onClick={() => t('Photo check opened.')} style={{ alignSelf: 'flex-start', height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Look</button>
          </div>
          <div style={{ flexGrow: 1, background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Kept how long</div>
            <div style={{ fontSize: 14, color: MUT }}>Until the season ends, then photos and videos are deleted unless the club saves them to its own albums.</div>
            <div style={{ marginTop: 'auto', fontSize: 14, color: MUT }}>A parent can ask for any photo of their child to be removed.</div>
          </div>
        </div>
      </main>
      {modal && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
          <button onClick={() => setModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', border: 0, cursor: 'default' }} />
          <div role="dialog" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 540, borderRadius: 18, padding: '20px 22px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 12px 40px rgba(16,33,31,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Mia with both boots</div>
                <div style={{ fontSize: 14, color: MUT }}>Linh Tran · today 7:48 pm · U12 Sam team chat</div>
              </div>
              <button onClick={() => setModal(false)} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid #c5c8c4`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
              </button>
            </div>
            <div style={{ height: 230, borderRadius: 14, background: '#cfe6dc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: G }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15.5 9.5h.01"/></svg>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Save', 'Remove from the chat', 'Report'].map((a, i) => (
                <button key={a} onClick={() => { setModal(false); t(a + ' done.') }} style={{ height: 40, padding: '0 14px', borderRadius: 999, border: i === 0 ? 0 : `1px solid #c5c8c4`, background: i === 0 ? G : '#fff', color: i === 0 ? '#fff' : INK, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{a}</button>
              ))}
            </div>
            <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '10px 12px', fontSize: 13, lineHeight: '19px' }}>Sharing a photo outside this chat asks the parent of each child in it first.</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setModal(false)} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={() => { setModal(false); t('Saved to this tablet.') }} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Save to this tablet</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
