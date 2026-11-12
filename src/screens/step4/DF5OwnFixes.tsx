import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function DF5OwnFixes(_: { onBack?: () => void }) {
  const [phase, setPhase] = useState('With the ball')
  const [selected, setSelected] = useState<string[]>(['Giving the ball away in our half'])
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const PHASES = ['With the ball', 'Without the ball', 'When we win it', 'When we lose it']
  const PROBLEMS = [
    { label: 'Giving the ball away in our half', measure: 'Measured by ball losses in our half · Match camera', stat: 'Last game: 21' },
    { label: 'Not playing out from the back', measure: 'Measured by goal kicks played short · Match camera', stat: null },
    { label: 'Not enough shots', measure: 'Measured by shots on target · Match camera', stat: null },
  ]
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 'none', background: GD, height: 56, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Clean Sheet</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginLeft: 8 }}>Add your own drill</span>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={() => st('Cancelled.')} style={{ height: 44, padding: '0 16px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '28px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, overflowY: 'auto' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 20 }}>Step 3 of 4 · What it fixes</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>When should Clean Sheet suggest it?</div>
          <div style={{ fontSize: 14, color: MUT, marginBottom: 20 }}>Pick the moment it trains, then the problems it helps fix.</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {PHASES.map(p => <button key={p} onClick={() => setPhase(p)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `2px solid ${phase === p ? G : LN}`, background: phase === p ? PALE : '#fff', color: phase === p ? G : MUT, fontSize: 14, fontWeight: phase === p ? 700 : 500, cursor: 'pointer' }}>{p}</button>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PROBLEMS.map((p, i) => (
              <button key={i} onClick={() => setSelected(selected.includes(p.label) ? selected.filter(s => s !== p.label) : [...selected, p.label])} style={{ padding: '14px 16px', borderRadius: 14, border: `2px solid ${selected.includes(p.label) ? G : LN}`, background: selected.includes(p.label) ? PALE : '#fff', textAlign: 'left' as const, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontFamily: 'inherit' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: selected.includes(p.label) ? G : INK, marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.measure}</div>
                </div>
                {p.stat && <div style={{ fontSize: 13, fontWeight: 700, color: INK, flexShrink: 0, marginLeft: 12 }}>{p.stat}</div>}
              </button>
            ))}
          </div>
          {selected.length > 0 && (
            <div style={{ background: G, borderRadius: 12, padding: '12px 16px', marginTop: 16, color: '#fff' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, opacity: 0.7, marginBottom: 4 }}>Clean Sheet will suggest it when</div>
              <div style={{ fontSize: 14 }}>We give the ball away more than 12 times in our half.</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>Thresholds come from your targets in Home › Our style.</div>
            </div>
          )}
        </div>
        <div style={{ background: PALE, borderRadius: 14, padding: '14px', fontSize: 13, color: MUT, lineHeight: 1.6, alignSelf: 'flex-start' as const, marginTop: 60 }}>
          You can skip this. The drill still saves.
        </div>
      </main>
      <div style={{ flex: 'none', padding: '14px 28px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button onClick={() => st('Going back.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: MUT, cursor: 'pointer' }}>Back</button>
        <button onClick={() => st('Moving to Step 4.')} style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: GD, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Next</button>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
