import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type QType = 'Choice' | 'Yes or no' | 'Short answer'
type Question = { q: string; type: QType; note?: string }

export default function FIL7Form({ onBack, onShare, onAnswersSheet, onNav }: {
  onBack?: () => void
  onShare?: () => void
  onAnswersSheet?: () => void
  onNav?: (s: string) => void
}) {
  const [formView, setFormView] = useState<'Questions' | 'Answers' | 'As a parent sees it'>('Questions')
  const [reminded, setReminded] = useState(false)
  const [lastTool, setLastTool] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    { q: 'Kit size this season?', type: 'Choice' },
    { q: 'Available for photo day, Saturday 15 June?', type: 'Yes or no' },
    { q: 'Any dietary needs at presentation lunch?', type: 'Short answer' },
    { q: 'Shirt number preference (not guaranteed)?', type: 'Choice' },
  ])
  function tool(name: string) { setLastTool(name) }

  function cycleType(i: number) {
    const order: QType[] = ['Choice', 'Yes or no', 'Short answer']
    setQuestions(qs => qs.map((q, j) => j === i ? { ...q, type: order[(order.indexOf(q.type) + 1) % 3] } : q))
  }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }} data-lasttool={lastTool}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {[
          { label: 'Home', target: 'PH1-HomeJuniorsSame' },
          { label: 'Squad', target: 'PH1-HomeJuniorsSame' },
          { label: 'Training', target: 'PH1-HomeJuniorsSame' },
          { label: 'Match day', target: 'PH1-HomeJuniorsSame' },
          { label: 'Clips', target: 'PH1-HomeJuniorsSame' },
          { label: 'Record', target: 'REC1-RecordHub' },
        ].map(({ label, target }) => (
          <div key={label} onClick={() => onNav?.(target)} style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{label}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </div>
          <div onClick={() => onNav?.('PH1-HomeJuniorsSame')} style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', fontSize: 13, color: '#fff', cursor: 'pointer' }}>U12 Sam</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center', flexShrink: 0 }}>
        {[
          { label: 'Overview', target: 'PH1-HomeJuniorsSame' },
          { label: 'Messages', target: 'PH1-HomeJuniorsSame' },
          { label: 'Calendar', target: 'PH1-HomeJuniorsSame' },
          { label: 'Fixtures and results', target: 'PH1-HomeJuniorsSame' },
          { label: 'Our style', target: 'PH1-HomeJuniorsSame' },
          { label: "Where we're at", target: 'WA1-WhereWeAt' },
          { label: 'Team staff', target: 'PH1-HomeJuniorsSame' },
          { label: 'Files', target: 'FIL1-Files' },
        ].map(({ label, target }) => (
          <div key={label} onClick={() => onNav?.(target)} style={{ height: 44, display: 'flex', alignItems: 'center', borderBottom: label === 'Files' ? `2px solid ${G}` : '2px solid transparent', fontSize: 13, fontWeight: label === 'Files' ? 700 : 500, color: label === 'Files' ? G : MUT, cursor: 'pointer' }}>{label}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>

      {/* File toolbar */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 16px', display: 'flex', gap: 6, height: 44, alignItems: 'center', flexShrink: 0 }}>
        <button onClick={() => onBack?.()} style={{ fontSize: 13, color: MUT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '0 8px', whiteSpace: 'nowrap' }}>Back to Files</button>
        <div style={{ width: 1, height: 24, background: LN, flexShrink: 0 }} />
        {['History', 'Download'].map(b => (
          <button key={b} onClick={() => tool(b)} style={{ height: 28, padding: '0 10px', borderRadius: 6, border: `1px solid ${LN}`, background: lastTool === b ? PALE : '#fff', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', color: lastTool === b ? G : INK }}>{b}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button onClick={() => onShare?.()} style={{ height: 28, padding: '0 12px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Share</button>
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
              {(['Questions', 'Answers', 'As a parent sees it'] as const).map(v => (
                <button key={v} onClick={() => setFormView(v)} style={{ height: 34, padding: '0 14px', borderRadius: 999, border: `1.5px solid ${formView === v ? G : LN}`, background: formView === v ? PALE : '#fff', fontSize: 13, color: formView === v ? G : INK, fontWeight: formView === v ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit' }}>{v}</button>
              ))}
              <button onClick={() => setReminded(true)} style={{ height: 34, padding: '0 16px', borderRadius: 999, background: reminded ? '#5a8a7a' : G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{reminded ? 'Reminder sent ✓' : 'Remind the 4'}</button>
            </div>
          </div>

          {formView === 'Questions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {questions.map((q, i) => (
                <div key={i} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 4 }}>Q{i + 1}. {q.q}</div>
                  </div>
                  <button onClick={() => cycleType(i)} style={{ height: 32, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{q.type}</button>
                </div>
              ))}
              <button onClick={() => tool('+ Question')} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px dashed ${LN}`, background: '#fff', fontSize: 13, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>+ Question</button>
            </div>
          )}

          {formView === 'Answers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Kit size this season?</div>
                <div style={{ display: 'flex', gap: 24 }}>
                  {[['8', 8], ['10', 4], ['12', 6], ['14', 2]].map(([size, count]) => (
                    <div key={size} style={{ textAlign: 'center' }}>
                      <div style={{ width: 48, height: `${(count as number) * 12}px`, background: G, borderRadius: '4px 4px 0 0', marginBottom: 4, minHeight: 8 }} />
                      <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{count}</div>
                      <div style={{ fontSize: 12, color: MUT }}>Size {size}</div>
                    </div>
                  ))}
                </div>
              </div>
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
              <button onClick={() => onAnswersSheet?.()} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${G}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open answers as a sheet</button>
            </div>
          )}

          {formView === 'As a parent sees it' && (
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '24px' }}>
              <div style={{ fontSize: 14, color: MUT }}>This is how the form looks to families on their phones.</div>
            </div>
          )}
        </div>

        {/* Right info */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Form settings</div>
            <button onClick={() => tool('One answer per child')} style={{ width: '100%', height: 34, borderRadius: 8, border: `1.5px solid ${lastTool === 'One answer per child' ? G : LN}`, background: lastTool === 'One answer per child' ? PALE : '#fff', fontSize: 12, color: lastTool === 'One answer per child' ? G : MUT, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', padding: '0 10px', marginBottom: 8 }}>One answer per child</button>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 8 }}>Closes Fri 12 June</div>
            <div style={{ fontSize: 12, color: MUT }}>Families can finish later</div>
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '14px', marginTop: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 6 }}>Not allowed in a form</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Health details, payments, anything consent covers, or questions about another family.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
