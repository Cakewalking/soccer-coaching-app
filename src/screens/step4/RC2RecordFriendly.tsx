import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const NAV_ITEMS = ['Home', 'Squad', 'Training', 'Match day', 'Clips']
const SUBNAV = ['Tonight\'s session', 'This week', 'Suggested', 'Drill library', 'Growth and load', 'Record']

const DETAILS = [
  { label: 'Against', value: 'Parkside Rovers FC' },
  { label: 'When', value: 'Thu 4 Jun · 5:45 pm' },
  { label: 'Where', value: 'Wattle Creek Reserve' },
  { label: 'Format', value: '7 v 7 · 2 × 25 min' },
  { label: 'Trying out', value: '3-2-1 shape · pressing high' },
]

export default function RC2RecordFriendly(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: '#fff', borderBottom: `1px solid ${LN}` }}>
        <div style={{ height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 4, background: G }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginRight: 16, letterSpacing: '-0.02em' }}>Clean Sheet</div>
          {NAV_ITEMS.map(n => <div key={n} style={{ height: 48, padding: '0 14px', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: n === 'Training' ? '#fff' : 'rgba(255,255,255,0.75)', background: n === 'Training' ? '#40826d' : 'transparent', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
          <div style={{ marginLeft: 'auto' }}><button onClick={() => st('Opening team selector.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #fff', background: '#fff', fontSize: 14, fontWeight: 600, color: INK, cursor: 'pointer' }}>U12 Sam · Wattle Creek ▾</button></div>
        </div>
        <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
          {SUBNAV.map(n => <div key={n} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, color: n === 'Record' ? INK : MUT, borderBottom: `3px solid ${n === 'Record' ? '#40826d' : 'transparent'}`, cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{n}</div>)}
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: G, marginBottom: 4 }}>Record · Friendly</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Game details</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            {DETAILS.map(d => (
              <div key={d.label} style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', borderTop: `1px solid ${LN}`, gap: 16 }}>
                <div style={{ width: 100, fontSize: 13, fontWeight: 700, color: MUT, flex: 'none' }}>{d.label}</div>
                <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{d.value}</div>
                <button onClick={() => st(`Changing ${d.label.toLowerCase()}.`)} style={{ fontSize: 13, color: G, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Change</button>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Does it count in the season data?</div>
            {[
              { id: 'yes', label: 'Yes — treat it like a league game', sub: 'Uses the data for suggestions and ratings.' },
              { id: 'no', label: 'No — development only', sub: 'Recorded but kept separate from league results.' },
            ].map(opt => (
              <label key={opt.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderTop: `1px solid ${LN}`, cursor: 'pointer' }}>
                <input type="radio" name="counts" defaultChecked={opt.id === 'no'} style={{ marginTop: 3, accentColor: G }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{opt.label}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{opt.sub}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>What we'll measure</div>
            {[['Match camera', 'Gaps, pressing, clips', true], ['GPS vests', 'Load and sprints', true], ['Boot sensors', 'Touches and foot use', false]].map(([label, desc, on]) => (
              <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: on ? G : '#e9eae8', flex: 'none' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{label as string}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{desc as string}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: on ? G : MUT }}>{on ? 'On' : 'Not connected'}</div>
              </div>
            ))}
          </div>
          <button onClick={() => st('Recording started.')} style={{ height: 52, borderRadius: 12, border: 0, background: G, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Start recording →</button>
        </div>
      </main>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
