import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PX3BandedNight({ onNav }: { onNav?: (s: string) => void }) {
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
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Mixed-age sessions</div>
              <div style={{ fontSize: 13, color: MUT }}>46 players in three groups by where they are in their growth, not by birth year. Once a month.</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button aria-label="Who is in which group" onClick={() => tool('The full list, with each player\'s growth stage and when it was last measured.')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Who is in which group</button>
              <button aria-label="Plan the next one" onClick={() => tool('Pick a date. Coaches and families of the 46 players are asked.')} style={{ height: 44, padding: '0 18px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Plan the next one</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button aria-label="An age group up · 3" onClick={() => onNav?.('PU1-PlayingUp')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>An age group up · 3</button>
            <button aria-label="An age group down · 2" onClick={() => onNav?.('PX1-PlayingDown')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>An age group down · 2</button>
            <button aria-label="Mixed-age sessions" onClick={() => onNav?.('PX3-BandedNight')} style={{ height: 44, padding: '0 18px', background: PALE, color: G, border: `1.5px solid ${G}`, borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Mixed-age sessions</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'Early growth', desc: 'From U12 to U14. Eli Ward, Sana Iyer and 15 others. Small games, lots of touches.', n: 17 },
              { title: 'Mid growth', desc: 'From U12 to U15. Noah Okafor, Zoe Hartley and 14 others. No jumps, sprints capped.', n: 16 },
              { title: 'Late growth or stable', desc: 'From U13 to U15. Tane Waru, Leo Costa and 11 others. Bigger pitch, harder duels.', n: 13 },
            ].map(group => (
              <div key={group.title} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK, flex: 1 }}>{group.title}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{group.n} players</div>
                </div>
                <div style={{ fontSize: 13, color: MUT }}>{group.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, color: MUT }}>Early growers stop winning on size alone. Late growers get to show what they can do. Nobody is moved anywhere.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>Which stage they are in, or anyone's height. Coaches see the groups, not the measurements.</div>
          </div>
        </div>

        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Last session</div>
            <div style={{ fontSize: 12, color: MUT }}>3 November · Tall Timber Reserve · 42 of 46 attended</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Next session</div>
            <div style={{ fontSize: 12, color: MUT }}>Not planned yet.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
