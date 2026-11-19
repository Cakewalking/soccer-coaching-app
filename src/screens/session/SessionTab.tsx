import LearnCourse from '../learn/LearnCourse'
import { useSandbox } from '../sandbox/SandboxContext'
// The justified session: one entry point for the coach's screens and the director's sources.
// Gives each its saved state and a confirmation line, and keeps "which part is open" between GS1 and GS2.

import { useState } from 'react'
import { Ico } from '../capture/marks'
import { useSession } from './sessionStore'
import type { TeamKey } from './sessionEngine'
import { GS1ProposedSession, GS2DrillWhy, GS3RunSheet, GS4ResizeAttendance, GS5CoachLevel, GS6NothingToGoOn, GS7SeasonLookBack, type GsProps } from './SessionScreens'
import GS11DrillSources from './GS11DrillSources'

const SCREENS: Record<string, (p: GsProps) => React.ReactNode> = {
  'GS1-ProposedSession': p => <GS1ProposedSession {...p} />, 'GS2-DrillWhy': p => <GS2DrillWhy {...p} />, 'GS3-RunSheet': p => <GS3RunSheet {...p} />, 'GS4-ResizeAttendance': p => <GS4ResizeAttendance {...p} />,
  'GS5-CoachLevel': p => <GS5CoachLevel {...p} />, 'GS6-NothingToGoOn': p => <GS6NothingToGoOn {...p} />, 'GS7-SeasonLookBack': p => <GS7SeasonLookBack {...p} />, 'GS8-WelcomeCourse': p => <LearnCourse s={p.s} k={p.k} go={p.go} say={p.say} isNew={p.isNew} />,   // Learn to coach replaces the list of films
  'GS11-DrillSources': p => <GS11DrillSources {...p} />,
}
/** The course's own pages (LN1 to LN8 and the lessons) all live under Learn to coach. */
export const isLearnId = (id: string) => /^LN(\d|L\d)/.test(id) && !id.startsWith('LN9')
export const isSessionId = (id: string) => id in SCREENS || isLearnId(id)
/** Which Training tab a session screen sits under. GS2, GS5 and GS6 open on the first tab. */
export const SESSION_TAB: Record<string, number> = { 'GS1-ProposedSession': 0, 'GS2-DrillWhy': 0, 'GS5-CoachLevel': 0, 'GS6-NothingToGoOn': 0, 'GS3-RunSheet': 1, 'GS4-ResizeAttendance': 2, 'GS7-SeasonLookBack': 3 }

let openPart = 1   // the part "Why this" was pressed on; kept across the move from GS1 to GS2
export default function SessionTab({ id, team = 'u12', onNav, onStart }: { id: string; team?: TeamKey; onNav?: (s: string) => void; onStart?: () => void }) {
  const s = useSession()
  const [part, setPartState] = useState(openPart)
  const [toast, setToast] = useState<string | null>(null)
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(t => t === m ? null : t), 3200) }
  const inSandbox = useSandbox().active
  const render = isLearnId(id) ? (p: GsProps) => <LearnCourse key={id} s={p.s} k={p.k} go={p.go} say={p.say} start={id} isNew={p.isNew} /> : SCREENS[id]
  if (!render) return null
  return (
    <>
      {render({ s, k: team, isNew: inSandbox, go: t => onNav?.(t), say, part, start: onStart, setPart: i => { openPart = i; setPartState(i) } })}
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', maxWidth: 620, zIndex: 60, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, lineHeight: '21px', fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}><Ico d="M5 12l5 5 9-10" size={20} sw={2.6} /><span>{toast}</span></div>}
    </>
  )
}
