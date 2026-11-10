import { useState } from 'react'
import { STYLE_QUESTIONS, STYLE_CLUB_VALUES, STYLE_MEASURES, type StyleQuestion } from '../data'

function QuestionCard({ q, onSelect }: { q: StyleQuestion; onSelect: (i: number) => void }) {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 16, padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 6 }}>{q.context}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#10211f', lineHeight: '22px' }}>{q.question}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {q.options.map((opt, i) => {
          const sel = q.selected === i
          return (
            <button key={opt} onClick={() => onSelect(i)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', borderRadius: 10,
              border: `1.5px solid ${sel ? '#40826d' : '#e9eae8'}`,
              background: sel ? '#f0f8f4' : '#fafafa',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            }}>
              <span style={{
                flex: 'none', width: 18, height: 18, borderRadius: '999px',
                border: `2px solid ${sel ? '#40826d' : '#c5c8c4'}`,
                background: sel ? '#40826d' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {sel && <span style={{ width: 6, height: 6, borderRadius: '999px', background: '#ffffff' }} />}
              </span>
              <span style={{ fontSize: 15, fontWeight: sel ? 600 : 400, color: sel ? '#2f6252' : '#10211f', lineHeight: '20px' }}>{opt}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function OurStyleScreen() {
  const [questions, setQuestions] = useState(STYLE_QUESTIONS)
  const [values, setValues] = useState(STYLE_CLUB_VALUES)

  function selectOption(qi: number, oi: number) {
    setQuestions(qs => qs.map((q, i) => i === qi ? { ...q, selected: oi } : q))
  }
  function toggleValue(vi: number) {
    setValues(vs => vs.map((v, i) => i === vi ? { ...v, checked: !v.checked } : v))
  }

  return (
    <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
      {/* Main */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '28px 32px 32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>How we play</h1>
              <span style={{ fontSize: 13, fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: '#eef5f2', color: '#2f6252' }}>Saved</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#4a5a57' }}>Set 12 March by Sam. Every game since is scored against these answers. Tap any answer to change it.</p>
          </div>
        </div>

        {/* 2×2 question grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {questions.map((q, qi) => (
            <QuestionCard key={qi} q={q} onSelect={oi => selectOption(qi, oi)} />
          ))}
        </div>

        {/* Club values */}
        <div style={{ background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 16, padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#10211f' }}>Values</h2>
            <span style={{ fontSize: 13, color: '#6f7f7b' }}>· pick any</span>
          </div>
          <p style={{ margin: '0 0 14px', fontSize: 14, color: '#4a5a57' }}>The four answers above are yours. Equal minutes is a club rule up to U13.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {values.map((v, vi) => (
              <button key={v.label} onClick={() => toggleValue(vi)} style={{
                display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 16px',
                borderRadius: '999px', border: `1.5px solid ${v.checked ? '#40826d' : '#e9eae8'}`,
                background: v.checked ? '#f0f8f4' : '#ffffff',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: v.checked ? '#2f6252' : '#10211f',
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 4, border: `2px solid ${v.checked ? '#40826d' : '#c5c8c4'}`,
                  background: v.checked ? '#40826d' : 'transparent', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {v.checked && <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5"/></svg>}
                </span>
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: What Clean Sheet will measure */}
      <div style={{ width: 310, flex: 'none', borderLeft: '1px solid #e9eae8', padding: '24px 20px', overflowY: 'auto', background: '#fafafa' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#10211f' }}>What Clean Sheet measures</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#4a5a57' }}>{STYLE_MEASURES.length} measures · shown in Where we're at</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {STYLE_MEASURES.map((m, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '10px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none',
            }}>
              <span style={{ flex: 'none', width: 8, height: 8, borderRadius: '999px', background: '#40826d', marginTop: 5 }} />
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#10211f', lineHeight: '18px' }}>{m.label}</span>
                <span style={{ fontSize: 12, color: '#6f7f7b' }}>{m.source}</span>
              </span>
              <span style={{ flex: 'none', fontSize: 13, fontWeight: 700, color: '#2f6252', whiteSpace: 'nowrap' }}>{m.value}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: '12px 14px', background: '#e8f2ee', borderRadius: 10, fontSize: 13, color: '#2f6252', lineHeight: '18px' }}>
          If you change your style, past games are re-scored against the new answers. Nothing is lost.
        </div>
      </div>
    </div>
  )
}
