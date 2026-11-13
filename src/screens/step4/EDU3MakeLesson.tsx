import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDU3MakeLesson({ onBack }: { onBack?: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [clip, setClip] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const [tryIt, setTryIt] = useState('')
  const [title, setTitle] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const clips = [
    { id: 'c1', label: 'U12 Sam v Harbour Rovers · 11 Oct · Min 23:40', desc: 'Kai scans before receiving' },
    { id: 'c2', label: 'U12 Sam v Harbour Rovers · 11 Oct · Min 44:12', desc: 'First touch away from pressure' },
    { id: 'c3', label: 'U12 Sam v Redwood Wanderers · 4 Oct · Min 8:55', desc: 'Full line steps up together' },
  ]

  const stepLabel = ['Pick a clip', 'Write two lines', 'Preview', 'Share']

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Clips' ? 700 : 500, color: t === 'Clips' ? '#fff' : 'rgba(255,255,255,0.65)', background: t === 'Clips' ? 'rgba(255,255,255,0.15)' : 'none', borderRadius: 999, padding: '4px 12px', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 32, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', fontSize: 13, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>U12 Sam ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', alignItems: 'center', height: 52, gap: 16 }}>
        <button onClick={onBack} style={{ fontSize: 13, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Learn</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Make a lesson</div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 0 }}>
          {stepLabel.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: step > i + 1 ? G : step === i + 1 ? GD : '#e8edeb', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: 12, color: step === i + 1 ? INK : MUT, fontWeight: step === i + 1 ? 700 : 400 }}>{s}</div>
              </div>
              {i < 3 && <div style={{ width: 24, height: 1, background: LN, margin: '0 8px' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px', display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          {step === 1 && (
            <>
              <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 4 }}>Pick a clip</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Find a moment where one of your players did something worth showing others.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {clips.map(c => (
                  <div key={c.id} onClick={() => setClip(c.id)} style={{ background: '#fff', border: `2px solid ${clip === c.id ? G : LN}`, borderRadius: 14, padding: '16px 20px', cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{ width: 80, height: 56, background: GD, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: MUT, marginBottom: 2 }}>{c.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{c.desc}</div>
                    </div>
                    {clip === c.id && (
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 4 }}>Write two lines</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>One line about what to notice. One line with something to try. Keep it short.</div>
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: MUT, display: 'block', marginBottom: 6 }}>Lesson title (optional)</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. First touch away from pressure" style={{ width: '100%', height: 40, padding: '0 12px', border: `1.5px solid ${LN}`, borderRadius: 8, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: MUT, display: 'block', marginBottom: 6 }}>What to notice</label>
                  <textarea value={notice} onChange={e => setNotice(e.target.value)} placeholder="What is Kai doing that works? What should a player watch for?" rows={3} style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${LN}`, borderRadius: 8, fontSize: 14, fontFamily: 'inherit', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: G, display: 'block', marginBottom: 6 }}>Something to try</label>
                  <textarea value={tryIt} onChange={e => setTryIt(e.target.value)} placeholder="What could a player do next training or game to practise this?" rows={3} style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 14, fontFamily: 'inherit', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 4 }}>Preview</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>This is how the lesson will look to players.</div>
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ background: GD, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 16 }}>{title || 'First touch away from pressure'}</div>
                  <div style={{ background: '#f7f8f7', borderRadius: 10, padding: '12px 16px', marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 6 }}>WHAT TO NOTICE</div>
                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.6 }}>{notice || 'Kai receives, opens his body before the ball arrives, and plays away from the press in one touch.'}</div>
                  </div>
                  <div style={{ background: PALE, border: `1px solid ${G}`, borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: G, marginBottom: 6 }}>SOMETHING TO TRY</div>
                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.6 }}>{tryIt || 'Next game: before the ball arrives, pick where your first touch will go. Try to play away from the nearest defender.'}</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 4 }}>Share</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Who should see this lesson?</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'My team (U12 Sam)', sub: '16 players + families', checked: true },
                  { label: 'All coaches at the club', sub: 'They can share it with their teams', checked: false },
                  { label: 'Club library', sub: 'Any coach can find and use it', checked: false },
                ].map(opt => (
                  <label key={opt.label} style={{ background: '#fff', border: `1.5px solid ${LN}`, borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked={opt.checked} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{opt.label}</div>
                      <div style={{ fontSize: 12, color: MUT }}>{opt.sub}</div>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Good lessons</div>
            {[
              'Show one thing, not three.',
              'Use the player\'s name.',
              'Keep each line to two sentences.',
              'The "try" should be possible in the next session.',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ color: G, fontSize: 14, flexShrink: 0 }}>·</div>
                <div style={{ fontSize: 12, color: MUT, lineHeight: 1.4 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#fff', borderTop: `1px solid ${LN}`, padding: '12px 32px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => step > 1 ? setStep((step - 1) as 1 | 2 | 3 | 4) : onBack?.()} style={{ height: 40, padding: '0 20px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>{step === 1 ? 'Cancel' : '← Back'}</button>
        <button onClick={() => { if (step < 4) setStep((step + 1) as 1 | 2 | 3 | 4); else st('Lesson shared with your team.') }} disabled={step === 1 && !clip} style={{ height: 40, padding: '0 24px', borderRadius: 999, background: step === 1 && !clip ? '#ccc' : G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: step === 1 && !clip ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>{step === 4 ? 'Share lesson' : 'Next →'}</button>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
