// ADC7-GameReview and ADC7e-GameReviewEmpty: the academy coach's Game day › Review.
// The same dashboard as the club coach's, with the academy's game (U13 Timber v Eastbank).
// Inside the academy coach app the app draws the menu; standing alone, the screen draws it.

import { useContext } from 'react'
import CoachNav from '../academycoach/CoachNav'
import { InCoachApp, coachGo } from '../academycoach/menu'
import { INK } from '../academycoach/styles'
import DashEmpty from './DashEmpty'
import { ACADEMY_GAME } from './data'
import GameReviewDash, { ACADEMY_PLACES } from './GameReviewDash'
import { SHOW_CHANCE_QUALITY_TILES } from './kit'

function Frame({ id, onNav, children }: { id: string; onNav?: (id: string) => void; children: (go: (id: string) => void) => React.ReactNode }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  if (inApp) return <>{children(go)}</>
  return (
    <div data-board-frame={id} style={{ width: 1180, minHeight: 'var(--frame-h, 100vh)', margin: '0 auto', boxSizing: 'border-box', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: 'flex', flexDirection: 'column' }}>
      <CoachNav active="gameday" sub="Review" go={go} />
      {children(go)}
    </div>
  )
}

export function ADC7GameReview({ onNav }: { onNav?: (id: string) => void }) {
  return <Frame id="ADC7-GameReview" onNav={onNav}>{go => <GameReviewDash id="ADC7-GameReview" game={ACADEMY_GAME} places={ACADEMY_PLACES} go={go} chances={SHOW_CHANCE_QUALITY_TILES} />}</Frame>
}

/** No game has been filmed yet: one sentence on what will appear, one button, and what the coach will get. */
export function ADC7eGameReviewEmpty({ onNav }: { onNav?: (id: string) => void }) {
  return <Frame id="ADC7e-GameReviewEmpty" onNav={onNav}>{go => <DashEmpty id="ADC7e-GameReviewEmpty" go={go} />}</Frame>
}
