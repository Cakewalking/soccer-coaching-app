import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const SKILLS = [
  { label: 'Ball mastery',     dots: 4, current: false },
  { label: 'First touch',      dots: 3, current: true  },
  { label: 'One against one',  dots: 4, current: false },
  { label: 'Passing',          dots: 3, current: false },
  { label: 'Finishing',        dots: 2, current: false },
]

const WEEK = [
  { day: 'Mon', items: [] },
  { day: 'Tue', items: ['Academy'] },
  { day: 'Wed', items: ['School'] },
  { day: 'Thu', items: ['Academy', '1:1'] },
  { day: 'Fri', items: [] },
  { day: 'Sat', items: ['Game'] },
  { day: 'Sun', items: [] },
]

function Dots({ n, active }: { n: number; active: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i <= n ? (active ? G : '#40826d') : LN }} />
      ))}
    </div>
  )
}

export default function ACC4PlayerPlan() {
  const [toast, setToast] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3200)
  }

  return (
    <div style={{ width: 1180, minHeight: 820, position: 'relative', background: '#f5f6f4', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      {/* Green nav bar */}
      <div style={{ flex: 'none', height: 64, padding: '0 28px', background: G, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <nav style={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          {['Today', 'Players', 'Game day', 'Library'].map(tab => (
            <div key={tab} style={{ display: 'flex', alignItems: 'center', height: 40, padding: '0 14px', borderRadius: '999px', fontSize: 15, fontWeight: 600, background: tab === 'Players' ? '#40826d' : 'transparent', color: '#fff', cursor: 'default' }}>
              {tab}
            </div>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', fontSize: 15, fontWeight: 600, color: '#fff' }}>
          Reece Whitlam
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: '999px', background: '#c39797', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>RW</div>
      </div>

      {/* Sub-tabs */}
      <div style={{ flex: 'none', height: 44, padding: '0 28px', background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {['Player plan', 'Term report'].map(tab => (
          <div key={tab} style={{ height: 44, padding: '0 4px', fontSize: 15, fontWeight: tab === 'Player plan' ? 600 : 400, color: tab === 'Player plan' ? INK : '#6f7f7b', borderBottom: tab === 'Player plan' ? '3px solid #40826d' : '3px solid transparent', display: 'flex', alignItems: 'center', boxSizing: 'border-box', cursor: 'default' }}>
            {tab}
          </div>
        ))}
      </div>

      {/* Player header */}
      <div style={{ flex: 'none', padding: '20px 28px', background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: '999px', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 17 }}>KO</div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>Kai Okonkwo</div>
          <div style={{ fontSize: 14, color: MUT, marginTop: 2 }}>13 · Advanced · joined 13 May · came to 5 of 6</div>
        </div>
        <button onClick={() => showToast('New message to Tess Okonkwo.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Message Kai's mum</button>
        <button style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Write term report</button>
      </div>

      {/* Main content */}
      <div style={{ flexGrow: 1, padding: '24px 28px', display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 24 }}>

        {/* Left — Where Kai is */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${LN}`, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Where Kai is</div>
              <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>Skill ratings from your session notes and recordings.</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f6f4' }}>
                  <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT }}>Skill</th>
                  <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT }}>Level</th>
                  <th style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUT }}></th>
                </tr>
              </thead>
              <tbody>
                {SKILLS.map((s, i) => (
                  <tr key={s.label} style={{ borderTop: `1px solid ${LN}` }}>
                    <td style={{ padding: '14px 20px', fontSize: 15, fontWeight: s.current ? 700 : 400, color: s.current ? INK : MUT }}>
                      {s.label}
                      {s.current && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, background: PALE, color: G, borderRadius: 6, padding: '2px 8px', letterSpacing: '0.04em' }}>FOCUS</span>}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <Dots n={s.dots} active={s.current} />
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: MUT }}>
                      {i === 0 && 'Confident with both feet'}
                      {i === 1 && 'Working on this term'}
                      {i === 2 && 'Strong in 1v1 situations'}
                      {i === 3 && 'Short passes reliable'}
                      {i === 4 && 'Needs more practice'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right — Goal + Week */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Goal this term */}
          <div style={{ background: '#fff', borderRadius: 16, border: `2px solid ${G}`, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: G, marginBottom: 8 }}>GOAL THIS TERM</div>
            <div style={{ fontSize: 17, fontWeight: 700, lineHeight: '24px' }}>Score with his left foot in a game</div>
            <div style={{ fontSize: 13, color: MUT, marginTop: 8, lineHeight: '19px' }}>Set with Kai after the trial. We'll track it in recordings and check in monthly.</div>
          </div>

          {/* Kai's whole week */}
          <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${LN}`, padding: '18px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Kai's whole week</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
              {WEEK.map(d => (
                <div key={d.day} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: MUT, textTransform: 'uppercase' as const }}>{d.day}</div>
                  {d.items.length === 0 ? (
                    <div style={{ height: 28, width: '100%', borderRadius: 6, background: '#f5f6f4' }} />
                  ) : (
                    d.items.map((item, j) => (
                      <div key={j} style={{ width: '100%', borderRadius: 6, padding: '4px 0', background: item === 'Academy' ? GD : item === 'Game' ? G : item === '1:1' ? '#c39797' : '#e8edeb', textAlign: 'center', fontSize: 10, fontWeight: 700, color: item === 'School' ? MUT : '#fff' }}>
                        {item}
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              {[['Academy', GD], ['1:1', '#c39797'], ['Game', G], ['School', '#e8edeb']].map(([label, bg]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: bg }} />
                  <span style={{ fontSize: 11, color: MUT }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'absolute', left: 24, bottom: 24, zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 18px', borderRadius: 14, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
