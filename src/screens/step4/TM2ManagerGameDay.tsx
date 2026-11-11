import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
export default function TM2ManagerGameDay(_: { onBack?: () => void }) {
  const [phase, setPhase] = useState<'before' | 'during' | 'after'>('before')
  const [checked, setChecked] = useState<number[]>([0, 1, 2])
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const toggle = (i: number) => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i])
  const items = [
    { title: 'Team sheet in Dribl', sub: '14 players, the most FV allows · done 8:41, due 9:00' },
    { title: 'Referee met', sub: 'Dana, club referee · her children check is on file' },
    { title: 'Camera on the halfway line', sub: 'Kit 1 · battery 96% · Harper is blurred in clips' },
    { title: 'First-aid kit and ice', sub: 'In the blue bag' },
    { title: 'Boots and vests handed out', sub: '13 of 14 · Harper isn\'t tracked yet' },
  ]
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>Sat 6 Jun · vs Harbour Rovers · 9:30</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Game day</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['before', 'during', 'after'] as const).map(p => (
            <button key={p} onClick={() => setPhase(p)} style={{ flex: 1, height: 44, borderRadius: 999, fontSize: 13, fontWeight: 700, border: phase === p ? 0 : `1px solid ${LN}`, background: phase === p ? G : '#fff', color: phase === p ? '#fff' : INK, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{p}</button>
          ))}
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
        <div style={{ background: '#fff', border: `2px solid #c39797`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flexGrow: 1, fontSize: 16, fontWeight: 700 }}>First aid card</div>
            <div style={{ fontSize: 12, fontWeight: 700, padding: '0 9px', height: 24, borderRadius: 999, background: LN, display: 'flex', alignItems: 'center' }}>Shared by parents</div>
          </div>
          {[{ ini: 'OB', name: 'Oscar Brennan', note: 'Asthma · puffer in his bag' }, { ini: 'FW', name: 'Finn Walsh', note: 'Bee-sting allergy · his dad has the EpiPen' }].map(p => (
            <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: `1px solid ${LN}` }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{p.name}</div>
                <div style={{ fontSize: 13, color: MUT }}>{p.note}</div>
              </div>
            </div>
          ))}
          <button onClick={() => t('Emergency contacts displayed.')} style={{ height: 46, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Emergency contacts</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>Something happened?</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Injury', 'Head knock', 'Sideline', 'Full time'].map(label => (
              <button key={label} onClick={() => t(`${label} opened.`)} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: INK }}>{label}</button>
            ))}
          </div>
        </div>
      </div>
      <nav style={{ display: 'flex', borderTop: `1px solid ${LN}`, background: '#fff' }}>
        {['Home', 'Game day', 'Messages', 'Roster'].map((label, i) => (
          <button key={label} onClick={() => t(`${label} tab`)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 56, fontSize: 11, fontWeight: 700, color: i === 1 ? G : MUT, background: 'none', border: 0, cursor: 'pointer' }}>{label}</button>
        ))}
      </nav>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 72, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
