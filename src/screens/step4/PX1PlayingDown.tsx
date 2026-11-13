import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PX1PlayingDown({ onNav }: { onNav?: (s: string) => void }) {
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
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Playing across</div>
              <div style={{ fontSize: 13, color: MUT }}>Wattle Creek FC</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button aria-label="What the club counts" onClick={() => onNav?.('PU5-Settings')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>What the club counts</button>
              <button aria-label="Nominate a player" onClick={() => tool('Pick any player. Their coach is asked for a view.')} style={{ height: 44, padding: '0 18px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Nominate a player</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button aria-label="An age group up · 3" onClick={() => onNav?.('PU1-PlayingUp')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>An age group up · 3</button>
            <button aria-label="An age group down · 2" onClick={() => onNav?.('PX1-PlayingDown')} style={{ height: 44, padding: '0 18px', background: PALE, color: G, border: `1.5px solid ${G}`, borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>An age group down · 2</button>
            <button aria-label="Mixed-age sessions" onClick={() => onNav?.('PX3-BandedNight')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Mixed-age sessions</button>
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: 12, color: MUT, display: 'flex', alignItems: 'center' }}>Up, down or mixed: the same idea. The right challenge for each player.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 6 }}>Worth a talk</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>Here the body mark means "growing later than their year", not a fault. Many of these players are the best footballers in their team.</div>
            {[
              { ariaLabel: 'EW Eli Ward · U14 Josh → U13 Chris Growing later than his year · reads the game well, loses most duels', name: 'Eli Ward', from: 'U14 Josh → U13 Chris', sub: 'Growing later than his year · reads the game well, loses most duels' },
              { ariaLabel: 'SI Sana Iyer · U13 Girls Meg → U12 Girls Ana Coach: "getting quieter since September · the game is slipping away"', name: 'Sana Iyer', from: 'U13 Girls Meg → U12 Girls Ana', sub: 'Coach: "getting quieter since September"' },
              { ariaLabel: 'KO Kai Osei · U15 Boys Dan → U14 Josh Thursdays with U14 Josh since May · "I get on the ball again"', name: 'Kai Osei', from: 'U15 Boys Dan → U14 Josh', sub: 'Thursdays with U14 Josh since May · "I get on the ball again"' },
            ].map(p => (
              <div key={p.name} style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}`, gap: 12, minHeight: 56 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.name.split(' ').map(w => w[0]).join('')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.from}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{p.sub}</div>
                </div>
                <button aria-label={p.ariaLabel} onClick={() => onNav?.('PX2-LateDeveloper')} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 6 }}>League games an age group down</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 10 }}>A player can train with a younger group any week: that is the club's call. League games an age group down need the league's approval, usually before the season and after its own measuring.</div>
            <button aria-label="Rules" onClick={() => tool('Opens Dispensations under League sync, with this player\'s application.')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Rules</button>
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>"Train across", "the right challenge". Never "dropped" or "moved down".</div>
          </div>
        </div>

        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 4 }}>Not a ranking</div>
            <div style={{ fontSize: 12, color: MUT }}>It says who is worth a conversation. People decide.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
