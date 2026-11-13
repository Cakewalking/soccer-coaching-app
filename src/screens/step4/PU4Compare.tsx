import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function RangeRow({ label, mia, range, mid, where }: { label: string; mia: string; range: string; mid: string; where: string }) {
  const pct = where === 'Lower third' ? 22 : where === 'Middle' ? 52 : where === 'Upper third' || where === 'Above' ? 73 : 52
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
      <div style={{ width: 170, fontSize: 12, color: INK, flexShrink: 0 }}>{label}</div>
      <div style={{ width: 70, fontSize: 12, fontWeight: 600, color: G, flexShrink: 0 }}>{mia}</div>
      <div style={{ width: 110, fontSize: 11, color: MUT, flexShrink: 0 }}>{range}</div>
      <div style={{ flex: 1, position: 'relative', height: 16 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 5, height: 6, background: '#c8ddd8', borderRadius: 3 }} />
        <div style={{ position: 'absolute', left: `${mid}%`, top: 2, width: 2, height: 12, background: GD, transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: 1, width: 14, height: 14, borderRadius: '50%', background: G, border: '2px solid #fff', transform: 'translateX(-50%)' }} />
      </div>
      <div style={{ width: 80, fontSize: 12, fontWeight: 600, color: pct >= 65 ? G : MUT, textAlign: 'right' as const, flexShrink: 0 }}>{where}</div>
    </div>
  )
}

export default function PU4Compare({ onNav }: { onNav?: (s: string) => void }) {
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

      <div style={{ flex: 1, display: 'flex', overflow: 'auto' }}>
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Mia against the team above</div>
              <div style={{ fontSize: 13, color: MUT }}>U12 Sam → U13 Girls Meg · all 14 players · per 60 minutes</div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <button aria-label="Midfielders only" onClick={() => tool('Now compared with the 5 midfielders in U13 Girls Meg.')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Midfielders only</button>
              <button aria-label="Back to Mia" onClick={() => onNav?.('PU2-PlayerReadiness')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Back to Mia</button>
              <button aria-label="Plan a trial" onClick={() => onNav?.('PU3-TrialPlan')} style={{ height: 44, padding: '0 18px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Plan a trial</button>
            </div>
          </div>

          {/* Two sections */}
          <div style={{ display: 'flex', gap: 16 }}>
            {/* Body section */}
            <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Body: same tests, same stopwatch</div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: PALE, color: G, border: `1px solid ${LN}` }}>Fair to compare</span>
              </div>
              <div style={{ display: 'flex', gap: 8, padding: '4px 0 8px', borderBottom: `1px solid ${LN}`, marginBottom: 4 }}>
                <div style={{ width: 170, fontSize: 10, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Measure</div>
                <div style={{ width: 70, fontSize: 10, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Mia</div>
                <div style={{ width: 110, fontSize: 10, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>U13 girls range</div>
                <div style={{ flex: 1 }} />
                <div style={{ width: 80, fontSize: 10, fontWeight: 600, color: MUT, textTransform: 'uppercase' as const, letterSpacing: '0.06em', textAlign: 'right' as const }}>Where she sits</div>
              </div>
              <RangeRow label="Top speed" mia="24.1 km/h" range="22.0 to 27.5 · 24.6" mid="45" where="Middle" />
              <RangeRow label="10 m sprint" mia="2.08 s" range="1.95 to 2.25 · 2.10" mid="45" where="Middle" />
              <RangeRow label="Sprints a game" mia="11" range="8 to 9 to 13" mid="30" where="Middle" />
              <RangeRow label="Distance" mia="4.4 km" range="4.0 to 5.6 · 4.8" mid="40" where="Lower third" />
              <div style={{ fontSize: 11, color: MUT, marginTop: 10 }}>Green band: the U13 girls, slowest to fastest. Dark line: their middle player. Dot: Mia. No U13 player is named.</div>
            </div>

            {/* Football section */}
            <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Football: her games against under 12s</div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: PALE, color: MUT, border: `1px solid ${LN}` }}>Compare with care</span>
              </div>
              <RangeRow label="Duels won" mia="71%" range="38 to 66% · 52%" mid="40" where="Above" />
              <RangeRow label="Forward passes under pressure" mia="9" range="4 to 12 · 7" mid="40" where="Upper third" />
              <RangeRow label="Wins of the ball" mia="7" range="3 to 9 · 6" mid="50" where="Upper third" />
              <RangeRow label="Goals and assists" mia="0.9" range="0.1 to 11 · 0.4" mid="30" where="Upper third" />
              <RangeRow label="Touches" mia="48" range="30 to 58 · 44" mid="47" where="Middle" />
              <div style={{ fontSize: 11, color: MUT, marginTop: 10 }}>Her game numbers were made against under 12s, so they flatter her. Goals depend on position and team. Tests and vests compare fairly.</div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 240, flexShrink: 0, padding: '20px 20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 6 }}>In one line</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: G, marginBottom: 4 }}>9 of 9</div>
            <div style={{ fontSize: 12, color: MUT }}>inside or above the U13 range. Above their middle on 5. A count, not a score. Each row is there to read.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 6 }}>The best evidence</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>2 guest sessions with the U13s. Duels won 48%, against their middle of 52%. Small, but it is against the right opposition. A trial gives 4 weeks of this.</div>
            <button onClick={() => onNav?.('PU3-TrialPlan')} style={{ height: 44, width: '100%', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Plan a trial</button>
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 4 }}>Read with care</div>
            <div style={{ fontSize: 12, color: MUT }}>Her game numbers were made against under 12s, so they flatter her. Goals depend on position and team. Tests and vests compare fairly.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
