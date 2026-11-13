import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDU1eLearnEmpty({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

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

      <div style={{ flex: 1, display: 'flex', gap: 48, padding: '40px 48px', alignItems: 'flex-start' }}>
        {/* Left: main content */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: INK, marginBottom: 8 }}>Show your players what good looks like</div>
          <div style={{ fontSize: 15, color: MUT, maxWidth: 500, lineHeight: 1.6, marginBottom: 32 }}>
            Pick a clip of one of your own players doing something well, say what to notice, and send it to the team.
          </div>

          <div style={{ display: 'flex', gap: 20, marginBottom: 36 }}>
            {[
              { title: 'From any game you recorded', body: 'Find a moment where a player did something worth copying.' },
              { title: 'Up to three points. Clean Sheet drafts them', body: 'You edit the words. Add or remove any point.' },
              { title: 'The player and a parent say yes', body: 'Consent is tracked for you. You choose when to ask.' },
              { title: 'To your team, or the whole club after a check', body: 'The director reviews it once before it goes club-wide.' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{i + 1}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>{s.body}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => onNav?.('EDU3-MakeLesson')} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Make one from a clip</button>
            <button onClick={() => { tool('See ready-made lessons'); st('Lessons from Clean Sheet, with players who are not from your club.') }} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>See ready-made lessons</button>
          </div>
        </div>

        {/* Right: summary */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 16 }}>What is a lesson?</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>
              A lesson is a short clip of one of your players doing something well — 10 to 30 seconds — with what to notice and something to try. It is not a highlight. It is a teaching moment.
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
