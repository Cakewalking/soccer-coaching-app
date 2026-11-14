import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const PROFILE_TABS = ['Overview', 'Clips 6', 'Wearable data', 'Wellness', 'Development']

const GAMES = [
  { short: 'BAN', mins: 40, res: 'W', color: '#2f6252' },
  { short: 'RIV', mins: 38, res: 'L', color: '#c39797' },
  { short: 'LYN', mins: 42, res: 'W', color: '#2f6252' },
  { short: 'KES', mins: 45, res: 'W', color: '#2f6252' },
  { short: 'TEA', mins: 41, res: 'W', color: '#2f6252' },
  { short: 'NOR', mins: 44, res: 'D', color: '#cbbeb5' },
  { short: 'SAL', mins: 43, res: 'L', color: '#c39797' },
  { short: 'IRO', mins: 43, res: 'W', color: '#2f6252' },
]

const KPIS = [
  { label: 'Distance per game', value: '4.1 km', change: '4.6 km last game', src: 'GPS vest' },
  { label: 'Sprints per game', value: '22', change: '26 last game, up from 20', src: 'GPS vest' },
  { label: 'Wins of the ball', value: '5.9', change: '9 last game, team high', src: 'Match camera' },
  { label: 'Passes completed', value: '77%', change: '82% last game', src: 'Match camera' },
]

export default function T5PlayerProfile(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Squad' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Squad' ? '#40826d' : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><button onClick={() => st('Opening team selector.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
      </div>

      <header style={{ flex: 'none', background: '#fff', padding: '12px 28px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => st('Going back.')} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>←</button>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#c39797', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, flex: 'none' }}>MT</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Mia Tran</div>
              <div style={{ fontSize: 12, fontWeight: 700, background: '#cbbeb5', borderRadius: 999, padding: '2px 10px' }}>Manage load</div>
            </div>
            <div style={{ fontSize: 13, color: MUT }}>Central midfield · #8 · U12 Sam · right foot · second season</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[{ v: '8', l: 'Games' }, { v: '336', l: 'Minutes' }, { v: '2', l: 'Goals' }, { v: '3', l: 'Assists' }].map(s => (
              <div key={s.l} style={{ width: 80, padding: '5px 8px', borderRadius: 10, background: '#f7f8f7', boxSizing: 'border-box' as const }}>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.v}</div>
                <div style={{ fontSize: 11, color: MUT }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 24, height: 44, borderTop: `1px solid ${LN}` }}>
          {PROFILE_TABS.map(t => <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: t === 'Overview' ? 700 : 500, color: t === 'Overview' ? INK : MUT, borderBottom: `3px solid ${t === 'Overview' ? '#40826d' : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>)}
        </nav>
      </header>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 18px', boxSizing: 'border-box', borderTop: `1px solid ${LN}`, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {KPIS.map(k => (
              <div key={k.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{k.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 2 }}>{k.value}</div>
                <div style={{ fontSize: 12, color: G, fontWeight: 600 }}>{k.change}</div>
                <div style={{ fontSize: 11, color: MUT, marginTop: 2 }}>{k.src}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px', flex: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Game by game</div>
              <div style={{ fontSize: 13, color: MUT }}>Minutes played out of 60 · fair share is about 39</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8, alignItems: 'flex-end', height: 100 }}>
              {GAMES.map(g => (
                <div key={g.short} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 3, height: '100%' }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{g.mins}</div>
                  <div style={{ width: '100%', height: Math.round((g.mins / 60) * 60), background: G, borderRadius: '4px 4px 2px 2px' }} />
                  <div style={{ fontSize: 10, color: MUT }}>{g.short}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, background: g.color, color: '#fff', borderRadius: 3, padding: '0 4px' }}>{g.res}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px', flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Best recent clips</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, height: '100%' }}>
              {[{ when: 'Min 10 vs Ironbark', text: 'Presses with Jai and wins it back', tag: 'Pressing', tagColor: GD }, { when: 'Min 37 vs Ironbark', text: 'Left-foot pass splits their defence', tag: 'Assist', tagColor: '#40826d' }, { when: 'Min 47 vs Ironbark', text: 'Scores from edge of the box', tag: 'Goal', tagColor: '#40826d' }].map(c => (
                <div key={c.when} style={{ border: `1px solid ${LN}`, borderRadius: 10, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1, background: G, minHeight: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' as const }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</div>
                    <div style={{ position: 'absolute' as const, top: 8, left: 8, fontSize: 11, fontWeight: 700, background: c.tagColor, color: '#fff', borderRadius: 999, padding: '1px 7px' }}>{c.tag}</div>
                  </div>
                  <div style={{ padding: '7px 9px', fontSize: 12 }}><strong>{c.when}</strong> · {c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Right now</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '5px 0', borderTop: `1px solid ${LN}` }}><span style={{ color: MUT }}>Load this week</span><strong style={{ color: '#6f5256' }}>125% of usual</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '5px 0', borderTop: `1px solid ${LN}` }}><span style={{ color: MUT }}>Wellness today</span><strong>3.3 / 5 · heavy legs</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '5px 0', borderTop: `1px solid ${LN}` }}><span style={{ color: MUT }}>Growth this month</span><strong>+0.5 cm</strong></div>
            <div style={{ background: '#cbbeb5', borderRadius: 8, padding: '8px 10px', fontSize: 13, lineHeight: '19px', marginTop: 8 }}><strong>Plan:</strong> light training tonight, first half only on Saturday.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Development goal</div>
              <div style={{ fontSize: 11, fontWeight: 700, background: G, color: '#fff', borderRadius: 999, padding: '1px 7px' }}>On track</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Pass with her left foot</div>
            <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
              {[1, 2, 3, 4, 5, 6].map(k => <div key={k} style={{ flex: 1, height: 8, borderRadius: 2, background: k <= 5 ? '#40826d' : '#e9eae8' }} />)}
            </div>
            <div style={{ fontSize: 12, color: MUT }}>Left-foot passes per game: <strong style={{ color: INK }}>2 → 11</strong> this season</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px', flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Latest notes</div>
            {[{ who: 'Sam K · Coach', when: 'Sun 31 May', text: 'Best game of her season. Her pressing set the tone.' }, { who: 'Mia · check-in', when: 'Today', text: '"Legs feel heavy after two trainings."' }].map(n => (
              <div key={n.who} style={{ borderTop: `1px solid ${LN}`, paddingTop: 7, marginTop: 7 }}>
                <div style={{ fontSize: 12, color: MUT }}><strong style={{ color: INK }}>{n.who}</strong> · {n.when}</div>
                <div style={{ fontSize: 13, lineHeight: '19px', marginTop: 2 }}>{n.text}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
