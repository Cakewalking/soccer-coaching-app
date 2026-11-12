import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'

const CHOICES = [
  {
    id: 'brave',
    label: 'Be brave with the ball',
    desc: 'Take a player on. Losing it is fine',
    measure: 'We count: dribbles tried, by how many children',
  },
  {
    id: 'friend',
    label: 'Find a friend',
    desc: 'Look up and pass to someone in space',
    measure: 'We count: passes that reach a friend',
  },
  {
    id: 'winback',
    label: 'Win it back together',
    desc: 'When we lose it, the nearest three chase',
    measure: 'We count: seconds to win it back',
  },
  {
    id: 'bothfeet',
    label: 'Use both feet',
    desc: 'Try the other foot, even when it goes wrong',
    measure: 'We count: touches with the weaker foot',
  },
  {
    id: 'spread',
    label: 'Spread out',
    desc: 'Find space instead of crowding the ball',
    measure: 'We count: children within 5 metres of the ball',
  },
  {
    id: 'shoot',
    label: 'Have a shot',
    desc: 'Anyone can shoot, from anywhere',
    measure: 'We count: shots, and how many children took one',
  },
]

const DEFAULT_PICKED = new Set(['brave', 'friend', 'winback'])

export function MS1MiniRoosStyle() {
  const [picked, setPicked] = useState(new Set(DEFAULT_PICKED))
  const [toast, setToast] = useState<string | null>(null)
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const MAX = 3

  function toggle(id: string) {
    setPicked(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else if (next.size < MAX) { next.add(id) }
      return next
    })
  }

  const pickedLabels = CHOICES.filter(c => picked.has(c.id)).map(c => c.label)

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', gap: 24, fontFamily: 'var(--font-sans)' }}>

      {/* Left: picker */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>How we play</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>U9 Tom · pick up to three. Clean Sheet looks for them in every filmed game</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: G2, fontWeight: 600 }}>{picked.size} of {MAX} picked</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => showToast('Opening parent view.')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>See what parents see</button>
            <button onClick={() => showToast('Style saved.')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 'none', background: G, fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Save</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CHOICES.map(c => {
            const isPicked = picked.has(c.id)
            const disabled = !isPicked && picked.size >= MAX
            return (
              <button key={c.id} onClick={() => toggle(c.id)} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px',
                borderRadius: 14, border: `1.5px solid ${isPicked ? G : LN}`,
                background: isPicked ? PALE : '#fff', cursor: disabled ? 'default' : 'pointer',
                textAlign: 'left' as const, fontFamily: 'inherit', opacity: disabled ? 0.5 : 1,
                width: '100%',
              }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${isPicked ? G : LN}`, background: isPicked ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  {isPicked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: isPicked ? GD : INK, marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>{c.desc}</div>
                  <div style={{ fontSize: 12, color: isPicked ? G2 : MUT }}>{c.measure}</div>
                </div>
                {isPicked && (
                  <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: G, color: '#fff', flexShrink: 0 }}>Picked</span>
                )}
              </button>
            )
          })}
        </div>

        {picked.size === MAX && (
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>{MAX} of {MAX} picked</div>
            <div style={{ fontSize: 13, color: MUT }}>{pickedLabels.join(', ')}. Change them any time. Past games are counted again.</div>
          </div>
        )}
      </div>

      {/* Right: what this changes */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>What this changes</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {[
            { n: '1', title: "Tuesday's games", body: 'Picked to practise your three things' },
            { n: '2', title: "Saturday's review", body: 'Three things we saw, on your three things' },
            { n: '3', title: 'A best moment each', body: 'Clips of children doing them' },
          ].map(s => (
            <div key={s.n} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>What it never does</div>
          <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>No scores, no ladder, no child ranked against another. That is the same for every MiniRoos team.</div>
        </div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

export function MS1eMiniRoosStyleEmpty() {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', fontFamily: 'var(--font-sans)' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>How we play</div>
        <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>U9 Tom · nothing picked yet</div>
      </div>

      <div style={{ background: PALE, borderRadius: 16, padding: '32px 24px', maxWidth: 480, marginBottom: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>What do you want to see on Saturday?</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>Pick up to three things, in words the children use. Clean Sheet looks for them in games and builds Tuesday around them.</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => showToast('Opening style picker.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Pick our three things</button>
          <button onClick={() => showToast('Setting balanced style.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Use a balanced style for now</button>
        </div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 12 }}>How it works</div>
      {[
        { n: '1', title: 'Pick three things', body: 'About a minute' },
        { n: '2', title: 'Film a game', body: 'The tablet on a stand is enough' },
        { n: '3', title: "See how it's going", body: 'Team numbers, never the score' },
      ].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: LN, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
            <div style={{ fontSize: 13, color: MUT }}>{s.body}</div>
          </div>
        </div>
      ))}
      <div style={{ fontSize: 13, color: MUT, marginTop: 8 }}>The same tool every coach at the club has, in MiniRoos words.</div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
