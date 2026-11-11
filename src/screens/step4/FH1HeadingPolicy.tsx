import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const OPTIONS = [
  { id: 'fa', label: 'England FA guidance', desc: 'No heading in training under 12. Phased introduction 12–17. Matches allowed.' },
  { id: 'own', label: 'Write our own', desc: 'Set your own age limits and training restrictions for Wattle Creek FC.' },
  { id: 'none', label: 'No club policy', desc: 'Coaches use their own judgment. Heading is unrestricted across all ages.' },
]
const EFFECTS: Record<string, string[][]> = {
  fa: [['Drill library', 'Heading drills hidden under 12'], ['Header counts', 'Tracked in session plans'], ['Parents', 'Policy visible in parent app']],
  own: [['Drill library', 'You control which drills appear'], ['Header counts', 'You set the limits'], ['Parents', 'Your text shown in parent app']],
  none: [['Drill library', 'All heading drills available'], ['Header counts', 'Not tracked'], ['Parents', 'No policy shown']],
}
export default function FH1HeadingPolicy(_: { onBack?: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Club' ? 700 : 500, color: tab === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Heading policy</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 6 }}>Wattle Creek FC</div>
          <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, background: '#fff8f0', color: '#f57c00', padding: '3px 10px', borderRadius: 20, marginBottom: 20 }}>Not chosen yet</div>
          {OPTIONS.map(o => (
            <div key={o.id} onClick={() => setSelected(o.id)} style={{ background: '#fff', border: `2px solid ${selected === o.id ? G : LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 12, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${selected === o.id ? G : LN}`, background: selected === o.id ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {selected === o.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{o.label}</div>
              </div>
              <div style={{ fontSize: 13, color: MUT, paddingLeft: 28 }}>{o.desc}</div>
            </div>
          ))}
          <button onClick={() => { if (selected) t(`Heading policy saved: ${OPTIONS.find(o => o.id === selected)?.label}`) }} disabled={!selected} style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 0, background: selected ? G : LN, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: selected ? 'pointer' : 'default', marginTop: 8 }}>Save policy</button>
        </div>
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>What changes when you choose</div>
            {(selected ? EFFECTS[selected] : [['Drill library', '—'], ['Header counts', '—'], ['Parents', '—']]).map(([area, effect]) => (
              <div key={area} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 2 }}>{area}</div>
                <div style={{ fontSize: 12, color: MUT }}>{effect}</div>
              </div>
            ))}
          </div>
          {!selected && (
            <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px', marginTop: 14 }}>
              <div style={{ fontSize: 13, color: GD }}>Select an option to see how it changes the app for coaches and parents.</div>
            </div>
          )}
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
