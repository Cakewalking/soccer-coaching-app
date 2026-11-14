import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const WORKS_OFFLINE = [
  'Tonight\'s full training plan and drill instructions',
  'Player adjustment notes for tonight',
  'Pitchside recording (saves locally)',
  'Boot sensor and GPS data collection',
  'Coach notes and moment tags',
]

const WAITS = [
  { label: 'Rondo 5 v 2', type: 'Drill results', time: 'Tue 2 Jun' },
  { label: 'Win it back · 6 s', type: 'Drill results', time: 'Thu 4 Jun' },
  { label: '3 moments tagged', type: 'Clip tags', time: 'Tonight' },
  { label: 'Coach note · Ella', type: 'Player note', time: 'Tonight' },
]

export default function FO1Offline(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button onClick={() => st('Opening team selector.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === "Tonight's session" ? INK : MUT, borderBottom: `3px solid ${n === "Tonight's session" ? '#40826d' : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        </div>
      </div>

      <div style={{ flex: 'none', background: '#cbbeb5', padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 600 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#6f5256', flex: 'none' }} />
        No signal · working offline · all changes will sync when you reconnect
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Offline · what still works</div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '12px 18px', background: PALE, borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: G }}>Works without signal</div>
            </div>
            {WORKS_OFFLINE.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px', borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flex: 'none' }}>✓</div>
                <div style={{ fontSize: 15 }}>{item}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: MUT, marginBottom: 10 }}>Waits for signal</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {['Suggested drills update', 'Sending parent messages', 'Syncing wellness check-ins', 'Uploading match camera footage', 'Loading new clips', 'Updating player development goals'].map((item, i) => (
                <div key={i} style={{ padding: '10px 12px', background: '#f7f8f7', border: `1px solid ${LN}`, borderRadius: 10, fontSize: 13, color: MUT }}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Waiting to send</div>
              <div style={{ fontSize: 13, fontWeight: 700, background: '#cbbeb5', borderRadius: 999, padding: '1px 8px' }}>{WAITS.length}</div>
            </div>
            {WAITS.map((item, i) => (
              <div key={i} style={{ padding: '8px 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{item.type} · {item.time}</div>
              </div>
            ))}
            <div style={{ marginTop: 8, fontSize: 13, color: MUT, lineHeight: '19px' }}>All saved locally. Will upload automatically when you're back in signal.</div>
          </div>
        </div>

      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </main>
    </div>
  )
}
