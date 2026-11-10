import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const TRIALISTS = [
  { name: 'Hayley Brooks', pos: 'Centre back · 22', ball: 4, game: 4, effort: 5, suggestion: 'Offer a spot' },
  { name: 'Mei Wong', pos: 'Midfield · 19', ball: 5, game: 4, effort: 4, suggestion: 'Offer a spot' },
  { name: 'Tara Singh', pos: 'Winger · 17 · from U18 elsewhere', ball: 4, game: 3, effort: 4, suggestion: 'Train with us' },
  { name: 'Kate O\'Neill', pos: 'Keeper · 24', ball: 3, game: 3, effort: 4, suggestion: 'Not this time' },
  { name: 'Lena Fischer', pos: 'Striker · 20', ball: 4, game: 5, effort: 4, suggestion: 'Offer a spot' },
]

export default function FT1Trials(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Players' ? 700 : 500, color: tab === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Trials</div>
            <div style={{ fontSize: 13, color: MUT }}>Run trials, score players, and send offers kindly</div>
          </div>
          <button onClick={() => t('Set up trial form would open.')} style={{ height: 40, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Set up a trial</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Women's 1sts trial · Tue 2 Jun · 14 came · 5 shown · scored by Steph and 2 coaches</div>

            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 60px 60px 60px 1fr 120px', fontSize: 11, fontWeight: 700, color: MUT, padding: '10px 16px', background: PALE }}>
                {['Player', 'Ball', 'Game', 'Effort', 'Suggestion', ''].map(h => <div key={h}>{h}</div>)}
              </div>
              {TRIALISTS.map((p, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 60px 60px 60px 1fr 120px', padding: '10px 16px', borderBottom: `1px solid ${LN}`, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: MUT }}>{p.pos}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>{p.ball}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>{p.game}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>{p.effort}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: p.suggestion === 'Not this time' ? MUT : G }}>{p.suggestion}</div>
                  <button onClick={() => t(`Reply sent kindly to ${p.name.split(' ')[0]}.`)} style={{ height: 32, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Reply</button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 12, color: MUT }}>Every player hears back, using the club's kind message. Scores are never shared.</div>
              <button onClick={() => t('14 replies sent kindly.')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Send 14 replies</button>
            </div>
          </div>

          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>Talent days</div>
              <div style={{ fontSize: 13, color: MUT, marginBottom: 8 }}>Football Victoria talent days ask clubs to nominate juniors.</div>
              {[
                ['Nominated', '4 players'],
                ['Parent said yes', '3 of 4'],
                ['Born Jul–Dec', '1 of 4'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ fontSize: 12, color: MUT }}>{k}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{v}</div>
                </div>
              ))}
              <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Younger players in a year get picked less. Each trial list shows birth month so they aren't missed.</div>
            </div>

            <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 2 }}>Next trial</div>
              <div style={{ fontSize: 13, color: GD }}>U13 Division 1 squads · Sun 27 Sep</div>
            </div>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
