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

export default function STWa2WhereWeAtYouth({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 14px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snba = { ...snb, color: G, fontWeight: 700, borderBottom: `2.5px solid ${G}` }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 768, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 24, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Home" onClick={() => tool('Home')} style={tnb}>Home</button>
        <button aria-label="Squad" onClick={() => tool('Squad tab')} style={tnb}>Squad</button>
        <button aria-label="Training" onClick={() => tool('Training tab')} style={tnb}>Training</button>
        <button aria-label="Match day" onClick={() => tool('Match day tab (Sat)')} style={tnb}>Match day</button>
        <button aria-label="Clips" onClick={() => tool('Clips tab')} style={tnb}>Clips</button>
        <button aria-label="Record" onClick={() => onNav?.('REC1-RecordHub')} style={tnb}>Record</button>
        <div style={{ flex: 1 }} />
        <button aria-label="U16 Ollie · Wattle Creek" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U16 Ollie · Wattle Creek</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>O</div>
      </nav>

      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="Overview" onClick={() => onNav?.('PH2-HomeYouthSame')} style={snb}>Overview</button>
        <button aria-label="Messages" onClick={() => tool('Home › Inbox')} style={snb}>Messages</button>
        <button aria-label="Calendar" onClick={() => tool('Home › Fixtures and results')} style={snb}>Calendar</button>
        <button aria-label="Fixtures and results" onClick={() => tool('Home › Fixtures and results')} style={snb}>Fixtures and results</button>
        <button aria-label="Our style" onClick={() => tool('Home › Our style')} style={snb}>Our style</button>
        <button aria-label="Where we're at" onClick={() => onNav?.('WA1-WhereWeAt')} style={snba}>Where we're at</button>
        <button aria-label="Team staff" onClick={() => tool('Home › Team staff')} style={snb}>Team staff</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>Where we're at</div>
              <div style={{ fontSize: 13, color: MUT }}>U16 Ollie · from 7 recorded games this season</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button aria-label="This season" onClick={() => tool('Showing this season. Tap for the last 5 games.')} style={{ height: 44, padding: '0 16px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>This season</button>
              <button aria-label="How it's worked out" onClick={() => tool("How it's worked out")} style={{ height: 44, padding: '0 16px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>How it's worked out</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Card
              ariaLabel="Building out under pressure Getting better 68% Reached halfway with the ball. Up from 58%"
              onClick={() => tool('Building out under pressure Getting better 68% Reached halfway with the ball. Up from 58%')}
              title="Building out under pressure" badge="Getting better" badgeColor={G} badgeBg={PALE}
              stat="68%" detail="Reached halfway with the ball. Up from 58%"
            />
            <Card
              ariaLabel="Counter-attacks against Tonight 6 a game 4 came from losing it in midfield"
              onClick={() => tool('Counter-attacks against Tonight 6 a game 4 came from losing it in midfield')}
              title="Counter-attacks against" badge="Tonight" badgeColor="#7a4f00" badgeBg="#fff3cc"
              stat="6 a game" detail="4 came from losing it in midfield"
            />
            <Card
              ariaLabel="Winning the ball back Keep 6 seconds On target"
              onClick={() => tool('Winning the ball back Keep 6 seconds On target')}
              title="Winning the ball back" badge="Keep" badgeColor={G} badgeBg={PALE}
              stat="6 seconds" detail="On target"
            />
            <Card
              ariaLabel="Chances made Getting better 9 a game 5 from wide areas"
              onClick={() => tool('Chances made Getting better 9 a game 5 from wide areas')}
              title="Chances made" badge="Getting better" badgeColor={G} badgeBg={PALE}
              stat="9 a game" detail="5 from wide areas"
            />
            <Card
              ariaLabel="Team load Manage +30% on usual Two weeks running. Priya has capped sprints"
              onClick={() => tool('Team load Manage +30% on usual Two weeks running. Priya has capped sprints')}
              title="Team load" badge="Manage" badgeColor="#7a4f00" badgeBg="#fff3cc"
              stat="+30% on usual" detail="Two weeks running. Priya has capped sprints"
            />
            <Card
              ariaLabel="Game time Keep 16 of 16 players Everyone over a third of every game"
              onClick={() => tool('Game time Keep 16 of 16 players Everyone over a third of every game')}
              title="Game time" badge="Keep" badgeColor={G} badgeBg={PALE}
              stat="16 of 16 players" detail="Everyone over a third of every game"
            />
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <button aria-label="Open tonight's plan" onClick={() => tool('Training tab')} style={{ height: 44, padding: '0 20px', background: '#fff', color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open tonight's plan</button>
            <button aria-label="Last review" onClick={() => tool('Match day › Review')} style={{ height: 44, padding: '0 20px', background: '#fff', color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Last review</button>
            <button aria-label="Line-ups that worked" onClick={() => onNav?.('SQ1-BestLineups')} style={{ height: 44, padding: '0 20px', background: '#fff', color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Line-ups that worked</button>
            <button aria-label="Change our style" onClick={() => tool('Home › Our style')} style={{ height: 44, padding: '0 20px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Change our style</button>
            <button aria-label="All 16 players" onClick={() => tool('Squad tab')} style={{ height: 44, padding: '0 20px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>All 16 players</button>
          </div>
        </div>

        <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: PALE, border: `1px solid ${G}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '0.07em', marginBottom: 6 }}>INSIGHT</div>
            <div style={{ fontSize: 13, color: INK, lineHeight: 1.6 }}>You are building out well. Six counter-attacks a game is too many: tonight covers the two players behind the ball. Load is high, so the session is 15 minutes shorter.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', marginBottom: 8 }}>PLAYERS</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 8 }}>The thing each one moved most, against their own last month.</div>
            <div style={{ fontSize: 12, color: MUT }}>In name order, never ranked. Players 15 and over see their own.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
