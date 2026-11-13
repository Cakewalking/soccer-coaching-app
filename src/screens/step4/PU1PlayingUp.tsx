import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function DirFrame({ onNav, active, tool }: { onNav?: (s: string) => void; active?: string; tool: (n: string) => void }) {
  const tnb = { height: 56, padding: '0 10px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snba = { ...snb, color: G, fontWeight: 700, borderBottom: `2.5px solid ${G}` }
  return (
    <>
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
        <button aria-label="Playing across" onClick={() => onNav?.('PU1-PlayingUp')} style={active === 'playing-across' ? snba : snb}>Playing across</button>
        <button aria-label="Fair game time" onClick={() => tool('Players')} style={snb}>Fair game time</button>
      </nav>
    </>
  )
}

export default function PU1PlayingUp({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 768, display: 'flex', flexDirection: 'column' }}>
      <DirFrame onNav={onNav} active="playing-across" tool={tool} />

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Playing across</div>
              <div style={{ fontSize: 13, color: MUT }}>Wattle Creek FC · 192 players looked at each Monday</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button aria-label="What the club counts" onClick={() => onNav?.('PU5-Settings')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>What the club counts</button>
              <button aria-label="Nominate a player" onClick={() => tool('Pick any player. Their coach is asked for a view.')} style={{ height: 44, padding: '0 18px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Nominate a player</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button aria-label="An age group up · 3" onClick={() => onNav?.('PU1-PlayingUp')} style={{ height: 44, padding: '0 18px', background: PALE, color: G, border: `1.5px solid ${G}`, borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>An age group up · 3</button>
            <button aria-label="An age group down · 2" onClick={() => onNav?.('PX1-PlayingDown')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>An age group down · 2</button>
            <button aria-label="Mixed-age sessions" onClick={() => onNav?.('PX3-BandedNight')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Mixed-age sessions</button>
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: 12, color: MUT, display: 'flex', alignItems: 'center' }}>Up, down or mixed: the same idea. The right challenge for each player.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, flex: 1 }}>Worth a look</div>
            </div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 12 }}>A to Z · full dot: strong · ring: some · empty: not yet</div>

            {[
              { label: 'MT Mia Tran · U12 Sam → U13 Girls Meg Sam nominated her too · strong for 8 weeks · dots: F B H S L', ariaLabel: 'MT Mia Tran · U12 Sam → U13 Girls Meg Sam nominated her too · strong for 8 weeks · nothing says wait', name: 'Mia Tran', from: 'U12 Sam → U13 Girls Meg', sub: 'Sam nominated her too · strong for 8 weeks', status: 'Ready to try', target: 'PU2-PlayerReadiness' as const },
              { label: 'TA Tane Waru · U14 Josh → U16 Ollie Head: coach has not answered yet · needs a view', ariaLabel: 'TA Tane Waru · U14 Josh → U16 Ollie Head: coach has not answered yet Needs a view · dots checked', name: 'Tane Waru', from: 'U14 Josh → U16 Ollie', sub: 'Head: coach has not answered yet', status: 'Needs a view', target: 'PU2-PlayerReadiness' as const },
              { label: 'ZP Zoe Park · U11 Luke → U12 Girls Ana Would be her third team this year · talk first', ariaLabel: 'ZP Zoe Park · U11 Luke → U12 Girls Ana Would be her third team this year · talk first · dots', name: 'Zoe Park', from: 'U11 Luke → U12 Girls Ana', sub: 'Would be her third team this year', status: 'Talk first', target: 'PU2-PlayerReadiness' as const },
            ].map((p) => (
              <div key={p.name} style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}`, gap: 12, minHeight: 56 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.name.split(' ').map(w => w[0]).join('').slice(0,2)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.from}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{p.sub}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: G }}>{p.status}</div>
                <button aria-label={p.ariaLabel} onClick={() => onNav?.(p.target)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Playing up now</div>
            {[
              { ariaLabel: 'LC Leo Costa · U13 Chris → U14 Josh Week 3 of 4 · training up, playing his own age · review 18 Jun', name: 'Leo Costa', from: 'U13 Chris → U14 Josh', sub: 'Week 3 of 4 · training up, playing his own age', status: 'Review 18 Jun', target: 'PU3-TrialPlan' as const },
              { ariaLabel: 'AW Ava Walsh · U12 Sam → U13 Girls Meg Moved up in May · check-in every 6 weeks · going well', name: 'Ava Walsh', from: 'U12 Sam → U13 Girls Meg', sub: 'Moved up in May · check-in every 6 weeks', status: 'Going well', target: 'PU3-TrialPlan' as const },
            ].map((p) => (
              <div key={p.name} style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}`, gap: 12, minHeight: 56 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{p.name.split(' ').map(w => w[0]).join('').slice(0,2)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.from}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{p.sub}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: G }}>{p.status}</div>
                <button aria-label={p.ariaLabel} onClick={() => onNav?.(p.target)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', border: 'none', background: 'transparent' }} />
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Held back by a rule</div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c05050', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>NO</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Noah Okafor</div>
                <div style={{ fontSize: 12, color: MUT }}>Growing fast, knee pain. Looked at again in 8 weeks</div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: MUT }}>Not a ranking and not a score. It says who is worth a conversation. People decide.</div>
        </div>

        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>How a player gets here</div>
            {[
              { n: 1, t: 'Stretched for 6 weeks', s: 'Well above their own age group in games' },
              { n: 2, t: 'Nothing says wait', s: 'Not in a growth spurt, not sore, not overloaded' },
              { n: 3, t: "Their coach agrees", s: 'Or the coach nominates first' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flexShrink: 0 }}>{item.n}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{item.t}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{item.s}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 4 }}>Never used</div>
            <div style={{ fontSize: 12, color: MUT }}>Size alone, results, or what a parent has asked for.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
