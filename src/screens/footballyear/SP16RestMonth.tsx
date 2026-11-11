import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const ALERTS = [
  {
    initials: 'ZH', name: 'Zoe Hartley',
    detail: 'Outdoor season · indoor league · Summer Cup · academy group',
    note: 'No four-week break this year',
    type: 'warn',
  },
  {
    initials: 'MT', name: 'Mia Tran',
    detail: 'Outdoor season · indoor league · Summer Cup',
    note: 'No four-week break this year',
    type: 'warn',
  },
  {
    initials: 'FW', name: 'Finn Walsh',
    detail: 'Three weeks off in July · needs one more week',
    note: 'One more week before he is clear',
    type: 'info',
  },
]

export default function SP16RestMonth(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Rest month</div>
          <div style={{ fontSize: 14, color: MUT }}>December · nothing scheduled</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setSheet('note')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Read the note to families</button>
          <button onClick={() => t('Note sent to 17 families.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Send the note</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Nothing needs you card */}
          <div style={{ background: PALE, border: `1px solid #c0d8cc`, borderRadius: 16, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: GD, marginBottom: 6 }}>Nothing needs you this month</div>
            <div style={{ fontSize: 14, color: G, lineHeight: 1.6 }}>No games, no training, no tasks. Everyone — including you — takes a real break from club football. The app wakes up again in January.</div>
          </div>

          {/* Break status */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Break check</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>Every player needs four weeks completely away from organised football at some point between the final game and 1 February.</div>
            {ALERTS.map(p => (
              <div key={p.name} style={{
                display: 'flex', gap: 12, padding: '10px 12px', borderRadius: 12,
                background: p.type === 'warn' ? '#fff5f5' : '#fff',
                border: `1px solid ${p.type === 'warn' ? '#f0c0c0' : LN}`,
                marginBottom: 8,
              }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.type === 'warn' ? '#ffe8e8' : PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 11, fontWeight: 700, color: p.type === 'warn' ? '#8b3a3a' : G }}>{p.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: p.type === 'warn' ? '#8b3a3a' : INK, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: p.type === 'warn' ? '#a05050' : MUT, marginBottom: 2 }}>{p.detail}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: p.type === 'warn' ? '#8b3a3a' : G }}>{p.note}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>14 others: all clear · break already counted or on track for December</div>
          </div>
        </div>

        {/* Right: what the note says */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>The note to families</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6, marginBottom: 10 }}>A short message that covers three things:</div>
            {[
              { n: '1', text: 'The season is finished and training is done for the year' },
              { n: '2', text: 'Four weeks away from organised football is good for growing bodies' },
              { n: '3', text: 'Registration for 2027 opens in January — keep an eye out' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 10, padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 11, fontWeight: 700, color: G }}>{item.n}</div>
                <div style={{ fontSize: 13, color: INK }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {sheet === 'note' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 520, marginTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>Note preview</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.7, marginBottom: 14, padding: '12px', background: '#f7f8f7', borderRadius: 10 }}>
            "Hi everyone. What a year. Training is done and we won't have any scheduled football until February. The research on growing athletes is pretty clear: a few weeks completely away from organised sport each year is one of the best things for long-term development. So please, don't sign them up for a holiday clinic just to keep them busy — a rest actually works. We'll be in touch in January about registration for 2027. Happy holidays to all families. Sam."
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { t('Note sent to 17 families.'); setSheet(null) }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Send this</button>
            <button onClick={() => setSheet(null)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
