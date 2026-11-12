import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function DF7OwnSaved(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: GD, height: 56, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Clean Sheet</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginLeft: 8 }}>Add your own drill</span>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={() => st('Closed.')} style={{ height: 44, padding: '0 16px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Close</button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, maxWidth: 560, textAlign: 'center' as const }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>Gate passing is in Our drills</div>
        <div style={{ fontSize: 15, color: MUT, lineHeight: 1.6 }}>Every coach at Wattle Creek can use it now. Clean Sheet will suggest it after a game when the problem shows up.</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => st('Opening add to session.')} style={{ height: 48, padding: '0 24px', borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Add to a session</button>
          <button onClick={() => st('Going back to library.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back to library</button>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px', width: '100%', textAlign: 'left' as const }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>Gate passing</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>15 min · 8 players · 30 × 25 m</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: G, background: PALE, padding: '3px 10px', borderRadius: 999 }}>Our drill</span>
          </div>
          <div style={{ marginTop: 12, padding: '10px 0', borderTop: `1px solid ${LN}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 4 }}>Suggested when</div>
            <div style={{ fontSize: 13, color: INK }}>We give the ball away more than 12 times in our half.</div>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
