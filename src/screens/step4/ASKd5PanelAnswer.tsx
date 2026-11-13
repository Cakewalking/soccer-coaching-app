import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const SUB = ['Overview', 'Messages', 'Calendar', 'Fixtures and results', 'Our style', 'Where we\'re at', 'Team staff'] as const

const METRICS = [
  {
    title: 'Winning the ball back', status: 'Needs work', statusColor: '#c05', value: '7 seconds',
    context: 'Target 6. Fastest when Noah and Mia both press',
    ariaLabel: 'Winning the ball back Needs work 7 seconds Target 6. Fastest when Noah and Mia both press',
  },
  {
    title: 'Pressing wins in their half', status: 'Getting better', statusColor: G, value: '13 a game',
    context: 'Up from 8 in round 1',
    ariaLabel: 'Pressing wins in their half Getting better 13 a game Up from 8 in round 1',
  },
  {
    title: 'Goal kicks played short', status: 'Getting better', statusColor: G, value: '72%',
    context: 'Kept it for 3 passes or more',
    ariaLabel: 'Goal kicks played short Getting better 72% Kept it for 3 passes or more',
  },
  {
    title: 'Gap between the lines', status: 'Tonight', statusColor: '#b08020', value: '26 metres',
    context: 'Defence to midfield before their shots. Target 18',
    ariaLabel: 'Gap between the lines Tonight 26 metres Defence to midfield before their shots. Target 18',
  },
  {
    title: 'Strong last 15 minutes', status: 'About the same', statusColor: MUT, value: '−31% sprints',
    context: 'Sprints drop by a third in the last 15 minutes',
    ariaLabel: 'Strong last 15 minutes About the same −31% sprints Sprints drop by a third in the last 15 minutes',
  },
  {
    title: 'Fair minutes', status: 'Getting better', statusColor: G, value: '14 of 16 players',
    context: 'Over half of every game. Finn and Isla were under',
    ariaLabel: 'Fair minutes Getting better 14 of 16 players Over half of every game.',
  },
] as const

export default function ASKd5PanelAnswer({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  return (
    <div data-screen="ASKd5-PanelAnswer" data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 4, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginRight: 12 }}>Clean Sheet</div>
        {(['Home', 'Squad', 'Training', 'Match day', 'Clips'] as const).map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, padding: '0 10px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
        ))}
        <button onClick={() => onNav?.('REC1-RecordHub')} style={{ height: 44, padding: '0 10px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit' }}>Record</button>
        <button onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Clean Sheet</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => tool('U12 Sam')} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', background: 'none', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>U12 Sam</button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Sub-nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 24px', display: 'flex', gap: 2, height: 44, alignItems: 'center' }}>
        {SUB.map(t => {
          const active = t === "Where we're at"
          return (
            <button key={t} onClick={() => t === 'Overview' ? onNav?.('PH1-HomeJuniorsSame') : t === "Where we're at" ? onNav?.('WA1-WhereWeAt') : tool(t)} style={{ height: 44, padding: '0 10px', background: 'none', border: 'none', borderBottom: active ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: active ? 700 : 500, color: active ? G : MUT, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>{t}</button>
          )
        })}
      </div>

      {/* Body: main + panel */}
      <div style={{ flex: 1, display: 'flex', overflowY: 'auto' }}>
        {/* Main content */}
        <div style={{ flex: 1, padding: '20px 20px 20px 24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: INK, flex: 1 }}>Where we're at</div>
            <button onClick={() => tool('Showing this season. Tap for the last 5 games.')} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit', marginRight: 6 }}>This season</button>
            <button onClick={() => tool('How it\'s worked out')} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>How it's worked out</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 14 }}>
            {METRICS.map(m => (
              <div key={m.title} style={{ position: 'relative', background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', minHeight: 80 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: INK, flex: 1 }}>{m.title}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: m.statusColor, padding: '2px 6px', borderRadius: 999, background: m.statusColor + '18', whiteSpace: 'nowrap' }}>{m.status}</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 2 }}>{m.value}</div>
                <div style={{ fontSize: 11, color: MUT }}>{m.context}</div>
                <button aria-label={m.ariaLabel} onClick={() => tool(m.ariaLabel)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'default', border: 'none', background: 'none' }} />
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px', marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: INK, lineHeight: 1.5, marginBottom: 6 }}>Pressing is working, so keep it. The gap between the lines has not closed: tonight has two drills on staying compact.</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 2 }}>The thing each one moved most, against their own last month.</div>
            <div style={{ fontSize: 12, color: MUT }}>In name order, never ranked. Players see only their own.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => tool('Open tonight\'s plan')} style={{ height: 44, padding: '0 14px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open tonight's plan</button>
            <button onClick={() => tool('Last review')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Last review</button>
            <button onClick={() => onNav?.('SQ1-BestLineups')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Line-ups that worked</button>
            <button onClick={() => tool('Change our style')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Change our style</button>
            <button onClick={() => tool('All 16 players')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>All 16 players</button>
          </div>
        </div>

        {/* Ask panel with answer */}
        <div style={{ width: 340, flexShrink: 0, background: '#fff', borderLeft: `1px solid ${LN}`, display: 'flex', flexDirection: 'column', padding: '16px 20px', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: INK, flex: 1 }}>Ask Clean Sheet</div>
            <button onClick={() => onNav?.('ASKd3-AnyScreen')} style={{ height: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', fontSize: 18, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: MUT }}>Why is the gap between the lines not closing?</div>
          <div style={{ fontSize: 13, color: INK, lineHeight: 1.6, background: '#f7f8f7', borderRadius: 10, padding: '12px 14px' }}>
            The back four drops when you lose the ball. In 7 of 9 games the gap grew by 8 metres in the 5 seconds after a turnover. With the ball it is fine: 17 metres.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button onClick={() => tool('Recorded games 9')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>Recorded games 9</button>
            <button onClick={() => tool('Gap between the lines by phase')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>Gap between the lines by phase</button>
            <button onClick={() => tool('Opens tonight\'s plan with “Step up together” added as a draft. You save it there.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>Add a drill to tonight</button>
            <button onClick={() => tool('Opens Clips, filtered to the 7 moments.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>Show me the clips</button>
          </div>
          <div style={{ fontSize: 11, color: MUT, lineHeight: 1.4, background: '#f7f8f7', borderRadius: 8, padding: '8px 10px' }}>Uses only what you can see as head coach. Never sends anything by itself.</div>
          <button onClick={() => tool('Now asking about the whole team, not only this screen.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask about everything instead</button>
          <button onClick={() => tool('Past questions')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Past questions</button>
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <div style={{ flex: 1, height: 44, borderRadius: 10, background: '#f7f8f7', border: `1.5px solid ${LN}`, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 12, color: MUT }}>Type a question…</div>
            <button onClick={() => onNav?.('ASKd5-PanelAnswer')} style={{ height: 44, minWidth: 44, padding: '0 16px', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
