// The club-side input screens by id, for /__screen/<id>. Each opens in its role's own app, under
// that app's menu, in the state drawn: the head coach of U12 Sam, the director of football, and
// the MiniRoos coach.

import type { ReactNode } from 'react'
import JuniorCoachApp from '../JuniorCoachApp'
import ClubAdminScreen from '../ClubAdminScreen'
import MiniRoosApp from '../miniroos/MiniRoosApp'

const noop = () => {}

export function renderClubFlowScreen(key: string): ReactNode | null {
  switch (key) {
    case 'GP1-AfterTraining': case 'GP1e-AfterTrainingEmpty': case 'GP2-AddPlayer': case 'GP6-SendLesson': case 'GP8-ReportNumber':
      return <JuniorCoachApp key={key} initialScreen={key} />
    case 'GP3-ChangeRole': return <ClubAdminScreen key={key} role="dof" initials="RM" initialTab="coaches" initialFlow={key} />
    case 'GP4-LinkAcademy': return <ClubAdminScreen key={key} role="dof" initials="RM" initialTab="club" initialFlow={key} />
    case 'GP5-AddSponsor': return <ClubAdminScreen key={key} role="dof" initials="RM" initialTab="club" initialSub="CN20-Sponsors" initialFlow={key} />
    case 'GP7-MiniGoal': return <div style={{ width: 1180, margin: '0 auto', background: 'var(--surface-100)' }}><MiniRoosApp key={key} onBack={noop} empty={false} initialScreen={key} /></div>
  }
  return null
}
