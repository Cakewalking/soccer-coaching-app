// ADC6-HomePractice: one practice a week per group, following the block the group is in.
// No streaks and no table. A reply to a child under 13 goes to the parent's app; from 13, to both.

import { demoToast } from '../demoToast'
import { playClips } from '../clips/clipSheet'
import { markDone } from '../doneStore'
import { Film, Head, Initials, More, Page, Primary, TileHead, Two } from './kit'
import { G, HAIR, INK, MAUVE_PALE, MUT, foot, label, listTile, note, tile } from './styles'

// Videos first, then in the order they came in. Not a table of who did most.
const DONE: Array<{ ini: string; name: string; what: string; does: 'Reply' | 'Seen' | 'Nudge' }> = [
  { ini: 'LN', name: 'Lola Nguyen', what: 'Sent a video on Tuesday',             does: 'Reply' },
  { ini: 'IT', name: 'Isla Tran',   what: 'Sent a video yesterday',              does: 'Reply' },
  { ini: 'KO', name: 'Kai Okonkwo', what: 'Done twice · you replied on Monday', does: 'Seen' },
  { ini: 'ZA', name: 'Zane Abbas',  what: 'Done three times',                    does: 'Seen' },
  { ini: 'NP', name: 'Noah Petrov', what: 'Not started',                         does: 'Nudge' },
]
const SAYS = {
  Reply: 'Their video plays. Hold to talk and your note goes back with it.',
  Seen:  'Their video and your reply open.',
  Nudge: 'A friendly reminder goes to the family.',
}

const stat = { ...tile, padding: '12px 16px', gap: 2 }
const big = { fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' } as const

export default function ADC6HomePractice({ go }: { go: (id: string) => void }) {
  const press = (p: typeof DONE[number]) => {
    if (p.does === 'Nudge') markDone(`adc6:nudge:${p.ini}`)
    else playClips([{ title: `${p.name}: weaker-foot wall passes`, sub: p.does === 'Reply' ? 'Hold to talk and your note goes back with it.' : 'Their video, then your reply.', len: 12 }], 'Practice at home')
    demoToast(SAYS[p.does])
  }
  return (
    <Page columns="360px minmax(0,1fr)" head={
      <Head title="Practice at home" sub="U13 Timber · this week · follows the block: finishing, weaker foot">
        <More onClick={() => demoToast('Pick the group. The practice follows the block that group is in.')}>Set for another group</More>
        <Primary onClick={() => go('DrillFlow')}>Change this week’s</Primary>
      </Head>
    }>
      <section aria-label="This week" style={tile}>
        <TileHead title="This week" flat />
        <Film title="Weaker-foot wall passes" len="0:40" height={170}
          onPlay={() => { playClips([{ title: 'Weaker-foot wall passes', sub: 'Five minutes, three times this week. A wall and a ball.', len: 40 }], 'Practice at home'); demoToast('The clip plays.') }} />
        <Two a="Weaker-foot wall passes" b="Five minutes, three times this week. A wall and a ball." size={16} />
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ ...stat, background: '#f3ecdf' }}>
            <span style={label}>Did it</span>
            <span style={{ ...big, color: INK }}>10 of 16</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>At least once</span>
          </div>
          <div style={{ ...stat, background: MAUVE_PALE }}>
            <span style={label}>Sent a video</span>
            <span style={{ ...big, color: G }}>6</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>2 waiting for you</span>
          </div>
        </div>
        <span style={foot}>Suggested from the block and each player’s goal. You can swap it for any drill in your library.</span>
      </section>

      <section aria-label="Who has done it" style={listTile}>
        <TileHead title="Who has done it" right="Videos first" />
        {DONE.map(p => (
          <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: `1px solid ${HAIR}` }}>
            <Initials pale={p.does === 'Reply'}>{p.ini}</Initials>
            <span style={{ flexGrow: 1, minWidth: 0 }}><Two a={p.name} b={p.what} /></span>
            {p.does === 'Reply' ? <Primary onClick={() => press(p)}>Reply</Primary> : <More onClick={() => press(p)}>{p.does}</More>}
          </div>
        ))}
        <div style={note}>A reply to a child under 13 goes to the parent’s app. From 13, it goes to both.</div>
        <span style={foot}>Showing 5 of 16. Practice is never counted against a child: there is no streak and no table.</span>
      </section>
    </Page>
  )
}
