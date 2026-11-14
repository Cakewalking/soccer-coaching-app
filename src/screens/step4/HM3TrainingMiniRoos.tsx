import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const GAMES = [
  { time: '5:00', dur: '10 min', name: 'Traffic lights dribble', tag: 'Fun warm-up', desc: 'Everyone has a ball. Green: go. Red: stop with your foot on it. Amber: toe taps.', harder: 'Add "blue": swap balls with a friend' },
  { time: '5:10', dur: '10 min', name: 'Treasure island', tag: 'Skill game', desc: 'Balls are treasure in the middle. Dribble one back to your island. Most treasure wins.', harder: 'Now you can steal from other islands' },
  { time: '5:20', dur: '10 min', name: 'Gates galore', tag: 'Skill game', desc: 'Dribble through as many cone gates as you can in a minute. Beat your own score.', harder: 'A friend guards one gate' },
  { time: '5:30', dur: '15 min', name: '4 v 4 four-goal game', tag: 'Game', desc: 'Two small goals each end. No keepers. Let them play, and praise brave dribbling.', harder: 'A goal after a pass counts double' },
]

export default function HM3TrainingMiniRoos(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 64 }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: t === 'Training' ? '#40826d' : 'transparent', color: t === 'Training' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center' }}>U9 Tom · Wattle Creek</div>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: INK }}>TA</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {["Tonight's games", 'This term', 'Game library', 'Suggested'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: t === "Tonight's games" ? INK : MUT, borderBottom: t === "Tonight's games" ? `3px solid #40826d` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700 }}>Coach · MiniRoos</div>
        </div>
      </div>

      <div style={{ padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Training tonight · 5:00–5:45 pm</h1>
          <span style={{ fontSize: 14, color: MUT }}>Wattle Creek Reserve · 9 coming · this fortnight: running with the ball</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => showToast('Opens game swap picker.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Swap a game</button>
          <button onClick={() => showToast('Session started.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Start</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0, 1fr) 320px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {GAMES.map(g => (
            <div key={g.name} onClick={() => showToast(`Opens ${g.name}.`)} role="button" tabIndex={0} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', borderRadius: 14, border: `1px solid #c5c8c4`, background: '#fff', flex: 1, cursor: 'pointer' }}>
              <div style={{ width: 64, flexShrink: 0 }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{g.time}</div>
                <div style={{ fontSize: 13, color: MUT }}>{g.dur}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 17, fontWeight: 700 }}>{g.name}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: PALE, color: G }}>{g.tag}</span>
                </div>
                <div style={{ fontSize: 14, color: '#2d3d3a', lineHeight: '20px' }}>{g.desc}</div>
                <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}><strong>Too easy?</strong> {g.harder}</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: INK }}>Bring</div>
            <div style={{ fontSize: 15, lineHeight: '22px' }}>10 balls, 20 cones, 8 bibs, 4 small goals.</div>
            <div style={{ fontSize: 14, color: MUT }}>Set up takes about 5 minutes. One grid, 20 by 20 metres, works for all four games.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: INK, marginBottom: 4 }}>Tonight, remember</div>
            {[
              { init: 'PD', name: 'Poppy', note: 'Pair with Zara, first kick-off', bg: '#cbbeb5' },
              { init: 'AK', name: 'Arlo',  note: 'New. Show him each game first',  bg: '#cbbeb5' },
              { init: 'OH', name: 'Omar',  note: 'Away tonight',                   bg: LN },
            ].map(r => (
              <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 46, borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.init}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{r.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: INK }}>At this age</div>
            <div style={{ fontSize: 14, color: MUT }}>A ball each, no laps, no lines, no lectures. Show it, let them play, and change the game if it's too hard or too easy.</div>
            <div style={{ marginTop: 'auto', fontSize: 14, color: MUT, fontStyle: 'italic' }}>From the national curriculum's Discovery phase.</div>
          </div>
        </div>
      </div>
    {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
