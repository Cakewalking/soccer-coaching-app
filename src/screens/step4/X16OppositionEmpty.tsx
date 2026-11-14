import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review']

export default function X16OppositionEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 'none', background: G, height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Match day' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Match day' ? G2 : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>SK</div>
      </div>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: n === 'Opposition' ? 700 : 500, color: n === 'Opposition' ? INK : MUT, borderBottom: `3px solid ${n === 'Opposition' ? G2 : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Head coach</div>
      </div>
      <div style={{ padding: '20px 28px 0' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Opposition</div>
      </div>
      <main style={{ flexGrow: 1, padding: '16px 28px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 14, textAlign: 'center' as const }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>No game scheduled</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: MUT }}>Know who you're playing</div>
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, maxWidth: 440 }}>Add a fixture to see the other team's results. After you've played them once, you'll have your own clips of them too.</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => st('Opening fixture form.')} style={{ height: 48, padding: '0 24px', borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Add a fixture</button>
            <button onClick={() => st('Opening example opposition view.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See an example</button>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 14 }}>What you'll see</div>
          {[{ label: 'Their recent results', sub: 'From league results' }, { label: 'Your scouting notes', sub: 'Shared with your co-coach' }, { label: 'Clips from last time', sub: 'Only games you recorded' }].map((r, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{r.sub}</div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginTop: 12 }}>Clean Sheet never films or tracks other teams' players.</div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
