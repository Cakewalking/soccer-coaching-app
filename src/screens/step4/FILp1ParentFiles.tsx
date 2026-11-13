import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FILp1ParentFiles({ onBack, onNav }: {
  onBack?: () => void
  onNav?: (s: string) => void
}) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

  const files = [
    { id: 'doc1', name: 'Saturday v Harbour Rovers · where and when', type: 'doc', new: true, opened: false },
    { id: 'doc2', name: 'Summer sevens · team sheets', type: 'sheet', opened: true },
    { id: 'doc3', name: 'Season letter to families', type: 'doc', opened: true },
    { id: 'doc4', name: 'Ground map, Redgum Reserve.pdf', type: 'upload', opened: true },
  ]

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }} data-lasttool={lastTool}>
      {/* Header */}
      <div style={{ background: GD, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack && (
          <button onClick={() => onBack()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        )}
        <button onClick={() => tool('Mia')} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U12 Sam</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>Files · <span style={{ fontSize: 16 }}>Mia ▾</span></div>
        </button>
        <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKp2-PhoneAskOpen')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>JM</div>
      </div>

      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        {files.map((f) => (
          <div key={f.id} onClick={() => tool(f.id)} style={{ background: '#fff', border: `1px solid ${lastTool === f.id ? G : LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10, cursor: 'pointer', position: 'relative' }}>
            {f.new && (
              <div style={{ position: 'absolute', top: 10, right: 12, fontSize: 10, fontWeight: 700, background: G, color: '#fff', borderRadius: 999, padding: '2px 8px', letterSpacing: '0.05em' }}>NEW</div>
            )}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: f.type === 'doc' ? '#f0faf5' : PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {f.type === 'doc' || f.type === 'upload'
                    ? <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>
                    : <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></>
                  }
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: f.opened ? 400 : 700, color: INK }}>{f.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{f.type === 'doc' ? 'Doc' : f.type === 'sheet' ? 'Sheet' : 'PDF'}{f.opened ? ' · Opened' : ' · Not opened yet'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '8px 20px 12px', display: 'flex', justifyContent: 'space-around' }}>
        {[
          { label: 'Home', target: 'ASKd8-PhoneHome' },
          { label: 'Coming', target: 'ASKd9-Coming' },
          { label: 'Messages', target: 'MSGp1-ThreadList' },
          { label: 'Files', target: '' },
        ].map(({ label, target }) => (
          <div key={label} onClick={() => target ? onNav?.(target) : undefined} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: target ? 'pointer' : 'default' }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: label === 'Files' ? PALE : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={label === 'Files' ? G : MUT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {label === 'Home' ? <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> :
                 label === 'Coming' ? <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></> :
                 label === 'Messages' ? <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></> :
                 <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>
                }
              </svg>
            </div>
            <div style={{ fontSize: 10, color: label === 'Files' ? G : MUT, fontWeight: label === 'Files' ? 700 : 400 }}>{label}</div>
          </div>
        ))}
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
