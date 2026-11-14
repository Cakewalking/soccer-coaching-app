import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export type PlayStatus = 'start' | 'bench' | 'ingoal'
type ViewType = 'table' | 'lineup' | 'print'
type PanelTab = 'Checks' | 'Comments' | 'Data'

export type PlayerRow = { row: number; jersey: number; name: string; spot: string; games: PlayStatus[]; notes?: string }

export type CheckItem = { icon: 'check' | 'lock'; title: string; sub: string }

export type TeamSheetConfig = {
  title: string
  subtitle: string
  shareLabel: string
  editors: { ini: string; bg: string }[]
  gameCols: { label: string; sub: string }[]
  rows: PlayerRow[]
  initialSheets: string[]
  footerNote: string
  checks: CheckItem[]
  warn?: { player: string; swapWith: string; title: string; body: string; game: number }
  dataNote: string
}

export function minsFor(games: PlayStatus[]) { return games.reduce((s, g) => s + (g !== 'bench' ? 15 : 0), 0) }

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

const colLetters = ['C', 'D', 'E', 'F']

export default function TeamSheetBody({ cfg, onBack, onShare, onTool }: {
  cfg: TeamSheetConfig
  onBack?: () => void
  onShare?: () => void
  onTool?: (name: string) => void
}) {
  const [view, setView]           = useState<ViewType>('table')
  const [panelTab, setPanelTab]   = useState<PanelTab>('Checks')
  const [sheets, setSheets]       = useState(cfg.initialSheets)
  const [activeTab, setActiveTab] = useState(cfg.initialSheets[0])
  const [rows, setRows]           = useState<PlayerRow[]>(cfg.rows)
  const [sel, setSel]             = useState<{ ri: number; ci: number }>({ ri: Math.min(7, cfg.rows.length - 1), ci: 2 })
  const [lastTool, setLastTool]   = useState('')

  function tool(name: string) { setLastTool(name); onTool?.(name) }

  function cycleCell(ri: number, ci: number) {
    tool(`${colLetters[ci]}${ri + 1}`)
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
    if (!cfg.warn) return
    const gi = cfg.warn.game
    setRows(prev => prev.map(r => {
      if (r.name === cfg.warn!.player)   { const g = [...r.games]; g[gi] = 'bench';  return { ...r, games: g } }
      if (r.name === cfg.warn!.swapWith) { const g = [...r.games]; g[gi] = 'ingoal'; return { ...r, games: g } }
      return r
    }))
  }

  function addSheet() {
    const name = `Sheet ${sheets.length - 1}`
    setSheets(prev => [...prev, name])
    setActiveTab(name)
    tool('+ Sheet')
  }

  const warnRow     = cfg.warn ? rows.find(r => r.name === cfg.warn!.player) : undefined
  const warnActive  = !!(warnRow && minsFor(warnRow.games) > 45)
  const colLabels   = ['A', 'B', ...colLetters, 'G', 'H']

  const selStatus = rows[sel.ri]?.games[sel.ci] ?? 'start'
  const selLabel  = selStatus === 'start' ? 'Start' : selStatus === 'ingoal' ? 'In goal' : 'Bench'
  const selRef    = `${colLetters[sel.ci]}${sel.ri + 1}`

  const isActive = (v: ViewType, label: string) =>
    (v === 'table' && label === 'Table') || (v === 'lineup' && label === 'Line-up') || (v === 'print' && label === 'Print')

  return (
    <div data-lasttool={lastTool} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f7f8f7', minHeight: 0 }}>

      {/* Document header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 12, height: 56, flexShrink: 0 }}>
        <button aria-label="Back to Files" onClick={onBack} style={{ width: 32, height: 32, borderRadius: '50%', background: LN, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>{cfg.title}</div>
          <div style={{ fontSize: 11, color: MUT }}>{cfg.subtitle}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex' }}>
            {cfg.editors.map((a, i) => (
              <div key={a.ini} style={{ width: 28, height: 28, borderRadius: '50%', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', marginLeft: i > 0 ? -8 : 0, border: '2px solid #fff', zIndex: 3 - i, position: 'relative' }}>{a.ini}</div>
            ))}
          </div>
          <button onClick={() => tool('History')}  style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>History</button>
          <button onClick={() => tool('Download')} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Download</button>
          <button onClick={() => onShare?.()}      style={{ height: 36, padding: '0 16px', borderRadius: 999, background: GD, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
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
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, height: 36, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: INK, background: PALE, padding: '2px 8px', borderRadius: 4 }}>{selRef}</span>
        <div style={{ width: 1, height: 16, background: LN, flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: MUT, whiteSpace: 'nowrap' }}>Choice:</span>
        {(['Start', 'In goal', 'Bench'] as const).map(c => (
          <span key={c} style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, background: c === selLabel ? GD : 'transparent', border: c === selLabel ? 'none' : `1.5px solid ${LN}`, color: c === selLabel ? '#fff' : INK, whiteSpace: 'nowrap' }}>{c}</span>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, color: MUT, whiteSpace: 'nowrap' }}>Minutes = 15 for each Start or In goal</div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

        {/* Main content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {view === 'table' && (
            <>
              <div style={{ flex: 1, overflowX: 'auto', overflowY: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', minWidth: '100%', tableLayout: 'fixed', width: 820 }}>
                  <colgroup>
                    <col style={{ width: 72 }} />
                    <col style={{ width: 148 }} />
                    <col style={{ width: 70 }} />
                    <col style={{ width: 100 }} />
                    <col style={{ width: 100 }} />
                    <col style={{ width: 100 }} />
                    <col style={{ width: 100 }} />
                    <col style={{ width: 72 }} />
                    <col />
                  </colgroup>
                  <thead>
                    <tr style={{ background: '#f7f8f7' }}>
                      <td style={{ borderBottom: `1px solid ${LN}`, borderRight: `1px solid ${LN}` }} />
                      {colLabels.map(l => (
                        <td key={l} style={{ padding: '3px 0', borderBottom: `1px solid ${LN}`, borderRight: `1px solid ${LN}`, fontSize: 10, color: MUT, textAlign: 'center', fontWeight: 600 }}>{l}</td>
                      ))}
                    </tr>
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
                      {cfg.gameCols.map(g => (
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
                      const isWarn = cfg.warn && r.name === cfg.warn.player
                      const warn = isWarn && warnActive
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
                              <td key={ci} onClick={() => cycleCell(ri, ci)} style={{ padding: '8px 10px', borderRight: `1px solid ${LN}`, cursor: 'pointer', background: isWarn && ci === cfg.warn!.game && warnActive ? '#fdf0f0' : undefined, outline: isSel ? `2px solid ${G}` : undefined, outlineOffset: isSel ? -2 : undefined }}>
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
                      {cfg.gameCols.map((_, ci) => (
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
                <div style={{ marginLeft: 'auto', fontSize: 11, color: MUT, whiteSpace: 'nowrap', paddingLeft: 12 }}>{cfg.footerNote}</div>
              </div>
            </>
          )}

          {view === 'lineup' && (
            <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>{cfg.title}</div>
              <div style={{ background: GD, borderRadius: 12, padding: 24, maxWidth: 480, color: '#fff', textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, opacity: 0.75 }}>{cfg.gameCols[0].label} · {cfg.gameCols[0].sub}</div>
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
              <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 4 }}>{cfg.title}</div>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>Print layout · {cfg.footerNote}</div>
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: 16, fontSize: 12, color: MUT }}>Print preview</div>
              <div style={{ display: 'flex', gap: 2, marginTop: 16 }}>
                {cfg.initialSheets.map(t => (
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
              {cfg.warn && (
                <div style={{ background: '#fef9e8', border: `1px solid #f0d460`, borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginBottom: 4 }}>{cfg.warn.title}</div>
                  <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginBottom: 10 }}>{cfg.warn.body}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={handleSwap}             style={{ flex: 1, minHeight: 44, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Swap for me</button>
                    <button onClick={() => tool('Leave it')} style={{ flex: 1, minHeight: 44, borderRadius: 999, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Leave it</button>
                  </div>
                </div>
              )}

              {cfg.checks.map(c => (
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

              <div style={{ marginTop: 'auto', padding: '10px 0 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: INK, marginBottom: 2 }}>Green columns are live</div>
                <div style={{ fontSize: 11, color: MUT, lineHeight: 1.5 }}>{cfg.dataNote}</div>
              </div>
            </div>
          )}

          {panelTab === 'Comments' && (
            <div style={{ flex: 1, padding: 12, fontSize: 12, color: MUT }}>No comments yet.</div>
          )}

          {panelTab === 'Data' && (
            <div style={{ flex: 1, padding: 12, fontSize: 12, color: MUT, lineHeight: 1.6 }}>{cfg.dataNote}</div>
          )}
        </div>
      </div>
    </div>
  )
}
