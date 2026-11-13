import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Answer = 'yes' | 'mostly' | 'not-yet' | null

export default function PU7CoachView({ onBack }: { onBack?: () => void }) {
  const [answers, setAnswers] = useState<Answer[]>([null, null, null])
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const questions = [
    { q: 'Is the football challenge there?', hint: 'Does she look stretched in games, or does it come too easily?' },
    { q: 'Is she ready, in herself?', hint: 'Confident, not anxious; asking questions; enjoying the challenge.' },
    { q: 'Is the timing right?', hint: 'No big change, no injury coming back from, nothing else heavy going on.' },
  ]

  const opts: { key: Answer; label: string }[] = [
    { key: 'yes', label: 'Yes' },
    { key: 'mostly', label: 'Mostly' },
    { key: 'not-yet', label: 'Not yet' },
  ]

  if (submitted) {
    return (
      <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: INK, marginBottom: 8 }}>Thanks, Sam.</div>
        <div style={{ fontSize: 15, color: MUT }}>Rachel has your view and will come back to you.</div>
      </div>
    )
  }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, alignItems: 'flex-start', justifyContent: 'center', padding: 48 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 20, padding: '36px', width: 580 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK, marginBottom: 4 }}>Mia Tran · your view</div>
            <div style={{ fontSize: 13, color: MUT }}>Rachel has noticed Mia. Only the three of you can see this. A "not yet" with a reason is a valid answer — it matters most.</div>
          </div>

          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: 24, padding: '20px', background: '#fafafa', border: `1px solid ${LN}`, borderRadius: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>{q.q}</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 14, lineHeight: 1.5 }}>{q.hint}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {opts.map(o => (
                  <button key={o.key} onClick={() => setAnswers(a => a.map((v, j) => j === i ? o.key : v))} style={{ flex: 1, height: 42, borderRadius: 10, border: `1.5px solid ${answers[i] === o.key ? G : LN}`, background: answers[i] === o.key ? PALE : '#fff', fontSize: 14, color: answers[i] === o.key ? G : INK, fontWeight: answers[i] === o.key ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{o.label}</button>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Anything else Rachel should know?</div>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Optional. Your words go to Rachel only." style={{ width: '100%', height: 80, border: `1.5px solid ${LN}`, borderRadius: 10, padding: 12, fontSize: 14, fontFamily: 'inherit', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button onClick={onBack} style={{ height: 44, padding: '0 24px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Not now</button>
            <button onClick={() => { if (answers.some(a => a === null)) { st('Please answer all three questions.'); return } setSubmitted(true) }} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Send to Rachel</button>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
