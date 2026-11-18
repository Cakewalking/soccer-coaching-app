import { openThing } from '../openThing'
// XGp1 · Parent phone: how the team played, in plain words.
// The team, never one child. Shown only where the child's age band has
// "Show team numbers to families" on.

import { useState } from 'react'
import { Mark, Ico, G, INK, MUT, LINE, DARK, tile } from '../capture/marks'
import { useCapture, allowed, AGE_LABEL, type Age } from '../capture/captureStore'
import { CHANCES, satGame } from './chanceData'

export interface ParentChances { team: string; child: string; band: Age; made: number; given: number; noResult: boolean; how: [string, number][] }
/** The designed board: Ella, in the under-11s (U11 Luke, by the club's naming). */
export const ELLA_U11: ParentChances = { team: 'U11 Luke', child: 'Ella', band: 'u10', made: 2.4, given: 1.2, noResult: true, how: [['From wide, then a cut-back', 4], ['Through the middle', 2], ['Winning it back high', 2]] }

/** The demo parent's own child: Mia, U12 Sam. Numbers are Saturday's game, from the same data the coach sees. */
export function miaU12(): ParentChances {
  const t = CHANCES.u12, n = satGame(t)
  return { team: t.name, child: 'Mia', band: t.band, made: n.xg, given: n.xga, noResult: false, how: t.sat.how.map(h => [h.t, h.n]) }
}

export default function XGp1ChancesParent({ data = ELLA_U11, onNav = () => {}, initials = 'PB' }: { data?: ParentChances; onNav?: (s: string) => void; initials?: string }) {
  const s = useCapture()
  const [toast, setToast] = useState<string | null>(null)
  const may = allowed(s, data.band).families
  const better = data.made > data.given, max = Math.max(data.made, data.given, 3)
  const from = AGE_LABEL[data.band][0].split(',')[0].replace('U', 'under ')
  const bar = (label: string, v: number, strong: boolean) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}><span>{label}</span><strong>about {v.toFixed(1)}</strong></span>
      <span style={{ height: 12, borderRadius: 999, background: '#e9eae8', overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${(v / max) * 100}%`, borderRadius: 999, background: strong ? G : '#93b8a9' }} /></span>
    </div>
  )
  return (
    <div data-screen="XGp1-ChancesParent" style={{ width: 390, minHeight: 844, margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', background: '#f7f8f7', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <header style={{ flex: 'none', background: G, color: '#fff', padding: '10px 12px 14px', display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={() => onNav('STO17-HomeStoryParent')} aria-label="Back" style={{ flex: 'none', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 0, color: '#fff', cursor: 'pointer' }}><Ico d="M15 18l-6-6 6-6" size={20} sw={2.4} /></button>
        <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 12, color: '#dcefe8' }}>{data.team} · Saturday</span><h1 style={{ margin: 0, fontSize: 22, lineHeight: '27px', letterSpacing: '-0.02em' }}>How the team played</h1></span>
        <button onClick={() => onNav('ASKp2-PhoneAskOpen')} aria-label="Ask Clean Sheet" style={{ flex: 'none', width: 44, height: 44, borderRadius: 999, border: '1.5px solid #a9cfc0', background: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ico d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" size={20} /></button>
        <span style={{ flex: 'none', width: 44, height: 44, borderRadius: 999, background: '#cbbeb5', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, marginLeft: 6 }}>{initials}</span>
      </header>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {may ? <>
          <section aria-label="In short" style={{ borderRadius: 16, background: DARK, color: '#fff', padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#a9cfc0' }}>THE TEAM, NOT ONE CHILD</span>
            <strong style={{ fontSize: 20, lineHeight: '26px', letterSpacing: '-0.01em' }}>{better ? 'They made more and better chances than the other team.' : 'The other team made more and better chances this time.'}</strong>
            <span style={{ fontSize: 14, lineHeight: '20px', color: '#a9cfc0' }}>That is what the coach has been working on.{data.noResult ? ' No result is kept at this age.' : ''}</span>
          </section>
          <section aria-label="Chances in the game" style={{ ...tile, padding: '14px 16px', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><strong style={{ fontSize: 16 }}>Chances in the game</strong><Mark kind="estimate" label="A best reading" /></div>
            {bar(`Made by ${data.child}’s team`, data.made, true)}
            {bar('Made by the other team', data.given, false)}
            <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>Worth in goals, from where each shot was taken.</span>
          </section>
          <section aria-label="How they made them" style={{ ...tile, padding: '12px 16px 4px', gap: 0 }}>
            <strong style={{ fontSize: 16, paddingBottom: 4 }}>How they made them</strong>
            {data.how.map(([t, n], i) => <div key={t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 40, borderTop: i ? `1px solid ${LINE}` : undefined, fontSize: 14 }}><span>{t}</span><strong>{n}</strong></div>)}
          </section>
          <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>There are no numbers here for one child. Your club chose to show the team’s chances to families from {from}.</span>
        </> : (
          <section aria-label="Not shown" style={{ ...tile, padding: '18px 16px', gap: 6 }}>
            <strong style={{ fontSize: 17 }}>Your club does not show team numbers at this age</strong>
            <span style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>You still get {data.child}’s clip of the week and a note from the coach.</span>
          </section>
        )}
      </div>
      <div style={{ flex: 'none', borderTop: `1px solid ${LINE}`, padding: '10px 14px 16px', display: 'flex', gap: 8 }}>
        {may && <button onClick={() => onNav('QC10-HowWeMeasure')} style={{ flex: 1, height: 48, borderRadius: 10, border: `1px solid ${LINE}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>What this means</button>}
        <button onClick={() => { openThing(`${data.child}’s clip`, 'coach'); setTimeout(() => setToast(null), 3000) }} style={{ flex: 1.2, height: 48, borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{data.child}’s clip of the week</button>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 84, transform: 'translateX(-50%)', zIndex: 60, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
