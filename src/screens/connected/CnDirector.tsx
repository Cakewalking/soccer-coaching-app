// The connected club: the director's screens.
// CN6 watch a session · CN7 coach load · CN12 club climate · CN20 sponsors ·
// CN21 pitches · CN22 language and access · CN23 how often we ask.
// Observations and coach load rows are never included in reports or exports.

import { useState, type ReactNode } from 'react'
import { Mark, Btn, Note, Switch, Ico, tile, h2, cap, label, G, INK, MUT, LINE, PALE } from '../capture/marks'
import { Page, col, FixRow } from '../capture/CaptureScreens'
import { setCn, addJob, underFive, HELD_BASE, TEAMS, type QuestionId } from './cnStore'
import type { CnProps } from './CnCoach'
import { savePdf } from '../saveFile'

const th = { fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7a4b5b', lineHeight: '15px' } as const
const row = (grid: string, i: number, extra?: object) => ({ display: 'grid', gridTemplateColumns: grid, alignItems: 'center', gap: 8, minHeight: 44, padding: '2px 8px', borderTop: i ? `1px solid ${LINE}` : undefined, fontSize: 14, ...extra } as const)
const Two = ({ a, b }: { a: ReactNode; b: ReactNode }) => <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>{a}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{b}</span></span>
const Pill = ({ children }: { children: ReactNode }) => <span style={{ justifySelf: 'start', height: 24, padding: '0 10px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#fff', color: INK, border: `1.5px solid ${INK}` }}>{children}</span>
const Line = ({ a, b, v }: { a: string; b: string; v: ReactNode }) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, minHeight: 50, borderTop: `1px solid ${LINE}` }}><Two a={a} b={b} /><strong style={{ fontSize: 14, whiteSpace: 'nowrap' }}>{v}</strong></div>
function Seg<T extends string | number>({ what, value, options, onPick }: { what: string; value: T; options: [T, string][]; onPick: (v: T) => void }) {
  return <div role="group" aria-label={what} style={{ display: 'grid', gridTemplateColumns: `repeat(${options.length},1fr)`, border: `1px solid ${LINE}`, borderRadius: 10, overflow: 'hidden' }}>{options.map(([v, l], i) => <button key={String(v)} aria-pressed={value === v} onClick={() => onPick(v)} style={{ height: 44, padding: '0 6px', border: 0, borderLeft: i ? `1px solid ${LINE}` : 0, background: value === v ? G : '#fff', color: value === v ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>{l}</button>)}</div>
}

// ── CN6 · watch a session. Only the director and that coach see it. ──────────
const SAW: [string, string][] = [['Every child on the ball', 'Short queues, lots of touches'], ['Short, clear instructions', 'Under 30 seconds before they play'], ['Praise that names what was good', '“Great turn, Ari”, not just “well done”'], ['Practice that looks like the game', 'Opponents, direction, a goal to score in'], ['Every child spoken to by name', 'At least once in the session']]
const LEVELS = ['Seen often', 'Sometimes', 'Not yet']
export function CN6Observation({ s, go, say }: CnProps) {
  const o = s.observation
  const area = { width: '100%', boxSizing: 'border-box', minHeight: 70, padding: '10px 12px', borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 14, lineHeight: '20px', color: INK } as const
  const agree = [o.marks[1] > 0, o.marks[3] > 0 && false].filter(Boolean).length   // Tom said instructions ran long; the director marked the same thing
  return (
    <Page id="CN6-Observation" title="Watch a session" sub={`Tom Albers · ${TEAMS.u9} · Tue 16 June, from the film`} go={go} cols="minmax(0,1fr) 348px"
      right={<><Btn big onClick={() => say('Saved. Tom can’t see it yet.')}>Save draft</Btn><Btn primary big aria-pressed={o.sent} onClick={() => { setCn({ observation: { ...o, sent: true } }); say('Sent to Tom. Only the two of you can see it.') }}>{o.sent ? 'Sent to Tom' : 'Send to Tom'}</Btn></>}>
      <div style={col}>
        <section aria-label="What you saw" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>What you saw</h2>
          {SAW.map(([a, b], i) => (
            <div key={a} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', alignItems: 'center', gap: 10, minHeight: 52, borderTop: `1px solid ${LINE}` }}>
              <Two a={a} b={b} />
              <Seg what={a} value={o.marks[i]} options={LEVELS.map((l, n) => [n, l] as [number, string])} onPick={v => { setCn({ observation: { ...o, marks: o.marks.map((m, n) => n === i ? v : m) } }); say(`${a}: ${LEVELS[v]}.`) }} />
            </div>
          ))}
        </section>
        <section aria-label="In your words" style={{ ...tile, padding: '12px 16px 14px', gap: 8 }}>
          <h2 style={h2}>In your words</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><label htmlFor="ob1" style={label}>One thing that is working</label><textarea id="ob1" value={o.working} onChange={e => setCn({ observation: { ...o, working: e.target.value } })} style={area} /></span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><label htmlFor="ob2" style={label}>One thing to try</label><textarea id="ob2" value={o.trying} onChange={e => setCn({ observation: { ...o, trying: e.target.value } })} style={area} /></span>
          </div>
        </section>
      </div>
      <div style={col}>
        <section aria-label="Tom’s own view" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Tom’s own view, written first</h2>
          <span style={{ fontSize: 14, lineHeight: '20px', paddingBottom: 8 }}>“The second drill dragged. I talked too long setting it up and lost a few of them.”</span>
          <Line a="You agree on" b={agree ? 'Instructions ran long' : 'Nothing yet'} v={`${agree} of 2`} />
        </section>
        <section aria-label="Before and after" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Before and after</h2>
          <Line a="Last watched" b="You suggested shorter queues" v="14 April" /><Line a="Since then" b="From the players’ three taps" v="Loved it: 71% to 83%" />
        </section>
        <Note title="Only you and Tom">An observation is never shown to parents, the committee or other coaches. Tom can reply, and can ask for one at any time.</Note>
        <Note title="Two a season">Each coach is watched at least twice, once from film and once in person.</Note>
      </div>
    </Page>
  )
}

// ── CN7 · coach load. For support, not a league table: no sorting, no ranking. ──
const LOAD: [string, string, number, number, number, string, string, string?][] = [
  ['Sam K', TEAMS.u12, 5, 2, 1, '76%', '2 June'], ['Tom Albers', TEAMS.u9, 3, 0, 0, '83%', '16 June'], ['Josh Kerr', `${TEAMS.u14} · U9 Mark`, 11, 14, 6, '58%', 'Not yet', 'Two teams, falling behind'],
  ['Ollie Grant', TEAMS.u16, 6, 3, 2, '70%', '9 May'], ['Chris Pham', TEAMS.u13, 4, 9, 4, '74%', 'Not yet', 'Messages piling up'], ['Marko Petrovic', TEAMS.seniors, 8, 1, 0, '—', '20 May'],
]
export function CN7CoachLoad({ s, go, say }: CnProps) {
  const grid = 'minmax(0,1.2fr) 80px 84px 70px 84px 88px 176px'
  return (
    <Page id="CN7-CoachLoad" title="Coach load" sub="Wattle Creek FC · this week · 14 coaches, 6 shown" go={go} cols="minmax(0,1fr) 348px" right={<><Btn big onClick={() => go('CN6-Observation')}>Watch a session</Btn><Btn big onClick={() => go('MSG4-DirectorMessages')}>Message all coaches</Btn></>}>
      <section aria-label="Who is carrying what" style={{ ...tile, gap: 0, padding: '12px 8px 10px' }}>
        <h2 style={{ ...h2, padding: '0 8px 6px' }}>Who is carrying what</h2>
        <div style={{ ...row(grid, 0), ...th, minHeight: 34 }}><span>Coach</span><span>Hours this week</span><span>Messages waiting</span><span>Jobs open</span><span>Players loved it</span><span>Last watched</span><span /></div>
        {LOAD.map((r, i) => <button key={r[0]} onClick={() => go('D3-Coaches')} style={{ ...row(grid, i + 1, { minHeight: 50, background: r[7] ? PALE : 'none', borderRadius: r[7] ? 8 : 0 }), width: '100%', border: 0, borderTop: `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}><Two a={r[0]} b={r[1]} /><strong>{r[2]} hrs</strong><span>{r[3]}</span><span>{r[4]}</span><span>{r[5]}</span><span>{r[6]}</span>{r[7] ? <Pill>{r[7]}</Pill> : <span style={{ fontSize: 13, color: MUT }}>Fine</span>}</button>)}
        <span style={{ ...cap, fontSize: 13, padding: '10px 8px 0' }}>Hours are time planning, on the pitch and in the app. Jobs open are things only that coach can do.</span>
      </section>
      <div style={col}>
        <section aria-label="Who needs a hand" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Who needs a hand</h2>
          <FixRow title="Josh has two teams and 11 hours this week" sub="An assistant for U9 Mark would halve it"><Btn primary onClick={() => go('D3-Coaches')}>Find an assistant</Btn></FixRow>
          <FixRow title="Chris has 9 messages waiting" sub="Most are about training times. A team manager could take them"><Btn aria-pressed={s.jobs.includes('ask-rob')} onClick={() => { addJob('ask-rob'); say('Message drafted to Rob Owusu, team manager.') }}>Ask Rob</Btn></FixRow>
        </section>
        <Note title="For support, not a league table">Coaches are not ranked. Each coach sees their own row, and sees it before you do.</Note>
        <Note title="Why it matters">Most of your coaches are volunteers. A club often finds out a coach is stretched only when they step down.</Note>
      </div>
    </Page>
  )
}

// ── CN12 · club climate. Survey answers carry no names; a total needs five answers. ──
const CLIMATE: [string, number, number, number, number, number, string][] = [
  [TEAMS.u9, 9, 12, 4.7, 2.6, 4.4, 'None'], [TEAMS.u12, 11, 16, 4.4, 3.4, 4.1, '1'], [TEAMS.u13, 7, 15, 4.1, 3.0, 3.2, '2'], [TEAMS.u14, 6, 14, 3.5, 2.9, 3.9, '4'], [TEAMS.u15, 10, 15, 4.6, 3.8, 4.5, 'None'], [TEAMS.u16, 4, 16, 4.2, 3.3, 4.0, '2'],
]
export function CN12ClubClimate({ s, go, say }: CnProps) {
  const grid = 'minmax(0,1.1fr) 110px 120px 110px 100px 110px'
  // The demo parent's answer adds one family to U12 Sam's count. It is stored with no name.
  const rows = CLIMATE.map(r => r[0] === TEAMS.u12 && s.pulse ? [r[0], r[1] + 1, ...r.slice(2)] as typeof r : r)
  // The team manager's sideline rating for Saturday moves U12 Sam's season figure.
  const side = (r: typeof CLIMATE[number]) => r[0] === TEAMS.u12 && s.sideline.sent ? Math.round(((r[5] * 7 + s.sideline.ours) / 8) * 10) / 10 : r[5]
  const families = 96 + (s.pulse ? 1 : 0)
  const tileS = (head: string, v: string, mark: ReactNode, sub: string) => <div style={{ ...tile, padding: '10px 14px', gap: 2 }}><span style={label}>{head}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><strong style={{ fontSize: 27, lineHeight: '34px', letterSpacing: '-0.03em' }}>{v}</strong>{mark}</span><span style={{ fontSize: 13, color: MUT }}>{sub}</span></div>
  return (
    <Page id="CN12-ClubClimate" title="Club climate" sub="Wattle Creek FC · term 2 · from the family survey, attendance and the sideline" go={go} cols="minmax(0,1fr) 348px" right={<><Btn big onClick={() => go('CN23-AskLimits')}>How often we ask</Btn><Btn big onClick={() => go('D6-BoardReport')}>Board report</Btn></>}>
      <div style={col}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10 }}>
          {tileS('Enjoying football', '4.3', <Mark kind="strong" />, `Out of 5 · ${families} of 210 families`)}{tileS('Feel informed', '3.1', <Mark kind="strong" />, 'Lowest in MiniRoos')}{tileS('Our sidelines', '4.0', <Mark kind="strong" />, `Team managers, ${52 + (s.sideline.sent ? 1 : 0)} games`)}{tileS('Families to check on', '9', <Mark kind="estimate" />, 'From what they do, not the survey')}
        </div>
        <section aria-label="By team" style={{ ...tile, gap: 0, padding: '12px 8px 10px' }}>
          <h2 style={{ ...h2, padding: '0 8px 6px' }}>By team</h2>
          <div style={{ ...row(grid, 0), ...th, minHeight: 22 }}><span>Team</span><span>Survey answers</span><span>Enjoying</span><span>Feel informed</span><span>Sideline</span><span>To check on</span></div>
          {rows.map((r, i) => <div key={r[0]} data-team={r[0]} style={row(grid, i + 1, { minHeight: 40 })}><strong>{r[0]}</strong><span>{r[1]} of {r[2]}</span><span>{underFive(r[1], r[3].toFixed(1))}</span><span>{underFive(r[1], r[4].toFixed(1))}</span><span>{side(r).toFixed(1)}</span><span>{r[6]}</span></div>)}
          <span style={{ ...cap, fontSize: 13, padding: '8px 8px 0' }}>A team’s survey numbers show once five families have answered.</span>
        </section>
      </div>
      <div style={col}>
        <section aria-label="Families to check in with" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Families to check in with</h2>
          <FixRow title={`Three ${TEAMS.u14} families`} sub="Missed 3 of the last 4 sessions. Check-ins have stopped"><Btn primary aria-pressed={s.jobs.includes('ask-josh')} onClick={() => { addJob('ask-josh'); say('Message drafted to Josh Kerr about three families.') }}>Ask Josh</Btn></FixRow>
          <FixRow title={`One ${TEAMS.u13} family`} sub="Term 3 fees a month late, no clips opened since May"><Btn aria-pressed={s.jobs.includes('call-family')} onClick={() => { addJob('call-family'); say(`Added to your jobs: call one ${TEAMS.u13} family.`) }}>Call them</Btn></FixRow>
        </section>
        <section aria-label="Sidelines" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Sidelines</h2>
          <FixRow title={`${TEAMS.u13}: 3.2, down from 4.0`} sub="“Shouting at the referee” noted in 4 of 7 games"><Btn onClick={() => go('PC2b-TellHelen')}>Tell Helen</Btn></FixRow>
        </section>
        <Note title="The survey has no names">You never see which family said what. “To check on” comes only from attendance, check-ins, fees and clips opened.</Note>
      </div>
    </Page>
  )
}

// ── CN20 · sponsors and fundraising. Sponsors get totals only. ───────────────
const SPONSORS: [string, string, number, string, number, string][] = [['Harbour Bakery', 'Clip pages · U12 to U16', 148, '3,920', 86, '1 March'], ['Ridgeline Physio', 'Injury and return-to-play pages', 61, '540', 44, '1 March'], ['Kestrel Sports', 'Weekly club message', 196, '2,210', 132, '15 August']]
export function CN20Sponsors({ s, go, say }: CnProps) {
  const [rules, setRules] = useState(false)
  const grid = 'minmax(0,1.3fr) 110px 110px 110px 120px 110px'
  const raise = (t: string, got: number, of: number, sub: string) => <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><strong style={{ fontSize: 15 }}>{t}</strong><span role="img" aria-label={`$${got} of $${of}`} style={{ height: 10, borderRadius: 999, background: '#e9eae8', position: 'relative' }}><span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(got / of) * 100}%`, borderRadius: 999, background: G }} /></span><span style={{ fontSize: 13, color: MUT }}>${got.toLocaleString('en-AU')} of ${of.toLocaleString('en-AU')} · {sub}</span></span>
  return (
    <Page id="CN20-Sponsors" title="Sponsors and fundraising" sub="Wattle Creek FC · this season" go={go} cols="minmax(0,1fr) 348px" right={<><Btn big onClick={() => say('Add a sponsor: name, logo, where it shows, and the renewal date.')}>Add a sponsor</Btn><Btn big onClick={() => go('D6-BoardReport')}>Board report</Btn></>}>
      <div style={col}>
        <section aria-label="What each sponsor got" style={{ ...tile, gap: 0, padding: '12px 8px 10px' }}>
          <h2 style={{ ...h2, padding: '0 8px 6px' }}>What each sponsor got</h2>
          <div style={{ ...row(grid, 0), ...th, minHeight: 22 }}><span>Sponsor</span><span>Families reached</span><span>Times seen</span><span>Taps</span><span>Renews</span><span /></div>
          {SPONSORS.map((r, i) => <div key={r[0]} style={row(grid, i + 1, { minHeight: 52 })}><Two a={r[0]} b={r[1]} /><span>{r[2]}</span><span>{r[3]}</span><span>{r[4]}</span><span>{r[5]}</span><Btn onClick={() => { savePdf(`${r[0].toLowerCase().replace(/[^a-z]+/g, '-')}-report.pdf`, `${r[0]}: sponsor report`, ['Wattle Creek FC, this season.', '', `Where it showed: ${r[1]}`, `Families reached: ${r[2]}`, `Times seen: ${r[3]}`, `Taps: ${r[4]}`, `Renews: ${r[5]}`, '', 'Families reached is how many families saw the sponsor at least once.', 'Totals only: no child’s name, face, film or numbers, and no family’s contact details.']); say(`${r[0]}: a one-page report is ready to send.`) }} aria-label={`Report for ${r[0]}`}>Report</Btn></div>)}
          <span style={{ ...cap, fontSize: 13, padding: '8px 8px 0' }}>Families reached is how many families saw the sponsor at least once.</span>
        </section>
        <section aria-label="Fundraising" style={{ ...tile, padding: '12px 16px 14px', gap: 10 }}><h2 style={h2}>Fundraising</h2><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>{raise('New goals for pitch 3', 2150, 3000, '41 families gave')}{raise('Fee help for six families', 1350, 3000, 'closes 30 June')}</div></section>
      </div>
      <div style={col}>
        <section aria-label="Coming up" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Coming up</h2>
          <FixRow title="Harbour Bakery renews on 1 March" sub="Send the report a month before"><Btn primary aria-pressed={s.jobs.includes('remind-bakery')} onClick={() => { addJob('remind-bakery'); say('Reminder set for 1 February.') }}>{s.jobs.includes('remind-bakery') ? 'Reminder set' : 'Remind me'}</Btn></FixRow>
          <FixRow title="A sponsor for MiniRoos" sub="No sponsor shows on under-12 pages yet"><Btn aria-expanded={rules} onClick={() => { setRules(r => !r); if (!rules) say('Choose which pages a sponsor may show on.') }}>{rules ? 'Done' : 'Set rules'}</Btn></FixRow>
          {rules && <div role="group" aria-label="Where a sponsor may show" style={{ borderTop: `1px solid ${LINE}`, padding: '6px 0 8px' }}>{Object.entries(s.sponsorPages).map(([k, on]) => <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 46 }}><span style={{ fontSize: 14 }}>{k}</span><span style={{ display: 'flex', alignItems: 'center' }}><Switch on={on} label={k} onChange={() => { setCn(c => ({ sponsorPages: { ...c.sponsorPages, [k]: !on } })); say(`${k}: sponsors ${on ? 'off' : 'on'}.`) }} /><strong style={{ fontSize: 13 }}>{on ? 'On' : 'Off'}</strong></span></div>)}</div>}
        </section>
        <Note title="What sponsors never get">No child’s name, face, film or numbers. No family’s contact details. They get totals only.</Note>
        <Note title="Where a sponsor shows">A line of text and a logo on pages you choose. Never inside a child’s report or a private message.</Note>
      </div>
    </Page>
  )
}

// ── CN21 · pitches. Move a slot and everyone it touches is told. ─────────────
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
const PLAN: [string, [string, string][]][] = [
  ['4:30', [[TEAMS.u9, 'Half pitch'], [TEAMS.u12, 'Full'], [TEAMS.u8, 'Half pitch'], [TEAMS.u12, 'Full']]],
  ['5:30', [[TEAMS.u11, 'Full'], [`${TEAMS.u13} + ${TEAMS.u14}`, 'Both booked'], [TEAMS.u10, 'Full'], [TEAMS.u13, 'Full']]],
  ['6:30', [[TEAMS.u15, 'Full'], [TEAMS.u16, 'Full'], ['Free', 'Lights until 8'], [TEAMS.u15, 'Full']]],
  ['7:30', [['Free', ''], [TEAMS.seniors, 'Full, lights'], ['Free', ''], [TEAMS.seniors, 'Full, lights']]],
]
export function CN21Pitches({ s, go, say }: CnProps) {
  const [pitch, setPitch] = useState(2)
  const [sel, setSel] = useState<string | null>(null)   // the slot being moved, as "time|day"
  // The two fixes on the right change the plan itself.
  const plan = PLAN.map(([t, cells]) => [t, cells.map((c, d) => {
    if (s.moved && t === '5:30' && d === 1) return [TEAMS.u13, 'Full'] as [string, string]
    if (s.moved && t === '6:30' && d === 2) return [TEAMS.u14, 'Full, lights'] as [string, string]
    if (s.offered && t === '7:30' && d === 0) return [TEAMS.u16, 'Offered, lights'] as [string, string]
    return c
  }).map((c, d) => s.pitch[`${t}|${d}`] ?? c)] as [string, [string, string][]])
  const used = plan.flatMap(p => p[1]).filter(c => c[0] !== 'Free').length
  const cell = (key: string): [string, string] => { const [t, d] = key.split('|'); return plan.find(p => p[0] === t)![1][Number(d)] }
  function tapSlot(t: string, d: number, team: string, note: string) {
    const key = `${t}|${d}`
    if (!sel) { if (team === 'Free') { say(`${DAYS[d]} ${t} is free. Tap a team first, then tap here to move it.`); return } setSel(key); say(`${team}: now tap a free slot to move it there, or another team to swap.`); return }
    if (sel === key) { setSel(null); say(`${team}: left where it is.`); return }
    const from = cell(sel), [ft, fd] = sel.split('|')
    setCn(c => ({ pitch: { ...c.pitch, [key]: from, [sel]: [team, note] } })); setSel(null)
    say(team === 'Free' ? `${from[0]} moved to ${DAYS[d]} ${t}. The coach and the families are told.` : `${from[0]} and ${team} swapped: ${DAYS[Number(fd)]} ${ft} and ${DAYS[d]} ${t}. Both coaches and the families are told.`)
  }
  return (
    <Page id="CN21-Pitches" title="Pitches" sub={`Wattle Creek Reserve · this week · pitch ${pitch}`} go={go} cols="minmax(0,1fr) 348px"
      right={<>{[1, 2, 3].filter(n => n !== pitch).map(n => <Btn key={n} big onClick={() => { setPitch(n); say(`Pitch ${n} this week.`) }}>Pitch {n}</Btn>)}<Btn primary big onClick={() => say('This week’s pitch plan sent to 14 coaches.')}>Tell coaches</Btn></>}>
      <section aria-label={`Pitch ${pitch} training`} style={{ ...tile, padding: '12px 14px', gap: 8 }}>
        <h2 style={h2}>Pitch {pitch} · training</h2>
        {pitch === 3 ? <span style={{ ...cap, padding: '24px 0' }}>Pitch 3 is closed this week for the new goals. Its teams have been told.</span> : <>
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(4,minmax(0,1fr))', gap: 6, ...th }}><span />{DAYS.map(d => <span key={d}>{d}</span>)}</div>
          {plan.map(([t, cells]) => (
            <div key={t} style={{ display: 'grid', gridTemplateColumns: '60px repeat(4,minmax(0,1fr))', gap: 6, alignItems: 'stretch' }}>
              <strong style={{ fontSize: 14, alignSelf: 'center' }}>{t}</strong>
              {cells.map(([team, note], d) => { const free = team === 'Free', clash = note === 'Both booked'; return (
                <button key={d} aria-pressed={sel === `${t}|${d}`} onClick={() => tapSlot(t, d, team, note)} aria-label={`${DAYS[d]} ${t}: ${team}${note ? `, ${note}` : ''}`} style={{ outline: sel === `${t}|${d}` ? `3px solid ${G}` : undefined, outlineOffset: 1, minHeight: 56, padding: '6px 10px', borderRadius: 10, textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: free ? '#fff' : PALE, color: INK, border: clash ? `2px solid ${INK}` : free ? `1.5px dashed ${MUT}` : `1px solid ${PALE}` }}>
                  <strong style={{ fontSize: 13, lineHeight: '17px', color: free ? MUT : INK }}>{pitch === 1 && !free ? team.replace(/^U(\d+)/, (_, n) => `U${n}`) : team}</strong><span style={{ fontSize: 12, color: MUT }}>{note}</span>
                </button>) })}
            </div>
          ))}
        </>}
        <span style={{ ...cap, fontSize: 13 }}>Saturday games come from the league’s fixtures and show on each team’s calendar.</span>
      </section>
      <div style={col}>
        <section aria-label="To sort" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>To sort</h2>
          {!s.moved && <FixRow title="Tuesday 5:30: two teams on pitch 2" sub={`${TEAMS.u14} could move to Wednesday 6:30`}><Btn primary onClick={() => { setCn({ moved: true }); say(`${TEAMS.u14} moved to Wednesday 6:30. Josh Kerr and the families are told.`) }}>Move U14</Btn></FixRow>}
          {!s.offered && <FixRow title={`${TEAMS.u16} want a second night`} sub="Monday 7:30 is free, with lights"><Btn onClick={() => { setCn({ offered: true }); say('Monday 7:30 offered to Ollie Grant.') }}>Offer it</Btn></FixRow>}
          {s.moved && s.offered && <div style={{ ...cap, fontSize: 13, borderTop: `1px solid ${LINE}`, padding: '12px 0' }}>Nothing left to sort this week.</div>}
        </section>
        <section aria-label="This week" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>This week</h2>
          <Line a="Slots used" b="" v={`${used} of 16`} /><Line a="Wet weather" b="Its teams are told automatically" v="Pitch 3 closed" />
        </section>
        <Note title="One change, everyone told">Move a slot and the coach, team manager and every family’s calendar change with it.</Note>
      </div>
    </Page>
  )
}

// ── CN22 · language and access ───────────────────────────────────────────────
const LANGS: [string, number, string][] = [['English', 158, ''], ['Vietnamese', 17, 'Linh Tran, parent'], ['Mandarin', 12, 'Not checked yet'], ['Arabic', 9, 'Hamza’s dad'], ['Greek', 6, 'Not checked yet'], ['8 others', 8, '']]
export function CN22LanguageAccess({ s, go, say }: CnProps) {
  const grid = 'minmax(0,1fr) 90px 150px 110px'
  const tick = (ok: boolean, a: string, b: string) => <div style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: `1px solid ${LINE}` }}><span aria-label={ok ? 'On' : 'Not set'} style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, boxSizing: 'border-box', background: ok ? G : '#fff', border: ok ? 0 : `2px solid ${INK}`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ok && <Ico d="M5 12l5 5 9-10" size={12} sw={3} />}</span><Two a={a} b={b} /></div>
  return (
    <Page id="CN22-LanguageAccess" title="Language and access" sub="Wattle Creek FC · 210 families" go={go} cols="minmax(0,1fr) 348px" right={<><Btn big onClick={() => say('One question goes to every family: which language do you read most easily?')}>Ask families their language</Btn><Btn primary big onClick={() => say('Saved.')}>Save</Btn></>}>
      <div style={col}>
        <section aria-label="Languages families read" style={{ ...tile, gap: 0, padding: '12px 8px 6px' }}>
          <h2 style={{ ...h2, padding: '0 8px 6px' }}>Languages families read</h2>
          <div style={{ ...row(grid, 0), ...th, minHeight: 22 }}><span>Language</span><span>Families</span><span>Checked by</span><span>Translate</span></div>
          {LANGS.map(([l, n, by], i) => { const on = s.translate[l]; return <div key={l} style={row(grid, i + 1)}><strong>{l}</strong><span>{n}</span><span style={{ fontSize: 13, color: MUT }}>{by}</span><span style={{ display: 'flex', alignItems: 'center', marginLeft: -6 }}><Switch on={on} label={`Translate ${l}`} onChange={() => { setCn(c => ({ translate: { ...c.translate, [l]: !on } })); say(`${l}: translation ${on ? 'off' : 'on'}.`) }} /><strong style={{ fontSize: 13 }}>{on ? 'On' : 'Off'}</strong></span></div> })}
        </section>
        <section aria-label="How a message looks" style={{ ...tile, padding: '12px 16px 14px', gap: 8 }}>
          <h2 style={h2}>How a message looks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <span style={{ borderRadius: 10, background: PALE, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}><span style={label}>You wrote</span><span style={{ fontSize: 14 }}>Training is cancelled tonight because of the heat.</span></span>
            <span style={{ borderRadius: 10, background: PALE, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}><span style={label}>A Vietnamese family reads</span><span lang="vi" style={{ fontSize: 14 }}>Buổi tập tối nay bị hủy vì trời nóng.</span></span>
          </div>
          <span style={{ ...cap, fontSize: 13 }}>Translated by machine. The English is always one tap away. Safeguarding and medical messages are sent in English as well.</span>
        </section>
      </div>
      <div style={col}>
        <section aria-label="All-abilities teams" style={{ ...tile, gap: 0, padding: '12px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>All-abilities teams</h2>
          {tick(true, 'Check-ins with pictures', 'Faces and symbols in place of words')}{tick(true, 'A support person on the account', 'Sees what a parent sees, for one player')}{tick(true, 'Numbers off', 'Clips and the coach’s words only')}{tick(false, 'Quiet sideline games', 'Not set for any team yet')}
        </section>
        <section aria-label="Reading and seeing" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Reading and seeing</h2>
          <Line a="Larger text" b="Their own setting" v="23 people" /><Line a="Read aloud" b="Reports and messages" v="6 people" />
        </section>
        <Note title="Ask a parent to check">A machine translation of a football word can be wrong. A parent who reads the language can fix it once for everyone.</Note>
      </div>
    </Page>
  )
}

// ── CN23 · how often we ask ──────────────────────────────────────────────────
const ASKS: [QuestionId, string, string, string, string][] = [
  ['felt', 'How hard did it feel?', 'Players', 'After each game', '78%'], ['today', 'How do you feel today?', 'Players 12 and over', 'Mornings, match week', '64%'], ['training', 'How was training?', 'Players', 'One session a week', '71%'],
  ['selfreview', 'How did you go?', 'Players', 'After each game', '56%'], ['elsewhere', 'What else did you do?', 'Players 12 and over', 'Sundays', '49%'], ['rategame', 'Rate the game', 'Parents', 'After each game', '38%'],
  ['pulse', 'Two quick questions', 'Parents', 'Once a term', '46%'], ['sideline', 'How was the sideline?', 'Team managers', 'After each game', '88%'], ['threetaps', 'Three taps after the game', 'Coaches', 'After each game', '91%'],
]
export function CN23AskLimits({ s, go, say }: CnProps) {
  const grid = 'minmax(0,1.2fr) 150px 170px 80px 110px'
  const held = HELD_BASE + s.held.length
  return (
    <Page id="CN23-AskLimits" title="How often we ask" sub="Wattle Creek FC · every question Clean Sheet puts to a person" go={go} cols="minmax(0,1fr) 348px" right={<><Btn big onClick={() => go('CN12-ClubClimate')}>Club climate</Btn><Btn primary big onClick={() => say('Saved. The limits apply from tomorrow.')}>Save</Btn></>}>
      <div style={col}>
      <section aria-label="Everything we ask" style={{ ...tile, gap: 0, padding: '10px 8px 4px' }}>
        <h2 style={{ ...h2, padding: '0 8px 2px' }}>Everything we ask</h2>
        <div style={{ ...row(grid, 0), ...th, minHeight: 22 }}><span>Question</span><span>Who</span><span>When</span><span>Answered</span><span /></div>
        {ASKS.map(([id, q, who, when, a], i) => { const on = s.questions[id]; return <div key={id} style={row(grid, i + 1, { minHeight: 44, padding: '0 8px' })}><strong>{q}</strong><span>{who}</span><span>{when}</span><span>{a}</span><span style={{ display: 'flex', alignItems: 'center', marginLeft: -6 }}><Switch on={on} label={q} onChange={() => { setCn(c => ({ questions: { ...c.questions, [id]: !on } })); say(`${q}: turned ${on ? 'off' : 'on'} for the whole club.`) }} /><strong style={{ fontSize: 13 }}>{on ? 'On' : 'Off'}</strong></span></div> })}
      </section>
        <Note title="Fewer questions, better answers">A few questions answered well are worth more than many answered badly. Turn off what you will not use.</Note>
      </div>
      <div style={col}>
        <section aria-label="The limits" style={{ ...tile, padding: '10px 16px 10px', gap: 5 }}>
          <h2 style={h2}>The limits</h2>
          <span style={label}>A player is asked at most</span><Seg what="A player is asked at most, in a day" value={s.perDay} options={[[1, '1 a day'], [2, '2 a day']]} onPick={v => { setCn({ perDay: v }); say(`A player is asked at most ${v} a day.`) }} />
          <span style={label}>And in a week</span><Seg what="A player, in a week" value={s.perWeek} options={[[3, '3'], [4, '4'], [5, '5']]} onPick={v => { setCn({ perWeek: v }); say(`A player is asked at most ${v} times a week.`) }} />
          <span style={label}>A parent, in a week</span><Seg what="A parent, in a week" value={s.parentWeek} options={[[1, '1'], [2, '2'], [3, '3']]} onPick={v => { setCn({ parentWeek: v }); say(`A parent is asked at most ${v} ${v === 1 ? 'time' : 'times'} a week.`) }} />
          <span style={{ ...cap, fontSize: 13 }}>When two questions fall due together, the one tied to a game goes first and the other waits.</span>
        </section>
        <section aria-label="This week" style={{ ...tile, gap: 0, padding: '10px 16px 2px' }}>
          <h2 style={{ ...h2, paddingBottom: 4 }}>This week</h2>
          <Line a="The average player was asked" b={`Limit is ${s.perWeek}`} v="2.4 times" /><Line a="Held back by the limit" b={s.held.length ? `Latest: “${s.held[s.held.length - 1]}”` : 'Mostly “What else did you do?”'} v={<span data-held>{held} asks</span>} /><Line a="Quiet hours" b="And all of exam weeks" v="8 pm to 7 am" />
        </section>
      </div>
    </Page>
  )
}
