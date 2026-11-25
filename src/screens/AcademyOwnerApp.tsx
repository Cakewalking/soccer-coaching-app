// The academy owner's app: one frame (the green bar, the six main items and the sub-menu under them) around every owner board.
// The boards themselves are in ./academy, drawn from the academy handover (24 Nov, v2); this file is the frame and how they open.
import Messaging from './messaging/Messaging'
import ClubColours from './clubadmin/ClubColours'
import { openScreen } from './openThing'
import { useBackState } from '../backState'
import { useEffect, useState } from 'react'
import AskChat from '../ask/AskChat'
import { setAskContext } from '../ask/ask'
import { setAskWho } from '../ask/askState'
import { ownerContext } from '../ask/academyContext'
import OwnerHeader from './academy/OwnerHeader'
import { OWNER_MENU, OwnerGo, ownerMainOf, ownerStem, type OwnerItem } from './academy/ownerMenu'
import { OWNER_BOARDS, isCoachBoard, isPlayerBoard, isTeamBoard } from './academy/adScreens'
import TeamPage from './academy/TeamPage'
import CoachPage from './academy/CoachPage'
import PlayerPage from './academy/PlayerPage'
import AC12AcademyBroadcast from './step4/AC12AcademyBroadcast'

const G    = '#2f6252'
const INK  = '#10211f'
const PALE = '#eef5f2'

const HOME = 'AD1-AcademyHome'
// The owner's Home is AD1. Turn this on to show the story home on Overview again where one is passed in.
const STORY_HOME = false
// Two pages the handover's menu does not list. They stay at the end of Home so nothing built is lost.
// Messages is in the handover's own menu from pack v30 (ADM1-Messages), so only Academy colours is added here.
const EXTRA: OwnerItem[] = [{ label: 'Academy colours', id: 'colours' }]
// The short names this app was opened with before each page had a board id.
const SHORT: Record<string, string> = {
  home: HOME, overview: HOME, trials: 'AC3-Trials', reports: 'AC7-ReportsOut', safety: 'AC10-AcademySafety', partner: 'AC11-PartnerClub',
  messages: 'ADM1-Messages', programs: 'AC2-Programs', players: 'AC4-AcademyPlayers', curriculum: 'AD6-YearPlan', coaches: 'AC6-AcademyCoaches', money: 'AC5-Fees',
}
// Every page this app shows in its own frame. Anything else opens over the top with a Back bar.
const IN_FRAME = new Set([...Object.keys(OWNER_BOARDS), 'AC12-AcademyBroadcast', ...EXTRA.map(s => s.id)])
// A team's page and a player's page are one template each, opened by the board id of the team or the player.
const inFrame = (id: string) => IN_FRAME.has(id) || isTeamBoard(id) || isPlayerBoard(id) || isCoachBoard(id)
// The empty state of each board: "AD3-Timetable" has "AD3e-TimetableEmpty".
const EMPTY_OF: Record<string, string> = {}
for (const e of IN_FRAME) if (/^A[CD]\d+e-/.test(e)) { const full = [...IN_FRAME].find(id => id !== e && ownerStem(id) === ownerStem(e)); if (full) EMPTY_OF[full] = e }

/**
 * `empty` is an academy with nothing in it yet (the sandbox): every board shows its empty state, and Home is AD1e,
 * whose one button opens set-up (AD16). In the demo Home is AD1: set-up is treated as finished, and AD16 keeps its own address.
 */
/** The screens Ask Clean Sheet can offer to open: every item in the owner's menu, by its label. */
const ASK_PLACES: [string, string][] = OWNER_MENU.flatMap(m => m.sub.map(x => [`${m.label} › ${x.label}`, x.id] as [string, string]))

export default function AcademyOwnerApp({ empty = false, initialScreen, onNavChange, homeStory }: { onBack?: () => void; empty?: boolean; initialScreen?: string; onNavChange?: (screen: string) => void; homeStory?: import('react').ReactNode }) {
  const asShown = (id: string) => empty ? EMPTY_OF[id] ?? id : id
  const [screen, setScreen] = useBackState<string>(() => { const id = SHORT[initialScreen ?? ''] ?? initialScreen ?? HOME; return inFrame(id) ? asShown(id) : asShown(HOME) })
  const [askOpen, setAskOpen] = useState(false)
  useEffect(() => setAskWho({ role: 'academy owner', examples: [], note: '', open: () => { setAskOpen(true); return true } }), [])   // an Ask button on one of this app's pages opens the panel below
  useEffect(() => setAskContext('academyowner', ownerContext), [])   // what Ask Clean Sheet knows for the owner: every team, counted from the list

  function show(id: string) { setScreen(id); onNavChange?.(ownerMainOf(id)) }   // the address keeps the main item, so a reload opens the same part of the app
  /** A menu item: one of the owner's own pages, in the state the academy is in. */
  function menuGo(target: string) { show(asShown(SHORT[target] ?? target)) }
  /** A control on a board: the screen it names. A page outside this frame opens over the top. */
  function go(target: string) {
    const id = SHORT[target] ?? target
    if (!inFrame(id)) { openScreen(id); return }
    show(asShown(id) === screen ? id : asShown(id))   // "Start" on an empty board opens the board itself
  }

  const frame: React.CSSProperties = { width: 1180, minHeight: 'var(--frame-h, 100vh)', margin: '0 auto', background: '#faf5ec', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }

  // Message families is built by hand (it has sheets) and carries its own copy of the header.
  if (screen === 'AC12-AcademyBroadcast') return (
    <div data-screen={screen} style={frame}><AC12AcademyBroadcast onNav={go}/></div>
  )

  // A player's page has its own dark bar (back to the team, and all players) in place of the menus, as the boards draw it.
  if (isPlayerBoard(screen)) return (
    <OwnerGo.Provider value={go}>
      <div data-screen={screen} style={{ ...frame, color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}><PlayerPage id={screen}/></div>
    </OwnerGo.Provider>
  )

  const story = STORY_HOME && !empty && screen === HOME ? homeStory : null
  const Board = story ? undefined : OWNER_BOARDS[screen]
  const team = isTeamBoard(screen), coach = isCoachBoard(screen)   // a coach's page is one template too (pack v31)

  const ask = (
    <button onClick={() => setAskOpen(o => !o)} aria-label="Ask Clean Sheet" aria-pressed={askOpen} style={{ width: 44, height: 44, margin: '0 -5px', padding: 0, border: 0, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
      <span style={{ width: 34, height: 34, borderRadius: '50%', border: `1.5px solid ${askOpen ? G : '#c5c8c4'}`, background: askOpen ? PALE : '#fff', color: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>
      </span>
    </button>
  )

  return (
    <OwnerGo.Provider value={go}>
    <div style={frame}>
      <OwnerHeader current={screen} onGo={menuGo} extra={EXTRA} tools={ask}/>

      <div data-screen={Board || team || coach ? screen : undefined} style={Board || team || coach
        ? { flexGrow: 1, minHeight: 712, display: 'flex', flexDirection: 'column', position: 'relative', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }
        : { flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {Board && <Board/>}
        {team && <TeamPage id={screen}/>}
        {coach && <CoachPage id={screen}/>}
        {story}
        {screen === 'messages' && <Messaging me="academyowner" />}
        {screen === 'colours'  && <div style={{ overflow: 'auto' }}><ClubColours storeKey="academy" club="Tall Timber Academy" title="Academy colours" by="the owner" whole="academy" /></div>}
        {askOpen && (
          <aside role="dialog" aria-label="Ask Clean Sheet" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 380, background: '#eef5f2', borderLeft: '1px solid #e8edeb', boxShadow: '-6px 0 24px rgba(16,33,31,0.10)', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#fff', padding: '14px 16px', borderBottom: '1px solid #e8edeb', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#10211f' }}>Ask Clean Sheet</span>
              <button onClick={() => setAskOpen(false)} aria-label="Close" style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #e8edeb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a5a57' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            {/* The working chat: the question goes to the demo's server with the owner's role and what is on the screen. */}
            <AskChat role="academy owner of Tall Timber Academy (sees every team, fees and coaches; sees optional coach lessons in totals only)" heading="About this screen"
              examples={['How is attendance this term?', 'Which teams should I look at first?', 'Which families are behind on fees?']}
              places={ASK_PLACES.map(([label, id]) => ({ label, go: () => menuGo(id) }))} onOpened={() => setAskOpen(false)}
              note="Uses only what you can see as academy owner. Never sends anything by itself." />
          </aside>
        )}
      </div>
    </div>
    </OwnerGo.Provider>
  )
}
