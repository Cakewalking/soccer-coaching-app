import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDU2Lesson({ onBack, onShare }: { onBack?: () => void; onShare?: () => void }) {
  const [reaction, setReaction] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Clips' ? 700 : 500, color: t === 'Clips' ? '#fff' : 'rgba(255,255,255,0.65)', background: t === 'Clips' ? 'rgba(255,255,255,0.15)' : 'none', borderRadius: 999, padding: '4px 12px', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={onBack} style={{ fontSize: 13, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Learn</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Stepping up together</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button onClick={onShare} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
          <button onClick={() => st('Added to this week.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Use this week</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 24, padding: '24px 32px' }}>
        {/* Video + main content */}
        <div style={{ flex: 1 }}>
          {/* Video player */}
          <div style={{ background: GD, borderRadius: 16, overflow: 'hidden', marginBottom: 20, aspectRatio: '16/9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => st('Playing clip.')}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            {/* Controls bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: '20px 16px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.3)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: '35%', height: '100%', background: '#fff', borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 12, color: '#fff' }}>0:14</div>
            </div>
            <div style={{ position: 'absolute', top: 12, left: 12, background: G, borderRadius: 6, padding: '3px 8px', fontSize: 11, fontWeight: 700, color: '#fff' }}>Staying compact · 1 of 4</div>
          </div>

          {/* Title + meta */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <div style={{ height: 24, padding: '0 10px', borderRadius: 999, background: PALE, color: G, fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center' }}>Staying compact</div>
              <div style={{ height: 24, padding: '0 10px', borderRadius: 999, background: '#fff', border: `1px solid ${LN}`, color: MUT, fontSize: 11, display: 'inline-flex', alignItems: 'center' }}>All positions</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>Stepping up together</div>
            <div style={{ fontSize: 13, color: MUT }}>Made by Sam Knight · U12 Wattle Creek · Added to 3 teams</div>
          </div>

          {/* What to notice */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.08em', marginBottom: 8 }}>WHAT TO NOTICE</div>
            <div style={{ fontSize: 15, color: INK, lineHeight: 1.6 }}>
              When the front player presses, the whole line moves up with them. The gap between the lines stays the same size. Nobody is left behind.
            </div>
          </div>

          {/* Something to try */}
          <div style={{ background: PALE, border: `1px solid ${G}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '0.08em', marginBottom: 8 }}>SOMETHING TO TRY</div>
            <div style={{ fontSize: 15, color: INK, lineHeight: 1.6 }}>
              In your next small game, every time the front player presses, call "step up" and see how quickly the rest of the line comes with them.
            </div>
          </div>

          {/* Reactions from players */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>9 of 16 players watched</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              {['👍', '💡', '🔥'].map(r => (
                <button key={r} onClick={() => { setReaction(r); st('Reaction saved.') }} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `2px solid ${reaction === r ? G : LN}`, background: reaction === r ? PALE : '#fff', fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {r} <span style={{ fontSize: 13, color: reaction === r ? G : MUT }}>{r === '👍' ? 6 : r === '💡' ? 2 : 1}</span>
                </button>
              ))}
            </div>
            <div style={{ fontSize: 12, color: MUT }}>Players can react after watching.</div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Series */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Staying compact · series</div>
            {[
              { n: 1, title: 'Stepping up together', active: true },
              { n: 2, title: 'Closing the gap on a switch', active: false },
              { n: 3, title: 'Pressing as a unit', active: false },
              { n: 4, title: 'Recovery shape after a goal kick', active: false },
            ].map(l => (
              <div key={l.n} onClick={() => st(`Opening lesson ${l.n}.`)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}`, cursor: 'pointer' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: l.active ? G : '#e8edeb', color: l.active ? '#fff' : MUT, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{l.n}</div>
                <div style={{ fontSize: 12, color: l.active ? INK : MUT, fontWeight: l.active ? 700 : 400 }}>{l.title}</div>
                {l.active && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: G }} />}
              </div>
            ))}
          </div>

          {/* Up next */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 8 }}>UP NEXT</div>
            <div style={{ background: GD, borderRadius: 10, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>Closing the gap on a switch</div>
            <div style={{ fontSize: 11, color: MUT }}>0:12 · Staying compact 2 of 4</div>
          </div>

          <button onClick={onShare} style={{ height: 36, borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Share this lesson</button>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
