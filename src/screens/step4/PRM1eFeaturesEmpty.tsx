import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PRM1eFeaturesEmpty({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const tnb: React.CSSProperties = { height: 56, padding: '0 10px', background: 'none', color: 'rgba(255,255,255,0.75)', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }
  const snb: React.CSSProperties = { height: 44, padding: '0 14px', background: 'none', color: MUT, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f4f6f5', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <nav style={{ background: GD, height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        <button onClick={() => tool('Club › Overview')} style={tnb}>Club</button>
        <button onClick={() => tool('Teams')} style={tnb}>Teams</button>
        <button onClick={() => tool('Coaches')} style={tnb}>Coaches</button>
        <button onClick={() => tool('Players')} style={tnb}>Players</button>
        <button onClick={() => tool('Safeguarding')} style={tnb}>Safeguarding</button>
        <button onClick={() => tool('Reports › Board report')} style={tnb}>Reports</button>
        <button onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button onClick={() => tool('switcher')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>Whole club</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>RM</div>
      </nav>
      {/* Club sub-nav */}
      <nav style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button onClick={() => tool('Club › Overview')} style={snb}>Overview</button>
        <button onClick={() => onNav?.('MSG4-DirectorMessages')} style={snb}>Messages</button>
        <button onClick={() => tool('Club › Calendar')} style={snb}>Calendar</button>
        <button onClick={() => tool('D7-SeasonPlan')} style={snb}>Season plan</button>
        <button onClick={() => tool('D8-ClubStyle')} style={snb}>Playing style</button>
        <button onClick={() => onNav?.('FIL5-ClubFiles')} style={snb}>Files</button>
        <button onClick={() => onNav?.('PRM1-FeaturesByTeam')} style={{ ...snb, color: G, fontWeight: 700, borderBottom: `2px solid ${G}`, height: 44 }}>Features and billing</button>
      </nav>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 60px' }}>
        <div style={{ width: 68, height: 68, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: INK, marginBottom: 6 }}>Wattle Creek FC · no teams yet</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>Add a team to choose what it gets</div>
        <div style={{ fontSize: 14, color: MUT, maxWidth: 500, textAlign: 'center' as const, lineHeight: 1.7, marginBottom: 24 }}>
          Every team starts with what is in your club plan. You turn add-ons on team by team, and pay only for the teams that have them.
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px 24px', maxWidth: 500, width: '100%', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>How it works</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <div style={{ fontSize: 13, color: MUT }}>Coaches can ask. Only you and people you name can turn things on</div>
            <div style={{ fontSize: 13, color: MUT }}>For example, live help from under 13 up</div>
            <div style={{ fontSize: 13, color: MUT }}>Off today means not charged tomorrow</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {/* Add a team [nth=1, existing → Teams] */}
          <button onClick={() => tool('Teams')} style={{ height: 44, padding: '0 28px', background: G, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Add a team</button>
          {/* See what is in the plan [nth=1, change] */}
          <button onClick={() => tool('Record and review, Ask Clean Sheet, Files and Messages are in the club plan.')} style={{ height: 44, padding: '0 24px', background: '#fff', color: G, border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>See what is in the plan</button>
        </div>
      </div>
    </div>
  )
}
