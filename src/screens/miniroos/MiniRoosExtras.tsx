import { openThing } from '../openThing'
import { useState } from 'react'
import { PLAYERS } from './squadData'

// MiniRoos versions of what the older teams' coaches get under Squad and Training:
// Skills (their Development goals), Fair turns (their minutes), This week and
// Games library. Same rule as the rest of MiniRoos: no ratings, rankings or scores.

const INK = '#10211f', MUT = '#4a5a57', LN = '#e9eae8', G = '#2f6252', GD = '#1f4a3e', PALE = '#eef5f2', SAND = '#e8cfcf', SANDBG = '#f6f1e9'
const card: React.CSSProperties = { background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px' }
const btn: React.CSSProperties = { height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }
const btnP: React.CSSProperties = { ...btn, border: 0, background: G, color: '#fff' }
const first = (n: string) => n.split(' ')[0]

function useToast() {
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3000) }
  const el = toast ? <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', maxWidth: 560, textAlign: 'center' }}>{toast}</div> : null
  return { say, el }
}

function Page({ title, sub, right, children, foot }: { title: string; sub: string; right?: React.ReactNode; children: React.ReactNode; foot?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
      <div style={{ flex: 'none', padding: '14px 28px 12px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>{title}</h1>
          <div style={{ fontSize: 14, color: MUT, marginTop: 2 }}>{sub}</div>
        </div>
        {right}
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '0 28px 20px' }}>{children}</div>
      {foot && <div style={{ flex: 'none', borderTop: `1px solid ${LN}`, padding: '10px 28px', background: '#fff', fontSize: 13, color: MUT }}>{foot}</div>}
    </div>
  )
}

function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ flexGrow: 1, padding: '28px 32px', overflowY: 'auto' }}>
      <div style={{ ...card, maxWidth: 500, padding: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>{title}</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>{body}</div>
      </div>
    </div>
  )
}

// ── Squad › Skills ──────────────────────────────────────────────────────────
// One small thing per child, in words a seven-year-old would use. Three steps, no marks.
export const STEPS = ['Having a go', 'Does it at training', 'Does it in games'] as const
export const SKILLS: Record<string, { skill: string; step: 0 | 1 | 2; say: string; saw: string }> = {
  IC: { skill: 'Look up while dribbling', step: 2, say: 'Eyes up, Ivy. Who is free?', saw: 'Sun 31 May: beat one and found Zara' },
  MB: { skill: 'Soft first touch', step: 1, say: 'Cushion it, Max. Like catching an egg.', saw: 'Tuesday: stopped 6 of 8 dead' },
  AK: { skill: 'Stop the ball with the sole', step: 0, say: 'Foot on top, Arlo. Squash it.', saw: 'New this term: second week of trying' },
  ZM: { skill: 'Pass with the other foot', step: 1, say: 'Left foot this time, Zara.', saw: 'Tuesday: five left-foot passes in the gates game' },
  LW: { skill: 'Call for the ball', step: 0, say: 'Big voice, Leo. Say Zara’s name.', saw: 'Sun 31 May: called once, and got it' },
  EN: { skill: 'Use the right foot too', step: 1, say: 'Right foot for this one, Evie.', saw: 'Tuesday: scored with her right in the small game' },
  TS: { skill: 'Find a friend before the wall', step: 1, say: 'Head up, Theo. Who is your friend?', saw: 'Sun 31 May: two passes instead of two shots' },
  PD: { skill: 'Take the first kick-off', step: 0, say: 'Your ball to start, Poppy.', saw: 'Tuesday: took it, with Zara next to her' },
  OH: { skill: 'Turn away from a defender', step: 1, say: 'Show them your back, Omar.', saw: 'Sun 24 May: turned twice in the last game' },
  JL: { skill: 'Stay on the ball when it is busy', step: 2, say: 'Keep it close, Jude. Little touches.', saw: 'Sun 31 May: kept it under pressure three times' },
}

export function SkillsMiniRoos({ empty }: { empty?: boolean }) {
  const { say, el } = useToast()
  const [sel, setSel] = useState('PD')
  const [steps, setSteps] = useState<Record<string, number>>(() => Object.fromEntries(Object.entries(SKILLS).map(([k, v]) => [k, v.step])))
  if (empty) return <Empty title="Skills appear once you have players" body="Each child gets one small thing to practise, in their own words. You move it on when you see it. No marks, no scores." />
  const p = PLAYERS.find(x => x.ini === sel)!, s = SKILLS[sel]
  const counts = STEPS.map((_, i) => Object.values(steps).filter(v => v === i).length)
  return (
    <Page title="Skills" sub="One small thing each · this fortnight: running with the ball"
      right={<><button style={btn} onClick={() => say('Pick a new fortnight focus: first touch, passing, or shooting.')}>Change the focus</button><button style={btnP} onClick={() => say('Each family gets their own child’s skill, and one game to play at home.')}>Tell the families</button></>}
      foot="No ratings, rankings or scores at this age. A step moves on when you have seen it, and never moves back.">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, marginBottom: 12 }}>
            {STEPS.map((label, i) => (
              <div key={label} style={{ ...card, padding: '12px 14px' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: INK }}>{counts[i]}</div>
                <div style={{ fontSize: 13, color: MUT }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
            {PLAYERS.map((pl, i) => {
              const sk = SKILLS[pl.ini], on = pl.ini === sel
              return (
                <button key={pl.ini} onClick={() => setSel(pl.ini)} aria-pressed={on} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, padding: '8px 16px', border: 0, borderTop: i ? `1px solid ${LN}` : 0, background: on ? PALE : '#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                  <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: SAND, color: INK, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{pl.ini}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: INK }}>{pl.name}</span>
                    <span style={{ display: 'block', fontSize: 13, color: MUT }}>{sk.skill}</span>
                  </span>
                  <span style={{ flex: 'none', display: 'flex', gap: 4 }} aria-label={STEPS[steps[pl.ini]]}>
                    {STEPS.map((_, k) => <span key={k} style={{ width: 22, height: 8, borderRadius: 4, background: k <= steps[pl.ini] ? '#40826d' : LN }} />)}
                  </span>
                  <span style={{ flex: 'none', width: 130, fontSize: 12, color: MUT, textAlign: 'right' }}>{STEPS[steps[pl.ini]]}</span>
                </button>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>{p.name}</div>
              <div style={{ fontSize: 13, color: MUT }}>{s.skill}</div>
            </div>
            <div style={{ background: PALE, borderRadius: 10, padding: '10px 12px', fontSize: 13, lineHeight: '18px', color: GD }}><strong>Say it like this:</strong> “{s.say}”</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}><strong style={{ color: INK }}>Last seen.</strong> {s.saw}</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}><strong style={{ color: INK }}>What helps.</strong> {p.helpNote}</div>
          </div>
          <button style={{ ...btnP, width: '100%' }} disabled={steps[sel] === 2} onClick={() => { setSteps(v => ({ ...v, [sel]: Math.min(2, v[sel] + 1) })); say(`${first(p.name)} moved on: ${STEPS[Math.min(2, steps[sel] + 1)].toLowerCase()}.`) }}>{steps[sel] === 2 ? 'Doing it in games' : 'I saw it: move on a step'}</button>
          <button style={{ ...btn, width: '100%' }} onClick={() => say(`Pick a new skill for ${first(p.name)}. The old one stays in the season notes.`)}>Choose a different skill</button>
        </div>
      </div>
      {el}
    </Page>
  )
}

// ── Squad › Fair turns ──────────────────────────────────────────────────────
// Five games so far this term, four quarters each. Who has played, been in goal, been captain.
export const TURNS: Record<string, { games: number; quarters: number; goal: number; started: number }> = {
  IC: { games: 5, quarters: 15, goal: 1, started: 4 }, MB: { games: 5, quarters: 15, goal: 0, started: 5 },
  AK: { games: 2, quarters: 6, goal: 0, started: 2 },  ZM: { games: 5, quarters: 16, goal: 1, started: 4 },
  LW: { games: 5, quarters: 14, goal: 0, started: 3 }, EN: { games: 5, quarters: 15, goal: 1, started: 5 },
  TS: { games: 5, quarters: 16, goal: 1, started: 4 }, PD: { games: 4, quarters: 11, goal: 1, started: 2 },
  OH: { games: 4, quarters: 12, goal: 0, started: 3 }, JL: { games: 5, quarters: 15, goal: 0, started: 3 },
}

export function FairTurnsMiniRoos({ empty, onTurns }: { empty?: boolean; onTurns?: () => void }) {
  const { say, el } = useToast()
  if (empty) return <Empty title="Turns are counted for you" body="After the first game, this shows how much each child has played, and who is due a turn in goal or as captain." />
  const rows = PLAYERS.map(p => ({ p, t: TURNS[p.ini], share: TURNS[p.ini].quarters / (TURNS[p.ini].games * 4) }))
  const dueGoal = rows.filter(r => r.t.goal === 0), dueCap = rows.filter(r => !r.p.hadCaptain)
  const low = rows.filter(r => r.share < 0.72)
  return (
    <Page title="Fair turns" sub="5 games this term · quarters of 10 minutes · 7 on the pitch, 10 in the squad"
      right={<><button style={btn} onClick={() => say('A one-page summary is ready to share with families: turns only, no scores.')}>Share with families</button><button style={btnP} onClick={() => onTurns ? onTurns() : openThing('Sunday’s turns', 'mini')}>Set Sunday’s turns</button></>}
      foot="Everyone plays at least half of every game they come to. Turns in goal and as captain go round the whole squad each term.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, marginBottom: 12 }}>
        <div style={{ ...card, padding: '12px 14px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: INK }}>{rows.length - low.length} of {rows.length}</div>
          <div style={{ fontSize: 13, color: MUT }}>have played three quarters in four, or more</div>
        </div>
        <div style={{ ...card, padding: '12px 14px', background: dueGoal.length ? SANDBG : '#fff', borderColor: dueGoal.length ? SAND : '#c5c8c4' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: INK }}>{dueGoal.length} due in goal</div>
          <div style={{ fontSize: 13, color: MUT }}>{dueGoal.map(r => first(r.p.name)).join(', ')}</div>
        </div>
        <div style={{ ...card, padding: '12px 14px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: INK }}>{dueCap.length} due as captain</div>
          <div style={{ fontSize: 13, color: MUT }}>{dueCap.map(r => first(r.p.name)).join(', ')}</div>
        </div>
      </div>
      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(150px,1.3fr) 90px minmax(160px,2fr) 90px 90px 90px', padding: '10px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT, borderBottom: `1px solid ${LN}` }}>
          <span>Player</span><span>Games</span><span>Quarters played</span><span>Started</span><span>In goal</span><span>Captain</span>
        </div>
        {rows.map(({ p, t, share }, i) => (
          <div key={p.ini} style={{ display: 'grid', gridTemplateColumns: 'minmax(150px,1.3fr) 90px minmax(160px,2fr) 90px 90px 90px', alignItems: 'center', minHeight: 48, padding: '0 16px', borderTop: i ? `1px solid ${LN}` : 0, fontSize: 14, color: INK }}>
            <span style={{ fontWeight: 700 }}>{p.name}</span>
            <span>{t.games} of 5</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, paddingRight: 16 }}>
              <span style={{ flexGrow: 1, height: 8, borderRadius: 4, background: LN, overflow: 'hidden' }}><span style={{ display: 'block', width: `${Math.round(share * 100)}%`, height: '100%', borderRadius: 4, background: share < 0.72 ? '#b89a5a' : '#40826d' }} /></span>
              <span style={{ flex: 'none', width: 62, fontSize: 13, color: MUT, fontVariantNumeric: 'tabular-nums' }}>{t.quarters} of {t.games * 4}</span>
            </span>
            <span>{t.started}</span>
            <span style={{ color: t.goal ? INK : '#7a5f24', fontWeight: t.goal ? 400 : 700 }}>{t.goal ? `${t.goal} turn` : 'Due'}</span>
            <span style={{ color: p.hadCaptain ? INK : '#7a5f24', fontWeight: p.hadCaptain ? 400 : 700 }}>{p.hadCaptain ? 'Had a turn' : 'Due'}</span>
          </div>
        ))}
      </div>
      {low.length > 0 && (
        <div style={{ ...card, background: SANDBG, borderColor: SAND, marginTop: 12, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flexGrow: 1, minWidth: 240, fontSize: 14, color: INK, lineHeight: 1.5 }}><strong>{low.map(r => first(r.p.name)).join(' and ')}</strong> {low.length === 1 ? 'has' : 'have'} played a little less than the others. Start {low.length === 1 ? 'them' : 'them both'} on Sunday and it evens out.</div>
          <button style={btn} onClick={() => say(`${low.map(r => first(r.p.name)).join(' and ')} will start on Sunday. Change it any time in Turns.`)}>Start them Sunday</button>
        </div>
      )}
      {el}
    </Page>
  )
}

// ── Training › This week ────────────────────────────────────────────────────
const WEEK = [
  { day: 'Mon', date: '1 Jun', what: '', note: '' },
  { day: 'Tue', date: '2 Jun', what: 'Training · 5:00–5:45 pm', note: 'Done · 9 came · running with the ball', done: true },
  { day: 'Wed', date: '3 Jun', what: '', note: '' },
  { day: 'Thu', date: '4 Jun', what: 'Training · 5:00–5:45 pm', note: 'Tonight · 9 coming · 4 games ready', today: true },
  { day: 'Fri', date: '5 Jun', what: '', note: '' },
  { day: 'Sat', date: '6 Jun', what: '', note: 'Meet time goes to families at 6:00 pm' },
  { day: 'Sun', date: '7 Jun', what: 'Game · 8:30 am at Northgate City', note: 'Redgum Reserve · 7 coming, 1 maybe · needs a game leader' },
]

export function WeekMiniRoos({ empty, onTonight }: { empty?: boolean; onTonight?: () => void }) {
  const { say, el } = useToast()
  if (empty) return <Empty title="Your week appears here" body="Once training times and fixtures are in, this shows the week in one place, with what is left to do before Sunday." />
  const jobs = [
    { t: 'Find a game leader for Sunday', s: 'A parent or a 14-year-old with the course. Zoe Park is free.', b: 'Ask Zoe', m: 'Asked Zoe Park to lead Sunday’s game.' },
    { t: 'Chase one answer', s: 'Jude’s family have not replied about Sunday.', b: 'Remind', m: 'Reminder sent to Jude’s family.' },
    { t: 'Oranges and kit', s: 'Leo’s family have oranges, Jude’s family have the kit bag.', b: 'Nudge both', m: 'A friendly nudge went to both families.' },
  ]
  return (
    <Page title="This week" sub="Mon 1 to Sun 7 June · two sessions and one game · fortnight focus: running with the ball"
      right={<button style={btnP} onClick={() => onTonight ? onTonight() : openThing('tonight’s session', 'mini')}>Open tonight</button>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 20, alignItems: 'start' }}>
        <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
          {WEEK.map((d, i) => (
            <div key={d.day} style={{ display: 'flex', alignItems: 'center', gap: 14, minHeight: 60, padding: '8px 16px', borderTop: i ? `1px solid ${LN}` : 0, background: d.today ? PALE : '#fff' }}>
              <div style={{ flex: 'none', width: 56 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{d.day}</div>
                <div style={{ fontSize: 12, color: MUT }}>{d.date}</div>
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: d.what ? 700 : 400, color: d.what ? INK : '#8a9794' }}>{d.what || 'Nothing on'}</div>
                {d.note && <div style={{ fontSize: 13, color: MUT }}>{d.note}</div>}
              </div>
              {d.today && <span style={{ flex: 'none', fontSize: 12, fontWeight: 700, color: G, background: '#fff', border: `1px solid ${G}`, borderRadius: 999, padding: '3px 10px' }}>Today</span>}
              {d.done && <span style={{ flex: 'none', fontSize: 12, fontWeight: 700, color: MUT }}>Done</span>}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={card}>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Before Sunday</div>
            {jobs.map((j, i) => (
              <div key={j.t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: i ? `1px solid ${LN}` : 0 }}>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{j.t}</div>
                  <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>{j.s}</div>
                </div>
                <button style={{ ...btn, flex: 'none' }} onClick={() => say(j.m)}>{j.b}</button>
              </div>
            ))}
          </div>
          <div style={{ ...card, background: PALE, borderColor: '#c9ddd4' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 4 }}>Two short sessions beat one long one</div>
            <div style={{ fontSize: 13, color: GD, lineHeight: 1.5 }}>45 minutes, a ball each, four games. If the week gets busy, drop a session, not the fun.</div>
          </div>
        </div>
      </div>
      {el}
    </Page>
  )
}

// ── Training › Games library ────────────────────────────────────────────────
const GAMES = [
  { name: 'Traffic lights dribble', skill: 'Running with the ball', mins: 10, kit: 'A ball each', how: 'Green: go. Red: foot on the ball. Amber: toe taps.', tonight: true },
  { name: 'Treasure island', skill: 'Running with the ball', mins: 10, kit: '10 balls, 4 cone islands', how: 'Balls are treasure in the middle. Dribble one back to your island.', tonight: true },
  { name: 'Gates galore', skill: 'Running with the ball', mins: 10, kit: '20 cones', how: 'Dribble through as many cone gates as you can in a minute.', tonight: true },
  { name: '4 v 4 four-goal game', skill: 'Small game', mins: 15, kit: '4 small goals, bibs', how: 'Two small goals each end. No keepers. Let them play.', tonight: true },
  { name: 'Pirates', skill: 'Keeping the ball', mins: 8, kit: 'A ball each', how: 'Two pirates try to kick balls out of the ship. Lose yours, become a pirate.' },
  { name: 'Pass and move squares', skill: 'Passing', mins: 10, kit: '8 cones, 4 balls', how: 'Pass to a friend, run to a new square. Count ten passes.' },
  { name: 'Knock down the castles', skill: 'Passing', mins: 10, kit: '10 tall cones', how: 'Pass to knock the other team’s cones over. First to five.' },
  { name: 'Sharks and minnows', skill: 'Running with the ball', mins: 8, kit: 'A ball each', how: 'Minnows dribble across. Sharks steal. Caught minnows become sharks.' },
  { name: 'Numbers shoot-out', skill: 'Shooting', mins: 10, kit: '2 small goals', how: 'Call a number, those players race for the ball and shoot.' },
  { name: 'Stuck in the mud', skill: 'Fun warm-up', mins: 6, kit: 'A ball each', how: 'Tagged? Hold the ball up. A friend passes through your legs to free you.' },
  { name: 'First touch boxes', skill: 'First touch', mins: 8, kit: '12 cones, 5 balls', how: 'A friend rolls it in. One touch to take it out of your box.' },
  { name: '2 v 1 to the line', skill: 'Small game', mins: 10, kit: 'Cones, bibs', how: 'Two attackers, one defender. Dribble over the line to score.' },
]

export function GamesLibraryMiniRoos({ empty }: { empty?: boolean }) {
  const { say, el } = useToast()
  const [skill, setSkill] = useState('All')
  const [added, setAdded] = useState<string[]>([])
  if (empty) return <Empty title="Games for this age" body="Short games with a ball each, sorted by skill. Add one to a session with a tap." />
  const skills = ['All', ...Array.from(new Set(GAMES.map(g => g.skill)))]
  const list = GAMES.filter(g => skill === 'All' || g.skill === skill)
  return (
    <Page title="Games library" sub={`${GAMES.length} games for under 9s · a ball each, no laps, no lines`}
      right={<button style={btn} onClick={() => say('Write your own game: a name, what you need, and how it works.')}>+ Add your own</button>}
      foot="From the national curriculum’s Discovery phase. Every game has an easier and a harder version inside.">
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {skills.map(s => <button key={s} aria-pressed={s === skill} onClick={() => setSkill(s)} style={{ ...btn, borderRadius: 999, background: s === skill ? G : '#fff', color: s === skill ? '#fff' : INK, borderColor: s === skill ? G : '#c5c8c4' }}>{s}</button>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
        {list.map(g => {
          const inPlan = g.tonight || added.includes(g.name)
          return (
            <div key={g.name} style={{ ...card, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: INK, flexGrow: 1 }}>{g.name}</span>
                <span style={{ fontSize: 12, color: MUT, flex: 'none' }}>{g.mins} min</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: G }}>{g.skill}</div>
              <div style={{ fontSize: 13, color: MUT, lineHeight: 1.45, flexGrow: 1 }}>{g.how}</div>
              <div style={{ fontSize: 12, color: MUT }}>You need: {g.kit}</div>
              <button style={{ ...(inPlan ? btn : btnP), marginTop: 4 }} onClick={() => { if (g.tonight) { say(`${g.name} is already in tonight’s session.`); return } setAdded(a => a.includes(g.name) ? a.filter(n => n !== g.name) : [...a, g.name]); say(added.includes(g.name) ? `${g.name} taken out of Tuesday’s session.` : `${g.name} added to Tuesday’s session.`) }}>{g.tonight ? 'In tonight’s session' : added.includes(g.name) ? 'Added · take it out' : 'Add to next session'}</button>
            </div>
          )
        })}
      </div>
      {el}
    </Page>
  )
}
