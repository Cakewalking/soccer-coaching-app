import { useState } from 'react'
import { CLIPS, CLIPS_GAMES, CLIPS_MEASURES, type GameClip } from '../data'

type FilterMode = 'game' | 'measure' | 'player'
type TypeFilter = 'all' | 'good' | 'work'

const PLAYERS = [
  { ini: 'MT', name: 'Mia',  fullName: 'Mia Tran'   },
  { ini: 'NO', name: 'Noah', fullName: 'Noah Owen'   },
  { ini: 'EB', name: 'Ella', fullName: 'Ella Brandt' },
  { ini: 'JP', name: 'Jai',  fullName: 'Jai Patel'   },
  { ini: 'ZH', name: 'Zoe',  fullName: 'Zoe Hartley' },
]

const GAME_FULL: Record<string, { title: string; sub: string }> = {
  ironbark:  { title: 'Ironbark United · Sat 31 Oct · Won 3–1',  sub: 'Full match recorded · highlights are 4 min · review ready' },
  saltmarsh: { title: 'Saltmarsh FC · Sat 24 Oct · Lost 1–2',    sub: 'Full match recorded · highlights are 3 min' },
  northgate: { title: 'Northgate FC · Sat 17 Oct · Drew 1–1',    sub: 'Full match recorded · highlights are 2 min' },
  bayside:   { title: 'Bayside FC · Sat 10 Oct · Won 2–0',       sub: 'Full match recorded · highlights are 4 min' },
}

const MEASURE_INFO: Record<string, string> = {
  'Pressing high':     'Our target 5 wins a game · last 4 games avg 4 · from Our style',
  'Winning it back':   'Our target under 6 s · last 4 games avg 7 s · from Our style',
  'Building out':      'Our target 8 passes a game · last 4 games avg 7 · from Our style',
  'Counter-attacks':   'Our target 2 goals a game · from Our style',
  'Gap between lines': 'Our target under 20 m · last 4 games avg 26 m · from Our style',
  'Won in their half': 'Our target 12 a game · last 4 games 10 a game · from Our style',
}

function resultColor(r: 'W' | 'L' | 'D') {
  if (r === 'W') return { bg: '#2f6252', color: '#ffffff' }
  if (r === 'L') return { bg: '#c39797', color: '#10211f' }
  return { bg: '#e9eae8', color: '#10211f' }
}

function PitchThumb({ type, measures }: { type: GameClip['type']; measures: string[] }) {
  const color = type === 'good' ? '#2f6252' : '#9d7c80'
  const isMid = measures.includes('Building out')
  const isHigh = measures.includes('Pressing high') || measures.includes('Won in their half')
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

function ClipCard({ clip, selected, onClick }: { clip: GameClip; selected: boolean; onClick: () => void }) {
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

function ClipDetail({ clip }: { clip: GameClip }) {
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
      {clip.stat1Label && (
        <div style={{ background: '#f7f8f7', borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#4a5a57' }}>{clip.stat1Value}</span>
            <span style={{ fontWeight: 700, color: '#10211f' }}>{clip.stat1Label}</span>
          </div>
          {clip.stat2Label && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#4a5a57' }}>{clip.stat2Value}</span>
            <span style={{ fontWeight: 700, color: '#10211f' }}>{clip.stat2Label}</span>
          </div>}
        </div>
      )}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {clip.measures.map(m => (
          <span key={m} style={{ background: '#e8f2ee', color: '#2f6252', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 }}>{m}</span>
        ))}
        <span style={{ background: '#f7f8f7', border: '1px solid #e9eae8', color: '#6f7f7b', borderRadius: 6, padding: '3px 8px', fontSize: 12 }}>{clip.half}</span>
        {clip.gameResult && (
          <span style={{ ...resultColor(clip.gameResult), borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 700 }}>{clip.gameLabel}</span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button style={{ height: 44, borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add to team talk</button>
        <button style={{ height: 44, borderRadius: 10, border: 0, background: '#40826d', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send to {clip.players.length} players</button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Add to playlist</button>
          <button style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#10211f' }}>Draw on it</button>
        </div>
      </div>
    </div>
  )
}

function DropChip({ label }: { label: string }) {
  return (
    <button style={{
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

export default function ClipsScreen() {
  const [filterMode, setFilterMode] = useState<FilterMode>('game')
  const [activeGame, setActiveGame] = useState<string>('all')
  const [activeMeasure, setActiveMeasure] = useState<string | null>(null)
  const [activePlayer, setActivePlayer] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [selected, setSelected] = useState<GameClip>(CLIPS[0])

  const baseFiltered = CLIPS.filter(c => {
    if (filterMode === 'game'    && activeGame)      return activeGame === 'all' || c.game === activeGame
    if (filterMode === 'measure' && activeMeasure)   return c.measures.includes(activeMeasure)
    if (filterMode === 'player'  && activePlayer)    return c.players.includes(activePlayer)
    return true
  })

  const filtered = baseFiltered.filter(c => {
    if (typeFilter === 'good') return c.type === 'good'
    if (typeFilter === 'work') return c.type === 'work'
    return true
  })

  // Context header data
  const game = activeGame !== 'all' ? CLIPS_GAMES.find(g => g.id === activeGame) : null
  const gameCtx = game ? GAME_FULL[game.id] : null
  const baseGameCount = activeGame === 'all' ? CLIPS.length : CLIPS.filter(c => c.game === activeGame).length
  const playerInfo = activePlayer ? PLAYERS.find(p => p.ini === activePlayer) : null
  const playerClipCount = activePlayer ? CLIPS.filter(c => c.players.includes(activePlayer)).length : CLIPS.length

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Primary filter bar */}
      <div style={{ flex: 'none', padding: '14px 32px 0', borderBottom: '1px solid #e9eae8', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#10211f', letterSpacing: '-0.02em' }}>Clips</span>
            <span style={{ fontSize: 14, color: '#6f7f7b', marginLeft: 10 }}>{CLIPS.length} clips · {CLIPS_GAMES.length} games</span>
          </div>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: 'flex', gap: 2, background: '#f7f8f7', borderRadius: '999px', padding: 3 }}>
            {(['game', 'measure', 'player'] as FilterMode[]).map(m => (
              <button key={m} onClick={() => setFilterMode(m)} style={{
                height: 32, padding: '0 16px', borderRadius: '999px', border: 0,
                background: filterMode === m ? '#ffffff' : 'transparent',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                color: filterMode === m ? '#10211f' : '#6f7f7b',
                boxShadow: filterMode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}>By {m}</button>
            ))}
          </div>
          <button style={{ width: 40, height: 40, borderRadius: '999px', border: '1px solid #e9eae8', background: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6f7f7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
        </div>

        {/* Mode-specific chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 12 }}>
          {filterMode === 'game' && <>
            <button onClick={() => setActiveGame('all')} style={{
              height: 36, padding: '0 14px', borderRadius: '999px',
              border: `1.5px solid ${activeGame === 'all' ? '#40826d' : '#e9eae8'}`,
              background: activeGame === 'all' ? '#f0f8f4' : '#ffffff',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f',
            }}>All games <span style={{ fontSize: 12, color: '#6f7f7b', fontWeight: 400 }}>{CLIPS.length}</span></button>
            {CLIPS_GAMES.map(g => {
              const rc = resultColor(g.result)
              return (
                <button key={g.id} onClick={() => setActiveGame(g.id)} style={{
                  height: 36, padding: '0 14px', borderRadius: '999px',
                  border: `1.5px solid ${activeGame === g.id ? '#40826d' : '#e9eae8'}`,
                  background: activeGame === g.id ? '#f0f8f4' : '#ffffff',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  color: '#10211f', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ ...rc, width: 20, height: 20, borderRadius: '999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{g.result}</span>
                  {g.label}
                  <span style={{ fontSize: 12, color: '#6f7f7b', fontWeight: 400 }}>{CLIPS.filter(c => c.game === g.id).length}</span>
                </button>
              )
            })}
          </>}
          {filterMode === 'measure' && CLIPS_MEASURES.map(m => (
            <button key={m} onClick={() => setActiveMeasure(activeMeasure === m ? null : m)} style={{
              height: 36, padding: '0 14px', borderRadius: '999px',
              border: `1.5px solid ${activeMeasure === m ? '#40826d' : '#e9eae8'}`,
              background: activeMeasure === m ? '#f0f8f4' : '#ffffff',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '999px', background: activeMeasure === m ? '#40826d' : '#c5c8c4', flexShrink: 0 }} />
              {m}
              <span style={{ fontSize: 12, color: '#6f7f7b', fontWeight: 400 }}>{CLIPS.filter(c => c.measures.includes(m)).length}</span>
            </button>
          ))}
          {filterMode === 'player' && <>
            <button onClick={() => setActivePlayer(null)} style={{
              height: 36, padding: '0 14px', borderRadius: '999px',
              border: `1.5px solid ${!activePlayer ? '#40826d' : '#e9eae8'}`,
              background: !activePlayer ? '#f0f8f4' : '#ffffff',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f',
            }}>Everyone <span style={{ fontWeight: 400, fontSize: 12, color: '#6f7f7b' }}>{CLIPS.length} clips</span></button>
            {PLAYERS.map(p => (
              <button key={p.ini} onClick={() => setActivePlayer(activePlayer === p.ini ? null : p.ini)} style={{
                height: 36, padding: '0 14px', borderRadius: '999px',
                border: `1.5px solid ${activePlayer === p.ini ? '#40826d' : '#e9eae8'}`,
                background: activePlayer === p.ini ? '#f0f8f4' : '#ffffff',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ width: 20, height: 20, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{p.ini}</span>
                {p.name}
                <span style={{ fontSize: 12, color: '#6f7f7b', fontWeight: 400 }}>{CLIPS.filter(c => c.players.includes(p.ini)).length}</span>
              </button>
            ))}
          </>}
        </div>
      </div>

      {/* Selected context header */}
      {(filterMode === 'game' && gameCtx) || (filterMode === 'measure' && activeMeasure) || (filterMode === 'player' && playerInfo) ? (
        <div style={{ flex: 'none', padding: '12px 32px', borderBottom: '1px solid #e9eae8', background: '#fafafa', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>
              {filterMode === 'game' && gameCtx?.title}
              {filterMode === 'measure' && activeMeasure}
              {filterMode === 'player' && playerInfo && `${playerInfo.fullName} · ${playerClipCount} clips this season`}
            </div>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>
              {filterMode === 'game' && gameCtx?.sub}
              {filterMode === 'measure' && activeMeasure && MEASURE_INFO[activeMeasure]}
              {filterMode === 'player' && 'Share a good example and one to work on before Saturday'}
            </div>
          </div>
          <button style={{
            flex: 'none', height: 36, padding: '0 16px', borderRadius: '999px',
            border: 0, background: '#10211f', color: '#ffffff',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 7,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            {filterMode === 'game' && gameCtx ? 'Highlights' : `Play all ${filtered.length}`}
          </button>
        </div>
      ) : null}

      {/* Secondary filter row (All / Good / To work on + dropdowns) */}
      <div style={{ flex: 'none', padding: '10px 32px', borderBottom: '1px solid #e9eae8', background: '#ffffff', display: 'flex', alignItems: 'center', gap: 8 }}>
        {(['all', 'good', 'work'] as TypeFilter[]).map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} style={{
            height: 32, padding: '0 14px', borderRadius: '999px',
            border: `1px solid ${typeFilter === t ? '#40826d' : '#e9eae8'}`,
            background: typeFilter === t ? '#f0f8f4' : '#ffffff',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            color: typeFilter === t ? '#2f6252' : '#6f7f7b',
          }}>{t === 'all' ? 'All' : t === 'good' ? 'Good' : 'To work on'}</button>
        ))}
        <div style={{ width: 1, height: 20, background: '#e9eae8', margin: '0 4px' }} />
        <DropChip label="Area" />
        <DropChip label="Half" />
        <DropChip label="Source" />
        <DropChip label="Found by" />
        <div style={{ flexGrow: 1 }} />
        <span style={{ fontSize: 13, color: '#6f7f7b' }}>{filtered.length} clips</span>
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Clip grid */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {filtered.map(clip => (
              <ClipCard key={clip.id} clip={clip} selected={selected.id === clip.id} onClick={() => setSelected(clip)} />
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: 'span 3', padding: 40, textAlign: 'center', color: '#6f7f7b', fontSize: 15 }}>No clips match this filter.</div>
            )}
          </div>
        </div>

        {/* Right detail panel */}
        <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', padding: '20px', overflowY: 'auto', background: '#ffffff' }}>
          <ClipDetail clip={selected} />
        </div>
      </div>
    </div>
  )
}
