// What a dashboard shows when there is nothing to show yet (dashboards handover, v23).
// Always the same: a heading, one sentence on what will appear, one button, and a short list beside it.
//   RD2e the season so far · RD3e the MiniRoos review · RD4e the club's weekend · ADC7e the academy coach's review
// X8-ReviewEmpty stays the empty state for RD1, and RD5e (the phone) is drawn in RD5CoachPhoneReview.

import { Head, Page, Primary, TileHead } from '../academycoach/kit'
import { G, HAIR, INK, MUT, PALE, tile } from '../academycoach/styles'

const FILM = 'M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0'
const STAR = 'M12 4l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z'

type Empty = { title: string; sub: string; icon: string; head: string; line: string; button: string; opens: string; side: string; rows: Array<[string, string]> }

const EMPTY = {
  'RD2e-SeasonSoFarEmpty': {
    title: 'The season so far', sub: 'No games filmed yet', icon: FILM,
    head: 'It fills in after your first filmed game', line: 'From the second game you’ll see each style measure as an average, and after three, how it has moved.',
    button: 'How to film a game', opens: 'RC1-RecordStart',
    side: 'You’ll get', rows: [['Four headline numbers', 'Style, chances and what’s furthest off'], ['Eight style tiles', 'Season average against your aim'], ['The last five games', 'At a glance']],
  },
  'RD3e-MiniRoosReviewEmpty': {
    title: 'Game review', sub: 'No game yet', icon: STAR,
    head: 'Nothing to look back on yet', line: 'After Sunday, tap who had a turn and who had a go. That is all it needs.',
    button: 'Open game day', opens: 'HM4-GameDayMiniRoos',
    side: 'It shows', rows: [['Did everyone play', 'Counted from your taps'], ['Who had a go', 'At goal and at a player'], ['No score', 'And no table, at this age']],
  },
  'RD4e-ClubWeekendEmpty': {
    title: 'This weekend', sub: 'No games filmed', icon: FILM,
    head: 'No team has filmed a game yet', line: 'Once a coach films a game, their team shows here with how many style measures were on target.',
    button: 'See which teams can film', opens: 'D2-Teams',
    side: 'You’ll see', rows: [['Every team', 'Measures on target, out of 8'], ['The club’s weak spot', 'What is off target most often'], ['Who to talk to', 'For a chat, never a ranking']],
  },
  'ADC7e-GameReviewEmpty': {
    title: 'Game review', sub: 'No game filmed yet', icon: FILM,
    head: 'The review appears after a filmed game', line: 'Film Sunday’s game and the numbers are ready about 20 minutes after you upload.',
    button: 'How to film a game', opens: 'ACC8-AcademyRecord',
    side: 'You’ll get', rows: [['Four headline numbers', 'Style, chances and what to fix'], ['Eight style tiles', 'Each against your aim'], ['What to work on', 'With the clip behind it']],
  },
} satisfies Record<string, Empty>

export type DashEmptyId = keyof typeof EMPTY

export default function DashEmpty({ id, go }: { id: DashEmptyId; go: (id: string) => void }) {
  const e: Empty = EMPTY[id]
  return (
    <div data-board={id} style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <Page columns="minmax(0,1fr) 320px" head={<Head title={e.title} sub={e.sub} />}>
        <section aria-label={e.title} style={tile}>
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center' }}>
            <span style={{ width: 72, height: 72, borderRadius: 999, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={e.icon} /></svg>
            </span>
            <span style={{ fontSize: 22, lineHeight: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>{e.head}</span>
            <span style={{ fontSize: 15, lineHeight: '22px', color: MUT, maxWidth: 460 }}>{e.line}</span>
            <Primary onClick={() => go(e.opens)}>{e.button}</Primary>
          </div>
        </section>
        <aside aria-label={e.side} style={tile}>
          <TileHead title={e.side} flat />
          {e.rows.map(([a, b], i) => (
            <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: `1px solid ${HAIR}` }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: PALE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{a}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: MUT }}>{b}</span>
              </span>
            </div>
          ))}
        </aside>
      </Page>
    </div>
  )
}
