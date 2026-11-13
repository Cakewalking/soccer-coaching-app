import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM6Usage({ onNav }: { onNav?: (s: string) => void }) {
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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Is it being used?</div>
              <div style={{ fontSize: 13, color: MUT }}>June 2026 · every add-on, team by team, over the last 8 weeks</div>
            </div>
            {/* Controls 16-17 in DOM order */}
            <button onClick={() => onNav?.('PRM3-Bill')} style={{ height: 44, padding: '0 16px', background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>This month's bill</button>
            <button onClick={() => onNav?.('PRM1-FeaturesByTeam')} style={{ height: 44, padding: '0 16px', background: '#fff', color: G, border: `1px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Features by team</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 1fr 120px 60px 100px', padding: '10px 20px', background: PALE, borderBottom: `1px solid ${LN}` }}>
              {['Team', 'Add-on', 'Used', 'Last used', '', ''].map((h, i) => (
                <div key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>
              ))}
            </div>

            {/* U13 Chris — Live game help */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 1fr 120px 60px 100px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>U13 Chris</div>
              <div style={{ fontSize: 12, color: MUT }}>Live game help</div>
              <div>
                <div style={{ height: 6, background: LN, borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}><div style={{ height: '100%', width: '87%', background: G, borderRadius: 3 }} /></div>
                <div style={{ fontSize: 11, color: MUT }}>7 of 8 games</div>
              </div>
              <div style={{ fontSize: 12, color: MUT }}>Sat 30 May</div>
              <div style={{ fontSize: 12, color: MUT }}>$15</div>
              <div />
            </div>

            {/* U15 Girls Bec — Live game help */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 1fr 120px 60px 100px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>U15 Girls Bec</div>
              <div style={{ fontSize: 12, color: MUT }}>Live game help</div>
              <div>
                <div style={{ height: 6, background: LN, borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}><div style={{ height: '100%', width: '100%', background: G, borderRadius: 3 }} /></div>
                <div style={{ fontSize: 11, color: MUT }}>8 of 8 games</div>
              </div>
              <div style={{ fontSize: 12, color: MUT }}>Sat 30 May</div>
              <div style={{ fontSize: 12, color: MUT }}>$15</div>
              <div />
            </div>

            {/* U16 Ollie — Live game help */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 1fr 120px 60px 100px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>U16 Ollie</div>
              <div style={{ fontSize: 12, color: MUT }}>Live game help</div>
              <div>
                <div style={{ height: 6, background: LN, borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}><div style={{ height: '100%', width: '75%', background: '#f59e0b', borderRadius: 3 }} /></div>
                <div style={{ fontSize: 11, color: MUT }}>6 of 8 games</div>
              </div>
              <div style={{ fontSize: 12, color: MUT }}>Sat 30 May</div>
              <div style={{ fontSize: 12, color: MUT }}>$15</div>
              <div />
            </div>

            {/* Men's 1sts — Live game help (Ask Marko = control 18) */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 1fr 120px 60px 100px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center', background: '#fffbf0' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>Men's 1sts</div>
              <div style={{ fontSize: 12, color: MUT }}>Live game help</div>
              <div>
                <div style={{ height: 6, background: LN, borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}><div style={{ height: '100%', width: '25%', background: '#f59e0b', borderRadius: 3 }} /></div>
                <div style={{ fontSize: 11, color: '#d97706' }}>2 of 8 games</div>
              </div>
              <div style={{ fontSize: 12, color: MUT }}>Sat 2 May</div>
              <div style={{ fontSize: 12, color: MUT }}>$15</div>
              <div>
                <button onClick={() => tool('A note goes to Marko: "Is Live game help still useful?"')} style={{ height: 44, padding: '0 12px', background: '#fff', color: G, border: `1px solid ${G}`, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Marko</button>
              </div>
            </div>

            {/* U12 Sam — Vests and load */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 1fr 120px 60px 100px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>U12 Sam</div>
              <div style={{ fontSize: 12, color: MUT }}>Vests and load</div>
              <div>
                <div style={{ height: 6, background: LN, borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}><div style={{ height: '100%', width: '94%', background: G, borderRadius: 3 }} /></div>
                <div style={{ fontSize: 11, color: MUT }}>15 of 16 sessions</div>
              </div>
              <div style={{ fontSize: 12, color: MUT }}>Tue 2 June</div>
              <div style={{ fontSize: 12, color: MUT }}>$10</div>
              <div />
            </div>

            {/* U13 Chris — Vests and load */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 1fr 120px 60px 100px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>U13 Chris</div>
              <div style={{ fontSize: 12, color: MUT }}>Vests and load</div>
              <div>
                <div style={{ height: 6, background: LN, borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}><div style={{ height: '100%', width: '81%', background: G, borderRadius: 3 }} /></div>
                <div style={{ fontSize: 11, color: MUT }}>13 of 16 sessions</div>
              </div>
              <div style={{ fontSize: 12, color: MUT }}>Tue 2 June</div>
              <div style={{ fontSize: 12, color: MUT }}>$10</div>
              <div />
            </div>

            {/* U15 Girls Bec — Vests and load (Turn off = control 19) */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 1fr 120px 60px 100px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center', background: '#fff5f5' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>U15 Girls Bec</div>
              <div style={{ fontSize: 12, color: MUT }}>Vests and load</div>
              <div>
                <div style={{ fontSize: 12, color: '#dc2626' }}>Not used for 5 weeks</div>
              </div>
              <div style={{ fontSize: 12, color: MUT }}>Thu 30 April</div>
              <div style={{ fontSize: 12, color: MUT }}>$10</div>
              <div>
                <button onClick={() => tool('Vests and load turned off for U15 Girls Bec from tomorrow. Bec has been told. Nothing recorded is lost.')} style={{ height: 44, padding: '0 12px', background: '#fff', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Turn off</button>
              </div>
            </div>

            {/* U16 Ollie — Vests and load */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 1fr 120px 60px 100px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>U16 Ollie</div>
              <div style={{ fontSize: 12, color: MUT }}>Vests and load</div>
              <div>
                <div style={{ height: 6, background: LN, borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}><div style={{ height: '100%', width: '69%', background: G, borderRadius: 3 }} /></div>
                <div style={{ fontSize: 11, color: MUT }}>11 of 16 sessions</div>
              </div>
              <div style={{ fontSize: 12, color: MUT }}>Tue 2 June</div>
              <div style={{ fontSize: 12, color: MUT }}>$10</div>
              <div />
            </div>

            {/* U16 Ollie — Extra space */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 150px 1fr 120px 60px 100px', padding: '12px 20px', alignItems: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>U16 Ollie</div>
              <div style={{ fontSize: 12, color: MUT }}>Extra space</div>
              <div>
                <div style={{ height: 6, background: LN, borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}><div style={{ height: '100%', width: '23%', background: G, borderRadius: 3 }} /></div>
                <div style={{ fontSize: 11, color: MUT }}>4.6 of 20 GB extra used</div>
              </div>
              <div style={{ fontSize: 12, color: MUT }}>Today</div>
              <div style={{ fontSize: 12, color: MUT }}>$4</div>
              <div />
            </div>
          </div>

          <div style={{ fontSize: 12, color: MUT }}>"Used" means a coach opened it during a game or session. Prices are placeholders.</div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, padding: '24px 20px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `2px solid #f59e0b`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>You could save</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: INK }}>$10 a month</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 6 }}>One add-on has not been used for 5 weeks. One more is used in a quarter of games.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 14 }}>Tell me when</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: INK, marginBottom: 6 }}>An add-on is unused for</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>A note in your Needs you</div>
              {/* 4 weeks button [nth=1, control 20] */}
              <button onClick={() => tool('Choose: can edit, can see, or no access.')} style={{ height: 44, padding: '0 16px', background: PALE, color: G, border: `1px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>4 weeks</button>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: INK, marginBottom: 4 }}>A coach stops using one</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>So you can ask why</div>
              {/* On button [nth=1, control 21] */}
              <button onClick={() => tool('Tell me when a coach stops: turned off.')} style={{ height: 44, padding: '0 16px', background: PALE, color: G, border: `1px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>On</button>
            </div>
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>What coaches see</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6 }}>Nothing here. A coach is never shown as "not using" something to anyone but you.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
