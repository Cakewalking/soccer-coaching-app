// The connected club: one entry point for the 15 tablet screens. Gives each its
// saved state, a confirmation line, and hands other targets to the app it sits in.

import { useState } from 'react'
import { Ico } from '../capture/marks'
import { useCn } from './cnStore'
import { CN2SelfVsCoach, CN4SessionsLanded, CN8WhatWorked, CN9SeasonReport, CN10CatchUps, CN13Handover, CN15PositionHistory, CN17SetPieces, type CnProps } from './CnCoach'
import { CN6Observation, CN7CoachLoad, CN12ClubClimate, CN20Sponsors, CN21Pitches, CN22LanguageAccess, CN23AskLimits } from './CnDirector'

const SCREENS: Record<string, (p: CnProps) => React.ReactNode> = {
  'CN2-SelfVsCoach': p => <CN2SelfVsCoach {...p} />, 'CN4-SessionsLanded': p => <CN4SessionsLanded {...p} />, 'CN8-WhatWorked': p => <CN8WhatWorked {...p} />,
  'CN9-SeasonReport': p => <CN9SeasonReport {...p} />, 'CN10-CatchUps': p => <CN10CatchUps {...p} />, 'CN13-Handover': p => <CN13Handover {...p} />,
  'CN15-PositionHistory': p => <CN15PositionHistory {...p} />, 'CN17-SetPieces': p => <CN17SetPieces {...p} />,
  'CN6-Observation': p => <CN6Observation {...p} />, 'CN7-CoachLoad': p => <CN7CoachLoad {...p} />, 'CN12-ClubClimate': p => <CN12ClubClimate {...p} />,
  'CN20-Sponsors': p => <CN20Sponsors {...p} />, 'CN21-Pitches': p => <CN21Pitches {...p} />, 'CN22-LanguageAccess': p => <CN22LanguageAccess {...p} />, 'CN23-AskLimits': p => <CN23AskLimits {...p} />,
}
export const CN_TABLET_IDS = Object.keys(SCREENS)
export const isCnTablet = (id: string) => id in SCREENS

// A club with nothing in it yet: say what will appear here, and what makes it appear.
const EMPTY: Record<string, [string, string]> = {
  'CN2-SelfVsCoach': ['Their take, next to yours', 'After your first game, each player can rate their own effort. Their answers show here beside your ratings.'],
  'CN4-SessionsLanded': ['What landed', 'After a session, players give three taps on how it felt. A session shows here once five players have answered.'],
  'CN8-WhatWorked': ['Worked for other teams', 'Sessions other coaches at your club have run at least three times, and agreed to share, show here.'],
  'CN9-SeasonReport': ['Season reports', 'Once a player has three games and some of your notes, a report is drafted here for you to check and send.'],
  'CN10-CatchUps': ['Catch-ups', 'When you send a season report, the family can book ten minutes with you. Bookings show here.'],
  'CN13-Handover': ['Handover', 'At the end of the season, one page for each player’s next coach is drafted here from your notes.'],
  'CN15-PositionHistory': ['Positions', 'Once you have saved a line-up, the halves each child has played in each position show here.'],
  'CN17-SetPieces': ['Set pieces', 'Corners and free kicks, for and against, are counted from film. Record a game to start.'],
}
function Empty({ id }: { id: string }) {
  const [t, d] = EMPTY[id] ?? ['Nothing here yet', 'This fills in as your club uses Clean Sheet.']
  return <div data-screen={id} style={{ padding: '28px 32px' }}><div style={{ maxWidth: 520, background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}><strong style={{ fontSize: 18, color: '#10211f' }}>{t}</strong><span style={{ fontSize: 14, lineHeight: '20px', color: '#4a5a57' }}>{d}</span></div></div>
}

export default function CnScreen({ id, onNav, team, empty }: { id: string; onNav?: (s: string) => void; team?: CnProps['team']; empty?: boolean }) {
  const s = useCn()
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(t => t === m ? null : t), 3200) }
  const render = SCREENS[id]
  if (!render) return null
  if (empty) return <Empty id={id} />
  return (
    <>
      {render({ s, go: t => onNav?.(t), say, team })}
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 620, zIndex: 60, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}><Ico d="M5 12l5 5 9-10" size={20} sw={2.6} /><span>{toast}</span></div>}
    </>
  )
}
