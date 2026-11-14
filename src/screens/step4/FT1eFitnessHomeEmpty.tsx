import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Overview', 'Inbox', 'Calendar', 'Fitness level']

export default function FT1eFitnessHomeEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 'none', background: G, height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Home' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Home' ? G2 : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8c6e5a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>PS</div>
      </div>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: n === 'Overview' ? 700 : 500, color: n === 'Overview' ? INK : MUT, borderBottom: `3px solid ${n === 'Overview' ? G2 : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: G, background: PALE, padding: '4px 10px', borderRadius: 999 }}>Play level</div>
          <div style={{ fontSize: 13, color: MUT }}>Fitness coach</div>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '24px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24, overflowY: 'auto' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Hi Priya</div>
          <div style={{ fontSize: 14, color: MUT, marginBottom: 20 }}>U12 Sam · Play level · no data yet</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' as const, gap: 14 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>Start with heights</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, maxWidth: 440 }}>Measure the squad once, then Clean Sheet flags anyone growing fast and sets safe sprint and jump limits. Effort and pain check-ins start after the first session.</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
              <button onClick={() => st('Opening measuring session planner.')} style={{ height: 48, padding: '0 24px', borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Plan a measuring session</button>
              <button onClick={() => st('Opening fitness level settings.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Check the fitness level</button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 12 }}>Fills in like this</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>What fills in first</div>
            {[{ label: 'Growth', sub: 'After your first measuring session' }, { label: 'Effort and pain', sub: 'Players tap after each session' }, { label: 'Load', sub: 'From boot sensors, from U12' }].map((r, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{r.sub}</div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginTop: 12 }}>At Play level you see a few simple flags, not charts. That's on purpose.</div>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
