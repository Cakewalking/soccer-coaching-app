const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const SECTION1 = ['Brave dribbling', 'Lots of shots', 'Passing to a friend', 'Getting back to help', 'Everyone had fun']
const SECTION2 = ['Find space', 'Use both feet', 'Look up', 'Keep going after a mistake']
const SECTION3 = ['Poppy', 'Arlo', 'Jude', 'Nobody this week']
const SELECTED1 = new Set(['Brave dribbling', 'Passing to a friend'])
const SELECTED2 = new Set(['Find space'])
const SELECTED3 = new Set(['Arlo'])

function Chip({ label, on }: { label: string; on: boolean }) {
  return (
    <div style={{ minHeight: 48, padding: '0 16px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 15, fontWeight: 700, cursor: 'pointer', background: on ? G : '#fff', color: on ? '#fff' : INK, border: on ? 'none' : `1px solid #c5c8c4` }}>{label}</div>
  )
}

export default function HM5WhatWeSaw(_: { onBack?: () => void }) {
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 64 }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: t === 'Game day' ? '#40826d' : 'transparent', color: t === 'Game day' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center' }}>U9 Tom · Wattle Creek</div>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: INK }}>TA</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {['Turns', 'Fixtures', 'Record'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: t === 'Turns' ? INK : MUT, borderBottom: t === 'Turns' ? `3px solid #40826d` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700 }}>Coach · MiniRoos</div>
        </div>
      </div>

      <div style={{ padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>What we saw</h1>
          <span style={{ fontSize: 14, color: MUT }}>Sat 6 Jun v Northgate City · no score kept · 30 seconds</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Back to turns</button>
          <button style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Save and thank the parents</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0, 1fr) 320px' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>1 · What went well?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {SECTION1.map(l => <Chip key={l} label={l} on={SELECTED1.has(l)} />)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>2 · What's next?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {SECTION2.map(l => <Chip key={l} label={l} on={SELECTED2.has(l)} />)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>3 · Who needs a hand?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {SECTION3.map(l => <Chip key={l} label={l} on={SELECTED3.has(l)} />)}
            </div>
          </div>
          <div style={{ marginTop: 'auto', fontSize: 14, color: MUT }}>Tuesday's four games are picked from what you tap here. Nothing is scored and no child is rated.</div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>What happens with this</div>
          {[
            { n: '1', label: "Tuesday's games",   note: 'One game on finding space' },
            { n: '2', label: 'Arlo',               note: 'A reminder to show him each game first' },
            { n: '3', label: 'Parents',            note: 'A thank-you with one thing the team did well' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: `1px solid ${LN}` }}>
              <div style={{ width: 30, height: 30, borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: MUT }}>{item.note}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', fontSize: 14, color: MUT, paddingTop: 8 }}>Turns in goal and as captain were saved from the game timer.</div>
        </div>
      </div>
    </div>
  )
}
