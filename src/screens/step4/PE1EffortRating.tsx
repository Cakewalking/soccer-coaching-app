import { useState } from 'react'
const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', G = '#2f6252'

export default function PE1EffortRating(_: { onBack?: () => void }) {
  const [effort, setEffort] = useState(6)
  const [hurt, setHurt] = useState<'no' | 'yes' | null>(null)
  const [fun, setFun] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const FUN_OPTS = [{ label: 'Not really', v: 0 }, { label: 'It was OK', v: 1 }, { label: 'Loved it', v: 2 }]
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '14px 18px 12px' }}>
        <div style={{ fontSize: 12, color: '#cfe6dc' }}>After training · Thu 4 Jun · 30 seconds</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>How was tonight, Mia?</div>
      </div>
      <div style={{ flexGrow: 1, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 16 }}>How hard did it feel?</div>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <input type="range" min={0} max={10} value={effort} onChange={e => setEffort(Number(e.target.value))} style={{ width: '100%', accentColor: G, height: 6, cursor: 'pointer' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: MUT }}>0</span>
            <span style={{ fontSize: 11, color: MUT }}>2</span>
            <span style={{ fontSize: 11, color: MUT }}>4</span>
            <span style={{ fontSize: 11, color: MUT }}>6</span>
            <span style={{ fontSize: 11, color: MUT }}>8</span>
            <span style={{ fontSize: 11, color: MUT }}>10</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: MUT }}>Easy</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: G }}>{effort}</span>
            <span style={{ fontSize: 12, color: MUT }}>Hardest ever</span>
          </div>
          <div style={{ textAlign: 'center' as const, marginTop: 4 }}>
            <span style={{ fontSize: 13, color: MUT }}>{effort <= 3 ? 'Easy' : effort <= 5 ? 'OK' : effort <= 7 ? 'Hard' : 'Hardest ever'}</span>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Did anything hurt?</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['No', 'Yes, show where'].map(opt => (
              <button key={opt} onClick={() => setHurt(opt === 'No' ? 'no' : 'yes')} style={{ flex: 1, height: 44, borderRadius: 10, border: `2px solid ${hurt === (opt === 'No' ? 'no' : 'yes') ? G : LN}`, background: hurt === (opt === 'No' ? 'no' : 'yes') ? '#eef5f2' : '#fff', color: hurt === (opt === 'No' ? 'no' : 'yes') ? G : MUT, fontSize: 14, fontWeight: hurt === (opt === 'No' ? 'no' : 'yes') ? 700 : 500, cursor: 'pointer' }}>{opt}</button>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Was it fun?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {FUN_OPTS.map(opt => (
              <button key={opt.v} onClick={() => setFun(opt.v)} style={{ flex: 1, height: 44, borderRadius: 10, border: `2px solid ${fun === opt.v ? G : LN}`, background: fun === opt.v ? '#eef5f2' : '#fff', color: fun === opt.v ? G : MUT, fontSize: 13, fontWeight: fun === opt.v ? 700 : 500, cursor: 'pointer' }}>{opt.label}</button>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, textAlign: 'center' as const }}>Only Sam and Priya see your answers. Mum sees them too because you're under 15.</div>
        <button onClick={() => st('Sent! Thanks Mia.')} style={{ height: 52, borderRadius: 14, background: GD, color: '#fff', border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 'auto' }}>Send</button>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
