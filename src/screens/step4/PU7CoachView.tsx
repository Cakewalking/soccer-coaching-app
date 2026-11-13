import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU7CoachView({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [q3, setQ3] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb: React.CSSProperties = { height: 56, padding: '0 10px', background: 'none', color: 'rgba(255,255,255,0.75)', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const snb: React.CSSProperties = { height: 44, padding: '0 12px', background: 'none', color: MUT, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }

  function ChoiceBtn({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void }) {
    return (
      <button
        onClick={onSelect}
        style={{
          height: 44, padding: '0 18px',
          background: selected ? G : '#fff',
          color: selected ? '#fff' : INK,
          border: `1px solid ${selected ? G : LN}`,
          borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit'
        }}
      >{label}</button>
    )
  }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Coach top nav */}
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Home" onClick={() => tool('Home')} style={tnb}>Home</button>
        <button aria-label="Squad" onClick={() => tool('Squad tab')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' }}>Squad</button>
        <button aria-label="Training" onClick={() => tool('Training tab')} style={tnb}>Training</button>
        <button aria-label="Match day" onClick={() => tool('Match day tab')} style={tnb}>Match day</button>
        <button aria-label="Clips" onClick={() => tool('Clips tab')} style={tnb}>Clips</button>
        <button aria-label="Record" onClick={() => onNav?.('REC1-RecordHub')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' }}>Record</button>
        <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button aria-label="U12 Sam" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U12 Sam</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#6090c0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>SK</div>
      </nav>
      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="Players" onClick={() => tool('Squad tab')} style={{ ...snb, color: G, fontWeight: 700, borderBottom: `2px solid ${G}` }}>Players</button>
        <button aria-label="Line-ups" onClick={() => onNav?.('SQ1-BestLineups')} style={snb}>Line-ups</button>
        <button aria-label="Development goals" onClick={() => tool('Squad › Development goals')} style={snb}>Development goals</button>
        <button aria-label="Wellness" onClick={() => tool('Squad › Wellness')} style={snb}>Wellness</button>
        <button aria-label="Availability" onClick={() => tool('Squad › Availability')} style={snb}>Availability</button>
        <button aria-label="Consent and privacy" onClick={() => tool('Squad › Consent and privacy')} style={snb}>Consent and privacy</button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: MUT }}>Head coach</div>
      </nav>

      <div style={{ flex: 1, display: 'flex', overflow: 'auto' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          {/* Request card */}
          <div style={{ background: '#fff', border: `1.5px solid ${G}`, borderRadius: 14, padding: '20px', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Your view on Mia</div>
                <div style={{ fontSize: 12, color: MUT }}>Rachel asked · Mia has been well ahead in games for 8 weeks · about a minute</div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                <button aria-label="Not now" onClick={() => tool('Rachel is told you will answer later.')} style={{ height: 44, padding: '0 16px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Not now</button>
                <button aria-label="Send to Rachel" onClick={() => tool('Sent. Rachel and Meg can see your view. Mia and her family are not told yet.')} style={{ height: 44, padding: '0 16px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send to Rachel</button>
              </div>
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.07em', textTransform: 'uppercase' as const, marginBottom: 14 }}>Three things only you can see</div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 8 }}>After a mistake, Mia usually…</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['Goes quiet', 'Shrugs it off', 'Asks for the ball again'] as const).map(label => (
                    <ChoiceBtn key={label} label={label} selected={q1 === label} onSelect={() => { setQ1(label); tool(label + '.') }} />
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 8 }}>When you give her something to work on…</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['Finds it hard', 'Tries it', 'Tries it and asks more'] as const).map(label => (
                    <ChoiceBtn key={label} label={label} selected={q2 === label} onSelect={() => { setQ2(label); tool(label + '.') }} />
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 8 }}>Would she be all right in a group of older girls?</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['Not yet', 'With a friend there', 'Yes'] as const).map(label => (
                    <ChoiceBtn key={label} label={label} selected={q3 === label} onSelect={() => { setQ3(label); tool(label + '.') }} />
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 8 }}>Anything else Rachel should know?</div>
                <div
                  onClick={() => tool('Typing…')}
                  style={{ width: '100%', minHeight: 80, padding: '12px 14px', border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 13, color: INK, fontFamily: 'inherit', cursor: 'text', boxSizing: 'border-box' as const }}
                >She is our captain this term. I would keep her with us on Saturdays.</div>
              </div>
            </div>

            <div style={{ fontSize: 12, color: MUT, marginTop: 12 }}>You can also say "I don't think so", with a reason. That is as useful as a yes.</div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: 280, flexShrink: 0, padding: '20px 20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 8 }}>Why you are asked</div>
            <div style={{ fontSize: 12, color: MUT }}>The film shows what Mia does with the ball. It cannot show how she copes, learns or fits in. You can.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 10 }}>What happens next</div>
            {[
              { n: 1, t: 'Rachel reads it', s: 'With the numbers and Meg\'s view' },
              { n: 2, t: 'Mia and her parents are asked', s: 'Only if you and Rachel agree' },
              { n: 3, t: 'A 4-week trial', s: 'She stays in your team' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flexShrink: 0 }}>{item.n}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{item.t}</div>
                  <div style={{ fontSize: 11, color: MUT }}>{item.s}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 4 }}>You can start this too</div>
            <div style={{ fontSize: 12, color: MUT }}>Nominate any of your players from their page. Rachel asks the same three things.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
