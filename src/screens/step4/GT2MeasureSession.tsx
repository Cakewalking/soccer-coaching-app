import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const PLAYERS = [
  { ini: 'NO', name: 'Noah Okafor', last: '149.7', h: '151.8', sit: '78.9', wt: '41.0', note: '+2.1 cm in 3 months' },
  { ini: 'ZH', name: 'Zoe Hartley', last: '147.6', h: '149.6', sit: '77.8', wt: '40.4', note: '+2.0 cm in 3 months' },
  { ini: 'JP', name: 'Jai Patel', last: '151.2', h: '153.0', sit: '79.6', wt: '41.3', note: '+1.8 cm in 3 months' },
  { ini: 'RC', name: 'Ruby Chen', last: '153.0', h: '154.7', sit: '80.4', wt: '41.8', note: '+1.7 cm in 3 months' },
  { ini: 'EB', name: 'Ella Brandt', last: '150.1', h: '151.7', sit: '78.9', wt: '41.0', note: '+1.6 cm in 3 months' },
  { ini: 'IM', name: 'Isla Morgan', last: '146.3', h: '147.8', sit: '76.9', wt: '39.9', note: '+1.5 cm in 3 months' },
  { ini: 'MT', name: 'Mia Tran', last: '148.8', h: '150.2', sit: '78.1', wt: '40.6', note: '+1.4 cm in 3 months' },
  { ini: 'LM', name: 'Leo Marsh', last: '155.4', h: '156.7', sit: '81.5', wt: '42.3', note: '+1.3 cm in 3 months' },
  { ini: 'GO', name: 'Grace Owusu', last: '157.2', h: null, sit: null, wt: null, note: 'Now measuring' },
  { ini: 'FW', name: 'Finn Walsh', last: '146.0', h: null, sit: null, wt: null, note: '' },
]

const F = ({ v, active }: { v: string | null; active?: boolean }) => (
  <span style={{ height: 38, borderRadius: 10, border: `${active ? 2 : 1}px solid ${active ? G : '#c5c8c4'}`, background: active ? PALE : '#fff', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 15, fontWeight: v ? 700 : 400, color: v ? INK : '#6f7f7b', boxSizing: 'border-box' as const, marginRight: 12, minWidth: 100 }}>
    {v ? `${v} cm` : '—'}
  </span>
)

export default function GT2MeasureSession(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, overflow: 'hidden', background: '#f7f8f7', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' as const }}>
      <div style={{ height: 64, background: G, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, flex: 'none' }}>
        <div style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>U12 Sam · Wattle Creek · Fitness coach</div>
        <button onClick={() => st('Saving progress.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Finish later</button>
        <button onClick={() => st('Growth data saved.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', outline: `2px solid rgba(255,255,255,0.4)` }}>Save and update growth</button>
      </div>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Measuring session</h1>
        <span style={{ fontSize: 14, color: MUT }}>U12 Sam · Thu 11 Jun · 9 of 16 measured · about 40 seconds each</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box' as const, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14 }}>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '12px 16px', display: 'flex', flexDirection: 'column' as const, gap: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 110px 150px 130px 120px 1fr', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, padding: '0 0 6px' }}>
            {['Player','Last (Mar)','Height today','Sitting height','Weight',''].map(h => <span key={h}>{h}</span>)}
          </div>
          {PLAYERS.map((p, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 110px 150px 130px 120px 1fr', alignItems: 'center', minHeight: 46, borderTop: `1px solid ${LN}`, background: p.note === 'Now measuring' ? PALE : undefined, borderRadius: p.note === 'Now measuring' ? 8 : undefined }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700 }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#c39797', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.ini}</span>
                {p.name}
              </span>
              <span style={{ fontSize: 14, color: MUT }}>{p.last} cm</span>
              <F v={p.h} active={p.note === 'Now measuring'} />
              <F v={p.sit} />
              <F v={p.wt} />
              <span style={{ fontSize: 12, color: MUT }}>{p.note}</span>
            </div>
          ))}
          <span style={{ fontSize: 14, color: MUT, marginTop: 'auto', paddingTop: 8 }}>5 more below. Players who miss tonight get a reminder for their parents to measure at home.</span>
        </div>
        <div style={{ background: '#fff', border: `1px solid #c5c8c4`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>How to measure</div>
          {['Shoes off, heels and back against the wall.','Measure twice. The app uses the average.','Sitting height: on a flat bench, from the bench to the top of the head.','Same time of day each time, ideally before training.'].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, borderTop: `1px solid ${LN}`, padding: '8px 0', fontSize: 14, lineHeight: '20px' }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, color: G, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i+1}</span>
              <span>{s}</span>
            </div>
          ))}
          <div style={{ marginTop: 'auto', background: '#f6e9e9', borderRadius: 12, padding: '10px 12px', fontSize: 13, lineHeight: '19px' }}>Weight is optional and never shown to players or other parents. Only the growth rate appears in the app.</div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
