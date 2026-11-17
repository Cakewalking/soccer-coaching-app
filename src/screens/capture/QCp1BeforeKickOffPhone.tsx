// QCp1 · Coach phone: before kick-off. Four checks and what today will give.
// Each check opens its step. Skipping never blocks recording.

import { Mark, Ico, IC, G, INK, MUT, LINE, PALE, DARK, cap, label } from './marks'
import { useCapture, measures, quality, GROUND, SQUAD, type Age } from './captureStore'

export default function QCp1BeforeKickOffPhone({ onNav = () => {}, age = 'juniors' }: { onNav?: (s: string) => void; age?: Age }) {
  const s = useCapture()
  const m = measures(s, age), q = quality(s, age)
  const part = (word: string, n: number) => n >= SQUAD ? word : `${word} · ${n} of ${SQUAD}`
  const chips = [
    { k: m.events.mark, t: 'Passes and shots' },
    { k: m.distance.mark, t: part('Distance', q.vests) },
    { k: m.touches.mark, t: part('Touches', q.boots) },
    { k: m.positions.mark, t: 'Positions' },
    { k: m.speed.mark, t: 'Top speed' },
  ]
  const saved = s.grounds[GROUND]
  const guideOpen = (['halfway', 'high', 'corners'] as const).filter(k => !s.guide[k]).length
  const checks = [
    { id: 'QC3-PitchCheck', t: 'Pitch', d: s.pitchDone || saved ? `Saved for this ground. ${s.length} × ${s.width} m` : `We found ${q.cornersFound} of 4 corners`, done: s.pitchDone || !!saved },
    { id: 'QC4-SetUpGuide', t: 'Camera and vests', d: `${guideOpen ? 'Camera not placed yet' : 'On halfway, high'}. ${s.guide.vestsOn ? '3 vests flat' : 'Vests are off'}`, done: guideOpen === 0 },
    { id: 'QC5-WhoIsWho', t: 'Who is who', d: q.shirtClash ? 'Two players in shirt 7' : `${SQUAD} players confirmed`, done: s.whoDone && !q.shirtClash },
    { id: 'QC6-TestResult', t: 'Ten-second test', d: s.test === 'none' ? 'Not done yet' : s.test === 'cut' ? 'Far left corner is cut off' : 'Whole pitch in the picture', done: s.test === 'clear' },
  ]
  const next = checks.findIndex(c => !c.done)
  const nextBtn = next < 0 ? null : next === 2 && q.shirtClash ? 'Sort shirt 7' : next === 3 ? 'Run the test' : `Check ${checks[next].t.toLowerCase()}`
  return (
    <div data-screen="QCp1-BeforeKickOffPhone" style={{ width: 390, minHeight: 844, margin: '0 auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', background: '#f4f5f3', color: INK, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <header style={{ flex: 'none', padding: '10px 16px 14px', display: 'flex', flexDirection: 'column', gap: 2, background: G, color: '#fff' }}>
        <button onClick={() => onNav('CPh1-CoachPhoneHome')} style={{ alignSelf: 'flex-start', minHeight: 44, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: '#fff', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}><Ico d={IC.back} size={16} sw={2.4} />Home</button>
        <h1 style={{ margin: 0, fontSize: 24, lineHeight: '30px', letterSpacing: '-0.02em' }}>Before kick-off</h1>
        <span style={{ fontSize: 14, lineHeight: '20px', color: '#dcefe8' }}>U12 Sam v Harbour Rovers · 9:30 am · pitch 2</span>
      </header>
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12, flexGrow: 1 }}>
        <section aria-label="What today will measure" style={{ borderRadius: 16, background: DARK, color: '#fff', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#a9cfc0' }}>TODAY YOU WILL GET</span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{chips.map(c => <Mark key={c.t} kind={c.k} label={c.t} />)}</span>
          <button onClick={() => onNav('QC10-HowWeMeasure')} style={{ alignSelf: 'flex-start', minHeight: 44, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: '#fff', background: 'none', border: 0, padding: 0, textDecoration: 'underline', cursor: 'pointer' }}>What the marks mean</button>
        </section>
        <main style={{ borderRadius: 16, background: '#fff', border: `1px solid ${LINE}`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <span style={{ ...label, padding: '10px 14px 8px', color: INK }}>Four checks · about 2 minutes</span>
          {checks.map((c, i) => (
            <button key={c.id} onClick={() => onNav(c.id)} style={{ minHeight: 60, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', fontFamily: 'inherit', color: INK, background: i === next ? PALE : '#fff', border: 0, borderTop: `1px solid ${LINE}`, cursor: 'pointer' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, background: c.done ? G : '#fff', color: c.done ? '#fff' : INK, border: c.done ? 0 : i === next ? `2px solid ${G}` : `1.5px solid ${LINE}` }}>{c.done ? <Ico d={IC.tick} size={14} sw={3} /> : i + 1}</span>
              <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 16, lineHeight: '21px' }}>{c.t}</strong><span style={{ fontSize: 13, lineHeight: '18px', color: MUT }}>{c.d}</span></span>
              <Ico d={IC.chev} size={18} sw={2.4} />
            </button>
          ))}
        </main>
      </div>
      <div style={{ ...cap, padding: '0 16px 8px' }}><span style={{ fontSize: 13 }}>Skip a check and we still record. The number it affects is marked “Estimate”.</span></div>
      <div style={{ padding: '0 16px 16px', display: 'flex', gap: 8 }}>
        <button onClick={() => onNav('QC7-LiveQuality')} style={{ flex: nextBtn ? '0 0 150px' : 1, height: 52, borderRadius: 10, border: `1px solid ${nextBtn ? LINE : G}`, background: nextBtn ? '#fff' : G, color: nextBtn ? INK : '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Record now</button>
        {nextBtn && <button onClick={() => onNav(checks[next].id)} style={{ flex: 1, height: 52, borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>{nextBtn}</button>}
      </div>
    </div>
  )
}
