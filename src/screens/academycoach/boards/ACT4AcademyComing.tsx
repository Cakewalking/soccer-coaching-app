// ACT4-AcademyComing, rebuilt as pack v34 draws it: who is coming tonight, and every session this term.
// One band of five numbers, one table for the whole team in name order (never ranked) with a square for every session,
// and on the right what the roll shows: by night, whether coming matters, and make-ups.
// COUNTED from `roll` in the academy's list, so it moves when the roll is taken in ACC2: the squares, came N of M,
// "What it shows", came this term, never missed, by night, "Does coming matter?" and the pale mauve card.
// SAMPLE: tonight's answers (they come from parents in the family app; the list has no field for them). They are held once,
// in coachTeam (`TONIGHT_SAMPLE`), and the home and the session plan read the same. Who is coming in from the other team is sample too.
// A tile is as tall as its content. Hand-built: do not make it again from the board's source.

import { useContext, type CSSProperties } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { cameOf, count, missedLast, pct, upAStep, type Group, type Player } from '../../academy/academyStore'
import { openTrial, useTrials } from '../../academy/trialStore'
import { clock, coachBoard, dayMonth, firstName, ini, isNew, longDate, names, openPlayer, tonightOf, useCoachTeam, type TonightRow } from '../coachTeam'
import { Estimate, More, Primary } from '../kit'
import { G, HAIR, INK, LINE, MAUVE, MAUVE_PALE, MUT, PLUM_LABEL, T, plain, th } from '../styles'
import { Chevron } from '../teamParts'

// SAMPLE: nobody from the other team at this age is making up a session here tonight.
const COMING_IN: string[] = []
const NIGHT = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const dow = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDay()
const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty']
const COLS = '34px 150px 136px minmax(0,1fr) 78px 132px'
const big = { fontSize: 24, lineHeight: '28px', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' } as const
const face = (bg: string) => ({ flex: 'none', width: 30, height: 30, borderRadius: 999, background: bg, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }) as const
const pill = (state: TonightRow['state']): CSSProperties => ({ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
  ...(state === 'yes' || state === 'here' ? { background: G, color: '#ffffff' } : state === 'none' ? { background: '#c39797', color: INK } : { background: '#e9eae8', color: INK }) })

/** What the roll shows for one player, by the handover's rules, in this order: missed the last three; joined part-way; every session;
 * missed one; more than half of the misses on one night; otherwise how many, with no pattern. */
function whatItShows(p: Player, g: Group): { text: string; strong: boolean } {
  if (missedLast(p)) return { text: 'Missed the last three', strong: true }
  if (isNew(p, g)) return { text: `Joined ${dayMonth(p.joined)}`, strong: false }
  const missed = g.dates.filter((_, i) => p.roll[i] === false)
  if (!missed.length) return { text: 'Every session', strong: false }
  if (missed.length === 1) return { text: 'Missed one', strong: false }
  const by = new Map<number, number>(); for (const d of missed) by.set(dow(d), (by.get(dow(d)) ?? 0) + 1)
  const [day, k] = [...by.entries()].sort((x, y) => y[1] - x[1])[0]
  return k * 2 > missed.length ? { text: `${k} of ${missed.length} misses were ${NIGHT[day]}s`, strong: false } : { text: `Missed ${missed.length}, no pattern`, strong: false }
}
const Num = ({ id, n, label, sub }: { id: string; n: string; label: string; sub: string }) => (
  <span data-band={id} data-n={n} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
    <strong style={big}>{n}</strong><strong style={{ fontSize: 13, lineHeight: '17px' }}>{label}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{sub}</span>
  </span>
)
/** A square for every session, oldest on the left: green came, outlined missed, grey before joining. One label for the whole strip. */
function Squares({ p, g, says }: { p: Player; g: Group; says: string }) {
  const c = cameOf(p)
  return (
    <span role="img" aria-label={`${p.name}: came to ${c.came} of ${c.of} sessions this term. ${says}.`} style={{ display: 'flex', gap: 2, alignItems: 'center', minWidth: 0 }}>
      {g.dates.map((d, i) => { const m = p.roll[i]
        return <span key={d} style={{ flex: 1, maxWidth: 9, height: 18, borderRadius: 2, boxSizing: 'border-box', ...(m === true ? { background: G } : m === false ? { background: '#ffffff', border: '1.5px solid #a86b78' } : { background: '#eceeed' }) }} /> })}
    </span>
  )
}

export default function ACT4AcademyComing({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g, ps } = useCoachTeam()
  const n = ps.length, t = tonightOf(a, g, ps), c = count(ps)
  const trial = useTrials().find(x => x.team === g.id && x.col === 'coach'), guest = trial?.name.split(' ')[0]
  const never = ps.filter(p => { const k = cameOf(p); return k.of > 0 && k.came === k.of }).length
  // The pale mauve card: only for a player who has missed the last three and whose family has not answered for tonight.
  const worry = t.none.map(r => r.p).filter(p => missedLast(p)), ask = t.none[0]?.p
  // By night: turn-ups on each night the team trains, from the roll.
  const nights = g.days.map(d => { const day = SHORT.indexOf(d); let came = 0, of = 0
    g.dates.forEach((date, i) => { if (dow(date) !== day) return; for (const p of ps) { if (p.roll[i] === true) came++; if (p.roll[i] != null) of++ } })
    return { name: NIGHT[day] ?? d, came, of, pct: pct(came, of) } }).filter(x => x.of > 0)
  const low = Math.min(...nights.map(x => x.pct)), lowest = nights.filter(x => x.pct === low)
  // Does coming matter? Players at nine sessions in ten or more who are up a step, against those below. An estimate: a team is too few to prove it.
  const often = ps.filter(p => { const k = cameOf(p); return k.of > 0 && k.came / k.of >= 0.9 }), less = ps.filter(p => !often.includes(p))
  const owed = t.away.filter(r => r.state === 'away').map(r => r.p)   // told the coach before the session, so a make-up is owed
  const other = a.groups.find(x => x.age === g.age && x.id !== g.id)
  const openThen = (p: Player) => { openPlayer(p.id); go(coachBoard(p)) }
  const row: CSSProperties = { ...plain, display: 'grid', gridTemplateColumns: COLS, gap: 10, alignItems: 'center', minHeight: 54, borderTop: `1px solid ${HAIR}`, width: '100%' }
  const pair: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14 }

  return (
    <div data-board="ACT4-AcademyComing" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      {!inApp && <CoachNav active="training" sub="Who’s coming" go={go} />}
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', letterSpacing: '-0.02em' }}>Who’s coming</h1>
            <span style={T.cap}>Tonight · {longDate(a.today)}, {clock(g)} · {g.name} · and every session this term</span>
          </div>
          {ask && <More onClick={() => demoToast(`Asked ${firstName(ask)}’s family again. They get it in the family app now.`)}>Ask {firstName(ask)}’s family again</More>}
          <Primary onClick={() => go('ACC2-RunSession')}>Take the roll</Primary>
        </div>

        <section aria-label="Tonight and this term" style={{ flex: 'none', borderRadius: 16, background: '#ffffff', border: `1px solid ${LINE}`, padding: '12px 16px', display: 'flex', gap: 16 }}>
          <Num id="coming" n={`${t.coming.length} of ${n}`} label={t.rollTaken ? 'Here or coming tonight' : 'Coming tonight'} sub={guest ? `And ${guest}, on trial` : t.rollTaken ? 'From the roll so far' : 'From the families’ answers'} />
          <Num id="away" n={String(t.away.length)} label="Away" sub={t.away.length ? `${names(t.away.map(r => r.p))}. ${t.away.every(r => r.state === 'away') ? 'Told you why' : 'From the roll'}` : 'Nobody'} />
          <Num id="none" n={String(t.none.length)} label="No answer" sub={t.none.length ? `${names(t.none.map(r => r.p))}. ${t.none[0].line}` : 'Every family has answered'} />
          <Num id="term" n={`${c.att}%`} label="Came this term" sub={`${c.came} of ${c.of} turn-ups, from the roll`} />
          <Num id="never" n={String(never)} label="Never missed" sub={`Of ${n} players`} />
        </section>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 12, alignItems: 'start' }}>
          <section aria-label="The team" style={{ ...T.tile, gap: 0 }}>
            <div style={T.between}><h2 style={T.h2}>The team</h2><span style={T.cap}>Each square is a session, oldest on the left. Green came, outlined missed, grey before joining</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 10, padding: '4px 0' }}>
              <span /><span style={th}>Player</span><span style={th}>Tonight</span><span style={th}>This term · {g.dates.length} sessions</span><span style={th}>Came</span><span style={th}>What it shows</span>
            </div>
            {t.rows.map(r => { const p = r.p, k = cameOf(p), w = whatItShows(p, g)
              return (
                <button key={p.id} data-row={p.id} data-state={r.state} data-what={w.text} onClick={() => openThen(p)} style={row}>
                  <span style={face(r.state === 'none' ? MAUVE_PALE : MAUVE)}>{ini(p)}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{p.name}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>Age {p.age}</span></span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}><span style={pill(r.state)}>{r.label}</span><span style={{ fontSize: 12, lineHeight: '15px', color: MUT }}>{r.line}</span></span>
                  <Squares p={p} g={g} says={w.text} />
                  <span data-came="" style={{ ...T.num, fontSize: 14, whiteSpace: 'nowrap' }}><strong>{k.came}</strong> of {k.of}</span>
                  <span style={{ fontSize: 13, lineHeight: '17px', ...(w.strong ? { fontWeight: 700, color: PLUM_LABEL } : null) }}>{w.text}</span>
                </button>
              ) })}
            {trial && (
              <button data-row="trial" onClick={() => { openTrial(trial.id); go('ACC3-TrialAssess') }} style={row}>
                <span style={face(MAUVE)}>{trial.name.split(' ').map(x => x[0]).join('')}</span>
                <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{trial.name}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>Age {trial.age} · on trial</span></span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}><span style={pill('yes')}>Coming</span><span style={{ fontSize: 12, lineHeight: '15px', color: MUT }}>{trial.parent.split(' ')[0]} said yes</span></span>
                <span style={{ fontSize: 13, color: '#33443f' }}>First session</span>
                <span />
                <span style={{ fontSize: 13, lineHeight: '17px' }}>You assess {trial.she ? 'her' : 'him'} tonight</span>
              </button>
            )}
            <span style={{ ...T.cap, paddingTop: 8, borderTop: `1px solid ${HAIR}` }}>Tonight’s answers come from parents in the family app. The squares come from the roll you take. In name order, never ranked.</span>
          </section>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            {worry.map(p => (
              <section key={p.id} data-worry={p.id} aria-label={`${firstName(p)} has missed the last three`} style={{ flex: 'none', borderRadius: 16, background: MAUVE_PALE, border: '1px solid #c39797', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6, color: INK }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>{firstName(p)} has missed the last three</strong>
                <span style={{ fontSize: 13, lineHeight: '19px' }}>No answer for tonight{p.term3 === 'Not said' ? ', and the family hasn’t said about Term 3' : ''}. Dani sees this too.</span>
                <span style={{ display: 'flex', paddingTop: 4 }}><Primary onClick={() => go('ACC13-AcademyChat')}>Message {firstName(p)}’s {p.parent_is}</Primary></span>
              </section>
            ))}

            <section aria-label="By night" style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
              <h2 style={{ ...T.h2, paddingBottom: 4 }}>By night</h2>
              {nights.map(x => (
                <button key={x.name} data-night={x.name} data-pct={x.pct} onClick={() => go('ACT1-AcademyWeek')} style={{ ...plain, display: 'flex', flexDirection: 'column', gap: 4, minHeight: 60, justifyContent: 'center', borderTop: `1px solid ${HAIR}` }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{x.name}</strong><strong style={{ ...T.num, fontSize: 15 }}>{x.pct}%</strong></span>
                  <span role="img" aria-label={`${x.came} of ${x.of}`} style={{ display: 'block', height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${x.pct}%`, background: G }} /></span>
                  <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>{x.came} of {x.of} turn-ups</span>
                </button>
              ))}
              <span data-lowest="" style={{ ...T.cap, paddingTop: 6 }}>{lowest.length === 1 ? `${lowest[0].name} is your lowest night. Put the session that matters least there.` : 'No one night is lower than the rest.'}</span>
            </section>

            <section aria-label="Does coming matter?" style={{ ...T.tile, gap: 6, padding: '12px 14px' }}>
              <div style={T.between}><h2 style={T.h2}>Does coming matter?</h2><Estimate /></div>
              <span data-matter="" style={{ fontSize: 14, lineHeight: '20px' }}>Of the {often.length} who came to nine sessions in ten, <strong>{often.filter(upAStep).length} {often.filter(upAStep).length === 1 ? 'is' : 'are'} up a step</strong>. Of the {less.length} who came to fewer, {less.filter(upAStep).length}.</span>
              <span style={T.cap}>{WORDS[n] ?? n} players is too few to prove it. It is worth saying to a parent all the same.</span>
            </section>

            <section aria-label="Make-ups" style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
              <h2 style={{ ...T.h2, paddingBottom: 4 }}>Make-ups</h2>
              {owed.map(p => (
                <button key={p.id} data-makeup={p.id} onClick={() => go('ACP6-MakeUp')} style={{ ...plain, ...pair }}><span style={{ color: '#33443f' }}>{p.name}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong>1 to use this term</strong><Chevron /></span></button>
              ))}
              {!owed.length && <span style={pair}><span style={{ color: '#33443f' }}>Owed</span><strong>None</strong></span>}
              <span style={pair}><span style={{ color: '#33443f' }}>Coming in from {other?.name ?? 'the other team'}</span><strong style={{ textAlign: 'right' }}>{COMING_IN.length ? COMING_IN.join(', ') : 'Nobody tonight'}</strong></span>
              <span style={{ ...T.cap, paddingTop: 6 }}>A player who tells you before the session gets a make-up with the other team at their age.</span>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
