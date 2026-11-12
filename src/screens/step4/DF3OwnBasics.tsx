import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function DF3OwnBasics(_: { onBack?: () => void }) {
  const [players, setPlayers] = useState(8)
  const [time, setTime] = useState(15)
  const [area, setArea] = useState('30 × 25 m')
  const [ages, setAges] = useState<string[]>([])
  const [kit, setKit] = useState<string[]>(['Balls', 'Cones'])
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const AREAS = ['10 × 10 m', '20 × 20 m', '30 × 25 m', 'Half pitch']
  const AGE_OPTS = ['U8 to U10', 'U11 to U13', 'U14+']
  const KIT_OPTS = ['Balls', 'Bibs', 'Cones', 'Mini goals', 'Big goals']
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
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 20 }}>Step 1 of 4 · The basics</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, color: INK, display: 'block', marginBottom: 6 }}>What's your drill called?</label>
              <input placeholder="Name" style={{ width: '100%', height: 48, borderRadius: 10, border: `1.5px solid ${LN}`, padding: '0 14px', fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' as const, outline: 'none' }}/>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={{ fontSize: 14, fontWeight: 600, color: INK, display: 'block', marginBottom: 6 }}>Players</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={() => setPlayers(Math.max(2, players - 1))} style={{ width: 44, height: 44, borderRadius: 8, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 20, fontWeight: 600, cursor: 'pointer', color: INK }}>−</button>
                  <span style={{ fontSize: 20, fontWeight: 700, color: INK, minWidth: 32, textAlign: 'center' as const }}>{players}</span>
                  <button onClick={() => setPlayers(players + 1)} style={{ width: 44, height: 44, borderRadius: 8, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 20, fontWeight: 600, cursor: 'pointer', color: INK }}>+</button>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 600, color: INK, display: 'block', marginBottom: 6 }}>Time</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={() => setTime(Math.max(5, time - 5))} style={{ width: 44, height: 44, borderRadius: 8, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 20, fontWeight: 600, cursor: 'pointer', color: INK }}>−</button>
                  <span style={{ fontSize: 16, fontWeight: 700, color: INK, minWidth: 48, textAlign: 'center' as const }}>{time} min</span>
                  <button onClick={() => setTime(time + 5)} style={{ width: 44, height: 44, borderRadius: 8, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 20, fontWeight: 600, cursor: 'pointer', color: INK }}>+</button>
                </div>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, color: INK, display: 'block', marginBottom: 8 }}>Area</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {AREAS.map(a => <button key={a} onClick={() => setArea(a)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `2px solid ${area === a ? G : LN}`, background: area === a ? PALE : '#fff', color: area === a ? G : MUT, fontSize: 14, fontWeight: area === a ? 700 : 500, cursor: 'pointer' }}>{a}</button>)}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, color: INK, display: 'block', marginBottom: 8 }}>Ages <span style={{ color: MUT, fontWeight: 400 }}>pick any</span></label>
              <div style={{ display: 'flex', gap: 8 }}>
                {AGE_OPTS.map(a => <button key={a} onClick={() => setAges(ages.includes(a) ? ages.filter(x => x !== a) : [...ages, a])} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `2px solid ${ages.includes(a) ? G : LN}`, background: ages.includes(a) ? PALE : '#fff', color: ages.includes(a) ? G : MUT, fontSize: 14, fontWeight: ages.includes(a) ? 700 : 500, cursor: 'pointer' }}>{a}</button>)}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, color: INK, display: 'block', marginBottom: 8 }}>Kit <span style={{ color: MUT, fontWeight: 400 }}>pick any</span></label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {KIT_OPTS.map(k => <button key={k} onClick={() => setKit(kit.includes(k) ? kit.filter(x => x !== k) : [...kit, k])} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `2px solid ${kit.includes(k) ? G : LN}`, background: kit.includes(k) ? PALE : '#fff', color: kit.includes(k) ? G : MUT, fontSize: 14, fontWeight: kit.includes(k) ? 700 : 500, cursor: 'pointer' }}>{k}</button>)}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>How it shows in the library</div>
            <div style={{ background: GD, borderRadius: 10, padding: '12px 14px', color: '#fff' }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Gate passing</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>15 min · 8 players · 30 × 25 m</div>
              <div style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.15)', padding: '3px 8px', borderRadius: 999, display: 'inline-block', marginTop: 6 }}>Our drill</div>
            </div>
          </div>
          <div style={{ background: PALE, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>You'll draw it in the next step. Only the name is needed to save.</div>
          </div>
        </div>
      </main>
      <div style={{ flex: 'none', padding: '14px 28px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: MUT }}>Everything else is optional.</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => st('Going back.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: MUT, cursor: 'pointer' }}>Back</button>
          <button onClick={() => st('Moving to Step 2.')} style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: GD, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Next</button>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
