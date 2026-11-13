import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function EDU3MakeLesson({ onNav }: { onNav?: (s: string) => void }) {
  const [lastTool, setLastTool] = useState('')
  const [step, setStep] = useState<2 | 3 | 4>(2)
  const [notice, setNotice] = useState('')
  const [tryIt, setTryIt] = useState('')
  const [title, setTitle] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }
  function tool(name: string) { setLastTool(name) }

  const stepLabel = ['Pick a clip', 'Write two lines', 'Preview', 'Share']

  const annotationPoints = [
    { ts: '0:02', text: 'Grace sees Noah go to press and moves up before the pass.' },
    { ts: '0:05', text: 'She stays side-on, so she can turn and run.' },
  ]

  return (
    <div data-lasttool={lastTool} style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 4, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginRight: 20 }}>Clean Sheet</div>
        {(['Home', 'Squad', 'Training', 'Match day'] as const).map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>{t}</button>
        ))}
        <button onClick={() => tool('Clips')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>Clips</button>
        <button onClick={() => onNav?.('REC1-RecordHub')} style={{ height: 44, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', background: 'none', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center' }}>Record</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button aria-label="Ask Clean Sheet" onClick={() => onNav?.('ASKd4-PanelFirst')} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>
          </button>
          <button onClick={() => tool('U12 Sam')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.3)', background: 'none', fontSize: 13, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>U12 Sam</button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7a9e7e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>SK</div>
        </div>
      </div>

      {/* Clips sub-nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['By game', 'By measure', 'By player', 'Playlists'].map(t => (
          <button key={t} onClick={() => tool(t)} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: '2px solid transparent', fontSize: 13, fontWeight: 500, color: MUT, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>{t}</button>
        ))}
        <button onClick={() => onNav?.('EDU1-Learn')} style={{ height: 44, minWidth: 44, background: 'none', border: 'none', borderBottom: `2px solid ${G}`, fontSize: 13, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit', padding: '0 2px' }}>Learn</button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: MUT }}>Head coach</div>
      </div>

      {/* Step header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', alignItems: 'center', height: 52, gap: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Make a lesson</div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 0 }}>
          {stepLabel.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: i === 0 ? G : step > i + 1 ? G : step === i + 1 ? GD : '#e8edeb', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {i === 0 ? '✓' : step > i + 1 ? '✓' : i + 1}
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
          {step === 2 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 16px' }}>
                <div style={{ background: GD, borderRadius: 8, width: 60, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>From your clip: Grace Reid, v Tealside Town, 30 May · 11 seconds</div>
                  <div style={{ fontSize: 11, color: MUT }}>Lessons only show something done well. No clip of a mistake leaves its own team.</div>
                </div>
              </div>

              {/* Clip annotation points */}
              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: MUT }}>CLIP POINTS</div>
                    <div style={{ fontSize: 11, color: MUT, marginTop: 2 }}>Clean Sheet wrote the first two points from the clip. Change any word.</div>
                  </div>
                  <button onClick={() => { tool('+ Add a point'); st('Tap the clip where it happens, then say it in one line.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add a point</button>
                </div>
                {annotationPoints.map((p, i) => (
                  <button key={p.ts} aria-label={`${p.ts} ${p.text}`} onClick={() => { tool(`annotation-${p.ts}`); st(`Jumps to ${p.ts} in the clip.`) }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'none', border: 'none', borderBottom: i < annotationPoints.length - 1 ? `1px solid ${LN}` : 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', minHeight: 44 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: G, minWidth: 36 }}>{p.ts}</div>
                    <div style={{ fontSize: 13, color: INK }}>{p.text}</div>
                  </button>
                ))}
              </div>

              <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: MUT, display: 'block', marginBottom: 6 }}>Lesson title (optional)</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Closing the space behind the press" style={{ width: '100%', height: 44, padding: '0 12px', border: `1.5px solid ${LN}`, borderRadius: 8, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: MUT, display: 'block', marginBottom: 6 }}>What to notice</label>
                  <textarea value={notice} onChange={e => setNotice(e.target.value)} placeholder="What is Grace doing that works?" rows={3} style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${LN}`, borderRadius: 8, fontSize: 14, fontFamily: 'inherit', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: G, display: 'block', marginBottom: 6 }}>Something to try</label>
                  <textarea value={tryIt} onChange={e => setTryIt(e.target.value)} placeholder="What could a player do next training or game to practise this?" rows={3} style={{ width: '100%', padding: '10px 12px', border: `1.5px solid ${G}`, borderRadius: 8, fontSize: 14, fontFamily: 'inherit', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button onClick={() => { tool('+ Tag'); st('Pick a skill, a position, or a part of the club style.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: G, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Tag</button>
                  <button onClick={() => { tool('Send to Rachel to check'); st('Sent. Rachel checks lessons for the whole club within 2 days. Your own team can see it now.') }} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Send to Rachel to check</button>
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
                  <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 16 }}>{title || 'Closing the space behind the press'}</div>
                  <div style={{ background: '#f7f8f7', borderRadius: 10, padding: '12px 16px', marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: MUT, marginBottom: 6 }}>WHAT TO NOTICE</div>
                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.6 }}>{notice || 'Grace moves up before the pass arrives. She stays side-on so she can turn either way.'}</div>
                  </div>
                  <div style={{ background: PALE, border: `1px solid ${G}`, borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: G, marginBottom: 6 }}>SOMETHING TO TRY</div>
                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.6 }}>{tryIt || 'Next game: when the front player presses, take three steps forward with them before the ball moves.'}</div>
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
                  { label: 'To being a club example, this season', sub: 'The director of football can see it as a club example', checked: false },
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

        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: PALE, border: `1px solid ${G}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 4 }}>WHAT HAPPENS NEXT</div>
            <div style={{ fontSize: 12, color: INK, lineHeight: 1.5 }}>To being a club example, this season — Rachel checks it, then it goes in the library.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Good lessons</div>
            {['Show one thing, not three.', 'Use the player\'s name.', 'Keep each line to two sentences.', 'The "try" should be possible in the next session.'].map((t, i) => (
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
        <button onClick={() => onNav?.('EDU1-Learn')} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
        <button onClick={() => { if (step < 4) setStep((step + 1) as 3 | 4); else { tool('Share lesson'); st('Lesson shared with your team.') } }} style={{ height: 44, padding: '0 24px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{step === 4 ? 'Share lesson' : 'Next →'}</button>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
