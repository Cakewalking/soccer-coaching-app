import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'

const SPARKLE  = 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'
const SEND_P   = 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z'
const X_P      = 'M18 6L6 18M6 6l12 12'
const HIST_P   = 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 7v5l3 3'
const CHEVD    = 'M6 9l6 6 6-6'

function S({ d, size = 18, stroke = 'currentColor', sw = 2.2 }: { d: string; size?: number; stroke?: string; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d}/>
    </svg>
  )
}

type DemoAnswer = {
  conclusion: string
  detail: string
  used: { label: string; note: string }[]
  actions: { label: string; nav: string }[]
}

const DEMO_ANSWERS: Record<string, DemoAnswer> = {
  'Who needs a rest this week?': {
    conclusion: 'Mia Tran is approaching her load limit.',
    detail: ' She played 73 minutes on Saturday and her training load this week is the highest in the squad. She is under the equal-minutes threshold for U12.',
    used: [
      { label: 'Recorded games', note: 'Last 9 games, U12 Sam' },
      { label: 'Training load', note: 'This week' },
    ],
    actions: [{ label: "Open Mia's profile", nav: 'squad' }, { label: 'See squad load', nav: 'training' }],
  },
  'What should we work on tonight?': {
    conclusion: 'Winning the ball back faster after a turnover.',
    detail: ' In 7 of 9 games the gap between lines grew by 8 metres in the 5 seconds after losing the ball.',
    used: [
      { label: 'Recorded games', note: '9 games, U12 Sam' },
      { label: 'Gap between the lines', note: 'By phase' },
    ],
    actions: [{ label: 'Add a drill to tonight', nav: 'training' }, { label: 'Show me the clips', nav: 'clips' }],
  },
  "Is everyone getting fair minutes?": {
    conclusion: 'Two players are below the equal-minutes threshold.',
    detail: ' Lachlan Chen has played 42% of available minutes and Sam Nguyen 38%. Both have been absent for some games.',
    used: [
      { label: 'Game minutes', note: 'Last 12 games, U12 Sam' },
      { label: 'Equal-minutes rule', note: 'U12: all players ≥ half a game' },
    ],
    actions: [{ label: 'Open squad minutes', nav: 'squad' }],
  },
  'Who is over their load this week?': {
    conclusion: 'James Okafor and Tom Walsh are in the high-load zone.',
    detail: ' Both have session loads above 80% of their 4-week average. James played 90 minutes on the weekend.',
    used: [
      { label: 'Training load', note: 'This week' },
      { label: 'Recorded games', note: 'Last 4 weeks' },
    ],
    actions: [{ label: 'See squad load', nav: 'training' }],
  },
  'What did Kingfisher United do to us?': {
    conclusion: 'They pressed high and forced long balls from the keeper.',
    detail: ' In 7 of 9 phases we went long from goalkeeper kicks. Their striker won 70% of aerial duels in our half.',
    used: [
      { label: 'Recorded games', note: '9 games' },
      { label: 'Ball recovery locations', note: 'By phase' },
    ],
    actions: [{ label: 'Show me the clips', nav: 'clips' }],
  },
  "Who has exams coming up?": {
    conclusion: 'Four players have exam clashes in the next two weeks.',
    detail: ' Priya, Tom, Alice, and Remi have exam dates on the calendar. Tom has exams on Saturday and may not be available.',
    used: [
      { label: 'Team calendar', note: 'Next 2 weeks' },
      { label: 'Player notes', note: 'Availability flags' },
    ],
    actions: [{ label: 'Open calendar', nav: 'training' }],
  },
  "Who is one yellow from a ban?": {
    conclusion: 'Callum Reid has 4 yellows — one more means a ban.',
    detail: ' He picked up his 4th card on Saturday. Under competition rules, 5 yellows triggers a one-game ban. Next game is Saturday at home.',
    used: [
      { label: 'Cards and bans', note: 'This season' },
      { label: 'Recorded games', note: '9 games' },
    ],
    actions: [{ label: "Open Callum's profile", nav: 'squad' }],
  },
  'How do Banksia Park build out?': {
    conclusion: 'They build through the left side with their number 8.',
    detail: ' In their last 4 games 61% of their build-up play started on the left. Their number 8 drops to receive from the keeper.',
    used: [
      { label: 'Recorded games', note: 'Banksia Park — last 4 games' },
      { label: 'Ball recovery locations', note: 'By phase' },
    ],
    actions: [{ label: 'Open opposition', nav: 'matchday' }],
  },
  "Who is carrying a knock?": {
    conclusion: 'Two players have flagged soreness this week.',
    detail: ' Remi flagged left hamstring soreness after Tuesday training. Alex reported a sore ankle on the wellness check-in this morning.',
    used: [
      { label: 'Wellness check-ins', note: 'Physical notes only — this week' },
      { label: 'Training load', note: 'This week' },
    ],
    actions: [{ label: 'Open squad wellness', nav: 'squad' }],
  },
  "Who hasn't been in goal yet?": {
    conclusion: "Four players haven't had a turn in goal.",
    detail: ' Lachlan, Emma, Oliver, and Priya have all played 6 or more games without a turn in goal. The season has 8 rounds left.',
    used: [
      { label: 'Recorded games', note: 'Last 9 games' },
      { label: 'Player positions', note: 'By game' },
    ],
    actions: [{ label: 'Open squad positions', nav: 'squad' }],
  },
  "What should we play on Tuesday?": {
    conclusion: 'A rondo and a quick-transition game.',
    detail: ' Last session was focused on passing — building in a transition drill would balance the week. Only 14 players confirmed so small-sided works.',
    used: [
      { label: 'Training sessions', note: 'Last 4 weeks' },
      { label: 'Availability', note: 'Tuesday 9 June' },
    ],
    actions: [{ label: 'Open training plan', nav: 'training' }],
  },
  "Is everyone getting on the ball?": {
    conclusion: 'Three players had fewer than 8 touches last game.',
    detail: ' Liam, Priya, and Oliver each had 7 or fewer touches. All three played the full game.',
    used: [
      { label: 'Recorded games', note: 'Last game' },
      { label: 'Touches by player', note: 'By half' },
    ],
    actions: [{ label: 'Show me the clips', nav: 'clips' }],
  },
  'Which teams are outside fair game time?': {
    conclusion: 'U9 Blue and U11 Girls are outside the threshold.',
    detail: ' 3 players in U9 Blue are below 40% of available minutes. 2 in U11 Girls have the same issue.',
    used: [
      { label: 'Game minutes', note: 'All teams, this season' },
      { label: 'Equal-minutes rules', note: 'By age group' },
    ],
    actions: [{ label: 'Open teams', nav: 'teams' }],
  },
  'Who can cover U9 Mark on Saturday?': {
    conclusion: 'Two coaches are available and qualified for U9.',
    detail: ' Jana Kowalski holds a junior coaching certificate and has no fixture on Saturday. Sam Chen is free but has not completed the certificate yet.',
    used: [
      { label: 'Coach availability', note: 'Saturday 14 June' },
      { label: 'Coach qualifications', note: 'All coaches' },
    ],
    actions: [{ label: 'Open coaches', nav: 'coaches' }],
  },
  'Which teams have recorded the fewest games?': {
    conclusion: 'U13 Blue and U15 Boys have recorded fewer than 3 games.',
    detail: ' U13 Blue has 1 recorded game this season. U15 Boys has 2. All other teams have 4 or more.',
    used: [
      { label: 'Recorded games', note: 'All teams, this season' },
    ],
    actions: [{ label: 'Open teams', nav: 'teams' }],
  },
  'What does Mia need for Saturday?': {
    conclusion: 'A friendly at Glenview, 10:00 am. White kit, shin pads, a drink.',
    detail: " It's away — allow 25 minutes to get there. Be there by 9:30. Mia is coming.",
    used: [
      { label: "Sam's message to U12 Sam", note: 'Tue' },
      { label: 'Team calendar', note: 'Sat 14 March' },
    ],
    actions: [{ label: 'Add to my calendar', nav: 'calendar' }, { label: "Say she's coming", nav: 'coming' }],
  },
  'When is training this week?': {
    conclusion: 'Tuesday and Thursday, 5:45 pm at Wattle Creek Reserve.',
    detail: ' Tuesday is the main session (90 minutes). Thursday is optional fitness work (45 minutes). Mia is confirmed for both.',
    used: [
      { label: 'Team calendar', note: 'This week' },
      { label: 'Availability', note: 'Mia Tran' },
    ],
    actions: [{ label: 'Open calendar', nav: 'calendar' }],
  },
  "Who do I tell if she's away?": {
    conclusion: "Message Sam directly — he is the head coach.",
    detail: " Sam Kelly is U12 Sam's head coach. Send him a message in the app. He will mark Mia as unavailable.",
    used: [
      { label: 'Team staff', note: 'U12 Sam' },
    ],
    actions: [{ label: 'Message Sam', nav: 'messages' }],
  },
}

const CANTUSE = [
  /wellness answer/i, /welfare concern/i, /feeling low/i, /mental health/i,
  /why has .* felt/i, /how is .* feeling inside/i, /what did .* say in check.?in/i,
]
const DOESNTKNOW = [/\bpenalt/i, /best taker/i]

type PanelMsg =
  | { type: 'q'; text: string }
  | { type: 'working' }
  | { type: 'answer'; data: DemoAnswer }
  | { type: 'cantuse' }
  | { type: 'doesntknow' }
  | { type: 'unmatched'; questions: string[] }

interface CoachTabletFrameProps {
  navTabs: { id: string; label: string; icon: string }[]
  activeNav: string
  onNav: (id: string) => void
  subTabs?: string[]
  activeSubTabIndex?: number
  onSubTab?: (i: number) => void
  roleChip: string
  teamLabel: string
  avatarLetters: string
  avatarBg?: string
  showAsk?: boolean
  askOpen?: boolean
  onAskToggle?: () => void
  askQuestions?: string[]
  askRole?: string
  showBadge?: (tab: string) => boolean
  children: ReactNode
}

export default function CoachTabletFrame({
  navTabs, activeNav, onNav,
  subTabs = [], activeSubTabIndex = 0, onSubTab,
  roleChip, teamLabel, avatarLetters, avatarBg = '#c39797',
  showAsk = true, askOpen = false, onAskToggle,
  askQuestions, askRole = 'head coach',
  showBadge,
  children,
}: CoachTabletFrameProps) {

  const [askInput, setAskInput]   = useState('')
  const [messages, setMessages]   = useState<PanelMsg[]>([])
  const [scopeWide, setScopeWide] = useState(false)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const inputRef  = useRef<HTMLInputElement>(null)
  const bodyRef   = useRef<HTMLDivElement>(null)

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

  // focus input when panel opens
  useEffect(() => {
    if (askOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [askOpen])

  // scroll to bottom when messages change
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages])

  // cleanup timer
  useEffect(() => () => clearTimeout(timerRef.current), [])

  function askQuestion(q: string) {
    setMessages(prev => [...prev, { type: 'q', text: q }, { type: 'working' }])
    setAskInput('')
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const answer = DEMO_ANSWERS[q]
      let reply: PanelMsg
      if (answer) {
        reply = { type: 'answer', data: answer }
      } else if (CANTUSE.some(p => p.test(q))) {
        reply = { type: 'cantuse' }
      } else if (DOESNTKNOW.some(p => p.test(q))) {
        reply = { type: 'doesntknow' }
      } else {
        reply = { type: 'unmatched', questions: askQuestions ?? [] }
      }
      setMessages(prev => [...prev.slice(0, -1), reply])
    }, 1100)
  }

  function stopWorking() {
    clearTimeout(timerRef.current)
    setMessages(prev => {
      const last = prev[prev.length - 1]
      if (last?.type !== 'working') return prev
      const q = prev[prev.length - 2]
      if (q?.type === 'q') setAskInput(q.text)
      return prev.slice(0, -2)
    })
  }

  // team name without club suffix
  const teamName  = teamLabel.split(' · ')[0]

  // scope chip label: active sub-tab or nav tab label
  const screenName = subTabs.length > 0 && activeSubTabIndex < subTabs.length
    ? subTabs[activeSubTabIndex]
    : (navTabs.find(t => t.id === activeNav)?.label ?? activeNav)

  const questions = askQuestions ?? ['What should we work on tonight?', 'Is everyone getting fair minutes?', 'Who needs a rest this week?']
  const onHome    = activeNav === 'home'

  const btnBase: React.CSSProperties = {
    width: 44, height: 44, borderRadius: '50%', border: `1.5px solid #a9cfc0`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit',
  }

  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', color: 'var(--ink)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      <div style={{ flex: 'none', background: '#ffffff', borderBottom: `1px solid ${LN}` }}>

        {/* 64px green nav bar */}
        <div style={{ height: 64, padding: '0 28px', background: G, display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => onNav('home')} style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: '0 8px', alignSelf: 'stretch', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            Clean Sheet
          </button>
          <nav style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
            {navTabs.map(t => (
              <button key={t.id} onClick={() => onNav(t.id)} style={{
                display: 'flex', alignItems: 'center', gap: 7, height: 44, padding: '0 14px', borderRadius: '999px',
                border: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                background: activeNav === t.id ? G2 : 'transparent', color: '#fff',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={t.icon}/></svg>
                {t.label}
              </button>
            ))}
          </nav>
          {/* Ask button — hidden on Home tab */}
          {showAsk && !onHome && (
            <button
              onClick={onAskToggle}
              aria-label="Ask Clean Sheet"
              style={{ ...btnBase, background: askOpen ? '#fff' : 'transparent', color: askOpen ? INK : '#fff' }}
            >
              <S d={SPARKLE} size={18} stroke={askOpen ? INK : '#fff'} />
            </button>
          )}
          {/* Team pill — name only */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', fontSize: 15, fontWeight: 600, color: '#fff', flexShrink: 0, cursor: 'default' }}>
            {teamName}
            <S d={CHEVD} size={16} />
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '999px', background: avatarBg, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{avatarLetters}</div>
        </div>

        {/* 44px white sub-tabs bar */}
        {subTabs.length > 0 && (
          <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
            <nav style={{ display: 'flex', flexGrow: 1, height: 44, overflowX: 'auto', scrollbarWidth: 'none' }}>
              {subTabs.map((tab, i) => {
                const active = i === activeSubTabIndex
                return (
                  <button key={tab} onClick={() => onSubTab?.(i)} style={{
                    height: 44, padding: '0 16px', border: 0, background: 'transparent',
                    fontFamily: 'inherit', fontSize: 15, fontWeight: active ? 600 : 400,
                    color: active ? INK : MUT, cursor: 'pointer',
                    borderBottom: active ? `3px solid ${G2}` : '3px solid transparent',
                    display: 'flex', alignItems: 'center', paddingBottom: 3, gap: 6,
                    boxSizing: 'border-box',
                  }}>
                    {tab}
                    {showBadge?.(tab) && (
                      <span style={{ background: '#c39797', color: INK, borderRadius: '999px', padding: '0 7px', fontSize: 12, lineHeight: '19px' }}>3</span>
                    )}
                  </button>
                )
              })}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: '999px', background: PALE, color: G, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"/></svg>
                {roleChip}
              </span>
            </div>
          </div>
        )}
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
                onClick={() => onNav('sg3-ask')}
                style={{ display: 'flex', alignItems: 'center', gap: 5, height: 32, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: MUT, flexShrink: 0 }}
              >
                <S d={HIST_P} size={13} stroke={MUT} />
                Past questions
              </button>
              <button
                onClick={onAskToggle}
                aria-label="Close"
                style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT, flexShrink: 0 }}
              >
                <S d={X_P} size={14} />
              </button>
            </div>

            {/* Scrollable body */}
            <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>

              {/* Scope chip — not shown on Home */}
              {!onHome && !scopeWide && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start', padding: '5px 10px 5px 12px', borderRadius: 20, background: '#fff', border: `1px solid ${LN}`, fontSize: 13, color: G, fontWeight: 600, flexShrink: 0 }}>
                  This screen: {screenName}
                  <button
                    onClick={() => setScopeWide(true)}
                    aria-label="Widen scope to whole team"
                    style={{ width: 20, height: 20, borderRadius: '50%', border: 'none', background: LN, color: MUT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 0, flexShrink: 0 }}
                  >×</button>
                </div>
              )}
              {!onHome && scopeWide && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start', padding: '5px 12px', borderRadius: 20, background: '#fff', border: `1px solid ${G}`, fontSize: 13, color: G, fontWeight: 600 }}>
                  Whole team
                </div>
              )}

              {/* Before-typing state */}
              {messages.length === 0 && (
                <>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: MUT, textTransform: 'uppercase' as const, marginTop: 4 }}>About this screen</div>
                  {questions.map(q => (
                    <button
                      key={q}
                      onClick={() => askQuestion(q)}
                      style={{ width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      {q}
                    </button>
                  ))}
                  <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Or anything else</div>
                </>
              )}

              {/* Conversation messages */}
              {messages.map((msg, i) => {
                if (msg.type === 'q') {
                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{ maxWidth: '82%', padding: '10px 14px', borderRadius: '14px 14px 2px 14px', background: G, color: '#fff', fontSize: 14, lineHeight: 1.55 }}>
                        {msg.text}
                      </div>
                    </div>
                  )
                }
                if (msg.type === 'working') {
                  return (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        {[0, 1, 2].map(j => <span key={j} style={{ width: 7, height: 7, borderRadius: '50%', background: G, opacity: 0.4 + j * 0.3 }} />)}
                      </div>
                      <div style={{ fontSize: 13, color: MUT }}>Looking at 9 recorded games</div>
                      <button
                        onClick={stopWorking}
                        style={{ alignSelf: 'flex-start', padding: '5px 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        Stop
                      </button>
                    </div>
                  )
                }
                if (msg.type === 'answer') {
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', fontSize: 14, color: INK, lineHeight: 1.6 }}>
                        <strong>{msg.data.conclusion}</strong>{msg.data.detail}
                      </div>
                      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>What I used</div>
                        {msg.data.used.map((u, j) => (
                          <div key={j} style={{ display: 'flex', flexDirection: 'column', padding: j > 0 ? '8px 0 0' : '0', borderTop: j > 0 ? `1px solid ${LN}` : 'none', marginTop: j > 0 ? 8 : 0 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>{u.label}</span>
                            <span style={{ fontSize: 12, color: MUT }}>{u.note}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
                        {msg.data.actions.map((a, j) => (
                          <button key={j} onClick={() => { onNav(a.nav); onAskToggle?.() }} style={{ padding: '8px 14px', borderRadius: 10, border: `1px solid ${G}`, background: '#fff', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                }
                if (msg.type === 'cantuse') {
                  return (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', fontSize: 14, color: INK, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      I don't read wellness answers. They stay between the player, their parents and you. You can see them on the Wellness tab.
                      <button onClick={() => { onNav('squad'); onAskToggle?.() }} style={{ alignSelf: 'flex-start', padding: '8px 14px', borderRadius: 10, border: `1px solid ${G}`, background: '#fff', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Open Wellness
                      </button>
                    </div>
                  )
                }
                if (msg.type === 'doesntknow') {
                  return (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', fontSize: 14, color: INK, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      I can't tell from what's recorded. Penalties aren't tagged in your 9 games. Tag them in Clips and I can answer.
                      <button onClick={() => { onNav('clips'); onAskToggle?.() }} style={{ alignSelf: 'flex-start', padding: '8px 14px', borderRadius: 10, border: `1px solid ${G}`, background: '#fff', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Open Clips
                      </button>
                    </div>
                  )
                }
                if (msg.type === 'unmatched') {
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', fontSize: 14, color: INK, lineHeight: 1.6 }}>
                        In the demo I can answer the questions below. In your own club I answer from your own data.
                      </div>
                      {msg.questions.map(q => (
                        <button key={q} onClick={() => askQuestion(q)} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                          {q}
                        </button>
                      ))}
                    </div>
                  )
                }
                return null
              })}
            </div>

            {/* White footer */}
            <div style={{ background: '#fff', padding: '10px 14px 12px', borderTop: `1px solid ${LN}`, flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <input
                  ref={inputRef}
                  value={askInput}
                  onChange={e => setAskInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && askInput.trim()) askQuestion(askInput.trim()) }}
                  placeholder="Ask a follow-up…"
                  style={{ flex: 1, height: 40, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, fontSize: 13, fontFamily: 'inherit', outline: 'none', color: INK }}
                />
                <button
                  onClick={() => { if (askInput.trim()) askQuestion(askInput.trim()) }}
                  aria-label="Send"
                  style={{ width: 44, height: 44, borderRadius: 8, background: askInput.trim() ? G : LN, border: 'none', cursor: askInput.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <S d={SEND_P} size={15} stroke="#fff" />
                </button>
              </div>
              <div style={{ fontSize: 11, color: MUT, lineHeight: 1.5 }}>
                Uses only what you can see as {askRole}. Never sends anything by itself.
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
