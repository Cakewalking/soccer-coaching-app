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
type Choice = 'notIn' | 'blur' | 'coaches' | null
export default function CH7PhotoCheck(_: { onBack?: () => void }) {
  const [choice, setChoice] = useState<Choice>('blur')
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const opts: { key: Choice & string; title: string; sub: string }[] = [
    { key: 'notIn', title: "No, she's not in it", sub: 'Send to the team chat as it is' },
    { key: 'blur', title: 'Yes. Blur her and send', sub: 'You tap her face and it\'s blurred before anyone sees it' },
    { key: 'coaches', title: 'Yes. Send to coaches only', sub: 'Goes to the coaching team chat, not to families' },
  ]
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <TopBar />
      <SubBar />
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Before this photo goes to 17 families</h1>
          <span style={{ fontSize: 14, color: MUT }}>One player in U12 Sam has no yes for photos</span>
        </div>
        <button onClick={() => t('Cancelled.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <div style={{ gridColumn: 'span 5', background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <div style={{ width: 360, height: 240, borderRadius: 10, background: '#cfe6dc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: G }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15.5 9.5h.01"/></svg>
          </div>
          <div style={{ fontSize: 14, color: MUT, textAlign: 'center' as const }}>Your photo · taken today 6:05 pm at Wattle Creek Reserve</div>
        </div>
        <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>HQ</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Is Harper Quinn in this photo?</div>
                <div style={{ fontSize: 13, color: MUT }}>Her parent hasn't answered about photos yet. Joined Tuesday.</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {opts.map(opt => (
                <button key={opt.key} onClick={() => setChoice(opt.key as Choice)} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, padding: '8px 14px', borderRadius: 12, background: choice === opt.key ? '#f7f8f7' : '#fff', border: choice === opt.key ? `2px solid ${G}` : `1px solid #c5c8c4`, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: choice === opt.key ? `6px solid ${G}` : '2px solid #6f7f7b', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{opt.title}</div>
                    <div style={{ fontSize: 13, color: MUT }}>{opt.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ flexGrow: 1, background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Why you're asked</div>
            <div style={{ fontSize: 14, color: MUT }}>You're only asked when someone in the team has no yes for photos. The same question goes to a parent who sends a photo.</div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
              <button onClick={() => t("Reminder sent to Harper's parent.")} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ask Harper's parent again</button>
              <button onClick={() => t('Sent to U12 Sam team chat with Harper blurred.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Blur and send</button>
            </div>
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
