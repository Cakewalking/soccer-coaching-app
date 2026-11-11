import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PM1ParentChats(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [msgText, setMsgText] = useState('Hi Rob, quick question about the roster—')

  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f4f7f5', fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '52px 20px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0 }}>
          {['Chats', 'Team', 'My child'].map(tab => (
            <div key={tab} style={{ flex: 1, textAlign: 'center', paddingBottom: 10, fontSize: 15, fontWeight: 600, color: tab === 'Chats' ? '#fff' : 'rgba(255,255,255,0.6)', borderBottom: tab === 'Chats' ? '2px solid #fff' : '2px solid transparent' }}>{tab}</div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '16px 16px 100px' }}>

        {/* Chat list card */}
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>

          {/* Announcements */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📢</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: INK }}>Announcements</span>
                <span style={{ background: G, color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 999, padding: '1px 7px', marginLeft: 2 }}>1</span>
              </div>
              <div style={{ fontSize: 13, color: MUT, overflow: 'hidden', whiteSpace: 'nowrap' as const, textOverflow: 'ellipsis' }}>Wattle Creek FC</div>
            </div>
            <div style={{ fontSize: 12, color: MUT, flexShrink: 0 }}>Mon</div>
          </div>

          {/* U12 Sam — selected */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${LN}`, background: PALE, borderLeft: `3px solid ${G}` }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: INK, flexShrink: 0 }}>U12</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: INK }}>U12 Sam</span>
                <span style={{ background: G, color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 999, padding: '1px 7px' }}>3</span>
              </div>
              <div style={{ fontSize: 13, color: MUT, overflow: 'hidden', whiteSpace: 'nowrap' as const, textOverflow: 'ellipsis' }}>Sam K: Great work today, Mia!</div>
            </div>
            <div style={{ fontSize: 12, color: MUT, flexShrink: 0 }}>4:15 pm</div>
          </div>

          {/* Sam K */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: INK, flexShrink: 0 }}>SK</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 2 }}>Sam K</div>
              <div style={{ fontSize: 13, color: MUT, overflow: 'hidden', whiteSpace: 'nowrap' as const, textOverflow: 'ellipsis' }}>Sam K: See you Thursday</div>
            </div>
            <div style={{ fontSize: 12, color: MUT, flexShrink: 0 }}>Tue</div>
          </div>

          {/* Rob Owusu */}
          <div onClick={() => setSheet('robprivate')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: INK, flexShrink: 0 }}>RO</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 2 }}>Rob Owusu</div>
              <div style={{ fontSize: 13, color: MUT, overflow: 'hidden', whiteSpace: 'nowrap' as const, textOverflow: 'ellipsis' }}>Rob: Please check the roster</div>
            </div>
            <div style={{ fontSize: 12, color: MUT, flexShrink: 0 }}>Mon</div>
          </div>
        </div>

        {/* Club section */}
        <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8, paddingLeft: 4 }}>Club</div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>
          <div onClick={() => setSheet('clubnews')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🛡️</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 2 }}>Wattle Creek FC</div>
              <div style={{ fontSize: 13, color: MUT }}>Announcements and club news</div>
            </div>
            <div style={{ fontSize: 16, color: MUT }}>›</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 13, color: MUT, padding: '8px 0' }}>Nobody's phone number is shared here.</div>
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

      {/* Sheet: Club news */}
      {sheet === 'clubnews' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', width: 350, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: INK, marginBottom: 4 }}>Wattle Creek FC</div>
              <div style={{ fontSize: 14, color: MUT }}>Only the club posts here.</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
                <span style={{ fontSize: 20 }}>📄</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: INK }}>U12 fixtures, term 2.pdf</div>
                  <div style={{ fontSize: 12, color: MUT }}>84 KB · fixture schedule</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0' }}>
                <span style={{ fontSize: 20 }}>🍔</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: INK }}>Canteen update</div>
                  <div style={{ fontSize: 12, color: MUT }}>New menu from Round 5</div>
                </div>
              </div>
            </div>
            <div style={{ background: PALE, borderRadius: 10, padding: '10px 12px', fontSize: 13, color: MUT }}>These come from the club. You can't reply here.</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => { setSheet(null); t('Got it.') }} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Got it</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
