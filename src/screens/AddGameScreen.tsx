import { useState } from 'react'

type Step = 1 | 2 | 3 | 4 | 5
type Source = 'xbotgo' | 'upload' | 'link' | null

const STEP_TITLES = ['Recording source', 'Sync players', 'Who\'s who', 'Analysing', 'Done']

const SYNC_PLAYERS = [
  { ini: 'MT', name: 'Maya T',    vest: '#7', boots: 'Blue Puma', syncStatus: 'synced'   as const },
  { ini: 'JL', name: 'Jake L',    vest: '#5', boots: 'White Nike', syncStatus: 'synced'  as const },
  { ini: 'NO', name: 'Noah O',    vest: '#3', boots: 'Black Adidas', syncStatus: 'waiting' as const },
  { ini: 'ZK', name: 'Zoe K',     vest: '#9', boots: 'Pink New Balance', syncStatus: 'synced' as const },
  { ini: 'EA', name: 'Ella A',    vest: '#11', boots: 'White Puma', syncStatus: 'waiting' as const },
  { ini: 'MI', name: 'Mia I',     vest: '#6', boots: 'Black Nike', syncStatus: 'synced'  as const },
  { ini: 'LH', name: 'Liam H',    vest: '#2', boots: 'Red Mizuno', syncStatus: 'synced'  as const },
  { ini: 'AW', name: 'Ava W',     vest: '#8', boots: 'Orange Adidas', syncStatus: 'waiting' as const },
]

const WHO_CARDS = [
  { frame: '0:14', players: ['Maya T', 'Jake L', 'Zoe K'], thumb: '#40826d' },
  { frame: '1:02', players: ['Noah O', 'Ella A'],          thumb: '#2f6252' },
  { frame: '2:34', players: ['Mia I', 'Liam H', 'Ava W'], thumb: '#1f4a3e' },
]

const ANALYSE_STEPS = [
  { label: 'Detecting players',           pct: 100, done: true },
  { label: 'Tracking runs and positions', pct: 100, done: true },
  { label: 'Finding key moments',         pct: 78,  done: false },
  { label: 'Generating clips',            pct: 32,  done: false },
  { label: 'Building match report',       pct: 0,   done: false },
]

const DATA_QUALITY = [
  { label: 'Player coverage',    value: '14 / 15',  pct: 93 },
  { label: 'Clip accuracy',      value: '87 %',     pct: 87 },
  { label: 'Position data',      value: 'Complete', pct: 100 },
  { label: 'Missing time',       value: '0:34',     pct: 97 },
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
          <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>Add a game</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>
            Step {step} of 5 · {STEP_TITLES[step - 1]}
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

export default function AddGameScreen({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>(1)
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
            <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Where's the footage?</h2>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6f7f7b' }}>Choose how to get your game into Clean Sheet.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {[
                { id: 'xbotgo' as Source, icon: '📷', title: 'XbotGo Falcon', sub: 'Auto-track AI camera — sync directly' },
                { id: 'upload' as Source, icon: '⬆', title: 'Upload a file', sub: 'MP4, MOV or MKV from your device' },
                { id: 'link'   as Source, icon: '🔗', title: 'Paste a link', sub: 'YouTube, Vimeo, or club platform URL' },
              ].map(opt => (
                <button key={opt.id!} onClick={() => setSource(opt.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', borderRadius: 14,
                  border: `2px solid ${source === opt.id ? '#40826d' : '#e9eae8'}`,
                  background: source === opt.id ? '#f0f8f4' : '#ffffff', cursor: 'pointer',
                  fontFamily: 'inherit', textAlign: 'left',
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{opt.icon}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>{opt.title}</div>
                    <div style={{ fontSize: 13, color: '#6f7f7b', marginTop: 2 }}>{opt.sub}</div>
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
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 16 }}>Check the score</div>
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
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#6f7f7b', marginBottom: 8 }}>Harbour Rovers</div>
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
                    <input type="time" defaultValue="10:00" style={{ width: '100%', height: 40, borderRadius: 10, border: '1px solid #e9eae8', padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: '#10211f', background: '#ffffff', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#6f7f7b', marginBottom: 6 }}>Half-time</div>
                    <input type="time" defaultValue="10:35" style={{ width: '100%', height: 40, borderRadius: 10, border: '1px solid #e9eae8', padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: '#10211f', background: '#ffffff', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Sync players */}
      {step === 2 && (
        <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '32px' }}>
            <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Sync vests and boots</h2>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: '#6f7f7b' }}>Match each player to what they were wearing so the camera can track them.</p>

            <div style={{ background: '#ffffff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 0, borderBottom: '1px solid #e9eae8' }}>
                {['Player', 'Vest', 'Boots', ''].map(h => (
                  <div key={h} style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#6f7f7b', letterSpacing: '0.03em', textTransform: 'uppercase' }}>{h}</div>
                ))}
              </div>
              {SYNC_PLAYERS.map((p, i) => (
                <div key={p.ini} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 0, borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', alignItems: 'center', padding: '10px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{p.name}</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#10211f' }}>{p.vest}</div>
                  <div style={{ fontSize: 13, color: '#4a5a57' }}>{p.boots}</div>
                  <div>
                    {p.syncStatus === 'synced' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#2f6252', background: '#e4f2eb', borderRadius: 6, padding: '3px 8px' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        Synced
                      </span>
                    ) : (
                      <button style={{ height: 28, padding: '0 10px', borderRadius: 6, border: '1px solid #e9eae8', background: '#f7f8f7', color: '#10211f', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Sync now</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: 280, flex: 'none', borderLeft: '1px solid #e9eae8', background: '#ffffff', padding: '24px 20px', overflowY: 'auto' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 16 }}>Sync summary</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Synced',   value: String(SYNC_PLAYERS.filter(p => p.syncStatus === 'synced').length),   color: '#40826d' },
                { label: 'Waiting',  value: String(SYNC_PLAYERS.filter(p => p.syncStatus === 'waiting').length),  color: '#c39797' },
              ].map(s => (
                <div key={s.label} style={{ background: '#f7f9f7', borderRadius: 12, padding: '14px' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px', background: '#fdf8f4', border: '1px solid #f0dcc8', borderRadius: 10, padding: '10px 12px' }}>
              You can proceed with unsynchronised players — Clean Sheet will attempt to auto-match them from the footage.
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Who's who */}
      {step === 3 && (
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '32px' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Who's who?</h2>
          <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6f7f7b' }}>Confirm which player appears in each clip. The AI has suggested names — tap to correct.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {WHO_CARDS.map((card, i) => (
              <div key={i} style={{ background: '#ffffff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e9eae8' }}>
                {/* Video thumbnail */}
                <div style={{ height: 160, background: card.thumb, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '999px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                  </div>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 8 }}>Frame {card.frame}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {card.players.map(name => (
                      <button key={name} style={{ height: 28, padding: '0 10px', borderRadius: '999px', border: 0, background: '#e4f2eb', color: '#2f6252', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{name}</button>
                    ))}
                  </div>
                  <button style={{ marginTop: 10, width: '100%', height: 32, borderRadius: 8, border: '1px dashed #c5c8c4', background: '#f7f8f7', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer' }}>+ Add another player</button>
                </div>
              </div>
            ))}
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
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Analysing your game…</div>
              <div style={{ fontSize: 14, color: '#6f7f7b', marginTop: 6 }}>This takes about 3–5 minutes. You can close this and come back.</div>
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
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: s.done ? '#40826d' : s.pct > 0 ? '#2f6252' : '#c5c8c4' }}>{s.done ? '✓' : s.pct > 0 ? `${s.pct}%` : '—'}</span>
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
        <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
            <div style={{ maxWidth: 440 }}>
              <div style={{ width: 64, height: 64, borderRadius: '999px', background: '#e4f2eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f', marginBottom: 8 }}>Game added</div>
              <div style={{ fontSize: 15, color: '#4a5a57', lineHeight: '22px', marginBottom: 24 }}>
                Wattle Creek 2 – 1 Harbour Rovers is in your library. Clips and stats will be ready within 5 minutes.
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={onClose} style={{ height: 44, padding: '0 20px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>View clips</button>
                <button onClick={onClose} style={{ height: 44, padding: '0 20px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back to training</button>
              </div>
            </div>
          </div>

          <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', background: '#ffffff', padding: '24px 20px', overflowY: 'auto' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 16 }}>Data quality</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {DATA_QUALITY.map(d => (
                <div key={d.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{d.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#2f6252' }}>{d.value}</span>
                  </div>
                  <ProgressBar pct={d.pct} color={d.pct >= 90 ? '#40826d' : '#c39797'} />
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
