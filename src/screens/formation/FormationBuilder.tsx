import { useMemo, useState } from 'react'
import { TEAMS, shapesFor, shapeByName, remap, type TeamCfg, type Shape, type Player } from './formationData'

// Squad › Formation builder (tablet). Pick a shape, place players from the bench
// onto the pitch by tap-then-tap (drag also supported), move and swap them, run
// the checks, and send to the team sheet or families. From formation-v1 handover.

const INK = '#10211f', PITCH = '#1c3a33', GREEN = '#2f6252', LEAF = '#40826d'
const MUT = '#6f7f7b', LN = '#e8edeb', PALE = '#eef5f2', SAND = '#cbbeb5', SANDBG = '#f6f1e9'

type Mode = 'builder' | 'own'

export default function FormationBuilder({ team = 'juniors', onNav, empty }: { team?: string; onNav?: (s: string) => void; empty?: boolean }) {
  const cfg: TeamCfg = TEAMS[team] ?? TEAMS.juniors
  const shapes = shapesFor(cfg.side)
  const [shapeName, setShapeName] = useState(cfg.defaultShape)
  const [mode, setMode] = useState<Mode>('builder')
  const [part, setPart] = useState(0)
  const [placed, setPlaced] = useState<(string | null)[]>(() => empty ? new Array(shapeByName(cfg.side, cfg.defaultShape)!.slots.length).fill(null) : [...cfg.start])
  const [picked, setPicked] = useState<string | null>(null)
  const [, setHistory] = useState<(string | null)[][]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [ownName, setOwnName] = useState('')
  const [savedTabs, setSavedTabs] = useState<string[]>([])
  const [shareWhen, setShareWhen] = useState('Friday 6:00 pm')
  const [shareWho, setShareWho] = useState<'families' | 'coaches'>('families')
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 2800) }

  const shape: Shape = useMemo(() => shapeByName(cfg.side, shapeName) ?? shapes[0], [cfg.side, shapeName, shapes])
  const byId = useMemo(() => Object.fromEntries(cfg.roster.map(p => [p.id, p])) as Record<string, Player>, [cfg.roster])

  const placedIds = new Set(placed.filter(Boolean) as string[])
  const benchPlayers = cfg.roster.filter(p => p.available && !placedIds.has(p.id))
  const unavailable = cfg.roster.filter(p => !p.available)
  const toPlace = benchPlayers.length

  function pushHistory() { setHistory(h => [...h.slice(-19), [...placed]]) }
  function commit(next: (string | null)[]) { pushHistory(); setPlaced(next) }

  // Tap model: pick a token (bench or pitch), then tap a target (slot or player).
  function tapBench(p: Player) {
    if (!p.available) { say(`${p.full}: not available, so cannot be placed.`); return }
    if (picked === p.id) { setPicked(null); return }
    setPicked(p.id)
    say(`${p.full}: drag onto the pitch. Or tap, then tap a spot.`)
  }

  function tapSlot(slotIdx: number) {
    const occupant = placed[slotIdx]
    if (picked) {
      const next = [...placed]
      const fromIdx = placed.indexOf(picked)
      if (fromIdx >= 0) {            // moving a pitch player
        next[fromIdx] = occupant ?? null   // swap or vacate
        next[slotIdx] = picked
      } else {                       // placing a bench player
        next[slotIdx] = picked       // occupant (if any) returns to bench automatically
      }
      commit(next)
      const name = byId[picked]?.first
      say(occupant && occupant !== picked ? `${name} swapped with ${byId[occupant].first}.` : `${name} to ${shape.slots[slotIdx].pos}.`)
      setPicked(null)
    } else if (occupant) {           // pick the player in this slot
      setPicked(occupant)
      say(`${byId[occupant].first}: drag to move or swap. Or tap, then tap where they go.`)
    } else {
      say(`${shape.slots[slotIdx].pos}: empty. Pick a player, then tap here.`)
    }
  }

  function tapBenchArea() {
    if (picked && placed.includes(picked)) {   // send picked pitch player to bench
      commit(placed.map(x => x === picked ? null : x))
      say(`${byId[picked].first} to the bench.`)
      setPicked(null)
    }
  }

  function switchShape(name: string) {
    if (name === shapeName && mode === 'builder') { say(`${name} is showing.`); return }
    const newShape = shapeByName(cfg.side, name)!
    pushHistory()
    setPlaced(remap(shape, newShape, placed))
    setShapeName(name); setMode('builder'); setPicked(null)
    say(`${name} is showing.`)
  }

  function fillForMe() {
    pushHistory()
    const next = [...placed]
    let pool = cfg.roster.filter(p => p.available && !next.includes(p.id))
    next.forEach((pid, i) => {
      if (pid) return
      const slotPos = shape.slots[i].pos
      // prefer a bench player whose positions include this spot
      let idx = pool.findIndex(p => p.positions.includes(slotPos))
      if (idx < 0) idx = 0
      if (pool.length) { next[i] = pool[idx].id; pool = pool.filter((_, k) => k !== idx) }
    })
    setPlaced(next); setPicked(null)
    say('Filled from who is coming, where each plays best and who is owed minutes. Change anything.')
  }

  function clearAll() { commit(new Array(shape.slots.length).fill(null)); setPicked(null); say('Everyone is back on the bench.') }
  function undo() { setHistory(h => { if (!h.length) { say('Nothing to undo.'); return h } setPlaced(h[h.length - 1]); setPicked(null); say('The last move is undone.'); return h.slice(0, -1) }) }

  const canPlayCount = cfg.roster.filter(p => p.available).length
  const onPitchCount = placed.filter(Boolean).length

  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'var(--font-sans)', position: 'relative' }} data-screen={mode === 'own' ? 'FB1x-FormationOwn' : empty ? 'FB1e-FormationEmpty' : 'FB1-Formation'}>
      {/* Header */}
      <div style={{ flex: 'none', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: `1px solid ${LN}`, background: '#fff' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>Formation</h1>
            <button onClick={() => setMenuOpen(o => !o)} style={{ height: 40, padding: '0 12px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
              {empty ? 'Pick a game' : cfg.game}
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
          </div>
          <div style={{ fontSize: 12, color: MUT, marginTop: 3 }}>{mode === 'own' ? `${cfg.side} a side · your own shape · not saved yet` : cfg.meta}</div>
        </div>
        <div style={{ flexGrow: 1 }} />
        {cfg.parts.length > 0 && mode !== 'own' && (
          <div style={{ display: 'flex', gap: 2, background: '#f4f6f5', borderRadius: 10, padding: 3 }}>
            {cfg.parts.map((p, i) => (
              <button key={p.label} onClick={() => { setPart(i); say(`${p.label}: its own line-up. Minutes add up across them.`) }} style={{ height: 34, padding: '0 14px', borderRadius: 8, border: 0, background: part === i ? GREEN : 'transparent', color: part === i ? '#fff' : MUT, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{p.label}</button>
            ))}
          </div>
        )}
        <IconBtn label="Undo" onClick={undo} path="M3 7v6h6M3 13a9 9 0 103-7.7L3 8" />
        <IconBtn label="Share or print" onClick={() => setShareOpen(true)} path="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
        <button onClick={() => say("Saved as Saturday's line-up.")} style={btnOutline}>Save</button>
        <button onClick={() => onNav ? onNav('T2-TabletMatch') : say('Opening Match day · Line-up and minutes.')} style={btnPrimary}>Use on the team sheet</button>
      </div>

      {/* Shape tabs */}
      <div style={{ flex: 'none', padding: '10px 28px 0', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {shapes.map(s => <ShapeTab key={s.name} name={s.name} selected={mode === 'builder' && shapeName === s.name} onClick={() => switchShape(s.name)} />)}
        {savedTabs.map(n => <ShapeTab key={n} name={n} selected={false} onClick={() => say(`${n}: your saved shape.`)} />)}
        <button onClick={() => { setMode('own'); setPicked(null); say('Your own: put players anywhere. A guide line shows when they are level.') }} style={{ height: 44, padding: '0 14px', borderRadius: 12, border: `1.5px ${mode === 'own' ? 'solid' : 'dashed'} ${mode === 'own' ? LEAF : '#c5ccca'}`, background: mode === 'own' ? GREEN : '#fff', color: mode === 'own' ? '#fff' : INK, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 7 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></svg>Your own
        </button>
        <div style={{ flexGrow: 1 }} />
        <button onClick={() => say('More shapes for this many players, and any you have saved.')} style={{ height: 44, padding: '0 14px', borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>More shapes <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg></button>
      </div>

      {/* Body: pitch + bench */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 316px', gap: 14, padding: '12px 28px 14px', overflow: 'hidden' }}>
        {/* Builder column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          <Pitch shape={shape} placed={placed} picked={picked} byId={byId} loose={cfg.posStyle === 'loose'} onSlot={tapSlot} />
          {/* Checks */}
          <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {cfg.checks.map((c, i) => (
              <div key={i} style={{ background: c.ok ? '#fff' : SANDBG, border: `1px solid ${c.ok ? LN : SAND}`, borderRadius: 12, padding: '10px 12px', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                {c.ok
                  ? <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M20 6L9 17l-5-5" /></svg>
                  : <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9a7b3a" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M12 9v4M12 17h.01M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" /></svg>}
                <div style={{ fontSize: 12.5, color: INK, lineHeight: 1.4 }}><strong>{c.subject}</strong> {c.rest}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bench column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          <div onClick={tapBenchArea} style={{ flexGrow: 1, minHeight: 0, background: '#fff', border: `1.5px solid ${picked && placed.includes(picked) ? LEAF : LN}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ flex: 'none', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>{cfg.benchHeader}</span>
              <span style={{ fontSize: 12, color: MUT }}>{toPlace} to place</span>
            </div>
            <div style={{ flexGrow: 1, overflowY: 'auto', margin: '0 -4px', padding: '0 4px' }}>
              {benchPlayers.map(p => <BenchRow key={p.id} p={p} picked={picked === p.id} onClick={() => tapBench(p)} loose={cfg.posStyle === 'loose'} />)}
              {unavailable.length > 0 && (
                <>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT, margin: '10px 0 4px' }}>NOT AVAILABLE SATURDAY</div>
                  {unavailable.map(p => <BenchRow key={p.id} p={p} picked={false} onClick={() => tapBench(p)} loose={cfg.posStyle === 'loose'} />)}
                </>
              )}
            </div>
            <div style={{ flex: 'none', fontSize: 12, color: MUT, lineHeight: 1.4, borderTop: `1px solid ${LN}`, paddingTop: 8, marginTop: 8 }}>
              {picked ? 'Tap a spot on the pitch, or a player to swap.' : cfg.posStyle === 'loose' ? 'Spots are only “back, middle, front”. Children swap every quarter.' : 'Tap a player, then a spot. Or drag onto the pitch.'}
            </div>
          </div>
          {mode === 'own' ? (
            <div style={{ flex: 'none', display: 'flex', gap: 8 }}>
              <input value={ownName} onChange={e => setOwnName(e.target.value)} placeholder="Name this shape" style={{ flexGrow: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, padding: '0 12px', fontSize: 14, fontFamily: 'inherit', color: INK, outline: 'none' }} />
              <button onClick={() => { const n = ownName.trim() || 'Your own'; setSavedTabs(t => [...t, n]); setOwnName(''); say(`Saved. “${n}” is now a tab for ${cfg.teamLabel.split(' · ')[0]}.`) }} style={btnPrimary}>Save as a tab</button>
            </div>
          ) : (
            <div style={{ flex: 'none', display: 'flex', gap: 8 }}>
              <button onClick={fillForMe} style={{ ...btnOutline, flex: 1 }}>Fill it for me</button>
              <button onClick={clearAll} style={{ ...btnOutline, flex: 1 }}>Clear</button>
            </div>
          )}
        </div>
      </div>

      {/* Game picker menu */}
      {menuOpen && <GamePicker cfg={cfg} onClose={() => setMenuOpen(false)} onNav={onNav} say={say} />}
      {/* Share sheet */}
      {shareOpen && <ShareSheet cfg={cfg} shape={shape} placed={placed} byId={byId} when={shareWhen} setWhen={setShareWhen} who={shareWho} setWho={setShareWho} onClose={() => setShareOpen(false)} say={say} />}

      <div style={{ position: 'absolute', bottom: 8, left: 28, fontSize: 11, color: MUT }}>{onPitchCount} on the pitch · {canPlayCount} can play</div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 200, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', maxWidth: 560, textAlign: 'center' }}>{toast}</div>}
    </div>
  )
}

const btnOutline: React.CSSProperties = { height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }
const btnPrimary: React.CSSProperties = { height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: GREEN, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }

function IconBtn({ label, onClick, path }: { label: string; onClick: () => void; path: string }) {
  return (
    <button aria-label={label} title={label} onClick={onClick} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
    </button>
  )
}

function ShapeTab({ name, selected, onClick }: { name: string; selected: boolean; onClick: () => void }) {
  // dot picture: rows per number in the name, keeper at bottom
  const rows = name.split('-').map(Number)
  return (
    <button onClick={onClick} style={{ height: 44, padding: '0 14px', borderRadius: 12, border: `1.5px solid ${selected ? LEAF : LN}`, background: selected ? GREEN : '#fff', color: selected ? '#fff' : INK, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 9 }}>
      <svg width={22} height={26} viewBox="0 0 22 26" aria-hidden="true">
        {rows.map((n, ri) => Array.from({ length: n }).map((_, ci) => (
          <circle key={`${ri}-${ci}`} cx={2 + (ci + 1) * (18 / (n + 1))} cy={4 + ri * (18 / rows.length)} r={1.7} fill={selected ? '#fff' : LEAF} />
        )))}
        <circle cx={11} cy={23} r={1.7} fill={selected ? '#fff' : LEAF} />
      </svg>
      {name}
    </button>
  )
}

function Pitch({ shape, placed, picked, byId, loose, onSlot }: { shape: Shape; placed: (string | null)[]; picked: string | null; byId: Record<string, Player>; loose: boolean; onSlot: (i: number) => void }) {
  return (
    <div style={{ flexGrow: 1, minHeight: 0, position: 'relative', background: PITCH, borderRadius: 18, overflow: 'hidden' }}>
      {/* stripes */}
      {[0, 2, 4, 6].map(i => <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 12.5}%`, height: '12.5%', background: 'rgba(255,255,255,0.035)' }} />)}
      {/* markings */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <rect x="3" y="3.5" width="94" height="93" fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="0.4" />
        <line x1="3" y1="50" x2="97" y2="50" stroke="rgba(255,255,255,0.34)" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="9" fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="0.6" fill="rgba(255,255,255,0.4)" />
        <rect x="26" y="3" width="48" height="13" fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="0.4" />
        <rect x="38" y="3" width="24" height="5" fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="0.4" />
        <rect x="26" y="84" width="48" height="13" fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="0.4" />
        <rect x="38" y="92" width="24" height="5" fill="none" stroke="rgba(255,255,255,0.34)" strokeWidth="0.4" />
      </svg>
      <div style={{ position: 'absolute', top: 10, left: 14, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>ATTACKING THIS WAY ↑</div>
      {/* tokens / empty spots */}
      {shape.slots.map((slot, i) => {
        const pid = placed[i]
        const p = pid ? byId[pid] : null
        return <Token key={i} slot={slot} player={p} picked={!!pid && picked === pid} isTarget={!!picked && picked !== pid} loose={loose} onClick={() => onSlot(i)} />
      })}
    </div>
  )
}

function Token({ slot, player, picked, isTarget, loose, onClick }: { slot: { x: number; y: number; pos: string }; player: Player | null; picked: boolean; isTarget: boolean; loose: boolean; onClick: () => void }) {
  const size = 46
  return (
    <button onClick={onClick} style={{ position: 'absolute', left: `${slot.x}%`, top: `${slot.y}%`, transform: 'translate(-50%,-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 8, fontFamily: 'inherit' }}>
      <div style={{ position: 'relative', width: size, height: size, borderRadius: '50%', background: player ? '#fff' : 'transparent', border: player ? (picked ? '3px solid #fff' : 'none') : '2px dashed rgba(255,255,255,0.5)', boxShadow: player ? (picked ? '0 0 0 3px rgba(31,74,62,0.9), 0 4px 10px rgba(0,0,0,0.3)' : isTarget ? '0 0 0 2px rgba(255,255,255,0.5)' : '0 3px 8px rgba(0,0,0,0.3)') : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {player ? <span style={{ fontSize: 17, fontWeight: 800, color: INK }}>{player.num}</span> : <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>{slot.pos}</span>}
        {player?.captain && <span style={{ position: 'absolute', top: -2, left: -2, width: 16, height: 16, borderRadius: '50%', background: '#fff', color: INK, fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>C</span>}
      </div>
      {player ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(16,33,31,0.62)', borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{player.first}</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.65)' }}>{loose ? slot.pos.toUpperCase() : slot.pos}</span>
        </span>
      ) : (
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>Empty</span>
      )}
      {player?.note && <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>{player.note}</span>}
    </button>
  )
}

function BenchRow({ p, picked, onClick, loose }: { p: Player; picked: boolean; onClick: () => void; loose: boolean }) {
  const na = !p.available
  return (
    <button onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, padding: '6px 8px', borderRadius: 10, background: picked ? PALE : 'transparent', border: 'none', cursor: na ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', opacity: na ? 0.55 : 1 }}>
      {!na && <svg width={12} height={16} viewBox="0 0 12 16" aria-hidden="true" style={{ flexShrink: 0 }}>{[0, 1, 2].map(r => [0, 1].map(c => <circle key={`${r}-${c}`} cx={2 + c * 8} cy={3 + r * 5} r={1.3} fill="#c5ccca" />))}</svg>}
      <span style={{ width: 28, height: 28, borderRadius: '50%', border: `1.5px solid ${picked ? LEAF : '#c5ccca'}`, background: picked ? LEAF : '#fff', color: picked ? '#fff' : INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{p.num}</span>
      <span style={{ flexGrow: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.full}</span>
        <span style={{ display: 'block', fontSize: 12, color: MUT }}>{na ? p.reason : p.note}</span>
      </span>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', color: MUT, flexShrink: 0 }}>{loose ? 'ANYWHERE' : p.positions.join(' · ')}</span>
    </button>
  )
}

function GamePicker({ cfg, onClose, onNav, say }: { cfg: TeamCfg; onClose: () => void; onNav?: (s: string) => void; say: (m: string) => void }) {
  const Row = ({ title, sub, tag, onClick }: { title: string; sub: string; tag?: string; onClick: () => void }) => (
    <button onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', border: 'none', borderTop: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
      <span style={{ flexGrow: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: INK }}>{title}</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>{sub}</span></span>
      {tag && <span style={{ fontSize: 11, fontWeight: 700, color: MUT }}>{tag}</span>}
    </button>
  )
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 50 }} />
      <div style={{ position: 'absolute', top: 60, left: 150, width: 470, maxHeight: 520, overflowY: 'auto', zIndex: 60, background: '#fff', borderRadius: 14, border: `1px solid ${LN}`, boxShadow: '0 16px 40px rgba(16,33,31,0.22)' }}>
        <div style={{ padding: '12px 14px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>COMING UP</div>
        <Row title={cfg.game} sub={`${cfg.defaultShape} · both halves set`} tag="Editing" onClick={() => { onClose(); say('Editing this game.') }} />
        <Row title="Sat 13 June · at Kestrel Park" sub="Not started" onClick={() => { onClose(); say('New game — pick a shape and start placing.') }} />
        <div style={{ padding: '12px 14px 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>START FROM ONE THAT WORKED</div>
        <Row title="Most goals scored" sub="3-3-2 · 7 goals in 142 minutes together" tag="From film" onClick={() => { onClose(); say('Copied the most-goals line-up into this game.') }} />
        <Row title="Fewest goals let in" sub="4-3-1 · 1 goal in 96 minutes together" tag="From film" onClick={() => { onClose(); say('Copied the fewest-conceded line-up into this game.') }} />
        <Row title="Last Saturday at Ironbark" sub="3-3-2 · won 3–1" tag="Used" onClick={() => { onClose(); say('Copied last Saturday’s line-up into this game.') }} />
        <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: `1px solid ${LN}` }}>
          <button onClick={() => { onClose(); onNav ? onNav('SQ1-BestLineups') : say('Opening Line-ups that worked.') }} style={{ ...btnOutline, flex: 1 }}>All that worked</button>
          <button onClick={() => { onClose(); say('Blank line-up — everyone on the bench.') }} style={{ ...btnPrimary, flex: 1 }}>New blank line-up</button>
        </div>
      </div>
    </>
  )
}

function ShareSheet({ cfg, shape, placed, byId, when, setWhen, who, setWho, onClose, say }: { cfg: TeamCfg; shape: Shape; placed: (string | null)[]; byId: Record<string, Player>; when: string; setWhen: (s: string) => void; who: 'families' | 'coaches'; setWho: (w: 'families' | 'coaches') => void; onClose: () => void; say: (m: string) => void }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.35)', zIndex: 80 }} />
      <aside style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 470, background: '#fff', zIndex: 90, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 30px rgba(16,33,31,0.2)' }}>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${LN}` }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: INK, flexGrow: 1 }}>Share the line-up</span>
          <button onClick={onClose} aria-label="Close" style={{ width: 36, height: 36, borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', fontSize: 18, color: MUT }}>×</button>
        </div>
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: 20 }}>
          {/* mini pitch preview */}
          <div style={{ position: 'relative', aspectRatio: '4 / 3', background: PITCH, borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ position: 'absolute', top: 8, left: 12, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>ATTACKING THIS WAY ↑</div>
            {shape.slots.map((s, i) => { const pid = placed[i]; const p = pid ? byId[pid] : null; return (
              <div key={i} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: p ? '#fff' : 'transparent', border: p ? 'none' : '1.5px dashed rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: INK }}>{p?.num ?? ''}</span>
                {p && <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>{p.first}</span>}
              </div>
            ) })}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: MUT, marginBottom: 8 }}>WHO GETS IT</div>
          {([['families', `Players and families of ${cfg.teamLabel.split(' · ')[0]}`, 'In the app. Each family sees their own child ringed.'], ['coaches', 'Only the coaching team', 'Jess, Priya and Rob']] as const).map(([k, t, s]) => (
            <button key={k} onClick={() => setWho(k)} style={{ width: '100%', display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 0', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
              <span style={{ width: 20, height: 20, borderRadius: 999, border: `2px solid ${who === k ? GREEN : '#c5ccca'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{who === k && <span style={{ width: 10, height: 10, borderRadius: 999, background: GREEN }} />}</span>
              <span><span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: INK }}>{t}</span><span style={{ display: 'block', fontSize: 12, color: MUT }}>{s}</span></span>
            </button>
          ))}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: MUT, margin: '14px 0 8px' }}>WHEN</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Friday 6:00 pm', 'An hour before', 'Now'].map(w => (
              <button key={w} onClick={() => setWhen(w)} style={{ height: 38, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${when === w ? LEAF : LN}`, background: when === w ? GREEN : '#fff', color: when === w ? '#fff' : INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{w}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, marginTop: 14 }}>First names only. No reasons are shown: “first half only” and who is owed minutes stay with you.</div>
        </div>
        <div style={{ flex: 'none', display: 'flex', gap: 8, padding: 16, borderTop: `1px solid ${LN}` }}>
          <button onClick={() => say('A picture of the pitch is saved to this tablet.')} style={btnOutline}>Save a picture</button>
          <button onClick={() => say('Opens the print sheet: one page, both halves.')} style={btnOutline}>Print</button>
          <div style={{ flexGrow: 1 }} />
          <button onClick={() => { onClose(); say(when === 'Now' ? 'Sent now to 17 families. You can still change it.' : `Set. The line-up goes to 17 families ${when === 'An hour before' ? 'an hour before kick-off' : 'on Friday at 6:00 pm'}. You can still change it until then.`) }} style={btnPrimary}>{when === 'Now' ? 'Send now' : when === 'An hour before' ? 'Send an hour before' : 'Send on Friday'}</button>
        </div>
      </aside>
    </>
  )
}
