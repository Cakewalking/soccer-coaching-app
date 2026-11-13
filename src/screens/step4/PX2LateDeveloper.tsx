import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type AreaState = 'Looks right' | 'Worth a talk' | 'Needs a view'
const AREA_COLORS: Record<AreaState, { bg: string; color: string }> = {
  'Looks right': { bg: PALE, color: G },
  'Worth a talk': { bg: '#fffbeb', color: '#92400e' },
  'Needs a view': { bg: '#fef2f2', color: '#991b1b' },
}

export default function PX2LateDeveloper({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const areas = [
    { title: 'Size in this group', state: 'Worth a talk' as AreaState, detail: 'Eli is 148 cm. The U14 middle is 162 cm. He is in the lower 15% for this team.', bar: 0.18, label: 'Lower 15%', source: 'Monthly height log' },
    { title: 'Duels won', state: 'Worth a talk' as AreaState, detail: 'Winning 31% of duels. The team middle is 51%. Last month was 38% — a drop.', bar: 0.31, label: '31%', source: 'GPS · 12 games' },
    { title: 'Sprint distance', state: 'Looks right' as AreaState, detail: 'Sprint distance is in the top third for his team. His speed is not affected.', bar: 0.72, label: 'Upper 30%', source: 'GPS · 12 games' },
    { title: 'Football skill', state: 'Looks right' as AreaState, detail: 'Pass completion 78%, forward passes 71%. His technical level is ahead of most.', bar: 0.78, label: 'Upper 20%', source: 'GPS · 12 games' },
    { title: 'Head', state: 'Needs a view' as AreaState, detail: 'Coach has not yet logged a check-in this month. Last note was 6 weeks ago.', bar: null, label: 'No recent check-in', source: 'Coach notes' },
    { title: 'Settling in', state: 'Looks right' as AreaState, detail: 'Eli told his coach he enjoys training. Family says he looks forward to Thursdays.', bar: null, label: 'Positive', source: 'Coach note · family' },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Players' ? 700 : 500, color: t === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={onBack} style={{ fontSize: 13, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Playing across</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Eli Ward · U14 Josh</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button onClick={() => st('Opening coach view.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Ask coach</button>
          <button onClick={() => st('Opening parent conversation.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Start a conversation</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px 32px', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Eli Ward</div>
            <div style={{ fontSize: 13, color: MUT }}>U14 Josh · Born March 2012 · Growing later than most of his year · Worth a talk</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {areas.map(a => {
              const col = AREA_COLORS[a.state]
              return (
                <div key={a.title} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: INK, flex: 1 }}>{a.title}</div>
                    <div style={{ height: 24, padding: '0 10px', borderRadius: 999, background: col.bg, color: col.color, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center' }}>{a.state}</div>
                  </div>
                  <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 10 }}>{a.detail}</div>
                  {a.bar !== null && (
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ background: '#e8edeb', borderRadius: 999, height: 6, position: 'relative', overflow: 'visible' }}>
                        <div style={{ position: 'absolute', left: '25%', right: '25%', top: 0, height: 6, background: '#c0d4cd', borderRadius: 999 }} />
                        <div style={{ position: 'absolute', left: `${a.bar * 100}%`, top: -3, width: 12, height: 12, borderRadius: '50%', background: G, border: '2px solid #fff', transform: 'translateX(-6px)' }} />
                      </div>
                      <div style={{ fontSize: 11, color: G, marginTop: 4, fontWeight: 600 }}>{a.label}</div>
                    </div>
                  )}
                  {a.bar === null && (
                    <div style={{ fontSize: 11, fontWeight: 600, color: a.state === 'Looks right' ? G : '#92400e' }}>{a.label}</div>
                  )}
                  <div style={{ fontSize: 11, color: MUT, marginTop: 4 }}>{a.source}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Suggestion</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#92400e', marginBottom: 6 }}>Worth a talk</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>His physical challenge is real. His football is good. Have a quiet conversation with Eli and his family first — before anything changes.</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Who decides</div>
            {[
              { who: 'Director', what: 'Starts the conversation' },
              { who: 'Head coach', what: 'Must agree' },
              { who: 'Eli', what: 'Must want to try' },
              { who: 'Family', what: 'Must be on board' },
            ].map(r => (
              <div key={r.who} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 80, fontSize: 12, fontWeight: 700, color: INK }}>{r.who}</div>
                <div style={{ fontSize: 12, color: MUT }}>{r.what}</div>
              </div>
            ))}
          </div>

          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 6 }}>Not a failure</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Late growth is normal. It is not a talent problem. The goal is one night a week where the game feels like his game again.</div>
          </div>

          <button onClick={() => st('Opening check-in notes.')} style={{ height: 36, borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Check-in notes (1)</button>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
