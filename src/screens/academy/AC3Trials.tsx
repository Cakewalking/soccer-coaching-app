// AC3-Trials: Academy owner, trials. Every trial ends with a coach's recommendation (programs v2, 25 Nov):
// Booked → With the coach → Recommended · your call → Joined. Drawn from the board in pack v29.
// The cards are the one list in `trialStore`, which the coach's assessment (ACC3) and the owner's decision (ADT1) also read and change.
// The cards move (Booker, 25 Nov): drag one to another column or up and down its own, by mouse or finger.
// With the keyboard, the arrow keys move the card that has focus and Enter opens it. A tap opens a card; a drag does not.
// Where the cards sit is kept while the app is open; it is sample, not the academy's list of players.
import { useContext, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { demoToast } from '../demoToast'
import { S, INK } from './adStyles'
import Tap from './Tap'
import { OwnerGo } from './ownerMenu'
import { groupOf, playerBoard, playerOf, useAcademy, type Academy } from './academyStore'
import { MORE_JOINED, OFFERS_NOT_TAKEN, moveTrial, openTrial, useTrials, type Trial, type TrialCol } from './trialStore'
import { BOOKED_THIS_MONTH } from './trialHistory'
import { Head, MAUVE, PALE } from './kit'

const COLS: { id: TrialCol; title: string; foot: string }[] = [
  { id: 'booked', title: 'Booked', foot: 'Families book themselves. Clean Sheet puts each child with a team at their age that has a place.' },
  { id: 'coach', title: 'With the coach', foot: 'The coach marks the four skills, the whole player and the game, then says whether to offer a place.' },
  { id: 'call', title: 'Recommended · your call', foot: 'You decide and send the offer. Clean Sheet works out the price for the weeks left.' },
  { id: 'joined', title: 'Joined', foot: '' },
]
const first = (name: string) => name.split(' ')[0]
const titleOf = (col: TrialCol) => COLS.find(c => c.id === col)!.title

/** What a card says and where it opens, by the column it is in. */
function cardOf(a: Academy, c: Trial): { line: string; bold: string; bg: string; to?: string; say?: string; opens: string } {
  const team = groupOf(a, c.team), teamName = team?.name ?? c.team, coach = team?.coach ?? 'The coach'
  if (c.col === 'booked') return { line: `${c.when || 'Day to pick'} · with ${teamName}`, bold: c.remind ? `Reminder goes ${c.remind}` : 'Reminder goes the day before', bg: '#ffffff', say: `${first(c.name)}’s family booked from your link.`, opens: 'Says how the family booked' }
  if (c.col === 'coach') return { line: `${c.when || 'Came today'} · with ${teamName}`, bold: /^Today/.test(c.when) ? `${first(coach)} recommends tonight` : `${first(coach)} recommends after the trial`, bg: '#ffffff', to: 'ACC3-TrialAssess', opens: 'Opens the coach’s assessment' }
  if (c.col === 'call') {
    const came = `Came ${c.came ?? 'today'} · ${coach}${c.a.sure ? `, ${c.a.sure.toLowerCase()}` : ''}`, place = groupOf(a, c.a.recTeam ?? c.team)?.name ?? teamName
    const bold = c.asked === 'offer' ? 'Offer sent · waiting on the family' : c.asked === 'second' ? 'Second trial asked for'
      : c.a.rec === 'second' ? 'Come to a second trial' : c.a.rec === 'no' ? 'Not this term' : c.a.rec ? `Offer a place in ${place}` : 'No recommendation yet'
    return { line: came, bold, bg: c.a.rec === 'second' || c.asked === 'second' ? MAUVE : c.a.rec && c.a.rec !== 'no' ? PALE : '#ffffff', to: 'ADT1-TrialDecision', opens: 'Opens your decision' }
  }
  const p = c.playerId != null ? playerOf(a, c.playerId) : undefined
  return { line: `${teamName} · ${c.joined ?? 'today'}`, bold: 'Joined', bg: '#ffffff', ...(p ? { to: playerBoard(p), opens: 'Opens the player’s file' } : { say: `${first(c.name)} has no file yet. One is made when the family takes up the place.`, opens: 'No file yet' }) }
}

const CARD: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 12px', borderRadius: 12, border: '1px solid #c5c8c4', color: INK, minHeight: 44, boxSizing: 'content-box', cursor: 'grab', touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }
const NAME: CSSProperties = { fontSize: 15, lineHeight: '19px' }, LINE: CSSProperties = { fontSize: 12, lineHeight: '16px', color: '#4a5a57' }, BOLD: CSSProperties = { fontSize: 13, lineHeight: '18px', fontWeight: 700, paddingTop: 4 }

export default function AC3Trials() {
  const a = useAcademy(), list = useTrials(), go = useContext(OwnerGo)
  // The card being dragged, how far it has come, and where it would land.
  const [drag, setDrag] = useState<{ id: string; dx: number; dy: number; left: number; top: number; w: number; col: TrialCol; before?: string } | null>(null)
  // True from the end of a drag until the click that follows it, so letting go of a card never opens it.
  const dragged = useRef(false)

  const move = (c: Trial, col: TrialCol, before?: string) => { if (moveTrial(c.id, col, before)) demoToast(`${first(c.name)} moved to ${titleOf(col)}.`) }
  const open = (c: Trial) => { const k = cardOf(a, c); if (k.to) { openTrial(c.id); go(k.to) } else if (k.say) demoToast(k.say) }

  // No text is picked up, and a finger does not scroll the page, while a card is held.
  useEffect(() => { if (!drag) return; const was = document.body.style.userSelect; document.body.style.userSelect = 'none'; return () => { document.body.style.userSelect = was } }, [drag])
  const landing = (x: number, y: number, id: string): { col: TrialCol; before?: string } | null => {
    const el = document.elementsFromPoint(x, y).find(e => e instanceof HTMLElement && e.dataset.col) as HTMLElement | undefined
    if (!el) return null
    const under = [...el.querySelectorAll<HTMLElement>('[data-card]')].filter(k => k.dataset.card !== id)
    const next = under.find(k => { const r = k.getBoundingClientRect(); return y < r.top + r.height / 2 })
    return { col: el.dataset.col as TrialCol, before: next?.dataset.card }
  }
  // The drag is followed on the window, so letting go anywhere (or the pointer leaving the page) always ends it.
  // The held card is lifted out of its column, so the cards under it close up and the line shows where it will land.
  const down = (c: Trial) => (e: PointerEvent<HTMLDivElement>) => {
    if (e.button) return
    dragged.current = false
    const el = e.currentTarget, r = el.getBoundingClientRect(), scale = r.width / el.offsetWidth || 1
    const s = { id: c.id, x: e.clientX, y: e.clientY, on: false }, at = { left: el.offsetLeft, top: el.offsetTop, w: el.offsetWidth }
    const drift = (ev: globalThis.PointerEvent) => {
      const dx = (ev.clientX - s.x) / scale, dy = (ev.clientY - s.y) / scale
      if (!s.on && Math.hypot(dx, dy) < 6) return
      s.on = true
      ev.preventDefault()
      const to = landing(ev.clientX, ev.clientY, s.id)
      setDrag({ id: s.id, dx, dy, ...at, col: to?.col ?? c.col, before: to ? to.before : c.id })
    }
    const end = (ev: Event) => {
      window.removeEventListener('pointermove', drift); window.removeEventListener('pointerup', end); window.removeEventListener('pointercancel', end); window.removeEventListener('blur', end)
      setDrag(null)
      if (!s.on) return
      // The click that follows this release belongs to the drag. It is forgotten straight after, in case no click comes.
      dragged.current = true; setTimeout(() => { dragged.current = false }, 300)
      if (ev.type !== 'pointerup') return
      const pe = ev as globalThis.PointerEvent, to = landing(pe.clientX, pe.clientY, s.id)
      if (to) move(c, to.col, to.before)
    }
    window.addEventListener('pointermove', drift); window.addEventListener('pointerup', end); window.addEventListener('pointercancel', end); window.addEventListener('blur', end)
  }
  const keys = (c: Trial) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(c); return }
    const k = COLS.findIndex(x => x.id === c.col), mine = list.filter(x => x.col === c.col), i = mine.indexOf(c)
    const id = c.id, refocus = () => requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-card="${id}"]`)?.focus())
    if (e.key === 'ArrowRight' && k < COLS.length - 1) move(c, COLS[k + 1].id)
    else if (e.key === 'ArrowLeft' && k > 0) move(c, COLS[k - 1].id)
    else if (e.key === 'ArrowUp' && i > 0) move(c, c.col, mine[i - 1].id)
    else if (e.key === 'ArrowDown' && i < mine.length - 1) move(c, c.col, mine[i + 2]?.id)
    else return
    e.preventDefault(); refocus()
  }

  // Joined counts the cards and the players who joined this month and are not drawn as cards.
  const joined = list.filter(c => c.col === 'joined').length + MORE_JOINED.n
  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Head title="Trials" sub={`June so far · ${BOOKED_THIS_MONTH} booked · ${joined} joined · every trial ends with a coach’s recommendation`}>
        <Tap say="Trial link copied. Anyone with it can book a free trial." style={S.primary}>Share the trial link</Tap>
      </Head>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
        {COLS.map(col => {
          const mine = list.filter(c => c.col === col.id), over = drag?.col === col.id, more = col.id === 'joined' ? MORE_JOINED.n : 0
          const shown = mine.length - (drag && mine.some(c => c.id === drag.id) ? 1 : 0) + (over ? 1 : 0)
          return (
            <section key={col.id} data-col={col.id} aria-label={col.title} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8, padding: 12, borderRadius: 16, background: '#eceeed', minHeight: 0, ...(col.id === 'call' ? { borderTop: '4px solid #c39797' } : null), outline: over ? '2px solid #2f6252' : 'none', outlineOffset: -2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h2 style={S.h2}>{col.title}</h2>
                <strong style={S.num}>{(drag ? shown : mine.length) + more}</strong>
              </div>
              {mine.map(c => {
                const held = drag?.id === c.id, k = cardOf(a, c)
                return (
                  <div key={c.id} style={{ display: 'contents' }}>
                    {over && drag.before === c.id && <span aria-hidden style={{ height: 3, borderRadius: 2, background: '#2f6252', margin: '-3px 0' }} />}
                    <div data-card={c.id} role="link" tabIndex={0} aria-roledescription="card you can move" aria-label={`${c.name}, ${c.age}, in ${col.title}. ${k.line}. ${k.bold}. ${k.opens}. Drag to move, or use the arrow keys.`}
                      onPointerDown={down(c)} onKeyDown={keys(c)} onClick={() => { if (dragged.current) { dragged.current = false; return } open(c) }}
                      style={{ ...CARD, background: k.bg, ...(held ? { position: 'absolute', left: drag.left, top: drag.top, width: drag.w, boxSizing: 'border-box', transform: `translate(${drag.dx}px, ${drag.dy}px) rotate(1.5deg)`, boxShadow: '0 10px 24px rgba(16,33,31,0.22)', cursor: 'grabbing', zIndex: 5, pointerEvents: 'none', outline: 'none' } : null) }}>
                      <strong style={NAME}>{c.name}, {c.age}</strong>
                      <span style={LINE}>{k.line}</span>
                      <span style={BOLD}>{k.bold}</span>
                    </div>
                  </div>
                )
              })}
              {over && !drag.before && (shown > 1
                ? <span aria-hidden style={{ height: 3, borderRadius: 2, background: '#2f6252', margin: '-3px 0' }} />
                : <span aria-hidden style={{ ...S.cap, minHeight: 64, borderRadius: 12, border: '2px dashed #2f6252', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Drop here</span>)}
              {!shown && <span style={{ ...S.cap, padding: '10px 2px' }}>Nobody here. Drag a card in.</span>}
              {more > 0 && (
                <Tap to="AC4-AcademyPlayers" style={{ ...CARD, cursor: 'pointer', touchAction: 'auto', background: '#ffffff', textDecoration: 'none' }}>
                  <strong style={NAME}>{more} more this month</strong>
                  <span style={LINE}>{MORE_JOINED.teams}</span>
                  <span style={BOLD}>See all players</span>
                </Tap>
              )}
              <span style={{ ...S.cap, marginTop: 'auto' }}>{col.id === 'joined' ? `${joined} of the last ${joined + OFFERS_NOT_TAKEN} offers were taken up.` : col.foot}</span>
            </section>
          )
        })}
      </div>
    </main>
  )
}
