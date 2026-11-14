import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Answer = 'yes' | 'maybe' | 'no' | null
const SESSIONS = [
  { id: 'thu', day: 'THU 4', label: 'Training', sub: 'Tonight · 5:45 to 7:15 pm · Wattle Creek Reserve' },
  { id: 'sat', day: 'SAT 6', label: 'vs Harbour Rovers', sub: 'Home · be there 8:40 for 9:30 · white kit' },
  { id: 'tue', day: 'TUE 9', label: 'Training', sub: '5:45 to 7:15 pm · Wattle Creek Reserve' },
]

export default function AV2ParentAvailability() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({ thu: 'yes', sat: 'yes', tue: null })
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  function answer(id: string, val: Answer) {
    setAnswers(prev => ({ ...prev, [id]: val }))
    if (val === 'yes') t("Mia's in. Thanks!")
    else if (val === 'maybe') t("Got it. Sam will see.")
    else t("No worries. Sam will see.")
  }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', margin: '0 auto', position: 'relative' }}>
      <div style={{ background: GD, padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Wattle Creek U12 · parent</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>Can Mia make it?</div>
      </div>

      <div style={{ padding: '16px 20px 32px' }}>
        <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>Sam sees your answer straight away. Change it any time before the day.</div>

        {SESSIONS.map(s => (
          <div key={s.id} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{s.day}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{s.label}</div>
            </div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>{s.sub}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['yes', 'maybe', 'no'] as const).map(opt => (
                <button key={opt} onClick={() => answer(s.id, opt)} style={{
                  flex: 1, height: 44, borderRadius: 10, border: `1.5px solid ${answers[s.id] === opt ? G : LN}`,
                  background: answers[s.id] === opt ? PALE : '#fff',
                  color: answers[s.id] === opt ? GD : MUT,
                  fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  textTransform: 'capitalize' as const,
                }}>
                  {opt === 'yes' ? 'Yes' : opt === 'maybe' ? 'Maybe' : 'No'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
