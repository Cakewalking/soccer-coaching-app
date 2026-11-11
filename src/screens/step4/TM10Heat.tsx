import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
export default function TM10Heat(_: { onBack?: () => void }) {
  const [checked, setChecked] = useState<number[]>([0, 1])
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const toggle = (i: number) => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i])
  const items = [
    { title: 'Water at the bench for both teams', sub: 'FV asks for drinks to be on hand' },
    { title: 'Ask the referee about drinks breaks', sub: 'It\'s the referee\'s call · Dana says one each half' },
    { title: 'Shade for the subs', sub: 'Club gazebo is in the kit room' },
    { title: 'Short warm-up', sub: '10 minutes, in the shade if you can' },
  ]
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam · Sat 14 Mar · grading game</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Hot day</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ background: '#fff', border: `2px solid #c39797`, borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>34°</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Forecast for 10:00 kick-off</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.4 }}>Football Victoria's heat rule starts at 32°. Bureau forecast, checked 7:00 am.</div>
          </div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '4px 14px' }}>
          {items.map((item, i) => (
            <button key={i} onClick={() => toggle(i)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, width: '100%', background: 'none', border: 0, borderTop: i > 0 ? `1px solid ${LN}` : 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: checked.includes(i) ? G : 'transparent', border: checked.includes(i) ? 0 : `2px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {checked.includes(i) && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5 9-10"/></svg>}
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{item.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{item.sub}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px' }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Sam's tablet has changed too</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 4 }}>Subs are suggested every 8 minutes, not 12. Sprint limits drop for Noah and Zoe.</div>
        </div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, padding: '0 2px' }}>Dizzy, confused, stopped sweating or vomiting: get them into shade, cool them down and call 000.</div>
      </div>
      <div style={{ padding: '10px 14px 12px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button onClick={() => t('Message sent to 17 families: hot day, bring two bottles and a hat.')} style={{ height: 50, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Tell families to bring extra water</button>
        <button onClick={() => t('Back to game day.')} style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Back to game day</button>
      </div>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
