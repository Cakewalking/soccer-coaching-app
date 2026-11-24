// The academy owner's app: one frame (the green bar, the six main items and the sub-menu under them) around every owner board.
// The boards themselves are in ./academy, drawn from the academy handover (24 Nov, v2); this file is the frame and how they open.
import Messaging from './messaging/Messaging'
import ClubColours from './clubadmin/ClubColours'
import { openScreen } from './openThing'
import { useBackState } from '../backState'
import { useState } from 'react'
import OwnerHeader from './academy/OwnerHeader'
import { OwnerGo, ownerMainOf, ownerStem, type OwnerItem } from './academy/ownerMenu'
import { OWNER_BOARDS } from './academy/adScreens'
import AC12AcademyBroadcast from './step4/AC12AcademyBroadcast'

const G    = '#2f6252'
const INK  = '#10211f'
const PALE = '#eef5f2'

const HOME = 'AD1-AcademyHome'
// The owner's Home is AD1. Turn this on to show the story home on Overview again where one is passed in.
const STORY_HOME = false
// Two pages the handover's menu does not list. They stay at the end of Home so nothing built is lost.
const EXTRA: OwnerItem[] = [{ label: 'Messages', id: 'messages' }, { label: 'Academy colours', id: 'colours' }]
// The short names this app was opened with before each page had a board id.
const SHORT: Record<string, string> = {
  home: HOME, overview: HOME, trials: 'AC3-Trials', reports: 'AC7-ReportsOut', safety: 'AC10-AcademySafety', partner: 'AC11-PartnerClub',
  programs: 'AC2-Programs', players: 'AC4-AcademyPlayers', curriculum: 'AD6-YearPlan', coaches: 'AC6-AcademyCoaches', money: 'AC5-Fees',
}
// Every page this app shows in its own frame. Anything else opens over the top with a Back bar.
const IN_FRAME = new Set([...Object.keys(OWNER_BOARDS), 'AC12-AcademyBroadcast', ...EXTRA.map(s => s.id)])
// The empty state of each board: "AD3-Timetable" has "AD3e-TimetableEmpty".
const EMPTY_OF: Record<string, string> = {}
for (const e of IN_FRAME) if (/^A[CD]\d+e-/.test(e)) { const full = [...IN_FRAME].find(id => id !== e && ownerStem(id) === ownerStem(e)); if (full) EMPTY_OF[full] = e }

/**
 * `empty` is an academy with nothing in it yet (the sandbox): every board shows its empty state, and Home is AD1e,
 * whose one button opens set-up (AD16). In the demo Home is AD1: set-up is treated as finished, and AD16 keeps its own address.
 */
export default function AcademyOwnerApp({ empty = false, initialScreen, onNavChange, homeStory }: { onBack?: () => void; empty?: boolean; initialScreen?: string; onNavChange?: (screen: string) => void; homeStory?: import('react').ReactNode }) {
  const asShown = (id: string) => empty ? EMPTY_OF[id] ?? id : id
  const [screen, setScreen] = useBackState<string>(() => { const id = SHORT[initialScreen ?? ''] ?? initialScreen ?? HOME; return IN_FRAME.has(id) ? asShown(id) : asShown(HOME) })
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  const [askOpen, setAskOpen] = useState(false)

  function show(id: string) { setScreen(id); onNavChange?.(ownerMainOf(id)) }   // the address keeps the main item, so a reload opens the same part of the app
  /** A menu item: one of the owner's own pages, in the state the academy is in. */
  function menuGo(target: string) { show(asShown(SHORT[target] ?? target)) }
  /** A control on a board: the screen it names. A page outside this frame opens over the top. */
  function go(target: string) {
    const id = SHORT[target] ?? target
    if (!IN_FRAME.has(id)) { openScreen(id); return }
    show(asShown(id) === screen ? id : asShown(id))   // "Start" on an empty board opens the board itself
  }

  const frame: React.CSSProperties = { width: 1180, minHeight: 'var(--frame-h, 100vh)', margin: '0 auto', background: '#faf5ec', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }

  // Message families is built by hand (it has sheets) and carries its own copy of the header.
  if (screen === 'AC12-AcademyBroadcast') return (
    <div data-screen={screen} style={frame}><AC12AcademyBroadcast onNav={go}/></div>
  )

  const story = STORY_HOME && !empty && screen === HOME ? homeStory : null
  const Board = story ? undefined : OWNER_BOARDS[screen]

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

      <div data-screen={Board ? screen : undefined} style={Board
        ? { flexGrow: 1, minHeight: 712, display: 'flex', flexDirection: 'column', position: 'relative', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }
        : { flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {Board && <Board/>}
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
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#4a5a57', textTransform: 'uppercase' as const, marginTop: 4 }}>About this screen</div>
              {['How is attendance this term?', 'Who is ready for a report?', 'Which players are behind on fees?'].map(q => (
                <button key={q} onClick={() => showToast(q)} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: '1px solid #e8edeb', background: '#fff', color: '#2f6252', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{q}</button>
              ))}
              <div style={{ fontSize: 12, color: '#4a5a57', marginTop: 4 }}>Or anything else</div>
            </div>
            <div style={{ background: '#fff', padding: '10px 14px 12px', borderTop: '1px solid #e8edeb', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <input placeholder="Ask a follow-up…" style={{ flex: 1, height: 40, padding: '0 12px', borderRadius: 8, border: '1px solid #e8edeb', fontSize: 13, fontFamily: 'inherit', outline: 'none', color: '#10211f' }} />
                <button onClick={() => showToast('Ask sent.')} style={{ width: 44, height: 44, borderRadius: 8, background: '#2f6252', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
              <div style={{ fontSize: 11, color: '#4a5a57', lineHeight: 1.5 }}>Uses only what you can see as academy owner. Never sends anything by itself.</div>
            </div>
          </aside>
        )}
        {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#1f4a3e', color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
      </div>
    </div>
    </OwnerGo.Provider>
  )
}
