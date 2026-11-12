import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Where we\'re at', 'Opposition', 'Team talk', 'Line-up and minutes', 'Review']

const BARS = [4, 3, 7, 5, 12, 2, 8, 6, 9, 3, 11, 4, 5, 8, 7, 3, 9, 6, 4, 10, 8, 5, 7, 11, 3, 6, 4, 8, 5, 9, 7]

export default function EX1HowWorkedOut(_: { onBack?: () => void }) {
  const [selectedBar, setSelectedBar] = useState<number | null>(14)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto' }}>
      <div style={{ flex: 'none', background: G, height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Match day' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Match day' ? G2 : 'transparent', cursor: 'pointer' }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>SK</div>
      </div>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: n === "Where we're at" ? 700 : 500, color: n === "Where we're at" ? INK : MUT, borderBottom: `3px solid ${n === "Where we're at" ? G2 : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Head coach</div>
      </div>
      <div style={{ flex: 'none', padding: '16px 28px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>When we lose it · From our style</div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Seconds to win the ball back</div>
        <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>Saturday vs Ironbark</div>
      </div>
      <main style={{ flexGrow: 1, padding: '14px 28px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            {[{ label: 'Last game', value: '7 s', color: '#c04040' }, { label: 'Our target', value: '4 s', color: G }].map((s, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 20px', minWidth: 120 }}>
                <div style={{ fontSize: 12, color: MUT }}>{s.label}</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
              </div>
            ))}
            <div style={{ background: PALE, borderRadius: 14, padding: '12px 16px', flexGrow: 1 }}>
              <div style={{ fontSize: 13, color: INK, lineHeight: 1.5 }}>How long it takes us to get the ball back after we lose it in open play. Lower is better: it means the team presses together straight away.</div>
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>Every time we lost it on Saturday</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>31 times · tap a bar for the clip</div>
            <div style={{ position: 'relative', height: 140 }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: 32, borderTop: `1.5px dashed #c04040` }}>
                <span style={{ position: 'absolute', right: 0, top: -16, fontSize: 11, color: '#c04040', fontWeight: 700 }}>Target 4 s</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', gap: 3 }}>
                {BARS.map((v, i) => (
                  <button key={i} onClick={() => setSelectedBar(i)} style={{ flex: 1, background: selectedBar === i ? GD : (v > 7 ? '#e8c0c0' : v > 4 ? '#c8d8c0' : '#a8c8a8'), borderRadius: '3px 3px 0 0', border: selectedBar === i ? `2px solid ${GD}` : 'none', cursor: 'pointer', height: `${(v / 12) * 100}%`, minHeight: 4, padding: 0 }}/>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: MUT }}>
                <span>Kick-off</span><span>Half-time</span><span>Full time</span>
              </div>
            </div>
            {selectedBar !== null && (
              <div style={{ marginTop: 10, background: PALE, borderRadius: 10, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Min {selectedBar + 1} · {BARS[selectedBar]} seconds · one player pressed, the rest watched</div>
                  <button onClick={() => st('Opening clip.')} style={{ fontSize: 12, color: G, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>All 4 clips →</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>How we worked it out</div>
            {['The match camera follows the ball and which team has it.', 'Each time we lose it in open play, a clock starts.', 'The clock stops when one of our players has the ball again.', 'We average all 31 times: 7.2 seconds, shown as 7 s.'].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: G }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Left out</div>
            {['Set pieces, and times the ball went out of play.', "Times we lost it in their box, where pressing isn't the plan.", 'Minutes 29 to 32, when the camera lost the ball.'].map((s, i) => <div key={i} style={{ fontSize: 12, color: MUT, padding: '4px 0', borderBottom: `1px solid ${LN}` }}>{s}</div>)}
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 4 }}>Solid</div>
              <div style={{ fontSize: 12, color: MUT }}>From 57 of 60 minutes of clear camera view.</div>
            </div>
            <button onClick={() => st('Report submitted.')} style={{ marginTop: 10, height: 36, padding: '0 12px', borderRadius: 8, background: 'transparent', color: G, border: `1px solid ${G}`, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Something look wrong? Report it</button>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
