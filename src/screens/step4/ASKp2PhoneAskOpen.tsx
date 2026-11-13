import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const SUGGESTIONS = [
  'What does Mia need for Saturday?',
  "What time does Mia's game start?",
  'What should Mia bring on Saturday?',
] as const

export default function ASKp2PhoneAskOpen({ onNav: _onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  return (
    <div data-screen="ASKp2-PhoneAskOpen" data-lasttool={lastTool} style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }}>
      <div style={{ background: GD, padding: '14px 20px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 800, color: '#fff' }}>Ask Clean Sheet</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>M</div>
      </div>
      <div style={{ flex: 1, padding: '16px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 44, borderRadius: 10, background: '#fff', border: `1.5px solid ${G}`, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 13, color: MUT }}>Ask about Mia…</div>
          <button onClick={() => tool('Send')} style={{ height: 44, minWidth: 44, padding: '0 16px', borderRadius: 10, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
        </div>
        <div style={{ fontSize: 12, color: MUT, marginBottom: 10, padding: '8px 10px', background: '#fff', borderRadius: 8, border: `1px solid ${LN}` }}>
          Uses only what Mia's team shares with parents. Never sends anything by itself.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SUGGESTIONS.map(q => (
            <button key={q} onClick={() => tool(q)} style={{ height: 44, textAlign: 'left', padding: '0 14px', borderRadius: 10, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>{q}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
