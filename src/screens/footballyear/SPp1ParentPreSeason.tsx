import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SPp1ParentPreSeason(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative', margin: '0 auto' }}>
      {/* Phone status bar */}
      <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>9:41</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['▪','▪','▪'].map((s,i) => <span key={i} style={{ fontSize: 8, color: INK, opacity: i === 2 ? 1 : 0.4 }}>{s}</span>)}
        </div>
      </div>

      <div style={{ padding: '12px 20px 32px' }}>
        {/* Welcome */}
        <div style={{ background: G, borderRadius: 16, padding: '16px 18px', marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Wattle Creek FC U12 Sam</div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginBottom: 4 }}>Mia is in the squad!</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>2026 season · her place is confirmed</div>
        </div>

        {/* 4 things before round 1 */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>4 things before round 1</div>
          {[
            { n: '1', label: 'Confirm Mia is coming back',         done: true },
            { n: '2', label: 'Give consent for 2026',              done: false },
            { n: '3', label: 'Confirm her kit size (medium or large)', done: false },
            { n: '4', label: 'Reply to the baseline test invite',  done: false },
          ].map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}`, alignItems: 'flex-start' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: item.done ? G : '#f0f1ef', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 1 }}>
                {item.done
                  ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <span style={{ fontSize: 10, fontWeight: 700, color: MUT }}>{item.n}</span>
                }
              </div>
              <div style={{ fontSize: 14, color: item.done ? MUT : INK, textDecoration: item.done ? 'line-through' : 'none', lineHeight: 1.4 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Consent CTA */}
        <button onClick={() => t('Consent submitted for 2026.')} style={{ width: '100%', height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>Give consent for 2026</button>

        {/* Season dates */}
        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Season</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: GD }}>Round 1: 11 April · Last game: 30 August</div>
          <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>Pre-season training starts 15 February</div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
