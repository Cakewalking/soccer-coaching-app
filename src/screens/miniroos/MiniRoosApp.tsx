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
import CoachTabletFrame  from '../CoachTabletFrame'
import { MS1MiniRoosStyle } from './MiniRoosStyleScreen'
import { MS2MiniRoosWhereWeAt } from './MiniRoosWhereWeAt'
import { MS3MiniRoosReview } from './MiniRoosReview'

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

type MiniNav = 'home' | 'squad' | 'training' | 'gameday' | 'clips' | 'record'
type HomeTab = 'overview' | 'messages' | 'calendar' | 'fixtures' | 'style' | 'whereweat' | 'staff'
type GameDayTab = 'turns' | 'review' | 'whatisaw' | 'thankparents'
type TrainingTab = 'plan' | 'suggest'
type RecordView = 'start' | 'clips'

const NAV: Array<{ id: MiniNav; label: string; icon: string }> = [
  { id: 'home',     label: 'Home',     icon: 'M4 11l8-7 8 7v9H4z' },
  { id: 'squad',    label: 'Squad',    icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5' },
  { id: 'training', label: 'Training', icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4' },
  { id: 'gameday',  label: 'Game day', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z' },
  { id: 'clips',    label: 'Clips',    icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
  { id: 'record',   label: 'Record',   icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z' },
]

const HOME_TABS: Array<{ id: HomeTab; label: string }> = [
  { id: 'overview',  label: 'Overview' },
  { id: 'messages',  label: 'Messages' },
  { id: 'calendar',  label: 'Calendar' },
  { id: 'fixtures',  label: 'Fixtures' },
  { id: 'style',     label: 'Our style' },
  { id: 'whereweat', label: "Where we're at" },
  { id: 'staff',     label: 'Team staff' },
]

export default function MiniRoosApp({ onBack: _onBack, empty, phaseContent, initialScreen, onNavChange }: { onBack: () => void; empty?: boolean; phaseContent?: ReactNode; initialScreen?: string; onNavChange?: (screen: string) => void }) {
  const [nav, setNav]               = useState<MiniNav>((initialScreen as MiniNav) ?? 'home')
  const [homeTab, setHomeTab]       = useState<HomeTab>('overview')
  const [gameDayTab, setGameDayTab] = useState<GameDayTab>('turns')
  const [homeSubView, setHomeSubView] = useState<'main' | 'seasonnotes' | 'teamchat' | 'footballyear'>('main')
  const [trainingTab, setTrainingTab] = useState<TrainingTab>('plan')
  const [recordView, setRecordView] = useState<RecordView>('start')

  const GAMEDAY_TABS: Array<{ id: GameDayTab; label: string }> = [
    { id: 'turns',       label: 'Turns' },
    { id: 'review',      label: 'Review' },
    { id: 'whatisaw',    label: 'What we saw' },
    { id: 'thankparents', label: 'Thank the parents' },
  ]

  const TRAINING_TABS_MR: Array<{ id: TrainingTab; label: string }> = [
    { id: 'plan',    label: 'Tonight' },
    { id: 'suggest', label: 'Suggested' },
  ]

  const contextTabs =
    nav === 'home'     ? HOME_TABS.map(t => t.label) :
    nav === 'gameday'  ? GAMEDAY_TABS.map(t => t.label) :
    nav === 'training' ? TRAINING_TABS_MR.map(t => t.label) : []
  const activeTabIndex =
    nav === 'home'     ? HOME_TABS.findIndex(t => t.id === homeTab) :
    nav === 'gameday'  ? GAMEDAY_TABS.findIndex(t => t.id === gameDayTab) :
    nav === 'training' ? TRAINING_TABS_MR.findIndex(t => t.id === trainingTab) : 0

  function handleNavChange(id: string) {
    setNav(id as MiniNav)
    onNavChange?.(id)
  }

  function handleSubTab(i: number) {
    if (nav === 'home')     { setHomeTab(HOME_TABS[i].id); setHomeSubView('main') }
    if (nav === 'gameday')  { setGameDayTab(GAMEDAY_TABS[i].id) }
    if (nav === 'training') { setTrainingTab(TRAINING_TABS_MR[i].id) }
  }

  let content = null
  if (nav === 'home') {
    if (homeTab === 'overview' && homeSubView === 'main')
      content = phaseContent ?? <HomeMiniRoos empty={empty} onTraining={() => setNav('training')} onSeasonNotes={() => setHomeSubView('seasonnotes')} onFootballYear={() => setHomeSubView('footballyear')} onAllMessages={() => setHomeTab('messages')} onCalendar={() => setHomeTab('calendar')} onSwapGame={() => { setNav('training'); setTrainingTab('suggest') }} onWhatWeSaw={() => { setNav('gameday'); setGameDayTab('whatisaw') }} onThankParents={() => { setNav('gameday'); setGameDayTab('thankparents') }} onInboxItem={() => setHomeTab('messages')} />
    else if (homeTab === 'overview' && homeSubView === 'seasonnotes')
      content = <SeasonNotesScreen empty={empty} onBack={() => setHomeSubView('main')} />
    else if (homeTab === 'overview' && homeSubView === 'footballyear')
      content = <FootballYearScreen onBack={() => setHomeSubView('main')} />
    else if (homeTab === 'messages' && homeSubView !== 'teamchat')
      content = <InboxMiniRoos empty={empty} onChat={() => setHomeSubView('teamchat')} />
    else if (homeTab === 'messages' && homeSubView === 'teamchat')
      content = <TeamChatMiniRoos empty={empty} onBack={() => setHomeSubView('main')} />
    else if (homeTab === 'calendar')  content = <CalendarMiniRoos empty={empty} />
    else if (homeTab === 'fixtures')  content = <FixturesMiniRoos empty={empty} />
    else if (homeTab === 'style')     content = <MS1MiniRoosStyle />
    else if (homeTab === 'whereweat') content = <MS2MiniRoosWhereWeAt />
    else if (homeTab === 'staff')     content = <StaffMiniRoos empty={empty} />
  } else if (nav === 'training') {
    if (trainingTab === 'plan')    content = <TrainingMiniRoos />
    else if (trainingTab === 'suggest') content = <SuggestedMiniRoos empty={empty} />
  } else if (nav === 'squad') {
    content = <SquadMiniRoos empty={empty} />
  } else if (nav === 'gameday') {
    if (gameDayTab === 'turns')
      content = <GameDayMiniRoos onWhatWeSaw={() => setGameDayTab('whatisaw')} />
    else if (gameDayTab === 'review')
      content = <MS3MiniRoosReview />
    else if (gameDayTab === 'whatisaw')
      content = <WhatWeSawScreen onBack={() => setGameDayTab('turns')} onSave={() => setGameDayTab('turns')} onThankParents={() => setGameDayTab('thankparents')} />
    else if (gameDayTab === 'thankparents')
      content = <ThankParentsScreen onBack={() => setGameDayTab('turns')} />
  } else if (nav === 'clips') {
    content = recordView === 'clips'
      ? <RecordMiniRoosClips empty={empty} onBack={() => setRecordView('start')} />
      : <RecordMiniRoosClips empty={empty} onBack={() => setRecordView('start')} />
  } else if (nav === 'record') {
    content = recordView === 'clips'
      ? <RecordMiniRoosClips empty={empty} onBack={() => setRecordView('start')} />
      : <RecordMiniRoosStart empty={empty} onClips={() => setRecordView('clips')} />
  }

  return (
    <CoachTabletFrame
      navTabs={NAV}
      activeNav={nav}
      onNav={handleNavChange}
      subTabs={contextTabs}
      activeSubTabIndex={activeTabIndex}
      onSubTab={handleSubTab}
      roleChip="Coach · MiniRoos"
      teamLabel="U9 Tom · Wattle Creek"
      avatarLetters="TA"
      showAsk={false}
    >
      {content}
    </CoachTabletFrame>
  )
}
