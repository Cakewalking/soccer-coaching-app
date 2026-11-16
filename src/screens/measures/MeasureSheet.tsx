import { useState, useEffect } from 'react'
import { INK, MUT, GREEN, HAIR, PALEGREEN } from '../step4/directorParts'
import { type MeasureCfg, nextMeasure, prevMeasure } from './data'

const GD = '#1f4a3e', BAND = '#d4e6df', PALE = '#eef5f2'

// ---------- graphs ----------
function LineGraph({ cfg }: { cfg: MeasureCfg }) {
  const g = cfg.graph
  const s = g.series ?? []
  const [top, , bot] = g.axis ?? [100, 50, 0]
  const W = 600, H = 150, padL = 34, padR = 8, padB = 20, plotW = W - padL - padR, plotH = H - padB
  const y = (v: number) => plotH - ((v - bot) / (top - bot)) * plotH
  const x = (i: number) => padL + (s.length <= 1 ? plotW / 2 : (i / (s.length - 1)) * plotW)
  const pts = s.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const gridVals = g.axis ?? []
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 150 }}>
      {g.rangeHigh != null && g.rangeLow != null && <rect x={padL} y={y(g.rangeHigh)} width={plotW} height={Math.max(0, y(g.rangeLow) - y(g.rangeHigh))} fill={BAND} opacity={0.7} />}
      {gridVals.map((v, i) => (
        <g key={i}>
          <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)} stroke={HAIR} strokeWidth={1} />
          <text x={4} y={y(v) + 4} fontSize={10} fill={MUT}>{v}</text>
        </g>
      ))}
      {g.mid != null && <line x1={padL} x2={W - padR} y1={y(g.mid)} y2={y(g.mid)} stroke={GD} strokeWidth={1.5} strokeDasharray="5 4" />}
      <polyline points={pts} fill="none" stroke={GREEN} strokeWidth={2.5} />
      {s.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={i === s.length - 1 ? 5 : 3} fill={GREEN} />)}
      {g.labels && g.labels.map((l, i) => (
        <text key={i} x={x(i)} y={H - 4} fontSize={10} fill={MUT} textAnchor={i === 0 ? 'start' : i === g.labels!.length - 1 ? 'end' : 'middle'}>{l}</text>
      ))}
    </svg>
  )
}

function HeadGraph({ cfg }: { cfg: MeasureCfg }) {
  const levels = cfg.graph.headLevels ?? []
  const labels = cfg.graph.labels ?? []
  const rows = ['Easy', 'About right', 'Too hard']
  const W = 600, rowH = 34, padL = 90
  const H = rows.length * rowH + 20
  const x = (i: number) => padL + (i / (levels.length - 1)) * (W - padL - 20)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: H }}>
      {rows.map((r, ri) => (
        <g key={r}>
          <line x1={padL} x2={W - 8} y1={ri * rowH + rowH / 2} y2={ri * rowH + rowH / 2} stroke={HAIR} />
          <text x={4} y={ri * rowH + rowH / 2 + 4} fontSize={11} fill={MUT}>{r}</text>
        </g>
      ))}
      {levels.map((lv, i) => <circle key={i} cx={x(i)} cy={lv * rowH + rowH / 2} r={5} fill={GREEN} />)}
      {labels.map((l, i) => <text key={i} x={x(i)} y={H - 2} fontSize={10} fill={MUT} textAnchor="middle">{l}</text>)}
    </svg>
  )
}

function SettlingGraph({ cfg }: { cfg: MeasureCfg }) {
  const total = cfg.graph.squad ?? 14, known = cfg.graph.known ?? 0
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '8px 0' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: i < known ? GREEN : '#fff', border: `1.5px solid ${i < known ? GREEN : '#c5c8c4'}` }} />
      ))}
      <div style={{ width: '100%', fontSize: 12, color: MUT, marginTop: 4 }}>{known} of {total} are girls she already knows.</div>
    </div>
  )
}

function BarGraph({ cfg, kind }: { cfg: MeasureCfg; kind: 'place' | 'load' }) {
  const data = kind === 'place'
    ? (cfg.graph.shares ?? []).map(v => ({ v, planned: false }))
    : (cfg.graph.weeks ?? []).map(w => ({ v: w.mins, planned: !!w.planned }))
  const line = kind === 'place' ? cfg.graph.floor : cfg.graph.cap
  const max = Math.max(...data.map(d => d.v), line ?? 0) * 1.1
  const W = 600, H = 150, padB = 4
  const bw = (W / data.length)
  const yl = line != null ? H - padB - (line / max) * (H - padB) : null
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 150 }}>
      {data.map((d, i) => {
        const h = (d.v / max) * (H - padB)
        const mine = kind === 'place' && cfg.graph.mine != null && d.v === cfg.graph.mine && i === data.length - 1
        return <rect key={i} x={i * bw + 3} y={H - padB - h} width={bw - 6} height={h} rx={3} fill={mine ? GD : d.planned ? GREEN : BAND} />
      })}
      {yl != null && <line x1={0} x2={W} y1={yl} y2={yl} stroke={GD} strokeWidth={1.5} strokeDasharray="5 4" />}
    </svg>
  )
}

function Graph({ cfg }: { cfg: MeasureCfg }) {
  switch (cfg.graph.kind) {
    case 'head': return <HeadGraph cfg={cfg} />
    case 'settling': return <SettlingGraph cfg={cfg} />
    case 'place': return <BarGraph cfg={cfg} kind="place" />
    case 'load': return <BarGraph cfg={cfg} kind="load" />
    default: return <LineGraph cfg={cfg} />
  }
}

// ---------- evidence ----------
function Evidence({ cfg, say, onNav }: { cfg: MeasureCfg; say: (m: string) => void; onNav?: (s: string) => void }) {
  const [filter, setFilter] = useState<'sat' | 'all' | 'lost'>('sat')
  const ev = cfg.evidence
  const th: React.CSSProperties = { padding: '8px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: MUT, textAlign: 'left', borderBottom: `1.5px solid ${HAIR}` }
  const td: React.CSSProperties = { padding: '9px 10px', fontSize: 13, color: INK, borderBottom: `1px solid ${HAIR}` }

  if (ev.kind === 'film') {
    const outcomeLabel = ev.clips.find(c => c.outcome === 'Lost') ? 'Lost' : 'Key'
    const shown = ev.clips.filter(c => filter === 'all' ? true : filter === 'sat' ? c.saturday : c.outcome === 'Lost')
    const satCount = ev.clips.filter(c => c.saturday).length
    const lostCount = ev.clips.filter(c => c.outcome === outcomeLabel).length
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minHeight: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: MUT, flex: 1 }}>The clips · {ev.count} from {ev.games} games</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {([['sat', `Saturday ${satCount}`], ['all', `All ${ev.count}`], ['lost', `${outcomeLabel} ${lostCount}`]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setFilter(k)} style={{ height: 30, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${filter === k ? GD : '#c5c8c4'}`, background: filter === k ? GD : '#fff', color: filter === k ? '#fff' : INK, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {shown.map((c, i) => (
            <button key={i} onClick={() => say(`Playing… ${c.minute} ${c.outcome}, ${c.game}.`)} style={{ border: 'none', padding: 0, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', background: GD, position: 'relative', height: 76 }}>
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3" /></svg></span></span>
              <span style={{ position: 'absolute', left: 6, bottom: 5, fontSize: 10, fontWeight: 700, color: '#fff' }}>{c.minute} · {c.outcome}</span>
              <span style={{ position: 'absolute', right: 6, bottom: 5, fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.4)', borderRadius: 3, padding: '0 4px' }}>{c.dur}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => say(`Playing all ${shown.length} clips in a row.`)} style={{ height: 40, padding: '0 16px', borderRadius: 10, border: 'none', background: GREEN, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Play all {shown.length}{filter === 'sat' ? ' from Saturday' : ''}</button>
          <button onClick={() => { say('Pick a clip — it goes to the coach’s To check list, and the count is redone.'); onNav?.('TC1-ToCheck') }} style={{ height: 40, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>This one is wrong</button>
        </div>
      </div>
    )
  }
  if (ev.kind === 'vest') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minHeight: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: MUT, flex: 1 }}>The numbers as recorded · newest first</div>
          <button onClick={() => say('Downloaded every reading as a file.')} style={{ height: 32, padding: '0 12px', borderRadius: 999, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 12, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Download all</button>
        </div>
        <div style={{ overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th style={th}>Date</th><th style={th}>Session</th><th style={{ ...th, textAlign: 'right' }}>{cfg.title}</th><th style={{ ...th, textAlign: 'right' }}>Vest</th><th style={{ ...th, textAlign: 'right' }}>Signal</th></tr></thead>
            <tbody>
              {ev.rows.map((r, i) => (
                <tr key={i}>
                  <td style={td}>{r.date}</td><td style={td}>{r.session}</td>
                  <td style={{ ...td, textAlign: 'right', fontWeight: 700, textDecoration: r.out ? 'line-through' : 'none', color: r.out ? MUT : INK }}>{r.value}</td>
                  <td style={{ ...td, textAlign: 'right', color: MUT }}>{r.vest}</td>
                  <td style={{ ...td, textAlign: 'right', color: r.out ? '#c04' : MUT }}>{r.signal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  if (ev.kind === 'test') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: MUT }}>Every test · newest first</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr><th style={th}>Date</th><th style={th}>Who timed it</th><th style={{ ...th, textAlign: 'right' }}>Counted</th><th style={{ ...th, textAlign: 'right' }}>Every go</th></tr></thead>
          <tbody>{ev.rows.map((r, i) => (
            <tr key={i}><td style={td}>{r.date}</td><td style={td}>{r.timer}</td><td style={{ ...td, textAlign: 'right', fontWeight: 700 }}>{r.counted}</td><td style={{ ...td, textAlign: 'right', color: MUT }}>{r.gos}</td></tr>
          ))}</tbody>
        </table>
        <button onClick={() => say('Playing… the film of the latest test.')} style={{ alignSelf: 'flex-start', height: 40, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Watch the latest test</button>
        <div style={{ fontSize: 12, color: MUT }}>{ev.note}</div>
      </div>
    )
  }
  if (ev.kind === 'hand') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: MUT }}>Every measurement · newest first</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr><th style={th}>Date</th><th style={th}>Who measured</th><th style={{ ...th, textAlign: 'right' }}>Height</th><th style={{ ...th, textAlign: 'right' }}>Change</th><th style={{ ...th, textAlign: 'right' }}>Both readings</th></tr></thead>
          <tbody>{ev.rows.map((r, i) => (
            <tr key={i}><td style={td}>{r.date}</td><td style={td}>{r.by}</td><td style={{ ...td, textAlign: 'right', fontWeight: 700 }}>{r.value}</td><td style={{ ...td, textAlign: 'right', color: MUT }}>{r.change}</td><td style={{ ...td, textAlign: 'right', color: MUT }}>{r.readings}</td></tr>
          ))}</tbody>
        </table>
      </div>
    )
  }
  if (ev.kind === 'said') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minHeight: 0, flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: MUT }}>Who said what, and what is on record · newest first</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
          {ev.list.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, borderTop: i ? `1px solid ${HAIR}` : 'none', paddingTop: i ? 10 : 0 }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: s.wc ? '#c8d4d0' : PALEGREEN, color: s.wc ? INK : GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.ini}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><strong style={{ fontSize: 13 }}>{s.person}</strong><span style={{ fontSize: 12, color: MUT }}>· {s.role}</span><span style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>{s.date}</span></div>
                <div style={{ fontSize: 13, color: INK, margin: '3px 0' }}>“{s.words}”</div>
                <div style={{ fontSize: 12, color: MUT }}>{s.how}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (ev.kind === 'load') {
    return <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>A row per week: the minutes from attendance, the vest (or the team sheet where no vest was worn), and her own check-ins. Darker bars are the planned trial weeks.</div>
  }
  if (ev.kind === 'place') {
    return <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>One bar per player in U13 Girls Meg, by share of game time this season. No player is named. The dashed line is the club’s floor: at least half of every game.</div>
  }
  // settling
  return <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>Each circle is a player in U13 Girls Meg. Filled ones are the girls Mia picked on “Who do you know?”. They are not told.</div>
}

// ---------- the drawer ----------
export default function MeasureSheet({ cfg, onClose, onOpen, onNav }: {
  cfg: MeasureCfg
  onClose: () => void
  onOpen: (id: string) => void
  onNav?: (s: string) => void
}) {
  const [toast, setToast] = useState<string | null>(null)
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 2600) }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const nxt = nextMeasure(cfg), prv = prevMeasure(cfg)
  const box: React.CSSProperties = { flex: 1, background: PALE, borderRadius: 10, padding: '10px 12px', minWidth: 0 }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(16,33,31,0.45)', zIndex: 300, display: 'flex', justifyContent: 'flex-end' }}>
      <div data-screen={cfg.id} onClick={e => e.stopPropagation()} style={{ width: 660, maxWidth: '100%', height: '100%', background: '#fff', boxShadow: '-12px 0 40px rgba(16,33,31,0.25)', display: 'flex', flexDirection: 'column', padding: '14px 24px 12px', boxSizing: 'border-box', gap: 9, fontFamily: 'var(--font-sans)', color: INK }}>
        {/* heading + close */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: MUT }}>{cfg.area} · {cfg.source} · {cfg.pos} OF 11</div>
            <h1 style={{ margin: '4px 0 2px', fontSize: 24, fontWeight: 800, lineHeight: 1.15 }}>{cfg.title}</h1>
            <div style={{ fontSize: 13, color: MUT }}>{cfg.sub}</div>
          </div>
          <button aria-label="Close" onClick={onClose} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${HAIR}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div style={{ fontSize: 15, lineHeight: '21px' }}>{cfg.sentence}</div>

        <Graph cfg={cfg} />
        {cfg.graph.kind === 'line' && (
          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: MUT, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 14, height: 3, background: GREEN, borderRadius: 2 }} />Mia</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 14, height: 10, background: BAND, borderRadius: 2 }} />U13 girls, lowest to highest</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 14, height: 0, borderTop: `2px dashed ${GD}` }} />their middle{cfg.lowerBetter ? ' · lower is better' : ''}</span>
          </div>
        )}

        {/* how it was captured */}
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, marginTop: 2 }}>How it was captured</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {cfg.captures.map((c, i) => (
            <div key={i} style={box}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: MUT, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: INK, lineHeight: 1.4 }}>{c.lines}</div>
            </div>
          ))}
        </div>

        {/* evidence */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', marginTop: 2 }}>
          <Evidence cfg={cfg} say={say} onNav={onNav} />
        </div>

        {/* bottom row */}
        <div style={{ borderTop: `1px solid ${HAIR}`, paddingTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, fontSize: 12, color: MUT }}>{cfg.foot}</div>
          <button aria-label={`Back to ${prv.title}`} onClick={() => onOpen(prv.id)} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${HAIR}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.2" strokeLinecap="round"><path d="M15 18 9 12l6-6" /></svg>
          </button>
          <button onClick={() => onOpen(nxt.id)} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 13, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {nxt.title}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2.2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>

        {toast && <div role="status" style={{ position: 'absolute', left: '50%', bottom: 72, transform: 'translateX(-50%)', maxWidth: 560, padding: '10px 16px', borderRadius: 12, background: GD, color: '#fff', fontSize: 13, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.3)', textAlign: 'center' }}>{toast}</div>}
      </div>
    </div>
  )
}
