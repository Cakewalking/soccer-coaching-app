import { openThing } from './openThing'
import { useMemo, useState } from 'react'
import { PitchSvg } from './formation/Pitch'
import { shapeByName } from './formation/formationData'
import { getInsights, wordsFor, value, fmt, thin, pairsFor, bestLineup, forThisWeek, lineWord, type MetricKey, type FormationPreset, type PairStat } from './formation/lineupInsights'

export type LineupTeam = 'juniors' | 'youth' | 'seniors' | 'miniroos'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const SAND = '#cbbeb5'
const SANDBG = '#f6f1e9'

function Icon({ d, size = 20, stroke = 'currentColor', sw = 2 }: { d: string; size?: number; stroke?: string; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d}/>
    </svg>
  )
}

function Toast({ msg }: { msg: string }) {
  return <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{msg}</div>
}

const ICONS = {
  home:     'M4 11l8-7 8 7v9H4z',
  squad:    'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5',
  training: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4',
  matchday: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z',
  clips:    'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z',
  record:   'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z',
  chevdown: 'M6 9l6 6 6-6',
}

const NAV6 = [
  { id: 'home',     label: 'Home',      icon: ICONS.home },
  { id: 'squad',    label: 'Squad',     icon: ICONS.squad },
  { id: 'training', label: 'Training',  icon: ICONS.training },
  { id: 'matchday', label: 'Match day', icon: ICONS.matchday },
  { id: 'record',   label: 'Record',    icon: ICONS.record },
  { id: 'learn',    label: 'Learn',     icon: 'M2 4h6a4 4 0 014 4v13a3 3 0 00-3-3H2zM22 4h-6a4 4 0 00-4 4v13a3 3 0 013-3h7z' },
]

const SQUAD_SUBS = ['Players', 'Formation', 'Line-ups that worked', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy']

function CoachFrame({ activeNav, activeSub, subTabs, pageTitle, pageSub, pageRight, children, toast, onNavTab, noFrame }: {
  activeNav: string; activeSub: string; subTabs: string[]; pageTitle: string; pageSub: string;
  pageRight?: React.ReactNode; children: React.ReactNode; toast: string | null; onNavTab: (t: string) => void; noFrame?: boolean
}) {
  if (noFrame) return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7' }}>
      <div style={{ padding: '20px 28px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{pageTitle}</h1>
          {pageSub && <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{pageSub}</div>}
        </div>
        {pageRight && <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>{pageRight}</div>}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 28px 32px' }}>{children}</div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7' }}>
      {/* Top bar */}
      <div style={{ background: GD, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 2, height: 56, flexShrink: 0 }}>
        <span style={{ color: '#e9eae8', fontWeight: 800, fontSize: 16, marginRight: 10 }}>Clean Sheet</span>
        {NAV6.map(tab => (
          <button key={tab.id} onClick={() => onNavTab(tab.id)}
            style={{ height: 48, padding: '0 14px', borderRadius: 12, background: tab.id === activeNav ? G2 : 'transparent', color: '#e9eae8', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            <Icon d={tab.icon} size={18}/> {tab.label}
          </button>
        ))}
        <div style={{ flex: 1 }}/>
        <button onClick={() => onNavTab('team')} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#e9eae8', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit' }}>
          U12 Sam · Wattle Creek <Icon d={ICONS.chevdown} size={14}/>
        </button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, marginLeft: 8 }}>SK</div>
      </div>
      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 4, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto', flex: 1 }}>
          {subTabs.map(tab => (
            <button key={tab} onClick={() => onNavTab('sub:' + tab)}
              style={{ height: 44, padding: '0 4px', marginRight: 16, fontSize: 15, fontWeight: 600, color: tab === activeSub ? G : MUT, background: 'transparent', border: 'none', borderBottom: `3px solid ${tab === activeSub ? G : 'transparent'}`, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
              {tab}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: MUT, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <Icon d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z" size={13}/>Head coach
        </span>
      </div>
      {/* Page heading */}
      <div style={{ padding: '20px 28px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{pageTitle}</h1>
          {pageSub && <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{pageSub}</div>}
        </div>
        {pageRight && <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>{pageRight}</div>}
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 28px 32px' }}>
        {children}
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

function BtnMore({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button onClick={onClick} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>{label}</button>
}
function BtnPrimary({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button onClick={onClick} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>{label}</button>
}

// Team-specific insights come from the formation rosters, so every name on this
// page is one the coach can place in the Formation builder.
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const LINE_NAME: Record<string, string> = { goal: 'In goal', back: 'Back line', midfield: 'Midfield', front: 'Up front' }

function Card({ title, sub, right, children, style }: { title: string; sub?: string; right?: React.ReactNode; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: 16, ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: INK }}>{title}</h2>
        {right && <div style={{ fontSize: 12, color: MUT, textAlign: 'right' }}>{right}</div>}
      </div>
      {sub && <div style={{ fontSize: 12, color: MUT, lineHeight: 1.45, marginTop: 2 }}>{sub}</div>}
      <div style={{ marginTop: 12 }}>{children}</div>
    </section>
  )
}

// SQ1 — Line-ups that worked
export function SquadLineups({ onBack: _onBack, noFrame, onNav, teamType = 'juniors' }: { onBack?: () => void; noFrame?: boolean; onNav?: (s: string, preset?: FormationPreset) => void; teamType?: LineupTeam }) {
  const [toast, setToast] = useState<string | null>(null)
  const [metric, setMetric] = useState<MetricKey>('scored')
  const [shapeSel, setShapeSel] = useState<string | null>(null)
  const [hot, setHot] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  void t   // kept for lines this screen may still need to say
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const ins = getInsights(teamType)!
  const g = ins.gameLen
  const MX = wordsFor(teamType), mini = teamType === 'miniroos'
  const m = MX.find(x => x.key === metric)!
  const byId = useMemo(() => Object.fromEntries(ins.cfg.roster.map(p => [p.id, p])), [ins])
  const teamLabel = ins.cfg.teamLabel.split(' · ')[0]
  const shapeName = shapeSel ?? ins.bestShape[metric]
  const shape = shapeByName(ins.cfg.side, shapeName)!
  const lineup = bestLineup(ins, metric, shapeName)!
  const pairs = pairsFor(ins, metric)
  const week = forThisWeek(ins, lineup, m.label)
  const pairKey = (p: PairStat) => `${p.a}-${p.b}`
  const stat = (name: string) => ins.shapes.find(s => s.shape === name)!
  const day = ins.cfg.game.split(' ')[0] === 'Sat' ? 'Saturday' : 'this week'

  const tokens = lineup.lineup.map((id, i) => ({
    id, num: byId[id].num, name: byId[id].first, pos: shape.slots[i].pos, x: shape.slots[i].x, y: shape.slots[i].y,
    out: !byId[id].available, ring: !!hot && hot.split('-').includes(id),
  }))
  const links = pairs.filter(p => lineup.lineup.includes(p.a) && lineup.lineup.includes(p.b)).map(p => ({ a: p.a, b: p.b, strong: hot === pairKey(p) }))

  const sc = ins.bestShape.scored, ag = ins.bestShape.against
  const f = (name: string, k: MetricKey) => fmt(k, value(stat(name).agg, k, g))
  const story = mini
    ? (sc === ag ? `${sc} gives the most best moments (${f(sc, 'scored')} a game) and loses the ball least near your goal.` : `${sc} gives the most best moments (${f(sc, 'scored')} a game) but loses it near your goal ${f(sc, 'against')} times. ${ag} is safest at the back (${f(ag, 'against')}) with ${f(ag, 'scored')} best moments.`)
    : (sc === ag ? `${sc} scores most (${f(sc, 'scored')} a game) and lets in least (${f(ag, 'against')}).` : `${sc} scores most (${f(sc, 'scored')} a game) but lets in ${f(sc, 'against')}. ${ag} lets in least (${f(ag, 'against')}) and scores ${f(ag, 'scored')}.`)

  const players = ins.cfg.roster
    .map(p => ({ p, cells: ins.byPlayer[p.id] ?? [], mins: (ins.byPlayer[p.id] ?? []).reduce((n, c) => n + c.agg.mins, 0) }))
    .filter(r => r.mins > 0).sort((x, y) => y.mins - x.mins)
  const shownPlayers = showAll ? players : players.slice(0, 8)
  const tryIt = () => onNav ? onNav('formation', week) : openThing(`Formation with this line-up for ${day}`, 'coach')

  return (
    <CoachFrame
      activeNav="squad" activeSub="Line-ups that worked" subTabs={SQUAD_SUBS}
      pageTitle="Line-ups that worked"
      pageSub={`${teamLabel} · from ${ins.games} recorded games this season`}
      pageRight={<><BtnMore label="This season" onClick={() => openThing('Season selector', 'coach')}/><BtnPrimary label={`Try it on ${day}`} onClick={tryIt}/></>}
      toast={toast}
      onNavTab={(id) => openThing(`${id} tab`, 'coach')}
      noFrame={noFrame}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} data-screen="SQ1-BestLineups">
        {/* What are you after? Each card names the shape that leads on it. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
          {MX.map(mm => {
            const best = stat(ins.bestShape[mm.key]); const on = mm.key === metric
            return (
              <button key={mm.key} aria-pressed={on} onClick={() => { setMetric(mm.key); setShapeSel(null); setHot(null) }}
                style={{ background: on ? PALE : '#fff', border: `1.5px solid ${on ? G : LN}`, borderRadius: 16, padding: '12px 14px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', boxSizing: 'border-box', minHeight: 44 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: on ? G : MUT }}>{mm.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: INK, marginTop: 4, letterSpacing: '-0.01em' }}>{best.shape}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{fmt(mm.key, value(best.agg, mm.key, g))} {mm.unit}</div>
                <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{best.agg.mins} minutes · {best.agg.games.length} games</div>
              </button>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 380px) minmax(0, 1fr)', gap: 16, alignItems: 'start' }}>
          {/* The line-up, on a pitch */}
          <Card title={`${m.label} · ${shapeName}`} sub={`The ${shapeName} line-up that did best. Together for ${lineup.agg.mins} minutes over ${lineup.agg.games.length} ${lineup.agg.games.length === 1 ? 'game' : 'games'}.`}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              {ins.usedShapes.map(name => {
                const on = name === shapeName
                return <button key={name} aria-pressed={on} onClick={() => setShapeSel(name)} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${on ? G : LN}`, background: on ? G : '#fff', color: on ? '#fff' : INK, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{name}</button>
              })}
            </div>
            <PitchSvg tokens={tokens} links={links} label={`${shapeName}: ${tokens.map(k => `${k.name} ${k.pos}`).join(', ')}`} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: MUT, marginTop: 6 }}>
              <span>Attacking up the page</span>
              {links.length > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 18, height: 5, borderRadius: 3, background: '#e2c77c' }}/>A pair that works</span>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 12 }}>
              {MX.map(mm => (
                <div key={mm.key} style={{ background: mm.key === metric ? PALE : '#f7f8f7', borderRadius: 10, padding: '8px 8px' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: mm.key === metric ? G : INK }}>{fmt(mm.key, value(lineup.agg, mm.key, g))}</div>
                  <div style={{ fontSize: 11, color: MUT, lineHeight: 1.3 }}>{mm.short}</div>
                </div>
              ))}
            </div>
            {thin(lineup.agg, g) && <div style={{ fontSize: 12, color: MUT, marginTop: 8, lineHeight: 1.45 }}>Only {lineup.agg.mins} minutes together, so treat these numbers lightly.</div>}
            {week.swaps.map(s => (
              <div key={s.out.id} style={{ background: SANDBG, border: `1px solid ${SAND}`, borderRadius: 10, padding: '8px 10px', fontSize: 12.5, color: INK, lineHeight: 1.45, marginTop: 10 }}>
                <strong>{s.out.first} cannot play {day}</strong> ({(s.out.reason ?? 'not available').toLowerCase()}). {s.in.first} is the closest fit who can play, and steps in.
              </div>
            ))}
            <button onClick={tryIt} style={{ width: '100%', height: 44, marginTop: 12, borderRadius: 10, border: `1px solid ${G}`, background: '#fff', color: G, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open this line-up in Formation</button>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            {/* Shapes compared */}
            <Card title="Shapes compared" sub="For a full game in each shape. Tap a shape to see its best line-up.">
              <div role="table" style={{ display: 'grid', gridTemplateColumns: 'minmax(96px, 1.25fr) repeat(4, minmax(0, 1fr))', rowGap: 4 }}>
                <div style={{ display: 'contents' }} role="row">
                  <div role="columnheader" style={th}>Shape</div>
                  {MX.map(mm => <div key={mm.key} role="columnheader" style={{ ...th, textAlign: 'right', color: mm.key === metric ? G : MUT }}>{mm.short}</div>)}
                </div>
                {ins.shapes.map(s => {
                  const on = s.shape === shapeName
                  if (!s.agg.mins) return (
                    <div key={s.shape} role="row" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, padding: '0 10px', borderRadius: 10, border: `1px dashed ${LN}` }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: MUT }}>{s.shape}</span>
                      <span style={{ fontSize: 12, color: MUT }}>Not used in a recorded game yet</span>
                    </div>
                  )
                  return (
                    <button key={s.shape} role="row" aria-pressed={on} onClick={() => setShapeSel(s.shape)}
                      style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'subgrid', alignItems: 'center', minHeight: 52, padding: '4px 0', borderRadius: 10, border: `1.5px solid ${on ? G : 'transparent'}`, background: on ? '#fafcfb' : 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                      <span role="cell" style={{ paddingLeft: 10 }}>
                        <span style={{ display: 'block', fontSize: 15, fontWeight: 800, color: INK }}>{s.shape}</span>
                        <span style={{ display: 'block', fontSize: 11, color: MUT }}>{s.agg.mins} min · {s.agg.games.length} games</span>
                      </span>
                      {MX.map(mm => {
                        const best = ins.bestShape[mm.key] === s.shape
                        return (
                          <span key={mm.key} role="cell" style={{ textAlign: 'right', paddingRight: 8 }}>
                            <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 8, background: best ? PALE : 'transparent', color: best ? G : INK, fontSize: 14, fontWeight: best ? 800 : 500, fontVariantNumeric: 'tabular-nums' }}>{fmt(mm.key, value(s.agg, mm.key, g))}</span>
                          </span>
                        )
                      })}
                    </button>
                  )
                })}
              </div>
              <div style={{ fontSize: 13, color: INK, lineHeight: 1.5, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${LN}` }}>{story}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}><span style={{ display: 'inline-block', width: 22, height: 12, borderRadius: 4, background: '#d3e6dd', marginRight: 6, verticalAlign: -2 }}/>Best of the shapes you have used.</div>
            </Card>

            {/* Pairs */}
            <Card title="Pairs that work" sub={`For ${m.label.toLowerCase()}: the minutes two neighbours were on together, against the minutes they were not.`}>
              {pairs.length === 0 && <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>No pair stands out on this one yet. It needs a couple of games together and one apart.</div>}
              {pairs.map((p, i) => {
                const a = byId[p.a], b = byId[p.b], la = lineWord(p.posA), lb = lineWord(p.posB)
                const where = la === lb ? LINE_NAME[la] : `${cap(la)} and ${lb}`
                const out = [a, b].filter(x => !x.available)
                const inShown = lineup.lineup.includes(p.a) && lineup.lineup.includes(p.b)
                return (
                  <div key={pairKey(p)} tabIndex={0} onMouseEnter={() => setHot(pairKey(p))} onMouseLeave={() => setHot(null)} onFocus={() => setHot(pairKey(p))} onBlur={() => setHot(null)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 8px', margin: '0 -8px', borderTop: i > 0 ? `1px solid ${LN}` : 'none', borderRadius: hot === pairKey(p) ? 10 : 0, background: hot === pairKey(p) ? '#fbf6e8' : 'transparent', outline: 'none' }}>
                    <div style={{ display: 'flex', flexShrink: 0 }}>
                      {[a, b].map((x, k) => <span key={x.id} style={{ width: 34, height: 34, borderRadius: '50%', background: PALE, color: G, border: '2px solid #fff', marginLeft: k ? -10 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>{x.num}</span>)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{a.first} and {b.first}</div>
                      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.4 }}>{where} · {p.together.mins} minutes together{!inShown ? ' · not both in this line-up' : ''}</div>
                      {out.map(x => <div key={x.id} style={{ fontSize: 12, color: '#7a5f24', marginTop: 2 }}>{x.first} cannot play {day}.</div>)}
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: G }}>{m.gain(p.gain[metric])}</div>
                      <div style={{ fontSize: 12, color: MUT, fontVariantNumeric: 'tabular-nums' }}>{fmt(metric, value(p.together, metric, g))} together · {fmt(metric, value(p.apart, metric, g))} apart</div>
                    </div>
                  </div>
                )
              })}
            </Card>
          </div>
        </div>

        {/* Players by shape */}
        <Card title="Players and shapes" sub={`${m.noun} while each player was on the pitch in that shape, and where they played.`} right={`${players.length} players with recorded minutes`}>
          <div role="table" style={{ display: 'grid', gridTemplateColumns: `minmax(120px, 1.2fr) repeat(${ins.usedShapes.length}, minmax(0, 1fr)) minmax(120px, 1.2fr)`, rowGap: 2 }}>
            <div role="row" style={{ display: 'contents' }}>
              <div role="columnheader" style={th}>Player</div>
              {ins.usedShapes.map(name => <div key={name} role="columnheader" style={th}>{name}</div>)}
              <div role="columnheader" style={th}>Best in</div>
            </div>
            {shownPlayers.map(({ p, cells }) => {
              const ok = cells.filter(c => c.agg.mins >= g)
              const best = ok.length > 1 ? ok.reduce((x, c) => (m.lowerIsBetter ? value(c.agg, metric, g) < value(x.agg, metric, g) : value(c.agg, metric, g) > value(x.agg, metric, g)) ? c : x, ok[0]) : undefined
              return (
                <div key={p.id} role="row" style={{ display: 'contents' }}>
                  <div role="cell" style={td}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.first}</span>
                    {!p.available && <span style={{ fontSize: 11, color: '#7a5f24', marginLeft: 6 }}>out {day}</span>}
                  </div>
                  {ins.usedShapes.map(name => {
                    const c = cells.find(x => x.shape === name)
                    if (!c) return <div key={name} role="cell" style={{ ...td, color: '#a9b3b0', fontSize: 13 }}>Not played</div>
                    const few = c.agg.mins < g
                    return (
                      <div key={name} role="cell" style={td}>
                        <span style={{ display: 'inline-block', minWidth: 44, padding: '2px 8px', borderRadius: 8, background: best === c ? PALE : 'transparent', color: few ? MUT : best === c ? G : INK, fontSize: 14, fontWeight: best === c ? 800 : 500, fontVariantNumeric: 'tabular-nums' }}>{few ? '–' : fmt(metric, value(c.agg, metric, g))}</span>
                        <span style={{ fontSize: 11, color: MUT, marginLeft: 6 }}>{cap(lineWord(c.pos))} · {c.agg.mins} min</span>
                      </div>
                    )
                  })}
                  <div role="cell" style={{ ...td, fontSize: 13, color: best ? INK : MUT, fontWeight: best ? 600 : 400 }}>
                    {best ? `${cap(lineWord(best.pos))}, ${best.shape}` : ok.length === 1 ? `Only ${ok[0].shape} so far` : 'Too few minutes yet'}
                  </div>
                </div>
              )
            })}
          </div>
          {players.length > 8 && <button onClick={() => setShowAll(v => !v)} style={{ height: 44, marginTop: 8, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{showAll ? 'Show fewer' : `Show all ${players.length}`}</button>}
          <div style={{ fontSize: 12, color: MUT, marginTop: 8, lineHeight: 1.45 }}>A dash means under a game's worth of minutes in that shape. These are team numbers, not a mark for the {mini ? 'child' : 'player'}.</div>
        </Card>

        <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>
          {mini
            ? 'Worked out from film of recorded games: who was on, and what happened with the ball. No scores are kept or shown at this age. Turns come first: every child still plays every part of the pitch over the term, so use this to try things, not to pick favourites. Never shown to children or families.'
            : 'Worked out from who was on the pitch, and when, in recorded games. It shows what happened, not why: the other team, the weather and who was missing all count, so you make the call. Never shown to players, parents or the team manager.'}
        </div>
      </div>
    </CoachFrame>
  )
}

const th: React.CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, padding: '0 8px 6px 10px' }
const td: React.CSSProperties = { display: 'flex', alignItems: 'center', minHeight: 40, padding: '0 8px 0 10px', borderTop: `1px solid ${LN}` }

// SQ1e — Best lineups empty state
export function SquadLineupsEmpty({ onBack: _onBack, onNav }: { onBack?: () => void; onNav?: (s: string) => void }) {
  const [toast, setToast] = useState<string | null>(null)
  void t   // kept for lines this screen may still need to say
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <CoachFrame
      activeNav="squad" activeSub="Line-ups that worked" subTabs={SQUAD_SUBS}
      pageTitle="Line-ups that worked"
      pageSub="U12 Sam · 1 game recorded so far"
      toast={toast}
      onNavTab={(id) => openThing(`${id} tab`, 'coach')}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 2 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28 }}>
              <Icon d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z" size={28} stroke={G}/>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>Record 3 games to see this</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20, maxWidth: 400, margin: '0 auto 20px' }}>
              Clean Sheet needs to see who was on the pitch together, for long enough to mean something. You have 1 of 3.
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <BtnPrimary label="Record Saturday's game" onClick={() => onNav ? onNav('record') : openThing('the Record tab', 'coach')}/>
              <BtnMore label="Set Saturday's line-up" onClick={() => onNav ? onNav('teamsheet') : openThing('the team sheet', 'coach')}/>
            </div>
          </div>
        </div>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>What it will show</div>
            {[
              { n: '1', t: 'Most goals scored', n2: 'Which nine, and for how long' },
              { n: '2', t: 'Fewest goals against', n2: 'And pairs that defend well' },
              { n: '3', t: 'Longest time winning', n2: 'Minutes ahead while together' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{s.n2}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, borderTop: `1px solid ${LN}`, paddingTop: 10, lineHeight: 1.5 }}>
              Not shown for under 12s who play without scores. Never shown to players or parents.
            </div>
          </div>
        </div>
      </div>
    </CoachFrame>
  )
}

export default SquadLineups
