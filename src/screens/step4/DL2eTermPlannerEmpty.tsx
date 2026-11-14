import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function DL2eTermPlannerEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U12 Sam · Wattle Creek</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Training' ? 700 : 500, color: t === 'Training' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Head coach</div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['Tonight\'s session', 'This week', 'Term planner', 'Drill library', 'Growth and load', 'Record'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Term planner' ? 700 : 500, color: t === 'Term planner' ? G : MUT, borderBottom: t === 'Term planner' ? `2px solid ${G}` : '2px solid transparent', height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
      </div>

      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <div style={{ maxWidth: 480, textAlign: 'center' as const }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: INK, marginBottom: 8 }}>No term set yet</div>
          <div style={{ fontSize: 15, color: MUT, lineHeight: 1.6, marginBottom: 24 }}>Tell us your training nights and Clean Sheet lays out the term: two weeks on each core skill, as the national curriculum suggests.</div>
          <button style={{ height: 48, padding: '0 28px', borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 32 }} onClick={() => st('Opening training night setup.')}>Add training nights</button>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', textAlign: 'left' as const }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>What you'll see</div>
            {[
              ['Two-week blocks', 'One core skill each'],
              ['Each session drafted', 'Game, teach, game'],
              ['Changed by what happens', "Saturday's game shifts the focus"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: G, flex: 'none' }}>
                  {['1','2','3'][[['Two-week blocks', 'One core skill each'], ['Each session drafted', 'Game, teach, game'], ['Changed by what happens', "Saturday's game shifts the focus"]].findIndex(r => r[0] === k) + 1]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{k}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
