import { useState } from 'react'
import { SQUAD_PLAYERS, CLIPS } from '../data'

interface Props {
  playerIni: string
  empty?: boolean
}

const SETUP_STEPS = [
  { label: 'Add a parent contact',    desc: 'For messages and consent',    cta: 'Add' },
  { label: 'Pair her boot sensors',   desc: 'Touches, left and right foot', cta: 'Pair' },
  { label: 'Give her a GPS vest',     desc: 'Running, sprints and load',    cta: 'Assign' },
  { label: 'Send her first check-in', desc: 'Three questions on her phone', cta: 'Send' },
  { label: 'Set a development goal',  desc: 'One goal, checked every game', cta: 'Set goal' },
]

const PROFILE_TABS = ['Overview', 'Clips', 'Wearable data', 'Wellness', 'Development']

const GAME_RESULTS = [
  { opp: 'BAN', result: 'W', mins: 40 },
  { opp: 'RIV', result: 'L', mins: 38 },
  { opp: 'LYN', result: 'W', mins: 42 },
  { opp: 'KES', result: 'W', mins: 45 },
  { opp: 'BAY', result: 'W', mins: 41 },
  { opp: 'NOR', result: 'D', mins: 44 },
  { opp: 'SAL', result: 'L', mins: 43 },
  { opp: 'IRO', result: 'W', mins: 43 },
]

function resultColor(r: string) {
  if (r === 'W') return { bg: '#2f6252', color: '#ffffff' }
  if (r === 'L') return { bg: '#c39797', color: '#10211f' }
  return { bg: '#cbbeb5', color: '#10211f' }
}

function statusChipColor(status: string) {
  if (status === 'manage') return { bg: '#fdf8e8', color: '#7a5a00', border: '#e9d88a' }
  if (status === 'checkin') return { bg: '#fdf0ee', color: '#7a3030', border: '#e9b8b0' }
  return { bg: '#e8f2ee', color: '#2f6252', border: '#a3d4c0' }
}

export default function PlayerProfileScreen({ playerIni, empty }: Props) {
  const [activeTab, setActiveTab] = useState(0)
  const [toast, setToast] = useState<string|null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  const player = SQUAD_PLAYERS.find(p => p.ini === playerIni) ?? SQUAD_PLAYERS[7]
  const playerClips = CLIPS.filter(c => c.players.includes(player.ini))
  const statusChip = statusChipColor(player.status)

  const statusLabel =
    player.status === 'manage'  ? 'Manage load' :
    player.status === 'checkin' ? 'Low wellness' :
    player.status === 'missing' ? 'No check-in' : 'Ready'

  const metricCards = [
    { label: 'Distance per game',  value: '4.0 km', sub: '4.6 km last game, her best', source: 'GPS vest',     trend: [3.4, 3.7, 3.5, 3.8, 4.0, 3.9, 4.2, 4.6] },
    { label: 'Sprints per game',   value: '22',     sub: '26 last game, up from 20',   source: 'GPS vest',     trend: [18, 20, 19, 21, 22, 20, 24, 26] },
    { label: 'Wins of the ball',   value: '5.6',    sub: '9 last game, team high',     source: 'Match camera', trend: [4, 5, 4, 5, 6, 5, 7, 9] },
    { label: 'Passes completed',   value: '76%',    sub: '82% last game',              source: 'Match camera', trend: [70, 72, 68, 74, 76, 73, 79, 82] },
  ]

  const latestNotes = [
    { from: 'Sam K · Coach', date: 'Sun 31 May', text: "Best game of her season. Her pressing set the tone, and the left foot is starting to come." },
    { from: 'Mia · check-in', date: 'Today', text: '"Legs feel heavy after two trainings."' },
  ]

  function Sparkline({ data, color }: { data: number[], color: string }) {
    const W = 72, H = 28
    const max = Math.max(...data), min = Math.min(...data)
    const range = max - min || 1
    const pts = data.map((v, i) => ({
      x: (i / (data.length - 1)) * W,
      y: H - ((v - min) / range) * H * 0.75 - H * 0.1,
    }))
    const last = pts[pts.length - 1]
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" style={{ flex: 'none' }}>
        <polyline points={pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx={last.x.toFixed(1)} cy={last.y.toFixed(1)} r="3" fill={color}/>
      </svg>
    )
  }

  if (empty) {
    return (
      <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '0 0 32px' }}>
          <div style={{ padding: '20px 32px 0', borderBottom: '1px solid #e9eae8', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>HQ</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#10211f' }}>Harper Quinn</div>
                  <span style={{ padding: '2px 10px', borderRadius: '999px', background: '#eef5f2', color: '#2f6252', fontSize: 12, fontWeight: 700 }}>New</span>
                </div>
                <div style={{ fontSize: 13, color: '#4a5a57' }}>Winger · #17 · U12 Sam · added today</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, paddingBottom: 14 }}>
              {[{ label: 'Games', value: '—' }, { label: 'Minutes', value: '—' }, { label: 'Goals', value: '—' }, { label: 'Assists', value: '—' }, { label: 'Avg minutes', value: '—' }].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#4a5a57' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 0, borderTop: '1px solid #e9eae8', marginTop: 4 }}>
              {PROFILE_TABS.map((t, i) => (
                <button key={t} onClick={() => setActiveTab(i)} style={{ height: 44, padding: '0 16px', border: 0, borderBottom: activeTab === i ? '2px solid #2f6252' : '2px solid transparent', background: 'transparent', fontFamily: 'inherit', fontSize: 13, fontWeight: activeTab === i ? 700 : 400, cursor: 'pointer', color: activeTab === i ? '#2f6252' : '#4a5a57' }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: '24px 32px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {[
                  { label: 'DISTANCE PER GAME', note: 'After her first game' },
                  { label: 'SPRINTS PER GAME', note: 'After her first game' },
                  { label: 'WINS OF THE BALL', note: 'After her first game' },
                  { label: 'PASSES COMPLETED', note: 'After her first game' },
                ].map((m, i) => (
                  <div key={i} style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 12, padding: '14px 16px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b', marginBottom: 4 }}>{m.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>—</div>
                    <div style={{ fontSize: 12, color: '#4a5a57' }}>{m.note}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Game by game</div>
                <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 2 }}>Minutes played</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>Minutes appear after each game</div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 13, color: '#4a5a57' }}>No clips of Harper yet</div>
                <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 4, lineHeight: 1.5 }}>Once the match camera records a game, her best moments and things to work on are tagged here automatically.</div>
              </div>
            </div>
            <div>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>Set Harper up</div>
                <div style={{ fontSize: 12, color: '#4a5a57', marginBottom: 12 }}>0 of 5 done</div>
                {SETUP_STEPS.map((s, i) => (
                  <div key={i} style={{ padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{s.label}</div>
                      <div style={{ fontSize: 12, color: '#4a5a57' }}>{s.desc}</div>
                    </div>
                    <button onClick={() => showToast(`${s.cta}: ${s.label.toLowerCase()}.`)} style={{ height: 44, padding: '0 10px', borderRadius: 999, border: '1px solid #e9eae8', background: '#fff', color: '#2f6252', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>{s.cta}</button>
                  </div>
                ))}
                <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: 1.5, marginTop: 10, paddingTop: 10, borderTop: '1px solid #f0f1f0' }}>{"Harper's profile fills in on its own as she trains and plays. Nothing else to enter."}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Main */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '0 0 32px' }}>
        {/* Player header */}
        <div style={{ padding: '20px 32px 0', borderBottom: '1px solid #e9eae8', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>{player.ini}</div>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#10211f', letterSpacing: '-0.02em' }}>{player.fullName}</span>
                <span style={{ ...statusChip, fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: '999px', border: `1px solid ${statusChip.border}` }}>{statusLabel}</span>
              </div>
              <div style={{ fontSize: 13, color: '#6f7f7b', marginTop: 4 }}>
                {player.pos} · #{player.games} · U12 Sam · {player.foot} foot · {player.season}
              </div>
            </div>
            {/* Quick stats */}
            <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
              {[
                { label: 'Games',        value: player.games       },
                { label: 'Minutes',      value: player.minutesUsed },
                { label: 'Goals',        value: player.goals       },
                { label: 'Assists',      value: player.assists     },
                { label: 'Avg minutes',  value: 42                 },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#10211f' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {PROFILE_TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)} style={{
                height: 44, padding: '0 16px', border: 0, background: 'transparent',
                fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                color: i === activeTab ? '#10211f' : '#6f7f7b',
                borderBottom: i === activeTab ? '2px solid #40826d' : '2px solid transparent',
                display: 'flex', alignItems: 'flex-end', paddingBottom: 2, gap: 6,
              }}>
                {tab}
                {tab === 'Clips' && <span style={{ background: '#e9eae8', color: '#6f7f7b', borderRadius: '999px', padding: '0 6px', fontSize: 12, lineHeight: '18px' }}>{playerClips.length}</span>}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 0 && (
          <div style={{ padding: '24px 32px' }}>
            {/* Metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
              {metricCards.map(m => (
                <div key={m.label} style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 14, padding: '16px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f', marginBottom: 8 }}>{m.label}</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>{m.value}</span>
                    <Sparkline data={m.trend} color="#40826d" />
                  </div>
                  <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '16px' }}>{m.sub}</div>
                  <div style={{ fontSize: 11, color: '#a3b0ad', marginTop: 4 }}>{m.source}</div>
                </div>
              ))}
            </div>

            {/* Game by game */}
            <div style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 16, padding: '20px 24px', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#10211f' }}>Game by game</h2>
                <span style={{ fontSize: 13, color: '#6f7f7b' }}>Minutes played out of 60 · fair share is about 39</span>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 100, position: 'relative' }}>
                {/* Fair share line at 39/60 = 65% height */}
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: `${(39 / 60) * 80 + 24}px`, borderTop: '1px dashed #c5c8c4', pointerEvents: 'none' }} />
                {GAME_RESULTS.map((g, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b' }}>{g.mins}</span>
                    <div style={{ width: '100%', borderRadius: 4, background: '#40826d', height: `${(g.mins / 60) * 80}px`, transition: 'height 0.2s' }} />
                    <span style={{ ...resultColor(g.result), width: 24, height: 20, borderRadius: 4, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{g.result}</span>
                    <span style={{ fontSize: 11, color: '#6f7f7b' }}>{g.opp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best recent clips */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#10211f' }}>Best recent clips</h2>
                <button onClick={() => showToast(`Opening all ${playerClips.length} clips for ${player.fullName}.`)} style={{ border: 0, background: 'transparent', color: '#2f6252', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>See all {playerClips.length}</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                {playerClips.slice(0, 3).map(clip => (
                  <div key={clip.id} style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ background: '#10211f', aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '999px', border: '2px solid rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)" aria-hidden="true"><polygon points="6 3 20 12 6 21"/></svg>
                      </div>
                      <span style={{ position: 'absolute', top: 6, left: 6, background: clip.type === 'good' ? 'rgba(64,130,109,0.9)' : 'rgba(157,124,128,0.9)', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '2px 6px' }}>
                        {clip.type === 'good' ? 'Good example' : 'To work on'}
                      </span>
                      <span style={{ position: 'absolute', bottom: 6, right: 6, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 11, borderRadius: 4, padding: '2px 6px' }}>{clip.duration}</span>
                    </div>
                    <div style={{ padding: '10px 12px 12px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f', marginBottom: 4 }}>{clip.title}</div>
                      <div style={{ fontSize: 12, color: '#6f7f7b' }}>{clip.gameLabel} · min {clip.min}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab !== 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#6f7f7b', fontSize: 15 }}>
            {PROFILE_TABS[activeTab]} — coming soon
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', padding: '24px 20px', overflowY: 'auto', background: '#ffffff' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#10211f' }}>Right now</h2>

        {/* Load */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
            <span style={{ fontWeight: 600, color: '#10211f' }}>Load this week</span>
            <span style={{ fontWeight: 700, color: player.load > 110 ? '#9d7c80' : '#40826d' }}>{player.load}% of usual</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: '#e9eae8', position: 'relative', marginBottom: 4 }}>
            <div style={{ height: 8, borderRadius: 4, background: player.load > 110 ? '#c39797' : '#40826d', width: `${Math.min(100, player.load)}%` }} />
            <div style={{ position: 'absolute', top: -3, left: `${Math.min(100, 91)}%`, width: 1.5, height: 14, background: '#6f7f7b' }} />
          </div>
          <div style={{ fontSize: 12, color: '#6f7f7b' }}>GPS vest · line marks 110%</div>
        </div>

        {/* Wellness */}
        <div style={{ marginBottom: 16, padding: '10px 12px', background: '#f7f8f7', borderRadius: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>Wellness today</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: player.wellness && player.wellness < 3 ? '#9d7c80' : '#10211f' }}>
              {player.wellness ?? '—'} / 5 · {(player.checkInNote ?? player.note).toLowerCase()}
            </span>
          </div>
        </div>

        {/* Plan */}
        {player.status !== 'ready' && (
          <div style={{ marginBottom: 16, padding: '10px 12px', background: '#e8f2ee', borderRadius: 10, fontSize: 13, color: '#2f6252', lineHeight: '18px' }}>
            <strong>Plan:</strong> {
              player.status === 'manage' ? `Light training tonight, first half only on Saturday.` :
              player.status === 'checkin' ? `Have a quiet word before warm-up. Keep it light.` :
              `Chase check-in before training.`
            }
          </div>
        )}

        {/* Dev goal */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b' }}>Development goal</span>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: '#e8f2ee', color: '#2f6252' }}>On track</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>{player.devGoal}</div>
          <div style={{ height: 4, borderRadius: 2, background: '#e9eae8', marginBottom: 6 }}>
            <div style={{ height: 4, borderRadius: 2, background: '#40826d', width: '68%' }} />
          </div>
          <div style={{ fontSize: 13, color: '#4a5a57' }}>Left-foot passes per game: 2 → 11 this season</div>
          <button onClick={() => { setActiveTab(4) }} style={{ border: 0, background: 'transparent', color: '#2f6252', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: 0, marginTop: 4 }}>See development →</button>
        </div>

        {/* Latest notes */}
        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#10211f' }}>Latest notes</h3>
          {latestNotes.map((n, i) => (
            <div key={i} style={{ padding: '10px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6f7f7b', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{n.from}</span>
                <span>{n.date}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: '18px', color: '#10211f' }}>{n.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
  )
}
