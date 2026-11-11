import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
export default function TM8SidelineReport(_: { onBack?: () => void }) {
  const [what, setWhat] = useState<string | null>('Abuse of the referee')
  const [who, setWho] = useState<string | null>('Away spectator')
  const [notes, setNotes] = useState('Man in a red jacket yelling at Dana from behind the goal, second half.')
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const Chip = ({ label, group }: { label: string; group: 'what' | 'who' }) => {
    const active = group === 'what' ? what === label : who === label
    return (
      <button onClick={() => group === 'what' ? setWhat(label) : setWho(label)} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, fontSize: 14, fontWeight: 700, border: active ? 0 : `1px solid ${LN}`, background: active ? G : '#fff', color: active ? '#fff' : INK, cursor: 'pointer', fontFamily: 'inherit' }}>{label}</button>
    )
  }
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam · Sat 6 Jun · vs Harbour Rovers</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Sideline report</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px' }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Keep yourself safe</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 4 }}>Don't confront anyone. Tell the referee at a break, then report it here.</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, marginBottom: 6 }}>What happened</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Abuse of the referee', 'Abuse of a player', 'A coach', 'Something else'].map(l => <Chip key={l} label={l} group="what" />)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, marginBottom: 6 }}>Who</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Our spectator', 'Away spectator', 'Not sure'].map(l => <Chip key={l} label={l} group="who" />)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, marginBottom: 6 }}>What you saw</div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{ width: '100%', minHeight: 80, border: `1px solid ${LN}`, borderRadius: 10, padding: '10px 12px', fontSize: 15, fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ fontSize: 13, color: MUT, padding: '0 2px' }}>Only Helen Park, the welfare officer, and the director see this. Time and game are added for you.</div>
      </div>
      <div style={{ padding: '10px 14px 12px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button onClick={() => t('Sent to Helen Park. She\'ll contact Harbour Rovers.')} style={{ height: 50, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Send to Helen</button>
        <button onClick={() => t('Back to game day.')} style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Back to game day</button>
      </div>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
