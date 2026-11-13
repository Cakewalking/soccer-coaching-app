import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function Card({ ariaLabel, onClick, title, badge, badgeColor, badgeBg, stat, detail }: {
  ariaLabel: string; onClick: () => void; title: string; badge: string; badgeColor: string; badgeBg: string; stat: string; detail: string
}) {
  return (
    <div style={{ position: 'relative', background: '#fff', border: `1px solid ${LN}`, borderRadius: 10, padding: '12px 14px', minHeight: 80 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: INK, flex: 1 }}>{title}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: badgeColor, background: badgeBg, padding: '2px 6px', borderRadius: 4, flexShrink: 0 }}>{badge}</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 2 }}>{stat}</div>
      <div style={{ fontSize: 12, color: MUT }}>{detail}</div>
      <button aria-label={ariaLabel} onClick={onClick} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
    </div>
  )
}

export default function STMs2MiniRoosWhereWeAt({ onNav }: { onNav?: (s: string) => void }) {
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
        <button aria-label="Our style" onClick={() => onNav?.('MS1-MiniRoosStyle')} style={snb}>Our style</button>
        <button aria-label="Where we're at" onClick={() => onNav?.('MS2-MiniRoosWhereWeAt')} style={snba}>Where we're at</button>
        <button aria-label="Team staff" onClick={() => tool('the matching MiniRoos screen already in the app')} style={snb}>Team staff</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>Where we're at</div>
              <div style={{ fontSize: 13, color: MUT }}>U9 Tom · from 5 filmed games this term and your taps after each one</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button aria-label="This term" onClick={() => tool('Showing term 2. Tap for the whole year.')} style={{ height: 44, padding: '0 16px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>This term</button>
              <button aria-label="How it's worked out" onClick={() => tool("How it's worked out")} style={{ height: 44, padding: '0 16px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>How it's worked out</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Card
              ariaLabel="Be brave with the ball Getting better 24 dribbles a game 9 of 10 children tried one. Was 6 of 10"
              onClick={() => tool('Be brave with the ball Getting better 24 dribbles a game 9 of 10 children tried one. Was 6 of 10')}
              title="Be brave with the ball" badge="Getting better" badgeColor={G} badgeBg={PALE}
              stat="24 dribbles a game" detail="9 of 10 children tried one. Was 6 of 10"
            />
            <Card
              ariaLabel="Find a friend About the same 17 passes a game Most still go to the nearest child"
              onClick={() => tool('Find a friend About the same 17 passes a game Most still go to the nearest child')}
              title="Find a friend" badge="About the same" badgeColor={MUT} badgeBg="#f0f2f1"
              stat="17 passes a game" detail="Most still go to the nearest child"
            />
            <Card
              ariaLabel="Win it back together Getting better 8 seconds Three chasers in 4 of 10 games"
              onClick={() => tool('Win it back together Getting better 8 seconds Three chasers in 4 of 10 games')}
              title="Win it back together" badge="Getting better" badgeColor={G} badgeBg={PALE}
              stat="8 seconds" detail="Three chasers in 4 of 10 games"
            />
            <Card
              ariaLabel="Everyone on the ball Keep All 10 children Every child had 10 touches or more"
              onClick={() => tool('Everyone on the ball Keep All 10 children Every child had 10 touches or more')}
              title="Everyone on the ball" badge="Keep" badgeColor={G} badgeBg={PALE}
              stat="All 10 children" detail="Every child had 10 touches or more"
            />
            <Card
              ariaLabel="Crowding the ball Tuesday 6 children close Within 5 metres of the ball"
              onClick={() => tool('Crowding the ball Tuesday 6 children close Within 5 metres of the ball')}
              title="Crowding the ball" badge="Tuesday" badgeColor="#7a4f00" badgeBg="#fff3cc"
              stat="6 children close" detail="Within 5 metres of the ball"
            />
            <Card
              ariaLabel="Different children shooting Getting better 6 a game Was 3 in the first term"
              onClick={() => tool('Different children shooting Getting better 6 a game Was 3 in the first term')}
              title="Different children shooting" badge="Getting better" badgeColor={G} badgeBg={PALE}
              stat="6 a game" detail="Was 3 in the first term"
            />
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <button aria-label="Open Tuesday's games" onClick={() => tool("Open Tuesday's games")} style={{ height: 44, padding: '0 20px', background: '#fff', color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open Tuesday's games</button>
            <button aria-label="Saturday's review" onClick={() => onNav?.('MS3-MiniRoosReview')} style={{ height: 44, padding: '0 20px', background: '#fff', color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Saturday's review</button>
            <button aria-label="Change our three things" onClick={() => onNav?.('MS1-MiniRoosStyle')} style={{ height: 44, padding: '0 20px', background: '#fff', color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Change our three things</button>
            <button aria-label="All 10 children" onClick={() => tool('All 10 children')} style={{ height: 44, padding: '0 20px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>All 10 children</button>
          </div>
        </div>

        <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: PALE, border: `1px solid ${G}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '0.07em', marginBottom: 6 }}>INSIGHT</div>
            <div style={{ fontSize: 13, color: INK, lineHeight: 1.6 }}>Bravery is up, so keep praising it. Passing has not moved: Tuesday has two games where a pass to a friend scores double.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 8 }}>CHILDREN</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>The thing each one moved most, against their own last month.</div>
            <div style={{ fontSize: 12, color: MUT }}>In name order, never ranked. No scores or results are kept.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
