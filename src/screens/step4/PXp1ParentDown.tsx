import { useState } from 'react'
import { toolTarget } from '../toolTargets'
import { DARK, AMBER, PALEON } from './directorParts'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

export default function PXp1ParentDown({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { const to = toolTarget(name); if (to && onNav) { onNav(to); return } setLastTool(name) }

  return (
    <div data-lasttool={lastTool} style={{ width: 390, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button aria-label="Back" onClick={() => onNav?.('ASKd8-PhoneHome')} style={{ height: 44, padding: '0 12px', background: 'none', color: G, border: 'none', fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Back</button>
        <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Clean Sheet</div>
        <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKp2-PhoneAskOpen')} style={{ height: 44, padding: '0 12px', background: 'none', color: G, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Clean Sheet</button>
      </div>

      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: INK, marginBottom: 6 }}>Would Eli like Thursdays with the under 13s?</div>
          <div style={{ fontSize: 13, color: MUT }}>From U14 Josh's coach</div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
          <div style={{ fontSize: 13, color: INK, fontStyle: 'italic' }}>"Eli is one of our best on the ball. He is growing later than most of his year, which is normal, and right now games are a battle of size. We'd like him to have one night a week where he can play his game." Josh</div>
        </div>

        <div style={{ background: DARK, borderRadius: 12, padding: '18px 16px', color: '#fff' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: AMBER, marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>What this means</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 14, color: '#fff', lineHeight: 1.5 }}>Thursdays with U13 Chris for 6 weeks, 5:30 to 6:45.</div>
            <div style={{ fontSize: 14, color: PALEON, lineHeight: 1.5 }}>He stays an under 14. Tuesdays and Saturdays don't change.</div>
            <div style={{ fontSize: 14, color: PALEON, lineHeight: 1.5 }}>Players who grow late usually catch up at 15 to 17. This is about keeping football fun until then. He knows five of that group from last year.</div>
          </div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '16px' }}>
          <div style={{ fontSize: 12, color: MUT }}>Nothing changes unless you and Eli both say yes.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
          <button aria-label="Yes, we'd like to" onClick={() => tool('Thanks. Chris will say hello before Thursday.')} style={{ height: 56, background: AMBER, color: INK, border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Yes, we'd like to</button>
          <button aria-label="Not for now" onClick={() => tool('Thanks. Nothing changes. Josh and Rachel have been told.')} style={{ height: 56, background: '#fff', color: INK, border: `1px solid ${LN}`, borderRadius: 12, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' }}>Not for now</button>
        </div>
      </div>
    </div>
  )
}
