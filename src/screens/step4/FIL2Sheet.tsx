import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type PlayStatus = 'start' | 'bench' | 'ingoal'
type ViewType = 'table' | 'lineup' | 'print'
type PanelTab = 'Checks' | 'Comments' | 'Data'

const GAME_COLS = [
  { label: 'Game 1', sub: '9:00 · Glenview' },
  { label: 'Game 2', sub: '10:10 · Ironbark' },
  { label: 'Game 3', sub: '11:20 · Northgate' },
  { label: 'Game 4', sub: '12:30 · Tealside' },
]

type PlayerRow = { row: number; jersey: number; name: string; spot: string; games: PlayStatus[]; notes?: string }

const INITIAL_ROWS: PlayerRow[] = [
  { row: 1, jersey: 7,  name: 'Ava Walsh',   spot: 'Mid', games: ['start',  'start',  'bench',  'start']  },
  { row: 2, jersey: 4,  name: 'Ella Brandt',  spot: 'Def', games: ['start',  'bench',  'start',  'ingoal'] },
  { row: 3, jersey: 9,  name: 'Finn Noble',   spot: 'Fwd', games: ['bench',  'start',  'start',  'start']  },
  { row: 4, jersey: 5,  name: 'Grace Reid',   spot: 'Def', games: ['start',  'start',  'start',  'bench'],  notes: 'Captain, game 1' },
  { row: 5, jersey: 11, name: 'Jai Patel',    spot: 'Fwd', games: ['bench',  'start',  'start',  'start']  },
  { row: 6, jersey: 8,  name: 'Mia Tran',     spot: 'Mid', games: ['start',  'bench',  'start',  'start']  },
  { row: 7, jersey: 6,  name: 'Noah Okafor',  spot: 'Mid', games: ['start',  'start',  'bench',  'start'],  notes: 'Sprint cap: 12' },
  { row: 8, jersey: 1,  name: 'Ruby Lane',    spot: 'GK',  games: ['ingoal', 'start',  'ingoal', 'start']  },
  { row: 9, jersey: 3,  name: 'Zoe Hartley',  spot: 'Def', games: ['start',  'ingoal', 'start',  'bench']  },
]

function minsFor(games: PlayStatus[]) { return games.reduce((s, g) => s + (g !== 'bench' ? 15 : 0), 0) }

function Pill({ status }: { status: PlayStatus }) {
  const bench = status === 'bench'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      height: 28, padding: '0 12px', borderRadius: 999,
      background: bench ? 'transparent' : GD,
      border: bench ? `1.5px solid ${LN}` : 'none',
      fontSize: 12, fontWeight: 600,
      color: bench ? INK : '#fff',
    }}>
      {status === 'start' ? 'Start' : status === 'ingoal' ? 'In goal' : 'Bench'}
    </span>
  )
}

export default function FIL2Sheet({ onBack, onShare, onNav }: {
  onBack?: () => void
  onShare?: () => void
  onNav?: (s: string) => void
}) {
  const [view, setView]           = useState<ViewType>('table')
  const [panelTab, setPanelTab]   = useState<PanelTab>('Checks')
  const [sheets, setSheets]       = useState(['Team sheets', 'Contacts', 'Kit sizes'])
  const [activeTab, setActiveTab] = useState('Team sheets')
  const [lastTool, setLastTool]   = useState('')
  const [rows, setRows]           = useState<PlayerRow[]>(INITIAL_ROWS)
  const [sel, setSel]             = useState<{ ri: number; ci: number }>({ ri: 7, ci: 2 })

  function tool(name: string) { setLastTool(name) }

  function cycleCell(ri: number, ci: number) {
    const colLetter = ['C', 'D', 'E', 'F'][ci]
    tool(`${colLetter}${ri + 1}`)
    setSel({ ri, ci })
    setRows(prev => prev.map((r, i) => {
      if (i !== ri) return r
      const g = [...r.games]
      g[ci] = g[ci] === 'start' ? 'ingoal' : g[ci] === 'ingoal' ? 'bench' : 'start'
      return { ...r, games: g }
    }))
  }

  function handleSwap() {
    tool('Swap for me')
    setRows(prev => prev.map(r => {
      if (r.name === 'Ruby Lane')   { const g = [...r.games]; g[2] = 'bench';  return { ...r, games: g } }
      if (r.name === 'Zoe Hartley') { const g = [...r.games]; g[2] = 'ingoal'; return { ...r, games: g } }
      return r
    }))
  }

  function addSheet() {
    const name = `Sheet ${sheets.length - 1}`
    setSheets(prev => [...prev, name])
    setActiveTab(name)
    tool('+ Sheet')
  }

  const rubyRow   = rows.find(r => r.name === 'Ruby Lane')!
  const rubyWarning = minsFor(rubyRow.games) > 45

  const selLabel = sel ? (rows[sel.ri].games[sel.ci] === 'start' ? 'Start' : rows[sel.ri].games[sel.ci] === 'ingoal' ? 'In goal' : 'Bench') : 'Start'
  const selRef   = sel ? `${['C', 'D', 'E', 'F'][sel.ci]}${sel.ri + 1}` : 'E8'

  const isActive = (v: ViewType, label: string) =>
    (v === 'table' && label === 'Table') || (v === 'lineup' && label === 'Line-up') || (v === 'print' && label === 'Print')

  const NavBtn = ({ label, target }: { label: string; target: string }) => (
    <button onClick={() => onNav?.(target)} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, padding: '0 10px', display: 'flex', alignItems: 'center', background: 'none', border: 'none', fontFamily: 'inherit' }}>{label}</button>
  )

  const SubBtn = ({ label, target }: { label: string; target: string }) => (
    <button onClick={() => onNav?.(target)} style={{ height: 44, minWidth: 44, padding: '0 4px', display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: label === 'Files' ? 700 : 500, color: label === 'Files' ? G : MUT, cursor: 'pointer', background: 'none', border: 'none', borderBottom: label === 'Files' ? `2px solid ${G}` : '2px solid transparent', fontFamily: 'inherit' }}>{label}</button>
  )

  return (
    <div data-screen="FIL2-Sheet" data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>

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

      {/* Document header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 12, height: 56, flexShrink: 0 }}>
        <button aria-label="Back to Files" onClick={onBack} style={{ width: 32, height: 32, borderRadius: '50%', background: LN, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Summer sevens · team sheets</div>
          <div style={{ fontSize: 11, color: MUT }}>Sheet · saved just now · 3 people can edit · shared with U12 Sam families</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex' }}>
            {[{ ini: 'SK', bg: '#7a9e7e' }, { ini: 'JM', bg: '#c09050' }, { ini: 'RO', bg: '#e0a0a0' }].map((a, i) => (
              <div key={a.ini} style={{ width: 28, height: 28, borderRadius: '50%', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', marginLeft: i > 0 ? -8 : 0, border: '2px solid #fff', zIndex: 3 - i, position: 'relative' }}>{a.ini}</div>
            ))}
          </div>
          <button onClick={() => tool('History')}  style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>History</button>
          <button onClick={() => tool('Download')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Download</button>
          <button onClick={() => onShare?.()}      style={{ height: 44, padding: '0 16px', borderRadius: 999, background: GD, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 16px', display: 'flex', gap: 2, height: 44, alignItems: 'center', flexShrink: 0 }}>
        <button aria-label="Undo" onClick={() => tool('Undo')} style={{ minHeight: 44, minWidth: 44, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><path d="M3 7v6h6"/><path d="M3 13C5.6 7.8 11 5 16 6.5a9 9 0 015 8"/></svg>
        </button>
        <button aria-label="Redo" onClick={() => tool('Redo')} style={{ minHeight: 44, minWidth: 44, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><path d="M21 7v6h-6"/><path d="M21 13C18.4 7.8 13 5 8 6.5a9 9 0 00-5 8"/></svg>
        </button>
        <div style={{ width: 1, height: 20, background: LN, margin: '0 6px', flexShrink: 0 }} />
        <button onClick={() => tool('Choice')} style={{ minHeight: 44, padding: '0 10px', borderRadius: 6, border: `1px solid ${LN}`, background: lastTool === 'Choice' ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === 'Choice' ? G : INK, display: 'flex', alignItems: 'center', gap: 4 }}>
          Choice
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <button onClick={() => tool('B')} style={{ minHeight: 44, minWidth: 44, borderRadius: 6, border: `1px solid ${LN}`, background: lastTool === 'B' ? PALE : '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === 'B' ? G : INK }}>B</button>
        <button aria-label="Fill colour" onClick={() => tool('Fill colour')} style={{ minHeight: 44, minWidth: 44, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </button>
        <button aria-label="Align" onClick={() => tool('Align')} style={{ minHeight: 44, minWidth: 44, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
        </button>
        <button aria-label="Filter" onClick={() => tool('Filter')} style={{ minHeight: 44, minWidth: 44, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        </button>
        <button aria-label="Sort" onClick={() => tool('Sort')} style={{ minHeight: 44, minWidth: 44, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="6 10 12 4 18 10"/><polyline points="6 14 12 20 18 14"/></svg>
        </button>
        <button aria-label="Comment" onClick={() => tool('Comment')} style={{ minHeight: 44, minWidth: 44, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        </button>
        <button onClick={() => tool('+ Column')} style={{ minHeight: 44, padding: '0 10px', borderRadius: 6, border: `1px solid ${LN}`, background: lastTool === '+ Column' ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === '+ Column' ? G : INK, whiteSpace: 'nowrap' }}>+ Column</button>
        <button onClick={() => tool('From Clean Sheet')} style={{ minHeight: 44, padding: '0 10px', borderRadius: 6, border: `1px solid ${LN}`, background: lastTool === 'From Clean Sheet' ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === 'From Clean Sheet' ? G : INK, whiteSpace: 'nowrap' }}>From Clean Sheet</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <div style={{ display: 'flex', border: `1.5px solid ${LN}`, borderRadius: 999, overflow: 'hidden' }}>
            {(['Table', 'Line-up', 'Print'] as const).map(v => (
              <button key={v} onClick={() => { setView(v === 'Table' ? 'table' : v === 'Line-up' ? 'lineup' : 'print'); tool(v) }} style={{ minHeight: 44, padding: '0 12px', background: isActive(view, v) ? PALE : '#fff', border: 'none', fontSize: 12, color: isActive(view, v) ? G : INK, fontWeight: isActive(view, v) ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Formula bar */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, height: 44, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: INK, background: PALE, padding: '2px 8px', borderRadius: 4 }}>{selRef}</span>
        <div style={{ width: 1, height: 16, background: LN, flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: MUT, whiteSpace: 'nowrap' }}>Choice:</span>
        {(['Start', 'In goal', 'Bench'] as const).map(c => (
          <span key={c} style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, background: c === selLabel ? GD : c === 'Bench' ? 'transparent' : 'transparent', border: (c !== selLabel && c === 'Bench') || (c !== selLabel) ? `1.5px solid ${LN}` : 'none', color: c === selLabel ? '#fff' : INK, whiteSpace: 'nowrap' }}>{c}</span>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, color: MUT, whiteSpace: 'nowrap' }}>Minutes = 15 for each Start or In goal</div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Main content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {view === 'table' && (
            <>
              <div style={{ flex: 1, overflowX: 'auto', overflowY: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', minWidth: '100%', tableLayout: 'fixed', width: 820 }}>
                  <colgroup>
                    <col style={{ width: 72 }} />  {/* row + jersey */}
                    <col style={{ width: 148 }} /> {/* A: Player */}
                    <col style={{ width: 70 }} />  {/* B: Spot */}
                    <col style={{ width: 100 }} /> {/* C: Game 1 */}
                    <col style={{ width: 100 }} /> {/* D: Game 2 */}
                    <col style={{ width: 100 }} /> {/* E: Game 3 */}
                    <col style={{ width: 100 }} /> {/* F: Game 4 */}
                    <col style={{ width: 72 }} />  {/* G: Minutes */}
                    <col />                        {/* H: Notes */}
                  </colgroup>
                  <thead>
                    {/* Column letter row */}
                    <tr style={{ background: '#f7f8f7' }}>
                      <td style={{ borderBottom: `1px solid ${LN}`, borderRight: `1px solid ${LN}` }} />
                      {['A','B','C','D','E','F','G','H'].map(l => (
                        <td key={l} style={{ padding: '3px 0', borderBottom: `1px solid ${LN}`, borderRight: `1px solid ${LN}`, fontSize: 10, color: MUT, textAlign: 'center', fontWeight: 600 }}>{l}</td>
                      ))}
                    </tr>
                    {/* Column name row */}
                    <tr style={{ background: '#f7f8f7' }}>
                      <td style={{ padding: '8px 10px', borderBottom: `2px solid ${LN}`, borderRight: `1px solid ${LN}` }} />
                      <td style={{ padding: '8px 10px', borderBottom: `2px solid ${LN}`, borderRight: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, color: MUT }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                          Player
                        </div>
                      </td>
                      <td style={{ padding: '8px 10px', borderBottom: `2px solid ${LN}`, borderRight: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, color: MUT }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                          Spot
                        </div>
                      </td>
                      {GAME_COLS.map(g => (
                        <td key={g.label} style={{ padding: '6px 10px', borderBottom: `2px solid ${LN}`, borderRight: `1px solid ${LN}` }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: MUT }}>{g.label}</div>
                          <div style={{ fontSize: 10, color: MUT }}>{g.sub}</div>
                        </td>
                      ))}
                      <td style={{ padding: '8px 10px', borderBottom: `2px solid ${LN}`, borderRight: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, color: MUT }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          Minutes
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="6 10 12 4 18 10"/><polyline points="6 14 12 20 18 14"/></svg>
                        </div>
                      </td>
                      <td style={{ padding: '8px 10px', borderBottom: `2px solid ${LN}`, fontSize: 11, fontWeight: 700, color: MUT }}>Notes</td>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, ri) => {
                      const mins = minsFor(r.games)
                      const isRuby = r.name === 'Ruby Lane'
                      const warn = isRuby && rubyWarning
                      return (
                        <tr key={r.name} style={{ background: ri % 2 === 0 ? '#fff' : '#fafafa', borderBottom: `1px solid ${LN}` }}>
                          <td style={{ padding: '8px 10px', borderRight: `1px solid ${LN}` }}>
                            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                              <span style={{ fontSize: 11, color: MUT, minWidth: 12, textAlign: 'right' }}>{r.row}</span>
                              <span style={{ fontSize: 11, color: MUT }}>{r.jersey}</span>
                            </div>
                          </td>
                          <td style={{ padding: '8px 10px', borderRight: `1px solid ${LN}`, fontSize: 13, fontWeight: 600, color: INK }}>{r.name}</td>
                          <td style={{ padding: '8px 10px', borderRight: `1px solid ${LN}`, fontSize: 13, color: MUT }}>{r.spot}</td>
                          {r.games.map((g, ci) => {
                            const isSel = sel?.ri === ri && sel?.ci === ci
                            return (
                              <td key={ci} onClick={() => cycleCell(ri, ci)} style={{ padding: '8px 10px', borderRight: `1px solid ${LN}`, cursor: 'pointer', background: isRuby && ci === 2 && rubyWarning ? '#fdf0f0' : undefined, outline: isSel ? `2px solid ${G}` : undefined, outlineOffset: isSel ? -2 : undefined }}>
                                <Pill status={g} />
                              </td>
                            )
                          })}
                          <td style={{ padding: '8px 10px', borderRight: `1px solid ${LN}`, fontSize: 13, fontWeight: 700, color: warn ? '#c04' : INK, background: warn ? '#fdf5f5' : undefined }}>{mins}</td>
                          <td style={{ padding: '8px 10px', fontSize: 12, color: MUT }}>{r.notes ?? ''}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: '#f7f8f7', borderTop: `2px solid ${LN}` }}>
                      <td colSpan={3} style={{ padding: '8px 10px', borderRight: `1px solid ${LN}`, fontSize: 12, fontWeight: 700, color: MUT }}>On the pitch</td>
                      {GAME_COLS.map((_, ci) => (
                        <td key={ci} style={{ padding: '8px 10px', borderRight: `1px solid ${LN}`, fontSize: 12, fontWeight: 700, color: INK }}>7 of 7</td>
                      ))}
                      <td style={{ padding: '8px 10px', borderRight: `1px solid ${LN}`, fontSize: 12, fontWeight: 700, color: INK }}>Avg 47</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Bottom tabs */}
              <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '0 16px', display: 'flex', alignItems: 'center', height: 52, gap: 4, flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: 2, overflowX: 'auto', scrollbarWidth: 'none' }}>
                  {sheets.map(t => (
                    <button key={t} onClick={() => { setActiveTab(t); tool(t) }} style={{ minHeight: 44, padding: '0 14px', borderRadius: '8px 8px 0 0', border: `1.5px solid ${LN}`, borderBottom: activeTab === t ? '1.5px solid #fff' : `1.5px solid ${LN}`, background: activeTab === t ? '#fff' : '#f7f8f7', fontSize: 12, color: activeTab === t ? INK : MUT, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>{t}</button>
                  ))}
                  <button onClick={addSheet} style={{ minHeight: 44, padding: '0 10px', borderRadius: '8px 8px 0 0', border: `1.5px solid ${LN}`, background: '#f7f8f7', fontSize: 12, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>+ Sheet</button>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 11, color: MUT, whiteSpace: 'nowrap', paddingLeft: 12 }}>9 players · 4 games · Sat 13 Dec, Banksia Park</div>
              </div>
            </>
          )}

          {view === 'lineup' && (
            <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Summer sevens · team sheets</div>
              <div style={{ background: GD, borderRadius: 12, padding: 24, maxWidth: 480, color: '#fff', textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, opacity: 0.75 }}>Game 1 · 9:00 · Glenview</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                  {rows.filter(r => r.games[0] !== 'bench').map(r => (
                    <div key={r.name} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 600 }}>{r.name.split(' ')[0]}</div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 2, marginTop: 'auto' }}>
                {sheets.map(t => (
                  <button key={t} onClick={() => { setActiveTab(t); tool(t) }} style={{ minHeight: 44, padding: '0 14px', borderRadius: '8px 8px 0 0', border: `1.5px solid ${LN}`, background: activeTab === t ? '#fff' : '#f7f8f7', fontSize: 12, color: activeTab === t ? INK : MUT, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>{t}</button>
                ))}
                <button onClick={addSheet} style={{ minHeight: 44, padding: '0 10px', borderRadius: '8px 8px 0 0', border: `1.5px solid ${LN}`, background: '#f7f8f7', fontSize: 12, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>+ Sheet</button>
              </div>
            </div>
          )}

          {view === 'print' && (
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 4 }}>Summer sevens · team sheets</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>Print layout · 9 players · 4 games · Sat 13 Dec, Banksia Park</div>
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: 16, fontSize: 12, color: MUT }}>Print preview</div>
              <div style={{ display: 'flex', gap: 2, marginTop: 16 }}>
                {['Team sheets', 'Contacts', 'Kit sizes'].map(t => (
                  <button key={t} onClick={() => { setActiveTab(t); tool(t) }} style={{ minHeight: 44, padding: '0 14px', borderRadius: '8px 8px 0 0', border: `1.5px solid ${LN}`, background: activeTab === t ? '#fff' : '#f7f8f7', fontSize: 12, color: activeTab === t ? INK : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
                ))}
                <button onClick={() => tool('+ Sheet')} style={{ minHeight: 44, padding: '0 10px', borderRadius: '8px 8px 0 0', border: `1.5px solid ${LN}`, background: '#f7f8f7', fontSize: 12, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>+ Sheet</button>
              </div>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div style={{ width: 240, borderLeft: `1px solid ${LN}`, background: '#fff', flexShrink: 0, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${LN}`, flexShrink: 0 }}>
            {(['Checks', 'Comments', 'Data'] as PanelTab[]).map(t => (
              <button key={t} onClick={() => { setPanelTab(t); tool(t) }} style={{ flex: 1, minHeight: 44, background: 'none', border: 'none', borderBottom: panelTab === t ? `2px solid ${G}` : '2px solid transparent', fontSize: 11, fontWeight: panelTab === t ? 700 : 500, color: panelTab === t ? G : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{t}</button>
            ))}
          </div>

          {panelTab === 'Checks' && (
            <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
              {/* Warning card */}
              <div style={{ background: '#fef9e8', border: `1px solid #f0d460`, borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 4 }}>Ruby plays every game</div>
                <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginBottom: 10 }}>60 minutes; everyone else has 45. Rest her in game 3?</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={handleSwap}         style={{ flex: 1, minHeight: 44, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Swap for me</button>
                  <button onClick={() => tool('Leave it')} style={{ flex: 1, minHeight: 44, borderRadius: 999, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Leave it</button>
                </div>
              </div>

              {/* Check items */}
              {[
                { icon: 'check', title: '7 on the pitch each game',    sub: 'One in goal every time' },
                { icon: 'check', title: 'Nobody benched twice',         sub: '' },
                { icon: 'check', title: 'Sprint caps respected',        sub: 'Noah: 3 games, not 4' },
                { icon: 'lock',  title: '2 players not on the sheet',   sub: 'Kai and Lily are away' },
              ].map(c => (
                <div key={c.title} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '8px 0', borderTop: `1px solid ${LN}` }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.icon === 'check' ? PALE : '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {c.icon === 'check'
                      ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    }
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>{c.title}</div>
                    {c.sub && <div style={{ fontSize: 11, color: MUT, lineHeight: 1.4 }}>{c.sub}</div>}
                  </div>
                </div>
              ))}

              {/* Green columns note */}
              <div style={{ marginTop: 'auto', padding: '10px 0 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: INK, marginBottom: 2 }}>Green columns are live</div>
                <div style={{ fontSize: 11, color: MUT, lineHeight: 1.5 }}>Player, Spot and Minutes come from your squad and this sheet&apos;s own choices. Change the squad and they change here.</div>
              </div>
            </div>
          )}

          {panelTab === 'Comments' && (
            <div style={{ flex: 1, padding: 12, fontSize: 12, color: MUT }}>No comments yet.</div>
          )}

          {panelTab === 'Data' && (
            <div style={{ flex: 1, padding: 12, fontSize: 12, color: MUT, lineHeight: 1.6 }}>Player, Spot and Minutes come from your squad and this sheet&apos;s own choices. Change the squad and they change here.</div>
          )}
        </div>
      </div>
    </div>
  )
}
