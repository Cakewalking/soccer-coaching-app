const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Team talk', 'Line-up and minutes', 'Opposition', 'Review']

const PITCH_PLAYERS = [
  { ini: 'JB', name: 'Jack', mins: '58', x: '6%', y: '50%' },
  { ini: 'TW', name: 'Tyler', mins: '58', x: '20%', y: '16%' },
  { ini: 'DM', name: 'Dev', mins: '58', x: '18%', y: '38%' },
  { ini: 'RK', name: 'Reza', mins: '40', x: '18%', y: '62%', rest: true },
  { ini: 'HC', name: 'Hugo', mins: '58', x: '20%', y: '84%' },
  { ini: 'CW', name: 'Cal', mins: '45', x: '42%', y: '30%', rest: true },
  { ini: 'TO', name: 'Theo', mins: '58', x: '40%', y: '50%' },
  { ini: 'SA', name: 'Sione', mins: '58', x: '42%', y: '70%' },
  { ini: 'LB', name: 'Luca', mins: '58', x: '66%', y: '16%' },
  { ini: 'NP', name: 'Nate', mins: '58', x: '70%', y: '50%' },
  { ini: 'EM', name: 'Eli', mins: '22', x: '66%', y: '84%' },
]

const BENCH = [
  { ini: 'AS', name: 'Ari Shah', note: 'Needs 9′ more', mins: '18' },
  { ini: 'RK', name: 'Reza Karimi', note: 'Came off at 40′', mins: '40' },
  { ini: 'BW', name: 'Ben Wu', note: 'Needs 5′ more', mins: '22' },
]

export default function L11LiveGame11(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Match day' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Match day' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><button style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
      </div>
      <div style={{ flex: 'none', height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24, background: '#fff', borderBottom: `1px solid ${LN}` }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Line-up and minutes' ? INK : MUT, borderBottom: `3px solid ${n === 'Line-up and minutes' ? '#40826d' : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>{n}</div>)}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: 44 }}>
          <span style={{ fontSize: 13, fontWeight: 700, background: PALE, color: G, borderRadius: 999, padding: '2px 12px' }}>Head coach</span>
        </div>
      </div>

      <div style={{ flex: 'none', padding: '10px 28px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Live game</div>
        <div style={{ fontSize: 14, color: MUT }}>at Harbour Rovers · 11 a side · 2 × 40 minutes</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 24, fontWeight: 700 }}>1–1</div>
        <div style={{ height: 44, padding: '0 16px', borderRadius: 12, background: INK, color: '#fff', display: 'flex', alignItems: 'center', fontSize: 20, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>58:12</div>
        <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Pause</button>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '10px 28px 16px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 14 }}>
        <section style={{ position: 'relative' as const, borderRadius: 14, background: G, backgroundImage: 'repeating-linear-gradient(90deg,#2f6252 0 10%,#356b5a 10% 20%)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute' as const, left: '50%', top: 0, bottom: 0, borderLeft: '2px solid rgba(255,255,255,0.4)' }} />
          <div style={{ position: 'absolute' as const, left: '50%', top: '50%', width: 100, height: 100, margin: '-50px 0 0 -50px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)' }} />
          <div style={{ position: 'absolute' as const, left: 0, top: '28%', bottom: '28%', width: '10%', border: '2px solid rgba(255,255,255,0.4)', borderLeft: 'none' }} />
          <div style={{ position: 'absolute' as const, right: 0, top: '28%', bottom: '28%', width: '10%', border: '2px solid rgba(255,255,255,0.4)', borderRight: 'none' }} />
          {PITCH_PLAYERS.map(p => (
            <button key={p.ini} style={{ position: 'absolute' as const, left: p.x, top: p.y, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#fff', color: INK, border: `3px solid ${p.rest ? '#c39797' : '#fff'}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{p.ini}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(16,33,31,0.55)', borderRadius: 5, padding: '0 5px', whiteSpace: 'nowrap' as const }}>{p.name} {p.mins}′</div>
            </button>
          ))}
          <div style={{ position: 'absolute' as const, left: 12, bottom: 10, background: 'rgba(16,33,31,0.7)', color: '#fff', borderRadius: 8, padding: '5px 9px', fontSize: 12 }}>1-4-3-3 · we attack right · rose ring: needs a rest</div>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#cbbeb5', border: '1px solid #cbbeb5', borderRadius: 14, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Suggested now</div>
            <div style={{ fontSize: 14, lineHeight: '20px' }}><strong>Cal off, Ari on.</strong> Cal's week is 45% over his usual, and Ari has played 18 minutes.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, height: 42, borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Make the change</button>
              <button style={{ flex: 1, height: 42, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Not yet</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Bench</div>
              <div style={{ fontSize: 12, color: MUT }}>Third of a game is 27′</div>
            </div>
            {BENCH.map(b => (
              <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#cbbeb5', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flex: 'none' }}>{b.ini}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{b.note}</div>
                </div>
                <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{b.mins}′</strong>
              </div>
            ))}
            <div style={{ marginTop: 8, fontSize: 12, color: MUT }}>Ryan Petersen is suspended. 3 of 5 subs used.</div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Goal</button>
            <button style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Card</button>
            <button style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Good moment</button>
          </div>
        </div>
      </main>
    </div>
  )
}
