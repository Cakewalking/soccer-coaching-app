// The four "Your take" boards, shown inside whichever coach app opened them.
// Moving between the boards stays in the app: same menu, same team, same look.

import { useState } from 'react'
import YT1YourTake from './YT1YourTake'
import YT2MatchReport from './YT2MatchReport'
import YT3PlayerNotes from './YT3PlayerNotes'
import YT4VotesAwards from './YT4VotesAwards'

export const isYourTakeId = (s: string) => /^YT[1-4]-/.test(s)

export default function YourTakeBoards({ view, onView, onNav, seniors = false }: { /** an adult team: no parents' ratings anywhere */ seniors?: boolean; /** which board; leave out to let this component keep track */ view?: string; onView?: (v: string) => void; onNav?: (s: string) => void }) {
  const [own, setOwn] = useState('YT1-YourTake')
  const v = view ?? own
  const go = (t: string) => { if (isYourTakeId(t)) { if (onView) onView(t); else setOwn(t) } else onNav?.(t) }
  if (v.startsWith('YT2')) return <YT2MatchReport bare onNav={go} seniors={seniors} />
  if (v.startsWith('YT3')) return <YT3PlayerNotes bare onNav={go} seniors={seniors} />
  if (v.startsWith('YT4')) return <YT4VotesAwards bare onNav={go} seniors={seniors} />
  return <YT1YourTake bare onNav={go} />
}
