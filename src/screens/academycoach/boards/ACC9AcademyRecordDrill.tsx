// ACC9-AcademyRecordDrill, rebuilt as pack v38 draws it. The old table of parameters is gone. Three steps, and only the first is needed:
// 1 what it is (from tonight's plan, from the drill library, or one sentence), 2 anything different tonight, 3 what the film should look for.
// COUNTED: the four parts are tonight's session for this team (`teamSessionOf`), so a swap on the session plan shows here; the library
// search runs over the drills the curriculum names (24, all striking) and says how many the library counts (248); who is coming is
// `tonightOf`; "On their goal" is the players in the list whose goal is on the drill's skill.
// SAMPLE: what the film looks for (worked out from the drill by the small rule below), which drills were filmed before, who is blurred
// and whose sensors are flat (filmStore), and what "Say it" hears (the board's own sentence is written in: the demo has no microphone).
// What the coach chooses is kept while the app is open (filmStore). A tile is as tall as its content. Hand-built.

import { useContext, useState, type CSSProperties } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { DRILLS, DRILL_COUNTS, LIBRARY_TOTAL, PARTS, needsNoGoals, nightOfDate, sketch, teamSessionOf, useCurriculum, weekNow, type Drill } from '../../academy/curriculum'
import { useTrials } from '../../academy/trialStore'
import { clock, names, shortDate, tonightOf, useCoachTeam } from '../coachTeam'
import { FILMED_BEFORE, KIT, look, setDrill, useFilm, type Way } from '../filmStore'
import { Pair, Viewfinder } from '../filmParts'
import { HERO_BG, heroBtn } from '../filmStyles'
import { More, Primary } from '../kit'
import { G, HAIR, INK, LINE, PALE, T, label, plain } from '../styles'

// SAMPLE (the board's own words): what "Say it" writes in, since the demo cannot listen.
const SAY_DRILL = 'Three stations in the box. Middle one is weaker foot only. Groups of five, swap every five minutes.'
const SAY_NOTE = 'Chaser starts two steps closer than the library says. They were finding it too easy.'
/** What a sentence would be filed under: the core skill its words point to, and the weaker foot when it is named. A small rule, not a reading of the sentence. */
function fileUnder(text: string): { skill: string | null; tags: string[] } {
  const t = text.toLowerCase()
  const skill = /shoot|shot|finish|strik|goal|box|volley|laces|pass/.test(t) ? 'Striking the ball' : /first touch|receiv|control|back foot/.test(t) ? 'First touch' : /dribbl|run with|carry|running with/.test(t) ? 'Running with the ball' : /1 ?v ?1|one against one|take.* on|beat (a|the|your)/.test(t) ? 'One against one' : null
  return { skill, tags: [...(skill ? [skill.toLowerCase()] : []), ...(/weak|left foot|right foot|other foot/.test(t) ? ['weaker foot'] : [])] }
}
type Look = { name: string; from: 'from the film' | 'from the boot sensors' | 'you tap'; on: boolean }
/** What the film is asked to look for, filled in from the drill. SAMPLE rule: goes for everyone; the weaker foot on a striking drill;
 * and two more, switched off until the coach wants them, when the drill has a goal or a defender. */
function looksFor(skill: string | null, d: Drill | null): Look[] {
  const striking = skill === 'Striking the ball', goals = !!d && !needsNoGoals(d), pressed = !!d && /chaser|pressure|v \d|chaos/i.test(d.name)
  return [
    ...(striking ? [{ name: goals || !d ? 'Weaker-foot shots on target' : 'Clean weaker-foot strikes', from: 'from the film', on: true } as Look] : []),
    { name: 'Goes for each player', from: 'from the film', on: true },
    ...(striking ? [{ name: 'Weaker-foot touches', from: 'from the boot sensors', on: true } as Look] : [{ name: 'Touches with each foot', from: 'from the boot sensors', on: true } as Look]),
    ...(goals ? [{ name: pressed ? 'Time from turn to shot' : 'Time from first touch to shot', from: 'from the film', on: false } as Look] : []),
    ...(pressed ? [{ name: d && /chaser/i.test(d.name) ? 'Beat the chaser' : 'Beat the defender', from: 'you tap', on: false } as Look] : []),
  ]
}
/** The set-up drawing on a card: the library's sketch for the drill, not the real set-up. */
function Drawing({ d }: { d: Drill }) {
  const p = sketch(d.i)
  return (
    <svg viewBox="0 0 120 70" width="100%" height="76" role="img" aria-label={`${d.name}: a sketch of the set-up`} style={{ borderRadius: 8, background: '#dcebe3' }}>
      <rect x="3" y="3" width="114" height="64" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.5" /><line x1="60" y1="3" x2="60" y2="67" stroke="#ffffff" strokeWidth="1.5" />
      {p.map((q, k) => <circle key={k} cx={q.x} cy={q.y} r="3.2" fill={q.dark ? INK : G} />)}
      <path d={`M${p[0].x} ${p[0].y} L${p[1].x} ${p[1].y}`} stroke={INK} strokeWidth="1.4" strokeDasharray="3 3" fill="none" />
    </svg>
  )
}
const ON: CSSProperties = { background: PALE, border: `2px solid ${G}` }, OFF: CSSProperties = { background: '#ffffff', border: `1px solid ${LINE}` }
const field: CSSProperties = { flexGrow: 1, minWidth: 0, minHeight: 48, boxSizing: 'border-box', borderRadius: 10, border: '1px solid #8a9794', background: '#ffffff', padding: 12, fontFamily: 'inherit', fontSize: 14, lineHeight: '20px', color: INK, resize: 'vertical' }
const Step = ({ n, title, line }: { n: number; title: string; line: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <span style={{ flex: 'none', width: 28, height: 28, borderRadius: 999, background: G, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{n}</span>
    <h2 style={{ ...T.h2, flex: 'none' }}>{title}</h2><span style={{ fontSize: 13, lineHeight: '17px', color: '#33443f' }}>{line}</span>
  </div>
)

export default function ACC9AcademyRecordDrill({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g, ps } = useCoachTeam(), c = useCurriculum(), { drill: ch } = useFilm()
  const [own, setOwn] = useState<string | null>(null)   // the chip being typed, when "+ Your own" is open
  const n = ps.length, s = teamSessionOf(a, c, g, weekNow(a), nightOfDate(a.today) ?? 'Mon')
  // The clock: each part starts when the one before it ends.
  const mins = s.parts.map(p => p.drill?.minutes ?? 0), cards = s.parts.map((p, k) => ({ ...p, at: clock(g, mins.slice(0, k).reduce((x, y) => x + y, 0)) })).filter(p => p.drill)
  const planPart = cards.find(p => p.part === ch.part) ?? cards[PARTS.indexOf('Training')] ?? cards[0]
  const libDrill = DRILLS.find(d => d.name === ch.lib) ?? null, filed = fileUnder(ch.text)
  // What is chosen, whichever way it was said.
  const chosen: { name: string; meta: string; skill: string | null; drill: Drill | null; ready: boolean } =
    ch.way === 'plan' ? (planPart?.drill ? { name: planPart.drill.name, meta: `${planPart.part} · ${planPart.drill.minutes} min`, skill: planPart.drill.skill, drill: planPart.drill, ready: true } : { name: 'Nothing on tonight’s plan', meta: 'Pick from the library, or describe it', skill: null, drill: null, ready: false })
    : ch.way === 'library' ? (libDrill ? { name: libDrill.name, meta: `${libDrill.part} · ${libDrill.minutes} min · from the library`, skill: libDrill.skill, drill: libDrill, ready: true } : { name: 'Pick a drill', meta: 'Search the library on the left', skill: null, drill: null, ready: false })
    : ch.text.trim() ? { name: 'Your own drill', meta: filed.tags.length ? `Described · filed under ${filed.tags.join(' and ')}` : 'Described · no skill picked out yet', skill: filed.skill, drill: null, ready: true } : { name: 'Describe the drill', meta: 'One sentence is enough', skill: null, drill: null, ready: false }
  const q = ch.search.trim().toLowerCase()
  const found = q ? DRILLS.filter(d => `${d.name} ${d.skill} ${d.part}`.toLowerCase().includes(q)) : DRILLS.filter(d => d.lo <= g.age && g.age <= d.hi)
  const counted = DRILL_COUNTS.find(([k]) => q.length > 2 && k.toLowerCase().includes(q))
  // Step 3: the drill's own list, with the coach's taps and additions on top.
  const looks = [...looksFor(chosen.skill, chosen.drill), ...ch.mine.map(name => ({ name, from: 'you tap', on: true }) as Look)].map(l => ({ ...l, on: l.on !== ch.flipped.includes(l.name) }))
  const flip = (l: Look) => { setDrill({ flipped: ch.flipped.includes(l.name) ? ch.flipped.filter(x => x !== l.name) : [...ch.flipped, l.name] }); demoToast(`${l.name}: ${l.on ? 'taken off' : 'added'}.`) }
  const addOwn = () => { const v = (own ?? '').trim(); if (!v) { demoToast('Type what to look for first.'); return } if (!looks.some(l => l.name.toLowerCase() === v.toLowerCase())) setDrill({ mine: [...ch.mine, v] }); setOwn(null); demoToast(`${v}: added. You tap it as it happens.`) }
  const start = () => { if (!chosen.ready) { demoToast('Say what it is first: pick a part of tonight’s plan, a drill from the library, or type one sentence.'); return } go('ACC11-AcademyRecording') }
  // Who is in it.
  const t = tonightOf(a, g, ps), trial = useTrials().find(x => x.team === g.id && x.col === 'coach'), guest = trial?.name.split(' ')[0]
  const blurred = ps.filter(p => KIT.noFilm.includes(p.name)), flat = ps.filter(p => KIT.flatSensors.includes(p.name))
  const awayToo = (first: string) => t.coming.some(r => r.p.name.split(' ')[0] === first) ? first : `${first} (away tonight)`
  const before = FILMED_BEFORE[chosen.name], onGoal = chosen.skill ? ps.filter(p => p.goal_skill === chosen.skill) : []
  const clipsOnly = g.age < 12   // under 12 it is clips only: nothing is counted for a child that age
  const way = (id: Way, title: string, line: string) => (
    <button role="radio" aria-checked={ch.way === id} data-way={id} onClick={() => setDrill({ way: id })} style={{ ...plain, flex: 1, minWidth: 0, minHeight: 64, boxSizing: 'border-box', borderRadius: 12, padding: '8px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, ...(ch.way === id ? ON : OFF) }}>
      <strong style={{ fontSize: 15, lineHeight: '19px' }}>{title}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{line}</span>
    </button>
  )
  const wrap: CSSProperties = { ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }

  return (
    <div data-board="ACC9-AcademyRecordDrill" style={wrap}>
      {!inApp && <CoachNav active="record" sub="Record" go={go} />}
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', letterSpacing: '-0.02em' }}>Record a drill</h1>
            <span style={T.cap}>Say what it is in whichever way is quickest. Nothing else is needed to start.</span>
          </div>
          <More onClick={() => go('ACC8-AcademyRecord')}>Back</More>
          <Primary onClick={start}>Start recording</Primary>
        </div>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: 12, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="What is it?" style={{ ...T.tile, flex: 'none', gap: 8, padding: '12px 16px' }}>
              <Step n={1} title="What is it?" line="Three ways to say. Pick one." />
              <div role="radiogroup" aria-label="How to say what the drill is" style={{ display: 'flex', gap: 8 }}>
                {way('plan', 'From tonight’s plan', cards.length === 4 ? 'Four parts, already known' : `${cards.length} parts, already known`)}
                {way('library', 'From the drill library', `${LIBRARY_TOTAL} drills, search by name or skill`)}
                {way('describe', 'Describe it', 'Type or say one sentence')}
              </div>
              {ch.way === 'plan' && (cards.length ? (
                <div role="radiogroup" aria-label="Tonight’s plan" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 8 }}>
                  {cards.map(p => (
                    <button key={p.part} role="radio" aria-checked={p === planPart} data-part={p.part} data-drill={p.drill!.name} onClick={() => { setDrill({ part: p.part }); demoToast(`${p.drill!.name} picked.`) }} style={{ ...plain, display: 'flex', flexDirection: 'column', gap: 4, padding: 8, borderRadius: 12, ...(p === planPart ? ON : OFF) }}>
                      <Drawing d={p.drill!} />
                      <strong style={{ fontSize: 13, lineHeight: '17px', minHeight: 34 }}>{p.drill!.name}</strong>
                      <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{p.part} · {p.at}{p.swapped ? ' · you swapped it in' : ''}</span>
                    </button>
                  ))}
                </div>
              ) : <span style={T.cap}>Tonight’s plan has no drills in it. Pick one from the library, or describe it.</span>)}
              {ch.way === 'library' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <input aria-label="Search the drill library by name or skill" data-search="" value={ch.search} onChange={e => setDrill({ search: e.target.value })} placeholder="Search by name or skill: gates, finish, game" style={{ ...field, minHeight: 44, height: 44, padding: '0 12px', resize: undefined }} />
                  <div role="radiogroup" aria-label="Drills found" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {found.slice(0, 8).map(d => (
                      <button key={d.name} role="radio" aria-checked={ch.lib === d.name} data-lib={d.name} onClick={() => { setDrill({ lib: d.name }); demoToast(`${d.name} picked.`) }} style={{ ...plain, minHeight: 48, boxSizing: 'border-box', padding: '4px 12px', borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...(ch.lib === d.name ? ON : OFF) }}>
                        <strong style={{ fontSize: 13, lineHeight: '17px' }}>{d.name}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{d.skill} · {d.part} · ages {d.ages}</span>
                      </button>
                    ))}
                  </div>
                  <span data-found={found.length} style={T.cap}>
                    {found.length ? `${q ? `${found.length} found` : `${found.length} that fit ${g.ages.toLowerCase()}`}${found.length > 8 ? ', the first 8 shown. Keep typing to narrow it.' : '.'}` : counted ? `The library counts ${counted[1]} drills for ${counted[0].toLowerCase()}, but this sample names none of them.` : 'Nothing by that name. Try a skill, or describe it instead.'}
                    {' '}The library counts {LIBRARY_TOTAL} drills. This sample names {DRILLS.length} of them, all for striking the ball, so those are the ones a search can find.
                  </span>
                </div>
              )}
              {ch.way === 'describe' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={label}>Describe it in a sentence</span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <textarea aria-label="Describe the drill" data-describe="" rows={2} value={ch.text} onChange={e => setDrill({ text: e.target.value, own: false })} placeholder={`“${SAY_DRILL}”`} style={{ ...field, ...(ch.text ? null : { border: '1px dashed #8a9794' }) }} />
                    <More onClick={() => { setDrill({ text: SAY_DRILL, own: false }); demoToast('Listening. Say what the drill is. In this demo the sample sentence is written down for you.') }}>Say it</More>
                  </div>
                  {ch.text.trim() ? (
                    <div data-filed={filed.tags.join(', ')} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', borderRadius: 12, background: PALE, padding: '8px 12px' }}>
                      <span style={{ flexGrow: 1, minWidth: 0, fontSize: 14, lineHeight: '20px' }}>{filed.tags.length ? <>The app would file this under <strong>{filed.tags.join(' and ')}</strong>.</> : 'The app can’t tell the skill from this yet. It is kept as your own drill, and you can say the skill afterwards.'}</span>
                      {ch.own ? <strong style={{ fontSize: 14 }}>Saved as a drill of your own</strong> : <More onClick={() => { setDrill({ own: true }); demoToast('Saved as a drill of your own. It is in the library under your name.') }}>Save as my own drill</More>}
                    </div>
                  ) : null}
                  <span style={T.cap}>The app reads the sentence, files it under a skill, and offers to save it as a drill of your own. No boxes to fill in.</span>
                </div>
              )}
            </section>

            <section aria-label="Anything different tonight?" style={{ ...T.tile, flex: 'none', gap: 8, padding: '12px 16px' }}>
              <Step n={2} title="Anything different tonight?" line="Optional. A note only you and Dani see." />
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <textarea aria-label="A note about tonight" data-note="" rows={2} value={ch.note} onChange={e => setDrill({ note: e.target.value })} placeholder="What you changed, if anything" style={field} />
                <More onClick={() => { setDrill({ note: SAY_NOTE }); demoToast('Listening. In this demo the sample note is written down for you.') }}>Say it</More>
              </div>
              <span style={T.cap}>Change the drill however you like. The note travels with the film, so next time you know what was different.</span>
            </section>

            <section aria-label="What should the film look for?" style={{ ...T.tile, flex: 'none', gap: 8, padding: '12px 16px' }}>
              <Step n={3} title="What should the film look for?" line={clipsOnly ? 'Under 12 it is clips only.' : 'Filled in from the drill. Tap to take one off or add your own.'} />
              {clipsOnly ? <span style={{ fontSize: 14, lineHeight: '20px' }}>Nothing is counted for a child under 12. You get the film, cut into each player’s moments.</span> : (
                <>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    {looks.map(l => (
                      <button key={l.name} role="switch" aria-checked={l.on} data-look={l.name} onClick={() => flip(l)} style={{ ...plain, minHeight: 44, boxSizing: 'border-box', borderRadius: 999, padding: '0 14px', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, ...(l.on ? { background: G, color: '#ffffff' } : { background: '#ffffff', color: INK, border: `1px solid ${LINE}` }) }}>
                        {l.name}<span style={{ fontSize: 11, fontWeight: 400, color: l.on ? '#e4f1eb' : '#33443f' }}>{l.from}</span>
                      </button>
                    ))}
                    {own === null
                      ? <button data-own="" onClick={() => setOwn('')} style={{ ...plain, minHeight: 44, boxSizing: 'border-box', borderRadius: 999, padding: '0 14px', display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 700, background: '#ffffff', border: `1px solid ${LINE}` }}>+ Your own</button>
                      : <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <input aria-label="Your own thing to look for" data-own-text="" autoFocus value={own} onChange={e => setOwn(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addOwn() }} placeholder="Such as: looks up first" style={{ ...field, flexGrow: 0, width: 220, minHeight: 44, height: 44, padding: '0 12px' }} />
                          <More onClick={addOwn}>Add</More><More onClick={() => setOwn(null)}>Cancel</More>
                        </span>}
                  </div>
                  <span data-looks={looks.filter(l => l.on).length} style={T.cap}>{looks.some(l => l.on) ? 'Leave all of them off and you still get the film, cut into each player’s moments. Numbers are a choice, not a requirement.' : 'All off. You still get the film, cut into each player’s moments.'}{flat.length && looks.some(l => l.on && l.from === 'from the boot sensors') ? ` ${names(flat)} has no sensors tonight, so no touches for ${flat.length === 1 ? 'that one player' : 'those players'}.` : ''}</span>
                </>
              )}
            </section>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="Ready" data-chosen={chosen.name} style={{ borderRadius: 18, background: HERO_BG, color: '#ffffff', padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><strong style={{ fontSize: 18, lineHeight: '23px' }}>{chosen.name}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#cfe6dc' }}>{chosen.meta}</span></div>
              <Viewfinder height={210} />
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#cfe6dc' }}>{chosen.drill && needsNoGoals(chosen.drill) ? 'Best from the side, with every cone in view.' : 'Best from behind the goal, with both posts in view.'} The lines turn green when it can see enough.</span>
              <span style={{ display: 'flex', gap: 8 }}>
                <button data-start="" onClick={start} style={heroBtn(true)}>Start recording</button>
                <button onClick={() => demoToast('The view opens full screen with the lines to match.')} style={heroBtn(false)}>Check the view</button>
              </span>
            </section>

            {before ? (
              <section aria-label="You’ve filmed this before" style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
                <h2 style={{ ...T.h2, paddingBottom: 4 }}>You’ve filmed this before</h2>
                <Pair id="last" name="Last time" onClick={() => { look({ view: 'recording', at: null, walk: false }); go('ADC3-SessionFilm') }}>{shortDate(before)}</Pair>
                <button data-pair="compare" role="switch" aria-checked={ch.compare} onClick={() => { setDrill({ compare: !ch.compare }); demoToast(ch.compare ? 'Comparison turned off. Tonight stands on its own.' : 'Comparison turned on. Tonight is set beside last time.') }} style={{ ...plain, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14, width: '100%' }}>
                  <span style={{ color: '#33443f' }}>Compare with it</span><strong>{ch.compare ? 'Yes' : 'No'}</strong>
                </button>
                <Pair id="goal" name="On their goal" onClick={() => go('ADC2-Group')}>{onGoal.length} {onGoal.length === 1 ? 'player' : 'players'}</Pair>
                <span style={{ ...T.cap, paddingTop: 6 }}>A comparison only means much if the drill was run about the same way. {ch.note.trim() ? 'Your note says what changed, and the result says so too.' : 'If you change it tonight, say so in the note and the result says so too.'}</span>
              </section>
            ) : chosen.ready ? (
              <section aria-label="First time you film this" style={{ ...T.tile, gap: 4, padding: '12px 14px' }}>
                <h2 style={T.h2}>First time you film this</h2>
                <span style={{ fontSize: 14, lineHeight: '20px' }}>Tonight is the starting point. Film it again the same way and a comparison shows.</span>
                {chosen.skill && <Pair id="goal" name="On their goal" onClick={() => go('ADC2-Group')}>{onGoal.length} {onGoal.length === 1 ? 'player' : 'players'}</Pair>}
              </section>
            ) : null}

            <section aria-label="Who is in it" style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
              <h2 style={{ ...T.h2, paddingBottom: 4 }}>Who is in it</h2>
              <Pair id="coming" name={t.rollTaken ? 'Here or coming' : 'Coming tonight'} onClick={() => go('ACT4-AcademyComing')}>{t.coming.length} of {n}{guest ? `, and ${guest}` : ''}</Pair>
              <Pair id="blurred" name="Blurred">{[...blurred.map(p => awayToo(p.name.split(' ')[0])), ...(guest ? [`${guest} (on trial)`] : [])].join(', ') || 'Nobody'}</Pair>
              <Pair id="sensors" name="No sensors">{[...flat.map(p => p.name.split(' ')[0]), ...(guest ? [guest] : [])].join(', ') || 'Everyone has a pair'}</Pair>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
