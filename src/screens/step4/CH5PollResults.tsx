import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
const NAV_BG = '#40826d'
function TopBar() {
  return (
    <div style={{ flexShrink: 0, height: 64, background: G, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
      <div style={{ flexGrow: 1, display: 'flex', gap: 2 }}>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map((n, i) => (
          <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, background: i === 0 ? NAV_BG : 'transparent', color: i === 0 ? '#fff' : '#e9eae8', fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center' }}>{n}</div>
        ))}
      </div>
      <div style={{ height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>U12 Sam · Wattle Creek</div>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>SK</div>
    </div>
  )
}
function SubBar() {
  return (
    <div style={{ flexShrink: 0, height: 44, background: '#fff', borderBottom: `1px solid #c5c8c4`, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
      {['Overview', 'Inbox', 'Calendar', 'Fixtures and results', 'Our style', 'Team staff'].map((n, i) => (
        <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: i === 1 ? INK : MUT, borderBottom: i === 1 ? `3px solid ${NAV_BG}` : '3px solid transparent', boxSizing: 'border-box' }}>{n}</div>
      ))}
    </div>
  )
}
const results = [
  { label: 'Coming', count: 11, pct: 65, names: 'Tran, Marsh, Owusu, Chen, Patel, Brandt, Morgan, Reyes, Russo, Nguyen, Lindqvist' },
  { label: "Can't come", count: 2, pct: 12, names: 'Okafor (away), Hartley (unwell)' },
  { label: 'Not sure yet', count: 1, pct: 6, names: 'Park' },
]
const unanswered = [
  { ini: 'B', name: 'Brennan family', sub: 'Seen the poll' },
  { ini: 'D', name: 'Delaney family', sub: 'Not seen yet' },
  { ini: 'Q', name: 'Quinn family', sub: 'Not seen yet · joined Tuesday' },
]
export default function CH5PollResults(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <TopBar />
      <SubBar />
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Poll results</h1>
          <span style={{ fontSize: 14, color: MUT }}>Who's coming on Saturday? · closes Fri 6 pm</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => t('Back to chat.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Back to chat</button>
          <button onClick={() => t('Poll closed. 14 of 17 answered.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Close poll now</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <div style={{ gridColumn: 'span 7', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px 10px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>14 of 17 families have answered</div>
          </div>
          {results.map((r, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 0', borderTop: `1px solid ${LN}` }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <strong style={{ fontSize: 17, flexGrow: 1 }}>{r.label}</strong>
                <strong style={{ fontSize: 22, fontVariantNumeric: 'tabular-nums' }}>{r.count}</strong>
              </div>
              <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${r.pct}%`, background: i === 0 ? G : NAV_BG }} />
              </div>
              <div style={{ fontSize: 14, color: MUT }}>{r.names}</div>
            </div>
          ))}
          <div style={{ fontSize: 14, color: MUT, marginTop: 'auto', paddingTop: 8 }}>Parents can change their answer until the poll closes. You're told if someone drops out.</div>
        </div>
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `2px solid ${G}`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Done for you</div>
            <div style={{ fontSize: 16, fontWeight: 700, lineHeight: '23px' }}>Who's coming is filled in: 11 players for Saturday.</div>
            <div style={{ fontSize: 14, color: MUT }}>Enough for a 9-a-side with two on the bench.</div>
            <button onClick={() => t("Who's coming opened.")} style={{ alignSelf: 'flex-start', height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Open Who's coming</button>
          </div>
          <div style={{ flexGrow: 1, background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px 10px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Haven't answered</div>
            {unanswered.map((u, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: `1px solid ${LN}` }}>
                <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{u.ini}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{u.name}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{u.sub}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 'auto', paddingTop: 8 }}>
              <button onClick={() => t('Nudge sent to 3 families by text and in the app.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Nudge the 3</button>
            </div>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
