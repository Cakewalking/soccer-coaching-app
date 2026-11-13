import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU7CoachView({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb = { height: 56, padding: '0 10px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 12px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 768, display: 'flex', flexDirection: 'column' }}>
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button aria-label="Home" onClick={() => tool('Home')} style={tnb}>Home</button>
        <button aria-label="Squad" onClick={() => tool('Squad tab')} style={tnb}>Squad</button>
        <button aria-label="Training" onClick={() => tool('Training tab')} style={tnb}>Training</button>
        <button aria-label="Match day" onClick={() => tool('Match day tab (Sat)')} style={tnb}>Match day</button>
        <button aria-label="Clips" onClick={() => tool('Clips tab')} style={tnb}>Clips</button>
        <button aria-label="Record" onClick={() => onNav?.('REC1-RecordHub')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' as const }}>Record</button>
        <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' as const }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button aria-label="U12 Sam" onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>U12 Sam</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#6090c0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>SH</div>
      </nav>
      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button aria-label="Players" onClick={() => tool('Squad tab')} style={snb}>Players</button>
        <button aria-label="Line-ups" onClick={() => onNav?.('SQ1-BestLineups')} style={snb}>Line-ups</button>
        <button aria-label="Development goals" onClick={() => tool('Squad › Development goals')} style={snb}>Development goals</button>
        <button aria-label="Wellness" onClick={() => tool('Squad › Wellness')} style={snb}>Wellness</button>
        <button aria-label="Availability" onClick={() => tool('Squad › Availability')} style={snb}>Availability</button>
        <button aria-label="Consent and privacy" onClick={() => tool('Squad › Consent and privacy')} style={snb}>Consent and privacy</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', gap: 20, padding: '20px', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1.5px solid ${G}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Rachel asked · about Mia Tran</div>
                <div style={{ fontSize: 13, color: MUT }}>Rachel asked · Mia has been well ahead in games for 8 weeks · about a minute</div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button aria-label="Not now" onClick={() => tool('Rachel is told you will answer later.')} style={{ height: 44, padding: '0 16px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Not now</button>
                <button aria-label="Send to Rachel" onClick={() => tool('Sent. Rachel and Meg can see your view. Mia and her family are not told yet.')} style={{ height: 44, padding: '0 16px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send to Rachel</button>
              </div>
            </div>

            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Would she be all right in a group of older girls?</div>

            <div style={{ background: PALE, borderRadius: 10, padding: '14px 16px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontStyle: 'italic', color: INK }}>She is our captain this term. I would keep her with us on Saturdays.</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 6, letterSpacing: '0.06em' }}>IF SHE MISSED A GOAL AND WALKED AWAY</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                  {(['Goes quiet', 'Shrugs it off', 'Asks for the ball again'] as const).map(label => (
                    <button key={label} aria-label={label} onClick={() => tool(label + '.')} style={{ height: 44, padding: '0 16px', background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>{label}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 6, letterSpacing: '0.06em' }}>IF A DRILL WAS TOO HARD</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                  {(['Finds it hard', 'Tries it', 'Tries it and asks more'] as const).map(label => (
                    <button key={label} aria-label={label} onClick={() => tool(label + '.')} style={{ height: 44, padding: '0 16px', background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>{label}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 6, letterSpacing: '0.06em' }}>DOES SHE KNOW ANYONE IN THAT TEAM?</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                  {(['Not yet', 'With a friend there', 'Yes'] as const).map(label => (
                    <button key={label} aria-label={label} onClick={() => tool(label + '.')} style={{ height: 44, padding: '0 16px', background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>{label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>You can also say "I don't think so", with a reason. That is as useful as a yes.</div>
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>The film shows what Mia does with the ball. It cannot show how she copes, learns or fits in. You can.</div>
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: MUT }}>Nominate any of your players from their page. Rachel asks the same three things.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
