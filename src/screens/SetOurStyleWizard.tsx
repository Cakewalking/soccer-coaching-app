import { useState } from 'react'

type Step = 'intro' | 1 | 2 | 3 | 4 | 5 | 'review' | 'saved'

type StepNum = 1 | 2 | 3 | 4 | 5

interface StyleAnswers {
  s1: string | null  // possession
  s2: string | null  // press
  s3: string | null  // win it
  s4: string | null  // lose it
  s5: string[]       // extras
}

const TOPICS = [
  { icon: '⚽', title: 'Possession',  sub: 'How we keep and move it' },
  { icon: '🛡',  title: 'Defending',  sub: 'Where we win it back' },
  { icon: '⚡', title: 'Transitions', sub: 'What we do first' },
  { icon: '🌟', title: 'Extras',      sub: 'Values and priorities' },
]

const STEP_TITLES: Record<StepNum, string> = {
  1: 'How do we keep and move it?',
  2: 'Where do we win it back?',
  3: 'What do we do first — when we win it?',
  4: 'What do we do first — when we lose it?',
  5: 'Anything else?',
}

const STEP_OPTIONS: Record<StepNum, Array<{ id: string; title: string; sub: string; measures: string[] }>> = {
  1: [
    { id: 'keep',   title: 'Keep the ball',       sub: 'Patient build-up, control the tempo',  measures: ['Pass completion %', 'Possession %', 'Ball retention'] },
    { id: 'build',  title: 'Build from the back', sub: 'Play through the thirds with purpose',  measures: ['Build-up efficiency', 'Progressive passes', 'GK distribution'] },
    { id: 'direct', title: 'Get forward fast',    sub: 'Direct, positive transitions',           measures: ['Forward passes %', 'Directness', 'Time to chance'] },
  ],
  2: [
    { id: 'high',    title: 'Press high',              sub: 'Win it back in their half',         measures: ['High press %', 'PPDA', 'Defensive actions / 90'] },
    { id: 'mid',     title: 'Hold a compact middle',   sub: 'Stay in shape, force errors',       measures: ['Mid-block wins', 'Defensive compactness', 'Challenges won %'] },
    { id: 'protect', title: 'Protect our goal',        sub: 'Deep block, win duels',              measures: ['Blocks', 'Clearances', 'Goals conceded'] },
  ],
  3: [
    { id: 'counter', title: 'Counter-attack',    sub: 'Win it, play forward immediately',        measures: ['Transition speed', 'Counter chances', 'Direct goals'] },
    { id: 'keep2',   title: 'Keep it first',     sub: 'Secure possession before moving',         measures: ['Turn possession %', 'Passes after win', 'Recycled possessions'] },
  ],
  4: [
    { id: 'press2',  title: 'Win it straight back', sub: 'Immediate counter-press',               measures: ['Counter-press recoveries', 'Seconds to press', 'Turnover-to-win %'] },
    { id: 'drop',    title: 'Drop back into shape', sub: 'Recover quickly, hold structure',       measures: ['Recovery sprints', 'Shape hold %', 'Transition goals conceded'] },
  ],
  5: [
    { id: 'equal',   title: 'Equal minutes',        sub: 'Everyone gets roughly the same time on the pitch', measures: [] },
    { id: 'ball',    title: 'Everyone on the ball',  sub: 'Every player touches the ball in every phase',     measures: [] },
    { id: 'feet',    title: 'Use both feet',         sub: 'Encourage non-dominant foot passing',              measures: [] },
    { id: 'newpos',  title: 'Try new positions',     sub: 'Rotate players through unfamiliar roles',          measures: [] },
  ],
}

const REVIEW_TARGETS: Record<string, Array<{ metric: string; target: string; delta: string }>> = {
  keep:    [{ metric: 'Possession %',    target: '55 %', delta: '+8' }, { metric: 'Pass completion', target: '80 %', delta: '+5' }],
  build:   [{ metric: 'Progressive passes', target: '20 / game', delta: '+6' }, { metric: 'GK distribution', target: '70 %', delta: '+12' }],
  direct:  [{ metric: 'Forward passes %', target: '40 %', delta: '+9' }, { metric: 'Time to chance', target: '< 6s', delta: '−2s' }],
  high:    [{ metric: 'PPDA', target: '< 10', delta: '−3' }, { metric: 'High press %', target: '35 %', delta: '+14' }],
  mid:     [{ metric: 'Defensive compactness', target: '70 %', delta: '+11' }, { metric: 'Challenges won', target: '60 %', delta: '+7' }],
  protect: [{ metric: 'Goals conceded', target: '< 1.2 / game', delta: '−0.6' }, { metric: 'Clearances', target: '12 / game', delta: '+3' }],
  counter: [{ metric: 'Counter chances', target: '3 / game', delta: '+2' }, { metric: 'Transition speed', target: '< 4s', delta: '−1.5s' }],
  keep2:   [{ metric: 'Recycled possessions', target: '70 %', delta: '+9' }],
  press2:  [{ metric: 'Counter-press recoveries', target: '5 / game', delta: '+3' }],
  drop:    [{ metric: 'Shape hold %', target: '75 %', delta: '+10' }],
}

function getMetrics(answers: StyleAnswers): Array<{ metric: string; target: string; delta: string }> {
  const ids = [answers.s1, answers.s2, answers.s3, answers.s4].filter(Boolean) as string[]
  const out: Array<{ metric: string; target: string; delta: string }> = []
  for (const id of ids) {
    if (REVIEW_TARGETS[id]) out.push(...REVIEW_TARGETS[id])
  }
  return out
}

function getLabel(step: StepNum, id: string | null): string {
  if (!id) return '—'
  return STEP_OPTIONS[step].find(o => o.id === id)?.title ?? '—'
}

export default function SetOurStyleWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>('intro')
  const [answers, setAnswers] = useState<StyleAnswers>({ s1: null, s2: null, s3: null, s4: null, s5: [] })

  function choose(stepNum: StepNum, id: string) {
    if (stepNum <= 4) {
      const key = `s${stepNum}` as keyof StyleAnswers
      setAnswers(a => ({ ...a, [key]: id }))
    }
  }

  function toggleExtra(id: string) {
    setAnswers(a => ({
      ...a,
      s5: a.s5.includes(id) ? a.s5.filter(x => x !== id) : [...a.s5, id],
    }))
  }

  function next() {
    if (step === 'intro') setStep(1)
    else if (step === 1)  setStep(2)
    else if (step === 2)  setStep(3)
    else if (step === 3)  setStep(4)
    else if (step === 4)  setStep(5)
    else if (step === 5)  setStep('review')
    else if (step === 'review') setStep('saved')
    else onClose()
  }

  function back() {
    if (step === 1)        setStep('intro')
    else if (step === 2)   setStep(1)
    else if (step === 3)   setStep(2)
    else if (step === 4)   setStep(3)
    else if (step === 5)   setStep(4)
    else if (step === 'review') setStep(5)
  }

  const progressPct = step === 'intro' ? 0 : step === 1 ? 20 : step === 2 ? 40 : step === 3 ? 60 : step === 4 ? 80 : step === 5 ? 100 : step === 'review' ? 100 : 100

  // Intro screen
  if (step === 'intro') {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#1f4a3e', zIndex: 100, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 24, right: 32, width: 40, height: 40, borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.12)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div style={{ maxWidth: 540, padding: '0 32px', textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '999px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 32 }}>⚽</div>
          <h1 style={{ margin: '0 0 12px', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff', lineHeight: '36px' }}>How do you want your team to play?</h1>
          <p style={{ margin: '0 0 32px', fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: '24px' }}>
            Answer 5 quick questions and we'll set targets across four areas of the game — trackable from your very first match.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32, textAlign: 'left' }}>
            {TOPICS.map(t => (
              <div key={t.title} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>{t.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{t.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button onClick={next} style={{ height: 48, padding: '0 32px', borderRadius: '999px', border: 0, background: '#c3e6d4', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
              Set our style
            </button>
            <button onClick={onClose} style={{ height: 48, padding: '0 24px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#ffffff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              Use a balanced default
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Saved screen
  if (step === 'saved') {
    const metrics = getMetrics(answers)
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#1f4a3e', zIndex: 100, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 480, padding: '0 32px', textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '999px', background: '#c3e6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1f4a3e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h1 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>Your style is saved</h1>
          <p style={{ margin: '0 0 28px', fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: '22px' }}>
            We've set your targets. You'll see how you're tracking after each game.
          </p>

          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, marginBottom: 28, textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>Your targets</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(metrics.length > 0 ? metrics : [{ metric: 'Balanced play', target: 'Default', delta: '—' }]).slice(0, 5).map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{m.metric}</span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#c3e6d4' }}>{m.target}</span>
                    <span style={{ fontSize: 12, color: '#a3c9b6' }}>{m.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={onClose} style={{ height: 48, padding: '0 32px', borderRadius: '999px', border: 0, background: '#c3e6d4', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  // Review screen
  if (step === 'review') {
    const metrics = getMetrics(answers)
    const choiceRows = [
      { label: 'Possession',   val: getLabel(1, answers.s1) },
      { label: 'Pressing',     val: getLabel(2, answers.s2) },
      { label: 'Win it →',     val: getLabel(3, answers.s3) },
      { label: 'Lose it →',    val: getLabel(4, answers.s4) },
      { label: 'Extras',       val: answers.s5.length > 0 ? answers.s5.map(id => STEP_OPTIONS[5].find(o => o.id === id)?.title ?? id).join(', ') : 'None' },
    ]
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#f7f9f7', zIndex: 100, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        {/* Header */}
        <div style={{ flex: 'none', background: '#1f4a3e', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={back} style={{ width: 40, height: 40, borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.12)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>Here's your style</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>Review and confirm</div>
          </div>
          <button onClick={next} style={{ height: 44, padding: '0 24px', borderRadius: '999px', border: 0, background: '#c3e6d4', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>Save style</button>
        </div>

        {/* Body */}
        <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left: choices */}
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '28px 32px' }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: '#10211f' }}>Your choices</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {choiceRows.map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
                  <div style={{ width: 110, fontSize: 13, fontWeight: 700, color: '#6f7f7b' }}>{row.label}</div>
                  <div style={{ flexGrow: 1, fontSize: 15, fontWeight: 700, color: '#10211f' }}>{row.val}</div>
                  <button onClick={back} style={{ height: 44, padding: '0 10px', borderRadius: 6, border: '1px solid #e9eae8', background: '#f7f8f7', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Change</button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: targets */}
          <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', background: '#ffffff', padding: '28px 20px', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#10211f' }}>Your targets</h2>
            {metrics.length === 0 && <div style={{ fontSize: 13, color: '#6f7f7b' }}>Make selections to see targets.</div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {metrics.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', gap: 8 }}>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{m.metric}</div>
                    <div style={{ fontSize: 12, color: '#6f7f7b' }}>Target: {m.target}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#2f6252', background: '#e4f2eb', borderRadius: 6, padding: '2px 7px' }}>{m.delta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Question steps 1–5
  const sn = step as StepNum
  const opts = STEP_OPTIONS[sn]
  const selectedVal = sn === 5 ? null : answers[`s${sn}` as keyof StyleAnswers] as string | null
  const isMulti = sn === 5

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#f7f9f7', zIndex: 100, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ flex: 'none', background: '#1f4a3e' }}>
        <div style={{ padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={back} style={{ width: 40, height: 40, borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.12)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>Set our style</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>Question {sn} of 5</div>
          </div>
          <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.12)', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div style={{ padding: '0 32px 10px' }}>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
            <div style={{ height: '100%', background: '#c3e6d4', borderRadius: 2, width: `${progressPct}%`, transition: 'width 0.5s' }} />
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
            {([1,2,3,4,5] as StepNum[]).map(s => (
              <div key={s} style={{ flex: 1, fontSize: 11, fontWeight: 700, letterSpacing: '0.03em', color: s === sn ? '#c3e6d4' : s < sn ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)', textAlign: 'center', paddingBottom: 4 }}>{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '28px 32px' }}>
        <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>{STEP_TITLES[sn]}</h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6f7f7b' }}>
          {isMulti ? 'Select all that apply.' : 'Choose one approach for your team.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: opts.length <= 2 ? '1fr 1fr' : opts.length === 4 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 14 }}>
          {opts.map(opt => {
            const selected = isMulti ? answers.s5.includes(opt.id) : selectedVal === opt.id
            return (
              <button key={opt.id} onClick={() => isMulti ? toggleExtra(opt.id) : choose(sn, opt.id)} style={{
                display: 'flex', flexDirection: 'column', gap: 8, padding: '20px', borderRadius: 16, textAlign: 'left',
                border: `2px solid ${selected ? '#40826d' : '#e9eae8'}`,
                background: selected ? '#f0f8f4' : '#ffffff', cursor: 'pointer',
                fontFamily: 'inherit', position: 'relative',
              }}>
                {selected && (
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 22, height: 22, borderRadius: '999px', background: '#40826d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
                <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', lineHeight: '22px', paddingRight: selected ? 28 : 0 }}>{opt.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{opt.sub}</div>
                {opt.measures.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 4 }}>
                    {opt.measures.map(m => (
                      <span key={m} style={{ fontSize: 11, fontWeight: 600, color: '#2f6252', background: '#e4f2eb', borderRadius: 5, padding: '2px 7px' }}>{m}</span>
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ flex: 'none', padding: '16px 32px', borderTop: '1px solid #e9eae8', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={back} style={{ height: 44, padding: '0 20px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </button>
        <button onClick={next} disabled={!isMulti && selectedVal === null} style={{
          height: 44, padding: '0 24px', borderRadius: '999px', border: 0,
          background: (!isMulti && selectedVal === null) ? '#c5c8c4' : '#2f6252',
          color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
          cursor: (!isMulti && selectedVal === null) ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          opacity: (!isMulti && selectedVal === null) ? 0.6 : 1,
        }}>
          {sn === 5 ? 'Review' : 'Next'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  )
}
