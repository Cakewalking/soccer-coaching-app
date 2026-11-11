import { useState } from 'react'
import { TOURS, type RoleId, type TourStep } from './tours'

interface FlatStep extends TourStep {
  sectionTitle: string
  globalIdx: number
}

function flattenSteps(roleId: RoleId): FlatStep[] {
  const tour = TOURS[roleId]
  const result: FlatStep[] = []
  tour.sections.forEach(section => {
    section.steps.forEach(step => {
      result.push({ ...step, sectionTitle: section.title, globalIdx: result.length })
    })
  })
  return result
}

function StepCard({ step, globalIdx, total }: { step: FlatStep; globalIdx: number; total: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 48 }}>
      <div style={{ maxWidth: 480, background: '#fff', borderRadius: 24, border: '1px solid #c5c8c4', padding: '40px 44px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 12 }}>Step {globalIdx + 1} of {total} · {step.sectionTitle}</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: '#10211f', margin: '0 0 16px' }}>{step.label}</h2>
        <p style={{ fontSize: 15, color: '#4a5a57', lineHeight: '1.6', margin: 0 }}>{step.caption}</p>
      </div>
    </div>
  )
}

interface Props {
  roleId: RoleId
  onBack: () => void
  renderScreen: (screenKey: string) => React.ReactNode
  initialStep?: number
  onStepChange?: (step: number) => void
}

export default function DemoTourShell({ roleId, onBack, renderScreen, initialStep, onStepChange }: Props) {
  const tour = TOURS[roleId]
  const steps = flattenSteps(roleId)
  const [idx, setIdx] = useState(initialStep ?? 0)

  function goStep(n: number) { setIdx(n); onStepChange?.(n) }

  const step = steps[idx]
  const isFirst = idx === 0
  const isLast  = idx === steps.length - 1

  const sectionIndexForStep = (i: number) => {
    let acc = 0
    for (let si = 0; si < tour.sections.length; si++) {
      acc += tour.sections[si].steps.length
      if (i < acc) return si
    }
    return tour.sections.length - 1
  }

  const currentSection = sectionIndexForStep(idx)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'var(--font-sans)', background: '#f5f6f4', overflow: 'hidden' }}>

      {/* Top bar */}
      <div style={{ flex: 'none', background: '#1f4a3e', height: 48, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16, zIndex: 10 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.65)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: 0, flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          All roles
        </button>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)', flex: 'none' }} />
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tour.roleLabel}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', flexShrink: 0 }}>{idx + 1} / {steps.length}</div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Sidebar */}
        <div style={{ flex: 'none', width: 256, background: '#10211f', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden' }}>
          <div style={{ padding: '16px 16px 8px' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: '1.4' }}>{tour.persona}</div>
          </div>
          {tour.sections.map((section, si) => {
            const sectionStartIdx = tour.sections.slice(0, si).reduce((acc, s) => acc + s.steps.length, 0)
            const isCurrentSection = si === currentSection
            return (
              <div key={si}>
                <div style={{ padding: '12px 16px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: isCurrentSection ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)' }}>
                  {section.title}
                </div>
                {section.steps.map((s, stepI) => {
                  const globalStepIdx = sectionStartIdx + stepI
                  const isCurrent = globalStepIdx === idx
                  const isPast = globalStepIdx < idx
                  return (
                    <button
                      key={stepI}
                      onClick={() => goStep(globalStepIdx)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '7px 16px',
                        border: 0, background: isCurrent ? 'rgba(255,255,255,0.1)' : 'transparent',
                        textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                        borderLeft: isCurrent ? '2px solid #40826d' : '2px solid transparent',
                      }}
                    >
                      <div style={{ width: 20, height: 20, borderRadius: '999px', flex: 'none', background: isCurrent ? '#40826d' : isPast ? 'rgba(255,255,255,0.15)' : 'transparent', border: isCurrent ? 0 : isPast ? 0 : '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isPast && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        )}
                        {isCurrent && (
                          <div style={{ width: 7, height: 7, borderRadius: '999px', background: '#fff' }} />
                        )}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: isCurrent ? 700 : 400, color: isCurrent ? '#fff' : isPast ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.65)', lineHeight: '1.3' }}>
                        {s.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            )
          })}
          <div style={{ flex: 1, minHeight: 24 }} />
        </div>

        {/* Content area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

          {/* Screen or step card */}
          <div style={{ flex: 1, overflow: 'auto', position: 'relative', background: tour.device === 'phone' ? '#e8e9e7' : '#fff' }}>
            {step.screen
              ? tour.device === 'phone'
                ? (
                  <div key={step.screen} style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 80px' }}>
                    {renderScreen(step.screen)}
                  </div>
                )
                : (
                  <div key={step.screen} style={{ height: '100%', paddingBottom: 72 }}>
                    {renderScreen(step.screen)}
                  </div>
                )
              : <StepCard key={idx} step={step} globalIdx={idx} total={steps.length} />
            }
          </div>

          {/* Caption bar */}
          <div style={{ flex: 'none', position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(16,33,31,0.92)', backdropFilter: 'blur(8px)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>{step.sectionTitle} · {step.label}</div>
              <div style={{ fontSize: 14, color: '#fff', lineHeight: '1.5' }}>{step.caption}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
              <button onClick={() => goStep(Math.max(0, idx - 1))} disabled={isFirst} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: isFirst ? 'rgba(255,255,255,0.3)' : '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: isFirst ? 'default' : 'pointer' }}>← Prev</button>
              {isLast
                ? <button onClick={onBack} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Done</button>
                : <button onClick={() => goStep(Math.min(steps.length - 1, idx + 1))} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Next →</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
