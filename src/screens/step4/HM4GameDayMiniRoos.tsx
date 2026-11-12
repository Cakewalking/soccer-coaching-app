import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Slot = 'On' | 'In goal' | 'Rest'
interface PlayerRow { init: string; name: string; slots: Slot[]; plays: string }

const ROWS: PlayerRow[] = [
  { init: 'IC', name: 'Ivy',   slots: ['On', 'On', 'In goal', 'Rest'],    plays: '30 min' },
  { init: 'MB', name: 'Max',   slots: ['In goal', 'On', 'On', 'Rest'],    plays: '30 min' },
  { init: 'AK', name: 'Arlo',  slots: ['On', 'On', 'Rest', 'In goal'],    plays: '30 min' },
  { init: 'ZM', name: 'Zara',  slots: ['On', 'Rest', 'On', 'On'],         plays: '30 min' },
  { init: 'LW', name: 'Leo',   slots: ['Rest', 'On', 'On', 'On'],         plays: '30 min' },
  { init: 'EN', name: 'Evie',  slots: ['On', 'Rest', 'On', 'On'],         plays: '30 min' },
  { init: 'TS', name: 'Theo',  slots: ['On', 'On', 'On', 'On'],           plays: '40 min' },
  { init: 'PD', name: 'Poppy', slots: ['On', 'On', 'Rest', 'On'],         plays: '30 min' },
  { init: 'JL', name: 'Jude',  slots: ['Rest', 'In goal', 'On', 'On'],    plays: '30 min' },
]

function SlotCell({ val }: { val: Slot }) {
  const bg = val === 'In goal' ? GD : val === 'On' ? '#40826d' : LN
  const color = val === 'Rest' ? INK : '#fff'
  return (
    <div style={{ height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, background: bg, color }}>{val}</div>
  )
}

export default function HM4GameDayMiniRoos(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
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
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Game day</h1>
          <span style={{ fontSize: 14, color: MUT }}>Sat 6 Jun · 8:30 vs Northgate City · away, Redgum Reserve · 7 a side, 2 × 20 minutes</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => showToast('Opens player swap picker.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Swap two players</button>
          <button onClick={() => showToast('Game started.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Start the game</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0, 1fr) 320px' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 18px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Everyone gets a turn</div>
            <div style={{ fontSize: 14, color: MUT }}>9 coming · change every 10 minutes</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '130px repeat(4, minmax(0, 1fr)) 70px', gap: 6, alignItems: 'center' }}>
            {['Player', '0 to 10', '10 to 20', '20 to 30', '30 to 40', 'Plays'].map((h, i) => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, textAlign: i === 5 ? 'right' as const : 'left' as const }}>{h}</div>
            ))}
            {ROWS.map(row => (
              <>
                <div key={row.name + '-name'} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 999, background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{row.init}</div>
                  {row.name}
                </div>
                {row.slots.map((s, i) => <SlotCell key={row.name + i} val={s} />)}
                <div key={row.name + '-plays'} style={{ textAlign: 'right', fontSize: 14, fontWeight: 700 }}>{row.plays}</div>
              </>
            ))}
          </div>
          <div style={{ marginTop: 'auto', fontSize: 14, color: MUT }}>Theo plays all four this week; it was Ivy last week. Goal turns go to Max, Jude, Ivy and Arlo, who've had the fewest.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px 6px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Before the game</div>
            {[
              { icon: '✓', label: 'Meet 8:10 at Redgum Reserve', note: 'Sent to families Thursday', bg: PALE },
              { icon: '✓', label: 'Captain: Arlo',               note: 'His first turn',           bg: PALE },
              { icon: '!', label: 'Poppy and Jude',               note: 'One maybe, one no answer', bg: '#cbbeb5' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 48, borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 30, height: 30, borderRadius: 999, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>After the game</div>
            <div style={{ fontSize: 14, color: MUT }}>No score to enter. Tap three things you saw, and thank the parents. It takes 30 seconds.</div>
            <button style={{ marginTop: 'auto', height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>What we saw</button>
          </div>
        </div>
      </div>
    {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
