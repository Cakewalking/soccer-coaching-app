import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM3Bill({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb: React.CSSProperties = { height: 56, padding: '0 10px', background: 'none', color: 'rgba(255,255,255,0.75)', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const snb: React.CSSProperties = { height: 44, padding: '0 14px', background: 'none', color: MUT, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }

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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>This month's bill</div>
              <div style={{ fontSize: 13, color: MUT }}>June 2026 · next payment 1 July · card ending 4821</div>
            </div>
            {/* Controls 16-18 in DOM order */}
            <button onClick={() => tool('Invoice downloads as a PDF.')} style={{ height: 44, padding: '0 16px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Download</button>
            <button onClick={() => onNav?.('PRM6-Usage')} style={{ height: 44, padding: '0 16px', background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Is it being used?</button>
            <button onClick={() => onNav?.('PRM1-FeaturesByTeam')} style={{ height: 44, padding: '0 16px', background: '#fff', color: G, border: `1px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Features by team</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px', padding: '10px 20px', background: PALE, borderBottom: `1px solid ${LN}` }}>
              {['Item', 'Teams', 'Each', 'Total'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>
              ))}
            </div>
            {/* Club plan row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px', padding: '14px 20px', borderBottom: `1px solid ${LN}` }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Club plan</div>
                <div style={{ fontSize: 12, color: MUT }}>Record and review, Ask Clean Sheet, Files, Messages</div>
              </div>
              <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>14 teams</div>
              <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>$20</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, alignSelf: 'center' }}>$280</div>
            </div>
            {/* Live game help row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px', padding: '14px 20px', borderBottom: `1px solid ${LN}` }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Live game help</div>
                <div style={{ fontSize: 12, color: MUT }}>U13 Chris, U15 Girls Bec, U16 Ollie, Men's 1sts</div>
              </div>
              <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>4 teams</div>
              <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>$15</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, alignSelf: 'center' }}>$60</div>
            </div>
            {/* Vests and load row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px', padding: '14px 20px', borderBottom: `1px solid ${LN}` }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Vests and load</div>
                <div style={{ fontSize: 12, color: MUT }}>U12 Sam, U13 Chris, U15 Girls Bec, U16 Ollie</div>
              </div>
              <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>4 teams</div>
              <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>$10</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, alignSelf: 'center' }}>$40</div>
            </div>
            {/* Extra space row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px', padding: '14px 20px', borderBottom: `1px solid ${LN}` }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Extra space</div>
                <div style={{ fontSize: 12, color: MUT }}>U16 Ollie</div>
              </div>
              <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>1 team</div>
              <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>$4</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, alignSelf: 'center' }}>$4</div>
            </div>
            {/* Total row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px', padding: '14px 20px', background: PALE, borderTop: `2px solid ${LN}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Total for June</div>
              <div /><div />
              <div style={{ fontSize: 18, fontWeight: 800, color: INK }}>$384</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: MUT }}>All prices are placeholders, before GST. Changes during a month are charged by the day.</div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, padding: '24px 20px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Who can change the bill</div>
            <div style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>RM</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Rachel Moore</div>
                <div style={{ fontSize: 11, color: MUT }}>Billing owner</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#8fa09b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>DF</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Dana Fox, treasurer</div>
                <div style={{ fontSize: 11, color: MUT }}>Can turn features on and off</div>
              </div>
            </div>
            {/* + Add someone [nth=1] */}
            <button onClick={() => tool('Pick a person at the club. They must be 18 or over.')} style={{ marginTop: 10, width: '100%', height: 44, background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add someone</button>
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
