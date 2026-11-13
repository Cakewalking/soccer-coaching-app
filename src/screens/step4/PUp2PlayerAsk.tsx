import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PUp2PlayerAsk({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const players = [
    { code: 'AW', label: 'AW Ava', name: 'Ava', target: 'Ava: taken off.' },
    { code: 'BK', label: 'BK Bella', name: 'Bella', target: 'Bella: taken off.' },
    { code: 'CH', label: 'CH Chloe', name: 'Chloe', target: 'Chloe: picked.' },
    { code: 'DS', label: 'DS Dani', name: 'Dani', target: 'Dani: taken off.' },
    { code: 'EM', label: 'EM Evie', name: 'Evie', target: 'Evie: picked.' },
    { code: 'FR', label: 'FR Frankie', name: 'Frankie', target: 'Frankie: taken off.' },
    { code: 'HN', label: 'HN Hana', name: 'Hana', target: 'Hana: picked.' },
  ]

  return (
    <div data-lasttool={lastTool} style={{ width: 390, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button aria-label="Back" onClick={() => onNav?.('PUp1-ParentAsk')} style={{ height: 44, padding: '0 12px', background: 'none', color: G, border: 'none', fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Back</button>
        <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Clean Sheet</div>
        <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKp2-PhoneAskOpen')} style={{ height: 44, padding: '0 12px', background: 'none', color: G, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Clean Sheet</button>
      </div>

      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: INK, marginBottom: 4 }}>Training with the under 13s</div>
          <div style={{ fontSize: 13, color: MUT }}>Mia, a few questions for you</div>
        </div>

        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Who do you know in that team?</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>Tap anyone you'd be happy to pair up with. It's fine to pick nobody.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
            {players.map(p => (
              <button key={p.code} aria-label={p.label} onClick={() => tool(p.target)} style={{ height: 44, padding: '0 16px', background: PALE, color: G, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{p.label}</button>
            ))}
            <button aria-label="+7 More" onClick={() => tool('More: picked.')} style={{ height: 44, padding: '0 16px', background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>+7 More</button>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>How do you feel about trying it?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
            {(['Can\'t wait', 'A bit nervous', 'Not sure'] as const).map(label => (
              <button key={label} aria-label={label} onClick={() => tool(label + '.')} style={{ height: 44, padding: '0 16px', background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 22, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>{label}</button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>Anything you want Sam or Meg to know?</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px', marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: MUT, fontStyle: 'italic' }}>Type here (optional)</div>
          </div>
          <div style={{ fontSize: 12, color: MUT }}>Only Sam, Meg and Rachel see this. The girls you pick are not told.</div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button aria-label="Skip" onClick={() => tool('Skipped. You can answer later.')} style={{ height: 56, flex: 1, background: '#fff', color: MUT, border: `1px solid ${LN}`, borderRadius: 12, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Skip</button>
          <button aria-label="Send" onClick={() => tool('Thanks, Mia. Meg will pair you with Ava on Tuesday.')} style={{ height: 56, flex: 2, background: G, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send</button>
        </div>
      </div>
    </div>
  )
}
