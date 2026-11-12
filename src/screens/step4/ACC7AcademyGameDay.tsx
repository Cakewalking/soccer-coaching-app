import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACC7AcademyGameDay(_: { onBack?: () => void }) {
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>
      {/* Top nav */}
      <div style={{ background: G, height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', flexShrink: 0 }}>
        <span style={{ color: '#fff', fontSize: 21, fontWeight: 700, marginRight: 32, letterSpacing: '-0.01em' }}>Clean Sheet</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {[{ label: 'Today', icon: '⌂' }, { label: 'Players', icon: '👥' }, { label: 'Game day', icon: '⚽', active: true }, { label: 'Library', icon: '📅' }].map(item => (
            <button key={item.label} style={{ background: (item as any).active ? 'rgba(255,255,255,0.18)' : 'none', border: 'none', color: '#fff', fontSize: 14, fontWeight: (item as any).active ? 700 : 500, padding: '0 14px', height: 64, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => showToast('Opening academy selector.')} style={{ background: 'rgba(255,255,255,0.18)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 500, padding: '0 14px', height: 44, borderRadius: 999, cursor: 'pointer', marginRight: 12 }}>Tall Timber Academy ▾</button>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: INK }}>RW</div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', height: 44, borderBottom: `1px solid #c5c8c4`, display: 'flex', alignItems: 'center', padding: '0 28px', flexShrink: 0 }}>
        {['This Saturday', 'Team sheet', 'Live game', 'Review'].map(tab => {
          const active = tab === 'This Saturday'
          return (
            <button key={tab} style={{ background: 'none', border: 'none', borderBottom: active ? `2px solid ${G}` : '2px solid transparent', color: active ? G : MUT, fontSize: 14, fontWeight: active ? 700 : 500, padding: '0 14px', height: 44, cursor: 'pointer', marginBottom: -1 }}>
              {tab}
            </button>
          )
        })}
        <div style={{ flex: 1 }} />
        <span style={{ height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>Academy coach</span>
      </div>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '14px 28px 0', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>U13 Timber · Saturday</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: MUT }}>Sat 6 June · 11:00 vs Banksia Park · home, pitch 2</p>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button onClick={() => showToast('New message to 16 families.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Message the team</button>
          <button onClick={() => showToast('Starting live game...')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Start the game</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 14 }}>
        {/* Left: checklist */}
        <div style={{ gridColumn: 'span 8', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>Ready for Saturday</span>
            <span style={{ fontSize: 13, color: MUT }}>3 of 4 done</span>
          </div>

          {/* Item 1: warning */}
          <div style={{ minHeight: 68, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: '#f5e6d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#c47c20', flexShrink: 0 }}>!</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Team sheet</div>
              <div style={{ fontSize: 13, color: MUT }}>14 of 16 can play · 2 still to register with the club</div>
            </div>
            <button onClick={() => showToast('Opening team sheet...')} style={{ height: 44, padding: '0 12px', borderRadius: 8, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Open</button>
          </div>

          {/* Item 2: check */}
          <div style={{ minHeight: 68, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: G, flexShrink: 0 }}>✓</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Minutes</div>
              <div style={{ fontSize: 13, color: MUT }}>Everyone gets at least half a game. The plan is ready</div>
            </div>
            <button onClick={() => showToast('Minutes plan: 16 players, nobody under 35 of 70 minutes.')} style={{ height: 44, padding: '0 12px', borderRadius: 8, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>See plan</button>
          </div>

          {/* Item 3: check */}
          <div style={{ minHeight: 68, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: G, flexShrink: 0 }}>✓</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Team talk</div>
              <div style={{ fontSize: 13, color: MUT }}>3 slides from Thursday's session: finishing with the weaker foot</div>
            </div>
            <button onClick={() => showToast('Opening team talk...')} style={{ height: 44, padding: '0 12px', borderRadius: 8, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Open</button>
          </div>

          {/* Item 4: check */}
          <div style={{ minHeight: 68, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: G, flexShrink: 0 }}>✓</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Cards</div>
              <div style={{ fontSize: 13, color: MUT }}>Nobody suspended</div>
            </div>
            <span style={{ padding: '4px 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>Clear</span>
          </div>

          <div style={{ marginTop: 10, padding: '10px 0 0', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>
            U13 Timber is your Advanced group's game team. It plays as part of Wattle Creek FC, so the club's rules apply on the day.
          </div>
        </div>

        {/* Right: 2 tiles */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {/* Can't play yet */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 8 }}>Can't play yet</span>
            {[
              { initials: 'AC', name: 'Ana Costa', reason: 'Club registration not finished' },
              { initials: 'JM', name: 'Jonah Marsh', reason: 'Club registration not finished' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 999, background: '#f5e6d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#c47c20', flexShrink: 0 }}>{p.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.reason}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 8, fontSize: 12, color: MUT }}>Their parents were reminded today. Both can still train.</div>
          </div>

          {/* After the game */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10, flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: INK }}>After the game</h2>
            <p style={{ margin: 0, fontSize: 14, color: MUT, lineHeight: 1.55 }}>
              The match review comes back in about 25 minutes. What it finds feeds next week's sessions and each player's plan.
            </p>
            <button onClick={() => showToast('Opening last week\'s review...')} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0, marginTop: 'auto' }}>See last week's review</button>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>
      )}
    </div>
  )
}
