// AD27-CoachLearning (pack v39, new, 2,070 tall): Academy owner: what the coaches are shown to learn, where each lesson comes from,
// and what the owner can and can't see. Under Coaches, as the "Learning" sub tab.
// Everything is read from `learnStore`, the same store the coach's `ADC18-Learn` reads, and only through its `owner…` functions:
// those give a coach's name beside a REQUIRED lesson and beside a lesson the coach chose to share, and nowhere else. Every other
// lesson is a row of totals with no coach in it. This page cannot show more than that, because the store does not hand it over.
// INPUTS: "Remind" (says so here and on the coach's page) and "Set a lesson" (for everyone, a program, an age or one coach; it is on
// the coach's Learn page as "Set by Dani" when they are in it). COUNTED from the academy's list: the 17 rows and how many coaches a
// set or block lesson is shown to. SAMPLE: the lessons and every watched and tried count. A count under 30 is never given a percentage.
import { useState } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { demoToast } from '../demoToast'
import { PROGRAMS, useAcademy, type Program } from './academyStore'
import { coachBoard } from './coachStore'
import { LIBRARY, OWNER_EFFECT, ownerCanSet, ownerNumbers, ownerRequired, ownerShared, ownerTotals, remind, rules, scopeWords, setLesson, useLearn, type ReqState, type Scope } from './learnStore'
import { Cap, G, LINE, Link, MAIN, PALE, Pill, Proof, chevron } from './kit'

const SOFT = '#33443f'
const PILL: Record<ReqState, 'good' | 'mauve' | 'warn'> = { Done: 'good', Due: 'mauve', 'Not read': 'warn', Overdue: 'warn' }
const field = { height: 44, boxSizing: 'border-box', padding: '0 10px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, minWidth: 0 } as const
const pick = (on: boolean) => ({ minHeight: 44, padding: '0 14px', borderRadius: 10, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', ...(on ? { background: G, color: '#ffffff', border: `1px solid ${G}` } : { background: '#ffffff', color: '#10211f', border: '1px solid #c5c8c4' }) }) as const
const WHO = [['all', 'Everyone'], ['program', 'A program'], ['ages', 'An age'], ['coach', 'One coach']] as const
const first = (name: string) => name.split(' ')[0]

export default function AD27CoachLearning() {
  const a = useAcademy()
  useLearn()
  const n = ownerNumbers(a), req = ownerRequired(a), totals = ownerTotals(a), shared = ownerShared(a), can = ownerCanSet(a)
  const ages = [...new Set(a.groups.map(g => g.age))].sort((x, y) => x - y)
  // "Set a lesson": which lesson, who gets it, and whether it is required and by when.
  const [setting, setSetting] = useState(false), [lessonId, setLessonId] = useState(''), [who, setWho] = useState<Scope['kind']>('all')
  const [prog, setProg] = useState<Program>(PROGRAMS[0]), [age, setAge] = useState(0), [coach, setCoach] = useState(''), [required, setRequired] = useState(false), [due, setDue] = useState('30 June')
  const scope: Scope = who === 'all' ? { kind: 'all' } : who === 'program' ? { kind: 'program', prog } : who === 'ages' ? { kind: 'ages', lo: age || ages[0], hi: age || ages[0] } : { kind: 'coach', coach: coach || a.groups[0]?.coach }
  const cols = `1.2fr 0.9fr ${req.lessons.map(() => '1fr').join(' ')}`, outer = `minmax(0, ${2.1 + req.lessons.length}fr) 0.7fr`, TCOLS = '1.7fr 1.2fr 1.5fr 1fr'
  function set() {
    const l = can.find(x => x.id === (lessonId || can[0]?.id)); if (!l) return
    const shownTo = a.groups.filter(g => scope.kind === 'all' || (scope.kind === 'program' ? g.prog === scope.prog : scope.kind === 'ages' ? g.age === scope.lo : g.coach === scope.coach)).length
    const no = setLesson(a, l.id, scope, required, required ? due : '')
    if (no) { demoToast(no); return }
    setSetting(false); setRequired(false)
    demoToast(`Set: “${l.title}” for ${scopeWords(scope)}. ${shownTo} ${shownTo === 1 ? 'coach sees' : 'coaches see'} it on their Learn page as “Set by Dani”${required ? `, required${due.trim() ? ` by ${due.trim()}` : ''}` : ''}.`)
  }
  return (
    <main style={MAIN}>
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Coach learning</h1>
          <span style={{ fontSize: 14, lineHeight: '20px', color: '#4a5a57' }}>What your {n.coaches} coaches are shown, where each lesson comes from, and what you can and can’t see</span>
        </div>
        <Tap to="AD10-WatchCoach" style={S.more}>Make one from film</Tap>
        <button type="button" aria-expanded={setting} onClick={() => setSetting(!setting)} style={{ ...S.primary, fontFamily: 'inherit', cursor: 'pointer' }}>Set a lesson</button>
      </div>
      {setting && (
        <section aria-label="Set a lesson" style={{ ...S.tile, flex: 'none', gap: 10, padding: '12px 16px', border: `2px solid ${G}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}><h2 style={S.h2}>Set a lesson</h2><Cap>It goes on their Learn page as “Set by Dani”, with why</Cap></div>
          <div style={{ display: 'grid', gridTemplateColumns: '110px minmax(0,1fr)', gap: '8px 12px', alignItems: 'center' }}>
            <strong style={{ fontSize: 14 }}>Lesson</strong>
            <select aria-label="Lesson" value={lessonId || can[0]?.id} onChange={e => setLessonId(e.target.value)} style={{ ...field, width: '100%' }}>
              {can.map(l => <option key={l.id} value={l.id}>{l.title} · {l.minutes} min{l.already ? ` · shown now: ${l.already}` : ''}</option>)}
            </select>
            <strong style={{ fontSize: 14 }}>Who gets it</strong>
            <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span role="radiogroup" aria-label="Who gets it" style={{ display: 'flex', gap: 8 }}>{WHO.map(([k, t]) => <button key={k} type="button" role="radio" aria-checked={who === k} onClick={() => setWho(k)} style={pick(who === k)}>{t}</button>)}</span>
              {who === 'program' && <select aria-label="Program" value={prog} onChange={e => setProg(e.target.value as Program)} style={field}>{PROGRAMS.map(p => <option key={p}>{p}</option>)}</select>}
              {who === 'ages' && <select aria-label="Age" value={age || ages[0]} onChange={e => setAge(Number(e.target.value))} style={field}>{ages.map(x => <option key={x} value={x}>Under {x}</option>)}</select>}
              {who === 'coach' && <select aria-label="Coach" value={coach || a.groups[0]?.coach} onChange={e => setCoach(e.target.value)} style={field}>{a.groups.map(g => <option key={g.id} value={g.coach}>{g.coach} · {g.name}</option>)}</select>}
            </span>
            <strong style={{ fontSize: 14 }}>Required</strong>
            <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span role="radiogroup" aria-label="Required" style={{ display: 'flex', gap: 8 }}>
                <button type="button" role="radio" aria-checked={!required} onClick={() => setRequired(false)} style={pick(!required)}>No, their choice</button>
                <button type="button" role="radio" aria-checked={required} onClick={() => setRequired(true)} style={pick(required)}>Yes, required</button>
              </span>
              {required && <><span style={{ fontSize: 14 }}>by</span><input aria-label="Due by" value={due} onChange={e => setDue(e.target.value)} style={{ ...field, width: 120 }} /></>}
            </span>
          </div>
          <Cap>{required ? 'Required: you will see who has done it, by name, and each of them is told that you can.' : 'Not required: you will see how many watched it, never who. Under five coaches, not even how many.'}</Cap>
          <span style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={set} style={{ ...S.primary, fontFamily: 'inherit', cursor: 'pointer' }}>Set it</button>
            <button type="button" onClick={() => setSetting(false)} style={{ ...S.more, fontFamily: 'inherit', cursor: 'pointer' }}>Cancel</button>
          </span>
        </section>
      )}
      <section aria-label="Numbers" style={{ ...S.tile, flex: 'none', flexDirection: 'row', alignItems: 'center', gap: 20, padding: '12px 16px' }}>
        {([[`${n.reqDone} of ${n.reqOf}`, 'Required lessons done', `${n.coaches} coaches, ${['none', 'one', 'two', 'three', 'four', 'five'][n.required] ?? n.required} each. By name below`],
          [n.watched, 'Other lessons watched', 'This term, by all coaches together'], [`${n.active} of ${n.coaches}`, 'Coaches who watched one', 'In the last four weeks. Not which coaches'],
          [n.own, 'Lessons of your own', 'Made from Tall Timber sessions'], [n.tried, 'Things tried after', 'A coach said they tried it at a session']] as const).map(([big, t, sub]) => (
          <span key={t} data-number={t} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <strong style={{ ...S.num, fontSize: 24, lineHeight: '28px', letterSpacing: '-0.02em' }}>{big}</strong>
            <strong style={{ fontSize: 13, lineHeight: '17px' }}>{t}</strong>
            <span style={{ fontSize: 12, lineHeight: '16px', color: SOFT }}>{sub}</span>
          </span>
        ))}
      </section>
      <section style={{ ...S.tile, flex: 'none', gap: 10, padding: '12px 16px' }}>
        <h2 style={S.h2}>Who decides what a coach is shown</h2>
        <div style={{ display: 'flex', gap: 20 }}>
          {([['Their own film', 'Each session and game review finds the one thing that would help that coach most and matches a lesson to it.', 'You don’t see which. It is theirs'],
            ['The curriculum', 'Each block has a lesson on coaching that skill. It shows in the block’s first two weeks, to the coaches in it.', 'Follows the year plan'],
            ['You', 'Set a lesson for everyone, a program, an age or one coach. Make your own from film. Decide what is required.', `${n.required} required, ${n.setThisTerm} more set this term`]] as const).map(([t, s, b], i) => (
            <div key={t} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, background: G, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{i + 1}</span><strong style={{ fontSize: 15 }}>{t}</strong></span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: SOFT }}>{s}</span>
              <strong style={{ fontSize: 13, lineHeight: '18px' }}>{b}</strong>
            </div>
          ))}
        </div>
        <Cap>The library of {LIBRARY} came with Clean Sheet. Each lesson names what it is based on and where that evidence stops, the same way “Our style” does.</Cap>
      </section>
      <section aria-label="Required, by coach" style={{ ...S.tile, flex: 'none', gap: 2, padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}><h2 style={S.h2}>Required, by coach</h2><Cap>The only part of learning you see by name</Cap></div>
        <div style={{ display: 'grid', gridTemplateColumns: outer, gap: 10, alignItems: 'end', paddingBottom: 6 }}>
          <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, alignItems: 'end' }}>{['Coach', 'Team', ...req.lessons.map(l => l.title)].map(h => <span key={h} style={S.th}>{h}</span>)}</div><span />
        </div>
        {/* In team order, never ranked. The row opens the coach; Remind is its own control beside it. */}
        {req.rows.map(r => { const g = a.groups.find(x => x.id === r.groupId)!, left = r.cells.filter(c => c && c.state !== 'Done').map(c => req.lessons.find(l => l.id === c!.lesson)!.title); return (
          <div key={r.groupId} data-coach={r.coach} style={{ display: 'grid', gridTemplateColumns: outer, gap: 10, alignItems: 'center', minHeight: 46, borderTop: `1px solid ${LINE}`, boxSizing: 'content-box' }}>
            <Tap to={coachBoard(a, g)} style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, alignItems: 'center', minHeight: 46, fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none' }}>
              <strong style={{ fontSize: 14 }}>{r.coach}</strong>
              <span style={{ fontSize: 13 }}>{r.team}</span>
              {r.cells.map((c, i) => c ? <Pill key={i} kind={PILL[c.state]}>{c.label}</Pill> : <span key={i} style={{ fontSize: 12, color: SOFT }}>Not set for them</span>)}
            </Tap>
            {!r.open ? <span /> : r.reminded
              ? <span data-reminded style={{ fontSize: 12, lineHeight: '16px', color: SOFT }}>Reminded {r.reminded}</span>
              : <button type="button" onClick={() => { remind(a, r.coach); demoToast(`${first(r.coach)} is reminded about ${left.join(' and ')}. It shows on ${first(r.coach)}’s Learn page.`) }} aria-label={`Remind ${r.coach}`} style={{ minHeight: 44, padding: 0, border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: '#10211f', textDecoration: 'underline', cursor: 'pointer', textAlign: 'left' }}>Remind</button>}
          </div>
        ) })}
        <Cap style={{ paddingTop: 6 }}>A coach with child safety not done can’t open a session. The other two remind the coach a week before, on the day, and then tell you.</Cap>
      </section>
      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 12, alignItems: 'start' }}>
        <section aria-label="Everything else, in totals" style={{ ...S.tile, flex: 'none', gap: 2, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}><h2 style={S.h2}>Everything else, in totals</h2><Cap>How many, never who</Cap></div>
          <div style={{ display: 'grid', gridTemplateColumns: TCOLS, gap: 10, alignItems: 'end', paddingBottom: 6 }}>{['Lesson', 'Shown because of', 'Watched', 'And then'].map(h => <span key={h} style={S.th}>{h}</span>)}</div>
          {totals.map(t => (
            <Tap key={t.title} say="The lesson opens, with who it is shown to and why. No names of who watched." style={{ display: 'grid', gridTemplateColumns: TCOLS, gap: 10, alignItems: 'center', minHeight: 46, borderTop: `1px solid ${LINE}`, fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>{t.title}</strong>
              <span style={{ fontSize: 13 }}>{t.cause}</span>
              {t.watched === null
                ? <span style={{ fontSize: 13, color: SOFT }}>Shown to {t.shown}. Too few to count</span>
                : <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span role="img" aria-label={`${t.watched} of ${t.shown}`} style={{ flex: 1, height: 8, borderRadius: 4, background: LINE, overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${t.shown ? Math.round(100 * t.watched / t.shown) : 0}%`, background: G }} /></span>
                    <span style={{ ...S.num, fontSize: 13, whiteSpace: 'nowrap' }}><strong>{t.watched}</strong> of {t.shown} coaches</span>
                  </span>}
              <span style={{ ...S.num, fontSize: 13 }}>{t.nothingToTry ? 'Nothing to try' : t.tried === null ? '' : `${t.tried} tried it after`}</span>
            </Tap>
          ))}
          <Cap style={{ paddingTop: 6 }}>“Shown to” is the number of coaches the lesson was offered to. A lesson picked from a coach’s own film only appears here once five or more coaches have been shown it.</Cap>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
          <section aria-label="What you can’t see, and why" style={{ ...S.tile, gap: 6, padding: '12px 14px', background: PALE }}>
            <h2 style={S.h2}>What you can’t see, and why</h2>
            {/* The same list the coach's Learn page draws, from the one place in the store. */}
            {rules().map(r => <span key={r.head} data-rule={r.head} style={{ fontSize: 13, lineHeight: '19px' }}><strong>{r.head}:</strong> {r.owner}</span>)}
            <span style={{ fontSize: 13, lineHeight: '19px' }}>This is a choice, not a limit of the app: coaches are told that learning here is not a test. Each coach’s Learn page shows them exactly this list.</span>
            <span style={{ display: 'flex', paddingTop: 2 }}><Link to="ADC18-Learn">See it as a coach</Link></span>
          </section>
          <section aria-label="Does it change anything?" style={{ ...S.tile, gap: 4, padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}><h2 style={S.h2}>Does it change anything?</h2><Proof kind="Estimate" /></div>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>Of the {OWNER_EFFECT.coaches} coaches who watched “{OWNER_EFFECT.lesson}”, <strong>{OWNER_EFFECT.better} {OWNER_EFFECT.what}</strong> in the next filmed session.</span>
            <Cap>{OWNER_EFFECT.limit}</Cap>
          </section>
          <section aria-label="Shared with you" style={{ ...S.tile, gap: 0, padding: '12px 14px' }}>
            <h2 style={{ ...S.h2, paddingBottom: 4 }}>Shared with you</h2>
            {shared.map(s => { const g = a.groups.find(x => x.id === s.groupId)!; return (
              <Tap key={`${s.coach}|${s.lesson}`} to={coachBoard(a, g)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 44, padding: '4px 0', borderTop: `1px solid ${LINE}`, fontSize: 14, textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}><span style={{ color: SOFT }}>{s.coach}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, textAlign: 'right' }}>{s.lesson}{chevron}</span></span>
                {(s.tried || s.note) && <span style={{ fontSize: 12, lineHeight: '16px', color: SOFT }}>{s.tried ? `Tried: ${s.tried}` : ''}{s.tried && s.note ? ' ' : ''}{s.note ? `Note: ${s.note}` : ''}</span>}
              </Tap>
            ) })}
            {shared.length === 0 && <Cap style={{ borderTop: `1px solid ${LINE}`, padding: '10px 0' }}>Nothing shared yet.</Cap>}
            <Cap style={{ paddingTop: 6 }}>A coach can choose to show you a lesson they finished and what they tried.</Cap>
          </section>
        </div>
      </div>
    </main>
  )
}
