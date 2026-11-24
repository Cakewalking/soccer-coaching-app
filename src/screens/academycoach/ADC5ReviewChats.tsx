// ADC5-ReviewChats: ten minutes with each family in week 9, pitch-side in open view or by phone.
// Each chat is prepared as Show, Say, Ask, Agree from notes, the skills check and film.
// From 13 the player is in the chat too.

import { demoToast } from '../demoToast'
import { firstName, useCoachTeam } from './coachTeam'
import { Head, More, Page, Primary, TileHead, Two } from './kit'
import { G, HAIR, INK, MAUVE_PALE, PALE, foot, listTile, note, plain, tile } from './styles'

// Who has booked which time is sample. The parent beside each player is read from the academy's one list.
const SLOTS: Array<{ at: string; who: string; withWho?: string; how?: string }> = [
  { at: '6:45', who: 'Kai Okonkwo' },
  { at: '6:55', who: 'Lola Nguyen', how: ' · by phone' },
  { at: '7:05', who: 'Zane Abbas',  withWho: 'Both parents' },
  { at: '7:15', who: 'Isla Tran' },
  { at: '7:25', who: 'Open',        withWho: 'Not booked yet' },
  { at: '7:35', who: 'Finn Byrne' },
]
const SHOWN = '6:45'   // the one chat the board draws

const PLAN = [
  { step: 'Show',  a: 'The left-foot finish from Thursday',                     b: 'One clip, 9 seconds' },
  { step: 'Say',   a: 'First touch is up a step since week 1',                  b: 'From your notes on 5 sessions' },
  { step: 'Ask',   a: 'How is his week? He has 5 sessions across three places', b: 'His mum added school football' },
  { step: 'Agree', a: 'Next term’s goal, chosen with Kai',                      b: 'He marked one against one lower than you did' },
]

export default function ADC5ReviewChats({ go }: { go: (id: string) => void }) {
  const { ps } = useCoachTeam()
  const family = (name: string) => { const p = ps.find(x => x.name === name); return p ? `${firstName(p)}’s ${p.parent_is}, ${p.parent}` : '' }
  return (
    <Page columns="380px minmax(0,1fr)" head={
      <Head title="Review chats" sub="Tuesday 16 June · week 9 · ten minutes each · 5 of 6 booked">
        <More onClick={() => demoToast('Pick the times. Families who haven’t booked are told.')}>Offer more times</More>
        <Primary onClick={() => demoToast('Kai’s chat opens: the clip, the four skills and the goal, one screen each.')}>Start with Kai</Primary>
      </Head>
    }>
      <section aria-label="Tuesday evening" style={listTile}>
        <TileHead title="Tuesday evening" right="Pitch-side, in open view" />
        {SLOTS.map(s => {
          const on = s.at === SHOWN
          return (
            <button key={s.at} aria-current={on} onClick={() => demoToast(`${s.who}: what to show, say, ask and agree.`)}
              style={{ ...plain, display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, ...(on ? { background: PALE, borderRadius: 10, padding: '0 8px' } : { borderTop: `1px solid ${HAIR}` }) }}>
              <span style={{ flex: 'none', width: 44, fontSize: 16, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{s.at}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}><Two a={s.who} b={s.withWho ?? family(s.who) + (s.how ?? '')} /></span>
            </button>
          )
        })}
        <span style={foot}>12 of 16 U13 Timber families have booked across the week. A family that can’t come gets the report and a spoken note instead.</span>
      </section>

      <section aria-label="Kai’s chat" style={{ ...tile, gap: 4 }}>
        <TileHead flat title="Kai Okonkwo · 6:45" right={
          <button onClick={() => go('ADC1-PlayerFile')} style={{ ...plain, display: 'inline-flex', alignItems: 'center', minHeight: 44, margin: '-12px 0', color: G, fontSize: 14, fontWeight: 700, textDecoration: 'underline' }}>Open his file</button>
        } />
        {PLAN.map(p => (
          <div key={p.step} style={{ display: 'grid', gridTemplateColumns: '64px minmax(0,1fr)', gap: 12, alignItems: 'center', minHeight: 76, borderTop: `1px solid ${HAIR}` }}>
            <span style={{ height: 30, borderRadius: 999, background: MAUVE_PALE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{p.step}</span>
            <Two a={p.a} b={p.b} size={16} />
          </div>
        ))}
        <div style={note}>Kai is 13, so he is in the chat too. Start with what he thinks went well.</div>
        <span style={foot}>Prepared from your notes, the skills check and tonight’s film. Change any line. After the chat, the agreed goal goes into next term’s plan.</span>
      </section>
    </Page>
  )
}
