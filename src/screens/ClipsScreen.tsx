import { useState } from 'react'
import { CLIPS, CLIPS_GAMES, CLIPS_MEASURES, type GameClip } from '../data'
import { PLAYERS, GAME_FULL, MEASURE_INFO, resultColor } from './clips/clipData'
import { ClipCard, ClipDetail, DropChip } from './clips/ClipComponents'
import { PlaylistsTab, ToCheckTab } from './clips/PlaylistsToCheckTab'

type FilterMode = 'game' | 'measure' | 'player'
type TypeFilter = 'all' | 'good' | 'work'

function ClipsEmpty({ activeTab }: { activeTab: number }) {
  if (activeTab === 1) {
    return (
      <main style={{ flexGrow: 1, padding: '14px 28px 18px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16, boxSizing: 'border-box', minHeight: 0, overflow: 'hidden' }}>
        <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Playlists and shared clips</h1>
            <span style={{ fontSize: 14, color: '#4a5a57' }}>Nothing yet</span>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 4, flex: 'none' }}>
              {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: c }} />)}
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Save the clips that teach</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>Group clips into playlists for team talks, or send a clip to one player with a note. They arrive after your first recorded game.</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ height: 36, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#fff"/></svg>
                  Record your first game
                </button>
                <button style={{ height: 36, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>See an example</button>
              </div>
            </div>
          </div>
          {[65, 50, 60, 45, 55, 48].map((w, i) => (
            <div key={i} style={{ height: 44, border: '1px dashed #c5c8c4', borderRadius: 10, marginBottom: 6, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#e9eae8', flex: 'none' }} />
              <div style={{ height: 10, borderRadius: 5, background: '#e9eae8', width: `${w}%` }} />
            </div>
          ))}
        </div>
        <aside style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>What you'll see</div>
          {[
            { icon: 'M4 6h16M4 12h8M4 18h12', title: 'Playlists for team talks', body: 'Build once, reuse' },
            { icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z', title: 'Clips sent to players', body: 'Parents see them too' },
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944', title: 'No-consent players blurred', body: 'Never in shared clips' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg>
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.body}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto', fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>Clips of a player whose parents said no to filming are never shared.</div>
        </aside>
      </main>
    )
  }

  if (activeTab === 3) {
    return (
      <main style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', gap: 14 }}>
          <span style={{ width: 48, height: 48, borderRadius: '999px', background: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Nothing to check</div>
          <div style={{ fontSize: 14, color: '#4a5a57', textAlign: 'center', lineHeight: '20px', maxWidth: 320 }}>After each recorded game, the few moments Clean Sheet isn't sure about wait here for a quick yes or no from you.</div>
          <button style={{ height: 40, padding: '0 20px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#fff"/></svg>
            Record your first game
          </button>
        </div>
        <aside style={{ borderLeft: '1px solid #e9eae8', padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 14, background: '#fafafa', overflowY: 'auto' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>What lands here</div>
          {[
            { title: 'Close calls', body: 'Was it a win of the ball, a shot, a goal?' },
            { title: "Who's who", body: "When a shirt number can't be read." },
            { title: 'Anything you report', body: 'Tap "Something look wrong?" on any number.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ flex: 'none', width: 24, height: 24, borderRadius: '999px', background: '#10211f', color: '#ffffff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.body}</div>
              </div>
            </div>
          ))}
        </aside>
      </main>
    )
  }

  const measures = ['Pressing high', 'Winning it back', 'Building out', 'Counter-attacks']
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Clips</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>No clips yet</span>
        </div>
        <div style={{ flexGrow: 1 }} />
        <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#10211f', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 8l-4-4-4 4M12 4v12"/></svg>
          Upload a video
        </button>
        <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#fff"/></svg>
          Record a game
        </button>
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20, padding: '14px 28px 18px', overflow: 'hidden' }}>
        <div style={{ minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: 4, flex: 'none' }}>
              {['#2f6252','#40826d','#cbbeb5','#c39797'].map((c, i) => <div key={i} style={{ width: 22, height: 22, borderRadius: 5, background: c }} />)}
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Clips start after your first game</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginBottom: 14 }}>Your match camera records games and finds the clips for you. They're sorted by what your style says matters.</div>
              <button style={{ height: 36, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#ffffff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Record a game</button>
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#6f7f7b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What you'll get clips of</div>
          {measures.map((m, i) => (
            <div key={i} style={{ padding: '12px 16px', background: '#ffffff', border: '1px solid #e9eae8', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#10211f' }}>{m}</div>
          ))}
        </div>
        <aside style={{ background: '#f7f9f7', borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>How clips work</div>
          {[
            { n: '1', title: 'Camera watches the game', body: 'The match camera records everything automatically.' },
            { n: '2', title: 'AI finds the moments', body: "Clean Sheet finds clips that match what your style says you're working on." },
            { n: '3', title: 'You review and use them', body: 'Tag them, build playlists, send to players.' },
          ].map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 10 }}>
              <span style={{ width: 24, height: 24, borderRadius: '999px', background: '#10211f', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{item.n}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: '17px' }}>{item.body}</div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}

export default function ClipsScreen({ empty, activeTab = 0 }: { empty?: boolean; activeTab?: number }) {
  const [filterMode, setFilterMode] = useState<FilterMode>('measure')
  const [activeGame, setActiveGame] = useState<string>('all')
  const [activeMeasure, setActiveMeasure] = useState<string | null>('Pressing high')
  const [activePlayer, setActivePlayer] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [selected, setSelected] = useState<GameClip>(CLIPS[0])

  if (empty) return <ClipsEmpty activeTab={activeTab} />
  if (activeTab === 1 || activeTab === 2) return <PlaylistsTab />
  if (activeTab === 3) return <ToCheckTab />

  const baseFiltered = CLIPS.filter(c => {
    if (filterMode === 'game'    && activeGame)    return activeGame === 'all' || c.game === activeGame
    if (filterMode === 'measure' && activeMeasure) return c.measures.includes(activeMeasure)
    if (filterMode === 'player'  && activePlayer)  return c.players.includes(activePlayer)
    return true
  })

  const filtered = baseFiltered.filter(c => {
    if (typeFilter === 'good') return c.type === 'good'
    if (typeFilter === 'work') return c.type === 'work'
    return true
  })

  const game = activeGame !== 'all' ? CLIPS_GAMES.find(g => g.id === activeGame) : null
  const gameCtx = game ? GAME_FULL[game.id] : null
  const playerInfo = activePlayer ? PLAYERS.find(p => p.ini === activePlayer) : null
  const playerClipCount = activePlayer ? CLIPS.filter(c => c.players.includes(activePlayer!)).length : CLIPS.length

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

      {/* Context header */}
      {((filterMode === 'game' && gameCtx) || (filterMode === 'measure' && activeMeasure) || (filterMode === 'player' && playerInfo)) && (
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
      )}

      {/* Type filter + dropdowns */}
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
        <div style={{ width: 300, flex: 'none', borderLeft: '1px solid #e9eae8', padding: '20px', overflowY: 'auto', background: '#ffffff' }}>
          <ClipDetail clip={selected} />
        </div>
      </div>
    </div>
  )
}
