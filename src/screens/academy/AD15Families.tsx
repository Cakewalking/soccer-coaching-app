// AD15-Families: Academy owner: what families think, and how far to trust it. Rebuilt from the board in pack v30 (25 Nov, 900 tall).
// COUNTED from the `survey` field of each player (five answers of 1 to 5, or none): how many answered, each question's average,
// how many gave 4 or 5, the lowest question by program with its number of answers and a proof mark (Strong at 50 answers or
// more, Estimate below), and every number in "How far can you trust these?". The family app writes an answer with `setSurvey`.
// The rule for every figure: a rate is only shown with its count, and under 30 answers the count is shown with no percentage.
// STILL SAMPLE: the week the survey went out, the comments, the players' "I enjoyed today" taps, and the reason offered for the lowest answer.
import { S, INK } from './adStyles'
import Tap from './Tap'
import { PROGRAMS, RATE_FROM, STRONG_FROM, pct, surveyOf, useAcademy } from './academyStore'
import { Bar, Cap, G, Head, LINE, Link, MAIN, MAUVE, Proof, Tile } from './kit'

const one = (v: number) => (Math.round(v * 10) / 10).toFixed(1)
/** An average below 4 is drawn in mauve: most families did not give 4 or 5. */
const low = (v: number) => Math.round(v * 10) / 10 < 4
const width = (v: number) => Math.round((Math.round(v * 10) / 10 - 1) / 4 * 100)
// Sample: comments are optional and are not in the list. Shown with the program, never the name.
const COMMENTS: [string, string][] = [['He asks to go early now. Whatever Reece is doing, keep doing it.', 'A U13 Timber parent'], ['We’d do more at home if we knew what. A short video would help.', 'A Development parent'], ['Four nights a week is a lot with a sister at 5:30 as well.', 'A family with two children']]
// Sample: the players' own tap on the coach's tablet on the way out (ADK3). Not in the list yet.
const ENJOYED = { pct: 88, taps: '1,480', players: 219 }

export default function AD15Families() {
  const a = useAcademy(), all = surveyOf(a, a.players), silent = all.of - all.n
  const lowest = all.q.reduce((k, q, i) => q.avg < all.q[k].avg ? i : k, 0)
  const progs = PROGRAMS.map(p => { const s = surveyOf(a, a.players.filter(x => x.program === p)); return { p, n: s.n, avg: s.q[lowest]?.avg ?? 0 } }).filter(x => x.n > 0)
  const teams = a.groups.map(g => surveyOf(a, a.players.filter(x => x.group === g.id)).n).filter(n => n > 0)
  const quiet = a.players.filter(p => !p.survey && p.term3 !== 'Staying').length
  const range = (v: number[]) => v.length ? (Math.min(...v) === Math.max(...v) ? `${v[0]}` : `${Math.min(...v)} to ${Math.max(...v)}`) : '0'
  const gave = (top: number) => all.n >= RATE_FROM ? `${pct(top, all.n)}% gave 4 or 5` : `${top} of ${all.n} gave 4 or 5`
  const dot = <span style={{ flex: 'none', width: 6, height: 6, borderRadius: 999, background: G, marginTop: 7 }} />
  const point = { display: 'flex', gap: 8, fontSize: 13, lineHeight: '19px', color: INK } as const
  return (
    <main style={{ ...MAIN, minHeight: 792, boxSizing: 'border-box' }}>
      <Head title="What families think" sub={`Term 2, week 6 · ${all.n} of ${all.of} families answered · five questions, one minute, in the family app`}>
        <Tap to="ADP11-Survey" style={S.more}>See what families answer</Tap>
        {silent > 0 && <Tap say={`Reminder sent to ${silent} ${silent === 1 ? 'family' : 'families'}. It takes one minute.`} style={S.primary}>Remind the {silent} who haven’t</Tap>}
      </Head>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <Tile title="Out of 5" right={<Proof kind={all.n >= STRONG_FROM ? 'Strong' : 'Estimate'} />}>
            {all.n === 0 && <Cap style={{ borderTop: `1px solid ${LINE}`, paddingTop: 8 }}>No family has answered yet.</Cap>}
            {all.n > 0 && all.q.map((q, k) => (
              <div key={q.text} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 150px 44px 150px', gap: 12, alignItems: 'center', minHeight: 38, borderTop: `1px solid ${LINE}`, ...(k === lowest && low(q.avg) ? { background: MAUVE, margin: '0 -8px', padding: '0 8px', borderRadius: 8, fontWeight: 700 } : null) }}>
                <span style={{ fontSize: 15 }}>{q.text}</span>
                <Bar pct={width(q.avg)} low={low(q.avg)} w={150} />
                <strong style={{ ...S.num, fontSize: 16 }}>{one(q.avg)}</strong>
                <span style={{ fontSize: 13, color: '#33443f' }}>{gave(q.top)}</span>
              </div>
            ))}
            <Cap style={{ paddingTop: 6 }}>Each is the average of {all.n} {all.n === 1 ? 'answer' : 'answers'}. A parent taps 1 to 5 for each line. Answers are never shown by family.</Cap>
          </Tile>
          <Tile title={`The lowest, by program: “${all.q[lowest]?.text ?? ''}”`} right={<Link to="ADC6-HomePractice">Turn weekly practice on</Link>}>
            {progs.map(x => (
              <div key={x.p} style={{ display: 'grid', gridTemplateColumns: '130px 110px minmax(0,1fr) 44px 90px', gap: 12, alignItems: 'center', minHeight: 36, borderTop: `1px solid ${LINE}`, fontSize: 14 }}>
                <strong>{x.p}</strong>
                <span style={{ color: '#33443f' }}>{x.n} {x.n === 1 ? 'answer' : 'answers'}</span>
                <span><Bar pct={width(x.avg)} low={low(x.avg)} w={200} /></span>
                <strong style={S.num}>{one(x.avg)}</strong>
                <Proof kind={x.n >= STRONG_FROM ? 'Strong' : 'Estimate'} />
              </div>
            ))}
            <Cap style={{ paddingTop: 4 }}>{lowest === 4 ? 'Advanced coaches set a weekly practice. Development coaches do not yet. That is the likely reason, not a proven one.' : 'Strong is 50 answers or more. Estimate is fewer, so read it as a pointer.'}</Cap>
          </Tile>
          <section aria-label="How far can you trust these?" style={{ ...S.tile, gap: 5, padding: '12px 16px', flexGrow: 1 }}>
            <h2 style={S.h2}>How far can you trust these?</h2>
            <span style={point}>{dot}<span><strong>{all.n} of {all.of} answered{all.of >= RATE_FROM ? ` (${pct(all.n, all.of)}%)` : ''}.</strong> An academy-wide average is good to about 0.1 either way.</span></span>
            <span style={point}>{dot}<span><strong>By program there are {range(progs.map(x => x.n))} answers each,</strong> so treat a gap under 0.3 as no gap. A single team has {range(teams)}: too few for a score, so teams are never shown as a number.</span></span>
            <span style={point}>{dot}<span><strong>The {silent} who did not answer are not like the rest.</strong> {quiet} of them have also not said yes to Term 3, so the true picture is a little lower.</span></span>
          </section>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <Tile title="In their words" right={<Cap>64 comments</Cap>}>
            {COMMENTS.map(([said, who]) => (
              <div key={who} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 0', borderTop: `1px solid ${LINE}` }}>
                <span style={{ fontSize: 14, lineHeight: '20px' }}>“{said}”</span>
                <span style={{ fontSize: 12, color: '#4a5a57' }}>{who}</span>
              </div>
            ))}
            <Cap style={{ paddingTop: 4 }}>Comments are optional. They are shown with the program, never the name.</Cap>
          </Tile>
          <section aria-label="From the players" style={{ ...S.tile, gap: 4, padding: '12px 16px', flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>From the players</h2><Proof kind="Strong" /></div>
            <strong style={{ fontSize: 18, lineHeight: '24px' }}>{ENJOYED.pct}% tapped “I enjoyed today”</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{ENJOYED.taps} taps from {ENJOYED.players} players in the last 2 weeks. One tap on the coach’s tablet on the way out.</span>
            <span style={{ display: 'flex', paddingTop: 6 }}><Tap to="ADK3-EnjoyedToday" style={S.more}>See what players tap</Tap></span>
            <Cap style={{ marginTop: 'auto' }}>Shown by team only when 8 or more players tapped. Never by child.</Cap>
          </section>
        </div>
      </div>
    </main>
  )
}
