import { openThing } from '../openThing'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TEAMS, shapesFor, shapeByName as staticShape, remap, MORE_SHAPES, lineShape, type TeamCfg, type Shape, type Player } from './formationData'
import { getInsights, keyPairs, bestLineup, forThisWeek, shapeLine, wordsFor, value, fmt, type FormationPreset, type Insights, type MetricKey } from './lineupInsights'

// Squad › Formation builder (tablet). Pick a shape, place players from the bench
// onto the pitch by tap-then-tap OR drag, move and swap them, run the checks, and
// send to the team sheet or families. Dragging a player to a free spot drops into
// a custom ("Your own") shape. From formation-v1 handover.

const INK = '#10211f', PITCH = '#1c3a33', GREEN = '#2f6252', LEAF = '#40826d'
const MUT = '#6f7f7b', LN = '#e8edeb', PALE = '#eef5f2', SAND = '#cbbeb5', SANDBG = '#f6f1e9'

type Mode = 'builder' | 'own'
type XY = { x: number; y: number }
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

type Snap = { placed: (string | null)[]; custom: Record<string, XY> | null; mode: Mode; shapeName: string }

/** A state of the board to open on, so each designed state has its own address. */
export type FormationOpen = 'share' | 'drag' | 'tap' | 'own' | 'saved'

export default function FormationBuilder({ team = 'juniors', onNav, empty, preset, open }: { team?: string; onNav?: (s: string) => void; empty?: boolean; preset?: FormationPreset | null; open?: FormationOpen }) {
  const cfg: TeamCfg = TEAMS[team] ?? TEAMS.juniors
  const [added, setAdded] = useState<Shape[]>([])                 // shapes brought in from "More shapes"
  const [moreOpen, setMoreOpen] = useState(false)
  const shapes = useMemo(() => [...shapesFor(cfg.side), ...added], [cfg.side, added])
  const shapeByName = (_side: number, name: string) => shapes.find(s => s.name === name) ?? staticShape(cfg.side, name)
  const [others, setOthers] = useState<Record<number, (string | null)[]>>({})   // the line-up of each part of the game that is not showing
  const [slotPick, setSlotPick] = useState<number | null>(null)   // an empty spot tapped first, waiting for a player
  const loose = cfg.posStyle === 'loose'
  // What recorded games say about each shape and pair (null for MiniRoos and under 12s).
  const ins = useMemo(() => empty ? null : getInsights(team), [team, empty])
  const pairsToKeep = useMemo(() => ins ? keyPairs(ins) : [], [ins])
  const [loaded, setLoaded] = useState<string | null>(preset?.note ?? null)
  const [shapeName, setShapeName] = useState(preset?.shape ?? cfg.defaultShape)
  const [mode, setMode] = useState<Mode>('builder')
  const [part, setPart] = useState(0)
  const [placed, setPlaced] = useState<(string | null)[]>(() => preset ? [...preset.placed] : empty ? new Array(shapeByName(cfg.side, cfg.defaultShape)!.slots.length).fill(null) : [...cfg.start])
  const [custom, setCustom] = useState<Record<string, XY> | null>(null)
  const [picked, setPicked] = useState<string | null>(null)
  const [, setHistory] = useState<Snap[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(open === 'saved')
  const [shareOpen, setShareOpen] = useState(open === 'share')
  const [ownName, setOwnName] = useState(open === 'own' ? 'Diamond, wide mids' : '')
  const [savedTabs, setSavedTabs] = useState<string[]>([])
  const [shareWhen, setShareWhen] = useState('Friday 6:00 pm')
  const [shareWho, setShareWho] = useState<'families' | 'coaches'>('families')
  const [drag, setDrag] = useState<{ id: string; x: number; y: number } | null>(null)
  const pitchRef = useRef<HTMLDivElement>(null)
  const benchRef = useRef<HTMLDivElement>(null)
  const didDrag = useRef(false)
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 2800) }

  // Open on a designed state: a bench player picked (tap), held over a spot (drag), or the coach's own shape.
  useEffect(() => {
    if (!open || open === 'share' || open === 'saved') return
    const sh = shapeByName(cfg.side, cfg.defaultShape) ?? shapes[0]
    const onIds = new Set(cfg.start.filter(Boolean) as string[])
    const bench = cfg.roster.find(p => p.available && !onIds.has(p.id))
    if (open === 'own') {
      const base: Record<string, XY> = {}
      cfg.start.forEach((id, i) => { if (id) base[id] = i === 0 ? { x: sh.slots[0].x, y: sh.slots[0].y } : { x: sh.slots[i].x + (i % 2 ? 3 : -3), y: sh.slots[i].y + (i % 3 === 0 ? 0 : i % 3 === 1 ? -4 : 2) } })
      setCustom(base); setMode('own'); return
    }
    if (!bench) return
    if (open === 'tap') { setPicked(bench.id); return }
    const r = pitchRef.current?.getBoundingClientRect()
    const target = sh.slots.reduce((best, s2, i) => s2.x > sh.slots[best].x ? i : best, 0)   // the right-most spot
    if (r) setDrag({ id: bench.id, x: r.left + (r.width * sh.slots[target].x) / 100 + 46, y: r.top + (r.height * sh.slots[target].y) / 100 - 40 })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const shape: Shape = useMemo(() => shapes.find(s => s.name === shapeName) ?? staticShape(cfg.side, shapeName) ?? shapes[0], [cfg.side, shapeName, shapes])
  const byId = useMemo(() => Object.fromEntries(cfg.roster.map(p => [p.id, p])) as Record<string, Player>, [cfg.roster])

  // Who is on the pitch, with coordinates, in either mode.
  const onPitch: { id: string; x: number; y: number; pos: string; slotIdx?: number }[] = mode === 'own' && custom
    ? Object.entries(custom).map(([id, p]) => ({ id, x: p.x, y: p.y, pos: ownLabel(byId[id], p.y, loose) }))
    : (placed.map((id, i) => id ? { id, x: shape.slots[i].x, y: shape.slots[i].y, pos: shape.slots[i].pos, slotIdx: i } : null).filter(Boolean) as any)

  const onPitchIds = new Set(onPitch.map(p => p.id))
  const benchPlayers = cfg.roster.filter(p => p.available && !onPitchIds.has(p.id))
  const unavailable = cfg.roster.filter(p => !p.available)
  const toPlace = benchPlayers.length

  function snapshot(): Snap { return { placed: [...placed], custom: custom ? { ...custom } : null, mode, shapeName } }
  function pushHistory() { setHistory(h => [...h.slice(-19), snapshot()]) }

  // ── tap-then-tap ──
  function tapBench(p: Player) {
    if (!p.available) { say(`${p.full}: not available, so cannot be placed.`); return }
    if (slotPick !== null && mode !== 'own' && !placed[slotPick]) { pushHistory(); const next = [...placed]; next[slotPick] = p.id; setPlaced(next); say(`${p.first} to ${shape.slots[slotPick].pos}.`); setSlotPick(null); setPicked(null); return }
    setPicked(cur => cur === p.id ? null : p.id)
    if (picked !== p.id) say(`${p.full}: drag onto the pitch. Or tap, then tap a spot.`)
  }
  function tapPitchPlayer(id: string) {
    if (picked && picked !== id) { pushHistory(); swapPlayers(picked, id); setPicked(null); say(`${byId[picked].first} swapped with ${byId[id].first}.`); return }
    setPicked(cur => cur === id ? null : id)
    if (picked !== id) say(`${byId[id].first}: drag to move or swap. Or tap, then tap where they go.`)
  }
  function tapSlot(i: number) {           // builder empty slot
    if (!picked) { setSlotPick(cur => cur === i ? null : i); say(slotPick === i ? `${shape.slots[i].pos}: no longer picked.` : `${shape.slots[i].pos} is picked. Now tap a player on the bench.`); return }
    setSlotPick(null)
    pushHistory()
    const next = [...placed]; const from = placed.indexOf(picked)
    if (from >= 0) next[from] = null
    next[i] = picked
    setPlaced(next); say(`${byId[picked].first} to ${shape.slots[i].pos}.`); setPicked(null)
  }
  function tapBenchArea() {
    if (picked && onPitchIds.has(picked)) { pushHistory(); returnToBench(picked); say(`${byId[picked].first} to the bench.`); setPicked(null) }
  }

  // ── placement primitives (work in both modes) ──
  function swapPlayers(a: string, b: string) {   // a may be bench or pitch; b is on pitch
    const aOnPitch = onPitchIds.has(a)
    if (mode === 'own' && custom) {
      const cp = { ...custom }
      if (aOnPitch) { const t = cp[a]; cp[a] = cp[b]; cp[b] = t } else { cp[a] = cp[b]; delete cp[b] }
      setCustom(cp)
    } else {
      const next = [...placed]; const bi = placed.indexOf(b)
      if (aOnPitch) { const ai = placed.indexOf(a); next[ai] = b; next[bi] = a } else { next[bi] = a }
      setPlaced(next)
    }
  }
  function returnToBench(id: string) {
    if (mode === 'own' && custom) { const cp = { ...custom }; delete cp[id]; setCustom(cp) }
    else setPlaced(placed.map(p => p === id ? null : p))
  }
  function freePlace(id: string, x: number, y: number) {   // → custom mode, free coords
    const base: Record<string, XY> = mode === 'own' && custom ? { ...custom } : {}
    if (mode !== 'own') placed.forEach((pid, i) => { if (pid) base[pid] = { x: shape.slots[i].x, y: shape.slots[i].y } })
    base[id] = { x: clamp(x, 7, 93), y: clamp(y, 7, 93) }
    setCustom(base); setMode('own')
    say(mode !== 'own' ? `${byId[id].first} placed. This is now your own shape — fine-tune anyone.` : `${byId[id].first} moved.`)
  }

  // ── drag (pointer events: mouse, touch, pen) ──
  function startDrag(e: React.PointerEvent, id: string) {
    const p = byId[id]
    if (!p?.available) { say(`${p?.full}: not available, so cannot be placed.`); return }
    const sx = e.clientX, sy = e.clientY
    let moved = false
    const move = (ev: PointerEvent) => {
      if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) { moved = true; pushHistory() }
      if (moved) { ev.preventDefault(); setDrag({ id, x: ev.clientX, y: ev.clientY }) }
    }
    const up = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up)
      setDrag(null)
      if (moved) { didDrag.current = true; handleDrop(id, ev.clientX, ev.clientY) }
    }
    window.addEventListener('pointermove', move, { passive: false }); window.addEventListener('pointerup', up)
  }
  function handleDrop(id: string, cx: number, cy: number) {
    const r = pitchRef.current?.getBoundingClientRect()
    const br = benchRef.current?.getBoundingClientRect()
    const overBench = !!br && cx >= br.left && cx <= br.right && cy >= br.top && cy <= br.bottom
    const inside = !!r && cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom
    if (!inside || overBench) { returnToBench(id); setPicked(null); if (overBench || !inside) say(`${byId[id].first} to the bench.`); return }
    const x = ((cx - r!.left) / r!.width) * 100, y = ((cy - r!.top) / r!.height) * 100
    setPicked(null)
    if (mode === 'own') {
      const t = nearestPitch(x, y, id, 9)
      if (t) { swapPlayers(id, t); say(`${byId[id].first} swapped with ${byId[t].first}.`) }
      else { const cp = { ...(custom || {}) }; cp[id] = { x: clamp(x, 7, 93), y: clamp(y, 7, 93) }; setCustom(cp); say(onPitchIds.has(id) ? `${byId[id].first} moved.` : `${byId[id].first} placed anywhere.`) }
      return
    }
    // builder: snap to nearest slot (swap/fill); else free → custom
    const si = nearestSlot(x, y, 11)
    if (si >= 0) {
      const occ = placed[si]
      if (occ === id) return
      const next = [...placed]; const from = placed.indexOf(id)
      if (from >= 0) next[from] = occ ?? null
      next[si] = id
      setPlaced(next)
      say(occ ? `${byId[id].first} swapped with ${byId[occ].first}.` : `${byId[id].first} to ${shape.slots[si].pos}.`)
    } else freePlace(id, x, y)
  }
  function nearestSlot(x: number, y: number, thresh: number): number {
    let best = -1, bd = thresh * thresh
    shape.slots.forEach((s, i) => { const d = (s.x - x) ** 2 + (s.y - y) ** 2; if (d < bd) { bd = d; best = i } })
    return best
  }
  function nearestPitch(x: number, y: number, exclude: string, thresh: number): string | null {
    let best: string | null = null, bd = thresh * thresh
    onPitch.forEach(p => { if (p.id === exclude) return; const d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; best = p.id } })
    return best
  }

  // ── shape / tools ──
  function switchShape(name: string) {
    if (name === shapeName && mode === 'builder') { say(`${name} is showing.`); return }
    const newShape = shapeByName(cfg.side, name)!
    pushHistory()
    // from custom, snap everyone to nearest slot of the chosen shape
    const current = mode === 'own' && custom
      ? newShape.slots.map(() => null as string | null) // filled below
      : remap(shape, newShape, placed)
    if (mode === 'own' && custom) {
      const next: (string | null)[] = new Array(newShape.slots.length).fill(null)
      const used = new Set<number>()
      Object.entries(custom).forEach(([id, p]) => {
        let bi = -1, bd = Infinity
        newShape.slots.forEach((s, j) => { if (used.has(j)) return; const d = (s.x - p.x) ** 2 + (s.y - p.y) ** 2; if (d < bd) { bd = d; bi = j } })
        if (bi >= 0) { next[bi] = id; used.add(bi) }
      })
      setPlaced(next)
    } else setPlaced(current)
    setCustom(null); setShapeName(name); setMode('builder'); setPicked(null)
    say(`${name} is showing.`)
  }
  function enterOwn() {
    pushHistory()
    const base: Record<string, XY> = {}
    onPitch.forEach(p => { base[p.id] = { x: p.x, y: p.y } })
    setCustom(base); setMode('own'); setPicked(null)
    say('Your own: drag anyone anywhere. A guide line shows when they are level.')
  }
  function fillForMe() {
    pushHistory()
    if (mode === 'own' && custom) {
      const cp = { ...custom }; let pool = cfg.roster.filter(p => p.available && !(p.id in cp))
      const zones: XY[] = [{ x: 50, y: 85 }, { x: 25, y: 68 }, { x: 50, y: 70 }, { x: 75, y: 68 }, { x: 30, y: 46 }, { x: 70, y: 46 }, { x: 35, y: 24 }, { x: 65, y: 24 }, { x: 50, y: 34 }]
      for (const z of zones) { if (!pool.length) break; cp[pool[0].id] = z; pool = pool.slice(1) }
      setCustom(cp); say('Filled your own shape from who is coming. Drag to fine-tune.')
      return
    }
    const next = [...placed]; let pool = cfg.roster.filter(p => p.available && !next.includes(p.id))
    next.forEach((pid, i) => {
      if (pid) return
      let idx = pool.findIndex(p => p.positions.includes(shape.slots[i].pos)); if (idx < 0) idx = 0
      if (pool.length) { next[i] = pool[idx].id; pool = pool.filter((_, k) => k !== idx) }
    })
    setPlaced(next); setPicked(null)
    say('Filled from who is coming, where each plays best and who is owed minutes. Change anything.')
  }
  // Each part of the game keeps its own line-up. The second half starts with the bench brought on for the outfield players who started.
  function switchPart(i: number, label: string) {
    if (i === part) { say(`${label} is showing.`); return }
    if (mode === 'own') { say('Save your own shape as a tab first, then set each half.'); return }
    const fresh = () => { const next = [...placed]; const bench = cfg.roster.filter(p => p.available && !placed.includes(p.id)); let b = 0; for (let k = next.length - 1; k > 0 && b < bench.length; k--) if (next[k]) next[k] = bench[b++].id; return next }
    setOthers(o => ({ ...o, [part]: placed })); setPlaced(others[i] ?? fresh()); setPart(i); setPicked(null); setSlotPick(null); setHistory([])
    say(`${label}: its own line-up. Minutes add up across them.`)
  }
  function addShape(name: string) {
    if (!shapes.some(s => s.name === name)) setAdded(a => [...a, lineShape(name)])
    setMoreOpen(false)
    const to = shapes.find(s => s.name === name) ?? lineShape(name)
    pushHistory(); setPlaced(remap(shape, to, mode === 'own' && custom ? shape.slots.map((_, k) => placed[k] ?? null) : placed)); setCustom(null); setShapeName(name); setMode('builder'); setPicked(null)
    say(`${name} added to your shapes and showing.`)
  }
  function clearAll() { pushHistory(); if (mode === 'own') setCustom({}); else setPlaced(new Array(shape.slots.length).fill(null)); setPicked(null); say('Everyone is back on the bench.') }
  function undo() {
    setHistory(h => {
      if (!h.length) { say('Nothing to undo.'); return h }
      const s = h[h.length - 1]; setPlaced(s.placed); setCustom(s.custom); setMode(s.mode); setShapeName(s.shapeName); setPicked(null)
      say('The last move is undone.'); return h.slice(0, -1)
    })
  }

  // Load a line-up that worked, made ready for this week (anyone out is swapped).
  function loadWorked(k: MetricKey) {
    if (!ins) return
    const l = bestLineup(ins, k, ins.bestShape[k]); if (!l) return
    const w = forThisWeek(ins, l, wordsFor(team).find(x => x.key === k)!.label)
    pushHistory()
    setShapeName(w.shape); setPlaced([...w.placed]); setCustom(null); setMode('builder'); setPicked(null); setLoaded(w.note)
    say(`Loaded: ${w.note}`)
  }

  const onPitchCount = onPitch.length
  const canPlayCount = cfg.roster.filter(p => p.available).length

  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'var(--font-sans)', position: 'relative' }} data-screen={mode === 'own' ? 'FB1x-FormationOwn' : empty ? 'FB1e-FormationEmpty' : shareOpen ? 'FB1c-FormationShare' : menuOpen ? 'FB1l-FormationSaved' : drag ? 'FB1d-FormationDrag' : picked ? 'FB1t-FormationTap' : 'FB1-Formation'}>
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
        {cfg.parts.length > 0 && (
          <div style={{ display: 'flex', gap: 2, background: '#f4f6f5', borderRadius: 10, padding: 3 }}>
            {cfg.parts.map((p, i) => (
              <button key={p.label} aria-pressed={part === i} onClick={() => switchPart(i, p.label)} style={{ height: 34, padding: '0 14px', borderRadius: 8, border: 0, background: part === i ? GREEN : 'transparent', color: part === i ? '#fff' : MUT, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{p.label}</button>
            ))}
          </div>
        )}
        <IconBtn label="Undo" onClick={undo} path="M3 7v6h6M3 13a9 9 0 103-7.7L3 8" />
        <IconBtn label="Share or print" onClick={() => setShareOpen(true)} path="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
        <button onClick={() => say("Saved as Saturday's line-up.")} style={btnOutline}>Save</button>
        <button onClick={() => onNav ? onNav('T2-TabletMatch') : openThing('Match day · Line-up and minutes', 'coach')} style={btnPrimary}>Use on the team sheet</button>
      </div>

      {/* Shape tabs */}
      <div style={{ flex: 'none', padding: '10px 28px 0', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {shapes.map(s => <ShapeTab key={s.name} name={s.name} tags={(ins?.shapeTags[s.name] ?? []).map(k => wordsFor(team).find(x => x.key === k)!.tag)} selected={mode === 'builder' && shapeName === s.name} onClick={() => switchShape(s.name)} />)}
        {savedTabs.map(n => <ShapeTab key={n} name={n} selected={false} onClick={() => say(`${n}: your saved shape.`)} />)}
        <button onClick={enterOwn} style={{ height: 44, padding: '0 14px', borderRadius: 12, border: `1.5px ${mode === 'own' ? 'solid' : 'dashed'} ${mode === 'own' ? LEAF : '#c5ccca'}`, background: mode === 'own' ? GREEN : '#fff', color: mode === 'own' ? '#fff' : INK, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 7 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></svg>{mode === 'own' ? 'Custom' : 'Your own'}
        </button>
        <div style={{ flexGrow: 1 }} />
        <span style={{ position: 'relative' }}>
          <button aria-expanded={moreOpen} onClick={() => setMoreOpen(o => !o)} style={{ height: 44, padding: '0 14px', borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>More shapes <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg></button>
          {moreOpen && (
            <div role="menu" aria-label="More shapes" style={{ position: 'absolute', right: 0, top: 50, zIndex: 40, width: 250, background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, boxShadow: '0 12px 32px rgba(16,33,31,0.18)', padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT, padding: '6px 8px' }}>FOR {cfg.side} A SIDE</span>
              {(MORE_SHAPES[cfg.side] ?? []).map(n => { const has = shapes.some(x => x.name === n); return <button key={n} role="menuitem" onClick={() => addShape(n)} style={{ minHeight: 44, padding: '0 10px', borderRadius: 10, border: 0, background: 'none', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{n}<span style={{ fontSize: 12, fontWeight: 600, color: MUT }}>{has ? 'In your tabs' : 'Add'}</span></button> })}
              {!(MORE_SHAPES[cfg.side] ?? []).length && <span style={{ fontSize: 13, color: MUT, padding: '6px 8px' }}>Every shape for this many players is already a tab.</span>}
              {savedTabs.length > 0 && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT, padding: '8px 8px 4px' }}>YOURS</span>}
              {savedTabs.map(n => <span key={n} style={{ minHeight: 36, padding: '0 10px', display: 'flex', alignItems: 'center', fontSize: 14, color: INK }}>{n}</span>)}
            </div>
          )}
        </span>
      </div>

      {/* From recorded games: how this shape has gone, and the pairs worth keeping together */}
      {ins && (
        <div data-fb="insight" style={{ flex: 'none', margin: '10px 28px 0', padding: '8px 12px', borderRadius: 12, background: PALE, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: GREEN, flexShrink: 0 }}>FROM RECORDED GAMES</span>
          <span style={{ fontSize: 13, color: INK, lineHeight: 1.4, flex: '1 1 320px', minWidth: 0 }}>{loaded ? <><strong>Loaded:</strong> {loaded} </> : null}{mode === 'own' ? 'Your own shape has no recorded games yet.' : shapeLine(ins, shapeName)}</span>
          {pairsToKeep.map(p => {
            const a = byId[p.a], b = byId[p.b]; if (!a || !b) return null
            const both = onPitchIds.has(p.a) && onPitchIds.has(p.b)
            return <span key={p.a + p.b} title={both ? 'Both on the pitch' : 'Not both on the pitch'} style={{ flexShrink: 0, fontSize: 12, fontWeight: 700, padding: '4px 9px', borderRadius: 999, background: both ? '#fff' : SANDBG, border: `1px solid ${both ? LN : SAND}`, color: INK, whiteSpace: 'nowrap' }}>{a.first} + {b.first}: {both ? 'together' : 'split'}</span>
          })}
          <button onClick={() => onNav ? onNav('SQ1-BestLineups') : openThing('Line-ups that worked', 'coach')} style={{ flexShrink: 0, height: 44, padding: '0 6px', border: 'none', background: 'none', color: GREEN, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>See why</button>
        </div>
      )}

      {/* Body */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 316px', gap: 14, padding: '12px 28px 14px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          {/* Pitch */}
          <div ref={pitchRef} data-fb="pitch" style={{ flexGrow: 1, minHeight: 0, position: 'relative', background: PITCH, borderRadius: 18, overflow: 'hidden', touchAction: 'none' }}>
            {[0, 2, 4, 6].map(i => <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 12.5}%`, height: '12.5%', background: 'rgba(255,255,255,0.035)' }} />)}
            <PitchMarks />
            <div style={{ position: 'absolute', top: 10, left: 14, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>ATTACKING THIS WAY ↑</div>
            {mode === 'own' && custom && <div style={{ position: 'absolute', left: '6%', right: '6%', top: '50%', height: 1, background: 'rgba(255,255,255,0.14)' }} />}
            {/* empty slots (builder only) */}
            {mode !== 'own' && shape.slots.map((slot, i) => placed[i] ? null : <EmptySpot key={`e${i}`} slot={slot} on={slotPick === i} onClick={() => tapSlot(i)} />)}
            {/* tokens */}
            {onPitch.map(p => (
              <Token key={p.id} player={byId[p.id]} x={p.x} y={p.y} pos={p.pos}
                picked={picked === p.id} isTarget={!!picked && picked !== p.id} dragging={drag?.id === p.id}
                onClick={() => { if (didDrag.current) { didDrag.current = false; return } tapPitchPlayer(p.id) }}
                onPointerDown={e => startDrag(e, p.id)} />
            ))}
          </div>
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

        {/* Bench */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          <div ref={benchRef} data-fb="bench" onClick={tapBenchArea} style={{ flexGrow: 1, minHeight: 0, background: '#fff', border: `1.5px solid ${picked && onPitchIds.has(picked) ? LEAF : LN}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ flex: 'none', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>{cfg.benchHeader}</span>
              <span style={{ fontSize: 12, color: MUT }}>{toPlace} to place</span>
            </div>
            <div style={{ flexGrow: 1, overflowY: 'auto', margin: '0 -4px', padding: '0 4px' }}>
              {benchPlayers.map(p => <BenchRow key={p.id} p={p} picked={picked === p.id} dragging={drag?.id === p.id} onClick={() => { if (didDrag.current) { didDrag.current = false; return } tapBench(p) }} onPointerDown={e => startDrag(e, p.id)} loose={loose} />)}
              {unavailable.length > 0 && (
                <>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT, margin: '10px 0 4px' }}>NOT AVAILABLE SATURDAY</div>
                  {unavailable.map(p => <BenchRow key={p.id} p={p} picked={false} dragging={false} onClick={() => tapBench(p)} onPointerDown={() => {}} loose={loose} />)}
                </>
              )}
            </div>
            <div style={{ flex: 'none', fontSize: 12, color: MUT, lineHeight: 1.4, borderTop: `1px solid ${LN}`, paddingTop: 8, marginTop: 8 }}>
              {picked ? 'Tap a spot on the pitch, or a player to swap.' : mode === 'own' ? 'Drag anyone anywhere on the pitch. Drop on a player to swap.' : 'Tap a player, then a spot. Or drag onto the pitch — drop between spots for your own shape.'}
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

      {menuOpen && <GamePicker cfg={cfg} ins={ins} onLoad={loadWorked} onClose={() => setMenuOpen(false)} onNav={onNav} say={say} />}
      {shareOpen && <ShareSheet cfg={cfg} onPitch={onPitch} byId={byId} when={shareWhen} setWhen={setShareWhen} who={shareWho} setWho={setShareWho} onClose={() => setShareOpen(false)} say={say} />}

      <div style={{ position: 'absolute', bottom: 8, left: 28, fontSize: 11, color: MUT }}>{onPitchCount} on the pitch · {canPlayCount} can play</div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 200, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', maxWidth: 560, textAlign: 'center' }}>{toast}</div>}

      {/* Drag ghost */}
      {drag && byId[drag.id] && (
        <div style={{ position: 'fixed', left: drag.x, top: drag.y, transform: 'translate(-50%,-50%) rotate(4deg)', zIndex: 300, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: INK, boxShadow: '0 10px 24px rgba(0,0,0,0.4)' }}>{byId[drag.id].num}</div>
          <span style={{ background: 'rgba(16,33,31,0.8)', borderRadius: 999, padding: '2px 9px', fontSize: 13, fontWeight: 700, color: '#fff' }}>{byId[drag.id].first}</span>
        </div>
      )}
    </div>
  )
}

function ownLabel(p: Player | undefined, y: number, loose: boolean): string {
  if (p && (p.positions.includes('GK') || p.positions.includes('Goal'))) return loose ? 'GOAL' : 'GK'
  if (loose) return y < 36 ? 'FRONT' : y < 66 ? 'MID' : 'BACK'
  return y < 36 ? 'F' : y < 66 ? 'M' : 'D'
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

function ShapeTab({ name, selected, onClick, tags = [] }: { name: string; selected: boolean; onClick: () => void; tags?: string[] }) {
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
      {tags.length > 0 && <span title={tags.join(' · ')} style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: selected ? 'rgba(255,255,255,0.18)' : PALE, color: selected ? '#fff' : GREEN, whiteSpace: 'nowrap' }}>{tags[0]}{tags.length > 1 ? ` +${tags.length - 1}` : ''}</span>}
    </button>
  )
}

function PitchMarks() {
  return (
    <>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" stroke="rgba(255,255,255,0.32)" strokeWidth="0.35" fill="none">
        <rect x="3" y="3.5" width="94" height="93" rx="1.5" />
        <line x1="3" y1="50" x2="97" y2="50" />
        <ellipse cx="50" cy="50" rx="11" ry="9" />
        <rect x="24" y="3.5" width="52" height="15" />
        <rect x="38" y="3.5" width="24" height="6" />
        <rect x="43" y="2" width="14" height="1.5" />
        <rect x="24" y="81.5" width="52" height="15" />
        <rect x="38" y="90.5" width="24" height="6" />
        <rect x="43" y="96.5" width="14" height="1.5" />
      </svg>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" fill="rgba(255,255,255,0.38)">
        <circle cx="50" cy="50" r="0.5" /><circle cx="50" cy="12" r="0.5" /><circle cx="50" cy="88" r="0.5" />
      </svg>
    </>
  )
}

function EmptySpot({ slot, onClick, on }: { slot: { x: number; y: number; pos: string }; onClick: () => void; on?: boolean }) {
  return (
    <button onClick={onClick} aria-pressed={!!on} aria-label={`${slot.pos}: empty${on ? ', picked' : ''}`} style={{ position: 'absolute', left: `${slot.x}%`, top: `${slot.y}%`, transform: 'translate(-50%,-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 8, fontFamily: 'inherit' }}>
      <div style={{ width: 46, height: 46, borderRadius: '50%', border: on ? '3px solid #fff' : '2px dashed rgba(255,255,255,0.5)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 11, fontWeight: 700, color: on ? '#fff' : 'rgba(255,255,255,0.6)' }}>{slot.pos}</span></div>
      <span style={{ fontSize: 11, color: on ? '#fff' : 'rgba(255,255,255,0.55)' }}>{on ? 'Tap a player' : 'Empty'}</span>
    </button>
  )
}

function Token({ player, x, y, pos, picked, isTarget, dragging, onClick, onPointerDown }: { player: Player; x: number; y: number; pos: string; picked: boolean; isTarget: boolean; dragging: boolean; onClick: () => void; onPointerDown: (e: React.PointerEvent) => void }) {
  return (
    <button onClick={onClick} onPointerDown={onPointerDown} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', background: 'none', border: 'none', cursor: 'grab', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 8, fontFamily: 'inherit', opacity: dragging ? 0.3 : 1, touchAction: 'none', transition: dragging ? 'none' : 'left 150ms, top 150ms' }}>
      <div data-club-kit="" style={{ position: 'relative', width: 46, height: 46, borderRadius: '50%', background: '#fff', border: picked ? '3px solid #fff' : 'none', boxShadow: picked ? '0 0 0 3px rgba(31,74,62,0.9), 0 4px 10px rgba(0,0,0,0.3)' : isTarget ? '0 0 0 2px rgba(255,255,255,0.5)' : '0 3px 8px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span data-club-on="" style={{ fontSize: 17, fontWeight: 800, color: INK }}>{player.num}</span>
        {player.captain && <span style={{ position: 'absolute', top: -2, left: -2, width: 16, height: 16, borderRadius: '50%', background: '#fff', color: INK, fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>C</span>}
      </div>
      <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(16,33,31,0.62)', borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{player.first}</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.65)' }}>{pos}</span>
      </span>
      {player.pitchNote && <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.72)', whiteSpace: 'nowrap' }}>{player.pitchNote}</span>}
    </button>
  )
}

function BenchRow({ p, picked, dragging, onClick, onPointerDown, loose }: { p: Player; picked: boolean; dragging: boolean; onClick: () => void; onPointerDown: (e: React.PointerEvent) => void; loose: boolean }) {
  const na = !p.available
  return (
    <button onClick={onClick} onPointerDown={na ? undefined : onPointerDown} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, padding: '6px 8px', borderRadius: 10, background: picked ? PALE : dragging ? '#f4f6f5' : 'transparent', border: dragging ? `1px dashed ${LEAF}` : 'none', cursor: na ? 'default' : 'grab', fontFamily: 'inherit', textAlign: 'left', opacity: na ? 0.55 : dragging ? 0.5 : 1, touchAction: 'none' }}>
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

function GamePicker({ cfg, ins, onLoad, onClose, onNav, say }: { cfg: TeamCfg; ins: Insights | null; onLoad: (k: MetricKey) => void; onClose: () => void; onNav?: (s: string) => void; say: (m: string) => void }) {
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
        {ins ? wordsFor(cfg.key).map(m => {
          const l = bestLineup(ins, m.key, ins.bestShape[m.key]); if (!l) return null
          return <Row key={m.key} title={m.label} sub={`${l.shape} · ${fmt(m.key, value(l.agg, m.key, ins.gameLen))} ${m.unit} · ${l.agg.mins} minutes together`} tag="From film" onClick={() => { onClose(); onLoad(m.key) }} />
        }) : <div style={{ padding: '10px 14px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>Nothing from recorded games for this team.</div>}
        <Row title="Last Saturday at Ironbark" sub="3-3-2 · won 3–1" tag="Used" onClick={() => { onClose(); say('Copied last Saturday’s line-up into this game.') }} />
        <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: `1px solid ${LN}` }}>
          <button onClick={() => { onClose(); onNav ? onNav('SQ1-BestLineups') : openThing('Line-ups that worked', 'coach') }} style={{ ...btnOutline, flex: 1 }}>All that worked</button>
          <button onClick={() => { onClose(); say('Blank line-up — everyone on the bench.') }} style={{ ...btnPrimary, flex: 1 }}>New blank line-up</button>
        </div>
      </div>
    </>
  )
}

function ShareSheet({ cfg, onPitch, byId, when, setWhen, who, setWho, onClose, say }: { cfg: TeamCfg; onPitch: { id: string; x: number; y: number }[]; byId: Record<string, Player>; when: string; setWhen: (s: string) => void; who: 'families' | 'coaches'; setWho: (w: 'families' | 'coaches') => void; onClose: () => void; say: (m: string) => void }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.35)', zIndex: 80 }} />
      <aside style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 470, background: '#fff', zIndex: 90, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 30px rgba(16,33,31,0.2)' }}>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${LN}` }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: INK, flexGrow: 1 }}>Share the line-up</span>
          <button onClick={onClose} aria-label="Close" style={{ width: 36, height: 36, borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', fontSize: 18, color: MUT }}>×</button>
        </div>
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: 20 }}>
          <div style={{ position: 'relative', aspectRatio: '4 / 3', background: PITCH, borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ position: 'absolute', top: 8, left: 12, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>ATTACKING THIS WAY ↑</div>
            {onPitch.map(p => { const pl = byId[p.id]; return (
              <div key={p.id} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: INK }}>{pl.num}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>{pl.first}</span>
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
