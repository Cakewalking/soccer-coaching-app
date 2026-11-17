// Capture quality, QC1 to QC9: what today's recording will measure, the four
// quick checks, the live quality panel and the report afterwards.
// Copy is word for word from capture-quality-v1/source. Marks come from
// captureStore.measures(), never typed in here.

import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Mark, Src, Ico, IC, Btn, Note, Dot, Switch, tile, h2, cap, label, G, INK, MUT, LINE, PALE, DARK, GREY, changeWord, markFor, type MarkKind } from './marks'
import { useCapture, setCapture, measures, quality, chosen, choiceAllowed, freeShirts, CLUB_RULE, LINEUP, SQUAD, GROUND, type CapState, type ChoiceKey, type GuideKey, type Format, type Age } from './captureStore'

export type Go = (target: string) => void
export interface ScreenProps { s: CapState; go: Go; say: (m: string) => void; age: Age; team: string }

const GAME = 'Sat 6 June · v Harbour Rovers · Wattle Creek Reserve, pitch 2 · 9 v 9'
const src = (go: Go) => (n: number) => go(`QC10-HowWeMeasure#src${n}`)

/** True when the steps are shown on a phone: one column, no stepper. */
export const NarrowCtx = createContext(false)

// ── Page chrome ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 'QC1-CapturePlan', t: 'What you will get' },
  { id: 'QC3-PitchCheck', t: 'Pitch' },
  { id: 'QC4-SetUpGuide', t: 'Camera and vests' },
  { id: 'QC5-WhoIsWho', t: 'Who is who' },
  { id: 'QC6-TestResult', t: 'Test' },
]

function Stepper({ at, go }: { at: number; go: Go }) {
  return (
    <nav aria-label="Set-up steps" style={{ flex: 'none', padding: '10px 24px 0', display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 6 }}>
      {STEPS.map((st, i) => {
        const on = i === at, done = i < at
        return (
          <button key={st.id} onClick={() => go(st.id)} aria-current={on ? 'step' : undefined} style={{ height: 44, padding: '0 12px', borderRadius: 10, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', textAlign: 'left', background: on ? G : done ? '#fff' : 'transparent', color: on ? '#fff' : INK, border: `1px solid ${on ? G : LINE}` }}>
            <span style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, background: on ? '#fff' : done ? PALE : GREY, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{done ? <Ico d={IC.tick} size={12} sw={3} /> : i + 1}</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{st.t}</span>
          </button>
        )
      })}
    </nav>
  )
}

export function Page({ id, title, sub, right, step, go, cols, children, foot }: { id: string; title: string; sub: string; right?: ReactNode; step?: number; go: Go; cols: string; children: ReactNode; foot?: ReactNode }) {
  const narrow = useContext(NarrowCtx)
  if (narrow) { cols = 'minmax(0,1fr)'; step = undefined }
  return (
    <div data-screen={id} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: '100%', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{ flex: 'none', padding: narrow ? '12px 16px 0' : '14px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: narrow ? 8 : 14, flexWrap: narrow ? 'wrap' : undefined }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: narrow ? 4 : 14, flexWrap: 'wrap', minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</h1>
          <span style={cap}>{sub}</span>
        </div>
        {right && <div style={{ flex: 'none', display: 'flex', gap: 8, flexWrap: 'wrap' }}>{right}</div>}
      </div>
      {step !== undefined && <Stepper at={step} go={go} />}
      <main style={{ flexGrow: 1, minHeight: 0, padding: narrow ? '12px 16px 12px' : foot ? '12px 24px 0' : '12px 24px 18px', display: 'grid', gridTemplateColumns: cols, gap: 14, alignItems: 'start' }}>{children}</main>
      {foot && <div style={{ flex: 'none', marginTop: 'auto', padding: narrow ? '6px 16px 16px' : '10px 24px 16px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: narrow ? 'wrap' : undefined }}>{foot}</div>}
    </div>
  )
}
const footNote = (t: string) => <span style={{ ...cap, flex: '1 1 200px', fontSize: 13 }}>{t}</span>
export const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, minWidth: 0 }

export function FixRow({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, padding: '6px 0', borderTop: `1px solid ${LINE}` }}>
      <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontSize: 14, lineHeight: '19px' }}>{title}</strong>
        <span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{sub}</span>
      </span>
      {children}
    </div>
  )
}
function CheckRow({ ok, title, sub, onTap }: { ok: boolean; title: string; sub: string; onTap?: () => void }) {
  const inner = <>
    <Dot ok={ok} />
    <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0, textAlign: 'left' }}>
      <strong style={{ fontSize: 14, lineHeight: '19px', color: INK }}>{title}</strong>
      <span style={{ fontSize: 13, lineHeight: '18px', color: MUT, fontWeight: 400 }}>{sub}</span>
    </span>
  </>
  const st: CSSProperties = { display: 'flex', alignItems: 'flex-start', gap: 10, minHeight: 52, padding: '8px 0', width: '100%', boxSizing: 'border-box', borderWidth: '1px 0 0', borderStyle: 'solid', borderColor: LINE }
  return onTap
    ? <button onClick={onTap} aria-pressed={ok} style={{ ...st, background: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>{inner}</button>
    : <div style={st}>{inner}</div>
}
const names = (ps: { first: string }[]) => ps.length === 1 ? ps[0].first : `${ps.slice(0, -1).map(p => p.first).join(', ')} and ${ps[ps.length - 1].first}`

// ── QC1 · what today will measure ────────────────────────────────────────────

const SRC_ICON = { Film: IC.film, Vests: IC.vest, 'Boot sensors': IC.boot, 'Check-in': IC.chat, You: IC.pen }

export function QC1CapturePlan({ s, go, say, age }: ScreenProps) {
  const m = measures(s, age), q = quality(s, age)
  const [fine, setFine] = useState(false)
  const rows = [
    { m: m.events, t: 'Passes, shots, tackles, and where on the pitch', d: m.events.mark === 'not' ? 'The camera is off, or recording is turned off for today.' : m.events.mark === 'estimate' ? 'Counted from film. Too few pitch lines found, so where on the pitch is a best reading.' : 'Counted from film. Every one opens as a clip you can check.' },
    { m: m.distance, t: 'Distance, sprints and load', d: m.distance.mark === 'not' ? 'No vests are on today.' : `${q.vests} of ${SQUAD} players. ${q.flat.length} vests are flat${q.noVest.length ? ` and ${q.noVest.length} players have none` : ''}.` },
    { m: m.touches, t: 'Touches, and which foot', d: m.touches.mark === 'not' ? 'No boot sensors are on today.' : `${q.boots} of ${SQUAD} players have sensors on.` },
    { m: m.felt, t: 'How hard it felt, and how they feel tomorrow', d: m.felt.mark === 'not' ? 'Turned off for today.' : `Sent to all ${SQUAD} after the game. Takes a player ten seconds.` },
    { m: m.you, t: 'Your ratings, notes and match report', d: 'Always counted. Nothing else can record what you saw.' },
    { m: m.positions, t: 'Where each player stood, and the team’s shape', d: 'One camera. The far side of the pitch is less exact.' },
    { m: m.chances, t: 'Chances made and given up', d: m.chances.mark === 'not' ? 'Needs film, and chances turned on for this age.' : 'From where each shot was taken. Being tuned for this age group.' },
    { m: m.speed, t: 'Top speed', d: 'The faster the run, the less exact any tracker is.' },
    { m: m.speedNoVest, t: 'Speed and distance for players with no vest', d: 'We do not work these out from one camera.' },
  ]
  const reminded = s.reminders.includes('charge')
  const fixes = [
    q.flat.length > 0 && s.guide.vestsOn && <FixRow key="flat" title={`Charge ${q.flat.length} vests`} sub={`${names(q.flat)} get distance and load`}><Btn aria-pressed={reminded} onClick={() => { setCapture(c => ({ reminders: [...new Set([...c.reminders, 'charge'])] })); say(`We’ll remind you on Friday at 6 pm to charge ${q.flat.length} vests.`) }}>{reminded ? 'Reminder set' : 'Remind me'}</Btn></FixRow>,
    q.noVest.length > 0 && s.guide.vestsOn && <FixRow key="spare" title={`${q.noVest.length} players have no vest`} sub={`${names([...q.noVest].reverse())}. There are 2 spares in the bag`}><Btn onClick={() => { setCapture({ spares: true }); go('QC5-WhoIsWho') }}>Give spares</Btn></FixRow>,
    !s.guide.vestsOn && <FixRow key="von" title="The vests are off" sub="Turn them on outside, 10 minutes before"><Btn onClick={() => go('QC4-SetUpGuide')}>See set-up</Btn></FixRow>,
    !fine && q.boots > 0 && q.noBoots.length > 0 && <FixRow key="boots" title={`${q.noBoots.length} players have no boot sensor`} sub="They still get everything from film"><Btn onClick={() => { setFine(true); say('Left as it is. Touches come from film for those four.') }}>Fine</Btn></FixRow>,
    q.cornersFound < 4 && s.camera && <FixRow key="pitch" title={`We found ${q.cornersFound} of 4 corners`} sub="Tap the missing one and where things happened gets more exact"><Btn onClick={() => go('QC3-PitchCheck')}>Check pitch</Btn></FixRow>,
  ].filter(Boolean).slice(0, 3)
  return (
    <Page id="QC1-CapturePlan" title="What today will measure" sub={GAME} go={go} step={0} cols="minmax(0,1fr) 348px"
      right={<Btn big onClick={() => go('QC2-CaptureChoices')}>Choose what to capture</Btn>}
      foot={<><Btn onClick={() => go('REC1-RecordHub')}>Back</Btn>{footNote('Four quick checks before kick-off. Skip any of them and we mark what it costs.')}<Btn primary onClick={() => go('QC3-PitchCheck')}>Start set-up · 2 minutes</Btn></>}>
      <section aria-label="What today will measure" style={{ ...tile, gap: 0, padding: '12px 18px 6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6 }}>
          <h2 style={h2}>With the kit you have today</h2>
          <span style={{ display: 'flex', gap: 6 }}><Mark kind="strong" /><Mark kind="estimate" /><Mark kind="not" /></span>
        </div>
        {rows.map((r, i) => (
          <div key={r.t} data-measure={r.m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 46, padding: '2px 0', borderBottom: i < rows.length - 1 ? `1px solid ${LINE}` : undefined }}>
            <span style={{ flex: 'none', width: 112, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#2d3d3a' }}>
              <span style={{ flex: 'none', width: 28, height: 28, borderRadius: 8, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={SRC_ICON[r.m.source]} /></span>{r.m.source}
            </span>
            <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>{r.t}</strong>
              <span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{r.d}</span>
            </span>
            <Mark kind={r.m.mark} label={r.m.label} />
          </div>
        ))}
      </section>
      <div style={col}>
        <section aria-label="Fix now to get more" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Fix now to get more</h2>
          {fixes.length ? fixes : <div style={{ ...cap, fontSize: 13, borderTop: `1px solid ${LINE}`, padding: '12px 0' }}>Nothing left to fix. This is as much as today’s kit can give.</div>}
        </section>
        <Note title="Why some numbers say “Estimate”">Every tracking system gets less exact as players run faster <Src n={2} onOpen={src(go)} />, and positions from a single camera are hard to get exactly right <Src n={9} onOpen={src(go)} />. We mark those numbers so you know how much to lean on them.</Note>
        <button onClick={() => go('QC10-HowWeMeasure')} style={{ alignSelf: 'flex-start', minHeight: 44, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: G, background: 'none', border: 0, padding: 0, textDecoration: 'underline', cursor: 'pointer' }}>How we measure, and what we don’t <Ico d={IC.arrow} size={14} sw={2.4} /></button>
      </div>
    </Page>
  )
}

// ── QC1e · no camera or vests ────────────────────────────────────────────────

export function ListRow({ ok, title, sub }: { ok: boolean; title: string; sub: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderTop: `1px solid ${LINE}` }}>
      <Dot ok={ok} />
      <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '19px' }}>{title}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{sub}</span></span>
    </div>
  )
}
export function QC1eCapturePlanNoKit({ go }: ScreenProps) {
  return (
    <Page id="QC1e-CapturePlanNoKit" title="What today will measure" sub={GAME} go={go} cols="minmax(0,1fr) 348px" right={<Btn big onClick={() => go('SET4-Devices')}>Devices</Btn>}>
      <section aria-label="No kit today" style={{ ...tile, alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12, padding: '48px 24px', minHeight: 520, alignSelf: 'stretch' }}>
        <span style={{ width: 72, height: 72, borderRadius: 999, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={IC.hand} size={32} /></span>
        <strong style={{ fontSize: 22, lineHeight: '28px', letterSpacing: '-0.01em' }}>No camera or vests today. That is fine.</strong>
        <span style={{ fontSize: 15, lineHeight: '22px', color: MUT, maxWidth: 460 }}>Three taps after the game is enough. You will still get a review, Tuesday’s session and a note for every player. They come from what you and the players tell us.</span>
        <Btn primary onClick={() => go('YT1-YourTake')}>Record without kit</Btn>
      </section>
      <div style={col}>
        <section aria-label="What you still get" style={{ ...tile, gap: 0, padding: '12px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>What you still get</h2>
          <ListRow ok title="Score, minutes and who played where" sub="From your team sheet" />
          <ListRow ok title="Your ratings and match report" sub="Three taps, or as much as you like" />
          <ListRow ok title="How hard it felt" sub="Each player answers one question" />
        </section>
        <section aria-label="What needs kit" style={{ ...tile, gap: 0, padding: '12px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>What needs kit</h2>
          <ListRow ok={false} title="Clips, passes and where things happened" sub="Needs a camera. A phone on a tripod works" />
          <ListRow ok={false} title="Distance, sprints and load" sub="Needs vests" />
        </section>
        <Note title="Your view counts as data">Coaches remember about six in ten key moments of a game <Src n={4} onOpen={src(go)} />, so film helps. But what players say about how they feel tracks training load more consistently than common tests such as heart rate and blood markers <Src n={5} onOpen={src(go)} />.</Note>
      </div>
    </Page>
  )
}

// ── QC2 · choose what to capture ─────────────────────────────────────────────

const CHOICES: { head: string; rows: { k: ChoiceKey; t: string; d: string }[] }[] = [
  { head: 'From film', rows: [
    { k: 'record', t: 'Record the game', d: 'Needed for clips, passes and shape' },
    { k: 'clipEach', t: 'Cut a clip for each player', d: 'Their best moment and one to work on' },
    { k: 'shareClips', t: 'Share clips with families', d: 'You approve each clip first' },
  ] },
  { head: 'From boot sensors', rows: [
    { k: 'touches', t: 'Touches', d: 'How often each player is on the ball' },
    { k: 'foot', t: 'Which foot', d: 'Left and right, for each player' },
  ] },
  { head: 'From vests', rows: [
    { k: 'distance', t: 'Distance and load', d: 'To watch for a sudden jump in work' },
    { k: 'sprints', t: 'Sprint numbers', d: 'Each player sees their own. No ranking' },
    { k: 'rank', t: 'Rank players by speed or distance', d: 'Off for every team under 12' },
  ] },
  { head: 'From people', rows: [
    { k: 'felt', t: 'How hard it felt', d: 'One question to each player after the game' },
    { k: 'parentRatings', t: 'Parents’ ratings', d: 'Only you and that parent see them' },
  ] },
]

export function QC2CaptureChoices({ s, go, say, age, team }: ScreenProps) {
  const group = (g: typeof CHOICES[number]) => (
    <section key={g.head} aria-label={g.head} style={{ ...tile, gap: 0, padding: '10px 16px 2px' }}>
      <span style={{ ...label, paddingBottom: 6 }}>{g.head}</span>
      {g.rows.map(r => {
        const allowed = choiceAllowed(s, r.k, age), locked = CLUB_RULE.includes(r.k) || !allowed, on = chosen(s, r.k, age)
        return (
          <div key={r.k} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, padding: '4px 0', borderTop: `1px solid ${LINE}` }}>
            <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 14, lineHeight: '19px' }}>{r.t}</strong>
              <span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{r.d}</span>
            </span>
            {locked && <span style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: MUT }}><Ico d={IC.lock} size={14} />Club rule</span>}
            <Switch on={on} locked={locked} label={r.t} onChange={() => { setCapture(c => ({ choices: { ...c.choices, [r.k]: !on } })); say(`${r.t}: turned ${on ? 'off' : 'on'} for this recording.`) }} />
          </div>
        )
      })}
    </section>
  )
  return (
    <Page id="QC2-CaptureChoices" title="Choose what to capture" sub={GAME} go={go} cols="minmax(0,1fr) minmax(0,1fr) 320px"
      right={<Btn big onClick={() => { setCapture(c => ({ choices: { ...c.choices, record: true, clipEach: true, shareClips: true, touches: true, foot: true, distance: true, sprints: true, rank: false, felt: true, parentRatings: true } })); say('Back to the club’s settings for under-12s.') }}>Use the club’s settings</Btn>}
      foot={<><Btn onClick={() => go('QC1-CapturePlan')}>Back</Btn>{footNote(`Your choices are saved for ${team} until you change them.`)}<Btn primary onClick={() => go('QC1-CapturePlan')}>Save</Btn></>}>
      <div style={col}>{group(CHOICES[0])}{group(CHOICES[1])}</div>
      <div style={col}>{group(CHOICES[2])}{group(CHOICES[3])}</div>
      <div style={col}>
        <section aria-label="Left out today" style={{ ...tile, gap: 0, padding: '12px 16px 8px' }}>
          <h2 style={h2}>Left out today</h2>
          <span style={{ ...cap, fontSize: 13, padding: '4px 0 8px' }}>From the consent each family gave. They play as normal.</span>
          <ListRow ok={false} title="Kofi Mensah" sub="No consent to film. No clips, and his film numbers are not kept" />
          <ListRow ok={false} title="Lucy Vale" sub="Film yes, sharing no. Her clips stay with you" />
          <button onClick={() => go('P1-Consent')} style={{ alignSelf: 'flex-start', minHeight: 44, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: G, background: 'none', border: 0, padding: 0, textDecoration: 'underline', cursor: 'pointer' }}>Consent and privacy</button>
        </section>
        <Note title="Capture less, trust it more">Turn off anything you will not use. Fewer numbers, read properly, help a coach more than a full dashboard.</Note>
        <Note title="Who set the locked ones">Rachel M, director of football, set the club rules. You can turn things off for your team. Only she can turn a locked one on.</Note>
      </div>
    </Page>
  )
}

// ── QC3 · check the pitch ────────────────────────────────────────────────────

// far left, far right, near left, near right (camera side is the bottom edge)
const CORNER_XY: [number, number][] = [[30, 26], [530, 26], [30, 346], [530, 346]]
const CORNER_NAME = ['far left', 'far right', 'near left', 'near right']
const FORMAT_SIZE: Record<Format, [number, number]> = { '7 v 7': [50, 35], '9 v 9': [67, 46], '11 v 11': [100, 64] }

function Stepper2({ what, value, onStep }: { what: string; value: number; onStep: (d: number) => void }) {
  const b: CSSProperties = { width: 44, height: 44, border: 0, background: 'none', color: INK, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
      <span style={label}>{what}</span>
      <div style={{ display: 'flex', alignItems: 'center', height: 46, borderRadius: 10, border: `1px solid ${LINE}`, background: '#fff', boxSizing: 'border-box' }}>
        <button style={b} aria-label={`${what}: one metre less`} onClick={() => onStep(-1)}><Ico d={IC.minus} size={16} sw={2.6} /></button>
        <strong style={{ flexGrow: 1, textAlign: 'center', fontSize: 17, fontVariantNumeric: 'tabular-nums' }}>{value} m</strong>
        <button style={b} aria-label={`${what}: one metre more`} onClick={() => onStep(1)}><Ico d={IC.plus} size={16} sw={2.6} /></button>
      </div>
    </div>
  )
}

export function QC3PitchCheck({ s, go, say }: ScreenProps) {
  const found = s.corners.filter(Boolean).length
  const saved = s.grounds[GROUND]
  const tap = (i: number) => setCapture(c => { const corners = [...c.corners] as CapState['corners']; corners[i] = !corners[i]; return { corners } })
  const dash = { strokeDasharray: '7 7', opacity: 0.75 }
  const missing = s.corners.map((ok, i) => ok ? -1 : i).filter(i => i >= 0)
  const done = () => { setCapture(c => ({ pitchDone: true, grounds: { ...c.grounds, [GROUND]: { length: c.length, width: c.width, format: c.format, checked: 'today', used: (c.grounds[GROUND]?.used ?? 0) + 1 } } })); go('QC4-SetUpGuide') }
  return (
    <Page id="QC3-PitchCheck" title="Check the pitch" sub={GAME} go={go} step={1} cols="596px minmax(0,1fr)"
      foot={<><Btn onClick={() => go('QC1-CapturePlan')}>Back</Btn>{footNote('Skip this and where things happened is marked “Estimate” for the whole game.')}<Btn primary onClick={done}>Looks right</Btn></>}>
      <section aria-label="The pitch we found" style={{ ...tile, padding: '14px 18px', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={h2}>We found {found} of 4 corners</h2>
          {found === 4 ? <Mark kind="strong" label="All found" /> : <Mark kind="estimate" label={found === 3 ? 'Nearly there' : 'Not enough yet'} />}
        </div>
        <svg viewBox="0 0 560 372" role="img" aria-label={`The pitch as the camera sees it from above. ${found} of 4 corners found.${missing.length ? ` Not found: ${missing.map(i => CORNER_NAME[i]).join(', ')}.` : ''}`} style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 14, background: G }}>
          <g stroke="#fff" strokeWidth="3" fill="none">
            <rect x="30" y="26" width="500" height="320" />
            <path d="M280 26v320" /><circle cx="280" cy="186" r="44" />
            <rect x="30" y="108" width="74" height="156" {...(s.corners[0] || s.corners[2] ? {} : dash)} />
            <rect x="456" y="108" width="74" height="156" {...(s.corners[1] && s.corners[3] ? {} : dash)} />
            <rect x="30" y="152" width="26" height="68" />
          </g>
          {CORNER_XY.map(([x, y], i) => {
            if (s.corners[i]) return null
            const dx = x < 280 ? 120 : -120, dy = y < 186 ? 70 : -70
            return <g key={`m${i}`}><path d={`M${x + dx} ${y}H${x}V${y + dy}`} stroke={G} strokeWidth="5" fill="none" /><path d={`M${x + dx} ${y}H${x}V${y + dy}`} stroke="#fff" strokeWidth="3" fill="none" {...dash} /></g>
          })}
          {CORNER_XY.map(([x, y], i) => s.corners[i]
            ? <g key={i}><circle cx={x} cy={y} r="15" fill="#fff" /><path d={`M${x - 6} ${y}l4 4 8-9`} stroke={G} strokeWidth="3" fill="none" /></g>
            : <g key={i}><circle cx={x} cy={y} r="22" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="5 5" /><circle cx={x} cy={y} r="6" fill="#fff" />
                <rect x={x < 280 ? x + 32 : x - 150} y={y < 186 ? y - 13 : y - 13} width="118" height="26" rx="13" fill="#fff" />
                <text x={x < 280 ? x + 91 : x - 91} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Tap this corner</text></g>)}
          <text x="280" y="366" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dcefe8">Camera side</text>
          {/* tap targets, 44px or more on screen */}
          {CORNER_XY.map(([x, y], i) => <rect key={`t${i}`} x={x - 40} y={y - 40} width="80" height="80" fill="transparent" style={{ cursor: 'pointer' }} role="button" tabIndex={0} aria-label={s.corners[i] ? `The ${CORNER_NAME[i]} corner: found. Tap if we have it wrong` : `Tap the ${CORNER_NAME[i]} corner`} onClick={() => tap(i)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(i) } }} />)}
        </svg>
        <span style={{ ...cap, fontSize: 13 }}>{found === 4 ? 'Every line is one we can see. A position on film is now a position in metres.' : 'Solid lines are the ones we can see. The dashed corner is worn away or out of the frame. Tap where it is and we fill in the rest.'}</span>
      </section>
      <div style={col}>
        <section aria-label="Format and size" style={{ ...tile, padding: '12px 16px', gap: 10 }}>
          <h2 style={h2}>Format and size</h2>
          <div role="group" aria-label="Format" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: `1px solid ${LINE}`, borderRadius: 10, overflow: 'hidden' }}>
            {(Object.keys(FORMAT_SIZE) as Format[]).map((f, i) => (
              <button key={f} aria-pressed={s.format === f} onClick={() => { setCapture({ format: f, length: FORMAT_SIZE[f][0], width: FORMAT_SIZE[f][1] }); say(`${f}. The pitch plan is redrawn.`) }} style={{ height: 46, border: 0, borderLeft: i ? `1px solid ${LINE}` : 0, background: s.format === f ? G : '#fff', color: s.format === f ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{f}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Stepper2 what="Length" value={s.length} onStep={d => setCapture(c => ({ length: Math.max(20, Math.min(120, c.length + d)) }))} />
            <Stepper2 what="Width" value={s.width} onStep={d => setCapture(c => ({ width: Math.max(15, Math.min(90, c.width + d)) }))} />
          </div>
          <span style={{ ...cap, fontSize: 13 }}>Our best reading from the lines. If you have paced it out, your number wins.</span>
          {saved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${LINE}`, paddingTop: 8 }}>
              <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 14, lineHeight: '19px' }}>Saved: {GROUND}</strong>
                <span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>Checked {saved.checked} · {saved.length} × {saved.width} m · used {saved.used} times</span>
              </span>
              <Btn big onClick={() => { setCapture({ format: saved.format, length: saved.length, width: saved.width }); say(`${GROUND}: saved size used. ${saved.length} by ${saved.width} metres.`) }}>Use saved</Btn>
            </div>
          )}
        </section>
        <Note title="Why we ask">Pitches are not one size, and the size changes how far players run and how hard a game is <Src n={8} onOpen={src(go)} />. The goals and the penalty box are our ruler. With them, a position on film becomes a position in metres.</Note>
        <Note title="At an away ground">You do this once per ground. It takes about 30 seconds and is saved for the club.</Note>
      </div>
    </Page>
  )
}

// ── QC4 · camera and vests ───────────────────────────────────────────────────

export function QC4SetUpGuide({ s, go }: ScreenProps) {
  const q = quality(s)
  const tap = (k: GuideKey) => () => setCapture(c => ({ guide: { ...c.guide, [k]: !c.guide[k] } }))
  const g = s.guide
  return (
    <Page id="QC4-SetUpGuide" title="Set up the camera and vests" sub={GAME} go={go} step={2} cols="516px minmax(0,1fr) 296px"
      foot={<><Btn onClick={() => go('QC3-PitchCheck')}>Back</Btn>{footNote('Tap a line to mark it done. Anything left open is shown in the quality report.')}<Btn primary onClick={() => go('QC5-WhoIsWho')}>Next: who is who</Btn></>}>
      <section aria-label="Where the camera goes" style={{ ...tile, padding: '14px 18px', gap: 10 }}>
        <h2 style={h2}>Where the camera goes</h2>
        <svg viewBox="0 0 480 392" role="img" aria-label="Where to put the camera: on the halfway line, a few steps back from the touchline, as high as the tripod goes, with the sun behind it and both near corners in the frame." style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 14, background: '#eef3f0' }}>
          <path d="M240 322L38 260L38 22L442 22L442 260Z" fill={PALE} stroke={G} strokeWidth="2" strokeDasharray="6 6" />
          <rect x="60" y="30" width="360" height="230" rx="2" fill={G} />
          <g stroke="#fff" strokeWidth="2.5" fill="none"><rect x="60" y="30" width="360" height="230" /><path d="M240 30v230" /><circle cx="240" cy="145" r="30" /><rect x="60" y="95" width="46" height="100" /><rect x="374" y="95" width="46" height="100" /></g>
          <circle cx="60" cy="260" r="9" fill="#fff" stroke={G} strokeWidth="3" /><circle cx="420" cy="260" r="9" fill="#fff" stroke={G} strokeWidth="3" />
          <rect x="223" y="310" width="34" height="24" rx="6" fill={INK} /><circle cx="240" cy="322" r="6" fill="#fff" />
          <text x="240" y="354" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Camera: on halfway, 3 m up or higher</text>
          <text x="76" y="248" textAnchor="start" fontSize="12" fontWeight="700" fill="#fff">Near corner in frame</text>
          <text x="404" y="248" textAnchor="end" fontSize="12" fontWeight="700" fill="#fff">Near corner in frame</text>
          <circle cx="440" cy="358" r="11" fill="none" stroke={INK} strokeWidth="2.5" /><path d="M440 338v6M440 372v6M420 358h6M454 358h6" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          <text x="422" y="384" textAnchor="end" fontSize="12" fontWeight="700" fill={INK}>Sun behind the camera</text>
        </svg>
        <span style={{ ...cap, fontSize: 13 }}>Height matters most. Players hiding behind each other is a main reason tracking goes wrong <Src n={9} onOpen={src(go)} />, and a higher camera sees over them.</span>
      </section>
      <section aria-label="Camera" style={{ ...tile, gap: 0, padding: '12px 16px 6px', alignSelf: 'stretch' }}>
        <h2 style={{ ...h2, paddingBottom: 6 }}>Camera</h2>
        <CheckRow ok={g.halfway} onTap={tap('halfway')} title="On the halfway line" sub="A few steps back from the touchline" />
        <CheckRow ok={g.high} onTap={tap('high')} title="As high as the tripod goes" sub="3 metres or more" />
        <CheckRow ok={g.corners} onTap={tap('corners')} title="Both near corners in the frame" sub="If it follows the ball, check it at kick-off" />
        <CheckRow ok={g.sun} onTap={tap('sun')} title="Sun behind you" sub={g.sun ? 'Marked. Shirt numbers stay readable' : 'Not marked yet. Glare washes out shirt numbers'} />
        <CheckRow ok={g.battery} onTap={tap('battery')} title="Battery and space" sub="71% and room for 3 games" />
      </section>
      <div style={col}>
        <section aria-label="Vests and boot sensors" style={{ ...tile, gap: 0, padding: '12px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Vests and boot sensors</h2>
          <CheckRow ok={g.vestsOn} onTap={tap('vestsOn')} title={g.vestsOn ? `${q.vestsWorn} vests charged and on` : 'Vests are off'} sub={g.vestsOn ? 'Turn them on outside, 10 minutes before' : 'Tap when they are on. No vests, no distance or load'} />
          <CheckRow ok={false} title="3 vests flat" sub="Finn, Isla and Ben play without" />
          <CheckRow ok={g.bootsOn} onTap={tap('bootsOn')} title={g.bootsOn ? '12 boot sensors on' : 'Boot sensors are off'} sub={g.bootsOn ? 'Fitted as the maker shows' : 'Tap when they are on. Touches then come from film'} />
        </section>
        <Note title="Why 10 minutes early">A vest needs a few minutes outside to find its satellites. Even then, vests are best at total distance and weakest at short, fast bursts <Src n={1} onOpen={src(go)} />.</Note>
      </div>
    </Page>
  )
}

// ── QC5 · who is who ─────────────────────────────────────────────────────────

const yes = (t: string) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700 }}><Ico d={IC.tick} size={12} sw={3} />{t}</span>
const no = (t: string) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: MUT }}><Ico d={IC.minus} size={12} sw={3} />{t}</span>

export function QC5WhoIsWho({ s, go, say }: ScreenProps) {
  const [picking, setPicking] = useState(false)
  const clash = s.finnShirt === 7
  const free = freeShirts(s)
  const grid = '42px minmax(0,1fr) 62px 104px 86px 64px'
  return (
    <Page id="QC5-WhoIsWho" title="Confirm who is who" sub={GAME} go={go} step={3} cols="minmax(0,1fr) 348px"
      right={<Btn big onClick={() => go('FB1-Formation')}>From Saturday’s line-up</Btn>}
      foot={<><Btn onClick={() => go('QC4-SetUpGuide')}>Back</Btn>{footNote(clash ? 'One shirt clash to sort. You can confirm anyway and fix names after the game.' : 'Every shirt number is one player. Vest assignment is what we trust.')}<Btn primary onClick={() => { setCapture({ whoDone: true }); go('QC6-TestResult') }}>Confirm {SQUAD} players</Btn></>}>
      <section aria-label="Players" style={{ ...tile, gap: 0, padding: '8px 18px 4px', overflowX: 'auto' }}>
        <div style={{ minWidth: 500, display: 'grid', gridTemplateColumns: grid, alignItems: 'center', height: 26, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, marginBottom: -2 }}>
          <span /><span>Player</span><span style={{ textAlign: 'center' }}>Shirt</span><span style={{ paddingLeft: 8 }}>Vest</span><span>Boots</span><span>Film</span>
        </div>
        {LINEUP.map(p => {
          const shirt = p.name === 'Finn Noble' ? s.finnShirt : p.shirt
          const dupe = clash && shirt === 7
          const vest = p.vest ?? (s.spares && p.spare ? `Spare ${p.spare}` : null)
          return (
            <div key={p.name} style={{ minWidth: 500, display: 'grid', gridTemplateColumns: grid, alignItems: 'center', minHeight: 30, borderTop: `1px solid ${GREY}`, fontSize: 14 }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9.5, fontWeight: 700 }}>{p.ini}</span>
              <strong style={{ fontSize: 15 }}>{p.name}</strong>
              <span title={dupe ? 'Two players in this shirt number' : undefined} style={{ height: 22, borderRadius: 6, background: dupe ? '#fff' : GREY, border: dupe ? `2px solid ${INK}` : '2px solid transparent', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{shirt}{dupe && <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}> shared with another player</span>}</span>
              <span style={{ paddingLeft: 8 }}>{vest ? yes(vest) : no('None')}</span>
              <span>{p.boots ? yes('On') : no('None')}</span>
              <span>{p.film ? yes('Yes') : no('No')}</span>
            </div>
          )
        })}
      </section>
      <div style={col}>
        <section aria-label="Things to sort" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>{clash ? 'Two things to sort' : 'Sorted'}</h2>
          {clash
            ? <FixRow title="Two players in shirt 7" sub="Harper and Finn. Film can’t tell them apart"><Btn primary big aria-pressed={picking} onClick={() => { setPicking(p => !p); say(`Finn’s shirt: pick a number. ${free[0]} is free.`) }}>Change Finn’s</Btn></FixRow>
            : <FixRow title={`Finn is now in shirt ${s.finnShirt}`} sub="Harper keeps 7. Film can tell them apart"><Btn big onClick={() => setCapture({ finnShirt: 7 })}>Undo</Btn></FixRow>}
          {picking && clash && (
            <div role="group" aria-label="Free shirt numbers for Finn" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0 0 10px' }}>
              {free.slice(0, 5).map(n => <Btn key={n} onClick={() => { setCapture({ finnShirt: n }); setPicking(false); say(`Finn is in shirt ${n}. No clash left.`) }} style={{ width: 52, padding: 0 }}>{n}</Btn>)}
            </div>
          )}
          {s.spares
            ? <FixRow title="Spare vests A and B" sub="Given to Ella and Kofi just now"><Btn big onClick={() => { setCapture({ spares: false }); say('Spare vests taken back from Ella and Kofi.') }}>Undo</Btn></FixRow>
            : <FixRow title="Spare vests A and B" sub="In the bag. Ella and Kofi have no vest"><Btn big onClick={() => { setCapture({ spares: true }); say('Spare vests A and B given to Ella and Kofi.') }}>Give spares</Btn></FixRow>}
        </section>
        <Note title="Why you confirm, not the camera">Reading shirt numbers from film is hard when players are small, turned away or bunched <Src n={9} onOpen={src(go)} />. Your line-up and the vest each player wears are what we trust. Film only fills gaps.</Note>
        <Note title="Faces">Clean Sheet does not recognise faces. It never will for children.</Note>
      </div>
    </Page>
  )
}

// ── QC6 · ten-second test ────────────────────────────────────────────────────

export function QC6TestResult({ s, go, say }: ScreenProps) {
  const q = quality(s)
  const [testing, setTesting] = useState(false)
  // The first test finds the far left corner cut off. Turning the camera and testing again clears it.
  useEffect(() => { if (s.test === 'none') setCapture({ test: 'cut' }) }, [s.test])
  const cut = s.test !== 'clear'
  const checks: { ok: boolean; t: string; d: string }[] = [
    { ok: !cut, t: 'Whole pitch in the picture', d: cut ? 'The far left corner is cut off' : 'All four corners' },
    { ok: q.cornersFound >= 3, t: 'Pitch lines found', d: `${q.cornersFound} corners, both boxes, halfway` },
    { ok: true, t: 'Light', d: 'Shirt numbers can be read on the near side' },
    { ok: q.vests > 0, t: 'Vests answering', d: q.vests > 0 ? `${q.vests} of ${q.vests}${s.spares ? ', with the two spares' : ''}` : 'None are on' },
    { ok: q.boots > 0, t: 'Boot sensors answering', d: q.boots > 0 ? `${q.boots} of ${q.boots}` : 'None are on' },
    // A shirt clash is confirmed anyway at step 4, so every player is still named.
    { ok: true, t: 'Players named', d: `${SQUAD} of ${SQUAD}` },
  ]
  const open = checks.filter(c => !c.ok).length
  const again = () => { setTesting(true); say('Testing for ten seconds.'); setTimeout(() => { setCapture({ test: 'clear' }); setTesting(false) }, 1600) }
  return (
    <Page id="QC6-TestResult" title="Ten-second test" sub={GAME} go={go} step={4} cols="596px minmax(0,1fr)"
      foot={<><Btn onClick={() => go('QC5-WhoIsWho')}>Back</Btn>{footNote('The test clip is not kept.')}<Btn primary onClick={() => go('QC7-LiveQuality')}>Start recording</Btn></>}>
      <section aria-label="Test result" style={{ ...tile, padding: '14px 18px', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={h2}>{testing ? 'Testing for ten seconds' : open === 0 ? 'Ready. Nothing to fix' : open === 1 ? 'Nearly. One thing to fix' : `Nearly. ${open} things to fix`}</h2>
          {open === 0 ? <Mark kind="strong" label="Full" /> : <Mark kind="estimate" label="Good, not full" />}
        </div>
        <svg viewBox="0 0 560 318" role="img" aria-label={cut ? 'A still from the ten-second test. The pitch lines we found are drawn in white. The far left corner is outside the picture.' : 'A still from the ten-second test. The pitch lines we found are drawn in white. The whole pitch is in the picture.'} style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 14, background: '#22342f', opacity: testing ? 0.6 : 1 }}>
          <path d="M0 0H560V96H0Z" fill="#35504a" />
          <g transform={cut ? undefined : 'translate(34 0) scale(0.9 1)'}>
            <path d="M-40 288L96 96H490L570 288Z" fill={G} />
            <path d="M40 288L138 96M490 96L546 288M40 288H546M138 96H490M298 96L290 288" stroke="#fff" strokeWidth="2.5" fill="none" />
            <ellipse cx="294" cy="170" rx="56" ry="20" stroke="#fff" strokeWidth="2.5" fill="none" />
            {cut && <path d="M0 288H40M96 96h42" stroke="#fff" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />}
            {[[220, 150], [300, 190], [350, 140], [410, 210], [260, 230], [470, 170], [180, 200]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" fill="#fff" />)}
          </g>
          {cut && <g><rect x="10" y="104" width="150" height="28" rx="14" fill="#fff" /><text x="85" y="123" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Corner out of frame</text><path d="M30 138l-18 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></g>}
          <rect x="448" y="12" width="100" height="26" rx="13" fill="rgba(0,0,0,0.45)" /><text x="498" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">10-second test</text>
        </svg>
        <span style={{ ...cap, fontSize: 13 }}>{cut ? 'Turn the camera a little to the left so the far left corner is in the picture. Then test again.' : 'The whole pitch is in the picture. You can start recording.'}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn primary={cut} big onClick={again} disabled={testing}>Test again</Btn>
          {cut && <Btn big onClick={() => go('QC7-LiveQuality')}>Record anyway</Btn>}
        </div>
      </section>
      <div style={col}>
        <section aria-label="What we checked" style={{ ...tile, gap: 0, padding: '12px 16px 6px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>What we checked</h2>
          {checks.map(c => <CheckRow key={c.t} ok={c.ok} title={c.t} sub={c.d} />)}
        </section>
        <Note title="If you record anyway">Everything still works. Where things happened in the far left corner will be marked “Estimate”, and the quality report will say why.</Note>
      </div>
    </Page>
  )
}

// ── QC7 · recording ──────────────────────────────────────────────────────────

const clock = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

export function QC7LiveQuality({ s, go, say }: ScreenProps) {
  const q = quality(s)
  const [sec, setSec] = useState(23 * 60 + 10)
  useEffect(() => { const t = setInterval(() => setSec(x => x + 1), 1000); return () => clearInterval(t) }, [])
  const mark = (what: string) => { setCapture(c => ({ moments: [...c.moments, { at: clock(sec), what }] })); say(`Marked at ${clock(sec)}: ${what}.`) }
  const rows: { icon: string; t: string; d: string; v: string; ok: boolean }[] = [
    { icon: IC.film, t: 'Camera', d: 'Battery 64% · room for 2 more games', v: 'Whole pitch', ok: true },
    q.vests > 0 ? { icon: IC.vest, t: 'Vests', d: 'All answering', v: `${q.vests} of ${q.vests}`, ok: true } : { icon: IC.vest, t: 'Vests', d: 'None are on. No distance or load today', v: 'None', ok: false },
    q.boots > 0 ? { icon: IC.boot, t: 'Boot sensors', d: 'All answering', v: `${q.boots} of ${q.boots}`, ok: true } : { icon: IC.boot, t: 'Boot sensors', d: 'None are on. Touches come from film', v: 'None', ok: false },
    ...(q.vests > 0 ? [{ icon: IC.clock, t: 'Mia’s vest dropped out', d: 'Minute 18 to 19. Her distance has a one-minute gap', v: '1 min', ok: false }] : []),
    { icon: IC.person, t: 'Players named', d: 'From your line-up', v: `${SQUAD} of ${SQUAD}`, ok: true },
  ]
  return (
    <Page id="QC7-LiveQuality" title="Recording" sub={GAME} go={go} cols="minmax(0,1fr) 420px"
      right={<Btn primary big onClick={() => { setCapture({ recorded: true }); go('QC8-QualityReport') }}>Stop and save</Btn>}>
      <div style={col}>
        <section aria-label="Recording" aria-live="off" style={{ borderRadius: 20, background: DARK, color: '#fff', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '10px 26px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>FIRST HALF</span>
            <strong role="timer" style={{ fontSize: 64, lineHeight: '66px', letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{clock(sec)}</strong>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 240px' }}>
            <strong style={{ fontSize: 24, lineHeight: '30px' }}>Recording well</strong>
            <span style={{ fontSize: 15, lineHeight: '22px', color: '#a9cfc0' }}>The camera sees the whole pitch{q.vests > 0 ? ` and ${q.vests} vests are answering` : ''}. You don’t need to watch this screen.</span>
          </span>
        </section>
        <section aria-label="Mark a moment" style={{ ...tile, padding: '14px 18px 18px', gap: 10 }}>
          <h2 style={h2}>Mark a moment</h2>
          <span style={{ ...cap, fontSize: 13 }}>One tap. It becomes a clip, with your word on it.{s.moments.length ? ` ${s.moments.length} marked so far.` : ''}</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 8 }}>
            {['Goal', 'Good moment', 'Look at later', 'Sub'].map(w => <Btn key={w} big onClick={() => mark(w)} style={{ height: 66, borderRadius: 14 }}>{w}</Btn>)}
          </div>
        </section>
        <Note title="What your marks add">A moment you mark is checked by a person who was there. Counts made by trained people agree with each other very closely <Src n={7} onOpen={src(go)} />, so your marks make the film numbers stronger.</Note>
      </div>
      <section aria-label="Quality right now" style={{ ...tile, gap: 0, padding: '12px 18px', alignSelf: 'stretch', minHeight: 560 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6 }}>
          <h2 style={h2}>Quality right now</h2><Mark kind="strong" label="Good" />
        </div>
        {rows.map(r => (
          <div key={r.t} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: `1px solid ${LINE}` }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 10, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={r.icon} size={18} /></span>
            <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>{r.t}</strong><span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{r.d}</span></span>
            <strong style={{ flex: 'none', fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>{r.v}</strong>
            {r.ok
              ? <span aria-label="Fine" style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={IC.tick} size={11} sw={3} /></span>
              : <span aria-label="Look" style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, border: `2px solid ${INK}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={IC.bang} size={11} sw={3} /></span>}
          </div>
        ))}
        <span style={{ ...cap, fontSize: 13, marginTop: 'auto', paddingTop: 12 }}>If something drops out we tell you once, with a sound, and say what it costs.</span>
      </section>
    </Page>
  )
}

// ── QC8 · recording quality ──────────────────────────────────────────────────

export function QC8QualityReport({ s, go, say, age }: ScreenProps) {
  const m = measures(s, age), q = quality(s, age)
  const cut = s.test !== 'clear'
  const answered = SQUAD - 2
  const reminded = s.reminders.includes('friday')
  const reasons: { t: string; d: string; btn: ReactNode }[] = []
  if (cut && q.film) reasons.push({ t: 'Far left corner out of frame', d: 'First 8 minutes, until you turned the camera', btn: <Btn onClick={() => go('QC4-SetUpGuide')}>See set-up</Btn> })
  if (q.cornersFound < 3 && q.film) reasons.push({ t: `Only ${q.cornersFound} of 4 pitch corners found`, d: 'Where things happened is a best reading', btn: <Btn onClick={() => go('QC3-PitchCheck')}>Check pitch</Btn> })
  if (q.vests > 0) reasons.push({ t: '3 vests were flat', d: 'Finn, Isla and Ben have no distance or load', btn: <Btn aria-pressed={reminded} onClick={() => { setCapture(c => ({ reminders: [...new Set([...c.reminders, 'friday'])] })); say('We’ll remind you on Friday at 6 pm to charge the vests.') }}>{reminded ? 'Reminder set' : 'Remind me Friday'}</Btn> })
  else reasons.push({ t: 'No vests were on', d: 'No distance, load or top speed for this game', btn: <Btn onClick={() => go('QC4-SetUpGuide')}>See set-up</Btn> })
  const openLines = ([['halfway', 'On the halfway line'], ['high', 'As high as the tripod goes'], ['corners', 'Both near corners in the frame'], ['sun', 'Sun behind you'], ['battery', 'Battery and space']] as [GuideKey, string][]).filter(([k]) => !s.guide[k]).map(([, t]) => t)
  const n = reasons.length
  const count = ['No', 'One', 'Two', 'Three'][n] ?? String(n)
  const rows: { t: string; by: string; d: string; mark: MarkKind; l?: string }[] = [
    { t: 'Passes, shots and tackles', by: 'film', d: 'Each one opens as a clip', mark: m.events.mark, l: m.events.label },
    { t: 'Distance and load', by: 'vests', d: q.vests > 0 ? `Mia has a one-minute gap. ${SQUAD - q.vests === 3 ? 'Three' : SQUAD - q.vests} players had no vest` : 'No vests were on', mark: m.distance.mark, l: m.distance.label },
    { t: 'Touches and which foot', by: 'boot sensors', d: q.boots > 0 ? 'The other four are counted from film' : 'No boot sensors were on. Counted from film', mark: m.touches.mark, l: m.touches.label },
    { t: 'How hard it felt', by: 'check-in', d: 'Two players have not answered yet', mark: m.felt.mark, l: m.felt.mark === 'strong' ? `Strong · ${answered} of ${SQUAD}` : undefined },
    { t: 'Where things happened', by: 'film', d: cut ? 'Far left corner was out of the picture for 8 minutes' : 'One camera. The far side of the pitch is less exact', mark: m.positions.mark },
    { t: 'Chances made and given up', by: 'film', d: 'From where each shot was taken', mark: m.chances.mark },
    { t: 'Top speed', by: 'vests', d: 'Fast, short runs are the least exact number a vest gives', mark: m.speed.mark },
  ]
  const games = 6
  return (
    <Page id="QC8-QualityReport" title="Recording quality" sub="Sat 6 June · v Harbour Rovers · won 3–1" go={go} cols="minmax(0,1fr) 372px"
      right={<><Btn big onClick={() => go('QC10-HowWeMeasure')}>How we measure</Btn><Btn primary big onClick={() => go('R1-MatchReview')}>Open the match review</Btn></>}>
      <div style={col}>
        <section aria-label="Overall" style={{ borderRadius: 20, background: DARK, color: '#fff', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '10px 26px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: '1 1 250px', minWidth: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>THIS RECORDING</span>
            <strong style={{ fontSize: 28, lineHeight: '34px', letterSpacing: '-0.02em' }}>{n >= 3 ? 'Fair. Check the marks.' : 'Good. Lean on most of it.'}</strong>
            <span style={{ fontSize: 14, lineHeight: '20px', color: '#a9cfc0' }}>{n === 1 ? 'One thing lowered it. It is in your hands next time.' : `${count} things lowered it. ${n === 2 ? 'Both' : 'All'} are in your hands next time.`}</span>
          </span>
          {[[q.film ? (cut ? '52 of 60' : '60 of 60') : '0 of 60', 'minutes filmed cleanly'], [`${q.vests} of ${SQUAD}`, 'players with vest data'], [`${q.named} of ${SQUAD}`, 'players named']].map(([v, l]) => (
            <span key={l} style={{ flex: 'none', display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 26, lineHeight: '32px', fontVariantNumeric: 'tabular-nums' }}>{v}</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#a9cfc0' }}>{l}</span>
            </span>
          ))}
        </section>
        <section aria-label="Each measure" style={{ ...tile, gap: 0, padding: '10px 18px 4px' }}>
          <h2 style={{ ...h2, padding: '4px 0 6px' }}>How far to trust each measure</h2>
          {rows.map((r, i) => (
            <div key={r.t} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'center', gap: 10, minHeight: 44, padding: '3px 0', borderTop: i ? `1px solid ${LINE}` : undefined }}>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, lineHeight: '19px' }}><strong>{r.t}</strong> <span style={{ color: MUT }}>· {r.by}</span></span>
                <span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{r.d}</span>
              </span>
              <Mark kind={r.mark} label={r.l} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'center', gap: 10, minHeight: 48, padding: '4px 0', borderTop: `1px solid ${LINE}` }}>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 14, lineHeight: '19px' }}><strong>Trends across games</strong> <span style={{ color: MUT }}>· all</span></span>
              <span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>A trend only shows after {s.trendAfter} games on the same measure</span>
            </span>
            <Mark kind="needs" label={games >= s.trendAfter ? `Shown: ${games} games in` : `${games} of ${s.trendAfter} games`} />
          </div>
        </section>
      </div>
      <div style={col}>
        <section aria-label="What lowered it" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>What lowered it</h2>
          {reasons.map(r => <FixRow key={r.t} title={r.t} sub={r.d}>{r.btn}</FixRow>)}
          {openLines.length > 0 && <div style={{ borderTop: `1px solid ${LINE}`, padding: '8px 0', fontSize: 13, lineHeight: '18px', color: MUT }}>Not marked at set-up: {openLines.join(', ')}.</div>}
        </section>
        <section aria-label="Help us get it right" style={{ ...tile, gap: 0, padding: '12px 16px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Help us get it right</h2>
          {q.shirtClash && q.film && <FixRow title="3 moments where we were not sure who it was" sub="Two shirts 7 on the pitch at once"><Btn primary big onClick={() => { say('Three clips to check: tap the right player on each.'); go('TC1-ToCheck') }}>Check 3</Btn></FixRow>}
          <FixRow title="Something look wrong?" sub="On any number, tap “That’s not right”"><Btn big onClick={() => go('QC9-MeasureConfidence')}>Show me</Btn></FixRow>
        </section>
        <Note title="Why one game is not a verdict">How much a player runs at speed swings by about a quarter from one game to the next, even for professionals <Src n={3} onOpen={src(go)} />. One game tells you what happened. Several tell you what is true.</Note>
      </div>
    </Page>
  )
}

// ── QC9 · a measure, its mark and its usual swing ────────────────────────────

/** The trend chart with the "usual swing" band. Used by QC9 and the measure sheets. */
export function SwingChart({ values, labels, band, lo, hi, what }: { values: number[]; labels: string[]; band: [number, number]; lo: number; hi: number; what: string }) {
  const X0 = 44, X1 = 620, Y0 = 16, Y1 = 180
  const x = (i: number) => X0 + (i / Math.max(1, values.length - 1)) * (X1 - X0)
  const y = (v: number) => Y1 - ((v - lo) / (hi - lo)) * (Y1 - Y0)
  const ticks = Array.from({ length: 4 }, (_, i) => lo + (i * (hi - lo)) / 3)
  const last = values.length - 1
  const outside = values[last] < band[0] || values[last] > band[1]
  return (
    <svg viewBox="0 0 640 210" role="img" aria-label={`${what} over ${values.length} games: ${values.join(', ')}. The shaded band from ${band[0]} to ${band[1]} is the usual swing between games. The latest game is ${outside ? (values[last] < band[0] ? 'below' : 'above') : 'inside'} the band.`} style={{ display: 'block', width: '100%', maxWidth: 640, height: 'auto' }}>
      {ticks.map(t => <g key={t}><path d={`M${X0} ${y(t)}H${X1}`} stroke="#e3e5e2" strokeWidth="1" /><text x="36" y={y(t) + 4} textAnchor="end" fontSize="12" fill={MUT}>{Math.round(t * 10) / 10}</text></g>)}
      <rect x={X0} y={y(band[1])} width={X1 - X0} height={y(band[0]) - y(band[1])} fill={PALE} />
      <path d={`M${X0} ${y(band[1])}H${X1}M${X0} ${y(band[0])}H${X1}`} stroke={G} strokeWidth="1.5" strokeDasharray="5 5" />
      <text x="614" y={y(band[1]) + 15} textAnchor="end" fontSize="12" fontWeight="700" fill={G}>Usual swing between games</text>
      <polyline points={values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} fill="none" stroke={G} strokeWidth="2.5" />
      {values.map((v, i) => i === last && outside
        ? <circle key={i} cx={x(i)} cy={y(v)} r="7" fill="#f4c95d" stroke={INK} strokeWidth="2" />
        : <circle key={i} cx={x(i)} cy={y(v)} r="5" fill={G} stroke="#fff" strokeWidth="2" />)}
      {labels.map((l, i) => <text key={l} x={x(i)} y="202" textAnchor={i === 0 ? 'start' : i === last ? 'end' : 'middle'} fontSize="12" fill={MUT}>{l}</text>)}
    </svg>
  )
}

const WIN_BACK = { values: [11, 10, 11, 9, 9, 7], labels: ['Round 3', 'Round 4', 'Round 5', 'Round 6', 'Round 7', 'Saturday'], band: [8.5, 11.5] as [number, number] }

export function QC9MeasureConfidence({ s, go, say, team }: ScreenProps) {
  const flagged = s.flagged.includes('win-back')
  const games = WIN_BACK.values.length
  const mark = markFor({ kind: 'count', captured: true, games, trendAfter: s.trendAfter })
  const change = changeWord(WIN_BACK.values[games - 1], WIN_BACK.band)
  const real = change === 'A real change'
  const waiting = [
    { t: 'Passes that break a line', d: 'Started in round 7. One more game and the line appears', n: 2 },
    { t: 'Shape when we lose the ball', d: `An estimate each game. Shown as a trend from ${s.trendAfter} games`, n: 1 },
  ]
  return (
    <Page id="QC9-MeasureConfidence" title="Seconds to win the ball back" sub={`${team} · this season · lower is better`} go={go} cols="minmax(0,1fr) 372px"
      right={<><Btn big aria-pressed={flagged} onClick={() => { setCapture(c => ({ flagged: [...new Set([...c.flagged, 'win-back'])] })); say('Tell us what looks wrong. We check the clips and write back within a day.') }}>That’s not right</Btn><Btn primary big onClick={() => go('PU8a-MeasureFilm')}>See the 14 clips</Btn></>}>
      <div style={col}>
        <section aria-label="The number" style={{ ...tile, padding: '12px 18px 14px', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <strong style={{ flex: 'none', width: 46, height: 46, borderRadius: 10, background: real && mark === 'strong' ? '#f4c95d' : PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>7</strong>
            <span style={{ ...cap, fontSize: 15, flexGrow: 1 }}>seconds on Saturday · was 11 in round 3</span>
            <Mark kind={mark} label={mark === 'needs' ? `${games} of ${s.trendAfter} games` : undefined} />
            {mark !== 'needs' && <Mark kind={real ? 'strong' : 'not'} label={change} />}
          </div>
          <SwingChart {...WIN_BACK} lo={6} hi={12} what="Seconds to win the ball back" />
          <span style={{ ...cap, fontSize: 13 }}>The shaded band is how much this number moves from game to game for no reason at all. Saturday is {real ? 'outside it, so we call the change real.' : 'inside it, so we say about the same.'}</span>
        </section>
        <section aria-label="How to read this number" style={{ ...tile, padding: '12px 18px 10px', gap: 8 }}>
          <h2 style={h2}>How to read this number</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 10 }}>
            {[['Captured by', 'Film. 14 moments on Saturday, each one a clip'], ['Based on', '6 games on the same size of pitch'], ['Compared with', 'Your own team, not other clubs']].map(([a, b]) => (
              <span key={a} style={{ borderRadius: 12, background: PALE, padding: '8px 12px', display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 11, letterSpacing: '0.06em', color: '#2d3d3a' }}>{a}</strong>
                <span style={{ fontSize: 14, lineHeight: '19px' }}>{b}</span>
              </span>
            ))}
          </div>
        </section>
        <section aria-label="Waiting for enough games" style={{ ...tile, gap: 0, padding: '12px 18px 4px' }}>
          <h2 style={{ ...h2, paddingBottom: 6 }}>Numbers still waiting for enough games</h2>
          {waiting.map((w, i) => (
            <div key={w.t} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'center', gap: 10, minHeight: 50, padding: '4px 0', borderTop: i ? `1px solid ${LINE}` : undefined }}>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, lineHeight: '19px' }}><strong>{w.t}</strong> <span style={{ color: MUT }}>· film</span></span>
                <span style={{ fontSize: 13, lineHeight: '17px', color: MUT }}>{w.d}</span>
              </span>
              <Mark kind={markFor({ kind: 'count', captured: true, games: w.n, trendAfter: s.trendAfter })} label={w.n >= s.trendAfter ? undefined : `${w.n} of ${s.trendAfter} games`} />
            </div>
          ))}
        </section>
      </div>
      <div style={col}>
        <section aria-label="What the marks mean" style={{ ...tile, padding: '12px 16px', gap: 8 }}>
          <h2 style={h2}>What the marks mean</h2>
          {([['strong', 'Counted or measured directly. You can check it.'], ['estimate', 'Our best reading. Right direction, rough size.'], ['needs', 'Too few games to call it a trend.'], ['not', 'Not captured in this recording.']] as [MarkKind, string][]).map(([k, t]) => (
            <div key={k} style={{ display: 'grid', gridTemplateColumns: '132px minmax(0,1fr)', alignItems: 'center', gap: 10 }}>
              <span><Mark kind={k} label={k === 'needs' ? `Needs ${s.trendAfter} games` : undefined} /></span>
              <span style={{ fontSize: 13, lineHeight: '18px' }}>{t}</span>
            </div>
          ))}
        </section>
        <Note title="What “a real change” means">A change counts when it is bigger than the usual swing in that number <Src n={6} onOpen={src(go)} />. Inside the band we say “about the same”, even if the number moved.</Note>
        <Note title="Same size of pitch">Games on a bigger or smaller pitch are left out of this line, because pitch size alone changes how a game is played <Src n={8} onOpen={src(go)} />.</Note>
        <button onClick={() => go('QC10-HowWeMeasure')} style={{ alignSelf: 'flex-start', minHeight: 44, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: G, background: 'none', border: 0, padding: 0, textDecoration: 'underline', cursor: 'pointer' }}>How we measure, with sources <Ico d={IC.arrow} size={14} sw={2.4} /></button>
      </div>
    </Page>
  )
}

export { useCapture }
