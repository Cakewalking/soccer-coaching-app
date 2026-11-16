import { useState } from 'react'
import { MUT, HAIR, GREEN, PALEGREEN } from './directorParts'
import PlayingAcrossBody from './PlayingAcrossBody'

function DirFrame({ onNav, tool }: { onNav?: (s: string) => void; tool: (n: string) => void }) {
  const tnb = { height: 56, padding: '0 10px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snb = { height: 44, padding: '0 14px', background: 'none' as const, color: MUT, border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', flexShrink: 0 as const }
  const snba = { ...snb, color: GREEN, fontWeight: 700, borderBottom: `2.5px solid ${GREEN}` }
  return (
    <>
      <nav style={{ background: '#1f4a3e', height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</span>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => <button key={t} onClick={() => tool(t)} style={tnb}>{t}</button>)}
        <button onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ ...tnb, background: 'rgba(255,255,255,0.12)' as const }}>Ask Clean Sheet</button>
        <div style={{ flex: 1 }} />
        <button onClick={() => onNav?.('VS1-SwitchView')} style={{ height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', borderRadius: 22, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12, flexShrink: 0 }}>Whole club</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>RM</div>
      </nav>
      <nav style={{ background: '#fff', borderBottom: `1px solid ${HAIR}`, height: 44, display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
        <button onClick={() => tool('All players')} style={snb}>All players</button>
        <button onClick={() => onNav?.('DP1-Pathway')} style={snb}>Pathway</button>
        <button onClick={() => onNav?.('PU1-PlayingUp')} style={snba}>Playing across</button>
        <button onClick={() => tool('Fair game time')} style={snb}>Fair game time</button>
        <div style={{ flex: 1 }} />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: PALEGREEN, color: GREEN, fontSize: 13, fontWeight: 700 }}>Director of football</span>
      </nav>
    </>
  )
}

// Standalone Playing-across board: the director frame + the shared body
// (PlayingAcrossBody is the single source, also used by the in-frame PlayersTab).
export default function PU1PlayingUp({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }
  return (
    <div data-screen="PU1-PlayingUp" data-lasttool={lastTool} style={{ width: 1180, height: 820, overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <DirFrame onNav={onNav} tool={tool} />
      <PlayingAcrossBody onNav={onNav} tabTargets={{ up: 'PU1-PlayingUp', down: 'PX1-PlayingDown', mixed: 'PX3-BandedNight' }} />
    </div>
  )
}
