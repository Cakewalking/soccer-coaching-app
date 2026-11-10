import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import DevScreens from './screens/dev/DevScreens.tsx'

const root = window.location.pathname.startsWith('/__screens')
  ? <DevScreens />
  : <App />

createRoot(document.getElementById('root')!).render(
  <StrictMode>{root}</StrictMode>,
)
