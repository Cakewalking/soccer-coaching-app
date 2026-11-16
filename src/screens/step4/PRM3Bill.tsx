import { useState } from 'react'
import { OpeningPanel } from './directorParts'
import { getGroups, setGroups as persist, cloneGroups, billLines, grandTotal, addOnsTotal, PLAN_TEAMS, type Group } from './featuresData'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM3Bill({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [groups, setGroupsLocal] = useState<Group[]>(() => cloneGroups(getGroups()))
  const [people, setPeople] = useState<string[]>([])
  const [samOn, setSamOn] = useState(false)
  function tool(name: string) { setLastTool(name) }
  function update(next: Group[]) { setGroupsLocal(next); persist(next) }

  const lines = billLines(groups)
  const total = grandTotal(groups)
  const addOns = addOnsTotal(groups)
  const samAsked = groups.flatMap(g => g.teams).find(t => t.id === 'U12 Sam')?.live !== true && !samOn

  function turnSamOn() {
    update(groups.map(g => ({ ...g, teams: g.teams.map(t => t.id === 'U12 Sam' ? { ...t, live: true } : t) })))
    setSamOn(true)
    tool('Live game help turned on for U12 Sam · $15 a month, charged by the day.')
  }
  function addSomeone() {
    const names = ['Ben Ryan, secretary', 'Priya Shah, assistant', 'Marko Vale, manager']
    const next = names[people.length % names.length]
    setPeople(p => [...p, next])
    tool(`${next} can now turn features on and off.`)
  }

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

      <OpeningPanel
        heading="THIS MONTH’S BILL · JUNE 2026"
        sentence={`$${total} for June: $280 for the club plan and $${addOns} in add-ons across ${PLAN_TEAMS} teams.`}
        support="Next payment 1 July, card ending 4821. A change during the month is charged by the day."
        figures={[{ num: `$${total}`, label: 'total for June', proof: true }, { num: `${PLAN_TEAMS}`, label: 'teams' }]}
        buttons={[{ label: 'See what is used', main: true, onClick: () => onNav?.('PRM6-Usage') }, { label: 'By team', onClick: () => onNav?.('PRM1-FeaturesByTeam') }, { label: 'Download', onClick: () => tool('Invoice downloads as a PDF.') }]}
      />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', paddingTop: 12 }}>
        {/* Main */}
        <div style={{ flex: 1, padding: '0 20px 24px 24px', overflowY: 'auto' }}>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px', padding: '10px 20px', background: PALE, borderBottom: `1px solid ${LN}` }}>
              {['Item', 'Teams', 'Each', 'Total'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>
              ))}
            </div>
            {lines.map(l => (
              <div key={l.item} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px', padding: '14px 20px', borderBottom: `1px solid ${LN}` }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{l.item}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{l.desc}</div>
                </div>
                <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>{l.teams} team{l.teams === 1 ? '' : 's'}</div>
                <div style={{ fontSize: 13, color: INK, alignSelf: 'center' }}>${l.each}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: l.total === 0 ? MUT : INK, alignSelf: 'center' }}>${l.total}</div>
              </div>
            ))}
            {/* Total row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 80px 80px', padding: '14px 20px', background: PALE, borderTop: `2px solid ${LN}` }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Total for June</div>
              <div /><div />
              <div style={{ fontSize: 18, fontWeight: 800, color: INK }}>${total}</div>
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
            {people.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#9a8fb0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
                <div><div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{p.split(',')[0]}</div><div style={{ fontSize: 11, color: MUT }}>Can turn features on and off</div></div>
              </div>
            ))}
            {/* + Add someone */}
            <button onClick={addSomeone} style={{ marginTop: 10, width: '100%', height: 44, background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add someone</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>{samAsked ? '1 coach has asked' : 'Asks resolved'}</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>SK</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>Sam: Live game help</div>
                <div style={{ fontSize: 11, color: MUT }}>{samAsked ? 'U12 Sam · "A tight run of games."' : 'U12 Sam · turned on · +$15 this month'}</div>
              </div>
              {samAsked
                ? <button onClick={turnSamOn} style={{ height: 44, padding: '0 12px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Turn it on</button>
                : <span style={{ height: 44, padding: '0 12px', display: 'flex', alignItems: 'center', color: G, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>✓ On</span>}
            </div>
            <button onClick={() => onNav?.('PRM2-TurnOn')} style={{ marginTop: 8, width: '100%', height: 40, background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Open the full turn-on screen</button>
          </div>
        </div>
      </div>
    </div>
  )
}
