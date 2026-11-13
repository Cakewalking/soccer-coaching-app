import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FIL3bDocParent({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: GD, padding: '14px 20px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 20, padding: 0 }}>←</button>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', flex: 1, textAlign: 'center' }}>As a parent sees it</div>
        <div style={{ width: 20 }} />
      </div>

      {/* Preview banner */}
      <div style={{ background: '#fffbeb', borderBottom: '1px solid #fde68a', padding: '8px 16px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div style={{ fontSize: 12, color: '#78350f' }}>Preview — not the real doc. Changes here are not saved.</div>
      </div>

      <div style={{ flex: 1, padding: '20px 20px 100px', overflowY: 'auto' }}>
        {/* Doc header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 4 }}>U12 SAM · SHARED WITH FAMILIES</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: INK, lineHeight: 1.3, marginBottom: 4 }}>Saturday v Harbour Rovers</div>
          <div style={{ fontSize: 13, color: MUT }}>Updated by Sam Knight just now</div>
        </div>

        {/* Live changes — visible to parent */}
        <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0 }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: G }}>Updated 2 min ago</div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Meet time</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: GD }}>8:40 am</div>
          <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Changed from 9:00 — please allow extra time</div>
        </div>

        <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0 }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: G }}>Updated 5 min ago</div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Ground</div>
          <div style={{ fontSize: 15, color: INK, marginBottom: 8 }}>Harbour Rovers FC, Riverside Oval, 14 Riverside Drive, Harbour Bay</div>
          <button onClick={() => st('Opening in Maps.')} style={{ height: 32, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${G}`, background: PALE, fontSize: 12, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Get directions</button>
        </div>

        {/* Normal content */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>What to bring</div>
          {['Full kit (green)', 'Water bottle', 'Shin pads', 'Boots — it was wet last week'].map(item => (
            <div key={item} style={{ display: 'flex', gap: 8, padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ color: MUT }}>·</div>
              <div style={{ fontSize: 13, color: INK }}>{item}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>After the game</div>
          <div style={{ fontSize: 13, color: INK, lineHeight: 1.6 }}>We will have a brief team talk on the pitch. Families welcome to join. Packs up by 11:00.</div>
        </div>

        {/* Hidden content note */}
        <div style={{ background: '#f7f8f7', border: `1px dashed ${LN}`, borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Coaching notes and player comments are not shown to families.</div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: 390, background: '#fff', borderTop: `1px solid ${LN}`, padding: '12px 20px 24px' }}>
        <button onClick={onBack} style={{ width: '100%', height: 44, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Back to editing</button>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
