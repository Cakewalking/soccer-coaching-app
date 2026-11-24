// The connected club: the 11 phone screens (CNp*). Things people tell the app.
// Every question has Skip, and skipping stores nothing. A question over the
// week's limit is held, not asked.

import { saveFile, savePdf } from '../saveFile'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Ico, IC, G, INK, MUT, LINE, PALE, DARK, tile } from '../capture/marks'
import { useCn, setCn, addJob, mayAsk, countAsk, holdBack, TEAMS, type QuestionId, type Fun, type Hard, type Learned } from './cnStore'

type Nav = (s: string) => void
const SPARK = 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'

function useToast() {
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(t => t === m ? null : t), 3200) }
  return { toast, say }
}

/** The shared frame: green header, dark intro card, sections, two buttons. */
export function Phone({ id, over, title, ini, home, onNav, intro, children, foot, left, right, toast, held }: {
  id: string; over: string; title: string; ini: string; home: string; onNav: Nav
  intro?: [string, string, string]; children: ReactNode; foot?: string
  left?: { t: string; on: () => void }; right?: { t: string; on: () => void }
  toast: string | null; held?: ReactNode
}) {
  const btn = (primary: boolean) => ({ flex: primary ? 1.2 : 1, minHeight: 48, padding: '0 10px', borderRadius: 10, border: `1px solid ${primary ? G : LINE}`, background: primary ? G : '#fff', color: primary ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' } as const)
  return (
    <div data-screen={id} style={{ width: 390, minHeight: 844, margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', background: '#faf5ec', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <header style={{ flex: 'none', background: G, color: '#fff', padding: '10px 12px 14px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={() => onNav(home)} aria-label="Back" style={{ flex: 'none', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 0, color: '#fff', cursor: 'pointer' }}><Ico d="M15 18l-6-6 6-6" size={20} sw={2.4} /></button>
        <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}><span style={{ fontSize: 12, color: '#dcefe8' }}>{over}</span><h1 style={{ margin: 0, fontSize: 21, lineHeight: '26px', letterSpacing: '-0.02em' }}>{title}</h1></span>
        <button onClick={() => onNav('ASKp2-PhoneAskOpen')} aria-label="Ask Clean Sheet" style={{ flex: 'none', width: 44, height: 44, borderRadius: 999, border: '1.5px solid #a9cfc0', background: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ico d={SPARK} size={20} /></button>
        <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#e8cfcf', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, marginLeft: 6 }}>{ini}</span>
      </header>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
{intro && <section style={{ borderRadius: 16, background: DARK, color: '#fff', padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#a9cfc0' }}>{intro[0]}</span>
          <strong style={{ fontSize: 20, lineHeight: '26px', letterSpacing: '-0.01em' }}>{intro[1]}</strong>
          <span style={{ fontSize: 14, lineHeight: '20px', color: '#a9cfc0' }}>{intro[2]}</span>
        </section>}
        {held ?? children}
        {foot && !held && <span style={{ fontSize: 13, lineHeight: '18px', color: MUT, textAlign: 'center' }}>{foot}</span>}
      </div>
      {!held && (left || right) && <div style={{ flex: 'none', borderTop: `1px solid ${LINE}`, padding: '10px 14px 16px', display: 'flex', gap: 8 }}>
        {left && <button style={btn(false)} onClick={left.on}>{left.t}</button>}
        {right && <button style={btn(true)} onClick={right.on}>{right.t}</button>}
      </div>}
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 90, transform: 'translateX(-50%)', zIndex: 60, maxWidth: 340, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 14, fontWeight: 600, textAlign: 'center' }}>{toast}</div>}
    </div>
  )
}
const Card = ({ t, children }: { t?: string; children: ReactNode }) => <section style={{ ...tile, padding: '12px 14px', gap: 10 }}>{t && <strong style={{ fontSize: 15 }}>{t}</strong>}{children}</section>

// Tick as many as apply. Stored as one line ("Cost, Travel"); the last option ("Nothing", "Something else") clears the rest when it is the "nothing" answer.
function Ticks({ options, value, onPick, what }: { options: string[]; value: string; onPick: (v: string) => void; what: string }) {
  const on = value ? value.split(', ') : []
  const flip = (o: string) => { const next = on.includes(o) ? on.filter(x => x !== o) : o === 'Nothing' ? [o] : [...on.filter(x => x !== 'Nothing'), o]; onPick(options.filter(x => next.includes(x)).join(', ')) }
  return <div role="group" aria-label={what} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{options.map(o => { const sel = on.includes(o); return <button key={o} role="checkbox" aria-checked={sel} onClick={() => flip(o)} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${sel ? G : LINE}`, background: sel ? G : '#fff', color: sel ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{o}</button> })}</div>
}
function Chips({ options, value, onPick, what }: { options: string[]; value: string; onPick: (v: string) => void; what: string }) {
  return <div role="group" aria-label={what} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{options.map(o => <button key={o} aria-pressed={o === value} onClick={() => onPick(o)} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${o === value ? G : LINE}`, background: o === value ? G : '#fff', color: o === value ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{o}</button>)}</div>
}
function Scale({ value, onPick, lo, hi, what }: { value: number; onPick: (n: number) => void; lo: string; hi: string; what: string }) {
  return <div><div role="group" aria-label={what} style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6 }}>{[1, 2, 3, 4, 5].map(n => <button key={n} aria-pressed={n === value} aria-label={`${what}: ${n} of 5`} onClick={() => onPick(n)} style={{ height: 48, borderRadius: 10, border: `1.5px solid ${n === value ? G : LINE}`, background: n === value ? G : '#fff', color: n === value ? '#fff' : INK, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>{n}</button>)}</div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: MUT, marginTop: 4 }}><span>{lo}</span><span>{hi}</span></div></div>
}
function Three({ options, value, onPick, what, icons }: { options: string[]; value: string; onPick: (v: string) => void; what: string; icons: string[] }) {
  return <div role="group" aria-label={what} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>{options.map((o, i) => <button key={o} aria-pressed={o === value} onClick={() => onPick(o)} style={{ minHeight: 64, borderRadius: 12, border: `1.5px solid ${o === value ? G : LINE}`, background: o === value ? G : '#fff', color: o === value ? '#fff' : INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}><Ico d={icons[i]} size={20} />{o}</button>)}</div>
}
const FACE = ['M12 21a9 9 0 100-18 9 9 0 000 18zM9 10h.01M15 10h.01M8.5 14a4 4 0 007 0', 'M12 21a9 9 0 100-18 9 9 0 000 18zM9 10h.01M15 10h.01M9 15h6', 'M12 21a9 9 0 100-18 9 9 0 000 18zM9 10h.01M15 10h.01M8.5 16a4 4 0 017 0']
const LEVEL = ['M5 12h14', IC.tick, 'M12 5v9M12 18v.5'], YESNO = [IC.tick, 'M5 12h14', IC.cross]

/** What a person sees when the week's limit has been reached: the question waits. */
function useAsk(q: QuestionId, who: 'player' | 'parent' | 'staff', name: string) {
  const s = useCn()
  const [state] = useState(() => mayAsk(s, q, who))   // decided when the screen opens, so answering does not flip it
  useEffect(() => { if (state === 'held') holdBack(name) }, [state, name])
  const held = state === 'ask' ? undefined : (
    <Card t={state === 'off' ? 'Your club has turned this question off' : 'This one is waiting until next week'}>
      <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>{state === 'off' ? 'Nothing is asked and nothing is stored.' : `You have been asked ${who === 'parent' ? s.parentAsks : s.playerAsks} times this week, and your club’s limit is ${who === 'parent' ? s.parentWeek : s.perWeek}. A question tied to a game goes first; this one is held and counted, not lost.`}</span>
    </Card>
  )
  return { held, done: () => countAsk(who) }
}

// ── CNp1 · the player rates their own game ───────────────────────────────────
export function CNp1PlayerSelfReview({ onNav = () => {} }: { onNav?: Nav }) {
  const s = useCn(), { toast, say } = useToast(), ask = useAsk('selfreview', 'player', 'How did you go?')
  const [effort, setEffort] = useState(s.selfReview?.effort ?? 4), [well, setWell] = useState(s.selfReview?.well ?? 'Winning it back'), [work, setWork] = useState(s.selfReview?.work ?? 'Scanning')
  return (
    <Phone id="CNp1-PlayerSelfReview" over={`${TEAMS.u16} · Sunday v Tealside Town`} title="How did you go?" ini="CW" home="STO19-HomeStoryPlayerOlder" onNav={onNav} toast={toast} held={ask.held}
      intro={['YOUR TAKE · 1 MINUTE', 'Your view counts as much as the coach’s.', s.selfReview ? 'Sent. Ollie sees it next to his own rating. Nobody else does.' : 'Ollie sees it next to his own rating. Nobody else does.']}
      foot="Asked after games only, once a week at most."
      left={{ t: 'Skip', on: () => { ask.done(); say('Skipped. Nothing is sent.'); setTimeout(() => onNav('STO19-HomeStoryPlayerOlder'), 900) } }}
      right={{ t: s.selfReview ? 'Send again' : 'Send to Ollie', on: () => { if (!s.selfReview) ask.done(); setCn({ selfReview: { effort, well, work } }); say('Sent. Only you and Ollie can see it.') } }}>
      <Card t="How hard did you work?"><Scale what="How hard did you work?" value={effort} onPick={setEffort} lo="Coasted" hi="Everything" /></Card>
      <Card t="One thing that went well"><Chips what="One thing that went well" value={well} onPick={setWell} options={['Winning it back', 'Passing forward', 'Talking', 'First touch', 'Staying calm']} /></Card>
      <Card t="One thing to work on"><Chips what="One thing to work on" value={work} onPick={setWork} options={['Weaker foot', 'Scanning', 'Shooting early', 'Positioning', 'Something else']} /></Card>
    </Phone>
  )
}

// ── CNp3 · session feedback, three taps ──────────────────────────────────────
export function CNp3SessionFeedback({ onNav = () => {} }: { onNav?: Nav }) {
  const s = useCn(), { toast, say } = useToast(), ask = useAsk('training', 'player', 'How was training?')
  const [fun, setFun] = useState<Fun>('Loved it'), [hard, setHard] = useState<Hard>('About right'), [learned, setLearned] = useState<Learned>('Yes')
  const n = s.sessionAnswers.length
  return (
    <Phone id="CNp3-SessionFeedback" over={`${TEAMS.u12} · Tuesday training`} title="How was training?" ini="MT" home="STO18-HomeStoryPlayerYoung" onNav={onNav} toast={toast} held={ask.held}
      intro={['THREE TAPS', 'Tell Sam how tonight felt.', 'Sam sees the whole team’s answers added up, never yours alone.']}
      foot={`Under 15s answer on a parent’s phone. Asked after one session a week.${n ? ` In this demo ${n} ${n === 1 ? 'player has' : 'players have'} answered: send again to answer as the next player.` : ''}`}
      left={{ t: 'Not tonight', on: () => { ask.done(); say('Skipped.'); setTimeout(() => onNav('STO18-HomeStoryPlayerYoung'), 900) } }}
      right={{ t: 'Send', on: () => { if (!n) ask.done(); setCn(c => ({ sessionAnswers: [...c.sessionAnswers, { fun, hard, learned }] })); say('Thanks. Sam sees the team’s answers once five players have replied.') } }}>
      <Card t="Was it fun?"><Three what="Was it fun?" value={fun} onPick={v => setFun(v as Fun)} options={['Loved it', 'It was OK', 'Not much']} icons={FACE} /></Card>
      <Card t="How hard was it?"><Three what="How hard was it?" value={hard} onPick={v => setHard(v as Hard)} options={['Easy', 'About right', 'Too hard']} icons={LEVEL} /></Card>
      <Card t="Did you learn something?"><Three what="Did you learn something?" value={learned} onPick={v => setLearned(v as Learned)} options={['Yes', 'A bit', 'Not really']} icons={YESNO} /></Card>
    </Phone>
  )
}

// ── CNp5 · the player sets their own goal (15 and over) ──────────────────────
const GOAL_TEXT: Record<string, [string, string]> = {
  'Scan before I receive': ['Look over both shoulders before the ball comes, so I can play forward first time.', 'More first-time forward passes on film.'],
  'Use my left foot': ['Pass and shoot with my left foot in games, not only at training.', 'More left-foot passes on film.'],
  'Win more headers': ['Attack the ball in the air from goal kicks and corners.', 'More headers won on film.'],
  'Talk more': ['Call for the ball and tell team-mates what I can see.', 'My coach hears me in games.'],
  'Write my own': ['', ''],
}
export function CNp5PlayerGoal({ onNav = () => {} }: { onNav?: Nav }) {
  const s = useCn(), { toast, say } = useToast()
  const [pick, setPick] = useState('Scan before I receive'), [text, setText] = useState(s.goal?.text ?? GOAL_TEXT['Scan before I receive'][0]), [know, setKnow] = useState(s.goal?.know ?? GOAL_TEXT['Scan before I receive'][1])
  const area = { width: '100%', boxSizing: 'border-box', minHeight: 76, padding: '10px 12px', borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 14, lineHeight: '20px', color: INK, resize: 'vertical' } as const
  return (
    <Phone id="CNp5-PlayerGoal" over={`${TEAMS.u16} · my goals`} title="Set your own goal" ini="CW" home="STO19-HomeStoryPlayerOlder" onNav={onNav} toast={toast}
      intro={['YOUR GOAL, YOUR WORDS', 'What do you want to get better at by the end of term?', s.goal?.sent ? 'Sent to Ollie. He reads it, may tweak it with you, and builds it into training.' : 'Ollie reads it, may tweak it with you, and builds it into training.']}
      foot="Your coach’s goal for you stays too. You can have one of each."
      left={{ t: s.goal && !s.goal.sent && s.goal.text === text ? 'Saved as a draft' : 'Save for later', on: () => { setCn({ goal: { text, know, sent: false } }); say('Saved as a draft.') } }}
      right={{ t: s.goal?.sent && s.goal.text === text ? 'Sent to Ollie' : 'Send to Ollie', on: () => { if (!text.trim()) return say('Write your goal first.'); setCn({ goal: { text, know, sent: true } }); say('Sent to Ollie. He usually answers within two days.') } }}>
      <Card t="Start from one of these"><Chips what="Start from one of these" value={pick} onPick={v => { setPick(v); setText(GOAL_TEXT[v][0]); setKnow(GOAL_TEXT[v][1]) }} options={Object.keys(GOAL_TEXT)} /></Card>
      <Card>
        <label htmlFor="g-text" style={{ fontSize: 15, fontWeight: 700 }}>In your words</label><textarea id="g-text" value={text} onChange={e => setText(e.target.value)} style={area} />
        <label htmlFor="g-know" style={{ fontSize: 15, fontWeight: 700 }}>How will you know?</label><textarea id="g-know" value={know} onChange={e => setKnow(e.target.value)} style={area} />
      </Card>
    </Phone>
  )
}

// ── CNp9 · the season report, as a parent reads it ───────────────────────────
function Bar({ t, was, now }: { t: string; was: number; now: number }) {
  return <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><strong>{t}</strong><span style={{ color: MUT }}>was {was}, now {now}</span></div><div role="img" aria-label={`${t}: was ${was}, now ${now}, out of 5`} style={{ position: 'relative', height: 10, borderRadius: 999, background: '#e9eae8', marginTop: 4 }}><span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${now * 20}%`, borderRadius: 999, background: G }} /><span style={{ position: 'absolute', left: `${was * 20}%`, top: -3, bottom: -3, width: 2, background: INK }} /></div></div>
}
const Row = ({ icon, t, d, on }: { icon: string; t: string; d: string; on?: () => void }) => {
  const inner = <><span style={{ flex: 'none', width: 36, height: 36, borderRadius: 10, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={icon} size={18} /></span><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}><strong style={{ fontSize: 15, color: INK }}>{t}</strong><span style={{ fontSize: 13, color: MUT, fontWeight: 400 }}>{d}</span></span>{on && <Ico d={IC.chev} size={18} sw={2.4} />}</>
  const st = { display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, padding: '6px 0', width: '100%', borderTop: `1px solid ${LINE}`, fontFamily: 'inherit' } as const
  return on ? <button onClick={on} style={{ ...st, background: 'none', border: 0, borderTop: `1px solid ${LINE}`, cursor: 'pointer' }}>{inner}</button> : <div style={st}>{inner}</div>
}
export function CNp9SeasonReportParent({ onNav = () => {} }: { onNav?: Nav }) {
  const s = useCn(), { toast, say } = useToast()
  return (
    <Phone id="CNp9-SeasonReportParent" over={`${TEAMS.u12} · mid-season report`} title="Mia’s season so far" ini="LT" home="STO17-HomeStoryParent" onNav={onNav} toast={toast}
      intro={['FROM SAM K, HEAD COACH · 20 JUNE', 'Mia is braver on the ball than she was in March.', 'She asks for it under pressure now. Next: looking up before she receives.']}
      foot="Written by Sam from the season’s notes, ratings and film. Only your family sees it."
      left={{ t: 'Save as PDF', on: () => { savePdf('mia-tran-season-report.pdf', 'Mia Tran: season so far', ['From Sam K, head coach, U12 Sam. 20 June.', '', 'Mia is braver on the ball than she was in March.', 'She asks for it under pressure now. Next: looking up before she receives.', '', 'What has changed (Sam’s rating out of 5)', 'Asking for the ball: was 2, now 4', 'Using her left foot: was 2, now 3', 'Talking to team-mates: was 3, now 3', '', '9 of 10 sessions. 7 of 8 games, with a fair share of minutes in every game.', 'Her goal for term 3: look over her shoulder before the ball comes.', '', 'Written by Sam from the season’s notes, ratings and film. Only your family sees it.']); say('Saved to your phone.') } }} right={{ t: s.catchUp ? `Booked: ${s.catchUp}` : 'Book a chat with Sam', on: () => onNav('CNp10-BookCatchUp') }}>
      <Card t="What has changed"><Bar t="Asking for the ball" was={2} now={4} /><Bar t="Using her left foot" was={2} now={3} /><Bar t="Talking to team-mates" was={3} now={3} /><span style={{ fontSize: 12, color: MUT }}>Sam’s rating out of 5. The line is where she started.</span></Card>
      <section style={{ ...tile, padding: '4px 14px', gap: 0 }}>
        <Row icon="M8 5l11 7-11 7z" t="Three clips that show it" d="Chosen by Sam" on={() => say('The three clips open.')} />
        <Row icon="M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4" t="9 of 10 sessions · 7 of 8 games" d="Fair share of minutes in every game" />
        <Row icon="M5 21V4h11l-2 4 2 4H5" t="Her goal for term 3" d="Look over her shoulder before the ball comes" />
      </section>
    </Phone>
  )
}

// ── CNp10 · book ten minutes with the coach ──────────────────────────────────
const SLOTS: [string, [string, boolean][]][] = [['Tuesday 23 June · before training', [['4:30', true], ['4:40', false], ['4:50', false], ['5:00', true], ['5:10', false], ['5:20', false]]], ['Thursday 25 June · on a call', [['7:00', false], ['7:10', true], ['7:20', false]]]]
export function CNp10BookCatchUp({ onNav = () => {} }: { onNav?: Nav }) {
  const s = useCn(), { toast, say } = useToast()
  const [slot, setSlot] = useState('4:50'), [topic, setTopic] = useState(s.catchTopic)
  const day = SLOTS.find(([, list]) => list.some(([t]) => t === slot))![0], short = day.split(' ')[0], call = day.includes('call')
  return (
    <Phone id="CNp10-BookCatchUp" over={`${TEAMS.u12} · mid-season catch-ups`} title="Book ten minutes with Sam" ini="LT" home="CNp9-SeasonReportParent" onNav={onNav} toast={toast}
      intro={['TWICE A SEASON', 'Ten minutes about Mia, with her report in front of you both.', s.catchUp ? `You are booked: ${s.catchUp}.` : 'At the clubrooms before training, or on a call.']}
      foot="Sam gets your topic beforehand. Mia can come too."
      left={{ t: 'No thanks', on: () => { setCn({ catchUp: null }); say('No catch-up booked. You can book later from the report.'); setTimeout(() => onNav('CNp9-SeasonReportParent'), 1100) } }}
      right={{ t: `Book ${slot} ${short}`, on: () => { setCn({ catchUp: `${short} ${slot}`, catchTopic: topic || 'Nothing in particular' }); say(`Booked: ${day.split(' · ')[0]}, ${slot} pm ${call ? 'on a call' : 'at the clubrooms'}. It is in your calendar.`) } }}>
      <Card>
        {SLOTS.map(([d, list]) => <div key={d} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><strong style={{ fontSize: 15 }}>{d}</strong>
          <div role="group" aria-label={d} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>{list.map(([t, taken]) => taken
            ? <span key={t} style={{ height: 44, borderRadius: 10, background: '#e9eae8', color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{t} · taken</span>
            : <button key={t} aria-pressed={t === slot} onClick={() => { setSlot(t); say(`${t} picked.`) }} style={{ height: 44, borderRadius: 10, border: `1.5px solid ${t === slot ? G : LINE}`, background: t === slot ? G : '#fff', color: t === slot ? '#fff' : INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{t}</button>)}</div></div>)}
      </Card>
      <Card t="Anything you want to cover?"><Ticks what="Anything you want to cover?" value={topic} onPick={setTopic} options={['Her confidence', 'Position', 'Next season', 'Something else']} /></Card>
    </Phone>
  )
}

// ── CNp11 · family view (two or more children) ───────────────────────────────
const FAMILY_ICS = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Clean Sheet//Family//EN', ...[['Mia: U12 Sam v Harbour Rovers (home, pitch 2)', '20260606T093000'], ['Bao: U8 Hannah at Ridgeway Reserve (away)', '20260606T093000'], ['Mia: U12 Sam training', '20260604T174500']].flatMap(([t, d], i) => ['BEGIN:VEVENT', `UID:cs-family-${i}@cleansheet.demo`, `DTSTART:${d}`, `SUMMARY:${t}`, 'END:VEVENT']), 'END:VCALENDAR'].join('\r\n')
export function CNp11FamilyView({ onNav = () => {} }: { onNav?: Nav }) {
  const s = useCn(), { toast, say } = useToast()
  const kids = [
    { ini: 'MT', n: 'Mia', team: TEAMS.u12, when: 'Sun 9:30 · home, pitch 2', note: s.reportSent ? 'New clip from Sam. Mid-season report is ready.' : 'New clip from Sam.' },
    { ini: 'BT', n: 'Bao', team: `${TEAMS.u8} · MiniRoos`, when: 'Sun 9:30 · away, Ridgeway Reserve', note: s.jobs.includes('lift') ? 'Lift asked for Sunday. Oranges are yours this week.' : 'Oranges are yours this week.' },
  ]
  return (
    <Phone id="CNp11-FamilyView" over="Wattle Creek FC" title="The Tran family" ini="LT" home="STO17-HomeStoryParent" onNav={onNav} toast={toast}
      intro={[`THIS WEEK · ${kids.length} CHILDREN`, 'Sunday clashes: Mia and Bao both kick off at 9:30.', 'Mia is at home, Bao is away at Ridgeway.']}
      left={{ t: s.jobs.includes('one-calendar') ? 'Calendar added' : 'One calendar', on: () => { saveFile('tran-family-football.ics', FAMILY_ICS, 'text/calendar'); addJob('one-calendar'); say('Both children added to one calendar feed.') } }} right={{ t: s.jobs.includes('lift') ? 'Lift asked' : 'Ask for a lift', on: () => { addJob('lift'); say(`Lift request sent to ${TEAMS.u8}’s parents for Sunday.`) } }}>
      {kids.map(k => (
        <button key={k.n} onClick={() => onNav('STO17-HomeStoryParent')} style={{ ...tile, padding: '12px 14px', gap: 4, textAlign: 'left', fontFamily: 'inherit', color: INK, cursor: 'pointer' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 36, height: 36, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{k.ini}</span><span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16 }}>{k.n}</strong><span style={{ fontSize: 13, color: MUT }}>{k.team}</span></span><Ico d={IC.chev} size={18} sw={2.4} /></span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{k.when}</span><span style={{ fontSize: 13, color: MUT }}>{k.note}</span>
        </button>
      ))}
      <section style={{ ...tile, padding: '2px 14px', gap: 0 }}><Row icon="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9zM14 3v6h6M8 13h8M8 17h5" t="Fees" d="Both paid for term 2. Term 3 is due 1 July" on={() => say('Fees for both children open.')} /></section>
    </Phone>
  )
}

// ── CNp12 · two questions a term. No names are stored with the answers. ──────
export function CNp12PulseSurvey({ onNav = () => {} }: { onNav?: Nav }) {
  const s = useCn(), { toast, say } = useToast(), ask = useAsk('pulse', 'parent', 'Two quick questions')
  const [enjoy, setEnjoy] = useState(5), [informed, setInformed] = useState(3), [way, setWay] = useState('Training times')
  return (
    <Phone id="CNp12-PulseSurvey" over="Wattle Creek FC · term 2" title="Two quick questions" ini="LT" home="STO17-HomeStoryParent" onNav={onNav} toast={toast} held={s.pulse ? undefined : ask.held}
      intro={['ONCE A TERM · NO NAMES', 'How is the season going for your family?', s.pulse ? 'Thanks. Sent without your name. We won’t ask again this term.' : 'The club sees answers added up by team, once five families have replied.']}
      foot="Your coach never sees who said what."
      left={{ t: 'Not now', on: () => { ask.done(); say('Skipped. We won’t ask again this term.'); setTimeout(() => onNav('STO17-HomeStoryParent'), 900) } }}
      right={{ t: 'Send', on: () => { if (!s.pulse) ask.done(); setCn({ pulse: { enjoy, informed, way } }); say('Thanks. Sent without your name.') } }}>
      <Card t="Is Mia enjoying her football?"><Scale what="Is Mia enjoying her football?" value={enjoy} onPick={setEnjoy} lo="Not at all" hi="Loves it" /></Card>
      <Card t="Do you feel you know how she is going?"><Scale what="Do you feel you know how she is going?" value={informed} onPick={setInformed} lo="No idea" hi="Completely" /></Card>
      <Card t="Anything getting in the way?"><Ticks what="Anything getting in the way?" value={way} onPick={setWay} options={['Training times', 'Cost', 'Game time', 'Travel', 'Nothing']} /></Card>
    </Phone>
  )
}

// ── CNp14 · the player passport. The family owns the file. ───────────────────
const PASS: [keyof ReturnType<typeof useCn>['passport'], string, string][] = [['reports', 'Season reports', '5 reports from 2 coaches'], ['goals', 'Her goals and how they went', '7 goals, 5 met'], ['clips', 'Clips', '24 clips where Mia is the subject'], ['games', 'Games and minutes', '41 games'], ['health', 'Health notes', 'Growth, injuries, check-ins']]
// `own`: a player of 15 or over opening their own passport, from their own home.
const PASS_LINK = 'https://soccer-coaching-app-six.vercel.app/share/wattle-creek-passport'
export function CNp14PlayerPassport({ onNav = () => {}, own }: { onNav?: Nav; own?: boolean }) {
  const s = useCn(), { toast, say } = useToast()
  return (
    <Phone id={own ? 'CNp14o-PlayerPassportOwn' : 'CNp14-PlayerPassport'} over={own ? 'Cal West · since 2024' : 'Mia Tran · since 2024'} title={own ? 'Your passport' : 'Mia’s passport'} ini={own ? 'CW' : 'LT'} home={own ? 'STO19-HomeStoryPlayerOlder' : 'STO17-HomeStoryParent'} onNav={onNav} toast={toast}
      intro={[own ? 'YOURS TO KEEP' : 'HERS TO KEEP', own ? 'Three seasons of your football, in one file you own.' : 'Three seasons of Mia’s football, in one file you own.', 'Take it to a new club, a school or a trial. Wattle Creek keeps nothing you don’t want it to.']}
      foot="Clips only show other children whose families allow sharing. Coaches’ private notes and parents’ ratings never go in."
      left={{ t: s.jobs.includes('passport-link') ? 'Link copied' : 'Send a link', on: () => { addJob('passport-link'); navigator.clipboard?.writeText(PASS_LINK).catch(() => { /* copying was refused: the link is shown on the page */ }); say('A private link is ready. It works for 30 days.') } }} right={{ t: 'Download', on: () => { savePdf(own ? 'cal-west-passport.pdf' : 'mia-tran-passport.pdf', own ? 'Cal West: player passport' : 'Mia Tran: player passport', ['Wattle Creek FC, since 2024. This file belongs to the family.', '', ...PASS.filter(([k]) => s.passport[k]).map(([, t, d]) => `${t}: ${d}`), '', 'Left out: coaches’ private notes, parents’ ratings, and other children unless their family allows sharing.']); say(`${own ? 'Your' : 'Mia’s'} passport is saved to your phone: one PDF${s.passport.clips ? ' and a folder of 24 clips' : ''}.`) } }}>
      {s.jobs.includes('passport-link') && <Card t="Your private link"><span style={{ fontSize: 14, lineHeight: '20px', wordBreak: 'break-all' }}>{PASS_LINK}</span><span style={{ fontSize: 13, color: MUT }}>Copied. It works for 30 days, and you can switch it off here.</span></Card>}
      <section style={{ ...tile, padding: '10px 14px 2px', gap: 0 }}>
        <strong style={{ fontSize: 15, paddingBottom: 6 }}>What goes in</strong>
        {PASS.map(([k, t, d]) => { const on = s.passport[k]; return (
          <button key={k} role="switch" aria-checked={on} onClick={() => { setCn(c => ({ passport: { ...c.passport, [k]: !on } })); say(`${t}: ${on ? 'left out' : 'added'}.`) }} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 54, width: '100%', background: 'none', border: 0, borderTop: `1px solid ${LINE}`, fontFamily: 'inherit', color: INK, textAlign: 'left', cursor: 'pointer' }}>
            <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15 }}>{t}</strong><span style={{ fontSize: 13, color: MUT }}>{d}</span></span>
            <span aria-hidden="true" style={{ flex: 'none', width: 44, height: 26, borderRadius: 999, boxSizing: 'border-box', background: on ? G : '#fff', border: `1.5px solid ${on ? G : MUT}`, position: 'relative' }}><span style={{ position: 'absolute', top: 2.5, left: on ? 21 : 3, width: 18, height: 18, borderRadius: 999, background: on ? '#fff' : MUT }} /></span>
          </button>) })}
      </section>
    </Phone>
  )
}

// ── CNp16 · load outside the club (players 12 and over) ──────────────────────
const ELSE = ['School sport', 'Futsal', 'Other club or rep team', 'Anything else active']
export function CNp16WeekElsewhere({ onNav = () => {} }: { onNav?: Nav }) {
  const s = useCn(), { toast, say } = useToast(), ask = useAsk('elsewhere', 'player', 'What else did you do?')
  const h = s.elsewhere.hours, total = h.reduce((a, b) => a + b, 0)
  const step = (i: number, d: number) => { const hours = h.map((x, n) => n === i ? Math.max(0, Math.min(20, x + d)) : x); setCn({ elsewhere: { ...s.elsewhere, hours } }); say(`${ELSE[i]}: one ${d > 0 ? 'more' : 'less'}.`) }
  const sb = { width: 44, height: 44, border: 0, background: 'none', color: INK, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } as const
  return (
    <Phone id="CNp16-WeekElsewhere" over={`${TEAMS.u16} · Sunday check-in`} title="What else did you do?" ini="CW" home="STO19-HomeStoryPlayerOlder" onNav={onNav} toast={toast} held={ask.held}
      intro={['SO YOUR COACH SEES THE WHOLE WEEK', 'Football here is only part of your week.', 'Tell us the rest and Priya can keep your load sensible.']}
      foot={`${['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'][total] ?? total} ${total === 1 ? 'hour' : 'hours'} added to your week. Your coach and fitness coach see the total, not the detail.`}
      left={{ t: 'Same as last week', on: () => { setCn({ elsewhere: { hours: [2, 0, 0, 1], week: 'Normal', saved: false } }); say('Copied from last week.') } }}
      right={{ t: s.elsewhere.saved ? 'Saved' : 'Save', on: () => { if (!s.elsewhere.saved) ask.done(); setCn({ elsewhere: { ...s.elsewhere, saved: true } }); say(`Saved. Your week is ${5 + total} hours, up from 6.`) } }}>
      <Card t="This week, outside Wattle Creek">
        {ELSE.map((t, i) => <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 48, borderTop: i ? `1px solid ${LINE}` : undefined }}><span style={{ flexGrow: 1, fontSize: 15, fontWeight: 600 }}>{t}</span>
          <button style={sb} aria-label={`${t}: one less`} onClick={() => step(i, -1)}><Ico d={IC.minus} size={16} sw={2.6} /></button><strong style={{ width: 52, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{h[i]} {h[i] === 1 ? 'hr' : 'hrs'}</strong><button style={sb} aria-label={`${t}: one more`} onClick={() => step(i, 1)}><Ico d={IC.plus} size={16} sw={2.6} /></button></div>)}
      </Card>
      <Card t="Big week at school?"><Chips what="Big week at school?" value={s.elsewhere.week} onPick={week => setCn({ elsewhere: { ...s.elsewhere, week } })} options={['Normal', 'Exams', 'Camp', 'Away']} /></Card>
    </Phone>
  )
}

// ── CNp18 · incident log (coach phone). Goes to the welfare officer. ─────────
export function CNp18IncidentLog({ onNav = () => {} }: { onNav?: Nav }) {
  const s = useCn(), { toast, say } = useToast()
  const [kind, setKind] = useState(s.incident.kind), [text, setText] = useState('Clash of knees going for the ball. Walked it off, no swelling.')
  const head = kind === 'Head knock'
  const [edit, setEdit] = useState<'who' | 'when' | 'did' | null>(null)
  const inc = s.incident, who = inc.who ?? 'Jai Patel', when = inc.when ?? 'Today, 27th minute', did = inc.did ?? 'Ice, sat out 10 minutes, back on', photos = inc.photos ?? 0
  const OPTS = { who: ['Jai Patel', 'Mia Tran', 'Noah Okafor', 'Zoe Hart', 'Grace Reid'], when: ['Today, 27th minute', 'Today, first half', 'Today, second half', 'At training'], did: ['Ice, sat out 10 minutes, back on', 'Came off, did not go back on', 'Checked, played on', 'Parent called'] }
  const pickPhoto = useRef<HTMLInputElement>(null)
  return (
    <Phone id="CNp18-IncidentLog" over={`${TEAMS.u12} · Sunday game`} title="Log an incident" ini="SK" home="CPh1-CoachPhoneHome" onNav={onNav} toast={toast}
      intro={['GOES TO HELEN, WELFARE OFFICER', 'Write down what happened while it is fresh.', s.incident.sent ? 'Logged. Helen and Jai’s parent have it.' : 'One minute now saves a hard conversation later.']}
      foot="Jai’s parent is told. A head knock opens the concussion steps."
      left={{ t: photos ? `${photos} ${photos === 1 ? 'photo' : 'photos'} added` : 'Add a photo', on: () => pickPhoto.current?.click() }}
      right={{ t: head ? 'Open the concussion steps' : 'Send to Helen', on: () => { setCn(c => ({ incident: { ...c.incident, kind, sent: true } })); if (head) onNav('FC1-Concussion'); else say('Logged. Helen and Jai’s parent have it.') } }}>
      <Card t="What kind?"><Chips what="What kind?" value={kind} onPick={setKind} options={['Knock or injury', 'Head knock', 'Behaviour', 'Sideline', 'Something else']} /></Card>
      <section style={{ ...tile, padding: '2px 14px', gap: 0 }}>
        <Row icon={IC.person} t="Who" d={who} on={() => setEdit(e => e === 'who' ? null : 'who')} /><Row icon={IC.clock} t="When" d={when} on={() => setEdit(e => e === 'when' ? null : 'when')} /><Row icon={IC.tick} t="What you did" d={did} on={() => setEdit(e => e === 'did' ? null : 'did')} />
      </section>
      {edit && <Card t={edit === 'who' ? 'Who was it?' : edit === 'when' ? 'When did it happen?' : 'What did you do?'}><Chips what={edit} value={edit === 'who' ? who : edit === 'when' ? when : did} onPick={v => { setCn(c => ({ incident: { ...c.incident, [edit]: v } })); setEdit(null); say(`${edit === 'who' ? 'Who' : edit === 'when' ? 'When' : 'What you did'}: ${v}.`) }} options={OPTS[edit]} /></Card>}
      <input ref={pickPhoto} type="file" accept="image/*" capture="environment" multiple hidden onChange={e => { const n = e.target.files?.length ?? 0; if (n) { setCn(c => ({ incident: { ...c.incident, photos: (c.incident.photos ?? 0) + n } })); say(`${n} ${n === 1 ? 'photo' : 'photos'} added. Only Helen and the parent see them.`) } }} />
      <Card><label htmlFor="inc" style={{ fontSize: 15, fontWeight: 700 }}>In a sentence</label><textarea id="inc" value={text} onChange={e => setText(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', minHeight: 70, padding: '10px 12px', borderRadius: 10, border: `1px solid ${LINE}`, fontFamily: 'inherit', fontSize: 14, lineHeight: '20px', color: INK }} /></Card>
    </Phone>
  )
}

// ── CNp19 · sideline rating (team manager). Never about a named person. ──────
export function CNp19SidelineRating({ onNav = () => {} }: { onNav?: Nav }) {
  const s = useCn(), { toast, say } = useToast(), ask = useAsk('sideline', 'staff', 'How was the sideline?')
  const [ours, setOurs] = useState(s.sideline.ours), [theirs, setTheirs] = useState(s.sideline.theirs), [note, setNote] = useState(s.sideline.note)
  return (
    <Phone id="CNp19-SidelineRating" over={`${TEAMS.u12} · Sunday`} title="How was the sideline?" ini="RO" home="STO16-HomeStoryManager" onNav={onNav} toast={toast} held={ask.held}
      intro={['ONE RATING A GAME', 'What was it like to stand on our side today?', 'About the whole sideline. Never about one person.']}
      foot="Seen by team, over a season. To report a person, use “Tell Helen”."
      left={{ t: 'Tell Helen', on: () => onNav('PC2b-TellHelen') }} right={{ t: s.sideline.sent ? 'Sent' : 'Send', on: () => { setCn({ sideline: { ours, theirs, note, sent: true } }); say(`Thanks. Added to this season’s picture for ${TEAMS.u12}.`) } }}>
      <Card t="Our sideline"><Scale what="Our sideline" value={ours} onPick={setOurs} lo="Hostile" hi="A pleasure" /></Card>
      <Card t="Their sideline"><Scale what="Their sideline" value={theirs} onPick={setTheirs} lo="Hostile" hi="A pleasure" /></Card>
      <Card t="Anything to note?"><Ticks what="Anything to note?" value={note} onPick={setNote} options={['Shouting at the referee', 'Coaching from the line', 'Great support', 'Nothing']} /></Card>
    </Phone>
  )
}

