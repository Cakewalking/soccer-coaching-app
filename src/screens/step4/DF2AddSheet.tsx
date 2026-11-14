import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ["Tonight's session", 'This week', 'Drill library', 'Growth and load']
const OPTIONS = [
  { label: 'Swap for "Warm-up rondo, 5 v 2" (10 min)', total: '80 min' },
  { label: 'Swap for "Win it back in 6 seconds" (25 min)', total: '65 min' },
  { label: 'Swap for "Small game, tight shape" (30 min)', total: '60 min' },
  { label: 'Add it before the cool-down', total: '90 min' },
]

export default function DF2AddSheet(_: { onBack?: () => void }) {
  const [selected, setSelected] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
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
      {/* Blurred background content */}
      <div style={{ position: 'absolute', top: 108, left: 0, right: 0, bottom: 0, filter: 'blur(2px)', opacity: 0.4, padding: '14px 28px', pointerEvents: 'none' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: INK }}>4 v 4 + 3 keep-ball</div>
        <div style={{ fontSize: 14, color: MUT }}>First touch · 15 min · 11 players</div>
      </div>
      {/* Modal overlay */}
      <div style={{ position: 'absolute', top: 108, right: 28, bottom: 28, width: 420, background: '#fff', borderRadius: 20, border: `1px solid ${LN}`, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: INK }}>Add to a session</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>4 v 4 + 3 keep-ball · 15 min</div>
        </div>
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Tonight · Thu 6:00 pm</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>4 drills · 75 min after the warm-up</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Where should it go?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {OPTIONS.map((opt, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 10, border: `2px solid ${selected === i ? G : LN}`, background: selected === i ? PALE : '#fff', cursor: 'pointer', textAlign: 'left' as const, fontFamily: 'inherit' }}>
                <span style={{ fontSize: 13, fontWeight: selected === i ? 700 : 400, color: INK }}>{opt.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: MUT, flexShrink: 0, marginLeft: 8 }}>{opt.total}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: '14px 20px', background: '#f7f8f7', borderTop: `1px solid ${LN}`, marginTop: 'auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 6 }}>Tonight's plan with this drill</div>
          {['4 v 4 + 3 keep-ball', 'Win it back in 6 seconds', 'Small game, tight shape', 'Cool-down and stretch'].map((d, i) => (
            <div key={i} style={{ fontSize: 12, color: MUT, padding: '3px 0' }}>{d}</div>
          ))}
          <div style={{ fontSize: 12, color: G, fontWeight: 600, marginTop: 8 }}>Player load stays within plan.</div>
        </div>
        <div style={{ padding: '12px 20px', display: 'flex', gap: 10, flexShrink: 0 }}>
          <button onClick={() => st('Cancelled.')} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: MUT, cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => st('Added to tonight.')} style={{ flex: 1, height: 44, borderRadius: 10, border: 'none', background: GD, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Add to tonight</button>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
