import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FILp1ParentFiles() {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const files = [
    { name: 'Saturday v Harbour Rovers · where and when', type: 'doc', new: true, opened: false },
    { name: 'Summer sevens · team sheets', type: 'sheet', opened: true },
    { name: 'Season letter to families', type: 'doc', opened: true },
    { name: 'Ground map, Redgum Reserve.pdf', type: 'upload', opened: true },
  ]

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '24px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U12 Sam</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Files</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>JM</div>
      </div>

      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        {files.map((f) => (
          <div key={f.name} onClick={() => st(`Opening ${f.name}`)} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 10, cursor: 'pointer', position: 'relative' }}>
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
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '12px 20px', display: 'flex', justifyContent: 'space-around' }}>
        {['Home', 'Chat', 'Files', 'More'].map(t => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: t === 'Files' ? PALE : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t === 'Files' ? G : MUT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {t === 'Home' ? <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> :
                 t === 'Chat' ? <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></> :
                 t === 'Files' ? <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></> :
                 <><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>
                }
              </svg>
            </div>
            <div style={{ fontSize: 10, color: t === 'Files' ? G : MUT, fontWeight: t === 'Files' ? 700 : 400 }}>{t}</div>
          </div>
        ))}
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
