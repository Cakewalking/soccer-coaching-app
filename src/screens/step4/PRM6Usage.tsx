import { useState } from 'react'
import { toolTarget } from '../toolTargets'
import { OpeningPanel } from './directorParts'
import { getGroups, setGroups as persist, cloneGroups, type FKey, type Group } from './featuresData'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Usage = { team: string; fk: FKey; label: string; pct: number; text: string; last: string; price: number; low?: boolean; turnOff?: boolean; ask?: string }
const USAGE: Usage[] = [
  { team: 'U13 Chris', fk: 'live', label: 'Live game help', pct: 87, text: '7 of 8 games', last: 'Sat 30 May', price: 15 },
  { team: 'U15 Girls Bec', fk: 'live', label: 'Live game help', pct: 100, text: '8 of 8 games', last: 'Sat 30 May', price: 15 },
  { team: 'U16 Ollie', fk: 'live', label: 'Live game help', pct: 75, text: '6 of 8 games', last: 'Sat 30 May', price: 15 },
  { team: "Men's 1sts", fk: 'live', label: 'Live game help', pct: 25, text: '2 of 8 games', last: 'Sat 2 May', price: 15, low: true, ask: 'Marko' },
  { team: 'U12 Sam', fk: 'vests', label: 'Vests and load', pct: 94, text: '15 of 16 sessions', last: 'Tue 2 June', price: 10 },
  { team: 'U13 Chris', fk: 'vests', label: 'Vests and load', pct: 81, text: '13 of 16 sessions', last: 'Tue 2 June', price: 10 },
  { team: 'U15 Girls Bec', fk: 'vests', label: 'Vests and load', pct: 0, text: 'Not used for 5 weeks', last: 'Thu 30 April', price: 10, low: true, turnOff: true },
  { team: 'U16 Ollie', fk: 'vests', label: 'Vests and load', pct: 69, text: '11 of 16 sessions', last: 'Tue 2 June', price: 10 },
  { team: 'U16 Ollie', fk: 'space', label: 'Extra space', pct: 23, text: '4.6 of 20 GB extra used', last: 'Today', price: 4 },
]

export default function PRM6Usage({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [groups, setGroupsLocal] = useState<Group[]>(() => cloneGroups(getGroups()))
  function tool(name: string) { const to = toolTarget(name); if (to && onNav) { onNav(to); return } setLastTool(name) }
  function update(next: Group[]) { setGroupsLocal(next); persist(next) }

  const isOn = (team: string, fk: FKey) => groups.flatMap(g => g.teams).find(t => t.id === team)?.[fk] === true
  function turnOff(team: string, fk: FKey, label: string) {
    update(groups.map(g => ({ ...g, teams: g.teams.map(t => t.id === team ? { ...t, [fk]: false } : t) })))
    tool(`${label} turned off for ${team} from tomorrow. ${team === "Men's 1sts" ? 'Marko' : 'The coach'} has been told. Nothing recorded is lost.`)
  }

  const live = USAGE.filter(u => isOn(u.team, u.fk))
  const inUse = live.filter(u => !u.low).length          // "in use most weeks" = everything not flagged low
  const canSave = live.filter(u => u.turnOff).reduce((s, u) => s + u.price, 0)

  const tnb: React.CSSProperties = { height: 56, padding: '0 10px', background: 'none', color: 'rgba(255,255,255,0.75)', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const snb: React.CSSProperties = { height: 44, padding: '0 14px', background: 'none', color: MUT, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const cols = '150px 150px 1fr 120px 60px 100px'

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
        heading="IS IT BEING USED? · THE LAST 8 WEEKS"
        sentence={`${inUse} of ${live.length} add-ons are in use most weeks.${canSave > 0 ? ' Two are worth a conversation.' : ' Nothing is sitting unused.'}`}
        support="U15 Girls Bec have not worn a vest for 5 weeks. Men’s 1sts used live help in 2 of 8 games."
        figures={[{ num: `${inUse} of ${live.length}`, label: 'in use most weeks', proof: true }, { num: `$${canSave}`, label: 'a month you could save' }]}
        buttons={[{ label: 'Ask Bec', main: true, onClick: () => tool('Bec is asked whether to keep vests on for U15 Girls.') }, { label: 'By team', onClick: () => onNav?.('PRM1-FeaturesByTeam') }, { label: 'The bill', onClick: () => onNav?.('PRM3-Bill') }]}
      />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', paddingTop: 12 }}>
        <div style={{ flex: 1, padding: '0 20px 24px 24px', overflowY: 'auto' }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: cols, padding: '10px 20px', background: PALE, borderBottom: `1px solid ${LN}` }}>
              {['Team', 'Add-on', 'Used', 'Last used', '', ''].map((h, i) => <div key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>)}
            </div>
            {USAGE.map((u, i) => {
              const on = isOn(u.team, u.fk)
              const warn = u.pct < 50 && u.pct > 0
              const bg = !on ? '#f7f8f7' : u.turnOff ? '#fff5f5' : u.ask ? '#fffbf0' : '#fff'
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: cols, padding: '12px 20px', borderBottom: i < USAGE.length - 1 ? `1px solid ${LN}` : 'none', alignItems: 'center', background: bg }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: on ? INK : MUT }}>{u.team}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{u.label}</div>
                  <div>
                    {!on ? <div style={{ fontSize: 12, color: MUT }}>Turned off · nothing lost</div>
                      : u.pct === 0 ? <div style={{ fontSize: 12, color: '#dc2626' }}>{u.text}</div>
                      : <>
                          <div style={{ height: 6, background: LN, borderRadius: 3, overflow: 'hidden', marginBottom: 4 }}><div style={{ height: '100%', width: `${u.pct}%`, background: warn ? '#f59e0b' : G, borderRadius: 3 }} /></div>
                          <div style={{ fontSize: 11, color: warn ? '#d97706' : MUT }}>{u.text}</div>
                        </>}
                  </div>
                  <div style={{ fontSize: 12, color: MUT }}>{on ? u.last : '—'}</div>
                  <div style={{ fontSize: 12, color: MUT }}>${u.price}</div>
                  <div>
                    {on && u.turnOff && <button onClick={() => turnOff(u.team, u.fk, u.label)} style={{ height: 44, padding: '0 12px', background: '#fff', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Turn off</button>}
                    {on && u.ask && <button onClick={() => tool(`A note goes to ${u.ask}: "Is ${u.label} still useful?"`)} style={{ height: 44, padding: '0 12px', background: '#fff', color: G, border: `1px solid ${G}`, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask {u.ask}</button>}
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ fontSize: 12, color: MUT }}>“Used” means a coach opened it during a game or session. Prices are placeholders.</div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 260, padding: '24px 20px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `2px solid ${canSave > 0 ? '#f59e0b' : LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>You could save</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: INK }}>${canSave} a month</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 6 }}>{canSave > 0 ? 'One add-on has not been used for 5 weeks. One more is used in a quarter of games.' : 'Nothing is sitting unused right now.'}</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 14 }}>Tell me when</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: INK, marginBottom: 6 }}>An add-on is unused for</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>A note in your Needs you</div>
              <button onClick={() => tool('Alert when an add-on is unused for 4 weeks: on.')} style={{ height: 44, padding: '0 16px', background: PALE, color: G, border: `1px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>4 weeks</button>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: INK, marginBottom: 4 }}>A coach stops using one</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>So you can ask why</div>
              <button onClick={() => tool('Tell me when a coach stops: turned on.')} style={{ height: 44, padding: '0 16px', background: PALE, color: G, border: `1px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>On</button>
            </div>
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>What coaches see</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6 }}>Nothing here. A coach is never shown as “not using” something to anyone but you.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
