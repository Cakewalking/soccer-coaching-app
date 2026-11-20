import { useState, type ReactNode } from 'react'
import EDU1Learn from '../step4/EDU1Learn'
import { OpeningPanel } from '../step4/directorParts'

// Learn › Education centre, for every coach. Two sides, as drawn on EDU1 and EDU5:
//   For players — lessons the coach sends to the squad (or, under 12, to families)
//   For coaches — the coach's own path, set by the director of football
// One component so no role is left with only half of it.

export type LearnTeam = 'juniors' | 'youth' | 'seniors' | 'miniroos' | 'goalkeeper'
type Mode = 'players' | 'coaches'

const INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', G = '#2f6252', GD = '#1f4a3e', PALE = '#eef5f2', BORDER = '#c5c8c4', AMBER = '#f4c95d'

function useToast() {
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }
  const el = toast ? <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', maxWidth: 560, textAlign: 'center' }}>{toast}</div> : null
  return { say, el }
}

export function AudienceSwitch({ mode, onMode, dark = false }: { mode: Mode; onMode: (m: Mode) => void; dark?: boolean }) {
  return (
    <span role="tablist" aria-label="Who the lessons are for" style={{ display: 'inline-flex', padding: 3, borderRadius: 12, background: dark ? '#e9eae8' : '#eef0ee', flexShrink: 0 }}>
      {(['players', 'coaches'] as Mode[]).map(m => (
        <button key={m} role="tab" aria-selected={mode === m} onClick={() => onMode(m)} style={{ height: 40, padding: '0 14px', borderRadius: 9, border: 0, background: mode === m ? '#fff' : 'transparent', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: mode === m ? 700 : 600, cursor: 'pointer', boxShadow: mode === m ? '0 1px 3px rgba(16,33,31,0.18)' : 'none', whiteSpace: 'nowrap' }}>
          {m === 'players' ? 'For players' : 'For coaches'}
        </button>
      ))}
    </span>
  )
}

function Thumb({ len }: { len: string }) {
  return (
    <span style={{ position: 'relative', display: 'block', height: 80, borderRadius: 10, background: GD, overflow: 'hidden' }}>
      <svg viewBox="0 0 330 92" preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5"><rect x="26" y="12" width="278" height="100" /><line x1="165" y1="12" x2="165" y2="92" /><circle cx="165" cy="46" r="58" /></g>
        <line x1="112" y1="58" x2="214" y2="60" stroke="#7fd6b5" strokeWidth="2" strokeLinecap="round" />
        <g fill="#fff"><circle cx="112" cy="58" r="5" /><circle cx="186" cy="52" r="5" /><circle cx="214" cy="38" r="5" /></g>
      </svg>
      <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 34, height: 34, borderRadius: '50%', background: 'rgba(16,33,31,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
      </span>
      <span style={{ position: 'absolute', right: 8, bottom: 6, fontSize: 12, fontWeight: 700, color: '#fff' }}>{len}</span>
    </span>
  )
}

type Lesson = { len: string; title: string; credit: string; tag: string; watched?: boolean }
function LessonCard({ l, onPlay, footer }: { l: Lesson; onPlay: () => void; footer?: ReactNode }) {
  return (
    <button onClick={onPlay} style={{ display: 'flex', flexDirection: 'column', gap: 6, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14, padding: 10, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', minWidth: 0 }}>
      <Thumb len={l.len} />
      <span style={{ fontSize: 15, fontWeight: 700, color: INK, lineHeight: '20px' }}>{l.title}</span>
      <span style={{ fontSize: 13, color: MUT }}>{l.credit}</span>
      <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: G, background: PALE, borderRadius: 999, padding: '3px 10px' }}>{l.tag}</span>
        {l.watched && <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: G, borderRadius: 999, padding: '3px 10px' }}>Watched</span>}
      </span>
      {footer}
    </button>
  )
}

const side: React.CSSProperties = { background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '14px 16px' }
const rowLabel: React.CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: MUT, margin: '2px 0 8px' }

// ── For coaches (EDU5) ──────────────────────────────────────────────────────
type CoachPath = { path: string; done: string; next: string; support: string; week: string; weekLessons: Lesson[]; dayLessons: Lesson[]; tried: string; why: string }
const COACH: Record<LearnTeam, CoachPath> = {
  miniroos: {
    path: 'New to coaching MiniRoos', done: 'two', next: 'reading who has had a turn, without an app', support: '50 seconds. Then try it on Saturday.',
    week: 'children bunching round the ball', tried: '“no lines, no laps”',
    weekLessons: [{ len: '0:48', title: 'Fixing bunching with one rule', credit: 'Luke Fraser with U11 Luke', tag: 'Small games' }, { len: '1:05', title: 'A session with no lines and no laps', credit: 'Mark Dunn with U9 Mark', tag: 'Planning', watched: true }, { len: '0:40', title: 'Getting a quiet child on the ball', credit: 'Ana Silva with U12 Girls Ana', tag: 'Every child' }],
    dayLessons: [{ len: '0:36', title: 'A team talk in 30 seconds', credit: 'Sam K with U12 Sam', tag: 'Talking', watched: true }, { len: '0:52', title: 'Changing a game that isn’t working', credit: 'Luke Fraser with U11 Luke', tag: 'Small games' }, { len: '0:44', title: 'What to say to the sideline', credit: 'Rachel Moore', tag: 'Parents' }],
    why: 'Live game help is off for MiniRoos at Wattle Creek, so you learn to see it yourself. These show how other coaches here do that.',
  },
  juniors: {
    path: 'Coaching 9 a side', done: 'three', next: 'keeping minutes fair without a spreadsheet', support: '55 seconds. Then try it on Saturday.',
    week: 'the gap between defence and midfield', tried: '“step up together”',
    weekLessons: [{ len: '0:52', title: 'Coaching the gap with one cue', credit: 'Josh Kerr with U14 Josh', tag: 'Staying compact' }, { len: '1:10', title: 'A session that starts with a game', credit: 'Meg Doyle with U13 Girls Meg', tag: 'Planning', watched: true }, { len: '0:45', title: 'Asking instead of telling', credit: 'Ana Silva with U12 Girls Ana', tag: 'Talking' }],
    dayLessons: [{ len: '0:36', title: 'A team talk in 30 seconds', credit: 'Luke Fraser with U11 Luke', tag: 'Talking', watched: true }, { len: '0:58', title: 'Subs that keep minutes fair', credit: 'Mark Dunn with U9 Mark', tag: 'Minutes' }, { len: '0:44', title: 'What to say to the sideline', credit: 'Rachel Moore', tag: 'Parents' }],
    why: 'Your review found the same gap three weeks running. These show how coaches at Wattle Creek coach it, in words a 12-year-old uses.',
  },
  youth: {
    path: 'Coaching teenagers', done: 'two', next: 'giving a 15-year-old feedback they will take', support: '60 seconds. Then try it on Thursday.',
    week: 'tired legs after 60 minutes', tried: '“subs from minute 50”',
    weekLessons: [{ len: '0:55', title: 'Managing load in exam weeks', credit: 'Priya Shah, fitness coach', tag: 'Load' }, { len: '1:02', title: 'Playing out under a press', credit: 'Josh Kerr with U14 Josh', tag: 'Building out', watched: true }, { len: '0:47', title: 'One clip, one question', credit: 'Meg Doyle with U13 Girls Meg', tag: 'Talking' }],
    dayLessons: [{ len: '0:40', title: 'A team talk they finish for you', credit: 'Marko Petrovic with Men’s 1sts', tag: 'Talking', watched: true }, { len: '0:50', title: 'When to make the first sub', credit: 'Luke Fraser with U11 Luke', tag: 'Minutes' }, { len: '0:44', title: 'What to say to the sideline', credit: 'Rachel Moore', tag: 'Parents' }],
    why: 'Your last three reviews show the team fading late. These show how other coaches here spread the work.',
  },
  goalkeeper: {
    path: 'Coaching keepers of every age', done: 'three', next: 'coaching a turn in goal for under 9s, in two minutes', support: '55 seconds. Then try it at Tuesday’s keeper session.',
    week: 'keepers starting too deep on through balls', tried: '“start four metres higher”',
    weekLessons: [{ len: '0:50', title: 'Starting position, taught with two cones', credit: 'Rachel Moore', tag: 'Starting spots' }, { len: '1:02', title: 'Sweeping without rushing out', credit: 'Marko Petrovic with Men’s 1sts', tag: 'Through balls', watched: true }, { len: '0:44', title: 'A keeper session inside team training', credit: 'Josh Kerr with U14 Josh', tag: 'Planning' }],
    dayLessons: [{ len: '0:38', title: 'A warm-up that is not just shots', credit: 'Meg Doyle with U13 Girls Meg', tag: 'Warm-up', watched: true }, { len: '0:47', title: 'What to say after a mistake', credit: 'Rachel Moore', tag: 'Talking' }, { len: '0:41', title: 'Restarts in under six seconds', credit: 'Ollie Grant with U16 Ollie', tag: 'Distribution' }],
    why: 'Saturday’s film shows three keepers starting deep. These show how coaches at Wattle Creek coach it without a keeper coach on the day.',
  },
  seniors: {
    path: 'Leading a senior squad', done: 'four', next: 'using opposition film in ten minutes', support: '70 seconds. Then try it before Saturday.',
    week: 'chances given up from our own corners', tried: '“two stay back on corners”',
    weekLessons: [{ len: '1:04', title: 'Rest defence on your own corners', credit: 'Rachel Moore', tag: 'Set pieces' }, { len: '0:58', title: 'A press with three triggers', credit: 'Josh Kerr with U14 Josh', tag: 'Pressing', watched: true }, { len: '0:49', title: 'Film without the lecture', credit: 'Priya Shah, fitness coach', tag: 'Talking' }],
    dayLessons: [{ len: '0:42', title: 'Half-time in three points', credit: 'Rachel Moore', tag: 'Talking', watched: true }, { len: '0:55', title: 'Managing a player one yellow from a ban', credit: 'Ollie Grant with U16 Ollie', tag: 'Discipline' }, { len: '0:46', title: 'Subs when you are chasing the game', credit: 'Luke Fraser with U11 Luke', tag: 'Game plan' }],
    why: 'Two goals in the last three games came from your own corners. These show how coaches here set up behind the ball.',
  },
}

export function LearnForCoaches({ team, switchEl }: { team: LearnTeam; switchEl: ReactNode }) {
  const { say, el } = useToast()
  const [answer, setAnswer] = useState<string | null>(null)
  const [seen, setSeen] = useState<string[]>([])
  const c = COACH[team]
  const play = (l: Lesson) => { setSeen(s => s.includes(l.title) ? s : [...s, l.title]); say(`“${l.title}” plays, with three things to notice.`) }
  const mark = (ls: Lesson[]) => ls.map(l => ({ ...l, watched: l.watched || seen.includes(l.title) }))
  return (
    <div data-screen="EDU5-CoachCorner" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflowY: 'auto', background: '#faf5ec', fontFamily: 'var(--font-sans)' }}>
      <OpeningPanel
        heading="Learn · for coaches · your path, set by Rachel"
        sentence={`You are ${c.done} lessons into “${c.path}”. Next: ${c.next}.`}
        support={c.support}
        rightWidth={330}
        right={<>
          <span style={{ display: 'flex', justifyContent: 'flex-end' }}>{switchEl}</span>
          <span style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => say('The next lesson plays, then asks you to try one thing.')} style={{ flex: 1, height: 46, borderRadius: 12, border: 0, background: AMBER, color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Watch the next one</button>
            <button onClick={() => say('The six lessons on your path, in order.')} style={{ height: 46, padding: '0 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.7)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>All six</button>
          </span>
        </>}
      />
      <div style={{ padding: '12px 28px 20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 290px', gap: 14, alignItems: 'start' }}>
        <div>
          <div style={rowLabel}>This week, from your review: {c.week}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12, marginBottom: 14 }}>{mark(c.weekLessons).map(l => <LessonCard key={l.title} l={l} onPlay={() => play(l)} />)}</div>
          <div style={rowLabel}>{team === 'miniroos' ? 'Game day' : 'Match day'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>{mark(c.dayLessons).map(l => <LessonCard key={l.title} l={l} onPlay={() => play(l)} />)}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ ...side, border: `1.5px solid ${G}` }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>After you try it</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, margin: '6px 0 10px', lineHeight: 1.4 }}>How did {c.tried} go on Tuesday?</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Worked', 'Sort of', 'Didn’t'].map(a => (
                <button key={a} aria-pressed={answer === a} onClick={() => { setAnswer(a); say(a === 'Worked' ? 'Noted. Rachel can see you tried it.' : a === 'Sort of' ? 'Noted. The next lesson shows another way to start it.' : 'Noted. A note goes to Rachel so she can help.') }} style={{ flex: 1, height: 44, borderRadius: 10, border: `1.5px solid ${answer === a ? G : BORDER}`, background: answer === a ? PALE : '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{a}</button>
              ))}
            </div>
          </div>
          <div style={side}>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Why these</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5 }}>{c.why}</div>
          </div>
          <div style={{ ...side, background: '#eceeec', border: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Who is in them</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5 }}>Coaches who said yes to being filmed coaching. Children are blurred unless their family has said yes to club examples.</div>
          </div>
        </div>
      </div>
      {el}
    </div>
  )
}

// ── For players, where the full lesson library does not fit ─────────────────
// MiniRoos (lessons go to families) and the goalkeeper coach (lessons go to keepers).
type SimpleLesson = Lesson & { sent: string | null }
type PlayersCfg = { heading: string; sentence: string; support: string; lead: string; others: number; group: string; of: number; lessons: SimpleLesson[]; series: { title: string; of: number; done: number; sub: string }[]; statA: [number, string]; statB: [number, string]; statNote: string; fromTeam: string; makeNote: string }
const PLAYERS_SIMPLE: Record<'miniroos' | 'goalkeeper', PlayersCfg> = {
  miniroos: {
    heading: 'Learn · for your players · this fortnight: running with the ball',
    sentence: 'Ivy keeps her eyes up while she dribbles. Nine seconds every child can copy.',
    support: 'It goes to families with one game to play at home. Children under 12 have no account of their own.',
    lead: 'Eyes up while you dribble', others: 4, group: 'families', of: 10,
    lessons: [
      { len: '0:09', title: 'Eyes up while you dribble', credit: 'Ivy, your team · v Glenview Park', tag: 'Running with the ball', sent: '6 of 10 families watched' },
      { len: '0:08', title: 'Stop it with the sole', credit: 'A U9 Mark player', tag: 'First touch', sent: null },
      { len: '0:11', title: 'Turn away from a defender', credit: 'A U11 Luke player', tag: 'Running with the ball', sent: null },
      { len: '0:07', title: 'Pass to a friend, then move', credit: 'Zara, your team', tag: 'Passing', sent: '4 of 10 families watched' },
    ],
    series: [{ title: 'Running with the ball', of: 4, done: 2, sub: 'This fortnight' }, { title: 'First touch', of: 3, done: 0, sub: 'Next fortnight' }, { title: 'Having a shot', of: 3, done: 0, sub: 'Later this term' }],
    statA: [6, 'watched “Eyes up”'], statB: [4, 'played the game at home'], statNote: 'Counts only. Nobody is ranked, and no family sees another’s.',
    fromTeam: 'Ivy and Zara are club examples this term. Each family said yes. Leo and Arlo are never shown.',
    makeNote: 'Only something done well. Rachel checks it before the club sees it.',
  },
  goalkeeper: {
    heading: 'Learn · for your keepers · this week: starting higher',
    sentence: 'Ava started four metres higher on Saturday and swept up two through balls. Twelve seconds every keeper can copy.',
    support: 'It goes to your eight keepers with one thing to try at Tuesday’s session. Under 12s get it through their family.',
    lead: 'Starting spot for a through ball', others: 3, group: 'keepers', of: 8,
    lessons: [
      { len: '0:12', title: 'Starting spot for a through ball', credit: 'Ava, U12 Sam · v Ironbark United', tag: 'Starting spots', sent: '5 of 8 keepers watched' },
      { len: '0:09', title: 'Call early, then come and claim', credit: 'A U14 Josh keeper', tag: 'Crosses', sent: null },
      { len: '0:10', title: 'Roll it out in under six seconds', credit: 'Tom, U12 Sam', tag: 'Distribution', sent: '4 of 8 keepers watched' },
      { len: '0:08', title: 'Set your feet before the shot', credit: 'A Men’s 1sts keeper', tag: 'Shot stopping', sent: null },
    ],
    series: [{ title: 'Starting spots', of: 3, done: 1, sub: 'This month' }, { title: 'Dealing with crosses', of: 4, done: 0, sub: 'Next month' }, { title: 'Playing out with your feet', of: 4, done: 0, sub: 'Later this term' }],
    statA: [5, 'watched “Starting spot”'], statB: [3, 'tried it at training'], statNote: 'Each keeper sees only their own clips. Nobody is ranked.',
    fromTeam: 'Ava and Tom are club examples this term. Each said yes, and so did a parent.',
    makeNote: 'Only something done well. Rachel checks it before the club sees it.',
  },
}

export function LearnForPlayersSimple({ team, switchEl }: { team: 'miniroos' | 'goalkeeper'; switchEl: ReactNode }) {
  const { say, el } = useToast()
  const [sent, setSent] = useState<string[]>([])
  const [nudged, setNudged] = useState(false)
  const [skill, setSkill] = useState('All')
  const c = PLAYERS_SIMPLE[team]
  const skills = ['All', ...Array.from(new Set(c.lessons.map(l => l.tag)))]
  return (
    <div data-screen="EDU1-Learn" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflowY: 'auto', background: '#faf5ec', fontFamily: 'var(--font-sans)' }}>
      <OpeningPanel
        heading={c.heading}
        sentence={c.sentence}
        support={c.support}
        rightWidth={330}
        right={<>
          <span style={{ display: 'flex', justifyContent: 'flex-end' }}>{switchEl}</span>
          <span style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => say(`“${c.lead}” plays: watch, notice, try.`)} style={{ flex: 1, height: 46, borderRadius: 12, border: 0, background: AMBER, color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Watch it</button>
            <button onClick={() => { setNudged(true); say(`Sent to the ${c.others} ${c.group} who have not watched, with the thing to try.`) }} style={{ height: 46, padding: '0 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.7)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{nudged ? `Sent to ${c.others}` : `Send to the other ${c.others}`}</button>
          </span>
        </>}
      />
      <div style={{ padding: '12px 28px 20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 290px', gap: 14, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {skills.map(s => <button key={s} aria-pressed={s === skill} onClick={() => setSkill(s)} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1px solid ${s === skill ? G : BORDER}`, background: s === skill ? G : '#fff', color: s === skill ? '#fff' : INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{s}</button>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12, marginBottom: 14 }}>
            {c.lessons.filter(l => skill === 'All' || l.tag === skill).map(l => {
              const isSent = l.sent ?? (sent.includes(l.title) ? `Sent to ${c.of} ${c.group} just now` : null)
              return <LessonCard key={l.title} l={l} onPlay={() => { if (!isSent) setSent(s => [...s, l.title]); say(isSent ? `“${l.title}” plays: watch, notice, try.` : `“${l.title}” sent to all ${c.of} ${c.group}.`) }} footer={<span style={{ fontSize: 13, color: isSent ? G : MUT, fontWeight: isSent ? 700 : 400 }}>{isSent ?? `Not sent to ${c.group} yet · tap to send`}</span>} />
            })}
          </div>
          <div style={rowLabel}>A few lessons in order</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
            {c.series.map(s => (
              <button key={s.title} onClick={() => say(`${s.title}: ${s.of} short lessons, one a week.`)} style={{ ...side, padding: '12px 14px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><strong style={{ fontSize: 15, color: INK }}>{s.title}</strong><span style={{ fontSize: 13, color: MUT, flexShrink: 0 }}>{s.done} of {s.of}</span></span>
                <span style={{ display: 'flex', gap: 4, margin: '8px 0 6px' }}>{Array.from({ length: s.of }).map((_, i) => <span key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < s.done ? G : LN }} />)}</span>
                <span style={{ fontSize: 13, color: MUT }}>{s.sub}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={side}>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>Your {c.group} this {team === 'miniroos' ? 'fortnight' : 'week'}</div>
            <div style={{ display: 'flex', gap: 16 }}>
              {[c.statA, c.statB].map(([n, t]) => <div key={t}><div style={{ fontSize: 26, fontWeight: 700, color: INK }}>{n} <span style={{ fontSize: 14, fontWeight: 400, color: MUT }}>of {c.of}</span></div><div style={{ fontSize: 13, color: MUT, lineHeight: 1.35 }}>{t}</div></div>)}
            </div>
            <div style={{ fontSize: 13, color: MUT, marginTop: 10, lineHeight: 1.45 }}>{c.statNote}</div>
          </div>
          <div style={side}>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>From your {team === 'miniroos' ? 'team' : 'keepers'}</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.5 }}>{c.fromTeam}</div>
          </div>
          <button onClick={() => say('Pick a clip. Clean Sheet writes the first two points and Rachel checks it.')} style={{ ...side, background: G, border: 0, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
            <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#fff' }}>Make one from a clip</span>
            <span style={{ display: 'block', fontSize: 14, color: '#dcefe8', lineHeight: 1.45, marginTop: 4 }}>{c.makeNote}</span>
          </button>
        </div>
      </div>
      {el}
    </div>
  )
}

export default function LearnTab({ team = 'juniors', onNav, initialMode = 'players' }: { team?: LearnTeam; onNav?: (s: string) => void; initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const sw = <AudienceSwitch mode={mode} onMode={setMode} dark />
  if (mode === 'coaches') return <LearnForCoaches team={team} switchEl={sw} />
  if (team === 'miniroos' || team === 'goalkeeper') return <LearnForPlayersSimple team={team} switchEl={sw} />
  return <EDU1Learn bare onNav={onNav} audience={sw} />
}
