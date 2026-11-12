import { useState } from 'react'

interface OnPitchPlayer {
  ini: string; name: string; mins: number; pos: string; x: number; y: number
  flag?: string; flagType?: 'warn' | 'info'
}
interface BenchPlayer {
  ini: string; name: string; needsMins: number; note?: string; noKit?: boolean; blurred?: boolean
}

const ON_PITCH: OnPitchPlayer[] = [
  { ini: 'SD', name: 'Sam',   mins: 37, pos: 'GK',  x: 15,  y: 50, },
  { ini: 'TR', name: 'Tom',   mins: 37, pos: 'CB',  x: 28,  y: 25, },
  { ini: 'EB', name: 'Ella',  mins: 30, pos: 'CB',  x: 28,  y: 65, flag: 'Low check-in', flagType: 'warn' },
  { ini: 'GO', name: 'Grace', mins: 25, pos: 'CB',  x: 28,  y: 85, },
  { ini: 'MT', name: 'Mia',   mins: 37, pos: 'MF',  x: 45,  y: 42, },
  { ini: 'NO', name: 'Noah',  mins: 19, pos: 'MF',  x: 45,  y: 70, flag: '8 of 8 sprints', flagType: 'warn' },
  { ini: 'JP', name: 'Jai',   mins: 33, pos: 'MF',  x: 55,  y: 58, },
  { ini: 'ZH', name: 'Zoe',   mins: 21, pos: 'FW',  x: 68,  y: 25, flag: '6 of 8 sprints', flagType: 'info' },
  { ini: 'AL', name: 'Ava',   mins: 13, pos: 'FW',  x: 75,  y: 72, },
]

const BENCH: BenchPlayer[] = [
  { ini: 'HQ', name: 'Harper Quinn',  needsMins: 0,  note: 'Not tracked yet' },
  { ini: 'FW', name: 'Finn Walsh',    needsMins: 23, },
  { ini: 'OB', name: 'Oscar Brennan', needsMins: 22, },
  { ini: 'LN', name: 'Lily Nguyen',   needsMins: 22, blurred: true },
  { ini: 'IM', name: 'Isla Morgan',   needsMins: 19, },
  { ini: 'LM', name: 'Leo Marsh',     needsMins: 18, },
  { ini: 'RC', name: 'Ruby Chen',     needsMins: 16, noKit: true },
  { ini: 'KR', name: 'Kai Russo',     needsMins: 16, },
]

type MarkType = 'good' | 'work' | 'ourgoal' | 'theirgoal' | 'injury'

interface MarkedMoment { type: MarkType; min: string }

const MARK_BUTTONS: Array<{ type: MarkType; label: string; icon: string; bg: string; color: string }> = [
  { type: 'good',      label: 'Good moment', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', bg: '#e4f2eb', color: '#2f6252' },
  { type: 'work',      label: 'To work on',  icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-6v-4m0-4h.01', bg: '#fdf0ee', color: '#7a3030' },
  { type: 'ourgoal',   label: 'Our goal',    icon: 'M12 22a10 10 0 100-20 10 10 0 000 20zm0-10V7', bg: '#e4f2eb', color: '#2f6252' },
  { type: 'theirgoal', label: 'Their goal',  icon: 'M12 22a10 10 0 100-20 10 10 0 000 20zm0-10V7', bg: '#fdf0ee', color: '#7a3030' },
  { type: 'injury',    label: '+ Injury',    icon: 'M12 5v14M5 12h14', bg: '#fdf8f4', color: '#8a4a10' },
]

function PitchMap({ players, selected, onSelect, subFrom }: {
  players: OnPitchPlayer[]
  selected: string | null
  onSelect: (ini: string) => void
  subFrom: string | null
}) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', maxHeight: 320, display: 'block' }} aria-label="Pitch">
      <rect width="100" height="100" fill="#3a7a5a" rx="4"/>
      <rect x="3" y="3" width="94" height="94" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" rx="2"/>
      <line x1="50" y1="3" x2="50" y2="97" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6"/>
      <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6"/>
      <rect x="3" y="35" width="12" height="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6"/>
      <rect x="85" y="35" width="12" height="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6"/>
      {players.map(p => {
        const isSub = p.ini === subFrom
        const isSelected = p.ini === selected
        return (
          <g key={p.ini} onClick={() => onSelect(p.ini)} style={{ cursor: 'pointer' }}>
            <circle cx={p.x} cy={p.y} r={isSub ? 6.5 : 5.5}
              fill={isSub ? '#c3e6d4' : isSelected ? '#ffffff' : '#1f4a3e'}
              stroke={isSub ? '#40826d' : isSelected ? '#40826d' : 'rgba(255,255,255,0.5)'}
              strokeWidth={isSub || isSelected ? 1.5 : 0.8}/>
            <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle"
              fontSize="3.5" fontWeight="700" fill={isSub ? '#1f4a3e' : '#ffffff'}>{p.ini}</text>
            <text x={p.x} y={p.y + 6.5} textAnchor="middle" fontSize="2.8" fill="rgba(255,255,255,0.8)">{p.name} · {p.mins}'</text>
            {p.flag && (
              <rect x={p.x - 8} y={p.y + 8} width="16" height="4" rx="1"
                fill={p.flagType === 'warn' ? '#fbe9e9' : '#e4f2eb'}/>
            )}
            {p.flag && (
              <text x={p.x} y={p.y + 10.4} textAnchor="middle" fontSize="2.2"
                fill={p.flagType === 'warn' ? '#7a3030' : '#1f4a3e'}>{p.flag}</text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export default function LiveGameScreen({ onClose }: { onClose: () => void }) {
  const [subFrom, setSubFrom] = useState<string | null>(null)
  const [subTo, setSubTo] = useState<string | null>(null)
  const [score, setScore] = useState({ home: 2, away: 1 })
  const [timer] = useState('37:14')
  const [half] = useState('2nd half')
  const [moments, setMoments] = useState<MarkedMoment[]>([
    { type: 'good',    min: 'Min 9' },
    { type: 'ourgoal', min: 'Min 17' },
    { type: 'work',    min: 'Min 26' },
  ])
  const [showSubConfirm, setShowSubConfirm] = useState(false)
  const [toast, setToast] = useState<string|null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  function handlePitchTap(ini: string) {
    if (subFrom === ini) { setSubFrom(null); setSubTo(null); setShowSubConfirm(false); return }
    setSubFrom(ini)
    setSubTo(null)
    setShowSubConfirm(false)
  }

  function handleBenchTap(ini: string) {
    if (subFrom) { setSubTo(ini); setShowSubConfirm(true) }
  }

  function makeSub() {
    setSubFrom(null); setSubTo(null); setShowSubConfirm(false)
  }

  function markMoment(type: MarkType) {
    const min = `Min ${Math.round(parseFloat(timer.split(':')[0]))}`
    setMoments(m => [{ type, min }, ...m])
  }

  const subFromPlayer = ON_PITCH.find(p => p.ini === subFrom)
  const subToPlayer   = BENCH.find(p => p.ini === subTo)
  const suggestedSub  = BENCH[0]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#f7f9f7', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      {/* Header */}
      <div style={{ flex: 'none', background: '#10211f', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#c33030', color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', borderRadius: '999px', padding: '3px 10px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '999px', background: '#fff', display: 'inline-block' }}/>
            LIVE
          </span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{half}</span>
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '0.03em' }}>{timer}</div>
        <button onClick={() => showToast('Timer paused.')} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Pause</button>
        <div style={{ flexGrow: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700, color: '#fff' }}>
          <span>Wattle Creek</span>
          <button onClick={() => setScore(s => ({ ...s, home: Math.max(0, s.home - 1) }))} style={{ width: 20, height: 20, borderRadius: 4, border: 0, background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>−</button>
          <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '0.03em' }}>{score.home}–{score.away}</span>
          <button onClick={() => setScore(s => ({ ...s, home: s.home + 1 }))} style={{ width: 20, height: 20, borderRadius: 4, border: 0, background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>+</button>
          <span>Harbour Rovers</span>
        </div>
        <div style={{ flexGrow: 1 }} />
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: pitch */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 'none', padding: '10px 20px 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>On the pitch</span>
            <span style={{ fontSize: 13, color: '#6f7f7b' }}>{subFrom ? 'Now tap who\'s coming on' : 'Tap a player to sub them off'}</span>
            <div style={{ flexGrow: 1 }} />
            <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#6f7f7b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '999px', background: '#40826d', display: 'inline-block' }}/>Fair share</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '999px', background: '#c3e6d4', display: 'inline-block' }}/>Over</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '999px', background: '#c39797', display: 'inline-block' }}/>Needs minutes</span>
            </div>
          </div>
          <div style={{ flexGrow: 1, padding: '0 20px', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <PitchMap players={ON_PITCH} selected={subFrom} onSelect={handlePitchTap} subFrom={subFrom} />
          </div>

          {/* Sub confirm bar */}
          {showSubConfirm && subFromPlayer && subToPlayer && (
            <div style={{ flex: 'none', margin: '8px 20px', padding: '12px 16px', background: '#1f4a3e', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flexGrow: 1, fontSize: 14, color: '#ffffff', lineHeight: '20px' }}>
                <strong>{subToPlayer.name}</strong> on for <strong>{subFromPlayer.name}</strong>. {subToPlayer.name} will end on {37 - (subFromPlayer.mins - 23)}′. {subFromPlayer.name} on {subFromPlayer.mins}′.
              </div>
              <button onClick={() => { setSubFrom(null); setSubTo(null); setShowSubConfirm(false) }} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={makeSub} style={{ height: 44, padding: '0 16px', borderRadius: '999px', border: 0, background: '#40826d', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Make the sub</button>
            </div>
          )}

          {/* Bottom mark buttons */}
          <div style={{ flex: 'none', padding: '10px 20px', borderTop: '1px solid #e9eae8', background: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            {MARK_BUTTONS.map(btn => (
              <button key={btn.type} onClick={() => markMoment(btn.type)} style={{
                height: 36, padding: '0 14px', borderRadius: '999px', border: 0,
                background: btn.bg, color: btn.color,
                fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill={btn.type === 'good' ? 'currentColor' : 'none'} stroke={btn.type === 'good' ? 'none' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={btn.icon}/></svg>
                {btn.label}
              </button>
            ))}
            {moments.length > 0 && (
              <>
                <div style={{ width: 1, height: 20, background: '#e9eae8', margin: '0 4px' }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6f7f7b', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Tagged for review</span>
                {moments.slice(0, 4).map((m, i) => (
                  <span key={i} style={{
                    fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: '999px',
                    background: m.type === 'ourgoal' ? '#e4f2eb' : m.type === 'theirgoal' ? '#fdf0ee' : m.type === 'good' ? '#e4f2eb' : m.type === 'work' ? '#fdf0ee' : '#fdf8f4',
                    color: m.type === 'theirgoal' || m.type === 'work' ? '#7a3030' : '#2f6252',
                  }}>{m.min} · {m.type === 'ourgoal' ? 'Our goal' : m.type === 'theirgoal' ? 'Their goal' : m.type === 'good' ? 'Good' : m.type === 'work' ? 'To work on' : 'Injury'}</span>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Right: bench */}
        <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Suggested sub */}
          <div style={{ flex: 'none', padding: '14px 16px', borderBottom: '1px solid #e9eae8', background: '#f7f9f7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Suggested subs</span>
              <span style={{ fontSize: 12, color: '#6f7f7b' }}>Fair share 32′</span>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', border: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div>
                <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 2 }}>Now</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{suggestedSub.name} on for Noah</div>
                <div style={{ fontSize: 12, color: '#4a5a57' }}>Noah has hit the sprint cap · Priya set</div>
              </div>
              <button onClick={() => handleBenchTap(suggestedSub.ini)} style={{ marginLeft: 'auto', height: 44, padding: '0 12px', borderRadius: 8, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Do it</button>
            </div>
          </div>

          {/* Bench list */}
          <div style={{ flex: 'none', padding: '10px 16px 6px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Bench</span>
            <span style={{ fontSize: 12, color: '#6f7f7b' }}>Tap who's coming on</span>
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            {BENCH.map((p, i) => (
              <button key={p.ini} onClick={() => handleBenchTap(p.ini)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', width: '100%',
                borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', border: 0,
                background: subTo === p.ini ? '#f0f8f4' : '#fff',
                fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: '999px', background: p.blurred ? '#d6d9d7' : '#cbbeb5', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b' }}>{p.note ?? (p.noKit ? 'No kit' : p.blurred ? 'Blurred in video' : `Needs ${p.needsMins}′ more`)}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', flexShrink: 0 }}>{p.needsMins}′</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
