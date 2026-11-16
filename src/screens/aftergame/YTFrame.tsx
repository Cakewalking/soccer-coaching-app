import type { ReactNode } from 'react'
import { OpeningPanel, type Figure, type PanelBtn, GREEN, INK, MUT, HAIR } from '../step4/directorParts'

const GD = '#1f4a3e'

export type YTPill = 'take' | 'report' | 'players' | 'awards'
const PILLS: { id: YTPill; label: string; target: string }[] = [
  { id: 'take',    label: 'Your take',                  target: 'YT1-YourTake' },
  { id: 'report',  label: 'Match report',               target: 'YT2-MatchReport' },
  { id: 'players', label: 'Players: notes and ratings', target: 'YT3-PlayerNotes' },
  { id: 'awards',  label: 'Ratings and awards',         target: 'YT4-VotesAwards' },
]

// Shared coach-frame chrome for the four tablet "Your take" boards.
export default function YTFrame({ onNav, active, heading, sentence, support, figures, buttons, children, lastTool, screenId }: {
  onNav?: (s: string) => void
  active: YTPill
  heading: string; sentence: string; support?: string
  figures?: Figure[]; buttons?: PanelBtn[]
  children: ReactNode
  lastTool?: string
  screenId?: string
}) {
  const tnb = { height: 44, padding: '0 10px', background: 'none' as const, color: 'rgba(255,255,255,0.75)', border: 'none' as const, fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }
  const tnbOn = { ...tnb, color: '#fff', fontWeight: 700 as const }
  const snb = { height: 44, padding: '0 2px', background: 'none' as const, color: MUT, border: 'none' as const, borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 600, cursor: 'pointer' as const, fontFamily: 'inherit', minWidth: 44 }
  const snbOn = { ...snb, color: GREEN, fontWeight: 700 as const, borderBottom: `2px solid ${GREEN}` }

  return (
    <div data-screen={screenId ?? PILLS.find(p => p.id === active)?.target} data-lasttool={lastTool ?? ''} style={{ width: 1180, height: 820, overflow: 'hidden', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginRight: 6 }}>Clean Sheet</div>
        <button onClick={() => onNav?.('T1-TabletTraining')} style={tnb}>Home</button>
        <button onClick={() => onNav?.('T4-SquadTab')} style={tnb}>Squad</button>
        <button onClick={() => onNav?.('T3-TrainingTab')} style={tnb}>Training</button>
        <button onClick={() => onNav?.('T2-TabletMatch')} style={tnbOn}>Match day</button>
        <button onClick={() => onNav?.('C1-ClipsTab')} style={tnb}>Clips</button>
        <button onClick={() => onNav?.('REC1-RecordHub')} style={tnb}>Record</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </button>
          <button onClick={() => onNav?.('VS1-SwitchView')} style={{ height: 40, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', background: 'none', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>U12 Sam ▾</button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${HAIR}`, padding: '0 28px', display: 'flex', gap: 22, height: 44, alignItems: 'center', flexShrink: 0 }}>
        <button onClick={() => onNav?.('T2-TabletMatch')} style={snb}>Team talk</button>
        <button onClick={() => onNav?.('T2-TabletMatch')} style={snb}>Line-up and minutes</button>
        <button onClick={() => onNav?.('OP1-Opposition')} style={snb}>Opposition</button>
        <button onClick={() => onNav?.('R1-MatchReview')} style={snb}>Review</button>
        <button onClick={() => onNav?.('YT1-YourTake')} style={snbOn}>Your take</button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>

      <OpeningPanel landing heading={heading} sentence={sentence} support={support} figures={figures} buttons={buttons} />

      {/* Pills */}
      <div style={{ flex: 'none', padding: '12px 28px 0', display: 'flex', gap: 8 }}>
        {PILLS.map(p => (
          <button key={p.id} onClick={() => onNav?.(p.target)} style={{ height: 40, padding: '0 16px', borderRadius: 999, border: `1px solid ${p.id === active ? GD : '#c5c8c4'}`, background: p.id === active ? GD : '#fff', color: p.id === active ? '#fff' : INK, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{p.label}</button>
        ))}
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 18px', boxSizing: 'border-box', overflow: 'hidden' }}>
        {children}
      </main>
    </div>
  )
}
