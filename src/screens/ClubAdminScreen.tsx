import { openScreen } from './openThing'
import { Crest } from '../clubTheme'
import { useBackState } from '../backState'
import { openThing } from './openThing'
import { useEffect, useState, cloneElement, isValidElement } from 'react'
import AskChat from '../ask/AskChat'
import { setAskContext } from '../ask/ask'
import { setAskWho } from '../ask/askState'
import { ASK_AS } from '../ask/roles'
import { clubContext } from '../ask/clubContext'
import type { ReactElement } from 'react'
import type { AdminTab } from './clubadmin/data'
import ClubFlowScreen from './clubflows/flows'
import { ClubFlowOpen, DIRECTOR_FLOW_TAB } from './clubflows/open'
import { DirectorMessages } from './MessagesScreens'
import ClubTab from './clubadmin/ClubTab'
import TeamsTab from './clubadmin/TeamsTab'
import CoachesTab from './clubadmin/CoachesTab'
import PlayersTab from './clubadmin/PlayersTab'
import SafeguardingTab from './clubadmin/SafeguardingTab'
import ReportsTab from './clubadmin/ReportsTab'
import ClubRulesTab from './clubadmin/ClubRulesTab'
import ClubPlanTab from './clubadmin/ClubPlanTab'
import CalendarTab from './clubadmin/CalendarTab'
import LeagueSyncTab from './clubadmin/LeagueSyncTab'
import RefereesTab from './clubadmin/RefereesTab'
import SidelineTab from './clubadmin/SidelineTab'
import WelfareTab from './clubadmin/WelfareTab'
import ConcussionTab from './clubadmin/ConcussionTab'
import GoalkeepersTab from './clubadmin/GoalkeepersTab'
import SP18ClubPhases from './footballyear/SP18ClubPhases'
import SP19TrialWindow from './footballyear/SP19TrialWindow'
import FilesTab from './clubadmin/FilesTab'
import FeaturesTab from './clubadmin/FeaturesTab'

export default function ClubAdminScreen({ empty, role = 'chair', initials = 'RM', initialTab = 'club', onNav, homeStory, initialFeature, initialTeamsView, initialSub, initialFlow }: { /** an input screen (GP3 to GP5) to open on, over the tab */ initialFlow?: string; initialFeature?: string; initialTeamsView?: string; /** a sub-tab to open on: a Coaches view, or a Club screen id */ initialSub?: string; empty?: boolean; role?: 'chair' | 'dof' | 'welfare'; initials?: string; initialTab?: AdminTab; onNav?: (s: string) => void; homeStory?: import('react').ReactNode }) {
  const safeInitial: AdminTab = initialTab === 'welfare' && role !== 'welfare' ? 'club' : initialTab
  const [tab, setTab] = useBackState<AdminTab>(safeInitial)
  // An input screen (change a role, link an academy, add a sponsor) shown in place of the tab. The tab stays as it was underneath.
  const [flow, setFlow] = useBackState<string | null>(initialFlow ?? null)
  const openFlow = (id: string) => { const t = DIRECTOR_FLOW_TAB[id]; if (!t) { openScreen(id); return } setTab(t); setFlow(id) }
  const flowGo = (id: string) => { if (id === 'CN20-Sponsors' || frameNav(id)) { setFlow(null); return } if (onNav) onNav(id); else { setFlow(null); openScreen(id) } }
  const [askOpen, setAskOpen] = useState(false)
  // Ask Clean Sheet: who is asking. The director and the chair get the club's totals team by team; the welfare officer gets no summary, and her concerns are never sent.
  const askAs = ASK_AS[role === 'chair' ? 'chair' : role === 'welfare' ? 'welfare' : 'director']
  useEffect(() => role === 'welfare' ? undefined : setAskContext('club', clubContext), [role])
  useEffect(() => setAskWho({ ...askAs, open: () => { setAskOpen(true); return true } }), [askAs])

  // Home-story deep-links that match a real frame tab switch the outer nav
  // (lit in the top bar) instead of rendering a nested, double-framed screen.
  const FRAME_TABS: Partial<Record<string, AdminTab>> = {
    'D1-ClubOverview': 'club', 'D1b-ClubChair': 'club',
    'D2-Teams': 'teams', 'D3-Coaches': 'coaches', 'D4-Players': 'players',
    'D5-Safeguarding': 'safeguarding', 'D6-BoardReport': 'reports',
  }
  function frameNav(s: string): boolean {
    const t = FRAME_TABS[s]
    if (t) { setTab(t); return true }
    return false
  }
  const story = isValidElement(homeStory)
    ? cloneElement(homeStory as ReactElement<{ frameNav?: (s: string) => boolean }>, { frameNav })
    : homeStory

  const ALL_TABS: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'club',         label: 'Club',          icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { id: 'teams',        label: 'Teams',         icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
    { id: 'coaches',      label: 'Coaches',       icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' },
    { id: 'players',      label: 'Players',       icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { id: 'safeguarding', label: 'Safeguarding',  icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { id: 'reports',      label: 'Reports',       icon: 'M18 20V10M12 20V4M6 20v-6' },
    { id: 'rules',        label: 'Club rules',    icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
    { id: 'plan',         label: 'Plan',          icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h5' },
    { id: 'calendar',     label: 'Calendar',      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'leaguesync',   label: 'League sync',   icon: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15' },
    { id: 'referees',     label: 'Referees',      icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { id: 'sideline',     label: 'Sideline',      icon: 'M15 10l4.553-2.069A1 1 0 0121 8.869v6.262a1 1 0 01-1.447.894L15 14M3 8h12v9H3z' },
    { id: 'welfare',      label: 'Welfare',       icon: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
    { id: 'concussion',   label: 'Concussion',    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4M12 16h.01' },
    { id: 'goalkeepers',  label: 'Goalkeepers',   icon: 'M15 10l4.553-2.069A1 1 0 0121 8.869v6.262a1 1 0 01-1.447.894L15 14M3 8h12v9H3z' },
    { id: 'footballyear', label: 'Football year',  icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
    { id: 'trialwindow',  label: 'Trials',         icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12l2 2 4-4' },
    { id: 'messages',     label: 'Messages',       icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
    { id: 'files',        label: 'Files',          icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6' },
    { id: 'features',     label: 'Features and billing', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
  ]
  // APP-MAP.md: director, chair and coordinator all get the SAME six tabs — no
  // more. Files, Features and billing, Messages, Calendar etc. are sub-tabs of
  // Club, not top tabs (FIX-LIST item 3).
  const CHAIR_TAB_IDS = new Set(['club', 'teams', 'coaches', 'players', 'safeguarding', 'reports'])
  const DOF_TAB_IDS   = new Set(['club', 'teams', 'coaches', 'players', 'safeguarding', 'reports'])
  // The welfare officer gets her own three: concerns, children checks and private messages.
  const WELFARE_TABS: { id: AdminTab; label: string }[] = [{ id: 'welfare', label: 'Concerns' }, { id: 'safeguarding', label: 'Children checks' }, { id: 'messages', label: 'Messages' }]
  const TABS = role === 'welfare' ? WELFARE_TABS.map(w => ({ ...ALL_TABS.find(t => t.id === w.id)!, label: w.label }))
             : role === 'chair'   ? ALL_TABS.filter(t => CHAIR_TAB_IDS.has(t.id))
             :                      ALL_TABS.filter(t => DOF_TAB_IDS.has(t.id))

  return (
    <div style={{ background: '#faf5ec', minHeight: 'var(--frame-h, 100vh)', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div data-club-bar="" style={{ background: '#1f4a3e', padding: '14px 24px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>Clean Sheet</div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>·</span>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>CLUB</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setAskOpen(o => !o)} aria-label="Ask Clean Sheet" data-club-keep={askOpen ? '' : undefined} style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #a9cfc0', background: askOpen ? '#fff' : 'transparent', color: askOpen ? '#10211f' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>
            </button>
            <button data-club-pill="" onClick={() => onNav ? onNav('VS1-SwitchView') : openThing('club selector', 'coach')} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Crest size={18} />Whole club
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <button onClick={() => openScreen('SET1-Account', role === 'chair' ? 'Greg Lawson · chair, Wattle Creek FC' : role === 'welfare' ? 'Helen Park · welfare officer, Wattle Creek FC' : 'Rachel M · director of football, Wattle Creek FC')} aria-label="Your account and settings" data-club-keep="" style={{ width: 44, height: 44, border: 0, padding: 0, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 32, height: 32, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', fontSize: 12, fontWeight: 700 }}>{initials}</span></button>
          </div>
        </div>

        {/* Main tab nav */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: 4 }}>
          {TABS.map(t => (
            <button key={t.id} data-club-tab={tab === t.id ? 'on' : 'off'} onClick={() => { setTab(t.id); setFlow(null) }} style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, height: 44, padding: '0 14px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 13, fontWeight: tab === t.id ? 700 : 400, cursor: 'pointer', color: tab === t.id ? '#fff' : 'rgba(255,255,255,0.6)', borderBottom: tab === t.id ? '2px solid #fff' : '2px solid transparent', boxSizing: 'border-box' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon}/></svg>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Role badge strip */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e9eae8', padding: '0 24px', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span style={{ fontSize: 12, color: '#5c6b67', fontWeight: 600 }}>{role === 'chair' ? 'Chair' : role === 'welfare' ? 'Welfare officer' : 'Director of Football'}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        {flow && <div data-screen={flow} style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}><ClubFlowScreen id={flow} go={flowGo} /></div>}
        <ClubFlowOpen.Provider value={openFlow}>
        <div style={{ flex: 1, overflowY: 'auto', display: flow ? 'none' : 'flex', flexDirection: 'column' }}>
          {tab === 'club'         && <ClubTab role={role === 'welfare' ? 'chair' : role} empty={empty} homeStory={story} onNav={onNav} initialView={initialSub} />}
          {tab === 'teams'        && <TeamsTab empty={empty} initialView={initialTeamsView} onNav={onNav} />}
          {tab === 'coaches'      && <CoachesTab empty={empty} role={role === 'welfare' ? 'chair' : role} onNav={onNav} initialView={initialSub} />}
          {tab === 'players'      && <PlayersTab empty={empty} onNav={onNav} />}
          {tab === 'safeguarding' && <SafeguardingTab empty={empty} />}
          {tab === 'reports'      && <ReportsTab empty={empty} />}
          {tab === 'rules'        && <ClubRulesTab empty={empty} />}
          {tab === 'plan'         && <ClubPlanTab empty={empty} />}
          {tab === 'calendar'     && <CalendarTab empty={empty} />}
          {tab === 'leaguesync'   && <LeagueSyncTab empty={empty} />}
          {tab === 'referees'     && <RefereesTab empty={empty} />}
          {tab === 'sideline'     && <SidelineTab empty={empty} />}
          {tab === 'welfare'      && <div data-ask-skip="" style={{ display: 'contents' }}><WelfareTab empty={empty} /></div>}{/* concerns are never sent with a question */}
          {tab === 'concussion'   && <ConcussionTab empty={empty} />}
          {tab === 'goalkeepers'  && <GoalkeepersTab empty={empty} />}
          {tab === 'footballyear' && <SP18ClubPhases onBack={() => setTab('club')} />}
          {tab === 'trialwindow'  && <SP19TrialWindow onBack={() => setTab('club')} />}
          {tab === 'messages'     && (role === 'welfare' ? <div data-ask-skip="" style={{ flex: 1, minHeight: 560, display: 'flex' }}><DirectorMessages embedded as="welfare" /></div> : <DirectorMessages />)}
          {tab === 'files'        && <FilesTab onNav={onNav} />}
          {tab === 'features'     && <FeaturesTab onNav={onNav} initial={initialFeature} />}
        </div>
        </ClubFlowOpen.Provider>
        {askOpen && (
          <aside role="dialog" aria-label="Ask Clean Sheet" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 380, background: '#eef5f2', borderLeft: '1px solid #e8edeb', boxShadow: '-6px 0 24px rgba(16,33,31,0.10)', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#fff', padding: '14px 16px', borderBottom: '1px solid #e8edeb', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: '#10211f' }}>Ask Clean Sheet</span>
              <button onClick={() => setAskOpen(false)} aria-label="Close" style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #e8edeb', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a5a57' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            {/* The working chat: the question goes to the demo's server with this person's role and what is on the screen. */}
            <AskChat role={askAs.role} heading="About this screen" examples={askAs.examples} note={askAs.note} focus
              places={TABS.map(t => ({ label: t.label, go: () => { setTab(t.id); setFlow(null) } }))} onOpened={() => setAskOpen(false)} />
          </aside>
        )}
      </div>
    </div>
  )
}
