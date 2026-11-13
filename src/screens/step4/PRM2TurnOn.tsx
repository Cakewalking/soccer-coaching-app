import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM2TurnOn({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  return (
    <div data-lasttool={lastTool} style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '36px', width: 540, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', fontFamily: 'var(--font-sans)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Live game help · U12 Sam</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: INK, marginBottom: 16 }}>Turn on for U12 Sam?</div>

        <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 10, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: INK }}>During a game Sam will see who has played least, when a player reaches a sprint cap, and the team's numbers as they happen.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: MUT }}>Added to the club's bill on 1 July. Turn it off any day and it stops that day.</div>
          <div style={{ fontSize: 13, color: MUT }}>Sam and Jess are told it is on. Sam asked for it on 2 June: "We have a tight run of games."</div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={() => onNav?.('PRM1-FeaturesByTeam')} style={{ height: 44, padding: '0 24px', background: '#fff', color: INK, border: `1.5px solid ${LN}`, borderRadius: 8, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Not now</button>
          <button onClick={() => tool('On for U12 Sam from today. Sam and Jess have been told.')} style={{ height: 44, padding: '0 24px', background: GD, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Turn on, $15 a month</button>
        </div>
      </div>
    </div>
  )
}
