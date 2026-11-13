import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function Row({ label, value, onChange }: { label: string; value: string; onChange: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${LN}`, gap: 12 }}>
      <div style={{ flex: 1, fontSize: 13, color: INK }}>{label}</div>
      <button onClick={onChange} aria-label={value} style={{ height: 44, padding: '0 16px', background: PALE, color: G, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', minWidth: 100 }}>{value}</button>
    </div>
  )
}

export default function PU5Settings({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 10px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 768, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Club" onClick={() => tool('Club › Overview')} style={tnb}>Club</button>
        <button aria-label="Teams" onClick={() => tool('Teams')} style={tnb}>Teams</button>
        <button aria-label="Coaches" onClick={() => tool('Coaches')} style={tnb}>Coaches</button>
        <button aria-label="Players" onClick={() => tool('Players')} style={tnb}>Players</button>
        <button aria-label="Safeguarding" onClick={() => tool('Safeguarding')} style={tnb}>Safeguarding</button>
        <button aria-label="Reports" onClick={() => tool('Reports › Board report')} style={tnb}>Reports</button>
        <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' as const }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button aria-label="Whole club" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>Whole club</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>RM</div>
      </nav>
      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="All players" onClick={() => tool('Players')} style={snb}>All players</button>
        <button aria-label="Pathway" onClick={() => tool('DP1-Pathway')} style={snb}>Pathway</button>
        <button aria-label="Playing across" onClick={() => onNav?.('PU1-PlayingUp')} style={snb}>Playing across</button>
        <button aria-label="Fair game time" onClick={() => tool('Players')} style={snb}>Fair game time</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button aria-label="Back" onClick={() => onNav?.('PU1-PlayingUp')} style={{ height: 44, padding: '0 16px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Back</button>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>What the club counts</div>
              <div style={{ fontSize: 13, color: MUT }}>Playing up · these rules apply to every team from under 9</div>
            </div>
            <div style={{ flex: 1 }} />
            <button aria-label="Save" onClick={() => tool('Saved. The list is worked out again tonight.')} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Save</button>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>How far ahead</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Against their own team's middle, on the things your club style counts</div>
            <Row label="Level" value="Clearly ahead" onChange={() => tool('Choose: can edit, can see, or no access.')} />
            <Row label="For how long" value="6 weeks" onChange={() => tool('Choose: can edit, can see, or no access.')} />
            <Row label="In how many games" value="5 games" onChange={() => tool('Choose: can edit, can see, or no access.')} />
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Player and coach view</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Head and settling in: the player is asked, the coach adds three taps</div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${LN}`, gap: 12 }}>
              <div style={{ flex: 1, fontSize: 13, color: INK }}>Required for every nomination</div>
              <button aria-label="On" onClick={() => tool('Player and coach view needed: turned off.')} style={{ height: 44, padding: '0 20px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>On</button>
            </div>
            <Row label="Youngest team this applies to" value="Under 9" onChange={() => tool('Choose: can edit, can see, or no access.')} />
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>How many years up</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>One year. Two years needs you and the welfare officer</div>
            <Row label="Maximum" value="One year" onChange={() => tool('Choose: can edit, can see, or no access.')} />
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Hold rules</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 2 }}>You and both coaches. Never the player or family until you say</div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${LN}`, gap: 12 }}>
              <div style={{ flex: 1, fontSize: 13, color: INK }}>Hold when growing fast</div>
              <button aria-label="On" onClick={() => tool('Hold when growing fast: turned off.')} style={{ height: 44, padding: '0 20px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>On</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${LN}`, gap: 12 }}>
              <div style={{ flex: 1, fontSize: 13, color: INK }}>Hold after injury</div>
              <button aria-label="On" onClick={() => tool('Hold after injury: turned off.')} style={{ height: 44, padding: '0 20px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>On</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${LN}`, gap: 12 }}>
              <div style={{ flex: 1, fontSize: 13, color: INK }}>Hold when busy</div>
              <button aria-label="On" onClick={() => tool('Hold when busy: turned off.')} style={{ height: 44, padding: '0 20px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>On</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${LN}`, gap: 12 }}>
              <div style={{ flex: 1, fontSize: 13, color: INK }}>Hold when no place</div>
              <button aria-label="On" onClick={() => tool('Hold when no place: turned off.')} style={{ height: 44, padding: '0 20px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>On</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Who can see the list</div>
            <Row label="Access" value="Director and coaches" onChange={() => tool('Choose: can edit, can see, or no access.')} />
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>Each player is looked at again every 8 weeks. Birth month is shown so being older in the year is not mistaken for being ready.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
