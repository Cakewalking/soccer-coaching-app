import { useState } from 'react'
import { DATA, type Role } from '../data'

interface Props {
  role: Role
  onClose: () => void
}

export default function TeamTalkScreen({ role, onClose }: Props) {
  const [playerView, setPlayerView] = useState(false)
  const [slide, setSlide] = useState(0)
  const focus = DATA[role].focus
  const f = focus[slide]
  const total = focus.length

  const pct = (val: string, max: number) => {
    const v = parseFloat(val)
    return Math.min(100, Math.round((v / max) * 100)) + '%'
  }

  return (
    <div style={{
      width: '100%', minHeight: '100vh',
      background: '#10211f', color: '#ffffff',
      fontFamily: 'var(--font-sans)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px' }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: '#7cc4ab' }}>Team talk · U14 · Wattle Creek FC</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 16, color: '#a3b0ad' }}>{slide + 1} of {total}</span>
          <button
            onClick={() => setPlayerView(v => !v)}
            style={{
              height: 44, padding: '0 20px', borderRadius: '999px',
              border: '1px solid #a3b0ad', background: playerView ? '#2f4442' : 'transparent',
              color: '#ffffff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}
          >
            {playerView ? 'Coach view' : 'Show the team'}
          </button>
          <button
            onClick={onClose}
            style={{
              height: 44, padding: '0 20px', borderRadius: '999px',
              border: '1px solid #a3b0ad', background: 'transparent',
              color: '#ffffff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Close
          </button>
          <button
            onClick={() => setSlide(s => Math.min(total - 1, s + 1))}
            disabled={slide === total - 1}
            style={{
              height: 44, padding: '0 24px', borderRadius: '999px', border: 0,
              background: slide < total - 1 ? '#40826d' : '#2f4442',
              color: slide < total - 1 ? '#ffffff' : '#6f8581',
              fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: slide < total - 1 ? 'pointer' : 'default',
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Two-column content */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 40, padding: '0 40px 32px', alignItems: 'center' }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
          <div style={{ fontSize: 72, lineHeight: '72px', fontWeight: 700, color: '#7cc4ab', letterSpacing: '-0.03em' }}>
            {slide + 1}
          </div>
          <h1 style={{ margin: 0, fontSize: 48, lineHeight: '52px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            {f.title}
          </h1>
          <p style={{ margin: 0, fontSize: 22, lineHeight: '30px', color: '#e9eae8' }}>
            {f.reason}
          </p>

          {/* Data bars */}
          <div style={{ background: '#172725', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 15, lineHeight: '20px', color: '#a3b0ad' }}>
              {f.source} · {f.metric}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 'none', width: 96, fontSize: 17 }}>{f.aLabel}</div>
              <div style={{ flexGrow: 1, height: 18, borderRadius: 9, background: '#2f4442' }}>
                <div style={{ height: 18, borderRadius: 9, background: '#7cc4ab', width: pct(f.aVal, f.max) }} />
              </div>
              <div style={{ flex: 'none', width: 48, textAlign: 'right', fontSize: 22, fontWeight: 700 }}>{f.aVal}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 'none', width: 96, fontSize: 17, color: '#a3b0ad' }}>{f.bLabel}</div>
              <div style={{ flexGrow: 1, height: 18, borderRadius: 9, background: '#2f4442' }}>
                <div style={{ height: 18, borderRadius: 9, background: '#a3b0ad', width: pct(f.bVal, f.max) }} />
              </div>
              <div style={{ flex: 'none', width: 48, textAlign: 'right', fontSize: 22, fontWeight: 700, color: '#a3b0ad' }}>{f.bVal}</div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
          {/* Video area */}
          <div style={{
            position: 'relative', height: 300, borderRadius: 20,
            background: '#172725', border: '1px solid #2f4442',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '999px',
              border: '3px solid #ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                <polygon points="8 5 19 12 8 19 8 5" />
              </svg>
            </div>
          </div>

          {/* Clip context */}
          <div style={{ fontSize: 20, lineHeight: '28px' }}>
            <strong>Min {f.clipTime.replace('Min ', '')}.</strong> {f.clipText}
          </div>
          <div style={{ fontSize: 15, lineHeight: '20px', color: '#a3b0ad' }}>
            Clip from Saturday's match camera. {f.clipCount} clips in total.
          </div>

          {/* Clip count pills */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {Array.from({ length: f.clipCount }).map((_, i) => (
              <div key={i} style={{ width: 48, height: 6, borderRadius: '999px', background: i === 0 ? '#7cc4ab' : '#2f4442' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
