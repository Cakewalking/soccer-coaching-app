import { useState } from 'react'
import type { GameClip } from '../../data'
import { resultColor } from './clipData'

export function PitchThumb({ type, measures }: { type: GameClip['type']; measures: string[] }) {
  const color = type === 'good' ? '#2f6252' : '#9d7c80'
  const isMid = measures.includes('Building out')
  const isHigh = measures.includes('Pressing high') || measures.includes('Goals and chances')
  return (
    <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: 8, background: '#10211f', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
        <rect x="4" y="4" width="152" height="92" rx="2" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"/>
        <line x1="80" y1="4" x2="80" y2="96" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <circle cx="80" cy="50" r="12" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>
        {isHigh && <>
          <circle cx="40" cy="25" r="4" fill={color} opacity="0.9"/>
          <circle cx="60" cy="20" r="4" fill={color} opacity="0.9"/>
          <circle cx="50" cy="35" r="4" fill="rgba(255,255,255,0.4)" opacity="0.9"/>
          <line x1="40" y1="25" x2="50" y2="35" stroke={color} strokeWidth="1.5" opacity="0.7"/>
        </>}
        {isMid && <>
          <circle cx="80" cy="50" r="4" fill={color} opacity="0.9"/>
          <circle cx="60" cy="45" r="4" fill={color} opacity="0.9"/>
          <circle cx="100" cy="55" r="4" fill="rgba(255,255,255,0.4)" opacity="0.9"/>
          <line x1="60" y1="45" x2="80" y2="50" stroke={color} strokeWidth="1.5" opacity="0.7"/>
        </>}
        {!isHigh && !isMid && <>
          <circle cx="120" cy="30" r="4" fill={color} opacity="0.9"/>
          <circle cx="110" cy="50" r="4" fill={color} opacity="0.9"/>
          <circle cx="130" cy="50" r="4" fill="rgba(255,255,255,0.4)" opacity="0.9"/>
        </>}
      </svg>
      <div style={{
        position: 'absolute', top: 6, left: 6,
        background: type === 'good' ? 'rgba(64,130,109,0.9)' : 'rgba(157,124,128,0.9)',
        color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '2px 6px',
      }}>{type === 'good' ? 'Good example' : 'To work on'}</div>
    </div>
  )
}

export function ClipCard({ clip, selected, onClick }: { clip: GameClip; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', gap: 8, padding: 12,
      border: `1.5px solid ${selected ? '#40826d' : '#e9eae8'}`,
      borderRadius: 12, background: selected ? '#f0f8f4' : '#ffffff',
      cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%',
    }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <PitchThumb type={clip.type} measures={clip.measures} />
        <span style={{ position: 'absolute', bottom: 6, right: 6, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 11, borderRadius: 4, padding: '2px 6px' }}>{clip.duration}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f', lineHeight: '17px' }}>{clip.title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 11, color: '#6f7f7b' }}>{clip.gameLabel} · min {clip.min}</span>
        {clip.taggedBy && <span style={{ fontSize: 11, background: '#e8f2ee', color: '#2f6252', borderRadius: 4, padding: '1px 5px', fontWeight: 600 }}>Tagged by you</span>}
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {clip.players.map(ini => (
          <span key={ini} style={{ width: 24, height: 24, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{ini}</span>
        ))}
      </div>
    </button>
  )
}

export function ClipDetail({ clip }: { clip: GameClip }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  const stats = [
    clip.stat1Label ? { label: clip.stat1Label, value: clip.stat1Value } : null,
    clip.stat2Label ? { label: clip.stat2Label, value: clip.stat2Value } : null,
    clip.stat3Label ? { label: clip.stat3Label, value: clip.stat3Value } : null,
    clip.stat4Label ? { label: clip.stat4Label, value: clip.stat4Value } : null,
  ].filter(Boolean) as Array<{ label: string; value?: string }>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden' }}>
        <PitchThumb type={clip.type} measures={clip.measures} />
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: '#6f7f7b' }}>Min {clip.min}</span>
          <span style={{ width: 1, height: 12, background: '#e9eae8', display: 'block' }} />
          <span style={{ fontSize: 13, color: '#6f7f7b' }}>{clip.duration}</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', lineHeight: '23px', marginBottom: 8 }}>{clip.title}</div>
        <div style={{ fontSize: 14, lineHeight: '20px', color: '#4a5a57', marginBottom: 10 }}>{clip.desc}</div>
      </div>
      {stats.length > 0 && (
        <div style={{ background: '#f7f8f7', borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#4a5a57' }}>{s.value}</span>
              <span style={{ fontWeight: 700, color: '#10211f' }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {clip.measures.map(m => (
          <span key={m} style={{ background: '#e8f2ee', color: '#2f6252', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 }}>{m}</span>
        ))}
        <span style={{ background: '#f7f8f7', border: '1px solid #e9eae8', color: '#6f7f7b', borderRadius: 6, padding: '3px 8px', fontSize: 12 }}>{clip.half}</span>
        <span style={{ ...resultColor(clip.gameResult), borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 700 }}>{clip.gameLabel}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={() => st('Added to team talk.')} style={{ height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add to team talk</button>
        <button onClick={() => st(`Sent to ${clip.players.length} players.`)} style={{ height: 44, borderRadius: 10, border: 0, background: '#40826d', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send to {clip.players.length} players</button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => st('Added to playlist.')} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Add to playlist</button>
          <button onClick={() => st('Opening drawing tool.')} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Draw on it</button>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}

export function DropChip({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      height: 32, padding: '0 12px', borderRadius: '999px',
      border: '1px solid #e9eae8', background: '#ffffff',
      fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#6f7f7b',
      display: 'flex', alignItems: 'center', gap: 4,
    }}>
      {label}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
    </button>
  )
}
