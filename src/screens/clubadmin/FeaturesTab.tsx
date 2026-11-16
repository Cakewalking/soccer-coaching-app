import { useState } from 'react'
import { DARK, AMBER, PALEON, INK } from '../step4/directorParts'
import PRM1FeaturesByTeam from '../step4/PRM1FeaturesByTeam'
import PRM2TurnOn from '../step4/PRM2TurnOn'
import PRM3Bill from '../step4/PRM3Bill'
import PRM6Usage from '../step4/PRM6Usage'

const LN = '#e8edeb'

export default function FeaturesTab({ onNav }: { onNav?: (s: string) => void }) {
  // Prefer the frame's router; when there isn't one (e.g. rendered on its own),
  // fall back to opening the PRM boards inline so the buttons always work.
  const [inner, setInner] = useState<string | null>(null)
  const go = (id: string) => { if (onNav) onNav(id); else setInner(id) }

  if (inner === 'PRM1-FeaturesByTeam') return <PRM1FeaturesByTeam onNav={go} />
  if (inner === 'PRM2-TurnOn') return <PRM2TurnOn onNav={go} />
  if (inner === 'PRM3-Bill') return <PRM3Bill onNav={go} />
  if (inner === 'PRM6-Usage') return <PRM6Usage onNav={go} />

  return (
    <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 400 }}>
      <div style={{ width: 520, background: DARK, border: `1px solid ${LN}`, borderRadius: 20, padding: 32, textAlign: 'center', color: '#fff' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: AMBER, textTransform: 'uppercase', marginBottom: 8 }}>Features and billing</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Wattle Creek FC · you are the billing owner</div>
        <div style={{ fontSize: 14, color: PALEON, lineHeight: 1.6, marginBottom: 24 }}>
          Turn add-ons on team by team and see your bill.
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Features by team', nav: 'PRM1-FeaturesByTeam', main: true },
            { label: "This month's bill", nav: 'PRM3-Bill' },
            { label: 'Is it being used?', nav: 'PRM6-Usage' },
          ].map(btn => (
            <button key={btn.label} onClick={() => go(btn.nav)}
              style={{ height: 46, padding: '0 20px', borderRadius: 12, border: btn.main ? `1px solid ${AMBER}` : `1px solid ${PALEON}`, background: btn.main ? AMBER : 'transparent', color: btn.main ? INK : '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {btn.label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          {[
            { n: '1', title: 'You decide, not the coach', desc: 'Coaches can ask. Only you and people you name can turn things on' },
            { n: '2', title: 'By team or by age group', desc: 'For example, live help from under 13 up' },
            { n: '3', title: 'Charged by the day', desc: 'Off today means not charged tomorrow' },
          ].map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12, textAlign: 'left' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: AMBER, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{item.title}</div>
                <div style={{ fontSize: 12, color: PALEON }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
