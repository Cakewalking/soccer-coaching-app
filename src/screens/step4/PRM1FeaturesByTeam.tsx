import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM1FeaturesByTeam({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb: React.CSSProperties = { height: 56, padding: '0 10px', background: 'none', color: 'rgba(255,255,255,0.75)', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const snb: React.CSSProperties = { height: 44, padding: '0 14px', background: 'none', color: MUT, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }

  const onStyle: React.CSSProperties = { height: 44, minWidth: 60, padding: '0 14px', background: PALE, color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }
  const offStyle: React.CSSProperties = { height: 44, minWidth: 60, padding: '0 14px', background: '#fff', color: MUT, border: `1.5px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }

  const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: '200px 1fr 1fr 1fr 1fr', borderBottom: `1px solid ${LN}` }
  const cell: React.CSSProperties = { padding: '12px 10px', display: 'flex', alignItems: 'center', borderLeft: `1px solid ${LN}` }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button onClick={() => tool('Club › Overview')} style={tnb}>Club</button>
        <button onClick={() => tool('Teams')} style={tnb}>Teams</button>
        <button onClick={() => tool('Coaches')} style={tnb}>Coaches</button>
        <button onClick={() => tool('Players')} style={tnb}>Players</button>
        <button onClick={() => tool('Safeguarding')} style={tnb}>Safeguarding</button>
        <button onClick={() => tool('Reports › Board report')} style={tnb}>Reports</button>
        <button onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>Whole club</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>RM</div>
      </nav>
      {/* Club sub-nav */}
      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button onClick={() => tool('Club › Overview')} style={snb}>Overview</button>
        <button onClick={() => onNav?.('MSG4-DirectorMessages')} style={snb}>Messages</button>
        <button onClick={() => tool('Club › Calendar')} style={snb}>Calendar</button>
        <button onClick={() => tool('D7-SeasonPlan')} style={snb}>Season plan</button>
        <button onClick={() => tool('D8-ClubStyle')} style={snb}>Playing style</button>
        <button onClick={() => onNav?.('FIL5-ClubFiles')} style={snb}>Files</button>
        <button onClick={() => onNav?.('PRM1-FeaturesByTeam')} style={{ ...snb, color: G, fontWeight: 700, borderBottom: `2px solid ${G}`, height: 44 }}>Features and billing</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Main */}
        <div style={{ flex: 1, padding: '24px 20px 24px 24px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, gap: 12 }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: INK }}>Features and billing</span>
              <span style={{ fontSize: 13, color: MUT, marginLeft: 12 }}>Wattle Creek FC · you are the billing owner</span>
            </div>
            <button onClick={() => tool('A short page for each feature: what the coach sees with it on, and without.')} style={{ height: 44, padding: '0 16px', background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>What each one does</button>
            <button onClick={() => onNav?.('PRM3-Bill')} style={{ height: 44, padding: '0 16px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>This month's bill</button>
          </div>

          {/* Table header */}
          <div style={{ ...grid, background: PALE, borderTop: `1px solid ${LN}` }}>
            <div style={{ padding: '10px 0', fontSize: 11, color: MUT, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.07em' }}>Team</div>
            <div style={{ ...cell, flexDirection: 'column' as const, alignItems: 'flex-start', gap: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: INK }}>Record</span>
              <span style={{ fontSize: 11, color: MUT }}>In your plan</span>
            </div>
            <div style={{ ...cell, flexDirection: 'column' as const, alignItems: 'flex-start', gap: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: INK }}>Live help</span>
              <span style={{ fontSize: 11, color: MUT }}>$15 a team</span>
            </div>
            <div style={{ ...cell, flexDirection: 'column' as const, alignItems: 'flex-start', gap: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: INK }}>Vests</span>
              <span style={{ fontSize: 11, color: MUT }}>$10 a team</span>
            </div>
            <div style={{ ...cell, flexDirection: 'column' as const, alignItems: 'flex-start', gap: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: INK }}>Extra space</span>
              <span style={{ fontSize: 11, color: MUT }}>$4 for 20 GB</span>
            </div>
          </div>

          {/* MiniRoos group header */}
          <div style={{ ...grid, background: '#f8faf9', borderTop: `1px solid ${LN}` }}>
            <div style={{ padding: '12px 0' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>MiniRoos</div>
              <div style={{ fontSize: 11, color: MUT }}>Under 6 to 11 · 5 teams</div>
            </div>
            {/* Record: All on [nth=1] */}
            <div style={cell}><button onClick={() => tool('MiniRoos: record turned off for every team in this group.')} style={onStyle}>All on</button></div>
            {/* Live: All off [nth=1] */}
            <div style={cell}><button onClick={() => tool('MiniRoos: live help turned on for every team in this group.')} style={offStyle}>All off</button></div>
            {/* Vests: n/a */}
            <div style={{ ...cell, fontSize: 12, color: MUT, fontStyle: 'italic' }}>Not for this age</div>
            {/* Space: All off [nth=2] */}
            <div style={cell}><button onClick={() => tool('MiniRoos: space turned on for every team in this group.')} style={offStyle}>All off</button></div>
          </div>

          {/* U9 Mark row */}
          <div style={{ ...grid, background: '#fff' }}>
            <div style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, color: INK, display: 'flex', alignItems: 'center' }}>U9 Mark</div>
            {/* Record: On [nth=1] */}
            <div style={cell}><button onClick={() => tool('U9 Mark record: turned off.')} style={onStyle}>On</button></div>
            {/* Live: Off [nth=1] */}
            <div style={cell}><button onClick={() => tool('U9 Mark live game help: turned on.')} style={offStyle}>Off</button></div>
            {/* Vests: n/a */}
            <div style={{ ...cell, fontSize: 12, color: MUT }}>—</div>
            {/* Space: Off [nth=2] */}
            <div style={cell}><button onClick={() => tool('U9 Mark space: turned on.')} style={offStyle}>Off</button></div>
          </div>

          {/* U11 Luke row */}
          <div style={{ ...grid, background: '#fff' }}>
            <div style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, color: INK, display: 'flex', alignItems: 'center' }}>U11 Luke</div>
            {/* Record: On [nth=2] */}
            <div style={cell}><button onClick={() => tool('U11 Luke record: turned off.')} style={onStyle}>On</button></div>
            {/* Live: Off [nth=3] */}
            <div style={cell}><button onClick={() => tool('U11 Luke live game help: turned on.')} style={offStyle}>Off</button></div>
            {/* Vests: n/a */}
            <div style={{ ...cell, fontSize: 12, color: MUT }}>—</div>
            {/* Space: Off [nth=4] */}
            <div style={cell}><button onClick={() => tool('U11 Luke space: turned on.')} style={offStyle}>Off</button></div>
          </div>

          {/* Juniors group header */}
          <div style={{ ...grid, background: '#f8faf9', borderTop: `1px solid ${LN}` }}>
            <div style={{ padding: '12px 0' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Juniors</div>
              <div style={{ fontSize: 11, color: MUT }}>Under 12 and 13 · 4 teams</div>
            </div>
            {/* Record: All on [nth=2] */}
            <div style={cell}><button onClick={() => tool('Juniors: record turned off for every team in this group.')} style={onStyle}>All on</button></div>
            {/* Live: empty */}
            <div style={{ ...cell, fontSize: 12, color: MUT }}>Per team</div>
            {/* Vests: All on [nth=3] */}
            <div style={cell}><button onClick={() => tool('Juniors: vests turned off for every team in this group.')} style={onStyle}>All on</button></div>
            {/* Space: All off [nth=3] */}
            <div style={cell}><button onClick={() => tool('Juniors: space turned on for every team in this group.')} style={offStyle}>All off</button></div>
          </div>

          {/* U12 Sam row */}
          <div style={{ ...grid, background: '#fff' }}>
            <div style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, color: INK, display: 'flex', alignItems: 'center', gap: 8 }}>
              U12 Sam
              <span style={{ fontSize: 10, fontWeight: 700, background: '#fef9c3', color: '#854d0e', borderRadius: 4, padding: '2px 6px' }}>Asked</span>
            </div>
            {/* Record: On [nth=3] */}
            <div style={cell}><button onClick={() => tool('U12 Sam record: turned off.')} style={onStyle}>On</button></div>
            {/* Live: Off [nth=5] */}
            <div style={cell}><button onClick={() => tool('U12 Sam live game help: turned on.')} style={offStyle}>Off</button></div>
            {/* Vests: On [nth=4] */}
            <div style={cell}><button onClick={() => tool('U12 Sam vests and load: turned off.')} style={onStyle}>On</button></div>
            {/* Space: Off [nth=6] */}
            <div style={cell}><button onClick={() => tool('U12 Sam space: turned on.')} style={offStyle}>Off</button></div>
          </div>

          {/* U13 Chris row */}
          <div style={{ ...grid, background: '#fff' }}>
            <div style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, color: INK, display: 'flex', alignItems: 'center' }}>U13 Chris</div>
            {/* Record: On [nth=5] */}
            <div style={cell}><button onClick={() => tool('U13 Chris record: turned off.')} style={onStyle}>On</button></div>
            {/* Live: On [nth=6] */}
            <div style={cell}><button onClick={() => tool('U13 Chris live game help: turned off.')} style={onStyle}>On</button></div>
            {/* Vests: On [nth=7] */}
            <div style={cell}><button onClick={() => tool('U13 Chris vests and load: turned off.')} style={onStyle}>On</button></div>
            {/* Space: Off [nth=7] */}
            <div style={cell}><button onClick={() => tool('U13 Chris space: turned on.')} style={offStyle}>Off</button></div>
          </div>

          {/* Youth group header */}
          <div style={{ ...grid, background: '#f8faf9', borderTop: `1px solid ${LN}` }}>
            <div style={{ padding: '12px 0' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Youth</div>
              <div style={{ fontSize: 11, color: MUT }}>Under 14 to 18 · 4 teams</div>
            </div>
            {/* Record: All on [nth=4] */}
            <div style={cell}><button onClick={() => tool('Youth: record turned off for every team in this group.')} style={onStyle}>All on</button></div>
            {/* Live: All on [nth=5] */}
            <div style={cell}><button onClick={() => tool('Youth: live help turned off for every team in this group.')} style={onStyle}>All on</button></div>
            {/* Vests: All on [nth=6] */}
            <div style={cell}><button onClick={() => tool('Youth: vests turned off for every team in this group.')} style={onStyle}>All on</button></div>
            {/* Space: empty */}
            <div style={{ ...cell, fontSize: 12, color: MUT }}>Per team</div>
          </div>

          {/* U15 Girls Bec row */}
          <div style={{ ...grid, background: '#fff' }}>
            <div style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, color: INK, display: 'flex', alignItems: 'center' }}>U15 Girls Bec</div>
            {/* Record: On [nth=8] */}
            <div style={cell}><button onClick={() => tool('U15 Girls Bec record: turned off.')} style={onStyle}>On</button></div>
            {/* Live: On [nth=9] */}
            <div style={cell}><button onClick={() => tool('U15 Girls Bec live game help: turned off.')} style={onStyle}>On</button></div>
            {/* Vests: On [nth=10] */}
            <div style={cell}><button onClick={() => tool('U15 Girls Bec vests and load: turned off.')} style={onStyle}>On</button></div>
            {/* Space: Off [nth=8] */}
            <div style={cell}><button onClick={() => tool('U15 Girls Bec space: turned on.')} style={offStyle}>Off</button></div>
          </div>

          {/* U16 Ollie row */}
          <div style={{ ...grid, background: '#fff' }}>
            <div style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, color: INK, display: 'flex', alignItems: 'center' }}>U16 Ollie</div>
            {/* Record: On [nth=11] */}
            <div style={cell}><button onClick={() => tool('U16 Ollie record: turned off.')} style={onStyle}>On</button></div>
            {/* Live: On [nth=12] */}
            <div style={cell}><button onClick={() => tool('U16 Ollie live game help: turned off.')} style={onStyle}>On</button></div>
            {/* Vests: On [nth=13] */}
            <div style={cell}><button onClick={() => tool('U16 Ollie vests and load: turned off.')} style={onStyle}>On</button></div>
            {/* Space: On [nth=14] */}
            <div style={cell}><button onClick={() => tool('U16 Ollie space: turned off.')} style={onStyle}>On</button></div>
          </div>

          {/* Seniors group header */}
          <div style={{ ...grid, background: '#f8faf9', borderTop: `1px solid ${LN}` }}>
            <div style={{ padding: '12px 0' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Seniors</div>
              <div style={{ fontSize: 11, color: MUT }}>1 team</div>
            </div>
            {/* Record: All on [nth=7] */}
            <div style={cell}><button onClick={() => tool('Seniors: record turned off for every team in this group.')} style={onStyle}>All on</button></div>
            {/* Live: All on [nth=8] */}
            <div style={cell}><button onClick={() => tool('Seniors: live help turned off for every team in this group.')} style={onStyle}>All on</button></div>
            {/* Vests: All off [nth=4] */}
            <div style={cell}><button onClick={() => tool('Seniors: vests turned on for every team in this group.')} style={offStyle}>All off</button></div>
            {/* Space: All off [nth=5] */}
            <div style={cell}><button onClick={() => tool('Seniors: space turned on for every team in this group.')} style={offStyle}>All off</button></div>
          </div>

          {/* Men's 1sts row */}
          <div style={{ ...grid, background: '#fff' }}>
            <div style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, color: INK, display: 'flex', alignItems: 'center' }}>Men's 1sts</div>
            {/* Record: On [nth=15] */}
            <div style={cell}><button onClick={() => tool("Men's 1sts record: turned off.")} style={onStyle}>On</button></div>
            {/* Live: On [nth=16] */}
            <div style={cell}><button onClick={() => tool("Men's 1sts live game help: turned off.")} style={onStyle}>On</button></div>
            {/* Vests: Off [nth=9] */}
            <div style={cell}><button onClick={() => tool("Men's 1sts vests and load: turned on.")} style={offStyle}>Off</button></div>
            {/* Space: Off [nth=10] */}
            <div style={cell}><button onClick={() => tool("Men's 1sts space: turned on.")} style={offStyle}>Off</button></div>
          </div>

          <div style={{ marginTop: 16, fontSize: 12, color: MUT }}>Showing 7 of 14 teams. Ask Clean Sheet, Files and Messages are in the plan for every team. Prices are placeholders.</div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, padding: '24px 20px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Add-ons this month</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: INK }}>$104</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 14 }}>On top of your club plan. Next month at today's settings: $104.</div>
            {/* Bill [nth=1] */}
            <button onClick={() => onNav?.('PRM3-Bill')} style={{ width: '100%', height: 44, background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Bill</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Your rules</div>
              {/* Change [nth=1] */}
              <button onClick={() => tool('Change a rule or the reason coaches see.')} style={{ height: 44, padding: '0 12px', background: 'none', color: G, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Change</button>
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flexShrink: 0 }}>1</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Live game help from under 13</div>
                <div style={{ fontSize: 11, color: MUT }}>"New coaches learn to read the game first."</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flexShrink: 0 }}>2</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Vests from under 12</div>
                <div style={{ fontSize: 11, color: MUT }}>Clean Sheet's rule, not yours</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>1 coach has asked</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>SK</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Sam: Live game help</div>
                <div style={{ fontSize: 11, color: MUT }}>U12 Sam · "A tight run of games."</div>
              </div>
              {/* Open [nth=1] */}
              <button onClick={() => onNav?.('PRM2-TurnOn')} style={{ height: 44, padding: '0 12px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Open</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
