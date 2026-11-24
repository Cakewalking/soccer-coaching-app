// ACC3-TrialAssess, as pack v29 draws it (25 Nov): a tall screen that ends with the coach's recommendation.
// Left, what the coach saw: the four core skills on five steps and against their own team, the whole player,
// and the game at the end. Right, the recommendation, how sure, why, and what the family will be told.
// Every tap is written to the one list of trials (../../academy/trialStore), which the owner's Trials board and
// decision screen read. Team sizes are counted from the academy's list of players, never typed.
// Hand-built against the board: do not make it again from the board's source.

import { useContext, useEffect, type CSSProperties, type ReactNode } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { groupOf, playersIn, useAcademy, type Academy } from '../../academy/academyStore'
import { ARJUN, WHY, canSend, sendToOwner, setAssessment, useOpenTrial, type Assessment, type Rec, type Sure, type Trial } from '../../academy/trialStore'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LINE = '#c5c8c4', HAIR = '#e9eae8'
const cap: CSSProperties = { fontSize: 14, lineHeight: '20px', color: MUT }
const h2: CSSProperties = { margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em' }
const tile: CSSProperties = { background: '#ffffff', border: `1px solid ${LINE}`, borderRadius: 16, boxSizing: 'border-box', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0, minWidth: 0 }
const plain: CSSProperties = { margin: 0, font: 'inherit', textAlign: 'inherit', cursor: 'pointer', color: INK }
const btn: CSSProperties = { ...plain, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 10, fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', boxSizing: 'border-box', flex: 'none' }
const more: CSSProperties = { ...btn, padding: '0 16px', border: `1px solid ${LINE}`, background: '#ffffff' }
const primary: CSSProperties = { ...btn, padding: '0 18px', border: `1px solid ${G}`, background: G, color: '#ffffff' }
const pick: CSSProperties = { ...plain, flex: 1, minHeight: 44, boxSizing: 'border-box', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4px 8px', fontSize: 13, lineHeight: '16px', fontWeight: 700 }
const ON: CSSProperties = { background: G, color: '#ffffff', border: `1px solid ${G}` }, OFF: CSSProperties = { background: '#ffffff', color: INK, border: `1px solid ${LINE}` }
const small: CSSProperties = { fontSize: 13, lineHeight: '18px', paddingTop: 8 }
const box: CSSProperties = { font: 'inherit', color: INK, border: `1px solid ${LINE}`, borderRadius: 10, background: '#ffffff', padding: '8px 10px', fontSize: 14, lineHeight: '20px', minHeight: 44, boxSizing: 'border-box', resize: 'vertical', width: '100%' }

const AGAINST = ['Behind', 'With them', 'Ahead'], MARKS = ['Not yet', 'Some', 'Strong'], SURE: Sure[] = ['Sure', 'Fairly sure', 'Not sure']
/** When the coach sent it, as shown. Sample: the demo's evening, a few minutes after the session ends. */
const SENT_AT = '7:52 pm'

// ── what the family will be told, drafted from the taps ──
// One thing done well: the skill on the highest step, and the first thing marked Strong in the game or the whole player.
// One thing to work on: the next step up on the skill that is lowest. No steps, ticks or comparison in either line.
type Words = { he: string; him: string; his: string }
const words = (t: Trial): Words => t.she ? { he: 'she', him: 'her', his: 'her' } : { he: 'he', him: 'him', his: 'his' }
const WELL = (w: Words) => [`controls the ball well with ${w.his} first touch`, `runs with the ball with ${w.his} head up`, 'takes players on', 'strikes the ball cleanly']
const ALSO = (w: Words) => ({
  game: [`keeps the ball when ${w.he} is under pressure`, 'works to win the ball back'],
  whole: ['looks up before the ball arrives', 'keeps going right to the end', 'tries again after a mistake', 'joins in and talks to the other players'],
})
// the next step up, from 2 to 5, for each core skill
const NEXT = [
  ['Stopping the ball close with the first touch.', 'Setting the ball out of the feet with the first touch.', 'Taking a first touch on the move, with either foot.', 'Taking a first touch away from pressure, at speed.'],
  ['Looking up while running with the ball.', 'Running with the ball with the head up in space.', 'Running with the ball at speed, with both feet.', 'Changing pace with the ball to beat a player.'],
  ['Learning one move to take a player on.', 'Picking the moment to take a player on.', 'Beating a player on either side.', 'Beating a player, then finding the pass.'],
  ['Striking a standing ball with the laces.', 'Striking a moving ball with the laces.', 'Striking a moving ball with both feet.', 'Picking the corner when under pressure.'],
]
const NOT_YET = { whole: ['Looking around before the ball arrives.', 'Keeping going for the whole session.', 'Trying again after a mistake.', 'Joining in with players who are new to them.'], game: ['Keeping the ball under pressure.', 'Getting back into shape when the ball is lost.'] }
function draftFor(a: Assessment, t: Trial): { well: string; work: string } {
  const w = words(t), first = t.name.split(' ')[0]
  const marked = a.steps.map((s, k) => ({ s, k, ag: a.against[k] ?? 1 })).filter(x => x.s > 0)
  const best = [...marked].sort((x, y) => y.s - x.s || y.ag - x.ag || x.k - y.k)[0]
  const low = [...marked].filter(x => x !== best && x.s < 5).sort((x, y) => x.s - y.s || x.ag - y.ag || x.k - y.k)[0]
  const also = ALSO(w), strong = [...a.game.slice(0, 2).map((m, k) => m === 2 ? also.game[k] : ''), ...a.whole.map((m, k) => m === 2 ? also.whole[k] : '')].filter(Boolean)
  const good = [...(best ? [WELL(w)[best.k]] : []), ...strong].slice(0, 2)
  const notYet = [...a.whole.map((m, k) => m === 0 ? NOT_YET.whole[k] : ''), ...a.game.slice(0, 2).map((m, k) => m === 0 ? NOT_YET.game[k] : '')].filter(Boolean)
  return { well: good.length ? `${first} ${good.join(' and ')}.` : '', work: low ? NEXT[low.k][low.s - 1] : notYet[0] ?? '' }
}
const untouched = (a: Assessment) => !a.sent && !a.rec && !a.sure && !a.note && !a.well && !a.work && !a.clips && !a.why.length && a.steps.every(s => !s) && [...a.against, ...a.whole, ...a.game].every(m => m === null)

function Choice({ label, on, onTap, grow = true }: { label: string; on: boolean; onTap: () => void; grow?: boolean }) {
  return <button role="radio" aria-checked={on} onClick={onTap} style={{ ...pick, ...(grow ? null : { flex: 'none' }), ...(on ? ON : OFF) }}>{label}</button>
}
/** One row of three: Not yet, Some, Strong. Tapping the one that is on takes it off. */
function MarkRow({ name, sub, value, set }: { name: string; sub: string; value: number | null; set: (v: 0 | 1 | 2 | null) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 12, alignItems: 'center', minHeight: 54, borderTop: `1px solid ${HAIR}` }}>
      <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '19px' }}>{name}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{sub}</span></span>
      <span role="radiogroup" aria-label={name} style={{ display: 'flex', gap: 6 }}>
        {MARKS.map((m, k) => <Choice key={m} label={m} on={value === k} onTap={() => set(value === k ? null : k as 0 | 1 | 2)} />)}
      </span>
    </div>
  )
}
const TileHead = ({ title, right }: { title: string; right: string }) => <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}><h2 style={h2}>{title}</h2><span style={cap}>{right}</span></div>

function RecRow({ on, full, title, sub, onTap }: { on: boolean; full?: boolean; title: string; sub: string; onTap: () => void }) {
  const look: CSSProperties = on ? { background: '#eef5f2', border: `2px solid ${G}` } : full ? { background: '#faf5ec', border: '1px dashed #8a9794', color: MUT } : { background: '#ffffff', border: `1px solid ${LINE}` }
  return (
    <button role="radio" aria-checked={on} onClick={onTap} style={{ ...plain, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '6px 12px', borderRadius: 12, boxSizing: 'border-box', textAlign: 'left', ...look }}>
      <span style={{ flex: 'none', width: 20, height: 20, borderRadius: 999, boxSizing: 'border-box', border: `2px solid ${on ? G : '#8a9794'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <span style={{ width: 10, height: 10, borderRadius: 999, background: G }} />}</span>
      <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '19px' }}>{title}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{sub}</span></span>
    </button>
  )
}

const places = (a: Academy, id: string) => { const g = groupOf(a, id), n = g ? playersIn(a, g.id).length : 0; return { g, n, cap: g?.cap ?? 0, open: Math.max(0, (g?.cap ?? 0) - n) } }
const Label = ({ children }: { children: ReactNode }) => <strong style={small}>{children}</strong>
const openLine = (n: number) => `${n} place${n === 1 ? '' : 's'} open`

export default function ACC3TrialAssess({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const a = useAcademy(), t = useOpenTrial()
  // Opened as the board draws it: Arjun's taps are filled in until the coach has made a tap of their own.
  const seed = t.id === 'arjun' && untouched(t.a)
  useEffect(() => { if (seed) setAssessment('arjun', ARJUN) }, [seed])
  const s: Assessment = seed ? ARJUN : t.a
  const w = words(t), first = t.name.split(' ')[0]
  const mine = places(a, t.team), g = mine.g
  const otherG = g ? a.groups.find(x => x.age === g.age && x.id !== g.id) : undefined, other = otherG ? places(a, otherG.id) : undefined
  const times = g?.when.split(' · ')[1] ?? '', [from, to] = times.split(' to ').map(x => { const [h, m] = x.split(':').map(Number); return h * 60 + m })
  const mins = Number.isFinite(to - from) ? to - from : 60
  const sent = !!s.sent, ready = canSend(s)
  const skills = a.skills, stepWords = a.step_words

  /** A tap: written to the list of trials, and the family's two lines are drafted again unless the coach has changed them by hand. */
  function tap(change: Partial<Assessment>) {
    const next = { ...s, ...change }, was = draftFor(s, t), now = draftFor(next, t)
    setAssessment(t.id, {
      ...change,
      ...(!('well' in change) && (!s.well || s.well === was.well) ? { well: now.well } : null),
      ...(!('work' in change) && (!s.work || s.work === was.work) ? { work: now.work } : null),
    })
  }
  const at = <T,>(list: T[], k: number, v: T) => list.map((x, i) => i === k ? v : x)
  function recommend(rec: Rec) {
    if (s.rec === rec) { tap({ rec: null, recTeam: undefined, ifOpens: null }); return }
    tap({ rec, recTeam: rec === 'mine' ? g?.id : rec === 'other' ? other?.g?.id : undefined, ifOpens: rec === 'other' ? s.ifOpens : null })
  }
  function send() {
    if (!sendToOwner(t.id, SENT_AT)) return
    const where = s.rec === 'mine' ? g?.name : other?.g?.name
    demoToast(s.rec === 'mine' || s.rec === 'other' ? `Sent to Dani: you recommend a place in ${where}. She makes the offer.` : s.rec === 'second' ? 'Sent to Dani: you recommend a second trial. She decides.' : 'Sent to Dani: you recommend not this term. She decides.')
  }
  const clipLine = s.clips ? `${s.clips} clip${s.clips === 1 ? '' : 's'} from ${t.when.startsWith('Today') ? 'tonight' : 'the session'} ${s.clips === 1 ? 'is' : 'are'} attached, ${s.clipSeconds} seconds` : 'No clips attached yet'
  const link: CSSProperties = { ...plain, padding: 0, border: 0, background: 'none', color: G, fontSize: 14, fontWeight: 700, minHeight: 44, display: 'inline-flex', alignItems: 'center', textDecoration: 'underline' }

  return (
    <div data-board="ACC3-TrialAssess" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 1420 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      {!inApp && <CoachNav active="today" sub="Trial player" go={go} />}
      <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Trial · {t.name}, {t.age}</h1>
            <span style={cap}>With {g?.name ?? 'your team'}{t.when.startsWith('Today') ? ` tonight, ${times}` : t.when ? `, ${t.when}` : ''} · you recommend, Dani decides and makes the offer</span>
          </div>
          {!sent && <button data-save="" onClick={() => demoToast('Saved. It stays on your Today until you send it.')} style={more}>Save and finish later</button>}
          <button data-send="" disabled={sent || !ready} onClick={send} style={{ ...primary, ...(sent || !ready ? { background: '#e9eae8', border: `1px solid ${LINE}`, color: MUT, cursor: 'default' } : null) }}>{sent ? 'Sent to Dani' : 'Send to Dani'}</button>
        </div>
        {(sent || !ready) && (
          <div role="status" data-send-line="" style={{ ...cap, flex: 'none', textAlign: 'right', marginTop: -6 }}>
            {sent ? `Sent to Dani at ${s.sent}. She decides and makes the offer. Your taps are kept as you sent them.` : `Choose ${!s.rec && !s.sure ? 'a recommendation and how sure you are' : !s.rec ? 'a recommendation' : 'how sure you are'}, then send.`}
          </div>
        )}
        <div inert={sent} style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 400px', gap: 12, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="The four core skills" style={tile}>
              <TileHead title="1 · The four core skills" right={`The step you saw ${t.when.startsWith('Today') ? 'tonight' : 'in the session'}, 1 to 5 · then against your own team`} />
              {skills.map((skill, k) => (
                <div key={skill} data-skill={k} style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr) 250px', gap: 12, alignItems: 'center', minHeight: 66, borderTop: `1px solid ${HAIR}` }}>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ fontSize: 15, lineHeight: '19px' }}>{skill}</strong>
                    <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{s.steps[k] ? stepWords[skill]?.[s.steps[k] - 1] : 'Tap the step you saw'}</span>
                  </span>
                  <span role="radiogroup" aria-label={`${skill}, step`} style={{ display: 'flex', gap: 6 }}>
                    {[1, 2, 3, 4, 5].map(n => <Choice key={n} label={String(n)} on={s.steps[k] === n} onTap={() => tap({ steps: at(s.steps, k, s.steps[k] === n ? 0 : n) })} />)}
                  </span>
                  <span role="radiogroup" aria-label={`${skill}, against your own team`} style={{ display: 'flex', gap: 6 }}>
                    {AGAINST.map((x, n) => <Choice key={x} label={x} on={s.against[k] === n} onTap={() => tap({ against: at(s.against, k, s.against[k] === n ? null : n as 0 | 1 | 2) })} />)}
                  </span>
                </div>
              ))}
              <span style={{ ...cap, paddingTop: 6 }}>The same five steps you use for your own players, so {w.his} first plan starts from {t.when.startsWith('Today') ? 'tonight' : 'the trial'}. “Against your team” is for placing {w.him}. It is never shown to {w.him} or {w.his} family.</span>
            </section>
            <section aria-label="The whole player" style={tile}>
              <TileHead title="2 · The whole player" right="What a skills test misses" />
              {([['Game sense', 'Looks before the ball arrives. Finds space without being told'], ['Body', `Moves freely. Kept going for the full ${mins} minutes`], ['Head', 'Tries again after a mistake. Listens, and asks'], ['With others', `Joined in. Talked to players ${w.he} had not met`]] as const).map(([name, sub], k) =>
                <MarkRow key={name} name={name} sub={sub} value={s.whole[k]} set={v => tap({ whole: at(s.whole, k, v) })} />)}
            </section>
            <section aria-label="In the game at the end" style={tile}>
              <TileHead title="3 · In the game at the end" right="20 minutes, seven against seven" />
              {([['With the ball', 'Kept it under pressure. Chose the simple pass'], ['Without the ball', 'Got back into shape. Pressed when the team pressed'], [`Did the team play better with ${w.him} in it?`, 'Your own judgement']] as const).map(([name, sub], k) =>
                <MarkRow key={name} name={name} sub={sub} value={s.game[k]} set={v => tap({ game: at(s.game, k, v) })} />)}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, borderTop: `1px solid ${HAIR}` }}>
                <span data-clips={s.clips} style={{ flexGrow: 1, fontSize: 14 }}>{clipLine}</span>
                {/* Sample: there is no film picker behind this yet, so a clip of nine seconds is added to the count. */}
                <button onClick={() => { tap({ clips: s.clips + 1, clipSeconds: s.clipSeconds + 9 }); demoToast('Clip added from the film. Dani sees it with your recommendation.') }} style={more}>Add a clip</button>
              </div>
            </section>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="Your recommendation" style={{ ...tile, gap: 6, padding: '14px 16px', border: `2px solid ${G}` }}>
              <span style={{ fontSize: 11, lineHeight: '15px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a4b5b' }}>Your recommendation</span>
              <h2 style={{ margin: 0, fontSize: 20, lineHeight: '26px' }}>Should {first} be offered a place?</h2>
              <div role="radiogroup" aria-label="Your recommendation" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <RecRow on={s.rec === 'mine'} full={mine.open === 0} title="Yes, in my team" onTap={() => recommend('mine')}
                  sub={mine.open === 0 ? `${g?.name} is full, ${mine.n} of ${mine.cap}. You can still say so` : `${g?.name} · ${mine.n} of ${mine.cap}, ${openLine(mine.open)}`} />
                {other?.g && <RecRow on={s.rec === 'other'} full={other.open === 0} title="Yes, in another team" onTap={() => recommend('other')}
                  sub={other.open === 0 ? `${other.g.name} · ${other.g.coach} · full, ${other.n} of ${other.cap}. You can still say so` : `${other.g.name} · ${other.g.coach} · ${other.n} of ${other.cap}, ${openLine(other.open)}`} />}
                <RecRow on={s.rec === 'second'} title="Not yet. Come to a second trial" sub={`You want to see ${w.him} again before saying`} onTap={() => recommend('second')} />
                <RecRow on={s.rec === 'no'} title="Not this term" sub="With one thing to work on, said kindly" onTap={() => recommend('no')} />
              </div>
              <Label>How sure are you?</Label>
              <span role="radiogroup" aria-label="How sure are you?" style={{ display: 'flex', gap: 6 }}>
                {SURE.map(x => <Choice key={x} label={x} on={s.sure === x} onTap={() => tap({ sure: s.sure === x ? null : x })} />)}
              </span>
              <Label>Why · pick any</Label>
              <span role="group" aria-label="Why, pick any" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {WHY.map(x => { const on = s.why.includes(x); return <button key={x} aria-pressed={on} onClick={() => tap({ why: on ? s.why.filter(y => y !== x) : WHY.filter(y => y === x || s.why.includes(y)) })} style={{ ...pick, flex: 'none', ...(on ? ON : OFF) }}>{x}</button> })}
              </span>
              {s.rec === 'other' && other?.g && <>
                <Label>If a place opens in {g?.name}</Label>
                <span role="radiogroup" aria-label={`If a place opens in ${g?.name}`} style={{ display: 'flex', gap: 6 }}>
                  <Choice label={`Move ${w.him} up`} on={s.ifOpens === 'move'} onTap={() => tap({ ifOpens: s.ifOpens === 'move' ? null : 'move' })} />
                  <Choice label={`Leave ${w.him} in ${other.g.name.split(' ').slice(1).join(' ') || other.g.name}`} on={s.ifOpens === 'leave'} onTap={() => tap({ ifOpens: s.ifOpens === 'leave' ? null : 'leave' })} />
                </span>
              </>}
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Label>For Dani, in your words</Label>
                <textarea data-note="" rows={4} value={s.note} placeholder="What you saw, in a line or two" onChange={e => tap({ note: e.target.value })} style={box} />
              </label>
            </section>
            <section aria-label="What the family will be told" style={{ ...tile, gap: 6 }}>
              <h2 style={h2}>What the family will be told</h2>
              <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Drafted from your taps. Change any of it.</span>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Label>One thing {w.he} does well</Label>
                <textarea data-well="" rows={2} value={s.well} placeholder="Drafted when you tap what you saw" onChange={e => tap({ well: e.target.value })} style={box} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Label>One thing to work on</Label>
                <textarea data-work="" rows={2} value={s.work} placeholder="Drafted when you tap what you saw" onChange={e => tap({ work: e.target.value })} style={box} />
              </label>
              <span style={{ ...cap, paddingTop: 6 }}>The family never sees steps, ticks or how {w.he} compares with the team. Dani makes the offer and sets the price for the weeks left.</span>
            </section>
          </div>
        </div>
        <div style={{ ...cap, flex: 'none', display: 'flex', flexWrap: 'wrap', gap: '4px 14px', alignItems: 'center' }}>
          <strong style={{ color: INK }}>Where these numbers come from</strong>
          <button onClick={() => go('ADT1-TrialDecision')} style={link}>Dani sees it here</button>
          <button onClick={() => go('ACP2-Offer')} style={link}>The family gets this</button>
          <button onClick={() => go('ADC10-SetGoal')} style={link}>If {w.he} joins, {w.his} plan starts here</button>
        </div>
      </main>
    </div>
  )
}
