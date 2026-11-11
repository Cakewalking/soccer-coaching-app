import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const CASES = [
  { ini: 'MT', name: 'Mia Tran', team: 'U12 Sam', tag: 'New', tagC: '#fce9e9', tagT: '#c00', desc: 'Left out at training', from: 'Linh Tran (parent)' },
  { ini: '—', name: 'A player', team: 'U13 Girls Meg', tag: 'On track', tagC: PALE, tagT: G, desc: 'Quiet since school change', from: 'Coach Meg' },
  { ini: 'AW', name: 'Away spectator', team: 'U14 Josh', tag: 'On track', tagC: PALE, tagT: G, desc: 'Shouting from sideline', from: 'Coach Josh' },
]

export default function DW1WelfareCases(_: { onBack?: () => void }) {
  const [activeCase, setActiveCase] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <span style={{ padding: '2px 9px', borderRadius: 6, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>CLUB</span>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Wattle Creek FC · Welfare officer</div>
        {['Cases','Reports','Code of conduct'].map(n => (
          <a key={n} style={{ height: 44, padding: '0 14px', borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: n === 'Cases' ? 700 : 500, color: '#fff', background: n === 'Cases' ? 'rgba(255,255,255,0.18)' : 'transparent', textDecoration: 'none' }}>{n}</a>
        ))}
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Welfare cases</h1>
        <span style={{ fontSize: 14, color: MUT }}>3 open · 1 new</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 14 }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
          {CASES.map((c, i) => (
            <div key={i} onClick={() => setActiveCase(i)} style={{ display: 'flex', gap: 12, minHeight: 64, borderTop: i > 0 ? `1px solid ${LN}` : undefined, paddingTop: i > 0 ? 10 : 0, alignItems: 'flex-start', background: activeCase === i ? '#fef8f8' : undefined, borderRadius: activeCase === i ? 10 : undefined, padding: activeCase === i ? '10px 8px' : undefined, cursor: 'pointer' }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: activeCase === i ? '#fce9e9' : PALE, color: activeCase === i ? '#c00' : G, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.ini}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <strong style={{ fontSize: 15 }}>{c.name}</strong>
                  <span style={{ fontSize: 12, color: MUT }}>{c.team}</span>
                  <span style={{ padding: '1px 8px', borderRadius: 99, background: c.tagC, color: c.tagT, fontWeight: 700, fontSize: 11 }}>{c.tag}</span>
                </div>
                <div style={{ fontSize: 14, color: MUT }}>{c.desc}</div>
                <div style={{ fontSize: 12, color: MUT }}>Raised by {c.from}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Mia Tran · U12 Sam</div>
          <div style={{ fontSize: 13, color: MUT }}>Raised by Linh Tran (parent) · 2 days ago</div>
          <div style={{ background: '#fef8f8', borderRadius: 10, padding: '12px 14px', fontSize: 14, lineHeight: '21px', fontStyle: 'italic', color: INK }}>
            "Mia came home upset — she said the other girls at training didn't include her and she had to stand on her own. She doesn't want to come back."
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            <button onClick={() => showToast('Calling Linh Tran. The call is logged on this case.')} style={{ flex: 1, height: 44, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Call Linh</button>
            <button onClick={() => showToast('Note saved. Only you can read it.')} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add note</button>
          </div>
          <button onClick={() => showToast('Checklist opened: reportable conduct, police, Football Victoria.')} style={{ height: 44, borderRadius: 10, border: `1px solid #f0a0a0`, background: '#fef0f0', color: '#c00', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Must this be reported?</button>
          <div style={{ marginTop: 'auto', fontSize: 13, color: MUT, lineHeight: '19px' }}>If you're unsure whether to report, speak to the club president or call the Child Safe Helpline.</div>
        </div>
      </div>
      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
