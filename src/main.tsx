import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import DevScreens from './screens/dev/DevScreens.tsx'
import TrialShare from './screens/trial/TrialShare.tsx'
import { ClipSheetHost } from './screens/clips/clipSheet.tsx'
import { OpenHost } from './screens/openThing.tsx'
import { AskHost } from './ask/AskHost.tsx'
import { ClubRoot } from './clubTheme.tsx'

// /share/<slug> is the page a new club opens from a trial pack link: no demo bar, no app frame.
const share = window.location.pathname.match(/^\/share\/([a-z0-9-]+)\/?$/)
const root = share
  ? <TrialShare slug={share[1]} />
  : window.location.pathname.startsWith('/__screens')
  ? <DevScreens />
  : <App />

createRoot(document.getElementById('root')!).render(
  <StrictMode><ClubRoot>{root}<OpenHost /><AskHost /><ClipSheetHost /></ClubRoot></StrictMode>,
)
