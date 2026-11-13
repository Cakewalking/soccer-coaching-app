import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PX3BandedNight({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  const groups = [
    { color: '#2d6a4f', name: 'Green', label: 'Before the spurt', count: 17, players: ['Eli Ward', 'Sana Iyer', 'Aiden Pham', '+ 14 more'], work: 'Small games and touches. Full pitch. Normal duels.' },
    { color: '#c8a84b', name: 'Sand', label: 'In the spurt', count: 16, players: ['Kai Osei', 'Leo Costa (visiting)', 'Priya Shah', '+ 13 more'], work: 'No jumps. Capped sprints. Lighter contact.' },
    { color: '#f0ebe0', name: 'White', label: 'After the spurt', count: 13, players: ['Mia Tran', 'Grace Reid', 'Noah (visiting)', '+ 10 more'], work: 'Bigger pitch. Harder duels. Full sprint load.' },
  ]

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Players' ? 700 : 500, color: t === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={onBack} style={{ fontSize: 13, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Playing across</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Mixed-age session</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button onClick={() => st('Opening session plan.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 13, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>Session plan</button>
          <button onClick={() => st('Opening run-sheet for coaches.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Run sheet</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px 32px', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>Mixed-age session</div>
            <div style={{ fontSize: 13, color: MUT }}>Fri 19 June · 46 players · Under 12 to under 15 · 6:00 pm, Wattle Creek Reserve</div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Players are told their colour. Coaches see groups. Families see only that there is a mixed-age night.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {groups.map(g => (
                <div key={g.name} style={{ border: `2px solid ${g.color === '#f0ebe0' ? LN : g.color}`, borderRadius: 14, overflow: 'hidden' }}>
                  <div style={{ background: g.color, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: g.color === '#f0ebe0' ? INK : '#fff' }}>{g.name}</div>
                    <div style={{ fontSize: 12, color: g.color === '#f0ebe0' ? MUT : 'rgba(255,255,255,0.8)' }}>· {g.label}</div>
                  </div>
                  <div style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>{g.count} players</div>
                    {g.players.map(p => (
                      <div key={p} style={{ fontSize: 12, color: MUT, padding: '3px 0' }}>{p}</div>
                    ))}
                    <div style={{ marginTop: 10, background: PALE, borderRadius: 8, padding: '8px 10px', fontSize: 12, color: G }}>{g.work}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>How groups are set</div>
            {[
              { who: 'Clean Sheet', how: 'Groups players by monthly heights — before, in, or after the typical growth spurt for their birth year.' },
              { who: 'Fitness coach', how: 'Can move any player between groups before the session. Their call is final.' },
              { who: 'Nobody else', how: 'Coaches see groups, not measurements. Families see only that there is a mixed-age night. No child is told their stage.' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 100, fontSize: 12, fontWeight: 700, color: INK, flexShrink: 0 }}>{r.who}</div>
                <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>{r.how}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Nobody changes team</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6 }}>It is the lightest way to try the idea. Players keep their own team, their own coach, and their own friends. The session is one night.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 10 }}>Next session</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>Fri 24 July</div>
            <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Heights are updated each month. Groups may change.</div>
            <button onClick={() => st('Scheduling next mixed-age session.')} style={{ marginTop: 12, width: '100%', height: 34, borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Schedule</button>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
