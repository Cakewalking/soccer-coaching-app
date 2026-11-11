import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const SQUAD = [
  { initials: 'MT', name: 'Mia Tran',      team: 'U12 Sam', ans: 'Yes' },
  { initials: 'RC', name: 'Ruby Chen',     team: 'U12 Sam', ans: 'Yes' },
  { initials: 'LM', name: 'Leo Marsh',     team: 'U12 Sam', ans: 'Yes' },
  { initials: 'AL', name: 'Ava Lindqvist', team: 'U12 Sam', ans: 'Yes' },
  { initials: 'GO', name: 'Grace Owusu',   team: 'U12 Sam', ans: 'Yes' },
  { initials: 'JP', name: 'Jai Patel',     team: 'U12 Sam', ans: 'Waiting' },
  { initials: 'IM', name: 'Isla Morgan',   team: 'U12 Sam', ans: 'Yes' },
  { initials: 'EB', name: 'Ella Brandt',   team: 'U12 Sam', ans: 'No' },
  { initials: 'FW', name: 'Finn Walsh',    team: 'U12 Sam', ans: 'Yes' },
]

export default function SP11TournamentSetup({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [sheet, setSheet] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Kingfisher Summer Cup</div>
          <div style={{ fontSize: 14, color: MUT }}>Sat 21 and Sun 22 November · Redgum Reserve · under 12s, 9 a side</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>All tournaments</button>
          <button onClick={() => t('Opening day plan')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Plan the day</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Squad */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '10px 16px', background: G, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Squad for this tournament</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>9 yes · 1 waiting · 2 guests</span>
            </div>
            {SQUAD.map(p => (
              <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) auto', gap: 10, padding: '10px 16px', alignItems: 'center', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 11, fontWeight: 700, color: G }}>{p.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.team}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: p.ans === 'Yes' ? G : p.ans === 'No' ? '#c35b5b' : '#7a5a1a' }}>{p.ans}</span>
              </div>
            ))}
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 13, color: MUT }}>2 guests from U12 Girls Ana: Priya Nair and Hana Sato. Ana and both parents have said yes.</div>
            </div>
            <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button onClick={() => setSheet('spguest')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Add a guest</button>
              <div style={{ fontSize: 12, color: MUT }}>12 picked of the 14 allowed. Guests play under their own registration.</div>
            </div>
          </div>

          {/* Format */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 10 }}>The format</div>
            {[
              { label: 'Group games', val: '3 on Saturday' },
              { label: 'Length',      val: '2 halves of 15 minutes' },
              { label: 'Finals',      val: 'Sunday, if you get through' },
              { label: 'Entry',       val: '$55 a player, paid to the club' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', gap: 12, padding: '6px 0', borderBottom: `1px solid ${LN}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: MUT, width: 100, flex: 'none' }}>{r.label}</span>
                <span style={{ fontSize: 13, color: INK }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: before you go */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Before you go</div>
            {[
              { label: 'Entered',  val: 'By Bianca, the coordinator' },
              { label: 'Fees',     val: '7 of 11 paid', action: 'Remind', onAct: () => t('Reminder sent to 4 families.') },
              { label: 'Filming',  val: 'The organiser allows it · 1 family said no' },
            ].map(item => (
              <div key={item.label} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: MUT }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: INK }}>{item.val}</div>
                </div>
                {item.action && <button onClick={item.onAct} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{item.action}</button>}
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5, background: PALE, borderRadius: 10, padding: '10px 12px' }}>
            Tournament games are shown apart from your season numbers.
          </div>
        </div>
      </div>

      {/* Add tournament sheet */}
      {sheet === 'sptourn' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 480, marginTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>Add a tournament or gala day</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 14 }}>A day or weekend of short games.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { t('Tournament added. Pick the squad next.'); setSheet(null) }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Add and pick a squad</button>
            <button onClick={() => setSheet(null)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Guest sheet */}
      {sheet === 'spguest' && (
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '20px 24px', maxWidth: 480, marginTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 14 }}>Add a guest player</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 14 }}>From another team at Wattle Creek FC.</div>
          <button onClick={() => { t("Asked Luke and Eli's parent."); setSheet(null) }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Ask Eli's coach and parent</button>
          <button onClick={() => setSheet(null)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginLeft: 8 }}>Cancel</button>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
