import { useState } from 'react'

type SummaryStatus = 'ready' | 'check' | 'write'

interface PlayerRow {
  ini: string
  name: string
  status: SummaryStatus
  note: string
  goals: string[]
  clip: string
  parent: string
}

const PLAYERS: PlayerRow[] = [
  { ini: 'MT', name: 'Mia Tran',      status: 'ready', note: "Mia set out to use her left foot more, and by August she was scoring with it. She's the first to help a teammate up. Next year: keep looking before the ball comes.", goals: ['Use her left foot more', 'Look before the ball comes'], clip: 'Left foot, low across the keeper, v Ironbark United', parent: 'To Linh Tran, and to Mia\'s app' },
  { ini: 'NO', name: 'Noah Okafor',   status: 'ready', note: "Noah holds his position better than anyone and his reading of the game has jumped this season. He's ready to play up next year.", goals: ['Hold shape under pressure', 'Read the game earlier'], clip: 'Covering run, intercepted twice, v Harbour Rovers', parent: 'To Zara Okafor' },
  { ini: 'EB', name: 'Ella Brandt',   status: 'ready', note: "Ella started the season quietly but came alive in the second half. Her first touch under pressure is now a strength, not a worry.", goals: ['First touch under pressure', 'Shoot earlier'], clip: 'First-time finish from the edge, v Kestrel Park', parent: 'To Dagmar Brandt' },
  { ini: 'JP', name: 'Jai Patel',     status: 'check', note: "Jai worked hard on his distribution and it shows. His long pass from deep opened three goals this season.", goals: ['Long pass from deep', 'Communicate more'], clip: 'Switch of play, 35 m, v Northgate City', parent: 'To Priya Patel' },
  { ini: 'ZH', name: 'Zoe Hartley',   status: 'check', note: "Zoe is fast and direct but learned this year to slow down at the right moment. Her crossing improved markedly.", goals: ['Slow down before crossing', 'Defend from the front'], clip: 'Cut back, assist, v Banksia Park', parent: 'To Clare Hartley' },
  { ini: 'GO', name: 'Grace Owusu',   status: 'ready', note: "Grace kept three clean sheets in a row in August and her kicking improved every session. Ready for the junior goalkeeper programme.", goals: ['Kicking from hands', 'Organise the defence'], clip: 'Two-handed save, v Ironbark United', parent: 'To Rob Owusu' },
  { ini: 'LM', name: 'Leo Marsh',     status: 'write', note: '', goals: ['Press high', 'Win second balls'], clip: '', parent: 'To Alex Marsh' },
  { ini: 'HQ', name: 'Harper Quinn',  status: 'write', note: '', goals: ['Hold the ball up', 'Link play'], clip: '', parent: 'To Casey Quinn' },
]

const STATUS_LABEL: Record<SummaryStatus, string> = { ready: 'Ready', check: 'Check', write: 'To write' }
const STATUS_COLOR: Record<SummaryStatus, string> = { ready: '#2f6252', check: '#c39797', write: '#6f7f7b' }
const STATUS_BG:    Record<SummaryStatus, string> = { ready: '#eef5f2', check: '#fdf5f0', write: '#f5f5f4' }

function StatusChip({ s }: { s: SummaryStatus }) {
  return <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: STATUS_BG[s], color: STATUS_COLOR[s] }}>{STATUS_LABEL[s]}</span>
}

export default function SeasonSummariesScreen(_props: { empty?: boolean }) {
  const [selected, setSelected] = useState<string | null>('MT')
  const [toast, setToast] = useState('')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const player = PLAYERS.find(p => p.ini === selected)
  const ready  = PLAYERS.filter(p => p.status === 'ready').length
  const check  = PLAYERS.filter(p => p.status === 'check').length
  const write  = PLAYERS.filter(p => p.status === 'write').length

  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Season summaries</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>U12 Sam · season 2026 · {ready} ready, {check} to check, {write} to write</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => showToast('Opening preview of what parents see.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>What parents see</button>
          <button onClick={() => showToast(`Sending ${ready} ready summaries.`)} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Send the {ready} ready</button>
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 400px', overflow: 'hidden' }}>

        {/* Player list */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '10px 16px 8px', borderBottom: '1px solid #e9eae8' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>Players</span>
            <span style={{ fontSize: 12, color: '#6f7f7b' }}>8 of 17 shown</span>
          </div>
          <div style={{ overflowY: 'auto', flexGrow: 1 }}>
            {PLAYERS.map(p => (
              <button key={p.ini} onClick={() => setSelected(p.ini === selected ? null : p.ini)} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px 16px', border: 0, borderBottom: '1px solid #e9eae8', background: selected === p.ini ? '#f0f8f4' : 'transparent', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '999px', background: selected === p.ini ? '#2f6252' : '#c5c8c4', color: selected === p.ini ? '#fff' : '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flex: 'none' }}>{p.ini}</div>
                <span style={{ flexGrow: 1, fontSize: 15, fontWeight: 600, color: '#10211f' }}>{p.name}</span>
                <StatusChip s={p.status} />
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {player ? (
          <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#2f6252', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flex: 'none' }}>{player.ini}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f' }}>{player.name}</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b' }}>{player.parent}</div>
                </div>
              </div>
              <StatusChip s={player.status} />
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {[{ label: 'Games', value: '17 of 18' }, { label: 'Minutes', value: 'Fair share' }, { label: 'Goals met', value: '2 of 2' }, { label: 'Check-ins', value: '9 in 10' }].map(s => (
                <div key={s.label} style={{ background: '#f5f6f4', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Coach note */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#6f7f7b', marginBottom: 6 }}>Your note · drafted for you, change anything</div>
              {player.note ? (
                <div style={{ fontSize: 14, color: '#10211f', lineHeight: '1.6', background: '#f5f6f4', borderRadius: 12, padding: '12px 14px' }}>{player.note}</div>
              ) : (
                <div style={{ fontSize: 14, color: '#6f7f7b', lineHeight: '1.6', background: '#f5f6f4', borderRadius: 12, padding: '12px 14px', fontStyle: 'italic' }}>No note written yet. Add a few words about this player's season.</div>
              )}
            </div>

            {/* Goals */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#6f7f7b', marginBottom: 6 }}>Goals this season</div>
              {player.goals.map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: i === 0 ? '1px solid #e9eae8' : '1px solid #e9eae8' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={player.status === 'ready' ? '#2f6252' : '#c5c8c4'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 14, color: '#10211f' }}>{g}</span>
                </div>
              ))}
            </div>

            {/* Favourite clip */}
            {player.clip && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#6f7f7b', marginBottom: 6 }}>Favourite clip · picked by {player.name.split(' ')[0]}</div>
                <div style={{ background: '#1f4a3e', borderRadius: 12, padding: '10px 14px', fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: '1.4' }}>{player.clip}</div>
              </div>
            )}

            <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '1.5' }}>Left out on purpose: running numbers, sprint counts, wellness answers and anything that compares them with teammates.</div>

            <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
              <button onClick={() => showToast(`Editing ${player.name}'s summary.`)} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
              <button onClick={() => showToast(`Sending ${player.name}'s summary.`)} style={{ flex: 2, height: 44, borderRadius: 10, border: 0, background: player.status === 'ready' ? '#2f6252' : '#c5c8c4', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Send {player.name.split(' ')[0]}'s</button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#6f7f7b', textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Select a player to see their summary</div>
          </div>
        )}
      </main>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
