// AD5-GroupMoves: Academy owner: which players are ready to change team, the evidence, the coach's view, and how the family is asked.
// A template over the store (programs v2, 24 Nov): the rows are the players flagged "ready to move" in the list, in the list's order
// (team, then name). The steps, "up this term" and "came to" in each row are counted from that player.
import type { ReactNode } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { cameOf, groupOf, isNew, playerBoard, useAcademy, type Academy, type Player } from './academyStore'
import { Cap, Head, LINE, MAIN, PlayerName, Sources, StepHeads, Steps, Th, Tile } from './kit'

const COLS = '1.15fr 1.1fr 1.75fr 1.5fr 170px'
// A sample value, not in the list of players: the one move a coach suggested and then asked to hold for a term.
const LOOK_AGAIN = { name: 'Theo Lindqvist', to: 'U12 Timber', line: 'wait a term. Growing fast, so keep his week steady.' }

/** Where "the next age group" is: the Timber team one year up. */
const moveTo = (a: Academy, p: Player) => { const g = groupOf(a, p.group); return p.ready_to_move_to === 'the next age group' && g ? `U${g.age + 1} Timber` : p.ready_to_move_to ?? '' }

function Move({ a, p, to, line, children }: { a: Academy; p: Player; to: string; line: string; children: ReactNode }) {
  const g = groupOf(a, p.group)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: 12, alignItems: 'center', minHeight: 64, borderTop: `1px solid ${LINE}`, fontSize: 14, boxSizing: 'content-box' }}>
      <PlayerName p={p} isNew={isNew(a, p)} />
      <span><strong>{g?.name}</strong> to <strong>{to}</strong></span>
      <Steps p={p} />
      <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{g?.coach.split(' ')[0]}: {line}</span>
      <span style={{ display: 'flex', justifyContent: 'flex-end' }}>{children}</span>
    </div>
  )
}

export default function AD5GroupMoves() {
  const a = useAcademy(), ready = a.players.filter(p => p.ready_to_move_to), again = a.players.find(p => p.name === LOOK_AGAIN.name && !p.ready_to_move_to)
  return (
    <main style={MAIN}>
      <Head title="Moves between teams" sub="For Term 3 · suggested by coaches, decided by you, agreed with the family">
        <Tap to="AD4-NextTerm" style={S.more}>Next term</Tap>
        <Tap to="AC4-AcademyPlayers" style={S.primary}>All players</Tap>
      </Head>
      <Tile title="Suggested by your coaches" right={<Cap>{ready.length} ready{again ? ' · 1 to look at again' : ''}</Cap>}>
        {(ready.length > 0 || again) && <Th cols={COLS} heads={['Player', 'Move', <StepHeads key="s" skills={a.skills} />, 'What the coach says', '']} />}
        {ready.map(p => { const c = cameOf(p), up = p.skills_now.reduce((t, v, k) => t + v - p.skills_then[k], 0); return (
          <Move key={p.id} a={a} p={p} to={moveTo(a, p)} line={`ready for Term 3. Up ${up} this term and came to ${c.came} of ${c.of}.`}>
            <Tap to="ADP12-MoveOffer" style={S.primary}>Offer the move</Tap>
          </Move>
        ) })}
        {again && <Move a={a} p={again} to={LOOK_AGAIN.to} line={LOOK_AGAIN.line}><Tap to={playerBoard(again)} style={S.more}>Look again in Term 3</Tap></Move>}
        {ready.length === 0 && !again && <Cap style={{ padding: '10px 0' }}>No coach has suggested a move yet.</Cap>}
        <Cap style={{ paddingTop: 6 }}>Each skill is a step from 1 to 5. Green with a plus is up this term. The family is asked, not told, and can say no.</Cap>
      </Tile>
      <Sources items={[['A coach suggests a move here', 'ADC14-SuggestMove'], ['What the family sees', 'ADP12-MoveOffer']]} />
    </main>
  )
}
