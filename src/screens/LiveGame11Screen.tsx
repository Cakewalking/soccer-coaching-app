import { useState } from 'react'

interface OnPitchPlayer {
  ini: string; name: string; mins: number; pos: string; x: number; y: number
  flag?: string; flagType?: 'warn' | 'info'
}
interface BenchPlayer {
  ini: string; name: string; needsMins: number; note?: string; suspended?: boolean
}

const ON_PITCH: OnPitchPlayer[] = [
  { ini: 'JB',  name: 'Jack',  mins: 58, pos: 'GK',  x: 8,  y: 50 },
  { ini: 'TW',  name: 'Tyler', mins: 58, pos: 'RB',  x: 22, y: 15 },
  { ini: 'DM',  name: 'Dev',   mins: 58, pos: 'CB',  x: 22, y: 38 },
  { ini: 'RK',  name: 'Reza',  mins: 40, pos: 'CB',  x: 22, y: 62 },
  { ini: 'HC',  name: 'Hugo',  mins: 58, pos: 'LB',  x: 22, y: 85 },
  { ini: 'CW',  name: 'Cal',   mins: 45, pos: 'CM',  x: 42, y: 30, flag: '45% over usual week', flagType: 'warn' },
  { ini: 'TO',  name: 'Theo',  mins: 58, pos: 'CM',  x: 42, y: 50 },
  { ini: 'SA',  name: 'Sione', mins: 58, pos: 'CM',  x: 42, y: 70 },
  { ini: 'LB',  name: 'Luca',  mins: 58, pos: 'FW',  x: 68, y: 25 },
  { ini: 'NP',  name: 'Nate',  mins: 58, pos: 'SS',  x: 62, y: 50 },
  { ini: 'EM',  name: 'Eli',   mins: 22, pos: 'FW',  x: 68, y: 75 },
]

const BENCH: BenchPlayer[] = [
  { ini: 'AS', name: 'Ari Shah',      needsMins: 0,  note: 'Needs 9′ more' },
  { ini: 'RK', name: 'Reza Karimi',   needsMins: 40, note: 'Came off at 40′' },
  { ini: 'BW', name: 'Ben Wu',        needsMins: 0,  note: 'Needs 5′ more' },
  { ini: 'RP', name: 'Ryan Petersen', needsMins: 0,  suspended: true },
]

const EVENTS = [
  { time: '58\'', text: 'Jack saves · corner', ini: 'JB', type: 'save' },
  { time: '45\'', text: 'Cal Shah off, half time sub', ini: 'CW', type: 'sub' },
  { time: '40\'', text: 'Reza Karimi off, injury', ini: 'RK', type: 'sub' },
  { time: '28\'', text: 'Goal · Luca from Tyler', ini: 'LB', type: 'goal' },
  { time: '22\'', text: 'Goal · Eli, header', ini: 'EM', type: 'goal' },
  { time: '18\'', text: 'Penalty · yellow card, their no. 7', ini: '!', type: 'card' },
]

export default function LiveGame11Screen({ onClose }: { onClose: () => void }) {
  const [score, setScore] = useState({ us: 1, them: 1 })
  const [suggestedDismissed, setSuggestedDismissed] = useState(false)
  const [toast, setToast] = useState('')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2800) }

  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: '#10211f', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', color: '#fff', position: 'relative' }}>

      {/* Score bar */}
      <div style={{ flex: 'none', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Match day
        </button>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>at Harbour Rovers</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => setScore(s => ({ ...s, us: Math.max(0, s.us - 1) }))} style={{ width: 28, height: 28, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', minWidth: 24, textAlign: 'center' }}>{score.us}</span>
              <button onClick={() => setScore(s => ({ ...s, us: s.us + 1 }))} style={{ width: 28, height: 28, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
            <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)' }}>–</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => setScore(s => ({ ...s, them: Math.max(0, s.them - 1) }))} style={{ width: 28, height: 28, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', minWidth: 24, textAlign: 'center' }}>{score.them}</span>
              <button onClick={() => setScore(s => ({ ...s, them: s.them + 1 }))} style={{ width: 28, height: 28, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          </div>
          <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', fontVariantNumeric: 'tabular-nums' }}>58:12</span>
          <button style={{ height: 32, padding: '0 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Pause</button>
        </div>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>11 a side · 2 × 40 min</span>
      </div>

      {/* Suggested sub banner */}
      {!suggestedDismissed && (
        <div style={{ flex: 'none', margin: '0 24px', borderRadius: 12, background: '#40826d', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Suggested now</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>Cal off, Ari on. Cal's week is 45% over his usual, and Ari has played 18 minutes.</div>
          </div>
          <button onClick={() => { showToast('Sub confirmed: Cal off, Ari on.'); setSuggestedDismissed(true) }} style={{ flex: 'none', height: 36, padding: '0 14px', borderRadius: 8, border: 0, background: '#fff', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Make the change</button>
          <button onClick={() => setSuggestedDismissed(true)} style={{ flex: 'none', height: 36, padding: '0 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Not yet</button>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 12, padding: '0 24px 20px' }}>

        {/* Pitch */}
        <div style={{ background: '#1f4a3e', borderRadius: 16, padding: '16px', position: 'relative', minHeight: 400 }}>
          {/* Pitch markings */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect x="1" y="1" width="98" height="98" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" rx="1" />
            <line x1="50" y1="1" x2="50" y2="99" stroke="rgba(255,255,255,0.1)" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.4" />
            <rect x="1" y="30" width="12" height="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.4" />
            <rect x="87" y="30" width="12" height="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.4" />
          </svg>

          {/* Players */}
          {ON_PITCH.map(p => (
            <div key={p.ini} style={{ position: 'absolute', transform: 'translate(-50%, -50%)', left: `${p.x}%`, top: `${p.y}%` }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 40, height: 40, borderRadius: '999px', background: p.flagType === 'warn' ? '#c39797' : '#40826d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.3)' }}>{p.ini}</div>
                <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap' }}>{p.pos}</div>
                {p.flag && (
                  <div style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 700, background: p.flagType === 'warn' ? '#c39797' : '#40826d', color: '#fff', borderRadius: '999px', padding: '1px 5px', whiteSpace: 'nowrap' }}>{p.flag}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>

          {/* Bench */}
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Bench · third of a game is 27′</div>
            {BENCH.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)', opacity: b.suspended ? 0.4 : 1 }}>
                <div style={{ width: 28, height: 28, borderRadius: '999px', background: b.suspended ? 'rgba(255,255,255,0.1)' : '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', flex: 'none' }}>{b.ini}</div>
                <span style={{ flexGrow: 1, fontSize: 12, color: b.suspended ? 'rgba(255,255,255,0.4)' : '#fff' }}>{b.name}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontVariantNumeric: 'tabular-nums' }}>{b.suspended ? 'Suspended' : b.note ?? `${b.needsMins}′`}</span>
              </div>
            ))}
            <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Ryan Petersen is suspended and isn't on the sheet. 3 of 5 subs used.</div>
          </div>

          {/* Event log */}
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 14px', flexGrow: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Events</div>
            {EVENTS.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: 11, fontVariantNumeric: 'tabular-nums', color: 'rgba(255,255,255,0.5)', width: 28, flex: 'none' }}>{e.time}</span>
                <span style={{ fontSize: 12, color: e.type === 'goal' ? '#eef5f2' : e.type === 'warn' ? '#c39797' : 'rgba(255,255,255,0.75)' }}>{e.text}</span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => showToast('Logging a goal.')} style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Goal</button>
            <button onClick={() => showToast('Logging a card.')} style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Card</button>
            <button onClick={() => showToast('Tagging a good moment.')} style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Good moment</button>
          </div>
        </div>
      </div>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, padding: '10px 16px', borderRadius: 12, background: '#40826d', color: '#fff', fontSize: 14, fontWeight: 600 }}>
          {toast}
        </div>
      )}
    </div>
  )
}
