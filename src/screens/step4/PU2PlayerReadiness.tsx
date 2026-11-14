import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function Badge({ label, strong }: { label: string; strong?: boolean }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: strong ? G : 'transparent', color: strong ? '#fff' : MUT, border: strong ? 'none' : `1.5px solid ${LN}`, letterSpacing: '0.03em' }}>{label}</span>
  )
}

function RangeBar({ pct }: { pct: number }) {
  return (
    <div style={{ position: 'relative', height: 16, flex: 1 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 5, height: 6, background: '#c8ddd8', borderRadius: 3 }} />
      <div style={{ position: 'absolute', left: '50%', top: 2, width: 2, height: 12, background: GD, transform: 'translateX(-50%)' }} />
      <div style={{ position: 'absolute', left: `${pct}%`, top: 1, width: 14, height: 14, borderRadius: '50%', background: G, border: '2px solid #fff', transform: 'translateX(-50%)', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
    </div>
  )
}

export default function PU2PlayerReadiness({ onNav }: { onNav?: (s: string) => void }) {
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

      <div style={{ flex: 1, display: 'flex', gap: 0, overflow: 'auto' }}>
        <div style={{ flex: 1, padding: '20px 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Mia Tran</div>
              <div style={{ fontSize: 13, color: MUT }}>U12 Sam → U13 Girls Meg · born March 2014 · nominated by Sam on 1 June</div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <button aria-label="Compare with U13" onClick={() => onNav?.('PU4-Compare')} style={{ height: 44, padding: '0 18px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Compare with U13</button>
              <button aria-label="Not now" onClick={() => tool('Noted with your reason. Looked at again in 8 weeks. Mia and her family are not told.')} style={{ height: 44, padding: '0 18px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Not now</button>
              <button aria-label="Plan a trial" onClick={() => onNav?.('PU3-TrialPlan')} style={{ height: 44, padding: '0 24px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Plan a trial</button>
            </div>
          </div>

          {/* 6-card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {/* Football */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Football</div>
                <Badge label="Strong" strong />
              </div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Ahead of her own team for 8 weeks. Against the U13 girls:</div>
              {[
                { label: 'Duels won', pct: 72 },
                { label: 'Forward passes', pct: 68 },
                { label: 'Wins of the ball', pct: 63 },
              ].map(m => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 11, color: MUT, width: 110, flexShrink: 0 }}>{m.label}</div>
                  <RangeBar pct={m.pct} />
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, borderTop: `1px solid ${LN}`, paddingTop: 8, gap: 8 }}>
                <span style={{ fontSize: 11, color: MUT }}>9 recorded games ·</span>
                <button aria-label="All 9 measures" onClick={() => onNav?.('PU4-Compare')} style={{ height: 44, padding: '0 10px', background: 'none', border: 'none', color: G, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>All 9 measures</button>
              </div>
            </div>

            {/* Body */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Body</div>
                <Badge label="Fine" />
              </div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Steady growth, 4 cm this year. No pain flags. Against the U13 girls:</div>
              {[
                { label: 'Top speed', pct: 54 },
                { label: '10 m sprint', pct: 48 },
                { label: 'Distance', pct: 58 },
              ].map(m => (
                <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 11, color: MUT, width: 110, flexShrink: 0 }}>{m.label}</div>
                  <RangeBar pct={m.pct} />
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, borderTop: `1px solid ${LN}`, paddingTop: 8, gap: 8 }}>
                <span style={{ fontSize: 11, color: MUT }}>Heights, tests, vests ·</span>
                <button aria-label="All 9 measures" onClick={() => onNav?.('PU4-Compare')} style={{ height: 44, padding: '0 10px', background: 'none', border: 'none', color: G, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>All 9 measures</button>
              </div>
            </div>

            {/* Head */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Head</div>
                <Badge label="Strong" strong />
              </div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Copes with mistakes and wants a harder game.</div>
              <div style={{ background: PALE, borderRadius: 8, padding: '10px 12px', marginBottom: 6, fontSize: 12, color: INK }}>Sam: "Asks for the ball after a mistake. Takes feedback."</div>
              <div style={{ background: PALE, borderRadius: 8, padding: '10px 12px', fontSize: 12, color: INK }}>Mia: "I want harder games."</div>
              <div style={{ fontSize: 11, color: MUT, marginTop: 8, borderTop: `1px solid ${LN}`, paddingTop: 8 }}>Coach's view, 1 June · her goal check-in</div>
            </div>

            {/* Settling in */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Settling in</div>
                <Badge label="Good" />
              </div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Knows 4 of the 14. Trained with this group at the July clinic.</div>
              <div style={{ background: PALE, borderRadius: 8, padding: '10px 12px', fontSize: 12, color: INK }}>Mia: "Can't wait." Picked Ava, Bella, Dani and Frankie.</div>
              <div style={{ fontSize: 11, color: MUT, marginTop: 8, borderTop: `1px solid ${LN}`, paddingTop: 8 }}>Mia's own answers · shared sessions · coach's view</div>
            </div>

            {/* Load */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Load</div>
                <Badge label="Room for it" />
              </div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Two sessions and a game a week. No other sport this term. Wellness steady.</div>
              <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 44, marginBottom: 8 }}>
                {[20, 28, 24, 30, 26, 22].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: '#c8ddd8', borderRadius: '2px 2px 0 0', height: `${h * 1.1}px` }} />
                ))}
                {[18, 24].map((h, i) => (
                  <div key={'t' + i} style={{ flex: 1, background: G, borderRadius: '2px 2px 0 0', height: `${h * 1.1}px`, opacity: 0.7 }} />
                ))}
              </div>
              <div style={{ fontSize: 11, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 8 }}>Last 6 weeks, then 2 trial weeks as planned; up 20%</div>
            </div>

            {/* Where she would go */}
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Where she would go</div>
                <Badge label="A real place" />
              </div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>U13 Girls Meg has 14. She would get at least half of every game.</div>
              <div style={{ background: PALE, borderRadius: 8, padding: '10px 12px', fontSize: 12, color: INK }}>Meg: "Yes. We are short in midfield."</div>
              <div style={{ fontSize: 11, color: MUT, marginTop: 8, borderTop: `1px solid ${LN}`, paddingTop: 8 }}>Squad size · fair game time · receiving coach</div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 280, flexShrink: 0, padding: '20px 20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 6 }}>What Clean Sheet suggests</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 6 }}>Ready to try. Train with the U13s for 4 weeks, keep playing U12 on Saturdays, then look again.</div>
            <div style={{ fontSize: 12, color: MUT }}>It has seen this pattern hold for 8 weeks. It is a prompt, not a decision.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 10 }}>Who decides</div>
            {[
              { n: 1, t: 'Mia and her parents', s: 'Asked first. They can say no' },
              { n: 2, t: 'Sam and Meg', s: 'Both coaches agree the plan' },
              { n: 3, t: 'You', s: 'Sign it off' },
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
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 4 }}>Worth knowing</div>
            <div style={{ fontSize: 12, color: MUT }}>Born in March: one of the older ones in her year. Some of her edge may be age, so the trial matters more than the numbers.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
