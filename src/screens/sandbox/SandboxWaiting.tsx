import { useSandbox } from './SandboxContext'
import { goSetup, type SetupSection } from './sandboxNav'

// A tab that has nothing of the visitor's own to show yet. It says what will
// appear, lists what they have added so far, and sends them to Team set-up.
const COPY = {
  messages: { title: 'Messages', empty: 'No messages yet', body: 'Parents, players and your coaching team write to you here. Add your players and helpers and each one gets a thread.', btn: 'Add players', section: 'players' },
  formation: { title: 'Formation', empty: 'Your line-up goes here', body: 'Drag your players onto the pitch for the next game. The builder opens once you have enough players for a team.', btn: 'Add players', section: 'players' },
  lineups: { title: 'Line-ups that worked', empty: 'Nothing to compare yet', body: 'After a few recorded games this shows which shapes, pairs and line-ups worked best for your team, and feeds the Formation builder.', btn: 'Add a game', section: 'fixtures' },
  files: { title: 'Files', empty: 'No files yet', body: 'Team sheets, permission forms and notes you share with your coaching team are kept here.', btn: 'Add helpers', section: 'staff' },
  yourtake: { title: 'Your take', empty: 'No game to look back on yet', body: 'After each game you say how it went in your own words. Your take sits on top of the review and shapes the next training plan.', btn: 'Add a game', section: 'fixtures' },
} as const

export default function SandboxWaiting({ kind }: { kind: keyof typeof COPY }) {
  const { store } = useSandbox()
  const c = COPY[kind]
  const people = kind === 'messages' ? [...store.players.map(p => ({ name: p.parent || p.name, sub: p.parent ? `Parent of ${p.name}` : 'Player' })), ...(store.staff ?? []).map(m => ({ name: m.name, sub: m.role }))]
    : kind === 'formation' ? store.players.map(p => ({ name: p.name, sub: p.position })) : []
  return (
    <div data-screen={`SB-${kind}`} style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '14px 28px 22px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'var(--font-sans)' }}>
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>{c.title}</h1>
      <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', maxWidth: 720 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>{c.empty}</div>
        <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>{c.body}</div>
        <button onClick={() => goSetup(c.section as SetupSection, 'Opening set-up.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{c.btn}</button>
      </div>
      {people.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '6px 20px', maxWidth: 720 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: '#4a5a57', padding: '10px 0 6px' }}>{kind === 'messages' ? 'WHO YOU WILL BE ABLE TO MESSAGE' : `YOUR ${people.length} PLAYERS SO FAR`}</div>
          {people.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline', minHeight: 40, padding: '6px 0', borderTop: '1px solid #e9eae8' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p.name}</span><span style={{ fontSize: 13, color: '#4a5a57' }}>{p.sub}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
