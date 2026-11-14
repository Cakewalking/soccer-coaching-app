import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ["Tonight's session", 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

export default function RC6eRunHistoryEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>SK</div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Record' ? INK : MUT, borderBottom: `3px solid ${n === 'Record' ? '#40826d' : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
          <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Head coach</div>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 2 }}>Win it back in 6 seconds · all runs</div>
            <div style={{ fontSize: 14, color: MUT }}>1 run so far</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>One run isn't a comparison yet</div>
            <div style={{ fontSize: 15, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>Run it again with the same set-up and the two line up here. Three runs make a trend.</div>
            <div style={{ background: '#f5f7f5', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: MUT, marginBottom: 2 }}>Tue 2 Jun · 12 players</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>6.1 seconds · 35% inside target</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: MUT, background: PALE, padding: '4px 10px', borderRadius: 999 }}>Starting point</div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button style={{ height: 44, padding: '0 20px', borderRadius: 10, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }} onClick={() => st('Starting new run.')}>Run it again</button>
            </div>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>What three runs show</div>
          {[{ n: '1', t: 'Your starting point', s: 'The first run is a baseline' }, { n: '2', t: 'Real change or not', s: 'Two runs show whether it moved' }, { n: '3', t: 'A trend', s: "Three runs tell you if it's holding" }].map(r => (
            <div key={r.n} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: G, flex: 'none', marginTop: 2 }}>{r.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.t}</div>
                <div style={{ fontSize: 12, color: MUT }}>{r.s}</div>
              </div>
            </div>
          ))}
        </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </main>
    </div>
  )
}
