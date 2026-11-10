import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function TL3eSprintResultsEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Squad', 'Fitness tests', 'Injury log', 'Load'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Fitness tests' ? 700 : 500, color: tab === 'Fitness tests' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Fitness coach</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
          <div style={{ fontSize: 13, color: MUT, cursor: 'pointer' }}>← 30m sprint</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Jai Patel</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 32 }}>U12 Sam · 30m sprint</div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '48px 32px', textAlign: 'center' as const, maxWidth: 480 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: PALE, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="1.5" strokeLinecap="round"><path d="M3 17l5-10 4 7 3-5 4 8"/></svg>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>No results for Jai yet</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Run the 30m sprint with Jai and enter the time here. Each result is plotted so you can track changes over the season.</div>
          <button onClick={() => t('Enter result form would open.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Enter first result</button>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
