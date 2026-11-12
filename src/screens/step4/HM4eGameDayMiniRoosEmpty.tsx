import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function HM4eGameDayMiniRoosEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U9 Tom · Wattle Creek</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Game day' ? 700 : 500, color: t === 'Game day' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Coach · MiniRoos</div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: 32, gap: 32 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: 420, textAlign: 'center' as const }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>No game this week</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>Fixtures, turns and the captain's armband appear here once a game is booked.</div>
            <button style={{ height: 44, padding: '0 24px', borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }} onClick={() => st('Opening fixtures.')}>Fixtures</button>
          </div>
        </div>

        <div style={{ width: 340 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>How turns work</div>
            {[
              { n: '1', title: 'Equal minutes', body: 'Changes every 10 minutes' },
              { n: '2', title: 'Goal and captain', body: 'Fewest turns goes first' },
              { n: '3', title: 'You decide', body: 'Swap anyone before kick-off' },
            ].map(step => (
              <div key={step.n} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 12, fontWeight: 700, color: G }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{step.title}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{step.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
