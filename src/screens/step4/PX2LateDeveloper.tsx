import { useState } from 'react'
import { toolTarget } from '../toolTargets'
import { OpeningPanel } from './directorParts'
import MeasureSheet from '../measures/MeasureSheet'
import { MEASURE } from '../measures/data'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const Arrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9aa6a2" strokeWidth="2.2" strokeLinecap="round" style={{ flexShrink: 0 }}><path d="M9 6l6 6-6 6" /></svg>

function Badge({ label, strong }: { label: string; strong?: boolean }) {
  return <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: strong ? G : 'transparent', color: strong ? '#fff' : MUT, border: strong ? 'none' : `1.5px solid ${LN}`, letterSpacing: '0.03em' }}>{label}</span>
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
function MeasureRow({ label, src, pct, first, onOpen }: { label: string; src: string; pct: number; first?: boolean; onOpen: () => void }) {
  return (
    <button onClick={onOpen} style={{ width: '100%', minHeight: 44, display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', background: 'none', border: 'none', borderTop: first ? 'none' : `1px solid ${LN}`, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
      <span style={{ width: 118, flexShrink: 0 }}>
        <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: INK, lineHeight: '16px' }}>{label}</span>
        <span style={{ display: 'block', fontSize: 11, color: MUT }}>{src}</span>
      </span>
      <RangeBar pct={pct} />
      <Arrow />
    </button>
  )
}
function QuoteBtn({ text, onOpen }: { text: string; onOpen: () => void }) {
  return (
    <button onClick={onOpen} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, background: PALE, borderRadius: 8, padding: '10px 12px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
      <span style={{ flex: 1, fontSize: 12, color: INK }}>{text}</span>
      <Arrow />
    </button>
  )
}

export default function PX2LateDeveloper({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [measure, setMeasure] = useState<string | null>(null)
  function tool(name: string) { const to = toolTarget(name); if (to && onNav) { onNav(to); return } setLastTool(name) }
  const open = (id: string) => { setMeasure(id); setLastTool(id) }

  const tnb = { height: 56, padding: '0 10px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const card: React.CSSProperties = { background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }
  const cardHead = (title: string, badge: string, strong?: boolean) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{title}</div><Badge label={badge} strong={strong} />
    </div>
  )
  const foot = (t: string) => <div style={{ fontSize: 11, color: MUT, marginTop: 8, borderTop: `1px solid ${LN}`, paddingTop: 8 }}>{t}</div>

  return (
    <div data-screen="PX2-LateDeveloper" data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
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
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: MUT }}>Director of football</div>
      </nav>

      <OpeningPanel
        heading="ELI WARD · U14 JOSH · BORN NOVEMBER 2012"
        sentence="Worth a talk. Strong on the ball, growing later than his year, and starting to lose heart in games."
        support="Thursdays with U13 Chris for 6 weeks, still playing under 14s. Eli and his parents are asked first."
        figures={[{ num: '148 cm', label: 'his team’s middle is 162', proof: true }, { num: '7', label: 'recorded games' }]}
        buttons={[{ label: 'Plan it', main: true, onClick: () => onNav?.('PU3-TrialPlan') }, { label: 'Not now', onClick: () => tool('Noted with your reason. Looked at again in 8 weeks. Eli and his family are not told.') }]}
      />

      <div style={{ flex: 1, display: 'flex', overflow: 'auto' }}>
        <div style={{ flex: 1, padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {/* Football */}
            <div style={card}>
              {cardHead('Football', 'Strong on the ball', true)}
              <div style={{ fontSize: 12, color: MUT, marginBottom: 6 }}>Upper third of his team for all three.</div>
              <MeasureRow label="Forward passes" src="Film" pct={73} first onOpen={() => open('PU8d-MeasurePasses')} />
              <MeasureRow label="Kept it" src="Film" pct={70} onOpen={() => open('PU8e-MeasureWins')} />
              <MeasureRow label="Duels won" src="Film" pct={24} onOpen={() => open('PU8a-MeasureFilm')} />
              {foot('7 recorded games')}
            </div>
            {/* Body */}
            <div style={card}>
              {cardHead('Body', 'Growing later')}
              <div style={{ fontSize: 12, color: MUT, marginBottom: 6 }}>148 cm, 3 cm this year. His team’s middle is 162 cm. Top speed:</div>
              <MeasureRow label="Against year up" src="Vest" pct={28} first onOpen={() => open('PU8b-MeasureVest')} />
              <MeasureRow label="Against year below" src="Vest" pct={62} onOpen={() => open('PU8b-MeasureVest')} />
              {foot('Heights each month · tests in May')}
            </div>
            {/* Head */}
            <div style={card}>
              {cardHead('Head', 'Losing heart')}
              <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Still loves training. Games are getting harder to enjoy.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <QuoteBtn text={'Josh: "Getting quieter. Stays out of contact."'} onOpen={() => open('PU8c-MeasureSaid')} />
                <QuoteBtn text={'Eli: "I can\'t get near them."'} onOpen={() => open('PU8c-MeasureSaid')} />
              </div>
              {foot('Coach’s view, 2 June · his check-ins as a trend')}
            </div>
            {/* Settling in */}
            <div style={card}>
              {cardHead('Settling in', 'Good')}
              <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Played with five of U13 Chris in last year’s under 13s.</div>
              <QuoteBtn text={'Josh: "He\'d see it as a step back unless we frame it well."'} onOpen={() => open('PU8h-MeasureSettling')} />
              {foot('Squad history · coach’s view')}
            </div>
            {/* Load */}
            <div style={card}>
              {cardHead('Load', 'Fine')}
              <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Two sessions and a game. Game time has fallen from 40 to 22 minutes since March.</div>
              <button onClick={() => open('PU8j-MeasureLoad')} style={{ width: '100%', display: 'flex', gap: 3, alignItems: 'flex-end', height: 44, marginBottom: 2, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                {[34, 32, 30, 28, 26, 24, 22, 22].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: '#c8ddd8', borderRadius: '2px 2px 0 0', height: `${h * 1.0}px` }} />
                ))}
              </button>
              {foot('Minutes a game, last 8 games')}
            </div>
            {/* Where he would go */}
            <div style={card}>
              {cardHead('Where he would go', 'Training: yes')}
              <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>U13 Chris train Thursdays. League games an age group down need the league’s OK, before next season.</div>
              <QuoteBtn text={'Chris: "Happy to have him. He makes others better."'} onOpen={() => open('PU8i-MeasurePlace')} />
              {foot('Squad size · league rules')}
            </div>
          </div>
          <div style={{ fontSize: 11, color: MUT }}>Each row and quote opens the same evidence sheet as for Mia. Eli’s own data is not built yet.</div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 280, flexShrink: 0, padding: '16px 20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={card}>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 10 }}>Who decides</div>
            {[
              { n: 1, t: 'Eli and his parents', s: 'Asked first. They can say no' },
              { n: 2, t: 'Josh and Chris', s: 'Both coaches agree the plan' },
              { n: 3, t: 'You', s: 'Sign it off' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flexShrink: 0 }}>{item.n}</div>
                <div><div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{item.t}</div><div style={{ fontSize: 11, color: MUT }}>{item.s}</div></div>
              </div>
            ))}
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 4 }}>Worth knowing</div>
            <div style={{ fontSize: 12, color: MUT }}>Born in November: one of the youngest in his year, and growing late. Players like Eli often catch up at 15 to 17. The aim is that he is still playing then.</div>
          </div>
        </div>
      </div>

      {measure && MEASURE(measure) && (
        <MeasureSheet cfg={MEASURE(measure)!} onClose={() => setMeasure(null)} onOpen={open} onNav={onNav} />
      )}
    </div>
  )
}
