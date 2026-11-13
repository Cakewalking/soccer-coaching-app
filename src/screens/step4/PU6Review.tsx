import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

function RangeBar({ pct }: { pct: number }) {
  return (
    <div style={{ position: 'relative', height: 16, flex: 1 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 5, height: 6, background: '#c8ddd8', borderRadius: 3 }} />
      <div style={{ position: 'absolute', left: '50%', top: 2, width: 2, height: 12, background: GD, transform: 'translateX(-50%)' }} />
      <div style={{ position: 'absolute', left: `${pct}%`, top: 1, width: 14, height: 14, borderRadius: '50%', background: G, border: '2px solid #fff', transform: 'translateX(-50%)' }} />
    </div>
  )
}

export default function PU6Review({ onNav }: { onNav?: (s: string) => void }) {
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
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <button aria-label="Back to the plan" onClick={() => onNav?.('PU3-TrialPlan')} style={{ height: 44, padding: '0 16px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Back to the plan</button>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>Leo's review</div>
              <div style={{ fontSize: 13, color: MUT }}>U13 Chris → U14 Josh · 4 weeks of Tuesday training done · Thursday 18 June</div>
            </div>
          </div>

          {/* Main 3-column layout */}
          <div style={{ display: 'flex', gap: 16, flex: 1 }}>
            {/* Leo first column */}
            <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Leo first</div>
              <div style={{ fontSize: 11, color: MUT, marginBottom: 10 }}>His answers after each Tuesday</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 14 }}>
                {[
                  { w: 'Week 1', label: 'Hard', sub: 'Paired with nobody' },
                  { w: 'Week 2', label: 'Hard but fun', sub: 'Paired with Tane' },
                  { w: 'Week 3', label: 'Hard but fun', sub: 'Paired with Tane' },
                  { w: 'Week 4', label: 'Fun', sub: 'I scored in the small game' },
                ].map(item => (
                  <div key={item.w} style={{ background: PALE, borderRadius: 8, padding: '10px 8px', textAlign: 'center' as const }}>
                    <div style={{ fontSize: 10, color: MUT, marginBottom: 2 }}>{item.w}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: G }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: MUT, marginTop: 2 }}>{item.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: PALE, borderRadius: 8, padding: '10px 12px', fontSize: 12, color: INK, fontStyle: 'italic' as const }}>
                Leo, today: "I want to keep going on Tuesdays. I don't want to leave my team yet."
              </div>
            </div>

            {/* With the under 14s column */}
            <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>With the under 14s, 4 sessions</div>
              <div style={{ marginBottom: 12 }}>
                {[
                  { label: 'Duels won', val: '49%', pct: 49 },
                  { label: 'Forward passes under pressure', val: '6', pct: 55 },
                  { label: 'Sprints a session', val: '14', pct: 60 },
                  { label: 'Touches', val: '39', pct: 52 },
                ].map(m => (
                  <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 11, color: INK, width: 150, flexShrink: 0 }}>{m.label}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: G, width: 30, flexShrink: 0 }}>{m.val}</div>
                    <RangeBar pct={m.pct} />
                    <div style={{ fontSize: 11, color: MUT, width: 50, flexShrink: 0 }}>Middle</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 8 }}>In week 1 he was in their lower third on all four. Load stayed inside his cap. No pain flags.</div>

              <div style={{ marginTop: 16, fontSize: 12, fontWeight: 700, color: INK, marginBottom: 8 }}>Decide</div>
              <div style={{ fontSize: 11, color: MUT, marginBottom: 10 }}>Clean Sheet suggests "Do both": it is what Leo asked for, and both coaches agree.</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                <button
                  onClick={() => tool('Do both. Leo, his parents and both coaches are told today.')}
                  style={{ minHeight: 44, padding: '10px 14px', background: G, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const, display: 'flex', flexDirection: 'column' as const, gap: 2 }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Do both</span>
                  <span style={{ fontSize: 11, fontWeight: 400 }}>Tuesdays with U14 Josh, games with U13 Chris. Look again on 30 July</span>
                </button>
                <button
                  onClick={() => tool('Move up. Leo, his parents and both coaches are told today.')}
                  style={{ minHeight: 44, padding: '10px 14px', background: '#fff', color: INK, border: `1.5px solid ${LN}`, borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const, display: 'flex', flexDirection: 'column' as const, gap: 2 }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Move up</span>
                  <span style={{ fontSize: 11 }}>Train and play with U14 Josh. Half a game at least. Check in every 6 weeks</span>
                </button>
                <button
                  onClick={() => tool('Back to U13 Chris. Leo, his parents and both coaches are told today.')}
                  style={{ minHeight: 44, padding: '10px 14px', background: '#fff', color: INK, border: `1.5px solid ${LN}`, borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' as const, display: 'flex', flexDirection: 'column' as const, gap: 2 }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Back to U13 Chris</span>
                  <span style={{ fontSize: 11 }}>A good four weeks. Nothing is lost; he can try again next term</span>
                </button>
              </div>
            </div>

            {/* The coaches column */}
            <div style={{ width: 220, flexShrink: 0, background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>The coaches</div>
              {[
                { initials: 'J', bg: '#d4820a', name: 'Josh', quote: '"Keeps up now. Talks more. I\'d have him."' },
                { initials: 'C', bg: G, name: 'Chris', quote: '"Happy for Tuesdays. I\'d like him with us till the break."' },
                { initials: 'D', bg: '#8070c0', name: 'Dad', quote: '"He comes home buzzing."' },
              ].map(item => (
                <div key={item.name} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{item.initials}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{item.name}</div>
                  </div>
                  <div style={{ fontSize: 12, color: MUT, fontStyle: 'italic' as const }}>{item.quote}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
