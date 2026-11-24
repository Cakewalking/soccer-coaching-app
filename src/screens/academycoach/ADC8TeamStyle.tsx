// ADC8-TeamStyle: the coach's own version of the academy's style for their game team, as eight tiles.
// The aim on every tile can be moved. A tile that is not core can be swapped; a core one never can.
// Each tile says where it came from: Academy, Aim changed, Yours, or Core with a lock.
// Reset goes back to the academy's set and keeps the reasons. The owner is told; she does not approve.

import { useState } from 'react'
import { demoToast } from '../demoToast'
import { ACADEMY, aimText, moveAim, resetToAcademy, startAdd, startSwap, useTeamStyle, type Measure } from './teamStyle'
import { G, HAIR, INK, LINE, MAUVE_PALE, MUT, PALE, cap, tile } from './styles'

const SAND = '#f3ecdf', SAND_EDGE = '#e2d6bd'
const h2 = { margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 700, letterSpacing: '-0.01em' } as const
const step = { flex: 1, height: 44, borderRadius: 12, border: `1px solid ${LINE}`, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK, fontFamily: 'inherit', fontSize: 20, fontWeight: 700, cursor: 'pointer', padding: 0 } as const
const pill = { height: 44, padding: '0 18px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' } as const
const link = { border: 0, padding: 0, background: 'transparent', color: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', minHeight: 44, margin: '-12px 0' } as const

type From = 'Core' | 'Yours' | 'Aim changed' | 'Academy'
const from = (m: Measure): From => m.core ? 'Core' : m.academy === null ? 'Yours' : m.aim !== m.academy ? 'Aim changed' : 'Academy'
const LOOK: Record<From, { bg: string; edge: string; chip: string }> = {
  'Core': { bg: '#ffffff', edge: INK, chip: INK }, 'Yours': { bg: PALE, edge: '#cfe3da', chip: '#cfe3da' },
  'Aim changed': { bg: SAND, edge: SAND_EDGE, chip: SAND_EDGE }, 'Academy': { bg: '#ffffff', edge: LINE, chip: LINE },
}
const count = (n: number, one: string, many: string, none: string) => n === 0 ? none : `${n} ${n === 1 ? one : many}`

// "Is the aim right?": each aim beside the team's season number. Higher is better except for seconds.
const SEASON = [
  { measure: 'Goal kicks played short', short: 'Goal kicks short', season: 61, unit: '%', lowerIsBetter: false, tint: PALE },
  { measure: 'Weaker-foot touches', short: 'Weaker-foot touches', season: 14, unit: '%', lowerIsBetter: false, tint: MAUVE_PALE },
  { measure: 'Seconds to win it back', short: 'Seconds to win it back', season: 5, unit: ' s', lowerIsBetter: true, tint: SAND },
]
function verdict(season: number, aim: number, unit: string, lowerIsBetter: boolean) {
  const gap = lowerIsBetter ? season - aim : aim - season
  const a = `${aim}${unit}`
  return gap <= 0 ? `Your aim of ${a} is in reach` : gap <= (unit === '%' ? 4 : 1) ? `Close to ${a}` : `An aim of ${a} is a stretch`
}

export default function ADC8TeamStyle({ go }: { go: (id: string) => void }) {
  const { measures, reasons } = useTeamStyle()
  const [academyView, setAcademyView] = useState(false)   // "See the academy's": the owner's eight, to compare, with nothing to press
  const shown = academyView ? ACADEMY : measures
  const core = measures.filter(m => m.core).length
  const changed = measures.filter(m => m.academy !== null && m.aim !== m.academy).length
  const own = measures.filter(m => m.academy === null).length

  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)" }}>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <section aria-label="Result" style={{ flex: 'none', borderRadius: 18, background: '#1c3a33', color: '#ffffff', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <strong style={{ flex: 'none', fontSize: 44, lineHeight: '48px', letterSpacing: '-0.03em', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{measures.length - core} + {core}</strong>
          <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 19, lineHeight: '24px' }}>U13 Timber’s style</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#cfe6dc' }}>{measures.length - core} measures from Tall Timber · {count(changed, 'aim changed', 'aims changed', 'no aims changed')} · {count(own, 'of your own', 'of your own', 'none of your own')} · {core} core</span>
          </span>
          <button aria-current={academyView ? 'false' : 'page'} onClick={() => setAcademyView(false)} style={{ ...pill, ...(academyView ? { background: '#ffffff', color: INK, border: `1px solid ${LINE}` } : { background: G, color: '#ffffff', border: `1px solid ${G}` }) }}>Our style</button>
          <button aria-current={academyView ? 'page' : 'false'} onClick={() => { setAcademyView(true); demoToast('The academy’s eight measures and aims, to compare.') }} style={{ ...pill, ...(academyView ? { background: G, color: '#ffffff', border: `1px solid ${G}` } : { background: '#ffffff', color: INK, border: `1px solid ${LINE}` }) }}>See the academy’s</button>
          <button onClick={() => { resetToAcademy(); setAcademyView(false); demoToast('Back to the academy’s eight measures and aims. Your reasons are kept.') }} style={{ ...pill, padding: '0 16px', background: 'transparent', border: '1px solid #ffffff', color: '#ffffff' }}>Reset</button>
        </section>

        <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12 }}>
          <section aria-label="What we count, and our aims" style={{ ...tile, gap: 10, padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h2 style={h2}>What we count, and our aims</h2>
              <span style={{ display: 'flex', gap: 16 }}>
                <button onClick={() => { startAdd(); go('ADC9-PickMeasure') }} style={link}>Add a measure</button>
                <button onClick={() => go('RC8-HowWeMeasure')} style={link}>How each is counted</button>
              </span>
            </div>
            <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gridTemplateRows: 'repeat(2, minmax(0,1fr))', gap: 10 }}>
              {shown.map((m, i) => {
                const f = from(m), look = LOOK[f]
                return (
                  <div key={m.name} style={{ display: 'flex', flexDirection: 'column', gap: 6, borderRadius: 16, padding: '12px 14px', background: look.bg, border: `1px solid ${look.edge}`, minHeight: 0 }}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ fontSize: 13, lineHeight: '17px', fontWeight: 700, minHeight: 34 }}>{m.name}</span>
                      <span style={{ flex: 'none', height: 22, padding: '0 8px', borderRadius: 999, background: '#ffffff', border: `1px solid ${look.chip}`, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {f === 'Core' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 11V8a5 5 0 0110 0v3M6 11h12v9H6z" /></svg>}
                        {f}
                      </span>
                    </span>
                    <strong style={{ fontSize: 30, lineHeight: '34px', letterSpacing: '-0.02em', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{aimText(m.unit, m.aim)}</strong>
                    <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>
                      {m.academy === null ? 'your own' : m.core && m.aim === m.academy ? 'core' : `academy ${aimText(m.unit, m.academy)}`}
                    </span>
                    {!academyView && (
                      <span style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                        <button aria-label={`Lower the aim for ${m.name}`} onClick={() => { moveAim(i, false); demoToast('Aim down one step.') }} style={step}>−</button>
                        <button aria-label={`Raise the aim for ${m.name}`} onClick={() => { moveAim(i, true); demoToast('Aim up one step.') }} style={step}>+</button>
                        {/* A core measure has no Swap: a coach can never remove or swap it. */}
                        {!m.core && <button aria-label={`Swap ${m.name}`} onClick={() => { startSwap(i); go('ADC9-PickMeasure') }} style={{ ...step, flex: 1.6, fontSize: 14 }}>Swap</button>}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
            <span style={cap}>Move any aim. Swap or add any measure that isn’t core. Changes start from the next game; earlier reviews keep the aims they had.</span>
          </section>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <section aria-label="Your reasons" style={{ ...tile, gap: 4, padding: '12px 14px' }}>
              <h2 style={h2}>Your reasons</h2>
              {reasons.map(r => (
                <div key={r.about} style={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 64, borderTop: `1px solid ${HAIR}`, justifyContent: 'center' }}>
                  <strong style={{ fontSize: 14, lineHeight: '18px' }}>{r.about}</strong>
                  <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>“{r.why}”</span>
                </div>
              ))}
              <span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>One line each. Dani sees them. She is told, she doesn’t approve.</span>
            </section>
            <section aria-label="Is the aim right?" style={{ ...tile, gap: 4, padding: '12px 14px', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h2 style={h2}>Is the aim right?</h2>
                <button onClick={() => go('ADC7-GameReview')} style={link}>Last game</button>
              </div>
              {SEASON.map(s => {
                const m = measures.find(x => x.name === s.measure)
                if (!m) return null   // swapped out: nothing to compare
                return (
                  <button key={s.short} onClick={() => go('ADC7-GameReview')} style={{ border: 0, padding: 0, background: 'transparent', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: `1px solid ${HAIR}`, color: INK }}>
                    <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: s.tint, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{s.season}</span>
                    <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: 14, lineHeight: '18px' }}>{s.short}</strong>
                      <span style={{ fontSize: 12, lineHeight: '16px', color: MUT }}>Season {s.season}{s.unit}. {verdict(s.season, m.aim, s.unit, s.lowerIsBetter)}</span>
                    </span>
                  </button>
                )
              })}
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
