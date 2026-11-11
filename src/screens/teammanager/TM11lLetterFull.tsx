import { useEffect } from 'react'
const G='#2f6252',GD='#1f4a3e',INK='#10211f',MUT='#4a5a57',LN='#e8edeb'
interface Props { onBack?: () => void }
export default function TM11lLetterFull({ onBack }: Props) {
  useEffect(() => {
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#fff'
    return () => { document.body.style.backgroundColor = prev }
  }, [])
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: 640 }}>
        <div style={{ background: G, borderRadius: 16, padding: '20px 24px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Show this to the referee</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Dispensation letter</div>
          </div>
        </div>
        <div style={{ background: '#fff', border: `2px solid ${LN}`, borderRadius: 16, padding: '32px 36px', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Jai Patel</div>
              <div style={{ fontSize: 15, color: MUT }}>U12 Sam · Clean Sheet FC</div>
            </div>
            <div style={{ textAlign: 'right' as const }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 2 }}>Reference</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, fontFamily: 'monospace' }}>D-2026-0418</div>
            </div>
          </div>
          <div style={{ height: 1, background: LN, marginBottom: 24 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px', marginBottom: 24 }}>
            {[
              { label: 'Approved', value: '6 March 2026' },
              { label: 'Valid until', value: '30 September 2026' },
              { label: 'Approved by', value: 'State Junior Board' },
              { label: 'Division', value: 'Division 2 Junior' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: LN, marginBottom: 20 }} />
          <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6 }}>
            This player has been granted an age dispensation to play in the above division for the 2026 season. This letter is valid for all fixtures within the approved dates.
          </div>
        </div>
        <div style={{ background: '#f5f6f4', borderRadius: 12, padding: '14px 18px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Saved on this device. Works with no signal. The screen stays bright while this is open.</div>
        </div>
        <button onClick={onBack} style={{ width: '100%', height: 52, borderRadius: 14, border: 0, background: GD, color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Done</button>
      </div>
    </div>
  )
}
