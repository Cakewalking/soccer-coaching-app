// ADC19-SetPractice (packs v35 and v36, new, 1,610 tall): the coach sets next week's practice at home on one page.
// Five numbered steps on the left; on the right the family's phone screen, which changes as the coach changes things.
// The coach works on a draft here. "Send Monday 4 pm", "Send it now" and "Save, don't send" write it to the shared practice
// store (`setNext`), or `setSingle` when it is for one player, and ADC6 then shows next week's as set.
// LIMITS are the owner's, read live from the store (`ruleOf`): an option past the limit is shown but cannot be picked, with the reason.
// COUNTED: who it goes to (the team's list; by step from the steps; own app against parent only from ages), the limits, the videos a week.
// SAMPLE, marked in practiceCoach: which three players' weaker foot is the right. The library's drills have no home steps written but one.
// Always on, not a setting: "Sore or tired? Skip it", no streaks, no table, one reminder at most, under 13 to the parent's app only.

import { useContext, useState, type CSSProperties, type ReactNode } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { ruleOf, setNext, setSingle, usePractice, type PracticeSet, type Step } from '../../academy/practice'
import { DRILLS, SAMPLE_SKILL, lower } from '../../academy/curriculum'
import { useTrials } from '../../academy/trialStore'
import { firstName, names, useCoachTeam } from '../coachTeam'
import { More, Primary } from '../kit'
import { ALONE, TIMES, audience, flowStart, nextMonday, noReminder, setSpoken, stepsFor, thisWeek, timesWord, useSpoken, weakerFoot, whoFrom, whoLine, type Who } from '../practiceCoach'
import { G, HAIR, INK, LINE, MAUVE_PALE, MUT, PALE, T, plain } from '../styles'

const MINUTES = [5, 10, 15, 20], NEEDS = ['A wall and a ball', 'A partner', 'Cones or markers'], DONE_BY = ['Thursday’s session', 'Sunday’s game', 'No date']
const BACK: [string, string, (videos: number) => string][] = [
  ['tick', 'A tick when it’s done', () => 'From the player or a parent. Always on.'],
  ['count', 'Their count', () => 'How many they got. It goes in their file.'],
  ['video', 'A video, if they want to', v => `About ${v} a week. Roughly a minute each to answer.`],
  ['felt', 'How it felt', () => 'Easy, about right, or hard. Helps you pitch next week.'],
]
const pick: CSSProperties = { ...plain, flex: 1, minHeight: 44, boxSizing: 'border-box', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4px 8px', fontSize: 13, lineHeight: '16px', fontWeight: 700 }
const ON: CSSProperties = { background: G, color: '#ffffff', border: `1px solid ${G}` }, OFF: CSSProperties = { background: '#ffffff', color: INK, border: `1px solid ${LINE}` }, NO: CSSProperties = { background: '#faf5ec', color: MUT, border: '1px dashed #8a9794', cursor: 'default' }
const pair: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14 }
const box: CSSProperties = { font: 'inherit', fontSize: 14, color: INK, minHeight: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LINE}`, background: '#ffffff', boxSizing: 'border-box', width: '100%' }
const Circle = ({ n }: { n: number }) => <span style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, background: G, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{n}</span>
const StepHead = ({ n, title, sub }: { n: number; title: string; sub: string }) => <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 6 }}><Circle n={n} /><h2 style={T.h2}>{title}</h2><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{sub}</span></div>
function Opt({ label, on, off, onTap, id }: { label: string; on: boolean; off?: string; onTap: () => void; id?: string }) {
  return <button data-opt={id ?? label} role="radio" aria-checked={on} aria-disabled={!!off} disabled={!!off} title={off} onClick={onTap} style={{ ...pick, ...(off ? NO : on ? ON : OFF) }}>{off ? `${label} · ${off}` : label}</button>
}
const Row = ({ label, children }: { label: string; children: ReactNode }) => <div style={{ display: 'grid', gridTemplateColumns: '112px minmax(0,1fr)', gap: 8, alignItems: 'center', minHeight: 52 }}><strong style={{ fontSize: 13 }}>{label}</strong><span role="radiogroup" aria-label={label} style={{ display: 'flex', gap: 8 }}>{children}</span></div>

export default function ADC19SetPractice({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g, ps } = useCoachTeam(), p = usePractice(), spoken = useSpoken()
  const rule = ruleOf(p, g.prog), isOn = !!rule && rule.on !== false, maxMin = rule?.longest_minutes ?? 0, maxTimes = rule?.most_often ?? 0, canSwap = rule?.coach_can_swap !== false, videoOk = rule?.video_back !== false
  // The draft: next week's practice as it stands in the store (the curriculum's pick until the coach changes it).
  const [d, setD] = useState<PracticeSet>(() => p.next_week)
  const [who, setWho] = useState<Who>(() => flowStart() === 'one' ? { kind: 'one', player: ps.find(x => x.goal)?.name ?? ps[0]?.name ?? '' } : whoFrom(p.next_week.who))
  const [editing, setEditing] = useState(false), [view, setView] = useState<'player' | 'parent'>('player'), [lib, setLib] = useState(false), [rec, setRec] = useState(false)
  const put = (c: Partial<PracticeSet>) => setD(x => ({ ...x, ...c }))
  // What is shown is always inside the owner's limit, even if the rule changed after the draft was made.
  const minutes = Math.min(d.minutes, maxMin || d.minutes), times = Math.min(d.times, maxTimes || d.times), back = (d.back ?? ['tick']).filter(x => x !== 'video' || videoOk)
  const skill = Math.max(0, a.skills.indexOf(SAMPLE_SKILL))
  const to = audience(ps, who, skill), onStep = audience(ps, { kind: 'step' }, skill), own = to.filter(x => x.age >= 13).length, quiet = noReminder(to)
  const trial = useTrials().filter(x => x.team === g.id && x.col === 'coach'), right = to.filter(x => weakerFoot(x.name) === 'right').length
  const one = who.kind === 'one' ? ps.find(x => x.name === who.player) : undefined
  const example = one ?? to.find(x => x.age >= 13) ?? to[0], foot = example ? weakerFoot(example.name) : 'left', Foot = foot.charAt(0).toUpperCase() + foot.slice(1)
  const pickIs = d.set_by === 'curriculum' ? 'pick' : d.set_by.startsWith('library') ? 'library' : d.set_by.startsWith('own film') ? 'film' : 'pick'
  const doneShort = d.done_by === 'No date' ? '' : ` before ${(d.done_by ?? 'Thursday').split('’')[0]}`
  const videos = thisWeek(p).videos, families = to.length
  const mine = (text: string) => text.replace(/weaker foot/gi, m => m[0] === 'W' ? `${Foot} foot` : `${foot} foot`)

  function send(state: 'scheduled' | 'sent' | 'saved') {
    const set: PracticeSet = { ...d, minutes, times, back, who: whoLine(who), state, sent: state === 'sent' ? 'today' : 'Monday 4 pm' }
    if (who.kind === 'one' && one) {   // one player's practice sits under the team's: it does not replace next week's
      if (state !== 'saved') setSingle(one.name, d.name)
      demoToast(state === 'saved' ? `Saved for ${firstName(one)}. Nothing goes until you send it.` : `Set for ${firstName(one)}: ${d.name}. It sits under the team’s practice${state === 'sent' ? ' and has gone now' : ' and goes Monday at 4 pm'}.`)
      return
    }
    setNext(set)
    demoToast(state === 'scheduled' ? `Set. It goes to ${families} families on Monday at 4 pm. You can change it until then.` : state === 'sent' ? `Sent to ${families} families.` : 'Saved, not sent. If you do nothing, the curriculum’s pick still goes on Monday.')
  }
  const off = !isOn ? `Practice at home is off for ${g.prog}. Dani turns it on.` : !families ? 'Nobody to send it to.' : ''
  const saved = p.next_week.state

  return (
    <div data-board="ADC19-SetPractice" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180 }), position: 'relative', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      {!inApp && <CoachNav active="training" sub="Practice at home" go={go} />}
      <main style={{ ...T.main, flexGrow: 0, flex: 'none' }}>
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', letterSpacing: '-0.02em' }}>Set practice at home</h1>
            <span data-status="" style={T.cap}>For week {p.week + 1} · {g.name} · goes out {nextMonday(a.today)} at 4 pm{saved ? ` · ${saved === 'scheduled' ? 'set by you' : saved === 'sent' ? 'sent by you' : 'saved, not sent'}` : ''}</span>
          </div>
          <More onClick={() => go('ADC6-HomePractice')}>Back</More>
          <button data-send="top" disabled={!!off} onClick={() => send('scheduled')} style={{ ...plain, height: 44, padding: '0 18px', borderRadius: 10, fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', ...(off ? { background: '#e9eae8', color: MUT, border: `1px solid ${LINE}`, cursor: 'default' } : { background: G, color: '#ffffff', border: `1px solid ${G}` }) }}>Send Monday 4 pm</button>
        </div>
        {off && <div role="status" data-off="" style={{ ...T.cap, flex: 'none', borderRadius: 12, background: MAUVE_PALE, color: INK, padding: '10px 14px' }}>{off}</div>}

        <section aria-label="The five steps" style={{ flex: 'none', borderRadius: 16, background: '#ffffff', border: `1px solid ${LINE}`, padding: '12px 16px', display: 'flex', gap: 14 }}>
          {[['What', 'Start from the curriculum’s pick'], ['Who', 'The team, a few, or one player'], ['How much', 'Inside the limit Dani set'], ['What comes back', 'A tick, a count, a video'], ['Your line', 'Then it sends itself']].map(([name, text], k) => (
            <span key={name} style={{ flex: 1, minWidth: 0, display: 'flex', gap: 10 }}><Circle n={k + 1} /><span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{name}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{text}</span></span></span>
          ))}
        </section>

        <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 310px', gap: 12, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="What" style={T.tile}>
              <StepHead n={1} title="What" sub="Already filled in. Change it only if you want to." />
              <div role="radiogroup" aria-label="Where the practice comes from" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8 }}>
                {([['pick', 'The curriculum’s pick', `${p.next_week.set_by === 'curriculum' ? p.next_week.name : p.ladder_u13_term2.find(x => x.week === p.week + 1)?.practice ?? 'This week’s pick'}. Written by Dani for week ${p.week + 1} of this block, for every under ${g.age} team.`, ''],
                  ['library', 'From the drill library', `${ALONE.length} of the ${DRILLS.length} ${lower(SAMPLE_SKILL).split(' ')[0]} drills can be done alone at home. Pick one.`, canSwap ? '' : `Dani has swaps off for ${g.prog}`],
                  ['film', 'Film your own', 'Show it in 40 seconds on the tablet. It joins your drills and Dani sees it.', canSwap ? '' : `Dani has swaps off for ${g.prog}`]] as const).map(([id, title, text, no]) => (
                  <button key={id} data-source={id} role="radio" aria-checked={pickIs === id} disabled={!!no} onClick={() => {
                    if (id === 'pick') { const wk = p.ladder_u13_term2.find(x => x.week === p.week + 1); put({ name: p.next_week.set_by === 'curriculum' ? p.next_week.name : wk?.practice ?? d.name, steps: p.next_week.set_by === 'curriculum' ? p.next_week.steps : d.steps, set_by: 'curriculum' }); setLib(false) }
                    if (id === 'library') setLib(true)
                    if (id === 'film') { put({ set_by: 'own film', name: d.name }); setLib(false); demoToast('Film it on the tablet, then come back: it will be here as your own drill.') }
                  }} style={{ ...plain, display: 'flex', flexDirection: 'column', gap: 4, minHeight: 92, padding: '10px 12px', borderRadius: 12, boxSizing: 'border-box', textAlign: 'left', ...(no ? NO : pickIs === id ? { background: PALE, border: `2px solid ${G}` } : { background: '#ffffff', border: `1px solid ${LINE}` }) }}>
                    <strong style={{ fontSize: 14, lineHeight: '18px' }}>{title}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{no || text}</span>
                  </button>
                ))}
              </div>
              {lib && (
                <div data-library="" style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 8 }}>
                  <span style={{ fontSize: 13, color: MUT }}>An arrival game or a skill introduction that needs no goals: one child, one ball. In the library’s order.</span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {ALONE.map(x => <button key={x.name} data-drill={x.name} aria-pressed={d.name === x.name} onClick={() => { const s = stepsFor(x); put({ name: x.name, steps: s.steps, set_by: 'library', minutes: Math.min(x.minutes, maxMin || x.minutes) }); if (!s.written) setEditing(true) }} style={{ ...pick, flex: 'none', padding: '4px 12px', ...(d.name === x.name ? ON : OFF) }}>{x.name}</button>)}
                  </div>
                  <span style={{ display: 'flex', gap: 8 }}><More onClick={() => go('ADL1-DrillLibrary')}>Open the whole library</More></span>
                </div>
              )}
              {pickIs === 'film' && <span style={{ display: 'flex', gap: 8, paddingTop: 8 }}><More onClick={() => go('ACC8-AcademyRecord')}>Film it now</More></span>}
              <div style={{ display: 'grid', gridTemplateColumns: '200px minmax(0,1fr)', gap: 12, alignItems: 'start', paddingTop: 10 }}>
                <button aria-label={`Play the clip: ${d.name}`} onClick={() => demoToast(`The clip plays: ${d.name}.`)} style={{ ...plain, height: 128, borderRadius: 10, background: 'linear-gradient(135deg,#1c3a33,#40826d)', color: '#ffffff', padding: '8px 10px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <span style={{ alignSelf: 'center', marginTop: 22, width: 36, height: 36, borderRadius: 999, background: '#ffffff', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg></span>
                  <span style={{ fontSize: 12, fontWeight: 700, lineHeight: '15px' }}>{d.name}<br /><span style={{ fontWeight: 400 }}>{pickIs === 'film' ? 'your own film, when you have made it' : '0:38 · from the library'}</span></span>
                </button>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <strong data-name="" style={{ fontSize: 15, lineHeight: '20px' }}>{d.name}</strong>
                  <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{pickIs === 'pick' ? `Week ${p.week + 1} is ${lower(p.ladder_u13_term2.find(x => x.week === p.week + 1)?.theme.replace(' · ', ', ') ?? 'the next step')}. At home the count of two is the defender.` : d.set_by.includes('version') ? 'Your version. The library’s stays as it was.' : pickIs === 'library' ? 'From the drill library. Check the steps read well for a child on their own.' : 'Your own. Dani sees it when it goes.'}</span>
                  {d.steps.map(([head, sub], k) => editing ? (
                    <span key={k} style={{ display: 'grid', gridTemplateColumns: '18px minmax(0,1fr)', gap: 8, alignItems: 'center', borderTop: `1px solid ${HAIR}`, padding: '6px 0' }}>
                      <strong style={{ fontSize: 14 }}>{k + 1}</strong>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <input data-step-head={k} aria-label={`Step ${k + 1}, what to do`} value={head} onChange={e => put({ steps: d.steps.map((s, i) => i === k ? [e.target.value, s[1]] as Step : s) })} style={{ ...box, fontWeight: 700 }} />
                        <input data-step-sub={k} aria-label={`Step ${k + 1}, how`} value={sub} onChange={e => put({ steps: d.steps.map((s, i) => i === k ? [s[0], e.target.value] as Step : s) })} style={box} />
                      </span>
                    </span>
                  ) : (
                    <span key={k} style={{ display: 'flex', gap: 12, alignItems: 'baseline', minHeight: 46, borderTop: `1px solid ${HAIR}`, paddingTop: 5, boxSizing: 'border-box' }}>
                      <strong style={{ flex: 'none', width: 16, fontSize: 14 }}>{k + 1}</strong>
                      <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{head}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: '#33443f' }}>{sub}</span></span>
                    </span>
                  ))}
                  <span style={{ display: 'flex', gap: 8, paddingTop: 8, flexWrap: 'wrap' }}>
                    {editing ? (<>
                      <Primary onClick={() => { put({ set_by: d.set_by.includes('version') ? d.set_by : `${d.set_by === 'curriculum' ? 'curriculum' : d.set_by}, your version`, steps: d.steps.filter(s => s[0].trim()) }); setEditing(false); demoToast('Your version of the steps is kept as your own. The library’s stays as it was.') }}>Keep my version</Primary>
                      {d.steps.length < 6 && <More onClick={() => put({ steps: [...d.steps, ['', ''] as Step] })}>Add a step</More>}
                    </>) : <More onClick={() => setEditing(true)}>Edit the steps</More>}
                  </span>
                </span>
              </div>
            </section>

            <section aria-label="Who" style={T.tile}>
              <StepHead n={2} title="Who" sub="Everyone gets the same practice unless you say otherwise." />
              <Row label="Send to">
                <Opt id="team" label={`The whole team · ${ps.length}`} on={who.kind === 'team'} onTap={() => setWho({ kind: 'team' })} />
                <Opt id="step" label={`By step · the ${onStep.length} on step 1 or 2`} on={who.kind === 'step'} off={onStep.length ? undefined : 'nobody is'} onTap={() => setWho({ kind: 'step' })} />
                <Opt id="one" label="One player, from their goal" on={who.kind === 'one'} onTap={() => setWho({ kind: 'one', player: ps.find(x => x.goal)?.name ?? ps[0]?.name ?? '' })} />
              </Row>
              {who.kind === 'one' && (
                <label style={{ display: 'grid', gridTemplateColumns: '112px minmax(0,1fr)', gap: 8, alignItems: 'center', minHeight: 52 }}>
                  <strong style={{ fontSize: 13 }}>Which player</strong>
                  <select data-one="" value={who.player} onChange={e => setWho({ kind: 'one', player: e.target.value })} style={box}>
                    {ps.map(x => <option key={x.id} value={x.name}>{x.name}{x.goal ? ` · ${x.goal}` : ' · no goal yet'}</option>)}
                  </select>
                </label>
              )}
              <span data-who-line="" style={{ ...T.cap, paddingTop: 4 }}>
                {who.kind === 'one' ? `${one ? firstName(one) : 'This player'} gets this as well as the team’s practice, never in place of it. It reads “${foot} foot”.` : `Each player sees their own weaker foot: ${families - right} will read “left foot” and ${right} “right foot”.`}
                {trial.length ? ` ${trial.map(x => x.name.split(' ')[0]).join(' and ')} ${trial.length === 1 ? 'is' : 'are'} on trial, so ${trial.length === 1 ? (trial[0].she ? 'she is' : 'he is') : 'they are'} left out.` : ''}
                {quiet.length ? ` ${names(quiet)} still ${quiet.length === 1 ? 'gets' : 'get'} it, with no reminder, because ${quiet.length === 1 ? 'of three missed sessions in a row' : 'they have missed three sessions in a row'}.` : ''}
              </span>
            </section>

            <section aria-label="How much" style={T.tile}>
              <StepHead n={3} title="How much" sub={isOn ? `Dani’s limit for ${g.prog} is ${maxMin} minutes, ${timesWord(maxTimes)} a week.` : `Practice at home is off for ${g.prog}.`} />
              <Row label="Minutes">{MINUTES.map(m => <Opt key={m} id={`min-${m}`} label={String(m)} on={minutes === m} off={!isOn ? 'off' : m > maxMin ? 'over the limit' : undefined} onTap={() => put({ minutes: m })} />)}</Row>
              <Row label="Times this week">{TIMES.map((t, k) => <Opt key={t} id={`times-${k + 1}`} label={t} on={times === k + 1} off={!isOn ? 'off' : k + 1 > maxTimes ? 'over the limit' : undefined} onTap={() => put({ times: k + 1 })} />)}</Row>
              <Row label="They need">{NEEDS.map(x => <Opt key={x} label={x} on={d.needs === x} onTap={() => put({ needs: x })} />)}</Row>
              <Row label="Done by">{DONE_BY.map(x => <Opt key={x} label={x} on={(d.done_by ?? DONE_BY[0]) === x} onTap={() => put({ done_by: x })} />)}</Row>
            </section>

            <section aria-label="What comes back" style={T.tile}>
              <StepHead n={4} title="What comes back" sub="A tick always does. The rest is your choice." />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 8 }}>
                {BACK.map(([id, title, text]) => { const always = id === 'tick', no = id === 'video' && !videoOk, on = always || back.includes(id)
                  return (
                    <button key={id} data-back={id} role="checkbox" aria-checked={on} aria-disabled={always || no} disabled={no} onClick={() => { if (always) { demoToast('A tick is always on.'); return } put({ back: on ? back.filter(x => x !== id) : [...back, id] }) }}
                      style={{ ...plain, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '6px 12px', borderRadius: 12, boxSizing: 'border-box', textAlign: 'left', ...(no ? NO : on ? { background: PALE, border: `2px solid ${G}` } : { background: '#ffffff', border: `1px solid ${LINE}` }) }}>
                      <span style={{ flex: 'none', width: 20, height: 20, borderRadius: 999, boxSizing: 'border-box', border: `2px solid ${on ? G : '#8a9794'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <span style={{ width: 10, height: 10, borderRadius: 999, background: G }} />}</span>
                      <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '19px' }}>{title}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{no ? `Dani has video off for ${g.prog}.` : text(videos)}{id === 'video' && rule?.video_back === 'to parent only' ? ' It goes to the parent only.' : ''}</span></span>
                    </button>
                  ) })}
              </div>
            </section>

            <section aria-label="Your line" style={T.tile}>
              <StepHead n={5} title="Your line" sub="One sentence in your words. Families read this first." />
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input data-line="" aria-label="Your line" value={d.coach_line} placeholder="One sentence, in your words" onChange={e => put({ coach_line: e.target.value })} style={{ ...box, height: 48, flex: 1 }} />
                <button data-say="" aria-pressed={rec} onClick={() => { if (rec) { setRec(false); setSpoken(6); demoToast('Kept: a spoken line of 6 seconds. Families hear your voice over the clip.') } else { setRec(true); demoToast('Recording. Up to 20 seconds. Tap again to stop.') } }} style={{ ...plain, flex: 'none', height: 48, padding: '0 16px', borderRadius: 10, border: `1px solid ${rec ? G : LINE}`, background: rec ? PALE : '#ffffff', fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>{rec ? 'Recording · tap to stop' : 'Say it instead'}</button>
              </div>
              {spoken > 0 && <span data-spoken="" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 6, fontSize: 13, color: '#33443f' }}>A spoken line of {spoken} seconds goes with the clip.{d.coach_line ? ' The typed line goes too.' : ''}<More onClick={() => { setSpoken(0); demoToast('The spoken line is taken off.') }}>Take it off</More></span>}
            </section>

            <section aria-label="Always on, set by the academy" style={{ flex: 'none', borderRadius: 16, background: PALE, border: '1px solid #cfe3da', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <strong style={{ fontSize: 14 }}>Always on, set by the academy</strong>
              <span style={{ fontSize: 13, lineHeight: '19px', color: '#33443f' }}>“Sore or tired? Skip it.” is on every practice. No streaks and no table. One reminder on Wednesday, then none. Under 13, it goes to the parent’s app only.</span>
            </section>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <section aria-label="What they’ll see" style={{ ...T.tile, gap: 8, padding: '12px 14px' }}>
              <div style={T.between}><h2 style={T.h2}>What they’ll see</h2><span style={{ fontSize: 12, color: MUT }}>Changes as you do</span></div>
              <span role="radiogroup" aria-label="Whose screen" style={{ display: 'flex', gap: 6 }}>
                <Opt id="view-player" label="Player, 13 and over" on={view === 'player'} onTap={() => setView('player')} />
                <Opt id="view-parent" label="Parent" on={view === 'parent'} onTap={() => setView('parent')} />
              </span>
              <div data-phone={view} style={{ borderRadius: 22, border: `6px solid ${INK}`, background: '#ffffff', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#7a4b5b' }}>PRACTICE AT HOME · {minutes} MINUTES</span>
                <strong data-phone-name="" style={{ fontSize: 18, lineHeight: '22px' }}>{d.name}</strong>
                <span data-phone-sub="" style={{ fontSize: 12, color: '#33443f' }}>{view === 'parent' && example ? `For ${firstName(example)} · ` : ''}{Foot} foot · {timesWord(times)}{doneShort}</span>
                <span style={{ height: 88, borderRadius: 10, background: 'linear-gradient(135deg,#1c3a33,#40826d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 32, height: 32, borderRadius: 999, background: '#ffffff' }} /></span>
                {d.steps.map(([head, sub], k) => (
                  <span key={k} style={{ display: 'flex', gap: 10, borderTop: `1px solid ${HAIR}`, paddingTop: 6 }}>
                    <strong style={{ flex: 'none', width: 12, fontSize: 12 }}>{k + 1}</strong>
                    <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 12, lineHeight: '16px' }}>{mine(head)}</strong><span style={{ fontSize: 11, lineHeight: '15px', color: '#33443f' }}>{mine(sub)}</span></span>
                  </span>
                ))}
                {(d.coach_line || spoken > 0) && <span data-phone-line="" style={{ borderRadius: 10, background: MAUVE_PALE, padding: '8px 10px', fontSize: 12, lineHeight: '16px' }}><strong>Reece says:</strong> {d.coach_line ? `“${d.coach_line}”` : ''}{spoken > 0 ? `${d.coach_line ? ' ' : ''}A spoken line, ${spoken} seconds.` : ''}</span>}
                {back.includes('count') && <span style={{ fontSize: 11, color: '#33443f' }}>Then: how many did you get? {back.includes('felt') ? 'And how did it feel?' : ''}</span>}
                {back.includes('video') && <span style={{ fontSize: 11, color: '#33443f' }}>{view === 'parent' ? 'You can send Reece a video if you both want to.' : 'Send Reece a video if you want to.'}</span>}
                <span style={{ fontSize: 11, color: '#33443f' }}>Sore or tired? Skip it. Rest counts too.</span>
                <span style={{ display: 'flex', gap: 6 }}>
                  <span style={{ flex: 1, height: 40, borderRadius: 8, border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>Skip today</span>
                  <span style={{ flex: 1, height: 40, borderRadius: 8, background: G, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{view === 'parent' && example ? `${firstName(example)}’s done it` : 'Done it'}</span>
                </span>
              </div>
              <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>A picture of the family’s screen. Its buttons are theirs, not yours.{view === 'parent' ? ' Under 13, this is the only place it shows.' : ''}</span>
            </section>

            <section aria-label="Before it goes" style={{ ...T.tile, gap: 0, padding: '12px 14px' }}>
              <h2 style={{ ...T.h2, paddingBottom: 4 }}>Before it goes</h2>
              <span data-goes-to={families} style={pair}><span style={{ color: '#33443f' }}>Goes to</span><strong>{families} {families === 1 ? 'family' : 'families'}</strong></span>
              <span data-own={own} style={pair}><span style={{ color: '#33443f' }}>Player’s own app</span><strong>{own} aged 13 and over</strong></span>
              <span style={pair}><span style={{ color: '#33443f' }}>Parent’s app only</span><strong>{families - own} under 13</strong></span>
              <span style={pair}><span style={{ color: '#33443f' }}>Sends</span><strong>{rule?.sends ?? 'Monday 4 pm'}</strong></span>
              <span style={pair}><span style={{ color: '#33443f' }}>Reminder</span><strong style={{ textAlign: 'right' }}>Wednesday, once{quiet.length ? ` · none for ${names(quiet)}` : ''}</strong></span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 10 }}>
                <button data-send="monday" disabled={!!off} onClick={() => send('scheduled')} style={{ ...plain, height: 44, borderRadius: 10, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', ...(off ? { background: '#e9eae8', color: MUT, border: `1px solid ${LINE}`, cursor: 'default' } : { background: G, color: '#ffffff', border: `1px solid ${G}` }) }}>Send Monday 4 pm</button>
                <button data-send="now" disabled={!!off} onClick={() => send('sent')} style={{ ...plain, height: 44, borderRadius: 10, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: `1px solid ${LINE}`, ...(off ? { color: MUT, cursor: 'default' } : null) }}>Send it now</button>
                <button data-send="save" onClick={() => send('saved')} style={{ ...plain, height: 44, borderRadius: 10, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: `1px solid ${LINE}` }}>Save, don’t send</button>
              </div>
              <span style={{ ...T.cap, paddingTop: 8 }}>Do nothing and the curriculum’s pick still goes on Monday. Dani sees what you set.</span>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
