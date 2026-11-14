import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type ConsentVal = 'Yes' | 'No' | 'Waiting'
interface ConsentRow { init: string; name: string; photos: ConsentVal; filming: ConsentVal; firstAid: ConsentVal; news: ConsentVal }

const PLAYERS: ConsentRow[] = [
  { init: 'IC', name: 'Ivy Chen',    photos: 'Yes', filming: 'Yes', firstAid: 'Yes', news: 'Yes' },
  { init: 'MB', name: 'Max Bailey',  photos: 'Yes', filming: 'Yes', firstAid: 'Yes', news: 'Yes' },
  { init: 'AK', name: 'Arlo Kaur',   photos: 'Waiting', filming: 'Waiting', firstAid: 'Yes', news: 'Waiting' },
  { init: 'ZM', name: 'Zara Moore',  photos: 'Yes', filming: 'Yes', firstAid: 'Yes', news: 'Yes' },
  { init: 'LW', name: 'Leo Wright',  photos: 'No',  filming: 'No',  firstAid: 'Yes', news: 'Yes' },
  { init: 'EN', name: 'Evie Nolan',  photos: 'Yes', filming: 'Yes', firstAid: 'Yes', news: 'Yes' },
  { init: 'TS', name: 'Theo Santos', photos: 'Yes', filming: 'Yes', firstAid: 'Yes', news: 'Yes' },
  { init: 'PD', name: 'Poppy Dunn',  photos: 'Yes', filming: 'Yes', firstAid: 'Yes', news: 'No' },
  { init: 'OH', name: 'Omar Haddad', photos: 'Yes', filming: 'Yes', firstAid: 'Yes', news: 'Yes' },
  { init: 'JL', name: 'Jude Lim',    photos: 'Yes', filming: 'Yes', firstAid: 'Waiting', news: 'Yes' },
]

const valStyle: Record<ConsentVal, { bg: string; color: string }> = {
  Yes:     { bg: G,         color: '#fff' },
  No:      { bg: '#e9eae8', color: INK },
  Waiting: { bg: '#cbbeb5', color: INK },
}

function Badge({ val }: { val: ConsentVal }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: valStyle[val].bg, color: valStyle[val].color }}>{val}</span>
}

export default function HM12ConsentMiniRoos(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 64 }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: t === 'Squad' ? '#40826d' : 'transparent', color: t === 'Squad' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center' }}>U9 Tom · Wattle Creek</div>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: INK }}>TA</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {['Players', "Who's coming", 'Consent'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: t === 'Consent' ? INK : MUT, borderBottom: t === 'Consent' ? `3px solid #40826d` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer', minHeight: 44, minWidth: 44 }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700 }}>Coach · MiniRoos</div>
        </div>
      </div>

      <div style={{ padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Consent</h1>
          <span style={{ fontSize: 14, color: MUT }}>U9 Tom · 8 of 10 families have answered everything</span>
        </div>
        <button style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }} onClick={() => st('Sending reminders.')}>Remind 2 families</button>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0, 1fr) 300px' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px 8px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 10, paddingBottom: 8 }}>
            {['Child', 'Team photos', 'Filming for clips', 'First-aid card', 'First name in news'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>
            ))}
          </div>
          {PLAYERS.map(p => (
            <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 10, alignItems: 'center', minHeight: 50, borderTop: `1px solid ${LN}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{p.init}</div>
                {p.name}
              </div>
              <div><Badge val={p.photos} /></div>
              <div><Badge val={p.filming} /></div>
              <div><Badge val={p.firstAid} /></div>
              <div><Badge val={p.news} /></div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: 8, fontSize: 14, color: MUT }}>Only a parent can change an answer. Leo is left out of photos and blurred in clips, and Poppy is left out of news, without anyone needing to ask.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Less to ask under 12</div>
            <div style={{ fontSize: 14, color: MUT }}>There are no sensors or wellness check-ins at this age, so parents are asked four things, not six.</div>
          </div>

          <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px 10px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Waiting on</div>
            {[
              { init: 'AK', name: 'Arlo Kaur', note: 'Photos, filming and club news' },
              { init: 'JL', name: 'Jude Lim',  note: 'First-aid card' },
            ].map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.init}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{item.note}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 'auto', paddingTop: 8, fontSize: 14, color: MUT }}>Until a parent says yes, the answer is treated as no.</div>
          </div>
        </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
