import { useState } from 'react'

type Step = 1 | 2 | 3 | 4 | 5
type Source = 'camera' | 'upload' | 'link' | null

const STEP_TITLES = ['The recording', 'Boots and vests', 'Who\'s who', 'Analysing', 'Done']

const SYNC_PLAYERS = [
  { ini: 'LM', name: 'Leo Marsh',   boots: true,  vest: true  },
  { ini: 'RC', name: 'Ruby Chen',   boots: true,  vest: false },
  { ini: 'IM', name: 'Isla Morgan', boots: true,  vest: true  },
  { ini: 'NO', name: 'Noah O.',     boots: false, vest: true  },
  { ini: 'EA', name: 'Ella A.',     boots: true,  vest: false },
  { ini: 'MT', name: 'Mia T.',      boots: true,  vest: true  },
]

const WHO_CARDS = [
  { frame: '0:14', players: ['Maya T', 'Jake L', 'Zoe K'], thumb: '#40826d' },
  { frame: '1:02', players: ['Noah O', 'Ella A'],          thumb: '#2f6252' },
  { frame: '2:34', players: ['Mia I', 'Liam H', 'Ava W'], thumb: '#1f4a3e' },
]

const ANALYSE_STEPS = [
  { label: 'Detecting players',           pct: 100, done: true },
  { label: 'Tracking runs and positions', pct: 100, done: true },
  { label: 'Finding key clips',            pct: 78,  done: false, detail: 'Pressing, build-up, counters and goals' },
  { label: 'Measuring your style',         pct: 0,   done: false, detail: 'Against your targets from Our style' },
]

const DATA_QUALITY = [
  { label: 'Match camera',  value: 'Noah Okafor · vest stopped at min 27, running data to then only',              ok: true },
  { label: 'GPS vest',      value: 'Oscar Brennan · no boot sensors worn, no touch data',                          ok: false },
  { label: 'Boot sensors',  value: 'Ruby, Isla, Finn · vests synced late, all data recovered',                     ok: true },
  { label: 'GPS vests',     value: 'Lily and Kai · blurred / no kit, as their parents chose',                      ok: true },
]

function ProgressBar({ pct, color = '#40826d' }: { pct: number; color?: string }) {
  return (
    <div style={{ height: 6, borderRadius: 3, background: '#e9eae8', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 0.5s' }} />
    </div>
  )
}

function StepHeader({ step, onClose }: { step: Step; onClose: () => void }) {
  return (
    <div style={{ flex: 'none', background: '#1f4a3e' }}>
      <div style={{ padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.12)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>Add a game · Ironbark United</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>
            {step <= 4 ? `Step ${step} of 4 · ${STEP_TITLES[step - 1]}` : STEP_TITLES[step - 1]}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          {([1,2,3,4,5] as Step[]).map(s => (
            <div key={s} style={{ width: s === step ? 20 : 8, height: 8, borderRadius: 4, background: s <= step ? '#c3e6d4' : 'rgba(255,255,255,0.2)', transition: 'width 0.3s' }} />
          ))}
        </div>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.1)' }}>
        <div style={{ height: '100%', background: '#c3e6d4', width: `${((step - 1) / 4) * 100}%`, transition: 'width 0.5s' }} />
      </div>
    </div>
  )
}

function StepFooter({ onBack, onNext, backLabel = 'Back', nextLabel = 'Next', nextDisabled = false }: { onBack?: () => void; onNext: () => void; backLabel?: string; nextLabel?: string; nextDisabled?: boolean }) {
  return (
    <div style={{ flex: 'none', padding: '16px 32px', borderTop: '1px solid #e9eae8', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {onBack ? (
        <button onClick={onBack} style={{ height: 44, padding: '0 20px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          {backLabel}
        </button>
      ) : <div />}
      <button onClick={onNext} disabled={nextDisabled} style={{ height: 44, padding: '0 24px', borderRadius: '999px', border: 0, background: nextDisabled ? '#c5c8c4' : '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: nextDisabled ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 6, opacity: nextDisabled ? 0.6 : 1 }}>
        {nextLabel}
        {nextLabel !== 'Done' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
      </button>
    </div>
  )
}

export default function AddGameScreen({ onClose, initialStep = 1 }: { onClose: () => void; initialStep?: Step }) {
  const [step, setStep] = useState<Step>(initialStep)
  const [source, setSource] = useState<Source>(null)
  const [homeScore, setHomeScore] = useState(2)
  const [awayScore, setAwayScore] = useState(1)

  const next = () => setStep(s => Math.min(5, s + 1) as Step)
  const back = () => setStep(s => Math.max(1, s - 1) as Step)

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#f7f9f7', zIndex: 100, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      <StepHeader step={step} onClose={onClose} />

      {/* Step 1: Recording source */}
      {step === 1 && (
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>We found Saturday's game</h2>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6f7f7b' }}>Where's the recording?</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {[
                { id: 'camera' as Source,
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
                  title: 'Match camera', sub: '' },
                { id: 'upload' as Source,
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
                  title: 'Upload a video file', sub: '' },
                { id: 'link' as Source,
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
                  title: 'Paste a link', sub: 'From another camera app or cloud storage' },
              ].map(opt => (
                <button key={opt.id!} onClick={() => setSource(opt.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', borderRadius: 14,
                  border: `2px solid ${source === opt.id ? '#40826d' : '#e9eae8'}`,
                  background: source === opt.id ? '#f0f8f4' : '#ffffff', cursor: 'pointer',
                  fontFamily: 'inherit', textAlign: 'left',
                }}>
                  <span style={{ flexShrink: 0, color: '#4a5a57' }}>{opt.icon}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>{opt.title}</div>
                    {opt.sub && <div style={{ fontSize: 13, color: '#6f7f7b', marginTop: 2 }}>{opt.sub}</div>}
                  </div>
                  {source === opt.id && (
                    <div style={{ marginLeft: 'auto', width: 22, height: 22, borderRadius: '999px', background: '#40826d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {source && (
              <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>Check the score</div>
                <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 16 }}>Tap a time to change it. We use these to split the halves.</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#6f7f7b', marginBottom: 8 }}>Wattle Creek</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button onClick={() => setHomeScore(s => Math.max(0, s - 1))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #e9eae8', background: '#f7f8f7', fontSize: 20, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>−</button>
                      <div style={{ fontSize: 36, fontWeight: 800, color: '#10211f', minWidth: 40, textAlign: 'center' }}>{homeScore}</div>
                      <button onClick={() => setHomeScore(s => s + 1)} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #e9eae8', background: '#f7f8f7', fontSize: 20, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>+</button>
                    </div>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#c5c8c4' }}>vs</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#6f7f7b', marginBottom: 8 }}>Ironbark United (away)</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button onClick={() => setAwayScore(s => Math.max(0, s - 1))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #e9eae8', background: '#f7f8f7', fontSize: 20, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>−</button>
                      <div style={{ fontSize: 36, fontWeight: 800, color: '#10211f', minWidth: 40, textAlign: 'center' }}>{awayScore}</div>
                      <button onClick={() => setAwayScore(s => s + 1)} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #e9eae8', background: '#f7f8f7', fontSize: 20, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f' }}>+</button>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#6f7f7b', marginBottom: 6 }}>Kick-off</div>
                    <input type="time" defaultValue="09:20" style={{ width: '100%', height: 40, borderRadius: 10, border: '1px solid #e9eae8', padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: '#10211f', background: '#ffffff', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#6f7f7b', marginBottom: 6 }}>Half-time</div>
                    <input type="time" defaultValue="09:56" style={{ width: '100%', height: 40, borderRadius: 10, border: '1px solid #e9eae8', padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: '#10211f', background: '#ffffff', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Boots and vests */}
      {step === 2 && (
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>9 of 15 players fully synced</h2>
            <p style={{ margin: '0 0 8px', fontSize: 14, color: '#6f7f7b' }}>Sync everything nearby</p>
            <p style={{ margin: '0 0 24px', fontSize: 13, color: '#6f7f7b', lineHeight: '18px' }}>Hold the boots and vests near the tablet to sync. You can carry on without them: those players just get less data for this game.</p>

            <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, borderBottom: '1px solid #e9eae8' }}>
                {['Player', 'Boot sensors', 'GPS vest'].map(h => (
                  <div key={h} style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#6f7f7b', letterSpacing: '0.03em', textTransform: 'uppercase' as const }}>{h}</div>
                ))}
              </div>
              {SYNC_PLAYERS.map((p, i) => (
                <div key={p.ini} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', alignItems: 'center', padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{p.name}</span>
                  </div>
                  <div>
                    {p.boots
                      ? <span style={{ fontSize: 12, fontWeight: 700, color: '#2f6252' }}>Synced</span>
                      : <button style={{ height: 36, padding: '0 12px', borderRadius: 8, border: '1px solid #e9eae8', background: '#f7f8f7', color: '#10211f', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Sync now</button>
                    }
                  </div>
                  <div>
                    {p.vest
                      ? <span style={{ fontSize: 12, fontWeight: 700, color: '#2f6252' }}>Synced</span>
                      : <button style={{ height: 36, padding: '0 12px', borderRadius: 8, border: '1px solid #e9eae8', background: '#f7f8f7', color: '#10211f', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Sync now</button>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px', background: '#fdf8f4', border: '1px solid #f0dcc8', borderRadius: 10, padding: '10px 14px' }}>
              6 players still need a look. You can carry on anyway.
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Who's who */}
      {step === 3 && (
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: 680 }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Help us with 2 more players</h2>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6f7f7b' }}>The camera couldn't read these shirt numbers. One tap each and their clips and stats go to the right player.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: '1?', min: 'Min 10 · 0:40 on screen', note: 'Shirt number hidden by the light. Ran down the left.', players: ['Ava Lindqvist', 'Sam Delaney', 'Not our player'] },
                { label: '?',  min: 'Min 24 · 0:25 on screen', note: 'Came on at half-time, number not seen clearly.',         players: ['Finn Walsh', 'Sam Delaney', 'Not our player'] },
                { label: '8?', min: 'Min 41 · 0:30 on screen', note: 'Two players swapped shirts at half-time?',               players: ['Kai Russo', 'Tom Reyes'] },
              ].map((card, i) => (
                <div key={i} style={{ background: '#ffffff', borderRadius: 16, padding: '16px 20px', border: '1px solid #e9eae8', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: '#1f4a3e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{card.label}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 4 }}>{card.min}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f', marginBottom: 10 }}>{card.note}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
                      {card.players.map(name => (
                        <button key={name} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1.5px solid #e9eae8', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{name}</button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Analysing */}
      {step === 4 && (
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div style={{ maxWidth: 480, width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ width: 72, height: 72, borderRadius: '999px', background: '#e4f2eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>About 25 minutes to go</div>
              <div style={{ fontSize: 14, color: '#6f7f7b', marginTop: 6, lineHeight: '20px' }}>You don't need to wait here. We'll send a message to your inbox when the review is ready, and build Thursday's plan from it.</div>
            </div>

            <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, border: '1px solid #e9eae8', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {ANALYSE_STEPS.map((s, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {s.done ? (
                        <div style={{ width: 20, height: 20, borderRadius: '999px', background: '#40826d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      ) : s.pct > 0 ? (
                        <div style={{ width: 20, height: 20, borderRadius: '999px', border: '2px solid #40826d', background: 'transparent' }} />
                      ) : (
                        <div style={{ width: 20, height: 20, borderRadius: '999px', border: '2px solid #d6d9d7', background: 'transparent' }} />
                      )}
                      <span style={{ fontSize: 14, fontWeight: s.done ? 700 : 500, color: s.done ? '#10211f' : s.pct > 0 ? '#10211f' : '#9a9f9d' }}>{s.label}</span>
                      {!s.done && s.pct > 0 && 'detail' in s && <span style={{ fontSize: 12, color: '#9aada9', marginLeft: 4 }}>{(s as typeof s & { detail?: string }).detail}</span>}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: s.done ? '#40826d' : s.pct > 0 ? '#2f6252' : '#c5c8c4' }}>{s.done ? 'Done' : s.pct > 0 ? `${s.pct}%` : 'Next'}</span>
                  </div>
                  {!s.done && s.pct > 0 && <ProgressBar pct={s.pct} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Done */}
      {step === 5 && (
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f', marginBottom: 8 }}>Ironbark United 3–1 is ready</div>
            <div style={{ fontSize: 15, color: '#4a5a57', lineHeight: '22px', marginBottom: 24 }}>
              7 key clips, every player's running and sprints, and three things to work on this week. Most of the data is solid. Two numbers are less certain; they're marked wherever they appear.
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
              <button onClick={onClose} style={{ height: 44, padding: '0 20px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Open the match review</button>
              <button onClick={onClose} style={{ height: 44, padding: '0 20px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See Thursday's plan</button>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '16px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>How complete is the data?</div>
              <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 16 }}>Good data for 57 of 60 minutes</div>
              <div style={{ display: 'flex', gap: 0, marginBottom: 16, background: '#f5f6f4', borderRadius: 8, overflow: 'hidden', height: 8 }}>
                <div style={{ width: '95%', background: '#40826d' }} />
                <div style={{ width: '5%', background: '#c39797' }} />
              </div>
              <div style={{ fontSize: 11, color: '#9aada9', marginBottom: 10 }}>Kick-off · Half-time · Full time · Gaps</div>
              {DATA_QUALITY.map(d => (
                <div key={d.label} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: '1px solid #f0f1f0' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.ok ? '#40826d' : '#c39797', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f' }}>{d.label}</div>
                    <div style={{ fontSize: 12, color: '#6f7f7b' }}>{d.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <StepFooter
        onBack={step > 1 ? back : undefined}
        onNext={step === 5 ? onClose : next}
        nextLabel={step === 5 ? 'Done' : step === 4 ? 'Continue in background' : 'Next'}
        nextDisabled={step === 1 && source === null}
      />
    </div>
  )
}
