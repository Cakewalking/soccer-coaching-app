import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', G2 = '#40826d', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const NAV = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ["Tonight's session", 'This week', 'Drill library', 'Growth and load']

export default function DF1DrillDetail(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto' }}>
      <div style={{ flex: 'none', background: G, height: 64, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {NAV.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? G2 : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto' }}><div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>U12 Sam · Wattle Creek ▾</div></div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginLeft: 8 }}>SK</div>
      </div>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
        {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: n === 'Drill library' ? 700 : 500, color: n === 'Drill library' ? INK : MUT, borderBottom: `3px solid ${n === 'Drill library' ? G2 : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: MUT }}>Head coach</div>
      </div>
      <div style={{ flex: 'none', padding: '16px 28px 0', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: MUT }}>Drill library</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK }}>4 v 4 + 3 keep-ball</div>
          <div style={{ fontSize: 14, color: MUT, marginTop: 2 }}>First touch</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button onClick={() => st('Saved to your library.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1.5px solid ${LN}`, background: '#fff', color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save</button>
          <button onClick={() => st('Opening add to session.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 'none', background: GD, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Add to a session</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '14px 28px 28px', display: 'grid', gridTemplateColumns: '340px minmax(0,1fr)', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ height: 160, background: '#e0ece7', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `1px solid ${LN}` }}>
              <div style={{ display: 'flex', gap: 16 }}>
                {[{ label: 'Us', color: GD }, { label: 'Them', color: '#7c3030' }, { label: 'Plays for both', color: '#a06020' }].map(b => <button key={b.label} onClick={() => st(`Viewing ${b.label}.`)} style={{ height: 44, padding: '0 12px', borderRadius: 8, background: b.color, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{b.label}</button>)}
              </div>
            </div>
            <div style={{ padding: '10px 12px', display: 'flex', gap: 8 }}>
              {['Pass', 'Run'].map(t => <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 20, height: 2, background: t === 'Pass' ? GD : '#a0a0a0' }}/>  <span style={{ fontSize: 11, color: MUT }}>{t}</span></div>)}
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            {[{ label: 'Players', value: '11 players' }, { label: 'Area', value: '30 × 25 m' }, { label: 'Time', value: '15 min' }, { label: 'Intensity', value: 'High' }, { label: 'Work and rest', value: '4 × 3 min, 1 min rest' }, { label: 'Kit', value: 'Balls, bibs, cones' }].map((r, i) => (
              <div key={i} style={{ display: 'flex', padding: '10px 14px', borderBottom: `1px solid ${LN}` }}>
                <span style={{ width: 110, flexShrink: 0, fontSize: 13, color: MUT }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.value}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 6 }}>Show the team before you start</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Opens the diagram and a clip of us doing it well against Ironbark.</div>
            <button onClick={() => st('Showing team preview.')} style={{ height: 44, width: '100%', borderRadius: 10, background: GD, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Show</button>
          </div>
          <div style={{ background: PALE, borderRadius: 14, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 4 }}>Why it's suggested</div>
            <div style={{ fontSize: 13, color: INK, lineHeight: 1.5 }}>Saturday vs Ironbark United: gave the ball away in our half, 21 times. We aim for under 12.</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: G, background: PALE, padding: '3px 10px', borderRadius: 999 }}>Skill Acquisition · 9 to 12</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: MUT, background: '#f0f0ee', padding: '3px 10px', borderRadius: 999 }}>First touch</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: MUT, background: '#f0f0ee', padding: '3px 10px', borderRadius: 999 }}>Session part: mini-game</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Aim</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 14 }}>Keep the ball with more players: scan, open up, find the free player.</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>How it works</div>
            {['Two teams of 4 inside the square. 3 neutral players, one at each end and one in the middle, always play for the team with the ball. That makes it 7 v 4.', 'Make 6 passes in a row for a point.', 'Lose it and the other team is straight on the ball.'].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: INK, lineHeight: 1.5 }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ label: 'Coaching points', items: ['Open your body so you can see both ends', 'Check your shoulder before the ball arrives', 'Pass to the free player, not the nearest one'] }, { label: 'Make it easier / harder', items: ['Bigger square, as many touches as you like', 'Two touches inside, one touch for neutrals'] }].map((section, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>{section.label}</div>
                {section.items.map((item, j) => <div key={j} style={{ fontSize: 13, color: MUT, padding: '4px 0', borderBottom: `1px solid ${LN}` }}>{item}</div>)}
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 6 }}>Evidence</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Small-sided games improved young players' technique compared with usual training (Clemente et al., Frontiers in Psychology, 2021).</div>
            <div style={{ fontSize: 11, color: MUT, marginTop: 8 }}>Written by Elena Vukovic, A Diploma · checked by Tom Reid, sports physio · March 2026</div>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
