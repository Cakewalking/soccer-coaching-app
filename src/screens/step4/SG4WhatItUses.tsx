import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const SOURCES = [
  { source: 'GPS vests', have: '14 of 16', usedFor: 'Load, sprints, distance', on: true },
  { source: 'Boot sensors', have: '12 of 16', usedFor: 'Touch counts, left/right foot, ball speed', on: true },
  { source: 'Match camera', have: '8 games', usedFor: 'Gaps, pressing, clips', on: true },
  { source: 'Coach notes', have: 'All sessions', usedFor: 'Context, decisions', on: true },
  { source: 'Wellness check-ins', have: '11 of 16 today', usedFor: 'Load limits, fatigue', on: true },
  { source: 'Growth checks', have: '16 of 16', usedFor: 'Sprint caps, load flags', on: true },
  { source: 'Other clubs\' data', have: 'Never', usedFor: '—', on: false },
]

export default function SG4WhatItUses(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer' }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button onClick={() => st('Opening team selector.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Suggested' ? INK : MUT, borderBottom: `3px solid ${n === 'Suggested' ? '#40826d' : 'transparent'}`, cursor: 'pointer' }}>{n}</div>)}
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>What it uses to make suggestions</div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1fr 60px', padding: '10px 18px', background: '#f7f8f7', borderBottom: `1px solid ${LN}` }}>
              {['Source', 'You have', 'Used for', 'On'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>
              ))}
            </div>
            {SOURCES.map(r => (
              <div key={r.source} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1fr 60px', padding: '12px 18px', borderTop: `1px solid ${LN}`, alignItems: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{r.source}</div>
                <div style={{ fontSize: 14, color: r.on ? MUT : '#c05' }}>{r.have}</div>
                <div style={{ fontSize: 14, color: MUT }}>{r.usedFor}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.on ? G : '#c05' }}>{r.on ? 'Yes' : 'No'}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>What it never does</div>
            {['Shares your players\' data with other clubs', 'Uses data from other teams to judge your players', 'Makes medical decisions'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ color: '#c05', fontSize: 16, flex: 'none' }}>✕</div>
                <div style={{ fontSize: 14, lineHeight: '20px' }}>{item}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>By age</div>
            <div style={{ fontSize: 14, lineHeight: '20px', color: MUT }}>U12 and under: load targets and sprint caps are adjusted for growth. Players in a growth spurt get lower thresholds automatically.</div>
          </div>
        </div>

      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </main>
    </div>
  )
}
