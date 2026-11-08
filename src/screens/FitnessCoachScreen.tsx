import { useState } from 'react'

type FitnessTab = 'home' | 'squad' | 'training' | 'matchday'
type SquadSubTab = 'growth' | 'injuries' | 'test-results'
type TrainingSubTab = 'tests' | 'her-part' | 'measuring' | 'sprint'
type HomeVariant = 'play' | 'grow' | 'perform' | 'pro'

const PLAYERS_GROWTH = [
  { ini: 'MT', name: 'Mia Tran',      cm: 152, growthMm: 8,  flag: 'Growing fast' as const },
  { ini: 'NO', name: 'Noah Owusu',    cm: 160, growthMm: 12, flag: 'Growing fast' as const },
  { ini: 'EB', name: 'Ella Brennan',  cm: 148, growthMm: 3,  flag: null },
  { ini: 'JP', name: 'Jai Patel',     cm: 155, growthMm: 6,  flag: null },
  { ini: 'ZH', name: 'Zoe Harris',    cm: 145, growthMm: 5,  flag: null },
  { ini: 'GO', name: 'Grace Owusu',   cm: 162, growthMm: 15, flag: 'Growing fast' as const },
  { ini: 'LH', name: 'Liam Hart',     cm: 158, growthMm: 2,  flag: null },
  { ini: 'FW', name: 'Finn Walsh',    cm: 153, growthMm: 7,  flag: null },
]

const INJURIES = [
  { ini: 'MT', name: 'Mia Tran',    injury: 'Right ankle sprain', days: 8,  status: 'returning' as const, note: 'Light training OK' },
  { ini: 'GO', name: 'Grace Owusu', injury: 'Heel pain (Sever\'s)', days: 21, status: 'managing' as const,  note: 'No high impact' },
  { ini: 'RC', name: 'Ruby Chen',   injury: 'Hamstring tightness', days: 3,  status: 'monitoring' as const, note: 'Normal training' },
]

const TESTS = [
  { name: '10m sprint',         unit: 's',  avg: 1.98, target: 1.90, trend: 'up'   as const },
  { name: 'Standing long jump', unit: 'm',  avg: 1.72, target: 1.80, trend: 'up'   as const },
  { name: 'Yo-Yo level 1',     unit: 'lvl', avg: 14.2, target: 15.0, trend: 'down' as const },
  { name: 'Push-ups max',       unit: 'rep', avg: 24,   target: 28,   trend: 'flat' as const },
]

function SparkBar({ value, max, color = '#2f6252' }: { value: number; max: number; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{ width: 4, height: 16, borderRadius: 2, background: (i / 8) * max < value ? color : '#e9eae8' }} />
      ))}
    </div>
  )
}

export default function FitnessCoachScreen({ empty }: { empty?: boolean }) {
  const [tab, setTab] = useState<FitnessTab>('home')
  const [squadSub, setSquadSub] = useState<SquadSubTab>('growth')
  const [trainSub, setTrainSub] = useState<TrainingSubTab>('tests')
  const [homeVariant, setHomeVariant] = useState<HomeVariant>('play')
  const [showRPE, setShowRPE] = useState(false)
  const [rpePlayer, setRpePlayer] = useState(0)
  const [rpeScore, setRpeScore] = useState<number | null>(null)
  const [rpeHurt, setRpeHurt] = useState<'no' | 'yes' | null>(null)
  const [rpeFun, setRpeFun] = useState<'nope' | 'ok' | 'loved' | null>(null)

  const RPE_PLAYERS = ['Mia T', 'Noah O', 'Ella B', 'Jai P', 'Zoe H', 'Grace O', 'Liam H', 'Finn W', 'Ruby C', 'Isla M', 'Leo M']

  const RPE_EMOJIS = [
    { v: 0, label: 'Nothing',    emoji: '😴' },
    { v: 2, label: 'Very light', emoji: '🙂' },
    { v: 4, label: 'Moderate',   emoji: '😐' },
    { v: 6, label: 'Hard',       emoji: '😤' },
    { v: 8, label: 'Very hard',  emoji: '😰' },
    { v: 10, label: 'Max',       emoji: '🤯' },
  ]

  if (empty) {
    return (
      <div style={{ background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 32px', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
        <div style={{ width: 60, height: 60, borderRadius: '999px', background: '#e4f2eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f' }}>No squad linked yet</div>
        <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>The head coach needs to invite you as fitness coach first.</div>
      </div>
    )
  }

  const SubTabBar = ({ tabs, active, onSelect }: { tabs: { id: string; label: string }[]; active: string; onSelect: (id: string) => void }) => (
    <div style={{ display: 'flex', borderBottom: '1px solid #e9eae8', background: '#fff', flexShrink: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)} style={{
          flex: 1, height: 42, border: 0, background: 'transparent', fontFamily: 'inherit',
          fontSize: 13, fontWeight: active === t.id ? 700 : 400, cursor: 'pointer',
          color: active === t.id ? '#1f4a3e' : '#6f7f7b',
          borderBottom: active === t.id ? '2px solid #1f4a3e' : '2px solid transparent',
        }}>{t.label}</button>
      ))}
    </div>
  )

  return (
    <div style={{ background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '20px 24px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U14 Sam · Fitness coach</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Fitness overview</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>FC</div>
        </div>
      </div>

      {/* Top tab nav */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e9eae8', background: '#fff', flexShrink: 0 }}>
        {([
          { id: 'home' as FitnessTab, label: 'Home' },
          { id: 'squad' as FitnessTab, label: 'Squad' },
          { id: 'training' as FitnessTab, label: 'Training' },
          { id: 'matchday' as FitnessTab, label: 'Match day' },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, height: 44, border: 0, background: 'transparent', fontFamily: 'inherit',
            fontSize: 13, fontWeight: tab === t.id ? 700 : 400, cursor: 'pointer',
            color: tab === t.id ? '#1f4a3e' : '#6f7f7b',
            borderBottom: tab === t.id ? '2px solid #1f4a3e' : '2px solid transparent',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto' }}>

        {/* HOME TAB */}
        {tab === 'home' && (
          <div>
            {/* Variant selector */}
            <div style={{ padding: '16px 20px 0', display: 'flex', gap: 8 }}>
              {(['play', 'grow', 'perform', 'pro'] as HomeVariant[]).map(v => (
                <button key={v} onClick={() => setHomeVariant(v)} style={{
                  flex: 1, height: 32, borderRadius: '999px', border: `1px solid ${homeVariant === v ? '#2f6252' : '#e9eae8'}`,
                  background: homeVariant === v ? '#2f6252' : '#fff', color: homeVariant === v ? '#fff' : '#6f7f7b',
                  fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
                }}>{v}</button>
              ))}
            </div>

            <div style={{ padding: '16px 20px' }}>
              {/* Priority card */}
              <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 6 }}>Priority this week</div>
                {homeVariant === 'play' && <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>3 players approaching load cap — adjust drill intensity tonight</div>}
                {homeVariant === 'grow' && <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>2 rapid-growth players: cap jumping and sprinting</div>}
                {homeVariant === 'perform' && <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>Yo-Yo scores dipping — 2 more conditioning blocks needed</div>}
                {homeVariant === 'pro' && <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>Load vs performance correlation 0.72 — training response is positive</div>}
              </div>

              {/* Quick stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
                {[
                  { n: '14', l: 'Players tracked', color: '#10211f' },
                  { n: '3',  l: 'High load alert', color: '#c39797' },
                  { n: '2',  l: 'Injury watch',    color: '#c3a84a' },
                ].map(s => (
                  <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '14px 12px', border: '1px solid #e9eae8', textAlign: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Load overview bar */}
              <div style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Squad load this week</div>
                {PLAYERS_GROWTH.slice(0, 5).map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</div>
                    <div style={{ flexGrow: 1, height: 6, borderRadius: 3, background: '#f0f1f0' }}>
                      <div style={{ height: 6, borderRadius: 3, background: p.flag ? '#c39797' : '#40826d', width: `${40 + i * 12}%` }} />
                    </div>
                    <span style={{ fontSize: 11, color: '#6f7f7b', width: 28, textAlign: 'right' }}>{40 + i * 12}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SQUAD TAB */}
        {tab === 'squad' && (
          <div>
            <SubTabBar
              tabs={[{ id: 'growth', label: 'Growth' }, { id: 'injuries', label: 'Injuries' }, { id: 'test-results', label: 'Test results over time' }]}
              active={squadSub}
              onSelect={id => setSquadSub(id as SquadSubTab)}
            />
            <div style={{ padding: '16px 20px' }}>

              {squadSub === 'growth' && (
                <>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Height and growth rate</div>
                  {PLAYERS_GROWTH.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</div>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{p.name}</div>
                        <SparkBar value={p.growthMm} max={20} color={p.flag ? '#c39797' : '#40826d'} />
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{p.cm} cm</div>
                        <div style={{ fontSize: 12, color: p.growthMm > 10 ? '#c39797' : '#40826d', fontWeight: 600 }}>+{p.growthMm}mm/mo</div>
                      </div>
                      {p.flag && <span style={{ fontSize: 10, fontWeight: 700, color: '#c39797', background: '#fdf4f4', borderRadius: 6, padding: '2px 6px', flexShrink: 0 }}>⚠</span>}
                    </div>
                  ))}
                </>
              )}

              {squadSub === 'injuries' && (
                <>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Current injury watch</div>
                  {INJURIES.map((inj, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{inj.ini}</div>
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{inj.name}</div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: inj.status === 'returning' ? '#40826d' : inj.status === 'managing' ? '#c39797' : '#c3a84a', background: inj.status === 'returning' ? '#e4f2eb' : inj.status === 'managing' ? '#fdf4f4' : '#fdf8ed', borderRadius: 6, padding: '2px 8px' }}>
                              {inj.status}
                            </span>
                          </div>
                          <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 4 }}>{inj.injury}</div>
                          <div style={{ fontSize: 12, color: '#6f7f7b' }}>{inj.days} days · {inj.note}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {squadSub === 'test-results' && (() => {
                const HISTORY = [
                  { ini: 'MT', name: 'Mia Tran', data: [1.86, 1.89, 1.92, 1.91, 1.95], best: 1.95, change: '+0.09', real: true },
                  { ini: 'NO', name: 'Noah Owusu', data: [1.74, 1.78, 1.80, 1.84, 1.88], best: 1.88, change: '+0.14', real: true },
                  { ini: 'EB', name: 'Ella Brennan', data: [1.65, 1.67, 1.66, 1.68, 1.70], best: 1.70, change: '+0.05', real: false },
                  { ini: 'JP', name: 'Jai Patel', data: [1.80, 1.82, 1.81, 1.83, 1.85], best: 1.85, change: '+0.05', real: false },
                  { ini: 'ZH', name: 'Zoe Harris', data: [1.58, 1.61, 1.63, 1.65, 1.68], best: 1.68, change: '+0.10', real: true },
                  { ini: 'GO', name: 'Grace Owusu', data: [1.70, 1.73, 1.75, 1.78, 1.82], best: 1.82, change: '+0.12', real: true },
                ]
                const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov', 'Now']
                function MiniLineChart({ data, real }: { data: number[]; real: boolean }) {
                  const mn = Math.min(...data) - 0.02
                  const mx = Math.max(...data) + 0.02
                  const W = 100, H = 36
                  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - mn) / (mx - mn)) * H}`)
                  const realMin = data[0] * 1.05
                  return (
                    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
                      {real && (
                        <rect x={0} y={H - ((realMin - mn) / (mx - mn)) * H - 4} width={W} height={8} fill="#e4f2eb" rx={2} />
                      )}
                      <polyline points={pts.join(' ')} fill="none" stroke={real ? '#2f6252' : '#cbbeb5'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx={(data.length - 1) / (data.length - 1) * W} cy={H - ((data[data.length - 1] - mn) / (mx - mn)) * H} r={3} fill={real ? '#2f6252' : '#cbbeb5'}/>
                    </svg>
                  )
                }
                return (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Standing long jump · 5 tests since Aug</div>
                        <div style={{ fontSize: 12, color: '#6f7f7b' }}>Real change is +5% or more above a growth-adjusted baseline</div>
                      </div>
                      <select style={{ height: 32, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 13, color: '#10211f' }}>
                        {['Standing long jump','10m sprint','Yo-Yo level 1','Push-ups max'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 60px 80px', padding: '8px 16px', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                        {['PLAYER', 'TREND', 'BEST', 'CHANGE'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
                      </div>
                      {HISTORY.map((p, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 60px 80px', padding: '12px 16px', borderBottom: i < HISTORY.length - 1 ? '1px solid #f0f1f0' : 'none', gap: 8, alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{p.name}</div>
                              <div style={{ display: 'flex', gap: 4 }}>{MONTHS.map(m => <span key={m} style={{ fontSize: 9, color: '#6f7f7b' }}>{m}</span>)}</div>
                            </div>
                          </div>
                          <MiniLineChart data={p.data} real={p.real} />
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p.best}m</div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: p.real ? '#2f6252' : '#6f7f7b' }}>{p.change}m</div>
                            {p.real && <span style={{ fontSize: 10, fontWeight: 700, color: '#2f6252', background: '#e4f2eb', borderRadius: 4, padding: '1px 5px' }}>Real change</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 12, fontSize: 12, color: '#6f7f7b', background: '#fff', borderRadius: 10, padding: '10px 14px', border: '1px solid #e9eae8' }}>
                      Shaded zone on each chart = what counts as real change, adjusted for the age when growth can artificially lift scores.
                    </div>
                  </>
                )
              })()}

            </div>
          </div>
        )}

        {/* TRAINING TAB */}
        {tab === 'training' && (
          <div>
            <SubTabBar
              tabs={[{ id: 'tests', label: 'Fitness tests' }, { id: 'her-part', label: 'Her part tonight' }, { id: 'measuring', label: 'Measuring session' }, { id: 'sprint', label: 'Sprint race' }]}
              active={trainSub}
              onSelect={id => setTrainSub(id as TrainingSubTab)}
            />
            <div style={{ padding: '16px 20px' }}>

              {trainSub === 'tests' && (
                <>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Latest test results vs targets</div>
                  {TESTS.map((t, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1px solid #e9eae8' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{t.name}</div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 20, fontWeight: 800, color: t.trend === 'up' ? '#40826d' : '#c39797' }}>{t.avg} {t.unit}</div>
                          <div style={{ fontSize: 11, color: '#6f7f7b' }}>target {t.target} {t.unit}</div>
                        </div>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: '#f0f1f0' }}>
                        <div style={{ height: 6, borderRadius: 3, background: t.trend === 'up' ? '#40826d' : '#c39797', width: `${(t.avg / t.target) * 80}%` }} />
                      </div>
                    </div>
                  ))}
                </>
              )}

              {trainSub === 'measuring' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Measuring session</div>
                      <div style={{ fontSize: 12, color: '#6f7f7b' }}>U12 Sam · Thu 11 Jun · 9 of 16 measured · about 40 seconds each</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Finish later</button>
                      <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Save and update growth</button>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 120px', padding: '8px 16px', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                        {['PLAYER','LAST (AUG)','HEIGHT TODAY','SITTING HEIGHT','WEIGHT'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
                      </div>
                      {[
                        { ini: 'NO', name: 'Noah Okafor', last: '149.7 cm', h: '151.8 cm', sh: '78.9 cm', w: '41.0 kg', delta: '+2.1 cm in 3 months' },
                        { ini: 'ZH', name: 'Zoe Hartley', last: '147.6 cm', h: '149.6 cm', sh: '77.8 cm', w: '40.4 kg', delta: '+2.0 cm in 3 months' },
                        { ini: 'JP', name: 'Jai Patel', last: '151.2 cm', h: '153.0 cm', sh: '79.6 cm', w: '41.3 kg', delta: '+1.8 cm in 3 months' },
                        { ini: 'RC', name: 'Ruby Chen', last: '153.0 cm', h: '154.7 cm', sh: '80.4 cm', w: '41.8 kg', delta: '+1.7 cm in 3 months' },
                        { ini: 'EB', name: 'Ella Brandt', last: '150.1 cm', h: '151.7 cm', sh: '78.9 cm', w: '41.0 kg', delta: '+1.6 cm in 3 months' },
                        { ini: 'IM', name: 'Isla Morgan', last: '146.3 cm', h: '147.8 cm', sh: '76.9 cm', w: '39.9 kg', delta: '+1.5 cm in 3 months' },
                        { ini: 'MT', name: 'Mia Tran', last: '148.8 cm', h: '150.2 cm', sh: '78.1 cm', w: '40.6 kg', delta: '+1.4 cm in 3 months' },
                        { ini: 'LM', name: 'Leo Marsh', last: '155.4 cm', h: '156.7 cm', sh: '81.5 cm', w: '42.3 kg', delta: '+1.3 cm in 3 months' },
                        { ini: 'LN', name: 'Lily Nguyen', last: '144.9 cm', h: '146.2 cm', sh: '76.0 cm', w: '39.5 kg', delta: '+1.3 cm in 3 months' },
                        { ini: 'GO', name: 'Grace Owusu', last: '157.2 cm', h: '—', sh: '—', w: '—', delta: 'Now measuring', active: true },
                        { ini: 'FW', name: 'Finn Walsh', last: '146.0 cm', h: '—', sh: '—', w: '—', delta: '—' },
                      ].map((p, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 120px', padding: '10px 16px', borderBottom: '1px solid #f0f1f0', gap: 8, alignItems: 'center', background: p.active ? '#f0f8f4' : 'transparent' }}>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{p.name}</span>
                          </div>
                          <div style={{ fontSize: 12, color: '#6f7f7b' }}>{p.last}</div>
                          <div style={{ fontSize: 13, fontWeight: p.h !== '—' ? 700 : 400, color: p.active ? '#2f6252' : '#10211f' }}>{p.h}</div>
                          <div style={{ fontSize: 13, color: '#10211f' }}>{p.sh}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 12, color: '#6f7f7b' }}>{p.w}</span>
                            <span style={{ fontSize: 10, color: p.active ? '#2f6252' : '#6f7f7b', fontWeight: p.active ? 700 : 400 }}>{p.delta}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>How to measure</div>
                      {[
                        { n: 1, text: 'Shoes off, heels and back against the wall.' },
                        { n: 2, text: 'Measure twice. The app uses the average.' },
                        { n: 3, text: 'Sitting height: on a flat bench, from the bench to the top of the head.' },
                        { n: 4, text: 'Same time of day each time, ideally before training.' },
                      ].map(item => (
                        <div key={item.n} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                          <div style={{ width: 20, height: 20, borderRadius: '999px', background: '#e4f2eb', color: '#2f6252', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.n}</div>
                          <div style={{ fontSize: 13, color: '#4a5a57' }}>{item.text}</div>
                        </div>
                      ))}
                      <div style={{ marginTop: 10, padding: '10px 12px', background: '#fdf8f4', borderRadius: 10, border: '1px solid #f0dcc8', fontSize: 12, color: '#6f7f7b' }}>
                        Weight is optional and never shown to players or parents. Only the growth rate appears in the app.
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: '#6f7f7b', padding: '10px 14px', background: '#fff', borderRadius: 10, border: '1px solid #e9eae8' }}>
                    5 more below. Players who miss tonight get a reminder for their parents to measure at home.
                  </div>
                </>
              )}

              {trainSub === 'sprint' && (() => {
                const RUNNING_ORDER = [
                  { ini: 'RC', name: 'Ruby Chen', go1: 4.02, go2: 4.06, best: 4.02, done: true },
                  { ini: 'IM', name: 'Isla Morgan', go1: 3.98, go2: 3.91, best: 3.91, done: true },
                  { ini: 'JP', name: 'Jai Patel', go1: 3.89, go2: 3.84, best: 3.84, done: true },
                  { ini: 'FW', name: 'Finn Walsh', go1: 3.98, go2: null, best: 3.98, done: false, active: true },
                  { ini: 'LM', name: 'Leo Marsh', go1: null, go2: null, best: null, done: false },
                  { ini: 'MT', name: 'Mia Tran', go1: null, go2: null, best: null, done: false },
                  { ini: 'GO', name: 'Grace Owusu', go1: null, go2: null, best: null, done: false },
                  { ini: 'LN', name: 'Lily Nguyen', go1: null, go2: null, best: null, done: false },
                ]
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                    <div style={{ background: '#fff', borderRadius: 14, padding: '24px', border: '1px solid #e9eae8', textAlign: 'center' }}>
                      <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 4 }}>Finn Walsh · go 2 of 2</div>
                      <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 24 }}>Go 1: 3.98 s · his best before tonight: 4.05 s</div>
                      <div style={{ width: 80, height: 80, borderRadius: '999px', background: '#c39797', color: '#10211f', fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>FW</div>
                      <div style={{ fontSize: 64, fontWeight: 800, color: '#10211f', letterSpacing: '-2px' }}>3.93</div>
                      <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 32 }}>seconds · stopped by your tap at the finish cone</div>
                      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <button style={{ height: 48, padding: '0 24px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Redo this go</button>
                        <button style={{ height: 48, padding: '0 24px', borderRadius: '999px', border: 0, background: '#1f4a3e', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Save · new best · next: Leo</button>
                      </div>
                      <div style={{ marginTop: 20, fontSize: 12, color: '#6f7f7b' }}>Top speed from his boots: 21.2 km/h. Timing on a phone varies by a few hundredths, so the app looks for changes of about 5%.</div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>20 m sprint race · U12 Sam</div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#40826d', background: '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>Boots recording top speed</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 10 }}>2 goes each · best counts · 3 of 12 done · 4 sitting out</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 40px 50px', gap: 6, marginBottom: 8 }}>
                        {['RUNNING ORDER','GO 1','GO 2','BEST'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
                        {RUNNING_ORDER.map((r, i) => (
                          <>
                            <div key={`n${i}`} style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '6px 0', borderTop: '1px solid #f0f1f0' }}>
                              <div style={{ width: 20, height: 20, borderRadius: '999px', background: r.active ? '#c39797' : '#cbbeb5', color: '#10211f', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.ini}</div>
                              <span style={{ fontSize: 12, fontWeight: r.active ? 700 : 400, color: r.active ? '#10211f' : '#6f7f7b' }}>{r.name}</span>
                            </div>
                            <div key={`g1${i}`} style={{ fontSize: 12, color: '#10211f', borderTop: '1px solid #f0f1f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.go1 ?? '—'}</div>
                            <div key={`g2${i}`} style={{ fontSize: 12, color: r.active ? '#2f6252' : '#10211f', borderTop: '1px solid #f0f1f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.active ? 'now' : (r.go2 ?? '—')}</div>
                            <div key={`b${i}`} style={{ fontSize: 12, fontWeight: r.best !== null ? 700 : 400, color: r.best ? '#10211f' : '#6f7f7b', borderTop: '1px solid #f0f1f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.best ?? '—'}</div>
                          </>
                        ))}
                      </div>
                      <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 8 }}>Sitting out: Noah and Zoe (growth pain). Kai and Tom (modified training). Their results stay blank, not zero.</div>
                    </div>
                  </div>
                )
              })()}

              {trainSub === 'her-part' && (
                <>
                  <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Tonight's session · 6:00 pm</div>
                    <div style={{ fontSize: 15, color: '#4a5a57', lineHeight: '21px' }}>
                      Sam has planned a medium-intensity possession session. Here's the fitness-specific part you're responsible for.
                    </div>
                  </div>
                  {[
                    { time: '5:55 pm', title: 'Pre-session load check', desc: 'Ask Grace and Noah how their body feels. Noah had 72% load yesterday.', tag: 'Your call', tagColor: '#2f6252' },
                    { time: '6:05 pm', title: 'Warm-up lead', desc: '8-min dynamic warm-up. Focus on hip mobility and ankle prep (Sever\'s caution for Grace).', tag: 'Lead this', tagColor: '#2f6252' },
                    { time: '6:50 pm', title: 'Sprint test — 3 players', desc: 'Noah, Mia, and Ella are due a re-test. Quick 10m sprint ×2 each.', tag: 'Test', tagColor: '#c3a84a' },
                    { time: '7:20 pm', title: 'Cool down', desc: 'Lead the squad cool-down and growth stretches.', tag: 'Lead this', tagColor: '#2f6252' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                      <div style={{ fontSize: 12, color: '#6f7f7b', flexShrink: 0, width: 52, paddingTop: 2 }}>{item.time}</div>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{item.title}</div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: item.tagColor, background: item.tagColor + '22', borderRadius: 6, padding: '2px 8px', flexShrink: 0 }}>{item.tag}</span>
                        </div>
                        <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* MATCH DAY TAB */}
        {tab === 'matchday' && (
          <div style={{ padding: '16px 20px' }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Saturday vs Harbour Rovers</div>
              <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 12 }}>Fitness brief for game day</div>
              {[
                { label: 'Warm-up lead', note: '20 min progressive warm-up · starts 8:40 am' },
                { label: 'Avoid high impact', note: 'Grace (Sever\'s) · no long sprints before warm-up' },
                { label: 'Sub timing flags', note: 'Flag Mia at 55 min — she\'s 3 days post ankle' },
                { label: 'Post-game', note: 'Collect RPE ratings from all 11 starters' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '999px', background: '#2f6252', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{item.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pitch-side test mode */}
            <div style={{ background: '#1f4a3e', borderRadius: 16, padding: '16px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Pitch-side test mode</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 14 }}>Record sprint times and jump results while standing on the pitch.</div>
              <button style={{ height: 40, padding: '0 20px', borderRadius: '999px', border: 0, background: '#fff', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Start test mode</button>
            </div>

            {/* Post-session RPE trigger */}
            <div style={{ marginTop: 14, background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Collect post-session check-in</div>
                <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>Pass the tablet round · 11 players · takes ~20s each</div>
              </div>
              <button onClick={() => { setRpePlayer(0); setRpeScore(null); setRpeHurt(null); setRpeFun(null); setShowRPE(true) }} style={{ height: 36, padding: '0 18px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Start</button>
            </div>
          </div>
        )}
      </div>

      {/* Post-session RPE overlay */}
      {showRPE && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#1f4a3e', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
          <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Player {rpePlayer + 1} of {RPE_PLAYERS.length}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{RPE_PLAYERS[rpePlayer]}</div>
            </div>
            <button onClick={() => setShowRPE(false)} style={{ width: 36, height: 36, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 24px 32px' }}>
            {/* Q1 */}
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20, lineHeight: '28px' }}>How hard did it feel?</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 36 }}>
              {RPE_EMOJIS.map(e => (
                <button key={e.v} onClick={() => setRpeScore(e.v)} style={{ padding: '14px 8px', borderRadius: 16, border: `2px solid ${rpeScore === e.v ? '#fff' : 'rgba(255,255,255,0.2)'}`, background: rpeScore === e.v ? 'rgba(255,255,255,0.15)' : 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 28 }}>{e.emoji}</span>
                  <span style={{ fontSize: 11, color: '#fff', fontWeight: rpeScore === e.v ? 700 : 400 }}>{e.label}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{e.v}/10</span>
                </button>
              ))}
            </div>

            {/* Q2 */}
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Did anything hurt?</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
              {(['no', 'yes'] as const).map(opt => (
                <button key={opt} onClick={() => setRpeHurt(opt)} style={{ flex: 1, height: 56, borderRadius: 16, border: `2px solid ${rpeHurt === opt ? '#fff' : 'rgba(255,255,255,0.2)'}`, background: rpeHurt === opt ? 'rgba(255,255,255,0.15)' : 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: rpeHurt === opt ? 700 : 400, cursor: 'pointer' }}>
                  {opt === 'no' ? 'No' : 'Yes — show where'}
                </button>
              ))}
            </div>

            {/* Q3 */}
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Was it fun?</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
              {([
                { v: 'nope' as const, label: 'Not really', emoji: '😑' },
                { v: 'ok' as const, label: 'OK', emoji: '🙂' },
                { v: 'loved' as const, label: 'Loved it', emoji: '🤩' },
              ]).map(opt => (
                <button key={opt.v} onClick={() => setRpeFun(opt.v)} style={{ flex: 1, padding: '12px 8px', borderRadius: 16, border: `2px solid ${rpeFun === opt.v ? '#fff' : 'rgba(255,255,255,0.2)'}`, background: rpeFun === opt.v ? 'rgba(255,255,255,0.15)' : 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: rpeFun === opt.v ? 700 : 400 }}>{opt.label}</span>
                </button>
              ))}
            </div>

            <button
              disabled={rpeScore === null || !rpeHurt || !rpeFun}
              onClick={() => {
                if (rpePlayer < RPE_PLAYERS.length - 1) {
                  setRpePlayer(p => p + 1); setRpeScore(null); setRpeHurt(null); setRpeFun(null)
                } else { setShowRPE(false) }
              }}
              style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: rpeScore !== null && rpeHurt && rpeFun ? '#fff' : 'rgba(255,255,255,0.2)', color: rpeScore !== null && rpeHurt && rpeFun ? '#1f4a3e' : 'rgba(255,255,255,0.4)', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: rpeScore !== null && rpeHurt && rpeFun ? 'pointer' : 'default' }}>
              {rpePlayer < RPE_PLAYERS.length - 1 ? `Send · pass to ${RPE_PLAYERS[rpePlayer + 1]}` : 'Send · all done'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
