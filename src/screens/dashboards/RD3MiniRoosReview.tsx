// RD3-MiniRoosReview: the MiniRoos coach's game review as a dashboard. Replaces MS3-MiniRoosReview.
// No score, no table, no goals counted. Every tile counts children, minutes or turns, from the coach's own taps.
// Nothing here ranks a child.

import type { MiniReview } from './data'
import { playMeasure, playReel } from './GameReviewDash'
import { Columns, DashPage, GridTile, HeadLink, Headline, Headlines, MeasureTile, PersonRow, PlayFilm, RightColumn, SideList, Strip } from './kit'

export default function RD3MiniRoosReview({ review, go }: { review: MiniReview; go: (id: string) => void }) {
  const where = review.detail.split(' · ').slice(0, 2).join(', ')
  return (
    <DashPage id="RD3-MiniRoosReview">
      <Strip big="No score" title={review.title} detail={review.detail}>
        <PlayFilm onClick={() => playReel('One moment per child', `${where}. 40 seconds.`, 'The 40-second reel plays: one moment per child.', 40)}>Play 40 seconds</PlayFilm>
      </Strip>
      <Headlines count={review.headlines.length}>
        {review.headlines.map(([label, big, line], i) => <Headline key={label} label={label} big={big} line={line} fix={i === review.headlines.length - 1} />)}
      </Headlines>
      <Columns>
        <GridTile title="Did everyone get a go?" cols={3} rows={2} caption="No score and no table at this age. These are counts of children, not of goals."
          links={<HeadLink onClick={() => go('MS1-MiniRoosStyle')}>Our style</HeadLink>}>
          {review.measures.map(m => <MeasureTile key={m.name} m={m} onPlay={() => playMeasure(m, where)} />)}
        </GridTile>
        <RightColumn>
          <SideList title="Try on Tuesday" link={<HeadLink onClick={() => go('SGm1-SuggestedMiniRoos')}>Tuesday’s session</HeadLink>}>
            {review.steps.map(p => <PersonRow key={p.mark} {...p} onClick={() => go('SGm1-SuggestedMiniRoos')} />)}
          </SideList>
          <SideList grow title="Children to notice" link={<HeadLink onClick={() => go('HM5-WhatWeSaw')}>What we saw</HeadLink>}>
            {review.children.map(p => <PersonRow key={p.mark} {...p} onClick={() => go('HM5-WhatWeSaw')} />)}
          </SideList>
        </RightColumn>
      </Columns>
    </DashPage>
  )
}
