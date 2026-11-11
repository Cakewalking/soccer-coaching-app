import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function ACC12AcademySuggested(_: { onBack?: () => void }) {
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const playerRows = [
    { initials: 'KO', bg: '#f5e6d0', name: 'Kai Okonkwo', detail: 'Left foot on target 5 of 8. Next: finish first time', badge: 'Step up', badgeBg: PALE, badgeColor: G },
    { initials: 'JM', bg: '#f5e6d0', name: 'Jonah Marsh', detail: 'No change in 3 runs. Try striking a moving ball', badge: 'Swap', badgeBg: PALE, badgeColor: G },
    { initials: 'AC', bg: '#f5e6d0', name: 'Ana Costa', detail: 'Too new. Keep her on the group drill', badge: 'Wait', badgeBg: '#f0f0f0', badgeColor: MUT },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>
      {/* Top nav */}
      <div style={{ background: G, height: 64, display: 'flex', alignItems: 'center', padding: '0 24px', flexShrink: 0 }}>
        <span style={{ color: '#fff', fontSize: 21, fontWeight: 700, marginRight: 32, letterSpacing: '-0.01em' }}>Clean Sheet</span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {[{ label: 'Today', icon: '⌂', active: true }, { label: 'Players', icon: '👥' }, { label: 'Game day', icon: '⚽' }, { label: 'Library', icon: '📅' }].map(item => (
            <button key={item.label} style={{ background: (item as any).active ? 'rgba(255,255,255,0.18)' : 'none', border: 'none', color: '#fff', fontSize: 14, fontWeight: (item as any).active ? 700 : 500, padding: '0 14px', height: 64, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 8 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
        <button style={{ background: 'rgba(255,255,255,0.18)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 500, padding: '0 14px', height: 44, borderRadius: 999, cursor: 'pointer', marginRight: 12 }}>Tall Timber Academy ▾</button>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: INK }}>RW</div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', height: 44, borderBottom: `1px solid #c5c8c4`, display: 'flex', alignItems: 'center', padding: '0 28px', flexShrink: 0 }}>
        {['Today', 'Run a session', 'Trial player', 'One-on-one', 'Record', 'Suggested'].map(tab => {
          const active = tab === 'Suggested'
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
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: INK }}>Suggested for tonight</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: MUT }}>Advanced · from 3 recordings, your session notes and each player's goal</p>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
          <button onClick={() => showToast('Back to today.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: '#fff', border: `1px solid #c5c8c4`, color: INK, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back to today</button>
          <button onClick={() => showToast('Tonight\'s plan updated with both suggestions.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, background: G, border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Use both</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 14 }}>
        {/* Left: 2 suggestion tiles */}
        <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {/* Suggestion 1 */}
          <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>1</div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK, flex: 1 }}>Weaker-foot finishing is working: make it harder</h2>
              <span style={{ padding: '4px 10px', borderRadius: 999, background: PALE, color: G, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>Strong evidence</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ padding: '4px 10px', borderRadius: 999, background: '#f0f0f0', color: MUT, fontSize: 12, fontWeight: 600 }}>3 runs: 41% to 64% on target</span>
              <span style={{ padding: '4px 10px', borderRadius: 999, background: '#f0f0f0', color: MUT, fontSize: 12, fontWeight: 600 }}>Your notes</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: MUT, lineHeight: 1.55 }}>
              The group is ready for pressure. Adding a defender keeps the same skill but makes them do it faster.
            </p>
            <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Finishing circuit, with a chasing defender</div>
                <div style={{ fontSize: 13, color: MUT }}>Same stations · defender starts 3 metres behind</div>
              </div>
              <button onClick={() => showToast('Added. The set-up is saved as a new series.')} style={{ height: 44, padding: '0 14px', borderRadius: 8, background: G, border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Add to tonight</button>
            </div>
          </div>

          {/* Suggestion 2 */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: '#e8edeb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: MUT, flexShrink: 0 }}>2</div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: INK, flex: 1 }}>Six players still take the ball with their back to goal</h2>
              <span style={{ padding: '4px 10px', borderRadius: 999, background: PALE, color: G, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>Good evidence</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ padding: '4px 10px', borderRadius: 999, background: '#f0f0f0', color: MUT, fontSize: 12, fontWeight: 600 }}>Session notes, 4 weeks</span>
              <span style={{ padding: '4px 10px', borderRadius: 999, background: '#f0f0f0', color: MUT, fontSize: 12, fontWeight: 600 }}>Clips</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: MUT, lineHeight: 1.55 }}>
              They share the same gap, so one station fixes it for all six while the rest play.
            </p>
            <div style={{ background: '#f7f8f7', borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Receive on the half turn, one station</div>
                <div style={{ fontSize: 13, color: MUT }}>8 minutes · Mila, Zane and four others</div>
              </div>
              <button onClick={() => showToast('Added as station 3.')} style={{ height: 44, padding: '0 14px', borderRadius: 8, background: G, border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Add to tonight</button>
            </div>
          </div>
        </div>

        {/* Right: 2 tiles */}
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {/* Per player goal */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>For each player's goal</span>
              <span style={{ fontSize: 13, color: MUT }}>3 of 20</span>
            </div>
            {playerRows.map((p, i) => (
              <div key={i} style={{ minHeight: 60, borderTop: `1px solid ${LN}`, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                <div style={{ width: 36, height: 36, borderRadius: 999, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#c47c20', flexShrink: 0 }}>{p.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.detail}</div>
                </div>
                <span style={{ padding: '4px 10px', borderRadius: 999, background: p.badgeBg, color: p.badgeColor, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{p.badge}</span>
              </div>
            ))}
            <div style={{ marginTop: 8, fontSize: 12, color: MUT }}>Each player's goal sits under their name during the session, with tonight's step.</div>
          </div>

          {/* Parents can see why */}
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: INK }}>Parents can see why</h2>
            <p style={{ margin: 0, fontSize: 14, color: MUT, lineHeight: 1.55 }}>
              When a suggestion changes a player's plan, the reason goes into their term report in plain words.
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>
      )}
    </div>
  )
}
