import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type StyleCard = { ariaLabel: string; target: string; title: string; detail: string; count: string; picked: boolean }

const CARDS: StyleCard[] = [
  { ariaLabel: 'Be brave with the ball Picked Take a player on. Losing it is fine We count: dribbles tried, by how many children', target: 'Be brave with the ball: taken off. Pick up to three.', title: 'Be brave with the ball', detail: 'Take a player on. Losing it is fine', count: 'We count: dribbles tried, by how many children', picked: true },
  { ariaLabel: 'Find a friend Picked Look up and pass to someone in space We count: passes to a teammate', target: 'Find a friend: taken off. Pick up to three.', title: 'Find a friend', detail: 'Look up and pass to someone in space', count: 'We count: passes to a teammate', picked: true },
  { ariaLabel: 'Win it back together Picked When we lose it, the nearest three chase We count: seconds to win it back', target: 'Win it back together: taken off. Pick up to three.', title: 'Win it back together', detail: 'When we lose it, the nearest three chase', count: 'We count: seconds to win it back', picked: true },
  { ariaLabel: 'Use both feet Try the other foot, even when it goes wrong We count: touches with the weaker foot', target: 'Use both feet: picked. Pick up to three.', title: 'Use both feet', detail: 'Try the other foot, even when it goes wrong', count: 'We count: touches with the weaker foot', picked: false },
  { ariaLabel: 'Spread out Find space instead of crowding the ball We count: children', target: 'Spread out: picked. Pick up to three.', title: 'Spread out', detail: 'Find space instead of crowding the ball', count: 'We count: children within 5 metres of the ball', picked: false },
  { ariaLabel: 'Have a shot Anyone can shoot, from anywhere We count: shots, and how many children took one', target: 'Have a shot: picked. Pick up to three.', title: 'Have a shot', detail: 'Anyone can shoot, from anywhere', count: 'We count: shots, and how many children took one', picked: false },
]

export default function STMs1MiniRoosStyle({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 12px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 12px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snba = { ...snb, color: G, fontWeight: 700, borderBottom: `2.5px solid ${G}` }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 768, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 20, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Home" onClick={() => onNav?.('MS5-HomeMiniRoosSame')} style={tnb}>Home</button>
        <button aria-label="Squad" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Squad</button>
        <button aria-label="Training" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Training</button>
        <button aria-label="Game day" onClick={() => tool('the matching MiniRoos screen already in the app')} style={tnb}>Game day</button>
        <button aria-label="Clips" onClick={() => tool('MiniRoos: a best moment each')} style={tnb}>Clips</button>
        <button aria-label="Record" onClick={() => tool('MiniRoos: film for clips')} style={tnb}>Record</button>
        <div style={{ flex: 1 }} />
        <button aria-label="U9 Tom · Wattle Creek" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U9 Tom · Wattle Creek</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>T</div>
      </nav>

      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="Overview" onClick={() => onNav?.('MS5-HomeMiniRoosSame')} style={snb}>Overview</button>
        <button aria-label="Messages" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Messages</button>
        <button aria-label="Calendar" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Calendar</button>
        <button aria-label="Fixtures" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Fixtures</button>
        <button aria-label="Our style" onClick={() => onNav?.('MS1-MiniRoosStyle')} style={snba}>Our style</button>
        <button aria-label="Where we're at" onClick={() => onNav?.('MS2-MiniRoosWhereWeAt')} style={snb}>Where we're at</button>
        <button aria-label="Team staff" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Team staff</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>Our style</div>
              <div style={{ fontSize: 13, color: MUT }}>U9 Tom · pick up to three. Clean Sheet looks for them in every filmed game</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button aria-label="See what parents see" onClick={() => tool('Parents see the three things in their own words, with a way to cheer for them on Saturday.')} style={{ height: 44, padding: '0 16px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>See what parents see</button>
              <button aria-label="Save" onClick={() => onNav?.('MS2-MiniRoosWhereWeAt')} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Save</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '12px 16px', fontSize: 13, color: INK }}>
            <span style={{ fontWeight: 700, color: G }}>Be brave with the ball, find a friend, win it back together.</span>
            {' '}Change them any time. Past games are counted again.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {CARDS.map(c => (
              <div key={c.title} style={{ position: 'relative', background: c.picked ? PALE : '#fff', border: `1.5px solid ${c.picked ? G : LN}`, borderRadius: 12, padding: '14px 16px', minHeight: 100 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: INK, flex: 1, paddingRight: 8 }}>{c.title}</span>
                  {c.picked && <span style={{ fontSize: 11, fontWeight: 700, color: G, background: '#d4ece4', padding: '2px 6px', borderRadius: 4, flexShrink: 0 }}>Picked</span>}
                </div>
                <div style={{ fontSize: 12, color: MUT, marginBottom: 6 }}>{c.detail}</div>
                <div style={{ fontSize: 11, color: MUT }}>{c.count}</div>
                <button aria-label={c.ariaLabel} onClick={() => tool(c.target)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '12px 16px', fontSize: 12, color: MUT }}>
            No scores, no ladder, no child ranked against another. That is the same for every MiniRoos team.
          </div>
        </div>
      </div>
    </div>
  )
}
