import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
const NAV = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ["Tonight's session", 'This week', 'Drill library', 'Growth and load']
const AGE_FILTERS = ['5–9', '9–12', 'Your team', '12–16', '16+', 'All ages']
const DRILLS = [
  { name: 'FIFA 11+ Kids warm-up', cat: 'Warm-up', time: '20 min' },
  { name: 'Rondo, 5 v 2', cat: 'First touch', time: '10 min' },
  { name: '4 v 4 + 3 keep-ball', cat: 'First touch', time: '15 min' },
  { name: '1 v 1 to gates', cat: '1 v 1', time: '15 min' },
  { name: 'Shoot on sight, 3 v 3', cat: 'Striking the ball', time: '15 min' },
  { name: 'Win it back in 6 seconds', cat: 'Team moments', time: '25 min' },
  { name: 'Play out from the keeper, 6 v 4', cat: 'Team moments', time: '20 min' },
  { name: 'Free game 9 v 9', cat: 'Games', time: '20 min' },
]

export default function X10DrillsEmpty(_: { onBack?: () => void }) {
  const [ageFilter, setAgeFilter] = useState('Your team')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 'none', background: G, height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? G2 : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>SK</div>
      </div>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: n === 'Drill library' ? 700 : 500, color: n === 'Drill library' ? INK : MUT, borderBottom: `3px solid ${n === 'Drill library' ? G2 : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Head coach</div>
      </div>
      <div style={{ flex: 'none', padding: '16px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Drill library</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>44 drills · none of your own yet</div>
        </div>
        <button onClick={() => st('Opening drill creator.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Add your own drill</button>
      </div>
      <div style={{ flex: 'none', padding: '10px 28px', display: 'flex', gap: 8 }}>
        {AGE_FILTERS.map(f => (
          <button key={f} onClick={() => setAgeFilter(f)} style={{ height: 36, padding: '0 14px', borderRadius: 999, background: f === ageFilter ? G : '#fff', color: f === ageFilter ? '#fff' : MUT, border: `1px solid ${f === ageFilter ? G : LN}`, fontSize: 13, fontWeight: f === ageFilter ? 700 : 500, cursor: 'pointer' }}>{f}</button>
        ))}
        {['Skill', 'Players', 'Time', 'Goals'].map(f => <button key={f} style={{ height: 36, padding: '0 14px', borderRadius: 999, background: '#fff', color: MUT, border: `1px solid ${LN}`, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{f}</button>)}
      </div>
      <main style={{ flexGrow: 1, padding: '8px 28px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24, overflowY: 'auto' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT, marginBottom: 10 }}>Good first drills for ages 9 to 12</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 20 }}>
            {DRILLS.map((d, i) => (
              <button key={i} onClick={() => st(`Opening ${d.name}.`)} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px', textAlign: 'left' as const, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 2 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{d.cat} · {d.time}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            ))}
          </div>
          <div style={{ background: '#fff', border: `2px dashed ${LN}`, borderRadius: 16, padding: '24px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 6 }}>Our drills</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: MUT, marginBottom: 6 }}>No drills of your own yet</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6, marginBottom: 14 }}>Draw one, pick a clip, or snap your whiteboard. Clean Sheet suggests it when it fits.</div>
            <button onClick={() => st('Opening drill creator.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Add your own drill</button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Suggested at the right time</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Link a drill to a problem and it shows up after games where that problem appears.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Share with your club</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Let every Wattle Creek coach use it, or keep it to yourself.</div>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
