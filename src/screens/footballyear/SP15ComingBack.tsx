import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const PLAYERS = [
  { initials: 'MT', name: 'Mia Tran',      status: 'yes',      note: '' },
  { initials: 'RC', name: 'Ruby Chen',      status: 'yes',      note: '' },
  { initials: 'LM', name: 'Leo Marsh',      status: 'yes',      note: '' },
  { initials: 'AL', name: 'Ava Lindqvist',  status: 'yes',      note: '' },
  { initials: 'GO', name: 'Grace Owusu',    status: 'yes',      note: '' },
  { initials: 'JP', name: 'Jai Patel',      status: 'yes',      note: '' },
  { initials: 'IM', name: 'Isla Morgan',    status: 'yes',      note: '' },
  { initials: 'EB', name: 'Ella Brandt',    status: 'yes',      note: '' },
  { initials: 'FW', name: 'Finn Walsh',     status: 'yes',      note: '' },
  { initials: 'HQ', name: 'Harper Quinn',   status: 'yes',      note: '' },
  { initials: 'NO', name: 'Noah Okafor',    status: 'yes',      note: '' },
  { initials: 'ZH', name: 'Zoe Hartley',   status: 'yes',      note: '' },
  { initials: 'NR', name: 'Nina Russo',     status: 'no',       note: 'Moving to another club' },
  { initials: 'TR', name: 'Tomas Reyes',   status: 'no',       note: 'Moving away from the area' },
  { initials: 'CK', name: 'Connor Kim',     status: 'notsure',  note: 'Starting high school next year' },
  { initials: 'PP', name: 'Priya Patel',    status: 'notsure',  note: 'Waiting to hear about rep team' },
  { initials: 'JS', name: 'Jamie Singh',    status: 'notsure',  note: 'Not replied yet' },
]

export default function SP15ComingBack(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  const yes = PLAYERS.filter(p => p.status === 'yes')
  const notsure = PLAYERS.filter(p => p.status === 'notsure')
  const no = PLAYERS.filter(p => p.status === 'no')

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Next year's squad</div>
          <div style={{ fontSize: 14, color: MUT }}>Who is coming back for 2027</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setSheet('remind')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Remind those who haven't replied</button>
          <button onClick={() => t('Squad list saved. Director can see it.')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Save for the director</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Summary counts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Coming back', val: yes.length,     color: G, bg: PALE },
              { label: 'Not sure',    val: notsure.length, color: MUT, bg: '#f7f8f7' },
              { label: 'Not coming',  val: no.length,      color: '#8b3a3a', bg: '#fff5f5' },
            ].map(item => (
              <div key={item.label} style={{ padding: '14px 16px', background: item.bg, borderRadius: 12, border: `1px solid ${LN}` }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: item.color, marginBottom: 2 }}>{item.val}</div>
                <div style={{ fontSize: 13, color: item.color }}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* Confirmed list */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ padding: '10px 16px', background: G, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Coming back</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{yes.length} players</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
              {yes.map(p => (
                <div key={p.name} style={{ display: 'flex', gap: 8, padding: '8px 16px', alignItems: 'center', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 10, fontWeight: 700, color: G }}>{p.initials}</div>
                  <div style={{ fontSize: 13, color: INK, fontWeight: 600 }}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Not sure list */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '12px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: MUT, marginBottom: 8 }}>Not sure · {notsure.length}</div>
            {notsure.map(p => (
              <div key={p.name} style={{ display: 'flex', gap: 10, padding: '6px 0', borderBottom: `1px solid ${LN}`, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f0f1ef', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 10, fontWeight: 700, color: MUT }}>{p.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Not coming back */}
          <div style={{ background: '#fff5f5', border: `1px solid #f0c0c0`, borderRadius: 14, padding: '12px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#8b3a3a', marginBottom: 8 }}>Not coming back · {no.length}</div>
            {no.map(p => (
              <div key={p.name} style={{ display: 'flex', gap: 10, padding: '6px 0', borderBottom: `1px solid #f8d8d8`, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ffe8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 10, fontWeight: 700, color: '#8b3a3a' }}>{p.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#8b3a3a' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#a05050' }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: trial dates */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Trial dates for 2027</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 10 }}>This squad moves to U13 next year</div>
            <div style={{ background: PALE, borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 4 }}>U13 Trials</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>12 to 25 October</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>Set by the club's trial window</div>
            </div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>Spots that open up after the not-sures decide can go to trial players. The director sees the total for each age group.</div>
          </div>
        </div>
      </div>

      {sheet === 'remind' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 400, marginTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>Send a reminder</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 14 }}>To Connor, Priya and Jamie — a quick message asking if they're coming back.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { t('Reminder sent to 3 families.'); setSheet(null) }} style={{ height: 36, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Send</button>
            <button onClick={() => setSheet(null)} style={{ height: 36, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
