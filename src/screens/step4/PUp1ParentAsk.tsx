import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PUp1ParentAsk({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  return (
    <div data-lasttool={lastTool} style={{ width: 390, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button aria-label="Back" onClick={() => onNav?.('ASKd8-PhoneHome')} style={{ height: 44, padding: '0 12px', background: 'none', color: G, border: 'none', fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Back</button>
        <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Clean Sheet</div>
        <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKp2-PhoneAskOpen')} style={{ height: 44, padding: '0 12px', background: 'none', color: G, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Clean Sheet</button>
      </div>

      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: INK, marginBottom: 6 }}>Would Mia like to train with the under 13s?</div>
          <div style={{ fontSize: 13, color: MUT }}>From U12 Sam's coach</div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
          <div style={{ fontSize: 13, color: INK, fontStyle: 'italic', marginBottom: 2 }}>"Mia has found games easy for a couple of months. We think a harder session once a week would be good for her." Sam</div>
        </div>

        <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>What this means</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 13, color: INK }}>Tuesdays with U13 Girls Meg for 4 weeks, 5:30 to 6:45.</div>
            <div style={{ fontSize: 13, color: INK }}>We all look again on 2 July. Going back is fine.</div>
            <div style={{ fontSize: 13, color: INK }}>It only works if she wants to. She knows Ava and three others in that team.</div>
          </div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
          <div style={{ fontSize: 12, color: MUT }}>Nothing changes unless you both say yes. Saying no changes nothing for Mia.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
          <button aria-label="Yes, we'd like to" onClick={() => tool('Thanks. Meg will say hello before Tuesday.')} style={{ height: 56, background: G, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Yes, we'd like to</button>
          <button aria-label="Not for now" onClick={() => tool('Thanks. Nothing changes. Sam and Rachel have been told.')} style={{ height: 56, background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 12, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' }}>Not for now</button>
        </div>
      </div>
    </div>
  )
}
