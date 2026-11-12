import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PM2ParentTeamChat(_: { onBack?: () => void }) {
  const [sheet, setSheet] = useState<string | null>(null)
  const waveHeights = [14, 20, 28, 18, 32, 24, 16, 30, 22, 26, 18, 14, 28, 20, 24]

  return (
    <div style={{ width: 390, minHeight: 844, background: '#f4f7f5', fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: GD, padding: '52px 20px 0', flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Clean Sheet</div>
        <div style={{ display: 'flex', gap: 0 }}>
          {['Chats', 'Team', 'My child'].map(tab => (
            <div key={tab} style={{ flex: 1, textAlign: 'center', paddingBottom: 10, fontSize: 15, fontWeight: 600, color: tab === 'Chats' ? '#fff' : 'rgba(255,255,255,0.6)', borderBottom: tab === 'Chats' ? '2px solid #fff' : '2px solid transparent' }}>{tab}</div>
          ))}
        </div>
      </div>

      {/* Pinned banner */}
      <div onClick={() => setSheet('pinned')} style={{ background: PALE, borderBottom: `1px solid ${LN}`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flexShrink: 0 }}>
        <span style={{ fontSize: 14 }}>📌</span>
        <span style={{ fontSize: 13, color: G, fontWeight: 600, flex: 1 }}>Pinned: Saturday 7 June vs Riverside FC · 9:30 am</span>
        <span style={{ fontSize: 13, color: G, fontWeight: 600 }}>›</span>
      </div>

      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: 'auto' as const, padding: '16px 16px 0', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>

        {/* Outgoing */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: 4 }}>
          <div style={{ background: G, borderRadius: '16px 16px 4px 16px', padding: '10px 14px', maxWidth: 260 }}>
            <div style={{ fontSize: 15, color: '#fff', marginBottom: 8 }}>Who's bringing oranges on Saturday?</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 1].map(i => (
                <div key={i} style={{ width: 72, height: 52, borderRadius: 8, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🖼️</div>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 999, padding: '2px 10px', fontSize: 13 }}>👍 3</div>
        </div>

        {/* Incoming — Sam K */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-start', gap: 4 }}>
          <div style={{ fontSize: 12, color: MUT, paddingLeft: 52 }}>Sam K · 10:21 am</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: INK, flexShrink: 0 }}>SK</div>
            <div>
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: '4px 16px 16px 16px', padding: '10px 14px', maxWidth: 260, fontSize: 15, color: INK }}>I'll sort oranges! Mia, great left foot work this week 🎉</div>
            </div>
          </div>
          <div style={{ marginLeft: 44, background: '#fff', border: `1px solid ${LN}`, borderRadius: 999, padding: '2px 10px', fontSize: 13 }}>🙌 5</div>
        </div>

        {/* Incoming — voice note (Jess) */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-start', gap: 4 }}>
          <div style={{ fontSize: 12, color: MUT, paddingLeft: 52 }}>Jess · 10:35 am</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: '#d4b896', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: INK, flexShrink: 0 }}>JL</div>
            <div>
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: '4px 16px 16px 16px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 36 }}>
                  {waveHeights.map((h, i) => (
                    <div key={i} style={{ width: 3, height: h, background: G, borderRadius: 2, opacity: 0.8 }} />
                  ))}
                </div>
                <span style={{ fontSize: 13, color: MUT, fontWeight: 600 }}>0:12</span>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: 44, background: '#fff', border: `1px solid ${LN}`, borderRadius: 999, padding: '2px 10px', fontSize: 13 }}>👍 2</div>
        </div>

        <div style={{ height: 16 }} />
      </div>

      {/* Compose bar */}
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: 999, border: `2px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: MUT, cursor: 'pointer', flexShrink: 0 }}>+</div>
        <div style={{ flex: 1, background: '#f4f7f5', borderRadius: 20, padding: '10px 14px', fontSize: 15, color: '#aaa' }}>Write to U12 Sam</div>
        <div style={{ width: 36, height: 36, borderRadius: 999, background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>↑</div>
      </div>

      {/* Sheet: Pinned messages */}
      {sheet === 'pinned' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(16,33,31,0.45)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', width: 350, display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 17, color: INK }}>Pinned messages</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
              <div style={{ padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: INK, marginBottom: 2 }}>📌 Saturday game details</div>
                <div style={{ fontSize: 13, color: MUT }}>7 June vs Riverside FC · 9:30 am · Riverside Reserve</div>
              </div>
              <div style={{ padding: '12px 0' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: INK, marginBottom: 2 }}>📌 Thursday training</div>
                <div style={{ fontSize: 13, color: MUT }}>5 June · 4:30 pm · Wattle Creek Reserve, Pitch 2</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSheet(null)} style={{ height: 48, padding: '0 18px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
