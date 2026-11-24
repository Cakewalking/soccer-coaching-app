// ADC20-TeamSheet, as pack v38 draws it: Sunday's team sheet for the academy coach's own team.
// Five numbers, who starts drawn on a pitch (by half, and in three shapes), the changes, how the plan was made,
// who can't go on the sheet, and everyone's minutes in name order (never ranked).
// WORKED OUT from the plan in ../gameDay (who starts, the shape, the changes): every minute on this page. Move a player, swap one in,
// or pick who comes on at a change, and the squares, "the least anyone plays", the labels on the pitch and the changes' words follow.
// The app never picks on ability: nothing here reads a skill step. It only shares the minutes.
// COUNTED from the academy's list: the team, its names (name order) and how many there are.
// SAMPLE (in ../gameDay): the fixture, who is registered with the club, the drawn plan, each player's minutes this season, and
// Saturday 6 pm as the time the sheet goes to the league (the pack's placeholder).
// Moving players: drag with a mouse or a finger; or press one player and then another; with the keyboard, the arrow keys go from
// player to player, Enter picks one up and puts them down, Shift and an arrow moves a held player a step, Escape lets go.
// A tile is as tall as its content. Hand-built: do not make it again from the board's source.

import { useContext, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import type { Player } from '../../academy/academyStore'
import { coachBoard, firstName, ini, longDate, names, openPlayer, useCoachTeam } from '../coachTeam'
import { GAME, GAME_MINS, SEASON_MINUTES, SHAPES, SHAPE_NAMES, couldComeOn, firstOn, leastOf, minutesIn, planEdit, planNow, playOut, sayStints, spotOf, squaresOf, sundayOf, usePlan, type Change, type Plan, type Stint } from '../gameDay'
import { More, Primary } from '../kit'
import { G, HAIR, INK, LINE, MAUVE, MAUVE_PALE, MUT, T, plain, th } from '../styles'
import { Chevron } from '../teamParts'

const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven']
const word = (n: number) => WORDS[n] ?? String(n)
const cap1 = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const COLS = '1.5fr 1.05fr 1.5fr 0.7fr 0.9fr'
const big = { fontSize: 24, lineHeight: '28px', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' } as const
const DARK = 'radial-gradient(120% 120% at 80% 0%,#2f6b5a 0%,#1c3a33 55%,#10211f 100%)'
const chip = (on: boolean): CSSProperties => ({ height: 44, padding: '0 12px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxSizing: 'border-box', whiteSpace: 'nowrap',
  ...(on ? { background: '#ffffff', color: INK, border: '1.5px solid #ffffff' } : { background: 'transparent', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.7)' }) })
const line = (c: string) => ({ position: 'absolute', border: `2px solid ${c}` }) as const
const viewName = (t: number) => t === 0 ? 'First half' : t === GAME.half ? 'From half-time' : `From ${t}`
/** Where a change happens: the place the player coming off is standing in just before it. */
const placeAt = (plan: Plan, c: Change) => playOut(plan, c.minute, x => x.minute < c.minute ? x.minute : null).on.indexOf(c.off)

/** A square a player is on for only part of: green where they are on, in the right place along it. */
const partFill = (st: Stint[] | undefined, k: number, size = 15) => {
  const at = (t: number) => `${Math.round(100 * (t - k * size) / size)}%`
  const on = (st ?? []).map(([a, b]) => [Math.max(a, k * size), Math.min(b, (k + 1) * size)]).filter(([a, b]) => b > a)
  return `linear-gradient(90deg, #ffffff 0%, ${on.map(([a, b]) => `#ffffff ${at(a)}, ${G} ${at(a)}, ${G} ${at(b)}, #ffffff ${at(b)}`).join(', ')}, #ffffff 100%)`
}

const Num = ({ id, n, label, sub }: { id: string; n: string; label: string; sub: string }) => (
  <span data-band={id} data-n={n} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
    <strong style={big}>{n}</strong><strong style={{ fontSize: 13, lineHeight: '17px' }}>{label}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{sub}</span>
  </span>
)

export default function ADC20TeamSheet({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { g, ps } = useCoachTeam()
  const plan = usePlan()
  const [view, setView] = useState(0)                       // the minute the pitch is drawn at: 0, half-time, or a later change
  const [held, setHeld] = useState<number | null>(null)     // the player picked up by a press or the keyboard
  const [ghost, setGhost] = useState<{ id: number; x: number; y: number; over: number | null } | null>(null)   // the player being dragged
  const [picking, setPicking] = useState<number | null>(null)   // the change whose "who comes on" list is open
  const dragged = useRef(false), pitch = useRef<HTMLDivElement>(null), panel = useRef<HTMLElement>(null)

  const sun = sundayOf(ps), can = sun.can, canIds = can.map(p => p.id), byId = new Map(ps.map(p => [p.id, p]))
  const nameOf = (id: number) => { const p = byId.get(id); return p ? firstName(p) : 'Someone' }
  const full = playOut(plan), least = leastOf(full, canIds), mins = (id: number) => minutesIn(full.stints.get(id))
  const times = [...new Set(plan.changes.map(c => c.minute))].sort((x, y) => x - y)
  const shownAt = times.includes(view) ? view : 0
  const onNow = playOut(plan, shownAt).on, bench = can.filter(p => !onNow.includes(p.id))
  const comeOn = can.filter(p => !plan.lineup.includes(p.id) && mins(p.id) > 0)
  const back = can.filter(p => (full.stints.get(p.id)?.length ?? 0) > 1)   // off and back on
  const gaps = [...new Set(back.map(p => { const s = full.stints.get(p.id)!; return s[1][0] - s[0][1] }))]
  const short = can.filter(p => mins(p.id) < GAME.half)
  const openThen = (p: Player) => { openPlayer(p.id); go(coachBoard(p)) }

  // ── moving players ──
  /** Two players swap. Both on the pitch in this view: they swap places and nobody's minutes move. One off the pitch: they swap parts, minutes and all. */
  function swap(a: number, b: number) {
    const p = planNow(), on = playOut(p, shownAt).on, i = on.indexOf(a), j = on.indexOf(b)
    if (i >= 0 && j >= 0) { planEdit.places(i, j); demoToast(`${nameOf(a)} and ${nameOf(b)} swap places. Minutes stay the same.`); return }
    planEdit.parts(a, b)
    const after = playOut(planNow())
    demoToast(`${nameOf(a)} and ${nameOf(b)} swap. ${nameOf(a)} now plays ${minutesIn(after.stints.get(a))} minutes, ${nameOf(b)} ${minutesIn(after.stints.get(b))}. The minutes are worked out again.`)
  }
  const playerAt = (x: number, y: number, self: number) => {
    for (const el of document.elementsFromPoint(x, y)) { const s = el.closest<HTMLElement>('[data-player]'); if (s && Number(s.dataset.player) !== self) return Number(s.dataset.player) }
    return null
  }
  // The drag is followed on the window, so letting go anywhere always ends it. A press that does not move is a click.
  const down = (id: number) => (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return
    const sx = e.clientX, sy = e.clientY; let moving = false
    const drift = (ev: globalThis.PointerEvent) => {
      if (!moving && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return
      moving = true; setHeld(null)
      setGhost({ id, x: ev.clientX, y: ev.clientY, over: playerAt(ev.clientX, ev.clientY, id) })
    }
    const end = (ev: Event) => {
      window.removeEventListener('pointermove', drift); window.removeEventListener('pointerup', end); window.removeEventListener('pointercancel', end); window.removeEventListener('blur', end)
      setGhost(null)
      if (!moving) return
      dragged.current = true; setTimeout(() => { dragged.current = false }, 60)   // the click that follows the release belongs to the drag
      if (ev.type !== 'pointerup') return
      const pe = ev as globalThis.PointerEvent, to = playerAt(pe.clientX, pe.clientY, id)
      if (to !== null) { swap(id, to); return }
      const box = pitch.current?.getBoundingClientRect(), place = playOut(planNow(), shownAt).on.indexOf(id)
      if (box && place >= 0 && pe.clientX > box.left && pe.clientX < box.right && pe.clientY > box.top && pe.clientY < box.bottom) {
        planEdit.move(place, 100 * (pe.clientX - box.left) / box.width, 100 * (pe.clientY - box.top) / box.height)
        demoToast(`${nameOf(id)} moved. Minutes stay the same.`)
      }
    }
    window.addEventListener('pointermove', drift); window.addEventListener('pointerup', end); window.addEventListener('pointercancel', end); window.addEventListener('blur', end)
  }
  const press = (id: number) => {
    if (dragged.current) { dragged.current = false; return }
    if (held === null) { setHeld(id); return }
    if (held !== id) swap(held, id)
    setHeld(null)
  }
  const keys = (id: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') { setHeld(null); return }
    const dir = ({ ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] } as Record<string, [number, number]>)[e.key]
    if (!dir) return
    e.preventDefault()
    const place = onNow.indexOf(id)
    if (e.shiftKey) {   // move a held player a step across the grass
      if (held === id && place >= 0) { const s = spotOf(plan, place); planEdit.move(place, s.x + dir[0] * 3, s.y + dir[1] * 3) }
      return
    }
    // go to the nearest player that way
    const me = e.currentTarget.getBoundingClientRect(), mx = me.left + me.width / 2, my = me.top + me.height / 2
    let best: HTMLElement | null = null, score = Infinity
    panel.current?.querySelectorAll<HTMLElement>('[data-player]').forEach(el => {
      if (el === e.currentTarget) return
      const r = el.getBoundingClientRect(), dx = r.left + r.width / 2 - mx, dy = r.top + r.height / 2 - my
      const along = dx * dir[0] + dy * dir[1], across = Math.abs(dx * dir[1]) + Math.abs(dy * dir[0])
      if (along < 8) return
      const s = along + 2 * across; if (s < score) { score = s; best = el }
    })
    ;(best as HTMLElement | null)?.focus()
  }
  const heldName = held === null ? '' : nameOf(held)

  // ── the changes ──
  const changeRow = (c: Change) => {
    const place = placeAt(plan, c), bad = full.skipped.includes(c.id), open = picking === c.id
    const where = place >= 0 ? SHAPES[plan.shape][place].pos.toLowerCase() : ''
    const could = open ? can.filter(p => couldComeOn(plan, c, canIds).includes(p.id)) : []
    return (
      <div key={c.id} data-change={c.id} style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${HAIR}` }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48 }}>
          <strong style={{ ...T.num, flex: 'none', width: 44, fontSize: 14 }}>{c.minute}′</strong>
          <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 14, lineHeight: '18px' }}>{nameOf(c.on)} on</strong>
            <span data-change-line="" style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>for {nameOf(c.off)}{where ? ` · ${where}` : ''}{bad ? '. This can’t be made as it stands: pick who comes on' : ''}</span>
          </span>
          <More onClick={() => setPicking(open ? null : c.id)}>Swap</More>
        </span>
        {open && (
          <div role="radiogroup" aria-label={`Who comes on for ${nameOf(c.off)} at ${c.minute} minutes`} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, padding: '2px 0 10px 54px' }}>
            <span style={{ flexBasis: '100%', fontSize: 13, lineHeight: '18px', color: '#33443f' }}>Who comes on for {nameOf(c.off)}? Anyone off the pitch at {c.minute} minutes.</span>
            {could.map(p => { const on = p.id === c.on
              return <button key={p.id} role="radio" aria-checked={on} data-pick={p.id} onClick={() => {
                setPicking(null); if (on) return
                planEdit.on(c.id, p.id); const after = playOut(planNow())
                demoToast(`${firstName(p)} comes on for ${nameOf(c.off)} at ${c.minute} minutes. ${firstName(p)} plays ${minutesIn(after.stints.get(p.id))} minutes, ${nameOf(c.on)} ${minutesIn(after.stints.get(c.on))}. The minutes are worked out again.`)
              }} style={{ height: 44, padding: '0 14px', borderRadius: 999, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxSizing: 'border-box', ...(on ? { background: G, color: '#ffffff', border: `1px solid ${G}` } : { background: '#ffffff', color: INK, border: `1px solid ${LINE}` }) }}>{firstName(p)}</button> })}
          </div>
        )}
      </div>
    )
  }

  const row: CSSProperties = { ...plain, display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'center', minHeight: 46, borderTop: `1px solid ${HAIR}`, fontSize: 14, lineHeight: '19px', width: '100%' }
  const pair: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14 }
  const made = [['1 · Everyone who can play', 'Gets at least half a game'], ['2 · Who starts', 'Whoever has played least this season'], ['3 · The keeper', 'Plays it all, unless you swap'], ['4 · You decide', 'Change anything before it sends']]
  const player = (id: number, style: CSSProperties, inner: ReactNode, say: string, place?: number) => {
    const isHeld = held === id, over = ghost?.over === id || (held !== null && !isHeld)
    return (
      <button key={id} data-player={id} data-place={place} aria-pressed={isHeld} aria-label={say}
        onPointerDown={down(id)} onKeyDown={keys(id)} onClick={() => press(id)}
        style={{ ...plain, touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none', cursor: ghost ? 'grabbing' : 'grab', color: '#ffffff', opacity: ghost?.id === id ? 0.35 : 1, borderRadius: 12, outlineOffset: 2,
          ...(isHeld ? { outline: '3px solid #ffffff' } : ghost?.over === id ? { outline: '3px dashed #cfe6dc' } : over ? { outline: '1.5px dashed rgba(255,255,255,0.45)' } : null), ...style }}>
        {inner}
      </button>
    )
  }

  return (
    <div data-board="ADC20-TeamSheet" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      {!inApp && <CoachNav active="gameday" sub="Team sheet" go={go} />}
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', letterSpacing: '-0.02em' }}>Team sheet</h1>
            <span style={T.cap}>{g.name} against {GAME.opponent} · {longDate(GAME.date)}, {GAME.kickoff} · {GAME.home ? 'home' : 'away'}, {GAME.pitch}</span>
          </div>
          {plan.sent
            ? <More onClick={() => { planEdit.unsend(); demoToast('Taken back. It goes on Saturday at 6 pm unless you send it sooner.') }}>Take it back</More>
            : <More onClick={() => { planEdit.send(); demoToast(`Sent. The league has the ${can.length} names. Each family sees only their own child’s part.`) }}>Send it now</More>}
          <Primary onClick={() => demoToast(plan.sent ? 'It is with the league. Change anything and it is held until you send it again.' : 'Nothing more to do. It goes on Saturday at 6 pm unless you change it.')}>{plan.sent ? 'Sent to the league' : 'Sends Saturday 6 pm'}</Primary>
        </div>

        <section aria-label="Sunday in five numbers" style={{ flex: 'none', borderRadius: 16, background: '#ffffff', border: `1px solid ${LINE}`, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <Num id="can" n={`${can.length} of ${ps.length}`} label="Can play" sub={sun.cannot.length ? `${names(sun.cannot)} ${sun.cannot.length === 1 ? 'isn’t' : 'aren’t'} registered yet` : 'Everyone is registered'} />
          <Num id="shape" n={plan.shape} label="The shape" sub={plan.shape === GAME.shape ? `The academy’s shape for under ${g.age}s` : `Your pick. The academy’s is ${GAME.shape}`} />
          <Num id="start" n={`${plan.lineup.length} + ${comeOn.length}`} label="Start and come on" sub={times.length ? cap1(times.map((t, k) => { const n = plan.changes.filter(c => c.minute === t).length; return `${word(n)}${k === 0 ? (n === 1 ? ' change' : ' changes') : ''} ${t === GAME.half ? 'at half-time' : `on ${t}`}` }).join(', ')) : 'No changes planned'} />
          <Num id="least" n={`${least.min} min`} label="The least anyone plays" sub={short.length ? `${names(short)} ${short.length === 1 ? 'gets' : 'get'} less than half a game. The aim is all ${can.length}` : `${least.min === GAME.half ? 'Half a game' : 'More than half a game'}. The aim is all ${can.length}`} />
          <Num id="goes" n={plan.sent ? 'Sent' : 'Sat 6 pm'} label={plan.sent ? 'With the league' : 'Goes to the league'} sub="And each family sees their child’s part" />
        </section>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: '520px minmax(0,1fr)', gap: 12, alignItems: 'start' }}>
          <section ref={panel} aria-label="The shape" style={{ borderRadius: 18, background: DARK, color: '#ffffff', padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 18 }}>{shownAt === 0 ? 'Who starts' : `On ${viewName(shownAt).toLowerCase()}`}</strong>
              <span role="radiogroup" aria-label="Which part of the game" style={{ display: 'flex', gap: 6 }}>
                {[0, ...times].map(t => <button key={t} role="radio" aria-checked={shownAt === t} data-view={t} onClick={() => { setView(t); setHeld(null); demoToast(`The pitch shows the eleven for ${viewName(t).toLowerCase()}.`) }} style={chip(shownAt === t)}>{viewName(t)}</button>)}
              </span>
            </div>
            <div ref={pitch} data-pitch="" role="group" aria-label={`The eleven ${shownAt === 0 ? 'who start' : `on ${viewName(shownAt).toLowerCase()}`} in a ${plan.shape}, drawn on a pitch, attacking up the page`}
              style={{ position: 'relative', height: 620, borderRadius: 14, border: '2px solid rgba(255,255,255,0.6)', background: 'repeating-linear-gradient(180deg,rgba(255,255,255,0.05) 0 62px,rgba(255,255,255,0) 62px 124px)', overflow: 'hidden' }}>
              <span aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: '40%', borderTop: '2px solid rgba(255,255,255,0.4)' }} />
              <span aria-hidden style={{ ...line('rgba(255,255,255,0.4)'), left: '50%', top: '40%', width: 110, height: 110, borderRadius: 999, transform: 'translate(-50%,-50%)' }} />
              <span aria-hidden style={{ ...line('rgba(255,255,255,0.4)'), left: '24%', right: '24%', bottom: 0, height: '16%', borderBottom: 'none' }} />
              <span aria-hidden style={{ ...line('rgba(255,255,255,0.4)'), left: '38%', right: '38%', bottom: 0, height: '6%', borderBottom: 'none' }} />
              <span aria-hidden style={{ ...line('rgba(255,255,255,0.4)'), left: '24%', right: '24%', top: 0, height: '8%', borderTop: 'none' }} />
              <span style={{ position: 'absolute', right: 12, top: 10, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#cfe6dc' }}>YOU ATTACK THIS WAY ↑</span>
              {onNow.map((id, place) => { const p = byId.get(id); if (!p) return null
                const s = spotOf(plan, place), label = `${mins(id)} min · ${sayStints(full.stints.get(id))}`
                return player(id, { position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: 96, textAlign: 'center', zIndex: held === id ? 2 : 1 },
                  <>
                    <span style={{ width: 40, height: 40, borderRadius: 999, background: held === id ? MAUVE_PALE : '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{ini(p)}</span>
                    <strong style={{ fontSize: 13, lineHeight: '15px', color: '#ffffff' }}>{firstName(p)}</strong>
                    <span data-mins={mins(id)} style={{ fontSize: 11, lineHeight: '13px', color: '#cfe6dc' }}>{label}</span>
                  </>,
                  `${p.name}, ${s.pos.toLowerCase()}, ${label}. ${held === null ? 'Press to pick up, then press another player to swap.' : held === id ? 'Picked up. Press again to put down.' : `Press to swap with ${heldName}.`}`, place) })}
            </div>
            <div data-bench="" style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, lineHeight: '17px', color: '#cfe6dc', marginRight: 2 }}>{shownAt === 0 ? 'Not starting' : 'Off the pitch'}{bench.length ? '' : ': nobody'}</span>
              {bench.map(p => player(p.id, { display: 'inline-flex', alignItems: 'center', gap: 6, height: 44, padding: '0 10px 0 5px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.7)', boxSizing: 'border-box', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' },
                <><span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: held === p.id ? MAUVE_PALE : '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{ini(p)}</span>{firstName(p)} · {mins(p.id)} min</>,
                `${p.name}, ${shownAt === 0 ? 'not starting' : 'off the pitch'}, ${mins(p.id)} min, ${sayStints(full.stints.get(p.id))}. ${held === null ? 'Press to pick up, then press a player on the pitch to swap them in.' : held === p.id ? 'Picked up. Press again to put down.' : `Press to swap with ${heldName}.`}`))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <span aria-live="polite" style={{ fontSize: 12, lineHeight: '17px', color: '#cfe6dc' }}>{held === null ? 'Drag a player to move them. Drag one from the list to swap them in.' : `Holding ${heldName}. Press another player to swap, or ${heldName} again to put them down.`}</span>
              <span role="radiogroup" aria-label="The shape" style={{ display: 'flex', gap: 6, flex: 'none' }}>
                {SHAPE_NAMES.map(s => <button key={s} role="radio" aria-checked={plan.shape === s} data-shape={s} onClick={() => { planEdit.shape(s); demoToast(`The eleven move into a ${s}. Minutes stay the same.`) }} style={chip(plan.shape === s)}>{s}</button>)}
              </span>
            </div>
          </section>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="The changes" style={{ ...T.tile, flex: 'none' }}>
              <div style={T.between}><h2 style={T.h2}>The changes</h2><span style={T.cap}>Prompted for you in the live game</span></div>
              {plan.changes.length ? [...plan.changes].sort((x, y) => x.minute - y.minute || x.id - y.id).map(changeRow) : <span style={{ ...T.cap, borderTop: `1px solid ${HAIR}`, paddingTop: 10 }}>No changes planned.</span>}
              <span data-rest="" style={{ ...T.cap, paddingTop: 6 }}>Under {g.age}s can come off and go back on{back.length ? `, so ${names(back)} ${back.length === 1 ? 'rests' : 'rest'}${gaps.length === 1 ? ` for ${gaps[0]} minutes` : ''} and ${back.length === 1 ? 'returns' : 'return'}` : ''}.</span>
            </section>

            <section aria-label="How the plan was made" style={{ ...T.tile, flex: 'none' }}>
              <div style={T.between}><h2 style={T.h2}>How the plan was made</h2></div>
              {made.map(([k, v]) => <span key={k} style={pair}><span style={{ color: '#33443f' }}>{k}</span><span style={{ fontWeight: 700, textAlign: 'right' }}>{v}</span></span>)}
              <span style={{ ...T.cap, paddingTop: 6 }}>The app never picks on ability. It only shares the minutes. Who plays where is yours.</span>
            </section>

            {sun.cannot.length > 0 && (
              <section data-cannot="" aria-label="Can’t go on the sheet" style={{ ...T.tile, gap: 0, padding: '12px 14px', background: MAUVE_PALE, borderColor: '#c39797' }}>
                <h2 style={{ ...T.h2, paddingBottom: 2 }}>Can’t go on the sheet</h2>
                {sun.cannot.map(p => (
                  <button key={p.id} data-cannot-row={p.id} onClick={() => openThen(p)} style={{ ...plain, ...pair, borderTop: '1px solid #e2c9c9', width: '100%' }}>
                    <span style={{ color: '#33443f' }}>{p.name}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, textAlign: 'right' }}>Club form {GAME.cannotPlay[p.id].replace(/^Form /, '').toLowerCase()}<Chevron /></span>
                  </button>
                ))}
                <span style={{ fontSize: 12, lineHeight: '17px', paddingTop: 6 }}>The league only takes players registered with {GAME.club}. If {sun.cannot.length === 1 ? firstName(sun.cannot[0]) : sun.cannot.length === 2 ? 'either' : 'any of them'} registers before Saturday 6 pm, they are added and the minutes are worked out again.</span>
              </section>
            )}
          </div>
        </div>

        <section aria-label="Everyone’s minutes" style={{ ...T.tile, flex: 'none' }}>
          <div style={T.between}><h2 style={T.h2}>Everyone’s minutes</h2><span style={T.cap}>Each square is 15 minutes. In name order, never ranked</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            <span style={th}>Player</span><span style={th}>On Sunday</span><span style={th}>The {GAME_MINS} minutes</span><span style={th}>Plays</span><span style={th}>This season</span>
          </div>
          {can.map(p => { const st = full.stints.get(p.id), m = mins(p.id), place = full.placeOf.get(p.id), sq = squaresOf(st), season = SEASON_MINUTES[p.id]
            return (
              <button key={p.id} data-row={p.id} data-mins={m} data-squares={sq.join(',')} onClick={() => openThen(p)} style={row}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: MAUVE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{ini(p)}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 14, lineHeight: '18px', whiteSpace: 'nowrap' }}>{p.name}</strong><span style={{ fontSize: 12, color: MUT }}>{place === undefined ? 'No place yet' : SHAPES[plan.shape][place].pos}</span></span>
                </span>
                <span data-first="" style={{ fontSize: 13, ...(m ? null : { fontWeight: 700 }) }}>{firstOn(st)}</span>
                <span role="img" aria-label={`${m} of ${GAME_MINS} minutes`} style={{ display: 'flex', gap: 3 }}>
                  {sq.map((n, k) => <span key={k} style={{ flex: 1, height: 16, borderRadius: 3, boxSizing: 'border-box', ...(n >= 15 ? { background: G } : n > 0 ? { background: partFill(st, k), border: '1.5px solid #8a9794' } : { background: '#ffffff', border: '1.5px solid #8a9794' }) }} />)}
                </span>
                <span style={T.num}><strong>{m}</strong> min</span>
                <span data-season="" style={{ ...T.num, fontSize: 13 }}>{season ? <>{Math.round(100 * season[0] / season[1])}% <span style={{ fontSize: 12, color: MUT }}>· {season[0]} of {season[1]} min</span></> : 'New'}</span>
              </button>
            ) })}
          <span style={{ ...T.cap, paddingTop: 6, borderTop: `1px solid ${HAIR}` }}>“This season” is the share of the minutes each player could have played, from the live game clock. A family sees only their own child: “{firstName(comeOn[0] ?? can[0])} {firstOn(full.stints.get((comeOn[0] ?? can[0]).id)).replace(/^On/, 'comes on').replace(/^Starts/, 'starts').replace(/^Not on/, 'is not on yet')}”. Nobody sees another child’s minutes.</span>
        </section>
      </main>

      {ghost && byId.get(ghost.id) && (
        <span aria-hidden style={{ position: 'fixed', left: ghost.x, top: ghost.y, transform: 'translate(-50%,-50%) rotate(-3deg)', zIndex: 300, pointerEvents: 'none', width: 44, height: 44, borderRadius: 999, background: '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, boxShadow: '0 10px 24px rgba(16,33,31,0.35)', border: `2px solid ${G}` }}>{ini(byId.get(ghost.id)!)}</span>
      )}
    </div>
  )
}
