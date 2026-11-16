import { useState } from 'react'
import TeamSheetBody, { type TeamSheetConfig } from './TeamSheetBody'

const G = '#2f6252', GD = '#1f4a3e', MUT = '#4a5a57', LN = '#e8edeb'

const FIL2_CFG: TeamSheetConfig = {
  title: 'Summer sevens · team sheets',
  subtitle: 'Sheet · saved just now · 3 people can edit · shared with U12 Sam families',
  shareLabel: 'Share',
  editors: [{ ini: 'SK', bg: '#7a9e7e' }, { ini: 'JM', bg: '#c09050' }, { ini: 'RO', bg: '#e0a0a0' }],
  gameCols: [
    { label: 'Game 1', sub: '9:00 · Glenview' },
    { label: 'Game 2', sub: '10:10 · Ironbark' },
    { label: 'Game 3', sub: '11:20 · Northgate' },
    { label: 'Game 4', sub: '12:30 · Tealside' },
  ],
  rows: [
    { row: 1, jersey: 7,  name: 'Isla Morgan', spot: 'Mid', games: ['start',  'start',  'bench',  'start']  },
    { row: 2, jersey: 4,  name: 'Ella Brandt',  spot: 'Def', games: ['start',  'bench',  'start',  'ingoal'] },
    { row: 3, jersey: 9,  name: 'Finn Walsh',   spot: 'Fwd', games: ['bench',  'start',  'start',  'start']  },
    { row: 4, jersey: 5,  name: 'Grace Owusu',  spot: 'Def', games: ['start',  'start',  'start',  'bench'],  notes: 'Captain, game 1' },
    { row: 5, jersey: 11, name: 'Jai Patel',    spot: 'Fwd', games: ['bench',  'start',  'start',  'start']  },
    { row: 6, jersey: 8,  name: 'Mia Tran',     spot: 'Mid', games: ['start',  'bench',  'start',  'start']  },
    { row: 7, jersey: 6,  name: 'Noah Okafor',  spot: 'Mid', games: ['start',  'start',  'bench',  'start'],  notes: 'Sprint cap: 12' },
    { row: 8, jersey: 1,  name: 'Ava Lindqvist', spot: 'GK',  games: ['ingoal', 'start',  'ingoal', 'start']  },
    { row: 9, jersey: 3,  name: 'Zoe Hartley',  spot: 'Def', games: ['start',  'ingoal', 'start',  'bench']  },
  ],
  initialSheets: ['Team sheets', 'Contacts', 'Kit sizes'],
  footerNote: '9 players · 4 games · Sat 13 Dec, Banksia Park',
  checks: [
    { icon: 'check', title: '7 on the pitch each game', sub: 'One in goal every time' },
    { icon: 'check', title: 'Nobody benched twice in a row', sub: '' },
    { icon: 'check', title: 'A turn in goal for everyone', sub: 'One in goal every game' },
    { icon: 'lock',  title: '2 players not on the sheet', sub: 'Kai and Lily are away' },
  ],
  warn: { player: 'Ava Lindqvist', swapWith: 'Zoe Hartley', title: 'Ava plays every game', body: '60 minutes; everyone else has 45. Rest her in game 3?', game: 2 },
  dataNote: "Player, Spot and Minutes come from your squad and this sheet's own choices. Change the squad and they change here.",
}

export default function FIL2Sheet({ onBack, onShare, onNav, bare }: {
  onBack?: () => void
  onShare?: () => void
  onNav?: (s: string) => void
  bare?: boolean
}) {
  const [lastTool, setLastTool] = useState('')
  function tool(name: string) { setLastTool(name) }

  const NavBtn = ({ label, target }: { label: string; target: string }) => (
    <button onClick={() => onNav?.(target)} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, padding: '0 10px', display: 'flex', alignItems: 'center', background: 'none', border: 'none', fontFamily: 'inherit' }}>{label}</button>
  )

  const SubBtn = ({ label, target }: { label: string; target: string }) => (
    <button onClick={() => onNav?.(target)} style={{ height: 44, minWidth: 44, padding: '0 4px', display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: label === 'Files' ? 700 : 500, color: label === 'Files' ? G : MUT, cursor: 'pointer', background: 'none', border: 'none', borderBottom: label === 'Files' ? `2px solid ${G}` : '2px solid transparent', fontFamily: 'inherit' }}>{label}</button>
  )

  return (
    <div data-screen="FIL2-Sheet" data-lasttool={lastTool} style={{ width: bare ? '100%' : 1180, height: bare ? '100%' : 820, flex: bare ? 1 : undefined, minHeight: bare ? 0 : undefined, background: '#f7f8f7', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {!bare && (<>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 20, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <NavBtn label="Home"      target="PH1-HomeJuniorsSame" />
        <NavBtn label="Squad"     target="PH1-HomeJuniorsSame" />
        <NavBtn label="Training"  target="PH1-HomeJuniorsSame" />
        <NavBtn label="Match day" target="PH1-HomeJuniorsSame" />
        <NavBtn label="Clips"     target="PH1-HomeJuniorsSame" />
        <NavBtn label="Record"    target="REC1-RecordHub" />
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', gap: 6, background: 'none', fontFamily: 'inherit' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </button>
          <button onClick={() => onNav?.('PH1-HomeJuniorsSame')} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', background: 'none', fontFamily: 'inherit' }}>U12 Sam</button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 28px', display: 'flex', gap: 16, height: 44, alignItems: 'center', flexShrink: 0 }}>
        <SubBtn label="Overview"           target="PH1-HomeJuniorsSame" />
        <SubBtn label="Messages"           target="PH1-HomeJuniorsSame" />
        <SubBtn label="Calendar"           target="PH1-HomeJuniorsSame" />
        <SubBtn label="Fixtures and results" target="PH1-HomeJuniorsSame" />
        <SubBtn label="Our style"          target="PH1-HomeJuniorsSame" />
        <SubBtn label="Where we're at"     target="WA1-WhereWeAt" />
        <SubBtn label="Team staff"         target="PH1-HomeJuniorsSame" />
        <SubBtn label="Files"              target="FIL1-Files" />
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>
      </>)}

      <TeamSheetBody cfg={FIL2_CFG} onBack={onBack} onShare={onShare} onTool={tool} />
    </div>
  )
}
