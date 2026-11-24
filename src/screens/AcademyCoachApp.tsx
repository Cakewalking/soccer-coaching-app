// The academy coach's app: the six-item menu, and under it the board that is open.
// Every board is a screen of its own (the ADC ones in ./academycoach, the older ACC and ACT ones made from
// the designs in ./academycoach/boards); the app keeps which one is showing, lights the menu for it, and
// shows the board's empty state when the academy has nothing in it yet.

import { useState, type ReactNode } from 'react'
import { useBackState } from '../backState'
import { openScreen } from './openThing'
import CoachNav from './academycoach/CoachNav'
import { InCoachApp, type CoachMain } from './academycoach/menu'
import { COACH_BOARDS } from './academycoach/boards'
import ADC1PlayerFile from './academycoach/ADC1PlayerFile'
import ADC2Group from './academycoach/ADC2Group'
import ADC3SessionFilm from './academycoach/ADC3SessionFilm'
import ADC4SkillsCheck from './academycoach/ADC4SkillsCheck'
import ADC5ReviewChats from './academycoach/ADC5ReviewChats'
import ADC6HomePractice from './academycoach/ADC6HomePractice'
import ADCEmpty, { type ADCEmptyId } from './academycoach/ADCEmpty'
import ADC8TeamStyle from './academycoach/ADC8TeamStyle'
import ADC9PickMeasure from './academycoach/ADC9PickMeasure'
import { ADC7GameReview, ADC7eGameReviewEmpty } from './dashboards/ADC7GameReview'
import { SHOW_CHANCE_QUALITY_TILES } from './dashboards/kit'

// Each board, the main item it sits under and the sub-menu item that is lit for it, as the boards draw them.
// ACC13 (chats) has no sub-menu item; ACC12 (suggested for tonight) is lit under Training.
const LIT: Record<string, [CoachMain, string?]> = {
  'ACC1-CoachToday': ['today', 'Today'], 'ACC2-RunSession': ['today', 'Run a session'], 'ACC3-TrialAssess': ['today', 'Trial player'], 'ACC5-OneOnOne': ['today', 'One-on-one'], 'ACC13-AcademyChat': ['today'],
  'ADC2-Group': ['players', 'My group'], 'ADC1-PlayerFile': ['players', 'Player file'], 'ACC4-PlayerPlan': ['players', 'Player file'], 'ADC4-SkillsCheck': ['players', 'Skills check'],
  'ADC5-ReviewChats': ['players', 'Review chats'], 'ACC6-ReportDraft': ['players', 'Term report'],
  'ADC10-SetGoal': ['players', 'Player file'], 'ADC12-WholePlayer': ['players', 'Player file'], 'ADC14-SuggestMove': ['players', 'Player file'], 'ADC13-CheckEntry': ['players', 'Skills check'],
  'ADC11-AfterSession': ['today', 'Run a session'], 'ADC15-MySession': ['record', 'Tonight’s film'],
  'ACT1-AcademyWeek': ['training', 'This week'], 'ACT2-AcademySuggested': ['training', 'Suggested'], 'ACC12-AcademySuggested': ['training', 'Suggested'], 'ACT3-AcademySessionPlan': ['training', 'Session plan'],
  'ACT4-AcademyComing': ['training', 'Who’s coming'], 'ADC6-HomePractice': ['training', 'Practice at home'],
  'ACC7-AcademyGameDay': ['gameday', 'This Sunday'], 'ADC8-TeamStyle': ['gameday', 'Our style'], 'ADC9-PickMeasure': ['gameday', 'Our style'], 'ADC7-GameReview': ['gameday', 'Review'],   // Review (ADC7) is the dashboards' screen, shown here under the menu
  'ADC16-Chances': ['gameday', 'Review'], 'ADC17-YourTake': ['gameday', 'Review'], 'ADC18-Learn': ['learn'],
  'ACC8-AcademyRecord': ['record', 'Record'], 'ACC8p-PairCamera': ['record', 'Record'], 'ACC9-AcademyRecordDrill': ['record', 'Record'], 'ACC10-AcademyRecordResults': ['record', 'Record'],
  'ACC11-AcademyRecording': ['record', 'Record'], 'ADC3-SessionFilm': ['record', 'Tonight’s film'],
}
// The older addresses that named a main item rather than a board.
const FIRST: Record<string, string> = { today: 'ACC1-CoachToday', players: 'ADC2-Group', training: 'ACT1-AcademyWeek', gameday: 'ACC7-AcademyGameDay', record: 'ACC8-AcademyRecord', learn: 'ADC18-Learn' }
// A board's empty state: the same id with an "e" after its number.
const EMPTY_IDS = [
  'ACC1e-CoachTodayEmpty', 'ACC2e-RunSessionEmpty', 'ACC3e-TrialAssessEmpty', 'ACC4e-PlayerPlanEmpty', 'ACC5e-OneOnOneEmpty', 'ACC6e-ReportDraftEmpty', 'ACC7e-AcademyGameDayEmpty',
  'ACC8e-AcademyRecordEmpty', 'ACC10e-AcademyRecordResultsEmpty', 'ACC12e-AcademySuggestedEmpty', 'ACC13e-AcademyChatEmpty', 'ACT1e-AcademyWeekEmpty',
  'ADC8e-TeamStyleEmpty', 'ADC7e-GameReviewEmpty', 'ADC11e-AfterSessionEmpty', 'ADC13e-CheckEntryEmpty',
  'ADC1e-PlayerFileEmpty', 'ADC2e-GroupEmpty', 'ADC3e-SessionFilmEmpty', 'ADC4e-SkillsCheckEmpty', 'ADC5e-ReviewChatsEmpty', 'ADC6e-HomePracticeEmpty',
]
const code = (id: string) => id.split('-')[0]
const BASE_OF: Record<string, string> = Object.fromEntries(EMPTY_IDS.map(e => [e, Object.keys(LIT).find(b => code(b) + 'e' === code(e)) ?? e]))
const EMPTY_OF: Record<string, string> = Object.fromEntries(Object.entries(BASE_OF).map(([e, b]) => [b, e]))
const boardOf = (id: string) => BASE_OF[id] ?? FIRST[id] ?? id

export default function AcademyCoachApp({ empty: emptyApp = false, initialScreen, onNavChange, homeStory }: { onBack?: () => void; empty?: boolean; initialScreen?: string; onNavChange?: (screen: string) => void; homeStory?: ReactNode }) {
  const asked = boardOf(initialScreen ?? 'today')
  const first = asked === 'ADC16-Chances' && !SHOW_CHANCE_QUALITY_TILES ? 'ADC7-GameReview' : asked   // hidden until chance values are validated
  const empty = emptyApp || (initialScreen ?? '') in BASE_OF   // an empty-state address opens the app with nothing in it
  const [board, setBoard] = useBackState<string>(first in LIT ? first : FIRST.today)
  const [askOpen, setAskOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  // Open a screen by its id. The app shows its own boards in place; anything else
  // (Learn, the view switcher, a club coach's screen) opens over the top with a Back bar.
  function go(id: string) {
    let to = boardOf(id)
    if (to === 'ADC16-Chances' && !SHOW_CHANCE_QUALITY_TILES) to = 'ADC7-GameReview'   // the Chances tab is hidden until chance values are validated
    if (!(to in LIT)) { openScreen(id); return }
    if (LIT[to][0] !== LIT[board][0]) onNavChange?.(LIT[to][0])
    setBoard(to)
  }

  const [main, sub] = LIT[board]
  const showing = empty && EMPTY_OF[board] ? EMPTY_OF[board] : board   // the id of what is on screen
  const Older = COACH_BOARDS[showing]
  const page =
    showing === 'ACC1-CoachToday' && homeStory ? homeStory :
    showing === 'ADC1-PlayerFile' ? <ADC1PlayerFile go={go} /> :
    showing === 'ADC2-Group' ? <ADC2Group go={go} /> :
    showing === 'ADC3-SessionFilm' ? <ADC3SessionFilm go={go} /> :
    showing === 'ADC4-SkillsCheck' ? <ADC4SkillsCheck go={go} /> :
    showing === 'ADC5-ReviewChats' ? <ADC5ReviewChats go={go} /> :
    showing === 'ADC6-HomePractice' ? <ADC6HomePractice go={go} /> :
    showing === 'ADC8-TeamStyle' ? <ADC8TeamStyle go={go} /> :
    showing === 'ADC9-PickMeasure' ? <ADC9PickMeasure go={go} /> :
    showing === 'ADC7-GameReview' ? <ADC7GameReview onNav={go} /> : showing === 'ADC7e-GameReviewEmpty' ? <ADC7eGameReviewEmpty onNav={go} /> :
    Older ? <Older onNav={go} /> :
    showing.startsWith('ADC') ? <ADCEmpty id={showing as ADCEmptyId} go={go} /> : null

  // The live recording takes the whole screen: no menu until it is stopped.
  if (showing === 'ACC11-AcademyRecording') {
    return (
      <InCoachApp.Provider value={true}>
        <div data-at={showing} style={{ width: 1180, minHeight: 'var(--frame-h, 100vh)', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>{page}</div>
      </InCoachApp.Provider>
    )
  }

  return (
    <InCoachApp.Provider value={true}>
    <div data-at={showing} style={{ width: 1180, minHeight: 'var(--frame-h, 100vh)', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* The six-item menu and the sub-menu under it */}
      <CoachNav active={main} sub={sub} go={go}
        onAccount={() => openScreen('SET1-Account', 'Reece Whitlam · coach, Tall Timber Academy')}
        extra={
          <button onClick={() => setAskOpen(o => !o)} aria-label="Ask Clean Sheet" data-club-keep={askOpen ? '' : undefined} style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #a9cfc0', background: askOpen ? '#fff' : 'transparent', color: askOpen ? '#10211f' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>
          </button>
        }/>

      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {page}
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
              {['Who is making the most progress?', 'Which players need more one-on-ones?', 'Is anyone behind on their term goals?'].map(q => (
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
              <div style={{ fontSize: 11, color: '#4a5a57', lineHeight: 1.5 }}>Uses only what you can see as academy coach. Never sends anything by itself.</div>
            </div>
          </aside>
        )}
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
    </InCoachApp.Provider>
  )
}
