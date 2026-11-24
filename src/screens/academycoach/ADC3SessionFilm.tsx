// ADC3-SessionFilm: tonight's film, by player and tagged with a core skill.
// A clip goes to that child's own family only. Other children in it are blurred unless their
// family has agreed. From 13 it also shows in the player's own app.
// Programs v2: the list is the coach's own team from the academy's one list, in name order, and "Send to the
// family" adds a clip sent for that player in the list (sendClip), so their file, the team's count and the
// home's meter change. What the film found tonight (the moments) is sample: film is not in the list yet.

import { sendClip, type Player } from '../academy/academyStore'
import { demoToast } from '../demoToast'
import { playClips } from '../clips/clipSheet'
import { markDone } from '../doneStore'
import { firstName, ini, longDate, lowestSkill, openPlayer, useCoachTeam } from './coachTeam'
import { Film, Head, Initials, More, Page, Primary, TileHead, Two } from './kit'
import { G, HAIR, INK, MAUVE, MUT, PALE, cap, foot, listTile, plain, tile } from './styles'

// Sample: what tonight's film found, for the five players the board draws. A count of clips, not a level.
const FOUND: Record<number, { what: string; n: number }> = {
  166: { what: 'Left-foot finish · one against one', n: 5 }, 170: { what: 'First touch away from pressure', n: 4 }, 171: { what: 'Runs with it, head up', n: 4 },
  172: { what: 'Takes her player on', n: 3 }, 169: { what: 'First touch on the move', n: 2 },
}
// Sample: the one moment the board draws in full, Kai's.
const KAI = { id: 166, title: 'left-foot finish', when: '48th minute · skill game', film: 'Kai, left foot, far corner' }

const tag = { display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' } as const
const sent = (p: Player) => p.clips_sent_this_term ? `${p.clips_sent_this_term} sent home` : 'None sent home'

export default function ADC3SessionFilm({ go }: { go: (id: string) => void }) {
  const { a, g, ps, player: p } = useCoachTeam()
  const f = firstName(p)
  // The skill the moment shows: the one the player's goal works on, or where their step is lowest.
  const skill = p.id === KAI.id ? 'Striking the ball' : p.goal_skill ?? a.skills[lowestSkill(p)]
  const title = p.id === KAI.id ? KAI.title : skill.toLowerCase(), film = p.id === KAI.id ? KAI.film : `${f}, ${skill.toLowerCase()}`
  function send() {
    sendClip(p.id)   // to this child's own family only
    markDone(`adc3:${p.id}:sent`, `${f}’s family`)
    demoToast(`Sent to ${p.parent}, ${f}’s ${p.parent_is}.${p.age >= 13 ? ` ${f} is ${p.age}, so it also shows in ${f}’s own app.` : ''}`)
  }
  return (
    <Page columns="380px minmax(0,1fr)" head={
      <Head title="Tonight’s film" sub={`${g.name} · ${longDate(a.today)} · 70 minutes on the tablet · 38 moments found`}>
        <More onClick={() => go('C1-ClipsTab')}>All 38 moments</More>
        <Primary onClick={() => { markDone('adc3:best-to-reports'); demoToast('One moment per player is added to their draft report. You can swap any of them.') }}>Add the best to term reports</Primary>
      </Head>
    }>
      <section aria-label="By player" style={listTile}>
        <TileHead title="By player" right="In name order" />
        {ps.map(x => {
          const on = x.id === p.id
          return (
            <button key={x.id} data-film-player={x.id} aria-current={on} onClick={() => openPlayer(x.id)}
              style={{ ...plain, display: 'flex', alignItems: 'center', gap: 10, minHeight: 64, ...(on ? { background: PALE, borderRadius: 10, padding: '0 8px' } : { borderTop: `1px solid ${HAIR}` }) }}>
              <Initials>{ini(x)}</Initials>
              <span style={{ flexGrow: 1, minWidth: 0 }}><Two a={x.name} b={FOUND[x.id] ? `${FOUND[x.id].what} · ${FOUND[x.id].n} moments` : x.goal ? `Goal: ${x.goal}` : 'No goal yet'} /></span>
              <span data-sent={x.clips_sent_this_term} style={{ fontSize: 13, lineHeight: '18px', color: MUT, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{sent(x)}</span>
            </button>
          )
        })}
        <span style={foot}>All {ps.length} of {g.name}. “Sent home” is clips sent to that child’s family this term.</span>
      </section>

      <section aria-label={`${f}’s moment`} style={{ ...tile, gap: 10, alignSelf: 'start' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em' }}>{f} · {title}</h2>
          <span style={cap}>{p.id === KAI.id ? KAI.when : 'From tonight’s skill game'}</span>
        </div>
        <Film title={film} len="0:09" height={390}
          onPlay={() => { playClips([{ title: film, sub: `${p.id === KAI.id ? '48th minute, skill game' : 'Tonight’s skill game'}. Two children are blurred.`, len: 9 }], 'Tonight’s film'); demoToast('The clip plays.') }} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ ...tag, background: G, color: '#ffffff' }}>{skill}</span>
          {p.goal && (p.goal_skill === skill || p.id === KAI.id) && <span style={{ ...tag, background: MAUVE, color: INK }}>{f}’s goal this term</span>}
          <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>2 children in this clip have no filming consent and are blurred.</span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 'auto' }}>
          <More onClick={() => demoToast('Hold to talk. Up to 30 seconds. You hear it back before it is saved.')}>Add a spoken note</More>
          <More onClick={() => { markDone(`adc3:${p.id}:saved`, skill); demoToast(`Saved to ${f}’s file under ${skill}.`) }}>Save to {f}’s file</More>
          {/* To this child's own family only, and their own app from 13. */}
          <Primary onClick={send}>Send to {f}’s family</Primary>
          <span data-sent-now={p.clips_sent_this_term} style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{sent(p)} this term</span>
        </div>
        <span style={cap}>A clip goes to the child’s own family only. Team-mates in it stay blurred unless their family has agreed.</span>
      </section>
    </Page>
  )
}
