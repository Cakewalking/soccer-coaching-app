import { useState } from 'react'
import ComingMiniRoos from './ComingMiniRoos'
import ConsentMiniRoos from './ConsentMiniRoos'

type SquadTab = 'players' | 'coming' | 'consent'
type Avail = 'yes' | 'maybe' | 'away' | 'noreply'

interface Player {
  ini: string; name: string; note: string; avail: Avail
  hadGoal: boolean; hadCaptain: boolean; helpNote: string
  history: { label: string; value: string }[]
}

const PLAYERS: Player[] = [
  { ini: 'IC', name: 'Ivy Chen',    note: 'Loves to dribble',   avail: 'yes',     hadGoal: true,  hadCaptain: false,
    helpNote: 'Loves to dribble. Keep her wide so she gets space to run.',
    history: [{ label: 'Turn in goal', value: 'Sat 16 May' }, { label: 'Captain', value: 'Sat 2 May' }] },
  { ini: 'MB', name: 'Max Bailey',  note: 'Asks to go in goal', avail: 'yes',     hadGoal: false, hadCaptain: false,
    helpNote: 'Keen and loud. Wants to try every position. Remind him to listen first.',
    history: [{ label: 'Turn in goal', value: 'Due this week' }, { label: 'Started', value: 'All 5 games' }] },
  { ini: 'AK', name: 'Arlo Kaur',   note: 'New this term',      avail: 'yes',     hadGoal: false, hadCaptain: false,
    helpNote: 'New this term. Show him each game before it starts. Pair with Ivy.',
    history: [{ label: 'First game', value: 'Sat 30 May' }, { label: 'Started', value: '2 of 2' }] },
  { ini: 'ZM', name: 'Zara Moore',  note: 'Passes early',       avail: 'yes',     hadGoal: true,  hadCaptain: true,
    helpNote: 'Natural passer. Put her in the middle so she can link the team.',
    history: [{ label: 'Turn in goal', value: 'Sat 23 May' }, { label: 'Captain', value: 'Sat 16 May' }] },
  { ini: 'LW', name: 'Leo Wright',  note: 'Quiet, likes a job', avail: 'yes',     hadGoal: false, hadCaptain: false,
    helpNote: 'Quiet but reliable. Give him a specific job each game — he loves it.',
    history: [{ label: 'Turn in goal', value: 'Due this week' }, { label: 'Captain', value: 'Due this term' }] },
  { ini: 'EN', name: 'Evie Nolan',  note: 'Left footer',        avail: 'yes',     hadGoal: false, hadCaptain: false,
    helpNote: 'Dominant left foot. Encourage right side touches in games.',
    history: [{ label: 'Turn in goal', value: 'Sat 9 May' }, { label: 'Started', value: 'All 5 games' }] },
  { ini: 'TS', name: 'Theo Santos', note: 'Runs all day',        avail: 'yes',     hadGoal: true,  hadCaptain: false,
    helpNote: 'Endless energy. Keep him involved but remind him to look for a friend.',
    history: [{ label: 'Turn in goal', value: 'Sat 30 May' }, { label: 'Captain', value: 'Due this term' }] },
  { ini: 'PD', name: 'Poppy Dunn',  note: 'Shy with the ball',  avail: 'maybe',   hadGoal: true,  hadCaptain: false,
    helpNote: "She's shy with the ball. Pair her with Zara in the first game and give her the first kick-off.",
    history: [{ label: 'Turn in goal', value: 'Sat 16 May' }, { label: 'Captain', value: 'Sat 23 May' }, { label: 'Saturday', value: "7 — parent says maybe · school concert" }, { label: 'First-aid card', value: 'Nothing to know' }] },
  { ini: 'OH', name: 'Omar Haddad', note: 'Away next week',     avail: 'away',    hadGoal: false, hadCaptain: false,
    helpNote: 'Away this week. Back from Mon 9 Jun.',
    history: [{ label: 'Last game', value: 'Sat 23 May' }, { label: 'Turn in goal', value: 'Due this week' }] },
  { ini: 'JL', name: 'Jude Lim',    note: 'Plays futsal too',   avail: 'noreply', hadGoal: false, hadCaptain: false,
    helpNote: 'Plays futsal on Fridays. Check he is not too tired.',
    history: [{ label: 'Turn in goal', value: 'Due this week' }, { label: 'No reply yet', value: 'for Saturday' }] },
]

function availStyle(a: Avail) {
  if (a === 'yes')     return { bg: '#40826d', color: '#fff',    label: 'Yes'      }
  if (a === 'maybe')   return { bg: '#cbbeb5', color: '#10211f', label: 'Maybe'    }
  if (a === 'away')    return { bg: '#e9eae8', color: '#4a5a57', label: 'Away'     }
  return                      { bg: '#f0f1ef', color: '#6f7f7b', label: 'No reply' }
}

const Check = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
)

export default function SquadMiniRoos({ empty }: { empty?: boolean }) {
  const [sel, setSel] = useState<Player>(PLAYERS[7])
  const [squadTab, setSquadTab] = useState<SquadTab>('players')

  const tabBar = (
    <div style={{ flex: 'none', padding: '14px 28px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Squad</h1>
        <span style={{ fontSize: 14, color: '#4a5a57' }}>10 players · U9 Tom · 7 coming Saturday, 1 maybe, 1 away, 1 to answer</span>
        <div style={{ flexGrow: 1 }} />
        <button style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Remind 1 family</button>
        <button style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ Add a player</button>
      </div>
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e9eae8', marginBottom: 10 }}>
        {([['players', 'Players'], ['coming', "Who's coming"], ['consent', 'Consent']] as [SquadTab, string][]).map(([id, label]) => (
          <button key={id} onClick={() => setSquadTab(id)} style={{ height: 44, padding: '0 16px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: squadTab === id ? 700 : 500, color: squadTab === id ? '#10211f' : '#6f7f7b', cursor: 'pointer', borderBottom: squadTab === id ? '2px solid #40826d' : '2px solid transparent' }}>{label}</button>
        ))}
      </div>
    </div>
  )

  if (squadTab === 'coming')  return <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>{tabBar}<ComingMiniRoos empty={empty} /></div>
  if (squadTab === 'consent') return <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>{tabBar}<ConsentMiniRoos empty={empty} /></div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>

      {tabBar}

      {/* Grid + sidebar */}
      <div style={{ flexGrow: 1, minHeight: 0, padding: '0 28px 0', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20, overflow: 'hidden' }}>

        {/* Player grid */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden', paddingBottom: 48 }}>
          <div style={{ flex: 'none', fontSize: 12, color: '#4a5a57', marginBottom: 10 }}>Ticks show who has had a turn in goal and as captain this term</div>
          <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, alignContent: 'start' }}>
            {PLAYERS.map(p => {
              const av = availStyle(p.avail)
              const active = sel.ini === p.ini
              return (
                <button key={p.ini} onClick={() => setSel(p)} style={{
                  display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 14px',
                  background: active ? '#eef5f2' : '#fff',
                  border: `1px solid ${active ? '#40826d' : '#c5c8c4'}`,
                  borderRadius: 14, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: '#4a5a57' }}>{p.note}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: av.bg, color: av.color }}>Sat: {av.label}</span>
                    <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: 12, fontWeight: 600, background: p.hadGoal ? '#eef5f2' : '#f0f1ef', color: p.hadGoal ? '#2f6252' : '#6f7f7b', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {p.hadGoal && <Check />}Goal
                    </span>
                    <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: 12, fontWeight: 600, background: p.hadCaptain ? '#eef5f2' : '#f0f1ef', color: p.hadCaptain ? '#2f6252' : '#6f7f7b', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {p.hadCaptain && <Check />}Captain
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflowY: 'auto', paddingBottom: 48 }}>
          <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ flex: 'none', width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{sel.ini}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>{sel.name}</div>
                <div style={{ fontSize: 13, color: '#4a5a57' }}>Second term · plays anywhere</div>
              </div>
            </div>
            <div style={{ background: '#eef5f2', borderRadius: 10, padding: '10px 12px', fontSize: 13, lineHeight: '18px', color: '#1f4a3e' }}>
              <span style={{ fontWeight: 700 }}>What helps {sel.name.split(' ')[0]}:</span> {sel.helpNote}
            </div>
            {sel.history.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderTop: '1px solid #e9eae8' }}>
                <span style={{ flex: 'none', width: 20, height: 20, borderRadius: '999px', background: '#f0f1ef', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6f7f7b' }}>{i + 1}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{h.label}</div>
                  <div style={{ fontSize: 12, color: '#4a5a57' }}>{h.value}</div>
                </div>
              </div>
            ))}
          </div>
          <button style={{ width: '100%', height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Message her mum</button>
          <button style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add a note</button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid #e9eae8', padding: '10px 28px', background: '#fff' }}>
        <span style={{ fontSize: 13, color: '#4a5a57' }}>No ratings, rankings or running numbers at this age. Just who is here, who has had a turn, and what helps each child.</span>
      </div>
    </div>
  )
}
