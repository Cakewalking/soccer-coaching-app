import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function SP13TournamentReview({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Tournament review</div>
          <div style={{ fontSize: 14, color: MUT }}>Kingfisher Summer Cup · 5 games over two days</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Clips from the weekend</button>
          <button onClick={() => t('Highlights sent to 12 families, with each child\'s best moment.')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Send families the highlights</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 16 }}>
        <div>
          {/* Stats */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 12 }}>
              {[
                { label: 'Games',       val: '5' },
                { label: 'Results',     val: '2 won · 2 drawn · 1 lost' },
                { label: 'Minutes each', val: '68 to 76' },
                { label: 'Clips',       val: '14' },
              ].map(stat => (
                <div key={stat.label} style={{ padding: '10px 12px', borderRadius: 10, background: '#f7f8f7', border: `1px solid #e5e6e4` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: PALE, color: G }}>Everyone within 8 minutes</span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: '#f0f1ef', color: MUT }}>Counts for Nothing · Kept apart from the season</span>
            </div>
          </div>

          {/* Insights */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>What the weekend showed</div>
            {[
              { n: '1', title: 'Short games suit this team',   body: 'They won the ball back in 4.8 seconds, their best all year' },
              { n: '2', title: 'Tired by game 3 each day',    body: 'Sprints dropped by a third. Normal for five games in two days' },
              { n: '3', title: 'The two guests fitted in',    body: 'Priya and Hana played 70 minutes each' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 12, fontWeight: 700, color: G }}>{item.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{item.body}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>A tournament is five short games, so the numbers are read as a set, not one by one.</div>
          </div>

          {/* Rest note */}
          <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>After a tournament</div>
            <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Two rest days for everyone. No training before Wednesday. From Football Australia's youth guidelines for busy periods.</div>
          </div>
        </div>

        {/* Right: guests */}
        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Guests</div>
            {[
              { initials: 'PN', name: 'Priya Nair', note: 'Her clips and minutes go to Ana, her own coach' },
              { initials: 'HS', name: 'Hana Sato',  note: 'The same. They leave this squad tonight' },
            ].map(p => (
              <div key={p.name} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}`, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 11, fontWeight: 700, color: G }}>{p.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
