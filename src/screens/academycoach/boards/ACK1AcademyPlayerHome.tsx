// ACK1-AcademyPlayerHome, as the homes handover draws it (v26): the four-part phone home, with "My week" in place of "Oversight".
// It is not made by the converter any more: every phone home shares one layout (homesphone/PhoneHome), and this board's words
// and wiring are in homesphone/data.ts. The three ways in that the board does not draw (to ADK1, ADK2 and ADK4) are the plain
// links under "My week".

import PhoneHome from '../../homesphone/PhoneHome'
import { ACK1 } from '../../homesphone/data'
import { coachGo } from '../menu'

export default function ACK1AcademyPlayerHome({ onNav }: { onNav?: (id: string) => void }) {
  return <PhoneHome cfg={ACK1} onNav={coachGo(onNav)} />
}
