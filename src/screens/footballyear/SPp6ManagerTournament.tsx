import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'

const CHECKLIST = [
  { id: 'entry',    label: 'Entry submitted to Kingfisher FC', done: true },
  { id: 'fees',     label: 'Fees collected from 9 families',   done: true },
  { id: 'medical',  label: 'Medical forms printed',            done: true },
  { id: 'gear',     label: 'Ball bag and bibs packed',         done: false },
  { id: 'map',      label: 'Ground directions sent to families', done: false },
  { id: 'schedule', label: 'Draw shared with Sam',             done: false },
]

export default function SPp6ManagerTournament(_: { onBack?: () => void }) {
  const [done, setDone] = useState<string[]>(CHECKLIST.filter(c => c.done).map(c => c.id))
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  function toggle(id: string) { setDone(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]) }

  return (
    <div style={{ width: 390, minHeight: '100%', background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative', margin: '0 auto' }}>
      <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>9:41</div>
      </div>

      <div style={{ padding: '12px 20px 32px' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Team manager</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Tournament checklist</div>
          <div style={{ fontSize: 14, color: MUT }}>Kingfisher Summer Cup · Sat 21 November</div>
        </div>

        {/* Progress */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{done.length} of {CHECKLIST.length} done</div>
            <div style={{ fontSize: 13, color: MUT }}>{CHECKLIST.length - done.length} to go</div>
          </div>
          <div style={{ height: 6, background: LN, borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: G, borderRadius: 999, width: `${(done.length / CHECKLIST.length) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Checklist */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '10px 14px', marginBottom: 14 }}>
          {CHECKLIST.map(item => (
            <button key={item.id} onClick={() => toggle(item.id)} style={{ width: '100%', display: 'flex', gap: 12, padding: '10px 0', alignItems: 'flex-start', background: 'none', borderBottom: `1px solid ${LN}`, cursor: 'pointer', textAlign: 'left' as const }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: done.includes(item.id) ? G : '#fff', border: `2px solid ${done.includes(item.id) ? G : LN}`, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                {done.includes(item.id) && <svg width="11" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <div style={{ fontSize: 14, color: done.includes(item.id) ? MUT : INK, textDecoration: done.includes(item.id) ? 'line-through' : 'none', flex: 1 }}>{item.label}</div>
            </button>
          ))}
        </div>

        {/* Send directions */}
        <button onClick={() => t('Directions sent to 9 families.')} style={{ width: '100%', height: 48, borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Send ground directions to families</button>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
