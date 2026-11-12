import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', ROSE = '#c39797'

export default function TM7HeadKnock(_: { onBack?: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setChecked(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  const steps = [
    "Remove the player from the game immediately.",
    "Make sure another adult is with the player.",
    "Watch for: confusion, dizziness, headache, nausea, vision changes.",
    "Do NOT let the player return to play today — even if they feel fine.",
    "Call a parent or carer now.",
    "If unconscious or vomiting: call 000.",
  ]

  const Row = ({ i, text }: { i: number; text: string }) => (
    <button
      onClick={() => toggle(i)}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
    >
      <span style={{ width: 24, height: 24, borderRadius: '50%', background: checked.has(i) ? G : 'transparent', border: `2px solid ${checked.has(i) ? G : LN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
        {checked.has(i) && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
      </span>
      <span style={{ fontSize: 15, lineHeight: 1.4, color: INK }}>{text}</span>
    </button>
  )

  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam · Sat 6 Jun · vs Harbour Rovers</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Head knock</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>

      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ background: ROSE + '33', border: `1px solid ${ROSE}`, borderRadius: 14, padding: '12px 14px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Suspected head knock</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 4 }}>If in doubt, sit them out. No player returns to play on the same day.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {steps.map((s, i) => <Row key={i} i={i} text={s} />)}
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 14px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>Return-to-play</div>
          <div style={{ fontSize: 13, color: MUT }}>Priya Shah (fitness coach) will set a step-by-step return plan. The player needs medical clearance before full training.</div>
        </div>
      </div>

      <div style={{ padding: '10px 14px 12px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button onClick={() => st('Logged and Priya notified.')} style={{ height: 50, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
          Log and notify Priya
        </button>
        <button onClick={() => st('Going back to game day.')} style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          Back to game day
        </button>
      </div>
    {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
