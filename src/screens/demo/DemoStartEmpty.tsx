import { type RoleId } from './tours'
import { COLUMNS, RoleColumn, Chevron, useColumns, INK, MUT, G, BORDER, PALE, BG } from './rolePicker'
import { demoToast } from '../demoToast'
import { wantSetup } from '../sandbox/sandboxNav'

// STA3e-PickRoleEmpty: the sandbox picker. The three first steps come before the
// roles, and step 1 is the one filled green button.

interface Props {
  onRole: (role: RoleId, screen?: string) => void
  onSwitchToDemo: () => void
  expiryDate?: string
  onFill?: () => void
  onReset?: () => void
  /** What is in the sandbox now, so the heading and steps tell the truth. */
  teamName?: string
  hasPlayers?: boolean
  hasGame?: boolean
  isSample?: boolean
}

export default function DemoStartEmpty({ onRole, onSwitchToDemo, expiryDate = 'Thursday 18 June', onFill, onReset, teamName, hasPlayers, hasGame, isSample }: Props) {
  const cols = useColumns()
  const started = !!teamName
  const steps = [
    { n: 1, title: started && hasPlayers ? `Carry on setting up ${teamName}` : 'Set up a team and add players', sub: started && hasPlayers ? 'Players, games, training nights and helpers' : 'About 3 minutes. Made-up names only', go: () => onRole('coach'), done: !!(started && hasPlayers) },
    { n: 2, title: 'Plan this week’s training', sub: 'Pick from the drill library', go: () => onRole('coach', 'training'), done: false },
    { n: 3, title: 'Add a game', sub: hasGame ? 'Then record it, or use our sample recording' : 'No camera? Use our sample recording', go: () => { if (hasGame) onRole('coach', 'record'); else { wantSetup('fixtures'); onRole('coach') } }, done: !!hasGame },
  ]
  const first = steps.find(s => !s.done)?.n ?? 2
  const strip = [
    { title: 'Fill with sample data', sub: isSample ? 'The sample club is loaded' : 'A squad, four games, messages', btn: isSample ? 'Filled' : 'Fill', act: onFill, off: isSample, icon: 'M12 5v14M5 12h14' },
    { title: 'Empty it and start again', sub: 'Removes everything you’ve added', btn: 'Reset', act: onReset, off: !started, icon: 'M20 11a8 8 0 10-2.3 5.7M20 4v7h-7' },
    { title: 'Keep it going', sub: 'Make it a real club account', btn: 'Ask us', act: () => demoToast('We will be in touch. In this demo nothing is sent.'), off: false, icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0114 0' },
  ]
  return (
    <div data-screen="STA3e-PickRoleEmpty" style={{ minHeight: 'var(--frame-h, 100vh)', background: BG, fontFamily: 'var(--font-sans)', color: INK, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', background: INK, minHeight: 44, display: 'flex', alignItems: 'center', gap: 10, padding: '0 32px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 10px', borderRadius: 999, background: '#fff', color: INK }}>SANDBOX</span>
        <span style={{ fontSize: 14, color: '#fff', flexGrow: 1, minWidth: 0 }}>Your own club, kept on this device. Yours until {expiryDate}.</span>
        <button onClick={onSwitchToDemo} style={{ flex: 'none', height: 44, padding: 0, border: 0, background: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', whiteSpace: 'nowrap' }}>Switch to the demo</button>
      </div>

      <div style={{ flexGrow: 1, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '18px 32px 14px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{isSample ? 'Your club has the sample data in it.' : started ? `${teamName} is under way.` : 'Your club is empty. Start here.'}</h1>
        <p style={{ margin: '4px 0 14px', fontSize: 16, color: MUT }}>{isSample ? 'Open any role to see it full. Reset to build your own instead.' : 'Do these three as the coach, then open any role to see what they see.'}</p>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols === 1 ? 1 : 3}, minmax(0, 1fr))`, gap: 12 }}>
          {steps.map(s => {
            const main = s.n === first && !isSample
            return (
              <button key={s.n} onClick={s.go} style={{ minHeight: 64, display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px', borderRadius: 16, border: main ? 0 : `1px solid ${BORDER}`, background: main ? G : '#fff', color: main ? '#fff' : INK, fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                <span style={{ flex: 'none', width: 30, height: 30, borderRadius: '50%', background: main ? '#fff' : PALE, color: main ? G : INK, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.done ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-label="Done"><path d="M20 6L9 17l-5-5" /></svg> : s.n}
                </span>
                <span style={{ flexGrow: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 15, fontWeight: 700, lineHeight: 1.25 }}>{s.title}</span>
                  <span style={{ display: 'block', fontSize: 13, color: main ? '#fff' : MUT, lineHeight: 1.3 }}>{s.sub}</span>
                </span>
                <Chevron color={main ? '#fff' : INK} />
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', margin: '16px 0 10px' }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, flexGrow: 1 }}>Or open any role</h2>
          <span style={{ fontSize: 13, color: MUT }}>You play every role. What you set up as the coach shows up for everyone else.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 16, alignItems: 'start' }}>
          {COLUMNS.map(col => <RoleColumn key={col.key} col={col} rowHeight={46} showSub={false} doing="Opens their first screen in your sandbox." onPick={id => onRole(id)} />)}
        </div>

        <div style={{ flexGrow: 1, minHeight: 14 }} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols === 1 ? 1 : 3}, minmax(0, 1fr))`, gap: '8px 20px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '10px 14px' }}>
          {strip.map(s => (
            <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.icon} /></svg>
              </span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>{s.title}</span>
                <span style={{ display: 'block', fontSize: 13, color: MUT }}>{s.sub}</span>
              </span>
              <button onClick={s.act} disabled={s.off} aria-label={`${s.btn}: ${s.title}`} style={{ flex: 'none', height: 44, padding: '0 14px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: s.off ? 'default' : 'pointer', opacity: s.off ? 0.5 : 1 }}>{s.btn}</button>
            </div>
          ))}
        </div>
        <p style={{ margin: '8px 0 0', fontSize: 13, color: INK }}><strong>Use made-up names.</strong> Please don’t enter real children’s details. Nobody is invited or messaged from a sandbox, and everything is deleted on {expiryDate}.</p>
      </div>
    </div>
  )
}
