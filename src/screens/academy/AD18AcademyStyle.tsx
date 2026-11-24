// AD18-AcademyStyle: Academy owner, Curriculum: the academy's playing style as eight measures with aims,
// which ones every team keeps, and how much say the coach of a game team has.
// Built by hand from the board in the academy handover (v5 of the academy, 24 Nov), because its controls change what is on screen:
// the aim steps up and down, a measure switches between Core and Coach can swap, and one of three settings is chosen.
// Nothing is saved: a reload shows the board as drawn.
import { useState, type CSSProperties } from 'react'
import { demoToast } from '../demoToast'
import { S } from './adStyles'
import Tap from './Tap'

// One measure. `aim` is a number; `step` is how far one press moves it; `show` writes it as the board does.
type Measure = { name: string; why: string; aim: number; step: number; min: number; max: number; show: (n: number) => string; core: boolean }
const pct = (n: number) => `${n}%+`
const MEASURES: Measure[] = [
  { name: 'Goal kicks played short',          why: 'Building from the back',     aim: 70, step: 5, min: 5, max: 100, show: pct,                 core: false },
  { name: 'Wins in their half',               why: 'Winning it high',            aim: 10, step: 1, min: 1, max: 40,  show: n => `${n}+`,       core: false },
  { name: 'Shots inside 10 s of a win',       why: 'Going quickly after a win',  aim: 2,  step: 1, min: 1, max: 20,  show: n => `${n}+`,       core: false },
  { name: 'Their passes before we challenge', why: 'Pressing together',          aim: 10, step: 1, min: 2, max: 30,  show: n => `under ${n}`,  core: false },
  { name: 'Seconds to win it back',           why: 'Reacting to losing it',      aim: 4,  step: 1, min: 1, max: 20,  show: n => `${n} s`,      core: false },
  { name: 'Won back inside 6 s',              why: 'Reacting to losing it',      aim: 40, step: 5, min: 5, max: 100, show: pct,                 core: false },
  { name: 'Minutes shared evenly',            why: 'Every child plays',          aim: 16, step: 1, min: 1, max: 16,  show: n => n === 16 ? 'all 16' : `${n} of 16`, core: true },
  { name: 'Weaker-foot touches',              why: 'Two-footed players',         aim: 20, step: 5, min: 5, max: 100, show: pct,                 core: true },
]

// How much say the coach of a game team has. The second is the default.
const SAY = [
  { name: 'Aims only',         note: 'Coaches move the numbers. The eight measures stay yours.' },
  { name: 'Aims and measures', note: 'Coaches can swap any measure that isn’t core, and add their own.' },
  { name: 'It’s their team',   note: 'Your style is a starting point. Only the core stays.' },
]

const cols = 'minmax(0,1.5fr) 170px 150px'
const stepBtn: CSSProperties = { flex: 'none', width: 44, height: 44, borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10211f', fontSize: 20, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', padding: 0 }

export default function AD18AcademyStyle() {
  const [aims, setAims] = useState(() => MEASURES.map(m => m.aim))
  const [core, setCore] = useState(() => MEASURES.map(m => m.core))
  const [say, setSay] = useState(1)
  const cores = core.filter(Boolean).length

  function step(i: number, by: -1 | 1) {
    const m = MEASURES[i]
    setAims(a => a.map((v, j) => j === i ? Math.min(m.max, Math.max(m.min, v + by * m.step)) : v))
    demoToast(by < 0 ? 'Aim down one step.' : 'Aim up one step.')
  }
  function keep(i: number) {
    const on = !core[i]
    setCore(c => c.map((v, j) => j === i ? on : v))
    demoToast(`${MEASURES[i].name}: every team keeps it: turned ${on ? 'on' : 'off'}.`)
  }
  function choose(i: number) { setSay(i); demoToast(`${SAY[i].name}. Coaches are told.`) }

  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Our style</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>How Tall Timber teams try to play · used by teams that play games: U13 Timber</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="StyleFlow" style={S.more}>Start again from a ready-made style</Tap>
          <Tap to="ADC9-PickMeasure" style={S.primary}>Add a measure</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px' }}>
        <section aria-label="Eight measures" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Eight measures</h2>
            <span style={S.cap}>{cores} core · {MEASURES.length - cores} a coach can swap</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            <span style={S.th}>What we count</span>
            <span style={S.th}>Our aim</span>
            <span style={S.th}>Every team keeps it</span>
          </div>
          {MEASURES.map((m, i) => (
            <div key={m.name} style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, alignItems: 'center', minHeight: 60, boxSizing: 'content-box', borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f' }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>{m.name}</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{m.why}</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <button type="button" aria-label={`Lower the aim: ${m.name}`} disabled={aims[i] <= m.min} onClick={() => step(i, -1)} style={{ ...stepBtn, opacity: aims[i] <= m.min ? 0.45 : 1 }}>−</button>
                <strong aria-live="polite" style={{ ...S.num, minWidth: 66, textAlign: 'center', fontSize: 17, whiteSpace: 'nowrap' }}>{m.show(aims[i])}</strong>
                <button type="button" aria-label={`Raise the aim: ${m.name}`} disabled={aims[i] >= m.max} onClick={() => step(i, 1)} style={{ ...stepBtn, opacity: aims[i] >= m.max ? 0.45 : 1 }}>+</button>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button type="button" role="switch" aria-checked={core[i]} aria-label={`${m.name}: every team keeps it`} onClick={() => keep(i)} style={{ flex: 'none', width: 52, height: 44, display: 'flex', alignItems: 'center', border: 0, padding: 0, background: 'transparent', cursor: 'pointer' }}>
                  <span style={{ width: 52, height: 30, borderRadius: 999, background: core[i] ? '#2f6252' : '#8a9794', position: 'relative', display: 'block' }}>
                    <span style={{ position: 'absolute', top: 3, left: core[i] ? 25 : 3, width: 24, height: 24, borderRadius: 999, background: '#ffffff' }} />
                  </span>
                </button>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{core[i] ? 'Core' : 'Coach can swap'}</span>
              </span>
            </div>
          ))}
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Core measures stay in every team’s review. A coach can still move the aim on a core measure, never remove it.</span>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section aria-label="How much say coaches have" style={{ ...S.tile, gap: 8 }}>
            <h2 style={S.h2}>How much say coaches have</h2>
            <div role="radiogroup" aria-label="How much say coaches have" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SAY.map((s, i) => {
                const on = i === say
                return (
                  <button key={s.name} type="button" role="radio" aria-checked={on} onClick={() => choose(i)} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left', borderRadius: 14, padding: on ? '9px 11px' : '10px 12px', color: '#10211f', fontFamily: 'inherit', cursor: 'pointer', background: on ? '#eef5f2' : '#ffffff', border: on ? '2px solid #2f6252' : '1px solid #c5c8c4' }}>
                    <span style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, boxSizing: 'border-box', marginTop: 2, border: on ? '7px solid #2f6252' : '2px solid #8a9794', background: '#ffffff' }} />
                    <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: 15, lineHeight: '20px' }}>{s.name}</strong>
                      <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{s.note}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
          <section aria-label="What coaches changed" style={{ ...S.tile, gap: 2, flexGrow: 1, borderTop: '4px solid #c39797' }}>
            <h2 style={S.h2}>What Reece changed</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8' }}>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Goal kicks short: 70% down to 60%</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>“We’re small. Going long sometimes is smart.”</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: '1px solid #e9eae8' }}>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Swapped in: switches of play</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>For shots inside 10 s of a win</span>
              </span>
            </div>
            <Tap to="ACC13-AcademyChat" style={{ ...S.more, alignSelf: 'flex-start', marginTop: 8 }}>Talk to Reece</Tap>
            <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>You are told, with the coach’s reason. You don’t approve each change.</span>
          </section>
        </div>
      </main>
    </>
  )
}
