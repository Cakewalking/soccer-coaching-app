const G    = '#2f6252'
const G2   = '#40826d'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const BG   = '#f5f6f4'

type TeamType = 'juniors' | 'youth' | 'seniors'

interface Metric {
  label: string
  status: string
  value: string
  detail: string
}

interface PlayerRow {
  ini: string
  name: string
  metric: string
  val: string
}

interface WAData {
  teamLine: string
  summary: string
  lastFive: string
  metrics: Metric[]
  players: PlayerRow[]
}

const DATA: Record<TeamType, WAData> = {
  juniors: {
    teamLine: 'U12 Sam · from 9 recorded games this season',
    summary: 'Pressing is working, so keep it. The gap between the lines has not closed: tonight has two drills on staying compact.',
    lastFive: 'Last 5: won 3, drew 1, lost 1 · 3rd of 10',
    metrics: [
      { label: 'WINNING THE BALL BACK',      status: 'Needs work',     value: '7 seconds',       detail: 'Target 6. Fastest when Noah and Mia both press' },
      { label: 'PRESSING WINS IN THEIR HALF', status: 'Getting better', value: '13 a game',       detail: 'Up from 8 in round 1' },
      { label: 'GOAL KICKS PLAYED SHORT',    status: 'Getting better', value: '72%',              detail: 'Kept it for 3 passes or more on 6 of 10' },
      { label: 'GAP BETWEEN THE LINES',      status: 'Tonight',        value: '26 metres',        detail: 'Defence to midfield before their shots. Target 18' },
      { label: 'STRONG LAST 15 MINUTES',     status: 'About the same', value: '−31% sprints',detail: 'Sprints drop by a third late on' },
      { label: 'FAIR MINUTES',               status: 'Getting better', value: '14 of 16 players', detail: 'Over half of every game. Finn and Isla were under' },
    ],
    players: [
      { ini: 'AW', name: 'Ava',   metric: 'Passes forward',      val: '9, up from 6' },
      { ini: 'EB', name: 'Ella',  metric: 'Distance',            val: '4.6 km, her best' },
      { ini: 'FN', name: 'Finn',  metric: 'Minutes',             val: '27, up from 22' },
      { ini: 'GR', name: 'Grace', metric: 'Wins of the ball',    val: '7, up from 5' },
      { ini: 'JP', name: 'Jai',   metric: 'Shots on target',     val: '3, up from 1' },
      { ini: 'MT', name: 'Mia',   metric: 'Weaker-foot passes',  val: '8, up from 4' },
      { ini: 'NS', name: 'Noah',  metric: 'Sprints',             val: '12, at his cap' },
    ],
  },
  youth: {
    teamLine: 'U16 Ollie · from 7 recorded games this season',
    summary: 'Playing out is improving but the last 20 minutes are still the problem. Tonight focuses on staying compact late.',
    lastFive: 'Last 5: won 1, drew 1, lost 3 · Division 1',
    metrics: [
      { label: 'PLAYING OUT UNDER PRESSURE',  status: 'Getting better', value: '61% kept',    detail: 'Up from 44%. Still loose on the right side' },
      { label: 'CHANCES CREATED FROM WIDE',   status: 'Keep',           value: '6 a game',    detail: 'Best output this season, wide players on form' },
      { label: 'SPRINTS LAST 20 MINUTES',     status: 'Needs work',     value: '−31%',   detail: 'Legs drop significantly late — load issue' },
      { label: 'GOALS CONCEDED SET PIECES',   status: 'Tonight',        value: '4 of 7',      detail: 'Corners and free kicks. Working on shape' },
      { label: 'POSSESSION LOST IN OWN HALF', status: 'About the same', value: '9 a game',    detail: 'Was 11. Improvement but still the main risk' },
      { label: 'FAIR MINUTES',                status: 'Getting better', value: '11 of 14',    detail: 'Three players still under half-game average' },
    ],
    players: [
      { ini: 'CW', name: 'Cal',   metric: 'Passes forward',    val: '14, up from 9' },
      { ini: 'LB', name: 'Lena',  metric: 'Distance',          val: '5.2 km, her best' },
      { ini: 'RG', name: 'Ryan',  metric: 'Minutes',           val: 'Suspended Saturday' },
      { ini: 'TH', name: 'Theo',  metric: 'Shots on target',   val: '4, up from 2' },
      { ini: 'PO', name: 'Priya', metric: 'Wide chances',      val: '7, up from 4' },
    ],
  },
  seniors: {
    teamLine: "Men's 1sts · from 11 recorded games this season",
    summary: 'Pressing and building out are both improving. The corner routine needs work before Saturday.',
    lastFive: 'Last 5: won 3, drew 1, lost 1 · 4th of 12 · NPL 3',
    metrics: [
      { label: 'PRESSING WINS IN THEIR HALF', status: 'Getting better', value: '18 a game',    detail: 'Up from 11 in round 1. High-press shape holding' },
      { label: 'BUILDING OUT UNDER PRESS',    status: 'Getting better', value: '74% kept',     detail: 'Was 59%. Beat the first line on 3 of 4 attempts' },
      { label: 'CORNER ROUTINE GOALS',        status: 'Tonight',        value: '0 for 14',     detail: 'No goals from corners this season. Working on shape' },
      { label: 'SPRINTS LAST 20 MINUTES',     status: 'About the same', value: '−28%',    detail: 'Sprints drop late. Rotation plan in place' },
      { label: 'SET PIECE GOALS CONCEDED',    status: 'Needs work',     value: '4 of 7',       detail: 'More than half of goals let in come from set pieces' },
      { label: 'REGISTRATION WINDOW',         status: 'Admin',          value: '2 outstanding',detail: "Luca's clearance and Dean's card count need action" },
    ],
    players: [
      { ini: 'DB', name: 'Daniel', metric: 'Distance',         val: '7.4 km, his best' },
      { ini: 'JB', name: 'Josh',   metric: 'Shots on target',  val: '5, up from 3' },
      { ini: 'LC', name: 'Luca',   metric: 'Registration',     val: 'Clearance pending' },
      { ini: 'MP', name: 'Marco',  metric: 'Passes forward',   val: '22, up from 15' },
      { ini: 'SR', name: 'Stefan', metric: 'Wide chances',     val: '8, up from 5' },
    ],
  },
}

function statusColor(s: string) {
  if (s === 'Needs work') return { color: '#c39797', bg: '#fdf5f5' }
  if (s === 'Getting better') return { color: G2, bg: PALE }
  if (s === 'Tonight' || s === 'Admin') return { color: '#d97706', bg: '#fffbeb' }
  if (s === 'Keep') return { color: G2, bg: PALE }
  return { color: MUT, bg: BG }
}

export function WhereWeAtScreen({ teamType = 'juniors' }: { teamType?: TeamType }) {
  const d = DATA[teamType]
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', gap: 20, fontFamily: 'var(--font-sans)' }}>

      {/* Left: metrics */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Where we're at</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{d.teamLine}</div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['This season', 'Last month', 'Last game'].map((p, i) => (
            <button key={p} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: `1px solid ${i === 0 ? G : LN}`, background: i === 0 ? PALE : '#fff', fontSize: 13, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? G : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{p}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {d.metrics.map(m => {
            const sc = statusColor(m.status)
            return (
              <div key={m.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT, marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>{m.value}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{m.detail}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: sc.bg, color: sc.color, whiteSpace: 'nowrap', flexShrink: 0 }}>{m.status}</span>
              </div>
            )
          })}
        </div>

        <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 4 }}>What to do with it</div>
          <div style={{ fontSize: 14, color: INK, lineHeight: 1.6 }}>{d.summary}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button style={{ height: 40, padding: '0 14px', borderRadius: 10, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open tonight's plan</button>
            <button style={{ height: 40, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Last review</button>
            <button style={{ height: 40, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Change our style</button>
          </div>
        </div>

        <div style={{ fontSize: 13, color: MUT }}>{d.lastFive}</div>
      </div>

      {/* Right: Every player */}
      <div style={{ width: 300, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Every player</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>A to Z · the thing each one moved most, against their own last month</div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {d.players.map((p, i) => (
            <div key={p.ini} style={{ padding: '12px 14px', borderTop: i > 0 ? `1px solid ${LN}` : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{p.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{p.metric}</div>
                <div style={{ fontSize: 12, color: G2 }}>{p.val}</div>
              </div>
            </div>
          ))}
          <div style={{ padding: '10px 14px', borderTop: `1px solid ${LN}` }}>
            <button style={{ fontSize: 13, color: G, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>All {teamType === 'juniors' ? 16 : teamType === 'youth' ? 14 : 22} players</button>
          </div>
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8, lineHeight: 1.5 }}>In name order, never ranked. Players see only their own.</div>
      </div>
    </div>
  )
}

export function WhereWeAtScreenEmpty({ teamType = 'juniors' }: { teamType?: TeamType }) {
  const teamLine = teamType === 'juniors' ? 'U12 Sam' : teamType === 'youth' ? 'U16 Ollie' : "Men's 1sts"
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', fontFamily: 'var(--font-sans)' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Where we're at</div>
        <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{teamLine} · no games recorded yet</div>
      </div>

      <div style={{ background: PALE, borderRadius: 16, padding: '32px 24px', textAlign: 'center' as const, maxWidth: 480, marginBottom: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>Record one game to start</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>Clean Sheet measures the style you set and shows it here the day after. It gets clearer after three games.</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Record Saturday's game</button>
          <button style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Set our style</button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 12 }}>What you will see</div>
        {[
          { n: '1', title: 'Your style, in six numbers', body: 'Each with a trend and a target' },
          { n: '2', title: 'What to do about it', body: "Linked to tonight's plan" },
          { n: "3", title: "Every player's own trend", body: 'Never one against another' },
        ].map(s => (
          <div key={s.n} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: LN, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
              <div style={{ fontSize: 13, color: MUT }}>{s.body}</div>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 13, color: MUT, marginTop: 8 }}>The same screen for every age. Under 12s see how they play, never the score.</div>
      </div>
    </div>
  )
}
