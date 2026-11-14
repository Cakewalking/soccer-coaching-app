import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Overview', 'Inbox', 'Calendar', 'Fitness level']

const LEVELS = [
  {
    key: 'Play', age: 'U6 to U12', tagline: 'Safe, enjoying it, fair game time',
    items: ['Game time and warm-up', 'Growth every 3 months', 'Knocks and pain', 'Quick check-ins (parents switch on)', 'Fun challenges, personal bests'],
    who: ['Coach · game time, warm-up tick', 'Parents · pain, other sport', 'Player · effort, fun, how they feel', 'Boots · touches, top speed'],
    time: 'About 10 seconds after a session',
  },
  {
    key: 'Grow', age: 'U13 to U16', tagline: 'Protect them through the growth spurt',
    items: ['Everything in Play', 'Maturity estimate', 'Effort ratings and wellness', 'Load vs their own usual', '3 tests a season', 'Injury predictions', 'Adult norms'],
    who: ['Players · effort, wellness', 'Parents · heights at home', 'Fitness · growth checks, tests', 'Vests · running load'],
    time: 'About 30 seconds a day',
  },
  {
    key: 'Perform', age: 'U17 to amateur seniors', tagline: 'Fit enough, who needs a lighter week',
    items: ['Everything in Grow', 'Sprint and high-speed running', 'Weekly load trend', 'Cycle tracking, player-owned', 'Lab tests'],
    who: ['Players · effort, wellness, cycle if they choose', 'Vests · speed bands', 'Fitness · tests, injuries'],
    time: 'About 45 seconds a day',
  },
  {
    key: 'Pro', age: 'Semi-pro, NPL, academy', tagline: 'Who is ready today',
    items: ['Everything in Perform', 'Heart rate and jump fatigue checks', 'Return-to-play steps', 'Imports from your systems'],
    who: ['Staff · everything above', 'Imports · heart rate, jump platforms'],
    time: 'Set by the club',
  },
]

export default function TS1FitnessLevel(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 'none', background: G, height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Home' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Home' ? G2 : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8c6e5a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>PS</div>
      </div>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: n === 'Fitness level' ? 700 : 500, color: n === 'Fitness level' ? INK : MUT, borderBottom: `3px solid ${n === 'Fitness level' ? G2 : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Fitness coach</div>
      </div>
      <div style={{ padding: '20px 28px 0', flexShrink: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Fitness level</div>
        <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>U12 Sam · set from the age group · decides what the app collects and shows</div>
        <button onClick={() => st('Sending message to Rachel.')} style={{ marginTop: 8, height: 36, padding: '0 16px', borderRadius: 8, background: 'transparent', color: G, border: `1.5px solid ${G}`, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Ask Rachel to change it</button>
      </div>
      <main style={{ flexGrow: 1, padding: '16px 28px 28px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, overflowY: 'auto' }}>
        {LEVELS.map(lvl => (
          <div key={lvl.key} onClick={() => setExpanded(expanded === lvl.key ? null : lvl.key)} style={{ background: '#fff', border: `2px solid ${lvl.key === 'Play' ? G : LN}`, borderRadius: 16, padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: lvl.key === 'Play' ? G : INK }}>{lvl.key}</div>
              {lvl.key === 'Play' && <div style={{ fontSize: 11, fontWeight: 700, background: G, color: '#fff', padding: '2px 8px', borderRadius: 999 }}>This team</div>}
            </div>
            <div style={{ fontSize: 12, color: MUT }}>{lvl.age}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{lvl.tagline}</div>
            <div style={{ borderTop: `1px solid ${LN}`, paddingTop: 10 }}>
              {lvl.items.slice(0, 3).map((item, i) => <div key={i} style={{ fontSize: 12, color: MUT, padding: '3px 0' }}>{item}</div>)}
              {expanded === lvl.key && lvl.items.slice(3).map((item, i) => <div key={i} style={{ fontSize: 12, color: MUT, padding: '3px 0' }}>{item}</div>)}
            </div>
            {expanded === lvl.key && (
              <>
                <div style={{ borderTop: `1px solid ${LN}`, paddingTop: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Who puts data in</div>
                  {lvl.who.map((w, i) => <div key={i} style={{ fontSize: 12, color: MUT, padding: '2px 0' }}>{w}</div>)}
                </div>
                <div style={{ background: PALE, borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: MUT }}>Time it takes a player</div>
                  <div style={{ fontSize: 12, color: INK, marginTop: 2 }}>{lvl.time}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </main>
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '12px 28px', flexShrink: 0 }}>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}><strong style={{ color: INK }}>Collect only what the level needs.</strong> Children's privacy rules ask for the least data by default. Parents switch each extra on. Effort ratings, wellness and growth each have their own consent. The director sets exceptions.</div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
