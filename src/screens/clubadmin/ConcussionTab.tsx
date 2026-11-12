// FC1 / FC1e — Concussion return-to-play tracker
import { useState } from 'react'
const G    = '#2f6252'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'
const WARN = '#c3a84a'

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', ...style }}>{children}</div>
}
function Ini({ ini, color = G }: { ini: string; color?: string }) {
  return <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{ini}</div>
}

const RTP_STAGES = ['Rest', 'Light activity', 'Non-contact training', 'Contact training', 'Games']

const PLAYERS: Array<{
  ini: string; name: string; team: string;
  knock: string; gp: string;
  day: number; total: number;
  symptomsNote: string; symptomsGone: boolean;
  currentStage: number;
  note: string; action: string; actionLabel: string;
}> = [
  {
    ini: 'RC', name: 'Ruby Chen', team: 'U13 Girls Meg',
    knock: 'Sat 23 May', gp: 'Mon 25 May',
    day: 12, total: 21,
    symptomsNote: 'No symptoms since 25 May', symptomsGone: true,
    currentStage: 2,
    note: 'Contact training from Mon 8 Jun (14 days with no symptoms). Earliest game Sat 13 Jun (21 days), after a doctor clears her.',
    action: "Doctor's note", actionLabel: "Request",
  },
  {
    ini: 'NA', name: 'Noah Ali', team: 'U11 Luke',
    knock: 'Sat 30 May', gp: 'Sat 30 May',
    day: 5, total: 21,
    symptomsNote: 'Still has headaches', symptomsGone: false,
    currentStage: 0,
    note: "No dates yet. The 14-day count starts when his symptoms stop.",
    action: 'Update symptoms', actionLabel: 'Update',
  },
]

export default function ConcussionTab({ empty }: { empty?: boolean }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  if (empty) return (
    <div style={{ padding: '24px 28px', maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Concussion</div>
        <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>Nothing here yet · No head knocks logged</div>
      </div>
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', fontSize: 14, color: G, lineHeight: 1.5 }}>Coaches and managers log a head knock from the sideline. The player then follows the return-to-play steps here.</div>
      <button style={{ alignSelf: 'flex-start', height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Name a concussion officer</button>
      <Card>
        <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>What you will see</div>
        {[
          { n: '1', t: 'If in doubt, sit them out', d: 'No game for at least 21 days' },
          { n: '2', t: 'Parents and coach told', d: 'The same day' },
        ].map(r => (
          <div key={r.n} style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, display: 'flex', gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{r.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.t}</div>
              <div style={{ fontSize: 12, color: MUT }}>{r.d}</div>
            </div>
          </div>
        ))}
        <div style={{ padding: '10px 14px', fontSize: 12, color: MUT }}>This page fills in on its own once there is something to show.</div>
      </Card>
    </div>
  )

  return (
    <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Concussion</div>
          <div style={{ fontSize: 13, color: MUT }}>Return to play · AIS concussion guidelines 2024 · community football</div>
        </div>
        <button onClick={() => showToast('Opens head knock form.')} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Log a head knock</button>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {(['Returning to play', '2 players'] as const).map(label => (
          <div key={label} style={{ height: 32, padding: '0 12px', borderRadius: 999, background: PALE, display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 700, color: G }}>{label}</div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PLAYERS.map(p => (
            <Card key={p.ini}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: `1px solid ${LN}` }}>
                <Ini ini={p.ini} color={p.symptomsGone ? WARN : ROSE}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{p.name} · {p.team}</div>
                  <div style={{ fontSize: 12, color: MUT }}>Head knock {p.knock} · seen by GP {p.gp}</div>
                </div>
                <div style={{ textAlign: 'right' as const }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: ROSE }}>Out of line-ups</div>
                  <div style={{ fontSize: 12, color: MUT }}>Day {p.day} of {p.total}</div>
                </div>
              </div>

              <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>Symptoms</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: p.symptomsGone ? G : ROSE }}>{p.symptomsNote}</div>
              </div>

              <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Return to play stages</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {RTP_STAGES.map((stage, i) => (
                    <div key={stage} style={{
                      flex: 1, padding: '6px 4px', borderRadius: 8, textAlign: 'center' as const,
                      background: i < p.currentStage ? G : i === p.currentStage ? GD : LN,
                      fontSize: 10, fontWeight: 700, color: i <= p.currentStage ? '#fff' : MUT,
                      lineHeight: 1.3,
                    }}>{stage}</div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '10px 14px', background: PALE, fontSize: 13, color: G, lineHeight: 1.5 }}>{p.note}</div>

              <div style={{ padding: '10px 14px', borderTop: `1px solid ${LN}`, display: 'flex', gap: 8 }}>
                <button onClick={() => showToast('Opens message to coach.')} style={{ height: 44, flex: 1, borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Message coach</button>
                <button onClick={() => showToast(`${p.actionLabel} logged.`)} style={{ height: 44, flex: 1, borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{p.actionLabel}</button>
              </div>
            </Card>
          ))}

          <div style={{ padding: '10px 14px', background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, fontSize: 13, color: MUT, lineHeight: 1.5 }}>
            If in doubt, sit them out. Anyone with a suspected concussion stops playing that day and sees a doctor. Coaches and managers cannot pick a player until they are cleared.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card>
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Concussion officer</div>
            <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Ini ini="MB" color={GD}/>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Marco Bellini</div>
                <div style={{ fontSize: 12, color: MUT }}>Physio · club volunteer · told about every knock</div>
              </div>
            </div>
            <div style={{ padding: '0 14px 12px' }}>
              <button onClick={() => showToast('Opens concussion officer change.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 13, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Change</button>
            </div>
          </Card>

          <Card>
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>This season</div>
            {[
              { label: 'Head knocks logged',  value: '6' },
              { label: 'Returned to play',    value: '4' },
              { label: 'Average days out',    value: '24' },
              { label: 'Played too soon',     value: '0', color: G },
            ].map(r => (
              <div key={r.label} style={{ padding: '8px 14px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: MUT }}>{r.label}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: r.color ?? INK }}>{r.value}</span>
              </div>
            ))}
          </Card>

          <div style={{ padding: '10px 14px', background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, fontSize: 12, color: MUT, lineHeight: 1.5 }}>
            Senior players follow the same steps. No game until at least 21 days after the knock.
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
