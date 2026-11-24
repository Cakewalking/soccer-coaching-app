// ADC1e to ADC6e: what each of the six academy coach screens shows when it has nothing yet.
// Always one sentence on what will appear and one button, with a short list beside it.

import { demoToast } from '../demoToast'
import { Head, Page, Primary, TileHead } from './kit'
import { G, HAIR, INK, MUT, PALE, tile } from './styles'

const PEOPLE = 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5'

type Empty = {
  title: string; sub: string; icon: string; head: string; line: string
  button: string; opens?: string; says?: string
  side: string; rows: Array<[string, string]>
}

const EMPTY = {
  'ADC1e-PlayerFileEmpty': {
    title: 'Ana Costa, 12', sub: 'Joined 3 weeks ago', icon: PEOPLE,
    head: 'Ana’s file is just starting', line: 'Two taps after each session fill it in. Set a goal with her when you’re ready.',
    button: 'Set a goal with Ana', opens: 'ADC10-SetGoal',
    side: 'It fills from', rows: [['Your session notes', 'Two taps per player'], ['The skills check', 'Weeks 1 and 8'], ['Film', 'Moments tagged by skill']],
  },
  'ADC2e-GroupEmpty': {
    title: 'U13 Timber', sub: 'No notes yet', icon: PEOPLE,
    head: 'No notes for this team yet', line: 'After your first session, mark two things per player and the team fills in.',
    button: 'Open today’s session', opens: 'ACC2-RunSession',
    side: 'You’ll see', rows: [['Each player’s steps', 'On the four core skills'], ['Who has moved', 'This term'], ['What the team needs', 'For the next block']],
  },
  'ADC3e-SessionFilmEmpty': {
    title: 'Film', sub: 'Nothing filmed', icon: 'M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0',
    head: 'No film from tonight', line: 'Prop the tablet on the stand before the skill game and press record.',
    button: 'How to film a session', opens: 'ACC8-AcademyRecord',
    side: 'What comes back', rows: [['Moments by player', 'About 20 minutes later'], ['Tagged by skill', 'Ready for the file'], ['Blurred', 'Where a family hasn’t agreed']],
  },
  'ADC4e-SkillsCheckEmpty': {
    title: 'Skills check', sub: 'Not run yet', icon: 'M5 12l5 5 9-10',
    head: 'No check yet this term', line: 'Run it early in the term so there is something to compare with later.',
    button: 'Start the check', opens: 'ADC13-CheckEntry',
    side: 'Four stations', rows: [['25 minutes', 'For the whole team'], ['Own numbers only', 'Nobody is ranked'], ['Goes to the file', 'And the term report']],
  },
  'ADC5e-ReviewChatsEmpty': {
    title: 'Review chats', sub: 'No times offered', icon: 'M12 12m-9 0a9 9 0 1018 0 9 9 0 10-18 0M12 7v5l3 2',
    head: 'No chats booked', line: 'Offer some ten-minute times in week 9 and families book in the app.',
    button: 'Offer times', says: 'Pick the times.',
    side: 'Each chat is prepared', rows: [['Show', 'One clip'], ['Say and ask', 'From your notes'], ['Agree', 'Next term’s goal']],
  },
  'ADC6e-HomePracticeEmpty': {
    title: 'Practice at home', sub: 'Nothing set', icon: 'M12 4l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z',
    head: 'No practice set this week', line: 'One short practice that follows the block. Families see it straight away.',
    button: 'Set this week’s practice', opens: 'ADC19-SetPractice',   // pack v35: the empty state links to the flow
    side: 'How it works', rows: [['The curriculum picks', 'You keep it or change it'], ['A tick or a video back', 'If the family wants'], ['Your reply', 'A spoken note']],
  },
} satisfies Record<string, Empty>

export type ADCEmptyId = keyof typeof EMPTY

export default function ADCEmpty({ id, go }: { id: ADCEmptyId; go: (id: string) => void }) {
  const e: Empty = EMPTY[id]
  return (
    <Page columns="minmax(0,1fr) 320px" head={<Head title={e.title} sub={e.sub} />}>
      <section aria-label={e.title} style={tile}>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center' }}>
          <span style={{ width: 72, height: 72, borderRadius: 999, background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={e.icon} /></svg>
          </span>
          <span style={{ fontSize: 22, lineHeight: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>{e.head}</span>
          <span style={{ fontSize: 15, lineHeight: '22px', color: MUT, maxWidth: 460 }}>{e.line}</span>
          <Primary onClick={() => { if (e.opens) go(e.opens); else if (e.says) demoToast(e.says) }}>{e.button}</Primary>
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
  )
}
