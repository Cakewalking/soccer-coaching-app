import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FIL7Form({ onParentView }: { onParentView?: () => void }) {
  const [formView, setFormView] = useState<'questions' | 'answers'>('questions')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const questions = [
    { q: 'Kit size this season?', type: 'choice', options: ['8', '10', '12', '14'], answers: { '8': 8, '10': 4, '12': 6, '14': 2 } },
    { q: 'Available for photo day, Saturday 15 June?', type: 'yesno', yes: 14, no: 2 },
    { q: 'Any dietary needs at presentation lunch?', type: 'text', answers: ['Vegetarian', 'No nuts (Zara)'] },
    { q: 'Shirt number preference (not guaranteed)?', type: 'number', note: '13 answered' },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px 32px', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Kit sizes and photo day</div>
              <div style={{ fontSize: 13, color: MUT }}>Sent Mon 1 June · 13 of 17 answered · closes Fri 12 June</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              {(['questions', 'answers'] as const).map(v => (
                <button key={v} onClick={() => setFormView(v)} style={{ height: 34, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${formView === v ? G : LN}`, background: formView === v ? PALE : '#fff', fontSize: 13, color: formView === v ? G : INK, fontWeight: formView === v ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{v}</button>
              ))}
              <button onClick={() => onParentView?.()} style={{ height: 34, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: G, cursor: 'pointer', fontFamily: 'inherit' }}>As a parent sees it</button>
              <button onClick={() => st('Sending reminder to 4 families.')} style={{ height: 34, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Remind 4</button>
            </div>
          </div>

          {formView === 'questions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {questions.map((q, i) => (
                <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Q{i + 1}. {q.q}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{q.type === 'choice' ? 'Choice · one answer' : q.type === 'yesno' ? 'Yes or no' : q.type === 'text' ? 'Short answer' : 'Number'}</div>
                </div>
              ))}
              <button onClick={() => st('Adding a question.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px dashed ${LN}`, background: '#fff', fontSize: 13, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add a question</button>
            </div>
          )}

          {formView === 'answers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Kit sizes chart */}
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Kit size this season?</div>
                <div style={{ display: 'flex', gap: 24 }}>
                  {Object.entries(questions[0].answers as Record<string, number>).map(([size, count]) => (
                    <div key={size} style={{ textAlign: 'center' }}>
                      <div style={{ width: 48, height: `${count * 12}px`, background: G, borderRadius: '4px 4px 0 0', marginBottom: 4, minHeight: 8, transition: 'height 0.3s' }} />
                      <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{count}</div>
                      <div style={{ fontSize: 12, color: MUT }}>Size {size}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo day */}
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Available for photo day?</div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: G }}>14</div>
                    <div style={{ fontSize: 13, color: INK }}>Yes</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 999, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#c05' }}>2</div>
                    <div style={{ fontSize: 13, color: INK }}>No</div>
                  </div>
                </div>
              </div>

              <button onClick={() => st('Opening answers as a sheet.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${G}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open answers as a sheet</button>
            </div>
          )}
        </div>

        {/* Right info */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Form settings</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>One answer per child</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>Closes Fri 12 June</div>
            <div style={{ fontSize: 12, color: MUT }}>Families can finish later</div>
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '14px', marginTop: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 6 }}>Not allowed in a form</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Health details, payments, anything consent covers, or questions about another family.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
