import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ["Where we're at", 'Opposition', 'Team talk', 'Line-up and minutes', 'Review']

export default function EX1eHowWorkedOutEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: G, height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Match day' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Match day' ? G2 : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>SK</div>
      </div>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: n === "Where we're at" ? 700 : 500, color: n === "Where we're at" ? INK : MUT, borderBottom: `3px solid ${n === "Where we're at" ? G2 : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Head coach</div>
      </div>
      <div style={{ flex: 'none', padding: '16px 28px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>When we lose it · From our style</div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Seconds to win the ball back</div>
      </div>
      <main style={{ flexGrow: 1, padding: '14px 28px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
            {[{ label: 'Last game', value: '—', color: MUT }, { label: 'Our target', value: '4 s', color: G }].map((s, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 20px', minWidth: 120 }}>
                <div style={{ fontSize: 12, color: MUT }}>{s.label}</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
              </div>
            ))}
            <div style={{ background: PALE, borderRadius: 14, padding: '12px 16px', flexGrow: 1 }}>
              <div style={{ fontSize: 13, color: INK, lineHeight: 1.5 }}>How long it takes us to get the ball back after we lose it in open play. Lower is better: it means the team presses together straight away.</div>
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', gap: 12, textAlign: 'center' as const }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: INK }}>Not measured yet</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, maxWidth: 400 }}>After your first recorded game you'll see every time you lost the ball, how long it took to win it back, and the clip for each one.</div>
            <button style={{ height: 48, padding: '0 28px', borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 4 }} onClick={() => st('Opening recording setup.')}>Record a game</button>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px', alignSelf: 'flex-start' as const }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>How it will be worked out</div>
          {['The match camera follows the ball and which team has it.', 'Each time we lose it in open play, a clock starts.', 'The clock stops when one of our players has the ball again.', 'We average every one of those times for the game.'].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: G }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>{s}</div>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>Left out</div>
            {['Set pieces, and times the ball went out of play.', "Times we lost it in their box, where pressing isn't the plan.", "Any minutes the camera couldn't see the ball."].map((s, i) => <div key={i} style={{ fontSize: 12, color: MUT, padding: '3px 0' }}>{s}</div>)}
          </div>
        </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </main>
    </div>
  )
}
