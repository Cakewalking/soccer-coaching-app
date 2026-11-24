// Capture quality: the container. Holds which step is open, passes each screen
// the saved state, and hands anything that is not a QC screen to the app it sits in.
//
// REC1 "A game" -> QC1 -> QC3 -> QC4 -> QC5 -> QC6 -> QC7 -> "Stop and save" -> QC8 -> R1.
// Every step can be skipped. Skipping never blocks recording.

import { useState, type ReactNode } from 'react'
import { useCapture, noKit, type Age } from './captureStore'
import { NarrowCtx, QC1CapturePlan, QC1eCapturePlanNoKit, QC2CaptureChoices, QC3PitchCheck, QC4SetUpGuide, QC5WhoIsWho, QC6TestResult, QC7LiveQuality, QC8QualityReport, QC9MeasureConfidence, type ScreenProps } from './CaptureScreens'
import QC10HowWeMeasure from './QC10HowWeMeasure'
import { Ico, G, INK, MUT, LINE, PALE } from './marks'

export const QC_IDS = ['QC1-CapturePlan', 'QC1e-CapturePlanNoKit', 'QC2-CaptureChoices', 'QC3-PitchCheck', 'QC4-SetUpGuide', 'QC5-WhoIsWho', 'QC6-TestResult', 'QC7-LiveQuality', 'QC8-QualityReport', 'QC9-MeasureConfidence', 'QC10-HowWeMeasure']
/** True for an id this flow shows itself (with or without a "#src3" part). */
export const isCaptureId = (s: string) => QC_IDS.includes(s.split('#')[0])
/** Which Record sub-tab a step sits under: 0 Record, 1 Recorded lately, 3 How we measure. */
export const captureSubTab = (id: string) => id.startsWith('QC10') ? 3 : id.startsWith('QC8') || id.startsWith('QC9') ? 1 : 0

const SCREENS: Record<string, (p: ScreenProps) => ReactNode> = {
  'QC1-CapturePlan': p => <QC1CapturePlan {...p} />, 'QC1e-CapturePlanNoKit': p => <QC1eCapturePlanNoKit {...p} />,
  'QC2-CaptureChoices': p => <QC2CaptureChoices {...p} />, 'QC3-PitchCheck': p => <QC3PitchCheck {...p} />,
  'QC4-SetUpGuide': p => <QC4SetUpGuide {...p} />, 'QC5-WhoIsWho': p => <QC5WhoIsWho {...p} />,
  'QC6-TestResult': p => <QC6TestResult {...p} />, 'QC7-LiveQuality': p => <QC7LiveQuality {...p} />,
  'QC8-QualityReport': p => <QC8QualityReport {...p} />, 'QC9-MeasureConfidence': p => <QC9MeasureConfidence {...p} />,
}

const NAV = [
  ['Home', 'T1-TabletTraining', 'M4 11l8-7 8 7v9H4z'], ['Squad', 'T4-SquadTab', 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5'],
  ['Training', 'T3-TrainingTab', 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4'], ['Match day', 'T2-TabletMatch', 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z'],
  ['Clips', 'C1-ClipsTab', 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z'], ['Record', 'REC1-RecordHub', 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z'],
]
const SUBS: [string, string][] = [['Record', 'REC1-RecordHub'], ['Recorded lately', 'REC2-RecordSaved'], ['Devices', 'SET4-Devices'], ['How we measure', 'QC10-HowWeMeasure']]

/** The designed coach frame, for when the flow is shown on its own (not inside a coach app). */
function Shell({ sub, go, children }: { sub: number; go: (s: string) => void; children: ReactNode }) {
  return (
    <div style={{ width: 1180, minHeight: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', background: '#faf5ec', fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <header style={{ flex: 'none', height: 64, background: G, display: 'flex', alignItems: 'center', gap: 4, padding: '0 28px' }}>
        <strong style={{ color: '#fff', fontSize: 20, letterSpacing: '-0.02em', marginRight: 14 }}>Clean Sheet</strong>
        {NAV.map(([l, to, d]) => <button key={l} onClick={() => go(to)} aria-current={l === 'Record' ? 'page' : undefined} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, border: 0, background: l === 'Record' ? '#40826d' : 'transparent', color: '#e9eae8', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}><Ico d={d} size={20} />{l}</button>)}
        <span style={{ flexGrow: 1 }} />
        <button onClick={() => go('VS1-SwitchView')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: 0, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>U12 Sam · Wattle Creek <Ico d="M6 9l6 6 6-6" size={16} sw={2.4} /></button>
        <span style={{ width: 44, height: 44, borderRadius: 999, background: '#e8cfcf', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, marginLeft: 12 }}>SK</span>
      </header>
      <nav aria-label="Record" style={{ flex: 'none', height: 44, background: '#fff', borderBottom: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', gap: 24, padding: '0 28px' }}>
        {SUBS.map(([l, to], i) => <button key={l} onClick={() => go(to)} aria-current={i === sub ? 'page' : undefined} style={{ height: 44, padding: '0 4px', border: 0, borderBottom: `3px solid ${i === sub ? G : 'transparent'}`, boxSizing: 'border-box', background: 'none', color: i === sub ? INK : MUT, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>{l}</button>)}
        <span style={{ flexGrow: 1 }} />
        <span style={{ height: 30, padding: '0 12px', borderRadius: 999, background: PALE, color: G, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700 }}><Ico d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0" size={14} sw={2.4} />Head coach</span>
      </nav>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  )
}

export default function CaptureFlow({ step, onStep, start = 'QC1-CapturePlan', onNav, framed, narrow, age = 'juniors', team = 'U12 Sam', kitless }: {
  /** On a phone: one column, no stepper. */
  narrow?: boolean
  /** Controlled: the id to show (may carry "#src3"). Leave out and the flow keeps its own. */
  step?: string; onStep?: (id: string) => void; start?: string
  /** Anything that is not a QC screen: REC1, R1, SET4, P1, FB1, YT1 … */
  onNav?: (s: string) => void
  framed?: boolean; age?: Age; team?: string
  /** No camera and no vests are paired for this team (a new sandbox team, say). */
  kitless?: boolean
}) {
  const s = useCapture()
  const [own, setOwn] = useState(start)
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(t => t === m ? null : t), 3200) }
  const at = step ?? own
  const go = (target: string) => {
    if (isCaptureId(target)) { if (onStep) onStep(target); if (step === undefined) setOwn(target); return }
    onNav?.(target)
  }
  let [id, hash] = at.split('#')
  const empty = kitless || noKit(s)
  if (id === 'QC1-CapturePlan' && empty) id = 'QC1e-CapturePlanNoKit'
  const source = hash?.startsWith('src') ? Number(hash.slice(3)) : undefined
  const body = id === 'QC10-HowWeMeasure'
    ? <QC10HowWeMeasure source={source} say={say} go={go} />
    : (SCREENS[id] ?? SCREENS['QC1-CapturePlan'])({ s, go, say, age, team })
  const inner = (
    <>
      {body}
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 620, zIndex: 60, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}><Ico d="M5 12l5 5 9-10" size={20} sw={2.6} /><span>{toast}</span></div>}
    </>
  )
  if (narrow) return <NarrowCtx.Provider value>{inner}</NarrowCtx.Provider>
  return framed ? <Shell sub={captureSubTab(id)} go={go}>{inner}</Shell> : inner
}
