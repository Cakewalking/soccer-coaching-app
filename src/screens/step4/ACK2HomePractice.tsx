import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACK2HomePractice() {
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', position: 'relative' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Practice at home · 10 minutes</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', marginTop: 4 }}>Left-foot wall strikes</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>KO</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>2 of 3 this week. One more before Tuesday.</div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 100px' }}>
        {[
          { n: '1', title: 'Find a wall and a line', body: 'Stand 5 big steps back' },
          { n: '2', title: '20 strikes, left foot only', body: 'Lock your ankle. Hit the middle of the ball' },
          { n: '3', title: '10 more, first time', body: 'Strike it as it comes back, no touch' },
          { n: '4', title: 'Count your best run', body: 'How many in a row hit your target?' },
        ].map(step => (
          <div key={step.n} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 13, fontWeight: 700, color: '#fff' }}>{step.n}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 2 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: MUT }}>{step.body}</div>
            </div>
          </div>
        ))}

        <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginTop: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 2 }}>Reece says</div>
          <div style={{ fontSize: 13, color: G, fontStyle: 'italic' }}>"Don't rush. Ten good ones beat thirty wild ones."</div>
        </div>

        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Sore or tired? Skip it. Rest counts too.</div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          {!done ? (
            <>
              <button onClick={() => { setDone(true); t('Done! Reece can see it.') }} style={{ height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Done it</button>
              <button onClick={() => t('Skipped. No worries.')} style={{ height: 48, borderRadius: 14, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Skip today</button>
            </>
          ) : (
            <div style={{ background: PALE, borderRadius: 12, padding: '14px 16px', textAlign: 'center' as const }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>Nice work!</div>
              <div style={{ fontSize: 13, color: G, marginTop: 4 }}>Reece can see it. 3 of 3 this week.</div>
            </div>
          )}
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
