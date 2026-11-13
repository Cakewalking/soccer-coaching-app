import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM4CoachOff() {
  const [showAsk, setShowAsk] = useState(false)
  const [reason, setReason] = useState('')
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  function handleSend() {
    setSent(true)
    setShowAsk(false)
    st('Your note has been sent to Rachel.')
  }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Game day' ? 700 : 500, color: t === 'Game day' ? '#fff' : 'rgba(255,255,255,0.65)', background: t === 'Game day' ? 'rgba(255,255,255,0.15)' : 'none', borderRadius: 999, padding: '4px 12px', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', gap: 6 }}>
            <span>✦</span>
          </div>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', gap: 6 }}>
            U9 Tom ▾
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>TA</div>
        </div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 28, height: 44, alignItems: 'center' }}>
        {['Turns', 'Live', 'Review', 'What we saw'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: t === 'Live' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: t === 'Live' ? 700 : 500, color: t === 'Live' ? G : MUT, cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Coach · MiniRoos</div>
      </div>

      {/* Page header */}
      <div style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>Saturday at Northgate City</div>
          <div style={{ fontSize: 13, color: MUT }}>U9 Tom · kick-off 8:30 · game 2 of 4</div>
        </div>
        <button onClick={() => st('Opening turns.')} style={{ height: 40, padding: '0 20px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open turns</button>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Main: feature off */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '48px 56px', textAlign: 'center', maxWidth: 540 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 12 }}>Live game help is off for MiniRoos</div>
            <div style={{ fontSize: 15, color: MUT, lineHeight: 1.6, marginBottom: 32 }}>
              Wattle Creek FC has this off for under 6 to under 11. "New coaches learn to read the game first." Rachel, director of football.
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => st('Showing what you still have on game day.')} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>What you still have today</button>
              {!sent
                ? <button onClick={() => setShowAsk(true)} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: '#fff', color: G, border: `1.5px solid ${G}`, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Rachel</button>
                : <div style={{ height: 44, padding: '0 24px', borderRadius: 999, background: PALE, color: G, border: `1.5px solid ${LN}`, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center' }}>Note sent ✓</div>
              }
            </div>
          </div>
        </div>

        {/* Right: what you still have */}
        <div style={{ width: 300, padding: '24px', borderLeft: `1px solid ${LN}`, background: '#fff' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 16 }}>Still here on game day</div>
          {[
            { n: 1, label: 'Turns', sub: 'Who starts, who is in goal, who is captain' },
            { n: 2, label: 'A game clock', sub: 'With a buzz at each change' },
            { n: 3, label: 'Quick notes', sub: 'Three taps after each game' },
            { n: 4, label: 'The review on Sunday', sub: 'From the film, as usual' },
          ].map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: G, flexShrink: 0 }}>{item.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{item.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{item.sub}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 24, fontSize: 12, color: MUT }}>Nothing you already recorded is lost when a feature is off.</div>
        </div>
      </div>

      {/* Ask modal */}
      {showAsk && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '32px', width: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 8 }}>Ask Rachel for Live game help</div>
            <div style={{ fontSize: 14, color: MUT, marginBottom: 20 }}>Rachel decides what each team gets. Tell her why it would help U9 Tom.</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, marginBottom: 6 }}>Why it would help</div>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="I have 12 children on Saturday and I'm on my own. Help with who has played least would let me watch the game."
              style={{ width: '100%', height: 100, border: `1.5px solid ${LN}`, borderRadius: 12, padding: '12px', fontSize: 14, fontFamily: 'var(--font-sans)', resize: 'none', outline: 'none', boxSizing: 'border-box' }}
            />
            <div style={{ fontSize: 12, color: MUT, marginTop: 8, marginBottom: 20 }}>Rachel sees your note with the cost to the club. You will hear back in the app. You can ask once a term.</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAsk(false)} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={handleSend} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send to Rachel</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
