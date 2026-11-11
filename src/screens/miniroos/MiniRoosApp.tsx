import { useState } from 'react'
import type { ReactNode } from 'react'
import HomeMiniRoos      from './HomeMiniRoos'
import TrainingMiniRoos  from './TrainingMiniRoos'
import InboxMiniRoos     from './InboxMiniRoos'
import CalendarMiniRoos  from './CalendarMiniRoos'
import StaffMiniRoos     from './StaffMiniRoos'
import SquadMiniRoos     from './SquadMiniRoos'
import GameDayMiniRoos   from './GameDayMiniRoos'
import WhatWeSawScreen   from './WhatWeSawScreen'
import ThankParentsScreen from './ThankParentsScreen'
import SeasonNotesScreen from './SeasonNotesScreen'
import FixturesMiniRoos  from './FixturesMiniRoos'
import TeamChatMiniRoos  from './TeamChatMiniRoos'
import FootballYearScreen from './FootballYearScreen'

const G   = '#2f6252'
const G2  = '#40826d'
const GD  = '#1f4a3e'
const INK = '#10211f'
const MUT = '#4a5a57'
const LN  = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

function SuggestedMiniRoos({ empty }: { empty?: boolean }) {
  const [card1dismissed, setCard1dismissed] = useState(false)

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Suggested games</div>
      <div style={{ background: PALE, borderRadius: 16, padding: '24px', textAlign: 'center' as const }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: GD, marginBottom: 8 }}>U9 Tom · nothing to go on yet</div>
        <div style={{ fontSize: 14, color: G, lineHeight: 1.6, marginBottom: 16 }}>Ideas start after your first game. Tap three things you saw after a game and Clean Sheet picks games to match. Until then it follows the under 9 curriculum.</div>
        <button style={{ height: 44, padding: '0 20px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Tap what you saw</button>
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>It uses</div>
      {[
        { n: '1', title: 'Your three taps', note: 'After each game' },
        { n: '2', title: 'Who had a go', note: 'So quieter children get the ball' },
        { n: '3', title: 'The curriculum', note: 'What comes next for the age' },
      ].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: LN, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
            <div style={{ fontSize: 13, color: MUT }}>{s.note}</div>
          </div>
        </div>
      ))}
    </div>
  )

  const cards = [
    {
      title: 'They bunch around the ball',
      basis: ['Your taps, 3 weeks running', "Saturday's clips"],
      body: "Very normal at this age. Games with wide gates give them a reason to spread out, without you telling them to.",
      drill: 'Four goals: score in either wide gate',
      note: '4 against 4 · 10 minutes · everyone on the ball',
    },
    {
      title: 'Poppy and Jude see less of the ball',
      basis: ['Who had a go, 2 weeks', 'Your note'],
      body: "Smaller teams mean more touches for quieter players. Nobody is singled out.",
      drill: 'Pairs: 2 against 2 to small goals',
      note: 'Five little pitches · 8 minutes · swap partners each round',
    },
    {
      title: 'Next in the term plan: striking the ball',
      basis: ['Curriculum, weeks 7 and 8'],
      body: "Nothing to fix here. It's simply what comes next for under 9s.",
      drill: 'Shoot on sight, 3 against 3',
      note: '10 minutes · two keepers who swap every goal',
    },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Suggested games</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>From what you've tapped after games, who had a go, and the curriculum</div>
        </div>
        <button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Game library</button>
      </div>

      {cards.map((card, idx) => !card1dismissed || idx > 0 ? (
        <div key={card.title} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{idx + 1}</div>
            <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: INK }}>{card.title}</div>
          </div>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT, marginBottom: 8 }}>BASED ON</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {card.basis.map(b => (
                <span key={b} style={{ fontSize: 12, fontWeight: 600, color: G2, background: PALE, padding: '3px 10px', borderRadius: 999 }}>{b}</span>
              ))}
            </div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginTop: 10 }}>{card.body}</div>
          </div>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, background: PALE }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>{card.drill}</div>
            <div style={{ fontSize: 13, color: G, marginTop: 2 }}>{card.note}</div>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
            {idx === 0 && <button onClick={() => setCard1dismissed(true)} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Not this</button>}
            {idx > 0 && <button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Not this</button>}
            <button style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 'auto' }}>Add to Tuesday</button>
          </div>
        </div>
      ) : null)}

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>No numbers at this age</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Suggestions come from your three taps after each game, who had a go, and what you film for clips. Nothing is counted or scored.</div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>What you said worked</div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Sharks and minnows</div>
              <div style={{ fontSize: 12, color: G2 }}>Loved it, three weeks running</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: LN, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>–</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Passing in lines</div>
              <div style={{ fontSize: 12, color: ROSE }}>You said they got bored. Not suggested again</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>One tap after each game is all it needs.</div>
      </div>
    </div>
  )
}

function RecordMiniRoosStart({ empty, onClips }: { empty?: boolean; onClips: () => void }) {
  const children = [
    { ini: 'AL', name: 'Ava L',    ok: true },
    { ini: 'EB', name: 'Ella B',   ok: true },
    { ini: 'JP', name: 'Jai P',    ok: true },
    { ini: 'MT', name: 'Mia T',    ok: true },
    { ini: 'NO', name: 'Noah O',   ok: true },
    { ini: 'OB', name: 'Oscar B',  ok: true },
    { ini: 'LH', name: 'Lily H',   ok: true },
    { ini: 'CW', name: 'Cal W',    ok: true },
    { ini: 'HR', name: 'Harper R', ok: false, reason: 'No consent' },
    { ini: 'BT', name: 'Bao T',    ok: false, reason: 'No consent' },
  ]

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth={2} strokeLinecap="round"><circle cx={12} cy={12} r={3}/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>Film something</div>
      <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, maxWidth: 400 }}>Film a Saturday game, a training game, or a skill challenge. Set the camera up and tap Start filming.</div>
      <button style={{ height: 44, padding: '0 24px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Start filming</button>
      <div style={{ marginTop: 16, maxWidth: 400, textAlign: 'left' as const, padding: '14px 16px', background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, width: '100%' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Good to know</div>
        {[
          'Only children whose parents said yes are filmed — everyone else stays out of shot.',
          'You get the best moment per child, who had a go, and something to show families.',
          'No scores or league rankings — just play.',
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Record</div>
      <div style={{ fontSize: 13, color: MUT }}>Film it, and every child gets a clip of their best moment</div>

      {/* What to record */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>What are you filming?</div>
        {[
          { label: "Saturday's game", note: 'Sat 7 Jun vs Ironbark United' },
          { label: 'A training game', note: 'Short game at the end of training' },
          { label: 'A skill challenge', note: 'Dribbling, passing or shooting' },
        ].map((opt, i) => (
          <button key={opt.label} onClick={onClips} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: 'none', borderBottom: i < 2 ? `1px solid ${LN}` : 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' as const, fontFamily: 'inherit', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{opt.note}</div>
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div>

      {/* Before you film */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Before you film</div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Camera</div>
              <div style={{ fontSize: 12, color: G2 }}>Connected · set up behind the goal end</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: G2, background: PALE, padding: '2px 8px', borderRadius: 999 }}>Ready</span>
          </div>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 6 }}>Who can be filmed</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
              {children.map(c => (
                <div key={c.ini} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: c.ok ? PALE : '#f5f5f5', border: `1px solid ${c.ok ? G2 : LN}` }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.ok ? G : LN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{c.ini.slice(0, 2)}</div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.ok ? INK : MUT }}>{c.name}</span>
                  {!c.ok && <span style={{ fontSize: 11, color: ROSE }}>·&nbsp;{c.reason}</span>}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>8 of 10 can be filmed · Harper and Bao are blurred and left out of clips</div>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>What you get</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { icon: '1', text: 'The best moment per child — found by the camera' },
                { icon: '2', text: 'Who had a go — so nobody gets left out' },
                { icon: '3', text: 'Something to show families at the end of the season' },
              ].map(step => (
                <div key={step.icon} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{step.icon}</div>
                  <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4, paddingTop: 3 }}>{step.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={onClips} style={{ height: 48, borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
        Start filming Saturday's game →
      </button>
    </div>
  )
}

function RecordMiniRoosClips({ empty, onBack }: { empty?: boolean; onBack: () => void }) {
  const clips = [
    { ini: 'AL', name: 'Ava Lindgren',  note: 'Controls a bouncing ball under pressure, 23 min' },
    { ini: 'EB', name: 'Ella Brooks',   note: 'Dribbles past two defenders to set up a goal, 11 min' },
    { ini: 'JP', name: 'Jai Patel',     note: 'First touch out of feet into space, 34 min' },
    { ini: 'MT', name: 'Mia Tran',      note: 'Tracks back and wins the ball near her own goal, 8 min' },
    { ini: 'NO', name: 'Noah Okafor',   note: 'Volleys the ball to a teammate rather than the wall, 41 min' },
    { ini: 'OB', name: 'Oscar Brennan', note: 'Takes a touch before shooting instead of first-time, 29 min' },
    { ini: 'LH', name: 'Lily Huang',    note: 'Finds the open player instead of forcing it, 17 min' },
    { ini: 'CW', name: 'Cal Wheeler',   note: "Keeps going after losing the ball — doesn't stop, 38 min" },
  ]

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: LN, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x={1} y={5} width={15} height={14} rx={2}/></svg>
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>Nothing filmed yet</div>
      <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, maxWidth: 400 }}>Film a game or training session and the best moment for each child appears here.</div>
      <button onClick={onBack} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Film something</button>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: '999px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>{"Saturday's game · clips"}</div>
          <div style={{ fontSize: 13, color: MUT }}>8 children · filmed Sat 7 Jun · 44 minutes</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 700, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>Pick two for Tuesday</button>
          <button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send to families</button>
        </div>
      </div>

      {/* Clips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {clips.map((c, i) => (
          <div key={c.ini} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: i % 3 === 0 ? G : i % 3 === 1 ? GD : ROSE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{c.ini}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{c.name}</div>
              <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{c.note}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: PALE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth={2} strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
              <button style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: PALE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth={2} strokeLinecap="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>Who had a go</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>All 8 children touched the ball. Mia and Cal had the most touches. Harper and Bao aren't tracked.</div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px', fontSize: 13, color: MUT, lineHeight: 1.5 }}>
        What isn't kept: the full video is deleted after 90 days. Clips stay for the season. Families only see their own child's clip.
      </div>
    </div>
  )
}

type MiniNav = 'home' | 'squad' | 'training' | 'gameday'
type HomeTab = 'overview' | 'inbox' | 'calendar' | 'staff'
type GameDayTab = 'turns' | 'fixtures' | 'record'
type GameDayView = 'turns' | 'whatisaw' | 'thankparents'
type TrainingTab = 'plan' | 'suggest' | 'record'
type RecordView = 'start' | 'clips'

const NAV: Array<{ id: MiniNav; label: string; icon: string }> = [
  { id: 'home',     label: 'Home',     icon: 'M4 11l8-7 8 7v9H4z' },
  { id: 'squad',    label: 'Squad',    icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5' },
  { id: 'training', label: 'Training', icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4' },
  { id: 'gameday',  label: 'Game day', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z' },
]

const HOME_TABS: Array<{ id: HomeTab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'inbox',    label: 'Inbox' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'staff',    label: 'Team staff' },
]

export default function MiniRoosApp({ onBack, empty, phaseContent }: { onBack: () => void; empty?: boolean; phaseContent?: ReactNode }) {
  const [nav, setNav]               = useState<MiniNav>('home')
  const [homeTab, setHomeTab]       = useState<HomeTab>('overview')
  const [gameDayTab, setGameDayTab] = useState<GameDayTab>('turns')
  const [gameDayView, setGameDayView] = useState<GameDayView>('turns')
  const [homeSubView, setHomeSubView] = useState<'main' | 'seasonnotes' | 'teamchat' | 'footballyear'>('main')
  const [trainingTab, setTrainingTab] = useState<TrainingTab>('plan')
  const [recordView, setRecordView] = useState<RecordView>('start')

  const GAMEDAY_TABS: Array<{ id: GameDayTab; label: string }> = [
    { id: 'turns',    label: 'Turns' },
    { id: 'fixtures', label: 'Fixtures' },
    { id: 'record',   label: 'Record' },
  ]

  const TRAINING_TABS_MR: Array<{ id: TrainingTab; label: string }> = [
    { id: 'plan',    label: 'Tonight' },
    { id: 'suggest', label: 'Suggested' },
    { id: 'record',  label: 'Record' },
  ]

  const contextTabs =
    nav === 'home'     ? HOME_TABS.map(t => t.label) :
    nav === 'gameday'  ? GAMEDAY_TABS.map(t => t.label) :
    nav === 'training' ? TRAINING_TABS_MR.map(t => t.label) : []
  const activeTabIndex =
    nav === 'home'     ? HOME_TABS.findIndex(t => t.id === homeTab) :
    nav === 'gameday'  ? GAMEDAY_TABS.findIndex(t => t.id === gameDayTab) :
    nav === 'training' ? TRAINING_TABS_MR.findIndex(t => t.id === trainingTab) : 0

  // Full-screen phone overlays (no main chrome)
  if (nav === 'gameday' && gameDayView === 'thankparents') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: '#f7f8f7', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ThankParentsScreen onBack={() => setGameDayView('turns')} />
      </div>
    )
  }

  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      {/* Top nav */}
      <header style={{ flex: 'none', background: '#1f4a3e', color: '#ffffff' }}>
        <div style={{ height: 60, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', flexShrink: 0 }}>Clean Sheet</span>
          <nav style={{ display: 'flex', flexGrow: 1, height: 60 }}>
            {NAV.map(tab => (
              <button key={tab.id} onClick={() => { setNav(tab.id); setGameDayView('turns') }} style={{
                height: 60, padding: '0 16px', border: 0, background: 'transparent',
                fontFamily: 'inherit', fontSize: 15, fontWeight: nav === tab.id ? 700 : 500,
                color: nav === tab.id ? '#ffffff' : 'rgba(255,255,255,0.65)', cursor: 'pointer',
                borderBottom: nav === tab.id ? '3px solid #ffffff' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: 7, boxSizing: 'border-box',
              }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon}/></svg>
                {tab.label}
              </button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.15)', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#ffffff' }}>
              U9 Tom · Wattle Creek
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div style={{ width: 44, height: 44, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>TA</div>
          </div>
        </div>

        {/* Sub-tabs (home, training and game day) */}
        {(nav === 'home' || nav === 'gameday' || nav === 'training') && (
          <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24, background: '#ffffff', borderBottom: '1px solid #e9eae8' }}>
            <nav style={{ display: 'flex', flexGrow: 1, height: 44 }}>
              {contextTabs.map((tab, i) => {
                const active = i === activeTabIndex
                return (
                  <button key={tab} onClick={() => {
                    if (nav === 'home') { setHomeTab(HOME_TABS[i].id); setHomeSubView('main') }
                    if (nav === 'gameday') { setGameDayTab(GAMEDAY_TABS[i].id); setGameDayView('turns'); setRecordView('start') }
                    if (nav === 'training') { setTrainingTab(TRAINING_TABS_MR[i].id); setRecordView('start') }
                  }} style={{
                    height: 44, padding: '0 16px', border: 0, background: 'transparent',
                    fontFamily: 'inherit', fontSize: 15, fontWeight: active ? 600 : 400,
                    color: active ? '#10211f' : '#6f7f7b', cursor: 'pointer',
                    borderBottom: active ? '3px solid #40826d' : '3px solid transparent',
                    display: 'flex', alignItems: 'center', paddingBottom: 3, boxSizing: 'border-box',
                  }}>
                    {tab}
                  </button>
                )
              })}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', height: 44, gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: '999px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0"/></svg>
                Coach · MiniRoos
              </span>
              <button onClick={onBack} style={{ height: 44, padding: '0 12px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Head coach view</button>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {nav === 'home' && homeTab === 'overview'  && homeSubView === 'main'          && (phaseContent ?? <HomeMiniRoos empty={empty} onTraining={() => setNav('training')} onSeasonNotes={() => setHomeSubView('seasonnotes')} onFootballYear={() => setHomeSubView('footballyear')} onAllMessages={() => setHomeTab('inbox')} onCalendar={() => setHomeTab('calendar')} onSwapGame={() => { setNav('training'); setTrainingTab('suggest') }} onWhatWeSaw={() => { setNav('gameday'); setGameDayTab('turns'); setGameDayView('whatisaw') }} onThankParents={() => { setNav('gameday'); setGameDayView('thankparents') }} onInboxItem={() => setHomeTab('inbox')} />)}
        {nav === 'home' && homeTab === 'overview'  && homeSubView === 'seasonnotes'  && <SeasonNotesScreen empty={empty} onBack={() => setHomeSubView('main')} />}
        {nav === 'home' && homeTab === 'overview'  && homeSubView === 'footballyear' && <FootballYearScreen onBack={() => setHomeSubView('main')} />}
        {nav === 'home' && homeTab === 'inbox'     && homeSubView !== 'teamchat'     && <InboxMiniRoos empty={empty} onChat={() => setHomeSubView('teamchat')} />}
        {nav === 'home' && homeTab === 'inbox'     && homeSubView === 'teamchat'     && <TeamChatMiniRoos empty={empty} onBack={() => setHomeSubView('main')} />}
        {nav === 'home' && homeTab === 'calendar'  && <CalendarMiniRoos empty={empty} />}
        {nav === 'home' && homeTab === 'staff'     && <StaffMiniRoos empty={empty} />}
        {nav === 'training' && trainingTab === 'plan'    && <TrainingMiniRoos />}
        {nav === 'training' && trainingTab === 'suggest' && <SuggestedMiniRoos empty={empty} />}
        {nav === 'training' && trainingTab === 'record'  && recordView === 'start' && <RecordMiniRoosStart empty={empty} onClips={() => setRecordView('clips')} />}
        {nav === 'training' && trainingTab === 'record'  && recordView === 'clips' && <RecordMiniRoosClips empty={empty} onBack={() => setRecordView('start')} />}
        {nav === 'squad'   && <SquadMiniRoos empty={empty} />}
        {nav === 'gameday' && gameDayTab === 'turns'    && gameDayView === 'turns'    && <GameDayMiniRoos onWhatWeSaw={() => setGameDayView('whatisaw')} />}
        {nav === 'gameday' && gameDayTab === 'turns'    && gameDayView === 'whatisaw' && <WhatWeSawScreen onBack={() => setGameDayView('turns')} onSave={() => setGameDayView('turns')} onThankParents={() => setGameDayView('thankparents')} />}
        {nav === 'gameday' && gameDayTab === 'fixtures' && <FixturesMiniRoos empty={empty} />}
        {nav === 'gameday' && gameDayTab === 'record'   && recordView === 'start' && <RecordMiniRoosStart empty={empty} onClips={() => setRecordView('clips')} />}
        {nav === 'gameday' && gameDayTab === 'record'   && recordView === 'clips' && <RecordMiniRoosClips empty={empty} onBack={() => setRecordView('start')} />}
      </div>
    </div>
  )
}
