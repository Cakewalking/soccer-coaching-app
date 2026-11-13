import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDU2Lesson({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [playing, setPlaying] = useState(false)
  const [slow, setSlow] = useState(false)
  const [linesOn, setLinesOn] = useState(true)
  const [stopEach, setStopEach] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

  const points = [
    { n: 1, ts: '0:03', text: 'The ball goes back. All four take three steps forward at once.' },
    { n: 2, ts: '0:06', text: 'The nearest one calls "up". Nobody waits to be told.' },
    { n: 3, ts: '0:10', text: 'Their striker is left offside, and the space behind is gone.' },
  ]

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 4, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginRight: 20 }}>Clean Sheet</div>
        {(['Home', 'Squad', 'Training', 'Match day'] as const).map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>{t}</button>
        ))}
        <button onClick={() => tool('Clips')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>Clips</button>
        <button onClick={() => onNav?.('REC1-RecordHub')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>Record</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </button>
          <button onClick={() => tool('U12 Sam')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', background: 'none', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>U12 Sam</button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Clips sub-nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['By game', 'By measure', 'By player', 'Playlists'].map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>{t}</button>
        ))}
        <button onClick={() => onNav?.('EDU1-Learn')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: `2px solid ${G}`, fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>Learn</button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>

      {/* Lesson header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', alignItems: 'center', height: 52, gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Stepping up together</div>
          <div style={{ fontSize: 12, color: MUT }}>U14 Josh back four · v Ironbark, 23 May · 1 of 4 in "Staying compact"</div>
        </div>
        <button onClick={() => { tool('Add the drill to tonight'); st('"Step up together" added to tonight\'s plan as a draft.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add the drill to tonight</button>
        <button onClick={() => { tool('Send to players'); st('Pick players, or send to all 16. Under 15s get it through their parent\'s app.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Send to players</button>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 24, padding: '24px 32px', overflowY: 'auto' }}>
        {/* Left: video + controls */}
        <div style={{ flex: 1 }}>
          {/* Video player */}
          <div style={{ background: GD, borderRadius: 16, overflow: 'hidden', marginBottom: 16, aspectRatio: '16/9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: '20px 16px 12px' }}>
              <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.3)', borderRadius: 999, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ width: '20%', height: '100%', background: '#fff', borderRadius: 999 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Chapter jump buttons — 44px minimum */}
                {points.map(p => (
                  <button key={p.n} aria-label={String(p.n)} onClick={() => { tool(`chapter-${p.n}`); st(`Jumps to point ${p.n}.`) }} style={{ minWidth: 44, minHeight: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.n}</button>
                ))}
                <div style={{ flex: 1 }} />
                <div style={{ fontSize: 12, color: '#fff' }}>0:14</div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: 12, left: 12, background: G, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 700, color: '#fff' }}>Staying compact · 1 of 4</div>
          </div>

          {/* Video controls */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 16px', marginBottom: 12, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={() => { setPlaying(!playing); tool('Play'); st('Plays on to point 2.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, background: playing ? GD : G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Play</button>
            <button onClick={() => { setSlow(!slow); tool('Slow'); st('Half speed.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${slow ? G : LN}`, background: slow ? PALE : '#fff', fontSize: 13, color: slow ? G : INK, fontWeight: slow ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>Slow</button>
            <button onClick={() => { setLinesOn(!linesOn); tool('Lines'); st(linesOn ? 'Lines off.' : 'Lines on.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${linesOn ? G : LN}`, background: linesOn ? PALE : '#fff', fontSize: 13, color: linesOn ? G : INK, fontWeight: linesOn ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{linesOn ? 'Lines on' : 'Lines off'}</button>
            <button onClick={() => { setStopEach(!stopEach); tool('StopEach'); st(stopEach ? 'The clip plays straight through.' : 'Stops at each point.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${stopEach ? G : LN}`, background: stopEach ? PALE : '#fff', fontSize: 13, color: stopEach ? G : INK, fontWeight: stopEach ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{stopEach ? 'Stop at each point' : 'Play straight through'}</button>
          </div>

          {/* Point annotation rows */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
            {points.map((p, i) => (
              <button key={p.n} aria-label={`${p.n} ${p.ts} · ${p.text}`} onClick={() => { tool(`point-${p.n}`); st(`Jumps to ${p.ts} in the clip.`) }} style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: 'none', border: 'none', borderBottom: i < points.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                <div aria-hidden="true" style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.n}</div>
                <div style={{ fontSize: 12, color: INK }}><span style={{ color: MUT, fontSize: 11 }}>{p.ts}</span> · {p.text}</div>
              </button>
            ))}
          </div>

          {/* What to notice */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.08em', marginBottom: 8 }}>WHAT TO NOTICE</div>
            <div style={{ fontSize: 15, color: INK, lineHeight: 1.6 }}>When the front player presses, the whole line moves up with them. The gap between the lines stays the same size. Nobody is left behind.</div>
            <div style={{ fontSize: 13, color: MUT, marginTop: 12 }}>Ask your players: "What made them all move at the same moment?"</div>
          </div>

          <div style={{ background: PALE, border: `1px solid ${G}`, borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '0.08em', marginBottom: 8 }}>DRILL TO TRY</div>
            <div style={{ fontSize: 15, color: INK, lineHeight: 1.6, fontWeight: 700, marginBottom: 4 }}>Step up together. 10 minutes, 4 defenders and a server.</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Every time the front player presses, call "step up" and see how quickly the rest of the line comes with them.</div>
          </div>

          {/* Open drill + Nudge */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { tool('Open drill'); st('Opens the drill in the library.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Open drill</button>
            <button onClick={() => { tool('Nudge'); st('A reminder goes to 7 players.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge</button>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Staying compact · series</div>
            {[
              { n: 1, title: 'Stepping up together', active: true },
              { n: 2, title: 'Closing the gap on a switch', active: false },
              { n: 3, title: 'Pressing as a unit', active: false },
              { n: 4, title: 'Recovery shape after a goal kick', active: false },
            ].map(l => (
              <div key={l.n} onClick={() => tool(`series-${l.n}`)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', minHeight: 44, borderBottom: `1px solid ${LN}`, cursor: 'pointer' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: l.active ? G : '#e8edeb', color: l.active ? '#fff' : MUT, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{l.n}</div>
                <div style={{ fontSize: 12, color: l.active ? INK : MUT, fontWeight: l.active ? 700 : 400 }}>{l.title}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 8 }}>UP NEXT</div>
            <div style={{ background: GD, borderRadius: 10, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>Closing the gap on a switch</div>
            <div style={{ fontSize: 11, color: MUT }}>0:12 · Staying compact 2 of 4</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>9 of 16 players watched</div>
            <div style={{ fontSize: 12, color: MUT }}>Players can react after watching.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
