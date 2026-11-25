import { groupTabs, landing, remember, TabSwitches } from './tabGroups'
import { setHash, slugOf } from '../backState'
import { openScreen } from './openThing'
import { Crest } from '../clubTheme'
import { useEffect } from 'react'
import AskChat, { type AskPlace } from '../ask/AskChat'
import { openAsk } from '../ask/askState'
import { ASK_AS } from '../ask/roles'
import { useUnreadTotal } from './messageUnread'
import type { ReactNode } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'

const SPARKLE  = 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'
const X_P      = 'M18 6L6 18M6 6l12 12'
const CHEVD    = 'M6 9l6 6 6-6'

function S({ d, size = 18, stroke = 'currentColor', sw = 2.2 }: { d: string; size?: number; stroke?: string; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d}/>
    </svg>
  )
}

interface CoachTabletFrameProps {
  navTabs: { id: string; label: string; icon: string }[]
  activeNav: string
  onNav: (id: string) => void
  subTabs?: string[]
  activeSubTabIndex?: number
  onSubTab?: (i: number) => void
  roleChip: string
  teamLabel: string
  /** the team pill opens the view switcher */
  onTeam?: () => void
  /** the avatar opens account and settings; the app can say how */
  onAvatar?: () => void
  avatarLetters: string
  avatarBg?: string
  showAsk?: boolean
  askOpen?: boolean
  onAskToggle?: () => void
  askQuestions?: string[]
  /** the role in a few words, for the line under the box: "head coach" */
  askRole?: string
  /** who is asking and what they may see, in words the server can act on */
  askAs?: string
  /** the screens Ask can offer to open, by their menu label */
  askPlaces?: AskPlace[]
  showBadge?: (tab: string) => boolean
  children: ReactNode
}

export default function CoachTabletFrame({
  navTabs, activeNav, onNav,
  subTabs = [], activeSubTabIndex = 0, onSubTab,
  roleChip, teamLabel, onTeam, onAvatar, avatarLetters, avatarBg = '#c39797',
  showAsk = true, askOpen = false, onAskToggle,
  askQuestions, askRole = 'head coach', askAs = ASK_AS.visitor.role, askPlaces,
  showBadge,
  children,
}: CoachTabletFrameProps) {

  const unreadMessages = useUnreadTotal()
  // keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (document.activeElement as HTMLElement | null)?.tagName ?? ''
      const isField = tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement as HTMLElement | null)?.isContentEditable
      if (e.key === 'Escape' && askOpen) { e.preventDefault(); onAskToggle?.() }
      else if (e.key === '/' && !askOpen && !isField) { e.preventDefault(); onAskToggle?.() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [askOpen, onAskToggle])

  // team name without club suffix
  const teamName  = teamLabel.split(' · ')[0]
  // The sub-tab is part of the address ("/look/youth/training#run-sheet"), so a link opens it and the address says where you are.
  const subKey = subTabs.join('|')
  // A long row of sub-tabs is folded into a few groups; the group you are in shows its screens as switches.
  const groups = groupTabs(subTabs), inGroup = groups.find(g => g.members.includes(activeSubTabIndex))
  if (inGroup) remember(inGroup, activeSubTabIndex)
  useEffect(() => {          // opened from a link: go to the sub-tab it names
    const want = window.location.hash.slice(1), i = subTabs.findIndex(t => slugOf(t) === want)
    if (want && i >= 0 && i !== activeSubTabIndex) onSubTab?.(i)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subKey])
  useEffect(() => () => setHash(null), [])   // leaving the app clears it
  useEffect(() => { setHash(subTabs.length && activeSubTabIndex > 0 ? slugOf(subTabs[activeSubTabIndex] ?? '') : null) }, [subKey, activeSubTabIndex])   // eslint-disable-line react-hooks/exhaustive-deps

  const questions = askQuestions ?? ['What should we work on tonight?', 'Is everyone getting fair minutes?', 'Who needs a rest this week?']

  const btnBase: React.CSSProperties = {
    width: 44, height: 44, borderRadius: '50%', border: `1.5px solid #a9cfc0`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit',
  }

  return (
    <div style={{ width: 1180, minHeight: 'var(--frame-h, 100vh)', margin: '0 auto', background: 'var(--surface-100)', color: 'var(--ink)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      <div style={{ flex: 'none', background: '#ffffff', borderBottom: `1px solid ${LN}` }}>

        {/* 64px green nav bar */}
        <div data-club-bar="" style={{ height: 64, padding: '0 28px', background: G, display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => onNav('home')} style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: '0 8px', alignSelf: 'stretch', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            Clean Sheet
          </button>
          <nav style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
            {navTabs.map(t => (
              <button key={t.id} data-club-tab={activeNav === t.id ? 'on' : 'off'} onClick={() => onNav(t.id)} style={{
                display: 'flex', alignItems: 'center', gap: 7, height: 44, padding: '0 14px', borderRadius: '999px',
                border: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                background: activeNav === t.id ? G2 : 'transparent', color: '#fff',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon}/></svg>
                {t.label}
              </button>
            ))}
          </nav>
          {/* Ask button: on every tab, Home too (the home no longer has its own ask bar) */}
          {showAsk && (
            <button
              onClick={onAskToggle ?? (() => openAsk())}
              aria-label="Ask Clean Sheet" data-club-keep={askOpen ? '' : undefined}
              style={{ ...btnBase, background: askOpen ? '#fff' : 'transparent', color: askOpen ? INK : '#fff' }}
            >
              <S d={SPARKLE} size={18} stroke={askOpen ? INK : '#fff'} />
            </button>
          )}
          {/* Team pill — name only */}
          <button data-club-pill="" onClick={onTeam} disabled={!onTeam} aria-label={teamLabel} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.15)', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#fff', flexShrink: 0, cursor: onTeam ? 'pointer' : 'default' }}>
            <Crest size={20} />{teamName}
            <S d={CHEVD} size={16} />
          </button>
          {/* The avatar opens the coach's account and settings */}
          <button onClick={() => onAvatar ? onAvatar() : openScreen('SET1-Account')} aria-label="Your account and settings" data-club-keep="" style={{ width: 44, height: 44, borderRadius: '999px', border: 0, padding: 0, background: avatarBg, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', fontWeight: 700, fontSize: 15, flexShrink: 0, cursor: 'pointer' }}>{avatarLetters}</button>
        </div>

        {/* 44px white sub-tabs bar */}
        {subTabs.length > 0 && (
          <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
            <nav style={{ display: 'flex', flexGrow: 1, minWidth: 0, height: 44, overflowX: 'auto', scrollbarWidth: 'none' }}>
              {groups.map(g => {
                const active = g.members.includes(activeSubTabIndex), tab = g.label
                return (
                  <button key={tab} onClick={() => onSubTab?.(landing(g))} ref={active ? el => { if (el?.parentElement) { const n = el.parentElement, r = el.offsetLeft + el.offsetWidth - n.clientWidth; if (r > n.scrollLeft) n.scrollLeft = r; else if (el.offsetLeft < n.scrollLeft) n.scrollLeft = el.offsetLeft } } : undefined} style={{
                    height: 44, padding: '0 16px', border: 0, background: 'transparent', whiteSpace: 'nowrap', flexShrink: 0, outlineOffset: -3,   // a long row of tabs scrolls sideways, it never wraps

                    fontFamily: 'inherit', fontSize: 15, fontWeight: active ? 600 : 400,
                    color: active ? INK : MUT, cursor: 'pointer',
                    borderBottom: active ? `3px solid ${G2}` : '3px solid transparent',
                    display: 'flex', alignItems: 'center', paddingBottom: 3, gap: 6,
                    boxSizing: 'border-box',
                  }}>
                    {tab}
                    {g.members.some(n => showBadge?.(subTabs[n])) && (tab !== 'Messages' || unreadMessages > 0) && (
                      <span style={{ background: '#c39797', color: INK, borderRadius: '999px', padding: '0 7px', fontSize: 12, lineHeight: '19px' }}>{tab === 'Messages' ? unreadMessages : 3}</span>
                    )}
                  </button>
                )
              })}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: '999px', background: '#f4e6e6', color: '#10211f', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"/></svg>
                {roleChip}
              </span>
            </div>
          </div>
        )}
        {/* the screens inside the group you are in */}
        <TabSwitches group={inGroup} labels={subTabs} active={activeSubTabIndex} onPick={n => onSubTab?.(n)} />
      </div>

      {/* Content + Ask panel */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}

        {/* Ask panel */}
        {showAsk && askOpen && (
          <aside role="dialog" aria-label="Ask Clean Sheet" style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 380,
            background: PALE,
            borderLeft: `1px solid ${LN}`,
            boxShadow: '-6px 0 24px rgba(16,33,31,0.10)',
            zIndex: 50,
            display: 'flex', flexDirection: 'column',
          }}>

            {/* White header */}
            <div style={{ background: '#fff', padding: '14px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <S d={SPARKLE} size={18} stroke={G} sw={1.8} />
              <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: INK }}>Ask Clean Sheet</span>
              <button
                onClick={onAskToggle}
                aria-label="Close"
                style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT, flexShrink: 0 }}
              >
                <S d={X_P} size={14} />
              </button>
            </div>

            {/* The working chat: the question goes to the demo's server with this person's role and what is on the screen. */}
            <AskChat role={askAs} heading="About this screen" examples={questions} places={askPlaces} focus
              note={`Uses only what you can see as ${askRole}. Never sends anything by itself.`} />
          </aside>
        )}
      </div>
    </div>
  )
}
