import { useState } from 'react'
import type { ReactNode } from 'react'
import SquadScreen          from './SquadScreen'
import TrainingScreen       from './TrainingScreen'
import MatchDayScreen       from './MatchDayScreen'
import ClipsScreen          from './ClipsScreen'
import FixturesScreen       from './FixturesScreen'
import OurStyleScreen       from './OurStyleScreen'
import TeamStaffScreen      from './TeamStaffScreen'
import DevGoalsScreen       from './DevGoalsScreen'
import WellnessScreen       from './WellnessScreen'
import AvailabilityScreen   from './AvailabilityScreen'
import ConsentScreen        from './ConsentScreen'
import SeasonSummariesScreen from './SeasonSummariesScreen'
import ThisWeekScreen       from './ThisWeekScreen'
import SuggestionsScreen    from './SuggestionsScreen'
import DrillLibraryScreen   from './DrillLibraryScreen'
import GrowthLoadScreen     from './GrowthLoadScreen'
import TeamSheetScreen      from './TeamSheetScreen'
import OppositionScreen     from './OppositionScreen'
import ReviewScreen         from './ReviewScreen'
import TeamTalkScreen       from './TeamTalkScreen'
import PitchSideScreen      from './PitchSideScreen'
import { FitnessSquadTab, FitnessTrainingTab, FitnessMatchTab } from './FitnessExtras'
import RecordHub           from './RecordHub'
import { CoachMessages }   from './MessagesScreens'
import { SquadLineups }    from './SquadLineups'
import { useSandbox }      from './sandbox/SandboxContext'
import { storeHasData }   from './sandbox/sandboxStore'
import CoachTabletFrame   from './CoachTabletFrame'
import { WhereWeAtScreen } from './WhereWeAtScreen'

type TeamType = 'seniors' | 'youth'

interface TeamData {
  teamName: string
  teamPicker: string
  coachFirst: string
  avatarBg: string
  avatarLetters: string
  needsYouItems: { label: string; when: string; note: string; urgent: boolean }[]
  needsYouNote: string
  gameCardTitle: string
  gameCardTime: string
  gameCardBadge: string
  gameCardBullets: string[]
  gameCardCTA: string
  gameCardCTA2?: string
  lastGame: { label: string; opponent: string; scorer: string; score: string; bullets: { text: string; tag: string }[] }
  thisWeek: { day: string; label: string; done?: boolean; today?: boolean }[]
  lastFive: { result: 'W' | 'L' | 'D' }[]
  lastFiveLabel: string
  nextGame: string
  squad: { total: number; in: number; label2: string; val2: number; label3: string; val3: number }
  roleNote: string
}

const SENIORS: TeamData = {
  teamName: "Men's 1sts",
  teamPicker: "Men's 1sts · Wattle Creek",
  coachFirst: 'Marko',
  avatarBg: '#c39797',
  avatarLetters: 'MP',
  needsYouItems: [
    { label: 'Registrations', when: 'Today', note: "Luca Ferraro's clearance closes 30 Jun", urgent: true },
    { label: 'Cards · from Dribl', when: 'Mon', note: 'Dean Vukovic is one yellow from a ban', urgent: false },
    { label: 'Squad load', when: 'Mon', note: 'Daniel Costa has played every minute for 4 games', urgent: false },
  ],
  needsYouNote: 'Adults join and consent for themselves, so there are no parent steps. Players check in on their own phones. Results, ladders, cards and the registration window all count.',
  gameCardTitle: 'Training tonight',
  gameCardTime: 'TODAY · 7:30 pm · Wattle Creek Reserve',
  gameCardBadge: '90 minutes · match prep for Banksia Park SC · 18 said yes',
  gameCardBullets: ["Their press: beat the first line", "Attacking corners", "Costa: 60 minutes only"],
  gameCardCTA: 'Open training plan',
  gameCardCTA2: 'Opposition',
  lastGame: {
    label: 'Sat 30 May · home',
    opponent: 'Kingfisher United',
    scorer: 'Josh Barker scored',
    score: '1–1',
    bullets: [
      { text: 'Pressing high won it 15 times in their half', tag: 'Keep' },
      { text: 'Two chances given up from our own corners', tag: 'Tonight' },
      { text: 'Tired legs after 70: one sub used', tag: 'Saturday' },
    ],
  },
  thisWeek: [
    { day: 'Mon 1', label: 'Recovery · done', done: true },
    { day: 'Tue 2', label: 'Training · done', done: true },
    { day: 'Wed 3', label: 'Rest' },
    { day: 'Thu 4', label: 'Training 7:30 pm', today: true },
    { day: 'Fri 5', label: 'Rest' },
    { day: 'Sat 6', label: 'Banksia Park SC 3:00' },
    { day: 'Sun 7', label: 'Recovery' },
  ],
  lastFive: [{ result: 'W' }, { result: 'W' }, { result: 'D' }, { result: 'L' }, { result: 'W' }],
  lastFiveLabel: '4th of 12 · NPL 3',
  nextGame: 'Next: Sat 3:00 at Banksia Park SC · Away · 18 in, 2 injured, 1 away',
  squad: { total: 22, in: 18, label2: 'Injured', val2: 2, label3: 'Out', val3: 2 },
  roleNote: 'At senior level',
}

const YOUTH: TeamData = {
  teamName: 'U16 Ollie',
  teamPicker: 'U16 Ollie · Wattle Creek',
  coachFirst: 'Ollie',
  avatarBg: '#40826d',
  avatarLetters: 'OG',
  needsYouItems: [
    { label: 'Cards · from Dribl', when: 'Mon', note: 'Ryan Petersen is suspended for Saturday', urgent: true },
    { label: 'Priya Shah · Fitness coach', when: 'Yesterday', note: 'Load is up 30% two weeks running', urgent: false },
    { label: 'Cal West · player', when: '8:10 am', note: 'Exam Friday. Can I miss the team meeting?', urgent: false },
  ],
  needsYouNote: '11 a side, 2 × 40 minutes. Players 15 and over have their own accounts and message you directly; a parent is copied in until they turn 18.',
  gameCardTitle: 'Game in 2 days',
  gameCardTime: 'SATURDAY · 3:30 pm · away, Rovers Park',
  gameCardBadge: 'No training tonight · team talk to finish · 13 available, 1 suspended',
  gameCardBullets: ["Protect tired legs", "Play out under a press", "Subs from minute 50"],
  gameCardCTA: 'Finish the team talk',
  gameCardCTA2: 'Team sheet',
  lastGame: {
    label: 'Sat 30 May · home',
    opponent: 'Glenview Park',
    scorer: 'Theo Ortiz scored',
    score: '1–3',
    bullets: [
      { text: 'Lost the ball 9 times playing out', tag: 'Saturday' },
      { text: 'Sprints fell 31% in the last 20 minutes', tag: 'Load' },
      { text: 'Created 6 chances from wide', tag: 'Keep' },
    ],
  },
  thisWeek: [
    { day: 'Mon 1', label: 'Training · done', done: true },
    { day: 'Tue 2', label: 'Rest' },
    { day: 'Wed 3', label: 'Light session · done', done: true },
    { day: 'Thu 4', label: 'Rest · today', today: true },
    { day: 'Fri 5', label: 'Team meeting 6:00 pm' },
    { day: 'Sat 6', label: 'Harbour Rovers 3:30' },
    { day: 'Sun 7', label: 'Rest' },
  ],
  lastFive: [{ result: 'L' }, { result: 'D' }, { result: 'L' }, { result: 'W' }, { result: 'L' }],
  lastFiveLabel: 'Division 1',
  nextGame: 'Next: Sat 3:30 at Harbour Rovers · Away · 13 in, 1 suspended',
  squad: { total: 14, in: 8, label2: 'Manage', val2: 5, label3: 'Out', val3: 1 },
  roleNote: 'At this age',
}

const NAV_ICONS = [
  'M4 11l8-7 8 7v9H4z',
  'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5',
  'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4',
  'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z',
  'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z',
  'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z',
]
const NAV_LABELS = ['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record']
const HOME_TABS  = ['Overview', 'Messages', 'Calendar', 'Fixtures and results', 'Our style', "Where we're at", 'Team staff']

function resultColor(r: 'W' | 'L' | 'D') {
  if (r === 'W') return { bg: '#40826d', color: '#fff' }
  if (r === 'L') return { bg: '#c39797', color: '#fff' }
  return { bg: '#e9eae8', color: '#10211f' }
}

function SYCoachHomeEmpty({ coachFirst, teamLine, onNav }: { coachFirst: string; teamLine: string; onNav: (s: string) => void }) {
  const steps = [
    { n: 1, title: 'Add your squad',            body: 'Names, positions and a parent contact. Import a spreadsheet or share an invite link.', btn: 'Add players',  nav: 'squad'    },
    { n: 2, title: 'Add your fixtures',          body: 'Clean Sheet plans training around your game days.',                                    btn: 'Add fixtures', nav: 'fixtures' },
    { n: 3, title: 'Connect the match camera',   body: 'Your match camera records games and finds the clips for you.',                         btn: 'Connect',      nav: 'clips'    },
    { n: 4, title: 'Pair boots and vests',       body: 'Boot sensors and GPS vests measure running, sprints and touches.',                     btn: 'Pair devices', nav: 'metric'   },
    { n: 5, title: 'Turn on wellness check-ins', body: 'Players answer three quick questions on their phone before training and games.',       btn: 'Turn on',      nav: 'metric'   },
  ]
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, padding: '20px 28px 24px', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1 style={{ margin: '0 0 2px', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Welcome to Clean Sheet, {coachFirst}</h1>
          <div style={{ fontSize: 14, color: '#4a5a57' }}>{teamLine}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: '#2f6252', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Get set up</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>0 of 5 done · about 15 minutes</span>
          </div>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px minmax(0,1fr) auto', gap: 12, padding: '14px 16px', alignItems: 'center', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef' }}>
              <span style={{ width: 28, height: 28, borderRadius: '999px', border: '1.5px solid #c5c8c4', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#4a5a57', flex: 'none' }}>{s.n}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{s.body}</div>
              </div>
              <button onClick={() => onNav(s.nav)} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: s.n === 1 ? 0 : '1px solid #c5c8c4', background: s.n === 1 ? '#2f6252' : '#fff', color: s.n === 1 ? '#fff' : '#10211f', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>{s.btn}</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>What happens next</div>
          {[
            { title: 'Record your first game',        body: 'Camera on the halfway line, press record.' },
            { title: 'Get your match review',          body: 'About 25 minutes after you upload the video.' },
            { title: "Get next week's training plan", body: 'Three things to fix, and drills to fix them.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f1ef' }}>
              <span style={{ flex: 'none', width: 8, height: 8, borderRadius: '999px', background: '#40826d', marginTop: 5 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '17px' }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CoachHome({ data, onTraining, onMatchday, onReview, onCalendar, onInbox }: {
  data: TeamData
  onTraining: () => void
  onMatchday: () => void
  onReview: () => void
  onCalendar: () => void
  onInbox: () => void
}) {
  return (
    <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '20px 28px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) 260px', gap: 16 }}>

      {/* Col 1: Needs you */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Needs you</span>
            <span style={{ background: '#c39797', color: '#10211f', borderRadius: '999px', padding: '1px 7px', fontSize: 12, fontWeight: 700 }}>3 new</span>
          </div>
          {data.needsYouItems.map((item, i) => (
            <div key={i} style={{ padding: '11px 16px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.urgent ? '#c39797' : '#4a5a57' }}>{item.label}</span>
                <span style={{ fontSize: 12, color: '#6f7f7b' }}>{item.when}</span>
              </div>
              <div style={{ fontSize: 13, color: '#10211f' }}>{item.note}</div>
            </div>
          ))}
          <div style={{ padding: '10px 16px', borderTop: '1px solid #e9eae8' }}>
            <button onClick={onInbox} style={{ fontSize: 13, color: '#2f6252', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>All messages</button>
          </div>
        </div>

        <div style={{ background: '#eef5f2', border: '1px solid #c5d9d2', borderRadius: 14, padding: '12px 14px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#2f6252', marginBottom: 4 }}>{data.roleNote}</div>
          <div style={{ fontSize: 13, color: '#1f4a3e', lineHeight: '18px' }}>{data.needsYouNote}</div>
        </div>
      </div>

      {/* Col 2: Game/Training card + Last game */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Game/training card */}
        <div style={{ background: '#1f4a3e', borderRadius: 16, padding: '16px 18px', color: '#fff' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{data.gameCardTime}</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{data.gameCardTitle}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 10 }}>{data.gameCardBadge}</div>
          {data.gameCardBullets.map((b, i) => (
            <div key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', padding: '4px 0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>· {b}</div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button onClick={onTraining} style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: '#40826d', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{data.gameCardCTA}</button>
            {data.gameCardCTA2 && <button onClick={onMatchday} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{data.gameCardCTA2}</button>}
          </div>
        </div>

        {/* Last game */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Last game</span>
            <span style={{ fontSize: 12, color: '#6f7f7b' }}>{data.lastGame.label}</span>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ width: 36, height: 36, borderRadius: '999px', background: '#e9eae8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#6f7f7b', flex: 'none' }}>vs</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{data.lastGame.opponent}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>{data.lastGame.scorer}</div>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f' }}>{data.lastGame.score}</div>
            </div>
            {data.lastGame.bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', borderTop: '1px solid #e9eae8' }}>
                <span style={{ flex: 'none', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: '#f0f1ef', color: '#4a5a57', marginTop: 1 }}>{b.tag}</span>
                <span style={{ fontSize: 13, color: '#10211f' }}>{b.text}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 16px', borderTop: '1px solid #e9eae8', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={onReview} style={{ fontSize: 13, color: '#2f6252', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Open the review</button>
            <span style={{ fontSize: 13, color: '#6f7f7b' }}>Clips · 11</span>
          </div>
        </div>
      </div>

      {/* Col 3: This week + Last 5 + Squad */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid #e9eae8', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>This week</span>
            <button onClick={onCalendar} style={{ fontSize: 13, color: '#2f6252', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Calendar</button>
          </div>
          {data.thisWeek.map((w, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 16px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none', background: w.today ? '#eef5f2' : 'transparent' }}>
              <span style={{ flex: 'none', fontSize: 12, fontWeight: 700, color: '#6f7f7b', width: 44 }}>{w.day}</span>
              <span style={{ fontSize: 13, color: w.done ? '#6f7f7b' : w.today ? '#1f4a3e' : '#10211f', fontWeight: w.today ? 700 : 400, textDecoration: w.done ? 'line-through' : 'none' }}>{w.label}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Last 5</span>
            <span style={{ fontSize: 12, color: '#6f7f7b' }}>{data.lastFiveLabel}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {data.lastFive.map((r, i) => {
              const c = resultColor(r.result)
              return <span key={i} style={{ flex: 1, height: 32, borderRadius: 8, background: c.bg, color: c.color, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.result}</span>
            })}
          </div>
          <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>{data.nextGame}</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Squad</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#10211f' }}>{data.squad.total}</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>players</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#40826d' }}>{data.squad.in}</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>in</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#c39797' }}>{data.squad.val2}</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>{data.squad.label2.toLowerCase()}</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#6f7f7b' }}>{data.squad.val3}</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>{data.squad.label3.toLowerCase()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type NavKey = 'home' | 'squad' | 'training' | 'matchday' | 'clips' | 'record'
type Sub = 'teamtalk' | 'pitchside' | null

const NAV_KEYS: NavKey[] = ['home', 'squad', 'training', 'matchday', 'clips', 'record']
const SQUAD_TABS    = ['Players', 'Line-ups', 'Development goals', 'Wellness', 'Availability', 'Consent and privacy', 'Season summaries', 'Fitness coach']
const TRAINING_TABS = ["Tonight's session", 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Fitness coach']
const MATCHDAY_TABS = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review', 'Fitness coach']
const CLIPS_TABS    = ['Browse', 'Playlists', 'Shared with players', 'To check']

export default function SeniorsYouthCoachApp({ teamType, onBack: _onBack, phaseContent, empty = false, initialScreen, onNavChange }: { teamType: TeamType; onBack: () => void; phaseContent?: ReactNode; empty?: boolean; initialScreen?: string; onNavChange?: (screen: string) => void }) {
  const data = teamType === 'seniors' ? SENIORS : YOUTH
  const { active: inSandbox, store } = useSandbox()
  const sbEmpty = inSandbox ? !storeHasData(store) : empty
  const validNav = (s?: string): NavKey => (s === 'squad' || s === 'training' || s === 'matchday' || s === 'clips' || s === 'record') ? s : 'home'

  const [nav, setNav]                 = useState<NavKey>(validNav(initialScreen))
  const [sub, setSub]                 = useState<Sub>(null)
  const [homeTab, setHomeTab]         = useState(0)
  const [squadTab, setSquadTab]       = useState(0)
  const [trainingTab, setTrainingTab] = useState(0)
  const [matchTab, setMatchTab]       = useState(0)
  const [clipsTab, setClipsTab]       = useState(0)

  const [askOpen, setAskOpen] = useState(false)
  function goNav(n: NavKey) { setNav(n); setSub(null); setAskOpen(false); onNavChange?.(n) }

  function handleNav(s: string) {
    if (s === 'training')  { goNav('training'); return }
    if (s === 'matchday')  { goNav('matchday'); return }
    if (s === 'squad')     { goNav('squad');    return }
    if (s === 'clips')     { goNav('clips');    return }
    if (s === 'record')    { goNav('record');   return }
    if (s === 'inbox')     { setHomeTab(1);     return }
    if (s === 'fixtures')  { setHomeTab(3);     return }
    if (s === 'metric')    { goNav('squad'); setSquadTab(3); return }
    if (s === 'setstyle')  { setHomeTab(4);     return }
    if (s === 'teamtalk')  { setSub('teamtalk');  return }
    if (s === 'pitchside') { setSub('pitchside'); return }
  }

  if (sub === 'teamtalk')  return <TeamTalkScreen role="head" onClose={() => setSub(null)} />
  if (sub === 'pitchside') return <PitchSideScreen onClose={() => setSub(null)} empty={sbEmpty} />

  const subTabs  = nav === 'clips'    ? CLIPS_TABS
                 : nav === 'home'     ? HOME_TABS
                 : nav === 'squad'    ? SQUAD_TABS
                 : nav === 'training' ? TRAINING_TABS
                 : nav === 'record'   ? []
                 : MATCHDAY_TABS

  const activeIdx = nav === 'home'     ? homeTab
                  : nav === 'squad'    ? squadTab
                  : nav === 'training' ? trainingTab
                  : nav === 'matchday' ? matchTab
                  : nav === 'record'   ? 0
                  : clipsTab

  function handleSubTab(i: number) {
    setSub(null)
    if (nav === 'home')     setHomeTab(i)
    if (nav === 'squad')    setSquadTab(i)
    if (nav === 'training') setTrainingTab(i)
    if (nav === 'matchday') setMatchTab(i)
    if (nav === 'clips')    setClipsTab(i)
  }

  let content = null
  if (nav === 'home') {
    switch (homeTab) {
      case 0: content = sbEmpty
        ? <SYCoachHomeEmpty coachFirst={data.coachFirst} teamLine={`${data.teamPicker} · let's get your team ready`} onNav={handleNav} />
        : (phaseContent ?? <CoachHome data={data} onTraining={() => goNav('training')} onMatchday={() => goNav('matchday')} onReview={() => { goNav('matchday'); setMatchTab(3) }} onCalendar={() => setHomeTab(2)} onInbox={() => setHomeTab(1)} />); break
      case 1: content = <CoachMessages />; break
      case 2: case 3: content = <FixturesScreen empty={sbEmpty} />; break
      case 4: content = <OurStyleScreen />; break
      case 5: content = <WhereWeAtScreen teamType={teamType === 'seniors' ? 'seniors' : 'youth'} />; break
      case 6: content = <TeamStaffScreen empty={sbEmpty} />; break
    }
  } else if (nav === 'squad') {
    switch (squadTab) {
      case 0: content = <SquadScreen role="head" onPlayerProfile={() => {}} empty={sbEmpty} />; break
      case 1: content = <SquadLineups />; break
      case 2: content = <DevGoalsScreen empty={sbEmpty} />; break
      case 3: content = <WellnessScreen empty={sbEmpty} />; break
      case 4: content = <AvailabilityScreen empty={sbEmpty} />; break
      case 5: content = <ConsentScreen empty={sbEmpty} />; break
      case 6: content = <SeasonSummariesScreen empty={sbEmpty} />; break
      case 7: content = <FitnessSquadTab empty={sbEmpty} />; break
    }
  } else if (nav === 'training') {
    switch (trainingTab) {
      case 0: content = <TrainingScreen role="head" onNav={handleNav} empty={sbEmpty} />; break
      case 1: content = <ThisWeekScreen empty={sbEmpty} onDrillLibrary={() => setTrainingTab(3)} onTonightsPlan={() => setTrainingTab(0)} onGrowthLoad={() => setTrainingTab(4)} />; break
      case 2: content = <SuggestionsScreen empty={sbEmpty} onRecord={() => goNav('record')} />; break
      case 3: content = <DrillLibraryScreen empty={sbEmpty} />; break
      case 4: content = <GrowthLoadScreen empty={sbEmpty} />; break
      case 5: content = <FitnessTrainingTab empty={sbEmpty} />; break
    }
  } else if (nav === 'record') {
    content = <RecordHub />
  } else if (nav === 'matchday') {
    switch (matchTab) {
      case 0: content = <MatchDayScreen onNav={handleNav} empty={sbEmpty} />; break
      case 1: content = <TeamSheetScreen empty={sbEmpty} />; break
      case 2: content = <OppositionScreen empty={sbEmpty} />; break
      case 3: content = <ReviewScreen empty={sbEmpty} />; break
      case 4: content = <FitnessMatchTab empty={sbEmpty} />; break
    }
  } else if (nav === 'clips') {
    content = <ClipsScreen empty={sbEmpty} activeTab={clipsTab} />
  }

  const navTabs = NAV_LABELS.map((label, i) => ({ id: NAV_KEYS[i], label, icon: NAV_ICONS[i] }))

  return (
    <>
      <CoachTabletFrame
        navTabs={navTabs}
        activeNav={nav}
        onNav={id => goNav(id as NavKey)}
        subTabs={subTabs}
        activeSubTabIndex={activeIdx}
        onSubTab={handleSubTab}
        roleChip="Head coach"
        teamLabel={inSandbox ? (store.teams[0]?.name ?? 'My team') : data.teamPicker}
        avatarLetters={data.avatarLetters}
        avatarBg={data.avatarBg}
        showAsk={true}
        askOpen={askOpen}
        onAskToggle={() => setAskOpen(o => !o)}
        showBadge={tab => !sbEmpty && !inSandbox && (tab === 'Messages' || tab === 'To check')}
      >
        {content}
      </CoachTabletFrame>
    </>
  )
}
