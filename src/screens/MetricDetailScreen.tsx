import { useState } from 'react'

interface Props { onClose: () => void }

const BAR_DATA = [3,5,2,8,4,9,6,7,3,5,8,7,4,6,9,12,8,5,7,6,4,8,10,7,5,9,6,8,4,7,11]

export default function MetricDetailScreen({ onClose }: Props) {
  const target = 4
  const maxBar = Math.max(...BAR_DATA)
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f7f9f7', fontFamily: 'var(--font-sans)' }}>
      {/* Breadcrumb */}
      <div style={{ flex: 'none', padding: '12px 32px', borderBottom: '1px solid #e9eae8', background: '#ffffff', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', padding: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Where we're at
        </button>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span style={{ fontSize: 14, color: '#10211f', fontWeight: 600 }}>Seconds to win the ball back</span>
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '28px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6f7f7b', marginBottom: 4 }}>When we lose it · From our style</div>
              <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: '#10211f' }}>Seconds to win the ball back</h1>
            </div>
            <div style={{ display: 'flex', gap: 24, flex: 'none', textAlign: 'right' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6f7f7b', marginBottom: 2 }}>Saturday vs Ironbark</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#c39797', letterSpacing: '-0.02em' }}>7 s</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6f7f7b', marginBottom: 2 }}>Our target</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#40826d', letterSpacing: '-0.02em' }}>4 s</div>
              </div>
            </div>
          </div>

          {/* What it means */}
          <div style={{ background: '#ffffff', borderRadius: 16, padding: '20px 24px', border: '1px solid #e9eae8', marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>What it means</div>
            <p style={{ margin: 0, fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>
              How long it takes us to get the ball back after we lose it in open play. Lower is better: it means the team presses together straight away.
            </p>
          </div>

          {/* Bar chart */}
          <div style={{ background: '#ffffff', borderRadius: 16, padding: '20px 24px', border: '1px solid #e9eae8', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Every time we lost it on Saturday</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>{BAR_DATA.length} times · tap a bar for the clip</div>
            </div>
            <div style={{ position: 'relative', height: 140 }}>
              {/* Target line */}
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: `${(target / maxBar) * 110 + 16}px`, borderTop: '1.5px dashed #40826d', zIndex: 1 }}>
                <span style={{ position: 'absolute', right: 4, top: -18, fontSize: 11, color: '#40826d', fontWeight: 700 }}>Target {target}s</span>
              </div>
              {/* Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: '100%', paddingBottom: 16 }}>
                {BAR_DATA.map((v, i) => (
                  <div key={i} title={`${v}s`} style={{
                    flex: 1, borderRadius: '3px 3px 0 0', cursor: 'pointer',
                    height: `${(v / maxBar) * 110}px`,
                    background: v <= target ? '#40826d' : v <= target + 3 ? '#c3e6d4' : '#c39797',
                    minWidth: 6,
                  }}/>
                ))}
              </div>
              {/* X labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6f7f7b' }}>
                <span>Kick-off</span>
                <span>Half-time</span>
                <span>Full time</span>
              </div>
            </div>
            {/* Bottom clip link */}
            <div style={{ marginTop: 12, padding: '10px 12px', background: '#f7f9f7', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => st('Playing clip.')} style={{ width: 44, height: 44, borderRadius: '999px', border: 0, background: '#10211f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              </button>
              <div style={{ flexGrow: 1, fontSize: 13, color: '#10211f' }}>
                <strong>Min 15 · 12 seconds</strong> — one player pressed, the rest watched
              </div>
              <button onClick={() => st('Opening all 4 clips.')} style={{ fontSize: 13, fontWeight: 600, color: '#2f6252', border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>All 4 clips</button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', background: '#ffffff', padding: '28px 20px', overflowY: 'auto' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>How we worked it out</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              'The match camera follows the ball and which team has it.',
              'Each time we lose it in open play, a clock starts.',
              'The clock stops when one of our players has the ball again.',
              'We average all 31 times: 7.2 seconds, shown as 7 s.',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '999px', background: '#2f6252', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57', paddingTop: 1 }}>{step}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Left out</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {[
              'Set pieces, and times the ball went out of play.',
              'Times we lost it in their box, where pressing isn\'t the plan.',
              'Minutes 41 to 45, when the camera lost the ball.',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>
                <span style={{ color: '#c39797', flex: 'none', marginTop: 1 }}>○</span>
                {item}
              </div>
            ))}
          </div>

          <div style={{ background: '#f7f9f7', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#2f6252' }}>Solid</span>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px', marginTop: 4 }}>From 57 of 60 minutes of clear camera view.</div>
          </div>

          <button onClick={() => st('Opening report.')} style={{ width: '100%', height: 44, borderRadius: 10, border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>
            Something look wrong? Report it
          </button>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
