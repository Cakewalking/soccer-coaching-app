import { useState } from 'react'
import { OpeningPanel, CTL } from './directorParts'
import { COLS, FEATURE_LABEL, getGroups, setGroups as persist, cloneGroups, addOnsTotal, type FKey, type Group, type Team } from './featuresData'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM1FeaturesByTeam({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [bec, setBec] = useState(false)
  const [groups, setGroupsLocal] = useState<Group[]>(() => cloneGroups(getGroups()))
  function tool(name: string) { setLastTool(name) }
  function update(next: Group[]) { setGroupsLocal(next); persist(next) }   // write through to the shared store

  function setTeam(tid: string, key: FKey, on: boolean) {
    update(groups.map(g => ({ ...g, teams: g.teams.map(t => t.id === tid && t[key] !== null ? { ...t, [key]: on } : t) })))
  }
  function toggleTeam(tid: string, key: FKey, cur: boolean) {
    setTeam(tid, key, !cur)
    tool(`${tid} ${FEATURE_LABEL[key]}: turned ${cur ? 'off' : 'on'}.`)
  }
  // Live add-ons total across the shown teams.
  const addOns = addOnsTotal(groups)

  const tnb: React.CSSProperties = { height: 56, padding: '0 10px', background: 'none', color: 'rgba(255,255,255,0.75)', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const snb: React.CSSProperties = { height: 44, padding: '0 14px', background: 'none', color: MUT, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const onStyle: React.CSSProperties = { height: 44, minWidth: 60, padding: '0 14px', background: PALE, color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }
  const offStyle: React.CSSProperties = { height: 44, minWidth: 60, padding: '0 14px', background: '#fff', color: MUT, border: `1.5px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }
  const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: '200px 1fr 1fr 1fr 1fr', borderBottom: `1px solid ${LN}` }
  const cell: React.CSSProperties = { padding: '12px 10px', display: 'flex', alignItems: 'center', borderLeft: `1px solid ${LN}` }

  const teamCell = (t: Team, fk: FKey) => {
    if (t[fk] === null) return <div key={fk} style={{ ...cell, fontSize: 12, color: MUT }}>—</div>
    const on = t[fk] === true
    return <div key={fk} style={cell}><button onClick={() => toggleTeam(t.id, fk, on)} style={on ? onStyle : offStyle}>{on ? 'On' : 'Off'}</button></div>
  }

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

      <OpeningPanel
        landing
        heading="FEATURES AND BILLING · JUNE"
        sentence="Three teams used Live game help in 21 of their last 24 games. Sam wants it for U12 Sam."
        support="“We have a tight run of games.” It is $15 a month for his team, charged by the day, and off again whenever you say."
        figures={[{ num: '21 of 24', label: 'games with live help in use', proof: true }, { num: `$${addOns}`, label: 'add-ons this month' }]}
        buttons={[{ label: 'Turn it on for Sam · $15', main: true, onClick: () => onNav?.('PRM2-TurnOn') }, { label: 'The bill', onClick: () => onNav?.('PRM3-Bill') }]}
      />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', paddingTop: 12 }}>
        {/* Main */}
        <div style={{ flex: 1, padding: '0 20px 24px 24px', overflowY: 'auto' }}>
          {/* Table header */}
          <div style={{ ...grid, background: PALE, borderTop: `1px solid ${LN}` }}>
            <div style={{ padding: '10px 0', fontSize: 11, color: MUT, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.07em' }}>Team</div>
            {COLS.map(c => (
              <div key={c.key} style={{ ...cell, flexDirection: 'column' as const, alignItems: 'flex-start', gap: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: INK }}>{c.label}</span>
                <span style={{ fontSize: 11, color: MUT }}>{c.sub}</span>
              </div>
            ))}
          </div>

          {groups.map(g => (
            <div key={g.name}>
              {/* Group header — a section label only. Each team is toggled on its own row. */}
              <div style={{ background: '#f8faf9', borderTop: `1px solid ${LN}`, borderBottom: `1px solid ${LN}`, padding: '10px 20px' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>{g.name}</span>
                <span style={{ fontSize: 11, color: MUT, marginLeft: 8 }}>{g.sub}</span>
              </div>
              {/* Team rows */}
              {g.teams.map(t => (
                <div key={t.id} style={{ ...grid, background: '#fff' }}>
                  <div style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, color: INK, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {t.id}
                    {t.asked && <span style={{ fontSize: 10, fontWeight: 700, background: '#fef9c3', color: '#854d0e', borderRadius: 4, padding: '2px 6px' }}>Asked</span>}
                  </div>
                  {COLS.map(c => teamCell(t, c.key))}
                </div>
              ))}
            </div>
          ))}

          <div style={{ marginTop: 16, fontSize: 12, color: MUT }}>Showing 7 of 14 teams. Ask Clean Sheet, Files and Messages are in the plan for every team. Prices are placeholders.</div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, padding: '24px 20px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* One is not being used */}
          <div style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 32, height: 32, borderRadius: 999, background: '#f4c95d', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700 }}>1</span><div style={{ fontSize: 16, fontWeight: 700 }}>One is not being used</div></div>
            <div style={{ borderTop: `1px solid ${LN}`, paddingTop: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Vests and load · U15 Girls Bec</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>No vest worn for 5 weeks · $10 a month</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setBec(true)} style={{ height: 44, padding: '0 14px', background: bec ? PALE : '#fff', color: G, border: `1px solid ${bec ? G : CTL}`, borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{bec ? '✓ Asked Bec' : 'Ask Bec'}</button>
                <button onClick={() => { setTeam('U15 Girls Bec', 'vests', false); tool('Vests and load turned off for U15 Girls Bec. $10 a month saved.') }} style={{ height: 44, padding: '0 14px', background: '#fff', color: INK, border: `1px solid ${CTL}`, borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Turn it off</button>
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Your rules</div>
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

          <button onClick={() => onNav?.('PRM6-Usage')} style={{ background: '#fff', border: `1px solid ${CTL}`, borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', color: INK, textAlign: 'left' }}>
            <span style={{ flex: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>What each add-on does</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>What a coach sees with it on, and without</span></span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
