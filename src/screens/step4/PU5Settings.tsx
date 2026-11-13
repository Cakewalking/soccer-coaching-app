import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function DropRow({ label, sub, value, onChange }: { label: string; sub?: string; value: string; onChange: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}`, gap: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: INK }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: MUT }}>{sub}</div>}
      </div>
      <button onClick={onChange} style={{ height: 44, padding: '0 16px', background: PALE, color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', minWidth: 120, flexShrink: 0 }}>{value}</button>
    </div>
  )
}

function ToggleRow({ label, sub, onToggle }: { label: string; sub: string; onToggle: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}`, gap: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: INK }}>{label}</div>
        <div style={{ fontSize: 11, color: MUT }}>{sub}</div>
      </div>
      <button aria-label="On" onClick={onToggle} style={{ height: 44, padding: '0 20px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>On</button>
    </div>
  )
}

export default function PU5Settings({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb: React.CSSProperties = { height: 56, padding: '0 10px', background: 'none', color: 'rgba(255,255,255,0.75)', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const snb: React.CSSProperties = { height: 44, padding: '0 14px', background: 'none', color: MUT, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Club" onClick={() => tool('Club › Overview')} style={tnb}>Club</button>
        <button aria-label="Teams" onClick={() => tool('Teams')} style={tnb}>Teams</button>
        <button aria-label="Coaches" onClick={() => tool('Coaches')} style={tnb}>Coaches</button>
        <button aria-label="Players" onClick={() => tool('Players')} style={tnb}>Players</button>
        <button aria-label="Safeguarding" onClick={() => tool('Safeguarding')} style={tnb}>Safeguarding</button>
        <button aria-label="Reports" onClick={() => tool('Reports › Board report')} style={tnb}>Reports</button>
        <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button aria-label="Whole club" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>Whole club</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>RM</div>
      </nav>
      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="All players" onClick={() => tool('Players')} style={snb}>All players</button>
        <button aria-label="Pathway" onClick={() => tool('DP1-Pathway')} style={snb}>Pathway</button>
        <button aria-label="Playing across" onClick={() => onNav?.('PU1-PlayingUp')} style={snb}>Playing across</button>
        <button aria-label="Fair game time" onClick={() => tool('Players')} style={snb}>Fair game time</button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: MUT }}>Director of football</div>
      </nav>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button aria-label="Back" onClick={() => onNav?.('PU1-PlayingUp')} style={{ height: 44, padding: '0 16px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Back</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>What the club counts</div>
            <div style={{ fontSize: 13, color: MUT }}>Playing up · these rules apply to every team from under 9</div>
          </div>
          <button aria-label="Save" onClick={() => tool('Saved. The list is worked out again tonight.')} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Save</button>
        </div>

        {/* Two columns */}
        <div style={{ display: 'flex', gap: 16 }}>
          {/* Left: When a player is flagged */}
          <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>When a player is flagged</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.07em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Rules</div>

            <DropRow label="How far ahead in games" sub="Against their own team's middle, on the things your club style counts" value="Clearly ahead" onChange={() => tool('Choose: can edit, can see, or no access.')} />
            <DropRow label="For how long" sub="So one good month is not enough" value="6 weeks" onChange={() => tool('Choose: can edit, can see, or no access.')} />
            <DropRow label="Games needed" sub="Recorded games before Clean Sheet says anything" value="5 games" onChange={() => tool('Choose: can edit, can see, or no access.')} />

            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}`, gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: INK }}>Player's and coach's view</div>
                <div style={{ fontSize: 11, color: MUT }}>Head and settling in: the player is asked, the coach adds three taps</div>
              </div>
              <button aria-label="On" onClick={() => tool('Player and coach view needed: turned off.')} style={{ height: 44, padding: '0 20px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>On</button>
            </div>

            <DropRow label="Youngest age" sub="Under 9s and below are never flagged" value="Under 9" onChange={() => tool('Choose: can edit, can see, or no access.')} />
            <DropRow label="Who is told" sub="You and both coaches. Never the player or family until you say" value="Director and coaches" onChange={() => tool('Choose: can edit, can see, or no access.')} />
            <DropRow label="How far up" sub="One year. Two years needs you and the welfare officer" value="One year" onChange={() => tool('Choose: can edit, can see, or no access.')} />
          </div>

          {/* Right: When to wait */}
          <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>When to wait, whatever the numbers say</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, letterSpacing: '0.07em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Rules</div>

            <ToggleRow label="Growing fast" sub="More than 7 cm a year, or any growth pain flag" onToggle={() => tool('Hold when growing fast: turned off.')} />
            <ToggleRow label="Coming back from injury or a head knock" sub="Until 4 weeks after full training" onToggle={() => tool('Hold after injury: turned off.')} />
            <ToggleRow label="Already busy" sub="More than 3 sessions a week across teams and sports" onToggle={() => tool('Hold when busy: turned off.')} />
            <ToggleRow label="No real place" sub="Would get under half a game in the older team" onToggle={() => tool('Hold when no place: turned off.')} />

            <div style={{ marginTop: 20, background: PALE, borderRadius: 10, padding: '12px 14px', fontSize: 12, color: MUT }}>
              Each player is looked at again every 8 weeks. Birth month is shown so being older in the year is not mistaken for being ready.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
