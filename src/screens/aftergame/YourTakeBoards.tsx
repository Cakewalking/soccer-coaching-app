// The four "Your take" boards, shown inside whichever coach app opened them.
// Moving between the boards stays in the app: same menu, same team, same look.

import { useState } from 'react'
import YT1YourTake from './YT1YourTake'
import YT2MatchReport from './YT2MatchReport'
import YT3PlayerNotes from './YT3PlayerNotes'
import YT4VotesAwards from './YT4VotesAwards'
import { YTFixtureContext } from './YTFrame'

export const isYourTakeId = (s: string) => /^YT[1-4]-/.test(s)

export default function YourTakeBoards({ view, onView, onNav, seniors = false, fixture }: { /** an adult team: no parents' ratings anywhere */ seniors?: boolean; /** this team's game line, shown in place of U12 Sam's */ fixture?: string; /** which board; leave out to let this component keep track */ view?: string; onView?: (v: string) => void; onNav?: (s: string) => void }) {
  const [own, setOwn] = useState('YT1-YourTake')
  const v = view ?? own
  const go = (t: string) => { if (isYourTakeId(t)) { if (onView) onView(t); else setOwn(t) } else onNav?.(t) }
  const board = v.startsWith('YT2') ? <YT2MatchReport bare onNav={go} seniors={seniors} /> : v.startsWith('YT3') ? <YT3PlayerNotes bare onNav={go} seniors={seniors} /> : v.startsWith('YT4') ? <YT4VotesAwards bare onNav={go} seniors={seniors} /> : <YT1YourTake bare onNav={go} />
  return <YTFixtureContext.Provider value={fixture ?? null}>{board}</YTFixtureContext.Provider>
}
