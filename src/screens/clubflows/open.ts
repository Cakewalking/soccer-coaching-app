// How a screen inside the director's app opens one of the director's input screens (GP3 to GP5)
// in place: the app provides this, and a button calls it. Null when there is no app around the
// screen: then the button opens the id the usual way.

import { createContext } from 'react'

export const ClubFlowOpen = createContext<((id: string) => void) | null>(null)
/** The director's top tab each input screen sits under. */
export const DIRECTOR_FLOW_TAB: Record<string, 'coaches' | 'club'> = { 'GP3-ChangeRole': 'coaches', 'GP4-LinkAcademy': 'club', 'GP5-AddSponsor': 'club' }
