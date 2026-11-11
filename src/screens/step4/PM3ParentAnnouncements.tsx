import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PM3ParentAnnouncements(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [msgText, setMsgText] = useState('Hi Rob, quick question about the roster—')

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f4f7f5', fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '52px 20px 0', flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0 }}>
          {['Chats', 'Team', 'My child'].map(tab => (
            <div key={tab} style={{ flex: 1, textAlign: 'center', paddingBottom: 10, fontSize: 15, fontWeight: 600, color: tab === 'Chats' ? '#fff' : 'rgba(255,255,255,0.6)', borderBottom: tab === 'Chats' ? '2px solid #fff' : '2px solid transparent' }}>{tab}</div>
          ))}
        </div>
      </div>

      {/* Page heading */}
      <div style={{ padding: '20px 16px 8px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: INK, marginBottom: 2 }}>Announcements</div>
        <div style={{ fontSize: 14, color: MUT }}>Wattle Creek FC · read only</div>
      </div>

      {/* Posts */}
      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '8px 16px 120px', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>

        {/* Post 1: Fixture PDF */}
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>Rob Owusu · 2 Jun</span>
            <span style={{ background: '#e8e8e8', color: MUT, fontSize: 11, fontWeight: 700, borderRadius: 999, padding: '2px 8px' }}>Manager</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>Fixture PDF for Term 2</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f4f7f5', borderRadius: 10, padding: '10px 12px' }}>
            <span style={{ fontSize: 22 }}>📄</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: INK }}>U12 fixtures, term 2.pdf</div>
              <div style={{ fontSize: 12, color: MUT }}>84 KB</div>
            </div>
            <span style={{ fontSize: 16, color: G }}>↓</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ background: '#f4f7f5', border: `1px solid ${LN}`, borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>👍 11</div>
            <div style={{ background: PALE, border: `1px solid ${G}`, borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 600, color: G, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>👁</span> Seen
            </div>
          </div>
        </div>

        {/* Post 2: Meet time */}
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>Rob Owusu · 29 May</span>
            <span style={{ background: '#e8e8e8', color: MUT, fontSize: 11, fontWeight: 700, borderRadius: 999, padding: '2px 8px' }}>Manager</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: INK }}>Meet time for Saturday: 9:15</div>
          <div style={{ fontSize: 15, color: INK, lineHeight: 1.5 }}>Be at Riverside Reserve 15 minutes before kickoff.</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f4f7f5', border: `1px solid ${LN}`, borderRadius: 999, padding: '5px 12px', alignSelf: 'flex-start' as const, fontSize: 13, fontWeight: 600, color: INK }}>
            📍 Riverside Reserve
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ background: '#f4f7f5', border: `1px solid ${LN}`, borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>👍 11</div>
            <button onClick={() => t('Got it.')} style={{ background: PALE, border: `1px solid ${G}`, borderRadius: 999, padding: '4px 14px', fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit' }}>Got it</button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: `1px solid ${LN}`, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 16 }}>🔒</span>
        <span style={{ fontSize: 13, color: MUT, flex: 1 }}>You can't write here.</span>
        <button onClick={() => setSheet('robprivate')} style={{ height: 40, padding: '0 16px', borderRadius: 20, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Message Rob</button>
      </div>

      {/* Sheet: Rob private */}
      {sheet === 'robprivate' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', width: 350, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: INK, marginBottom: 4 }}>Message Rob Owusu privately</div>
              <div style={{ fontSize: 14, color: MUT }}>Just you and Rob. Linh Tran.</div>
            </div>
            <textarea
              value={msgText}
              onChange={e => setMsgText(e.target.value)}
              style={{ border: `1px solid ${LN}`, borderRadius: 10, padding: '10px 12px', fontSize: 15, fontFamily: 'inherit', resize: 'none' as const, minHeight: 80, color: INK, outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setSheet(null)} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { setSheet(null); t('Sent to Rob.') }} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Send</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
