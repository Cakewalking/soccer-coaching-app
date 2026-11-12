import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const ON_PITCH = [
  { ini: 'SD', name: 'Sam', mins: 37, status: 'over' },
  { ini: 'TR', name: 'Tom', mins: 37, status: 'over' },
  { ini: 'EB', name: 'Ella', mins: 30, status: 'ok' },
  { ini: 'GO', name: 'Grace', mins: 25, status: 'lowcheck' },
  { ini: 'MT', name: 'Mia', mins: 37, status: 'over' },
  { ini: 'JP', name: 'Jai', mins: 33, status: 'ok' },
  { ini: 'ZH', name: 'Zoe', mins: 21, status: 'ok', note: '6 of 8 sprints' },
  { ini: 'NO', name: 'Noah', mins: 19, status: 'warn', note: '8 of 8 sprints' },
  { ini: 'AL', name: 'Ava', mins: 13, status: 'ok' },
]
const BENCH = [
  { ini: 'HQ', name: 'Harper Quinn', mins: 0, note: 'Not tracked yet' },
  { ini: 'FW', name: 'Finn Walsh', mins: 9, note: "Needs 30′ more" },
  { ini: 'OB', name: 'Oscar Brennan', mins: 10, note: "Needs 29′ more" },
  { ini: 'IM', name: 'Isla Morgan', mins: 13, note: "Needs 26′ more" },
  { ini: 'LM', name: 'Leo Marsh', mins: 14, note: "Needs 25′ more" },
]
const SUBS = [
  { time: '39′', label: 'Harper on for Noah', reason: 'Noah has hit the sprint cap Priya set', emoji: 'Now' },
  { time: '40′', label: 'Finn on for Tom', reason: "Finn has 9′, Tom has 37′", emoji: null },
  { time: '43′', label: 'Oscar on for Mia', reason: "Oscar has 10′, Mia has 37′", emoji: null },
]

export default function L1bLiveGameSub(_: { onBack?: () => void }) {
  const [selectedOn, setSelectedOn] = useState<string | null>('MT')
  const [selectedOff, setSelectedOff] = useState<string | null>('HQ')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const statusColor = (s: string) => s === 'over' ? '#c04040' : s === 'warn' ? '#c0a040' : s === 'lowcheck' ? '#6060b0' : MUT
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#0e1a17', color: '#fff', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ flex: 'none', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 24, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e04040', animation: 'pulse 1s infinite' }}/>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>LIVE · 2nd half</span>
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>37:14</div>
        <button onClick={() => st('Paused.')} style={{ height: 36, padding: '0 14px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Pause</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto' }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>Wattle Creek</span>
          <button onClick={() => st('Score changed.')} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>−</button>
          <span style={{ fontSize: 24, fontWeight: 800 }}>2–1</span>
          <button onClick={() => st('Score changed.')} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>−</button>
          <span style={{ fontSize: 16, fontWeight: 700 }}>Harbour Rovers</span>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '14px 20px', display: 'grid', gridTemplateColumns: '1fr 260px 260px', gap: 16, overflow: 'hidden' }}>
        {/* On pitch */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>On the pitch · Now tap who's coming on</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: 12 }}>
            {ON_PITCH.map(p => (
              <button key={p.ini} onClick={() => setSelectedOn(p.ini)} style={{ padding: '10px', borderRadius: 10, border: `2px solid ${selectedOn === p.ini ? '#fff' : 'rgba(255,255,255,0.15)'}`, background: selectedOn === p.ini ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left' as const }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{p.ini}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: statusColor(p.status) }}>{p.status === 'over' ? 'Over' : p.status === 'warn' ? 'Needs minutes' : p.status === 'lowcheck' ? 'Low check-in' : 'Fair share'}</span>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{p.name} · {p.mins}′</div>
                {p.note && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{p.note}</div>}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Suggested subs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {SUBS.map((sub, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '8px 12px', alignItems: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', width: 36, flexShrink: 0 }}>{sub.emoji ? <span style={{ background: G, color: '#fff', padding: '2px 6px', borderRadius: 4, fontSize: 10 }}>Now</span> : sub.time}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{sub.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{sub.reason}</div>
                </div>
                <button onClick={() => st(`Sub confirmed: ${sub.label}`)} style={{ height: 32, padding: '0 12px', borderRadius: 6, background: G, border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Do it</button>
              </div>
            ))}
          </div>
        </div>
        {/* Bench */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Bench · Tap who's coming on</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {BENCH.map(p => (
              <button key={p.ini} onClick={() => setSelectedOff(p.ini)} style={{ padding: '10px 12px', borderRadius: 10, border: `2px solid ${selectedOff === p.ini ? '#fff' : 'rgba(255,255,255,0.15)'}`, background: selectedOff === p.ini ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left' as const }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{p.ini}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{p.note}</div>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: p.mins === 0 ? MUT : 'rgba(255,255,255,0.4)' }}>{p.mins}′</div>
                </div>
              </button>
            ))}
          </div>
          {selectedOn && selectedOff && (
            <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>Harper Quinn on for Mia Tran. Harper will end on 23′, Mia on 37′.</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => st('Cancelled.')} style={{ flex: 1, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => st('Sub made!')} style={{ flex: 1, height: 40, borderRadius: 8, background: G, border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Make the sub</button>
              </div>
            </div>
          )}
        </div>
        {/* Tags */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Tag this moment</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
            {['Good moment', 'To work on', 'Our goal', 'Their goal', 'Injury'].map(tag => (
              <button key={tag} onClick={() => st(`Tagged: ${tag}`)} style={{ height: 44, borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{tag}</button>
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Tagged for the review</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[{ min: 9, tag: 'Good moment' }, { min: 17, tag: 'Our goal' }, { min: 26, tag: 'To work on' }, { min: 33, tag: 'Our goal' }, { min: 35, tag: 'Their goal' }].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', width: 44 }}>Min {t.min}</span>
                <span style={{ fontSize: 12, color: '#fff' }}>{t.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      {toast && <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
