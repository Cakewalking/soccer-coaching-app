import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PAThanks(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 390, minHeight: 844, background: '#fff', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' as const }}>
      {/* App bar */}
      <div style={{ background: GD, height: 52, display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '48px 28px' }}>
        {/* Check circle */}
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: PALE, border: `2px solid ${G}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>

        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 10, textAlign: 'center' as const }}>Check-in sent</div>
        <div style={{ fontSize: 15, color: MUT, lineHeight: '1.6', textAlign: 'center' as const, marginBottom: 36 }}>
          Sam and Priya will see this before training tonight.
        </div>

        {/* Summary card */}
        <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px', width: '100%', marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Today's check-in</div>
          {[
            ["Feeling today", "4 · Good"],
            ["Energy",        "4 · Good"],
            ["Soreness",      "2 · Light"],
          ].map(([label, val], i) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderTop: i > 0 ? `1px solid ${LN}` : 'none' }}>
              <span style={{ fontSize: 14, color: INK }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: G }}>{val}</span>
            </div>
          ))}
        </div>

        <button onClick={() => st('Going back to home.')} style={{ width: '100%', height: 52, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          Back to home
        </button>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
