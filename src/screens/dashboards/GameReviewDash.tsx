// The game review as a dashboard. One screen, two roles:
//   RD1-GameReview   the club coach's Match day › Review (replaces the list on R1-MatchReview)
//   ADC7-GameReview  the academy coach's Game day › Review
// Same layout and rules; each role brings its own game and its own places to go.

import { demoToast } from '../demoToast'
import { playClips } from '../clips/clipSheet'
import type { GameReview } from './data'
import { Columns, DashPage, GridTile, HeadLink, MeasureTile, PersonRow, PlayFilm, RightColumn, SideList, Strip, StripTab, StyleHeadlines, WorkRow, type Measure, type WorkOn } from './kit'

/** The screens this review's controls open. `season` is left out where there is no season screen to go to. */
export type ReviewPlaces = { self: string; chances: string; yourTake: string; marks: string; style: string; plan: string; squad: string; person: string; season?: string }

export const CLUB_PLACES: ReviewPlaces = { self: 'RD1-GameReview', chances: 'XG1-ChancesGame', yourTake: 'YT1-YourTake', marks: 'RC8-HowWeMeasure', style: 'S1-PlayingStyle', plan: 'GS1-ProposedSession', squad: 'T4-SquadTab', person: 'T4-SquadTab', season: 'RD2-SeasonSoFar' }
export const ACADEMY_PLACES: ReviewPlaces = { self: 'ADC7-GameReview', chances: 'ADC16-Chances', yourTake: 'ADC17-YourTake', marks: 'RC8-HowWeMeasure', style: 'ADC8-TeamStyle', plan: 'ACT3-AcademySessionPlan', squad: 'ADC2-Group', person: 'ADC1-PlayerFile' }

/** Play the clips behind a tile's number, newest first, then say so. The demo has no film: the player runs each clip's length. */
export function playMeasure(m: Measure, game: string, says = 'The clips behind this number play, newest first.') {
  playClips([1, 2, 3].map(k => ({ title: `${m.name}, clip ${k} of 3`, sub: `${game}. Newest first.`, len: 9 })), m.name)
  demoToast(says)
}
export function playMinute(w: WorkOn, game: string) {
  playClips([{ title: `Minute ${w.minute}: ${w.title.toLowerCase()}`, sub: `${game}. ${w.line}.`, len: 9 }], 'Work on this week')
  demoToast(`The clip from minute ${w.minute} plays.`)
}
export function playReel(title: string, sub: string, says: string, len = 12) {
  playClips([{ title, sub, len }], title)
  demoToast(says)
}

export default function GameReviewDash({ id, game, places, go, tight = false, chances = true }: {
  id: string; game: GameReview; places: ReviewPlaces; go: (id: string) => void
  /** Trim the spacing for a frame with a taller menu. */
  tight?: boolean
  /** False when the club's rules do not show chances to this team: the Chances tab and the two chance tiles go. */
  chances?: boolean
}) {
  const where = game.detail.split(' · ').slice(0, 2).join(', ')
  return (
    <DashPage id={id} tight={tight}>
      <Strip big={game.big} title={game.title} detail={game.detail} tight={tight}>
        <StripTab on onClick={() => go(places.self)}>Review</StripTab>
        {chances && <StripTab onClick={() => go(places.chances)}>Chances</StripTab>}
        <StripTab onClick={() => go(places.yourTake)}>Your take</StripTab>
        {places.season && <StripTab onClick={() => go(places.season!)}>Season</StripTab>}
        <PlayFilm onClick={() => playReel('Highlights', `${where}. 4 minutes, 24 clips.`, 'The highlights play. 4 minutes, 24 clips.')}>Highlights · 4 min</PlayFilm>
      </Strip>
      <StyleHeadlines tight={tight} measures={game.measures} styleLine="on target" fixLabel="Slowest to fix" chances={chances ? game.chances : undefined} />
      <Columns>
        <GridTile tight={tight} title="How we played our style" cols={4} rows={2} caption={game.caption}
          links={<><HeadLink onClick={() => go(places.marks)}>What the marks mean</HeadLink><HeadLink onClick={() => go(places.style)}>Our style</HeadLink></>}>
          {game.measures.map(m => <MeasureTile key={m.name} m={m} tight={tight} onPlay={() => playMeasure(m, where)} />)}
        </GridTile>
        <RightColumn>
          <SideList title="Work on this week" link={<HeadLink onClick={() => go(places.plan)}>Thursday’s plan</HeadLink>}>
            {game.work.slice(0, 3).map(w => <WorkRow key={w.minute} w={w} tight={tight} onPlay={() => playMinute(w, where)} />)}
          </SideList>
          <SideList grow title="Players to know about" link={<HeadLink onClick={() => go(places.squad)}>All {game.squadSize}</HeadLink>}>
            {game.people.slice(0, 3).map(({ opens, ...p }) => <PersonRow key={p.mark} {...p} onClick={() => go(opens ?? places.person)} />)}
          </SideList>
        </RightColumn>
      </Columns>
    </DashPage>
  )
}
