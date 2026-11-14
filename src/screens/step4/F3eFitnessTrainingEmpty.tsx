import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ["Tonight's session", 'This week', 'Tests', 'Drill library']

export default function F3eFitnessTrainingEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 'none', background: G, height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? G2 : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8c6e5a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>PS</div>
      </div>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: n === "Tonight's session" ? 700 : 500, color: n === "Tonight's session" ? INK : MUT, borderBottom: `3px solid ${n === "Tonight's session" ? G2 : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: G, background: PALE, padding: '4px 10px', borderRadius: 999 }}>Play level</div>
          <div style={{ fontSize: 13, color: MUT }}>Fitness coach</div>
        </div>
      </div>
      <div style={{ padding: '20px 28px 0' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Tonight's session</div>
        <div style={{ fontSize: 14, color: MUT, marginTop: 2 }}>U12 Sam · no session planned yet</div>
      </div>
      <main style={{ flexGrow: 1, padding: '16px 28px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24, overflowY: 'auto' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center' as const, gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>Your part appears when Sam plans the session</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, maxWidth: 440 }}>Once the head coach sets tonight's training, you'll see the warm-up, who to go easy on, and where your 15 minutes fit.</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => st('Sending message to Sam.')} style={{ height: 48, padding: '0 24px', borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Ask Sam to plan it</button>
            <button onClick={() => st('Opening warm-up drills.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Browse warm-ups</button>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 12 }}>Fills in like this</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>What you'll see</div>
          {[{ label: 'The warm-up', sub: '11+ Kids, ready to run' }, { label: 'Who to go easy on', sub: 'Growing fast, or coming back from injury' }, { label: 'How hard it was', sub: 'Players tap their effort afterwards' }].map((r, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{r.sub}</div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginTop: 12 }}>At Play level your part is the warm-up and keeping an eye on growing players. No fitness drills.</div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
