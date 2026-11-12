const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'

const ROWS = [
  {
    tool: 'Our style',
    mr: 'Six choices in children\'s words. Pick three',
    jr: 'Six choices',
    yt: 'Six choices',
    sr: 'Six choices',
  },
  {
    tool: 'Where we\'re at',
    mr: 'How we play. Never the score',
    jr: 'Game review',
    yt: 'Three things we saw. No score',
    sr: 'With the opposition',
  },
  {
    tool: 'Clips',
    mr: 'A best moment for every child',
    jr: 'Record tab',
    yt: 'Tablet camera is enough',
    sr: 'Tablet camera is enough',
  },
  {
    tool: 'Suggested training',
    mr: 'Fun games, from the review',
    jr: 'Drills, from the review',
    yt: 'Drills, from the review',
    sr: 'Drills, from the review',
  },
  {
    tool: 'Player page',
    mr: 'Against their own last month. No ratings',
    jr: 'Against their own last month. No ratings',
    yt: 'Adult decides who sees it',
    sr: 'Adult decides who sees it',
  },
  {
    tool: 'Player goals',
    mr: 'One, in the child\'s words',
    jr: 'One, in the child\'s words',
    yt: 'One, in the child\'s words',
    sr: 'One, in the child\'s words',
  },
  {
    tool: 'Line-ups that worked',
    mr: 'Turns: everyone starts, plays in goal and is captain',
    jr: 'Coach only',
    yt: 'Coach only',
    sr: 'Coach only',
  },
  {
    tool: 'Growth and load',
    mr: 'Height only. No load targets',
    jr: 'Sprint caps while growing',
    yt: 'Sprint caps while growing',
    sr: '—',
  },
  {
    tool: 'Messages and Ask Clean Sheet',
    mr: 'Coach and parents',
    jr: 'Coach and parents',
    yt: 'Players 15 and over too',
    sr: 'Players 15 and over too',
  },
]

const NOTES = [
  { n: '1', title: 'Scores and ladders', body: 'None under 12. The numbers are about how we play' },
  { n: '2', title: 'Comparing children', body: 'Never. Each child against their own past' },
  { n: '3', title: 'Game time', body: 'Equal turns, then a fair share, then the coach\'s call' },
  { n: '4', title: 'Words', body: 'Games not drills, friends not team-mates' },
]

export default function PAR0SameTools() {
  return (
    <div style={{ width: 1180, minHeight: 820, background: '#f5f6f4', fontFamily: 'var(--font-sans)', padding: '32px 40px', boxSizing: 'border-box', overflowY: 'auto' }}>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: INK, letterSpacing: '-0.03em', marginBottom: 6 }}>Every coach gets the same tools</div>
        <div style={{ fontSize: 15, color: MUT, lineHeight: 1.6, maxWidth: 680 }}>Same tabs, same places, from under 6 to seniors. What changes with age is the wording and the rules, never whether a coach has the tool.</div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
          <thead>
            <tr style={{ background: GD }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' as const, fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', width: 180 }}>Tool</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' as const, fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)' }}>MiniRoos · u6–u11</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' as const, fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)' }}>Juniors · u12–u13</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' as const, fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)' }}>Youth · u14–u18</th>
              <th style={{ padding: '12px 16px', textAlign: 'left' as const, fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)' }}>Seniors and NPL</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.tool} style={{ borderTop: `1px solid ${LN}`, background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700, color: INK, verticalAlign: 'top' as const }}>{row.tool}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: G, verticalAlign: 'top' as const }}>{row.mr}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: MUT, verticalAlign: 'top' as const }}>{row.jr}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: MUT, verticalAlign: 'top' as const }}>{row.yt}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: MUT, verticalAlign: 'top' as const }}>{row.sr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The same bar */}
      <div style={{ background: PALE, border: `1px solid #c5d9d2`, borderRadius: 14, padding: '16px 20px', marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 4 }}>The same bar for every coach</div>
        <div style={{ fontSize: 14, color: G, lineHeight: 1.6 }}>Home, Squad, Training, Match day, Clips, Record. Under Home: Overview, Messages, Calendar, Fixtures, Our style, Where we're at, Team staff. MiniRoos say "Game day".</div>
      </div>

      {/* What age changes */}
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>What age changes</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {NOTES.map(n => (
            <div key={n.n} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', display: 'flex', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{n.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>{n.title}</div>
                <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>{n.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <button style={{ fontSize: 14, color: G, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>See it for MiniRoos →</button>
        </div>
      </div>
    </div>
  )
}
