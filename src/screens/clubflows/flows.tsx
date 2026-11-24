// One club-side input screen by its id, without a frame: the role's app puts it under its own menu.

import GP1AfterTraining, { GP1eAfterTrainingEmpty } from './GP1AfterTraining'
import GP2AddPlayer from './GP2AddPlayer'
import GP3ChangeRole from './GP3ChangeRole'
import GP4LinkAcademy from './GP4LinkAcademy'
import GP5AddSponsor from './GP5AddSponsor'
import GP6SendLesson from './GP6SendLesson'
import GP7MiniGoal from './GP7MiniGoal'
import GP8ReportNumber from './GP8ReportNumber'

/** `go` opens the screen a button points at. `assistant`: the assistant coach is signed in. `empty`: the team has closed no session yet. */
export default function ClubFlowScreen({ id, go, assistant, empty, team }: { id: string; go: (id: string) => void; assistant?: boolean; empty?: boolean; /** the team a player is added to, when it is not U12 Sam */ team?: string }) {
  switch (id) {
    case 'GP1-AfterTraining': return empty ? <GP1eAfterTrainingEmpty go={go} /> : <GP1AfterTraining go={go} assistant={assistant} />
    case 'GP1e-AfterTrainingEmpty': return <GP1eAfterTrainingEmpty go={go} />
    case 'GP2-AddPlayer': return <GP2AddPlayer go={go} team={team} />
    case 'GP3-ChangeRole': return <GP3ChangeRole go={go} />
    case 'GP4-LinkAcademy': return <GP4LinkAcademy go={go} />
    case 'GP5-AddSponsor': return <GP5AddSponsor go={go} />
    case 'GP6-SendLesson': return <GP6SendLesson go={go} />
    case 'GP7-MiniGoal': return <GP7MiniGoal go={go} />
    case 'GP8-ReportNumber': return <GP8ReportNumber go={go} />
  }
  return null
}
