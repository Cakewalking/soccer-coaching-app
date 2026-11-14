import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const STAT_CARDS = [
  { label: 'Time to win it back', val: '5.2 s', change: '–1.8 s vs last run', up: true },
  { label: 'Win rate in 6 s', val: '68%', change: '+22% vs last run', up: true },
  { label: 'Presses as a pair', val: '71%', change: '+18% tonight', up: true },
  { label: 'Sprint count avg', val: '14', change: 'At target', up: true },
]

const PLAYERS = [
  { name: 'Mia Tran', pos: 'CM', thisSess: '4.8 s', lastSess: '7.1 s', change: '–2.3 s', up: true },
  { name: 'Leo Marsh', pos: 'CB', thisSess: '5.0 s', lastSess: '7.4 s', change: '–2.4 s', up: true },
  { name: 'Jai Patel', pos: 'CM', thisSess: '5.4 s', lastSess: '6.8 s', change: '–1.4 s', up: true },
  { name: 'Ella Brandt', pos: 'HM', thisSess: '5.9 s', lastSess: '7.0 s', change: '–1.1 s', up: true },
  { name: 'Noah Okafor', pos: 'ST', thisSess: '6.4 s', lastSess: '6.9 s', change: '–0.5 s', up: true },
]

export default function RC5RecordResults(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button onClick={() => st('Opening team selector.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Record' ? INK : MUT, borderBottom: `3px solid ${n === 'Record' ? '#40826d' : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: G, marginBottom: 4 }}>Results · Thu 4 Jun</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Win it back in 6 seconds · 3 rounds</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          {STAT_CARDS.map(card => (
            <div key={card.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>{card.val}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: G }}>{card.change}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, minHeight: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '12px 18px', display: 'grid', gridTemplateColumns: '1fr 90px 90px 80px', background: '#f7f8f7', borderBottom: `1px solid ${LN}` }}>
              {['Player', 'Tonight', 'Last run', 'Change'].map(h => <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>)}
            </div>
            {PLAYERS.map(p => (
              <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 80px', padding: '10px 18px', borderTop: `1px solid ${LN}`, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.pos}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{p.thisSess}</div>
                <div style={{ fontSize: 15, color: MUT }}>{p.lastSess}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: G }}>{p.change}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 6 }}>What it means</div>
              <div style={{ fontSize: 14, lineHeight: '21px', color: MUT }}>Every player improved. The team average dropped from 7.0 s to 5.2 s — now within range of the 4-second target.</div>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>How we know it's real</div>
              {['3 rounds of consistent data', 'Same set-up as last time', 'Boot sensor confidence: high'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: `1px solid ${LN}`, fontSize: 14 }}>
                  <span style={{ color: G }}>✓</span><span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </main>
    </div>
  )
}
